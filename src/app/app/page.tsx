import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'
import UploadVideo from '@/components/UploadVideo'
import VideoPlayer from '@/components/VideoPlayer'

export default async function AppPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user's videos
  const { data: videos, error } = await supabase
    .from('videos')
    .select('id, filename, status, created_at, r2_key')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-900">
                  This page can only be seen by logged-in users
                </p>
              </div>
              <SignOutButton />
            </div>
          </div>

          {/* Upload Section */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Upload Video
            </h2>
            <UploadVideo />
          </div>

          {/* Videos List */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Your Videos
            </h2>
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-800">
                  Error loading videos: {error.message}
                </p>
              </div>
            )}
            {!error && videos && videos.length === 0 && (
              <p className="text-gray-500">No videos uploaded yet.</p>
            )}
            {!error && videos && videos.length > 0 && (
              <div className="space-y-6">
                {videos.map((video) => (
                  <div key={video.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{video.filename}</h3>
                        <div className="flex items-center gap-4">
                          <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                            {video.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(video.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {video.r2_key && (
                      <VideoPlayer r2Key={video.r2_key} filename={video.filename} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
