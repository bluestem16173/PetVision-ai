# Setup Guide

Follow these steps to get PetVision AI running locally.

## Step 1: Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
# Copy the example (or create manually)
# On Windows PowerShell:
Copy-Item .env.example .env

# On Mac/Linux:
cp .env.example .env
```

4. Edit `.env` and ensure it has:
```
PORT=3001
DATABASE_URL="file:./dev.db"
```

5. Initialize database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

6. Start the server:
```bash
npm run dev
```

You should see: `🚀 Server running on http://localhost:3001`

## Step 2: Mobile App Setup

1. Open a new terminal and navigate to app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Update API configuration (if needed):
   - Open `src/config/api.ts`
   - For **iOS Simulator**: Keep `http://localhost:3001`
   - For **Android Emulator**: Change to `http://10.0.2.2:3001`
   - For **Physical Device**: Change to `http://YOUR_COMPUTER_IP:3001`
     - Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)

4. Start Expo:
```bash
npm start
```

5. Run on device:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan QR code with Expo Go app

## Step 3: Test the Flow

1. In the app, tap "Create Magic Video"
2. Select a video from your gallery (or use a test video)
3. Choose a style (e.g., "Pixar")
4. Optionally enter a pet name
5. Tap "Generate"
6. Wait 10-15 seconds for the mock AI to process
7. View your result!

## Troubleshooting

### Backend won't start
- Make sure port 3001 is not in use
- Check that `.env` file exists
- Run `npm run prisma:generate` again

### App can't connect to backend
- Verify backend is running on port 3001
- Check `src/config/api.ts` has the correct URL
- For physical devices, ensure phone and computer are on same WiFi
- Try `http://localhost:3001` in browser to test backend

### Database errors
- Delete `dev.db` and run `npm run prisma:migrate` again
- Or run `npm run prisma:studio` to inspect database

### Expo issues
- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Next Steps

See `README.md` for more information about the project structure and TODO items.

