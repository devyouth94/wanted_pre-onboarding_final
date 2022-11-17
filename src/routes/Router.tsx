import React from "react";
import { Route, Routes } from "react-router-dom";
import { PATH } from "routes/path";
import ProtectedRoute from "routes/ProtectedRoute";

import Dashboard from "pages/Dashboard";
import AccountList from "components/feature/accountList/AccountList";
import AccountInfo from "components/feature/accountInfo/AccountInfo";
import UserList from "components/feature/userList/UserList";
import UserInfo from "components/feature/userInfo/UserInfo";
import Login from "pages/Login";

const Router = () => {
  return (
    <Routes>
      <Route
        path={PATH.DASHBOARD}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<AccountList />} />
        <Route path={PATH.ACCOUNT_INFO} element={<AccountInfo />} />
        <Route path={PATH.USER_LIST} element={<UserList />} />
        <Route path={PATH.USER_INFO} element={<UserInfo />} />
      </Route>

      <Route path={PATH.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default Router;
