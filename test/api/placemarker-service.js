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

  async createPlacemarker(placemarker) {
    const res = await axios.post(
      `${this.placemarkerUrl}/api/placemarkers`,
      placemarker
    );
    return res.data;
  },

  async deleteAllPlacemarkers() {
    const response = await axios.delete(
      `${this.placemarkerUrl}/api/placemarkers`
    );
    return response.data;
  },

  async deletePlacemarker(id) {
    const response = await axios.delete(
      `${this.placemarkerUrl}/api/placemarkers/${id}`
    );
    return response;
  },

  async getAllPlacemarkers() {
    const res = await axios.get(`${this.placemarkerUrl}/api/placemarkers`);
    return res.data;
  },

  async getPlacemarker(id) {
    const res = await axios.get(
      `${this.placemarkerUrl}/api/placemarkers/${id}`
    );
    return res.data;
  },

  async getAllDetails() {
    const res = await axios.get(`${this.placemarkerUrl}/api/details`);
    return res.data;
  },

  async createDetail(id, detail) {
    const res = await axios.post(
      `${this.placemarkerUrl}/api/placemarkers/${id}/details`,
      detail
    );
    return res.data;
  },

  async deleteAllDetails() {
    const res = await axios.delete(`${this.placemarkerUrl}/api/details`);
    return res.data;
  },

  async getDetail(id) {
    const res = await axios.get(`${this.placemarkerUrl}/api/details/${id}`);
    return res.data;
  },

  async deleteDetail(id) {
    const res = await axios.delete(`${this.placemarkerUrl}/api/details/${id}`);
    return res.data;
  },
};
