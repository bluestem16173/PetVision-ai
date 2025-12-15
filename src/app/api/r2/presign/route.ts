import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const MAX_FILE_SIZE = 250 * 1024 * 1024 // 250MB

export async function POST(request: Request) {
  try {
    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { filename, contentType, sizeBytes } = body

    // Validate inputs
    if (!filename || !contentType || sizeBytes === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: filename, contentType, sizeBytes' },
        { status: 400 }
      )
    }

    // Validate content type
    if (!contentType.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Content type must be a video type' },
        { status: 400 }
      )
    }

    // Validate file size
    if (sizeBytes > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Generate unique R2 key
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
    const r2Key = `users/${user.id}/${timestamp}-${random}-${safeFilename}`

    // Create S3 client for R2
    const s3Client = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT, // REQUIRED
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
      forcePathStyle: true,
    })

    // Create presigned URL
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: r2Key,
      ContentType: contentType,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }) // 1 hour expiry

    return NextResponse.json({
      uploadUrl,
      r2Key,
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}

