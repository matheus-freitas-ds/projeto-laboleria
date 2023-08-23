import { Router } from "express"
import { createCake } from "../controllers/cakes.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { cakesSchema } from "../schemas/cakesSchema.js"

const cakeRouter = Router()

cakeRouter.post("/cakes", validateSchema(cakesSchema), createCake)

export default cakeRouter