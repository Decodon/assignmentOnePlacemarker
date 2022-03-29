import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarkerService = {
  placemarkerUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkerUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkerUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkerUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkerUrl}/api/users`);
    return res.data;
  },
};
