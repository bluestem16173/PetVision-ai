# PetVision AI - Mobile App

React Native mobile app built with Expo.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

## Configuration

Update `src/config/api.ts` to point to your backend server URL:
- For iOS simulator: `http://localhost:3001`
- For Android emulator: `http://10.0.2.2:3001`
- For physical device: `http://YOUR_COMPUTER_IP:3001`

## Tech Stack

- React Native + Expo
- TypeScript
- React Navigation
- React Query (@tanstack/react-query)
- Expo AV (video playback)
- Expo Image Picker (media selection)

