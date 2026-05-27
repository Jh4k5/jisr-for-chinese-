import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_SRS_DATA, calculateNextReview, type SRSData } from "@/lib/srs";

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  streak: number;
  wordsLearned: number;
  lessonsCompleted: number;
  lastActiveDate: string;
  createdAt: string;
}

export interface WordProgress {
  wordId: string;
  learned: boolean;
  srsData: SRSData;
  lastPracticed: number;
  correctCount: number;
  wrongCount: number;
}

interface LearningState {
  currentUser: User | null;
  wordProgress: Record<string, WordProgress>;
  currentLesson: number;
  dailyStreak: number;
  lastPracticeDate: string;

  // Auth
  setCurrentUser: (user: User | null) => void;
  logout: () => void;

  // Word Progress
  markWordLearned: (wordId: string) => void;
  rateWord: (wordId: string, quality: number) => void;
  getDueCardIds: () => string[];
  getSRSStats: () => { due: number; learned: number; weak: number };
  getWeakWordIds: (limit?: number) => string[];

  // Lesson Progress
  completeLesson: (lessonId: number) => void;
  setCurrentLesson: (lessonId: number) => void;

  // Practice
  recordPractice: (correct: boolean) => void;
  updateStreak: () => void;
}

const getTodayString = () => new Date().toISOString().split("T")[0];

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      wordProgress: {},
      currentLesson: 1,
      dailyStreak: 0,
      lastPracticeDate: "",

      setCurrentUser: (user) => set({ currentUser: user }),

      logout: () => {
        set({
          currentUser: null,
          wordProgress: {},
          currentLesson: 1,
          dailyStreak: 0,
          lastPracticeDate: "",
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("jisr_currentUser");
        }
      },

      markWordLearned: (wordId) => {
        const state = get();
        const progress = state.wordProgress[wordId] || {
          wordId,
          learned: false,
          srsData: INITIAL_SRS_DATA,
          lastPracticed: 0,
          correctCount: 0,
          wrongCount: 0,
        };

        set({
          wordProgress: {
            ...state.wordProgress,
            [wordId]: {
              ...progress,
              learned: true,
              lastPracticed: Date.now(),
            },
          },
        });
      },

      rateWord: (wordId, quality) => {
        const state = get();
        const progress = state.wordProgress[wordId] || {
          wordId,
          learned: false,
          srsData: INITIAL_SRS_DATA,
          lastPracticed: 0,
          correctCount: 0,
          wrongCount: 0,
        };

        const newSrsData = calculateNextReview(progress.srsData, quality);

        set({
          wordProgress: {
            ...state.wordProgress,
            [wordId]: {
              ...progress,
              srsData: newSrsData,
              learned: true,
              lastPracticed: Date.now(),
              correctCount: progress.correctCount + (quality >= 3 ? 1 : 0),
              wrongCount: progress.wrongCount + (quality < 3 ? 1 : 0),
            },
          },
        });
      },

      getDueCardIds: () => {
        const state = get();
        const now = Date.now();
        return Object.entries(state.wordProgress)
          .filter(([, p]) => p.srsData.nextReview <= now)
          .map(([id]) => id);
      },

      getSRSStats: () => {
        const state = get();
        const now = Date.now();
        let due = 0;
        let learned = 0;
        let weak = 0;

        Object.values(state.wordProgress).forEach((p) => {
          if (p.learned) learned++;
          if (p.srsData.nextReview <= now) due++;
          if (p.learned && p.srsData.easeFactor < 2.3) weak++;
        });

        return { due, learned, weak };
      },

      getWeakWordIds: (limit = 10) => {
        const state = get();
        return Object.entries(state.wordProgress)
          .filter(([, p]) => p.learned && p.srsData.easeFactor < 2.3)
          .sort(([, a], [, b]) => a.srsData.easeFactor - b.srsData.easeFactor)
          .slice(0, limit)
          .map(([id]) => id);
      },

      completeLesson: (lessonId) => {
        const state = get();
        if (state.currentUser) {
          set({
            currentUser: {
              ...state.currentUser,
              lessonsCompleted: Math.max(
                state.currentUser.lessonsCompleted,
                lessonId
              ),
            },
          });
        }
      },

      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),

      recordPractice: (correct) => {
        const state = get();
        const today = getTodayString();

        if (state.lastPracticeDate !== today) {
          if (state.lastPracticeDate === getYesterdayString()) {
            set({
              dailyStreak: state.dailyStreak + 1,
              lastPracticeDate: today,
            });
          } else {
            set({ dailyStreak: 1, lastPracticeDate: today });
          }
        }
      },

      updateStreak: () => {
        const state = get();
        const today = getTodayString();

        if (state.lastPracticeDate !== today) {
          const yesterday = getYesterdayString();
          if (state.lastPracticeDate === yesterday) {
            set({ dailyStreak: state.dailyStreak + 1, lastPracticeDate: today });
          } else if (state.lastPracticeDate !== today) {
            set({ dailyStreak: 1, lastPracticeDate: today });
          }
        }
      },
    }),
    {
      name: "jisr-learning-storage",
    }
  )
);

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}
