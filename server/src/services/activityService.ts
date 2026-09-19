import db from "../config/db";

export async function logActivity(
  userId: number,
  type: string,
  message: string
) {
  await db.query(
    `
    INSERT INTO activities (
      user_id,
      type,
      message
    )
    VALUES (?, ?, ?)
    `,
    [userId, type, message]
  );
}