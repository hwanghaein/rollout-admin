"use client"

import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import fireStore from '../../../firebase/firestore';

export default function Page() {
  const onClickCreate = async () => {
    try {
      const userDocRef = doc(fireStore, "costIngredients", '5');
      await setDoc(userDocRef,  
        {
          id: "5",
          name: "재료5", // 재료 이름
          salesQuantity: 10, // 판매 개수 (개)
          ingredients: [ // 재료 정보 배열
            { name: "재료", purchasePrice: 6500, purchaseQuantity: 1000, usageQuantity: 500 }, // 구매가, 구매량, 사용량
          ],
          costPerPiece: 0, // 개당 원가 (원)
        },
    );
      console.log("데이터가 성공적으로 추가되었습니다.");
    } catch (error) {
      console.error("데이터 추가 실패:", error);
    }
  };

  return (
    <div>
      <button 
        onClick={onClickCreate} 
      >
        setDoc
      </button>
    </div>
  );
}