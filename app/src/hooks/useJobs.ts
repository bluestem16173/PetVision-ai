import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { CreateJobRequest, Job } from '../types/api';

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobRequest) => apiClient.createJob(data),
    onSuccess: () => {
      // Invalidate jobs list to refetch
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useJob(jobId: string | null, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: () => apiClient.getJob(jobId!),
    enabled: !!jobId && (options?.enabled !== false),
    refetchInterval: (query) => {
      const data = query.state.data as Job | undefined;
      // Poll every 3 seconds if job is still processing
      if (data?.status === 'queued' || data?.status === 'processing') {
        return 3000;
      }
      // Stop polling if completed or failed
      return false;
    },
  });
}

export function useAllJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => apiClient.getAllJobs(),
  });
}

