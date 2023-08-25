import { db } from "../database/database.js"

export async function createClient(req, res) {
    const { name, address, phone } = req.body

    try {
        await db.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);`, [name, address, phone])

        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function getOrdersByClient(req, res) {
    const { id } = req.params

    try {
        const clientOrders = await db.query(`
            SELECT 
                 orders.id AS "orderId",
                 orders."createdAt" AS "orderCreatedAt",
                 orders.quantity AS "orderQuantity",
                 orders."totalPrice" AS "orderTotalPrice",
                 cakes.name AS "cakeName"
            FROM orders
            JOIN cakes ON cakes.id = orders."cakeId"
            WHERE orders."clientId" = $1;`, [id])

        if (clientOrders.rowCount === 0) return res.sendStatus(404)

        const orders = clientOrders.rows.map(row => {
            const createdAt = new Date(row.orderCreatedAt).toISOString().slice(0, 16).replace('T', ' ')

            return {
                orderId: row.orderId,
                createdAt: createdAt,
                quantity: row.orderQuantity,
                totalPrice: row.orderTotalPrice,
                cakeName: row.cakeName
            }
        })

        res.send(orders).status(200)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}