import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useCreateJob } from '../hooks/useJobs';
import { JobStyle } from '../types/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type StylePickerRouteProp = RouteProp<RootStackParamList, 'StylePicker'>;

const STYLES: Array<{ id: JobStyle; name: string; emoji: string; description: string }> = [
  {
    id: 'pixar',
    name: 'Cartoon / Pixar',
    emoji: '🎬',
    description: 'Transform your pet into a Pixar character',
  },
  {
    id: 'anime',
    name: 'Anime Pet',
    emoji: '🌸',
    description: 'Give your pet an anime makeover',
  },
  {
    id: 'superhero',
    name: 'Superhero Pet',
    emoji: '🦸',
    description: 'Make your pet a superhero',
  },
  {
    id: 'birthday',
    name: 'Birthday',
    emoji: '🎂',
    description: 'Celebrate your pet\'s special day',
  },
  {
    id: 'holiday',
    name: 'Holiday',
    emoji: '🎄',
    description: 'Festive holiday style',
  },
];

export default function StylePickerScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<StylePickerRouteProp>();
  const { videoUri } = route.params;
  const [selectedStyle, setSelectedStyle] = useState<JobStyle | null>(null);
  const [petName, setPetName] = useState('');
  const createJob = useCreateJob();

  const handleGenerate = async () => {
    if (!selectedStyle) {
      Alert.alert('No Style Selected', 'Please choose a style first');
      return;
    }

    // For MVP, we'll use the local URI as inputVideoUrl
    // In production, you'd upload the video first and get a URL
    const inputVideoUrl = videoUri;

    try {
      const result = await createJob.mutateAsync({
        style: selectedStyle,
        inputVideoUrl,
        petName: petName.trim() || undefined,
      });

      navigation.navigate('Generating', {
        jobId: result.jobId,
      });
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to create job'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.instruction}>Choose a style for your pet</Text>

      <View style={styles.stylesContainer}>
        {STYLES.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              styles.styleCard,
              selectedStyle === style.id && styles.styleCardSelected,
            ]}
            onPress={() => setSelectedStyle(style.id)}
          >
            <Text style={styles.styleEmoji}>{style.emoji}</Text>
            <Text style={styles.styleName}>{style.name}</Text>
            <Text style={styles.styleDescription}>{style.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.petNameContainer}>
        <Text style={styles.petNameLabel}>Pet Name (Optional)</Text>
        <TextInput
          style={styles.petNameInput}
          placeholder="e.g., Luna, Max, Bella"
          value={petName}
          onChangeText={setPetName}
          maxLength={30}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.generateButton,
          (!selectedStyle || createJob.isPending) && styles.generateButtonDisabled,
        ]}
        onPress={handleGenerate}
        disabled={!selectedStyle || createJob.isPending}
      >
        {createJob.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.generateButtonText}>✨ Generate</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  instruction: {
    fontSize: 18,
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  stylesContainer: {
    marginBottom: 24,
  },
  styleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  styleCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  styleEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  styleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  styleDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  petNameContainer: {
    marginBottom: 24,
  },
  petNameLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  petNameInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  generateButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

