import express, { Request, Response } from "express";
import multer from "multer";
import crypto from "crypto";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "../prisma";
import { CreateJobBody } from "../types";
import { r2 } from "../r2";
import { getOutputVideoKey, getThumbnailKey } from "../r2-keys";

function guessContentType(mimetype?: string): string {
  return mimetype || "application/octet-stream";
}

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});


// Helper function to generate play URL from R2 key
async function getPlayUrlFromKey(key: string): Promise<string> {
  const cmd = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
  });
  return await getSignedUrl(r2, cmd, { expiresIn: 60 * 10 }); // 10 min
}

// ---- MOCK AI PROCESSOR ----
function scheduleMockProcessing(jobId: string) {
  setTimeout(async () => {
    try {
      const outputKey = getOutputVideoKey(jobId);
      const thumbnailKey = getThumbnailKey(jobId);

      // Generate presigned URLs for the keys
      const outputVideoUrl = await getPlayUrlFromKey(outputKey);
      // For now, thumbnail is null - you can generate it later
      const thumbnailUrl = null;

      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "COMPLETED",
          outputVideoUrl: outputVideoUrl,
          thumbnailUrl: thumbnailUrl,
        },
      });
    } catch (err) {
      console.error("Error in mock processing:", err);
      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "FAILED",
          errorMessage: "Mock processing error",
        },
      });
    }
  }, 8000);
}

// POST /api/jobs  → create job (with file upload)
router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file ? {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    } : null);

    const { themeId, modeCategory, petName } = req.body;

    if (!themeId || !modeCategory) {
      return res.status(400).json({ error: "Missing required fields: themeId, modeCategory" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Missing required field: file" });
    }

    // create job (mock OK for now)
    return res.json({ jobId: "test", status: "QUEUED" });
  } catch (err) {
    console.error("❌ POST /api/jobs ERROR:", err);
    console.error(err?.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/jobs/:jobId  → check status
router.get("/:jobId", async (req: Request, res: Response) => {
  const job = await prisma.job.findUnique({ where: { id: req.params.jobId } });

  if (!job) return res.status(404).json({ error: "Job not found" });

  res.json({
    jobId: job.id,
    status: job.status,
    style: job.style,
    petName: job.petName,
    createdAt: job.createdAt,
    outputVideoUrl: job.outputVideoUrl,
    thumbnailUrl: job.thumbnailUrl,
  });
});

// GET /api/jobs  → list all jobs
router.get("/", async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });

    res.json(
      jobs.map((j) => ({
        jobId: j.id,
        status: j.status,
        style: j.style,
        petName: j.petName,
        createdAt: j.createdAt,
        outputVideoUrl: j.outputVideoUrl,
        thumbnailUrl: j.thumbnailUrl,
      }))
    );
  } catch (err) {
    console.error("Error listing jobs:", err);
    if (err instanceof Error) console.error(err.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
