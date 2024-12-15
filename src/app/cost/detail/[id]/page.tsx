import CostDetailComponent from "./cost-detail-component";
import fetchCostMenuItemById from "@/utils/fetchCostMenuItemById";
import fetchCostIngredients from "@/utils/fetchCostIngredients";
import { CostIngredient } from "@/types/cost-ingredient";

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;


    const menu = await fetchCostMenuItemById(id);
   const costIngredients: CostIngredient[] = await fetchCostIngredients();


  if (!menu) {
    return <div>Menu not found</div>;
  }

  return (
    <div className="p-4 text-xs">
      <CostDetailComponent menu={menu} costIngredients={costIngredients}/>
    </div>
  );
}
