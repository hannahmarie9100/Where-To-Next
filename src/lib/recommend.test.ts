import { describe, expect, it } from "vitest";
import { budgetFit, interestScore, recommend } from "./recommend";
import type { Destination } from "./types";

const place = (over: Partial<Destination> = {}): Destination => ({
  id: "x",
  name: "X",
  country: "Y",
  blurb: "",
  budget: "mid",
  tags: ["beach", "food", "culture"],
  activities: [],
  ...over,
});

describe("interestScore", () => {
  it("returns 0 when the user picked nothing", () => {
    expect(interestScore(place(), [])).toEqual({ score: 0, matched: [] });
  });

  it("returns 0 when nothing matches", () => {
    expect(interestScore(place(), ["skiing"]).score).toBe(0);
  });

  it("gives a perfect score for the top tag alone", () => {
    expect(interestScore(place(), ["beach"]).score).toBe(1);
  });

  it("weights earlier tags more than later ones", () => {
    const first = interestScore(place(), ["beach"]).score;
    const last = interestScore(place(), ["culture"]).score;
    expect(first).toBeGreaterThan(last);
  });

  it("reports which interests matched", () => {
    expect(interestScore(place(), ["food", "skiing"]).matched).toEqual(["food"]);
  });
});

describe("budgetFit", () => {
  it("matches, is close, or is off by budget distance", () => {
    expect(budgetFit(place({ budget: "mid" }), "mid")).toBe("match");
    expect(budgetFit(place({ budget: "mid" }), "luxury")).toBe("close");
    expect(budgetFit(place({ budget: "budget" }), "luxury")).toBe("off");
  });
});

describe("recommend", () => {
  it("excludes destinations with no matching interest", () => {
    const results = recommend({ interests: ["skiing"], budget: "mid" }, [place()]);
    expect(results).toEqual([]);
  });

  it("sorts best score first", () => {
    const strong = place({ id: "strong", tags: ["beach", "food"] });
    const weak = place({ id: "weak", tags: ["culture", "food", "beach"] });
    const ids = recommend({ interests: ["beach"], budget: "mid" }, [weak, strong]).map(
      (r) => r.destination.id,
    );
    expect(ids).toEqual(["strong", "weak"]);
  });

  it("ranks an on-budget destination above an identical off-budget one", () => {
    const cheap = place({ id: "cheap", budget: "budget" });
    const pricey = place({ id: "pricey", budget: "luxury" });
    const ids = recommend({ interests: ["beach"], budget: "budget" }, [pricey, cheap]).map(
      (r) => r.destination.id,
    );
    expect(ids).toEqual(["cheap", "pricey"]);
  });

  it("keeps scores between 0 and 100", () => {
    const results = recommend({ interests: ["beach", "food", "culture"], budget: "mid" });
    for (const r of results) {
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(100);
    }
  });
});
