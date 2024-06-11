import connectDB from "@/config/database";
import User from '@/models/User';
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const POST = async (request) =>{
    try {
        await connectDB;
        const { propertyId } = await request.json();
        // console.log(propertyId);
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId){
            return new Response('User Id is required', { status: 401});
        }

        const { userId } = sessionUser;

        // Find user in Database based on user id
        const user = await User.findOne({_id: userId});
        //or we can use const user = await User.findOneById(userId);
        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);

        return new Response(JSON.stringify({isBookmarked}), {status: 200});

    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', {status: 500})
    }

}