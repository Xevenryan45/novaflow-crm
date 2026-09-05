import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import db from "./config/db";
import customerRoutes from "./routes/customerRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

app.get("/api/health", async (_req, res) => {
  try {
    await db.query("SELECT 1");

    return res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);

    return res.status(500).json({
      status: "error",
      database: "disconnected",
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`NovaFlow API running on port ${PORT}`);
});