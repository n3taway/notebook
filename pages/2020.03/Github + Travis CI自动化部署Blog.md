&emsp;


# Github + Travis CI自动化部署Blog

### Github pages

GitHub Pages 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 文件，（可选）通过构建过程运行文件，然后发布网站。可以理解为只要GitHub Pages仓库根根目录存在index.html，github pages就能以这个html作为主页运行一个静态html服务。

### Travis CI

Travis CI 提供的是持续集成服务（Continuous Integration，简称 CI）。它与github是好基友，只要github有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。

### 两者结合

1. 创建一个满足github pages的仓库。
2. 进入Travis官网使用github账户登录，找到github page仓库并激活。
3. 在相关仓库的根目录创建.travis.yml配置文件。

### .travis.yml配置

```yaml
language: node_js #指定构建语言
node_js:
- '10' #构建语言版本
before_script: #构建脚本命令执行前需要的前置脚本命令
- npm i -g github-markdown 
- npm run prebuild
script: #构建脚本命令
- npm run build
- rm -rf .git
- git init
- git config user.name "n3taway"
- git config user.email "n3taway@gmail.com"
- git add .
- git commit -m "update note"
- git push --force https://$TOKEN@github.com/n3tawayShadow/n3tawayShadow.github.io.git master
env: 
  global:
    secure: pHhk8zu4jvWuQRs+inDy6V+ftz4yVT/SQZ0bypCT9ExwpBLJV...

```

在上面的配置文件中Github使用token方式进行提交，这个token是如何生成的呢.

> 右上角头像->settings->Developer settings->Personal access tokens
>
> 作用域 勾选repo即可 滑到最下面点击生成token即可。    



上面的token怎么通过travis加密并添加到环境变量中的呢.

- 进入到Github pages仓库，执行`travis login --org` 登录travis，如果是pro用户` --or`替换为` --pro`

- 执行`travis encrypt TOKEN=<需要加密的token>`将生成好加密数据后添加到`secure `或执行`travis encrypt TOKEN=<需要加密的token> --add`自动添加到travis配置文件中。

  

构建脚本和`.travis.yml`配置完成后就可以push代码了。push成功后可在线上仓库的commit中查看travis的构建状态，点击travis详情可跳转到travis官网提供的控制台中查看详细的构建过程。



相关文章

- [持续集成服务 Travis CI 教程-阮一峰的网络日志](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)
- [GitHub Pages action构建失败-解决方法](https://github.community/t5/GitHub-Pages/GitHub-Pages-Builds-Fail/td-p/29172)
&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;


over.