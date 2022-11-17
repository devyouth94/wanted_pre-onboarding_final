import axios from "axios";
import { userStorage } from "utils/userStorage";

type IArgument = {
  page: number;
  query: string;
};

export const userAPI = {
  getUserAll: async () => {
    const { data } = await axios.get("/users", {
      headers: { Authorization: `Bearer ${userStorage.getToken()}` },
    });
    return data;
  },

  getSettingAll: async () => {
    const { data } = await axios.get("/userSetting", {
      headers: { Authorization: `Bearer ${userStorage.getToken()}` },
    });
    return data;
  },

  getUserList: async ({ page, query }: IArgument) => {
    const { data } = await axios.get("/users", {
      params: { _page: page, _limit: 20, q: query },
      headers: { Authorization: `Bearer ${userStorage.getToken()}` },
    });
    return data;
  },

  getUserInfo: async (userId: number) => {
    const { data } = await axios.get("/users", {
      params: { id: userId },
      headers: { Authorization: `Bearer ${userStorage.getToken()}` },
    });
    return data;
  },
};
