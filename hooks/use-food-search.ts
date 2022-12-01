import { foodSearchAtom } from "./../recoils/food-search";
import { useSetRecoilState } from "recoil";
import { searchFoodAPI } from "apis/upload";
import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";

interface Props {
  queryString: string;
  setQueryString: Dispatch<SetStateAction<string>>;
}

const useFoodSearch = ({ queryString, setQueryString }: Props) => {
  const setQuery = useSetRecoilState(foodSearchAtom);

  const { data } = useQuery<Array<string>>(
    ["foodSearch", queryString],
    () => searchFoodAPI(queryString),
    {
      enabled: queryString !== "",
      onSuccess: (res) => {
        setQuery(res);
        setQueryString("");
      },
    }
  );
  return { data };
};

export default useFoodSearch;
