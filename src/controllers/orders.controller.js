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

export async function getOrder(req, res) {
    const { date } = req.query

    try {
        let query = `
            SELECT 
                orders.id AS "orderId",
                orders.quantity AS "orderQuantity",
                orders."createdAt" AS "orderCreatedAt",
                orders."totalPrice" AS "orderTotalPrice",
                clients.id AS "clientId",
                clients.name AS "clientName",
                clients.address AS "clientAddress",
                clients.phone AS "clientPhone",
                cakes.id AS "cakeId",
                cakes.name AS "cakeName",
                cakes.price AS "cakePrice",
                cakes.description AS "cakeDescription",
                cakes.image AS "cakeImage"
            FROM orders
            JOIN clients ON clients.id = orders."clientId"
            JOIN cakes ON cakes.id = orders."cakeId"`

        const values = []

        if (date) {
            query += ` WHERE DATE(orders."createdAt") = $1;`
            values.push(date)
        }

        const orderInfo = await db.query(query, values)

        if (orderInfo.rows.length === 0) {
            return res.send([]).status(404)
        }

        const orders = orderInfo.rows.map(row => {
            const createdAt = new Date(row.orderCreatedAt).toISOString().slice(0, 16).replace('T', ' ')

            return {
                client: {
                    id: row.clientId,
                    name: row.clientName,
                    address: row.clientAddress,
                    phone: row.clientPhone
                },
                cake: {
                    id: row.cakeId,
                    name: row.cakeName,
                    price: row.cakePrice,
                    description: row.cakeDescription,
                    image: row.cakeImage
                },
                orderId: row.orderId,
                createdAt: createdAt,
                quantity: row.orderQuantity,
                totalPrice: row.orderTotalPrice
            }
        })

        res.send(orders).status(200)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}