---
layout: default
title: systemd PrivateTmp的坑
keywords: linux, PrivateTmp
description: systemd PrivateTmp的坑
tags: [linux]
---
# Sytemd PrivateTmp的坑

开发调试的时候，遇到一个问题：file_put_contents()时，$file显示的是/tmp/xxx.txt,而这个文件在tmp下并不存在，然并卵，并不影响file_get_contents函数。而实际存在路径是/tmp/systemd-private-xxxxx-php-fpm.service/xxx。

```php
$file = '/tmp/ppp.txt';

#var_dump(file_get_contents($file));
echo substr(sprintf('%o', fileperms('/tmp')), -4);
die;
$re = file_put_contents($file, uniqid(), FILE_APPEND);
var_dump($re);
var_dump(file_exists($file));
var_dump(is_readable($file));
var_dump(is_writeable($file));

var_dump(file_get_contents($file));
var_dump($file);
```

# 原因是什么

只要使用Systemd这个进程作为启动进程的linux系统，其子进程都会有PrivateTmp这么一个属性，用于设置是否使用私有的tmp目录。那么只要设置使用这个属性的service，都会使用私有的tmp目录。比如：
- nginx会有一个systemd-private-xxx-nginx.service/tmp目录
- php-fpm会有一个systemd-private-xxx-php-fpm.service/tmp目录

# PrivateTmp属性有什么好处

/tmp是所有用户和service共享的目录，都有读写权限，那就存在安全性问题，所以每个service将tmp目录隔离，能保证一定的安全性。
每个service在启动的时候创建目录，停止的时候删除目录，好处是不需要单独写定期删除临时文件的脚本了
# 如何设置PrivateTmp属性

如果要禁用php-fpm的PrivateTmp，首先用systemctl找到service对应路径
```
systemctl status php-fpm
```
编辑xxx.service文件，找到PrivateTmp，修改PrivateTmp=false 就OK啦
