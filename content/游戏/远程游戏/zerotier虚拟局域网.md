---
title: zerotier虚拟局域网
aliases:
  - zerotier
---
本文章永久分享链接： https://tflow.top/zerotier

参考自： https://support.parsec.app/hc/en-us/articles/32381869150868-Using-a-VPN-ZeroTier-to-Connect-on-Parsec

zerotier是用于虚拟局域网组网的VPN工具，它在设备中创建虚拟网卡zerotier，将多个设备通过UDP打洞，组成一个虚拟的局域网，可利用这个局域网来进行本地多人游戏或者改善远程控制的连接质量。

本文介绍如何使用zerotier来搭建虚拟局域网

# 安装并新建虚拟局域网

在客户端和主机[点击我](https://www.zerotier.com/download/)以下载zerotier，zerotier支持几乎所有设备！

安装好后，主机此时[点击本链接](https://my.zerotier.com/network)进入zerotier central，点击`login`登陆，如下图所示，推荐选择google登陆。

![|400](Afile/zerotier搭建虚拟局域网-20251011113715720.webp)

登陆以后，点击`creat a network`，当虚拟局域网建立后，它将显示在黄色按钮下方。如下图所示单击network名称进入设置页面：

![|400](Afile/zerotier搭建虚拟局域网-20251011114149215.webp)

进入设置页面后，粘贴 networkID 发给客户端，让客户端加入你的虚拟局域网，如下图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011114543774.webp)

此时，主机和客户端都应该从开始菜单打开 ZeroTier。这将使 ZeroTier 图标显示在任务栏的右下角：

![|400](Afile/zerotier搭建虚拟局域网-20251011114716748.webp)

主机和客户端都应该鼠标右键单击任务栏中的 ZeroTier 图标，然后单击`join new network`，如下图所示

![](Afile/zerotier搭建虚拟局域网-20251011114811327.webp)

将网络 ID 粘贴到弹出的文本框，然后单击`join`，如下图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011115018408.webp)

主机和客户端都加入虚拟局域网后，主机返回到zerotier central中的设置页面，并在`remember`页面中勾选刚刚加入虚拟局域网的两个设备，点击`authorize`批准两个设备接入虚拟局域网。如图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011115543627.webp)

完成以上步骤后，双方可利用zerotier分配给各自设备的ip来进行远程连接或者局域网联机。

![|400](Afile/zerotier搭建虚拟局域网-20251011120024051.webp)

可以在适配器选项中看到zerotier新建了一个该networkID的虚拟网卡。

**<span style="color: #ff7575">如果确认不使用该虚拟局域网，请右键zerotier图标后点击disconnect中断连接，否则即使退出了zerotier软件，zerotier网卡将仍然生效。</span>**


![|400](Afile/zerotier搭建虚拟局域网-20251011120155705.webp)

# 如果虚拟局域网没有生效？

如果主机和客户端按照以上步骤成功加入虚拟局域网，但虚拟局域网不生效，比如Parsec仍然无法连通双方，可能双方还需要在各自的 Windows 上将 ZeroTier 的虚拟网卡设置为最高优先级。按 `Win+ R`，键入 `control netconnections`，然后按`OK`，如下图所示

![|400](Afile/zerotier搭建虚拟局域网-20251011120414388.webp)

右键单击 `ZeroTier`，单击“属性”，然后单击“Internet 协议版本 4”，然后单击“高级”，如下图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011120744029.webp)

取消勾选`自动跃点`，将`接口跃点数`设置为1，如下图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011120919654.webp)

完成后点击确定应用设置，对列表中可用的其他网卡重复这些步骤，但将接口跃点数均设置为大于 1 的数字。确保在每个窗口上单击“确定”以应用设置。

重新启动计算机以确保这些更改反映在您的系统中。

完成以上步骤后，虚拟局域网应该能够生效，应用于局域网组网应用（远程控制，局域网联机）。

如果连接时仍然遇到问题，你们都应该检查**接口跃点数**是否仍然正确应用于所有网络，以**及 ZeroTier 的数字是否低于其他所有网络**。还要确保 **ZeroTier 仍在两台设备上运行**，即zerotier网卡仍然存在。
