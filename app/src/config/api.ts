// src/config/api.ts

// Change to your actual machine IP on the same network
export const API_BASE_URL = "http://192.168.1.50:4000";



export const API_ENDPOINTS = {

  JOBS: "/api/jobs",

  JOB_BY_ID: (jobId: string) => `/api/jobs/${jobId}`,

};

