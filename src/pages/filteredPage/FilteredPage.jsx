import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useFilter } from "../../context/Filter/FilterContext";
import { Container } from "../../container/container";
import {
    Accordion,
    Button,
    Checkbox,
    Flex,
    Image,
    Loader,
    RangeSlider,
    SimpleGrid,
    Stack,
    Text,
} from "@mantine/core";
import OneProduct from "../../components/product/oneProduct/one-product";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

const FilteredPage = () => {
    const { selectedCategory } = useFilter();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const selectedProduct = location.state?.selectedProduct || null;


    const isSmall = useMediaQuery("(max-width: 600px)");
    const isNormal = useMediaQuery("(max-width: 840px)");

    const [filters, setFilters] = useState({
        price: [0, 0],
        brands: [],
        rating: 0,
    });

    const [priceLimits, setPriceLimits] = useState({ min: 0, max: 5000 });

    const normalize = (str) => str?.toLowerCase().replace(/[-_.\s]+/g, "");

    async function getProducts() {
        try {
            const { data } = await api.get("/products/?limit=0");
            const productList = Array.isArray(data) ? data : data.products;

            const filtered = productList.filter(
                (item) => normalize(item.category) === normalize(selectedCategory)
            );

            if (filtered.length > 0) {
                const prices = filtered.map((p) => p.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                setPriceLimits({ min: minPrice, max: maxPrice });
                setFilters((prev) => ({ ...prev, price: [minPrice, maxPrice] }));
            }

            let reordered = filtered;
            if (selectedProduct) {
                const normalizedSelected = normalize(selectedProduct);
                reordered = [
                    ...filtered.filter((p) => normalize(p.title) === normalizedSelected),
                    ...filtered.filter((p) => normalize(p.title) !== normalizedSelected),
                ];
            }

            setProducts(reordered);
            setFilteredProducts(reordered);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        } finally {
            setLoading(false);
        }
    }


    const applyFilters = () => {
        let result = [...products];

        result = result.filter(
            (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
        );

        if (filters.brands.length > 0) {
            result = result.filter((p) => filters.brands.includes(p.brand));
        }

        if (filters.rating > 0) {
            result = result.filter((p) => p.rating >= filters.rating);
        }

        setFilteredProducts(result);
    };

    useEffect(() => {
        if (selectedCategory) getProducts();
    }, [selectedCategory]);

    useEffect(() => {
        applyFilters();
    }, [filters]);

    const uniqueBrands = [...new Set(products.map((p) => p.brand))].filter(Boolean);

    return (
        <Container>
            <Flex direction={isSmall ? "column" : "row"} w={"100%"} gap="md" mt={isSmall ? "0" : "lg"} align="flex-start">
                <Flex
                    direction={isSmall ? "row" : "column"}
                    p={isSmall ? "" : "md"}
                    w={isNormal ? isSmall ? "100%" : "40%" : "25%"}
                    bg={isSmall ? "#fff" : "#f9f9f9"}
                    style={{
                        zIndex: 99,
                        borderRadius: "12px",
                        position: "sticky",
                        top: "20px",
                    }}
                >
                    <Text display={isSmall ? "none" : "block"} fw={600} mb="md">
                        Filters
                    </Text>

                    <Accordion display={isSmall ? "flex" : "unset"} w={"100%"} direction="row" defaultValue="price" multiple>
                        <Accordion.Item value="price" display={isSmall ? "none" : "block"}>
                            <Accordion.Control>Price range</Accordion.Control>
                            <Accordion.Panel>
                                <RangeSlider
                                    min={priceLimits.min}
                                    max={priceLimits.max}
                                    step={10}
                                    value={filters.price}
                                    onChange={(val) => setFilters({ ...filters, price: val })}
                                    color="#7f4dff"
                                    mt="sm"
                                />
                                <Text size="sm" mt="xs">
                                    ${filters.price[0]} – ${filters.price[1]}
                                </Text>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="brand">
                            <Accordion.Control>Brands</Accordion.Control>
                            <Accordion.Panel>
                                <Checkbox.Group
                                    value={filters.brands}
                                    onChange={(val) => setFilters({ ...filters, brands: val })}
                                >
                                    {uniqueBrands.map((brand) => (
                                        <Checkbox key={brand} value={brand} label={brand} mt={4} />
                                    ))}
                                </Checkbox.Group>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="rating">
                            <Accordion.Control>Rating</Accordion.Control>
                            <Accordion.Panel>
                                {[4, 3, 2].map((r) => (
                                    <Checkbox
                                        key={r}
                                        checked={filters.rating === r}
                                        onChange={() =>
                                            setFilters({
                                                ...filters,
                                                rating: filters.rating === r ? 0 : r,
                                            })
                                        }
                                        label={`${r}+ Stars`}
                                        mt={4}
                                    />
                                ))}
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>

                    <Button
                        mt="lg"
                        color="red"
                        variant="light"
                        display={isSmall ? "none" : ""}
                        onClick={() =>
                            setFilters({
                                price: [priceLimits.min, priceLimits.max],
                                brands: [],
                                rating: 0,
                            })
                        }
                    >
                        Clear filters
                    </Button>
                </Flex>

                <Flex direction="column" w="100%">
                    <Text fw={600} size="xl" mb="md" tt="capitalize">
                        {selectedCategory || "Category"} products
                    </Text>

                    {loading ? (
                        <Flex align={"center"} h={"100vh"} justify={"center"}>
                            <Loader color="#7f4dff" size="lg" />
                        </Flex>
                    ) : filteredProducts.length > 0 ? (
                        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing={10}>
                            {filteredProducts.map((el) => (
                                <OneProduct
                                    key={el.id}
                                    id={el.id}
                                    title={el.title}
                                    description={el.description}
                                    price={el.price}
                                    image={el.thumbnail}
                                    rating={el.rating}
                                    reviews={el.reviews}
                                    discountPercentage={el.discountPercentage}
                                    stock={el.stock}
                                    returnPolicy={el.returnPolicy}
                                    warrantyInformation={el.warrantyInformation}
                                    shippingInformation={el.shippingInformation}
                                />
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Stack align="center" justify="center">
                            <Image w={200} src={"https://uzum.uz/static/img/penguin.a739ac8.png"} />
                            <Text color="red" mt="md">
                                Nothing found for this filter
                            </Text>
                            <Button color="red" onClick={() => setFilters({ ...filters, price: [0, 5000] })}>Remove Filters</Button>
                        </Stack>
                    )}
                </Flex>
            </Flex>
        </Container>
    );
};

export default FilteredPage;
