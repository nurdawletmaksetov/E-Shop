import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import OneProduct from '../oneProduct/one-product';
import { Button, Flex, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);

    const ITEMS_PER_PAGE = 10;
    const isSmaller = useMediaQuery('(max-width: 375px)');

    async function getProduct() {
        try {
            const { data } = await api.get('/products');
            const productList = Array.isArray(data) ? data : data.products;
            setProducts(productList);
            console.log(data);
        } catch (error) {
            console.error('Xato:', error);
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
                {Array.isArray(visibleProducts) &&
                    visibleProducts.map((el) => (
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
                        />
                    ))}
            </SimpleGrid>

            {visibleCount < products.length && (
                <Flex justify="center" mt="lg" w="100%">
                    <Button
                        onClick={handleLoadMore}
                        radius="md"
                        size="md"
                        fullWidth
                        color='#7f4dff'
                        variant="filled"
                    >
                        More
                    </Button>
                </Flex>
            )}
        </>
    );
};

export default AllProducts;
