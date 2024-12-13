"use client";

import { costMenuList } from "@/mock/cost-menu-list";
import { CostMenu } from "@/types/cost-menu";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleMenuClick = (id: string) => {
    router.push(`/cost/detail/${id}`);
  };

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
            {costMenuList.map((item: CostMenu, index: number) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer "
                onClick={() => handleMenuClick(item.id)}
              >
                <td className="px-4 py-3 border-x border-gray-200 break-words max-w-[115px] hover:underline hover:text-blue-600">
                  {item.name}
                </td>
                <td className="px-3 py-2 border-x border-gray-200">₩{item.costPerPiece}</td>
                <td className="px-3 py-2 border-x border-gray-200">₩{item.pricePerPiece}</td>
                <td className="px-3 py-2 border-x border-gray-200">{item.margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
