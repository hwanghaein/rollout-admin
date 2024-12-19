import MenuClient from "./menu-client";
import fetchMenuItems from "@/utils/fetchMenuItems";
import AuthenticatedRoute from "../../components/authenticated-route";

export default async function Page() {
  const menuItems = await fetchMenuItems();

  return (
    <AuthenticatedRoute>
      <div className="flex flex-col px-4 md:w-full max-w-[1100px] mx-auto pt-7 pb-20 dark:bg-gray-900 dark:text-gray-200 min-h-screen"
 >
        <span className="text-dark2 text-2xl mb-5 dark:text-gray-200">MENU</span>
        <MenuClient menuItems={menuItems} />
      </div>
    </AuthenticatedRoute>
  );
}
