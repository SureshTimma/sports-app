import express from 'express';
import {sportsModel} from '../DB/mongoSchema.js';
const sportsRouter = express.Router();

sportsRouter.get("/", async (req, res) => {
    try {
        const data = await sportsModel.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

sportsRouter.post("/", async (req,res)=>{
    try{
        const body = req.body;
        const data = await sportsModel.create(body);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})

export default sportsRouter;
