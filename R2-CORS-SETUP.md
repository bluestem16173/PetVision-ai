# R2 CORS Configuration Setup

## CORS Configuration

Apply this CORS configuration to your Cloudflare R2 bucket `r2-petvision-upload-prod`:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://YOUR-PROJECT.vercel.app",
      "https://YOURDOMAIN.com"
    ],
    "AllowedMethods": ["GET", "HEAD", "PUT"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "Content-Length", "Content-Type"],
    "MaxAgeSeconds": 3600
  }
]
```

## How to Apply CORS Configuration

### Option 1: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2** → **Manage R2 API Tokens**
3. Select your bucket: `r2-petvision-upload-prod`
4. Go to **Settings** → **CORS Policy**
5. Paste the JSON configuration above
6. **Important:** Replace placeholders:
   - `YOUR-PROJECT.vercel.app` → Your actual Vercel deployment URL
   - `YOURDOMAIN.com` → Your production domain (if applicable)
7. Click **Save**

### Option 2: Using Wrangler CLI

```bash
wrangler r2 bucket cors put r2-petvision-upload-prod --file r2-cors-config.json
```

## What This Configuration Does

- **AllowedOrigins**: Allows requests from:
  - `http://localhost:3000` (local development)
  - Your Vercel deployment URL
  - Your production domain
  
- **AllowedMethods**: 
  - `GET` - For downloading/streaming videos
  - `HEAD` - For checking file metadata
  - `PUT` - For uploading videos via presigned URLs

- **AllowedHeaders**: Allows all headers (needed for presigned URL uploads)

- **ExposeHeaders**: Exposes ETag, Content-Length, and Content-Type headers

- **MaxAgeSeconds**: CORS preflight cache duration (1 hour)

## Testing

After applying CORS, test by:
1. Uploading a video from `http://localhost:3000`
2. Streaming a video from the app
3. Check browser console for CORS errors

## Troubleshooting

If you see CORS errors:
- Verify the origin URL matches exactly (including `http://` vs `https://`)
- Ensure the bucket name is correct
- Check that CORS was saved successfully in Cloudflare dashboard
- Clear browser cache and try again

