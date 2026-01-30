---
draft: false
title: 使用服务器搭建Bitwarden密码管理器
published: 2025-03-27 14:00:00
image: https://random.843003.xyz/images/56.webp
tags:
  - 教程
  - Docker
  - Bitwarden
---

## 什么是 Bitwarden

Bitwarden 是一个开源的密码管理器。

跨平台支持 Windows、Mac、Linux、iOS、Android 平台，同时也提供了 Chrome、Edge、Firefox、Safari 等浏览器扩展。

  

## 为什么要自搭建 Bitwarden

Bitwarden 支持自部署，密码掌握在自己手里更能放心。本文以 Debian 11 系统为例

  

## 什么是 Bitwarden_rs

bitwarden_rs 并不是 bitwarden 的官方项目，是衍生的第三方实现。Bitwarden server 官方项目的 docker 镜像体积较大，第三方作者于是用 rust 重写，该 docker 镜像体积较小，方便部署，还支持2FA等高级功能。

  

## 准备

  

1. 一台服务器(国内服务器域名需要备案，没未备案尽量选择香港服务器)

2. 一个域名

3. 一个会随机应变的脑子

  

## 教程开始

  

一、安装Docker

  

连接上 SSH 执行命令

```bash

sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo apt-get install vim

```

```bash

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

```

```bash

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

```

  

二、通过Docker部署

  

需要生成一个长随机字符串作为token不要泄露它

执行命令

```bash

openssl rand -base64 48

```

把输出后的结果复制

  

启动容器

创建一个文件命名为 **docker-compose.yml**

  
  

`touch docker-compose.yml`

  

编辑它

  

`vim docker-compose.yml`

  

按下键盘上的 i 键

把下面内容右键粘贴到文件里

```yml

version: '3'
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: always
    environment:
      - TZ=Asia/Shanghai
      - ADMIN_TOKEN=生成的值
      - LOG_FILE=/data/vaultwarden.log
      - LOG_LEVEL=warn
      - SHOW_PASSWORD_HINT=false
      - DOMAIN=https://这里输入你的域名
    volumes:
      - ./bitwarden/data:/data
    ports:
      - 127.0.0.1:1234:80

```

需要把上文生成的字符串替换掉`ADMIN_TOKEN`的值

编辑完成后按下键盘上的`Esc`

然后输入`:wq`回车保存文件

然后执行命令启动服务

  

`docker compose up -d`

  

数据将保存在compose文件目录下的 `/bitwarden/data` 目录

  

三、配置 Nginx

  

由于 Bitwarden 强制使用 Https,需要设置反代并设置证书

这里使用宝塔演示

安装宝塔

```bash

wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh ed8484bec

```

安装完成后进入并登录宝塔

前往软件商店安装 Nginx

安装完成后到网站页面新建一个网站

进入刚刚建立的网站设置

  

![1][1]

  

进入反向代理

![2][2]

照着图片填，然后提交

进入SSL

![3][3]

域名要先进行解析到服务器

然后申请SSL

![4][4]

点击下面的申请，然后等待一会申请SSL

步骤四：访问 Bitwarden_rs

访问域名，注册一个账号，至此，通过Docker成功部署Bitwarden_RS

  

### 禁用其他人注册

执行命令

```bash

docker compose down

```

编辑文件

```bash

vim docker-compose.yml

```

按下键盘上的 i 键

把下面内容右键粘贴到文件里

```yml

version: '3'
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: always
    environment:
      - TZ=Asia/Shanghai
      - SIGNUPS_ALLOWED=false
      - INVITATIONS_ALLOWED=false
      - ADMIN_TOKEN=生成的值
      - LOG_FILE=/data/vaultwarden.log
      - LOG_LEVEL=warn
      - SHOW_PASSWORD_HINT=false
      - DOMAIN=https://这里输入你的域名
    volumes:
      - ./bitwarden/data:/data
    ports:
      - 127.0.0.1:1234:80

```

注意需要替换 `ADMIN_TOKEN` 和 `DOMAIN` 的值

然后按下`Esc`，输入`:wq`后回车，

再次启动容器

```bash

docker compose up -d

```

客户端下载

[Bitwarden][5]

打开客户端后需要选择自托管

![6][6]

然后进行注册登录

### 完成

  
  

[1]: https://blog.843003.xyz/usr/uploads/2025/03/3393308640.png

[2]: https://blog.843003.xyz/usr/uploads/2025/03/1678222593.png

[3]: https://blog.843003.xyz/usr/uploads/2025/03/3838537998.png

[4]: https://blog.843003.xyz/usr/uploads/2025/03/1609890183.png

[5]: https://bitwarden.com/download/

[6]: https://blog.843003.xyz/usr/uploads/2025/03/2226830341.png