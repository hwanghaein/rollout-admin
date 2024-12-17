// app/login/page.js
'use client';

import { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../../firebase/firebasedb'; 
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Firebase 인증을 통한 로그인
        await signInWithEmailAndPassword(auth, email, password);
        
        router.push('/'); 
      } catch (err) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } else {
      setError('이메일과 비밀번호를 입력해주세요.');
    }
  };

  return (

         <div className="flex flex-col px-4 md:w-full max-w-[500px] mx-auto pt-7 pb-20 md:mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">로그인</h2>
        
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-dark2">이메일</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-10">
            <label htmlFor="password" className="block  font-medium text-dark2 text-lg">비밀번호</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            로그인
          </button>
        </form>
      </div>

  );
}
