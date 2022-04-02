import Joi from "joi";

export const IdSpec = Joi.alternatives()
  .try(Joi.string(), Joi.object())
  .description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const DetailSpec = Joi.object()
  .keys({
    name: Joi.string().required(),
    year: Joi.number().optional().min(0).max(2022).allow(""),
    latitude: Joi.number().optional().allow("").min(-90).max(90),
    longitude: Joi.number().optional().allow("").min(-180).max(180),
    religion: Joi.string().optional(),
    placemarkerid: IdSpec,
  })
  .label("Detail");

export const DetailSpecPlus = DetailSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("DetailPlus");

export const DetailArraySpec = Joi.array()
  .items(DetailSpecPlus)
  .label("DetailArray");

export const PlacemarkerSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Clonakilty"),
    userid: IdSpec,
    details: DetailArraySpec,
  })
  .label("Placemarker");

export const PlacemarkerSpecPlus = PlacemarkerSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkerPlus");

export const PlacemarkerArraySpec = Joi.array()
  .items(PlacemarkerSpecPlus)
  .label("PlacemarkerArray");
