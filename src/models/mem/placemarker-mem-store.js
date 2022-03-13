import { v4 } from "uuid";

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
    return placemarkers.find((placemarker) => placemarker._id === id);
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
