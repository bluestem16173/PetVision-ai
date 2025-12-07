import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UploadScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to select videos.'
      );
      return false;
    }
    return true;
  };

  const pickVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 15, // Max 15 seconds
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedVideo(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedVideo) {
      Alert.alert('No Video Selected', 'Please select a video first');
      return;
    }

    // For MVP, we'll use the local URI directly
    // In production, you'd upload to storage first and get a URL
    navigation.navigate('StylePicker', {
      videoUri: selectedVideo,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>
        Select a 5-15 second video of your pet
      </Text>

      {selectedVideo ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: selectedVideo }}
            style={styles.preview}
            resizeMode="cover"
          />
          <Text style={styles.previewText}>Video selected ✓</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.selectButton}
          onPress={pickVideo}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.selectButtonText}>📹 Select Video</Text>
          )}
        </TouchableOpacity>
      )}

      {selectedVideo && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  selectButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 200,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  previewContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
  },
  previewText: {
    marginTop: 12,
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

