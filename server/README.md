# PetVision AI - Backend Server

Backend API for PetVision AI mobile app.

## Tech Stack

- Node.js + TypeScript
- Express
- Prisma + SQLite
- Mock AI worker (simulates video processing)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Initialize database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Start development server:
```bash
npm run dev
```

The server will run on `http://localhost:3001` (or the PORT specified in `.env`).

## API Endpoints

### POST /api/jobs
Create a new video generation job.

**Request Body:**
```json
{
  "style": "pixar" | "anime" | "superhero" | "birthday" | "holiday",
  "inputVideoUrl": "https://example.com/video.mp4",
  "petName": "Luna" // optional
}
```

**Response:**
```json
{
  "jobId": "uuid",
  "status": "queued"
}
```

### GET /api/jobs/:jobId
Get job status and results.

**Response (Processing):**
```json
{
  "jobId": "uuid",
  "status": "processing"
}
```

**Response (Completed):**
```json
{
  "jobId": "uuid",
  "status": "completed",
  "outputVideoUrl": "https://example.com/output/video.mp4",
  "thumbnailUrl": "https://example.com/output/thumbnail.jpg",
  "style": "pixar",
  "petName": "Luna"
}
```

### GET /api/jobs
Get list of recent jobs (last 50).

## Database

Uses SQLite for development. Database file: `dev.db`

To view/edit data:
```bash
npm run prisma:studio
```

## Mock AI Worker

The `processJob` function in `src/workers/aiWorker.ts` simulates AI video processing:
- Waits 10-15 seconds
- Updates job status to "completed" with mock output URLs
- 90% success rate (10% simulated failures)

In production, replace this with real AI provider integration (Runway, Pika, OpenAI, etc.).

