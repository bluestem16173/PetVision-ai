/**
 * Generate R2 storage keys for job outputs
 */

export function getOutputVideoKey(jobId: string): string {
  return `outputs/${jobId}.mp4`;
}

export function getThumbnailKey(jobId: string): string {
  return `thumbs/${jobId}.jpg`;
}

