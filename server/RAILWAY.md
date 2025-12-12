# Railway Deployment Guide

## Quick Setup

1. **Connect Repository**: In Railway dashboard, connect your GitHub repository
2. **Set Root Directory**: Set the root directory to `server` in Railway project settings
3. **Environment Variables**: Add these in Railway:
   - `DATABASE_URL` - For SQLite: `file:./prisma/dev.db` (note: data will be lost on redeploy)
   - `PORT` - Railway will set this automatically, but defaults to 4000
4. **Deploy**: Railway will automatically detect the Node.js project and deploy

## Configuration Files

- `nixpacks.toml` - Explicit build configuration for Railway
- `railway.json` - Alternative Railway configuration (if root directory is not set to `server`)

## Build Process

Railway will:
1. Run `npm install` (which triggers `postinstall` → `prisma generate`)
2. Run `npm run build` (which runs `prisma generate && tsc`)
3. Run `npm start` (which runs `node dist/index.js`)

## Important Notes

⚠️ **SQLite on Railway**: Railway's filesystem is ephemeral. SQLite databases will be lost on redeploy. For production:
- Use Railway's PostgreSQL plugin
- Or use an external database service
- Update `DATABASE_URL` accordingly

⚠️ **File Uploads**: Uploaded files are stored in `uploads/` directory, which will also be lost on redeploy. For production:
- Use cloud storage (S3, Cloudinary, etc.)
- Or use Railway's volume storage

## Health Check

The server exposes a health endpoint at `/health` that Railway can use for health checks.

