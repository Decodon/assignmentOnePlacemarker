import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const DetailSpec = {
  name: Joi.string().required(),
  year: Joi.number().optional().min(0).max(2022).allow(""),
  latitude: Joi.number().optional().allow("").min(-90).max(90),
  longitude: Joi.number().optional().allow("").min(-180).max(180),
  religion: Joi.string().optional(),
};

export const PlacemarkerSpec = {
  title: Joi.string().required(),
};
