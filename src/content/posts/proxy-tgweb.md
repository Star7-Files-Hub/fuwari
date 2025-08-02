---
title: 大陆直连TG Web？触手可及！
published: 2025-08-02
description: 'TG Web采用前后端分离，前端可以部署到静态托管平台，而后端可以用各种服务反代'
image: '../assets/images/2025-08-02-18-10-18-image.png'
tags: [Telegram Web, 反向代理]
category: '记录'
draft: false 
lang: ''
---

# 注意，将该项目绑定到你的域名会吃Abuse

![](../assets/images/2025-08-02-18-30-40-75bf069f14b199651db36b1bda015bc2_720.jpg)

# 原理

TG Web采用前后端分离

前端为静态资产，可以直接部署到Cloudflare Page

后端有高达10个API，反代一下即可

然后将前端请求的 `.web.telegram.org`  改为你的域名即可

# 正式开始

> 以 TG Web K举例子

TG 后端API共有10个，分别为

```bash
pluto.web.telegram.org
venus.web.telegram.org
aurora.web.telegram.org
vesta.web.telegram.org
flora.web.telegram.org
pluto-1.web.telegram.org
venus-1.web.telegram.org
aurora-1.web.telegram.org
vesta-1.web.telegram.org
flora-1.web.telegram.org
```

假如我的域名是 `072103.xyz` ，则为 `pluto.web.072103.xyz` 。其他的以此类推

Fork 仓库： [morethanwords/tweb: Telegram Web K, GPL v3](https://github.com/morethanwords/tweb)

全局搜索 `.web.telegram.org` 替换为 `.web.072103.xyz` 

将该仓库部署到Cloudflare Page，构建命令为 `pnpm build` ，构建输出目录为 `public` 

# 成功

![](../assets/images/2025-08-02-18-21-46-0c8fc3ac93604c65401132aaa59c803d_720.jpg)
