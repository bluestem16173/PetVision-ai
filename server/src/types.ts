export type JobStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

export type JobStyle =
  | "pixar"
  | "anime"
  | "superhero"
  | "birthday"
  | "holiday"
  | "sports";

export type ModeCategory = "sports" | "movies" | "superhero" | "fairytale";

export interface CreateJobBody {
  themeId: string;
  modeCategory: ModeCategory;
  // File will be handled by multer middleware
}
