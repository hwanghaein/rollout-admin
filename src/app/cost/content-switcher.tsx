"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [view, setView] = useState<"menu" | "ingredient">("menu");

  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "ingredient" || viewParam === "menu") {
      setView(viewParam);
    } else {
      setView("menu");
    }
  }, [searchParams]);

  return (
    <div>
      {/* 버튼 2개 */}
      <div className="flex text-sm space-x-4 mb-6">
        <button
          className={`px-3 py-2 rounded ${
            view === "menu"
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          }`}
          onClick={() => setView("menu")}
        >
          메뉴로 보기
        </button>
        <button
          className={`px-3 py-2 rounded ${
            view === "ingredient"
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          }`}
          onClick={() => setView("ingredient")}
        >
          재료로 보기
        </button>
      </div>

      {/* 조건부 렌더링 */}
      {view === "menu" && (
        <CostComponent
          costMenuList={costMenuList}
          costIngredients={costIngredients}
        />
      )}
      {view === "ingredient" && (
        <IngredientComponent costIngredients={costIngredients} />
      )}
    </div>
  );
}
