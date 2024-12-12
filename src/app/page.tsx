"use client"

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen p-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {/* 매장 관리 */}
        <div className="col-span-2 p-4 bg-gray-300 text-dark2 text-center rounded-lg">
          <h3 className="text-xl mb-4">매장 관리</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/cost">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full">단가 계산</button>
            </Link>
            <Link href="/recipe">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full">레시피</button>
            </Link>
          </div>
        </div>

        {/* 홈페이지 관리 */}
        <div className="col-span-2 p-4 bg-gray-300 text-dark2 text-center rounded-lg">
          <h3 className="text-xl mb-4">홈페이지 관리</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/menu">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full cursor-pointer">메뉴</button>
            </Link>
            <Link href="/store">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full cursor-pointer">스토어</button>
            </Link>
            <Link href="/about-rollout">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full cursor-pointer">롤아웃 커피</button>
            </Link>
            <Link href="/photo-gallery">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full cursor-pointer">포토 갤러리</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
