import React, { useImperativeHandle } from "react";
import { Grid } from "antd-mobile";
import "./index.less";
import moment from "moment";

function MyList({ onRef, onClick, name, score, timec, times }) {
  return (
    <div className="my-list" onClick={onClick}>
      <div className="line-1">
        <div>检查人：{name}</div>
        <div>得分：{times ? `${score}分` : "--"}</div>
      </div>

      <Grid columns={2} gap={[8, 50]} style={{ "--gap-vertical": "50px" }}>
        <Grid.Item>
          <div>
            检查时间：{timec ? moment(timec).format("YYYY年MM月DD日") : "--"}
          </div>
        </Grid.Item>
        <Grid.Item>
          <div>
            提交时间：{times ? moment(times).format("YYYY-MM-DD HH:mm") : "--"}
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
}

export default MyList;
