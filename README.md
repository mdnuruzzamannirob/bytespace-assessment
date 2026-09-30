# ByteSpace

ByteSpace is a responsive course marketplace demo built from the ByteSpace design references in [`docs/`](./docs). It includes a course catalog, creator directory, course detail views, persistent demo authentication, responsive navigation, and reusable feedback UI.

## Assessment review

- [Figma design](https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website?node-id=0-1)
- [Public source repository](https://github.com/mdnuruzzamannirob/bytespace-assessment)
- Start at `/` for the complete responsive landing page. `/login` and `/signup` are bonus pages; the course and creator views demonstrate reusable data-driven components.
- Search, filtering, sorting, pagination, share/copy, and local follow controls are interactive. Course content, illustrative reviews, progress, testimonials, and marketplace figures are sample content. Demo enrollments and lesson progress work locally in the browser; shopping bag, newsletter delivery, and legal/info pages are not connected to services.
- Authentication is a browser-only demonstration. Signup credentials are stored in localStorage on that browser; use a unique test password. Google and Facebook controls create local demo sessions without contacting those providers. No server authorization is implemented.

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
    demo-data/          Courses, creators, lesson outlines, and sample reviews
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

The course catalog in [`src/lib/demo-data/courses.ts`](./src/lib/demo-data/courses.ts) is the source for course metadata, rating, review count, lesson count, duration, enrollments, and creator relationships. Course-specific topics live in [`src/lib/demo-data/course-outlines.ts`](./src/lib/demo-data/course-outlines.ts). [`src/lib/demo-data/course-details.ts`](./src/lib/demo-data/course-details.ts) builds the lesson modules from those topics so their counts and minutes match the catalog. [`src/lib/demo-data/course-reviews.ts`](./src/lib/demo-data/course-reviews.ts) supplies illustrative, course-specific review cards and rating distributions whose counts and rounded average match each course. These cards are demo examples, not verified customer reviews. Creator product counts and platform totals are derived from the catalog; follower counts start from creator demo data and reflect local follow changes. Courses start unenrolled. After a visitor enrolls, the Lessons tab shows completion status and progress computed from that course’s actual lesson count; demo enrollment and progress persist in `localStorage`. The 55% homepage artwork is a labelled example. The three homepage testimonials remain design-specific sample content.

## Quality Checks

```bash
pnpm format       # Format source files and sort Tailwind classes
pnpm format:check # Check formatting without changing files
pnpm lint         # Run ESLint
pnpm exec tsc --noEmit
pnpm test         # Catalog, query-state, and cross-page data consistency checks
pnpm build        # Create the production build
```

Prettier configuration is kept intentionally small in [`.prettierrc.json`](./.prettierrc.json), with generated files and binary asset directories excluded in [`.prettierignore`](./.prettierignore).
