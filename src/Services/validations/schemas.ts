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

export default carSchema;