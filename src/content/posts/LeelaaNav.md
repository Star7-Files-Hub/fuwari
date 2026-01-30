---
draft: false
title: LEELAA-NAV部署教程
published: 2025-03-20 13:00:00
image: https://random.843003.xyz/images/64.webp
tags:
  - Docker
  - 教程
---

## 部署指南

  

### 部署前准备

  
  

#### 重要提示

  

在部署之前，请先在 NAS 上创建配置文件夹，否则可能导致无法注册的问题。

  

  

例如，如果你计划使用 `/docker/leelaa-nav/config` 作为配置目录：

  

```bash

mkdir  -p  /docker/leelaa-nav/config

```

  
  

## 飞牛NAS部署（推荐）

  

1. 打开飞牛NAS的 Docker 应用

2. 点击"本地镜像"后点击右上角添加镜像，添加下载链接

3. 在"镜像"处输入：`leedaisen/leelaa-nav`，然后点击"确定"

4. 在"本地镜像"中找到 `leedaisen/leelaa-nav`，点击"创建容器"

5. 配置容器：

   - 名称：随意，如 `leelaa-nav`

   - 端口映射：

     - 容器端口：`8676`

     - 主机端口：`8676`（或其他未被占用的端口）

   - 目录映射：

     - 容器目录：`/app/config`

     - 主机目录：选择一个本地目录，如 `/vol1/1000/Docker/leelaa-nav/config`

  

6. 点击"创建"完成部署

  

访问 `http://nas的IP:8676` 即可使用导航页

  

## 使用 Docker Compose 部署

  

1. 创建 `docker-compose.yml` 文件：

   ```yaml

   version: '3'
   services:
     leelaa-nav:
       image: leedaisen/leelaa-nav
       container_name: leelaa-nav
       volumes:
         - <path to app data>:/app/config # 此行需修改为你NAS上的真实路径
       ports:
         - 8676:8676
       restart: always

   ```

  

2. 修改配置：

   - 将 `<path to app data>` 替换为你的实际数据存储路径

   - 根据需要修改端口映射（默认 8676）

  

3. 启动服务：

   ```bash

   docker-compose up -d

   ```

  

## 使用 Docker 命令部署

  

如果你想使用命令行部署，可以执行：

  

```bash

docker run -d \
  --name leelaa-nav \
  -p 8676:8676 \
  -v <path to app data>:/app/config \   # 注意！此行需修改为你NAS上的真实路径
  leedaisen/leelaa-nav

```

  

## 常见问题

  

### 1. 无法注册

**问题**：部署后无法完成注册流程

**解决方案**：

- 确保已经创建了配置文件夹

- 检查文件夹权限是否正确

- 确保 NAS 用户对配置文件夹有读写权限

  

### 2. 端口被占用

**问题**：启动时提示端口被占用

**解决方案**：

- 修改主机端口为其他未被使用的端口

- 检查并关闭占用 8676 端口的其他服务

  

### 3. 数据无法保存

**问题**：添加或修改数据后无法保存

**解决方案**：

- 检查配置目录是否正确映射

- 确认配置目录有写入权限

- 检查磁盘空间是否充足

  

### 4. 访问超时

**问题**：访问导航页面时出现超时

**解决方案**：

- 确认容器正在运行

- 检查端口映射是否正确

- 验证网络连接是否正常

  

## 更新升级

  

### 在飞牛NAS上更新

  

1. 在 Docker 应用中找到 `leelaa-nav` 容器

2. 点击"停止"按钮停止容器

3. 点击"删除"按钮删除容器

4. 在"镜像管理"中删除旧镜像

5. 重新拉取最新镜像并创建容器（保持相同的目录映射配置）

  

### 使用 Docker Compose 更新

  

```bash

# 停止并删除容器

docker-compose down

# 拉取新镜像

docker-compose pull

# 重新启动服务

docker-compose up -d

```

  

### 使用命令行更新

  

```bash

# 停止并删除旧容器

docker stop leelaa-nav
docker rm leelaa-nav
  
# 删除旧镜像

docker rmi leedaisen/leelaa-nav
  
# 拉取新镜像并运行

docker pull leedaisen/leelaa-nav
docker run -d \
  --name leelaa-nav \
  -p 8676:8676 \
  -v /docker/leelaa-nav/config:/app/config \
  leedaisen/leelaa-nav

```