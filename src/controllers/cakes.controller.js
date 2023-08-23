import { db } from "../database/database.js"

export async function createCake(req, res) {
    const { name, price, image, description } = req.body

    try {
        const cake = await db.query(`SELECT * FROM cakes WHERE name = $1;`, [name])
        if (cake.rowCount !== 0) return res.sendStatus(409)

        await db.query(`INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);`, [name, price, image, description])
    } catch (err) {
        return res.status(500).send(err.message)
    }
}