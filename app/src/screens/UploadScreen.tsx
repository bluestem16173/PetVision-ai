import React, { useState } from "react";

import { View, Text, Button, StyleSheet, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

import { useMedia } from "../context/MediaContext";



type Props = NativeStackScreenProps<RootStackParamList, "Upload">;



export default function UploadScreen({ navigation }: Props) {

  const { videoUri, setVideoUri } = useMedia();



  const handleSelectVideo = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {

      Alert.alert("Permission required", "We need access to your gallery to pick videos.");

      return;

    }



    const result = await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ImagePicker.MediaTypeOptions.Videos,

    });



    if (!result.canceled) {

      const uri = result.assets[0].uri;

      setVideoUri(uri);

      navigation.navigate("Trim", { videoUri: uri });

    }

  };



  const goNext = () => {

    if (!videoUri) {

      Alert.alert("No video", "Please pick a video first.");

      return;

    }

    navigation.navigate("Trim", { videoUri });

  };



  return (

    <View style={styles.container}>

      <Text style={styles.title}>Upload your pet video</Text>

      <Text style={styles.text}>Choose a short clip (5–15 seconds works best).</Text>



      <Button title="Pick from gallery" onPress={handleSelectVideo} />



      {videoUri && (

        <Text style={styles.selected}>

          ✅ Video selected

        </Text>

      )}



      <View style={{ height: 16 }} />



      <Button title="Next: Choose style" onPress={goNext} disabled={!videoUri} />

    </View>

  );

}



const styles = StyleSheet.create({

  container: { flex: 1, padding: 16, justifyContent: "center" },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8, textAlign: "center" },

  text: { fontSize: 14, color: "#6b7280", textAlign: "center", marginBottom: 24 },

  selected: { marginTop: 12, textAlign: "center", color: "#16a34a", fontWeight: "600" },

});

