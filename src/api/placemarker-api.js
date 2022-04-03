import Boom from "@hapi/boom";
import {
  IdSpec,
  PlacemarkerArraySpec,
  PlacemarkerSpec,
  PlacemarkerSpecPlus,
} from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placemarkerApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarkers = await db.placemarkerStore.getAllPlacemarkers();
        return placemarkers;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlacemarkerArraySpec, failAction: validationError },
    description: "Get all placemarkers",
    notes: "Returns all placemarkers",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemarker = await db.placemarkerStore.getPlacemarkerById(
          request.params.id
        );
        if (!placemarker) {
          return Boom.notFound("No Placemarker with this id");
        }
        return placemarker;
      } catch (err) {
        return Boom.serverUnavailable("No Placemarker with this id");
      }
    },
    tags: ["api"],
    description: "Find a Placemarker",
    notes: "Returns a placemarker",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkerSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarker = request.payload;
        const newPlacemarker = await db.placemarkerStore.addPlacemarker(
          placemarker
        );
        if (newPlacemarker) {
          return h.response(newPlacemarker).code(201);
        }
        return Boom.badImplementation("error creating placemarker");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Placemarker",
    notes: "Returns the newly created placemarker",
    validate: { payload: PlacemarkerSpec, failAction: validationError },
    response: { schema: PlacemarkerSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarker = await db.placemarkerStore.getPlacemarkerById(
          request.params.id
        );
        if (!placemarker) {
          return Boom.notFound("No Placemarker with this id");
        }
        await db.placemarkerStore.deletePlacemarkerById(placemarker._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Placemarker with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemarker",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkerStore.deleteAllPlacemarkers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all PlacemarkerApi",
  },
};
