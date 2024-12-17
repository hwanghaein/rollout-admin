"use client";

import { useEffect, useState } from "react";
import { CostIngredient, Ingredients } from "@/types/cost-ingredient";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import fireStore from "../../../../../firebase/firestore";
import { useRouter } from "next/navigation";
import {
  calculateTotalCost,
  calculateCostPerPiece,
} from "../../../../utils/calculate";

export default function CostIngredientDetailComponent({ menu }: { menu: CostIngredient }) {
  const router = useRouter();

  const [editingName, setEditingName] = useState(false); // "재료 이름" <수정중> 상태관리
  const [newName, setNewName] = useState(menu.name); // 수정된 새로운 "재료 이름"
  const [nameError, setNameError] = useState<string>(""); // "재료 이름" 에러 메시지 상태

  const [editingQuantity, setEditingQuantity] = useState(false); // "판매 개수" <수정중> 상태관리
  const [newQuantity, setNewQuantity] = useState(menu.salesQuantity); // 수정된 새로운 "판매 개수"
  const [quantityError, setQuantityError] = useState<string>(""); // "판매 개수" 에러 메시지 상태

  const [editingIngredients, setEditingIngredients] = useState(false); // "부재료 관련 표" <수정중> 상태관리
  const [ingredients, setIngredients] = useState(menu.ingredients);
  const [ingredientsError, setIngredientsError] = useState<string>(""); 

  const [updatedMenu, setUpdatedMenu] = useState(menu); // 업데이트된 재료 데이터 상태
  const [calculatedMenu, setCalculatedMenu] = useState<CostIngredient>(menu);

  // 계산 결과
  const recalculateMenu = () => {
    const totalCost = calculateTotalCost(ingredients);
    const costPerPiece = calculateCostPerPiece(totalCost, newQuantity);

    setCalculatedMenu({
      ...updatedMenu,
      ingredients,
      totalCost,
      costPerPiece,
    });
  };

  useEffect(() => {
    recalculateMenu();
  }, []);

  // "재료 이름" 수정 토글 관리
  const handleEditName = () => {
    setEditingName(true);
  };

  // "판매 개수" 수정 토글 관리
  const handleEditQuantity = () => {
    setEditingQuantity(true);
  };

  // "부재료" 수정 토글 관리
  const handleEditIngredients = () => {
    setEditingIngredients(!editingIngredients);
  };


  // "재료 이름" firebase 데이터 수정
  const handleSaveName = async () => {
    if (newName.trim() === "") {
      setNameError("이름을 입력하세요.");
      return;
    }

    try {
      const menuDoc = doc(fireStore, "costIngredients", menu.id);
      await updateDoc(menuDoc, { name: newName });

      const updatedDoc = await getDoc(menuDoc);
      if (updatedDoc.exists()) {
        setUpdatedMenu(updatedDoc.data() as CostIngredient);
      }

      setEditingName(false);
      setNameError("");
      alert("재료 이름이 저장되었습니다.");
    } catch (error) {
      console.error("Error updating name: ", error);
    }
  };


  // "판매 개수" firebase 데이터 수정
  const handleSaveQuantity = async () => {
    if (newQuantity < 0) {
      setQuantityError("마이너스 값은 입력할 수 없습니다.");
      return;
    }
    try {
      const menuDoc = doc(fireStore, "costIngredients", updatedMenu.id);
      await updateDoc(menuDoc, {
        salesQuantity: newQuantity, // 판매 개수 업데이트
      });

      const updatedDoc = await getDoc(menuDoc);
      if (updatedDoc.exists()) {
        setUpdatedMenu(updatedDoc.data() as CostIngredient); // 업데이트된 데이터 반영
        recalculateMenu();
      }

      setEditingQuantity(false); // 수정 모드 종료
      setQuantityError(""); // 에러 메시지 초기화
      alert("판매 개수가 저장되었습니다.");
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  // "부재료" firebase 데이터 수정
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
      const menuDoc = doc(fireStore, "costIngredients", menu.id);
      await updateDoc(menuDoc, {
        ingredients: ingredients, // 수정된 부재료 데이터 전체 반영
      });

      const updatedDoc = await getDoc(menuDoc);
      if (updatedDoc.exists()) {
        const updatedMenu = updatedDoc.data() as CostIngredient;
        setIngredients(updatedMenu.ingredients);
        recalculateMenu();
        setCalculatedMenu({
          ...updatedMenu,
          totalCost: calculateTotalCost(updatedMenu.ingredients),
          costPerPiece: calculateCostPerPiece(
            calculateTotalCost(updatedMenu.ingredients),
            updatedMenu.salesQuantity
          ),
  
          
        });
      }
      setEditingIngredients(false); // 수정 완료 후 모드 종료
      setIngredientsError("");
      alert("재료 정보가 저장되었습니다.");
    } catch (error) {
      console.error("Error updating ingredients: ", error);
    }
  };

  // "부재료" firebase 데이터 삭제
  const handleDeleteIngredient = async (index: number) => {
    const ingredientName = ingredients[index].name;
    if (!window.confirm(`${ingredientName} 재료를 정말 삭제하시겠습니까?`))
      return;

    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);

    try {
      const menuDoc = doc(fireStore, "costIngredients", menu.id);
      await updateDoc(menuDoc, { ingredients: updatedIngredients });
      alert(`${ingredientName}가 삭제되었습니다.`);
      recalculateMenu();
    } catch (error) {
      console.error("Error deleting ingredient: ", error);
      alert("재료 삭제 중 오류가 발생했습니다.");
    }
  };

  // 부재료명, 구매가, 구매량, 사용량을 수정하는 함수
  const handleIngredientChange = (
    index: number,
    field: keyof Ingredients,
    value: string | number
  ) => {
    const updatedIngredients = [...ingredients];

    if (field === "name" && typeof value === "string") {
      updatedIngredients[index][field] = value; 
    } else if (field !== "name" && typeof value === "number") {
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
    recalculateMenu();
  };

  const handleGoCost = () => {
    router.push("/cost?view=ingredient");
  };

  // "재료 전체"를 firebase 데이터 삭제
  const handleDeleteMenu = async () => {
    if (window.confirm("해당 재료를 정말 삭제하시겠습니까?")) {
      try {
        const menuDoc = doc(fireStore, "costIngredients", menu.id);
        await deleteDoc(menuDoc); // Firebase에서 재료전체 삭제
        alert("재료가 삭제되었습니다.");
        router.replace("/cost?view=ingredient");
      } catch (error) {
        console.error("Error deleting menu: ", error);
        alert("재료 삭제 중 오류가 발생했습니다.");
      }
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };





  // 마크업 부분
  return (
    <div className="md:max-w-[1100px] md:mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="text-dark2 text-xl">
          {editingName ? (
            <div className="flex items-center"> 
              <input
                type="text"
                className="w-40 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                placeholder={String(newName)}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                onClick={handleSaveName}
                className="px-2 py-1 ml-2 cursor-pointer rounded-md text-xs border bg-blue-500 text-white border-blue-500"
              >
                저장
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              {menu.name}
              <button
                onClick={handleEditName}
                className="px-2 py-1 ml-2 cursor-pointer rounded-md text-xs border bg-white  text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
              >
                수정
              </button>
            </div>
          )}
        </div>
        <button onClick={handleGoCost} className=" hover:bg-blue-500 hover:text-white hover:border-blue-500  px-2 py-1 cursor-pointer rounded-md text-xs border bg-white  text-black border-gray-300">
          목록으로 돌아가기
        </button>
      </div>
      {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
      <div className="mb-4 mt-5">
        <div className="grid grid-cols-2 gap-4 ">

          {/* 판매 개수 */}
          <div className="flex items-center">
            <div className="overflow-hidden border border-gray-300 min-h-[52px] min-w-[115px]">
              <div className="bg-gray-300 font-bold px-2 py-1 text-center">
                판매 개수
              </div>
              <div className="bg-white px-2 py-1">
                {editingQuantity ? (
                  <div className="text-center">
                    <input
                      type="number"
                      className="w-[75px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 "
                      placeholder={String(newQuantity)}
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
            <div className="">
              {quantityError && (
                <p className="text-red-500 text-sm ml-3">{quantityError}</p>
              )}
              <button
                className={`ml-2 px-2 py-1 cursor-pointer rounded-md text-xs mt-1 border  ${
                  editingQuantity
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white  text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
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
                        <input // 부재료명
                          type="text"
                          className="w-[88px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1"
                          placeholder={String(ingredient.name)}
                          onChange={(e) =>
                            handleIngredientChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                        <button
                          onClick={() => handleDeleteIngredient(index)}
                          className="px-1 items-center bg-gray-100 border-y border-r border-gray-300 text-gray-700"
                        >
                          X
                        </button>
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
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white  text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
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
      <div className="mb-8">
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
                {Number(calculatedMenu.totalCost).toFixed(0)}원
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                개당 원가
              </td>
              <td className="px-2 py-1 border-b text-center">
                {Number(calculatedMenu.costPerPiece).toFixed(0)}원
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex">
        <button
          onClick={handleDeleteMenu}
          className="ml-auto px-2 py-1 rounded-md cursor-pointer bg-red-600 border border-red-600  text-white text-xs"
        >
         재료 삭제하기
        </button>
      </div>
    </div>
  );
}
