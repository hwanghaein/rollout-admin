import PhotoDetailClient from "./photo-detail-client";
import { fetchPhotos } from "@/utils/fetchPhotos";
import PhotoDetailOthersClient from "./photo-detail-others-client";
import AuthenticatedRoute from "../../../../components/authenticated-route";

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;

  const photos = await fetchPhotos();
  const photo = photos.find((item) => item.id === id);

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    <AuthenticatedRoute>
      <div className="md:w-full md:max-w-[1100px] sm:max-w-[100px] mx-auto flex md:flex-row flex-col gap-10 justify-center px-4 md:px-7 dark:bg-gray-900">
        <div>
          <PhotoDetailClient photo={photo} />
        </div>

        <div className="flex flex-col justify-center ">
          <div className="text-left text-xl text-dark2 pb-2 border-b-2 border-dark3 dark:text-gray-200 dark:border-gray-400">
            Other Photos
          </div>
          <PhotoDetailOthersClient photos={photos} currentPhotoId={id} />
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
