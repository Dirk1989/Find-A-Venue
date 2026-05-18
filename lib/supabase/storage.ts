import { createClient } from './client'

const STORAGE_BUCKETS = {
  VENUE_IMAGES: 'venue-images',
  JOURNAL_COVERS: 'journal-covers',
  TESTIMONIALS: 'testimonials',
  GENERAL: 'public',
} as const

export type BucketName = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS]

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  bucket: BucketName,
  path: string,
  file: File
) {
  const supabase = createClient()
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) throw error
  return data
}

/**
 * Upload multiple files to Supabase Storage
 */
export async function uploadFiles(
  bucket: BucketName,
  files: File[],
  folder: string = ''
) {
  const supabase = createClient()
  const uploads = files.map(async (file) => {
    const path = folder
      ? `${folder}/${crypto.randomUUID()}-${file.name}`
      : `${crypto.randomUUID()}-${file.name}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) throw error
    return getPublicUrl(bucket, data.path)
  })

  return Promise.all(uploads)
}

/**
 * Get the public URL for a file in Supabase Storage
 */
export function getPublicUrl(bucket: BucketName, path: string) {
  const supabase = createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: BucketName, path: string) {
  const supabase = createClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

/**
 * Delete multiple files from Supabase Storage
 */
export async function deleteFiles(bucket: BucketName, paths: string[]) {
  const supabase = createClient()
  const { error } = await supabase.storage.from(bucket).remove(paths)
  if (error) throw error
}

/**
 * List all files in a bucket folder
 */
export async function listFiles(bucket: BucketName, folder?: string) {
  const supabase = createClient()
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, {
      sortBy: { column: 'created_at', order: 'desc' },
    })

  if (error) throw error
  return data.map((file) => ({
    ...file,
    url: getPublicUrl(bucket, folder ? `${folder}/${file.name}` : file.name),
  }))
}

export { STORAGE_BUCKETS }