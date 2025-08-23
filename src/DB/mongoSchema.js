import mongoose from "mongoose";

const schema = mongoose.Schema;
const objectId = schema.ObjectId;
const model = mongoose.model;

const sportSchema = new schema({
    sportName: { type: String, required: true, unique: true }
});

const tourSchema = new schema({
    tourName: String,
    sportId: { type: objectId, ref: "Sport" }
})

const matchSchema = new schema({
    matchName: String,
    tourId: { type: objectId, ref: "Tour" }
})

const newsSchema = new schema({
    newsTitle: String,
    newsDescription: String,
    matchId: { type: objectId, ref: "Match" },
    tourId: { type: objectId, ref: "Tour" },
    sportId: { type: objectId, ref: "Sport" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const sportsModel = model("Sport", sportSchema) || mongoose.models.Sport;
const toursModel = model("Tour", tourSchema) || mongoose.models.Tour;
const matchesModel = model("Match", matchSchema) || mongoose.models.Match;
const newsModel = model("News", newsSchema) || mongoose.models.News;

export { sportsModel, toursModel, matchesModel, newsModel };