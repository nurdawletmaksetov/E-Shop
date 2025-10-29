import { Button, Flex, Text } from "@mantine/core";
import { Heart, ShoppingBasket, Home, User, Search } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import { NavLink } from "react-router-dom";

export const BottomNav = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");

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

            <NavLink to="/">
                <Flex direction={"column"} justify={"center"} align={'center'}>
                    <ShoppingBasket size={25} color="#7f4dff" />
                    <Text size="xs" c={"#7f4dff"}>
                        Basket
                    </Text>
                </Flex>
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
