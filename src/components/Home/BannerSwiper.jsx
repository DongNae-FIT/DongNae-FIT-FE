import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "@/components/Home/BannerSwiper.css";

const BannerSwiper = () => {
  const [bgColor, setBgColor] = useState("#DFF5FF");
  const canvasRef = useRef(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const imagePaths = [
    "/banner_home/banner_home_1.png",
    "/banner_home/banner_home_2.png",
    "/banner_home/banner_home_3.png",
    "/banner_home/banner_home_4.png",
    "/banner_home/banner_home_5.png",
    "/banner_home/banner_home_6.png",
    // 새 배너 추가 시 이 배열에 경로만 추가하면 됩니다.
  ];

  const updateBackgroundColor = (imgElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (imgElement && imgElement.complete) {
      const imgWidth = imgElement.naturalWidth;
      const imgHeight = imgElement.naturalHeight;

      // 이미지의 왼쪽 가운데 좌표 계산
      const leftCenterX = 0; // 왼쪽 가장자리
      const centerY = Math.floor(imgHeight / 2); // 중앙 Y 좌표

      // 왼쪽 중앙 픽셀 색상 추출
      context.drawImage(imgElement, leftCenterX, centerY, 1, 1, 0, 0, 1, 1);
      const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
      setBgColor(`rgb(${r}, ${g}, ${b})`);
    }
  };

  const handleSlideChange = (swiper) => {
    const imgElement = swiper.slides[swiper.activeIndex].querySelector("img");
    if (imgElement && !isFirstLoad) {
      updateBackgroundColor(imgElement);
    }
  };

  return (
    <div
      className="banner-swiper"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="1"
        height="1"
      />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        onSlideChange={(swiper) => {
          handleSlideChange(swiper);
          setIsFirstLoad(false);
        }}
      >
        {imagePaths.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              onLoad={(e) => {
                if (isFirstLoad) {
                  updateBackgroundColor(e.target);
                }
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;
