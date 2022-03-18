import { v4 } from "uuid";

let details = [];

export const detailMemStore = {
  async getAllDetails() {
    return details;
  },

  async addDetail(placemarkerId, detail) {
    detail._id = v4();
    detail.placemarkerid = placemarkerId;
    details.push(detail);
    return detail;
  },

  async getDetailsByPlacemarkerId(id) {
    return details.filter((detail) => detail.placemarkerid === id);
  },

  async getDetailById(id) {
    return details.find((detail) => detail._id === id);
  },

  async getPlacemarkerDetails(placemarkerid) {
    return details.filter((detail) => detail.placemarkerid === placemarkerId);
  },

  async deleteDetail(id) {
    const index = details.findIndex((detail) => detail._id === id);
    details.splice(index, 1);
  },

  async deleteAllDetails() {
    details = [];
  },

  async updateDetail(detail, updatedDetail) {
    detail.name = updatedDetail.name;
    detail.year = updatedDetail.year;
    detail.latitude = updatedDetail.latitude;
    detail.longitude = updatedDetail.longitude;
    detail.religion = updatedDetail.religion;
  },
};
