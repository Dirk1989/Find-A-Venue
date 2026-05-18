'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  onUpload: (urls: string[]) => void
  bucket: string
  folder?: string
  maxFiles?: number
  accept?: string
  existingImages?: { url: string; alt?: string; isCover?: boolean }[]
}

export function ImageUpload({
  onUpload,
  bucket,
  folder = '',
  maxFiles = 10,
  accept = 'image/*',
  existingImages = [],
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files).slice(0, maxFiles)
      if (files.length > 0) {
        handleFiles(files)
      }
    },
    [maxFiles]
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, maxFiles)
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFiles = async (files: File[]) => {
    // Show previews
    const previewUrls = files.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...previewUrls])

    // Upload
    setIsUploading(true)
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append('files', file))
      formData.append('bucket', bucket)
      formData.append('folder', folder)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      setUploadedUrls((prev) => [...prev, ...data.urls])
      onUpload(data.urls)
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const removePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExisting = (url: string) => {
    onUpload(uploadedUrls.filter((u) => u !== url))
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
          isDragging
            ? 'border-gold bg-gold/5'
            : 'border-muted/30 hover:border-muted/50 hover:bg-forest/5'
        }`}
      >
        <input
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
            <span className="text-sm text-muted">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted" />
            <span className="text-sm font-medium text-charcoal">
              Drop images here or click to browse
            </span>
            <span className="text-xs text-muted">
              PNG, JPG, WebP up to 10MB each
            </span>
          </div>
        )}
      </div>

      {/* New previews */}
      {previews.length > 0 && (
        <div>
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
            New uploads
          </span>
          <div className="grid grid-cols-4 gap-3">
            {previews.map((url, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-sand">
                <img
                  src={url}
                  alt={`Preview ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => removePreview(i)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/60 text-ivory opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing images */}
      {existingImages.length > 0 && (
        <div>
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
            Current images
          </span>
          <div className="grid grid-cols-4 gap-3">
            {existingImages.map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-sand">
                <img
                  src={img.url}
                  alt={img.alt || ''}
                  className="h-full w-full object-cover"
                />
                {img.isCover && (
                  <span className="absolute left-1 top-1 rounded bg-gold px-1.5 py-0.5 text-[10px] font-medium text-ivory">
                    Cover
                  </span>
                )}
                <button
                  onClick={() => removeExisting(img.url)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/60 text-ivory opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}