'use client';

import { useState } from "react";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useAuth } from "../../app/context/auth-context";
import { useRouter } from "next/navigation";
import AuthenticatedRoute from "../../components/authenticated-route";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function MyPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState<string>(""); 
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); 

  const handleLogout = async () => {
    await logout();
  };
  

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setError("새 비밀번호와 비밀번호 확인을 입력해주세요.");
      return;
    }

    // 비밀번호 최소 길이 확인
    if (newPassword.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // 새 비밀번호와 비밀번호 확인 일치 확인
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!currentPassword) {
      setError("현재 비밀번호를 입력해주세요.");
      return;
    }

    setIsPasswordChanging(true);
    try {
      // 현재 비밀번호로 사용자를 재인증
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 비밀번호 변경
      await updatePassword(user, newPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (err: any) {  // `error`를 `any` 타입으로 처리
      console.error("비밀번호 변경 실패:", err);
      if (err.code === "auth/requires-recent-login") {
        setError("비밀번호 변경을 위해 다시 로그인해야 합니다.");
      } else {
        setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsPasswordChanging(false);
    }
  };

  return (
    <AuthenticatedRoute>
      <div className="flex flex-col px-4 md:w-full max-w-[1100px] mx-auto pt-7  md:mt-16">
        <h1 className="text-xl font-bold text-dark2 mb-10">마이페이지</h1>
        <h2 className="text-lg mb-4">계정 정보</h2>

        <div className="bg-gray-100 p-4 rounded-lg  mb-10">
          <p className="text-dark2 text-sm mb-2 font-semibold">이메일</p>
          <p className="text-dark2 text-sm">{user?.email}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg  mb-4 ">비밀번호 변경</h2>

          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-full text-sm "
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)} 
              className="absolute top-3 right-3 text-gray-500"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} 
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-full text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)} 
              className="absolute top-3 right-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mb-2 w-full text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)} 
              className="absolute top-3 right-3 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-gray-200 text-dark2 text-sm rounded-md focus:outline-none cursor-pointer mt-3"
            disabled={isPasswordChanging}
          >
            {isPasswordChanging ? "변경 중..." : "비밀번호 변경"}
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-12 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none"
        >
          로그아웃
        </button>
      </div>
    </AuthenticatedRoute>
  );
}
