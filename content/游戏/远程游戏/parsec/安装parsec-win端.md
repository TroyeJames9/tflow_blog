---
title: 安装parsec-win端
aliases:
  - parsec/download_windows
---
本文章永久分享链接： https://tflow.top/parsec/download_windows

参考自： https://support.parsec.app/hc/en-us/articles/32381368159124-Install-Parsec-App-on-Windows

本文介绍在运行 Microsoft Windows 的计算机上安装和基本配置 Parsec 应用。

Parsec **适用于 Windows 10 或更高版本**。根据您是要作为客户端还是主机，设备硬件要满足兼容性要求，如不确认，请查看[硬件和软件兼容性](https://support.parsec.app/hc/en-us/articles/32381568346644-Hardware-and-Software-Compatibility)以获取更多信息。

> [!warning] 学习本文的前提条件
> 掌握[开源魔法-链接导入版](科学/开源魔法-链接导入版.md)的内容，**<span style="color: #ff7575">以下教程与parsec使用期间需要你的相关设备保持魔法为开启状态</span>**

# 安装

[点击我](https://parsec.app/downloads)进入parsec下载页面，在下载文件夹中找到安装程序，然后双击`parsec.exe`以运行它。根据以下说明来进行每一步操作

如下图所示，选择要安装的附加组件（如果有），然后单击`next`

其中`Virtual Display Driver`用于在主机上创建虚拟显示器，对于无显示器的系统很有用。这也可以稍后在 Parsec 设置中安装 虚拟显示驱动程序

![|400](Afile/win端-安装parsec-20251009161238726.webp)

如下图所示，选择您喜欢的安装类型并点击`next`,其中：

- `Per User`：将为每个用户使用不同的帐户，并且在您**登录 Windows 之前不会启动 Parsec**
- `Per Computer`：将允许在 Windows 登录屏幕时**提前启动parsec**，但也会对计算机上的所有用户使用相同的帐户 （SYSTEM）。如果任何其他用户之前在此计算机上安装了 Parsec 时选择了“Per user”，请记住，这将替换他们的安装

对于这两个选项，如果您在任务栏的 Parsec 托盘图标中禁用了“计算机启动时运行”，或者您的 Parsec 登录无效（例如当您的密码更改时） 时，Parsec 将不会与系统一起启动。

如果安装parsec的**这台电脑只有你一个人使用**，推荐选择`Per Computer`。

![|400](Afile/win端-安装parsec-20251009161741322.webp)

完成以上步骤后，Parsec 将开始安装，并在完成后自动关闭安装程序并打开 Parsec。

# 登录

如果你还未在parsec注册账号，请[点击我](游戏/远程游戏/parsec/注册parsec.md)进行注册，然后打开parsec进行登陆

![|400](Afile/win端-安装parsec-20251009161936465.webp)


