import type { Destination } from "@/lib/types";

/**
 * Optional match info, shown only on the recommendation results
 * (the explore/search page doesn't have a score to show).
 */
interface MatchInfo {
  score: number;
  matched: string[];
  budgetFitLabel: string;
}

export function DestinationCard({
  destination: d,
  match,
}: {
  destination: Destination;
  match?: MatchInfo;
}) {
  return (
    <li className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold">
          {d.name}, <span className="font-normal text-zinc-500">{d.country}</span>
        </h3>
        {match && (
          <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800 dark:bg-sky-900 dark:text-sky-100">
            {match.score}% match
          </span>
        )}
      </div>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">{d.blurb}</p>
      {match && (
        <p className="mt-3 text-sm">
          <span className="font-medium">Why:</span>{" "}
          <span className="capitalize">{match.matched.join(", ")}</span>
          <span className="text-zinc-500"> · {match.budgetFitLabel}</span>
        </p>
      )}
      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
        {d.activities.map((a) => (
          <li key={a} className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
            {a}
          </li>
        ))}
      </ul>
    </li>
  );
}
