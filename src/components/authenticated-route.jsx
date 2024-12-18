'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/context/auth-context';

export default function AuthenticatedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const alertShown = useRef(false); // alert 호출 여부 추적

  useEffect(() => {
    if (!loading) {
      if (!user && !alertShown.current) {
        // 로그인하지 않았고 alert가 호출되지 않았다면
        alert("로그인 후 이용이 가능합니다.");
        alertShown.current = true; // alert 호출 상태로 설정
        router.push('/login'); // 로그인 페이지로 리디렉션
      } else if (user) {
        // 사용자가 로그인 상태라면 바로 렌더링
        setHasCheckedAuth(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !hasCheckedAuth) {
    // 로딩 중이거나 로그인 상태 확인이 완료되지 않으면 아무것도 렌더링하지 않음
    return null;
  }

  return <>{children}</>; // 로그인된 경우 자식 컴포넌트 렌더링
}
