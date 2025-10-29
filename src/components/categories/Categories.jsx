import { Flex, Select, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { api } from '../../api/api'
import { Link } from 'react-router-dom'
import { Container } from '../../container/container'
import { useMediaQuery } from '@mantine/hooks'

const Categories = ({ matches }) => {
    const [categories, setCategories] = useState([])
    const isLarge = useMediaQuery("(min-width: 1200px)");
    const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
    const isSmall = useMediaQuery("(max-width: 830px)");

    const visibleCount = isLarge ? 9 : isMedium ? 7 : 5;

    // const visibleCount = matches ? 7 : 5

    const visibleCategories = categories.slice(0, visibleCount)

    async function getCategories() {
        try {
            const { data } = await api.get('/products/categories')
            setCategories(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <Container>
                <Flex py={5} align={"center"} justify={"space-between"} wrap={"wrap"} gap="md">
                    {visibleCategories.map((el, i) => (
                        <Link key={i} className='hover:text-[#7f4dff]'>
                            <Text size={isSmall ? "xs" : "sm"}>
                                {el.name}
                            </Text>
                        </Link>
                    ))}
                    {categories.length > visibleCount && (
                        <Select
                            placeholder='More'
                            data={categories.slice(-10).map((el) => ({
                                label: el.name,
                                value: el.name,
                            }))}
                            w={150}
                        />
                    )}
                </Flex>
            </Container>
        </>
    )
}

export default Categories