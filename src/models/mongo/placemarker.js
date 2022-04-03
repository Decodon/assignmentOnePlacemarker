import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkerSchema = new Schema({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemarker = Mongoose.model("Placemarker", placemarkerSchema);
