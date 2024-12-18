import { Ingredient } from './../types/cost-menu';

// 총 원가
export const calculateTotalCost = (ingredients: Ingredient[]): number => {
  return ingredients.reduce((total, ingredient) => {
    const unitCost = ingredient.purchaseQuantity > 0 
      ? ingredient.purchasePrice / ingredient.purchaseQuantity 
      : 0; // 단위당 가격 계산, 구매 수량이 0일 경우 0으로 처리
    
    const ingredientCost = unitCost * ingredient.usageQuantity; // 해당 재료의 원가 계산
    
    return total + ingredientCost;
  }, 0);
};

// 개당 원가
export const calculateCostPerPiece = (totalCost: number, quantity: number): number => {
  // 분모가 0인 경우, 0 반환
  if (quantity === 0) return 0;
  return totalCost / quantity;
};

// 개당 수익
export const calculateProfitPerPiece = (sellingPrice: number, costPerPiece: number): number => {
  // 판매가의 10%를 공제한 개당 수익 계산
  const sellingPriceAfterFee = sellingPrice * 0.9;
  return sellingPriceAfterFee - costPerPiece;
};

// 마진율
export const calculateMargin = (sellingPrice: number, costPerPiece: number): number => {
  const profitPerPiece = calculateProfitPerPiece(sellingPrice, costPerPiece);

  // 개당 원가가 0일 경우, 마진율 0% 반환
  if (costPerPiece === 0) return 0;

  return (profitPerPiece / costPerPiece) * 100;
};
