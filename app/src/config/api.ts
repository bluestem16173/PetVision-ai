// API Configuration
// Update this based on your environment:
// - iOS Simulator: http://localhost:4000
// - Android Emulator: http://10.0.2.2:4000
// - Physical Device: http://YOUR_COMPUTER_IP:4000 (e.g., http://192.168.1.100:4000)

import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (__DEV__) {
    // Android emulator uses special IP
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:4000';
    }
    // iOS simulator and web can use localhost
    return 'http://localhost:4000';
  }
  // Production - update with your backend URL
  return 'http://localhost:4000';
};

export const API_BASE_URL = getBaseUrl();

export const API_ENDPOINTS = {
  JOBS: '/api/jobs',
  JOB_BY_ID: (jobId: string) => `/api/jobs/${jobId}`,
} as const;

