"use client";

import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebasedb"; // Storage 가져오기
import { doc, updateDoc } from "firebase/firestore"; // Firestore 가져오기
import fireStore from "../../../firebase/firestore"; // Firestore 인스턴스 가져오기
import Image from "next/image";

type ImageData = {
  name: string;
  src: string;
};

export default function Page() {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [fileName, setFileName] = useState(""); // 사용자 입력 파일 이름
  const [message, setMessage] = useState(""); // 사용자에게 피드백 메시지

  useEffect(() => {
    const fetchImageData = async () => {
      const storageRef = ref(storage, "photo-img"); // Firebase Storage의 폴더 경로 설정
      try {
        const result = await listAll(storageRef); // 폴더 내 파일 목록 가져오기
        const dataPromises = result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef); // 다운로드 URL 가져오기
          return { name: itemRef.name, src: url }; // 객체로 반환
        });

        const data = await Promise.all(dataPromises); // 모든 비동기 처리 완료
        setImageData(data); // 상태에 저장
      } catch (error) {
        console.error("Failed to fetch image data:", error);
      }
    };

    fetchImageData();
  }, []);

  // Firestore에 이미지를 image 필드로 추가
  const addToFirestore = async (imageName: string) => {
    try {
      const image = imageData.find((img) => img.name === imageName); // 이미지 이름으로 해당 이미지 찾기
      if (!image) {
        setMessage("Image not found! Please check the file name.");
        return;
      }

      const docRef = doc(fireStore, "photos", "8"); // 문서 경로 설정

      // Firestore의 image 필드에 이미지 URL 추가
      await updateDoc(docRef, {
        image: image.src, // image 필드에 URL 추가
      });

      setMessage("Image added to Firestore successfully!");
      console.log("Image added to Firestore:", image.src);
    } catch (error) {
      setMessage("Failed to add image to Firestore.");
      console.error("Failed to add image to Firestore:", error);
    }
  };

  // 파일 이름 입력 핸들러
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  return (
    <div>
      <h1>Enter Image File Name</h1>
      <input
        type="text"
        value={fileName}
        onChange={handleFileNameChange}
        placeholder="Enter image file name"
      />
      <button onClick={() => addToFirestore(fileName)} style={{ marginTop: "20px" }}>
        Add Image to Firestore
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}


// "use client";

// import { useState, useEffect } from "react";
// import { ref, listAll, getDownloadURL } from "firebase/storage";
// import { storage } from "../../../firebase/firebasedb"; // Storage 가져오기
// import { doc, updateDoc, arrayUnion } from "firebase/firestore"; // Firestore 가져오기
// import fireStore from "../../../firebase/firestore"; // Firestore 인스턴스 가져오기
// import Image from "next/image";

// type ImageData = {
//   name: string;
//   src: string;
// };

// export default function Page() {
//   const [imageData, setImageData] = useState<ImageData[]>([]);
//   const [fileName, setFileName] = useState(""); // 사용자 입력 파일 이름
//   const [message, setMessage] = useState(""); // 사용자에게 피드백 메시지

//   useEffect(() => {
//     const fetchImageData = async () => {
//       const storageRef = ref(storage, "menu-items-img"); // Firebase Storage의 폴더 경로 설정
//       try {
//         const result = await listAll(storageRef); // 폴더 내 파일 목록 가져오기
//         const dataPromises = result.items.map(async (itemRef) => {
//           const url = await getDownloadURL(itemRef); // 다운로드 URL 가져오기
//           return { name: itemRef.name, src: url }; // 객체로 반환
//         });

//         const data = await Promise.all(dataPromises); // 모든 비동기 처리 완료
//         setImageData(data); // 상태에 저장
//       } catch (error) {
//         console.error("Failed to fetch image data:", error);
//       }
//     };

//     fetchImageData();
//   }, []);

//   // Firestore에 이미지 추가 (URL만 추가)
//   const addToFirestore = async (imageName: string) => {
//     try {
//       const image = imageData.find((img) => img.name === imageName); // 이미지 이름으로 해당 이미지 찾기
//       if (!image) {
//         setMessage("Image not found! Please check the file name.");
//         return;
//       }

//       const docRef = doc(fireStore, "menuItems", "9"); // 문서 경로 설정

//       // Firestore의 images 배열에 이미지 URL만 추가
//       await updateDoc(docRef, {
//         images: arrayUnion(image.src), // 이미지 URL을 배열에 추가
//       });

//       setMessage("Image added to Firestore successfully!");
//       console.log("Image added to Firestore:", image.src);
//     } catch (error) {
//       setMessage("Failed to add image to Firestore.");
//       console.error("Failed to add image to Firestore:", error);
//     }
//   };

//   // 파일 이름 입력 핸들러
//   const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFileName(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Enter Image File Name</h1>
//       <input
//         type="text"
//         value={fileName}
//         onChange={handleFileNameChange}
//         placeholder="Enter image file name"
//       />
//       <button onClick={() => addToFirestore(fileName)} style={{ marginTop: "20px" }}>
//         Add Image to Firestore
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
