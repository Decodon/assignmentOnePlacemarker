import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const detailApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const details = await db.detailStore.getAllDetails();
        return details;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const detail = await db.detailStore.getDetailById(request.params.id);
        if (!detail) {
          return Boom.notFound("No detail with this id");
        }
        return detail;
      } catch (err) {
        return Boom.serverUnavailable("No detail with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const detail = await db.detailStore.addDetail(
          request.params.id,
          request.payload
        );
        if (detail) {
          return h.response(detail).code(201);
        }
        return Boom.badImplementation("error creating detail");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.detailStore.deleteAllDetails();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const detail = await db.detailStore.getDetailById(request.params.id);
        if (!detail) {
          return Boom.notFound("No detail with this id");
        }
        await db.detailStore.deleteDetail(detail._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No detail with this id");
      }
    },
  },
};
