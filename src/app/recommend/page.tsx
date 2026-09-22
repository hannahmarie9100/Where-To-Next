"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import { recommend } from "@/lib/recommend";
import { INTERESTS, type Budget, type Interest } from "@/lib/types";

const BUDGETS: { value: Budget; label: string }[] = [
  { value: "budget", label: "Affordable" },
  { value: "mid", label: "Mid-range" },
  { value: "luxury", label: "Luxury" },
];

const FIT_LABEL = {
  match: "Fits your budget",
  close: "Slightly off budget",
  off: "Outside your budget",
} as const;

export default function RecommendPage() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [budget, setBudget] = useState<Budget>("mid");

  // Recomputed only when the inputs change.
  const results = useMemo(
    () => recommend({ interests, budget }),
    [interests, budget],
  );

  const toggle = (i: Interest) =>
    setInterests((cur) =>
      cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i],
    );

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <Link
        href="/"
        className="text-sm text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Back
      </Link>

      <header className="mb-10 mt-4">
        <h1 className="text-4xl font-bold tracking-tight">Help me decide</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Tell us what you love. We&apos;ll find where to go.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          What vibe are you going for?
        </h2>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => {
            const on = interests.includes(i);
            return (
              <button
                key={i}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
                  on
                    ? "border-sky-600 bg-sky-600 text-white"
                    : "border-zinc-300 hover:border-sky-500 dark:border-zinc-700"
                }`}
              >
                {i}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Budget
        </h2>
        <div className="inline-flex overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700">
          {BUDGETS.map((b) => (
            <button
              key={b.value}
              type="button"
              aria-pressed={budget === b.value}
              onClick={() => setBudget(b.value)}
              className={`px-4 py-2 text-sm transition ${
                budget === b.value
                  ? "bg-sky-600 text-white"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        {interests.length === 0 ? (
          <p className="text-zinc-500">
            Pick at least one interest to see destinations.
          </p>
        ) : (
          <ol className="space-y-4">
            {results.map(({ destination, score, matched, budgetFit }) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                match={{ score, matched, budgetFitLabel: FIT_LABEL[budgetFit] }}
              />
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
