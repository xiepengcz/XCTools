<template>
  <view v-if="isShow" class="mh-100vh index">
    <view class="py-2 mb-2 top-block">
      <Head :shelfShareInfo="smShelf"></Head>
      <swiperBanner
        style="margin-top: 74rpx"
        :img-list="imgList"
        img-height="210"
      />
      <Menu :menuList="menuList"></Menu>
    </view>
    <view class="foot-block">
      <view class="w-100 d-flex ai-center jc-between container">
        <scroll-view
          scroll-x
          class="bg-white nav w-100"
          style="margin-left: 32rpx"
          :scroll-with-animation="true"
          :scroll-left="scrollLeft"
        >
          <view
            v-for="(item, index) in goodsList"
            :key="index"
            class="cu-item"
            :style="{ filter: index !== TabCur ? 'grayscale(100%)' : '' }"
            @click="tabSelect(index, item)"
          >
            <view class="pr flex-center flex-column item-goods">
              <view
                class="fsz28 font-700 goods-name"
                :class="[index == TabCur ? 'color-30' : 'color-99']"
              >
                {{ item.shelfInfo.shelfName }}
              </view>
              <view v-show="index == TabCur" class="cu-item-choose" />
            </view>
          </view>
        </scroll-view>
      </view>
      <view
        style="
          width: 750rpx;
          height: 1rpx;
          background: #f0f0f0;
          margin-bottom: 32rpx;
        "
      />
      <!-- 权益商品 -->
      <block v-if="goodsList[TabCur].shelfInfo.shelfType === '6'">
        <RightsList :goodsList="goodsList[TabCur].shelfGoods"></RightsList>
      </block>
      <!-- 号卡&& 流量包 -->
      <block v-else-if="goodsList[TabCur].shelfInfo.shelfType === '5'">
        <Communication
          :goodsList="goodsList[TabCur].shelfGoods"
        ></Communication>
      </block>
      <!-- 充值 -->
      <block v-else-if="goodsList[TabCur].shelfInfo.shelfType === '7'">
        <flowPhoneCharge
          :opList="opList"
          :flowList="flowList"
        ></flowPhoneCharge>
      </block>
      <block v-else>
        <view class="goods text-center color-99"> 敬请期待 </view>
      </block>
    </view>
    <!-- H5支付确认弹窗 -->
    <h5ConfirmPopup ref="h5ConfirmPopupRef"></h5ConfirmPopup>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, watch, nextTick } from "vue";
import api from "@/common/service/api";
import { isWeChat, disposeImgUrl, report } from "@/common/utils/tools.js";
import swiperBanner from "@/components/swiperBanner.vue";
import Head from "./component/index/Head.vue";
import Menu from "./component/index/Menu.vue";
import Communication from "./component/index/Communication.vue";
// import Charge from "./component/index/Charge.vue";
import flowPhoneCharge from "./component/flowPhoneCharge.vue";

import RightsList from "./component/index/RightsList.vue";
import { useGoodsStore } from "@/stores/goods.js";
import h5ConfirmPopup from "@/components/popup/h5ConfirmPopup.vue";
import { queryTradeInfo } from "@/hooks/pay/goodsPay.js";
import { SHFLList } from "./static/card.js";
import { wxShareConfig } from "@/common/utils/share.js";

const GoodsStore = useGoodsStore();
const inWeChat = ref(true);
if (!isWeChat()) {
  inWeChat.value = false;
  GoodsStore.$patch({ inWeChat: false });
}

const menuList = ref([]);

const imgList = ref([]);

const scrollLeft = ref(0);
const TabCur = ref(0);

// 点击tab栏 显示不同类型
const tabSelect = (index, goods) => {
  console.log("tabSelect", index, goods);
  if (TabCur.value == index) return;
  TabCur.value = index;
  operator.value = 0;
  scrollLeft.value = (index - 3) * 130;
};

// 充值
const operator = ref(0);
const operatorList = ref([]);

let chargeGoodsList = [];

const goodsList = ref([]);
const isShow = ref(false);

// 首页 金刚区接口
const getRecommendList = () => {
  api
    .getRecommendList({
      mallCode: uni.getStorageSync("mallCode"),
    })
    .then((res) => {
      console.log("getRecommendList", res);
      menuList.value = disposeImgUrl(res.recommendGoodsList);
      console.log(menuList.value);
    });
};
getRecommendList();

// 首页 banner列表
const getBannerList = () => {
  api
    .getBannerList({
      mallCode: uni.getStorageSync("mallCode"),
      belongPlatform: "DISTRIBUTOR_MALL",
      belongPlatformLevelTwo: "HOME_PAGE_BANNER",
    })
    .then((res) => {
      let list = disposeImgUrl(res.bannerList);
      imgList.value = list;
      console.log("getBannerList", imgList.value);
    });
};
getBannerList();

// 获取首页 tab 货架
const queryInit = () => {
  api.queryInit({ mallCode: uni.getStorageSync("mallCode") }).then((res) => {
    let list = res.shelfList;
    goodsList.value = disposeImgUrl(list);
    chargeGoodsList = list.find((i) => i.shelfInfo.shelfType == "7");
    console.log("chargeGoodsList", chargeGoodsList);
    // 充值 tab 项数据
    if (chargeGoodsList && chargeGoodsList.shelfGoods) {
      chargeGoodsList.shelfGoods.forEach((i) => {
        if (!i.remarks) {
        } else if (i.remarks.includes("联通话费")) {
          opList.cu.push(i);
        } else if (i.remarks.includes("移动话费")) {
          opList.cm.push(i);
        } else if (i.remarks.includes("电信话费")) {
          opList.ct.push(i);
        } else if (i.remarks.includes("中国联通")) {
          flowList.cu.push(i);
        } else if (i.remarks.includes("中国移动")) {
          flowList.cm.push(i);
        } else if (i.remarks.includes("中国电信")) {
          flowList.ct.push(i);
        }
      });
    }
    operatorList.value = opList.cm;
    isShow.value = true;
  });
};

queryInit();
// 话费充值逻辑
// 话费商品
const opList = reactive({
  ct: [],
  cm: [],
  cu: [],
});
// 流量商品
const flowList = reactive({
  ct: [],
  cm: [],
  cu: [],
});

const h5ConfirmPopupRef = ref();
let payStatus = "";
// 当微信 H5支付后，需求弹窗确认是否支付
watch(
  () => isShow.value,
  (curValue) => {
    if (curValue && payStatus) {
      nextTick(() => {
        h5ConfirmPopupRef.value.isH5Popup = true;
      });
    }
  }
);
let smShelf = ref({});
onLoad((i) => {
  // 判断是否存在 H5支付
  if (i.payStatus && i.payStatus.length) {
    console.log("判断H5是否支付成功");
    payStatus = i.payStatus;
    GoodsStore.$patch({ tradeId: i.tradeId });
    if (uni.getStorageSync("rightsGoodsInfo").tradeId == i.tradeId) {
      GoodsStore.$patch({ tradeGoods: uni.getStorageSync("rightsGoodsInfo") });
    } else {
      queryTradeInfo(i.tradeId);
    }
  }
  const mallCode = uni.getStorageSync("mallCode");
  if (SHFLList.includes(mallCode)) {
    uni.setNavigationBarTitle({
      title: "生活福利",
    });
  } else {
    uni.setNavigationBarTitle({
      title: "易卡通商城",
    });
  }

  // 如果打开的是首页，则请求该接口
  api
    .getMallShareInfo({ mallCode: uni.getStorageSync("mallCode") })
    .then((res) => {
      console.log("getMallShareInfo", res);
      if (res.code === "0000") {
        wxShareConfig(
          res.data.mallName,
          res.data.mallIntroduce,
          res.data.mallImage
        );
        smShelf.value = {
          shelfName: res.data.mallName,
          shelfIntroduce: res.data.mallIntroduce,
        };
      }
    });
});

const goodsInfoTag = ref({
  title: "免费领号卡",
  tips: "最高送240元",
  url: "https://gz.adsl.cn/gluttony/page/?adsluid=wslxkk8zn3qlv6q",
});

if (uni.getStorageSync("mallCode") == "wsyt5jpfrd8dboj") {
  goodsInfoTag.value = {
    title: "送160元话费",
    tips: "免费领号卡",
    url: "https://gz.adsl.cn/gluttony/page/?adsluid=wsvrctj233qlyq9&goodsId=1742418",
  };
}

report({
  id: "saasMall",
  type: "log",
  val: uni.getStorageSync("mallCode"),
  title: "进入SaaS商城",
});
</script>

<style lang="scss" scoped>
.index {
  width: 100vw;
  background: #f6f6f6;
  overflow: hidden;
}

.top-block {
  background: #fff;
  border-radius: 0rpx 0rpx 32rpx 32rpx;
}

.foot-block {
  background: #fff;
  border-radius: 32rpx;
  padding-bottom: 100rpx;
}

.container {
  width: 100%;
  height: 104rpx;
  color: #626262;

  &::-webkit-scrollbar {
    display: none;
  }
}

.cu-item {
  display: inline-block;
  margin-right: 56rpx;
  font-size: 24rpx;

  .item-goods {
    height: 80rpx;

    .goods-name {
      text-align: center;
      word-break: break-all; // 字母数字不换行
    }
  }
}

.cu-item-choose {
  position: absolute;
  bottom: 6rpx;
  left: 50%;
  transform: translate(-50%, 0);
  width: 24rpx;
  height: 8rpx;
  background: #3b88fe;
  border-radius: 4rpx;
}

.goods {
  margin-bottom: 48rpx;
  overflow: hidden;
}
</style>
