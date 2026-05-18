import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdmin } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const admin = await isAdmin(user.id)
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const bucket = formData.get('bucket') as string
    const folder = (formData.get('folder') as string) || ''

    if (!files.length || !bucket) {
      return NextResponse.json(
        { error: 'No files or bucket specified' },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()
    const urls: string[] = []

    for (const file of files) {
      const path = folder
        ? `${folder}/${crypto.randomUUID()}-${file.name}`
        : `${crypto.randomUUID()}-${file.name}`

      const { data, error } = await adminSupabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (error) throw error

      const { data: { publicUrl } } = adminSupabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      urls.push(publicUrl)
    }

    return NextResponse.json({ urls })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}