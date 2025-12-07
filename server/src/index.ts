import "dotenv/config";
import express from "express";
import cors from "cors";
import jobsRouter from "./routes/jobs";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // parse JSON bodies

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "petvision-ai-server" });
});

app.use("/api/jobs", jobsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`PetVision AI server running on http://localhost:${PORT}`);
});
