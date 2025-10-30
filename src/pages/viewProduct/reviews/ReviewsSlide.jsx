import { Flex } from '@mantine/core'
import ReviewsCard from './ReviewsCard'
import { Carousel } from '@mantine/carousel'

const ReviewsSlide = ({ oneProduct, isSmall }) => {
    return (
        <>
            <Carousel
                withIndicators
                slideSize={isSmall ? "100%" : "50%"}
                slideGap="md"
                emblaOptions={{ loop: true, align: 'start', slidesToScroll: 1 }}
            >
                {oneProduct?.reviews?.map((el, index) => (
                    <Carousel.Slide key={index}>
                        <ReviewsCard
                            isSmall={isSmall}
                            // key={index}
                            reviewerName={el.reviewerName}
                            rating={el.rating}
                            comment={el.comment}
                            date={el.date}
                        />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </>
    )
}

export default ReviewsSlide