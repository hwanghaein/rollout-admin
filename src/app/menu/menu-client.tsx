"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { menuCategories } from "../../mock/menu-category";
import { MenuItem, Filters, FilterKeys } from "../../types/menu-item";
import { FaPlus } from "react-icons/fa";
import fireStore from "../../../firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const initialFilters: Filters = {
  all: true,
  signature: false,
  coffee: false,
  drip: false,
  drink: false,
  sweetTea: false,
  tea: false,
  dessert: false,
};

const MenuClient = ({ menuItems: initialMenuItems }: { menuItems: MenuItem[] }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems); // 메뉴 상태 추가
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [newMenu, setNewMenu] = useState({
    name: "",
    category: "signature",
    engName: "",
    description: "",
    tip: "",
    temperature: "both",
  });

  const router = useRouter();

  const handleFilterChange = (category: FilterKeys) => {
    setFilters((prevState) => {
      if (category === "all") {
        return initialFilters;
      } else {
        return {
          ...prevState,
          all: false,
          [category]: !prevState[category],
        };
      }
    });
  };

  const handleMenuClick = (id: string) => {
    router.push(`/menu/detail/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = filters.all || filters[item.category as FilterKeys];
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddMenu = async () => {
    const { name, category, engName, description, tip, temperature } = newMenu;

    if (
      !name ||
      !category ||
      !engName ||
      !description ||
      !tip ||
      !temperature
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const nextId = String(menuItems.length + 1);
    const newMenuItem: MenuItem = {
      id: nextId,
      images: ["/images/menu/menu_default.png"],
      alt: name,
      name,
      category,
      engName,
      description,
      tip,
      temperature: temperature as MenuItem["temperature"],
    };

    try {
      // Firestore에 데이터 추가
      await setDoc(doc(fireStore, "menuItems", nextId), newMenuItem);
      // 상태 업데이트
      setMenuItems((prevMenuItems) => [...prevMenuItems, newMenuItem]);
      alert("새 메뉴가 추가되었습니다.");
      setNewMenu({
        name: "",
        category: "signature",
        engName: "",
        description: "",
        tip: "",
        temperature: "both",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("메뉴 추가 중 오류 발생:", error);
      alert("메뉴 추가에 실패했습니다.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewMenu((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-5 flex flex-col border-[1px] border-solid border-gray-300 rounded-md mb-10 dark:border-gray-700">
        <div className="flex pb-4 border-b-[1px] border-gray-300 justify-between items-center dark:border-gray-700">
          <div className="text-md text-gray-800 dark:text-white">메뉴 검색</div>
          <div className="border-[1px] border-solid border-gray-300 rounded-md relative overflow-hidden dark:border-gray-700">
            <input
              type="text"
              placeholder="검색"
              className="w-full pl-3 pr-10 py-2 text-sm rounded-md border-none focus:outline-none dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={handleSearchChange}
              maxLength={13}
            />
            <button className="absolute top-0 right-0 m-1">
              <Image
                src="/images/icon/search.png"
                alt="검색"
                width={25}
                height={25}
                className="object-contain"
                priority
              />
            </button>
          </div>
        </div>
        <div>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 text-sm text-gray-800 dark:text-gray-200 mt-5">
            {menuCategories.map(({ label, value }) => (
              <li key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters[value as FilterKeys]}
                  onChange={() => handleFilterChange(value as FilterKeys)}
                  className="dark:bg-gray-600"
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex justify-center items-center text-lg text-gray-500 font-semibold py-10 dark:text-gray-400">
          검색 결과가 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 flex-grow">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => handleMenuClick(item.id)}
            >
              <div className="overflow-hidden">
                <Image
                  src={
                    Array.isArray(item.images)
                      ? item.images[0]
                      : item.images || "/public/images/menu_default.png/"
                  }
                  alt={item.alt}
                  width={258}
                  height={270}
                  className="object-cover transform transition-transform duration-500 hover:scale-110"
                  priority
                />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
          <div
            className="w-full aspect-[258/270] bg-gray-300 flex justify-center items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="text-gray-500 text-5xl" />
          </div>

          {/* 새로운 메뉴 추가 모달창 */}
{isModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center dark:bg-gray-800 dark:bg-opacity-80">
    <div className="bg-white p-6 rounded-md shadow-lg w-80 dark:bg-gray-900 dark:text-gray-200">
      <div className="text-lg font-semibold mb-5">새로운 메뉴 추가</div>
      <div className="flex flex-col gap-3">
        {/* 메뉴 이름 */}
        <div>
          <span className="mr-2">메뉴 이름</span>
          <input
            type="text"
            placeholder="메뉴 이름"
            value={newMenu.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 outline-none"
          />
        </div>
        {/* 카테고리 */}
        <div>
          <span className="mr-3">카테고리</span>
          <select
            value={newMenu.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="signature">Signature</option>
            <option value="coffee">Coffee</option>
            <option value="drip">Drip</option>
            <option value="drink">Drink</option>
            <option value="sweetTea">Sweet Tea</option>
            <option value="tea">Tea</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        {/* 영문 이름 */}
        <div>
          <span className="mr-2">영문 이름</span>
          <input
            type="text"
            placeholder="영문 이름"
            value={newMenu.engName}
            onChange={(e) => handleInputChange("engName", e.target.value)}
            className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 outline-none"
          />
        </div>
        {/* 메뉴 설명 */}
        <div className="flex">
          <span className="mr-2">메뉴 설명</span>
          <textarea
            placeholder="메뉴 설명"
            value={newMenu.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 outline-none"
          />
        </div>
        {/* Tip */}
        <div className="flex">
          <span className="mr-5">메뉴 팁</span>
          <textarea
            placeholder="Tip"
            value={newMenu.tip}
            onChange={(e) => handleInputChange("tip", e.target.value)}
            className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 outline-none"
          />
        </div>
        {/* 온도 */}
        <div>
          <span className="mr-10">온도</span>
          <select
            value={newMenu.temperature}
            onChange={(e) => handleInputChange("temperature", e.target.value)}
            className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="both">Both</option>
            <option value="hot">Hot</option>
            <option value="ice">Ice</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
          onClick={() => setIsModalOpen(false)}
        >
          취소
        </button>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={handleAddMenu}
        >
          추가
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default MenuClient;
