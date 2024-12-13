// import { costMenuList } from "@/mock/cost-menu-list";
import { CostMenu } from '@/types/cost-menu';
import CostClient from './cost-client';
import fetchCostMenuItems from "@/utils/fetchCostMenuItems";

export default async function Page() {
const costMenuList: CostMenu[] = await fetchCostMenuItems();

 return (
    <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
      <span className="text-dark2 text-2xl mb-5">MENU COST</span>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-dark2">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-3 py-2 font-bold text-dark2 border-x border-gray-200">
                메뉴명
              </th>
              <th className="px-3 py-2 font-bold text-dark2 border-x border-gray-200">
                원가
              </th>
              <th className="px-3 py-2 font-bold text-dark2 border-x border-gray-200">
                판매가
              </th>
              <th className="px-3 py-2 font-bold text-dark2 border-x border-gray-200">
                마진율
              </th>
            </tr>
          </thead>
          <tbody>
              <CostClient costMenuList={costMenuList} /> 
          </tbody>
        </table>
      </div>
    </div>
  );
}
