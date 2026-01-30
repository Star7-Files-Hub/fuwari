---
draft: false
title: 如何安装Typecho博客程序
published: 2025-03-18
image: https://random.843003.xyz/images/165.webp
tags:
  - 教程
  - Blog
  - 博客
---

### 一、前言

  

这两天有个好朋友来问我博客怎么搭建的，所以有了这篇文章

  

### 二、准备工作

  

##### 1. 云服务器一台，这里以阿里云服务器为例

  

##### 2. 域名一个，玩NAS的应该都有吧，没有就去[腾讯云][1]、[阿里云][2]等云服务提供商处购买，如对域名没有硬性要求推荐```.xyz```后缀域名，最低仅需6元/年，需满足纯数字要求

  

##### 3. [宝塔][3]或者[1Panel][4]等运维面板

  

##### 4. [Typecho博客程序][5]

  

### 三、教程开始

  

##### 1. 安装宝塔

这里我在虚拟机上操作演示，输入命令后会提示是否安装，键入```y```即可

```bash

if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ed8484bec

```

等出现这条通知即为安装完成！进入命令行提示的面板地址，使用提示的用户名与密码登录即进入宝塔面板

![2025-03-18T07:57:45.png][6]

首次进入需要绑定堡塔账号，若没有可去官网免费注册一个

![2025-03-18T08:00:28.png][7]

此处选择LNMP一键安装即可

![2025-03-18T08:02:27.png][8]

安装途中可先去[Typecho官网][9]下载程序

首次安装宝塔需前往数据库重置下root密码，此密码非ssh密码

![2025-03-18T08:10:25.png][10]

待弹出密码点击确定即可

![2025-03-18T08:11:07.png][11]

##### 2. 网站部署

现在让我们点击网站，点击添加站点

![2025-03-18T08:12:06.png][12]

首行填写你自己的域名及服务器IP，可使用子域名，启用数据库，PHP版本可用默认版本也可自行升级降级，注意不可低于PHP7.4，数据库密码可自行修改也可默认，项目确认完成点击确认即可

![2025-03-18T08:13:17.png][13]

点击高级设置，让我们将此站点设置为默认站点以免IP访问显示无此站点

![2025-03-18T08:19:05.png][14]

现在让我们进入网站根目录，将下载好的程序上传并解压

![2025-03-18T08:15:32.png][15]

![2025-03-18T08:15:59.png][16]

![2025-03-18T08:16:47.png][17]

解压完成后让我们打开服务器IP，如果你的域名有解析到你的服务器也可以直接用域名打开，不出意外打开应该是这样的，点击“我准备好了，开始下一步”

![2025-03-18T08:20:47.png][18]

此处只需填写数据库用户名，数据库密码，数据库名

![2025-03-18T08:22:10.png][19]

根据宝塔面板中来填写，也可新建数据库填写

![2025-03-18T08:25:57.png][20]

填写完毕点击“确认，开始安装”

![2025-03-18T08:27:00.png][21]

此处根据你自己来填写

![2025-03-18T08:27:30.png][22]

出现此条即为安装成功！

![2025-03-18T08:28:17.png][23]

  

### 四、其他问题

  

当启用永久链接中的“地址重写”功能时提示这个怎么办？

![2025-03-18T09:21:25.png][24]

只需到宝塔中设置下伪静态即可

![2025-03-18T09:22:31.png][25]

选择好后确认就可以啦

![2025-03-18T09:23:00.png][26]

  
  

### 五、扩展资料

  

##### 1. [Typecho主题站][27]

##### 2. [Typecho插件精选][28]

  
  

[1]: https://cloud.tencent.com/

[2]: https://www.aliyun.com/

[3]: https://www.bt.cn/new/index.html

[4]: https://1panel.cn/

[5]: https://typecho.org/

[6]: https://hz.torimg.com/20250903/cece08ed1fa67a4f368137e336ad4379.png

[7]: https://hz.torimg.com/20250903/ee811f67ae49dcac4a0b7572007eddb3.png

[8]: https://hz.torimg.com/20250903/d281c81fe1e8e153d97beabf4ad2c66f.png

[9]: https://typecho.org/

[10]: https://hz.torimg.com/20250903/c0376556f90eb15c9270b7fd2dcb58e6.png

[11]: https://hz.torimg.com/20250903/35cba524aa6370cb97e2eacc7722d7d6.png

[12]: https://hz.torimg.com/20250903/6346564a32299026446db28240bf284f.png

[13]: https://hz.torimg.com/20250903/ad375c8da1f98f0c087610467256b180.png

[14]: https://hz.torimg.com/20250903/1ffb65b5fe939736611e5ca79d4a9e71.png

[15]: https://hz.torimg.com/20250903/ee6406e81dddf5b7b9289925bd872101.png

[16]: https://hz.torimg.com/20250903/21d888b94943f2215cb79da3eab555e2.png

[17]: https://hz.torimg.com/20250903/4bda5994d74a2ee85296dd4cf9b5e692.png

[18]: https://hz.torimg.com/20250903/9fd85870ddaca46b04355cfd47eaad90.png

[19]: https://hz.torimg.com/20250903/1ac0d2ff510d8a8a637194f954ee02ab.png

[20]: https://hz.torimg.com/20250903/c9f68290e781e62f9c59c697551077b3.png

[21]: https://hz.torimg.com/20250903/87be073990517b2b80508f57c320a2c5.png

[22]: https://hz.torimg.com/20250903/6eebd8bebe87c538bc2abf5ea7f7758a.png

[23]: https://hz.torimg.com/20250903/19aae4a10ce2b86dea5fbba87beee018.png

[24]: https://hz.torimg.com/20250903/7903e0c84c4d51f238f316419f03235e.png

[25]: https://hz.torimg.com/20250903/cb46070bba6236ddc28199b137c8f7a8.png

[26]: https://hz.torimg.com/20250903/455b873a1d6b94e7fd7f46b71a765275.png

[27]: https://typechx.com/

[28]: https://typechx.com/plugins/