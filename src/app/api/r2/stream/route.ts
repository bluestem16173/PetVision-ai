import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function supabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}

function r2Client() {
  return new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT, // REQUIRED
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const r2Key = searchParams.get("r2Key");
  if (!r2Key) return NextResponse.json({ error: "Missing r2Key" }, { status: 400 });

  const supabase = await supabaseServer();
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify the video belongs to the logged-in user
  const { data: video, error: vErr } = await supabase
    .from("videos")
    .select("r2_key,user_id")
    .eq("r2_key", r2Key)
    .single();

  if (vErr || !video) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (video.user_id !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const s3 = r2Client();
  const cmd = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: r2Key,
  });
  const url = await getSignedUrl(s3, cmd, { expiresIn: 600 });
  return NextResponse.json({ url });
}

