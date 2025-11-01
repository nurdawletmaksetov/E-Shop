import { Badge, Button, Flex, Text } from "@mantine/core";
import { Heart, ShoppingBasket, Home, User, Search } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { useBasketStore } from "../../store/useBasketStore";

export const BottomNav = () => {
    const isMobile = useMediaQuery("(max-width: 600px)");

    const basket = useBasketStore((state) => state.basket);

    const basketCount = basket?.length ?? 0;

    if (!isMobile) return null;

    return (
        <Flex
            justify="space-around"
            align="center"
            p="xs"
            bg="white"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                borderTop: "1px solid #ddd",
                zIndex: 1000,
            }}
        >
            <NavLink to="/">
                <Flex direction={"column"} justify={"center"} align={"center"}>
                    <Home size={25} color="#7f4dff" />
                    <Text size="xs" c={"#7f4dff"}>
                        Home
                    </Text>
                </Flex>
            </NavLink>

            <NavLink to="/">
                <Flex direction={"column"} justify={"center"} align={"center"}>
                    <Search size={25} color="#7f4dff" />
                    <Text size="xs" c={"#7f4dff"}>
                        Catalog
                    </Text>
                </Flex>
            </NavLink>

            <NavLink className={"relative"} to="/basket">
                <Flex direction={"column"} justify={"center"} align={'center'}>
                    <ShoppingBasket size={25} color="#7f4dff" />
                    <Text size="xs" c={"#7f4dff"}>
                        Basket
                    </Text>
                </Flex>
                {basketCount > 0 && (
                    <Badge
                        variant="filled"
                        color="black"
                        bdrs={999}
                        p={5}
                        size={"xs"}
                        pos={"absolute"}
                        top={-5}
                        right={-10}
                        aria-label={`${basketCount} favourites`}
                    >
                        {basketCount}
                    </Badge>
                )}
            </NavLink>

            <NavLink to="/">
                <Flex direction={"column"} justify={"center"} align={'center'}>
                    <User size={25} color="#7f4dff" />
                    <Text size="xs" c={"#7f4dff"}>
                        Sign In
                    </Text>
                </Flex>
            </NavLink>
        </Flex>
    );
};
