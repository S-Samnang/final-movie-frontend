import { create } from "zustand";
import { persist } from "zustand/middleware";

export const movieStore = create(
  persist(
    (set, get) => ({
      currentMovie: null,
      moviesByType: {},
      paginations: {},

      setCurrentMovie: (movie) => set({ currentMovie: movie }),

      setMoviesByType: (type, movies) =>
        set((state) => ({
          moviesByType: {
            ...state.moviesByType,
            [type]: movies,
          },
        })),

      appendMoviesByType: (type, movies) =>
        set((state) => ({
          moviesByType: {
            ...state.moviesByType,
            [type]: [...(state.moviesByType[type] || []), ...movies],
          },
        })),

      getMoviesByType: (type) => get().moviesByType[type] || [],

      setPagination: (type, pagination) =>
        set((state) => ({
          paginations: {
            ...state.paginations,
            [type]: pagination,
          },
        })),

      getPagination: (type) =>
        get().paginations[type] || { current_page: 1, last_page: 1 },

      clearCache: () =>
        set({
          currentMovie: null,
          moviesByType: {},
          paginations: {},
        }),
    }),
    {
      name: "movie-storage",
      partialize: (state) => ({
        currentMovie: state.currentMovie,
        moviesByType: state.moviesByType,
        paginations: state.paginations,
      }),
    }
  )
);
