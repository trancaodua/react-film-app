import React, { useState, useEffect } from "react";

const slideIDs = ["carousel__slide1", "carousel__slide2", "carousel__slide3", "carousel__slide4", "carousel__slide5"];

function Slider() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    const scrollToSlide = (index) => {
        document.getElementById(slideIDs[index]).scrollIntoView();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prev) => {
                return prev < slideIDs.length - 1 ? prev + 1 : 0;
            });
        }, 4000);
        setIntervalID(interval);

        return () => {
            clearInterval(intervalID);
        };
    }, []);

    useEffect(() => {
        scrollToSlide(slideIndex);
    }, [slideIndex]);

    const handleClick = (index) => {
        clearInterval(intervalID);
        setSlideIndex(index);

        const interval = setInterval(() => {
            setSlideIndex((prev) => {
                return prev < slideIDs.length - 1 ? prev + 1 : 0;
            });
        }, 4000);
        setIntervalID(interval);
    };

    const timer = () => {
        const temp = slideIndex + 1;
        setSlideIndex(temp);
    };

    return (
        <div className="carousel">
            <ol className="carousel__viewport">
                <li id="slide-1" className="carousel__slide">
                    <div id="carousel__slide1" className="carousel__snapper"></div>
                    <img
                        src="https://m.media-amazon.com/images/S/sonata-images-prod/SVOD_ROW_WORE_Control/894ce930-f68b-4f43-9bfd-5d719ebcd727._UR3000,600_SX1500_FMjpg_.jpeg"
                        alt="Tom Clancy's Without Remorse"
                        loading="eager"
                    />
                </li>
                <li id="slide-2" className="carousel__slide">
                    <div id="carousel__slide2" className="carousel__snapper"></div>
                    <img
                        src="https://m.media-amazon.com/images/S/sonata-images-prod/SVOD_ROW_WORE_Control/894ce930-f68b-4f43-9bfd-5d719ebcd727._UR3000,600_SX1500_FMjpg_.jpeg"
                        alt="Tom Clancy's Without Remorse"
                        loading="eager"
                    />
                </li>
                <li id="slide-3" className="carousel__slide">
                    <div id="carousel__slide3" className="carousel__snapper" />
                    <img
                        src="https://m.media-amazon.com/images/S/sonata-images-prod/SVOD_ROW_VoxMachina_S1_NoLocaleOnly/7f7b0894-84c6-4200-a822-96f520c94657._UR3000,600_SX1500_FMjpg_.jpeg"
                        alt="The Legend of Vox Machina – Season 1"
                        loading="eager"
                    />
                </li>
                <li id="slide-4" className="carousel__slide">
                    <div id="carousel__slide4" className="carousel__snapper" />
                    <img
                        src="https://m.media-amazon.com/images/S/sonata-images-prod/SVOD_ROW_VoxMachina_S1_NoLocaleOnly/7f7b0894-84c6-4200-a822-96f520c94657._UR3000,600_SX1500_FMjpg_.jpeg"
                        alt="The Legend of Vox Machina – Season 1"
                        loading="eager"
                    />
                </li>
                <li id="slide-5" className="carousel__slide">
                    <div id="carousel__slide5" className="carousel__snapper" />
                    <img
                        src="https://m.media-amazon.com/images/S/sonata-images-prod/SVOD_ROW_VoxMachina_S1_NoLocaleOnly/7f7b0894-84c6-4200-a822-96f520c94657._UR3000,600_SX1500_FMjpg_.jpeg"
                        alt="The Legend of Vox Machina – Season 1"
                        loading="eager"
                    />
                </li>
            </ol>
            <div className="carousel__navigation">
                <button
                    onClick={() => {
                        handleClick(0);
                    }}
                    className={slideIndex === 0 ? "actived" : ""}
                ></button>
                <button
                    onClick={() => {
                        handleClick(1);
                    }}
                    className={slideIndex === 1 ? "actived" : ""}
                ></button>
                <button
                    onClick={() => {
                        handleClick(2);
                    }}
                    className={slideIndex === 2 ? "actived" : ""}
                ></button>
                <button
                    onClick={() => {
                        handleClick(3);
                    }}
                    className={slideIndex === 3 ? "actived" : ""}
                ></button>
                <button
                    onClick={() => {
                        handleClick(4);
                    }}
                    className={slideIndex === 4 ? "actived" : ""}
                ></button>
            </div>
        </div>
    );
}

export default Slider;
