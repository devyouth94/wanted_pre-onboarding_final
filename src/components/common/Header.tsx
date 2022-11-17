import React from "react";
import { userStorage } from "utils/userStorage";

interface IProps {
  pathname: string;
}

const Header = ({ pathname }: IProps) => {
  return (
    <header className="flex items-center justify-between px-5">
      <span className="text-xl font-bold">{pathname}</span>
      <span>
        <span className="mr-1 font-bold">{userStorage.getEmail()}</span>님 환영합니다
      </span>
    </header>
  );
};

export default Header;
