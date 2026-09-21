# Where To Next

Tell the app what you love, and it ranks destinations for you. Group trips, voting and flight logistics are on the way.

**Live demo:** (https://wheretonext-pvtuth423-hannahmarie9100s-projects.vercel.app/)

![Where To Next screenshot] (docs/README_screenshot.png)

## Features

**Available now**

- Pick interests and a budget to get a ranked list of destinations
- Each result shows a match percentage, why it matched, whether it fits your budget, and suggested activities
- Results update instantly as you change your choices

**Planned**

- Accounts and saved trips
- Group trips: everyone adds their interests, and the app ranks destinations that work for the whole group, not just the majority
- Live group voting on destinations and activities
- Flight logistics: given a flight, compare Uber vs. driving (with airport parking cost) and show terminal and gate info
- Real destination and activity data from external APIs

## How the recommendations work

Each destination has an ordered list of tags, strongest first. For a search:

1. **Interest score:** each matching interest earns points based on its position in the destination's tag list, so a destination that is _mainly_ about food scores higher for "food" than one where food is an afterthought. The total is divided by the maximum possible, giving a score between 0 and 1.
2. **Budget adjustment:** the score is multiplied by 1.0, 0.85 or 0.6 depending on how far the destination's price level is from yours.
3. **Filter and sort:** destinations with no matching interest are dropped, and the rest are sorted best first.

The logic lives in [`src/lib/recommend.ts`](src/lib/recommend.ts). It has no UI code in it, so it can be unit tested and reused for group trips.

## Tech stack

- [Next.js](https://nextjs.org) (App Router), React, TypeScript
- Tailwind CSS
- Vitest for unit tests
- Deployed on Vercel

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command              | What it does               |
| -------------------- | -------------------------- |
| `npm run dev`        | Start the dev server       |
| `npm test`           | Run the tests once         |
| `npm run test:watch` | Re-run tests on every save |
| `npm run lint`       | Check code style           |
| `npm run build`      | Production build           |

## Project structure

```
src/
├── lib/
│   ├── types.ts            Data shapes and the list of interests
│   ├── destinations.ts     Destination catalog
│   ├── recommend.ts        Scoring and ranking
│   └── recommend.test.ts   Unit tests for the scoring
└── app/
    ├── layout.tsx          Page shell and metadata
    └── page.tsx            Interest picker and results
```

## Roadmap

- [x] Solo recommendations with tests
- [x] Deployed to Vercel
- [ ] Authentication and database (Supabase)
- [ ] Group trips with fair-match scoring
- [ ] Real-time voting
- [ ] Flight logistics (Uber vs. drive, parking, gate info)
- [ ] Real destination data via external APIs
