import axios from "axios";
import { userStorage } from "utils/userStorage";

type IArgument = {
  page: number;
  query: string;
};

export const accountAPI = {
  getAccountAll: async () => {
    const { data } = await axios.get("/accounts", {
      headers: { Authorization: `Bearer ${userStorage.getToken()}` },
    });
    return data;
  },

  getAccountList: async ({ page, query }: IArgument) => {
    const { data } = await axios.get("/accounts", {
      params: { _page: page, _limit: 20, q: query },
      headers: { Authorization: `Bearer ${userStorage.getToken()}` },
    });
    return data;
  },

  getAccountInfo: async (uuid: string) => {
    const { data } = await axios.get("/accounts", {
      params: { uuid },
      headers: { Authorization: `Bearer ${userStorage.getToken()}` },
    });
    return data;
  },
};

Object.freeze(accountAPI);
