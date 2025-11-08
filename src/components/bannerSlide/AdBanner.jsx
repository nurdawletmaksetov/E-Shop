import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import classes from "./Demo.module.css";

const images = [
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&h=400&q=80",
    "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&h=400&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=400&q=80",
    "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&h=400&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&h=400&q=80",
];

const AdBanner = () => {
    const autoplay = useRef(Autoplay({ delay: 5000 }));

    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "40%",
                    overflow: "hidden",
                    borderRadius: "12px",
                }}
            >
                <Image
                    src={url}
                    fit="cover"
                    radius="md"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectPosition: "center",
                        transition: "transform 0.5s ease",
                    }}
                />
            </div>
        </Carousel.Slide>
    ));

    return (
        <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={() => autoplay.current.play()}
            withIndicators
            classNames={classes}
            loop
            emblaOptions={{ loop: true }}
            style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                borderRadius: "16px",
                overflow: "hidden",
            }}
        >
            {slides}
        </Carousel>
    );
};

export default AdBanner;
