import React from "react";
import IndexRouter from "./router/IndexRouter";

// styles
import "./index.scss";
import "./styles/scroll.scss";
import "./styles/antdStyles.scss";

// antd全局配置
import { ConfigProvider, App as AntdApp } from "antd";
import zhCN from "antd/locale/zh_CN";

// redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ minimum: 0.2, easing: "ease", speed: 500 });

// antd的日期和日历插件
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

function App() {
  const themeStyle = {
    colorPrimary: "#7C68FB",
    borderRadius: 4,
  };

  return (
    <ConfigProvider theme={{ token: themeStyle }} locale={zhCN}>
      <Provider store={store}>
        <AntdApp>
          <IndexRouter />
        </AntdApp>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
