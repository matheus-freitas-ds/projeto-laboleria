import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { clientsSchema } from "../schemas/clientsSchema.js"
import { createClient } from "../controllers/clients.controller.js"

const clientRouter = Router()

clientRouter.post("/clients", validateSchema(clientsSchema), createClient)

export default clientRouter