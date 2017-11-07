---
layout: default
title: ERR_INCOMPLETE_CHUNKED_ENCODING 问题排查
keywords: chrome,nginx
description: 'chrom浏览器吐出部分内容，控制台报错:ERR_INCOMPLETE_CHUNKED_ENCODING'
tags: [linux,nginx,chrome]
---

开发调试一个接口时，chrom浏览器吐出部分内容，控制台报错:
`Failed to load resource: net::ERR_INCOMPLETE_CHUNKED_ENCODING`,于是查看nginx 错误日志：
```
[crit] 7476#0: *954 open() "/usr/local/var/run/nginx/fastcgi_temp/8/02/0000000028" failed (13: Permission denied) while reading upstream, client: 127.0.0.1, server: 127.0.0.1, request: "GET /v1/report/error-list?dept_id=68 HTTP/1.1", upstream: "fastcgi://unix:/tmp/php-cgi.sock:", host: "127.0.0.1:8202"
```
看起来是权限问题，于是查看权限：
```
 ll /usr/local/var/run/nginx/proxy_temp
drwx------  12 _www  admin  408 11  7 14:24 fastcgi_temp
```
果断修改之：
```
sudo chown -R www:www /usr/local/var/run/nginx/
```
然后再测试下接口，chrome不再报错，内容全部返回，大功告成！

# nginx fastcgi_tmp 的作用
对于来自 FastCGI Server 的 Response，Nginx 将其缓冲到内存中，然后依次发送到客户端浏览器。缓冲区的大小由 fastcgi_buffers 和 fastcgi_buffer_size 两个值控制。
比如如下配置：
```
fastcgi_buffers      8 4K;
fastcgi_buffer_size  4K;
```
意思就是nginx将创建8*4k +4k =36k的缓冲区。如果response 内容小于36K,直接内存处理，那么大于36k，将触发部分内容写到fastcgi_tmp目录的临时文件。所以，正是由于fastcgi_tmp 目录权限问题导致部分内容显示。

显然，fastcgi_buffers 设置太小，nginx将频繁读写磁盘，影响系统性能,所以fastcgi_buffers 参数调整很重要啊^_^


