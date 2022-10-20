import Joi from 'joi'
import { filterOrderEnum } from '../enums/orderEnum'

export const createOrderValidator = Joi.object({
 product: Joi.string().min(10).required(),
})

export const filterOrderValidator = Joi.object({
 minPrice: Joi.number().min(100).required(),
 maxPrice: Joi.number().min(100).required(),
 order: Joi.string()
  .valid(...Object.values(filterOrderEnum))
  .optional(),
 page: Joi.number().min(1).optional(),
 perPage: Joi.number().min(5).max(25).optional(),
})
