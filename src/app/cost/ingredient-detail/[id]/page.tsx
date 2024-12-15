import IngredientDetailComponent from "./ingredient-detail-component";
import fetchCostIngredientById from "@/utils/fetchCostIngredientById";

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;


    const ingredient = await fetchCostIngredientById(id);


  if (!ingredient) {
    return <div>Ingredient not found</div>;
  }

  return (
    <div className="p-4 text-xs">
      <IngredientDetailComponent menu={ingredient} />
    </div>
  );
}
