import React, { useEffect, useState } from "react";
import MyList from "@Components/MyList";
import {
  NavBar,
  Space,
  Toast,
  TextArea,
  Image,
  ImageViewer,
  ImageUploader,
  Dialog,
  Button,
} from "antd-mobile";
import { SearchOutline, MoreOutline, CloseOutline } from "antd-mobile-icons";
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
  mockUpload,
  mockUploadFail,
  beforeUpload,
} from "../../utils/imgUpload";
import { recordQ, save as questSave } from "../../api/public";
import moment from "moment";

function Situation() {
  let [picVis, setPicVis] = useState(false);
  const [problemSrc, setProblemSrc] = useState([]);
  const [desc, setDesc] = useState("");
  const [fileList, setFileList] = useState([]);

  const [pageData, setPageData] = useState({});

  useEffect(() => {
    getPageData();
  }, []);

  let c_check_record_id = Number(
    new URLSearchParams(useLocation().search).get("c_check_record_id")
  );
  let c_question_tpl_id = Number(
    new URLSearchParams(useLocation().search).get("c_question_tpl_id")
  );

  let stationame = new URLSearchParams(useLocation().search).get("name");
  const getPageData = async () => {
    let { data, success } = await recordQ({
      c_check_record_id,
      c_question_tpl_id,
    });
    setPageData(data);
    let pic = data.attachment?.map((i) => {
      return {
        url: i,
      };
    });
    data.optionTplList.map((item) => {
      if (data.optionTplIds?.findIndex((ele) => ele == item.id) !== -1) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setProblemSrc(data.optionTplList);
    setFileList(pic);
    setDesc(data.remark ?? "");
  };

  let navigate = useNavigate();
  const back = () => navigate(-1, { replace: true });

  const handleSelectProblem = (idx) => {
    problemSrc[idx].selected = !problemSrc[idx].selected;
    setProblemSrc([...problemSrc]);
  };
  const submit = async () => {
    let proList = [];
    problemSrc.map((item) => {
      if (item.selected) {
        proList.push(item.id);
      }
    });
    let params = {
      c_check_record_id: c_check_record_id,
      c_question_tpl_id: c_question_tpl_id,
      c_option_tpl_ids: proList,
      remark: desc,
      attachment: fileList?.map((item) => item.url),
    };
    let { success } = await questSave(params);
    if (success) {
      Toast.show({
        icon: "success",
        content: "保存成功",
      });
      back();
    }
  };
  return (
    <div className="situation-wrap">
      <NavBar onBack={back}>{stationame}</NavBar>
      <div className="main">
        <div className="select">
          {problemSrc.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectProblem(idx)}
              className={item.selected ? "selected" : ""}
            >
              {item.describe}
            </div>
          ))}
        </div>

        <Space direction="vertical" block={true}>
          <div className="title">备注</div>
          {/* <p>{txt}</p> */}
          <TextArea
            placeholder="请输入内容"
            value={desc}
            onChange={(val) => {
              setDesc(val);
            }}
            showCount
            maxLength={500}
            autoSize={{ minRows: 3 }}
            style={{ "--font-size": "12px" }}
          ></TextArea>
        </Space>

        <Space direction="vertical" block>
          <div className="title">图片上传</div>
          <p>请传上现场问题照片，以便尽快整改（最多5张）</p>

          <ImageUploader
            maxCount={5}
            value={fileList}
            onChange={setFileList}
            beforeUpload={beforeUpload}
            upload={mockUpload}
            onDelete={() => {
              return Dialog.confirm({
                content: "是否确认删除",
              });
            }}
          />
        </Space>
        <Button
          // block
          color="primary"
          size="large"
          style={{ marginTop: "30px", width: "100%" }}
          onClick={submit}
        >
          确定
        </Button>
      </div>
      {/* <ImageViewer.Multi
        images={demoImages}
        visible={picVis}
        defaultIndex={1}
        onClose={() => {
          setPicVis(false);
        }}
      /> */}
    </div>
  );
}

export default Situation;
