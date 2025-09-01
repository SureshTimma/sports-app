import express from 'express';
import { toursModel, matchesModel } from '../DB/mongoSchema.js';

const toursRouter = express.Router();

toursRouter.get("/", async (req, res) => {
    try {
        const data = await toursModel.find({}).populate('sportId');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

toursRouter.post("/", async (req, res) => {
    try {
        const body = req.body;
        const data = await toursModel.create(body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Problem 1: Optimized endpoint /tour/matches
toursRouter.get("/matches", async (req, res) => {
    try {
        const { tourName } = req.query;
        if (!tourName) {
            return res.status(400).json({ error: "tourName query parameter required" });
        }
        
        const tour = await toursModel.findOne({ tourName });
        if (!tour) {
            return res.status(404).json({ error: "Tour not found" });
        }
        
        const matches = await matchesModel.find({ tourId: tour._id }).select('matchName startTime format');
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default toursRouter;
