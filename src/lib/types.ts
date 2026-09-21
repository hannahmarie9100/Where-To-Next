export const INTERESTS = [
  "beach",
  "food",
  "hiking",
  "nightlife",
  "culture",
  "history",
  "shopping",
  "wellness",
  "adventure",
  "wildlife",
  "romantic",
  "skiing",
] as const;

export type Interest = (typeof INTERESTS)[number];

export type Budget = "budget" | "mid" | "luxury";

export interface Destination {
  id: string;
  name: string;
  country: string;
  blurb: string;
  budget: Budget;
  /** Interests this place is genuinely good for, strongest first. */
  tags: Interest[];
  activities: string[];
}

export interface Preferences {
  interests: Interest[];
  budget: Budget;
}

export interface Recommendation {
  destination: Destination;
  /** 0-100 */
  score: number;
  matched: Interest[];
  budgetFit: "match" | "close" | "off";
}
