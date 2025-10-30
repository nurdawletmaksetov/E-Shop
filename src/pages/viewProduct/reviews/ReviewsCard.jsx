import { Badge, Button, Card, Flex, Group, Image, Stack, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const ReviewsCard = (props) => {
    const { reviewerName, rating, comment, date } = props;
    const isSmall = useMediaQuery("(max-width: 700px)");

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
        <>
            <Card shadow="sm" h={isSmall ? 150 : 200} pb={40} radius="md" withBorder>
                <Group mb={5} justify="space-between" align="center">
                    <Text fw={500}>{reviewerName}</Text>
                    <Badge color="transparent">
                        <Flex>{renderStars(rating || 0)}</Flex>
                    </Badge>
                </Group>
                <Text size="12px" c={"dimmed"}>{date.length > 10 ? date.slice(0, 10) : date}</Text>
                <Flex direction={"column"}>
                    <Text>Comment:</Text>
                    <Text size="sm" c="dimmed">
                        {comment}
                    </Text>
                </Flex>
            </Card>
        </>
    )
}

export default ReviewsCard