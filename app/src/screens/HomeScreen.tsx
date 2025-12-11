import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../navigation/types";



type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;



const PLANS = [

  {

    id: "free",

    name: "Free",

    price: "$0",

    tagline: "Try the magic",

    features: ["3 videos / month", "Watermark", "Basic power set"],

    highlight: false,

  },

  {

    id: "basic",

    name: "Basic",

    price: "$4.99",

    tagline: "Casual creators",

    features: ["10 videos / month", "HD export", "Basic & Enhanced powers"],

    highlight: true,

  },

  {

    id: "enhanced",

    name: "Enhanced",

    price: "$9.99",

    tagline: "Frequent sharers",

    features: ["20 videos / month", "No watermark", "Enhanced powers"],

    highlight: false,

  },

  {

    id: "pro",

    name: "Pro",

    price: "$19.99",

    tagline: "Content creators",

    features: ["50 videos / month", "Priority rendering", "All Pro powers"],

    highlight: false,

  },

];



export default function HomeScreen() {

  const navigation = useNavigation<NavigationProp>();



  const handleCreate = () => {

    navigation.navigate("Upload");

  };



  return (

    <ScrollView style={styles.container}>

      {/* HERO SECTION */}

      <View style={styles.hero}>

        <Text style={styles.badge}>BETA ACCESS</Text>

        <Text style={styles.title}>Turn your pet into a hero.</Text>

        <Text style={styles.subtitle}>

          Upload a short clip, pick a style, and PetVision AI creates a shareable,

          cinematic video starring your pet.

        </Text>



        <TouchableOpacity style={styles.primaryButton} onPress={handleCreate}>

          <Text style={styles.primaryButtonText}>✨ Create a Pawesome Video</Text>

        </TouchableOpacity>



        <Text style={styles.helperText}>Just 5–10 seconds of footage is enough.</Text>

      </View>



      {/* PRICING SECTION */}

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>Choose your vibe</Text>

        <Text style={styles.sectionSubtitle}>

          Start free. Upgrade only if your pet becomes a superstar.

        </Text>



        <View style={styles.plansGrid}>

          {PLANS.map((plan) => (

            <View

              key={plan.id}

              style={[styles.planCard, plan.highlight && styles.planCardHighlight]}

            >

              <Text style={styles.planName}>{plan.name}</Text>

              <Text style={styles.planPrice}>{plan.price}</Text>

              <Text style={styles.planTagline}>{plan.tagline}</Text>



              {plan.features.map((f) => (

                <Text key={f} style={styles.planFeature}>

                  • {f}

                </Text>

              ))}



              {plan.id === "free" && (

                <Text style={styles.planTag}>Best for trying it out</Text>

              )}

              {plan.id === "basic" && (

                <Text style={styles.planTagPrimary}>Recommended</Text>

              )}

            </View>

          ))}

        </View>

      </View>



      {/* FOOTER CTA */}

      <View style={styles.footer}>

        <Text style={styles.footerText}>

          No long videos needed. We trim and enhance the best 5–10 seconds of your clip.

        </Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleCreate}>

          <Text style={styles.secondaryButtonText}>Start with a free video</Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );

}



const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#0f172a" },

  hero: {

    paddingHorizontal: 20,

    paddingTop: 48,

    paddingBottom: 32,

  },

  badge: {

    alignSelf: "flex-start",

    backgroundColor: "#22c55e33",

    color: "#bbf7d0",

    paddingHorizontal: 10,

    paddingVertical: 4,

    borderRadius: 999,

    fontSize: 12,

    marginBottom: 12,

  },

  title: {

    fontSize: 28,

    fontWeight: "800",

    color: "#f9fafb",

    marginBottom: 8,

  },

  subtitle: {

    fontSize: 14,

    color: "#cbd5f5",

    marginBottom: 20,

  },

  primaryButton: {

    backgroundColor: "#6366f1",

    borderRadius: 999,

    paddingVertical: 14,

    alignItems: "center",

    marginBottom: 8,

  },

  primaryButtonText: {

    color: "#fff",

    fontSize: 16,

    fontWeight: "700",

  },

  helperText: {

    fontSize: 12,

    color: "#9ca3af",

    marginTop: 4,

  },

  section: {

    paddingHorizontal: 20,

    paddingVertical: 24,

    backgroundColor: "#020617",

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    marginTop: 12,

  },

  sectionTitle: {

    fontSize: 18,

    fontWeight: "700",

    color: "#e5e7eb",

    marginBottom: 4,

  },

  sectionSubtitle: {

    fontSize: 13,

    color: "#9ca3af",

    marginBottom: 16,

  },

  plansGrid: {

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

  },

  planCard: {

    width: "48%",

    backgroundColor: "#020617",

    borderRadius: 16,

    padding: 12,

    marginBottom: 12,

    borderWidth: 1,

    borderColor: "#1f2937",

  },

  planCardHighlight: {

    borderColor: "#6366f1",

    backgroundColor: "#020617",

  },

  planName: {

    fontSize: 14,

    fontWeight: "700",

    color: "#e5e7eb",

  },

  planPrice: {

    fontSize: 20,

    fontWeight: "800",

    color: "#facc15",

    marginVertical: 4,

  },

  planTagline: {

    fontSize: 12,

    color: "#9ca3af",

    marginBottom: 8,

  },

  planFeature: {

    fontSize: 11,

    color: "#9ca3af",

  },

  planTag: {

    marginTop: 8,

    fontSize: 11,

    color: "#22c55e",

  },

  planTagPrimary: {

    marginTop: 8,

    fontSize: 11,

    color: "#6366f1",

  },

  footer: {

    paddingHorizontal: 20,

    paddingBottom: 32,

    paddingTop: 8,

    backgroundColor: "#020617",

  },

  footerText: {

    fontSize: 12,

    color: "#9ca3af",

    marginBottom: 12,

    textAlign: "center",

  },

  secondaryButton: {

    borderRadius: 999,

    paddingVertical: 12,

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#4b5563",

  },

  secondaryButtonText: {

    color: "#e5e7eb",

    fontSize: 14,

    fontWeight: "600",

  },

});
