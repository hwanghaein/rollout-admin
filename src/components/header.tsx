"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useAuth } from "../app/context/auth-context";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 햄버거 메뉴의 토글 상태를 관리하는 상태 변수
  const [isBrightMode, setIsBrightMode] = useState<boolean>(false); // 밝은 모드 상태를 관리하는 상태 변수
  const { user, logout } = useAuth(); // 로그인 상태와 로그아웃 함수

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // 밝은 모드 상태 변경
  const toggleBrightMode = () => {
    setIsBrightMode((prev) => {
      const newBrightMode = !prev;
      // 상태 변경 시 로컬 스토리지에 저장
      localStorage.setItem('brightMode', newBrightMode.toString());
      return newBrightMode;
    });
  };

// 최초 렌더링 시 로컬 스토리지에서 테마 상태 읽어오기
useEffect(() => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    setIsBrightMode(false); // 다크 모드
  } else if (storedTheme === 'light') {
    setIsBrightMode(true); // 밝은 모드
  } else {
    // 로컬스토리지에 값이 없으면 시스템 설정을 확인하여 다크 모드를 적용
    setIsBrightMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
}, []);

// 밝은 모드 상태가 변경되면 body class 변경
useEffect(() => {
  if (isBrightMode) {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem('theme', 'dark');
  }
}, [isBrightMode]);

  return (
    <div>
      <header className="z-50 top-0 w-full h-20 bg-primary flex justify-between items-center px-3 md:px-5 max-w-full mx-auto gap-5">
        <div className="w-full max-w-[1100px] mx-auto flex justify-between items-center">
          {/* 로고 아이콘 (다크 모드와 라이트 모드에 따라 다르게 설정) */}
          <Link href={"/"} className="flex gap-2 items-center flex-shrink-0">
            <Image
              src={isBrightMode ? "/images/logo/logo_icon.png" : "/images/main/main_store_black_logo.png"}
              alt="롤아웃 커피 로고 아이콘"
              width={45}
              height={45}
              className="object-contain h-full"
              priority
            />
            <Image
              src="/images/logo/logo_text.png"
              alt="롤아웃 커피 로고 텍스트"
              width={85}
              height={45}
              className="object-contain min-w-20 hidden sm:block"
              priority
            />
          </Link>

          {/* 메뉴바 - 데스크탑에서만 보이도록 설정 */}
          <nav className="hidden md:flex flex-grow justify-end whitespace-nowrap">
            <ul className="text-13 text-gray1 flex h-16 items-center m-0 p-0 space-x-1">
              <Link
                href={"/cost"}
                className="px-5 h-full flex items-center justify-center"
              >
                <li>단가 계산</li>
              </Link>
              <Link
                href={"/recipe"}
                className="px-5 h-full flex items-center justify-center"
              >
                <li>레시피</li>
              </Link>
              <Link
                href={"/menu"}
                className="px-5 h-full flex items-center justify-center"
              >
                <li>메뉴</li>
              </Link>
              <Link
                href={"/store"}
                className="px-5 h-full flex items-center justify-center"
              >
                <li>스토어</li>
              </Link>
              <Link
                href={"/about-rollout"}
                className="px-5 h-full flex items-center justify-center"
              >
                <li>롤아웃 커피</li>
              </Link>
              <Link
                href={"/photo-gallery"}
                className="px-5 h-full flex items-center justify-center"
              >
                <li>포토 갤러리</li>
              </Link>
              {user ? (
                <Link
                  href={"/mypage"}
                  className="px-5 h-full flex items-center justify-center"
                >
                  <li>마이페이지</li>
                </Link>
              ) : (
                <Link
                  href={"/login"}
                  className="px-5 h-full flex items-center justify-center"
                >
                  <li>로그인</li>
                </Link>
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-3">

            {/* 밝은 모드 아이콘 */}
            <button onClick={toggleBrightMode} className="p-2">
              {isBrightMode ? (
                <FaSun className="text-2xl text-gray1" />
              ) : (
                <FaMoon className="text-2xl text-gray1" />
              )}
            </button>

            {/* 로그인 버튼 - 모바일과 태블릿에서만 보이도록 설정 */}
            {user ? (
              <button
                className="md:hidden p-2"
                onClick={() => router.push('/mypage')}
              >
                <FaUser className="text-2xl text-gray1 " />
              </button>
            ) : (
              <button className="md:hidden p-2" onClick={() => router.push('/login')}>
                <FaUser className="text-2xl text-gray1 " />
              </button>
            )}

            {/* 햄버거 버튼 - 모바일과 태블릿에서만 보이도록 설정 */}
            <button className="md:hidden p-2" onClick={toggleMenu}>
              <FaBars className="text-2xl text-gray1" />
            </button>
          </div>
        </div>
      </header>

      {/* 햄버거 버튼을 누르면 나타나는 메뉴 (태블릿, 모바일) */}
      <aside
        className={`md:hidden w-64 fixed right-0 inset-y-0 bg-brown1 transition-transform duration-300 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 메뉴 닫기 버튼 */}
        <button
          className="absolute top-6 right-5 text-white"
          onClick={closeMenu}
        >
          <FaTimes className="text-4xl text-gray1" />
        </button>
        <ul className="text-13 text-gray1 flex flex-col items-start text-left text-base">
          <li className="py-10 pl-4 w-full text-left border-gray3 bg-brown2"></li>
          <Link
            href={"/cost"}
            className="py-6 pl-4 w-full text-left border-b-2 border-gray3"
            onClick={closeMenu}
          >
            <li>단가 계산</li>
          </Link>
          <Link
            href={"/recipe"}
            className="py-6 pl-4 w-full text-left border-b-2 border-gray3"
            onClick={closeMenu}
          >
            <li>레시피</li>
          </Link>
          <Link
            href={"/menu"}
            className="py-6 pl-4 w-full text-left border-b-2 border-gray3"
            onClick={closeMenu}
          >
            <li>메뉴</li>
          </Link>
          <Link
            href={"/store"}
            className="py-6 pl-4 w-full text-left border-b-2 border-gray3"
            onClick={closeMenu}
          >
            <li>스토어</li>
          </Link>
          <Link
            href={"/about-rollout"}
            className="py-6 pl-4 w-full text-left border-b-2 border-gray3"
            onClick={closeMenu}
          >
            <li>롤아웃 커피</li>
          </Link>
          <Link
            href={"/photo-gallery"}
            className="py-6 pl-4 w-full text-left border-b-2 border-gray3"
            onClick={closeMenu}
          >
            <li>포토 갤러리</li>
          </Link>
        </ul>
      </aside>
    </div>
  );
}
