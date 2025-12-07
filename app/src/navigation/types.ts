import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Upload: undefined;
  StylePicker: {
    videoUri: string;
  };
  Generating: {
    jobId: string;
  };
  Result: {
    jobId: string;
    outputVideoUrl: string;
    style: string;
    petName?: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

