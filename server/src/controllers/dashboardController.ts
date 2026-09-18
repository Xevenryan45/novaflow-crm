import type { Response } from "express";
import db from "../config/db";
import type { AuthRequest } from "../middleware/authMiddleware";

export async function getDashboardSummary(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;

    const [[customerCount]] = await db.query<any[]>(
      `
      SELECT COUNT(*) AS total
      FROM customers
      WHERE user_id = ?
      `,
      [userId]
    );

    const [[projectCount]] = await db.query<any[]>(
      `
      SELECT COUNT(*) AS total
      FROM projects
      WHERE user_id = ?
      `,
      [userId]
    );

    const [[activeProjectCount]] = await db.query<any[]>(
      `
      SELECT COUNT(*) AS total
      FROM projects
      WHERE user_id = ?
      AND status != 'Completed'
      `,
      [userId]
    );

    const [[completedProjectCount]] = await db.query<any[]>(
      `
      SELECT COUNT(*) AS total
      FROM projects
      WHERE user_id = ?
      AND status = 'Completed'
      `,
      [userId]
    );

    const [recentProjects] = await db.query<any[]>(
      `
      SELECT
        p.id,
        p.name,
        p.status,
        p.progress,
        p.deadline,
        c.name AS customer_name
      FROM projects p
      LEFT JOIN customers c
        ON p.customer_id = c.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
      LIMIT 5
      `,
      [userId]
    );

    const [recentCustomers] = await db.query<any[]>(
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
      LIMIT 5
      `,
      [userId]
    );

    return res.json({
      customers: customerCount.total,
      projects: projectCount.total,
      activeProjects: activeProjectCount.total,
      completedProjects: completedProjectCount.total,
      recentProjects,
      recentCustomers,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return res.status(500).json({
      message: "Unable to load dashboard data",
    });
  }
}