import express from 'express';
const newsRouter = express.Router();
import { newsModel } from '../DB/mongoSchema.js';

newsRouter.get("/",(req,res)=>{
    res.send("News Route");
})

export default newsRouter;