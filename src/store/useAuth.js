import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../api/api";

export const useAuth = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (username, password) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await api.post("/auth/login", { username, password });
                    const data = res.data;

                    if (data && data.accessToken) {
                        set({
                            user: data,
                            token: data.accessToken,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    } else {
                        console.error("Login response:", data);
                        set({ error: "Login failed: accessToken not found", isLoading: false });
                    }
                } catch (err) {
                    console.error("Login error:", err);
                    set({ error: err.message || "Login failed", isLoading: false });
                }
            },


            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null,
                });
            },
        }),
        {
            name: "auth-storage",
            getStorage: () => localStorage,
        }
    )
);
