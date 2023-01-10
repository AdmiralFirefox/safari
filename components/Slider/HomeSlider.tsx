import { FC } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";

SwiperCore.use([Navigation, Autoplay]);

const HomeSlider: FC = () => {
  return (
    <>
      <Swiper
        navigation={true}
        className="mySwiper"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <div className="slider-image">
            <Image
              src="/assets/SliderOne.jpg"
              alt="Slider Image"
              priority
              sizes="100vw"
              style={{
                width: "100%",
                height: "40%",
                objectFit: "cover",
              }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/SliderTwo.jpg"
            alt="Slider Image"
            priority
            sizes="100vw"
            style={{
              width: "100%",
              height: "40%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/SliderThree.jpg"
            alt="Slider Image"
            priority
            sizes="100vw"
            style={{
              width: "100%",
              height: "40%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/SliderFour.jpg"
            alt="Slider Image"
            priority
            sizes="100vw"
            style={{
              width: "100%",
              height: "40%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/SliderFive.jpg"
            alt="Slider Image"
            priority
            sizes="100vw"
            style={{
              width: "100%",
              height: "40%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
      </Swiper>
      <div className="carousel-gradient-shadow" />
    </>
  );
};

export default HomeSlider;
