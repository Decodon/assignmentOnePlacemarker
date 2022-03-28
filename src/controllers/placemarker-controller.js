import { db } from "../models/db.js";
import { DetailSpec } from "../models/joi-schemas.js";

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
    /* validate: {
      payload: DetailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
          .view("placemarker-view", {
            title: "Add detail error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    }, */
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

  deleteDetail: {
    handler: async function (request, h) {
      const placemarker = await db.placemarkerStore.getPlacemarkerById(
        request.params.id
      );
      await db.detailStore.deleteDetail(request.params.detailid);
      return h.redirect(`/placemarker/${placemarker._id}`);
    },
  },
};
