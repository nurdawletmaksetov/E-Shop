import { Flex, Group, Stack, Text, Title } from "@mantine/core"
import { Container } from "../../container/container"
import { Link } from "react-router-dom"
import { useMediaQuery } from "@mantine/hooks";

const Footer = () => {
    const match = useMediaQuery("(max-width: 600px)");
    return (
        <>
            <footer>
                <Container>
                    <Flex direction={match ? "column" : "row"} py={20} gap={15} justify={"space-between"}>
                        <Stack>
                            <Title order={5}>Socials</Title>
                            <Link to="https://github.com/nurdawletmaksetov">
                                <Text>GitHub</Text>
                            </Link>
                            <Link to="https://www.linkedin.com/in/nurdawlet-maksetov-a3155b376/">
                                <Text>LinkedIn</Text>
                            </Link>
                            <Link to="https://www.instagram.com/m_nurdawlet/">
                                <Text>Instagram</Text>
                            </Link>
                            <Link to="https://t.me/nurdawlet_dev">
                                <Text>Telegram</Text>
                            </Link>
                        </Stack>
                        <Stack>
                            <Title order={5}>Something</Title>
                            <Text>Something</Text>
                            <Text>Something</Text>
                            <Text>Something</Text>
                        </Stack>
                        <Stack>
                            <Title order={5}>Something</Title>
                            <Text>Something</Text>
                            <Text>Something</Text>
                            <Text>Something</Text>
                        </Stack>
                        <Stack>
                            <Title order={5}>Contact Us</Title>
                            <Text>Email: Vt0m2@example.com</Text>
                            <Text>Phone: +998 90 123 45 67</Text>
                            <Text>Address: Earth</Text>
                        </Stack>
                    </Flex>
                    <Flex w={"100%"} align={"center"} justify={"center"} py={15} className="border-t-1">
                        <Text>Copyright © 2025 Nurdawlet</Text>
                    </Flex>
                </Container>
            </footer>
        </>
    )
}

export default Footer