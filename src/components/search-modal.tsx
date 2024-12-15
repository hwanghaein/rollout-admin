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
      <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
        {/* 상단 */}
        <div className="flex mb-6 justify-between items-center">
          <span className="text-[16px] text-dark2 ">재료 검색</span>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-4 px-1 py-1 border border-gray-300 rounded-md"
          />
          <FaSearch className=" text-gray-500 text-lg ml-2" />
        </div>

        {/* 리스트 */}
        <ul className="list-none p-0">
          {filteredIngredients.map((ingredient) => (
            <li key={ingredient.id} className="mb-2">
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

        <div className="flex justify-between">
        {/* 선택 완료 버튼 */}
        <button
          onClick={handleSubmit}
          className="mt-6 mr-2 px-3 py-2 text-white rounded-lg bg-blue-500"
        >
          저장하기
        </button>

        {/* 모달 닫기 버튼 */}
        {/* <button
          onClick={closeModal}
          className="mt-6 px-3 py-2 bg-dark2 text-white rounded-lg "
        >
          닫기
        </button> */}
        </div>
      </div>
    </div>
  );
}
