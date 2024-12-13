"use client"

import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import fireStore from '../../../firebase/firestore';

export default function Page() {
  const onClickCreate = async () => {
    try {
      const userDocRef = doc(fireStore, "costMenuItems", '31');
      await setDoc(userDocRef,  
        {
          id: "31",
          name: "초코 레어 치즈 케이크",
          pricePerPiece: 0,
          salesQuantity: 0,
          ingredients: [
            { name: "Milk", purchasePrice: 0, purchaseQuantity: 0, usageQuantity: 0 },
            { name: "Vanilla Syrup", purchasePrice: 0, purchaseQuantity: 0, usageQuantity: 0 },
          ],
          totalCost: 0,
          costPerPiece: 0,
          margin: 0,
          profitPerPiece: 0,
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