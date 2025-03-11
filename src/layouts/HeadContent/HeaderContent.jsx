import React from "react";
import { Dropdown, Layout } from "antd";
import { useHistory } from "react-router-dom";
import { removeToken } from "@/utils/handleToken";
import NProgress from "nprogress";

const { Header } = Layout;

function HeaderContent() {
  const history = useHistory();

  const logout = () => {
    removeToken();

    Jump("/login");
  };
  //带进度跳转
  const Jump = (url) => {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
      history.push(url);
    }, 1000);
  };

  const userInfoList = {
    items: [
      {
        key: "1",
        danger: true,
        label: <span>退出登录</span>,
        onClick: logout,
      },
    ],
  };

  return (
    <Header style={{ backgroundColor: "white", padding: "0 36px" }}>
      <div className="headerBox">
        <Dropdown menu={userInfoList} placement="bottom">
          <div className="userInfo">
            <img
              src="https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236"
              alt=""
            />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}

export default HeaderContent;
