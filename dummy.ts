import { Post } from "types/post";
import { RankUser, User } from "types/user";

export const dummyUser: User = {
  id: 1,
  email: "test@naver.com",
  nickname: "testUser",
  profileURL: null,
  recomanded: 1000,
  likePost: [{ id: 1 }, { id: 2 }, { id: 3 }],
  myUpload: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
  height: 170,
  weight: 50,
};

export const singlePost: Post = {
  imageUrl: "/food.png",
  user: dummyUser,
  calories: [
    {
      cal: 300,
      position: {
        x: 90,
        y: 50,
      },
    },
    {
      cal: 500,
      position: {
        x: 150,
        y: 150,
      },
    },
    {
      cal: 500,
      position: {
        x: 220,
        y: 60,
      },
    },
  ],
  likers: [],
  hashtags: ["건강식단", "아침식사", "비건"],
  createdAt: "3일전",
  category: "아침",
};

export const rankList: RankUser[] = [
  {
    id: 1,
    profileURL: null,
    nickname: "사용자1",
    total: 300,
  },
  {
    id: 2,
    profileURL: null,
    nickname: "사용자2",
    total: 1300,
  },
  {
    id: 3,
    profileURL: null,
    nickname: "사용자3",
    total: 300,
  },
  {
    id: 4,
    profileURL: null,
    nickname: "사용자4",
    total: 300,
  },
  {
    id: 5,
    profileURL: null,
    nickname: "사용자5",
    total: 300,
  },
];
