---
layout: default
title: codePush Server 搭建及简单使用
keywords: codePush, node, npm
description: 使用node搭建codePush Server，简单体验reactNative 热更新
tags: [codePush, reactNative]
---
CodePush 是微软提供的一套用于热更新 React Native 和 Cordova 应用的服务。
CodePush 是提供给 React Native 和 Cordova 开发者直接部署移动应用更新给用户设备的云服务。CodePush 作为一个中央仓库，开发者可以推送更新 (JS, HTML, CSS and images)，应用可以从客户端 SDK 里面查询更新。CodePush 可以让应用有更多的可确定性，也可以让你直接接触用户群。在修复一些小问题和添加新特性的时候，不需要经过二进制打包，可以直接推送代码进行实时更新。

## 安装node
```
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 下载codePUsh 代码并安装
```
git clone https://github.com/lisong/code-push-server.git
cd code-push-server && npm install -g
```
## 初始化数据库
```
code-push-server-db init --dbhost localhost --dbuser root --dbpassword 123456
```
## 启动code-push-server,默认监听0.0.0.0/3000

```
sudo code-push-server
```

## 管理发布更新版本命令行工具,安装后可以在终端使用code-push命令
```
npm install code-push-cli@latest -g 
```
## 登陆codePush server
```
code-push login http://192.168.71.142:3000 #用户名admin,密码123456

#创建android版，获取获取Production DeploymentKey
code-push app add CodePushDemo-android android react-native 
#创建iOS版, 获取Production DeploymentKey
code-push app add CodePushDemo-ios ios react-native 【其中项目名必须后缀用-ios或者-android写】

#其他命令
code-push logout #登出
code-push access-key ls #列出登陆的token
code-push access-key rm <accessKye> #删除某个 access-key
```

## 安装codepush的RN插件，项目跟目录运行以下代码：
npm install --save react-native-code-push

## 将插件和项目建立链接。如要用RNPM指令，所以先安装RNPM
```
1. 安装rnpm:
npm i -g rnpm
2. 建立关联【根目录下】：
rnpm link react-native-code-push
3. 询问是否输入ios和安卓的key，在这里直接回车忽略即可
【如果忘记app的key，可以通过以下指令来查看】
code-push deployment  ls -k 项目名
```

codePush server安装，更多操作请百度。