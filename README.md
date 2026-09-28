# ByteSpace Assessment

Next.js 16, React 19, TypeScript, and Tailwind CSS 4 project for the ByteSpace course platform design in [docs](./docs).

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). To check the project setup, run `pnpm lint` and `pnpm build`.

## Design foundation

The global design tokens live in [src/app/globals.css](./src/app/globals.css), based on the three files in [docs/Style](./docs/Style):

- Primary blue: `#0043ff`; accent lime: `#bcfc01`; neutral, blue, and lime scales are available as Tailwind colors.
- Headings: Poppins SemiBold, with 72/44/36/20px desktop reference sizes. Body and labels: Satoshi at the sizes in the typography guide.
- Desktop content width: 1200px at 1440px viewport width, leaving 120px on each side. The `.site-grid` helper uses 12 columns and 40px gaps; it changes to 8 and 4 columns on smaller screens.
- Use `.site-container` for section alignment and `.type-heading-*`, `.type-body-*`, or `.type-label-*` when matching the type scale.

Poppins is loaded with `next/font/google`. Satoshi is served by [Fontshare](https://www.fontshare.com/fonts/satoshi) through its CSS endpoint, so the first visit needs access to Fontshare; Arial is the fallback. Design screenshots are references, not page assets.

## Current implementation

This branch establishes global typography, colors, spacing helpers, metadata, and the responsive grid. The page routes and sections from the design references are the next implementation step.
