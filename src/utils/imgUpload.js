import { upload } from "@testing-library/user-event/dist/upload";
import { image, checkAttachment } from "../api/public";
import { Toast, Dialog } from "antd-mobile";
import { compressImage } from "./tool";
function sleep(time) {
  setTimeout(() => {}, time);
}
export const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";

export async function mockUpload(file) {
  let res = await compressImage(file);
  let formData = new FormData();
  formData.append("file", res);
  let { data } = await image(formData);
  return {
    url: data,
  };
}
export async function mockUploadCheck(file, id) {
  let res = await compressImage(file);
  let formData = new FormData();
  formData.append("file", res);
  let { data } = await image(formData);

  return {
    url: data,
  };
}

export function beforeUpload(file) {
  if (file.size > 10 * 1024 * 1024) {
    Toast.show("请选择小于 10M 的图片");
    return null;
  }
  return file;
}

export async function mockUploadFail() {
  await sleep(3000);
  throw new Error("Fail to upload");
}
