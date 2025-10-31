import { ActionIcon, Button, Card, Flex, Grid, Group, Image, SimpleGrid, Stack, Text, Title, Tooltip } from "@mantine/core";
import { Container } from "../../container/container";
import { FaHeart, FaShoppingBasket, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { useMediaQuery } from "@mantine/hooks";

const Favourites = () => {
    const { favorites, toggleFavoriteFn } = useFavoritesStore();
    const isSmall = useMediaQuery("(max-width: 800px)");
    const isSmaller = useMediaQuery("(max-width: 500px)");
    const isSmallest = useMediaQuery("(max-width: 375px)");

    return (
        <Container>
            <Stack py={20}>
                <Title order={2} pb={10} className="border-b border-b-gray-400">
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
                        {favorites.map((el) => (
                            <Card
                                padding={isSmaller ? 6 : 10}
                                radius="md"
                                withBorder
                                className="cursor-pointer"
                            >
                                <Link to={`/products/${el.id}`}>
                                    <Card.Section>
                                        <Image
                                            src={Array.isArray(el.image) ? el.image[0] : el.image}
                                            height={160}
                                            alt={el.title}
                                            fit="cover"
                                        />
                                    </Card.Section>

                                    <Text mt={5} size="sm" c="#7f4dff" fw={600}>
                                        ${el.price} USD
                                    </Text>

                                    <Group my={5}>
                                        <Text
                                            size={isSmall ? "13px" : "16px"}
                                            fw={400}
                                            h={isSmall ? 25 : 30}
                                        >
                                            {el.title}
                                        </Text>
                                    </Group>

                                    <Flex gap={5} align="center">
                                        <FaStar className="text-yellow-500" size={13} />
                                        <Text c="gray" size="13px">
                                            {el.rating?.toFixed(1)}
                                        </Text>
                                        <Text c="gray" size="13px">
                                            ({el.reviews?.length || 0} reviews)
                                        </Text>
                                    </Flex>
                                </Link>

                                <Flex align="center" justify="space-between" mt="md" gap={isSmall ? 4 : 8}>
                                    <Tooltip
                                        label="Remove from favorites"
                                        position="top"
                                        withArrow
                                        color="violet"
                                    >
                                        <ActionIcon
                                            variant="filled"
                                            color="red"
                                            radius="md"
                                            size={isSmall ? "md" : "lg"}
                                            onClick={() => toggleFavoriteFn(el)}
                                        >
                                            <FaHeart size={16} />
                                        </ActionIcon>
                                    </Tooltip>

                                    <Button
                                        fullWidth
                                        radius="md"
                                        size={isSmall ? "xs" : "sm"}
                                        variant="filled"
                                        color="#7f4dff"
                                        leftSection={<FaShoppingBasket size={16} />}
                                        style={{
                                            fontWeight: 600,
                                            letterSpacing: "0.3px",
                                        }}
                                    >
                                        {isSmall ? "Add" : "Add to Basket"}
                                    </Button>
                                </Flex>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
        </Container>
    );
};

export default Favourites;
