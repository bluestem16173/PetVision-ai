import React, { useState } from "react";

import {

  View,

  Text,

  StyleSheet,

  TouchableOpacity,

  TextInput,

  ScrollView,

  Alert,

  ActivityIndicator,

  LayoutAnimation,

  Platform,

  UIManager,

} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../navigation/types";

import { useCreateJob } from "../hooks/useJobs";

import { JobStyle, PowerTierId, PowerSelection, StyleOption, PlanId, ModeCategory } from "../types/api";

import { CURRENT_PLAN, PLAN_ACCESS } from "../config/subscriptions";

import { STYLE_CATEGORIES, OPTIONS_BY_STYLE } from "../config/styleOptions";



type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type StylePickerRouteProp = RouteProp<RootStackParamList, "StylePicker">;



// Enable LayoutAnimation on Android

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {

  UIManager.setLayoutAnimationEnabledExperimental(true);

}



/**

 * High-level styles (visual categories)

 */




/**

 * Superhero-like power options by tier.

 * Copyright-safe: all powers are described by traits, not branded characters.

 */



type PowerOption = {

  id: string;

  name: string;

  description: string;

  tier: PowerTierId;

  promptHint: string;

};



const POWER_OPTIONS: PowerOption[] = [

  // FREE (3)

  {

    id: "glow-aura",

    name: "Glow Aura",

    description: "Soft golden outline and hero lighting.",

    tier: "free",

    promptHint: "soft golden aura around the pet, gentle hero lighting",

  },

  {

    id: "speed-trail",

    name: "Speed Trail",

    description: "Blurred motion streaks behind your pet.",

    tier: "free",

    promptHint: "motion blur streaks trailing behind the pet as it moves",

  },

  {

    id: "spark-burst",

    name: "Spark Burst",

    description: "Tiny energy sparks near paws and tail.",

    tier: "free",

    promptHint: "small glowing sparks popping near paws and tail",

  },



  // BASIC (10)

  {

    id: "mini-flight-hop",

    name: "Mini Flight Hop",

    description: "Small levitation effect, just off the ground.",

    tier: "basic",

    promptHint: "subtle levitation just above the ground with gentle shadow",

  },

  {

    id: "shadow-sprint",

    name: "Shadow Sprint",

    description: "Dark motion trail behind your pet.",

    tier: "basic",

    promptHint: "dark shadowy trail stretching behind the pet as it sprints",

  },

  {

    id: "ember-paws",

    name: "Ember Paws",

    description: "Glowing embers under each paw step.",

    tier: "basic",

    promptHint: "small glowing embers under the paws with each step",

  },

  {

    id: "frost-whiskers",

    name: "Frost Whiskers",

    description: "Icy particles around face and whiskers.",

    tier: "basic",

    promptHint: "icy frost particles swirling around whiskers and fur",

  },

  {

    id: "static-charge",

    name: "Static Charge",

    description: "Blue electric pops around your pet.",

    tier: "basic",

    promptHint: "blue static electric sparks dancing around the fur",

  },

  {

    id: "wind-dash",

    name: "Wind Dash",

    description: "Circular wind rings as your pet moves.",

    tier: "basic",

    promptHint: "swirling wind rings following the pet's motion",

  },

  {

    id: "rock-armor",

    name: "Rock Armor Skin",

    description: "Stone-like patches of armor on body.",

    tier: "basic",

    promptHint: "rocky stone textures lightly overlaying the pet's body",

  },

  {

    id: "light-beam-eyes",

    name: "Light Beam Eyes",

    description: "Subtle glowing eyes, no IP risk.",

    tier: "basic",

    promptHint: "soft glowing eyes with thin light beams",

  },

  {

    id: "bubble-shield",

    name: "Bubble Shield",

    description: "Transparent energy bubble around the pet.",

    tier: "basic",

    promptHint: "transparent energy bubble surrounding the pet",

  },

  {

    id: "stretch-blur",

    name: "Stretch Motion Blur",

    description: "Elongated motion blur like stretchy limbs.",

    tier: "basic",

    promptHint: "elongated motion blur stretched from paws and tail",

  },



  // ENHANCED (20)

  {

    id: "inferno-burst",

    name: "Inferno Burst",

    description: "Flames erupt when your pet moves.",

    tier: "enhanced",

    promptHint: "fiery flames bursting briefly along the pet's motion path",

  },

  {

    id: "aqua-surge",

    name: "Aqua Surge",

    description: "Water splashes and rings around your pet.",

    tier: "enhanced",

    promptHint: "water rings and splashes forming around the pet's steps",

  },

  {

    id: "solar-flare-body",

    name: "Solar Flare Body",

    description: "Golden sunburst glow from your pet.",

    tier: "enhanced",

    promptHint: "bright golden sunburst glow radiating from the pet's body",

  },

  {

    id: "moonlight-cloak",

    name: "Moonlight Cloak",

    description: "Soft silver cloak of moonlight.",

    tier: "enhanced",

    promptHint: "soft silver cloak of moonlight draped over the pet",

  },

  {

    id: "sandstorm-swirl",

    name: "Sandstorm Swirl",

    description: "Dusty vortex around your pet's legs.",

    tier: "enhanced",

    promptHint: "dusty sand vortex swirling around the legs",

  },

  {

    id: "crystal-shards",

    name: "Crystal Shards",

    description: "Floating crystals orbit around your pet.",

    tier: "enhanced",

    promptHint: "floating translucent crystals orbiting around the pet",

  },

  {

    id: "lightning-strike-form",

    name: "Lightning Strike Form",

    description: "Small lightning arcs around body.",

    tier: "enhanced",

    promptHint: "branching lightning arcs dancing around the body",

  },

  {

    id: "mega-flight",

    name: "Mega Flight",

    description: "Stronger levitation with energy trail.",

    tier: "enhanced",

    promptHint: "pet hovering higher with faint energy trail below",

  },

  {

    id: "phasing-blur",

    name: "Phasing Blur",

    description: "Partially transparent body edges.",

    tier: "enhanced",

    promptHint: "semi-transparent edges as if partially phasing",

  },

  {

    id: "teleport-trail",

    name: "Teleport Trail",

    description: "Particles dispersing and reforming.",

    tier: "enhanced",

    promptHint: "cloud of particles breaking apart then reforming the pet",

  },

  {

    id: "iron-hide",

    name: "Iron Hide",

    description: "Metallic skin texture overlay.",

    tier: "enhanced",

    promptHint: "shiny metallic armor texture overlaying the pet's fur",

  },

  {

    id: "thorn-armor",

    name: "Thorn Armor",

    description: "Vines and thorns wrapping gently.",

    tier: "enhanced",

    promptHint: "green vines and thorns wrapping loosely around the body",

  },

  {

    id: "water-orb-shield",

    name: "Water Orb Shield",

    description: "Swirling water sphere shield.",

    tier: "enhanced",

    promptHint: "swirling orb of water rotating around the pet",

  },

  {

    id: "shadow-clone",

    name: "Shadow Clone",

    description: "Faint duplicates behind your pet.",

    tier: "enhanced",

    promptHint: "faint duplicate silhouettes trailing behind the pet",

  },

  {

    id: "echo-step",

    name: "Echo Step",

    description: "Ghostly afterimages of each step.",

    tier: "enhanced",

    promptHint: "ghostly afterimage lingering at each step position",

  },

  {

    id: "gravity-pulse",

    name: "Gravity Pulse",

    description: "Distortion waves on impact.",

    tier: "enhanced",

    promptHint: "subtle space distortion ripple on each landing",

  },

  {

    id: "arcane-runes",

    name: "Arcane Runes",

    description: "Glowing magic symbols around your pet.",

    tier: "enhanced",

    promptHint: "glowing mystic runes orbiting around the pet",

  },

  {

    id: "frost-nova-step",

    name: "Frost Nova Step",

    description: "Icy explosion when paws hit ground.",

    tier: "enhanced",

    promptHint: "small icy shockwave from the ground on each step",

  },

  {

    id: "meteor-spark",

    name: "Meteor Spark",

    description: "Tiny fireballs falling around.",

    tier: "enhanced",

    promptHint: "small fiery meteors streaking past in the background",

  },

  {

    id: "gale-wings",

    name: "Gale Wings",

    description: "Wings made from wind and clouds.",

    tier: "enhanced",

    promptHint: "semi-transparent wings made of swirling wind and clouds",

  },



  // PRO (a good handful; you can add more later)

  {

    id: "quantum-phase-shift",

    name: "Quantum Phase Shift",

    description: "Glitchy distortion around your pet.",

    tier: "pro",

    promptHint: "digital glitch distortion and shimmering edges around the pet",

  },

  {

    id: "temporal-dash",

    name: "Temporal Dash",

    description: "Time-sliced echo frames.",

    tier: "pro",

    promptHint: "time-slice echo frames of the pet in different positions",

  },

  {

    id: "cyber-neon-mode",

    name: "Cyber Neon Mode",

    description: "Neon circuitry patterns on fur.",

    tier: "pro",

    promptHint: "neon circuitry patterns glowing across the pet's body",

  },

  {

    id: "volcanic-core",

    name: "Volcanic Core",

    description: "Molten cracks with heat haze.",

    tier: "pro",

    promptHint: "molten lava cracks glowing in the fur with heat shimmer",

  },

  {

    id: "storm-fury",

    name: "Storm Fury",

    description: "Dark clouds and lightning around.",

    tier: "pro",

    promptHint: "dark storm clouds swirling with random lightning strikes",

  },

  {

    id: "celestial-halo-form",

    name: "Celestial Halo Form",

    description: "Floating halo and divine light.",

    tier: "pro",

    promptHint: "soft divine light and a floating halo above the pet",

  },

  {

    id: "abyss-shadow-armor",

    name: "Abyss Shadow Armor",

    description: "Void-black armor with purple flame.",

    tier: "pro",

    promptHint: "void-black armor plates with subtle purple flames",

  },

  {

    id: "photon-wings",

    name: "Photon Wings",

    description: "Prismatic light wings.",

    tier: "pro",

    promptHint: "prismatic rainbow wings made of pure light",

  },

  {

    id: "cosmic-rift-spark",

    name: "Cosmic Rift Spark",

    description: "Starscape particles and rift.",

    tier: "pro",

    promptHint: "starfield particles and a small cosmic rift behind the pet",

  },

  {

    id: "plasma-veins",

    name: "Plasma Veins",

    description: "Glowing energy lines under fur.",

    tier: "pro",

    promptHint: "bright glowing plasma veins under the fur",

  },

];



const POWERS_BY_TIER: Record<PowerTierId, PowerOption[]> = {

  free: POWER_OPTIONS.filter((p) => p.tier === "free"),

  basic: POWER_OPTIONS.filter((p) => p.tier === "basic"),

  enhanced: POWER_OPTIONS.filter((p) => p.tier === "enhanced"),

  pro: POWER_OPTIONS.filter((p) => p.tier === "pro"),

};



const TIER_LABELS: Record<PowerTierId, string> = {

  free: "Free Powers (3)",

  basic: "Basic Powers (10)",

  enhanced: "Enhanced Powers (20)",

  pro: "Pro Powers (Premium)",

};



export default function StylePickerScreen() {

  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<StylePickerRouteProp>();

  const { videoUri, trimStart, trimEnd } = route.params;



  if (!videoUri) {

    return <Text>No video found. Please upload first.</Text>;

  }



  const [selectedStyle, setSelectedStyle] = useState<JobStyle | null>(null);

  const [petName, setPetName] = useState("");

  const [selectedOption, setSelectedOption] = useState<StyleOption | null>(null);

  const [openTiers, setOpenTiers] = useState<PowerTierId[]>(["free"]);



  const createJob = useCreateJob();



  const isSuperhero = selectedStyle === "superhero";



  const toggleTier = (tier: PowerTierId) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setOpenTiers((prev) =>

      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]

    );

  };



  // Map JobStyle to ModeCategory
  const getModeCategory = (style: JobStyle): ModeCategory => {
    switch (style) {
      case "sports":
        return "sports";
      case "superhero":
        return "superhero";
      case "pixar":
      case "anime":
        return "movies";
      case "birthday":
      case "holiday":
        return "fairytale";
      default:
        return "movies";
    }
  };

  const handleGenerate = async () => {

    if (!selectedStyle) {

      Alert.alert("No Style Selected", "Please choose a category first.");

      return;

    }

    if (!selectedOption) {

      Alert.alert("Choose a Theme", "Pick one option under your selected category.");

      return;

    }



    try {

      // Prepare file for FormData - React Native FormData format
      const pickedVideo = {
        uri: videoUri,
        type: "video/mp4", // You may want to detect actual type
        name: "pet-video.mp4",
      };

      const result = await createJob.mutateAsync({

        pickedVideo,

        selectedStyleId: selectedOption.id,

        selectedCategory: getModeCategory(selectedStyle),

      });



      navigation.navigate("JobStatus", {

        jobId: result.jobId,

      });

    } catch (error) {

      Alert.alert(

        "Error",

        error instanceof Error ? error.message : "Failed to create job"

      );

    }

  };



  return (

    <ScrollView style={styles.container}>

      {/* Back/Home Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })}
        >
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instruction}>Choose a style for your pet</Text>



      {/* STYLE CATEGORY SELECTION */}

      <View style={styles.stylesContainer}>

        {STYLE_CATEGORIES.map((styleCat) => (

          <View key={styleCat.id} style={styles.styleCardWrapper}>

            <TouchableOpacity

              style={[

                styles.styleCard,

                selectedStyle === styleCat.id && styles.styleCardSelected,

              ]}

              onPress={() => {

                setSelectedStyle(styleCat.id);

                setSelectedOption(null);

              }}

            >

              <Text style={styles.styleEmoji}>{styleCat.emoji}</Text>

              <Text style={styles.styleName}>{styleCat.name}</Text>

              <Text style={styles.styleDescription}>{styleCat.description}</Text>

            </TouchableOpacity>



            {/* Dropdown under the selected tab */}

            {selectedStyle === styleCat.id && (

              <View style={styles.dropdownContainer}>

                <Text style={styles.dropdownTitle}>Choose a theme</Text>

                <View style={styles.optionChipsContainer}>

                  {OPTIONS_BY_STYLE[styleCat.id].map((opt) => {

                    const isSelected = selectedOption?.id === opt.id;

                    const allowedPlans = PLAN_ACCESS[CURRENT_PLAN];

                    const planOrder: PlanId[] = ["free", "basic", "enhanced", "pro"];

                    const currentPlanIndex = planOrder.indexOf(CURRENT_PLAN);

                    const minPlanIndex = planOrder.indexOf(opt.minPlan);

                    const isLocked = minPlanIndex > currentPlanIndex;



                    return (

                      <TouchableOpacity

                        key={opt.id}

                        style={[

                          styles.optionChip,

                          isSelected && styles.optionChipSelected,

                          isLocked && styles.optionChipLocked,

                        ]}

                        onPress={() => {

                          if (isLocked) {

                            navigation.navigate("Upgrade", {

                              requestedTier: opt.minPlan as PowerTierId,

                            });

                          } else {

                            setSelectedOption(opt);

                          }

                        }}

                      >

                        <Text

                          style={[

                            styles.optionChipText,

                            isSelected && styles.optionChipTextSelected,

                            isLocked && styles.optionChipTextLocked,

                          ]}

                        >

                          {opt.name}

                        </Text>

                        {isLocked && <Text style={styles.lockIcon}>🔒</Text>}

                      </TouchableOpacity>

                    );

                  })}

                </View>

                {selectedOption && (

                  <Text style={styles.optionDescription}>{selectedOption.description}</Text>

                )}

              </View>

            )}

          </View>

        ))}

      </View>






      {/* PET NAME INPUT */}

      <View style={styles.petNameContainer}>

        <Text style={styles.petNameLabel}>Pet Name (Optional)</Text>

        <TextInput

          style={styles.petNameInput}

          placeholder="e.g., Luna, Max, Bella"

          value={petName}

          onChangeText={setPetName}

          maxLength={30}

        />

      </View>



      {/* GENERATE BUTTON */}

      <TouchableOpacity

        style={[

          styles.generateButton,

          (!selectedStyle || createJob.isPending) && styles.generateButtonDisabled,

        ]}

        onPress={handleGenerate}

        disabled={!selectedStyle || createJob.isPending}

      >

        {createJob.isPending ? (

          <ActivityIndicator color="#fff" />

        ) : (

          <Text style={styles.generateButtonText}>✨ Generate</Text>

        )}

      </TouchableOpacity>

    </ScrollView>

  );

}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#f9fafb",

    padding: 20,

  },

  headerContainer: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 20,

  },

  backButton: {

    backgroundColor: "#fff",

    paddingHorizontal: 16,

    paddingVertical: 8,

    borderRadius: 8,

    borderWidth: 1,

    borderColor: "#e5e7eb",

  },

  backButtonText: {

    fontSize: 14,

    fontWeight: "600",

    color: "#111827",

  },

  homeButton: {

    backgroundColor: "#6366f1",

    paddingHorizontal: 16,

    paddingVertical: 8,

    borderRadius: 8,

  },

  homeButtonText: {

    fontSize: 14,

    fontWeight: "600",

    color: "#fff",

  },

  instruction: {

    fontSize: 20,

    color: "#111827",

    textAlign: "center",

    marginBottom: 28,

    fontWeight: "700",

    letterSpacing: -0.5,

  },

  stylesContainer: {

    marginBottom: 24,

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

  },

  styleCardWrapper: {

    width: "48%",

    marginBottom: 12,

  },

  styleCard: {

    backgroundColor: "#fff",

    borderRadius: 12,

    padding: 16,

    borderWidth: 2,

    borderColor: "#e5e7eb",

  },

  styleCardSelected: {

    borderColor: "#6366f1",

    backgroundColor: "#eef2ff",

  },

  styleEmoji: {

    fontSize: 40,

    marginBottom: 12,

  },

  styleName: {

    fontSize: 16,

    fontWeight: "700",

    color: "#1f2937",

    marginBottom: 6,

    textAlign: "center",

  },

  styleDescription: {

    fontSize: 12,

    color: "#6b7280",

    textAlign: "center",

    lineHeight: 16,

  },



  sectionHeaderContainer: {

    marginBottom: 8,

  },

  sectionHeader: {

    fontSize: 16,

    fontWeight: "600",

    color: "#111827",

  },

  sectionSubtext: {

    fontSize: 13,

    color: "#6b7280",

    marginTop: 4,

  },



  tierContainer: {

    marginBottom: 12,

  },

  tierHeader: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 10,

  },

  tierTitle: {

    fontSize: 15,

    fontWeight: "600",

    color: "#111827",

  },

  tierChevron: {

    fontSize: 16,

    color: "#6b7280",

  },

  tierBody: {

    backgroundColor: "#fff",

    borderRadius: 12,

    padding: 12,

    borderWidth: 1,

    borderColor: "#e5e7eb",

  },

  powerChipsContainer: {

    flexDirection: "row",

    flexWrap: "wrap",

  },

  powerChip: {

    borderRadius: 999,

    borderWidth: 1,

    borderColor: "#d1d5db",

    paddingHorizontal: 10,

    paddingVertical: 6,

    marginRight: 6,

    marginBottom: 6,

    backgroundColor: "#f9fafb",

  },

  powerChipSelected: {

    borderColor: "#6366f1",

    backgroundColor: "#e0e7ff",

  },

  powerChipLocked: {

    backgroundColor: "#f3f4f6",

    borderColor: "#9ca3af",

    opacity: 0.7,

  },

  powerChipContent: {

    flexDirection: "row",

    alignItems: "center",

  },

  powerChipText: {

    fontSize: 12,

    color: "#111827",

  },

  powerChipTextSelected: {

    fontWeight: "600",

    color: "#111827",

  },

  powerChipTextLocked: {

    color: "#6b7280",

  },

  lockIcon: {

    fontSize: 12,

  },

  powerDescriptionSelected: {

    marginTop: 8,

    fontSize: 12,

    color: "#6b7280",

  },



  petNameContainer: {

    marginTop: 24,

    marginBottom: 24,

  },

  petNameLabel: {

    fontSize: 16,

    fontWeight: "600",

    color: "#1f2937",

    marginBottom: 8,

  },

  petNameInput: {

    backgroundColor: "#fff",

    borderRadius: 8,

    padding: 12,

    fontSize: 16,

    borderWidth: 1,

    borderColor: "#e5e7eb",

  },

  generateButton: {

    backgroundColor: "#6366f1",

    paddingVertical: 16,

    borderRadius: 12,

    alignItems: "center",

    marginBottom: 20,

  },

  generateButtonDisabled: {

    backgroundColor: "#9ca3af",

  },

  generateButtonText: {

    color: "#fff",

    fontSize: 18,

    fontWeight: "600",

  },

  dropdownContainer: {

    marginTop: 8,

    backgroundColor: "#f9fafb",

    borderRadius: 12,

    padding: 10,

    borderWidth: 1,

    borderColor: "#e5e7eb",

  },

  dropdownTitle: {

    fontSize: 14,

    fontWeight: "600",

    color: "#111827",

    marginBottom: 6,

  },

  optionChipsContainer: {

    flexDirection: "row",

    flexWrap: "wrap",

  },

  optionChip: {

    borderRadius: 999,

    borderWidth: 1,

    borderColor: "#d1d5db",

    paddingHorizontal: 10,

    paddingVertical: 6,

    marginRight: 6,

    marginBottom: 6,

    backgroundColor: "#fff",

    flexDirection: "row",

    alignItems: "center",

  },

  optionChipSelected: {

    borderColor: "#6366f1",

    backgroundColor: "#e0e7ff",

  },

  optionChipLocked: {

    backgroundColor: "#f3f4f6",

    borderColor: "#9ca3af",

    opacity: 0.7,

  },

  optionChipText: {

    fontSize: 12,

    color: "#111827",

  },

  optionChipTextSelected: {

    fontWeight: "600",

  },

  optionChipTextLocked: {

    color: "#6b7280",

  },

  optionDescription: {

    marginTop: 6,

    fontSize: 12,

    color: "#6b7280",

  },

});
