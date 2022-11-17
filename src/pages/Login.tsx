import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signAPI } from "apis/sign";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState(initialValue);

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signAPI.signin(loginInfo);
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data);
      }
    }
  };

  return (
    <section className="relative min-h-screen min-w-full bg-stone-100">
      <article className="absolute top-1/2 left-1/2 flex w-5/12 translate-y-[-50%] translate-x-[-50%] flex-col items-center gap-5 rounded-2xl bg-white p-5 shadow-xl">
        <label className="text-xl font-bold">로그인</label>
        <form className="flex w-full flex-col gap-5" onSubmit={handleOnSubmit}>
          <input
            className="rounded-xl border p-3"
            placeholder="아이디를 입력해주세요"
            type="text"
            name="email"
            value={loginInfo.email}
            onChange={handleOnchange}
          />
          <input
            className="rounded-xl border p-3"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleOnchange}
          />
          <button
            className="rounded-xl border p-3 text-slate-400 hover:bg-stone-400 hover:text-white"
            type="submit"
          >
            로그인
          </button>
        </form>
      </article>
    </section>
  );
};

export default Login;
