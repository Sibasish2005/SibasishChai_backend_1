// require ('dotenv').config({path:'./env'})
import {app} from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/db.js";
const port  = process.env.PORT || 8000;

 
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("error has occured in the backend app");
        throw error;
       })

    app.listen(port,()=>{
        console.log(`server is running @ port : ${port} `);
        
    })
})
.catch((error)=>{
    console.log("MONGODB db connection failed",error);
    
})


















// import express from "express"
// const app = express()

// (  async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("error has occured in the backend app");
//         throw error;
        
//        })
//        app.listen(process.env.PORT, ()=>{
//         console.log(`app lis listening on port : ${process.env,PORT}`);
        
//        })
//     }
//     catch(error){
//         console.log("ERROR: ",error);
        
//     }
// })()