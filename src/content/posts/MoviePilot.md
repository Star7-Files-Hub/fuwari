---
title: MoviePilot如何使用企业微信通知及交互
date: 2025-03-17
cover: https://wp-cdn.4ce.cn/v2/MyNZqCP.jpeg
tags:
  - 教程
  - NAS
  - Docker
  - 内网穿透
---

一、前言

----

  

##### 因在微信群内看到群友发送的MoviePilot使用企业微信通知及交互的截图令我眼红，所以出一期教程来帮助有需要的朋友们。

首先我们需要知道MoviePilot微信通知渠道是什么？简单来说通过设置企业微信、网络穿透容器之后让你的MoviePilot和微信之间有了双向通讯的能力，因为微信我们基本一天都在使用，只需要发一个电影名就能自动开始下载这是多么玄幻的操作，就像有个小助理帮你去下载！

![2025-03-18 09:24:31.png](https://hz.torimg.com/20250902/30e78dae8434093befc39643057aa736.png)

如上图所示即交互功能，还有其他功能就不一一说了，总之就是MoviePilot必备！经过群里的兄弟们反复折腾总结，总算把怎么设置摸了个门清，现在我总结一下，方便群友使用。

  

二、准备工作

----

  

1. 一个固定 IP 的服务器用于转发消息

2. 服务器里面的微信代理容器，如下所示使用Docker安装，安装完成后可使用```http://IP:端口```测试是否正常访问，出现“微信代理搭建成功！”即为安装完成

```yaml

version:'3.3'

services:

    wxchat:

        container_name:wxchat

        restart:always

        ports:

            - '8080:80' # 此处端口看个人喜好，服务器安全组别忘记开放哦~

        image:'ddsderek/wxchat:latest'

```

3. 自己注册一个企业微信

4. 在自己的Docker或者[飞牛][1]应用商店里面搭建一个<a href=https://gofrp.org/zh-cn/docs/>Frp</a>穿透工具

5. Frpc配置文件需要修改如下：配置文件名称：frpc.toml

```toml

# Frps 服务端配置文件

  

# 通用配置

bindPort = 8633 # 此处为服务端开放端口，记得安全组放行端口

kcpBindPort = 8633 # kcp加速绑定的是udp端口，可以和bindPort一样

```

```toml

# Frpc 客户端配置文件

  

# 通用配置

[common]

server_addr = "122.xxx.xxx.xxx" # 此处填你服务器端的IP

server_port = 8633 # 此处填你服务器端开放的端口

token = "qwertyuiopasdfghjkl" # 此处填你服务器端设置的token，如未设置即无需此行

  

# 要建立的映射服务配置

[MP1]

type = "tcp" # 此行默认保持不动

local_ip = "192.168.10.88" # 将等号后面的IP换成自己的MoviePilot内网IP

local_port = 3000 # 将等号后面的端口后换成自己MoviePilot的端口号

remote_port = 6668 # 将等号后的端口号换成自己想用的端口号，需在服务器安全组放行端口

```

Frp部署教程可参阅[官方文档][2]

  

三、教程开始

----

  

 1. 企业微信登录

下载企业微信 App，使⽤微信号登录。如果是第⼀次会需要注册流程。

打开```https://work.weixin.qq.com/wework_admin/loginpage_wx?from=myhome```，使⽤企业微信扫码登录。

 2. 创建应用

应⽤管理–创建应⽤

![2025-03-18 10:07:52.png](https://hz.torimg.com/20250902/ab305e234b653ff1ac1e4b386a1e97da.png)

填写应用信息

![2025-03-18 10:09:09.png](https://hz.torimg.com/20250902/faa5c9a076b8a1c612c6fed9e7868d0c.png)

此处可见部门/成员建议选最上级部门以免出现权限问题

![2025-03-18 10:11:48.png](https://hz.torimg.com/20250902/113b54d6c9d8a58c67c15dfb45f26c2d.png)

图标可⾃⼰选择，需要 150×150 分辨率图标。这⾥提供MoviePilot图标下载：

```https://raw.githubusercontent.com/jxxghp/MoviePilot-Frontend/main/public/logo.png```

 3. 获取应用基础参数

打开 MoviePilot，左侧栏 设定–通知-'+'号–选择微信

![2025-03-18 10:14:38.png](https://hz.torimg.com/20250902/b562f349c6139cd00448f7715b82b1cc.png)

MoviePilot-v2需要的机器⼈参数有下图这些，需要分步获取，其中消息类型请根据需求⾃⼰选择需要在微信通知的内容，名称随意可按⾃⼰喜好修改，接下来让我们获取这些参数

![2025-03-18 10:17:33.png](https://hz.torimg.com/20250902/b2a73759c460adb5453e0672deada08e.png)

a. 企业ID：我的企业–企业信息–企业ID

![2025-03-18 10:19:28.png](https://hz.torimg.com/20250902/f8ce3464b2f11136191bd85c3536aab3.png)

b. 应⽤管理–刚才创建的机器⼈–应⽤AgentID/应⽤Secret这个Secret必须在手机或者电脑企业微信客户端才能收到

![2025-03-18 10:22:53.png](https://blog.843003.xyz/usr/uploads/2025/03/2897973593.png)

本教程使⽤微信转发⽅案，所以要填入服务器微信代理地址，也就是我们准备工作中的第二步的代理地址，填写完毕之后先点击保存，别忘了再点⼀次通知渠道下的保存。

![2025-03-18 11:32:05.png][3]

c. 配置机器⼈交互参数，测试 API 是否可⽤

找到MoviePilot-设定–API令牌，将API令牌拼接在下⾯的链接最末尾

![2025-03-18 10:37:31.png](https://hz.torimg.com/20250902/4ada1fa97ba2828c5e9905ab0cdca6a3.png)

你的服务器IP或域名+端⼝号（Frpc穿透配置文件自己选的/api/v1/message/?token=（上图中的令牌，也可以自定义 16 位以上）

比如：```http://moviepilot.test.site:6668/api/v1/message/?token=abcdefghijklmnop```

在浏览器访问这个地址，返回{"status" :"OK"}即为正常 接收消息

d. 回到企业微信，找到应⽤管理–刚才创建的机器⼈-功能–接受消息–设置API接收

![2025-03-18 10:40:36.png](https://hz.torimg.com/20250902/ff7ea40ddd90f5f0061b9ab66fb5f6a7.png)

复制刚才举例的地址，换成你自己的，比如上面这串：```http://moviepilot.test.site:6668/api/v1/message/?token=abcdefghijklmnop```

![2025-03-18 10:42:19.png](https://hz.torimg.com/20250902/98f5fe5b4c29ffe4c68cf7ed7d57eeb0.png)

把这个地址填写到URL中，Token和EncodingAESKey分别点击⼀次随机获取，将这⾥获取到的内容填写到MP的通知中保存

再回到⽣成Token和EncodingAESKey的微信页⾯点保存，如果顺利则会绑定成功！

将你的服务器IP地址填写进企业可信IP内，保存，⾄此，企业微信配置结束！

  

四、设置常用微信接收消息

----

  

点击我的企业—点击微信插件，扫描下方二维码进行关注即可在微信发送消息交互啦！

![2025-03-18 10:51:05.png](https://hz.torimg.com/20250902/e626548aab6a26e5d70301204b9c9b6b.png)

  
  
  

[1]: https://www.fnnas.com/

[2]: https://gofrp.org/zh-cn/docs/

[3]: https://hz.torimg.com/20250902/cccbabd862de9612868117e68c644cbd.png