import { BoardResponse } from "types/post";
import { request } from "./client";

type getLikeType = (pagePram: number) => Promise<BoardResponse>;
export const getLikeAPI: getLikeType = (pageParam) => {
  return request({
    method: "get",
    url: "/like/mylike",
    params: { page: pageParam },
  }).then((res) => {
    const { data } = res;
    return {
      boardList: data.boardList,
      nowPage: pageParam,
      isLast: !data.hasNextPage,
    };
  });
};

export const postLikeAPI = (id: number) => {
  return request({
    method: "post",
    url: "/like",
    params: { id: id },
  });
};

export const deleteLikeAPI = (id: number) => {
  return request({
    method: "delete",
    url: "/like/cancel",
    params: { id: id },
  });
};
