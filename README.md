# ByteSpace

ByteSpace is a responsive course marketplace demo built from the ByteSpace design references in [`docs/`](./docs). It includes a course catalog, creator directory, course detail views, persistent demo authentication, responsive navigation, and reusable feedback UI.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Swiper for the course category rail
- React Icons
- Prettier with Tailwind class sorting

## Getting Started

Requirements: Node.js 20+ and pnpm 11+.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Authentication

The project uses a client-side demo authentication flow. No backend or real OAuth provider is required.

| Field    | Demo value           |
| -------- | -------------------- |
| Email    | `demo@bytespace.dev` |
| Password | `demo12345`          |

Signup users and the active session are persisted in `localStorage`. Google and Facebook buttons create demo social sessions only; they do not connect to real OAuth services. The header shows the current session, an initials avatar, an account popover, and a sign-out action.

## Routes

| Route              | Purpose                                                            |
| ------------------ | ------------------------------------------------------------------ |
| `/`                | Homepage and featured course discovery                             |
| `/courses`         | Searchable, filterable, sortable course catalog                    |
| `/courses/[id]`    | Data-driven course details, lessons, reviews, and enrollment panel |
| `/creators`        | Searchable and paginated creator directory                         |
| `/creators/[slug]` | Creator profile and creator-specific courses                       |
| `/login`           | Demo sign-in                                                       |
| `/signup`          | Demo account creation                                              |
| `/coming-soon`     | Shared fallback for unreleased navigation destinations             |

## Project Structure

```text
src/
  app/                  App Router pages, layouts, and metadata
  components/           Feature sections and reusable UI primitives
  lib/
    constants/          Navigation, catalog, and homepage constants
    demo-data/          Courses, creators, and course detail content
    auth-session.ts     Client-side demo session helpers
    catalog.ts          Course and creator lookup/filter/sort helpers
public/assets/          Local course, creator, and design assets
docs/                   Design references and screen captures
```

## Data Model

Courses reference creators through `creatorSlug`. Creator product counts are derived from the course catalog rather than manually maintained. Catalog behavior is centralized in [`src/lib/catalog.ts`](./src/lib/catalog.ts), including:

- `getCourseById`
- `getCreatorBySlug`
- `getCoursesByCreator`
- `filterCourses`
- `sortCourses`

Course detail content lives in [`src/lib/demo-data/course-details.ts`](./src/lib/demo-data/course-details.ts), while the UI is split into focused overview, lesson, and review components.

## Quality Checks

```bash
pnpm format       # Format source files and sort Tailwind classes
pnpm format:check # Check formatting without changing files
pnpm lint         # Run ESLint
pnpm exec tsc --noEmit
pnpm build        # Create the production build
```

Prettier configuration is kept intentionally small in [`.prettierrc.json`](./.prettierrc.json), with generated files and binary asset directories excluded in [`.prettierignore`](./.prettierignore).
