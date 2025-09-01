import express from 'express';
import { matchesModel, toursModel, newsModel } from '../DB/mongoSchema.js';

const newsRouter = express.Router();

newsRouter.get("/", async (req, res) => {
    try {
        const data = await newsModel.find({}).populate(['sportId', 'tourId', 'matchId']);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Problem 3: POST /news
newsRouter.post("/", async (req, res) => {
    try {
        const { title, description, matchId, tourId } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ error: "title and description are required" });
        }

        let newsData = {
            title,
            description,
            matchId: null,
            tourId: null,
            sportId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        if (matchId) {
            const match = await matchesModel.findById(matchId).populate('tourId');
            if (!match) {
                return res.status(404).json({ error: "Match not found" });
            }
            
            const tour = await toursModel.findById(match.tourId._id);
            newsData.matchId = matchId;
            newsData.tourId = match.tourId._id;
            newsData.sportId = tour.sportId;
        } else if (tourId) {
            const tour = await toursModel.findById(tourId);
            if (!tour) {
                return res.status(404).json({ error: "Tour not found" });
            }
            
            newsData.tourId = tourId;
            newsData.sportId = tour.sportId;
        } else {
            return res.status(400).json({ error: "Either matchId or tourId is required" });
        }

        const data = await newsModel.create(newsData);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /news/match/:matchId
newsRouter.get("/match/:matchId", async (req, res) => {
    try {
        const { matchId } = req.params;
        const news = await newsModel.find({ matchId }).populate(['sportId', 'tourId', 'matchId']);
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /news/tour/:tourId
newsRouter.get("/tour/:tourId", async (req, res) => {
    try {
        const { tourId } = req.params;
        const news = await newsModel.find({ tourId }).populate(['sportId', 'tourId', 'matchId']);
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /news/sport/:sportId
newsRouter.get("/sport/:sportId", async (req, res) => {
    try {
        const { sportId } = req.params;
        const news = await newsModel.find({ sportId }).populate(['sportId', 'tourId', 'matchId']);
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default newsRouter;