import { insertCake, returnCakes } from "../repositories/cakes.repositories.js"

export async function createCake(req, res) {
    const { name, price, image, description } = req.body

    try {
        const cake = await returnCakes(name)
        if (cake.rowCount !== 0) return res.sendStatus(409)

        await insertCake(name, price, image, description)
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}