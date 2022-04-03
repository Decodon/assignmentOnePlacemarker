import { Placemarker } from "./placemarker.js";
import { detailMongoStore } from "./detail-mongo-store.js";

export const placemarkerMongoStore = {
  async getAllPlacemarkers() {
    const placemarkers = await Placemarker.find().lean();
    return placemarkers;
  },

  async getPlacemarkerById(id) {
    if (id) {
      const placemarker = await Placemarker.findOne({ _id: id }).lean();
      if (placemarker) {
        placemarker.details = await detailMongoStore.getDetailsByPlacemarkerId(
          placemarker._id
        );
      }
      return placemarker;
    }
    return null;
  },

  async addPlacemarker(placemarker) {
    const newPlacemarker = new Placemarker(placemarker);
    const placemarkerObj = await newPlacemarker.save();
    return this.getPlacemarkerById(placemarkerObj._id);
  },

  async updatePlacemarker(updatedPlacemarker) {
    const placemarker = await Placemarker.findOne({
      _id: updatedPlacemarker._id,
    });
    placemarker.title = updatedPlacemarker.title;
    placemarker.img = updatedPlacemarker.img;
    await placemarker.save();
  },

  async getUserPlacemarkers(id) {
    const placemarker = await Placemarker.find({ userid: id }).lean();
    return placemarker;
  },

  async deletePlacemarkerById(id) {
    try {
      await Placemarker.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarkers() {
    await Placemarker.deleteMany({});
  },
};
