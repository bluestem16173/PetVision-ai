-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "inputVideoUrl" TEXT NOT NULL,
    "outputVideoUrl" TEXT,
    "thumbnailUrl" TEXT,
    "petName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
