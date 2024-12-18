import React, { useState } from "react";
import { CostIngredient } from "@/types/cost-ingredient";
import { FaSearch } from "react-icons/fa";

export default function SearchModal({
  costIngredients,
  selectedNames,
  setSelectedNames,
  handleSaveAddedIngredients,
  setIsModalOpen,
}: {
  costIngredients: CostIngredient[];
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
  handleSaveAddedIngredients: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 배경 클릭 시 모달 닫기
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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
    handleSaveAddedIngredients();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white dark:bg-gray-800 w-[360px] h-[500px] p-6 rounded-lg shadow-lg animate-fadeIn flex flex-col relative">
        <div className="flex justify-between items-center">
          <span className="text-xl text-dark2 dark:text-white">재료 검색</span>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-4 px-3 py-1 border border-gray-300 dark:border-gray-500 rounded text-sm w-[180px] dark:bg-gray-700 dark:text-white dark:outline-none"
          />
          <FaSearch className="text-gray-500 dark:text-white text-lg ml-2" />
        </div>

        {/* 리스트 */}
        <div className="flex flex-col overflow-y-auto h-[300px] mt-4">
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            {filteredIngredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="text-sm p-2 bg-gray-100 dark:bg-gray-700 rounded"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={ingredient.name}
                    checked={selectedNames.includes(ingredient.name)}
                    onChange={() => handleCheckboxChange(ingredient.name)}
                    className="mr-2"
                  />
                  <span className="dark:text-white">{ingredient.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col text-blue-600 dark:text-gray-200 gap-1 mt-5">
          <span>* 체크된 항목들이 재료 목록에 반영됩니다.</span>
          <span>* 삭제를 하려면 체크를 해제하세요.</span>
        </div>

        <div className="flex mt-4 gap-5">
          <button
            onClick={handleSubmit}
            className="px-3 py-2 ml-auto text-white rounded-lg bg-blue-500 text-sm dark:bg-blue-800"
          >
            저장하기
          </button>
          <button
            onClick={closeModal}
            className="px-3 py-2 text-black dark:text-white rounded-lg bg-gray-300 dark:bg-gray-600 text-sm"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
