import React from 'react'
import { Container } from '../../container/container'
import { ActionIcon, Button, Flex, TextInput, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Heart, Search, ShoppingBasket, User } from 'lucide-react'
import { useMediaQuery } from '@mantine/hooks'

export const Header = ({ matches }) => {
    const hideBar = useMediaQuery('(min-width: 500px)');

    return (
        <>
            <header className={hideBar ? "" : "bg-white sticky top-0 left-0 right-0 z-40"}>
                <Container>
                    <Flex gap={15} align={"center"} py={20} justify={"space-between"}>
                        <Link to="/">
                            <Flex
                                gap={4}
                                align={"center"}
                                style={{
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <Title order={1} c={"#7f4dff"} size={matches ? "30px" : "20px"}>
                                    Shop
                                </Title>
                                <Title order={4} c={"#7f4dff"} size={matches ? "20px" : "15px"} style={{ letterSpacing: '1px' }}>
                                    NUR
                                </Title>
                            </Flex>
                        </Link>
                        {hideBar && (
                            <TextInput
                                size={matches ? "sm" : "xs"}
                                w={matches ? 500 : "100%"}
                                placeholder="Search goods"
                                rightSection={
                                    <ActionIcon
                                        size={matches ? "sm" : "xs"}
                                        className='cursor-pointer'
                                        variant="transparent"
                                        type="submit"
                                    >
                                        <Search size={matches ? 20 : 16} color="#7f4dff" />
                                    </ActionIcon>
                                }
                            />
                        )}
                        {hideBar ? (
                            <Flex gap={matches ? 10 : 5} align={"center"}>
                                <Button
                                    size={matches ? "sm" : "xs"}
                                    variant="light"
                                    color="#7f4dff"
                                >
                                    {matches ? (
                                        <Flex justify={"space-between"} gap={6}>
                                            <User color="#7f4dff" size={16} /> Sign In
                                        </Flex>
                                    ) : (
                                        <User color="#7f4dff" size={16} />
                                    )}
                                </Button>
                                <Button
                                    size={matches ? "sm" : "xs"}
                                    variant="light"
                                    color="#7f4dff"
                                >
                                    {matches ? (
                                        <Flex justify={"space-between"} gap={6}>
                                            <Heart color='#7f4dff' size={16} /> Favourites
                                        </Flex>
                                    ) : (
                                        <Heart color='#7f4dff' size={16} />
                                    )}
                                </Button>
                                <Button
                                    size={matches ? "sm" : "xs"}
                                    variant='light'
                                    color='#7f4dff'
                                >
                                    {matches ? (
                                        <Flex justify={"space-between"} gap={6}>
                                            <ShoppingBasket color='#7f4dff' size={16} /> Basket
                                        </Flex>
                                    ) : (
                                        <ShoppingBasket color='#7f4dff' size={16} />
                                    )}
                                </Button>
                            </Flex>
                        ) : (
                            <>
                                <Flex align={"center"} gap={20}>
                                    <ActionIcon
                                        size={matches ? "sm" : "xs"}
                                        className='cursor-pointer'
                                        variant="transparent"
                                        type="submit"
                                    >
                                        <Search color='#7f4dff' size={20} />
                                    </ActionIcon>
                                    <ActionIcon
                                        size={matches ? "sm" : "xs"}
                                        className='cursor-pointer'
                                        variant="transparent"
                                        type="submit"
                                    >
                                        <Heart color='#7f4dff' size={20} />
                                    </ActionIcon>
                                </Flex>
                            </>
                        )}
                    </Flex>
                </Container>
            </header>
        </>
    )
}
