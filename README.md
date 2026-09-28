# ByteSpace Assessment

Next.js 16, React 19, TypeScript, and Tailwind CSS 4 project for the ByteSpace course platform design in [docs](./docs).

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Check the project with `pnpm lint` and `pnpm build`.

## Tailwind design system

[src/app/globals.css](./src/app/globals.css) defines semantic colors in `:root` and exposes them with Tailwind `@theme inline` tokens. The light palette and typography come from the PNGs in [docs/Style](./docs/Style). A `.dark` palette is sketched in comments for future work, but dark mode is currently disabled. Use Tailwind classes in components for page styling:

- Colors: `bg-primary` (`#0043ff` in light mode), `bg-accent` (`#bcfc01`), `bg-surface`, `text-foreground`, `text-muted`, and the neutral/blue/lime scales. These semantic utilities change with the root theme.
- Typography: `font-heading text-heading-l` for the main title, `text-heading-m/s/xs` for smaller headings, `text-body-l/m/s/xs` for copy, and `text-label-l/m/s/xs` for labels. Heading tokens include Poppins SemiBold; body and label tokens use Satoshi.
- Layout: `max-w-site` is 1440px. With `px-30` at the `wide` breakpoint, content is 1200px wide with 120px side margins. `wide` starts at 1440px.

The design reference is light only. A future dark theme will need the commented `.dark` palette and `@custom-variant dark` enabled together, plus visual review.

Example section and grid:

```tsx
<section className="mx-auto w-full max-w-site px-5 md:px-10 wide:px-30">
  <h2 className="font-heading text-heading-m">Discover your passion</h2>
  <div className="grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-6 wide:grid-cols-12 wide:gap-10">
    {/* Cards go here */}
  </div>
</section>
```

Poppins is loaded through `next/font/google`. Satoshi is served by [Fontshare](https://www.fontshare.com/fonts/satoshi) through its CSS endpoint, so the first visit needs access to Fontshare; Arial is the fallback. Design screenshots are references, not page assets.

## Current implementation

This branch establishes the Tailwind design tokens, root typography, metadata, and responsive layout conventions. Page routes and sections are the next implementation step.
