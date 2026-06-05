---
title: 如何保护网络隐私
aliases:
  - proxy/Protect-online-privacy-win
---
本文章永久分享链接： https://tflow.top/proxy/Protect-online-privacy-win

> [!NOTE]- 参考文献
> [Windows 系统下 Clash 系代理软件虚拟网卡（TUN）模式的 DNS 泄露问题及解决方案](https://wildprobe.com/soft-technical/dnsleak/)

以下出现的"XXX"字符均等同于 `las`， 比如bxxxh即为`blash`

# DNS 泄露的影响

如果你的网络环境中存在 DNS 泄露，那么你的运营商可以追踪你的网络行为，获取你的目标域名。  
例如，你访问某国外网站，运营商可以获知你正在访问这个国外网站。

# DNS泄露的原因及复现

在 Windows 7 以上版本的 Windows 操作系统中，系统默认的**多宿主名称解析策略**会同时向系统内所有网卡发起 DNS 查询请求，cxxxh 无法拦截发给物理网卡的 DNS 查询请求。因此在系统默认配置下，开启虚拟网卡模式，必然出现 DNS 泄露。

注：本内容含义为从技术层面运营商可以**获知你的目标域名**，而不是你的运营商一定做了获知你目标域名的操作。

第一步，如下图所示 cxxxh 开启虚拟网卡模式，分流规则选择为全局。

![|400](Afile/如何保护网络隐私-20260605102609583.webp)

![|400](Afile/windows如何保护网络隐私-20260605102944672.webp)

第二步，打开 [https://browserleaks.com/dns](https://browserleaks.com/dns)， 如果 DNS 列表中如下图所示出现中国 DNS 地址，则你的网络环境中存在 DNS 泄露。

![](Afile/windows如何保护网络隐私-20260605103317627.webp)

# 如何解决DNS泄露

复制以下指令：

```
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient" /v DisableSmartNameResolution /t REG_DWORD /d 1 /f
```

按`win+S`，搜索 **`CMD`**，找到“命令提示符”，点击 **以管理员身份运行**， 如图所示

![|400](Afile/windows如何保护网络隐私-20260605110954038.webp)

将上面的指令粘贴到窗口中并按 回车键 执行。执行完成后，重启电脑即可。

重启完再次 开启虚拟网卡模式，分流规则选择全局，打开 [https://browserleaks.com/dns](https://browserleaks.com/dns)，如果这次不出现中国 DNS 地址则 解决了DNS泄露的隐私风险。

**<span style="color: #ff7575">解决问题后，记得将分流规则重新选择为规则，从而避免影响国内服务访问。</span>**

# 关闭浏览器QUIC功能








