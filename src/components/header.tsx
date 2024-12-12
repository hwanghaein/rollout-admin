"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; 

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false); // 햄버거 메뉴의 토글 상태를 관리하는 상태 변수
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false); 

  return (
    <div>
      <header className="z-50 top-0 w-full h-20 bg-primary flex justify-between items-center px-3 md:px-5 max-w-full mx-auto gap-5">
        <div className="w-full max-w-[1100px] mx-auto flex justify-between items-center">
          {/* 로고 아이콘 */}
          <Link href={"/"} className="flex gap-2 items-center flex-shrink-0">
            <Image
              src="/images/logo/logo_icon.png"
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
              <Link href={"/menu"} className="px-5 h-full flex items-center justify-center">
                <li>MENU</li>
              </Link>
              <Link href={"/store"} className="px-5 h-full flex items-center justify-center">
                <li>STORE</li>
              </Link>
              <Link href={"/about-rollout"} className="px-5 h-full flex items-center justify-center">
                <li>ROLL OUT COFFEE</li>
              </Link>
              <Link href={"/photo-gallery"} className="px-5 h-full flex items-center justify-center">
                <li>PHOTO GALLERY</li>
              </Link>
            </ul>
          </nav>

          {/* 햄버거 버튼 - 모바일과 태블릿에서만 보이도록 설정 */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            <FaBars className="text-3xl text-gray1" />
          </button>
        </div>
      </header>

      {/* 햄버거 버튼을 누르면 나타나는 메뉴 (태블릿, 모바일)) */}
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
          <Link href={"/menu"} className="py-6 pl-4 w-full text-left border-b-2 border-gray3" onClick={closeMenu}>
            <li>MENU</li>
          </Link>
          <Link href={"/store"} className="py-6 pl-4 w-full text-left border-b-2 border-gray3" onClick={closeMenu}>
            <li>STORE</li>
          </Link>
          <Link href={"/about-rollout"} className="py-6 pl-4 w-full text-left border-b-2 border-gray3" onClick={closeMenu}>
            <li>ROLL OUT COFFEE</li>
          </Link>
          <Link href={"/photo-gallery"} className="py-6 pl-4 w-full text-left border-b-2 border-gray3" onClick={closeMenu}>
            <li>PHOTO GALLERY</li>
          </Link>
        </ul>
      </aside>
    </div>
  );
}
