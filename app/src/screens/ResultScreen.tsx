import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ResultRouteProp = RouteProp<RootStackParamList, 'Result'>;

export default function ResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultRouteProp>();
  const { outputVideoUrl, style, petName } = route.params;
  const videoRef = React.useRef<Video>(null);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my pet's ${style} transformation! ${outputVideoUrl}`,
        url: outputVideoUrl,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share video');
    }
  };

  const handleDownload = () => {
    // For MVP, this is a placeholder
    // In production, you'd use expo-file-system and MediaLibrary to save
    Alert.alert(
      'Download',
      'Download functionality will be implemented in a future update. For now, you can share the video!'
    );
  };

  const handleCreateAnother = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: outputVideoUrl }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
        />
      </View>

      <View style={styles.infoContainer}>
        {petName && (
          <Text style={styles.petName}>✨ {petName}</Text>
        )}
        <Text style={styles.styleText}>
          Style: {style.charAt(0).toUpperCase() + style.slice(1)}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.buttonText}>⬇️ Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.buttonText}>📤 Share</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createAnotherButton}
        onPress={handleCreateAnother}
      >
        <Text style={styles.createAnotherText}>Create Another ✨</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  videoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  styleText: {
    fontSize: 16,
    color: '#6b7280',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createAnotherButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  createAnotherText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
});

