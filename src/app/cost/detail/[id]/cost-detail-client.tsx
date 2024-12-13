import { CostMenu } from "@/types/cost-menu";

export default function CostMenuDetail({ menu }: { menu: CostMenu }) {
  return (
    <div>
      <span className="text-dark2 text-xl mb-4">{menu.name}</span>
      <div className="mb-4 mt-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex">
              <button className="ml-auto px-1 py-1 cursor-pointer rounded-md bg-white border border-gray-300 text-black text-xs">
                수정
              </button>
            </div>
            <div className="overflow-hidden border border-gray-300 mt-1">
              <div className="bg-gray-300 font-bold text-center px-2 py-1">
                개당 판매가
              </div>
              <div className="bg-white px-1 py-1">
                <input
                  type="number"
                  className="w-full text-center focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={String(menu.pricePerPiece)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex">
              <button className="ml-auto px-1 py-1 cursor-pointer rounded-md bg-white border border-gray-300 text-black text-xs">
                수정
              </button>
            </div>
            <div className="overflow-hidden border border-gray-300 mt-1">
              <div className="bg-gray-300 font-bold px-2 py-1 text-center">
                판매 개수
              </div>
              <div className="bg-white px-2 py-1">
                <input
                  type="number"
                  className="w-full text-center focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={String(menu.salesQuantity)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div>
          <div className="flex">
            <button className="ml-auto px-1 py-1 rounded-md cursor-pointer bg-white border border-gray-300 text-black text-xs">
              수정
            </button>
          </div>
          <table className="min-w-full rounded-lg border border-gray-300 mt-1">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-1 py-1 border-r border-b text-center min-w-[90px]">
                  재료명
                </th>
                <th className="px-1 py-1 border-r border-b text-center min-w-[50px]">
                  구매가
                </th>
                <th className="px-1 py-1 border-r border-b text-center">
                  구매량
                </th>
                <th className="px-1 py-1 border-b text-center">사용량</th>
              </tr>
            </thead>
            {/* 재료 */}
            <tbody>
              {menu.ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td className="px-1 py-1 border-r border-b text-center">
                    {ingredient.name}
                  </td>
                  <td className="px-1 py-1 border-r border-b">
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-full border-gray-300 rounded-md"
                        placeholder={String(ingredient.purchasePrice)}
                      />
                      <span className="ml-1">원</span>
                    </div>
                  </td>
                  <td className="px-1 py-1 border-r border-b">
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-full border-gray-300 rounded-md"
                        placeholder={String(ingredient.purchaseQuantity)}
                      />
                      <select className="ml-2 border-gray-300 rounded-md">
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-1 py-1 border-b">
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-full border-gray-300 rounded-md"
                        placeholder={String(ingredient.usageQuantity)}
                      />
                      <select className="ml-2 border-gray-300 rounded-md">
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 계산 결과  */}
      <div className="mb-6">
        <table className="min-w-full rounded-lg border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-2 py-1 border-r border-b text-center">항목</th>
              <th className="px-2 py-1 border-b text-center">값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                총 원가
              </td>
              <td className="px-2 py-1 border-b text-center">
                {menu.totalCost}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                개당 원가
              </td>
              <td className="px-2 py-1 border-b text-center">
                {menu.costPerPiece}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                마진율
              </td>
              <td className="px-2 py-1 border-b text-center">{menu.margin}</td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">
                개당 수익
              </td>
              <td className="px-2 py-1 border-b text-center">
                {menu.profitPerPiece}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex">
        <button className="ml-auto px-2 py-1 rounded-md cursor-pointer bg-gray-500 border border-gray-500 text-white text-xs">
          메뉴 삭제
        </button>
      </div>
    </div>
  );
}
