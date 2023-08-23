import { Router } from "express"
import cakeRouter from "./cakes.routes.js"

const router = Router()
router.use(cakeRouter)

export default router