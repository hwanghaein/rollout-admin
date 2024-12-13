import { getDocs, collection, query, where } from "firebase/firestore";
import fireStore from "../../firebase/firestore";
import { CostMenu } from "../types/cost-menu";

// id에 해당하는 메뉴 아이템만 가져오는 함수
export async function fetchCostMenuItemById(id: string): Promise<CostMenu | null> {
  try {
    // 'id' 필드에 대해 쿼리 실행
    const q = query(collection(fireStore, "costMenuItems"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    // 결과가 없으면 null 반환
    if (querySnapshot.empty) {
      return null;
    }

    // 첫 번째 아이템을 반환
    const menuItem = querySnapshot.docs[0].data() as CostMenu;
    return menuItem;
  } catch (error) {
    console.error("Error fetching cost menu item: ", error);
    return null;
  }
}

export default fetchCostMenuItemById;
