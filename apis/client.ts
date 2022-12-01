import { getCookie } from "cookies-next";
import axios from "axios";

const client = axios.create({
  baseURL: "http://13.124.122.113:8080/api",
  withCredentials: true,
});
const clientNotToken = axios.create({
  baseURL: "http://13.124.122.113:8080/api",
  withCredentials: true,
});

const requestNotToken = async ({
  method,
  url,
  params,
  body,
  header,
}: {
  method: "get" | "post" | "put" | "delete";
  url: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  params?: {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  body?: {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  header?: {};
}) => {
  try {
    const { data } = await clientNotToken({
      url: url,
      method: method,
      params: params,
      data: body,
      headers: header,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

const requestWithToken = async ({
  method,
  url,
  params,
  body,
  header,
}: {
  method: "get" | "post" | "put" | "delete";
  url: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  params?: {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  body?: {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  header?: {};
}) => {
  const token = getCookie("accessToken");
  try {
    if (token) {
      client.defaults.headers.common.Authorization = `${token}`;
    }
    const { data } = await client({
      url: url,
      method: method,
      params: params,
      data: body,
      headers: header,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const request = requestWithToken;
export const requestDefault = requestNotToken;
