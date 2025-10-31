import { ActionIcon, Button, Card, Flex, Group, Image, Text, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FaHeart, FaRegHeart, FaShoppingBasket, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../../../store/useFavoritesStore";

const OneProduct = (props) => {
    const { title, price, image, rating, reviews, id } = props;
    const { favorites, toggleFavoriteFn } = useFavoritesStore();

    const isFavorite = favorites.some((item) => item.id === id);
    const isSmall = useMediaQuery("(max-width: 800px)");
    const isSmaller = useMediaQuery("(max-width: 375px)");

    return (
        <Card padding={isSmaller ? 6 : 10} radius="md" withBorder className="cursor-pointer">
            <Link to={`/products/${id}`}>
                <Card.Section>
                    <Image
                        src={Array.isArray(image) ? image[0] : image}
                        height={160}
                        alt={title}
                        fit="cover"
                    />
                </Card.Section>

                <Text mt={5} size="sm" c="#7f4dff" fw={600}>
                    ${price} USD
                </Text>

                <Group my={5}>
                    <Text size={isSmall ? "13px" : "16px"} fw={400} h={isSmall ? 25 : 30}>
                        {title}
                    </Text>
                </Group>

                <Flex gap={5} align="center">
                    <FaStar className="text-yellow-500" size={13} />
                    <Text c="gray" size="13px">{rating?.toFixed(1)}</Text>
                    <Text c="gray" size="13px">({reviews?.length || 0} reviews)</Text>
                </Flex>
            </Link>

            <Flex align="center" justify="space-between" mt="md" gap={isSmall ? 4 : 8}>
                <Tooltip
                    label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    position="top"
                    withArrow
                    color="violet"
                >
                    <ActionIcon
                        variant="filled"
                        color={isFavorite ? "red" : "#7f4dff"}
                        radius="md"
                        size={isSmall ? "md" : "lg"}
                        style={{ transition: "all 0.2s ease" }}
                        onClick={() => toggleFavoriteFn({ id, title, price, image, rating, reviews })}
                    >
                        {isFavorite ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
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
    );
};

export default OneProduct;
