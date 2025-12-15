'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

type UploadState = 'idle' | 'requesting' | 'uploading' | 'saving' | 'success' | 'error'

export default function UploadVideo() {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<UploadState>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.type.startsWith('video/')) {
        setError('Please select a video file')
        return
      }
      setFile(selectedFile)
      setError(null)
      setState('idle')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in to upload videos')
      setState('error')
      return
    }

    try {
      setState('requesting')
      setError(null)

      // Step 1: Get presigned URL
      const presignResponse = await fetch('/api/r2/presign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          sizeBytes: file.size,
        }),
      })

      if (!presignResponse.ok) {
        const errorData = await presignResponse.json()
        throw new Error(errorData.error || 'Failed to get upload URL')
      }

      const { uploadUrl, r2Key } = await presignResponse.json()

      // Step 2: Upload to R2
      setState('uploading')
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to R2')
      }

      // Step 3: Save metadata to Supabase
      setState('saving')
      const { error: insertError } = await supabase.from('videos').insert({
        user_id: user.id,
        r2_key: r2Key,
        filename: file.name,
        content_type: file.type,
        size_bytes: file.size,
        status: 'uploaded',
      })

      if (insertError) {
        throw new Error(insertError.message || 'Failed to save video metadata')
      }

      setState('success')
      setFile(null)
      // Reset file input
      const fileInput = document.getElementById('video-upload') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
      
      // Refresh the page to show new video
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setState('error')
    }
  }

  const getStatusText = () => {
    switch (state) {
      case 'requesting':
        return 'Requesting upload URL...'
      case 'uploading':
        return 'Uploading...'
      case 'saving':
        return 'Saving metadata...'
      case 'success':
        return 'Upload successful!'
      case 'error':
        return 'Upload failed'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="video-upload"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload Video
        </label>
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          disabled={state === 'requesting' || state === 'uploading' || state === 'saving'}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
      </div>

      {file && (
        <div className="text-sm text-gray-600">
          Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}

      {state !== 'idle' && state !== 'success' && (
        <div className="text-sm text-gray-600">{getStatusText()}</div>
      )}

      {state === 'success' && (
        <div className="text-sm text-green-600">{getStatusText()}</div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {file && state === 'idle' && (
        <button
          onClick={handleUpload}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Upload Video
        </button>
      )}
    </div>
  )
}

