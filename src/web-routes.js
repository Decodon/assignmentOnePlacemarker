import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placemarkerController } from "./controllers/placemarker-controller.js";
import { aboutController } from "./controllers/about-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/dashboard", config: dashboardController.index },

  {
    method: "GET",
    path: "/placemarker/{id}",
    config: placemarkerController.index,
  },
  {
    method: "POST",
    path: "/placemarker/{id}/adddetail",
    config: placemarkerController.addDetail,
  },
  {
    method: "POST",
    path: "/dashboard/addplacemarker",
    config: dashboardController.addPlacemarker,
  },

  {
    method: "GET",
    path: "/dashboard/deleteplacemarker/{id}",
    config: dashboardController.deletePlacemarker,
  },
  {
    method: "GET",
    path: "/placemarker/{id}/deletedetail/{detailid}",
    config: placemarkerController.deleteDetail,
  },
];
