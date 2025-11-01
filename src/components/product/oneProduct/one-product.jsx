import { ActionIcon, Badge, Button, Card, Flex, Group, Image, Modal, Stack, Text, Title, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FaHeart, FaMinus, FaPlus, FaRegHeart, FaShoppingBasket, FaStar, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../../../store/useFavoritesStore";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useBasketStore } from "../../../store/useBasketStore";

const OneProduct = (props) => {
    const {
        title,
        price,
        image,
        stock,
        description,
        warrantyInformation,
        rating,
        reviews,
        id,
        returnPolicy,
        discountPercentage,
        shippingInformation
    } = props;
    const { favorites, toggleFavoriteFn } = useFavoritesStore();
    const {
        basket,
        toggleBasketFn,
        increaseQuantityFn,
        decreaseQuantityFn,
    } = useBasketStore();

    const inBasketItem = basket.find((item) => item.id === id);
    const inBasket = Boolean(inBasketItem);
    const quantity = inBasketItem?.quantity || 1;


    const isFavorite = favorites.some((item) => item.id === id);
    const isSmall = useMediaQuery("(max-width: 800px)");
    const isSmaller = useMediaQuery("(max-width: 375px)");
    const hiddeModal = useMediaQuery("(max-width: 800px)");
    const isSmallest = useMediaQuery("(max-width: 555px)");

    const [opened, setOpened] = useState(false);
    const [isTempAdded, setIsTempAdded] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleCloseModal = () => {
        setOpened(false);

        if (isTempAdded && !isConfirmed) {
            toggleBasketFn({ id });
        }

        setIsTempAdded(false);
        setIsConfirmed(false);
    };


    const handleAddClick = () => {
        setOpened(true);

        if (!inBasket) {
            toggleBasketFn({
                id,
                title,
                price,
                image,
                rating,
                reviews,
                stock,
                description,
                warrantyInformation,
                shippingInformation,
                quantity: 1,
            });
            setIsTempAdded(true);
            setIsConfirmed(false);
        }
    };


    const handleIncrement = () => {
        if (quantity < stock) increaseQuantityFn(id);
    };

    const handleDecrement = () => {
        if (quantity > 1) decreaseQuantityFn(id);
        else toggleBasketFn({ id });
    };
    return (
        <>
            <Card
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '1px 1px 7px #C3C3C3')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
                padding={isSmaller ? 6 : 10}
                radius="md"
                withBorder
                className="cursor-pointer"
                style={{
                    transition: "ease-in-out .2s"
                }}
            >
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
                    {!inBasket ? (
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
                            onClick={handleAddClick}

                        >
                            {isSmall ? "Add" : "Add to Basket"}
                        </Button>
                    ) : (
                        <Flex
                            align="center"
                            justify="space-between"
                            w="100%"
                            bg="#f3eaff"
                            px={isSmall ? 5 : 10}
                            py={isSmall ? 0 : 5}
                            style={{ borderRadius: "8px" }}
                        >
                            <ActionIcon
                                onClick={handleDecrement}
                                color="#7f4dff"
                                variant="transparent"
                                radius="xl"
                            >
                                <FaMinus />
                            </ActionIcon>
                            <Text fw={600}>{quantity}</Text>
                            <ActionIcon
                                onClick={handleIncrement}
                                color="#7f4dff"
                                variant="transparent"
                                radius="xl"
                                disabled={quantity === stock}
                            >
                                <FaPlus />
                            </ActionIcon>
                        </Flex>
                    )}
                </Flex>
                {!hiddeModal ? (
                    <Modal
                        opened={opened}
                        // onClose={() => setOpened(false)}
                        onClose={handleCloseModal}
                        title={"Add to basket"}
                        overlayProps={{ opacity: 10 }}
                        centered
                        size="lg"
                        zIndex={1000}
                    >
                        <Flex gap="md">
                            <Flex
                                direction="column"
                                w={"50%"}
                                gap={5}
                            >
                                <Image
                                    src={Array.isArray(image) ? image[0] : image}
                                    alt={title}
                                    radius="md"
                                />
                                <Link to={`/products/${id}`}>
                                    <Button
                                        fullWidth
                                        variant="outline"
                                        size="sm"
                                        c={"#000"}
                                        color={"gray"}
                                        fw={600}
                                    >
                                        View Product <ChevronRight />
                                    </Button>
                                </Link>
                            </Flex>
                            <Flex direction="column" w={"50%"}>
                                <Title order={3}>{title}</Title>
                                <Title
                                    order={2}
                                    fw={"bold"}
                                    c="#7f4dff"
                                >
                                    ${price} USD
                                </Title>
                                <Badge color="#7f4dff" size={isSmall ? "xs" : "sm"}>
                                    Discount: -{discountPercentage}%
                                </Badge>
                                <Flex align="center" mt={10} gap={10}>
                                    <Flex
                                        align="center"
                                        justify="space-between"
                                        w="50%"
                                        px={10}
                                        bd={"1px solid #CCC"}
                                        py={5}
                                        style={{ borderRadius: "8px" }}
                                    >
                                        <ActionIcon
                                            onClick={handleDecrement}
                                            color="#7f4dff"
                                            disabled={quantity <= 1}
                                            variant="transparent"
                                            radius="xl"
                                        >
                                            <FaMinus />
                                        </ActionIcon>
                                        <Text fw={600}>{quantity}</Text>
                                        <ActionIcon
                                            onClick={handleIncrement}
                                            disabled={quantity === stock}
                                            color="#7f4dff"
                                            variant="transparent"
                                            radius="xl"
                                        >
                                            <FaPlus />
                                        </ActionIcon>
                                    </Flex>
                                    <Text c="green" size={isSmall ? "xs" : "sm"}>
                                        You can buy {stock}
                                    </Text>
                                </Flex>

                                {quantity >= stock && (
                                    <Badge color="red" size={isSmall ? "xs" : "sm"} mt={10}>
                                        Out of stock
                                    </Badge>
                                )}

                                <Button
                                    fullWidth
                                    radius="md"
                                    mt="md"
                                    h={40}
                                    color="#7f4dff"

                                    onClick={() => {
                                        setIsConfirmed(true);
                                        setOpened(false);
                                    }}

                                >
                                    <Flex direction={"column"}>
                                        <Text fw={600} size="sm">
                                            Add {quantity} to Basket
                                        </Text>
                                        <Text size="xs">
                                            {shippingInformation}
                                        </Text>
                                    </Flex>
                                </Button>
                                <Card my={10} radius="md" withBorder>
                                    <Flex direction={"column"}>
                                        <Title order={4}>Shipping Information</Title>
                                        <Text>{shippingInformation}</Text>
                                    </Flex>
                                </Card>
                                <Card radius="md" withBorder>
                                    <Flex direction={"column"}>
                                        <Title order={4}>Return Policy</Title>
                                        <Text>{returnPolicy}</Text>
                                    </Flex>
                                </Card>
                            </Flex>
                        </Flex>
                    </Modal>
                ) : (
                    <>
                        <Modal
                            opened={opened}
                            // onClose={() => setOpened(false)}
                            onClose={handleCloseModal}
                            size="lg"
                            zIndex={10000}
                            title={null}
                            withCloseButton={false}
                            transitionProps={{
                                transition: isSmall ? "slide-up" : "fade",
                                duration: 250,
                            }}
                            styles={{
                                content: {
                                    ...(isSmall && {
                                        position: "fixed",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        margin: 0,
                                        borderTopLeftRadius: 16,
                                        borderTopRightRadius: 16,
                                        borderRadius: 0,
                                        height: "auto",
                                        maxHeight: "80vh",
                                        overflowY: "auto",
                                        animation: "slideUp 0.3s ease",
                                    }),
                                },
                                inner: {
                                    ...(isSmall && {
                                        padding: 0,
                                        alignItems: "flex-end",
                                    }),
                                },
                            }}
                            overlayProps={{
                                opacity: 5,
                            }}
                        >
                            <Stack>
                                <Flex gap={10} w={"100%"}>
                                    <Image
                                        src={Array.isArray(image) ? image[0] : image}
                                        alt={title}
                                        radius="md"
                                        w={"25%"}
                                    />
                                    <Flex w={"100%"} justify={"space-between"}>
                                        <Flex direction={"column"} gap={5}>
                                            <Title order={isSmaller ? 6 : isSmallest ? 4 : 3}>{title}</Title>
                                            <Badge color="#7f4dff" size={isSmall ? "xs" : "sm"}>-{discountPercentage}%</Badge>
                                            <Badge color="pink" size={isSmall ? "xs" : "sm"} >{warrantyInformation}</Badge>
                                            <Title order={6} fw={"bold"} c="#7f4dff">${price} USD</Title>
                                        </Flex>
                                        <ActionIcon onClick={() => setOpened(false)} variant="subtle" color="gray">
                                            <FaTimes />
                                        </ActionIcon>
                                    </Flex>
                                </Flex>
                                <Flex gap={10} align={"center"} justify={"space-between"}>
                                    <Title order={4} fw={"bold"} color="#7f4dff">${price} USD</Title>
                                    <Button
                                        radius="md"
                                        px={20}
                                        h={40}
                                        color="#7f4dff"
                                        onClick={() => {
                                            setIsConfirmed(true);
                                            setOpened(false);
                                        }}
                                    >
                                        <Flex direction={"column"}>
                                            <Text fw={600} size="sm">
                                                Add {quantity} to Basket
                                            </Text>

                                            <Text size="xs">
                                                {shippingInformation}
                                            </Text>
                                        </Flex>
                                    </Button>
                                </Flex>
                            </Stack>
                        </Modal>
                    </>
                )}
            </Card >
        </>
    );
};

export default OneProduct;
