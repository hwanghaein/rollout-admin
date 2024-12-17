'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/context/auth-context';

export default function AuthenticatedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>로딩 중입니다...</div>; 
  }

  return <>{children}</>; // 로그인된 경우 자식 컴포넌트 렌더링
}
