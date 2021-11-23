&emsp;


# 一台电脑设置多个github账号

### 场景

公司使用github管理项目分配一个github账户，而我们自己有私有的github账户。在push代码是抛出错误

`ERROR: Permission to 公司项目.git denied to 自己的私有账户.`这是因为此电脑初次clone代码使用的是私有账户，此电脑的SSH公钥已经绑定了自己的私有GitHub 账号。

### 解决方法

利用自己唯一的电脑生成多公钥，从clone的时候就区分开SSH公钥。

### 操作

- 为公司账户和自己账户生成两个不同的公钥。

  公司` ssh-keygen -t rsa -C "youremail@email.com" -f ~/.ssh/id_rsa_company`

  自己` ssh-keygen -t rsa -C "youremail@email.com" -f ~/.ssh/id_rsa_person`



- 本地需要识别刚才生产的SSH-KEY 使其生效

  `ssh-add -K ~/.ssh/id_rsa_company`

  `ssh-add -K ~/.ssh/id_rsa_person`

  如果添加时输入错误可使用` ssh-add -D`删除所有的SSH-KEY，再用上面操作重新生成。

  通过此命令`ssh-add -l`查看SSH-KEY 的设置情况



- 编辑ssh配置文件，使用不同的私钥进行操作，比如克隆操作。

  > ```bash
  > #company
  > Host company.github.com #自定义域名 clone时匹配用的，如果未匹配成功 默认使用第一个。
  > HostName github.com
  > User git
  > IdentityFile ~/.ssh/id_rsa_company
  > 
  > #person
  > Host person.github.com
  > HostName github.com
  > User git
  > IdentityFile ~/.ssh/id_rsa_person
  > ```

- 测试 SSH 连接

  > ```bash
  > ssh -T git@company.github.com
  > Hi company! You've successfully authenticated, but GitHub does not provide...
  > 
  > ssh -T git@person.github.com
  > Hi person! You've successfully authenticated, but GitHub does not provide..
  > 
  > ```

### git clone 操作

公司项目`git clone git@company:xxxx/xxxx.git`

个人项目`git clone git@person:xxxx/xxxx.git`

注意使用 HTTPS 方式clone代码不行。因为使用的是http服务不会走SSH config中的配置。



解决方案参考[一台电脑设置多个github账号](http://summertreee.github.io/blog/2017/10/16/yi-tai-dian-nao-she-zhi-duo-ge-githubzhang-hao/)



代码目录混乱怎么办 ？ 强烈推荐使用[projj](https://github.com/popomore/projj) 组织项目目录🚀
&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;


over.