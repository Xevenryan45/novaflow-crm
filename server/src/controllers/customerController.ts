import type { Response } from "express";
import db from "../config/db";
import type { AuthRequest } from "../middleware/authMiddleware";

export async function getCustomers(
  req: AuthRequest,
  res: Response
) {
  try {
    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        plan,
        status,
        created_at
      FROM customers
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [req.userId]
    );

    return res.json({
      customers: rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to fetch customers",
    });
  }
}

export async function getCustomer(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        plan,
        status,
        created_at
      FROM customers
      WHERE id = ? AND user_id = ?
      `,
      [id, req.userId]
    );

    const customers = rows as any[];

    if (customers.length === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.json({
      customer: customers[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to fetch customer",
    });
  }
}

export async function createCustomer(
  req: AuthRequest,
  res: Response
) {
  try {
    const {
      name,
      email,
      plan = "Starter",
      status = "Active",
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO customers (
        user_id,
        name,
        email,
        plan,
        status
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        req.userId,
        name,
        email,
        plan,
        status,
      ]
    );

    const customerId = (result as any).insertId;

    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        plan,
        status,
        created_at
      FROM customers
      WHERE id = ?
      `,
      [customerId]
    );

    const customers = rows as any[];

    return res.status(201).json({
      customer: customers[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to create customer",
    });
  }
}

export async function updateCustomer(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;
    const { name, email, plan, status } = req.body;

    const [existingRows] = await db.query(
      `
      SELECT id
      FROM customers
      WHERE id = ? AND user_id = ?
      `,
      [id, req.userId]
    );

    if ((existingRows as any[]).length === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await db.query(
      `
      UPDATE customers
      SET
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        plan = COALESCE(?, plan),
        status = COALESCE(?, status)
      WHERE id = ? AND user_id = ?
      `,
      [
        name ?? null,
        email ?? null,
        plan ?? null,
        status ?? null,
        id,
        req.userId,
      ]
    );

    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        plan,
        status,
        created_at
      FROM customers
      WHERE id = ? AND user_id = ?
      `,
      [id, req.userId]
    );

    return res.json({
      customer: (rows as any[])[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to update customer",
    });
  }
}

export async function deleteCustomer(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM customers
      WHERE id = ? AND user_id = ?
      `,
      [id, req.userId]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.json({
      message: "Customer deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to delete customer",
    });
  }
}