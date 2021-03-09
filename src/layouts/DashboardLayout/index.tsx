import { Breadcrumb, Layout, Menu } from "antd";
import React, { useLayoutEffect, useState } from "react";
import {
  DesktopOutlined,
  ToolOutlined,
  SettingOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import styles from "./dashLayout.module.scss";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser } from "store/user/actions";

const { Header, Footer, Sider, Content } = Layout;

const getPathName = (pathName: string) => {
  if (pathName.length === 24) {
    return "Detay";
  }
  switch (pathName) {
    case "":
      return "Ana Ekran";
    case "technical-services":
      return "Teknik Servis";
    case "customers":
      return "Müşterilerim";
    case "create":
      return "Yeni";
    default:
      return "hello";
  }
};

const BreadCrumbComponent = () => {
  const { pathname } = useLocation();
  const items = pathname.replace(/\/dashboard/g, "").split("/");

  return (
    <Breadcrumb style={{ paddingBottom: 16 }}>
      {items.map((i) => (
        <Breadcrumb.Item key={i}> {getPathName(i)}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  return (
    <Layout>
      <Sider
        collapsedWidth="0"
        breakpoint="lg"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        theme="light"
      >
        <div className={styles.logo}>Logo</div>
        <Menu defaultSelectedKeys={["/"]} mode="inline">
          <Menu.Item key="/" icon={<DesktopOutlined />}>
            <Link to={`${url}`}>Ana Ekran</Link>
          </Menu.Item>
          <Menu.Item key="/technical-services" icon={<ToolOutlined />}>
            <Link to={`${url}/technical-services`}>Teknik Servis</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<TeamOutlined />}>
            <Link to={`${url}/customers`}>Müşterilerim</Link>
          </Menu.Item>
          <Menu.Item key="/settings" icon={<SettingOutlined />}>
            <Link to={`${url}/settings`}>Ayarlar</Link>
          </Menu.Item>
          <Menu.Item key="signout" icon={<LogoutOutlined />} onClick={() => dispatch(signoutUser())}>
            Çıkış Yap
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100vh", marginLeft: 200 }}>
        <Header></Header>
        <Content style={{ padding: 16 }}>
          <BreadCrumbComponent />
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Teknik Servis Yazilimi 2021{" "}
          <a href="https://arifsamisahin.github.io/" target="_blank" rel="noopener noreferrer">
            Arif Sami
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
