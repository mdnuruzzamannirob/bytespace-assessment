import Image from 'next/image'

import { DetailIcon } from './DetailPrimitives'

export function CourseOverview({
  description,
  keyPoints,
  previewImages,
}: {
  description: string[]
  keyPoints: string[]
  previewImages: string[]
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
      <div
        className={`mt-6 grid gap-4 ${previewImages.length > 1 ? 'grid-cols-2 sm:grid-cols-4' : 'max-w-100'}`}
      >
        {previewImages.map((file, index) => (
          <div className="relative aspect-video overflow-hidden rounded-2xl" key={file}>
            <Image
              src={file}
              alt={`Course preview ${index + 1}`}
              fill
              sizes={
                previewImages.length > 1
                  ? '(max-width: 640px) 50vw, 167px'
                  : '(max-width: 640px) 100vw, 400px'
              }
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
