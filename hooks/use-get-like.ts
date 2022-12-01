import { getLikeAPI } from "apis/like";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { BoardResponse } from "types/post";

interface Props {
  inView: boolean;
}

const useGetLike = ({ inView }: Props) => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<BoardResponse>(
    ["likeList"],
    ({ pageParam = 0 }) => getLikeAPI(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.isLast) return lastPage.nowPage + 1;
        return undefined;
      },
    }
  );
  const likeList = data?.pages
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
  return { likeList, isLoading, readToLoad };
};
export default useGetLike;
