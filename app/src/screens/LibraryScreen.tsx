import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Job, listJobs } from "../api/client";



const LibraryScreen: React.FC = () => {

  const [jobs, setJobs] = useState<Job[]>([]);

  const navigation = useNavigation<any>();



  useEffect(() => {

    let cancelled = false;



    const fetchJobs = async () => {

      try {

        const data = await listJobs();

        if (!cancelled) setJobs(data);

      } catch (e) {

        console.warn("Failed to fetch jobs", e);

      }

    };



    fetchJobs();

    const interval = setInterval(fetchJobs, 15000);

    return () => {

      cancelled = true;

      clearInterval(interval);

    };

  }, []);



  const renderItem = ({ item }: { item: Job }) => {

    const date = new Date(item.createdAt);

    const dateLabel = date.toLocaleString();



    const title = item.petName

      ? `${item.petName} • ${item.style}`

      : item.style;



    return (

      <Pressable

        style={styles.card}

        onPress={() => navigation.navigate("JobStatus", { jobId: item.jobId })}

      >

        {item.thumbnailUrl ? (

          <Image source={{ uri: item.thumbnailUrl }} style={styles.thumb} />

        ) : (

          <View style={[styles.thumb, styles.thumbPlaceholder]}>

            <Text style={styles.thumbEmoji}>🐾</Text>

          </View>

        )}

        <View style={{ flex: 1 }}>

          <Text style={styles.cardTitle}>{title}</Text>

          <Text style={styles.cardSubtitle}>{dateLabel}</Text>

          <Text

            style={[

              styles.statusBadge,

              item.status === "COMPLETED" && styles.statusDone,

              item.status === "FAILED" && styles.statusFailed,

            ]}

          >

            {item.status}

          </Text>

        </View>

      </Pressable>

    );

  };



  return (

    <View style={styles.container}>

      <Text style={styles.title}>My Transformations</Text>

      <FlatList

        data={jobs}

        keyExtractor={(item) => item.jobId}

        renderItem={renderItem}

        contentContainerStyle={{ paddingVertical: 8 }}

        ListEmptyComponent={

          <Text style={styles.emptyText}>

            No transformations yet. Start from Styles to create your first one!

          </Text>

        }

      />

    </View>

  );

};



const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#060712", padding: 16 },

  title: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 12 },

  card: {

    flexDirection: "row",

    gap: 12,

    padding: 10,

    borderRadius: 14,

    backgroundColor: "rgba(20,20,35,0.96)",

    marginBottom: 10,

  },

  thumb: {

    width: 72,

    height: 72,

    borderRadius: 12,

    backgroundColor: "#111",

  },

  thumbPlaceholder: {

    alignItems: "center",

    justifyContent: "center",

  },

  thumbEmoji: {

    fontSize: 30,

  },

  cardTitle: {

    fontSize: 14,

    fontWeight: "600",

    color: "#fff",

  },

  cardSubtitle: {

    fontSize: 11,

    color: "rgba(255,255,255,0.7)",

    marginTop: 2,

  },

  statusBadge: {

    marginTop: 6,

    alignSelf: "flex-start",

    fontSize: 11,

    fontWeight: "700",

    color: "#FFB347",

  },

  statusDone: {

    color: "#3ECF8E",

  },

  statusFailed: {

    color: "#FF6B6B",

  },

  emptyText: {

    marginTop: 32,

    textAlign: "center",

    color: "rgba(255,255,255,0.7)",

  },

});



export default LibraryScreen;

