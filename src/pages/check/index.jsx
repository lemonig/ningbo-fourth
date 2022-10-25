import React, { useEffect, useState } from "react";
import MyList from "@Components/MyList";
import {
  NavBar,
  Space,
  Toast,
  List,
  Image,
  ImageUploader,
  Dialog,
  Button,
} from "antd-mobile";
import "./index.less";
import {
  NavLink,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  demoSrc,
  mockUploadCheck,
  mockUploadFail,
  beforeUpload,
} from "../../utils/imgUpload";
import {
  detail,
  submit as cSubmit,
  checkAttachment,
  checkDelete,
} from "../../api/public";
import moment from "moment";

function Check() {
  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]);

  const [pageData, setPageData] = useState({});

  useEffect(() => {
    getPageData();
  }, []);

  let navigate = useNavigate();
  let cid = Number(new URLSearchParams(useLocation().search).get("id"));
  let cName = new URLSearchParams(useLocation().search).get("name");

  const getPageData = async () => {
    let { data, success } = await detail({ id: cid });
    setPageData(data);
    let pic = data?.attachment?.map((i) => {
      return {
        url: i,
      };
    });
    setFileList(pic);
  };

  const back = () => navigate(-1, { replace: true });

  const gotoSituation = (id, name) => {
    navigate({
      pathname: "/situation",
      search: `?c_check_record_id=${cid}&c_question_tpl_id=${id}&name=${name}`,
    });
  };

  const onSubmit = async () => {
    let { success, message } = await cSubmit({ id: cid });
    if (success) {
      Toast.show({
        icon: "success",
        content: "提交成功",
      });
      back();
    } else {
      Toast.show({
        icon: "fail",
        content: message,
      });
    }
  };
  const imageChange = async (file) => {
    let { success, message } = await checkAttachment({
      id: cid,
      attachment: file.map((item) => item.url),
    });
    if (success) {
      Toast.show({
        icon: "success",
        content: "上传成功",
      });
    } else {
      Toast.show({
        icon: "fail",
        content: message,
      });
    }
    setFileList(file);
  };

  const deleteStation = async () => {
    Dialog.confirm({
      content: "是否确认删除",
      onConfirm: async () => {
        let { success } = await checkDelete({
          id: cid,
        });
        if (success) {
          Toast.show({
            icon: "success",
            content: "删除成功",
          });
          setTimeout(() => {
            back();
          }, 1000);
        } else {
          Toast.show({
            icon: "fail",
            content: "删除失败",
          });
        }
      },
    });
  };
  return (
    <div className="check-wrap">
      <NavBar
        onBack={back}
        right={
          <Button
            block
            size="mini"
            color="primary"
            onClick={onSubmit}
            loading={loading}
          >
            提交
          </Button>
        }
      >
        {cName}
      </NavBar>
      <div className="main">
        <List header={null}>
          <List.Item
            arrow={null}
            extra={
              pageData?.gmt_check
                ? moment(pageData?.gmt_check).format("YYYY-MM-DD")
                : null
            }
            onClick={() => {}}
          >
            检查日期
          </List.Item>
          <List.Item
            extra={`${pageData?.score ?? ""}`}
            onClick={() => {}}
            arrow={null}
          >
            当前总得分
          </List.Item>
        </List>

        <List header="检查项目">
          {pageData?.detailList?.map((item) => (
            <List.Item
              key={item.c_question_tpl_id}
              extra={`${item?.desc}`}
              onClick={() =>
                gotoSituation(item.c_question_tpl_id, item.c_question_tpl_name)
              }
            >
              {item.c_question_tpl_name}
            </List.Item>
          ))}
        </List>

        <List header={`文件上传 ${fileList.length}/10`}>
          <List.Item>
            <ImageUploader
              maxCount={10}
              value={fileList}
              onChange={imageChange}
              upload={(file) => mockUploadCheck(file, cid)}
              beforeUpload={beforeUpload}
              onDelete={() => {
                return Dialog.confirm({
                  content: "是否确认删除",
                });
              }}
            />
          </List.Item>
        </List>
        <Button
          // fill="outline"
          block
          color="danger"
          style={{
            margin: "20px 0",
          }}
          onClick={deleteStation}
        >
          删除
        </Button>
      </div>
    </div>
  );
}

export default Check;
