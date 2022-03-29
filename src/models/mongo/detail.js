import Mongoose from "mongoose";

const { Schema } = Mongoose;

const detailSchema = new Schema({
  name: String,
  year: Number,
  duration: Number,
  latitude: Number,
  longitude: Number,
  religion: String,
  placemarkerid: {
    type: Schema.Types.ObjectId,
    ref: "Placemarker",
  },
});

export const Detail = Mongoose.model("Detail", detailSchema);
