import { Button, Flex, Select, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Container } from "../../container/container";
import { useMediaQuery } from "@mantine/hooks";
import { useFilter } from "../../context/Filter/FilterContext";
import { useLocation, useNavigate } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const isLarge = useMediaQuery("(min-width: 1200px)");
    const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
    const isSmall = useMediaQuery("(max-width: 830px)");
    const { selectedCategory, setSelectedCategory } = useFilter();
    const navigate = useNavigate();
    const location = useLocation();

    const visibleCount = isLarge ? 9 : isMedium ? 7 : 5;

    const handleRadioChangeCategory = (category) => {
        const selected =
            typeof category === "string"
                ? category
                : category.slug || category.name?.toLowerCase() || "";

        setSelectedCategory(selected);
        navigate("/filtered");
    };

    const visibleCategories = categories.slice(0, visibleCount);

    async function getCategories() {
        try {
            const { data } = await api.get("/products/categories");
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    // 🧹 Agar boshqa sahifaga o'tilsa (masalan home), category tozalansin
    useEffect(() => {
        if (location.pathname !== "/filtered") {
            setSelectedCategory("");
            localStorage.removeItem("selectedCategory");
        }
    }, [location.pathname]);

    return (
        <Container>
            <Flex py={5} align="center" justify="space-between" wrap="wrap" gap="md">
                {visibleCategories.map((el, i) => (
                    <Button
                        key={i}
                        variant="transparent"
                        color={
                            selectedCategory === (el.slug || el.name)
                                ? "#7f4dff"
                                : "black"
                        }
                        onClick={() => handleRadioChangeCategory(el)}
                        radius="md"
                        p={0}
                    >
                        <Text size={isSmall ? "xs" : "sm"} tt="capitalize">
                            {el.name || el.slug || String(el)}
                        </Text>
                    </Button>
                ))}

                {categories.length > visibleCount && (
                    <Select
                        placeholder="More"
                        value={selectedCategory}
                        onChange={(val) => {
                            setSelectedCategory(val);
                            navigate("/filtered");
                        }}
                        data={categories.slice(-10).map((el) => ({
                            label: el.name || el.slug || String(el),
                            value: el.slug || el.name || String(el),
                        }))}
                        w={150}
                    />
                )}
            </Flex>
        </Container>
    );
};

export default Categories;
