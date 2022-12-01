import { getCookie } from "cookies-next";
import { BoardResponse, PostResponse } from "types/post";
import { request, requestDefault } from "./client";

type getBoardType = (pageParam: number) => Promise<BoardResponse>;

export const getBoardAPI: getBoardType = (pageParam) => {
  const isLogin = getCookie("accessToken");
  let instance;
  if (isLogin) {
    instance = request;
  } else {
    instance = requestDefault;
  }
  return instance({
    method: "get",
    url: "/board",
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

export const postBoardAPI = (data: FormData) => {
  return request({
    method: "post",
    url: "/board/upload",
    body: data,
    header: {
      "content-type": "multipart/form-data",
    },
  });
};
