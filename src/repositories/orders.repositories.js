import { db } from "../database/database.js"

export function returnOrder(id) {
    return db.query(`
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
    JOIN cakes ON cakes.id = orders."cakeId"
    WHERE orders.id = $1;`, [id])
}