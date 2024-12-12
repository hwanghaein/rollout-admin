import Image from "next/image";

export default function Page() {
  return (
    <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
      <span className="text-dark2 text-3xl mb-10">ROLL OUT COFFEE</span>
      <Image
        src="/images/about-rollout/plane_img.png"
        alt="비행기"
        width={1100}
        height={300}
        className="object-contain mb-12"
      />
      <span className="text-2xl text-secondary mb-7">TAKE-OFF AND LANDING</span>
      <div className="leading-loose text-lg text-dark4 border-gray-4 ">
        Roll Out Coffee는 한 잔의 커피에 새로운 커피 경험을 선보입니다. <br />
        "Roll out"은 “신형 비행기가 첫 공개나 전시를 앞두고 활주로를 벗어나는
        순간”을 의미합니다.
        <br />
        이는 단순히 비행기가 활주로에 모습을 드러내는 것을 넘어, 새로운 가능성과
        기대의 시작을 상징합니다. <br />
        이처럼 Roll Out Coffee는 신선하고 혁신적인 커피를 처음으로 선보이며,
        고객에게 매일 새로운 맛의 여정을 시작하게 합니다.
        <br />
        또한, "take off"와 "landing"은 비행의 여정을 떠올리게 하며, 이는
        고객님의 하루가 커피와 함께 힘차게 시작되고,
        <br />
        마지막까지 편안히 마무리되기를 바라는 우리의 마음을 담고 있습니다.
        <br />
        Roll Out Coffee는 고객님의 일상에 활력을 더하는 특별한 시작점이 되기를
        기대합니다. 지금 이곳에서 여러분만의 비행을 시작해 보세요. ✈️
      </div>
    </div>
  );
}
