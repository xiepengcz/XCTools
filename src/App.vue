<script setup></script>

<style lang="scss">
/*全局公共样式和字体图标*/
@font-face {
  font-family: "icon";
  font-weight: normal;
  font-style: normal;
  src: url("//at.alicdn.com/t/font_3381969_cbfjeffibne.ttf?t=1654052818075")
    format("truetype");
}

.icon {
  font-family: "icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

/*css重置*/
view,
scroll-view,
swiper,
swiper-item,
cover-view,
cover-image,
icon,
text,
rich-text,
progress,
button,
checkbox,
form,
input,
label,
radio,
slider,
switch,
textarea,
navigator,
audio,
camera,
image,
video {
  box-sizing: border-box;
}

/* 解决image组件存在默认下边距问题 */
image {
  vertical-align: bottom;
}

button::after {
  border: none;
}

.text-overflow {
  overflow: hidden; // 超出的文本隐藏
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.px-32 {
  padding-left: 32rpx;
  padding-right: 32rpx;
}

.w-100 {
  width: 100%;
}

.w-100vw {
  width: 100vw;
}

.h-100 {
  height: 100%;
}

.mh-100vh {
  min-height: 100vh;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.pr {
  position: relative;
}

.m-auto {
  margin: auto;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.ml-auto {
  margin-left: auto;
}

.mr-auto {
  margin-right: auto;
}

.mt-auto {
  margin-top: auto;
}

// 删除线
.text-delete {
  text-decoration: line-through;
}

// color
.bgc-fff {
  background: #fff;
}

.color-fff {
  color: #fff;
}

.color-aaa {
  color: #aaa;
}

.color-ccc {
  color: #ccc;
}

.color-30 {
  color: #303030;
}

.color-69 {
  color: #696969;
}
.color-66 {
  color: #666;
}

.color-99 {
  color: #999;
}

.color-main {
  color: #3b88fe;
}

.color-price {
  color: #ff3e3e;
}

.color-orange {
  color: #ff6219;
}

// flex
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.d-flex-column {
  display: flex;
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

$flex-jc: (
  // justify-content
  start: flex-start,
  end: flex-end,
  center: center,
  between: space-between,
  around: space-around,
  evenly: space-evenly
);

@each $key, $value in $flex-jc {
  .jc-#{$key} {
    justify-content: $value;
  }
}

$flex-ai: (
  // align-items
  start: flex-start,
  end: flex-end,
  center: center,
  stretch: stretch
);

@each $key, $value in $flex-ai {
  .ai-#{$key} {
    align-items: $value;
  }
}

.flex-1 {
  flex: 1;
}

.flex-grow-1 {
  flex-grow: 1;
}

// spacing
// .mt-1 => margin top  .pb-2 => padding-bottom 数字表示大小
$spacing-types: (
  m: margin,
  p: padding,
);
$spacing-directions: (
  t: top,
  r: right,
  b: bottom,
  l: left,
);
$spacing-base-size: 10rpx;
$spacing-sizes: (
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
);

// .mt-1 => margin top  .pb-2 => padding-bottom 数字表示大小

@each $typeKey, $type in $spacing-types {
  @each $sizeKey, $size in $spacing-sizes {
    // .m-1 {margin: 0.25rem} .p
    .#{$typeKey}-#{$sizeKey} {
      #{$type}: $size * $spacing-base-size;
    }
  }

  // .mx-1 , .my-1
  @each $sizeKey, $size in $spacing-sizes {
    // .mx-1 .px
    .#{$typeKey}x-#{$sizeKey} {
      #{$type}-left: $size * $spacing-base-size;
      #{$type}-right: $size * $spacing-base-size;
    }

    // .my-1 .py
    .#{$typeKey}y-#{$sizeKey} {
      #{$type}-top: $size * $spacing-base-size;
      #{$type}-bottom: $size * $spacing-base-size;
    }
  }

  @each $directionKey, $direction in $spacing-directions {
    @each $sizeKey, $size in $spacing-sizes {
      // .mt-1 {margin-top: 0.25rem} .pt
      .#{$typeKey}#{$directionKey}-#{$sizeKey} {
        #{$type}-#{$direction}: $size * $spacing-base-size;
      }
    }
  }

  .#{$typeKey} {
    #{$type}: 0;
  }
}

$font-sizes: (
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  28: 28,
  30: 30,
  32: 32,
  36: 36,
  40: 40,
  44: 44,
  48: 48,
);

@each $key, $value in $font-sizes {
  .fsz#{$key} {
    font-size: #{$value}rpx;
  }

  .lh#{$key} {
    line-height: #{$value}rpx;
  }
}

$font-sizes: (
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
);

@each $key, $value in $font-sizes {
  .font-#{$key} {
    font-weight: #{$value};
  }
}

/* 弹窗 */
.cu-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  opacity: 0;
  outline: 0;
  text-align: center;
  -ms-transform: scale(1.185);
  transform: scale(1.185);
  backface-visibility: hidden;
  perspective: 2000rpx;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease-in-out 0s;
  pointer-events: none;

  &.show {
    opacity: 1;
    transition-duration: 0.3s;
    transform: scale(1);
    overflow-x: hidden;
    overflow-y: auto;
    pointer-events: auto;
    -webkit-overflow-scrolling: touch;
  }

  &::before {
    content: "\200B";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  &.bottom-modal::before {
    vertical-align: bottom;
  }

  &.bottom-modal .cu-dialog {
    width: 100%;
    border-radius: 0;
  }

  &.bottom-modal {
    margin-bottom: -1000rpx;
  }

  &.bottom-modal.show {
    margin-bottom: 0;
  }

  &.top-modal::before {
    vertical-align: top;
  }

  &.top-modal .cu-dialog {
    width: 100%;
    border-radius: 0;
  }

  &.top-modal {
    margin-top: -1000rpx;
  }

  &.top-modal.show {
    margin-top: 0;
  }

  .cu-dialog {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    /* border-radius: 10rpx; */
    overflow: hidden;
  }
}

.mandate-button {
  width: 100vw;
  height: auto;
  background-color: rgba(255, 255, 255, 0.001);
}

.nav {
  white-space: nowrap;
}

.nav::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
  width: 0;
  height: 0;
  opacity: 0;
  display: none;
  background-color: transparent;
}
</style>
