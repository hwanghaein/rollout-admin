import { fetchPhotos } from "../../utils/fetchPhotos";
import PhotoGalleryClient from "./photo-gallery-client";
import AuthenticatedRoute from "../../components/authenticated-route";

interface Photo {
  id: string;
  image: string;
  alt: string;
  date: string;
}

export default async function Page() {
  const photos: Photo[] = await fetchPhotos();

  return (
    <AuthenticatedRoute>
      <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20 dark:bg-gray-900 ">
        <span className="text-dark2 text-xl mb-10 dark:text-gray-200">PHOTO GALLERY</span>
        <PhotoGalleryClient photos={photos} />
      </div>
    </AuthenticatedRoute>
  );
}
