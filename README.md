# PetVision AI 🐾

Transform your pet into magical, stylized videos using AI! Upload a short video of your pet, choose a style (Pixar, Anime, Superhero, etc.), and watch as AI creates a fun, shareable transformation.

## 🎯 Overview

PetVision AI is a full-stack mobile application that allows users to:
- Upload short videos (5-15 seconds) of their pets
- Choose from multiple AI styles (Pixar, Anime, Superhero, Birthday, Holiday)
- Generate stylized videos via AI processing
- View, download, and share their creations
- Browse a gallery of previous creations

## 🏗️ Architecture

This is a monorepo containing:

- **`/app`** - React Native mobile app (Expo + TypeScript)
- **`/server`** - Node.js backend API (Express + TypeScript + Prisma)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator (or physical device with Expo Go)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Initialize the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Mobile App Setup

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Update API configuration (if needed):
   - Edit `src/config/api.ts`
   - For physical devices, use your computer's IP address instead of `localhost`

4. Start the Expo development server:
```bash
npm start
```

5. Run on your device:
   - Scan QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

## 📱 App Flow

1. **Home Screen** - View previous creations and tap "Create Magic Video"
2. **Upload Screen** - Select a video from your gallery (5-15 seconds)
3. **Style Picker** - Choose a style and optionally enter your pet's name
4. **Generating Screen** - Watch as your video is processed (with polling)
5. **Result Screen** - View, download, and share your creation

## 🛠️ Tech Stack

### Backend
- Node.js + TypeScript
- Express
- Prisma + SQLite (dev) / PostgreSQL (production-ready)
- Mock AI worker (simulates video processing)

### Mobile App
- React Native + Expo
- TypeScript
- React Navigation
- React Query (@tanstack/react-query)
- Expo AV (video playback)
- Expo Image Picker (media selection)

## 📡 API Endpoints

### POST /api/jobs
Create a new video generation job.

**Request:**
```json
{
  "style": "pixar",
  "inputVideoUrl": "https://example.com/video.mp4",
  "petName": "Luna"
}
```

**Response:**
```json
{
  "jobId": "uuid",
  "status": "queued"
}
```

### GET /api/jobs/:jobId
Get job status and results.

**Response (Completed):**
```json
{
  "jobId": "uuid",
  "status": "completed",
  "outputVideoUrl": "https://example.com/output/video.mp4",
  "thumbnailUrl": "https://example.com/output/thumbnail.jpg",
  "style": "pixar",
  "petName": "Luna"
}
```

### GET /api/jobs
Get list of recent jobs (last 50).

## 🎨 Available Styles

- **Pixar** - Transform your pet into a Pixar character
- **Anime** - Give your pet an anime makeover
- **Superhero** - Make your pet a superhero
- **Birthday** - Celebrate your pet's special day
- **Holiday** - Festive holiday style

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run prisma:studio # Open Prisma Studio (database GUI)
```

### Mobile App Development
```bash
cd app
npm start            # Start Expo dev server
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
```

## 📝 TODO / Future Enhancements

- [ ] **Real AI Provider Integration**
  - Replace mock AI worker with real provider (Runway, Pika, OpenAI Sora, etc.)
  - Implement proper video processing pipeline

- [ ] **File Upload & Storage**
  - Implement real file uploads (multipart/form-data)
  - Integrate cloud storage (AWS S3, Supabase Storage, etc.)
  - Handle video compression and optimization

- [ ] **Authentication**
  - Add user authentication (JWT, OAuth, etc.)
  - User-specific job history
  - Account management

- [ ] **In-App Purchases / Subscriptions**
  - Free tier with limits
  - Premium subscription for unlimited generations
  - Payment integration (Stripe, RevenueCat, etc.)

- [ ] **Enhanced Features**
  - Video recording within app
  - More style options
  - Custom style parameters
  - Batch processing
  - Social sharing integration (Instagram, TikTok, etc.)
  - Push notifications for job completion

- [ ] **Production Readiness**
  - Error tracking (Sentry)
  - Analytics (Mixpanel, Amplitude)
  - Performance monitoring
  - CI/CD pipeline
  - Database migrations for production

## 📄 License

MIT

## 🤝 Contributing

This is an MVP project. Contributions welcome!

---

Built with ❤️ for pet lovers everywhere 🐾

