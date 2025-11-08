import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import OneProduct from '../oneProduct/one-product';
import { Button, Flex, Modal, SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const AllProducts = ({ handleTopClick }) => {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const ITEMS_PER_PAGE = 10;
    const isSmaller = useMediaQuery('(max-width: 375px)');

    async function getProduct() {
        setLoading(true);
        setError(false);
        try {
            const { data } = await api.get('/products?limit=0');
            const productList = Array.isArray(data) ? data : data.products;
            setProducts(productList);

            setTimeout(() => {
                setLoading(false);
                if (!productList || productList.length === 0) {
                    setError(true);
                }
            }, 3000);
        } catch (error) {
            console.error('Network Error:', error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    const visibleProducts = products.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    return (
        <>
            <SimpleGrid
                cols={{ base: 2, sm: 3, md: 4, lg: 4 }}
                spacing={isSmaller ? 6 : 10}
                mt="md"
            >
                {(loading ? Array.from({ length: visibleCount }) : visibleProducts).map((el, i) => (
                    loading ? (
                        <OneProduct key={i} loading={true} />
                    ) : (
                        <OneProduct
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            description={el.description}
                            price={el.price}
                            image={el.thumbnail}
                            rating={el.rating}
                            reviews={el.reviews}
                            discountPercentage={el.discountPercentage}
                            stock={el.stock}
                            returnPolicy={el.returnPolicy}
                            warrantyInformation={el.warrantyInformation}
                            shippingInformation={el.shippingInformation}
                            loading={false}
                        />
                    )
                ))}
            </SimpleGrid>

            {visibleCount < products.length && (
                <Flex justify="center" mt="lg" w="100%">
                    <Button
                        onClick={handleLoadMore}
                        radius="md"
                        size="md"
                        fullWidth
                        color="#7f4dff"
                        variant="filled"
                    >
                        More
                    </Button>
                </Flex>
            )}

            <Modal
                opened={error}
                onClose={() => setError(false)}
                centered
                title="Network Error"
            >
                <Text color="red" size="sm">
                    Server bilan bog‘lanishda muammo yuz berdi yoki mahsulotlar topilmadi.
                    Iltimos, keyinroq qayta urinib ko‘ring.
                </Text>
                <Flex justify="flex-end" mt="md">
                    <Button color="red" onClick={() => setError(false)}>
                        Yopish
                    </Button>
                </Flex>
            </Modal>
        </>
    );
};

export default AllProducts;
