import MenuClient from "./menu-client";
import fetchMenuItems from "@/utils/fetchMenuItems";


export default async function Page() {
  const menuItems = await fetchMenuItems();

  return (
    <div className="flex flex-col px-4 md:w-full max-w-[1100px] mx-auto pt-7 pb-20">
      <span className="text-dark2 text-3xl mb-10">MENU</span>
      <MenuClient menuItems={menuItems} />
    </div>
  );
}
