import { useMutation, useQuery } from "@tanstack/react-query";

import { createJob, getJob, listJobs } from "../api/client";

import { CreateJobResponse, Job } from "../types/api";



export function useCreateJob() {

  return useMutation<CreateJobResponse, Error, { pickedVideo: { uri: string; type: string; name: string }; selectedStyleId: string; selectedCategory: string }>({

    mutationFn: ({ pickedVideo, selectedStyleId, selectedCategory }) => 

      createJob(pickedVideo, selectedStyleId, selectedCategory),

  });

}



export function useJob(jobId: string) {

  return useQuery<Job, Error>({

    queryKey: ["job", jobId],

    queryFn: () => getJob(jobId),

    refetchInterval: 3000,

  });

}

