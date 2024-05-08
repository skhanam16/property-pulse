// need to create a handler GET POST PUT DELETE
import connectDB from "@/config/database";
import Property from '@/models/Property';



// GET /api/properties/user/:userId
export const GET = async (request, { params }) =>{
    try{

        await connectDB();
        const userId = params.userId;
        if(!userId){
            return new Response ('UserId is required', { status: 400});
        }
        // only want to get property owner userid
        const properties = await Property.find({owner: userId});
        return new Response(JSON.stringify(properties));
      
       
    }
    catch(err){
        console.log(err);
        return new Response('Something went wrong', {status: 500});
          }

};