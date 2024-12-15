// app/page.tsx (or 적절한 파일 위치)
import fetchCostMenuItems from "@/utils/fetchCostMenuItems";
import fetchCostIngredients from "@/utils/fetchCostIngredients";
import { CostMenu } from "@/types/cost-menu";
import { CostIngredient } from "@/types/cost-ingredient";
import ContentSwitcher from "./content-switcher";

export default async function Page() {
  const costMenuList: CostMenu[] = await fetchCostMenuItems();
  const costIngredients: CostIngredient[] = await fetchCostIngredients();

  return (
    <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
      <span className="text-dark2 text-xl mb-5">MENU COST</span>
      <ContentSwitcher
        costMenuList={costMenuList}
        costIngredients={costIngredients}
      />
    </div>
  );
}
