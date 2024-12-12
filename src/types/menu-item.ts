export type FilterKeys = "all" | "signature" | "coffee" | "drip" | "drink" | "sweetTea" | "tea" | "dessert";

export interface MenuItem {
  id: string;
  images: string[];  // 이미지 경로
  alt: string;       // 이미지 alt 텍스트
  name: string;      // 메뉴 이름
  category: string;  // 카테고리
  engName: string;   // 메뉴 영어 이름
  description: string; // 메뉴 설명
  tip: string;       // 메뉴 팁
  temperature: "hot" | "ice" | "both" | "none"; // 온도 (핫/아이스/둘다/없음)
}

export interface Filters {
  [key: string]: boolean;
}
