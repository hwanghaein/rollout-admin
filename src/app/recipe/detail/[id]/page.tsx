import RecipeDetailComponent from "./recipe-detail-component";
import fetchCostMenuItemById from "@/utils/fetchCostMenuItemById";
import fetchCostIngredients from "@/utils/fetchCostIngredients";
import { CostIngredient } from "@/types/cost-ingredient";
import AuthenticatedRoute from "../../../../components/authenticated-route";

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;

  const menu = await fetchCostMenuItemById(id);
  const costIngredients: CostIngredient[] = await fetchCostIngredients();

  if (!menu) {
    return <div>Menu not found</div>;
  }

  return (
    <AuthenticatedRoute>
      <div className="p-4 text-xs dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        <RecipeDetailComponent menu={menu} costIngredients={costIngredients} />
      </div>
    </AuthenticatedRoute>
  );
}
