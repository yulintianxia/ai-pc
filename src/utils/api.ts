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
export const administrationDel = (data: any) =>
  instance.post("/app_file_word/delete_file", data);

// 添加网站设置
export const addWebsite = (data: any) =>
  instance.post("/app_file_word/web_set/add_web_set", data);

// 修改网站设置
export const editWebSite = (data: any) =>
  instance.post("/app_file_word/web_set/update_web_set", data);

// 获取网站设置列表
export const websiteList = (data: any) =>
  instance.post("/app_file_word/web_set/get_web_set_list", data);

//删除网站设置
export const delWebsite = (data: any) =>
  instance.post("/app_file_word/web_set/del_web_set", data);

//添加网站模块
export const addMode = (data: any) =>
  instance.post("/app_file_word/web_set/add_web_module", data);

//修改网站模块
export const editMode = (data: any) =>
  instance.post("/app_file_word/web_set/update_web_module", data);

//删除网站模块
export const delMode = (data: any) =>
  instance.post("/app_file_word/web_set/del_web_module", data);

// 获取网站模块列表
export const modeList = (data: any) =>
  instance.post("/app_file_word/web_set/get_web_module_list", data);
