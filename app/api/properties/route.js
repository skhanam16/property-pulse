// need to create a handler GET POST PUT DELETE
import connectDB from "@/config/database";
import Property from '@/models/Property';

// GET /api/properties
export const GET = async (request) =>{
    try{

        await connectDB();
        const properties = await Property.find({});
        return new Response(JSON.stringify(properties));
    }
    catch(err){
        console.log(err);
        return new Response('Something went wrong', {status: 500});
          }

};

