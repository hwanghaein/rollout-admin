import { getDocs, collection, query, where } from "firebase/firestore";
import fireStore from "../../firebase/firestore";
import { CostIngredient } from "../types/cost-ingredient";

// id에 해당하는 메뉴 아이템만 가져오는 함수
export async function fetchCostIngredientById(id: string): Promise<CostIngredient | null> {
  try {
    // 'id' 필드에 대해 쿼리 실행
    const q = query(collection(fireStore, "costIngredients"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    // 결과가 없으면 null 반환
    if (querySnapshot.empty) {
      return null;
    }

    // 첫 번째 아이템을 반환
    const ingredientItem = querySnapshot.docs[0].data() as CostIngredient;
    return ingredientItem;
  } catch (error) {
    console.error("Error fetching cost ingredient item: ", error);
    return null;
  }
}

export default fetchCostIngredientById;
