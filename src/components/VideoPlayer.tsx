'use client'

import { useState, useEffect } from 'react'

interface VideoPlayerProps {
  r2Key: string
  filename: string
}

export default function VideoPlayer({ r2Key, filename }: VideoPlayerProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/r2/sign-download?r2Key=${encodeURIComponent(r2Key)}`)
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ error: 'Failed to load video' }))
          throw new Error(errorData.error || 'Failed to load video')
        }

        const { url } = await res.json()
        setVideoSrc(url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load video')
      } finally {
        setLoading(false)
      }
    }

    if (r2Key) {
      loadVideo()
    }
  }, [r2Key])

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg aspect-video">
        <p className="text-gray-500">Loading video...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-red-50 rounded-lg aspect-video">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    )
  }

  if (!videoSrc) {
    return null
  }

  return (
    <video
      controls
      src={videoSrc}
      className="w-full rounded-lg"
      preload="metadata"
    >
      Your browser does not support the video tag.
    </video>
  )
}

