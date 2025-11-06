import React, { useState, useEffect } from "react";
import { Button, TextInput, Stack, Text } from "@mantine/core";
import { useAuth } from "../../store/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const { login, isLoading, error, isAuthenticated, user } = useAuth();
    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const navigate = useNavigate();
    const location = useLocation();

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
        <Stack maw={300} mx="auto" mt="xl">
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

            <Button loading={isLoading} onClick={handleLogin}>
                Login
            </Button>

            {error && <Text c="red">{error}</Text>}
            {isAuthenticated && user && (
                <Text c="green">Welcome, {user.username}! ✅</Text>
            )}
        </Stack>
    );
};

export default Login;
