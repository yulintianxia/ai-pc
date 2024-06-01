import instance from "./request";

export const exportUrl = (url: string, name:string) => {
  const link = document.createElement('a') //2.创建一个a链接
  link.download = name //3.设置名称
  link.style.display = 'none' // 4.默认不显示
  link.href = url // 5.设置a链接href
  document.body.appendChild(link) //6.将a链接dom插入当前html中
  link.click() //7.点击事件
  URL.revokeObjectURL(link.href) //8.释放url对象
  document.body.removeChild(link) //9.移除a链接dom
};

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
  instance.post("/app_file_word/delete_file_word", data);

// 导出长尾词文件
export const administrationExPort = (data: any) =>
  instance.post("/app_file_word/download_file_word", data);

/* 获取长尾词的文件列表 */
export const wordListGetOptions = ()=>  instance.post("/app_file_word/get_file_word_list_no_page");


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

// 获取词库列表
export const wordList = (data:any)=> instance.post("/app_word_library/get_key_word_lib_list", data);

//添加词库
export const addWord = (data:any)=> instance.post("/app_word_library/add_key_word_lib", data);

//删除词库
export const delWord = (data:any)=> instance.post("/app_word_library/delete_key_word_lib", data);

// 编辑关键词名字
export const editDetail = (data:any)=>instance.post("/app_word_library/update_key_word", data);

// 删除关键字
export const delDetail = (data:any)=>instance.post("/app_word_library/delete_key_word", data);

// 获取关键词列表
export const keywordList = (data:any)=>instance.post("/app_word_library/get_key_word_list", data);