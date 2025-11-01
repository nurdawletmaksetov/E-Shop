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
} from "@mantine/core";
import { useBasketStore } from "../../store/useBasketStore";
import { FaTrashAlt } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";
import { Container } from "../../container/container";
import { useState } from "react";

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
    const isMobile = useMediaQuery("(max-width: 600px)");

    const totalPrice = basket.reduce(
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
        <Container>
            <Title order={isSmaller ? 4 : 2} pb={10} className="border-b border-b-gray-400">
                Your Basket
            </Title>
            <Checkbox
                label="Select all"
                color="violet"
                size={isSmall ? "sm" : "md"}
                fw={500}
                my={20}
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
                        <Card
                            key={item.id}
                            withBorder
                            radius="lg"
                            p={isSmall ? "sm" : "lg"}
                        >
                            <Text fw={600} pb={20} fz={isSmall ? "sm" : "md"}>
                                {item.title}
                            </Text>
                            <Stack gap="xs">
                                <Flex
                                    direction={isSmall ? "column" : "row"}
                                    align={isSmall ? "center" : "flex-start"}
                                    gap={isSmall ? "sm" : "lg"}
                                >
                                    <Checkbox color="violet" size="sm" />
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        w={isSmall ? 100 : 140}
                                        h={isSmall ? 100 : 120}
                                        fit="contain"
                                        radius="md"
                                    />

                                    <Stack gap={4} flex={1}>
                                        <Text
                                            bg="#ffe6f5"
                                            px={8}
                                            py={2}
                                            fz="xs"
                                            fw={600}
                                            c="violet"
                                            style={{ borderRadius: 8 }}
                                        >
                                            {item?.warrantyInformation}
                                        </Text>
                                        <Text>
                                            {item?.description?.slice(0, 100)}
                                        </Text>


                                        <Flex
                                            align={"start"}
                                            direction={"column"}
                                            mt={8}
                                            gap={8}
                                        >
                                            <Group>
                                                <Button
                                                    size="compact-sm"
                                                    variant="outline"
                                                    color="gray"
                                                    onClick={() => decreaseQuantityFn(item.id)}
                                                >
                                                    −
                                                </Button>
                                                <Text fw={600}>{item.quantity}</Text>
                                                <Button
                                                    size="compact-sm"
                                                    variant="outline"
                                                    color="gray"
                                                    onClick={() => increaseQuantityFn(item.id)}
                                                >
                                                    +
                                                </Button>
                                            </Group>

                                            <Stack gap={0} align="flex-end">
                                                <Text fw={700} c="violet">
                                                    ${(item.price * item.quantity).toLocaleString()} USD
                                                </Text>
                                            </Stack>
                                        </Flex>
                                    </Stack>

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

                <Paper
                    withBorder
                    radius="lg"
                    p="lg"
                    w={isSmall ? "100%" : "30%"}
                >
                    <Stack gap="sm">
                        <Title order={5}>Your order</Title>
                        <Text c="dimmed" fz="sm">
                            Products ({basket.length}):{" "}
                            ${totalPrice.toLocaleString()} USD
                        </Text>

                        <Divider my="xs" />

                        <Stack gap={0}>
                            <Text fw={600}>All:</Text>
                            <Text fw={800} fz="xl" c="violet">
                                {totalPrice.toLocaleString()} so‘m
                            </Text>
                            <Text c="green" fz="sm">
                                Vat: {(totalPrice * 0.12).toLocaleString()} USD
                            </Text>
                        </Stack>

                        <Button
                            mt="md"
                            color="violet"
                            fullWidth
                            size="md"
                            radius="md"
                            fw={600}
                        >
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
        </Container>
    );
};

export default Basket;
