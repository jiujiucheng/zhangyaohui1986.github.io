---
layout: default
title: 快速搭建Go jsonrpc Server
keywords: GO,jsonrpc,php
description: 快速搭建Go jsonrpc Server 
tags: [jsonrpc,go,php]
---
## 引子
jsonrpc是无状态、轻量级的远程过程调用协议，传递数据格式为JSON。GO 官方提供rpc包和jsonrpc包，与rpc包不同的是,jsonrpc可以实现跨平台通信。本文将介绍如何用Go快速搭建一个jsonrpc Server,用PHP实现jsonrpc client进行验证，同时也记录下验证过程中出现的坑。

## 实现jsonrpc_server

 1. 引入包
```go
import (
    "net/rpc"
    "net"
    "log"
    "net/rpc/jsonrpc"
    "fmt"
)
```
 2. 定义 server端要伺服的 rpc method
```go
// rpc handler
type Edwin int 
// 定义rpc method 第一个参数是请求对象，第二参数是返回对象,返回值是返回rpc 内部调用过程中出现的错误信息
func (this *Edwin) Add(args map[string]float64,res *float64) error  {
    *res = args["num1"] + args["num2"]
    return  nil
}
func (this *Edwin) Multi(args map[string]interface{},res *float64) error {
    *res = args["num1"].(float64) * args["num2"].(float64)
    return nil
}

```
 3. 注册rpc handler,开启server connection
```go
    rpc.Register(new(Edwin))

    l,err := net.Listen("tcp",":11223")

    if err!=nil{
        log.Fatalln("listen error:",err)
    }

    for{
        conn,err := l.Accept()

        if err!= nil{
            log.Fatalln("accept failed:",err)
        }

        fmt.Println("jsonrpc server  start lisen on 11223...")


        go func(conn net.Conn) {
            fmt.Println("a new connection is coming...")
            jsonrpc.ServeConn(conn)
        }(conn)
    }
```

## php实现jsonrpc_client

```php
class JsonRpc {
    private $conn;

    function __construct($host, $port) {
        $this->conn = fsockopen($host, $port, $errno, $errStr, 2);

    }

    public function call($method, $params) {

        $err = fwrite($this->conn, json_encode([
            'method' => $method,
            'params' => array($params),
            'id' => 1,
        ]));

        if (empty($err)) {
            return false;
        }

        stream_set_timeout($this->conn, 0, 300);

        $line = fgets($this->conn);
        if ($line === false) {
            return NULL;
        }

        fclose($this->conn);

        return json_decode($line, true);
    }
}

$client = new JsonRPC("127.0.0.1", 11223);
$client2 = new JsonRPC("127.0.0.1", 11223);
$ret = $client->Call("Edwin2.Multi", array("num1" => 14, "num2" => 20));
$ret2 = $client2->Call("Edwin2.Add", array("num1" => 14, "num2" => 20));
var_export($ret);
var_export($ret2);
```
## 验证
```bash
# 开启 jsonrpc server
go run jsonrpc_server.go
# 正常会输出监听信息
> jsonrpc server  start lisen on 11223...
> a new connection is coming...
# 执行 jsonrpc client
php jsonrpc_clinent.php
# 正常输出以下信息
> array (
  'id' => 1,
  'result' => 280,
  'error' => NULL,
)array (
  'id' => 1,
  'result' => 34,
  'error' => NULL,
)

```
## 验证过程中出现的坑
问题代码：
```php
$err = fwrite($this->conn, json_encode([
            'method' => $method,
            'params' => array($params),
            // 'params' => $params // 不能这么用
            'id' => 1,
        ]));
```
params参数必须用array包含，如果直接传递过去，将报出以下错误信息：
```bash
array (
  'id' => 1,
  'result' => NULL,
  'error' => 'json: cannot unmarshal object into Go value of type [1]interface {}',
)
```
根据JSON-RPC规范,参数params可以是Json Array,也可以是Json Object,可是为什么还报错呢？于是查看源码，发现：
```go
在 src/net/rpc/jsonrpc/server.go 第95行,go官方实现指定params必须是数组：
    var params [1]interface{}
    params[0] = x
    return json.Unmarshal(*c.req.Params, &params)
    ...
```
通过这个坑发现，Go jsonrpc并未严格按照JSON-RPC规范实现。

## jsonrpc server内部处理流程
![](http://ww1.sinaimg.cn/large/7c0d9e07ly1fvqhnd8g9gj20q20jndh9.jpg)
s