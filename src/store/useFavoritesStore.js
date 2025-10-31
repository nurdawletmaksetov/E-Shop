import { create } from "zustand";

const getStoredFavorites = () => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
};

export const useFavoritesStore = create((set) => ({
    favorites: getStoredFavorites(),

    toggleFavoriteFn: (product) =>
        set((state) => {
            const exists = state.favorites.some((item) => item.id === product.id);
            let updatedFavorites;

            if (exists) {
                updatedFavorites = state.favorites.filter((item) => item.id !== product.id);
            } else {
                updatedFavorites = [...state.favorites, product];
            }

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            return { favorites: updatedFavorites };
        }),
}));
