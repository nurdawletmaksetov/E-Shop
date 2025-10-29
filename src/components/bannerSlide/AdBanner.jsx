import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from 'embla-carousel-autoplay';
import classes from './Demo.module.css';
import { useRef } from "react";

const images = [
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];
const AdBanner = () => {
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    const matches = useMediaQuery('(min-width: 800px)');
    const isSmall = useMediaQuery("(min-width: 500px)");
    const isSmaller = useMediaQuery("(min-width: 375px)");

    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} />
        </Carousel.Slide>
    ));


    return (
        <>
            <Carousel
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={() => autoplay.current.play()}
                withIndicators
                classNames={matches ? "" : classes}
                height={matches ? "350px" : isSmall ? "250px" : isSmaller ? "200px" : "150px"}
                emblaOptions={{ loop: true }}
            >
                {slides}
            </Carousel>
        </>
    )
}

export default AdBanner