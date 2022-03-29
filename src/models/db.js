import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkerMemStore } from "./mem/placemarker-mem-store.js";
import { detailMemStore } from "./mem/detail-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkerJsonStore } from "./json/placemarker-json-store.js";
import { detailJsonStore } from "./json/detail-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkerMongoStore } from "./mongo/placemarker-mongo-store.js";
import { detailMongoStore } from "./mongo/detail-mongo-store.js";

export const db = {
  userStore: null,
  placemarkerStore: null,
  detailStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placemarkerStore = placemarkerJsonStore;
        this.detailStore = detailJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkerStore = placemarkerMongoStore;
        this.detailStore = detailMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.placemarkerStore = placemarkerMemStore;
        this.detailStore = detailMemStore;
    }
  },
};
