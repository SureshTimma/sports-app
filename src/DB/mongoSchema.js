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
    tourId: { type: objectId, ref: "Tour" },
    startTime: { type: Date, default: Date.now },
    format: { type: String, default: "Regular" }
})

const newsSchema = new schema({
    title: String,
    description: String,
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

// Performance indexes
tourSchema.index({ sportId: 1 });
matchSchema.index({ tourId: 1 });
newsSchema.index({ matchId: 1, tourId: 1, sportId: 1 });

export { sportsModel, toursModel, matchesModel, newsModel };

export { sportsModel, toursModel, matchesModel, newsModel };