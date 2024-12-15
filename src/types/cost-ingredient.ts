export interface Ingredients {
  name: string; // 재료명
  purchasePrice: number; // 구매가 (원)
  purchaseQuantity: number; // 구매량 (g/ml)
  usageQuantity: number; // 사용량 (g/ml)
}


export interface CostIngredient {
  id: string; // 메뉴의 고유 ID
  name: string; // 메뉴 이름

  salesQuantity: number; // 판매 개수 (개)

  ingredients: Ingredients[]; // 재료 정보 배열

  costPerPiece: number; // 개당 원가 (원)
}
