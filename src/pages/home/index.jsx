import React, { useState, useEffect } from "react";
import { NavBar, Space, Toast, Button, Collapse, List } from "antd-mobile";
import { SearchOutline, MoreOutline, CloseOutline } from "antd-mobile-icons";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import "./index.less";
import { list as listAry } from "../../api/public";
import moment from "moment";

function Home() {
  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async () => {
    let { data, success } = await listAry();
    setPageData(data);
  };

  const logout = () => {
    navigate("login", { replace: true });
    localStorage.clear();
  };

  const right = (
    <div style={{ fontSize: 24 }}>
      <Button color="primary" fill="none" onClick={logout}>
        退出登录
      </Button>
    </div>
  );

  const back = () => navigate(-1, { replace: true });

  const gotoStation = (id, name) => {
    navigate({
      pathname: "/station",
      search: `?id=${id}&name=${name}`,
    });
  };

  return (
    <div className="home-wrap">
      <NavBar right={right} back={null}>
        {user?.name}
      </NavBar>
      <div className="main">
        <Collapse defaultActiveKey={["0"]}>
          {pageData.map((item, idx) => (
            <Collapse.Panel key={idx} title={item.city}>
              <div className="list">
                {item.stationCheckList.map((jtem) => (
                  <p
                    className="list-item"
                    key={jtem.id}
                    onClick={() => gotoStation(jtem.id, jtem?.name)}
                  >
                    <span>{jtem?.name}</span>
                    <span>
                      {jtem.lastCheckDay
                        ? `检查时间:${moment(jtem.lastCheckDay).format(
                            "YYYY-MM-DD"
                          )}`
                        : "无检查记录"}
                    </span>
                  </p>
                ))}
              </div>

              {/* <List header={null}>
                {item.stationCheckList.map((jtem) => (
                  <List.Item
                    arrow={null}
                    key={jtem.id}
                    extra={
                      jtem.lastCheckDay
                        ? `检查时间:${moment(jtem.lastCheckDay).format(
                            "YYYY-MM-DD"
                          )}`
                        : ""
                    }
                    onClick={() => gotoStation(jtem.id, jtem?.name)}
                  >
                    {jtem?.name}
                  </List.Item>
                ))}
              </List> */}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}

export default Home;
