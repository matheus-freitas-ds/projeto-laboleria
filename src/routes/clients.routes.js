import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { clientsSchema } from "../schemas/clientsSchema.js"
import { createClient, getOrdersByClient } from "../controllers/clients.controller.js"

const clientRouter = Router()

clientRouter.post("/clients", validateSchema(clientsSchema), createClient)
clientRouter.get("/clients/:id/orders", getOrdersByClient)

export default clientRouter