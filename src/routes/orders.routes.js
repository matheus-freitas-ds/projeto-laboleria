import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { ordersSchema } from "../schemas/ordersSchema.js"
import { createOrder, getOrder, getOrdersById } from "../controllers/orders.controller.js"

const orderRouter = Router()

orderRouter.post("/orders", validateSchema(ordersSchema), createOrder)
orderRouter.get("/orders", getOrder)
orderRouter.get("/orders/:id", getOrdersById)

export default orderRouter