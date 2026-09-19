import type { Response } from "express";
import bcrypt from "bcryptjs";

import db from "../config/db";
import type { AuthRequest } from "../middleware/authMiddleware";
import { logActivity } from "../services/activityService";

export async function getSettings(
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
        workspace_name,
        email_notifications,
        project_notifications
      FROM users
      WHERE id = ?
      `,
      [req.userId]
    );

    const users = rows as any[];

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      settings: users[0],
    });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return res.status(500).json({
      message: "Unable to load settings",
    });
  }
}

export async function updateProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const {
      name,
      email,
      workspaceName,
      emailNotifications,
      projectNotifications,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const [existingEmail] = await db.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
      AND id != ?
      `,
      [email, req.userId]
    );

    if ((existingEmail as any[]).length > 0) {
      return res.status(409).json({
        message: "Email is already in use",
      });
    }

    await db.query(
      `
      UPDATE users
      SET
        name = ?,
        email = ?,
        workspace_name = ?,
        email_notifications = ?,
        project_notifications = ?
      WHERE id = ?
      `,
      [
        name,
        email,
        workspaceName || null,
        emailNotifications ? 1 : 0,
        projectNotifications ? 1 : 0,
        req.userId,
      ]
    );

    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        workspace_name,
        email_notifications,
        project_notifications
      FROM users
      WHERE id = ?
      `,
      [req.userId]
    );

    await logActivity(
      req.userId!,
      "settings_updated",
      "Account settings were updated"
    );

    return res.json({
      settings: (rows as any[])[0],
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return res.status(500).json({
      message: "Unable to update settings",
    });
  }
}

export async function changePassword(
  req: AuthRequest,
  res: Response
) {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message:
          "New password must be at least 8 characters",
      });
    }

    const [rows] = await db.query(
      `
      SELECT id, password
      FROM users
      WHERE id = ?
      `,
      [req.userId]
    );

    const users = rows as any[];

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      currentPassword,
      users[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    await db.query(
      `
      UPDATE users
      SET password = ?
      WHERE id = ?
      `,
      [hashedPassword, req.userId]
    );

    await logActivity(
      req.userId!,
      "password_changed",
      "Account password was changed"
    );

    return res.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("PASSWORD CHANGE ERROR:", error);

    return res.status(500).json({
      message: "Unable to change password",
    });
  }
}