export type JobStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface CreateJobBody {
  style: "pixar" | "anime" | "superhero" | "birthday" | "holiday";
  inputVideoUrl: string;
  petName?: string;
}
