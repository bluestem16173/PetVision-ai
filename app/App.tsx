import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RootStackParamList } from "./src/navigation/types";

import { MediaProvider } from "./src/context/MediaContext";

import HomeScreen from "./src/screens/HomeScreen";

import UploadScreen from "./src/screens/UploadScreen";

import TrimScreen from "./src/screens/TrimScreen";

import StylePickerScreen from "./src/screens/StylePickerScreen";

import GeneratingScreen from "./src/screens/GeneratingScreen";

import ResultScreen from "./src/screens/ResultScreen";

import JobStatusScreen from "./src/screens/JobStatusScreen";

import LibraryScreen from "./src/screens/LibraryScreen";

import UpgradeScreen from "./src/screens/UpgradeScreen";



const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();



export default function App() {

  return (

    <MediaProvider>

      <QueryClientProvider client={queryClient}>

        <NavigationContainer>

          <Stack.Navigator>

            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="Upload" component={UploadScreen} />

            <Stack.Screen name="Trim" component={TrimScreen} />

            <Stack.Screen name="StylePicker" component={StylePickerScreen} />

            <Stack.Screen name="Generating" component={GeneratingScreen} />

            <Stack.Screen

              name="Result"

              component={ResultScreen}

              options={{

                title: "Let the Pawesomeness Begin!!!",

                headerBackVisible: false,

              }}

            />

            <Stack.Screen

              name="JobStatus"

              component={JobStatusScreen}

              options={{ headerShown: true, title: "Transformation Status" }}

            />

            <Stack.Screen

              name="Library"

              component={LibraryScreen}

              options={{ headerShown: true, title: "My Transformations" }}

            />

            <Stack.Screen

              name="Upgrade"

              component={UpgradeScreen}

              options={{ headerShown: true, title: "Upgrade" }}

            />

          </Stack.Navigator>

        </NavigationContainer>

      </QueryClientProvider>

    </MediaProvider>

  );

}
