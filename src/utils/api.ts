import instance from "./request";

// 登录请求
export const loginAPI = (data: any) => instance.post("/user/login_sys", data);

// 文件上传
export const upfileAPI = (data: any) =>
  instance.post("/app_file_word/upload_file_word", data);

// 获取 长尾词文件 列表
export const administrationList = (data: any) =>
  instance.post("/app_file_word/get_file_word_list", data);

// 删除长尾词文件列表
export const administrationDel = (data: any) =>instance.post("/app_file_word/delete_file", data);
