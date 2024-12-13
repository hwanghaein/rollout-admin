import { getDocs, collection } from "firebase/firestore";
import fireStore from "../../firebase/firestore";
import { CostMenu } from "../types/cost-menu";

export async function fetchCostMenuItems(): Promise<CostMenu[]> {
  try {
    const querySnapshot = await getDocs(collection(fireStore, "costMenuItems"));
    const items: CostMenu[] = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data() as CostMenu);
    });
    return items;
  } catch (error) {
    console.error("Error fetching cost menu items: ", error);
    return [];
  }
};

export default fetchCostMenuItems;
