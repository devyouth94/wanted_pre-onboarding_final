const TOKEN = "token";
const EMAIL = "email";

export const userStorage = {
  setToken: (token: string) => {
    localStorage.setItem(TOKEN, token);
  },

  setEmail: (email: string) => {
    localStorage.setItem(EMAIL, email);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN);
  },

  getEmail: () => {
    return localStorage.getItem(EMAIL);
  },

  clearToken: () => {
    localStorage.clear();
  },
};

Object.freeze(userStorage);
