## change log
`v1.1.0` 无埋点+圈选+热力图
## 体验
1. [热力图与圈选埋点](https://www.readingblog.cn/track/index.html)
![](https://mfaying.github.io/static/images/web-log-sdk/1.gif)
2. demo
打开控制台即可查看无埋点日志
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>web-log-sdk</title>
  <script src="https://www.readingblog.cn/lib/web-log-sdk-1.1.0.min.js"></script>
</head>
<body>
  <div>
    1
    <div id='1'>
      2
      <div id="1">3</div>
      <div>4</div>
    </div>
  </div>
  <div>5</div>
  <script>
    new WebLogger.AutoLogger({
      debug: true,
    });
  </script>
</body>
</html>
```
## 开发调试
执行
```
npm run start
```
浏览器打开examples文件夹下test.html即可调试
## 构建
```
npm run build
```
## 配置
```js
export default {
  appID: '',
  // 是否自动收集点击事件
  autoClick: true,
  debug: false,
  // 日志发送地址
  logUrl: '',
  // 热力图数据获取地址
  heatmapUrl: '',
  sdk: {
    // 类型
    type: 'js',
    // 版本
    version: SDK_VERSION,
  },
  // 平台参数
  platform,
  optParams: {},
  postMsgOpts: [],
};
```
1. appID 你可以在初始化时注册一个appID，所以相关的埋点都会带上这个标记，相当于对埋点数据做了一层app维度上的管理。
2. autoClick 默认为true，开启会自动收集点击事件(即点击无埋点)。
3. debug 默认不开启，开启会将埋点数据打印到控制台，便于调试。
4. logUrl 接收日志的后端地址
5. heatmapUrl 热力图数据获取地址
6. sdk sdk自身信息一些说明
7. platform 默认会自动获取一些平台参数，你也可以通过配置这个字段覆盖它
8. optParams 自定义数据
## 圈选模式
### 配置postMsgOpts
初始化sdk时需要配置postMsgOpts，一般来说targetOrigin和curOrigin是埋点系统的域名
```js
const AutoLogger = window.WebLogger.AutoLogger;
const targetOrigin = 'track system url';
const curOrigin = 'track system url';
const logUrl = '...';
new AutoLogger({
  debug: true,
  logUrl,
  postMsgOpts: [{
    targetWindow: window.parent,
    targetOrigin,
  }, {
    targetWindow: window,
    targetOrigin: curOrigin,
  }],
});
```
### 开启/停止圈选模式
将sdk页面通过iframe嵌入以后，在埋点系统中发送消息就可以启用/停止sdk的圈选模式
```js
const data = {
  mode: 'CIRCLE_SELECT',
  status: 'on', // 'off'
}
const targetOrigin = 'track system url';
const ifrWindow = document.getElementById('ifr').contentWindow;
ifrWindow.postMessage(JSON.stringify(data), targetOrigin)
```
启用圈选模式后，hover任意元素都会被红色框圈选出来。
### 监听sdk页面回传的log数据
最后，你只需要在埋点系统中监听消息，就可以接受sdk页面回传的log数据。基于这些数据，就自由地实现圈选分析功能了。
```js
window.addEventListener('message', (event) => {
  const { heatmapValueFetch } = this.props;
  if(event.data && event.data.logData){
    const logData = JSON.parse(event.data.logData);
  }
});
```
## 热力图模式
### 配置postMsgOpts
初始化sdk时需要配置postMsgOpts，一般来说targetOrigin和curOrigin是埋点系统的域名
```js
const AutoLogger = window.WebLogger.AutoLogger;
const targetOrigin = 'track system url';
const curOrigin = 'track system url';
const logUrl = '...';
const heatmapUrl = '...';
new AutoLogger({
  debug: true,
  logUrl,
  heatmapUrl,
  postMsgOpts: [{
    targetWindow: window.parent,
    targetOrigin,
  }, {
    targetWindow: window,
    targetOrigin: curOrigin,
  }],
});
```
### 开启/停止热力图模式
将sdk页面通过iframe嵌入以后，在埋点系统中发送消息就可以启用/停止sdk的热力图模式
```js
const data = {
  mode: 'HEATMAP',
  status: 'on', // 'off'
}
const targetOrigin = 'track system url';
const ifrWindow = document.getElementById('ifr').contentWindow;
ifrWindow.postMessage(JSON.stringify(data), targetOrigin)
```
启用热力模式后，sdk会向你配置的heatmapUrl接口发送请求，所以这个接口的格式需要和sdk的预设一致。
request
```s
method: POST
url: config.heatmapUrl
data:
{
  "pageUrl": location.href
}
```
response
```json
{
  // ...
  "data":{
    "max":1,
    "data":[
      {
        "x":"41",
        "y":"171",
        "value":1
      },
      {
        "x":"153",
        "y":"88",
        "value":1
      }
    ]
  }
}
```
基于返回的数据sdk会帮你绘制当前页面的热力图。

