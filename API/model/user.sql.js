import { db } from '../config/sql.js'

export const userTable = async () => {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    await db.execute(sql)
    console.log('Users table created')
  } catch (err) {
    console.error('Error:', err.message)
  }
}