import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "components/common/Header";
import Nav from "components/common/Nav";
import Layout from "components/common/Layout";
import Footer from "components/common/Footer";

import { path } from "utils/func";

const Dashboard = () => {
  const { pathname } = useLocation();

  return (
    <div className="grid h-screen grid-cols-[300px_auto] grid-rows-[70px_auto_60px]">
      <Nav pathname={path(pathname)} />

      <Header pathname={path(pathname)} />

      <Layout>
        <Outlet />
      </Layout>

      <Footer />
    </div>
  );
};

export default Dashboard;
