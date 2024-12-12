import { fetchPhotos } from "../../utils/fetchPhotos";
import PhotoGalleryClient from "./photo-gallery-client";

interface Photo {
  id: string;
  image: string;
  alt: string;
  date: string;
}


export default async function Page() {
  const photos: Photo[] = await fetchPhotos();

  return (
    <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
      <span className="text-dark2 text-3xl mb-10">PHOTO GALLERY</span>
      <PhotoGalleryClient photos={photos} />
    </div>
  );
}
