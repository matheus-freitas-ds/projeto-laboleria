import Joi from "joi"

export const clientsSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().length(10, 'utf8').pattern(/^\d+$/).required()
})