---
layout: default
title: docker cron the input device is not a TTY
keywords: dockre,cron
description: dockcer 宿主机执行cron脚本 
tags: [dockcer,cron]
---

在cron中使用 docker exec -it djy-php7.0 /bin/sh /var/www/html/dangtong/check_dept.sh
执行shell脚本时，遇到了这个问题。
解决方法很简单，只需要去掉上面的命令中的-it即可．
