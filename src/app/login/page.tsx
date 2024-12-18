'use client';

import { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../../firebase/firebasedb'; 
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 눈 아이콘 추가

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 상태 추가
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Firebase 인증을 통한 로그인
        await signInWithEmailAndPassword(auth, email, password);
        alert("로그인 되었습니다.")
        router.push('/'); 
      } catch (err) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } else {
      setError('이메일과 비밀번호를 입력해주세요.');
    }
  };

  return (
    <div className="flex flex-col px-4 md:w-full max-w-[500px] mx-auto pt-7 pb-20 md:mt-16 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 dark:text-gray-200">로그인</h2>
      
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-dark2 dark:text-gray-200">이메일</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-blue-500 dark:text-gray-200 dark:placeholder-gray-400"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-10 relative">
          <label htmlFor="password" className="block font-medium text-dark2 text-lg dark:text-gray-200">비밀번호</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:focus:ring-blue-500 dark:placeholder-gray-400"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-12 right-3 text-gray-500 dark:text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mb-4 dark:text-red-400">{error}</div>}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer  dark:bg-blue-600 dark:focus:ring-blue-500"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
