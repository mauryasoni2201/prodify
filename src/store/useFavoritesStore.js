import { create } from "zustand";
import { persist } from "zustand/middleware";
import { showToast } from "@/lib/toast";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (id, title) => {
        const favoriteIds = get().favoriteIds;
        const exists = favoriteIds.includes(id);

        if (exists) {
          set({ favoriteIds: favoriteIds.filter((fid) => fid !== id) });
          if (title) showToast.remove(`${title} removed from favorites.`);
        } else {
          set({ favoriteIds: [...favoriteIds, id] });
          if (title) showToast.success(`${title} added to favorites!`);
        }
      },
      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {
      name: "prodify-favorites-storage",
    }
  )
);
