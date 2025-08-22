import mongoose from "mongoose";

const schema = mongoose.Schema;
const objectId = schema.ObjectId;
const model = mongoose.model;

const sportSchema = new schema({
    sportName: String
});

const sportsModel = model("Sport", sportSchema);
export default sportsModel;