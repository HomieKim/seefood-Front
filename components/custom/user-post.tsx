import Image from "next/image";
import React from "react";
import { Diet } from "types/post";
interface Props {
  userPost: Array<Diet>;
}
const CustomUserPost = ({ userPost }: Props) => {
  return (
    <>
      {userPost?.map((v, i) => (
        <Image
          key={i}
          src={v.foodImageUrl}
          width={130}
          height={100}
          alt="post"
        />
      ))}
    </>
  );
};

export default CustomUserPost;
