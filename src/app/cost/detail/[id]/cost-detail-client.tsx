"use client";

import { useEffect, useState } from "react";
import { CostMenu, Ingredient } from "@/types/cost-menu";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import fireStore from "../../../../../firebase/firestore"; 
import { calculateTotalCost, calculateCostPerPiece, calculateMargin, calculateProfitPerPiece } from './../../../../utils/calculate'; 

export default function CostMenuDetail({ menu }: { menu: CostMenu }) {

  const [editingPrice, setEditingPrice] = useState(false); // "개당 판매가" <수정중> 상태관리
  const [newPrice, setNewPrice] = useState(menu.pricePerPiece); // 수정된 새로운 "개당 판매가"
  const [priceError, setPriceError] = useState<string>(""); // "개당 판매가" 에러 메시지 상태

  const [editingQuantity, setEditingQuantity] = useState(false); // "판매 개수" <수정중> 상태관리
  const [newQuantity, setNewQuantity] = useState(menu.salesQuantity); // 수정된 새로운 "판매 개수"
  const [quantityError, setQuantityError] = useState<string>(""); // "판매 개수" 에러 메시지 상태

  const [editingIngredients, setEditingIngredients] = useState(false); // "재료 관련 표" <수정중> 상태관리
  const [ingredients, setIngredients] = useState(menu.ingredients);
  const [ingredientsError, setIngredientsError] = useState<string>(""); // "개당 판매가" 에러 메시지 상태

  const [updatedMenu, setUpdatedMenu] = useState(menu); // 업데이트된 메뉴 데이터 상태
  const [calculatedMenu, setCalculatedMenu] = useState<CostMenu>(menu);

  useEffect(() => {
    // ingredients 변경 시 계산된 값 업데이트
    const totalCost = calculateTotalCost(ingredients);
    const costPerPiece = calculateCostPerPiece(totalCost, newQuantity);
    const margin = calculateMargin(newPrice, costPerPiece);
    const profitPerPiece = calculateProfitPerPiece(newPrice, costPerPiece);
  
    setCalculatedMenu({
      ...menu,
      ingredients,
      totalCost,
      costPerPiece,
      margin,
      profitPerPiece,
    });
  }, [ingredients]); 
  


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
    if (newPrice < 0) {
      setPriceError("마이너스 값은 입력할 수 없습니다.");
      return;
    }

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
      setPriceError(""); // 에러 메시지 초기화
      alert("저장되었습니다.")
    } catch (error) {
      console.error("Error updating price: ", error);
    }
  };

  // "판매 개수" firebase 데이터 수정
  const handleSaveQuantity = async () => {
    if (newQuantity < 0) {
      setQuantityError("마이너스 값은 입력할 수 없습니다.");
      return;
    }
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
      setQuantityError(""); // 에러 메시지 초기화
      alert("저장되었습니다.")
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  // "재료" firebase 데이터 수정
const handleSaveIngredients = async () => {
  for (const ingredient of ingredients) {
    if (
      ingredient.purchasePrice < 0 ||
      ingredient.purchaseQuantity < 0 ||
      ingredient.usageQuantity < 0
    ) {
      setIngredientsError("마이너스 값은 입력할 수 없습니다.");
      return;
    }
  }

  try {
    const menuDoc = doc(fireStore, "costMenuItems", menu.id);
    await updateDoc(menuDoc, {
      ingredients: ingredients, // 수정된 재료 데이터 전체 반영
    });

    const updatedDoc = await getDoc(menuDoc);
    if (updatedDoc.exists()) {
      const updatedMenu = updatedDoc.data() as CostMenu;
      setIngredients(updatedMenu.ingredients); // 상태 갱신
      setCalculatedMenu({
        ...updatedMenu,
        totalCost: calculateTotalCost(updatedMenu.ingredients),
        costPerPiece: calculateCostPerPiece(calculateTotalCost(updatedMenu.ingredients), updatedMenu.salesQuantity),
        margin: calculateMargin(updatedMenu.pricePerPiece, calculateCostPerPiece(calculateTotalCost(updatedMenu.ingredients), updatedMenu.salesQuantity)),
        profitPerPiece: calculateProfitPerPiece(updatedMenu.pricePerPiece, calculateCostPerPiece(calculateTotalCost(updatedMenu.ingredients), updatedMenu.salesQuantity)),
      });
    }
    setEditingIngredients(false); // 수정 완료 후 모드 종료
    setIngredientsError("");
    // alert("저장되었습니다.")
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

    if (field === "name" && typeof value === "string") {
      updatedIngredients[index][field] = value; // 재료명은 string
    } else if (field !== "name" && typeof value === "number") {
      updatedIngredients[index][field] = value; // 나머지 필드는 number
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

  const handleDeleteMenu = () => {
    if (window.confirm("해당 메뉴를 정말 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };
 

  return (
    <div className="md:max-w-[1100px] md:mx-auto">
      <span className="text-dark2 text-xl mb-4">{menu.name}</span>
      <div className="mb-4 mt-5">
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <div className="overflow-hidden border border-gray-300 min-h-[52px]">
              <div className="bg-gray-300 font-bold text-center px-2 py-1">
                개당 판매가
              </div>
              <div className="bg-white px-1 py-1">
                {editingPrice ? (
                  <div className="text-center">
                    <input
                      type="number"
                      className="w-[40px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 min-w-[90px]"
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
              {priceError && (
                <p className="text-red-500 text-sm ml-3">{priceError}</p>
              )}
              <button
                className={`ml-auto px-2 py-1 cursor-pointer rounded-md text-xs mt-1 border  ${
                  editingPrice
                    ? "bg-dark2 text-white border-dark2"
                    : "bg-white  text-black border-gray-300"
                }`}
                onClick={editingPrice ? handleSavePrice : handleEditPrice}
              >
                {editingPrice ? "저장" : "수정"}
              </button>
            </div>
          </div>
          <div>
            <div className="overflow-hidden border border-gray-300 min-h-[52px]">
              <div className="bg-gray-300 font-bold px-2 py-1 text-center">
                판매 개수
              </div>
              <div className="bg-white px-2 py-1">
                {editingQuantity ? (
                  <div className="text-center">
                    <input
                      type="number"
                      className="w-[40px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 "
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
              {quantityError && (
                <p className="text-red-500 text-sm ml-3">{quantityError}</p>
              )}
              <button
                   className={`ml-auto px-2 py-1 cursor-pointer rounded-md text-xs mt-1 border  ${
                    editingQuantity
                      ? "bg-dark2 text-white border-dark2"
                      : "bg-white  text-black border-gray-300"
                  }`}
                onClick={
                  editingQuantity ? handleSaveQuantity : handleEditQuantity
                }
              >
                {editingQuantity ? "저장" : "수정"}
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
                      <div className="flex items-center">
                      <input // 재료명
                        type="text"
                        className="w-[88px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                        placeholder={String(ingredient.name)}
                        onChange={(e) =>
                          handleIngredientChange(index, "name", e.target.value)
                        }
                      /> 
                      <button className="px-1 items-center bg-gray-100 border-y border-r border-gray-300 text-gray-700">X</button>
                      </div>
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
            {ingredientsError && (
              <p className="text-red-500 text-sm ml-3">{ingredientsError}</p>
            )}
  
              <button
              className={`ml-auto px-2 py-1 cursor-pointer rounded-md text-xs mt-1 border  ${
                editingIngredients
                 ? "bg-dark2 text-white border-dark2"
                 : "bg-white  text-black border-gray-300"
             }`}
              onClick={
                editingIngredients
                  ? handleSaveIngredients
                  : handleEditIngredients
              }
            >
              {editingIngredients ? "저장" : "수정"}
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
                {calculatedMenu.totalCost.toFixed(2)} 원
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                개당 원가
              </td>
              <td className="px-2 py-1 border-b text-center">
                {calculatedMenu.costPerPiece.toFixed(2)} 원
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                마진율
              </td>
              <td className="px-2 py-1 border-b text-center">
                {calculatedMenu.margin.toFixed(2)} %
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                개당 수익
              </td>
              <td className="px-2 py-1 border-b text-center">
                {calculatedMenu.profitPerPiece.toFixed(2)} 원
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex">
        <button onClick={handleDeleteMenu} className="ml-auto px-2 py-1 rounded-md cursor-pointer bg-red-600 border border-red-600  text-white text-xs">
          {menu.name} 삭제하기
        </button>
      </div>
    </div>
  );
}
