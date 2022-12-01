import React, { useState, useCallback, MouseEvent, useEffect } from "react";
import SearchBar from "components/custom/search";
import useInput from "hooks/use-input";
import { NextPageWithLayout } from "types/common";
import styles from "styles/upload/search.module.scss";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { foodSearchAtom, selectedFoodAtom } from "recoils/food-search";
import useFoodSearch from "hooks/use-food-search";
import { useRouter } from "next/router";

const FoodSearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [search, onChangeSearch, setSearch] = useInput("");
  const [selectedFood, setSelectedFood] = useRecoilState(selectedFoodAtom);
  const [query, setQuery] = useState("");
  const { data } = useFoodSearch({
    queryString: query,
    setQueryString: setQuery,
  });
  const result = useRecoilValue(foodSearchAtom);
  const foodSearchInit = useResetRecoilState(foodSearchAtom);
  useEffect(() => {
    foodSearchInit();
  }, []);

  const onClickHandler = useCallback(
    (e: MouseEvent<HTMLUListElement>) => {
      if ((e.target as HTMLElement).tagName == "UL") return;
      if (selectedFood.find((el) => el === (e.target as HTMLElement).innerText))
        return;
      setSelectedFood([...selectedFood, (e.target as HTMLElement).innerText]);
    },
    [selectedFood]
  );

  return (
    <div className={styles.container}>
      <SearchBar
        value={search}
        changeHandler={onChangeSearch}
        placeHolder="업로드 할 음식을 검색해주세요"
        searchHandler={() => {
          setQuery(search);
          setSearch("");
        }}
      />
      <section className={styles.selectedList}>
        {result.length === 0 ? (
          <div className={styles.noResult}>
            <h3>검색 결과가 없습니다.</h3>
          </div>
        ) : (
          <ul className={styles.list} onClick={onClickHandler}>
            {result.map((v) => (
              <li
                key={v}
                className={
                  selectedFood.find((el) => el === v) ? styles.active : ""
                }
              >
                {v}
              </li>
            ))}
          </ul>
        )}
      </section>
      <button
        className={styles.button}
        disabled={selectedFood.length === 0}
        onClick={() => router.back()}
      >
        선택 완료
      </button>
    </div>
  );
};
FoodSearchPage.noNav = true;
FoodSearchPage.header = {
  noProfile: true,
  title: "음식 찾기",
};
export default FoodSearchPage;
