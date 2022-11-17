import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "routes/path";
import { userStorage } from "utils/userStorage";

interface IProps {
  pathname: string;
}

const Nav = ({ pathname }: IProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      userStorage.clearToken();
      navigate(PATH.LOGIN);
    }
  };

  return (
    <nav className="row-span-3 bg-stone-800 p-8">
      <ul className="flex flex-col gap-3">
        <li
          className={pathname === "계좌 목록" ? "nav-list-selected" : "nav-list"}
          onClick={() => navigate(PATH.DASHBOARD)}
        >
          계좌 목록
        </li>

        {pathname === "계좌 상세" && <li className="nav-list-selected">계좌 상세</li>}

        <li
          className={pathname === "사용자 목록" ? "nav-list-selected" : "nav-list"}
          onClick={() => navigate(PATH.USER_LIST)}
        >
          사용자 목록
        </li>

        {pathname === "사용자 상세" && <li className="nav-list-selected">사용자 상세</li>}

        <li className="nav-list" onClick={handleLogout}>
          로그아웃
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
