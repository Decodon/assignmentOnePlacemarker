import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { detailJsonStore } from "./detail-json-store.js";

const db = new Low(new JSONFile("./src/models/json/placemarkers.json"));
db.data = { placemarkers: [] };

export const placemarkerJsonStore = {
  async getAllPlacemarkers() {
    await db.read();
    return db.data.placemarkers;
  },

  async addPlacemarker(placemarker) {
    await db.read();
    placemarker._id = v4();
    db.data.placemarkers.push(placemarker);
    await db.write();
    return placemarker;
  },

  async getPlacemarkerById(id) {
    await db.read();
    let list = db.data.placemarkers.find(
      (placemarker) => placemarker._id === id
    );
    if (list) {
      list.details = await detailJsonStore.getDetailsByPlacemarkerId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPlacemarkers(userid) {
    await db.read();
    return db.data.placemarkers.filter(
      (placemarker) => placemarker.userid === userid
    );
  },

  async deletePlacemarkerById(id) {
    await db.read();
    const index = db.data.placemarkers.findIndex(
      (placemarker) => placemarker._id === id
    );
    if (index !== -1) db.data.placemarkers.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarkers() {
    db.data.placemarkers = [];
    await db.write();
  },
};
