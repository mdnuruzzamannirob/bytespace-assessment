import Image from 'next/image'

import { partnerLogos } from '@/constants/home'

export function PartnersSection() {
  return (
    <section aria-label="Our partners" className="bg-neutral-50">
      <div className="mx-auto grid min-h-50.5 max-w-300 grid-cols-2 items-center justify-items-center gap-8 px-5 py-12 sm:grid-cols-3 lg:grid-cols-5">
        {partnerLogos.map((logo) => (
          <Image
            key={logo}
            src={`/assets/logoipsum-${logo}-logo.png`}
            alt="Logoipsum"
            width={170}
            height={42}
            className="h-auto max-w-35 opacity-75 sm:max-w-42"
          />
        ))}
      </div>
    </section>
  )
}
