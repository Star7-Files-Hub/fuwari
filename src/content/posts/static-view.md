---
title: 静态博客也想展示文章浏览量？当然可以！
published: 2025-06-18
description: '利用Umami等站点分析软件可以让管理员了解站点活跃度，但是如果我们想向用户展示一些数据呢？'
image: 'https://fast-r2.afo.im/myblog/img/db0ed566-92be-4b34-81b7-d5cf8618c1e8.webp'
tags: [Cloudflare, Umami]
category: '教程'
draft: false 
lang: ''
---

# 引言

如果你用过WordPress，Halo等动态博客框架，你大概会在用户视角访问博文的时候看到浏览量这个信息。

这个原理很简单，因为动态博客依赖于一个VPS，只需要让用户每次访问的时候给浏览量+1即可。

那么如果我们是静态博客呢？

我们可以依赖一些第三方服务，比如[Umami Cloud](https://umami.is)。在你的静态博客的head注入一个js，这样你就可以看到你的站点分析了，类似下图

![](https://fast-r2.afo.im/myblog/img/2c1e7d81-6f6d-4323-b0de-013b2d168be1.webp)

现在我们确实可以看到每个文章（即/posts/xxx）的访问量了，但是我们要如何展示给用户呢？

# 使用Umami API查询

> 这个API太煞笔了，API文档到处乱扔，调用接口每一页都不一样。但是我已经帮你们摸清楚了😋

首先我们要创建一个API Key

![](https://fast-r2.afo.im/myblog/img/e8d57efd-60f8-402d-bc36-331feef5aa57.webp)

接下来获取你的站点ID，请不要泄露！否则你的站点统计数据可能会不再真实！

![](https://fast-r2.afo.im/myblog/img/99f9eea0-3e8f-4513-9486-d0cf04d50204.webp)

拼接URL，尝试手动调用。参考文档： https://umami.is/docs/api/website-stats-api

```firestore-security-rules
curl --location 'https://api.umami.is/v1/websites/你的站点ID/pageviews?startAt=0&endAt=1750177628313&unit=year&timezone=Asia/Shanghai&url=要查询的路径' \
--header 'x-umami-api-key: 你的Umami Cloud API Key'
```

这里解释几个关键Params，其他的照搬

startAt：统计开始时间。Unix时间戳，我们填写为0让Umami从1970年开始统计

endAt：统计结束时间。Unix时间戳，我们可以使用 `Date.now()` ，即当前时间，和startAt参数联动即可实现统计总浏览量

url：要查询的路径，填写为你的文章页去除了Host的路径，如 `/posts/hello` 。注意！Umami会将 `/posts/hello` 和 `/posts/hello` 视为两个不同的路径，请注意你的博客框架是否使用 `/` 

最终你大概会得到一个这样的响应，如图

```json
{
    "pageviews": [
        {
            "x": "2024-12-31T16:00:00Z",
            "y": 12932
        }
    ],
    "sessions": [
        {
            "x": "2024-12-31T16:00:00Z",
            "y": 3253
        }
    ]
}
```

这就代表你的这篇文章的浏览量为12932次，而访问数为3253

> Tips：浏览量记录为任意用户只要访问了则计数一次。而访问数记录不会记录单IP多次重复访问和同一时间段的多次请求不同页面

需要注意，Umami Cloud API有速率限制：**每个 API 密钥限制为每 15 秒 50 次调用。**

你当然可以创建多个API做API池，但是我们不能直接将API Key暴露给用户，所以无论如何，我们都需要一个反代API来帮我们查询

# 使用Cloudflare Worker代理查询

具体代码就不写了，AI时代自己实现吧。

大致逻辑为帮你查询然后记录到KV设置缓存（防止Umami API到达速率限制）

Over，享受它吧！最终效果：

![](https://fast-r2.afo.im/myblog/img/ce822960-f7ef-444e-84d1-fa0758e2b5e8.webp)
