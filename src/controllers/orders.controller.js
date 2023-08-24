import { db } from "../database/database.js"

export async function createOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body

    try {
        const client = await db.query(`SELECT * FROM clients WHERE id = $1;`, [clientId])
        if (client.rowCount === 0) return res.sendStatus(404)

        const cake = await db.query(`SELECT * FROM cakes WHERE id = $1;`, [cakeId])
        if (cake.rowCount === 0) return res.sendStatus(404)

        await db.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4);`, [clientId, cakeId, quantity, totalPrice])
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}