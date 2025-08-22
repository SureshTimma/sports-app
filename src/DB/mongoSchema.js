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

const sportsModel = model("Sport", sportSchema) || mongoose.models.Sport;
const toursModel = model("Tour", tourSchema) || mongoose.models.Tour;
const matchesModel = model("Match", matchSchema) || mongoose.models.Match;

export { sportsModel, toursModel, matchesModel };