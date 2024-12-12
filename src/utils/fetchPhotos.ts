import { getDocs, collection } from "firebase/firestore";
import fireStore from "../../firebase/firestore";

interface Photo {
  id: string;
  image: string;
  alt: string;
  date: string;
}


export async function fetchPhotos(): Promise<Photo[]> {
  try {
    const querySnapshot = await getDocs(collection(fireStore, "photos"));
    const photos: Photo[] = [];
    querySnapshot.forEach((doc) => {
      photos.push({ id: doc.id, ...doc.data() } as Photo);
    });
    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return []; 
  }
}
