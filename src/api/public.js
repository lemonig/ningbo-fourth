import { _post, _get } from "../server/http";

// 提交检查
export function submit(data) {
  return _post({
    url: `/api/check/record/submit`,
    method: "post",
    data,
  });
}
// 登陆
export function login(data) {
  return _post({
    url: `/api/login`,
    method: "post",
    data,
  });
}
// 检查详情
export function detail(data) {
  return _post({
    url: `/api/check/record/detail`,
    method: "post",
    data,
  });
}
// 站点目录
export function list(data) {
  return _post({
    url: `/api/station/list`,
    method: "post",
    data,
  });
}
// 站点
export function historylist(data) {
  return _post({
    url: `/api/check/record/list`,
    method: "post",
    data,
  });
}
// 新建检查校验
export function validator(data) {
  return _post({
    url: `/api/check/record/validator`,
    method: "post",
    data,
  });
}
// 文件上传
export function image(data) {
  return _post({
    url: `/api/upload/image`,
    method: "post",
    data,
  });
}
// 问题保存
export function save(data) {
  return _post({
    url: `/api/check/record/question/save`,
    method: "post",
    data,
  });
}
// 问题
export function recordQ(data) {
  return _post({
    url: `/api/check/record/question`,
    method: "post",
    data,
  });
}
// 问题
export function checkAttachment(data) {
  return _post({
    url: `/api/check/record/attachment`,
    method: "post",
    data,
  });
}
// 检查删除
export function checkDelete(data) {
  return _post({
    url: `/api/check/record/delete`,
    method: "post",
    data,
  });
}
