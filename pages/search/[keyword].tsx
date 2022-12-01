import { useRouter } from "next/router";
import React from "react";
import { NextPageWithLayout } from "types/common";

const SearchResultPage: NextPageWithLayout = () => {
  const router = useRouter();
  const path = router.pathname;
  return <div>sdf</div>;
};

SearchResultPage.noNav = true;
SearchResultPage.header = {
  title: "search",
  noProfile: true,
};
export default SearchResultPage;
