
import instance from "./request";


// 登录请求
export const loginAPI = (data: any) =>
    instance.post("/admin/login", data);

