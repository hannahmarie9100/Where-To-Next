"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import { DESTINATIONS } from "@/lib/destinations";

export default function ExplorePage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DESTINATIONS;
    return DESTINATIONS.filter(
      (d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <Link href="/" className="text-sm text-sky-600 hover:underline dark:text-sky-400">
        ← Back
      </Link>

      <header className="mb-8 mt-4">
        <h1 className="text-4xl font-bold tracking-tight">Search destinations</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Already know where you want to go? Search for it below.
        </p>
      </header>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try a city or country, e.g. Tokyo"
        className="mb-8 w-full rounded-lg border border-zinc-300 px-4 py-2.5 outline-none focus:border-sky-500 dark:border-zinc-700 dark:bg-zinc-900"
      />

      {results.length === 0 ? (
        <p className="text-zinc-500">No destinations match &quot;{query}&quot;.</p>
      ) : (
        <ol className="space-y-4">
          {results.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </ol>
      )}
    </main>
  );
}
