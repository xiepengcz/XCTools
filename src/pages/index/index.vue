<template>
  <view class="w-100vw py-5 flex-center flex-column">
    <image
      mode="widthFix"
      style="width: 486rpx"
      src="@/static/img/index/sorry.jpg"
    >
    </image>
    <view class="a">临时停靠，请多关照</view>
    <view class="text-center my-2">{{ phone }}</view>
    <view class="flex-center color-fff fsz24 btn" @click="call">呼叫车主</view>
  </view>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const phone = ref("");

const call = () => {
  uni.makePhoneCall({
    phoneNumber: phone.value,
  });
};

onLoad((i) => {
  if (i.phone) phone.value = i.phone;
});
</script>
<style lang="scss" scoped>
.btn {
  width: 300rpx;
  height: 60rpx;
  background: #3b88fe;
  box-shadow: 0rpx 8rpx 24rpx 0rpx rgba(59, 136, 254, 0.25);
  border-radius: 30rpx;
}
</style>
