export type JobStyle =
  | "pixar"
  | "anime"
  | "superhero"
  | "birthday"
  | "holiday"
  | "sports"; // 👈 new

export type ModeCategory = "sports" | "movies" | "superhero" | "fairytale";

export type JobStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";



export type PlanId = "free" | "basic" | "enhanced" | "pro";



export type PowerTierId = "free" | "basic" | "enhanced" | "pro";



export interface StyleOption {

  id: string;

  name: string;

  description: string;

  style: JobStyle;

  minPlan: PlanId;      // lowest plan that can use it

  promptHint: string;   // what we'll send to backend/AI later

}



export interface PowerSelection {

  id: string;

  name: string;

  tier: PowerTierId;

  promptHint: string;

}



export interface CreateJobRequest {

  file: { uri: string; type: string; name: string }; // Video file for FormData

  themeId: string; // e.g. "gridiron-goofball"

  modeCategory: ModeCategory; // "sports" | "movies" | "superhero" | "fairytale"

}



export interface CreateJobResponse {

  jobId: string;

  status: JobStatus;

}



export interface Job {

  jobId: string;

  status: JobStatus;          // "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED"

  style: string;              // "pixar", "anime", "superhero", etc.

  petName: string | null;

  createdAt: string;

  outputVideoUrl: string | null;

  thumbnailUrl: string | null;

}

