import { userApi } from "./api/user-api.js";
import { placemarkerApi } from "./api/placemarker-api.js";
import { detailApi } from "./api/detail-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/placemarkers", config: placemarkerApi.create },
  {
    method: "DELETE",
    path: "/api/placemarkers",
    config: placemarkerApi.deleteAll,
  },
  { method: "GET", path: "/api/placemarkers", config: placemarkerApi.find },
  {
    method: "GET",
    path: "/api/placemarkers/{id}",
    config: placemarkerApi.findOne,
  },
  {
    method: "DELETE",
    path: "/api/placemarkers/{id}",
    config: placemarkerApi.deleteOne,
  },

  { method: "GET", path: "/api/details", config: detailApi.find },
  { method: "GET", path: "/api/details/{id}", config: detailApi.findOne },
  {
    method: "POST",
    path: "/api/placemarkers/{id}/details",
    config: detailApi.create,
  },
  { method: "DELETE", path: "/api/details", config: detailApi.deleteAll },
  { method: "DELETE", path: "/api/details/{id}", config: detailApi.deleteOne },
];
