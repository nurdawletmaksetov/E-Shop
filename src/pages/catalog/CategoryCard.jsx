import { Card, Flex, Image, Text } from '@mantine/core'
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { useFilter } from '../../context/Filter/FilterContext';

const CategoryCard = ({ title, isSmall = false, handleTopClick }) => {
    const { setSelectedCategory } = useFilter();
    const navigate = useNavigate();
    const location = useLocation();

    const handleRadioChangeCategory = (category) => {
        const selected = typeof category === "string" ? category : category.slug || category.name?.toLowerCase() || "";
        setSelectedCategory(selected);
        navigate("/filtered");
        handleTopClick?.();
    };

    useEffect(() => {
        if (location.pathname !== "/filtered") {
            setSelectedCategory("");
            localStorage.removeItem("selectedCategory");
        }
    }, [location.pathname]);

    return (
        <Card onClick={() => handleRadioChangeCategory(title)} withBorder p="sm" className='cursor-pointer'>
            <Flex direction="column" justify="center" align="center">
                <Image src="https://placehold.co/50x50" />
                <Text mt={5} size={isSmall ? "14px" : "20px"} fw="bold">{title}</Text>
            </Flex>
        </Card>
    );
}

export default CategoryCard;
