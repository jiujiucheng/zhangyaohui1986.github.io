---
layout: default
title: ubuntu VirtualBox安装增强功能失败
keywords: VirtualBox,增强功能
description: 记录VirtualBox安装增强功能失败遇到的坑
tags: ubuntu,VirtualBox
---

由于工作笔记本卡的巨慢无比，于是强制关机，重启后打开ubuntu 虚拟机，咦，不需要输入登陆密码直接进去了！进去以后蒙圈：
ifconfig 空白， sshd未开启，再次开机重启发现文件系统坏掉了o(╥﹏╥)o，赶紧找备份，竟然找到了！于是恢复快照进去，sshd好了，ifcofnig也正常了，不幸之万幸^_^！然并卵，很快添加共享文件夹时发现安装增强功能失败：
![](https://wx2.sinaimg.cn/large/7c0d9e07ly1fpeghce5tcj20990acaa6.jpg)
## 手动挂载
```
 mount /dev/cdrom    挂载光驱
 cd /mnt/cdrom    进入光盘
 sudo sh ./VBoxLinuxAdditions.run 执行增强功能
```


> Verifying archive integrity... All good.
Uncompressing VirtualBox 5.1.30 Guest Additions for Linux...........
VirtualBox Guest Additions installer
Copying additional installer modules ...
Installing additional modules ...
vboxadd.sh: Starting the VirtualBox Guest Additions.<br>
**Could not find the X.Org or XFree86 Window System, skipping.**

## 查看安装日志
 
```
 cat  /var/log/vboxadd-install.log
```
 > /opt/VBoxGuestAdditions-5.1.32/src/vboxguest-5.1.32/build_in_tmp: 67: /opt/VBoxGuestAdditions-5.1.32/src/vboxguest-5.1.32/build_in_tmp: make: not found
Creating user for the Guest Additions.
Creating udev rule for the Guest Additions kernel module

发现没有make,使用aptitude包管理:
 
 ```
 sudo apt-get install aptitude

 添加ubuntu yun源：
 
 /etc/apt/sources.list下添加一行
 deb http://kr.archive.ubuntu.com/ubuntu  trusty main
 apt-get update 更新源
 
 安装gcc,make
  sudo aptitude install gcc make
 ```

## 再次执行安装
  
  ```
  sh VBoxLinuxAdditions.run 
  ```


## 查看dmesg 日志
![](https://wx3.sinaimg.cn/large/7c0d9e07ly1fpeh7w3zdnj20sg05d74q.jpg)
## 挂载目录到挂载点

 ```
 mount -t vboxsf ubuntu_share /mnt/shared
 ```
 
 完美解决！