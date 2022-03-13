import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const placemarkers = await db.placemarkerStore.getAllPlacemarkers();
      const viewData = {
        title: "Place-Marker Dashboard",
        placemarkers: placemarkers,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemarker: {
    handler: async function (request, h) {
      const newPlacemarker = {
        title: request.payload.title,
      };
      await db.placemarkerStore.addPlacemarker(newPlacemarker);
      return h.redirect("/dashboard");
    },
  },
};
