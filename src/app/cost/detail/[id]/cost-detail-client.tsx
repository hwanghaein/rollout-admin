"use client";

import { useState } from "react";
import { CostMenu } from "@/types/cost-menu";

export default function CostMenuDetail({ menu }: { menu: CostMenu }) {
  const [editingPrice, setEditingPrice] = useState(false);
  const [editingQuantity, setEditingQuantity] = useState(false);
  const [editingIngredients, setEditingIngredients] = useState(false);
  const [ingredients, setIngredients] = useState(menu.ingredients);
  const [showAddButton, setShowAddButton] = useState(false);

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

  const handleEditRow = () => {
    setShowAddButton(true);
    setEditingIngredients(true);
  };

  const toggleEditingPrice = () => {
    setEditingPrice(!editingPrice);
  };

  const toggleEditingQuantity = () => {
    setEditingQuantity(!editingQuantity);
  };

  const toggleEditingIngredients = () => {
    setEditingIngredients(!editingIngredients);
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
                      placeholder={String(menu.pricePerPiece)}
                    />
                    <span className="ml-1">원</span>
                  </div>
                ) : (
                  <div className="w-full text-center">
                    {menu.pricePerPiece}원
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <button
                className="ml-auto px-2 py-1 cursor-pointer rounded-md bg-white border border-gray-300 text-black text-xs"
                onClick={toggleEditingPrice}
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
                      placeholder={String(menu.salesQuantity)}
                    />
                    <span className="ml-1">개</span>
                  </div>
                ) : (
                  <div className="w-full text-center">
                    {menu.salesQuantity}개
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <button
                className="ml-auto px-2 py-1 cursor-pointer rounded-md bg-white border border-gray-300 text-black text-xs"
                onClick={toggleEditingQuantity}
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
                        onChange={(e) => {
                          const updatedIngredients = [...ingredients];
                          updatedIngredients[index].name = e.target.value;
                          setIngredients(updatedIngredients);
                        }}
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
                            onChange={(e) => {
                              const updatedIngredients = [...ingredients];
                              updatedIngredients[index].purchasePrice = Number(
                                e.target.value
                              );
                              setIngredients(updatedIngredients);
                            }}
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
                            onChange={(e) => {
                              const updatedIngredients = [...ingredients];
                              updatedIngredients[index].purchaseQuantity =
                                Number(e.target.value);
                              setIngredients(updatedIngredients);
                            }}
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
              onClick={toggleEditingIngredients}
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
