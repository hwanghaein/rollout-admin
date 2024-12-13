"use client";

import { useState } from "react";
import { CostMenu } from "@/types/cost-menu";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import fireStore from "../../../../../firebase/firestore"; // Firebase Firestore 경로

export default function CostMenuDetail({ menu }: { menu: CostMenu }) {
  const [editingPrice, setEditingPrice] = useState(false); // "개당 판매가" <수정중> 상태관리
  const [newPrice, setNewPrice] = useState(menu.pricePerPiece); // 수정된 새로운 "개당 판매가"

  const [editingQuantity, setEditingQuantity] = useState(false); // "판매 개수" <수정중> 상태관리
  const [newQuantity, setNewQuantity] = useState(menu.salesQuantity); // 수정된 새로운 "판매 개수"

  const [editingIngredients, setEditingIngredients] = useState(false); // "재료 관련 표" <수정중> 상태관리
  const [ingredients, setIngredients] = useState(menu.ingredients);

  const [updatedMenu, setUpdatedMenu] = useState(menu); // 업데이트된 메뉴 데이터 상태

  interface Ingredient {
    name: string;
    purchasePrice: number;
    purchaseQuantity: number;
    usageQuantity: number;
  }

  // "개당 판매가" 수정 토글 관리
  const handleEditPrice = () => {
    setEditingPrice(true);
  };

  // "판매 개수" 수정 토글 관리
  const handleEditQuantity = () => {
    setEditingQuantity(true);
  };

  // "재료" 수정 토글 관리
  const handleEditIngredients = () => {
    setEditingIngredients(!editingIngredients);
  };

  // "개당 판매가" firebase 데이터 수정
  const handleSavePrice = async () => {
    try {
      const menuDoc = doc(fireStore, "costMenuItems", updatedMenu.id);
      await updateDoc(menuDoc, {
        pricePerPiece: newPrice,
      });

      const updatedDoc = await getDoc(menuDoc);
      if (updatedDoc.exists()) {
        setUpdatedMenu(updatedDoc.data() as CostMenu);
      }
      setEditingPrice(false);
    } catch (error) {
      console.error("Error updating price: ", error);
    }
  };

  // "판매 개수" firebase 데이터 수정
  const handleSaveQuantity = async () => {
    try {
      const menuDoc = doc(fireStore, "costMenuItems", updatedMenu.id); // 메뉴 문서 참조
      await updateDoc(menuDoc, {
        salesQuantity: newQuantity, // 판매 개수 업데이트
      });

      const updatedDoc = await getDoc(menuDoc);
      if (updatedDoc.exists()) {
        setUpdatedMenu(updatedDoc.data() as CostMenu); // 업데이트된 데이터 반영
      }

      setEditingQuantity(false); // 수정 모드 종료
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  // "재료" firebase 데이터 수정
  const handleSaveIngredients = async () => {
    try {
      const menuDoc = doc(fireStore, "costMenuItems", menu.id);
      await updateDoc(menuDoc, {
        ingredients: ingredients, // 수정된 재료 데이터 전체 반영
      });

      const updatedDoc = await getDoc(menuDoc);
      if (updatedDoc.exists()) {
        // Firestore에서 가져온 최신 데이터로 업데이트
        const updatedMenu = updatedDoc.data() as CostMenu;
        setIngredients(updatedMenu.ingredients); // 상태 갱신
      }
      setEditingIngredients(false); // 수정 완료 후 모드 종료
    } catch (error) {
      console.error("Error updating ingredients: ", error);
    }
  };

  // 재료명, 구매가, 구매량, 사용량을 수정하는 함수
  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const updatedIngredients = [...ingredients];

    if (typeof value === "string" && field === "name") {
      updatedIngredients[index][field] = value;
    } else if (typeof value === "number") {
      updatedIngredients[index][field] = value;
    }

    setIngredients(updatedIngredients);
  };

  const handleAddRow = () => {
    setIngredients([
      ...ingredients,
      {
        name: "",
        purchasePrice: 0,
        purchaseQuantity: 0,
        usageQuantity: 0,
      },
    ]);
  };

  return (
    <div>
      <span className="text-dark2 text-xl mb-4">{menu.name}</span>
      <div className="mb-4 mt-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="overflow-hidden border border-gray-300 mb-1 min-h-[52px]">
              <div className="bg-gray-300 font-bold text-center px-2 py-1">
                개당 판매가
              </div>
              <div className="bg-white px-1 py-1">
                {editingPrice ? (
                  <div className="text-center">
                    <input
                      type="number"
                      className="w-[40px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                    />
                    <span className="ml-1">원</span>
                  </div>
                ) : (
                  <div className="w-full text-center">
                    {updatedMenu.pricePerPiece}원
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <button
                className="ml-auto px-2 py-1 cursor-pointer rounded-md bg-white border border-gray-300 text-black text-xs"
                onClick={editingPrice ? handleSavePrice : handleEditPrice}
              >
                {editingPrice ? "완료" : "수정"}
              </button>
            </div>
          </div>
          <div>
            <div className="overflow-hidden border border-gray-300 mb-1 min-h-[52px]">
              <div className="bg-gray-300 font-bold px-2 py-1 text-center">
                판매 개수
              </div>
              <div className="bg-white px-2 py-1">
                {editingQuantity ? (
                  <div className="text-center">
                    <input
                      type="number"
                      className="w-[40px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                    />
                    <span className="ml-1">개</span>
                  </div>
                ) : (
                  <div className="w-full text-center">
                    {updatedMenu.salesQuantity}개
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <button
                className="ml-auto px-2 py-1 cursor-pointer rounded-md bg-white border border-gray-300 text-black text-xs"
                onClick={
                  editingQuantity ? handleSaveQuantity : handleEditQuantity
                }
              >
                {editingQuantity ? "완료" : "수정"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div>
          <table className="min-w-full rounded-lg border border-gray-300">
            <thead className="bg-gray-300">
              <tr>
                <th
                  className="px-1 py-1 border-r border-b text-center"
                  style={{ minWidth: "90px" }}
                >
                  재료명
                </th>
                <th
                  className="px-1 py-1 border-r border-b text-center"
                  style={{ minWidth: "60px" }}
                >
                  구매가
                </th>
                <th
                  className="px-1 py-1 border-r border-b text-center"
                  style={{ minWidth: "60px" }}
                >
                  구매량
                </th>
                <th
                  className="px-1 py-1 border-b text-center"
                  style={{ minWidth: "60px" }}
                >
                  사용량
                </th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td
                    className="px-1 py-1 border-r border-b text-center"
                    style={{ minWidth: "90px" }}
                  >
                    {editingIngredients ? (
                      <input // 재료명
                        type="text"
                        className="w-[105px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                        placeholder={String(ingredient.name)}
                        onChange={(e) =>
                          handleIngredientChange(index, "name", e.target.value)
                        }
                      />
                    ) : (
                      <div>{ingredient.name || "-"}</div>
                    )}
                  </td>
                  <td
                    className="px-1 py-1 border-r border-b text-center"
                    style={{ minWidth: "60px" }}
                  >
                    <div className="flex items-center justify-center">
                      {editingIngredients ? (
                        <>
                          <input // 구매가
                            type="number"
                            className="w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                            placeholder={String(ingredient.purchasePrice)}
                            onChange={(e) =>
                              handleIngredientChange(
                                index,
                                "purchasePrice",
                                Number(e.target.value)
                              )
                            }
                          />
                          <span className="ml-1">원</span>
                        </>
                      ) : (
                        <div>{ingredient.purchasePrice}원</div>
                      )}
                    </div>
                  </td>
                  <td
                    className="px-1 py-1 border-r border-b text-center"
                    style={{ minWidth: "60px" }}
                  >
                    <div className="flex items-center justify-center">
                      {editingIngredients ? (
                        <>
                          <input // 구매량
                            type="number"
                            className="w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                            placeholder={String(ingredient.purchaseQuantity)}
                            onChange={(e) =>
                              handleIngredientChange(
                                index,
                                "purchaseQuantity",
                                Number(e.target.value)
                              )
                            }
                          />
                          <span className="ml-1">g</span>
                        </>
                      ) : (
                        <div>{ingredient.purchaseQuantity}g</div>
                      )}
                    </div>
                  </td>
                  <td
                    className="px-1 py-1 border-b text-center"
                    style={{ minWidth: "60px" }}
                  >
                    <div className="flex items-center justify-center">
                      {editingIngredients ? (
                        <>
                          <input // 사용량
                            type="number"
                            className="w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                            placeholder={String(ingredient.usageQuantity)}
                            onChange={(e) => {
                              const updatedIngredients = [...ingredients];
                              updatedIngredients[index].usageQuantity = Number(
                                e.target.value
                              );
                              setIngredients(updatedIngredients);
                            }}
                          />
                          <span className="ml-1">g</span>
                        </>
                      ) : (
                        <div>{ingredient.usageQuantity}g</div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingIngredients && (
            <div className="">
              <button
                className="w-full px-2 py-1 text-md bg-[#e5e7eb] text-dark2 font-bold"
                onClick={handleAddRow}
              >
                +
              </button>
            </div>
          )}
          <div className="flex">
            <button
              className="ml-auto px-2 py-1 cursor-pointer rounded-md bg-white border border-gray-300 text-black text-xs mt-1"
              onClick={editingIngredients ? handleSaveIngredients : handleEditIngredients}
            >
              {editingIngredients ? "완료" : "수정"}
            </button>
          </div>
        </div>
      </div>

      {/* 계산 결과  */}
      <div className="mb-6">
        <table className="min-w-full rounded-lg border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-2 py-1 border-r border-b text-center">항목</th>
              <th className="px-2 py-1 border-b text-center">값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                총 원가
              </td>
              <td className="px-2 py-1 border-b text-center">
                {menu.totalCost}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                개당 원가
              </td>
              <td className="px-2 py-1 border-b text-center">
                {menu.costPerPiece}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                마진율
              </td>
              <td className="px-2 py-1 border-b text-center">{menu.margin}</td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                개당 수익
              </td>
              <td className="px-2 py-1 border-b text-center">
                {menu.profitPerPiece}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex">
        <button className="ml-auto px-2 py-1 rounded-md cursor-pointer bg-gray-500 border border-gray-500 text-white text-xs">
          메뉴 삭제
        </button>
      </div>
    </div>
  );
}
