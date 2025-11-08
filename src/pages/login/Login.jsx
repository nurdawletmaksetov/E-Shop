import React, { useState, useEffect } from "react";
import { Button, TextInput, Stack, Text, Flex } from "@mantine/core";
import { useAuth } from "../../store/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container } from "../../container/container";

const Login = () => {
    const { login, isLoading, error, isAuthenticated, user } = useAuth();
    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const navigate = useNavigate();
    const location = useLocation();
    const nav = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async () => {
        await login(username, password);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    return (
        <>
            <Container>
                <Flex justify="center" align={"center"} h={"100vh"}>
                    <Stack w={300} mx="auto">
                        <Text size="xl" fw={600} ta="center">
                            Login
                        </Text>

                        <TextInput
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                        />
                        <TextInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />

                        <Flex direction={"column"} align={"center"} justify="center">
                            <Button fullWidth loading={isLoading} onClick={handleLogin}>
                                Login
                            </Button>
                            <Button variant="transparent" w={100}>Register</Button>
                            <Button variant="transparent" w={150} onClick={() => nav("/")}>Back to Home</Button>
                        </Flex>

                        {error && <Text c="red">{error} ❌</Text>}
                        {isAuthenticated && user && (
                            <Text c="green">Welcome, {user.username}! ✅</Text>
                        )}
                    </Stack>
                </Flex>
            </Container >
        </>
    );
};

export default Login;
