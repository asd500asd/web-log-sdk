## 体验
1. [演示](https://www.readingblog.cn/track/index.html)
2. demo
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
安装相关依赖，执行
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
  logUrl: '',
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
5. sdk sdk自身信息一些说明
6. platform 默认会自动获取一些平台参数，你也可以通过配置这个字段覆盖它
7. optParams 自定义数据