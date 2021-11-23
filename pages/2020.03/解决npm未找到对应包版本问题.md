&emsp;


# 解决npm未找到对应包版本问题

### 问题描述
使用`npm install`安装项目依赖包的时候，报错信息：
![](https://raw.githubusercontent.com/n3tawayShadow/fileStore/master/2020.03/npm_error_info.png)
意思是`electron-to-chromium@1.3.364`这个版本的包未找到.

ps：公司搭建的npm私有包服务。


### 解决方法
首先去[npm](https://www.npmjs.com/package/electron-to-chromium)官网查看这个包的版本历史记录中有没有包含此版本。
![](https://raw.githubusercontent.com/n3tawayShadow/fileStore/master/2020.03/package_version_history.png)

可以看到这个包才发布8个小时，我猜是公司的私有包服务未及时同步导致的。

暂时修改安装依赖的源，等私有包服务同步后就不会存在这个包的问题了。

![](https://raw.githubusercontent.com/n3tawayShadow/fileStore/master/2020.03/npm_registry.png)

 `npm install --registry=https://registry.npm.taobao.org --verbose`

相关文章

- [解决npm安装错误:No matching version found for event-stream@3.3.6]([https://segmentfault.com/a/1190000017469402])
&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;


over.