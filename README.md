# ByteSpace

A responsive course marketplace built for the **ByteSpace New frontend assessment**. The required landing page follows the supplied design. Login and signup are bonus pages; course and creator views show how the same interface works with reusable, connected demo data.

## Reviewer guide

| Reference | Link                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| Design    | [ByteSpace New Figma file](https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website?node-id=0-1) |
| Source    | [GitHub repository](https://github.com/mdnuruzzamannirob/bytespace-assessment)                                          |
| Live site | [ByteSpace on Vercel](https://bytespace-assessment-mdnuruzzaman.vercel.app)                                             |

A short review path:

1. Open `/` on desktop and mobile to review the complete landing page and responsive layout.
2. Open `/login` and `/signup` for the bonus authentication screens. The credentials below work without creating an account.
3. Open `/courses` to try search, filters, sorting, pagination, and a shareable filtered URL.
4. Open `/courses/2`: the **Lessons** tab shows sample enrollment progress; **Reviews** shows course-specific illustrative feedback and rating filters. `/courses/9` is another sample enrolled course. Open `/courses/3` to see **Enroll Now** and the pre-enrollment progress message.
5. Open `/creators` and `/creators/purepearl-studio` to review creator-specific course data and follow controls. `/creators/rida-hossain` shows the no-course empty state.

Course enrollment and follow state are stored in the current browser. To repeat the initial walkthrough after interacting with them, use a fresh browser profile or clear this site's local storage.

## Assessment scope

| Scope      | Implemented                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required   | Full responsive landing page based on the Figma design                                                                                                          |
| Bonus      | Login and signup pages with client-side demo authentication                                                                                                     |
| Additional | Course catalog, course details, lessons, reviews, creator directory and profiles, demo enrollment and progress, empty states, and a shared not-found experience |

The supplied screens are available in [`docs/screens`](./docs/screens). Their implementation and the added behavior are mapped below.

| Design reference                                                           | Implemented page and added behavior                                                                        |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [Home](./docs/screens/Home.png)                                            | Responsive landing page, course/category links, search, and sample artwork metrics                         |
| [Search Page](./docs/screens/Search%20Page.png)                            | `/courses` search, filters, sorting, pagination, and shareable URL state                                   |
| [Course Details](./docs/screens/Course%20Details.png)                      | `/courses/[id]` course-specific metadata, creator relationship, and demo enrollment state                  |
| [Course Lessons](./docs/screens/Course%20Lessons.png)                      | Course-specific module outline, lesson completion indicators, and calculated progress for enrolled courses |
| [Course Reviews](./docs/screens/Course%20Reviews.png)                      | Course-specific illustrative review cards, rating distribution, and rating filters                         |
| [Creator Profile](./docs/screens/Creator%20Profile.png)                    | Derived course/follower details, follow control, creator filtering, and no-course empty state              |
| [Login](./docs/screens/Login.png), [Register](./docs/screens/Register.png) | Bonus client-side demo authentication screens                                                              |
| [404 Not Found](./docs/screens/404%20Not%20Found.png)                      | Shared not-found experience for unknown routes                                                             |

Interactive controls and explicit demo states extend these static references. Course progress is calculated from completed lessons; the landing page's **Example Progress** artwork is illustrative.

## Tech stack

| Technology              | How it is used                                                       |
| ----------------------- | -------------------------------------------------------------------- |
| Next.js 16 App Router   | Routes, layouts, static course and creator pages, and page metadata  |
| React 19 and TypeScript | Component-based UI, typed catalog data, and interactive client state |
| Tailwind CSS 4          | Responsive styling and reusable visual patterns                      |
| Swiper                  | Course category rail                                                 |
| React Icons             | Interface icons                                                      |
| Vitest                  | Catalog, URL-state, and data-consistency tests                       |
| ESLint and Prettier     | Code checks, formatting, and Tailwind class ordering                 |
| pnpm and Vercel         | Package management and public deployment                             |

## Run locally

Requirements: Node.js 20+ and pnpm 11+.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables, backend, database, or external API credentials are required.

For a production build:

```bash
pnpm build
pnpm start
```

### Demo sign-in

| Field    | Value                |
| -------- | -------------------- |
| Email    | `demo@bytespace.dev` |
| Password | `demo12345`          |

Signup and social sign-in are browser-only demonstrations. Signup credentials and sessions are stored in `localStorage`; use a unique test password. Google and Facebook buttons create local demo sessions and do not contact those providers.

## Routes and behavior

| Route               | What to review                                                                       |
| ------------------- | ------------------------------------------------------------------------------------ |
| `/`                 | Landing page sections, featured courses, categories, and responsive layout           |
| `/courses`          | Course search, filters, sorting, pagination, and URL query state                     |
| `/courses/[id]`     | Course metadata, lesson outline, demo enrollment/progress, reviews, and creator link |
| `/creators`         | Searchable creator directory, follow controls, and pagination                        |
| `/creators/[slug]`  | Creator profile, derived course count, and no-course empty state                     |
| `/login`, `/signup` | Bonus authentication screens and client-side demo flow                               |
| `/coming-soon`      | Fallback for navigation destinations without a service behind them                   |

Five catalog courses (`1`, `2`, `9`, `25`, and `35`) start with illustrative enrollment progress so the Lessons tab can be reviewed immediately. Other courses show **Enroll Now** until enrolled. On enrolled courses, selecting an unfinished lesson advances the local demo progress, and the primary button reads **Already Enrolled**. Progress is browser-local and is not linked to a real learning service.

## Architecture and data

```text
src/
  app/                  App Router pages, layouts, and route metadata
  components/           Feature components, layouts, and reusable UI controls
  lib/
    constants/          Navigation and presentation data
    demo-data/          Course, creator, lesson, review, and enrollment fixtures
    catalog.ts          Lookup, filtering, sorting, and derived marketplace metrics
    course-query.ts     Course URL query parsing and serialization
    auth-session.ts     Client-side demo account and session helpers
public/assets/          Local images and icons
docs/screens/            Supplied page design references
tests/                   Catalog, query-state, and data-consistency tests
```

Courses in [`src/lib/demo-data/courses.ts`](./src/lib/demo-data/courses.ts) reference creators by `creatorSlug`. [`src/lib/catalog.ts`](./src/lib/catalog.ts) derives creator product counts and marketplace totals from the catalog. Course-specific topics in [`course-outlines.ts`](./src/lib/demo-data/course-outlines.ts) feed [`course-details.ts`](./src/lib/demo-data/course-details.ts), which produces lesson modules whose counts and durations match the course metadata. [`course-reviews.ts`](./src/lib/demo-data/course-reviews.ts) builds course-specific sample review cards and rating distributions aligned with each course's displayed rating and review count. Two creators have no published courses to exercise the empty profile state.

Interactive browser state is kept in small client providers: demo authentication, creator follows, and course enrollment/progress. Catalog filtering and query parsing live outside the UI components so the same course data can be reused across the landing page, catalog, detail views, and creator profiles.

## Demo content and limits

- Courses, creators, enrollment counts, reviews, ratings, and marketplace figures are **demo data**. Written reviews and the three landing-page testimonials are illustrative; they are not verified learner statements.
- Enrollment, learning progress, creator follows, signup accounts, and sessions are local to a browser. There is no payment, server authorization, or persistent backend account.
- Shopping bag, newsletter delivery, and legal or information destinations are visual/demo flows without connected services. The `/coming-soon` route handles unreleased destinations.
- The lesson outline and completion controls demonstrate the interface; lesson media is not hosted in this project.

## Quality checks

```bash
pnpm format:check
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
```

`pnpm format` applies Prettier and sorts Tailwind classes. Vitest covers course/creator relationships, filters and URL queries, lesson totals and duration, review totals and weighted ratings, and sample progress.
