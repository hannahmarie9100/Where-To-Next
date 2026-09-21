"use client";

import { useMemo, useState } from "react";
import { recommend } from "@/lib/recommend";
import { INTERESTS, type Budget, type Interest } from "@/lib/types";

const BUDGETS: { value: Budget; label: string }[] = [
  { value: "budget", label: "Budget" },
  { value: "mid", label: "Mid-range" },
  { value: "luxury", label: "Luxury" },
];

const FIT_LABEL = {
  match: "Fits your budget",
  close: "Slightly off budget",
  off: "Outside your budget",
} as const;

export default function Home() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [budget, setBudget] = useState<Budget>("mid");

  // Recomputed only when the inputs change.
  const results = useMemo(() => recommend({ interests, budget }), [interests, budget]);

  const toggle = (i: Interest) =>
    setInterests((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Where To Next</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Tell us what you love. We&apos;ll find where to go.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          What are you into?
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
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Budget</h2>
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
          <p className="text-zinc-500">Pick at least one interest to see destinations.</p>
        ) : (
          <ol className="space-y-4">
            {results.map(({ destination: d, score, matched, budgetFit }) => (
              <li
                key={d.id}
                className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold">
                    {d.name}, <span className="font-normal text-zinc-500">{d.country}</span>
                  </h3>
                  <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800 dark:bg-sky-900 dark:text-sky-100">
                    {score}% match
                  </span>
                </div>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">{d.blurb}</p>
                <p className="mt-3 text-sm">
                  <span className="font-medium">Why:</span>{" "}
                  <span className="capitalize">{matched.join(", ")}</span>
                  <span className="text-zinc-500"> · {FIT_LABEL[budgetFit]}</span>
                </p>
                <ul className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {d.activities.map((a) => (
                    <li key={a} className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                      {a}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
