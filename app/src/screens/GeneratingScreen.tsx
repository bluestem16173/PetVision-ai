import React, { useEffect } from "react";

import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

import { useJob } from "../hooks/useJobs";



type Props = NativeStackScreenProps<RootStackParamList, "Generating">;



export default function GeneratingScreen({ route, navigation }: Props) {

  const { jobId } = route.params;

  const { data, status, error } = useJob(jobId);



  useEffect(() => {

    if (!data) return;

    if (data.status === "COMPLETED" && data.outputVideoUrl) {

      navigation.replace("JobStatus", { jobId: data.jobId });

    }

  }, [data, navigation]);



  if (status === "pending") {

    return (

      <View style={styles.container}>

        <ActivityIndicator size="large" />

        <Text style={styles.text}>Starting the magic...</Text>

      </View>

    );

  }



  if (status === "error") {

    return (

      <View style={styles.container}>

        <Text style={styles.text}>Error: {(error as Error).message}</Text>

      </View>

    );

  }



  return (

    <View style={styles.container}>

      <ActivityIndicator size="large" />

      <Text style={styles.text}>Teaching your pet new tricks...</Text>

      <Text style={styles.subText}>Status: {data?.status}</Text>

    </View>

  );

}



const styles = StyleSheet.create({

  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },

  text: { fontSize: 18, marginBottom: 8 },

  subText: { fontSize: 14, color: "#555" },

});

