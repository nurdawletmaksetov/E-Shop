import {
    Button,
    Card,
    Checkbox,
    Divider,
    Flex,
    Group,
    Image,
    Stack,
    Text,
    Title,
    Paper,
    Badge,
} from "@mantine/core";
import { useBasketStore } from "../../store/useBasketStore";
import { FaTrashAlt } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";
import { Container } from "../../container/container";
import { useEffect, useState } from "react";
import BasketNav from "../../components/bottomBasketNav/BasketNav";
import AllProducts from "../../components/product/allProduct/all-products";

const Basket = () => {
    const {
        basket,
        increaseQuantityFn,
        decreaseQuantityFn,
        removeFromBasketFn,
        clearBasketFn,
    } = useBasketStore();

    const isSmall = useMediaQuery("(max-width: 800px)");
    const isSmaller = useMediaQuery("(max-width: 500px)");

    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => {
        setCheckedItems(basket.map((item) => item.id));
    }, [basket]);

    const handleSelectAll = () => {
        if (checkedItems.length === basket.length) {
            setCheckedItems([]);
        } else {
            setCheckedItems(basket.map((item) => item.id));
        }
    };

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const handleQuantityChange = (id, action) => {
        if (action === "increase") increaseQuantityFn(id);
        else decreaseQuantityFn(id);

        setCheckedItems((prev) =>
            prev.includes(id) ? prev : [...prev, id]
        );
    };

    const selectedItems = basket.filter((item) =>
        checkedItems.includes(item.id)
    );

    const totalPrice = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (basket.length === 0) {
        return (
            <Container size="lg" py={80}>
                <Flex justify="center" align="center" direction="column">
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                        w={120}
                        mb="md"
                    />
                    <Title order={3}>Your basket is empty</Title>
                    <Text c="dimmed" fz="sm" mt={4}>
                        Add some products to see them here!
                    </Text>
                </Flex>
            </Container>
        );
    }

    return (
        <>
            <Container>
                <Title
                    order={isSmaller ? 4 : 2}
                    pb={10}
                    className="border-b border-b-gray-400"
                >
                    Your Basket
                </Title>

                <Checkbox
                    label="Select all"
                    color="violet"
                    size={isSmall ? "sm" : "md"}
                    fw={500}
                    my={20}
                    checked={checkedItems.length === basket.length}
                    indeterminate={
                        checkedItems.length > 0 && checkedItems.length < basket.length
                    }
                    onChange={handleSelectAll}
                />

                <Flex
                    align="flex-start"
                    direction={isSmall ? "column" : "row"}
                    gap="lg"
                    w="100%"
                    mb={20}
                >
                    <Stack w={isSmall ? "100%" : "70%"} gap="md">
                        {basket.map((item) => (
                            <Card key={item.id} withBorder radius="lg" p={isSmall ? "sm" : "lg"}>
                                <Text fw={600} pb={20} fz={isSmall ? "sm" : "md"}>
                                    {item.title}
                                </Text>
                                <Stack gap="xs">
                                    <Flex
                                        direction={"row"}
                                        align={"flex-start"}
                                        gap={isSmall ? "sm" : "lg"}
                                    >
                                        <Checkbox
                                            color="violet"
                                            size="sm"
                                            checked={checkedItems.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />

                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            w={isSmall ? 100 : 140}
                                            h={isSmall ? 100 : 120}
                                            fit="contain"
                                            radius="md"
                                        />

                                        <Stack gap={4} flex={1}>
                                            <Badge
                                                bg="#ffe6f5"
                                                px={8}
                                                py={2}
                                                fz="xs"
                                                fw={600}
                                                c="violet"
                                                style={{ borderRadius: 8 }}
                                            >
                                                {item?.warrantyInformation}
                                            </Badge>
                                            <Text fz={isSmall ? "xs" : "sm"}>{item?.description?.slice(0, 100)}...</Text>
                                            <Text fw={700} c="violet">
                                                ${(item.price * item.quantity).toLocaleString()} USD
                                            </Text>


                                        </Stack>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Group>
                                            <Button
                                                size="compact-sm"
                                                variant="outline"
                                                color="gray"
                                                disabled={item.quantity === 1}
                                                onClick={() =>
                                                    handleQuantityChange(item.id, "decrease")
                                                }
                                            >
                                                −
                                            </Button>
                                            <Text fw={600}>{item.quantity}</Text>
                                            <Button
                                                size="compact-sm"
                                                variant="outline"
                                                color="gray"
                                                onClick={() =>
                                                    handleQuantityChange(item.id, "increase")
                                                }
                                            >
                                                +
                                            </Button>
                                        </Group>

                                        <Button
                                            variant="subtle"
                                            color="gray"
                                            leftSection={<FaTrashAlt size={14} />}
                                            onClick={() => removeFromBasketFn(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </Flex>
                                </Stack>
                            </Card>
                        ))}
                    </Stack>

                    <Paper withBorder radius="lg" p="lg" w={isSmall ? "100%" : "30%"}>
                        <Stack gap="sm">
                            <Title order={5}>Your order</Title>
                            <Text c="dimmed" fz="sm">
                                Products ({selectedItems.length}): ${totalPrice.toLocaleString()} USD
                            </Text>

                            <Divider my="xs" />

                            <Stack gap={0}>
                                <Text fw={600}>All:</Text>
                                <Text fw={800} fz="xl" c="violet">
                                    ${totalPrice.toLocaleString()} USD
                                </Text>
                            </Stack>

                            <Button display={isSmall ? "none" : "block"} mt="md" color="violet" fullWidth size="md" radius="md" fw={600}>
                                Buy
                            </Button>

                            <Button
                                variant="light"
                                color="red"
                                mt="xs"
                                fullWidth
                                onClick={clearBasketFn}
                            >
                                Clear Basket
                            </Button>
                        </Stack>
                    </Paper>
                </Flex>
                <AllProducts />
            </Container>
            <BasketNav selectedItems={selectedItems} totalPrice={totalPrice} />
        </>
    );
};

export default Basket;
