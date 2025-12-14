import React, { useState } from "react";

import { View, Text, Pressable, Alert } from "react-native";



const TEST_BASE_URL = "https://patient-reflection-production.up.railway.app";



export default function DebugApiTest() {

  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState<string | null>(null);



  const test = async () => {

    setIsLoading(true);

    setResult(null);

    console.log("TEST: hitting", `${TEST_BASE_URL}/api/jobs`);

    try {

      const res = await fetch(`${TEST_BASE_URL}/api/jobs`, {

        method: "GET",

        headers: {

          "Content-Type": "application/json",

        },

      });

      const text = await res.text();

      console.log("TEST status:", res.status);

      console.log("TEST body:", text);

      

      if (res.ok) {

        setResult(`✅ Success (${res.status}): ${text.substring(0, 100)}...`);

        Alert.alert("Success", `Status: ${res.status}\nResponse: ${text.substring(0, 200)}`);

      } else {

        setResult(`❌ Error (${res.status}): ${text}`);

        Alert.alert("Error", `Status: ${res.status}\nResponse: ${text}`);

      }

    } catch (e) {

      const errorMsg = e instanceof Error ? e.message : String(e);

      console.log("TEST fetch error:", e);

      setResult(`❌ Network Error: ${errorMsg}`);

      Alert.alert("Network Error", errorMsg);

    } finally {

      setIsLoading(false);

    }

  };



  return (

    <View style={{ padding: 20, backgroundColor: "#1a1a2e" }}>

      <Pressable

        onPress={test}

        disabled={isLoading}

        style={{ 

          padding: 12, 

          backgroundColor: isLoading ? "#666" : "#3ECF8E", 

          borderRadius: 12,

          opacity: isLoading ? 0.6 : 1,

        }}

      >

        <Text style={{ fontWeight: "700", color: "#000", textAlign: "center" }}>

          {isLoading ? "Testing..." : "Test Railway API"}

        </Text>

      </Pressable>

      {result && (

        <Text style={{ marginTop: 12, color: "#fff", fontSize: 12 }}>

          {result}

        </Text>

      )}

    </View>

  );

}

