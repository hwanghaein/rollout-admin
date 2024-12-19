"use client";

import { useState} from "react";
import { CostMenu } from "@/types/cost-menu";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function RecipeComponent({
  costMenuList,
}: {
  costMenuList: CostMenu[];
}) {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(""); // 검색 쿼리 상태

 // 상세페이지로 이동
  const handleClick = (id: string) => {
    router.push(`/recipe/detail/${id}`);
  };

  // 검색어 상태 변경
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 검색어에 맞는 메뉴 필터링
  const filteredMenus = costMenuList.filter((menu) =>
    menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex mb-3">
        {/* 검색창 */}
        <div className="mb-2 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="메뉴 이름 검색"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:border-gray-400 dark:bg-gray-900 dark:text-gray-200 dark:outline-none"
          />
          <FaSearch className="text-gray-500 dark:text-gray-400 text-3xl ml-2" />
        </div>
      </div>

      
      {/* 메뉴 목록 */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-dark2 dark:text-gray-200">
          <thead className="bg-gray-300 dark:bg-gray-700">
            <tr>
              <th className=" min-w-[95px] px-3 py-2 font-bold text-dark2 border-x border-gray-200 dark:border-gray-600 text-center dark:text-gray-200">
                메뉴명
              </th>
           
            </tr>
          </thead>
          <tbody>
            {filteredMenus.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer dark:border-gray-600 dark:hover:bg-gray-800"
                onClick={() => handleClick(item.id)}
              >
                <td className="px-4 py-3 border-x border-gray-200 break-words max-w-[115px] hover:underline hover:text-blue-600 dark:border-gray-600">
                  {item.name}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 text-sm text-gray-600 dark:text-gray-400">
        총 {filteredMenus.length}개의 메뉴가 등록돼있습니다.
      </div>
    </>
  );
}
