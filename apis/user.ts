import { UserResponse } from "types/user";
import { request, requestDefault } from "./client";

export const signUpAPI = (userData: {
  email: string;
  password: string;
  username: string;
  height: number;
  weight: number;
}) => {
  return requestDefault({
    method: "post",
    url: "/users/signup",
    body: userData,
  });
};

export const signInAPI = (loginData: { email: string; password: string }) => {
  return requestDefault({
    method: "post",
    url: "/users/signin",
    body: loginData,
  });
};

type userDetailType = ({ id }: { id: number }) => Promise<UserResponse>;
export const userDetailAPI: userDetailType = ({ id }) => {
  return request({
    method: "get",
    url: "/users/detailInfo",
    params: {
      userId: id,
    },
  }).then((res) => {
    return res.data;
  });
};
