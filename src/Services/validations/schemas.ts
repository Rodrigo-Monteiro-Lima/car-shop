import Joi from 'joi';

const carSchema = Joi.object({
  model: Joi.string().required(),
  year: Joi.number().required(),
  color: Joi.string().required(),
  status: Joi.boolean(),
  buyValue: Joi.number().required(),
  doorsQty: Joi.number().required(),
  seatsQty: Joi.number().required(),
});

const motorcycleSchema = Joi.object({
  model: Joi.string().required(),
  year: Joi.number().required(),
  color: Joi.string().required(),
  status: Joi.boolean(),
  buyValue: Joi.number().required(),
  category: Joi.string().required(),
  engineCapacity: Joi.number().required(),
});

export {
  carSchema,
  motorcycleSchema,
};