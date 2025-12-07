import express, { Request, Response } from "express";
import { prisma } from "../prisma";
import { CreateJobBody } from "../types";

const router = express.Router();

// In-memory map to track fake processing timeouts (dev only)
const mockTimers = new Map<string, NodeJS.Timeout>();

// Utility to schedule mock AI completion
function scheduleMockProcessing(jobId: string) {
  // Simulate processing delay (e.g., 8 seconds)
  const timeout = setTimeout(async () => {
    try {
      // In a real system, we'd check the current status and call an AI provider.
      // For now, just mark as COMPLETED with fake URLs.
      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "COMPLETED",
          outputVideoUrl: `https://example.com/output/${jobId}.mp4`,
          thumbnailUrl: `https://example.com/output/${jobId}.jpg`,
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
    } finally {
      mockTimers.delete(jobId);
    }
  }, 8000);

  mockTimers.set(jobId, timeout);
}

/**
 * POST /api/jobs
 * Create a new generation job
 */
router.post("/", async (req: Request, res: Response) => {
  const body = req.body as CreateJobBody;

  if (!body?.style || !body?.inputVideoUrl) {
    return res.status(400).json({
      error: "Missing required fields: style, inputVideoUrl",
    });
  }

  try {
    // Create job as QUEUED, then immediately mark as PROCESSING + schedule mock worker
    const job = await prisma.job.create({
      data: {
        style: body.style,
        inputVideoUrl: body.inputVideoUrl,
        petName: body.petName ?? null,
        status: "QUEUED",
      },
    });

    // Immediately move to PROCESSING to simulate queue handling
    await prisma.job.update({
      where: { id: job.id },
      data: { status: "PROCESSING" },
    });

    scheduleMockProcessing(job.id);

    return res.status(201).json({
      jobId: job.id,
      status: "QUEUED",
    });
  } catch (err) {
    console.error("Error creating job:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/jobs/:jobId
 * Get job status/details
 */
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
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/jobs
 * List recent jobs (for now, global; later can be per-user)
 */
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
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
