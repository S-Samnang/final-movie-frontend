import { create } from "zustand";

export const profileStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  funLogin: (user, token) => {
    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      profileImage: user.profile_image || "", // ✅ ADD this!
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(formattedUser));
    localStorage.setItem("token", token);

    // Save to Zustand state
    set({ user: formattedUser, token });

    console.log("User logged in:", formattedUser);
    console.log("Roles:", formattedUser.roles);
  },

  funClear: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });

    console.log("Logged out & cleared store");
  },

  syncUserFromStorage: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    set({ user, token });

    console.log("Synced from localStorage:", { user, token });
  },
}));
