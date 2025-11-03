import { useState, useEffect } from "react";
import { Modal, TextInput, ScrollArea, Flex, Text, ActionIcon, Loader } from "@mantine/core";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../context/Filter/FilterContext";

export const SearchModal = ({ opened, onClose }) => {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { setSelectedCategory } = useFilter();
    const navigate = useNavigate();

    useEffect(() => {
        if (!query.trim()) {
            setProducts([]);
            return;
        }

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
                const data = await res.json();
                setProducts(data.products || []);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        const delay = setTimeout(fetchProducts, 500);
        return () => clearTimeout(delay);
    }, [query]);

    const handleClick = (category, productName) => {
        setSelectedCategory(category);
        onClose();
        navigate("/filtered", { state: { selectedProduct: productName } });
    };


    return (
        <Modal opened={opened} onClose={onClose} size="lg" centered title="Search Products" overlayProps={{ blur: 4 }}>
            <TextInput
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                rightSection={
                    loading ? (
                        <Loader size="xs" color="#7f4dff" />
                    ) : (
                        <ActionIcon variant="transparent">
                            <Search size={18} color="#7f4dff" />
                        </ActionIcon>
                    )
                }
            />

            <ScrollArea h={300} mt="md">
                {loading ? (
                    <Text ta="center" c="dimmed" mt="md">Searching...</Text>
                ) : products.length > 0 ? (
                    products.map((item) => (
                        <Flex
                            key={item.id}
                            p={10}
                            align="center"
                            gap={10}
                            className="hover:bg-gray-50 cursor-pointer rounded-md transition-all"
                            onClick={() => handleClick(item.category, item.title)}
                        >
                            <Text fw={500}>{item.title}</Text>
                        </Flex>
                    ))
                ) : query.trim() ? (
                    <Text c="dimmed" ta="center" mt="md">No results found</Text>
                ) : (
                    <Text c="dimmed" ta="center" mt="md">Start typing to search products</Text>
                )}
            </ScrollArea>
        </Modal>
    );
};
