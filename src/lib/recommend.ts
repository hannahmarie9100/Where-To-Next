import { DESTINATIONS } from "./destinations";
import type { Budget, Destination, Interest, Preferences, Recommendation } from "./types";

const BUDGET_RANK: Record<Budget, number> = { budget: 0, mid: 1, luxury: 2 };

/**
 * Interest score for one destination: 0-1.
 * Earlier tags count more (position weighting), measured against the best
 * this destination could do for this many interests.
 */
export function interestScore(
  dest: Destination,
  interests: Interest[],
): { score: number; matched: Interest[] } {
  if (interests.length === 0) return { score: 0, matched: [] };

  const weight = (tag: Interest) => {
    const i = dest.tags.indexOf(tag);
    return i === -1 ? 0 : dest.tags.length - i; // first tag is worth the most
  };

  const matched = interests.filter((t) => weight(t) > 0);
  const earned = matched.reduce((sum, t) => sum + weight(t), 0);
  const possible = interests.length * dest.tags.length;
  return { score: earned / possible, matched };
}

export function budgetFit(dest: Destination, budget: Budget): Recommendation["budgetFit"] {
  const gap = Math.abs(BUDGET_RANK[dest.budget] - BUDGET_RANK[budget]);
  return gap === 0 ? "match" : gap === 1 ? "close" : "off";
}

const BUDGET_MULTIPLIER = { match: 1, close: 0.85, off: 0.6 } as const;

export function recommend(
  prefs: Preferences,
  catalog: Destination[] = DESTINATIONS,
): Recommendation[] {
  return catalog
    .map((destination) => {
      const { score, matched } = interestScore(destination, prefs.interests);
      const fit = budgetFit(destination, prefs.budget);
      return {
        destination,
        score: Math.round(score * BUDGET_MULTIPLIER[fit] * 100),
        matched,
        budgetFit: fit,
      };
    })
    .filter((r) => r.matched.length > 0)
    .sort((a, b) => b.score - a.score);
}
