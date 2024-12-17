"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import fireStore from "../../../firebase/firestore";
import { CostIngredient } from "@/types/cost-ingredient";
import {
  calculateTotalCost,
  calculateCostPerPiece,
} from "./../../utils/calculate";
import { FaSearch } from "react-icons/fa";

interface CostIngredientProps {
  costIngredients: CostIngredient[];
}

export default function IngredientComponent({ costIngredients }: CostIngredientProps) {
  const router = useRouter();
  const [newIngredientName, setNewIngredientName] = useState(""); // 사용자 입력 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [calculatedMenus, setCalculatedMenus] = useState<CostIngredient[]>([]); // 계산된 재료 리스트
  const [searchQuery, setSearchQuery] = useState(""); // 검색 쿼리 상태

  // 재료 데이터를 계산하여 상태에 저장
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(fireStore, "costIngredients"),
      (snapshot) => {
        const fetchedIngredients = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CostIngredient[];

        const updatedIngredients = fetchedIngredients.map((ingredient) => {
          const totalCost = calculateTotalCost(ingredient.ingredients);
          const costPerPiece = calculateCostPerPiece(
            totalCost,
            ingredient.salesQuantity
          );

          return {
            ...ingredient,
            totalCost,
            costPerPiece,
          };
        });

        const sortedIngredients = updatedIngredients.sort((a, b) => {
          return Number(a.id) - Number(b.id);
        });

        setCalculatedMenus(sortedIngredients);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleClick = (id: string) => {
    router.push(`/cost/ingredient-detail/${id}?view=ingredient`);
  };

  // 재료 이름 입력 변경
  const handleIngredientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredientName(e.target.value);
  };

  // 새로운 재료 추가
  const handleAddIngredient = async () => {
    if (newIngredientName.trim()) {
      const nextId = String(Number(costIngredients.length) + 1); // 새로운 재료의 ID
      const userDocRef = doc(fireStore, "costIngredients", nextId);

      const newIngredient: CostIngredient = {
        id: nextId,
        name: newIngredientName,
        salesQuantity: 0,
        ingredients: [
          { name: "", purchasePrice: 0, purchaseQuantity: 0, usageQuantity: 0 },
          { name: "", purchasePrice: 0, purchaseQuantity: 0, usageQuantity: 0 },
        ],
        costPerPiece: 0,
      };

      await setDoc(userDocRef, newIngredient);

      setIsModalOpen(false);
      alert(`${newIngredientName} 재료가 추가되었습니다.`);
      router.push("/cost?view=ingredient");
      setNewIngredientName("");
    }
  };

  // 검색어 상태 변경
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 검색어에 맞는 재료 필터링
  const filteredIngredients = calculatedMenus.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="재료 이름 검색"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm "
          />
          <FaSearch className=" text-gray-500 text-3xl ml-2" />
        </div>

        {/* 재료 추가 버튼 */}
        <div className=" ml-auto">
          <button
            className="px-3 py-2 cursor-pointer bg-blue-500 text-white rounded text-sm border border-blue-500"
            onClick={() => setIsModalOpen(true)}
          >
            재료 추가
          </button>
        </div>
      </div>

      {/* 재료 추가 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg w-80">
            <h2 className="mb-4 text-md">새 재료 추가</h2>
            <input
              type="text"
              value={newIngredientName}
              onChange={handleIngredientNameChange}
              placeholder="재료 이름을 입력하세요"
              className="w-full px-2 py-2 border border-gray-300 rounded mb-4 text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-2 py-1 bg-gray-300 rounded text-sm"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                onClick={handleAddIngredient}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 재료 목록 */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-dark2">
          <thead className="bg-gray-300">
            <tr>
              <th className=" min-w-[95px] px-3 py-2 font-bold text-dark2 border-x border-gray-200 text-center">
                재료명
              </th>
              <th className="min-w-[75px] px-3 py-2 font-bold text-dark2 border-x border-gray-200 text-center">
                개당 원가
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => handleClick(item.id)}
              >
                <td className="px-4 py-3 border-x border-gray-200 break-words max-w-[115px] hover:underline hover:text-blue-600">
                  {item.name}
                </td>
                <td className="px-3 py-2 border-x border-gray-200">
                  {item.costPerPiece === 0
                    ? "0원"
                    : `${Number(item.costPerPiece).toFixed(0)}원`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 text-sm text-gray-600">
        총 {filteredIngredients.length}개의 재료가 등록돼있습니다.
      </div>
    </>
  );
}
