import express from "express";
const app = express();
const port = 3000;

import { MongoConnect } from "./DB/MongoConnect.js";

await MongoConnect();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})