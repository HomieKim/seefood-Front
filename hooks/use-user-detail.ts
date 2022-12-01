import { UserResponse } from "types/user";
import React from "react";
import { useQuery } from "react-query";
import { userDetailAPI } from "apis/user";

interface Props {
  id: number;
}

const useUserDetail = ({ id }: Props) => {
  const { data, isLoading } = useQuery<UserResponse>(
    ["user", id],
    () => userDetailAPI({ id }),
    {
      enabled: id >= 0,
      onSuccess: (res) => {
        localStorage.setItem("username", res.username as string);
      },
    }
  );
  return { data, isLoading };
};

export default useUserDetail;
