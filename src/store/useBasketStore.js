import { create } from "zustand";

const getStoredBasket = () => {
    const stored = localStorage.getItem("basket");
    return stored ? JSON.parse(stored) : [];
};

export const useBasketStore = create((set) => ({
    basket: getStoredBasket(),

    toggleBasketFn: (product) =>
        set((state) => {
            const exists = state.basket.some(
                (item) => String(item.id) === String(product.id)
            );
            let updatedBasket;

            if (exists) {
                updatedBasket = state.basket.filter(
                    (item) => String(item.id) !== String(product.id)
                );
            } else {
                updatedBasket = [...state.basket, { ...product, quantity: 1 }];
            }

            localStorage.setItem("basket", JSON.stringify(updatedBasket));
            return { basket: updatedBasket };
        }),

    increaseQuantityFn: (id) =>
        set((state) => {
            const updatedBasket = state.basket.map((item) =>
                String(item.id) === String(id)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            localStorage.setItem("basket", JSON.stringify(updatedBasket));
            return { basket: updatedBasket };
        }),

    decreaseQuantityFn: (id) =>
        set((state) => {
            const updatedBasket = state.basket
                .map((item) =>
                    String(item.id) === String(id)
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);

            localStorage.setItem("basket", JSON.stringify(updatedBasket));
            return { basket: updatedBasket };
        }),

    removeFromBasketFn: (id) =>
        set((state) => {
            const updatedBasket = state.basket.filter(
                (item) => String(item.id) !== String(id)
            );
            localStorage.setItem("basket", JSON.stringify(updatedBasket));
            return { basket: updatedBasket };
        }),

    clearBasketFn: () => {
        localStorage.removeItem("basket");
        return set({ basket: [] });
    },
}));
