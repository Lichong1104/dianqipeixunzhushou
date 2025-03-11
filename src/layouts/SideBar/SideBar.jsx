import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { Menu, Layout, ConfigProvider, Tooltip } from "antd";
import { sideBarList } from "./sideBarData";
import { extractValueFromPath } from "../../utils/tools";
import { useSelector, useDispatch } from "react-redux";

const { Sider } = Layout;

function SideBar() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  //要展开的侧边栏
  const rootSubmenuKeys = sideBarList.filter((v) => v.children).map((v) => v.key);

  const [openKeys, setOpenKeys] = useState([]);
  const collapsed = useSelector((state) => state.sideBarCollapsed.collapsed);

  //手风琴
  const onOpenChange = (keys) => {
    console.log(keys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const firstSegment = extractValueFromPath(location.pathname);
    const shouldOpenKey = rootSubmenuKeys.includes(firstSegment) ? [firstSegment] : [];
    setOpenKeys(shouldOpenKey);
  }, [location.pathname]);

  // 菜单样式
  const menuStyle = {};

  return (
    <Sider
      className="sideBarBox"
      width="250px"
      theme="light"
      style={{ backgroundColor: "white" }}
      collapsed={collapsed}
      breakpoint="xl"
      collapsedWidth="50px"
      onBreakpoint={(broken) => dispatch({ type: broken ? "COLLAPSED/TRUE" : "COLLAPSED/FALSE" })}
    >
      <div className="logo">{collapsed ? "" : <h1 className="title">标题</h1>}</div>
      <ConfigProvider theme={{ components: { Menu: menuStyle } }}>
        <Menu
          mode="inline"
          theme="light"
          className="sideBarMenu"
          selectedKeys={[location.pathname]}
          items={sideBarList}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(v) => {
            history.push(v.key);
          }}
        />
      </ConfigProvider>
      <div
        className="collapsed"
        onClick={() => dispatch({ type: collapsed ? "COLLAPSED/FALSE" : "COLLAPSED/TRUE" })}
      >
        {collapsed ? (
          <Tooltip title="展开">
            <MenuUnfoldOutlined />
          </Tooltip>
        ) : (
          <Tooltip title="收起">
            <MenuFoldOutlined />
          </Tooltip>
        )}
      </div>
    </Sider>
  );
}

export default SideBar;
