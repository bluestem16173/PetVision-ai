import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import StylePickerScreen from '../screens/StylePickerScreen';
import GeneratingScreen from '../screens/GeneratingScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'PetVision AI' }}
        />
        <Stack.Screen
          name="Upload"
          component={UploadScreen}
          options={{ title: 'Select Video' }}
        />
        <Stack.Screen
          name="StylePicker"
          component={StylePickerScreen}
          options={{ title: 'Choose Style' }}
        />
        <Stack.Screen
          name="Generating"
          component={GeneratingScreen}
          options={{ title: 'Creating Magic...', headerBackVisible: false }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Your Creation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

