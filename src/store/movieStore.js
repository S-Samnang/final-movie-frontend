import { create } from "zustand";
import { persist } from "zustand/middleware";

export const movieStore = create(
  persist(
    (set) => ({
      currentMovie: null,
      setCurrentMovie: (movie) => set({ currentMovie: movie }),
    }),
    {
      name: "movie-storage", // key in localStorage
      partialize: (state) => ({ currentMovie: state.currentMovie }), // only store what you need
    }
  )
);
