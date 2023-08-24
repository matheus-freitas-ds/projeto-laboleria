import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { ordersSchema } from "../schemas/ordersSchema.js"
import { createOrder } from "../controllers/orders.controller.js"

const orderRouter = Router()

orderRouter.post("/orders", validateSchema(ordersSchema), createOrder)

export default orderRouter