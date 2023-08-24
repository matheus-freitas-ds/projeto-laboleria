import Joi from "joi"

export const ordersSchema = Joi.object({
    clientId: Joi.number().required(),
    cakeId: Joi.number().required(),
    quantity: Joi.number().integer().min(1).max(4).required(),
    totalPrice: Joi.number().positive().required()
})