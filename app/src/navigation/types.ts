import { PowerTierId } from "../types/api";



export type RootStackParamList = {

  Home: undefined;

  Upload: undefined;

  Trim: { videoUri: string };

  StylePicker: { videoUri: string; trimStart?: number; trimEnd?: number };

  Generating: { jobId: string };

  Result: { outputVideoUrl: string };

  JobStatus: { jobId: string };

  Library: undefined;

  Upgrade: {

    requestedTier?: PowerTierId;

  };

};

