import React, { useState } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";

import { Video } from "expo-av";

import { Picker } from "@react-native-picker/picker";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";



type Props = NativeStackScreenProps<RootStackParamList, "Trim">;



const trimPresets = [

  { label: "Full clip", value: "full" },

  { label: "0–10 sec (best for fast styles)", value: "0-10" },

  { label: "10–20 sec", value: "10-20" },

  { label: "Custom (manual)", value: "custom" },

];



export default function TrimScreen({ navigation, route }: Props) {

  const videoUri = route.params?.videoUri;

  const [preset, setPreset] = useState("0-10");



  const onCreateStyles = () => {

    navigation.navigate("StylePicker", { videoUri /* plus trim range */ });

  };



  return (

    <View style={styles.screen}>

      {/* Video Area */}

      <View style={styles.videoArea}>

        <View style={styles.playerCard}>

          <Video

            source={{ uri: videoUri }}

            style={styles.video}

            resizeMode="contain"

            useNativeControls

            shouldPlay={false}

          />

        </View>

      </View>



      {/* Controls Sheet */}

      <View style={styles.controlsSheet}>

        <Text style={styles.sheetTitle}>Trim Video</Text>

        <Text style={styles.sheetSub}>Select a preset or customize manually</Text>



        <Text style={styles.controlLabel}>Preset</Text>

        <View style={styles.controlBox}>

          <Picker

            selectedValue={preset}

            onValueChange={(v) => setPreset(v)}

            dropdownIconColor="#111827"

            style={styles.picker}

          >

            {trimPresets.map((p) => (

              <Picker.Item key={p.value} label={p.label} value={p.value} />

            ))}

          </Picker>

        </View>



        <Pressable style={styles.primaryBtn} onPress={onCreateStyles}>

          <Text style={styles.primaryBtnText}>Create Styles</Text>

        </Pressable>

      </View>

    </View>

  );

}



const styles = StyleSheet.create({

  screen: { flex: 1, backgroundColor: "#0B0B10" }, // dark behind video

  videoArea: { flex: 3, padding: 12 },

  playerCard: {

    width: "100%",

    height: "100%",

    borderRadius: 16,

    overflow: "hidden",

    backgroundColor: "#111",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.08)",

  },

  video: {

    width: "100%",

    height: "100%",

  },

  controlsSheet: {

    flex: 1,

    backgroundColor: "#F7F7FB",

    borderTopLeftRadius: 22,

    borderTopRightRadius: 22,

    padding: 16,

    borderTopWidth: 1,

    borderColor: "rgba(0,0,0,0.08)",

  },

  sheetTitle: { color: "#111827", fontSize: 16, fontWeight: "800" },

  sheetSub: { color: "#4B5563", fontSize: 12, marginTop: 4 },

  controlLabel: { color: "#111827", fontWeight: "700", marginTop: 12, marginBottom: 6 },

  controlBox: {

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    borderWidth: 1,

    borderColor: "rgba(17,24,39,0.10)",

    overflow: "hidden",

  },

  picker: {

    color: "#111827",

  },

  primaryBtn: {

    marginTop: 14,

    backgroundColor: "#111827",

    borderRadius: 999,

    paddingVertical: 12,

    alignItems: "center",

  },

  primaryBtnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 15 },

});
