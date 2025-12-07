import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { CreateJobRequest, CreateJobResponse, Job } from '../types/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  async createJob(data: CreateJobRequest): Promise<CreateJobResponse> {
    return this.request<CreateJobResponse>(API_ENDPOINTS.JOBS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getJob(jobId: string): Promise<Job> {
    return this.request<Job>(API_ENDPOINTS.JOB_BY_ID(jobId));
  }

  async getAllJobs(): Promise<Job[]> {
    return this.request<Job[]>(API_ENDPOINTS.JOBS);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

