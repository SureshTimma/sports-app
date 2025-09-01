import express from 'express';
import {sportsModel, toursModel, matchesModel} from '../DB/mongoSchema.js';
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

// Problem 2: Enhanced /sport/tour/match endpoint
sportsRouter.get("/tour/match", async (req, res) => {
    try {
        const { sportName, tourName, matchName } = req.query;
        
        if (!sportName || !tourName || !matchName) {
            return res.status(400).json({ 
                error: "sportName, tourName, and matchName query parameters required" 
            });
        }

        const sport = await sportsModel.findOne({ sportName });
        if (!sport) {
            return res.status(404).json({ error: "Sport not found" });
        }

        const tour = await toursModel.findOne({ tourName, sportId: sport._id });
        if (!tour) {
            return res.status(404).json({ error: "Tour not found" });
        }

        const match = await matchesModel.findOne({ 
            matchName, 
            tourId: tour._id 
        }).select('_id matchName startTime format');
        
        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }

        res.json({
            id: match._id,
            matchName: match.matchName,
            startTime: match.startTime,
            format: match.format
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default sportsRouter;
