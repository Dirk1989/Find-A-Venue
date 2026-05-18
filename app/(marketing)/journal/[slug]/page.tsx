import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const title = slug
    .split('-')
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-24 px-4 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold text-xs uppercase tracking-[0.18em] font-inter font-semibold mb-4">
            Journal
          </p>
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {title}
          </h1>
          <div className="h-80 bg-sand rounded-lg mb-8 flex items-center justify-center text-muted/40">
            Article Cover Image
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="font-inter text-charcoal leading-relaxed mb-4">
              This article is coming soon. Check back for expert insights and
              inspiration for your next event in South Africa.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}