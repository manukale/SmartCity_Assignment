import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    city_name: String,
    population: Number
});

export default mongoose.model("City", citySchema);
