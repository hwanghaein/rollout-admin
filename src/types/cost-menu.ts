export interface Ingredient {
  name: string; // 재료명
  purchasePrice: number; // 구매가 (원)
  purchaseQuantity: number; // 구매량 (g/ml)
  usageQuantity: number; // 사용량 (g/ml)
}


export interface CostMenu {
  id: string; // 메뉴의 고유 ID
  name: string; // 메뉴 이름

  pricePerPiece: number; // 개당 판매가 (원)
  salesQuantity: number; // 판매 개수 (개)

  ingredients: Ingredient[]; // 재료 정보 배열

  totalCost: number; // 총 원가 (원)
  costPerPiece: number; // 개당 원가 (원)
  margin: number; // 마진율 (%)
  profitPerPiece: number; // 개당 수익 (원)
  addedIngredients?: string[]; // 추가된 재료 이름 배열
}
