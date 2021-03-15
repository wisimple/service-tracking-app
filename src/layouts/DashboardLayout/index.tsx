import { Breadcrumb, Layout, Menu } from "antd";
import { grey } from "@ant-design/colors";
import React from "react";
import {
  DesktopOutlined,
  ToolOutlined,
  SettingOutlined,
  TeamOutlined,
  LogoutOutlined,
  BarcodeOutlined,
  ClusterOutlined,
} from "@ant-design/icons";

import styles from "./dashLayout.module.scss";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser } from "store/user/actions";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

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
    case "inventory":
      return "Stoktaki Ürünler";
    case "showcase":
      return "Vitrindeki Ürünler";
    case "categories":
      return "Kategorilerim";
    case "brands":
      return "Markalarım";
    case "products":
      return "Ürünlerim";
    case "settings":
      return "Ayarlar";
    case "create":
      return "Ekle";
    default:
      return "hello";
  }
};

const BreadCrumbComponent = () => {
  const { pathname } = useLocation();
  const items = pathname.replace(/\/dashboard/g, "").split("/");

  return (
    <Breadcrumb style={{ paddingBottom: 16 }} className="hide-on-print">
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
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  return (
    <Layout>
      <Sider collapsedWidth="0" breakpoint="lg" className="hide-on-print">
        <div className={styles.logo}>Logo </div>
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
          <Menu.Item key={`${url}`} icon={<DesktopOutlined />}>
            <Link to={`${url}`}>Ana Ekran</Link>
          </Menu.Item>
          <Menu.Item key={`${url}/technical-services`} icon={<ToolOutlined />}>
            <Link to={`${url}/technical-services`}>Teknik Servis</Link>
          </Menu.Item>
          <Menu.Item key={`${url}/customers`} icon={<TeamOutlined />}>
            <Link to={`${url}/customers`}>Müşterilerim</Link>
          </Menu.Item>

          <SubMenu
            key="1"
            icon={<BarcodeOutlined />}
            title={
              <Link to={`${url}/inventory`} style={{ color: grey[0] }}>
                Stok ve Vitrin
              </Link>
            }
          >
            <Menu.Item key={`${url}/inventory`}>
              <Link to={`${url}/inventory`}>Stoktaki Ürünler</Link>
            </Menu.Item>
            <Menu.Item key={`${url}/showcase`}>
              <Link to={`${url}/showcase`}>Vitrinim</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="2"
            icon={<ClusterOutlined />}
            title={
              <Link to={`${url}/categories`} style={{ color: grey[0] }}>
                Tanımlamalar
              </Link>
            }
          >
            <Menu.Item key={`${url}/categories`}>
              <Link to={`${url}/categories`}>Kategorilerim</Link>
            </Menu.Item>
            <Menu.Item key={`${url}/brands`}>
              <Link to={`${url}/brands`}>Markalarım</Link>
            </Menu.Item>
            <Menu.Item key={`${url}/products`}>
              <Link to={`${url}/products`}>Ürünlerim</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key={`${url}/settings`} icon={<SettingOutlined />}>
            <Link to={`${url}/settings`}>Ayarlar</Link>
          </Menu.Item>
          <Menu.Item key="signout" icon={<LogoutOutlined />} onClick={() => dispatch(signoutUser())}>
            Çıkış Yap
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="hide-on-print"></Header>
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
