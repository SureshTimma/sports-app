import express from "express";
import { MongoConnect } from "./src/DB/mongoConnect.js";
import sportsRouter from "./src/routes/sportsRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
await MongoConnect();

app.use("/sports", sportsRouter);

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})