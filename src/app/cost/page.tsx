import { costMenuList } from "@/mock/cost-menu-list";

export default function Page() {
  return (
    <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
      <span className="text-dark2 text-3xl mb-5">Menu List</span>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-dark2">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2 font-medium text-dark2 border-x border-gray-200">메뉴명</th>
              <th className="px-4 py-2 font-medium text-dark2 border-x border-gray-200">원가</th>
              <th className="px-4 py-2 font-medium text-dark2 border-x border-gray-200">판매가</th>
              <th className="px-4 py-2 font-medium text-dark2 border-x border-gray-200">마진율</th>
            </tr>
          </thead>
          <tbody>
            {costMenuList.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 border-x border-gray-200 break-words max-w-[110px]">{item.name}</td>
                <td className="px-4 py-3 border-x border-gray-200">{item.cost}</td>
                <td className="px-4 py-3 border-x border-gray-200">{item.price}</td>
                <td className="px-4 py-3 border-x border-gray-200">{item.margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
