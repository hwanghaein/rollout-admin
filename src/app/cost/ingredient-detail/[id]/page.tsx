import IngredientDetailComponent from "./ingredient-detail-component";
import fetchCostIngredientById from "@/utils/fetchCostIngredientById";
import AuthenticatedRoute from "../../../../components/authenticated-route";

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;

  const ingredient = await fetchCostIngredientById(id);

  if (!ingredient) {
    return <div>Ingredient not found</div>;
  }

  return (
    <AuthenticatedRoute>
      <div className="p-4 text-xs dark:bg-gray-900 dark:text-gray-200 ">
        <IngredientDetailComponent menu={ingredient} />
      </div>
    </AuthenticatedRoute>
  );
}
