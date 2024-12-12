import { useEffect } from "react";
// import KakaoMap from "@/components/kakao-map"; 
import Image from "next/image";
import {FaLink } from "react-icons/fa"; 

export default function Page() {
  // const latitude = 33.450701; 
  // const longitude = 126.570667; 
  // const placeName = "롤아웃 커피"; 

  // useEffect(() => {
  //   if (!window.kakao) {
  //     const script = document.createElement("script");
  //     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=292bc6569adad050a9b9617ccb585e68&libraries=services,clusterer&autoload=true`;
  //     script.async = true;
  //     document.head.appendChild(script);

  //     script.onload = () => {
  //       console.log("카카오맵 API 로드 완료");
  //     };
  //   }
  // }, []); 

  return (
    <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
      <span className="text-dark2 text-3xl mb-10">STORE</span>
      <Image
        src="/images/store/store_img.png"
        alt="롤아웃 커피 외관"
        width={1100}
        height={500}
        className="object-contain mb-12"
      />
      <div className="flex flex-col gap-5 pb-7 mb-7 border-b-[1px] ">
        <span className="text-2xl text-secondary">Address</span>
        <span className="text-lg text-dark4">
          경북 경주시 현곡면 금장 3길 4 1층
        </span>
      </div>

      <div className="flex flex-col gap-5 pb-7 mb-7 border-b-[1px] ">
        <span className="text-2xl text-secondary">Opening Hours</span>
        <span className="text-lg text-dark4">
          11:00~21:00, 매주 월요일 휴무
        </span>
      </div>

      <div className="flex flex-col gap-5 pb-7 mb-7 border-b-[1px] ">
        <span className="text-2xl text-secondary">Telephone</span>
        <a href="tel:0507-1392-5605" className="text-lg text-dark4 hover:text-blue-500">
       <div className="flex items-center"> <FaLink className="text-m mr-1 text-gray-600" /> 0507-1392-5605 </div>
        </a>
      </div>

      <div className="flex flex-col gap-5 pb-7 mb-7 border-b-[1px] ">
        <span className="text-2xl text-secondary">Facilities</span>
        <span className="text-lg text-dark4">
          남/녀 화장실 구분, 반려동물 동반, 무선 인터넷, 단체 이용 가능, 주차
        </span>
      </div>

      <div className="flex flex-col gap-5 pb-7 mb-7 border-b-[1px] ">
        <span className="text-2xl text-secondary">Parking</span>
        <span className="text-lg text-dark4">강변 및 건물 1층 무료 주차</span>
      </div>

      <div className="flex flex-col gap-5 pb-7 mb-7 border-b-[1px] ">
        <span className="text-2xl text-secondary">Payment Methods</span>
        <span className="text-lg text-dark4">
          신용카드, 현금, 제로페이, 네이버페이{" "}
        </span>
      </div>

      <div className="flex flex-col gap-5 pb-7 mb-7 border-b-[1px] ">
        <span className="text-2xl text-secondary">Instagram</span>
        <a
          href="https://www.instagram.com/rollout_coffee/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-dark4 hover:text-blue-500"
        >
         <div className="flex items-center"><FaLink className="text-m mr-1 text-gray-600" /> @rollout_coffee </div>
        </a> 
      </div>

      {/* <div className="flex flex-col gap-5 pb-7 mb-7 border-b-[1px] ">
        <span className="text-2xl text-secondary">Directions</span>
        <div>
          <KakaoMap latitude={latitude} longitude={longitude} placeName={placeName} />
        </div>
      </div> */}
    </div>
  );
}
