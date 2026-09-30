import Image from 'next/image'

import { DetailIcon, assets } from './DetailPrimitives'

export function CourseOverview({
  description,
  keyPoints,
}: {
  description: string[]
  keyPoints: string[]
}) {
  return (
    <div role="tabpanel" id="panel-about" aria-labelledby="tab-about" className="mt-10">
      <h2 className="font-heading text-xl">Description</h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-700">
        {description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <h2 className="font-heading mt-8 text-xl">Sneak Peek</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {['sneak-1.jpg', 'sneak-2.jpg', 'sneak-3.jpg', 'sneak-4.jpg'].map((file, index) => (
          <div className="relative aspect-video overflow-hidden rounded-2xl" key={file}>
            <Image
              src={`${assets}/${file}`}
              alt={`Course preview ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 167px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <h2 className="font-heading mt-8 text-xl">Key Points</h2>
      <ul className="mt-5 space-y-3">
        {keyPoints.map((point) => (
          <li className="flex items-start gap-2 text-base text-neutral-700" key={point}>
            <DetailIcon name="check.svg" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
