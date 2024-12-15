import { getDocs, collection } from "firebase/firestore";
import fireStore from "../../firebase/firestore";
import { CostIngredient } from "../types/cost-ingredient";

export async function fetchCostIngredients(): Promise<CostIngredient[]> {
  try {
    const querySnapshot = await getDocs(collection(fireStore, "costIngredients"));
    const items: CostIngredient[] = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data() as CostIngredient);
    });
    return items;
    
  } catch (error) {
    console.error("Error fetching cost ingredients: ", error);
    return [];
  }
};

export default fetchCostIngredients;
