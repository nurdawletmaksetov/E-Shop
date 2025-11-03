import AdBanner from '../../components/bannerSlide/AdBanner'
import AllProducts from '../../components/product/allProduct/all-products'
import { Container } from '../../container/container'
import { Group } from '@mantine/core'

const Home = ({ matches, handleTopClick }) => {
    return (
        <>
            <section>
                <Container>
                    <Group py={20}>
                        <AdBanner matches={matches} />
                        <AllProducts handleTopClick={handleTopClick} />
                    </Group>
                </Container>
            </section>
        </>
    )
}

export default Home