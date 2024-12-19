"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-6 max-w-[1100px] mx-auto bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {/* 매장 관리 */}
        <div className="col-span-2 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md text-dark2 dark:text-gray-200 text-center">
          <h3 className="text-xl mb-4">매장 관리</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/cost">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full hover:bg-brown2 dark:bg-gray-700 dark:hover:bg-brown2 dark:hover:border-brown2 dark:border dark:border-gray-700 ">
                단가 계산
              </button>
            </Link>
            <Link href="/recipe">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full hover:bg-brown2 dark:bg-gray-700 dark:hover:bg-brown2 dark:hover:border-brown2 dark:border dark:border-gray-700">
                레시피
              </button>
            </Link>
          </div>
        </div>

        {/* 홈페이지 관리 */}
        <div className="col-span-2 p-4 text-dark2 dark:text-gray-200 text-center bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl mb-4">홈페이지 관리</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/menu">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full cursor-pointer hover:bg-brown2 dark:bg-gray-700 dark:hover:bg-brown2 dark:hover:border-brown2 dark:border dark:border-gray-700">
                메뉴
              </button>
            </Link>
            <Link href="/store">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full cursor-pointer hover:bg-brown2 dark:bg-gray-700 dark:hover:bg-brown2 dark:hover:border-brown2 dark:border dark:border-gray-700">
                스토어
              </button>
            </Link>
            <Link href="/about-rollout">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full cursor-pointer hover:bg-brown2 dark:bg-gray-700 dark:hover:bg-brown2 dark:hover:border-brown2 dark:border dark:border-gray-700">
                롤아웃 커피
              </button>
            </Link>
            <Link href="/photo-gallery">
              <button className="p-4 bg-brown1 text-white rounded-lg w-full cursor-pointer hover:bg-brown2 dark:bg-gray-700 dark:hover:bg-brown2 dark:hover:border-brown2 dark:border dark:border-gray-700">
                포토 갤러리
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
