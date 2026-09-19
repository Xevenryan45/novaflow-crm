import type { Response } from "express";
import db from "../config/db";
import type { AuthRequest } from "../middleware/authMiddleware";
import { logActivity } from "../services/activityService";

export async function getProjects(
  req: AuthRequest,
  res: Response
) {
  try {
    const [rows] = await db.query(
      `
      SELECT
        p.id,
        p.name,
        p.status,
        p.progress,
        p.deadline,
        p.created_at,
        p.customer_id,
        c.name AS customer_name
      FROM projects p
      LEFT JOIN customers c
        ON p.customer_id = c.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
      `,
      [req.userId]
    );

    return res.json({
      projects: rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to fetch projects",
    });
  }
}

export async function createProject(
  req: AuthRequest,
  res: Response
) {
  try {
    const {
      name,
      customerId,
      deadline,
      status = "Planning",
      progress = 0,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        message: "Progress must be between 0 and 100",
      });
    }

    if (customerId) {
      const [customers] = await db.query(
        `
        SELECT id
        FROM customers
        WHERE id = ? AND user_id = ?
        `,
        [customerId, req.userId]
      );

      if ((customers as any[]).length === 0) {
        return res.status(400).json({
          message: "Invalid customer",
        });
      }
    }

    const [result] = await db.query(
      `
      INSERT INTO projects (
        user_id,
        customer_id,
        name,
        status,
        progress,
        deadline
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        req.userId,
        customerId || null,
        name,
        status,
        progress,
        deadline || null,
      ]
    );

    const projectId = (result as any).insertId;

    const [rows] = await db.query(
      `
      SELECT
        p.id,
        p.name,
        p.status,
        p.progress,
        p.deadline,
        p.created_at,
        p.customer_id,
        c.name AS customer_name
      FROM projects p
      LEFT JOIN customers c
        ON p.customer_id = c.id
      WHERE p.id = ? AND p.user_id = ?
      `,
      [projectId, req.userId]
    );

    await logActivity(
      req.userId!,
      "project_created",
      `Project ${name} was created`
    );

    return res.status(201).json({
      project: (rows as any[])[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to create project",
    });
  }
}

export async function updateProject(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const {
      name,
      customerId,
      deadline,
      status,
      progress,
    } = req.body;

    const [existing] = await db.query(
      `
      SELECT id, name, status
      FROM projects
      WHERE id = ? AND user_id = ?
      `,
      [id, req.userId]
    );

    const existingProjects = existing as any[];

    if (existingProjects.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (
      progress !== undefined &&
      (progress < 0 || progress > 100)
    ) {
      return res.status(400).json({
        message: "Progress must be between 0 and 100",
      });
    }

    await db.query(
      `
      UPDATE projects
      SET
        name = COALESCE(?, name),
        customer_id = COALESCE(?, customer_id),
        deadline = COALESCE(?, deadline),
        status = COALESCE(?, status),
        progress = COALESCE(?, progress)
      WHERE id = ? AND user_id = ?
      `,
      [
        name ?? null,
        customerId ?? null,
        deadline ?? null,
        status ?? null,
        progress ?? null,
        id,
        req.userId,
      ]
    );

    const [rows] = await db.query(
      `
      SELECT
        p.id,
        p.name,
        p.status,
        p.progress,
        p.deadline,
        p.created_at,
        p.customer_id,
        c.name AS customer_name
      FROM projects p
      LEFT JOIN customers c
        ON p.customer_id = c.id
      WHERE p.id = ? AND p.user_id = ?
      `,
      [id, req.userId]
    );

    const updatedProject = (rows as any[])[0];

    if (
      status === "Completed" &&
      existingProjects[0].status !== "Completed"
    ) {
      await logActivity(
        req.userId!,
        "project_completed",
        `Project ${updatedProject.name} was completed`
      );
    } else {
      await logActivity(
        req.userId!,
        "project_updated",
        `Project ${updatedProject.name} was updated`
      );
    }

    return res.json({
      project: updatedProject,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to update project",
    });
  }
}

export async function deleteProject(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT id, name
      FROM projects
      WHERE id = ? AND user_id = ?
      `,
      [id, req.userId]
    );

    const projects = rows as any[];

    if (projects.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const projectName = projects[0].name;

    await db.query(
      `
      DELETE FROM projects
      WHERE id = ? AND user_id = ?
      `,
      [id, req.userId]
    );

    await logActivity(
      req.userId!,
      "project_deleted",
      `Project ${projectName} was deleted`
    );

    return res.json({
      message: "Project deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to delete project",
    });
  }
}