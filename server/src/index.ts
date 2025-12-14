import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import crypto from "crypto";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jobsRouter from "./routes/jobs";
import { prisma } from "./prisma";
import { r2 } from "./r2";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`
    );
  });
  next();
});

app.use(cors());
app.options("*", cors());
app.use(express.json()); // parse JSON bodies

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/health", async (req, res) => {
  console.log("Health check requested");
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send("ok");
  } catch (error) {
    console.error("Health check failed - database connection error:", error);
    res.status(503).json({ error: "Database connection failed", details: error instanceof Error ? error.message : String(error) });
  }
});

app.use("/api/jobs", jobsRouter);

// POST /api/r2/upload-url  { contentType: "video/mp4" }
app.post("/api/r2/upload-url", async (req, res) => {
  const { contentType } = req.body;
  const key = `videos/${crypto.randomUUID()}.mp4`;

  const cmd = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  // give mobile enough time to upload
  const url = await getSignedUrl(r2, cmd, { expiresIn: 60 * 15 }); // 15 min
  res.json({ key, url });
});

// GET /api/r2/play-url?key=videos/...
app.get("/api/r2/play-url", async (req, res) => {
  const key = String(req.query.key);

  const cmd = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
  });

  const url = await getSignedUrl(r2, cmd, { expiresIn: 60 * 10 }); // 10 min
  res.json({ key, url });
});

// Error handling middleware for multer file size errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      error: "file_too_large",
      message: "Video too large. Trim shorter (10–15s) or compress.",
      maxBytes: 50 * 1024 * 1024,
    });
  }
  next(err);
});

app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: "Not found" });
});

// Test database connection on startup
async function startServer() {
  try {
    console.log("Testing database connection...");
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server listening on ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? "Set" : "Not set"}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    console.error("Error details:", error instanceof Error ? error.stack : String(error));
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});
