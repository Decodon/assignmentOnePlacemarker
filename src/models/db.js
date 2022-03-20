// import { userMemStore } from "./mem/user-mem-store.js";
// import { placemarkerMemStore } from "./mem/placemarker-mem-store.js";
// import { detailMemStore } from "./mem/detail-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkerJsonStore } from "./json/placemarker-json-store.js";
import { detailJsonStore } from "./json/detail-json-store.js";

export const db = {
  userStore: null,
  placemarkerStore: null,
  detailStore: null,

  init() {
    this.userStore = userJsonStore;
    this.placemarkerStore = placemarkerJsonStore;
    this.detailStore = detailJsonStore;
  },
};
