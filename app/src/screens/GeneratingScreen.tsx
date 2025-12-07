import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useJob } from '../hooks/useJobs';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type GeneratingRouteProp = RouteProp<RootStackParamList, 'Generating'>;

const LOADING_MESSAGES = [
  'Teaching your pup new tricks...',
  'Adding magical sparkles...',
  'Transforming your pet...',
  'Creating something amazing...',
  'Almost there...',
];

export default function GeneratingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GeneratingRouteProp>();
  const { jobId } = route.params;
  const { data: job, isLoading, error } = useJob(jobId);

  useEffect(() => {
    if (job?.status === 'completed' && job.outputVideoUrl) {
      navigation.replace('Result', {
        jobId: job.jobId,
        outputVideoUrl: job.outputVideoUrl,
        style: job.style || 'pixar',
        petName: job.petName,
      });
    } else if (job?.status === 'failed') {
      Alert.alert(
        'Generation Failed',
        job.error || 'Something went wrong. Please try again.',
        [
          {
            text: 'Go Back',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Retry',
            onPress: () => {
              // Navigate back to style picker or home
              navigation.navigate('Home');
            },
          },
        ]
      );
    }
  }, [job, navigation]);

  const loadingMessage =
    LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>
          {job?.status === 'processing' || job?.status === 'queued'
            ? loadingMessage
            : 'Processing...'}
        </Text>
        {job && (
          <Text style={styles.statusText}>
            Status: {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Text>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.retryButtonText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#1f2937',
    marginTop: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  statusText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 12,
  },
  errorContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

