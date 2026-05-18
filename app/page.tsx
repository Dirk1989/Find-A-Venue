import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/marketing/Hero'
import { VenueBento } from '@/components/marketing/VenueBento'
import { CategoryTriptych } from '@/components/marketing/CategoryTriptych'
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline'
import { Testimonials } from '@/components/marketing/Testimonials'
import { OwnerCTA } from '@/components/marketing/OwnerCTA'
import { JournalTeaser } from '@/components/marketing/JournalTeaser'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <VenueBento />
      <CategoryTriptych />
      <ProcessTimeline />
      <Testimonials />
      <OwnerCTA />
      <JournalTeaser />
      <FinalCTA />
      <Footer />
    </>
  )
}
