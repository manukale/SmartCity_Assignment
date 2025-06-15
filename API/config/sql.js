import dotenv from "dotenv";
import mysql from 'mysql2/promise'
dotenv.config();

let db = null


export const connectMySQL = async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    })
    console.log('MySQL connected Successful...')
  } catch (err) {
    console.error('MySQL connection error:', err.message)
    process.exit(1)
  }
}

export { db }
