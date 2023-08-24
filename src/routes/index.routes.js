import { Router } from "express"
import cakeRouter from "./cakes.routes.js"
import clientRouter from "./clients.routes.js"

const router = Router()
router.use(cakeRouter)
router.use(clientRouter)

export default router