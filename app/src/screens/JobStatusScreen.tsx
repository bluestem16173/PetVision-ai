import React, { useEffect, useState } from "react";

import {

  View,

  Text,

  StyleSheet,

  ActivityIndicator,

  Pressable,

  Image,

} from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";

import { Job, getJob } from "../api/client";

import * as FileSystem from "expo-file-system";

import * as MediaLibrary from "expo-media-library";

import * as Sharing from "expo-sharing";



type RootStackParamList = {

  JobStatus: { jobId: string };

};



type JobStatusRouteProp = RouteProp<RootStackParamList, "JobStatus">;



const POLL_INTERVAL = 3000;



const JobStatusScreen: React.FC = () => {

  const route = useRoute<JobStatusRouteProp>();

  const { jobId } = route.params;



  const [job, setJob] = useState<Job | null>(null);

  const [isDownloading, setIsDownloading] = useState(false);



  useEffect(() => {

    let cancelled = false;



    const poll = async () => {

      try {

        const data = await getJob(jobId);

        if (cancelled) return;

        setJob(data);



        if (data.status === "COMPLETED" || data.status === "FAILED") {

          return; // stop polling

        }

        setTimeout(poll, POLL_INTERVAL);

      } catch (err) {

        console.warn("Failed to fetch job", err);

      }

    };



    poll();

    return () => {

      cancelled = true;

    };

  }, [jobId]);



  const handleSaveToDevice = async () => {

    if (!job?.outputVideoUrl) return;

    try {

      setIsDownloading(true);



      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {

        alert("Permission required to save media.");

        return;

      }



      const fileUri = `${FileSystem.documentDirectory}petvision_${job.jobId}.mp4`;



      const downloadRes = await FileSystem.downloadAsync(

        job.outputVideoUrl,

        fileUri

      );

      await MediaLibrary.saveToLibraryAsync(downloadRes.uri);



      alert("Saved to your gallery 👌");

    } catch (e) {

      console.warn("Save failed", e);

      alert("Could not save. Try again.");

    } finally {

      setIsDownloading(false);

    }

  };



  const handleShare = async () => {

    if (!job?.outputVideoUrl) return;

    try {

      const canShare = await Sharing.isAvailableAsync();

      if (!canShare) {

        alert("Sharing is not available on this device.");

        return;

      }



      await Sharing.shareAsync(job.outputVideoUrl);

    } catch (e) {

      console.warn("Share failed", e);

    }

  };



  if (!job) {

    return (

      <View style={styles.container}>

        <ActivityIndicator />

        <Text style={styles.text}>Loading transformation…</Text>

      </View>

    );

  }



  const isDone = job.status === "COMPLETED";



  const title = job.petName ? `${job.petName} • ${job.style}` : job.style;



  return (

    <View style={styles.container}>

      <Text style={styles.title}>Transformation Status</Text>

      <Text style={styles.text}>{title}</Text>

      <Text style={styles.statusText}>Status: {job.status}</Text>



      {!isDone && job.status !== "FAILED" && (

        <View style={styles.statusBox}>

          <ActivityIndicator />

          <Text style={styles.text}>We're working on your pet's magic…</Text>

        </View>

      )}



      {job.status === "FAILED" && (

        <Text style={styles.errorText}>

          Something went wrong. Please try again.

        </Text>

      )}



      {isDone && (

        <>

          {job.thumbnailUrl && (

            <Image

              source={{ uri: job.thumbnailUrl }}

              style={styles.thumbnail}

            />

          )}



          <Text style={styles.doneText}>Done! 🎉</Text>

          <Text style={styles.text}>

            You can now save or share this transformation.

          </Text>



          <View style={styles.buttonRow}>

            <Pressable

              style={[styles.button, isDownloading && styles.buttonDisabled]}

              onPress={handleSaveToDevice}

              disabled={isDownloading}

            >

              <Text style={styles.buttonText}>

                {isDownloading ? "Saving…" : "Save to device"}

              </Text>

            </Pressable>



            <Pressable style={styles.secondaryButton} onPress={handleShare}>

              <Text style={styles.secondaryButtonText}>Share</Text>

            </Pressable>

          </View>

        </>

      )}

    </View>

  );

};



const styles = StyleSheet.create({

  container: { flex: 1, padding: 20, backgroundColor: "#060712" },

  title: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 12 },

  text: { color: "rgba(255,255,255,0.85)", fontSize: 14 },

  statusText: {

    marginTop: 6,

    color: "#FFB347",

    fontSize: 14,

    fontWeight: "600",

  },

  statusBox: { marginTop: 20, alignItems: "center", gap: 8 },

  errorText: { marginTop: 16, color: "#FF6B6B", fontWeight: "600" },

  doneText: { marginTop: 16, color: "#3ECF8E", fontSize: 16, fontWeight: "700" },

  thumbnail: {

    marginTop: 16,

    width: "100%",

    height: 200,

    borderRadius: 16,

    backgroundColor: "#111",

  },

  buttonRow: {

    flexDirection: "row",

    marginTop: 16,

    gap: 12,

  },

  button: {

    flex: 1,

    backgroundColor: "#3ECF8E",

    borderRadius: 999,

    paddingVertical: 10,

    alignItems: "center",

  },

  buttonDisabled: { opacity: 0.6 },

  buttonText: {

    color: "#060712",

    fontWeight: "700",

    fontSize: 14,

  },

  secondaryButton: {

    flex: 1,

    borderRadius: 999,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.4)",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 10,

  },

  secondaryButtonText: {

    color: "#ffffff",

    fontWeight: "600",

    fontSize: 14,

  },

});



export default JobStatusScreen;
