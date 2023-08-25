import { insertClient, returnClientOrders } from "../repositories/clients.repositories.js"

export async function createClient(req, res) {
    const { name, address, phone } = req.body

    try {
        await insertClient(name, address, phone)

        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function getOrdersByClient(req, res) {
    const { id } = req.params

    try {
        const clientOrders = await returnClientOrders(id)

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