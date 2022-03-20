import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/details.json"));
db.data = { details: [] };

export const detailJsonStore = {
  async getAllDetails() {
    await db.read();
    return db.data.details;
  },

  async addDetail(placemarkerId, detail) {
    await db.read();
    detail._id = v4();
    detail.placemarkerid = placemarkerId;
    db.data.details.push(detail);
    await db.write();
    return detail;
  },

  async getDetailsByPlacemarkerId(id) {
    await db.read();
    return db.data.details.filter((detail) => detail.placemarkerid === id);
  },

  async getDetailById(id) {
    await db.read();
    return db.data.details.find((detail) => detail._id === id);
  },

  async deleteDetail(id) {
    await db.read();
    const index = db.data.details.findIndex((detail) => detail._id === id);
    db.data.details.splice(index, 1);
    await db.write();
  },

  async deleteAllDetails() {
    db.data.details = [];
    await db.write();
  },

  async updateDetail(detail, updatedDetail) {
    detail.name = updatedDetail.name;
    detail.year = updatedDetail.year;
    detail.latitude = updatedDetail.latitude;
    detail.longitude = updatedDetail.longitude;
    detail.religion = updatedDetail.religion;
    await db.write();
  },
};
