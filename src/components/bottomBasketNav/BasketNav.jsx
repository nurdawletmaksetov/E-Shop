import { Button, Flex, Text } from "@mantine/core";
import { useBasketStore } from "../../store/useBasketStore";
import { useMediaQuery } from "@mantine/hooks";
import { Container } from "../../container/container";

const BasketNav = ({ selectedItems, totalPrice }) => {
    const isSmall = useMediaQuery("(max-width: 800px)");
    const { basket } = useBasketStore();
    const isPhone = useMediaQuery("(max-width: 600px)");

    if (!isSmall || basket.length === 0) return null;

    return (
        <Container>
            <Flex
                justify="space-between"
                align="center"
                px="lg"
                py="sm"
                className={`fixed ${isPhone ? "bottom-[60px]" : "bottom-0"} left-0 right-0 bg-white border-t border-t-[#eee] z-99`}
                style={{
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
                }}
            >
                <Flex direction="column" gap={2}>
                    <Text fw={600} fz="sm">
                        {selectedItems.length} items
                    </Text>
                    <Text fw={700} c="violet">
                        ${totalPrice.toLocaleString()} USD
                    </Text>
                </Flex>

                <Button
                    color="violet"
                    radius="md"
                    size="md"
                    fw={600}
                    style={{
                        flexShrink: 0,
                    }}
                >
                    Buy
                </Button>
            </Flex>
        </Container >
    );
};

export default BasketNav;
