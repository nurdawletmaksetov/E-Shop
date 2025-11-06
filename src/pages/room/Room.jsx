import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../container/container';
import { api } from '../../api/api';
import { Card, Image, Text, Group, Stack, Badge } from '@mantine/core';

const Room = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            if (!id) return;
            try {
                const { data } = await api.get(`/users/${id}`);
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
    }, [id]);

    if (!user) return <Container>Loading...</Container>;

    return (
        <section className="py-20">
            <Container>
                <Group align="flex-start" spacing="lg">
                    <Image
                        src={user.image}
                        alt={user.username}
                        bd={"2px solid"}
                        h={100}
                        w={100}
                        radius="md"
                    />
                    <Stack spacing="xs">
                        <Text size="xl" weight={700}>
                            {user.firstName} {user.lastName} ({user.username})
                        </Text>
                        <Text color="dimmed">{user.email}</Text>
                        <Badge color={user.gender === 'female' ? 'pink' : 'blue'}>
                            {user.gender}
                        </Badge>
                        {user.age && <Text>Age: {user.age}</Text>}
                        {user.phone && <Text>Phone: {user.phone}</Text>}
                        {user.address && (
                            <Text>
                                Address: {user.address.address}, {user.address.city}
                            </Text>
                        )}
                    </Stack>
                </Group>
            </Container>
        </section>
    );
};

export default Room;
