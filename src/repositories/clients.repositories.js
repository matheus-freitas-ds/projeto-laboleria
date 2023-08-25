import { db } from "../database/database.js"

export function insertClient(name, address, phone) {
    return db.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);`, [name, address, phone])
}

export function returnClientOrders(id) {
    return db.query(`
    SELECT 
         orders.id AS "orderId",
         orders."createdAt" AS "orderCreatedAt",
         orders.quantity AS "orderQuantity",
         orders."totalPrice" AS "orderTotalPrice",
         cakes.name AS "cakeName"
    FROM orders
    JOIN cakes ON cakes.id = orders."cakeId"
    WHERE orders."clientId" = $1;`, [id])
}