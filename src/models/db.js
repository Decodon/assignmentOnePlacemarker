import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkerMemStore } from "./mem/placemarker-mem-store.js";

export const db = {
  userStore: null,
  playlistStore: null,

  init() {
    this.userStore = userMemStore;
    this.placemarkerStore = placemarkerMemStore;
  },
};
