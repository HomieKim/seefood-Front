import React from "react";
import styles from "styles/post/post.module.scss";
import { PostResponse } from "types/post";
import PostCard from "./post-card";

interface Props {
  data: Array<PostResponse>;
}

const PostList = ({ data }: Props) => {
  return (
    <div className={styles.wrapper}>
      {data.map((v, i) => (
        <PostCard key={i} postData={v} />
      ))}
    </div>
  );
};

export default PostList;
