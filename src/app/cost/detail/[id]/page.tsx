import { CostMenu } from "@/types/cost-menu";
import CostDetailClient from "./cost-detail-client";
import { costMenuList } from "../../../../mock/cost-menu-list";

export default function Page({ params }: { params: { id: string } }) {
  const menuId = params.id;

  const menu = costMenuList.find((menu: CostMenu) => menu.id === menuId);

  if (!menu) {
    return <div>Menu not found</div>;
  }

  return (
    <div className="p-4 text-xs">
      <CostDetailClient key={menu.id} menu={menu} />
    </div>
  );
}
