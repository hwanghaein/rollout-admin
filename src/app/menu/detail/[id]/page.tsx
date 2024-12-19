import MenuDetailClient from "./menu-detail-client";
import fetchMenuItemById from "@/utils/fetchMenuItemById";
import AuthenticatedRoute from "../../../../components/authenticated-route";

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;

  const menuItem = await fetchMenuItemById(id);

  if (!menuItem) {
    return <div>Menu item not found</div>;
  }

  return (
    <AuthenticatedRoute>
      <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20 dark:bg-gray-900 dark:text-gray-200 ">
        <MenuDetailClient menuItem={menuItem} />
      </div>
    </AuthenticatedRoute>
  );
}
