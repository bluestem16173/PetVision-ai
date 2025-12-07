export type JobStyle = 'pixar' | 'anime' | 'superhero' | 'birthday' | 'holiday';
export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface Job {
  jobId: string;
  status: JobStatus;
  style?: JobStyle;
  petName?: string;
  outputVideoUrl?: string;
  thumbnailUrl?: string;
  createdAt?: string;
  error?: string;
}

export interface CreateJobRequest {
  style: JobStyle;
  inputVideoUrl: string;
  petName?: string;
}

export interface CreateJobResponse {
  jobId: string;
  status: JobStatus;
}

