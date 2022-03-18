import { db } from "../models/db.js";

export const placemarkerController = {
  index: {
    handler: async function (request, h) {
      const placemarker = await db.placemarkerStore.getPlacemarkerById(
        request.params.id
      );
      const viewData = {
        title: "Placemarker",
        placemarker: placemarker,
      };
      return h.view("placemarker-view", viewData);
    },
  },

  addDetail: {
    handler: async function (request, h) {
      const placemarker = await db.placemarkerStore.getPlacemarkerById(
        request.params.id
      );
      const newDetail = {
        name: request.payload.name,
        year: Number(request.payload.year),
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        religion: request.payload.religion,
      };
      await db.detailStore.addDetail(placemarker._id, newDetail);
      return h.redirect(`/placemarker/${placemarker._id}`);
    },
  },
};
