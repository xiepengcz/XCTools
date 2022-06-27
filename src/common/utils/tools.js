const msg = (title, duration = 1500, mask = false, icon = "none") => {
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon,
  });
};

const disposeImgUrl = (res) => {
  if (!res) return null;
  //
  // let url = location.origin.includes('adsl') ? 'https://static.ejcop.com/' : 'http://newdev2.ejcop.com:9000/'
  // 临时
  let url = "https://static.ejcop.com/";
  return JSON.parse(
    JSON.stringify(res)
      .replace(/picAddress\"\:\"\//g, `picAddress":"${url}`)
      .replace(/adsPicture\"\:\"\//g, `adsPicture":"${url}`)
  );
};

const isWeChat = () => {
  // #ifdef H5
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
  // #endif
};

/**
 * 设置cookie
 * @param c_name
 * @param value
 * @param expiredays
 */
const setCookie = function (c_name, value, expiredays) {
  let expDate = new Date();
  expDate.setDate(expDate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + expDate.toGMTString()) +
    ";path=/";
};

const isDev = process.env.NODE_ENV === "development";

const getTime = (inputTime) => {
  let addString = (num) => (num < 10 ? "0" + num : num);
  let date = new Date(inputTime);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() + " ";
  let h = addString(date.getHours());
  let m = addString(date.getMinutes());
  let s = addString(date.getSeconds());

  return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
};
const getDates = (inputTime) => {
  let date = new Date(inputTime);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() + " ";
  if (isNaN(year)) return "无";
  return year + "-" + month + "-" + day;
};

function loadJS(url, callback) {
  var script = document.createElement("script"),
    fn = callback || function () {};
  script.type = "text/javascript";
  //IE
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        fn();
      }
    };
  } else {
    //其他浏览器
    script.onload = function () {
      fn();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function loadHeatEventLib(callback) {
  loadJS("https://ic.adsl.cn/ic.mini.js", callback);
}

const typeConf = {
  click: "ACCLICK",
  input: "ACINPUT",
  api: "ACAPI",
  log: "ACLOG",
};
function report(
  data = {
    id: "",
    type: "",
    val: "",
    title: "",
  }
) {
  let reporter = window["_ES_REPORTER"];
  const { id, type, val, title } = data;
  if (reporter) {
    try {
      reporter.collect({
        eId: id,
        type: typeConf[type],
        val: val,
        a: id,
        an: title,
      });
      reporter.postData();
    } catch (e) {}
  }
}

// 复制函数
const h5Copy = (content) => {
  return new Promise((resolve, reject) => {
    if (!document.queryCommandSupported("copy")) {
      // 不支持
      reject(false);
    } else {
      let textarea = document.createElement("textarea");
      textarea.value = content;
      textarea.readOnly = "readOnly";
      document.body.appendChild(textarea);
      textarea.select(); // 选择对象
      textarea.setSelectionRange(0, content.length); //核心
      let result = document.execCommand("copy"); // 执行浏览器复制命令
      textarea.remove();
      resolve(result);
    }
  });
};

export {
  msg,
  isWeChat,
  disposeImgUrl,
  setCookie,
  getTime,
  getDates,
  loadHeatEventLib,
  loadJS,
  h5Copy,
  report,
  isDev,
};
