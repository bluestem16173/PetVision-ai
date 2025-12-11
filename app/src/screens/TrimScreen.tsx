import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";

import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

import Slider from "@react-native-community/slider";



type Props = NativeStackScreenProps<RootStackParamList, "Trim">;



const MIN_LENGTH = 5;

const MAX_LENGTH = 10;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");



export default function TrimScreen({ route, navigation }: Props) {

  const { videoUri } = route.params;

  const videoRef = useRef<Video>(null);

  const [videoDuration, setVideoDuration] = useState<number>(0);

  const [trimStart, setTrimStart] = useState(0);

  const [trimEnd, setTrimEnd] = useState(5);

  const [currentTime, setCurrentTime] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);



  useEffect(() => {

    // Poll for video duration until it's loaded

    const checkVideoDuration = async () => {

      if (videoRef.current) {

        try {

          const status = await videoRef.current.getStatusAsync();

          if (status.isLoaded && status.durationMillis) {

            const durationSeconds = status.durationMillis / 1000;

            setVideoDuration(durationSeconds);

            const initialEnd = Math.min(5, durationSeconds);

            setTrimEnd(initialEnd);

            setIsLoading(false);

            return true; // Video loaded

          }

        } catch (error) {

          console.error("Error loading video duration:", error);

        }

      }

      return false; // Video not loaded yet

    };



    // Try immediately

    checkVideoDuration().then((loaded) => {

      if (!loaded) {

        // If not loaded, try again after a delay

        const interval = setInterval(() => {

          checkVideoDuration().then((loaded) => {

            if (loaded) {

              clearInterval(interval);

            }

          });

        }, 200);



        // Stop trying after 5 seconds

        setTimeout(() => {

          clearInterval(interval);

          setIsLoading(false);

        }, 5000);

      }

    });

  }, []);



  const handleStatusUpdate = (status: AVPlaybackStatus) => {

    if (status.isLoaded) {

      const currentSeconds = status.positionMillis / 1000;

      setCurrentTime(currentSeconds);

      setIsPlaying(status.isPlaying || false);

      

      // Get duration when available

      if (status.durationMillis && videoDuration === 0) {

        const durationSeconds = status.durationMillis / 1000;

        setVideoDuration(durationSeconds);

        const initialEnd = Math.min(5, durationSeconds);

        setTrimEnd(initialEnd);

        setIsLoading(false);

      }

      

      // In preview mode, loop within trim range

      if (isPreviewMode && status.isLoaded && status.isPlaying) {

        if (currentSeconds >= trimEnd - 0.1) { // Small buffer to prevent flicker

          videoRef.current?.setPositionAsync(trimStart * 1000);

        }

      }

    }

  };



  const handleStartChange = (value: number) => {

    if (videoDuration === 0) return;

    const newStart = Math.max(0, Math.min(value, Math.max(0, trimEnd - MIN_LENGTH)));

    setTrimStart(newStart);

    // Update video position

    if (videoRef.current && !isPreviewMode) {

      videoRef.current.setPositionAsync(newStart * 1000).catch(() => {});

    }

  };



  const handleEndChange = (value: number) => {

    if (videoDuration === 0) return;

    const newEnd = Math.min(videoDuration, Math.max(value, trimStart + MIN_LENGTH));

    setTrimEnd(newEnd);

    // Update video position

    if (videoRef.current && !isPreviewMode) {

      videoRef.current.setPositionAsync(newEnd * 1000).catch(() => {});

    }

  };

  

  const handleTogglePreview = async () => {

    if (!isPreviewMode) {

      // Enter preview mode: set video to trim start and play

      setIsPreviewMode(true);

      if (videoRef.current) {

        await videoRef.current.setPositionAsync(trimStart * 1000);

        await videoRef.current.playAsync();

      }

    } else {

      // Exit preview mode: pause and reset

      setIsPreviewMode(false);

      if (videoRef.current) {

        await videoRef.current.pauseAsync();

        await videoRef.current.setPositionAsync(trimStart * 1000);

      }

    }

  };



  const formatTime = (seconds: number) => {

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;

  };



  const handleNext = () => {

    const length = trimEnd - trimStart;

    

    if (length < MIN_LENGTH) {

      Alert.alert(

        "Clip too short",

        `Please select at least ${MIN_LENGTH} seconds of video.`

      );

      return;

    }

    if (length > MAX_LENGTH) {

      Alert.alert(

        "Clip too long",

        `For best results, use ${MAX_LENGTH} seconds or less.`

      );

      return;

    }



    navigation.navigate("StylePicker", {

      videoUri,

      trimStart,

      trimEnd,

    });

  };



  const clipLength = trimEnd - trimStart;

  const isValidLength = clipLength >= MIN_LENGTH && clipLength <= MAX_LENGTH;



  return (

    <View style={styles.container}>

      <StatusBar hidden />

      

      {/* Full screen video */}

      <View style={styles.videoContainer}>

        <Video

          ref={videoRef}

          source={{ uri: videoUri }}

          style={styles.video}

          resizeMode={ResizeMode.COVER}

          shouldPlay={isPreviewMode}

          isLooping={false}

          onPlaybackStatusUpdate={handleStatusUpdate}

        />

        

        {/* Overlay with controls */}

        <View style={styles.overlay}>

          {/* Top bar */}

          <View style={styles.topBar}>

            <TouchableOpacity

              style={styles.backButton}

              onPress={() => navigation.goBack()}

            >

              <Text style={styles.backButtonText}>← Back</Text>

            </TouchableOpacity>

            <Text style={styles.title}>Select 5–10 seconds</Text>

            <View style={{ width: 60 }} />

          </View>



          {/* Bottom controls */}

          <View style={styles.bottomControls}>

            <ScrollView

              style={styles.scrollView}

              contentContainerStyle={styles.scrollContent}

              showsVerticalScrollIndicator={false}

            >

              {isLoading ? (

                <Text style={styles.timeDisplay}>Loading video...</Text>

              ) : (

                <>

                  <Text style={styles.timeDisplay}>

                    {formatTime(trimStart)} - {formatTime(trimEnd)} ({formatTime(clipLength)})

                  </Text>



                  {/* Start slider */}

                  {videoDuration > 0 && (

                    <View style={styles.sliderContainer}>

                      <Text style={styles.sliderLabel}>Start: {formatTime(trimStart)}</Text>

                      <Slider

                        style={styles.slider}

                        minimumValue={0}

                        maximumValue={Math.max(0.1, Math.max(0, trimEnd - MIN_LENGTH))}

                        value={trimStart}

                        onValueChange={handleStartChange}

                        minimumTrackTintColor="#6366f1"

                        maximumTrackTintColor="#e5e7eb"

                        thumbTintColor="#6366f1"

                      />

                    </View>

                  )}



                  {/* End slider */}

                  {videoDuration > 0 && (

                    <View style={styles.sliderContainer}>

                      <Text style={styles.sliderLabel}>End: {formatTime(trimEnd)}</Text>

                      <Slider

                        style={styles.slider}

                        minimumValue={Math.max(trimStart + MIN_LENGTH, 0.1)}

                        maximumValue={Math.max(videoDuration, 0.1)}

                        value={trimEnd}

                        onValueChange={handleEndChange}

                        minimumTrackTintColor="#6366f1"

                        maximumTrackTintColor="#e5e7eb"

                        thumbTintColor="#6366f1"

                      />

                    </View>

                  )}



                  {/* Validation message */}

                  {!isValidLength && (

                    <Text style={styles.validationText}>

                      {clipLength < MIN_LENGTH

                        ? `Select at least ${MIN_LENGTH} seconds`

                        : `Select no more than ${MAX_LENGTH} seconds`}

                    </Text>

                  )}



                  {/* Next button - moved up for visibility */}

                  <TouchableOpacity

                    style={[styles.nextButton, (!isValidLength || isLoading || isPreviewMode) && styles.nextButtonDisabled]}

                    onPress={handleNext}

                    disabled={!isValidLength || isLoading || isPreviewMode}

                  >

                    <Text style={styles.nextButtonText}>Next: Choose Style</Text>

                  </TouchableOpacity>



                  {/* Preview button - below Next button */}

                  {isValidLength && (

                    <TouchableOpacity

                      style={[styles.previewButton, isPreviewMode && styles.previewButtonActive]}

                      onPress={handleTogglePreview}

                    >

                      <Text style={styles.previewButtonText}>

                        {isPreviewMode ? "⏸️ Exit Preview" : "▶️ Preview Trimmed Video"}

                      </Text>

                    </TouchableOpacity>

                  )}

                </>

              )}

            </ScrollView>

          </View>

        </View>

      </View>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#000",

  },

  videoContainer: {

    width: SCREEN_WIDTH,

    height: SCREEN_HEIGHT,

    position: "relative",

  },

  video: {

    width: "100%",

    height: "100%",

  },

  overlay: {

    position: "absolute",

    top: 0,

    left: 0,

    right: 0,

    bottom: 0,

    justifyContent: "space-between",

    backgroundColor: "rgba(0, 0, 0, 0.3)",

  },

  topBar: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingTop: Platform.OS === "ios" ? 50 : 20,

    paddingHorizontal: 20,

    paddingBottom: 20,

  },

  backButton: {

    backgroundColor: "rgba(255, 255, 255, 0.9)",

    paddingHorizontal: 16,

    paddingVertical: 8,

    borderRadius: 20,

  },

  backButtonText: {

    fontSize: 16,

    fontWeight: "600",

    color: "#111827",

  },

  title: {

    fontSize: 18,

    fontWeight: "700",

    color: "#fff",

    textAlign: "center",

  },

  bottomControls: {

    backgroundColor: "rgba(0, 0, 0, 0.9)",

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    maxHeight: SCREEN_HEIGHT * 0.55,

    minHeight: 320,

  },

  scrollView: {

    flex: 1,

  },

  scrollContent: {

    paddingHorizontal: 20,

    paddingTop: 24,

    paddingBottom: Platform.OS === "ios" ? 80 : 60,

  },

  timeDisplay: {

    fontSize: 20,

    fontWeight: "700",

    color: "#fff",

    textAlign: "center",

    marginBottom: 20,

  },

  sliderContainer: {

    marginBottom: 16,

  },

  sliderLabel: {

    fontSize: 14,

    fontWeight: "600",

    color: "#fff",

    marginBottom: 8,

  },

  slider: {

    width: "100%",

    height: 40,

  },

  validationText: {

    fontSize: 14,

    color: "#fbbf24",

    textAlign: "center",

    marginBottom: 12,

  },

  previewButton: {

    backgroundColor: "#10b981",

    paddingVertical: 14,

    borderRadius: 12,

    alignItems: "center",

    marginTop: 12,

    marginBottom: 8,

  },

  previewButtonActive: {

    backgroundColor: "#ef4444",

  },

  previewButtonText: {

    color: "#fff",

    fontSize: 16,

    fontWeight: "600",

  },

  nextButton: {

    backgroundColor: "#6366f1",

    paddingVertical: 16,

    borderRadius: 12,

    alignItems: "center",

    marginTop: 8,

    marginBottom: 4,

  },

  nextButtonDisabled: {

    backgroundColor: "#9ca3af",

    opacity: 0.5,

  },

  nextButtonText: {

    color: "#fff",

    fontSize: 18,

    fontWeight: "700",

  },

});
