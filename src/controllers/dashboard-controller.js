import { db } from "../models/db.js";

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
};
