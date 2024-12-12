"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { MenuItem } from "../../../../types/menu-item";

export default function MenuDetailClient({ menuItem }: { menuItem: MenuItem }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const formatCategory = (category: string) => {
    if (category === "sweetTea") {
      return "SWEET TEA";
    }
    return category.toUpperCase();
  };

  return (
    <>
      <span className="text-dark2 text-3xl mb-10">
        {formatCategory(menuItem.category)}
      </span>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:order-1 order-2">
          <div className="relative max-w-[450px] overflow-hidden bg-dark2">
            {Array.isArray(menuItem.images) && menuItem.images.length > 1 ? (
              <Swiper
                style={
                  {
                    "--swiper-navigation-color": "#D9D9D9",
                    "--swiper-pagination-color": "#fff",
                  } as React.CSSProperties
                }
                loop={true}
                spaceBetween={10}
                navigation={true}
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Pagination, Thumbs]}
                className="mySwiper2"
              >
                {menuItem.images.map((imageSrc, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={imageSrc}
                      alt={menuItem.alt || "Menu Item Image"}
                      width={450}
                      height={470}
                      className="object-cover"
                      priority
                       loading="eager"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              Array.isArray(menuItem.images) && menuItem.images.length > 0 && (
                <Image
                  src={menuItem.images[0]}
                  alt={menuItem.alt || "Menu Item Image"}
                  width={450}
                  height={470}
                  className="object-cover"
                  priority
                   loading="eager"
                />
              )
            )}

            {Array.isArray(menuItem.images) && menuItem.images.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="mySwiper mt-2"
              >
                {menuItem.images.map((imageSrc, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={imageSrc}
                      alt={menuItem.alt || "Menu Item Thumbnail"}
                      width={150}
                      height={60}
                      className="object-cover cursor-pointer"
                      priority
                       loading="eager"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full order-1 md:order-2">
          <div className="flex flex-col border-b-2 border-solid border-dark3 mb-7">
            <span className="text-2xl text-dark2 mb-2">{menuItem.name}</span>
            <span className="text-m text-gray2 mb-7">{menuItem.engName}</span>
          </div>
          <div className="flex flex-col border-b-[1px] border-solid border-gray4 mb-7">
            <div className="flex items-center mb-7">
              <span className="text-lg text-dark3 font-bold">
                • {menuItem.description}
              </span>
            </div>
            {menuItem.tip === "none" ? (
              <div className="h-14"></div>
            ) : (
              <div className="flex items-start">
                <span className="text-secondary font-bold text-lg mr-2 ">
                  Tip.
                </span>
                <span className="text-lg text-dark3 mb-7 inline-block">
                  {menuItem.tip}
                </span>
              </div>
            )}
          </div>
          {menuItem.temperature !== "none" && (
            <div className="border-b-[1px] border-solid border-gray4">
              <span className="text-lg text-dark4 inline-block mb-7">
                {menuItem.temperature === "both"
                  ? "ICE / HOT"
                  : menuItem.temperature === "ice"
                  ? "ONLY ICE"
                  : "ONLY HOT"}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
