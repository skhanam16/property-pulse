import connectDB from "@/config/database";
import User from '@/models/User';
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// GET /api/bookmarks

export const GET = async () => {

    try{

        await connectDB();
        // get userId from getSessionUser()
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId){
            return new Response('User Id is required', { status: 401});
        }
        // if we have sessionUser then destructure userId from sessionUser
        const { userId } = sessionUser;
        //Find user in the database based on userId

        const user = await User.findById({_id:userId});

        // then retrieve user bookmarks
        const bookmarks = await Property.find({_id: {$in: user.bookmarks}});

        return new Response(JSON.stringify(bookmarks), {status: 200});
    }

    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }

}

export const POST = async (request) =>{
    try {
        await connectDB;
        const { propertyId } = await request.json();
        // console.log(propertyId);
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId){
            return new Response('User Id is required', { status: 401});
        }
// if we have sessionUser then destructure userId from sessionUser
        const { userId } = sessionUser;

        // Find user in Database based on user id
        const user = await User.findOne({_id: userId});
        //or we can use const user = await User.findOneById(userId);
        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);
        let message;
        if(isBookmarked){
            user.bookmarks.pull(propertyId);
            // pull method to remove
            message = 'Bookmark removed successfully';
           isBookmarked = false;
        }
        else{
            // psuh method to add
            user.bookmarks.push(propertyId);
            message = 'Bookmark added successfully';
            isBookmarked = true;
        };

        // Now to database
        await user.save();
        return new Response(JSON.stringify({message, isBookmarked}), {status: 200});

    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', {status: 500})
    }

}