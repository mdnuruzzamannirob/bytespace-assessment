'use client'

import { useState } from 'react'
import Image from 'next/image'

import { gridPatternClassName } from '@/components/home/HomeShared'
import { ButtonLink } from '@/components/ui/button'
import type { Course } from '@/constants/courses'

type Tab = 'About' | 'Lessons' | 'Reviews'

const assets = '/assets/course-details'
const sneakImages = ['sneak-1.jpg', 'sneak-2.jpg', 'sneak-3.jpg', 'sneak-4.jpg']
const keyPoints = [
  'Foundational Concepts',
  'Design Principles Mastery',
  'Advanced Techniques in Digital Creation',
  'Project Showcase and Critique',
  'Optimizing for Various Platforms',
  'Digital Asset Management Best Practices',
  'Monetization Strategies',
  'Capstone Project: Building Your Portfolio',
]
const included = [
  { icon: 'resource.svg', label: 'Learning Resources' },
  { icon: 'video.svg', label: 'Quality Lesson Videos' },
  { icon: 'certificate.svg', label: 'Certificate of Completion' },
  { icon: 'consultation.svg', label: 'Private Consultation' },
]
const sampleLessons = [
  { title: 'Introduction to Digital Assets', duration: '12 mins' },
  { title: 'Design Principles for Impacts', duration: '21 mins' },
  { title: 'Advanced Techniques in Digital Creation', duration: '16 mins' },
]

function DetailIcon({ name, size = 24 }: { name: string; size?: number }) {
  return <Image src={`${assets}/${name}`} width={size} height={size} alt="" aria-hidden="true" className="shrink-0" />
}

export function CourseDetailsContent({ course }: { course: Course }) {
  const [tab, setTab] = useState<Tab>('About')
  const [shareMessage, setShareMessage] = useState('')
  const [showCreator, setShowCreator] = useState(false)
  const isReferenceCourse = course.id === 2
  const title = isReferenceCourse ? 'Build Digital Asset: A Comprehensive Guide' : course.title
  const subtitle = isReferenceCourse ? 'Unlock the Power of Digital Creation with Expert Guidance' : course.description
  const lessons = isReferenceCourse ? 112 : course.lessons
  const duration = isReferenceCourse ? '24 hours' : `${Math.floor(course.durationMinutes / 60)} hours ${course.durationMinutes % 60} mins`
  const rating = isReferenceCourse ? '4.8 (172 reviews)' : `${course.rating} (59 reviews)`
  const students = isReferenceCourse ? '199 Students' : '26+ Students'
  const displayedLessons = isReferenceCourse ? sampleLessons : [
    { title: `Introduction to ${course.title}`, duration: '12 mins' },
    { title: 'Core ideas and techniques', duration: '21 mins' },
    { title: 'Your practical project', duration: '16 mins' },
  ]
  const displayedKeyPoints = isReferenceCourse ? keyPoints : [
    'Foundational Concepts', 'Practical Techniques', 'Hands-On Exercises',
    'Final Project', 'Continuing Your Learning',
  ]

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title, url })
      else { await navigator.clipboard.writeText(url); setShareMessage('Link copied') }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setShareMessage('Unable to share this link')
    }
  }

  const showLessons = () => {
    setTab('Lessons')
    document.getElementById('course-information')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <section className={`relative bg-blue-800 text-white xl:h-239.25 ${gridPatternClassName}`} aria-labelledby="course-title">
        <div className="relative mx-auto max-w-300 px-5 pt-40 pb-16 xl:px-0 xl:pt-43">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-210">
              <h1 id="course-title" className="font-heading text-heading-s">{title}</h1>
              <p className="mt-2 font-heading text-xl leading-tight">{subtitle}</p>
              <p className="mt-6 text-lg text-blue-50">by <span className="font-medium text-lime-400">{course.creator}</span></p>
              <div className="mt-6 flex flex-wrap gap-4">
                {[
                  { icon: 'level.svg', text: isReferenceCourse ? 'Intermediate' : course.level },
                  { icon: 'star.svg', text: rating },
                  { icon: 'people.svg', text: students },
                ].map((item) => <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-medium text-neutral-950" key={item.icon}><DetailIcon name={item.icon} />{item.text}</span>)}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2"><button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-2 text-base font-medium text-neutral-950 hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><DetailIcon name="share.svg" />Share</button><span role="status" className="text-sm text-blue-50">{shareMessage}</span></div>
          </div>

          <div className="mt-16 grid items-start gap-8 xl:mt-16 xl:grid-cols-[725px_412px] xl:gap-[63px]">
            <div className="relative aspect-[720/479] overflow-hidden rounded-card bg-neutral-100">
              <Image src={isReferenceCourse ? `${assets}/preview.jpg` : course.image} alt={`${title} course preview`} fill priority sizes="(max-width: 1280px) 100vw, 725px" className="object-cover" />
              <button type="button" onClick={showLessons} aria-label="Explore course lessons" className="absolute left-1/2 top-1/2 flex size-26 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-card border border-white/20 bg-neutral-800/25 p-4 backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><DetailIcon name="play.svg" size={72} /></button>
            </div>
            <aside className="relative z-10 rounded-card border border-neutral-200 bg-white p-6 text-neutral-950 shadow-sm sm:p-10" aria-label="Course enrollment">
              <h2 className="font-heading text-xl">{lessons} Lessons ({duration})</h2>
              <ol className="mt-6 space-y-3 text-sm">{displayedLessons.map((lesson, index) => <li className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-start gap-2" key={lesson.title}><span>{String(index + 1).padStart(2, '0')}</span><span className="font-medium">{lesson.title}</span><span className="text-blue-700">{lesson.duration}</span></li>)}</ol>
              <p className="mt-3 text-sm text-neutral-700">{Math.max(lessons - 3, 0)} more videos</p>
              <p className="mt-6 text-base leading-relaxed text-neutral-700">Ready to Dive In? Enroll Now and Start Building Your Digital Future!</p>
              <p className="mt-5 font-heading text-4xl text-blue-800">${course.price}<span className="font-sans text-base font-normal text-neutral-700">/lifetime</span></p>
              <ButtonLink href="/signup" className="mt-5 w-full">Enroll Now</ButtonLink>
              <h3 className="mt-7 font-heading text-xl">This course include</h3>
              <ul className="mt-5 space-y-3 text-base text-neutral-700">{included.map((item) => <li className="flex items-center gap-2" key={item.label}><DetailIcon name={item.icon} />{item.label}</li>)}</ul>
              <div className="mt-6 border-t border-neutral-200 pt-6"><div className="flex items-center gap-3"><Image src={`${assets}/creator.png`} width={52} height={52} alt="PurePearl Studio creator" className="rounded-full" /><div><p className="text-lg font-medium">PurePearl Studio</p><p className="text-base text-neutral-700">Professional Creator</p></div></div><p className="mt-6 text-base leading-relaxed text-neutral-700">Ready to Dive In? Enroll Now and Start Building Your Digital Future!</p><button type="button" aria-expanded={showCreator} onClick={() => setShowCreator(!showCreator)} className="mt-6 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-500">{showCreator ? 'Hide Profile' : 'See Full Profile'}</button>{showCreator && <p className="mt-4 rounded-xl bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-700">PurePearl Studio creates practical courses for curious learners, with a focus on digital design and creative skills.</p>}</div>
            </aside>
          </div>
        </div>
      </section>

      <section id="course-information" className="mx-auto max-w-300 scroll-mt-22 px-5 pt-16 pb-30 xl:min-h-308 xl:px-0" aria-label="Course information">
        <div className="max-w-181.25">
          <div role="tablist" aria-label="Course information sections" className="flex flex-wrap gap-4">{(['About', 'Lessons', 'Reviews'] as const).map((item) => <button type="button" role="tab" id={`tab-${item.toLowerCase()}`} aria-selected={tab === item} aria-controls={`panel-${item.toLowerCase()}`} onClick={() => setTab(item)} key={item} className={`rounded-full px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${tab === item ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}>{item}</button>)}</div>
          {tab === 'About' && <div role="tabpanel" id="panel-about" aria-labelledby="tab-about" className="mt-10"><h2 className="font-heading text-xl">Description</h2>{isReferenceCourse ? <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-700"><p>Embark on an enlightening exploration into the world of digital creation with our comprehensive course, &quot;Build Digital Assets: A Comprehensive Guide.&quot; This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.</p><p>In the initial modules, you&apos;ll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.</p><p>As you progress through the course, you&apos;ll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.</p></div> : <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-700"><p>{course.description}</p><p>Start with the essential ideas, then apply each lesson through practical exercises. The course is designed to help you build confidence at your own pace.</p><p>By the end, you&apos;ll have a clearer process and a project that demonstrates what you&apos;ve learned.</p></div>}
            <h2 className="mt-8 font-heading text-xl">Sneak Peak</h2><div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">{sneakImages.map((file, index) => <div className="relative aspect-[167/125] overflow-hidden rounded-2xl" key={file}><Image src={`${assets}/${file}`} alt={`Course preview ${index + 1}`} fill sizes="(max-width: 640px) 50vw, 167px" className="object-cover" /></div>)}</div>
            <h2 className="mt-8 font-heading text-xl">Key Points</h2><ul className="mt-5 space-y-3">{displayedKeyPoints.map((point) => <li className="flex items-start gap-2 text-base text-neutral-700" key={point}><DetailIcon name="check.svg" />{point}</li>)}</ul>
          </div>}
          {tab === 'Lessons' && <div role="tabpanel" id="panel-lessons" aria-labelledby="tab-lessons" className="mt-10"><h2 className="font-heading text-xl">Course lessons</h2><p className="mt-3 text-neutral-700">Explore a preview of the {lessons} lessons in this course.</p><ol className="mt-6 divide-y divide-neutral-200 rounded-card border border-neutral-200">{displayedLessons.map((lesson, index) => <li className="flex items-start justify-between gap-4 px-5 py-5" key={lesson.title}><span className="font-medium">{String(index + 1).padStart(2, '0')}. {lesson.title}</span><span className="shrink-0 text-sm text-blue-700">{lesson.duration}</span></li>)}</ol><p className="mt-4 text-neutral-500">Enroll to access the remaining lessons.</p></div>}
          {tab === 'Reviews' && <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews" className="mt-10"><h2 className="font-heading text-xl">Student reviews</h2><p className="mt-4 text-3xl font-semibold text-blue-800">{course.rating} <span className="text-lg text-lime-600">★★★★★</span></p><p className="mt-2 text-neutral-700">Learners appreciate the clear explanations and practical exercises in this course.</p></div>}
        </div>
      </section>
    </main>
  )
}
