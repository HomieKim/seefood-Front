import PostCard from "components/post/post-card";
import useGetLike from "hooks/use-get-like";
import React from "react";
import { useInView } from "react-intersection-observer";
import { NextPageWithLayout } from "types/common";

const LikePage: NextPageWithLayout = () => {
  const [ref, inView] = useInView();

  // 좋아요 게시물 벡엔드에서 받아옴
  const { likeList, readToLoad } = useGetLike({ inView });
  return (
    <div style={{ padding: "16px 0px", display: "grid", gap: 22 }}>
      {likeList &&
        likeList.map((v) => (
          <PostCard key={v.boardId} postData={v} showLike={false} />
        ))}
      <div ref={readToLoad ? ref : undefined} style={{ height: 10 }} />
    </div>
  );
};

LikePage.header = { title: "관심 식단" };

export default LikePage;
