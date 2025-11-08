import React, { useEffect, useState } from "react";
import {
    TextInput,
    Group,
    Button,
    Stack,
    Image,
    Card,
    Text,
    ScrollArea,
    Flex,
    SimpleGrid,
    Title,
    Modal,
} from "@mantine/core";
import { Search } from "lucide-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import CategoryCard from "./CategoryCard";
import { api } from "../../api/api";
import { Container } from "../../container/container";
import { SearchModal } from "../../components/SearchModal/SearchModal";

export const Catalog = () => {
    const hideCategoryPage = useMediaQuery("(max-width: 500px)");
    const [categories, setCategories] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [error, setError] = useState(false);

    async function getCategories() {
        setError(false);
        try {
            const { data } = await api.get("/products/categories");
            setCategories(data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
            setError(true);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    const handleTopClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const isSmall = useMediaQuery("(max-width: 400px)");

    // if (categories.length === 0) {
    //     return (
    //         <Container size="lg" py={80}>
    //             <Flex justify="center" align="center" direction="column">
    //                 <Title order={3}>Some things went wrong</Title>
    //             </Flex>
    //         </Container>
    //     )
    // }

    return (
        <>
            <SearchModal opened={opened} onClose={close} />
            <Container>
                {hideCategoryPage && (
                    <Stack p="md" gap="md">
                        <TextInput
                            placeholder="Search products..."
                            icon={<Search size={18} />}
                            radius="md"
                            onClick={open}
                            disabled={opened}
                        />
                        <Title order={isSmall ? 4 : 3}>Categories</Title>
                        <ScrollArea h={500}>
                            <SimpleGrid
                                cols={2}
                                spacing="lg"
                                verticalSpacing="md"
                            >
                                {categories?.length > 0 && (
                                    categories.map((category) => (
                                        <CategoryCard
                                            key={category.id ?? category._id ?? category.name}
                                            title={category.name}
                                            isSmall={isSmall}
                                            handleTopClick={handleTopClick}
                                        />
                                    ))
                                )}
                            </SimpleGrid>
                        </ScrollArea>
                    </Stack>
                )}
                <Modal
                    opened={error}
                    onClose={() => setError(false)}
                    title="Network Error"
                    centered
                >
                    <Text color="red" size="sm">
                        There was a problem connecting to the server.
                        Please try again later.
                    </Text>
                    <Flex justify="flex-end" mt="md">
                        <Button color="red" onClick={() => setError(false)}>
                            Close
                        </Button>
                    </Flex>
                </Modal>
            </Container>
        </>
    );
};
