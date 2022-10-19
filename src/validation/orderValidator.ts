import Joi from 'joi'

export const createOrderValidator = Joi.object({
 product: Joi.string().min(10).required(),
})
