"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Photo {
  id: string;
  image: string;
  alt: string;
  date: string;
}

interface PhotoGalleryClientProps {
  photos: Photo[];
  currentPhotoId: string;
}

export default function PhotoDetailOthersClient({
  photos,
  currentPhotoId,
}: PhotoGalleryClientProps) {
  const [otherPhotos, setOtherPhotos] = useState<Photo[]>([]);
  const router = useRouter();

  const handlePhotoClick = (id: string) => {
    router.push(`/photo-gallery/detail/${id}`);
  };

  useEffect(() => {
    const filteredPhotos = photos.filter(
      (photo) => photo.id !== currentPhotoId
    );
    setOtherPhotos(filteredPhotos.slice(0, 6));
  }, [photos, currentPhotoId]);

  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <div className="grid grid-cols-2 gap-2">
        {otherPhotos.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handlePhotoClick(item.id)}
          >
            <div className="overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                width={150}
                height={150}
                className="object-cover transform transition-transform duration-500 hover:scale-110"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zY2hlbWFzL3YyIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiPjxwYXRoIGQ9Ik0gMCAwIFogTCAwIDE1MCAwIDE1MCAxNTAiIHN0eWxlPSJmaWxsOm5vbmU7IiBzdHJva2U9IiMyYjNjYmEiIHN0cm9rZS13aWR0aD0iMSIgLz48L3N2Zz4=" // 회색톤 대체 이미지
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
