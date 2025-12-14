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

import { Video, ResizeMode } from "expo-av";

import { Job, getJob } from "../api/client";

import * as FileSystem from "expo-file-system";

import * as MediaLibrary from "expo-media-library";

import * as Sharing from "expo-sharing";



type RootStackParamList = {

  JobStatus: { jobId: string };

};



type JobStatusRouteProp = RouteProp<RootStackParamList, "JobStatus">;



const POLL_INTERVAL = 3000;



async function saveVideoToPhone(outputVideoUrl: string, jobId: string) {

  // 1) ask permission

  const perm = await MediaLibrary.requestPermissionsAsync();

  if (!perm.granted) {

    throw new Error("Photos permission not granted");

  }



  // 2) download to local app storage

  const localUri = `${FileSystem.documentDirectory}petvision_${jobId}.mp4`;



  const download = await FileSystem.downloadAsync(outputVideoUrl, localUri);



  // 3) create asset in gallery

  const asset = await MediaLibrary.createAssetAsync(download.uri);



  // 4) optional: put it in a PetVision album

  const albumName = "PetVision";

  const album = await MediaLibrary.getAlbumAsync(albumName);

  if (album) {

    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);

  } else {

    await MediaLibrary.createAlbumAsync(albumName, asset, false);

  }



  return asset;

}



const JobStatusScreen: React.FC = () => {

  const route = useRoute<JobStatusRouteProp>();

  const { jobId } = route.params;



  const [job, setJob] = useState<Job | null>(null);

  const [isDownloading, setIsDownloading] = useState(false);

  const [progress, setProgress] = useState(10);



  useEffect(() => {

    if (!job) return;

    if (job.status === "QUEUED") setProgress(20);

    if (job.status === "PROCESSING") setProgress(60);

    if (job.status === "COMPLETED") setProgress(100);

  }, [job?.status]);



  useEffect(() => {

    if (job?.status === "COMPLETED") return;

    const t = setInterval(() => {

      setProgress((p) => Math.min(p + 1, 95));

    }, 800);

    return () => clearInterval(t);

  }, [job?.status]);



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



      await saveVideoToPhone(job.outputVideoUrl!, job.jobId);

      alert("Saved to your Photos/Gallery ✅");

    } catch (e: any) {

      alert(e?.message ?? "Save failed");

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

        <View style={styles.doneContainer}>

          {/* Top 50%: Video box */}

          <View style={styles.videoBox}>

            <Video

              source={{ uri: job.outputVideoUrl! }}

              style={styles.video}

              useNativeControls

              resizeMode={ResizeMode.CONTAIN}

              shouldPlay={false}

              isLooping={false}

            />

          </View>



          {/* Bottom 50%: Actions */}

          <View style={styles.actionsBox}>

            <Text style={styles.doneTitle}>Done! 🎉</Text>

            <Text style={styles.doneSubtitle}>

              Preview it first—then save it to your phone or share it.

            </Text>



            <View style={styles.metaRow}>

              <Text style={styles.metaText}>

                {job.petName ? `${job.petName} • ` : ""}{job.style}

              </Text>

              <Text style={styles.metaText}>{job.status}</Text>

            </View>



            <View style={styles.buttonRow}>

              <Pressable

                style={[styles.primaryBtn, isDownloading && styles.btnDisabled]}

                onPress={handleSaveToDevice}

                disabled={isDownloading}

              >

                <Text style={styles.primaryBtnText}>

                  {isDownloading ? "Saving…" : "Save to device"}

                </Text>

              </Pressable>



              <Pressable style={styles.secondaryBtn} onPress={handleShare}>

                <Text style={styles.secondaryBtnText}>Share</Text>

              </Pressable>

            </View>



            <Text style={styles.hint}>

              Tip: Saved videos go to your gallery (and the "PetVision" album if enabled).

            </Text>

          </View>

        </View>

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

  statusBox: { marginTop: 20, alignItems: "center", marginBottom: 8 },

  errorText: { marginTop: 16, color: "#FF6B6B", fontWeight: "600" },

  doneContainer: {

    flex: 1,

    marginTop: 14,

  },

  videoBox: {

    flex: 1, // 50%

    marginTop: 12,

    marginHorizontal: 4,

    borderRadius: 18,

    overflow: "hidden",

    backgroundColor: "#111",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.10)",

  },

  video: {

    width: "100%",

    height: "100%",

  },

  actionsBox: {

    flex: 1, // 50%

    paddingHorizontal: 4,

    paddingBottom: 12,

    marginTop: 14,

  },

  doneTitle: {

    fontSize: 18,

    fontWeight: "800",

    color: "#ffffff",

    marginBottom: 10,

  },

  doneSubtitle: {

    fontSize: 13,

    color: "rgba(255,255,255,0.75)",

    marginBottom: 10,

  },

  metaRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 8,

    paddingHorizontal: 10,

    borderRadius: 12,

    backgroundColor: "rgba(255,255,255,0.06)",

    marginBottom: 10,

  },

  metaText: {

    fontSize: 12,

    fontWeight: "600",

    color: "rgba(255,255,255,0.85)",

  },

  buttonRow: {

    flexDirection: "row",

    marginTop: 6,

    marginBottom: 12,

  },

  primaryBtn: {

    flex: 1,

    backgroundColor: "#3ECF8E",

    borderRadius: 999,

    paddingVertical: 12,

    alignItems: "center",

    marginRight: 12,

  },

  primaryBtnText: {

    color: "#060712",

    fontWeight: "800",

    fontSize: 14,

  },

  secondaryBtn: {

    flex: 1,

    borderRadius: 999,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.35)",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 12,

  },

  secondaryBtnText: {

    color: "#ffffff",

    fontWeight: "700",

    fontSize: 14,

  },

  btnDisabled: {

    opacity: 0.6,

  },

  hint: {

    marginTop: 2,

    fontSize: 12,

    color: "rgba(255,255,255,0.6)",

    textAlign: "center",

  },

});



export default JobStatusScreen;
