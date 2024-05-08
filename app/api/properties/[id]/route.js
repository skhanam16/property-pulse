// need to create a handler GET POST PUT DELETE
import connectDB from "@/config/database";
import Property from '@/models/Property';
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties
export const GET = async (request, { params }) =>{
    try{

        await connectDB();
        const property = await Property.findById(params.id);
        if(!property) return new Response('Property Not Found', { status: 404});
        
        return new Response(JSON.stringify(property));
    }
    catch(err){
        console.log(err);
        return new Response('Something went wrong', {status: 500});
          }

};


// DELETE /api/properties/propertyId
export const DELETE = async (request, { params }) =>{
    try{
        const propertyId =params.id;
        const sessionUser = await getSessionUser();
        // Check for seesion
        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is required', {status: 401});
        }
        const { userId } = sessionUser;
        await connectDB();
        const property = await Property.findById(propertyId);
        if(!property) return new Response('Property Not Found', { status: 404});
        // Verify ownership of property
        if(property.owner.toString() !==userId){
          return new Response ('Unathorized', { status: 401})
        }
        await property.deleteOne();

        return new Response('Property deleted', {status: 200});
    }
    catch(err){
        console.log(err);
        return new Response('Something went wrong', {status: 500});
          }
};
// PUT /api/rpoperties/:id
export const PUT = async (request, { params}) =>{
    try{
        await connectDB();
        // session has user object that has an id
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId){
            return new Reponse('User ID is required', {status: 401})
        }
        const { id } = params;
        const { userId } = sessionUser;

        const formData = await request.formData();
        // console.log(formData.get('name'));
         // Access all values of amenities and images
         const amenities = formData.getAll('amenities');

         // Get property to update
         const existingProperty = await Property.findById(id);
         if(!existingProperty){
            return new Response('Property does not exist', { status: 404});
         }

         // if property exist then verify ownwrship
        if(existingProperty.owner.toString() !==userId){
            return new Response('Unauthorized', { status: 401});
        }

        // create propertyData object for database
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
              street: formData.get('location.street'),
              city: formData.get('location.city'),
              state: formData.get('location.state'),
              zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
              weekly: formData.get('rates.weekly'),
              monthly: formData.get('rates.monthly'),
              nightly: formData.get('rates.nightly'),
            },
            seller_info: {
              name:  formData.get('seller_info.name'),
              email: formData.get('seller_info.email'),
              phone: formData.get('seller_info.phone'),
            },
            owner: userId,
            // images,
        };

      // update property in database

      const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);
        
        return new Response(JSON.stringify(updatedProperty),
        { status: 200});

    }
    catch(error){
        return new Response('Failed to update property', {status: 500})
    }

};


