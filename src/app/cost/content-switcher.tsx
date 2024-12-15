"use client";

import { useState } from "react";
import { CostMenu } from "@/types/cost-menu";
import { CostIngredient } from "@/types/cost-ingredient";
import CostComponent from "./cost-component";
import IngredientComponent from "./ingredient-component";

export default function ContentSwitcher({
  costMenuList,
  costIngredients,
}: {
  costMenuList: CostMenu[];
  costIngredients: CostIngredient[];
}) {
  const [view, setView] = useState<"menu" | "ingredient">("menu");

  return (
    <div>
      {/* 버튼 2개 */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            view === "menu" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("menu")}
        >
          메뉴로 보기
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "ingredient" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("ingredient")}
        >
          재료로 보기
        </button>
      </div>

      {/* 조건부 렌더링 */}
      {view === "menu" && <CostComponent costMenuList={costMenuList} />}
      {view === "ingredient" && (
        <IngredientComponent costIngredients={costIngredients} />
      )}
    </div>
  );
}
