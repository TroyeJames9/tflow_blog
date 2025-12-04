---
title: 检测NAT类型
aliases:
  - nat-type-tester
  - NatTypeTester
---
本文章永久分享链接： https://tflow.top/nat-type-tester

> [!warning] 选读的前置资料
> - [NAT类型](游戏/远程游戏/网络条件/NAT类型.md) 科普

市面上的检测NAT类型的方式有python脚本、在线网页、软件。由于NAT、STUN的复杂性，所以仅推荐在软件中检测你的设备的NAT类型，且只**推荐使用RFC5780检测**。RFC3489已过时。

目前github上star数最高的RFC3489检测工具为： https://github.com/HMBSbige/NatTypeTester

但除了NAT1到NAT4，**我们也不能忘了NAT0，即公网IPv4/IPv6**，所以我们先检测设备是否支持IPv6或拥有公网IPv4，然后再使用NatTypeTester来检测NAT类型。

# 设备是否拥有公网IPv4

确认设备是否拥有公网 IPv4 地址是一个非常实用且关键的步骤，尤其是在进行远程游戏联机（如主机串流、P2P联机）、搭建服务器或NAS时。

现在公网IPv4极度稀缺，所以如果根据以下步骤确定你拥有公网IPv4， **<span style="color: #ff7575">你的设备作为P2P主机是最优选择</span>** 。如果确定没有公网IPv4，也不用去跟运营商掰扯，**一般**只有加钱能解决。

最便捷的检测方法就是访问 https://dyebean.com/ 来检测是否有公网IP，检测结果有就是有，没有就是没有，如图所示，我的设备没有公网IPv4 。

![|400](Afile/检测NAT类型-20251118163502191.webp)

如果你有了公网IPv4，你就直接就是标准的**NAT0**了。任何NAT类型的设备都能与你建立P2P。下面的检测也无需进行了。

# 设备是否拥有公网IPv4（土法）

如果 **<span style="color: #ff7575">上面的IPv4检测网站失效了，才考虑使用这个土方法来进行检测</span>** 。

第一步，访问 https://www.itdog.cn/localhost/ ，请记住此处本机的IPv4，如图所示。

![](Afile/远程游戏教程首页-20251117105154641.webp)

第二步，点击`WIN+R`，在弹出的文本框中，输入`cmd`，点击确定。

第三步，在弹出的命令行窗口中输入：`tracert baidu.com`，等待它执行完成。不要关闭命令行窗口。

最后，访问 https://chat.deepseek.com/ 来提问，提问文案如下：

```md
我提供以下信息，请据此确认我的设备是否有公网IPV4？

1、我在线IP查询网站查到的我的设备IP为XXX（此处粘贴第一步查到的IP）
2、我的设备执行tracert baidu.com的结果如下：

[此处粘贴第三步的结果]

```

提问例子如下：

![|400](Afile/远程游戏教程首页-20251117110556338.webp)

这样**deepseek就可以直接确认你的设备是否拥有公网IPv4**。

# 设备是否支持IPv6

双方都拥有原生、可路由的IPv6地址的情况下，这是最完美的P2P场景，**连接会异常顺畅**。

所以**哪怕设备支持IPv6，也得进行下一步的NAT类型检测**，因为对方如果不支持IPv6，仍然需要考虑双方的NAT类型。

直接访问 https://test-ipv6.com/ ，只要显示支持IPv6，你的设备就支持IPv6了。我的设备的结果如下：

![|682](Afile/远程游戏教程首页-20251117155748994.webp)

如果这里没有显示IPv6，可以尝试自查，是不是**路由器或光猫没有开启IPv6或支持IPv6**。当然，这个自查的前提是你的网络为家庭宽带。

比如我家宽的光猫由移动提供，光猫接入了一个中兴路由器。我要想使用IPv6，就必须在光猫的管理页面 **关闭IPv6的防火墙** ，如下图所示。我的中兴路由器比较新，所以默认支持IPv6，不用修改配置。

![|700](Afile/远程游戏教程首页-20251117102931932.webp)

如果在光猫管理页面都没看到有IPv6的相关配置，**请质问你宽带的运营商，为什么不给你们分配公网IPv6** ，现在IPv6是家宽的标配。

如果在路由器管理页面没有看到IPv6的相关配置， **<span style="color: #ff7575">请购买更新的支持IPv6的路由器</span>** ，推荐中兴的。比如我的是`中兴巡天AX3000`。路由器的IPv6相关的默认配置一般无需修改。

%%
# RFC3489检测

访问 https://github.com/HMBSbige/NatTypeTester/releases 下载NatTypeTester。

如果无法正常访问以上链接，可 [点击本链接](https://sy.tflow.top/d/04ca2922d32747b5ad7a/)下载。

解压后，打开文件夹，点击`x64.exe`即可运行工具。如果它提示你需要安装依赖，照做即可。

正常运行后，请确保使用的是RFC3489，如图红框所示。

![|400](Afile/检测NAT类型-20251124183329246.webp)

`STUN server` **不要选择第一个**，即`stun.hot-chilli.net`，因为其支持IPv6，无法正常检测IPv4的NAT类型。

选好STUN server后，点击右下角的`test`，等待检测结果出来：

![|400](Afile/检测NAT类型-20251124183718409.webp)

下面提供索引列表，可据此确定你的NAT类型。

- `FullCone`：完全锥形NAT1
- `RestrictedCone`：限制锥形NAT2
- `PortRestrictedCone`：端口限制锥形NAT3
- `Symmetric`：对称型NAT4

可见我的RFC3489的结果就是NAT3。建议**除了 第一个STUN server外，都测一测**。取出现最多次的结果。
%%
# RFC5780检测

访问 https://github.com/HMBSbige/NatTypeTester/releases 下载NatTypeTester。

如果无法正常访问以上链接，可 [点击本链接](https://sy.tflow.top/d/04ca2922d32747b5ad7a/)下载。

解压后，打开文件夹，点击`x64.exe`即可运行工具。如果它提示你需要安装依赖，照做即可。

正常运行后，请确保使用的是RFC5780，如图红框所示。

选择了RFC5780与UDP，软件页面才会有 `mapping behavior`与`filtering behavior`两种NAT行为模式。如图所示：

![|400](Afile/检测NAT类型-20251118164843818.webp)

`STUN server`**不要选择第一个**，即`stun.hot-chilli.net`，因为其支持IPv6，无法正常检测IPv4的NAT类型。

选好server后，点击右下角的`test`，等待检测结果出来。我的结果如图所示：

![|400](Afile/检测NAT类型-20251118165315681.webp)

可见我的RFC5780的结果就是NAT3。下面提供索引列表，可据此确定你的NAT类型。

- mapping和filtering结果均为EndpointIndependent： `NAT1`
- mapping结果为EndpointIndependent，filtering结果为AddressDependent：`NAT2`
- mapping结果为EndpointIndependent，filtering结果为AddressAndPortDependent：`NAT3`
- mapping和filtering结果均为AddressAndPortDependent，：`NAT4`
- 其他结果：`NAT4`，反正 **<span style="color: #ff7575">比NAT3还差，比NAT4好一些</span>** 。

建议**除了 第一个STUN server外，都测一测**。取出现最多次的结果。

# 总结

恭喜你顺利完成以上步骤！你现在可以确定：

- 1. 你的设备是否支持IPv6
- 2. 你的NAT类型是以下其中一种
	- NAT0：有公网IPv4
	- NAT1
	- NAT2
	- NAT3
	- NAT4

根据 [P2P可行性分级表](游戏/远程游戏/网络条件/P2P技术详解.md#P2P可行性分级表) 可知，准备P2P的双方如果都是NAT4，就100%无法成功NAT打洞。此时，强烈建议阅读 [这篇文章](游戏/远程游戏/网络条件/改善NAT类型.md) 来 改善NAT类型，说不定会有意外收获。（比如网络更流畅了，光猫不发烫了）

