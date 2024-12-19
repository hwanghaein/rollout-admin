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
import { doc, updateDoc } from "firebase/firestore";
import fireStore from "../../../../../firebase/firestore";

export default function MenuDetailClient({ menuItem }: { menuItem: MenuItem }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [editing, setEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(menuItem);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const menuItemRef = doc(fireStore, "menuItems", menuItem.id);
      await updateDoc(menuItemRef, updatedItem);
      alert("수정이 완료되었습니다.");
      setEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const formatCategory = (category: string) => {
    if (category === "sweetTea") {
      return "SWEET TEA";
    }
    return category.toUpperCase();
  };

  return (
    <>
      <div className="flex justify-center items-center mb-10">
        <span className="text-dark2 text-2xl dark:text-white">
        {editing ? (
  <select
    name="category"
    value={updatedItem.category}
    onChange={handleInputChange}
    className="border border-gray-300 rounded-md px-2 py-1"
  >
    <option value="signature">Signature</option>
    <option value="coffee">Coffee</option>
    <option value="drip">Drip</option>
    <option value="drink">Drink</option>
    <option value="sweetTea">Sweet Tea</option>
    <option value="tea">Tea</option>
    <option value="dessert">Dessert</option>
  </select>
) : (
  <span className="text-md text-dark4 inline-block mb-7 dark:text-gray-200">
    {formatCategory(updatedItem.category)}
  </span>
)}
        </span>
        <button
          className={`ml-auto px-2 py-1 cursor-pointer rounded-md text-sm border ${
            editing
              ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
              : "bg-white text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
          }`}
          onClick={editing ? handleSave : () => setEditing(true)}
        >
          {editing ? "완료" : "수정"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:order-1 order-2">
          <div className="relative max-w-[450px] overflow-hidden bg-dark2 dark:bg-gray-800">
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
              Array.isArray(menuItem.images) &&
              menuItem.images.length > 0 && (
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
          <div className="flex flex-col border-b-2 border-solid border-dark3 mb-7 dark:border-gray-600">
            <span className="text-lg text-dark2 mb-2 dark:text-white">
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={updatedItem.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-2 py-1"
                />
              ) : (
                updatedItem.name
              )}
            </span>
            <span className="text-md text-gray2 mb-7 dark:text-gray-200">
              {editing ? (
                <input
                  type="text"
                  name="engName"
                  value={updatedItem.engName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-2 py-1"
                />
              ) : (
                updatedItem.engName
              )}
            </span>
          </div>
          <div className="flex flex-col border-b-[1px] border-solid border-gray4 mb-7 dark:border-gray-600">
            <div className="flex items-center mb-7">
              <span className="text-md text-dark3 dark:text-gray-200">
                {editing ? (
                  <textarea
                    name="description"
                    value={updatedItem.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                  />
                ) : (
                  `• ${updatedItem.description}`
                )}
              </span>
            </div>
            {menuItem.tip === "none" ? (
              <div className="h-14"></div>
            ) : (
              <div className="flex items-start">
                <span className="text-secondary font-bold text-lg mr-2 ">
                  Tip.
                </span>
                <span className="text-md text-dark3 mb-7 inline-block dark:text-gray-200">
                  {editing ? (
                    <input
                      type="text"
                      name="tip"
                      value={updatedItem.tip}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                  ) : (
                    updatedItem.tip
                  )}
                </span>
              </div>
            )}
          </div>
          {editing ? (
            // 수정 모드 - Select 요소로 온도 선택
            <div className="border-b-[1px] border-solid border-gray4 dark:border-gray-600">
              <label
                htmlFor="temperature"
                className="text-md text-dark4 inline-block mb-2 dark:text-gray-200"
              >
                온도 선택:
              </label>
              <select
                id="temperature"
                name="temperature"
                value={updatedItem.temperature}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="both">Both</option>
                <option value="hot">Hot</option>
                <option value="ice">Ice</option>
                <option value="none">None</option>
              </select>
            </div>
          ) : (
            // 읽기 모드 - 텍스트로 온도 표시
            menuItem.temperature !== "none" && (
              <div className="border-b-[1px] border-solid border-gray4 dark:border-gray-600">
                <span className="text-md text-dark4 inline-block mb-7 dark:text-gray-200">
                  {menuItem.temperature === "both"
                    ? "ICE / HOT"
                    : menuItem.temperature === "ice"
                    ? "ONLY ICE"
                    : "ONLY HOT"}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
