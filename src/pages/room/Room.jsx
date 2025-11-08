import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../container/container';
import { api } from '../../api/api';
import { Card, Image, Text, Group, Stack, Badge, Skeleton, Modal, Button, Flex } from '@mantine/core';

const Room = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getUser() {
            setLoading(true);
            setError(false);
            try {
                const { data } = await api.get(`/users/${id}`);
                setUser(data);
            } catch (err) {
                console.error('Server Error:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, [id]);

    return (
        <section className="py-20">
            <Container>
                <Group align="flex-start" spacing="lg">
                    {loading ? (
                        <Skeleton height={100} width={100} radius="md" />
                    ) : (
                        <Image
                            src={user?.image}
                            alt={user?.username}
                            bd="2px solid"
                            h={100}
                            w={100}
                            radius="md"
                        />
                    )}

                    <Stack spacing="xs">
                        {loading ? (
                            <>
                                <Skeleton height={20} width={200} />
                                <Skeleton height={15} width={150} />
                                <Skeleton height={15} width={80} />
                            </>
                        ) : (
                            <>
                                <Text size="xl" fw={700}>
                                    {user?.firstName} {user?.lastName} ({user?.username})
                                </Text>
                                <Text c="dimmed">{user?.email}</Text>
                                <Badge color={user?.gender === 'female' ? 'pink' : 'blue'}>
                                    {user?.gender}
                                </Badge>
                                {user?.age && <Text>Age: {user?.age}</Text>}
                                {user?.phone && <Text>Phone: {user?.phone}</Text>}
                                {user?.address && (
                                    <Text>
                                        Address: {user?.address?.address}, {user?.address?.city}
                                    </Text>
                                )}
                            </>
                        )}
                    </Stack>
                </Group>
            </Container>
            <Modal
                opened={error}
                onClose={() => setError(false)}
                centered
                title="Server Error"
            >
                <Text color="red" size="sm">
                    There was a problem connecting to the server.
                    Please try again later.
                </Text>
                <Flex justify="flex-end" mt="md">
                    <Button color="red" onClick={() => setError(false)}>
                        Close
                    </Button>
                </Flex>
            </Modal>
        </section>
    );
};

export default Room;
