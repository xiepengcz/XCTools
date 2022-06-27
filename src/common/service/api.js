import { send } from "./request.js";
let requestUrl = "";
const isDev = process.env.NODE_ENV === "development";
export default {
  getOpenId: (params) => {
    return send(
      {
        url: requestUrl + "/join/user/activity/memberRight2/openid",
        method: "GET",
        data: params,
      },
      true
    );
  },
  // 支付宝支付
  aliPay: (params) => {
    return send(
      {
        url: requestUrl + "/join/user/activity/mallBusiness/unAuth/aliPay",
        data: params,
      },
      true
    );
  },
};
