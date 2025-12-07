import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAllJobs } from '../hooks/useJobs';
import { Job } from '../types/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { data: jobs, isLoading } = useAllJobs();

  const completedJobs = jobs?.filter((job) => job.status === 'completed') || [];

  const handleCreatePress = () => {
    navigation.navigate('Upload');
  };

  const handleJobPress = (job: Job) => {
    if (job.outputVideoUrl) {
      navigation.navigate('Result', {
        jobId: job.jobId,
        outputVideoUrl: job.outputVideoUrl,
        style: job.style || 'pixar',
        petName: job.petName,
      });
    }
  };

  const renderJobItem = ({ item }: { item: Job }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => handleJobPress(item)}
    >
      {item.thumbnailUrl ? (
        <Image
          source={{ uri: item.thumbnailUrl }}
          style={styles.thumbnail}
        />
      ) : (
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.placeholderText}>🎬</Text>
        </View>
      )}
      <View style={styles.jobInfo}>
        <Text style={styles.jobStyle}>{item.style || 'Unknown'}</Text>
        {item.petName && (
          <Text style={styles.jobPetName}>{item.petName}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🐾 PetVision AI</Text>
        <Text style={styles.subtitle}>
          Transform your pet into magical videos
        </Text>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreatePress}>
        <Text style={styles.createButtonText}>✨ Create Magic Video</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Creations</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />
        ) : completedJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No creations yet. Create your first magic video! ✨
            </Text>
          </View>
        ) : (
          <FlatList
            data={completedJobs}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.jobId}
            numColumns={2}
            contentContainerStyle={styles.jobsList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  loader: {
    marginTop: 40,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  jobsList: {
    paddingBottom: 20,
  },
  jobCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: 120,
    backgroundColor: '#e5e7eb',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
  },
  jobInfo: {
    padding: 12,
  },
  jobStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  jobPetName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});

