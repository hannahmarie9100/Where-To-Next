import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-5 py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Where To Next</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Do you already know where you want to go, or would you like some help
        deciding?
      </p>

      <div className="mt-10 grid w-full gap-4 sm:grid-cols-2">
        <Link
          href="/explore"
          className="rounded-xl border border-zinc-200 p-6 text-left transition hover:border-sky-500 hover:shadow-sm dark:border-zinc-800"
        >
          <h2 className="text-lg font-semibold">I know where I want to go</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Search for a destination by name.
          </p>
        </Link>

        <Link
          href="/recommend"
          className="rounded-xl border border-zinc-200 p-6 text-left transition hover:border-sky-500 hover:shadow-sm dark:border-zinc-800"
        >
          <h2 className="text-lg font-semibold">I Need Some Help Deciding</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Tell us your interests and budget, and we&apos;ll find matches.
          </p>
        </Link>
      </div>
    </main>
  );
}
