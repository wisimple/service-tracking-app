import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import {
  DesktopOutlined,
  ToolOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import styles from "./dashboardlayout.module.scss";
import { Link, useRouteMatch } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Sider className={styles.sider}>
        <div className={styles.logo}>Logo</div>
        <Menu defaultSelectedKeys={["/"]} mode="inline" style={{ height: "100%" }}>
          <Menu.Item key="/" icon={<DesktopOutlined />}>
            <Link to={`${url}`}>Ana Ekran</Link>
          </Menu.Item>
          <Menu.Item key="/technical-service" icon={<ToolOutlined />}>
            <Link to={`${url}/technical-service`}>Teknik Servis</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<TeamOutlined />}>
            <Link to={`${url}/customers`}>Müşterilerim</Link>
          </Menu.Item>
          <Menu.Item key="/settings" icon={<SettingOutlined />}>
            <Link to={`${url}/settings`}>Ayarlar</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.content}>
        <Header className={styles.header}></Header>
        <Content>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <UserOutlined />
              <span>Teknik Servis</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
        <Footer className={styles.footer}>
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
