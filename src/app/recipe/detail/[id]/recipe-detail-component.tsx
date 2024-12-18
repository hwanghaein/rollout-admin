"use client";

import { CostMenu } from "@/types/cost-menu";
import { CostIngredient } from "@/types/cost-ingredient";
import React from "react";
import { useRouter } from "next/navigation";



export default function RecipeDetailComponent({
  menu,
  costIngredients,
}: {
  menu: CostMenu;
  costIngredients: CostIngredient[];
})



{
const router= useRouter();

  const handleGoList=()=>{
    router.push(`/recipe`)
  }

  return (
    <div className="md:max-w-[1100px] md:mx-auto">
      <div className="flex justify-between mb-8">
      <div className="text-dark2 text-xl">{menu.name}</div>
      <button
          onClick={handleGoList}
          className="hover:bg-blue-500 hover:text-white hover:border-blue-500 px-2 py-1 cursor-pointer rounded-md text-xs border bg-white  text-black border-gray-300"
        >
          목록으로 돌아가기
        </button>
        </div>
      <div className="mb-4">
        <table className="min-w-full rounded-lg border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th
                className="px-1 py-1 border-r border-b text-center"
                colSpan={2} 
                style={{ minWidth: "150px" }}
              >
                재료명
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
            {/* 기본 재료 표시 */}
            {menu.ingredients.map((ingredient, index) => (
              <tr key={`ingredient-${index}`}>
                <td
                  className="px-1 py-1 border-r border-b text-center"
                  colSpan={2}
                  style={{ minWidth: "150px" }}
                >
                  {ingredient.name}
                </td>
                <td
                  className="px-1 py-1 border-b text-center"
                  style={{ minWidth: "60px" }}
                >
                  {ingredient.usageQuantity}g
                </td>
              </tr>
            ))}

            {/* 추가된 재료와 costIngredients 렌더링 */}
            {menu.addedIngredients?.map((addedIngredient, index) => {
              const costIngredient = costIngredients.find(
                (ci) => ci.name === addedIngredient
              );
              if (!costIngredient) return null;

              const ingredientRows = costIngredient.ingredients.map(
                (ingredient, subIndex) => (
                  <tr key={`cost-${index}-${subIndex}`}>
                    {/* 메인 재료명 */}
                    {subIndex === 0 && (
                      <td
                        className="px-1 py-1 border-r border-b text-center"
                        rowSpan={costIngredient.ingredients.length} 
                        style={{
                          verticalAlign: "middle",
                          minWidth: "60px",
                        }}
                      >
                        <div>{costIngredient.name}</div>
                        <div>({costIngredient.salesQuantity}
                        개 분량)</div>
                      </td>
                    )}
                    {/* 세부 재료명 */}
                    <td
                      className="px-1 py-1 border-r border-b text-center"
                      style={{ minWidth: "60px" }}
                    >
                      {ingredient.name}
                    </td>
                    {/* 사용량 */}
                    <td
                      className="px-1 py-1 border-b text-center"
                      style={{ minWidth: "90px" }}
                    >
                      {ingredient.usageQuantity}g
                    </td>
                  </tr>
                )
              );

              return ingredientRows;
            })}
          </tbody>
        </table>
        <div className="mt-12">* 메뉴 및 레시피 추가/수정/삭제는 "단가 계산 페이지"에서 가능합니다. </div>
      </div>
    </div>
  );
}
