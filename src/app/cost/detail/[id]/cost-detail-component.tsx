"use client";

import { useEffect, useState } from "react";
import { CostMenu, Ingredient } from "@/types/cost-menu";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import fireStore from "../../../../../firebase/firestore";
import { useRouter } from "next/navigation";
import {
  calculateTotalCost,
  calculateCostPerPiece,
  calculateMargin,
  calculateProfitPerPiece,
} from "../../../../utils/calculate";
import SearchModal from "@/components/search-modal";
import { CostIngredient } from "@/types/cost-ingredient";

export default function CostMenuDetail({
  menu,
  costIngredients,
}: {
  menu: CostMenu;
  costIngredients: CostIngredient[];
}) {
  const router = useRouter();

  const [editingName, setEditingName] = useState(false); // "메뉴 이름" <수정중> 상태관리
  const [newName, setNewName] = useState(menu.name); // 수정된 새로운 "메뉴 이름"
  const [nameError, setNameError] = useState<string>(""); // "메뉴 이름" 에러 메시지 상태

  const [editingPrice, setEditingPrice] = useState(false); // "개당 판매가" <수정중> 상태관리
  const [newPrice, setNewPrice] = useState(menu.pricePerPiece); // 수정된 새로운 "개당 판매가"
  const [priceError, setPriceError] = useState<string>(""); // "개당 판매가" 에러 메시지 상태

  const [editingQuantity, setEditingQuantity] = useState(false); // "판매 개수" <수정중> 상태관리
  const [newQuantity, setNewQuantity] = useState(menu.salesQuantity); // 수정된 새로운 "판매 개수"
  const [quantityError, setQuantityError] = useState<string>(""); // "판매 개수" 에러 메시지 상태

  const [editingIngredients, setEditingIngredients] = useState(false); // "재료 관련 표" <수정중> 상태관리
  const [ingredients, setIngredients] = useState(menu.ingredients);
  const [ingredientsError, setIngredientsError] = useState<string>("");

  const [updatedMenu, setUpdatedMenu] = useState(menu); // 업데이트된 메뉴 데이터 상태
  const [calculatedMenu, setCalculatedMenu] = useState<CostMenu>(menu);

  const [selectedNames, setSelectedNames] = useState<string[]>([]); // 모달창에서 선택된 재료 이름들

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModal = () => {
    setSelectedNames(updatedMenu.addedIngredients || []);
    setIsModalOpen(true);
  };

  // 계산 결과
  const recalculateMenu = () => {
    const totalCost = calculateTotalCost(ingredients);
    const costPerPiece = calculateCostPerPiece(totalCost, newQuantity);
    const margin = calculateMargin(newPrice, costPerPiece);
    const profitPerPiece = calculateProfitPerPiece(newPrice, costPerPiece);

    setCalculatedMenu({
      ...updatedMenu,
      ingredients,
      totalCost,
      costPerPiece,
      margin,
      profitPerPiece,
    });
  };

  useEffect(() => {
    recalculateMenu();
  }, []);

  // "메뉴 이름" 수정 토글 관리
  const handleEditName = () => {
    setEditingName(true);
  };

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

  // 모달 닫기 및 배열 저장
  const handleSaveAddedIngredients = async () => {
    try {
      const menuDoc = doc(fireStore, "costMenuItems", menu.id);
      await updateDoc(menuDoc, { addedIngredients: selectedNames });

      const updatedDoc = await getDoc(menuDoc);
      if (updatedDoc.exists()) {
        setUpdatedMenu(updatedDoc.data() as CostMenu);
      }

      setIsModalOpen(false);
      alert("재료가 저장되었습니다.");
    } catch (error) {
      console.error("Error updating name: ", error);
    }
  };

  // "메뉴 이름" firebase 데이터 수정
  const handleSaveName = async () => {
    if (newName.trim() === "") {
      setNameError("이름을 입력하세요.");
      return;
    }

    try {
      const menuDoc = doc(fireStore, "costMenuItems", menu.id);
      await updateDoc(menuDoc, { name: newName });

      const updatedDoc = await getDoc(menuDoc);
      if (updatedDoc.exists()) {
        setUpdatedMenu(updatedDoc.data() as CostMenu);
      }

      setEditingName(false);
      setNameError("");
      alert("메뉴 이름이 저장되었습니다.");
    } catch (error) {
      console.error("Error updating name: ", error);
    }
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
        recalculateMenu();
      }

      setEditingPrice(false);
      setPriceError(""); // 에러 메시지 초기화
      alert("개당 판매가가 저장되었습니다.");
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
        recalculateMenu();
      }

      setEditingQuantity(false); // 수정 모드 종료
      setQuantityError(""); // 에러 메시지 초기화
      alert("판매 개수가 저장되었습니다.");
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
        recalculateMenu();
        setCalculatedMenu({
          ...updatedMenu,
          totalCost: calculateTotalCost(updatedMenu.ingredients),
          costPerPiece: calculateCostPerPiece(
            calculateTotalCost(updatedMenu.ingredients),
            updatedMenu.salesQuantity
          ),
          margin: calculateMargin(
            updatedMenu.pricePerPiece,
            calculateCostPerPiece(
              calculateTotalCost(updatedMenu.ingredients),
              updatedMenu.salesQuantity
            )
          ),
          profitPerPiece: calculateProfitPerPiece(
            updatedMenu.pricePerPiece,
            calculateCostPerPiece(
              calculateTotalCost(updatedMenu.ingredients),
              updatedMenu.salesQuantity
            )
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

  // "재료" firebase 데이터 삭제
  const handleDeleteIngredient = async (index: number) => {
    const ingredientName = ingredients[index].name;
    if (!window.confirm(`${ingredientName} 재료를 정말 삭제하시겠습니까?`))
      return;

    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);

    try {
      const menuDoc = doc(fireStore, "costMenuItems", menu.id);
      await updateDoc(menuDoc, { ingredients: updatedIngredients });
      alert(`${ingredientName}가 삭제되었습니다.`);
      recalculateMenu();
    } catch (error) {
      console.error("Error deleting ingredient: ", error);
      alert("재료 삭제 중 오류가 발생했습니다.");
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
    recalculateMenu();
  };

  // "메뉴 전체"를 firebase 데이터 삭제
  const handleDeleteMenu = async () => {
    if (window.confirm("해당 메뉴를 정말 삭제하시겠습니까?")) {
      try {
        const menuDoc = doc(fireStore, "costMenuItems", menu.id);
        await deleteDoc(menuDoc); // Firebase에서 메뉴 삭제
        alert("메뉴가 삭제되었습니다.");
        router.push("/cost");
      } catch (error) {
        console.error("Error deleting menu: ", error);
        alert("메뉴 삭제 중 오류가 발생했습니다.");
      }
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };

  // 추가된 재료의 원가 개산
  const getCostPerPiece = (ingredientName: string): number => {
    const selectedIngredient = costIngredients.find(
      (ingredient) => ingredient.name === ingredientName
    );

    if (selectedIngredient) {
      const totalCost = calculateTotalCost(selectedIngredient.ingredients); // 총 원가 계산
      return calculateCostPerPiece(totalCost, selectedIngredient.salesQuantity); // 개당 원가 계산
    }
    return 0;
  };

  const handleGoCost = () => {
    router.push(`/cost`);
  };

  // 마크업 부분
  return (
    <div className="md:max-w-[1100px] md:mx-auto">
      <div className="flex items-center  mb-8">
        <div className="text-dark2 text-xl">
          {editingName ? (
            <div className="flex items-center">
              <input
                type="text"
                className="w-[200px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 dark:bg-gray-800 dark:text-white dark:border-gray-500"
                placeholder={String(updatedMenu.name)}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                onClick={handleSaveName}
                className="px-2 py-1 ml-2 cursor-pointer rounded-md text-xs border bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
              >
                저장
              </button>
            </div>
          ) : (
            <div className="flex items-center dark:text-white">
              {updatedMenu.name}
              <button
                onClick={handleEditName}
                className="px-2 py-1 ml-2 cursor-pointer rounded-md text-xs border bg-white  text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200 "
              >
                수정
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleGoCost}
          className="hover:bg-blue-500 hover:text-white hover:border-blue-500 px-2 py-1 cursor-pointer rounded-md text-xs border bg-white  text-black dark:bg-gray-700 dark:border-gray-300 dark:text-gray-200 border-gray-300 ml-auto"
        >
          목록으로 돌아가기
        </button>
      </div>

      {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
      <div className="mb-4 mt-5">
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <div className="overflow-hidden border border-gray-300 min-h-[52px] dark:border-gray-500">
              <div className="bg-gray-300 font-bold text-center px-2 py-1 dark:bg-gray-700">
                개당 판매가
              </div>
              <div className="bg-white px-1 py-1  dark:bg-gray-900 dark:text-white">
                {editingPrice ? (
                  <div className="text-center">
                    <input
                      type="number"
                      className="w-[50px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 dark:bg-gray-800 dark:text-white dark:border-gray-500"
                      placeholder={String(newPrice)}
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
                    ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                    : "bg-white  text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                }`}
                onClick={editingPrice ? handleSavePrice : handleEditPrice}
              >
                {editingPrice ? "저장" : "수정"}
              </button>
            </div>
          </div>
          <div>
            <div className="overflow-hidden border border-gray-300 min-h-[52px] dark:border-gray-500">
              <div className="bg-gray-300 font-bold px-2 py-1 text-center dark:bg-gray-700 dark:text-white">
                판매 개수
              </div>
              <div className="bg-white px-2 py-1 dark:bg-gray-900 dark:text-white">
                {editingQuantity ? (
                  <div className="text-center">
                    <input
                      type="number"
                      className="w-[50px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 dark:bg-gray-800 dark:text-white dark:border-gray-500"
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
            <div className="flex">
              {quantityError && (
                <p className="text-red-500 text-sm ml-3">{quantityError}</p>
              )}
              <button
                className={`ml-auto px-2 py-1 cursor-pointer rounded-md text-xs mt-1 border  ${
                  editingQuantity
                    ? "bg-blue-500 text-white border-blue-500  dark:bg-blue-600 dark:border-blue-600"
                    : "bg-white  text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
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
          <table className="min-w-full rounded-lg border border-gray-300 dark:border-gray-500">
            <thead className="bg-gray-300 dark:bg-gray-700 dark:text-white">
              <tr>
                <th
                  className="px-1 py-1 border-r border-b text-center dark:bg-gray-700 dark:text-white dark:border-gray-500"
                  style={{ minWidth: "90px" }}
                >
                  재료명
                </th>
                <th
                  className="px-1 py-1 border-r border-b  text-center dark:bg-gray-700 dark:text-white dark:border-gray-500"
                  style={{ minWidth: "60px" }}
                >
                  구매가
                </th>
                <th
                  className="px-1 py-1 border-r border-b text-center dark:bg-gray-700 dark:text-white dark:border-gray-500"
                  style={{ minWidth: "60px" }}
                >
                  구매량
                </th>
                <th
                  className="px-1 py-1 border-b text-center dark:bg-gray-700 dark:text-white dark:border-gray-500"
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
                    className="px-1 py-1 border-r border-b text-center dark:border-gray-500"
                    style={{ minWidth: "90px" }}
                  >
                    {editingIngredients ? (
                      <div className="flex items-center ">
                        <input // 재료명
                          type="text"
                          className="w-[88px] focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 dark:bg-gray-800 dark:text-white dark:border-gray-500"
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
                          className="px-1 items-center bg-gray-100 border-y border-x border-gray-300  text-gray-700 dark:bg-gray-400 dark:border-gray-300"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div>{ingredient.name || "-"}</div>
                    )}
                  </td>
                  <td
                    className="px-1 py-1 border-r border-b text-center dark:border-gray-500"
                    style={{ minWidth: "60px" }}
                  >
                    <div className="flex items-center justify-center ">
                      {editingIngredients ? (
                        <>
                          <input // 구매가
                            type="number"
                            className="w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 dark:bg-gray-800 dark:text-white dark:border-gray-500"
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
                    className="px-1 py-1 border-r border-b text-center dark:border-gray-500"
                    style={{ minWidth: "60px" }}
                  >
                    <div className="flex items-center justify-center">
                      {editingIngredients ? (
                        <>
                          <input // 구매량
                            type="number"
                            className="w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 dark:bg-gray-800 dark:text-white dark:border-gray-500"
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
                    className="px-1 py-1 border-b text-center dark:border-gray-500"
                    style={{ minWidth: "60px" }}
                  >
                    <div className="flex items-center justify-center">
                      {editingIngredients ? (
                        <>
                          <input // 사용량
                            type="number"
                            className="w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 pl-1 dark:bg-gray-800 dark:text-white dark:border-gray-500"
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
                className="w-full px-2 py-1 text-md bg-[#e5e7eb] text-dark2 font-bold dark:bg-gray-400"
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
                  ? "bg-blue-500 text-white border-blue-500  dark:bg-blue-600 dark:border-blue-600"
                  : "bg-white  text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
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
      <div className="mb-12">
        <table className="min-w-full rounded-lg border border-gray-300 dark:border-gray-500 ">
          <thead className="bg-gray-300 dark:bg-gray-700 ">
            <tr>
              <th className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                항목
              </th>
              <th className="px-2 py-1 border-b text-center dark:border-gray-500">
                값
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                총 원가
              </td>
              <td className="px-2 py-1 border-b text-center dark:border-gray-500">
                {Number(calculatedMenu.totalCost).toFixed(0)}원
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                개당 원가
              </td>
              <td className="px-2 py-1 border-b text-center dark:border-gray-500">
                {Number(calculatedMenu.costPerPiece).toFixed(0)}원
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                마진율
              </td>
              <td className="px-2 py-1 border-b text-center dark:border-gray-500">
                {Number(calculatedMenu.margin).toFixed(2)}%
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                개당 수익
              </td>
              <td className="px-2 py-1 border-b text-center dark:border-gray-500">
                {Number(calculatedMenu.profitPerPiece).toFixed(0)}원
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* / 재료추가 */}
      <button
        onClick={openModal}
        className="mb-7 px-2 py-1 cursor-pointer rounded-md text-xs border bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
      >
        {updatedMenu.addedIngredients && updatedMenu.addedIngredients.length > 0
          ? "재료 수정하기"
          : "재료 추가하기"}
      </button>

      {isModalOpen && (
        <SearchModal
          costIngredients={costIngredients}
          selectedNames={selectedNames}
          setSelectedNames={setSelectedNames}
          handleSaveAddedIngredients={handleSaveAddedIngredients}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      <div className="text-sm font-bold mb-4">
        추가된 재료들의 총 개당 원가:{" "}
        {Number(
          updatedMenu.addedIngredients?.reduce(
            (total, name) => total + getCostPerPiece(name),
            0
          ) || 0
        ).toFixed(0)}
        원
      </div>

      <div className="mb-12">
        <table className="min-w-full rounded-lg border border-gray-300 dark:border-gray-500">
          <thead className="bg-gray-300 ">
            <tr>
              <th className="px-2 py-1 border-r border-b text-center dark:bg-gray-700 dark:text-white dark:border-gray-500">
                항목
              </th>
              <th className="px-2 py-1 border-b text-center dark:bg-gray-700 dark:text-white dark:border-gray-500">
                개당 원가
              </th>
            </tr>
          </thead>
          <tbody>
            {updatedMenu.addedIngredients === undefined ||
            updatedMenu.addedIngredients?.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-2 py-1 text-center text-gray-500">
                  "재료 추가하기"를 눌러서 재료를 추가해보세요!
                </td>
              </tr>
            ) : (
              updatedMenu.addedIngredients?.map((name) => {
                const costPerPiece = getCostPerPiece(name); // 각 재료의 개당 원가 계산
                return (
                  <tr key={name}>
                    <td className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                      {name}
                    </td>
                    <td className="px-2 py-1 border-b text-center dark:border-gray-500">
                      {Number(costPerPiece).toFixed(0)}원
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="text-sm font-bold mb-4">재료 추가 시 최종 원가</div>

      <div className="mb-12">
        <table className="min-w-full rounded-lg border border-gray-300 dark:border-gray-500">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-2 py-1 border-r border-b text-center dark:bg-gray-700 dark:text-white dark:border-gray-500">
                항목
              </th>
              <th className="px-2 py-1 border-b text-center dark:bg-gray-700 dark:text-white dark:border-gray-500">
                값
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                개당 원가
              </td>
              <td className="px-2 py-1 border-b text-center dark:border-gray-500">
                {(
                  Number(calculatedMenu.costPerPiece) +
                  (updatedMenu.addedIngredients?.length
                    ? updatedMenu.addedIngredients.reduce(
                        (total, name) => total + getCostPerPiece(name),
                        0
                      )
                    : 0)
                ).toFixed(0)}
                원
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                마진율
              </td>
              <td className="px-2 py-1 border-b text-center dark:border-gray-500">
                {Number(
                  calculateMargin(
                    updatedMenu.pricePerPiece, // 1개당 판매가
                    Number(calculatedMenu.costPerPiece) +
                      (updatedMenu.addedIngredients?.length
                        ? updatedMenu.addedIngredients.reduce(
                            (total, name) => total + getCostPerPiece(name),
                            0
                          )
                        : 0) // 1개당 원가
                  )
                ).toFixed(2)}
                %
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center dark:border-gray-500">
                개당 수익
              </td>
              <td className="px-2 py-1 border-b text-center dark:border-gray-500">
                {Number(
                  calculateProfitPerPiece(
                    updatedMenu.pricePerPiece, // 1개당 판매가
                    Number(calculatedMenu.costPerPiece) +
                      (updatedMenu.addedIngredients?.length
                        ? updatedMenu.addedIngredients.reduce(
                            (total, name) => total + getCostPerPiece(name),
                            0
                          )
                        : 0) // 1개당 원가
                  )
                ).toFixed(0)}
                원
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex">
        <button
          onClick={handleDeleteMenu}
          className="mb-5 ml-auto px-2 py-1 rounded-md cursor-pointer bg-red-600 border border-red-600  text-white text-xs"
        >
          메뉴 삭제하기
        </button>
      </div>
    </div>
  );
}
