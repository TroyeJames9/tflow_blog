---
title: syncthing
aliases:
---
Syncthing 是一个开源、免费、跨平台、去中心化的多设备同步工具，支持 Windows、macOS、Linux、Android、FreeBSD、OpenBSD、NetBSD、Dragonfly、Illumos、Solaris 等几乎所有常见平台。

# 优势

- 和 BitTorrent/Resilio Sync 的区别在于，Syncthing 开放源代码，使用开放协议，避免 Resilio Sync 闭源协议的安全问题  
- Syncthing 的同步原理，和 BT 类似，会将文件分片传输，当越多设备在线，那么共享速度越快  
- Syncthing 依赖于一个全局发现服务器，用来通过 Device ID 来发现设备 IP 和 端口，任何人都可以自己架设全局 Discovery 服务器，然后将自己的节点指向该服务器，这样就不必共享全局的服务器了，更甚至不需要依赖因特网就能够实现局域网内文件同步  
- 关于安全性的[说明](https://link.zhihu.com/?target=https%3A//docs.syncthing.net/users/security.html) 已经列举的非常详细了，所有内容通过 [TLS 加密](https://zhida.zhihu.com/search?content_id=238340893&content_type=Article&match_order=1&q=TLS+%E5%8A%A0%E5%AF%86&zhida_source=entity)传输

# 安装

除了安卓以外的设备在 Syncthing 官网找到对应的版本下载安装即可： https://syncthing.net/downloads/

由于谷歌让应用商店的发布变得异常困难甚至不可能，所以官方的安卓应用已停更，由**Catfriend1** 自发继续维护了 syncthing-fork 分支版本。

访问 https://github.com/researchxxl/syncthing-android 以下载安卓版本。

安装windows版本的Integrations版本时，会遇到配置步骤，如图所示，记住端口号为8384

![](Afile/syncthing-20260723105018367.webp)

# GUI初次配置

第一次打开GUI配置页面（即本地8384端口），会提示设置用户和密码，点击 `设置`即可

![](Afile/syncthing-20260723105838901.webp)

# GUI的基本使用

Syncthing 的使用主要是通过其提供的 Web GUI 实现的，这种基于 Web GUI 的操作方式也使得不同的平台上的操流逻辑可以高度一致。

## 添加同步设备

在 Web GUI 的右下角「Remote Devices」板块，罗列了所有已经连接的远程设备，这些都是有权利可以参与文件同步的设备。

下图中已经添加了两个设备，显示的状态都是「Up to Date」，并且第一个设备的网络条件比第二哥设备的网络条件差一些（从右边的信号状的图标可以看出）。

![](Afile/syncthing-20260723111345625.webp)

点击上图右下角的「添加远程设备」，然后在弹出的窗口中输入「Deivce ID」（下图红框处），再点击 「保存」即可。也可以去设置该设备名称与设备组。

![](Afile/syncthing-20260723114354056.webp)

## 添加同步文件夹

点击 Web GUI 上的「添加文件夹」，在「文件夹路径」的位置输入我们需要同步的文件夹的路径。

# 我的syncthing实战

- [RIME开源输入法](杂记/软件/RIME开源输入法.md)的多端同步。重点是不能同时同步。
- 相册同步计划（分为我的相册与 我和宝贝的共同相册）
- 歌单同步计划 （电脑与手机间的同步）
- #TODO 替代seafile以同步服务器的工作文件夹（比如quartz）

# 本文档编写计划

#TODO  继续了解syncthing配置技巧和更新备份。

# 参考文献

- [多平台开源输入法 RIME 的使用](https://zhuanlan.zhihu.com/p/603692461)
- [使用 Syncthing 进行多设备同步](https://zhuanlan.zhihu.com/p/675948838)
- [Syncthing 安卓版未来会如何发展？官方应用将不再更新。](https://www.reddit.com/r/Syncthing/comments/1iglny1/what_is_the_future_of_syncthing_on_android_as_the/)