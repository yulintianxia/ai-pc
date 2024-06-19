import instance from "./request";

export const exportUrl = (url: string, name: string) => {
  const link = document.createElement("a"); //2.创建一个a链接
  link.download = name; //3.设置名称
  link.style.display = "none"; // 4.默认不显示
  link.href = url; // 5.设置a链接href
  document.body.appendChild(link); //6.将a链接dom插入当前html中
  link.click(); //7.点击事件
  URL.revokeObjectURL(link.href); //8.释放url对象
  document.body.removeChild(link); //9.移除a链接dom
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
export const wordListGetOptions = () =>
  instance.post("/app_file_word/get_file_word_list_no_page");

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
export const wordList = (data: any) =>
  instance.post("/app_word_library/get_key_word_lib_list", data);

//添加词库
export const addWord = (data: any) =>
  instance.post("/app_word_library/add_key_word_lib", data);

//删除词库
export const delWord = (data: any) =>
  instance.post("/app_word_library/delete_key_word_lib", data);

// 编辑关键词名字
export const editDetail = (data: any) =>
  instance.post("/app_word_library/update_key_word", data);

// 删除关键字
export const delDetail = (data: any) =>
  instance.post("/app_word_library/delete_key_word", data);

// 获取关键词列表
export const keywordList = (data: any) =>
  instance.post("/app_word_library/get_key_word_list", data);

// 获取网站模块的列表
export const webSiteModeList = (data: any) =>
  instance.post("/web_set/get_web_module_list", data);

// 添加网站模块的列表
export const webSiteModeAdd = (data: any) =>
  instance.post("/web_set/add_web_module", data);

// 删除网站模块的列表
export const webSiteModeDel = (data: any) =>
  instance.post("/web_set/del_web_module", data);

// 修改网站模块的列表
export const webSiteModeEdit = (data: any) =>
  instance.post("/web_set/update_web_module", data);

// 获取网站模块的下拉
export const webSiteModeOptions = (data: any) =>
  instance.post("/web_set/get_web_module_drop", data);

// 获取网站设置下拉列表
export const webSettingOptions = (data: any) =>
  instance.post("/web_set/get_web_set_drop", data);

// 获取网站设置列表
export const webSettingList = (data: any) =>
  instance.post("/web_set/get_web_set_list", data);

// 添加网站
export const webSettingAdd = (data: any) =>
  instance.post("/web_set/add_web_set", data);

// 删除网站
export const webSettingDel = (data: any) =>
  instance.post("/web_set/del_web_set", data);

// 修改网站
export const webSettingUpdate = (data: any) =>
  instance.post("/web_set/update_web_set", data);

// 文章生成任务列表
export const taskList = (data: any) =>
  instance.post("/app_article_job/get_article_job_list", data);

// 暂停文章生成
export  const stopTask = (data:any)=>
instance.post("/app_article_job/stop_article_job", data);

//开始文章生成
export  const startTask = (data:any)=>
instance.post("/app_article_job/start_article_job", data);

//文章添加生成
export  const addTask = (data:any)=>
instance.post("/app_article_job/add_article_job", data);

// 获取大模型配置列表
export  const AImodeList = (data:any)=>
instance.post("/app_model_manage/get_model_config_list", data);

// 获取模型类型
export  const AImodeType = (data:any)=>
instance.post("/app_model_manage/get_model_type", data);


// 获取大数据模型列表
export const AImodeListPage = (data?:any)=>
instance.post("/app_model_manage/get_model_list", data);

//配置模型密匙 key类型模型
export const  configAIkey =  (data:any)=>
instance.post("/app_model_manage/add_model_key", data);

// 修改模型密匙 appid类型模型
export const  editAIid =(data:any)=>
instance.post("/app_model_manage/update_model_key", data);

//删除模型密匙 key类型模型
export const  delKey =  (data:any)=>
instance.post("/app_model_manage/delete_model_key", data);


// 文章生成任务列表
export const  taskListPage =  (data:any)=>
  instance.post("/app_article_manage/get_article_list", data);

// 删除文章任务列表
export const  deleteListPage =  (data:any)=>
  instance.post("/app_article_manage/delete_article_list", data);

// 模型为1的测试模型
export const testAiMode1 = (data:any)=> instance.post("/app_model_manage/check_model_config", data);

// 模型为1的测试模型
export const testAiMode2 = (data:any)=> instance.post("/app_model_manage/check_model_key_config", data);


// 获取下拉任务列表
export const taskNoPage = ()=> instance.post("/app_article_job/get_article_job_list_no_page");

// 退出登录
export  const loginOut = ()=>
instance.post("/user/logout_sys");

