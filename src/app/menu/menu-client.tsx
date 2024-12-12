"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { menuCategories } from "../../mock/menu-category";
import { MenuItem, Filters, FilterKeys } from "../../types/menu-item";

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

const MenuClient = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState<string>("");  
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
    const matchesCategory =
      filters.all || filters[item.category as FilterKeys];
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()); 

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="p-5 flex flex-col border-[1px] border-solid border-gray4 rounded-md mb-10">
        <div className="flex pb-4 border-b-[1px] border-gray-4 justify-between items-center">
          <div className="text-lg text-dark2">메뉴 검색</div>
          <div className="border-[1px] border-solid border-gray-4 rounded-md relative overflow-hidden">
            <input
              type="text"
              placeholder="검색"
              className="w-full pl-3 pr-10 py-2 text-sm rounded-md border-none focus:outline-none"
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
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 text-sm text-dark1 mt-5">
            {menuCategories.map(({ label, value }) => (
              <li key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters[value as FilterKeys]}
                  onChange={() => handleFilterChange(value as FilterKeys)}
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex justify-center items-center text-lg text-gray-500 font-semibold py-10">
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
                  src={Array.isArray(item.images) ? item.images[0] : item.images || "/images/default-image.png"}
                  alt={item.alt}
                  width={258}
                  height={270}
                  className="object-cover transform transition-transform duration-500 hover:scale-110 !important"
                  priority
                />
              </div>
              <span className="text-sm text-dark4">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuClient;
