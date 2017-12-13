---
layout: default
title: 阿里云docker仓库
keywords: 阿里云,docker,国内docker仓库
description: '使用阿里云仓库管理自己的镜像,简单、轻松几步就上手！'
tags: [linux,docker,aliyun]
---

docker是越来越火了，在使用的过程中有没有感觉到下载速度慢？使用阿里云docker仓库解决，速度就嗖嗖的啦。话不多说，下面就开始阿里云docker仓库的使用之路。

## 阿里云容器镜像控制台

```
https://cr.console.aliyun.com

```

没有账号？注册一个先，然后设置登陆密码，创建命名空间、选择离你最近的仓库地址（我选择了华东），创建镜像仓库.

## 推送自己的镜像到阿里云仓库

### 1. 登陆阿里云仓库

```bash
docker login --username=edwin1122 registry.cn-hangzhou.aliyuncs.com
```
### 2. 创建Dockerfile

这里为了测试，我创建了一个简单的Dockerfile:

```bash
FROM busybox
CMD echo hi Edwin!
```
### 3. 生成镜像

```bash
docker build -t registry.cn-hangzhou.aliyuncs.com/hui692/edwin-hell0:1.0
```
> Tips:tag必须是docke-host后面跟你自己创建的命名空间，最后才是镜像名。我的docker-host：registry.cn-hangzhou.aliyuncs.com，命名空间：hui692，这点一定要注意，不然会默认推送到docker.io 这个官方仓库~

    
### 4. 推送镜像

```bash
docker push registry.cn-hangzhou.aliyuncs.com/hui692/edwin-hell0:1.0
```

最后就可以在阿里云控制台管理界面看到自己的镜像啦！

## 最后

阿里云docker仓库方便了开发者们管理自己的镜像，为阿里云打call!

