import React from "react";

import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import { Video, ResizeMode } from "expo-av";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";



type Props = NativeStackScreenProps<RootStackParamList, "Result">;



export default function ResultScreen({ route, navigation }: Props) {

  const { outputVideoUrl } = route.params;



  return (

    <View style={styles.container}>

      <TouchableOpacity

        style={styles.backBar}

        onPress={() => navigation.goBack()}

      >

        <Text style={styles.backBarText}>← Back</Text>

      </TouchableOpacity>



      <Text style={styles.title}>Let the Pawesomeness Begin!!!</Text>



      <Video

        source={{ uri: outputVideoUrl }}

        style={styles.video}

        useNativeControls

        resizeMode={ResizeMode.CONTAIN}

      />



      <View style={styles.buttonRow}>

        <Button

          title="Back"

          onPress={() => navigation.goBack()}   // 👈 just goes back to Generating

        />

        <View style={{ height: 8 }} />

        <Button

          title="Home"

          onPress={() =>

            navigation.reset({ index: 0, routes: [{ name: "Home" }] })

          }

        />

      </View>

    </View>

  );

}



const styles = StyleSheet.create({

  container: { flex: 1, padding: 16, gap: 16 },

  backBar: {

    backgroundColor: "#f3f4f6",

    paddingVertical: 12,

    paddingHorizontal: 16,

    borderRadius: 8,

    marginBottom: 8,

  },

  backBarText: {

    fontSize: 16,

    fontWeight: "600",

    color: "#111827",

  },

  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },

  video: { width: "100%", aspectRatio: 9 / 16, backgroundColor: "#000" },

  buttonRow: {

    marginTop: 16,

    gap: 8,

  },

});

