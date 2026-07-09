---
title: syncthing
aliases:
---
Syncthing 是一个开源、免费、跨平台、去中心化的多设备同步工具，支持 Windows、macOS、Linux、Android、FreeBSD、OpenBSD、NetBSD、Dragonfly、Illumos、Solaris 等几乎所有常见平台。

# Syncthing 的优势

- 和 BitTorrent/Resilio Sync 的区别在于，Syncthing 开放源代码，使用开放协议，避免 Resilio Sync 闭源协议的安全问题  
- Syncthing 的同步原理，和 BT 类似，会将文件分片传输，当越多设备在线，那么共享速度越快  
- Syncthing 依赖于一个全局发现服务器，用来通过 Device ID 来发现设备 IP 和 端口，任何人都可以自己架设全局 Discovery 服务器，然后将自己的节点指向该服务器，这样就不必共享全局的服务器了，更甚至不需要依赖与因特网就能够实现局域网内文件同步  
- 关于安全性的[说明](https://link.zhihu.com/?target=https%3A//docs.syncthing.net/users/security.html) 已经列举的非常详细了，所有内容通过 [TLS 加密](https://zhida.zhihu.com/search?content_id=238340893&content_type=Article&match_order=1&q=TLS+%E5%8A%A0%E5%AF%86&zhida_source=entity)传输


# 参考文献

- [多平台开源输入法 RIME 的使用](https://zhuanlan.zhihu.com/p/603692461)
- [使用 Syncthing 进行多设备同步](https://zhuanlan.zhihu.com/p/675948838)
- 