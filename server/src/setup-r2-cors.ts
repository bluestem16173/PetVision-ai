import "dotenv/config";
import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2";

const corsConfiguration = {
  CORSRules: [
    {
      AllowedOrigins: ["*"],
      AllowedMethods: ["GET", "PUT", "HEAD"],
      AllowedHeaders: ["*"],
      ExposeHeaders: ["ETag"],
      MaxAgeSeconds: 3000,
    },
  ],
};

async function setupCORS() {
  try {
    const bucket = process.env.R2_BUCKET;
    if (!bucket) {
      throw new Error("R2_BUCKET environment variable is not set");
    }

    const command = new PutBucketCorsCommand({
      Bucket: bucket,
      CORSConfiguration: corsConfiguration,
    });

    await r2.send(command);
    console.log("✅ CORS configuration applied successfully to R2 bucket:", bucket);
  } catch (error) {
    console.error("❌ Failed to apply CORS configuration:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    process.exit(1);
  }
}

setupCORS();



