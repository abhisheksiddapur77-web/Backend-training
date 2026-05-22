const express=require("express");
const app=express();
const mongoose = require("mongoose");
require("dotenv").config();
const port=process.env.port

app.use(express.json());

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("mongodb is succesfully connected");
    app.listen(port,()=>{
    console.log(`server is running is port number ${port}`);
});
})
.catch((e)=>{
    console.log("something went wrong",e);
});

