import { CreateJobRequest, CreateJobResponse, Job } from "../types/api";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://patient-reflection-production.up.railway.app";

export async function createJob(
  pickedVideo: { uri: string; type: string; name: string },
  selectedStyleId: string,
  selectedCategory: string
): Promise<CreateJobResponse> {
  const formData = new FormData();
  
  // Append file - React Native FormData accepts { uri, type, name }
  formData.append("file", pickedVideo as any);
  formData.append("themeId", selectedStyleId);
  formData.append("modeCategory", selectedCategory);

  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: "POST",
    body: formData,
    // Don't set Content-Type header - React Native will set it with boundary
    headers: {},
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      error: `HTTP ${res.status}: ${res.statusText}`,
    }));
    throw new Error(error.error || "Failed to create job");
  }

  return res.json();
}

export async function getJob(jobId: string): Promise<Job> {
  const res = await fetch(`${BASE_URL}/api/jobs/${jobId}`);
  if (!res.ok) throw new Error("Failed to fetch job");
  return res.json();
}

export async function listJobs(): Promise<Job[]> {
  const res = await fetch(`${BASE_URL}/api/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}
