import { useEffect } from "react";
import { getBoardAPI } from "apis/board";
import { useInfiniteQuery } from "react-query";
import { BoardResponse } from "types/post";
import { getCookie } from "cookies-next";

interface Props {
  inView: boolean;
}

const useGetBoard = ({ inView }: Props) => {
  const isLogin = getCookie("accessToken");
  const key = isLogin ? "boardList" : "List";
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<BoardResponse>(
    [key],
    ({ pageParam = 0 }) => getBoardAPI(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.isLast) return lastPage.nowPage + 1;
        return undefined;
      },
      staleTime: 0,
      refetchOnMount: true,
    }
  );
  const boardList = data?.pages
    .flat()
    .map((v) => v.boardList)
    .flat();
  const isEmpty = data?.pages[0]?.boardList.length === 0;
  const isReachingEnd =
    isEmpty || (data && data.pages[data.pages.length - 1]?.isLast === true);
  const hasMorePosts = !isEmpty && !isReachingEnd;
  const readToLoad = hasMorePosts && !isLoading;

  useEffect(() => {
    if (inView && readToLoad) {
      fetchNextPage();
    }
  }, [inView, readToLoad, fetchNextPage]);
  return { boardList, isLoading, readToLoad };
};

export default useGetBoard;
