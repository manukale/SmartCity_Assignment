import { db } from '../config/sql.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const addUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Name, email, and password are required" })
        }
        const hashedPassword = await bcrypt.hash(password, 6)
        const [result] = await db.execute(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, role]
        )

        res.status(201).json({
            msg: "User added successfully",
            userId: result.insertId,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" })
        }

        const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email])
        const user = rows[0]

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user.id }, process.env.TOKEN, { expiresIn: '1h' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600000
        })

        res.status(200).json({
            msg: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            success: true,
            token: token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}


export const getUser = async (req, res) => {
    
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
    
  try {
    const [rows] = await db.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`);
    const [countResult] = await db.execute(`SELECT COUNT(*) as count FROM users`);
   
    const totalUsers = countResult[0].count;
    const Pages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users: rows,
      currentPage: page,
      totalPages: Pages,
      totalUsers: totalUsers,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching users", error: error.msg });
  }
};


export const updateUser = async (req, res, next) => {
    try {
       
        const { id } = req.params
        const { name, email,  role } = req.body

        const [result] = await db.execute(
            `UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?`,
            [name, email,  role, id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "User not found" })
        }

        res.status(200).json({ msg: "User updated successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params

        const [result] = await db.execute(`DELETE FROM users WHERE id = ?`, [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "User not found" })
        }

        res.status(200).json({ msg: "User deleted successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}