import React, { useState } from "react";
import { CostIngredient } from "@/types/cost-ingredient";
import { FaSearch } from "react-icons/fa";


export default function SearchModal({
  costIngredients,
  selectedNames,
  setSelectedNames,
  handleSaveAddedIngredients,
}: {
  costIngredients: CostIngredient[];
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
  handleSaveAddedIngredients: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어

  // 검색된 리스트 필터링
  const filteredIngredients = costIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (name: string) => {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

   // 선택 완료 버튼 핸들러
   const handleSubmit = () => {
    console.log("Selected ingredients:", selectedNames);
    handleSaveAddedIngredients(); // 선택 후 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white w-[360px] h-[430px] p-6 rounded-lg shadow-lg animate-fadeIn flex flex-col">
    {/* 상단 */}
    <div className="flex mb-8 justify-between items-center">
      <span className="text-[24px] text-dark2 ">재료 검색</span>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="ml-4 px-1 py-1 border border-gray-300 rounded-md text-[20px] w-[180px]"
      />
      <FaSearch className=" text-gray-500 text-lg ml-2" />
    </div>

    {/* 리스트 */}
    <div className="flex overflow-y-auto h-[260px] py-5 px-5 bg-gray-100  mb-6">
      <ul className="list-none p-0">
        {filteredIngredients.map((ingredient) => (
          <li key={ingredient.id} className=" text-[20px] mb-5">
            <label className="flex items-center">
              <input
                type="checkbox"
                value={ingredient.name}
                checked={selectedNames.includes(ingredient.name)}
                onChange={() => handleCheckboxChange(ingredient.name)}
                className="mr-2"
              />
              {ingredient.name}
            </label>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex justify-between">
      {/* 선택 완료 버튼 */}
      <div className="flex flex-col text-blue-600 gap-1">
      <span>* 체크된 항목들이 재료 목록에 반영됩니다.</span>
      <span>* 삭제를 하려면 체크를 해제하세요.</span>
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-3 ml-auto text-white rounded-lg bg-blue-500  text-[20px]"
      >
        저장하기
      </button>
    </div>
  </div>
</div>
  );
}
