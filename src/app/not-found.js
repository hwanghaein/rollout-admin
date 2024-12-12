'use client';

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-bold text-gray-700  mb-4">404 - 페이지를 찾을 수 없습니다.</h1>
      <p className="text-lg text-gray-700 mb-6">요청하신 페이지는 존재하지 않습니다. 다른 경로를 시도해 주세요.</p>
      <button 
        onClick={handleGoHome}
        className="text-blue-500 hover:text-blue-700">
        홈으로 돌아가기
      </button>
    </div>
  );
}
