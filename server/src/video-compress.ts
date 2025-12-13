import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import path from "path";
import fs from "fs";

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

/**
 * Compress video file
 * @param inputPath - Path to input video file
 * @param outputPath - Path to output compressed video file
 * @returns Promise<string> - Path to compressed video
 */
export async function compressVideo(inputPath: string, outputPath?: string): Promise<string> {
  // Generate output path if not provided
  const outputUri = outputPath || inputPath.replace(/\.(mp4|mov|avi)$/i, "_compressed.mp4");

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputUri)
      .videoFilters("scale='min(1280,iw)':-2") // Scale to max 720p width, maintain aspect ratio
      .fps(30) // Set frame rate to 30fps
      .videoBitrate("1500k") // Set video bitrate
      .addOptions([
        "-maxrate 1500k",
        "-bufsize 3000k",
        "-preset veryfast",
        "-movflags +faststart",
        "-an", // Remove audio
      ])
      .on("end", () => {
        console.log("Video compression completed:", outputUri);
        resolve(outputUri);
      })
      .on("error", (err) => {
        console.error("Video compression error:", err);
        reject(new Error(`Compression failed: ${err.message}`));
      })
      .on("progress", (progress) => {
        console.log(`Processing: ${progress.percent}% done`);
      })
      .run();
  });
}

/**
 * Compress video from buffer (for R2 uploads)
 * @param inputBuffer - Video file buffer
 * @param outputPath - Path to save compressed video
 * @returns Promise<string> - Path to compressed video
 */
export async function compressVideoFromBuffer(
  inputBuffer: Buffer,
  outputPath: string
): Promise<string> {
  // Write buffer to temporary file
  const tempInputPath = path.join(process.cwd(), "temp", `input_${Date.now()}.mp4`);
  const tempDir = path.dirname(tempInputPath);

  // Ensure temp directory exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Write buffer to file
  fs.writeFileSync(tempInputPath, inputBuffer);

  try {
    // Compress video
    const compressedPath = await compressVideo(tempInputPath, outputPath);

    // Clean up temp file
    fs.unlinkSync(tempInputPath);

    return compressedPath;
  } catch (error) {
    // Clean up temp file on error
    if (fs.existsSync(tempInputPath)) {
      fs.unlinkSync(tempInputPath);
    }
    throw error;
  }
}

