// import { CostMenu } from "@/types/cost-menu";
import CostDetailClient from "./cost-detail-client";
// import { costMenuList } from "../../../../mock/cost-menu-list";
import fetchCostMenuItemById from "@/utils/fetchCostMenuItemById";

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;


    const menu = await fetchCostMenuItemById(id);


  if (!menu) {
    return <div>Menu not found</div>;
  }

  return (
    <div className="p-4 text-xs">
      <CostDetailClient menu={menu} />
    </div>
  );
}
