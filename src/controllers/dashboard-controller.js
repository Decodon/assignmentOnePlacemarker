import { db } from "../models/db.js";
import { PlacemarkerSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarkers = await db.placemarkerStore.getUserPlacemarkers(
        loggedInUser._id
      );
      const viewData = {
        title: "Place-Marker Dashboard",
        user: loggedInUser,
        placemarkers: placemarkers,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemarker: {
    validate: {
      payload: PlacemarkerSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
          .view("dashboard-view", {
            title: "Add Placemarker error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacemarker = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.placemarkerStore.addPlacemarker(newPlacemarker);
      return h.redirect("/dashboard");
    },
  },

  deletePlacemarker: {
    handler: async function (request, h) {
      const placemarker = await db.placemarkerStore.getPlacemarkerById(
        request.params.id
      );
      await db.placemarkerStore.deletePlacemarkerById(placemarker._id);
      return h.redirect("/dashboard");
    },
  },
};
