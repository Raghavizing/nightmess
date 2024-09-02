import mongoose from "mongoose";
export default async function Connect(){
    try{
        await mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;
    }
    catch(error:any){
        console.log(error.message);
    }
}