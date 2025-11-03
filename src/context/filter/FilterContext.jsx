import { createContext, useContext, useMemo, useState } from "react";

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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
