import { z } from 'zod'

export const enquirySchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  event_type: z.enum(['wedding', 'corporate', 'safari', 'private'] as const),
  event_date: z.string().refine(
    (date) => new Date(date) > new Date(),
    'Event date must be in the future'
  ),
  guest_count: z.number().int().min(1).max(5000),
  message: z.string().min(10, 'Message must be at least 10 characters').optional(),
})

export type EnquiryFormData = z.infer<typeof enquirySchema>
