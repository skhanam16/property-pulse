// need to create a handler GET POST PUT DELETE
import connectDB from "@/config/database";
import Property from '@/models/Property';

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
