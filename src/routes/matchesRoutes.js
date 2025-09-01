import express from 'express';
import { matchesModel } from '../DB/mongoSchema.js';

const matchesRouter = express.Router();

matchesRouter.get("/", async (req, res) => {
    try {
        const data = await matchesModel.find({}).populate('tourId');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

matchesRouter.post("/", async (req, res) => {
    try {
        const body = req.body;
        const data = await matchesModel.create(body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default matchesRouter;
