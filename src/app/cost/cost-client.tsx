"use client";

import { CostMenu } from "@/types/cost-menu";
import { useRouter } from "next/navigation";

interface CostClientProps {
  costMenuList: CostMenu[];
}

export default function CostClient({ costMenuList }: CostClientProps) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/cost/detail/${id}`);
  };

  return (
    <>
      {costMenuList.map((item) => (
        <tr
          key={item.id}
          className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer"
          onClick={() => handleClick(item.id)}
        >
          <td className="px-4 py-3 border-x border-gray-200 break-words max-w-[115px] hover:underline hover:text-blue-600">
            {item.name}
          </td>
          <td className="px-3 py-2 border-x border-gray-200">₩{item.costPerPiece}</td>
          <td className="px-3 py-2 border-x border-gray-200">₩{item.pricePerPiece}</td>
          <td className="px-3 py-2 border-x border-gray-200">{item.margin}</td>
        </tr>
      ))}
    </>
  );
}
