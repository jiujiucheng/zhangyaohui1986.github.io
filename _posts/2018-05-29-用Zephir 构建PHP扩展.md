---
layout: default
title: Zephir 构建PHP扩展
keywords: Zephir,PHP,Phalcon
description: Zephir 构建PHP扩展 
tags: Zephir,php-extension
---

用C/C++实现开发PHP扩展，替代原生PHP代码实现某些功能，效率提升明显，但是缺点也明显:入门成本高、开发效率低、一不小心就造成内存泄漏。现在我们有第二个选择，用Zephir构建！

## Zephir
Zephir- Ze(nd Engine) Ph(p) I(nt)r(mediate) - 目标是降低PHP扩展的开发和维护难度。使用Zephir 能把PHP代码转成C代码、同时支持使用C编译器如gcc/clang/g++ 编译、优化。
 >主要特性：
  - 支持动态、静态语言特性
  - 减少执行开销
  - 受限制的面向过程编程，面向对象
  - Ahead-of-time (AOT) 编译器提供可预测的性能指标

## 依赖
  - [re2c](http://re2c.org/)
  - [Zephir Parser](https://github.com/phalcon/php-zephir-parser)
  - [phalcon](https://github.com/phalcon/cphalcon)
  
## 安装

```
 git clone https://github.com/phalcon/zephir.git
 cd zephir
 ./install -c

 # 验证安装
 zephir help
```
## 创建扩展

1. 初始化
```bash
 zephir init utils
```
##### 目录结构
```
.
├── config.json
├── ext
└── utils
```

2. 编写扩展代码逻辑，新增utils/Greeting.zep,内容
```PHP
namespace Utils;
class Greeting
{
        public function who()
        {
                echo "I am edwin";
        }
}
```
3. 编译
```
 zephir build
 # 如果看到如下输出，则说明编译成功
 Compiling...
 Installing...
 Extension installed!
 Don't forget to restart your web server
```
##### 目录结构
```
.
├── compile-errors.log #编译错误日志
├── compile.log #编译日志
├── config.json #配置文件
├── ext #zephir #生成C代码目录
│   ├── ...
└── utils 
    └── Greeting.ze #业务逻辑代码
```
4. 修改php.ini,增加配置
```
 ...
 ; 增加如下
 extension=utils.so
```

## 扩展调用
```
bogon:utils edwin$ php -a
Interactive shell
php > (new Utils\Greeting())->who();
I am edwin
```

## 结束语
是不是发现zephir编写扩展so easy，我们可以如此简单的就写了一个PHP扩展。其实zephir是一门特殊的语言，有自己的新特性，还有很多细节，比如：数组的定义和PHP略有不同，zephir定义数组：`let mArr=[1,2,3]`,想要进一步实践，请参考官方文档[zephir-lang-zh](https://github.com/phalcon/zephir-docs/tree/master/zh)