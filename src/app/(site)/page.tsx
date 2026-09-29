import { CategoriesSection } from '@/components/home/CategoriesSection'
import { CoursesSection } from '@/components/home/CoursesSection'
import { CreatorCtaSection } from '@/components/home/CreatorCtaSection'
import { GrowthSection } from '@/components/home/GrowthSection'
import { HeroSection } from '@/components/home/HeroSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <CoursesSection />
      <CategoriesSection />
      <GrowthSection />
      <CreatorCtaSection />
      <TestimonialsSection />
    </main>
  )
}
