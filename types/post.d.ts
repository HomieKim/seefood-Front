import { User } from "./user";

export type Post = {
  postId?: number;
  imageUrl: string;
  createdAt?: number | string;
  calories: Calorie[];
  user: User;
  likers: Partial<User>[];
  hashtags: Array<string>;
  category: "아침" | "점심" | "저녁";
};

type Calorie = {
  position: {
    x: number;
    y: number;
  };
  cal: number;
};

// 칼로리 주는 부분
type PostResponse = {
  boardId: number;
  createdAt: string;
  foodImageUrl: string;
  hashTag: Array<string>;
  username: string;
  isLike: boolean;
  category: "아침" | "점심" | "저녁";
  kcal: number;
};
type BoardResponse = {
  boardList: Array<PostResponse>;
  nowPage: number;
  isLast: boolean;
};

type Diet = {
  category: string;
  createdAt: string;
  foodImageUrl: string;
  kcal;
};
type DietResponse = {
  DietList: Array<Diet>;
  nowPage: number;
  isLast: boolean;
};
