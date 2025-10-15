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

# 主机/客户端加入虚拟局域网

此时，主机和客户端都应该从开始菜单打开 ZeroTier。这将使 ZeroTier 图标显示在任务栏的右下角：

![|400](Afile/zerotier搭建虚拟局域网-20251011114716748.webp)

主机和客户端都应该鼠标右键单击任务栏中的 ZeroTier 图标，然后单击`join new network`，如下图所示

![](Afile/zerotier搭建虚拟局域网-20251011114811327.webp)

将network ID 粘贴到弹出的文本框，然后单击`join`，如下图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011115018408.webp)

主机和客户端都加入虚拟局域网后，主机返回到zerotier central中的设置页面，并在`remember`页面中勾选刚刚加入虚拟局域网的两个设备，点击`authorize`批准两个设备接入虚拟局域网。如图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011115543627.webp)

**然后点击edit按钮，勾选每个设备的advance中的桥接设置**。很重要

完成以上步骤后，双方可利用zerotier分配给各自设备的ip来进行远程连接或者局域网联机。

![|400](Afile/zerotier搭建虚拟局域网-20251011120024051.webp)

可以在适配器选项中看到zerotier新建了一个该networkID的虚拟网卡。如下图所示

**<span style="color: #ff7575">如果确认不使用该虚拟局域网，请右键zerotier图标后点击disconnect中断连接，否则即使退出了zerotier软件，zerotier网卡将仍然生效。</span>**


![|400](Afile/zerotier搭建虚拟局域网-20251011120155705.webp)

# 设置zerotier网卡优先级

加入虚拟局域网的windows设备还需要将 ZeroTier 的虚拟网卡设置为最高优先级。按 `Win+ R`，键入 `control netconnections`，然后按`OK`，如下图所示

![|400](Afile/zerotier搭建虚拟局域网-20251011120414388.webp)

右键单击包含 `ZeroTier`的网卡，单击“属性”，然后单击“Internet 协议版本 4”，最后单击“高级”，如下图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011120744029.webp)

取消勾选`自动跃点`，将`接口跃点数`设置为1，如下图所示：

![|400](Afile/zerotier搭建虚拟局域网-20251011120919654.webp)

完成后点击确定应用设置，**<span style="color: #ff7575">对其他网卡重复这些步骤，但需将其他网卡接口跃点数均设置为大于 1 的数字，比如都设置为2。确保在每个窗口上单击“确定”以应用设置</span>**。

重新启动计算机以确保这些更改反映在您的系统中。

完成以上步骤后，虚拟局域网应该能够生效，应用于局域网组网应用（远程控制，局域网联机）。

如果想确认是否生效，当你认为zerotier发挥作用时，请查看`任务管理器`->`性能` 中的zerotier网卡的上下行带宽是否不为0。比如，我使用parsec作为客户端连接其他主机时，可查看zerotier网卡是上下行带宽是不为0。

如果仍然无法生效，双方都应该检查**接口跃点数**是否已正确应用于所有网络，以**及 ZeroTier 网卡的跃点数是否低于其他所有网卡**。还要确保 **ZeroTier 仍在两台设备上运行**，即zerotier网卡仍然存在。

# 搭建Moon节点 为虚拟局域网加速

可参考的官方文档： https://docs.zerotier.com/roots/

连接到 ZeroTier One 网络的设备需要能够使用一组共享的**根服务器（PLANET节点）**来定位和验证彼此。默认情况下，客户端使用由 ZeroTier， Inc. 部署和维护的默认全局根服务器池。

但是，由于PLANET节点偶尔会过载，并且可能不靠近我们的设备（就网络跃点而言），因此我们可以通过部署自己的服务器来增强我们的PLANET节点，从而获得更可靠的性能，尤其将其用于中继流量时。我们称这些补充的根服务器为“**moons节点**”。

在 ZeroTier One 版本 1.2.0 中，我们引入了添加您自己的用户定义根服务器的功能。我们的逻辑数据中心被称为“卫星”planet，一组用户定义的根服务器被称为Moons。当节点需要“绕”（orbits）Moons运行时，它会将moons作为根服务器添加到其根服务器集。绕moons运行的节点仍将使用PLANET节点，但如果moons节点看起来更快，它们将使用moons节点。

以下要分享的是如何自己搭建 Zerotier Moon节点，加速 Zerotier-One 的连接，让虚拟局域网更稳定的运行。

## 规划部署

创建moons节点的第一步是部署一组私有根服务器。在大多数情况下，我们建议两个。这些是常规的 ZeroTier 节点，但始终处于打开状态并具有静态（物理）IP 地址。这些静态 IP 可以是全局 Internet IP 或只能在内部访问的物理 Intranet IP。在后一种情况下，你的moons在办公室外不起作用，但这并不重要。漫游节点将仅使用PLANET节点。

我们建议**私有根服务器不要充当路由器、加入虚拟局域网或执行任何其他重叠功能**。它们需要良好可靠的网络连接，但在其他方面仅需很小很少的 RAM、存储或 CPU。私有根服务器可以是小型 VM、VPS 或云实例，也可以是 Raspberry Pi 等小型设备。如果将 moon 配置为 VM，请注意它们不要全部驻留在同一个物理硬件上。这将违背拥有两个的目的。

## Zerotier Moon 搭建步骤

这里我使用的是阿里云的ECS服务器来搭建moon节点。

### 第一步 在云服务器上安装 zerotier-one

**方法一 更简单**

```
$ curl -s https://install.zerotier.com | sudo bash
```

**方法二 更安全**

> 要求系统中安装了 GPG

```
$ curl -s 'https://raw.githubusercontent.com/zerotier/ZeroTierOne/master/doc/contact%40zerotier.com.gpg' | gpg --import && \
if z=$(curl -s 'https://install.zerotier.com/' | gpg); then echo "$z" | sudo bash; fi
```
### 第二步 配置 Moon

进入 zerotier-one 程序所在的目录，默认为 `/var/lib/zerotier-one`。

```
cd /var/lib/zerotier-one
```

**生成 moon.json 配置文件**

```
sudo zerotier-idtool initmoon identity.public >> moon.json
```

**编辑 moon.json 配置文件**

```
sudo vim moon.json
```

将配置文件中的 `"stableEndpoints": []` 修改成 `"stableEndpoints": ["ServerIP/9993"]`，将 `ServerIP` 替换成云服务器的公网IP。

**生成 .moon 文件**

```
sudo zerotier-idtool genmoon moon.json
```

将生成的 000000xxxxxxxxxx.moon 移动到 `moons.d` 目录

```
sudo mkdir moons.d
sudo mv 000000xxxxxxxxxx.moon moons.d
```

> .moon 配置文件的名一般为`10个前导零`+`本机的节点ID`

**重启 zerotier-one 服务**

```
sudo systemctl restart zerotier-one
```

## 配置Moon节点

普通的 Zerotier 成员使用 Moon 有两种方法，第一种方法是使用 `zerotier-cli orbit` 命令直接添加 Moon 节点ID；第二种方法是在 zerotier-one 程序的根目录创建`moons.d`文件夹，将 `xxx.moon` 复制到该文件夹中，我们采用第一种方法：

### Linux 系统下配置moon节点

将命令中的两组 `your_moon_id` 都替换成 moon 节点的ID。

```
sudo zerotier-cli orbit your_moon_id your_moon_id
```

检查是否添加成功

```
sudo zerotier-cli listpeers
```

如图所示，第一行的IP为我云服务器的公网IP，云服务器的role为MOON节点：

![](Afile/zerotier虚拟局域网-20251014163801111.webp)

### Windows 系统下配置Moon节点

以管理员身份打开 PowerShell，将命令中的两组 `xxxxxxxxxx` 都替换成 moon 的节点ID。

```
zerotier-cli.bat orbit xxxxxxxxxx xxxxxxxxxx
```

检查是否添加成功

```
zerotier-cli.bat listpeers
```

> **提示**：Windows 系统的默认程序目录位于 `C:\Program Files (x86)\ZeroTier\One`。

如图所示，第一行的IP为我云服务器的公网IP，云服务器的role为MOON节点：

![](Afile/zerotier虚拟局域网-20251014163649153.webp)

## 常见问题

问：电脑加入了虚拟局域网，但Zerotier管理列表中始终没有显示这台设备。

答：可以尝试在Zerotier管理界面中 `Advanced -> Manually Add Member` 中手动添加电脑的节点ID。

问：为什么按照你的配置之后延迟还是很高？

答：如果延迟高的话可能是moon服务器没有起作用，通过命令`zerotier-cli.bat listpeers`看看是否开启成功，此外，路由器一定一定一定要开启UPnP功能！！！！！
