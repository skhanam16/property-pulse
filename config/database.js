import mongoose from "mongoose";

let connected = false;
const connectDB = async() =>{
    mongoose.set('strictQuery', true);
    // this means only the field that are specified in the schema will be set in our database
    // if the database is already connected, don't connect it again
   if(connected){
    console.log('MongoDB is already connected');
    return;
   }
// if not coonected,connect to MongoDB
try{
await mongoose.connect(process.env.MONGODB_URI);
connected = true;
console.log('MongoDB is coonected...')
}

catch(error){
console.log('There is something went wrong', error);
}


}

export default connectDB;