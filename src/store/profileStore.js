import { create } from "zustand";

export const profileStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  funLogin: (user, token) => {
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    // Save to Zustand state
    set({ user, token });

    //  Debug logs
    console.log(" User logged in:", user);
    console.log(" Roles:", user.roles);
  },

  funClear: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });

    console.log(" Logged out & cleared store");
  },

  //  Optional: sync from localStorage manually (in App.jsx)
  syncUserFromStorage: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    set({ user, token });

    console.log(" Synced from localStorage:", { user, token });
  },
}));
