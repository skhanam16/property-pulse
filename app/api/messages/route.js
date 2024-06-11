import connectDB from "@/config/database";
import Message from '@/models/Message';

export const POST = async () => {
 try {
    await connectDB();
 } catch (error) {
    
 }

}
