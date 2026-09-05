import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db";

function generateToken(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if ((existingUsers as any[]).length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await db.query(
      `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
      `,
      [name, email, hashedPassword]
    );

    const userId = (result as any).insertId;

    const token = generateToken(userId);

    return res.status(201).json({
      user: {
        id: userId,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const [rows] = await db.query(
      `
        SELECT id, name, email, password, role
        FROM users
        WHERE email = ?
        `,
      [email]
    );

    const users = rows as any[];

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.id);

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
