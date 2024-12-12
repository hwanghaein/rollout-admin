import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(threshold: number = 0.5) {
  const [isVisible, setIsVisible] = useState(false); // 상태: 보이는 여부
  const ref = useRef<HTMLDivElement>(null); // 연결할 DOM 요소

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 요소가 보이면 상태 업데이트
        }
      },
      { threshold } // 지정한 임계값 기준
    );

    if (ref.current) {
      observer.observe(ref.current); // DOM 요소 관찰 시작
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // 관찰 해제
      }
    };
  }, [threshold]);

  return { ref, isVisible }; // ref와 상태 반환
}
