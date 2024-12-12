export default function Page() {
  return (
    <div className="p-4 text-xs">
       <span className="text-dark2 text-xl mb-5">메뉴 이름</span>
      {/* 표 1: 판매가 및 개수 입력 */}
      <div className="mb-4 mt-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden border border-gray-300">
            <div className="bg-gray-300 font-bold text-center px-2 py-1">개당 판매가</div>
            <div className="bg-white px-2 py-1">
              <input
                type="number"
                className="w-full text-center focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="3500원"
              />
            </div>
          </div>
          <div className="overflow-hidden border border-gray-300">
            <div className="bg-gray-300 font-bold px-2 py-1 text-center">판매 개수</div>
            <div className="bg-white px-2 py-1">
              <input
                type="number"
                className="w-full text-center focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="10개"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 표 2: 재료 정보 입력 */}
      <div className="mb-4">
        <table className="min-w-full rounded-lg border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-1 py-1 border-r border-b text-center min-w-[90px]">재료명</th>
              <th className="px-1 py-1 border-r border-b text-center min-w-[50px]">구매가</th>
              <th className="px-1 py-1 border-r border-b text-center ">구매량</th>
              <th className="px-1 py-1 border-b text-center">사용량</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-1 py-1 border-r border-b text-center">버터</td>
              <td className="px-1 py-1 border-r border-b">
                <div className="flex items-center ">
                  <input
                    type="number"
                    className="w-full border-gray-300 rounded-md"
                    placeholder="200000"
                  />
                  <span className="ml-1">원</span>
                </div>
              </td>
              <td className="px-1 py-1 border-r border-b">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-full border-gray-300 rounded-md"
                    placeholder="100"
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
                    placeholder="100"
                  />
                  <select className="ml-2 border-gray-300 rounded-md">
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              </td>
            </tr>
            {/* 추가 재료 */}
            <tr>
              <td className="px-1 py-1 border-r border-b text-center">에스프레소</td>
              <td className="px-1 py-1 border-r border-b">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-full border-gray-300 rounded-md"
                    placeholder="1500"
                  />
                  <span className="ml-1">원</span>
                </div>
              </td>
              <td className="px-1 py-1 border-r border-b">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-full border-gray-300 rounded-md"
                    placeholder="1000"
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
                    placeholder="60"
                  />
                  <select className="ml-2 border-gray-300 rounded-md">
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 표 3: 계산 결과 출력 */}
      <div className="mb-8">
        <table className="min-w-full rounded-lg border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-2 py-1 border-r border-b text-center">항목</th>
              <th className="px-2 py-1 border-b text-center">값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">총원가</td>
              <td className="px-2 py-1 border-b text-center">2210원</td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">개당 원가</td>
              <td className="px-2 py-1 border-b text-center">221원</td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">마진율</td>
              <td className="px-2 py-1 border-b text-center">37%</td>
            </tr>
            <tr>
              <td className="px-2 py-1 border-r border-b text-center">개당 수익</td>
              <td className="px-2 py-1 border-b text-center">129원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
