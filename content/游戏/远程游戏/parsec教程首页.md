---
title: parsec教程首页
aliases:
  - parsec-guide
---
本文章永久分享链接： https://tflow.top/parsec-guide

随着高性能、低成本视频处理芯片的推出，很明显，以极低的延迟通过互联网传输视频是可能的。从那时起，我们一直痴迷于通过广域网完善点对点、低延迟的游戏流媒体。本指南介绍了如何开始使用我们的低延迟游戏流媒体技术，无论您是想与朋友一起玩还是远程连接到自己的设备。

如果您有一台 Windows 计算机，则可以**将您的计算机变成“主机”**。并使用手柄（或者[虚拟手柄](游戏/远程游戏/keyboard%20splitter%20xbox.md)）、鼠标或键盘低延迟地共享整个屏幕、玩游戏或执行任何操作。

**请严格按照以下教程的顺序一步步操作！**

> [!warning] 学习本文的前提条件
> 掌握[开源魔法工具配置](科学/开源魔法工具配置.md)的内容，**<span style="color: #ff7575">并在你的所有相关设备开启魔法。</span>**

- 我们首先要有一个parsec账号，请查看教程->[注册parsec账号](游戏/远程游戏/parsec/注册parsec.md)
- 为我们的设备安装parsec并在软件中登陆，各设备的安装教程如下：
	- [安装parsec-win端](游戏/远程游戏/parsec/安装parsec-win端.md)
	- [安装parsec-mac端](游戏/远程游戏/parsec/安装parsec-mac端.md)
	- [安装parsec-安卓端](游戏/远程游戏/parsec/安装parsec-安卓端.md)
- 在parsec中首先完成[高级配置](游戏/远程游戏/parsec/高级配置.md)，然后再进行[基础配置](游戏/远程游戏/parsec/基础配置.md)
- 学习并测试[作为客户端或主机](游戏/远程游戏/parsec/作为客户端或主机.md)
- 连接质量不佳，延迟波动大？请阅读[排查延迟问题](游戏/远程游戏/parsec/排查延迟问题.md)自行解决
- 连接失败后parsec上方显示error代码？请阅读[官网解决方案](https://support.parsec.app/hc/en-us/sections/32361179895060-Error-Codes)
- 更多使用技巧
	- [同时连接到多台计算机](https://support.parsec.app/hc/en-us/articles/32361386926868-Connecting-to-multiple-computers-at-once)
	- [降低延迟方案总结](https://www.bilibili.com/opus/691911204352819201)：B站UP总结的方案
		- 双方公网IPV6+Parsec： https://test-ipv6.com/
		- NAT类型
		- 申请公网IPv4
		- [zerotier](游戏/远程游戏/zerotier虚拟局域网.md)+ moon +Parsec：**<span style="color: #ff7575">当前使用方案</span>**
		- sunshine+moonlight+zerotier+moon
			- 视频教程： https://www.bilibili.com/video/BV1oN4ne5Ehg
			- 文本教程： https://zhuanlan.zhihu.com/p/718510054
		- rustdesk直接中继串流
		- 蒲公英 +Parsec
		- zerotier + parsec + Radmin
