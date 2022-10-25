import React, { useEffect, useState } from "react";
import MyList from "@Components/MyList";
import {
  NavBar,
  Space,
  Toast,
  Picker,
  DatePicker,
  DotLoading,
  Empty,
  InfiniteScroll,
} from "antd-mobile";
import {
  SearchOutline,
  MoreOutline,
  CloseOutline,
  AddOutline,
} from "antd-mobile-icons";
import "./index.less";
import {
  NavLink,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import moment from "moment";
import { historylist, validator } from "../../api/public";

function Station() {
  const [datePickerVis, setDatePickerVis] = useState(false);
  const [date, setDate] = useState(new Date());
  const [pageData, setPageData] = useState([]);
  const [pageMsg, setPagemsg] = useState({
    start_page: 1,
    limit: 10,
  });
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    getPageData();
  }, []);

  let stationId = Number(new URLSearchParams(useLocation().search).get("id"));
  let stationName = new URLSearchParams(useLocation().search).get("name");
  let navigate = useNavigate();
  const back = () => navigate(-1, { replace: true });
  const getPageData = async () => {
    let { data, success, additional_data } = await historylist({
      stationId,
      ...pageMsg,
    });
    let total = additional_data.total;
    if (total > 10) {
      setHasMore(true);
    }
    setPageData(data);
  };
  const gotoCheckPage = (id) => {
    navigate({
      pathname: "/check",
      search: `?id=${id}&name=${stationName}`,
    });
  };
  const addCheckHistiory = () => {
    setDatePickerVis(true);
  };
  const confirmChoseDate = async (v) => {
    setDate(v);
    let { success, message } = await validator({
      stationId,
      checkDate: moment(v).format("YYYYMMDD"),
    });
    if (success) {
      Toast.show({
        icon: "success",
        content: "新建成功",
      });
      getPageData();
    } else {
      Toast.show({
        icon: "fail",
        content: message,
      });
    }
  };

  const loadMore = async () => {
    let params = {
      start_page: pageMsg.start_page + 1,
      limit: 10,
    };
    const { data, additional_data } = await historylist({
      stationId,
      ...params,
    });
    let total = additional_data.total;

    setPageData((val) => [...val, ...data]);
    setHasMore(data.length > 10);
    setPagemsg(params);
  };

  const InfiniteScrollContent = ({ hasMore }) => {
    return (
      <>
        {hasMore ? (
          <>
            <span>加载中</span>
            <DotLoading />
          </>
        ) : (
          <span>--- 我是有底线的 ---</span>
        )}
      </>
    );
  };

  return (
    <>
      <div className="station-wrap">
        <NavBar right={<AddOutline onClick={addCheckHistiory} />} onBack={back}>
          {stationName}
        </NavBar>
        <div className="main">
          {pageData.length ? (
            <>
              {pageData.map((item) => {
                return (
                  <MyList
                    name={item.c_user_name}
                    score={item.score}
                    timec={item.gmt_check}
                    times={item.gmt_submit}
                    key={item.id}
                    onClick={() => gotoCheckPage(item.id)}
                  ></MyList>
                );
              })}
              <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                <InfiniteScrollContent hasMore={hasMore} />
              </InfiniteScroll>
            </>
          ) : (
            <Empty description="暂无数据" />
          )}
        </div>
      </div>
      <DatePicker
        title="选择检查日期"
        value={date}
        visible={datePickerVis}
        onClose={() => {
          setDatePickerVis(false);
        }}
        onConfirm={(v) => confirmChoseDate(v)}
      ></DatePicker>
    </>
  );
}

export default Station;
