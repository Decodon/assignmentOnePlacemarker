import { v4 } from "uuid";
import { detailMemStore } from "./detail-mem-store.js";

let placemarkers = [];

export const placemarkerMemStore = {
  async getAllPlacemarkers() {
    return placemarkers;
  },

  async addPlacemarker(placemarker) {
    placemarker._id = v4();
    placemarkers.push(placemarker);
    return placemarker;
  },

  async getPlacemarkerById(id) {
    const list = placemarkers.find((placemarker) => placemarker._id === id);
    list.details = await detailMemStore.getDetailsByPlacemarkerId(list._id);
    return list;
  },

  async deletePlacemarkerById(id) {
    const index = placemarkers.findIndex(
      (placemarker) => placemarker._id === id
    );
    placemarker.splice(index, 1);
  },

  async deleteAllPlacemarkers() {
    placemarkers = [];
  },
};
