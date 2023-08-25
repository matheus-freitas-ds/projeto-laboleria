import { db } from "../database/database.js"

export function returnCakes(name) {
    return db.query(`SELECT * FROM cakes WHERE name = $1;`, [name])
}

export function insertCake(name, price, image, description) {
    return db.query(`INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);`, [name, price, image, description])
}