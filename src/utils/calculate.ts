
import { Ingredient} from './../types/cost-menu';

// 총 원가
export const calculateTotalCost = (ingredients: Ingredient[]): number => {
  return ingredients.reduce((total, ingredient) => total + ingredient.purchasePrice, 0);
};

// 개당 원가
export const calculateCostPerPiece = (totalCost: number, quantity: number): number => {
  return totalCost / quantity;
};

// 마진율
export const calculateMargin = (sellingPrice: number, costPerPiece: number): number => {
  return ((sellingPrice - costPerPiece) / costPerPiece) * 100;
};


// 개당 수익
export const calculateProfitPerPiece = (sellingPrice: number, costPerPiece: number): number => {
  return sellingPrice - costPerPiece;
};
