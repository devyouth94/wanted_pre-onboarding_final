import axios from "axios";
import { userStorage } from "utils/userStorage";

interface ILoginInfo {
  email: string;
  password: string;
}

export const signAPI = {
  signin: async (loginInfo: ILoginInfo) => {
    const { data } = await axios.post("/login", loginInfo);
    userStorage.setToken(data.accessToken);
    userStorage.setEmail(data.user.email);
  },
};

Object.freeze(signAPI);
