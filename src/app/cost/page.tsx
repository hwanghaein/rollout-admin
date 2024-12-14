import fetchCostMenuItems from "@/utils/fetchCostMenuItems";
import { CostMenu } from "@/types/cost-menu";
import CostClient from "./cost-client";

export default async function Page() {
  const costMenuList: CostMenu[] = await fetchCostMenuItems();

  return (
    <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
      <span className="text-dark2 text-xl mb-5">MENU COST</span>
      <CostClient costMenuList={costMenuList} />
    </div>
  );
}