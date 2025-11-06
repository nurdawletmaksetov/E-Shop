import { ActionIcon, Badge, Button, Card, Flex, Group, Image, Modal, SimpleGrid, Stack, Text, Title, Tooltip } from "@mantine/core";
import { Container } from "../../container/container";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { useMediaQuery } from "@mantine/hooks";
import OneProduct from "../../components/product/oneProduct/one-product";

const Favourites = (props) => {
    const { favorites } = useFavoritesStore();
    const isSmaller = useMediaQuery("(max-width: 500px)");
    const isMobile = useMediaQuery("(max-width: 600px)");

    return (
        <Container>
            <Stack py={isMobile ? 10 : 20}>
                <Title order={isSmaller ? 4 : 2} pb={10} className="border-b border-b-gray-400">
                    Favourites
                </Title>

                {favorites.length === 0 ? (
                    <Text c="dimmed" size="sm">
                        You have no favorite products yet.
                    </Text>
                ) : (
                    <SimpleGrid
                        cols={{ base: 2, sm: 3, md: 4, lg: 4 }}
                        spacing={isSmaller ? 6 : 10}
                        mt="md"
                    >
                        {favorites.map((product) => (
                            <OneProduct key={product.id} {...product} />
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
        </Container>
    );
};

export default Favourites;
