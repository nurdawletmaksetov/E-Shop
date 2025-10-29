import { ActionIcon, Badge, Button, Card, Flex, Group, Image, Text, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FaRegHeart, FaRegStar, FaShoppingBasket, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const OneProduct = (props) => {
    const { title, price, image, rating, reviews } = props;
    const isLarge = useMediaQuery("(min-width: 1200px)");
    const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
    const isSmall = useMediaQuery("(max-width: 800px)");
    const isSmaller = useMediaQuery("(max-width: 375px)");

    return (
        <Card
            padding={isSmaller ? 6 : 10}
            radius="md"
            withBorder
        >
            <Card.Section>
                <Image
                    src={Array.isArray(image) ? image[0] : image}
                    height={160}
                    alt={title}
                />
            </Card.Section>
            <Text mt={5} size="sm" c={"#7f4dff"} fw={"600"}>
                ${price} USD
            </Text>
            <Group my={5}>
                <Text size={isSmall ? "13px" : "16px"} fw={400} h={isSmall ? 25 : 30}>{props.title}</Text>
            </Group>

            <Flex gap={5} align={"center"}>
                <FaStar className="text-yellow-500" size={13} />
                <Text c="gray" size="13px">{rating?.toFixed(1)}</Text>
                <Text c="gray" size="13px">({reviews.length} reviews)</Text>
            </Flex>

            <Flex align="center" justify="space-between" mt="md" gap={isSmall ? 4 : 8}>
                <Tooltip label="Add to favorites" position="top" withArrow color="violet">
                    <ActionIcon
                        variant="filled"
                        color="#7f4dff"
                        radius="md"
                        size={isSmall ? "md" : "lg"}
                        style={{
                            transition: "all 0.2s ease",
                        }}
                    >
                        <FaRegHeart size={16} />
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
