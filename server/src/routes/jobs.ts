import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { prisma } from "../prisma";
import { CreateJobBody } from "../types";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ---- MOCK AI PROCESSOR ----
function scheduleMockProcessing(jobId: string) {
  setTimeout(async () => {
    try {
      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "COMPLETED",
          outputVideoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          thumbnailUrl: null,
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
  const file = req.file;
  const themeId = req.body.themeId;
  const modeCategory = req.body.modeCategory;

  if (!file) {
    return res.status(400).json({
      error: "Missing required field: file",
    });
  }

  if (!themeId || !modeCategory) {
    // Clean up uploaded file if validation fails
    if (file?.path) {
      fs.unlink(file.path, () => {});
    }
    return res.status(400).json({
      error: "Missing required fields: themeId, modeCategory",
    });
  }

  try {
    // For now, store the file path. In production, you'd upload to S3/Cloud Storage
    const inputVideoUrl = `/uploads/${file.filename}`;

    // Map modeCategory to style (simplified - you may want a more sophisticated mapping)
    const styleMap: Record<string, string> = {
      sports: "sports",
      movies: "pixar",
      superhero: "superhero",
      fairytale: "anime",
    };
    const style = styleMap[modeCategory] || "pixar";

    const job = await prisma.job.create({
      data: {
        style: style,
        inputVideoUrl: inputVideoUrl,
        petName: null,
        status: "QUEUED",
      },
    });

    // Immediately mark as PROCESSING
    await prisma.job.update({
      where: { id: job.id },
      data: { status: "PROCESSING" },
    });

    // Simulate AI processing
    scheduleMockProcessing(job.id);

    return res.status(201).json({
      jobId: job.id,
      status: "QUEUED",
    });
  } catch (err) {
    // Clean up uploaded file on error
    if (file?.path) {
      fs.unlink(file.path, () => {});
    }
    console.error("Error creating job:", err);
    if (err instanceof Error) console.error(err.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/jobs/:jobId  → check status
router.get("/:jobId", async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.status === "COMPLETED") {
      return res.json({
        jobId: job.id,
        status: job.status,
        outputVideoUrl: job.outputVideoUrl,
        thumbnailUrl: job.thumbnailUrl,
      });
    }

    if (job.status === "FAILED") {
      return res.json({
        jobId: job.id,
        status: job.status,
        error: job.errorMessage ?? "Unknown error",
      });
    }

    return res.json({
      jobId: job.id,
      status: job.status,
    });
  } catch (err) {
    console.error("Error fetching job:", err);
    if (err instanceof Error) console.error(err.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/jobs  → list recent jobs
router.get("/", async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return res.json(
      jobs.map((job) => ({
        jobId: job.id,
        status: job.status,
        style: job.style,
        petName: job.petName,
        createdAt: job.createdAt,
        outputVideoUrl: job.outputVideoUrl,
        thumbnailUrl: job.thumbnailUrl,
      }))
    );
  } catch (err) {
    console.error("Error listing jobs:", err);
    if (err instanceof Error) console.error(err.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
