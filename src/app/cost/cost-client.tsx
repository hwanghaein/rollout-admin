"use client";

import { useState, useEffect } from "react";
import { CostMenu } from "@/types/cost-menu";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import fireStore from "../../../firebase/firestore";
import {
  calculateTotalCost,
  calculateCostPerPiece,
  calculateMargin,
  calculateProfitPerPiece,
} from "./../../utils/calculate";
import { FaSearch } from "react-icons/fa";

interface CostClientProps {
  costMenuList: CostMenu[];
}

export default function CostClient({ costMenuList }: CostClientProps) {
  const router = useRouter();
  const [newMenuName, setNewMenuName] = useState(""); // 사용자 입력 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [calculatedMenus, setCalculatedMenus] = useState<CostMenu[]>([]); // 계산된 메뉴 리스트
  const [searchQuery, setSearchQuery] = useState(""); // 검색 쿼리 상태

  // 메뉴 데이터를 계산하여 상태에 저장
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(fireStore, "costMenuItems"),
      (snapshot) => {
        const fetchedMenus = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CostMenu[];

        const updatedMenus = fetchedMenus.map((menu) => {
          const totalCost = calculateTotalCost(menu.ingredients);
          const costPerPiece = calculateCostPerPiece(
            totalCost,
            menu.salesQuantity
          );
          const margin = calculateMargin(menu.pricePerPiece, costPerPiece);
          const profitPerPiece = calculateProfitPerPiece(
            menu.pricePerPiece,
            costPerPiece
          );

          return {
            ...menu,
            totalCost,
            costPerPiece,
            margin,
            profitPerPiece,
          };
        });

        const sortedMenus = updatedMenus.sort((a, b) => {
          return Number(a.id) - Number(b.id);
        });

        setCalculatedMenus(sortedMenus);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleClick = (id: string) => {
    router.push(`/cost/detail/${id}`);
  };

  // 메뉴 이름 입력 변경
  const handleMenuNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMenuName(e.target.value);
  };

  // 새로운 메뉴 추가
  const handleAddMenu = async () => {
    if (newMenuName.trim()) {
      const nextId = String(Number(costMenuList.length) + 1); // 새로운 메뉴의 ID
      const userDocRef = doc(fireStore, "costMenuItems", nextId);

      const newMenu: CostMenu = {
        id: nextId,
        name: newMenuName,
        pricePerPiece: 0,
        salesQuantity: 0,
        ingredients: [
          { name: "", purchasePrice: 0, purchaseQuantity: 0, usageQuantity: 0 },
          { name: "", purchasePrice: 0, purchaseQuantity: 0, usageQuantity: 0 },
        ],
        totalCost: 0,
        costPerPiece: 0,
        margin: 0,
        profitPerPiece: 0,
      };

      await setDoc(userDocRef, newMenu);

      router.push("/cost");
      setIsModalOpen(false);
      alert(`${newMenuName} 메뉴가 추가되었습니다.`);
      setNewMenuName("");
    }
  };

  // 검색어 상태 변경
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 검색어에 맞는 메뉴 필터링
  const filteredMenus = calculatedMenus.filter((menu) =>
    menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex mb-1">
        {/* 검색창 */}
        <div className="mb-2 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="메뉴 이름 검색"
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm "
          />
          <FaSearch className=" text-gray-500 text-2xl ml-1" />
        </div>

        {/* 메뉴 추가 버튼 */}
        <div className=" ml-auto">
          <button
            className="px-2 py-1 cursor-pointer bg-blue-500 text-white rounded text-sm border border-blue-500"
            onClick={() => setIsModalOpen(true)}
          >
            메뉴 추가
          </button>
        </div>
      </div>

      {/* 메뉴 추가 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg w-80">
            <h2 className="mb-4 text-md">새 메뉴 추가</h2>
            <input
              type="text"
              value={newMenuName}
              onChange={handleMenuNameChange}
              placeholder="메뉴 이름을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-sm"
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
                onClick={handleAddMenu}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메뉴 목록 */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-dark2">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-3 py-2 font-bold text-dark2 border-x border-gray-200">
                메뉴명
              </th>
              <th className="px-3 py-2 font-bold text-dark2 border-x border-gray-200">
                총 원가
              </th>
              <th className="px-3 py-2 font-bold text-dark2 border-x border-gray-200">
                판매가
              </th>
              <th className="px-3 py-2 font-bold text-dark2 border-x border-gray-200">
                마진율
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => handleClick(item.id)}
              >
                <td className="px-4 py-3 border-x border-gray-200 break-words max-w-[115px] hover:underline hover:text-blue-600">
                  {item.name}
                </td>
                <td className="px-3 py-2 border-x border-gray-200">
                  {item.totalCost === 0
                    ? "0원"
                    : `${item.totalCost.toFixed(2)}원`}
                </td>
                <td className="px-3 py-2 border-x border-gray-200">
                  {item.pricePerPiece}원
                </td>
                <td className="px-3 py-2 border-x border-gray-200">
                  {item.margin === 0 ? "0%" : `${item.margin.toFixed(2)}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 text-sm text-gray-600">
        총 {filteredMenus.length}개의 메뉴가 등록돼 있습니다.
      </div>
    </>
  );
}
