// SRS (Spaced Repetition System) - SM-2 Algorithm

export interface SRSData {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  lastReview: number;
}

export const INITIAL_SRS_DATA: SRSData = {
  easeFactor: 2.5,
  interval: 0,
  repetitions: 0,
  nextReview: Date.now(),
  lastReview: Date.now(),
};

// Quality rating (0-5)
// 0-2: Failed (reset repetitions)
// 3-5: Passed (increase interval)
export function calculateNextReview(
  data: SRSData,
  quality: number
): SRSData {
  let { easeFactor, interval, repetitions } = data;

  if (quality < 3) {
    // Failed - reset
    repetitions = 0;
    interval = 1;
  } else {
    // Passed
    repetitions += 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Calculate new ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  return {
    easeFactor,
    interval,
    repetitions,
    nextReview: Date.now() + interval * 24 * 60 * 60 * 1000,
    lastReview: Date.now(),
  };
}

export function isDueForReview(data: SRSData): boolean {
  return Date.now() >= data.nextReview;
}

export function getWeakWords<T extends { id: string; srsData?: SRSData }>(
  words: T[],
  limit: number = 10
): T[] {
  return words
    .filter((w) => w.srsData && w.srsData.easeFactor < 2.3)
    .sort((a, b) => {
      if (!a.srsData || !b.srsData) return 0;
      return a.srsData.easeFactor - b.srsData.easeFactor;
    })
    .slice(0, limit);
}
