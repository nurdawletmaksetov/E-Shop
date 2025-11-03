import { Container } from '../../container/container'
import { ActionIcon, Badge, Button, Flex, TextInput, Title } from '@mantine/core'
import { Link, NavLink } from 'react-router-dom'
import { Heart, Search, ShoppingBasket, User } from 'lucide-react'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useBasketStore } from '../../store/useBasketStore'
import { SearchModal } from '../SearchModal/SearchModal'

export const Header = ({ matches, handleTopClick }) => {
    const [opened, { open, close }] = useDisclosure(false);

    const favourites = useFavoritesStore((state) => state.favorites);

    const favouritesCount = favourites?.length ?? 0;

    const basket = useBasketStore((state) => state.basket);

    const basketCount = basket?.length ?? 0;

    const hideBar = useMediaQuery('(min-width: 500px)');

    return (
        <>
            <SearchModal opened={opened} onClose={close} />
            <header className={hideBar ? "" : "bg-white sticky top-0 left-0 right-0 z-40"}>
                <Container>
                    <Flex gap={15} align={"center"} py={20} justify={"space-between"}>
                        <Link to="/" onClick={handleTopClick}>
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
                                <Title order={1} c={"#7f4dff"} size={matches ? "30px" : "22px"}>
                                    Shop
                                </Title>
                                <Title order={4} c={"#7f4dff"} size={matches ? "20px" : "15px"} style={{ letterSpacing: '1px' }}>
                                    NUR
                                </Title>
                            </Flex>
                        </Link>
                        {hideBar && (
                            <TextInput
                                disabled={opened}
                                size={matches ? "sm" : "xs"}
                                w={matches ? 500 : "100%"}
                                placeholder="Search goods"
                                onClick={open}
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
                                <NavLink to="/favourites" onClick={handleTopClick} className={"relative"}>
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
                                    {favouritesCount > 0 && (
                                        <Badge
                                            variant="filled"
                                            color="red"
                                            bdrs={2}
                                            p={matches ? 5 : 4}
                                            size={matches ? "xs" : "10px"}
                                            pos={"absolute"}
                                            top={0}
                                            right={0}
                                            aria-label={`${favouritesCount} favourites`}
                                        >
                                            {favouritesCount}
                                        </Badge>
                                    )}
                                </NavLink>
                                <NavLink to="/basket" onClick={handleTopClick} className={"relative"}>
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
                                    {basketCount > 0 && (
                                        <Badge
                                            variant="filled"
                                            color="red"
                                            bdrs={2}
                                            p={matches ? 5 : 4}
                                            size={matches ? "xs" : "10px"}
                                            pos={"absolute"}
                                            top={0}
                                            right={0}
                                            aria-label={`${basketCount} favourites`}
                                        >
                                            {basketCount}
                                        </Badge>
                                    )}
                                </NavLink>
                            </Flex>
                        ) : (
                            <>
                                <Flex align={"center"} gap={20}>
                                    <ActionIcon
                                        onClick={open}
                                        size={"md"}
                                        className='cursor-pointer'
                                        variant="transparent"
                                        type="submit"
                                    >
                                        <Search color='#7f4dff' size={20} />
                                    </ActionIcon>
                                    <Link to="/favourites" className={"flex items-center"}>
                                        <ActionIcon
                                            size={"md"}
                                            className='cursor-pointer'
                                            variant="transparent"
                                            onClick={handleTopClick}
                                            type="submit"
                                        >
                                            <Heart color='#7f4dff' size={20} />
                                        </ActionIcon>
                                    </Link>
                                </Flex>
                            </>
                        )}
                    </Flex>
                </Container>
            </header>
        </>
    )
}
