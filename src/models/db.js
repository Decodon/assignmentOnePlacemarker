import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkerMemStore } from "./mem/placemarker-mem-store.js";
import { detailMemStore } from "./mem/detail-mem-store.js";

export const db = {
  userStore: null,
  placemarkerStore: null,
  detailStore: null,

  init() {
    this.userStore = userMemStore;
    this.placemarkerStore = placemarkerMemStore;
    this.detailStore = detailMemStore;
  },
};
