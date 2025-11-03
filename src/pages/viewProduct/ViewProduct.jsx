import { Flex, Stack, Title, Text, Card, Badge, Button, ActionIcon } from '@mantine/core'
import { Container } from '../../container/container'
import { useEffect, useState } from 'react'
import { api } from '../../api/api'
import { useParams } from 'react-router-dom'
import { FaHeart, FaMinus, FaPlus, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import ReviewsSlide from './reviews/ReviewsSlide'
import ImageSwiper from './image/ImageSwiper'
import AllProducts from '../../components/product/allProduct/all-products'
import { Check, Heart, ShoppingBag } from 'lucide-react'
import { useMediaQuery } from '@mantine/hooks'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useBasketStore } from '../../store/useBasketStore'

const ViewProduct = () => {
    const [oneProduct, setOneProduct] = useState({})
    const { id } = useParams()
    const isSmall = useMediaQuery("(max-width: 700px)");
    const { favorites, toggleFavoriteFn } = useFavoritesStore();

    const isFavorite = favorites.some((item) => String(item.id) === String(id));

    const {
        basket,
        toggleBasketFn,
        increaseQuantityFn,
        decreaseQuantityFn,
    } = useBasketStore();

    const inBasketItem = basket.find((item) => String(item.id) === String(id));
    const inBasket = Boolean(inBasketItem);
    const quantity = inBasketItem?.quantity || 1;

    const handleIncrement = () => {
        if (quantity < oneProduct?.stock) increaseQuantityFn(id);
    };

    const handleDecrement = () => {
        if (quantity > 1) decreaseQuantityFn(id);
        else toggleBasketFn({ id });
    };
    async function getOneProduct() {
        try {
            const { data } = await api.get(`/products/${id}`)
            setOneProduct(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (id) getOneProduct()
    }, [id])

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        }

        if (hasHalf) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
        }

        while (stars.length < 5) {
            stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-gray-300" />);
        }

        return stars;
    };

    return (
        <section>
            <Container>
                <Flex direction={isSmall ? "column" : "row"} my={25} gap={'lg'}>
                    <Stack w={isSmall ? "100%" : "60%"}>
                        <Title>{oneProduct.title}</Title>
                        <Flex direction={"column"} align={"start"} gap={10}>
                            <Flex align={"center"} gap={10}>
                                <Flex align={"center"} gap={5}>
                                    <Flex>{renderStars(oneProduct?.rating || 0)}</Flex>
                                    <span className="text-gray-400 text-sm">{oneProduct?.rating?.toFixed(1)}</span>
                                </Flex>
                                <Text c={"gray"}>({oneProduct?.reviews?.length} reviews)</Text>
                            </Flex>
                            <Flex bg={"#F7FF00"} py={1} px={5} bdrs={100}>
                                <Text size='xs' fw={600}>-{oneProduct?.discountPercentage}%</Text>
                            </Flex>
                        </Flex>
                        <ImageSwiper oneProduct={oneProduct} />
                        <ReviewsSlide isSmall={isSmall} oneProduct={oneProduct} />
                        <Stack>
                            <Title order={4}>Description</Title>
                            <Text fw={600}>Brand: <span className='font-normal'>{oneProduct?.brand || "N/A"}</span></Text>
                            <Text>{oneProduct?.description}</Text>
                        </Stack>
                    </Stack>
                    <Stack w={isSmall ? "100%" : "40%"}>
                        <Card radius="md" withBorder>
                            <Flex mb={5} justify="space-between" align="center">
                                <Badge py={1} px={5} color="#7f4dff">
                                    <Text size='xs' fw={600}>-{oneProduct?.discountPercentage}%</Text>
                                </Badge>
                            </Flex>
                            <Title order={1} mt={5} c={"#7f4dff"} fw={"700"}>
                                ${oneProduct?.price} USD
                            </Title>
                            <Flex gap={10} mt={15}>
                                <Button w={"100%"} h={40} bg={"#C9C9C9"} c={"#000"} radius="md">Buy one Click</Button>
                                <Button
                                    h={40}
                                    bg={"#C9C9C9"}
                                    radius="md"
                                    onClick={() =>
                                        toggleFavoriteFn({
                                            id: oneProduct.id,
                                            title: oneProduct.title,
                                            price: oneProduct.price,
                                            image: oneProduct.images?.[0],
                                            rating: oneProduct.rating,
                                            reviews: oneProduct.reviews,
                                        })
                                    }
                                >
                                    {isFavorite ? <FaHeart color={"red"} size={20} /> : <Heart color={"#000"} size={20} />}
                                </Button>
                            </Flex>
                            {!inBasket ? (
                                <Button
                                    onClick={() => {
                                        toggleBasketFn({
                                            id: Number(oneProduct.id),
                                            title: oneProduct.title,
                                            description: oneProduct.description,
                                            price: oneProduct.price,
                                            image: oneProduct.images?.[0],
                                            rating: oneProduct.rating,
                                            reviews: oneProduct.reviews,
                                            stock: oneProduct.stock,
                                            warrantyInformation: oneProduct.warrantyInformation,
                                            shippingInformation: oneProduct.shippingInformation
                                        });
                                    }}
                                    mt={10}
                                    w={"100%"}
                                    h={60}
                                    bg={"#7f4dff"}
                                    c={"#fff"}
                                    radius="md"
                                >
                                    <Flex direction={"column"}>
                                        <Text fw={600} size='lg'>Add to Basket</Text>
                                        <Text size='sm'>{oneProduct?.shippingInformation}</Text>
                                    </Flex>
                                </Button>
                            ) : (
                                <Flex
                                    align="center"
                                    justify="space-between"
                                    w="100%"
                                    mt={10}
                                    h={60}
                                    radius="md"
                                    bg="#f3eaff"
                                    px={isSmall ? 5 : 10}
                                    py={isSmall ? 0 : 5}
                                    style={{ borderRadius: "8px" }}
                                >
                                    <ActionIcon
                                        onClick={handleDecrement}
                                        color="#7f4dff"
                                        variant="transparent"
                                        radius="xl"
                                    >
                                        <FaMinus />
                                    </ActionIcon>
                                    <Text fw={600}>{quantity}</Text>
                                    <ActionIcon
                                        onClick={handleIncrement}
                                        color="#7f4dff"
                                        variant="transparent"
                                        radius="xl"
                                        disabled={quantity === oneProduct?.stock}
                                    >
                                        <FaPlus />
                                    </ActionIcon>
                                </Flex>
                            )}
                            <Flex mt={10} gap={10}>
                                <Badge py={12} px={5} bg={"#BCE68C"} radius="md">
                                    <Check color='#000' size={16} />
                                </Badge>
                                <Text c={"#1f1f1f"}>{oneProduct?.stock} in stock</Text>
                            </Flex>
                            <Flex mt={10} gap={10}>
                                <Badge py={12} px={5} bg={"#E0C879"} radius="md">
                                    <ShoppingBag color='#000' size={16} />
                                </Badge>
                                <Text c={"#1f1f1f"}>{oneProduct?.minimumOrderQuantity} per order</Text>
                            </Flex>
                        </Card>
                        <Card radius="md" withBorder>
                            <Flex direction={"column"}>
                                <Title order={4}>Shipping Information</Title>
                                <Text>{oneProduct?.shippingInformation}</Text>
                            </Flex>
                        </Card>
                        <Card radius="md" withBorder>
                            <Flex direction={"column"}>
                                <Title order={4}>Return Policy</Title>
                                <Text>{oneProduct?.returnPolicy}</Text>
                            </Flex>
                        </Card>
                    </Stack>
                </Flex>
                <AllProducts />
            </Container>
        </section>
    )
}

export default ViewProduct
