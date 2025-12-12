import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import jobsRouter from "./routes/jobs";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json()); // parse JSON bodies

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/health", (req, res) => res.status(200).send("ok"));

app.use("/api/jobs", jobsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
