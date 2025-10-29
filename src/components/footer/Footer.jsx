import { Flex, Group, Stack, Text, Title } from "@mantine/core"
import { Container } from "../../container/container"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <footer>
                <Container>
                    <Flex>
                        <Stack>
                            <Title order={4}>Socials</Title>
                            <Link to="">
                                <Text>GitHub</Text>
                            </Link>
                            <Link to="">
                                <Text>LinkedIn</Text>
                            </Link>
                            <Link to="">
                                <Text>Instagram</Text>
                            </Link>
                            <Link to="">
                                <Text>Telegram</Text>
                            </Link>
                        </Stack>
                    </Flex>
                </Container>
            </footer>
        </>
    )
}

export default Footer