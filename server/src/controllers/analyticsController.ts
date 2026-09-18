import type { Response } from "express";
import db from "../config/db";
import type { AuthRequest } from "../middleware/authMiddleware";

export async function getAnalytics(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;

    const [[customerStats]] = await db.query<any[]>(
      `
      SELECT
        COUNT(*) AS totalCustomers,
        SUM(status = 'Active') AS activeCustomers,
        SUM(status = 'Trial') AS trialCustomers,
        SUM(status = 'Inactive') AS inactiveCustomers
      FROM customers
      WHERE user_id = ?
      `,
      [userId]
    );

    const [[projectStats]] = await db.query<any[]>(
      `
      SELECT
        COUNT(*) AS totalProjects,
        SUM(status = 'Planning') AS planningProjects,
        SUM(status = 'In Progress') AS inProgressProjects,
        SUM(status = 'Review') AS reviewProjects,
        SUM(status = 'Completed') AS completedProjects,
        AVG(progress) AS averageProgress
      FROM projects
      WHERE user_id = ?
      `,
      [userId]
    );

    const [projectsByStatus] = await db.query<any[]>(
      `
      SELECT
        status,
        COUNT(*) AS total
      FROM projects
      WHERE user_id = ?
      GROUP BY status
      `,
      [userId]
    );

    const [customersByPlan] = await db.query<any[]>(
      `
      SELECT
        plan,
        COUNT(*) AS total
      FROM customers
      WHERE user_id = ?
      GROUP BY plan
      `,
      [userId]
    );

    const [monthlyCustomers] = await db.query<any[]>(
      `
      SELECT
        DATE_FORMAT(created_at, '%Y-%m') AS monthKey,
        DATE_FORMAT(created_at, '%b') AS month,
        COUNT(*) AS customers
      FROM customers
      WHERE user_id = ?
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
      GROUP BY monthKey, month
      ORDER BY monthKey
      `,
      [userId]
    );

    const [monthlyProjects] = await db.query<any[]>(
      `
      SELECT
        DATE_FORMAT(created_at, '%Y-%m') AS monthKey,
        DATE_FORMAT(created_at, '%b') AS month,
        COUNT(*) AS projects
      FROM projects
      WHERE user_id = ?
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
      GROUP BY monthKey, month
      ORDER BY monthKey
      `,
      [userId]
    );

    return res.json({
      overview: {
        totalCustomers: Number(customerStats.totalCustomers ?? 0),
        activeCustomers: Number(customerStats.activeCustomers ?? 0),
        trialCustomers: Number(customerStats.trialCustomers ?? 0),
        inactiveCustomers: Number(customerStats.inactiveCustomers ?? 0),

        totalProjects: Number(projectStats.totalProjects ?? 0),
        planningProjects: Number(projectStats.planningProjects ?? 0),
        inProgressProjects: Number(projectStats.inProgressProjects ?? 0),
        reviewProjects: Number(projectStats.reviewProjects ?? 0),
        completedProjects: Number(projectStats.completedProjects ?? 0),
        averageProgress: Math.round(
          Number(projectStats.averageProgress ?? 0)
        ),
      },

      projectsByStatus,
      customersByPlan,
      monthlyCustomers,
      monthlyProjects,
    });
  } catch (error) {
    console.error("ANALYTICS ERROR:", error);

    return res.status(500).json({
      message: "Unable to load analytics",
    });
  }
}