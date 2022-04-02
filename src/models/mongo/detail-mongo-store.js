import { Detail } from "./detail.js";
import { Placemarker } from "./placemarker.js";

export const detailMongoStore = {
  async getDetailsByPlacemarkerId(id) {
    const details = await Detail.find({ placemarkerid: id }).lean();
    return details;
  },

  async getAllDetails() {
    const details = await Detail.find().lean();
    return details;
  },

  async addDetail(placemarkerId, detail) {
    detail.placemarkerid = placemarkerId;
    const newDetail = new Detail(detail);
    const detailObj = await newDetail.save();
    return this.getDetailById(detailObj._id);
  },

  async getDetailById(id) {
    if (id) {
      const detail = await Detail.findOne({ _id: id }).lean();
      return detail;
    }
    return null;
  },

  async deleteDetail(id) {
    try {
      await Detail.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllDetails() {
    await Detail.deleteMany({});
  },

  async updateDetail(detail, updatedDetail) {
    detail.title = updatedDetail.title;
    detail.artist = updatedDetail.artist;
    detail.duration = updatedDetail.duration;
    await detail.save();
  },
};
