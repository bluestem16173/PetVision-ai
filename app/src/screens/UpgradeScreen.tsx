import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";



type Props = NativeStackScreenProps<RootStackParamList, "Upgrade">;



export default function UpgradeScreen({ route }: Props) {

  const { requestedTier } = route.params;



  return (

    <View style={styles.container}>

      <Text style={styles.title}>Upgrade Your Plan</Text>

      {requestedTier && (

        <Text style={styles.subtitle}>

          This power requires a {requestedTier} plan or higher.

        </Text>

      )}

      <Text style={styles.text}>

        Upgrade to unlock more powerful features for your pet videos!

      </Text>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 20,

    justifyContent: "center",

    alignItems: "center",

  },

  title: {

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 16,

  },

  subtitle: {

    fontSize: 16,

    color: "#6b7280",

    marginBottom: 24,

    textAlign: "center",

  },

  text: {

    fontSize: 14,

    color: "#9ca3af",

    textAlign: "center",

  },

});


