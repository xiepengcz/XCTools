import { defineStore } from "pinia";

export const useGoodsStore = defineStore("goods", {
  state: () => {
    return {
      shelfInfo: {}, // 选中的货架信息
      tradeGoods: {}, // 用于下单的商品数据
      isTencent: false, // 是否是腾讯系，是的话 则校验 QQ 号
      chargePhoneNo: "", // 充值手机号
      loginPhoneNo: "", // 登录手机号
      couponsInfo: {}, // 选中的可用优惠券
      tradeId: "",
      payMethod: "wx", // 支付方式
      cancelLogin: false, // 是否取消充值页面的登录弹窗
      inWeChat: true, // 是否在微信环境中
      isFCB: false, // 房车宝链接不显示支付宝支付
      smShelfShareInfo: {}, // 微信分享信息
    };
  },
  actions: {
    ClearCouponsInfo() {
      Object.keys(this.couponsInfo).map((key) => {
        delete this.couponsInfo[key];
      });
    },
  },
});
