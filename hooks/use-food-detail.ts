import React, { useEffect } from "react";
import { getFoodDetailAPI } from "./../apis/food";
import { DietResponse } from "types/post";
import { useInfiniteQuery } from "react-query";
interface Props {
  inView: boolean;
  id: number;
}
const useFoodDetail = ({ inView, id }: Props) => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<DietResponse>(
    ["dietList"],
    ({ pageParam = 0 }) => getFoodDetailAPI({ id, page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.nowPage + 1;
        return undefined;
      },
    }
  );
  const dietList = data?.pages
    .flat()
    .map((v) => v.DietList)
    .flat();
  const isEmpty = data?.pages[0]?.DietList.length === 0;
  const isReachingEnd =
    isEmpty || (data && data.pages[data.pages.length - 1]?.isLast === true);
  const hasMorePosts = !isEmpty && !isReachingEnd;
  const readToLoad = hasMorePosts && !isLoading;

  useEffect(() => {
    if (inView && readToLoad) {
      fetchNextPage();
    }
  }, [inView, readToLoad, fetchNextPage]);
  return { dietList, isLoading, readToLoad };
};
export default useFoodDetail;
