import { z } from 'zod'

export const venueSchema = z.object({
  name: z.string().min(2, 'Venue name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
  tagline: z.string().max(120, 'Tagline must be 120 characters or less').optional().or(z.literal('')),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['wedding', 'corporate', 'safari', 'private'] as const),
  province: z.string().min(1, 'Province is required'),
  town: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  lat: z.coerce.number().optional().nullable(),
  lng: z.coerce.number().optional().nullable(),
  capacity_min: z.coerce.number().int().min(0).optional().nullable(),
  capacity_max: z.coerce.number().int().min(0).optional().nullable(),
  price_band: z.enum(['R', 'RR', 'RRR', 'RRRR'] as const).optional().nullable(),
  amenities: z.array(z.string()).default([]),
  status: z.enum(['draft', 'pending', 'published', 'archived'] as const).default('draft'),
  featured: z.boolean().default(false),
  owner_id: z.string().uuid().optional().nullable(),
})

export type VenueFormData = z.infer<typeof venueSchema>

export const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
  excerpt: z.string().max(300, 'Excerpt must be 300 characters or less').optional().or(z.literal('')),
  body_mdx: z.string().optional().or(z.literal('')),
  cover_url: z.string().url().optional().or(z.literal('')),
  category: z.string().optional().or(z.literal('')),
  published_at: z.string().datetime().optional().nullable(),
})

export type PostFormData = z.infer<typeof postSchema>