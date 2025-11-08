import { Button, Flex, Select, Skeleton, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Container } from "../../container/container";
import { useMediaQuery } from "@mantine/hooks";
import { useFilter } from "../../context/Filter/FilterContext";
import { useLocation, useNavigate } from "react-router-dom";

const Categories = ({ handleTopClick }) => {
    const [categories, setCategories] = useState([]);
    const isLarge = useMediaQuery("(min-width: 1200px)");
    const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
    const isSmall = useMediaQuery("(max-width: 830px)");
    const isPhone = useMediaQuery("(max-width: 560px)");
    const { selectedCategory, setSelectedCategory } = useFilter();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const visibleCount = isLarge ? 9 : isMedium ? 7 : isPhone ? 4 : 5;

    const handleRadioChangeCategory = (category) => {
        const selected =
            typeof category === "string"
                ? category
                : category.slug || category.name?.toLowerCase() || "";

        setSelectedCategory(selected);
        navigate("/filtered");
        handleTopClick();
    };

    const visibleCategories = categories.slice(0, visibleCount);

    async function getCategories() {
        setLoading(true);
        try {
            const { data } = await api.get("/products/categories");
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (location.pathname !== "/filtered") {
            setSelectedCategory("");
            localStorage.removeItem("selectedCategory");
        }
    }, [location.pathname]);

    return (
        <Container>
            <Flex py={5} align="center" justify="space-between" wrap="wrap" gap="md">
                {(loading ? Array.from({ length: visibleCount }) : visibleCategories).map((el, i) => (
                    loading ? (
                        <Skeleton key={i} height={20} width={80} radius="md" />
                    ) : (
                        <Button
                            key={i}
                            variant="transparent"
                            color={selectedCategory === (el.slug || el.name) ? "#7f4dff" : "black"}
                            onClick={() => handleRadioChangeCategory(el)}
                            radius="md"
                            p={0}
                        >
                            <Text size={isSmall ? "xs" : "sm"} tt="capitalize">
                                {el.name || el.slug || String(el)}
                            </Text>
                        </Button>
                    )
                ))}


                {categories.length > visibleCount && (
                    <Select
                        placeholder="More"
                        value={selectedCategory}
                        onChange={(val) => {
                            setSelectedCategory(val);
                            handleTopClick();
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
