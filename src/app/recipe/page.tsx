import AuthenticatedRoute from "../../components/authenticated-route";
import fetchCostMenuItems from "@/utils/fetchCostMenuItems";
import fetchCostIngredients from "@/utils/fetchCostIngredients";
import { CostMenu } from "@/types/cost-menu";
import { CostIngredient } from "@/types/cost-ingredient";
import RecipeComponent from "./recipe-component";

export default async function Page() {
  const costMenuList: CostMenu[] = await fetchCostMenuItems();
  const costIngredients: CostIngredient[] = await fetchCostIngredients();

  return (
    <AuthenticatedRoute>
      <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
        <span className="text-dark2 text-2xl mb-6">RECIPE</span>
        <RecipeComponent costMenuList={costMenuList}/>
      </div>
    </AuthenticatedRoute>
  );
}
