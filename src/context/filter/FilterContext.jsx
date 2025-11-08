import { createContext, useContext, useMemo, useState, useEffect } from "react";

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState(() => {
        return localStorage.getItem("searchQuery") || "";
    });

    const [selectedCategory, setSelectedCategory] = useState(() => {
        return localStorage.getItem("selectedCategory") || "";
    });

    useEffect(() => {
        localStorage.setItem("searchQuery", searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        localStorage.setItem("selectedCategory", selectedCategory);
    }, [selectedCategory]);

    const value = useMemo(
        () => ({
            searchQuery,
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
        }),
        [searchQuery, selectedCategory]
    );

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === null) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};
