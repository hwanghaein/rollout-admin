import fetchCostMenuItems from "@/utils/fetchCostMenuItems";
import fetchCostIngredients from "@/utils/fetchCostIngredients";
import { CostMenu } from "@/types/cost-menu";
import { CostIngredient } from "@/types/cost-ingredient";
import ContentSwitcher from "./content-switcher";
import AuthenticatedRoute from "../../components/authenticated-route";

export default async function Page() {
  const costMenuList: CostMenu[] = await fetchCostMenuItems();
  const costIngredients: CostIngredient[] = await fetchCostIngredients();

  return (
    <AuthenticatedRoute>
      <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20 bg-white dark:bg-gray-900 text-black dark:text-gray-200">
        <span className="text-dark2 dark:text-gray-200 text-xl mb-5">MENU COST</span>
        <ContentSwitcher
          costMenuList={costMenuList}
          costIngredients={costIngredients}
        />
      </div>
    </AuthenticatedRoute>
  );
}
