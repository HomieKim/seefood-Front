import React from "react";
import SearchBar from "components/custom/search";
import UploadButton from "components/custom/upload-button";
import PostList from "components/post";
import { getCookie } from "cookies-next";
import useGetBoard from "hooks/use-get-board";
import { useInView } from "react-intersection-observer";
import { NextPageWithLayout } from "types/common";
import useUserId from "hooks/use-user-id";
import { useRouter } from "next/router";
import useInput from "hooks/use-input";
import useUserDetail from "hooks/use-user-detail";

const MainPage: NextPageWithLayout = () => {
  const isLogin = getCookie("accessToken");
  const [ref, inView] = useInView();
  const router = useRouter();
  const { userId } = useUserId();
  const { data } = useUserDetail({ id: userId });
  const [searchValue, onChangeSerachValue] = useInput("");
  const { boardList, isLoading, readToLoad } = useGetBoard({
    inView,
  });
  if (isLoading) return null;
  return (
    <>
      <SearchBar
        value={searchValue}
        changeHandler={onChangeSerachValue}
        searchHandler={() => router.push(`/search/${searchValue}`)}
        placeHolder="#해쉬태그로 검색해 보세요"
      />
      <div style={{ paddingTop: 60 }}>
        {boardList && <PostList data={boardList} />}
        <div ref={readToLoad ? ref : undefined} style={{ height: 10 }} />
        {isLogin && <UploadButton />}
      </div>
    </>
  );
};

MainPage.header = true;
MainPage.back = {
  has: false,
  color: "",
};
// const isLogin = getCookie("accessToken");

// export const getStaticProps = async () => {
//   if (!isLogin) {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchInfiniteQuery("boardList", () => getBoardAPI(0));
//     return {
//       props: {
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//       },
//     };
//   }
//   return {};
// };

export default MainPage;
