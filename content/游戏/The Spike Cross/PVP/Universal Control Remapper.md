---
title: Universal Control Remapper
aliases:
  - ucr
---
本文章永久分享链接： https://tflow.top/ucr

[Universal Control Remapper](https://github.com/Snoothy/UCR) 是原始 [UCR](https://github.com/evilC/UCR) 的完全重写，由其与 [evilC](https://github.com/evilC/) 合作创建。

Universal Control Remapper（**UCR**） 是一个 **Windows 应用程序**，它允许最终用户**将来自设备（例如手柄，键盘、鼠标、纵杆、赛车方向盘、眼动仪等）的任何输入重新映射到虚拟输出设备**。重新映射是通过插件将输入转换为所需的输出设备来实现的。

本文是有关使用 UCR 的[教程](https://github.com/snoothy/ucr/wiki)（[parsec-UCR教程](https://support.parsec.app/hc/en-us/articles/32381705301908-Setup-Gamepad#emulate_controller)），它可以模拟 Xbox 手柄并使用键盘作为输入，相反也是可以的，也可以手柄映射手柄，键盘映射键盘。这在多人使用远程控制软件连接到主机时只有一个键盘来玩游戏，并且游戏不允许您为每个玩家使用一组不同的按键的情况下非常有用。

# 安装UCR

UCR 是一个便携式应用程序，不附带安装程序。只需从[realease](https://github.com/Snoothy/UCR/releases/tag/v0.9.0)页面（**或者从tflow提供的**[这个下载链接](https://sy.tflow.top/d/60e36c8c043048ababe3/)）下载最新版本的zip文件并将其解压缩到您选择的`文件夹A`中即可。双击 `文件夹A`中的 `UCR.exe` 即可运行UCR。UCR外观如图所示

![|400](Afile/Universal%20Control%20Remapper-20250924161501853.webp)

UCR 通过provider（提供商）为许多不同的设备（输入和输出）提供支持。在制作第一个profile配置之前，您应该为所需的provider安装附加软件。有关每个provider的信息，请参阅以下核心providers内容。

保存第一个profile配置文件后，您的设置将包含在 `context.xml` 中。如果需要，您可以备份此文件。

# 核心providers

> [!WARNING] 警告
> 请注意，对于初始版本，某些provider的设置过程可能涉及一些技术性（使用命令行等）。 由于安装驱动程序等原因，许多provider需要管理员权限才能设置。

[Provider](https://github.com/snoothy/ucr/wiki/Core-Providers) 是 **UCR 后端的插件，支持特定类型的输入和/或输出。** UCR 附带了许多“核心”provider程序，但设想任何人都应该能够编写一个provider程序并使其可供所有人使用。

以下提供按功能划分的核心provider程序的说明

| I/O类型                  | 可输入 | 可输出 | Provider下载链接                                                                    | 是否需要单独安装 |
| ---------------------- | --- | --- | ------------------------------------------------------------------------------- | -------- |
| 键盘/鼠标                  | √   | √   | [Interception](https://github.com/snoothy/ucr/wiki/Core_Interception)           | √        |
| 直接输入的（非 Xbox）摇杆/手柄     | √   |     | [SharpDX_DirectInput](https://github.com/snoothy/ucr/wiki/SharpDX_DirectInput)  |          |
| 直接输入的（非 Xbox）摇杆/手柄     |     | √   | [vJoyInterfaceWrap](https://github.com/snoothy/ucr/wiki/Core_vJoyInterfaceWrap) | √        |
| xbox手柄                 | √   |     | [SharpDX_XInput](https://github.com/snoothy/ucr/wiki/SharpDX_XInput)            |          |
| xbox手柄/PS手柄            |     | √   | [ViGEm](https://github.com/snoothy/ucr/wiki/Core_ViGEm)                         | √        |
| Tobii 眼动仪              | √   |     | [Tobii_Interaction](https://github.com/snoothy/ucr/wiki/Core_Tobii_Interaction) | √        |
| Titan One              | √   | √   | [TitanOne](https://github.com/snoothy/ucr/wiki/Core_TitanOne)                   | √        |
| 3Dconnexion SpaceMouse | √   |     | [SpaceMouse](https://github.com/snoothy/ucr/wiki/Core_SpaceMouse)               |          |
| MIDI 设备                | √   | √   | [Midi](https://github.com/snoothy/ucr/wiki/Core_Midi)                           |          |

**本文以键盘作为物理输入，Xbox手柄作为虚拟输出为例编写教程**，所以我们本教程所需的provider为[Interception](https://github.com/snoothy/ucr/wiki/Core_Interception)与[ViGEm](https://github.com/snoothy/ucr/wiki/Core_ViGEm)。不过已知我们无需安装[ViGEm](https://github.com/snoothy/ucr/wiki/Core_ViGEm)，该provider的github存储库也已存档。

# 安装interception

- 点击下载  [Interception](https://sy.tflow.top/d/60e36c8c043048ababe3/), 并解压缩到文件夹
- 进入 Interception 文件夹->`command line installer`
- 按住 Shift 键并 **<span style="color: #ff7575">右键单击</span>** `install-interception.exe`，然后单击复制文件地址，如下图所示

![|400](Afile/Universal%20Control%20Remapper-20250924160808533.webp)

如下图所示，点击任务栏左下角搜索图标（如没有该图标自行搜素google解决），搜索`cmd`，然后点击`以管理员身份运行`

![|400](Afile/Universal%20Control%20Remapper-20250924160941216.webp)

如下图所示，在命令行窗口中粘贴刚刚复制的文件路径，并输入`空格`与`/install`，然后按 Enter 键执行

您应该会看到一条成功消息。如果没看到，你可能做错了什么。您可以在下面大致了解正确输入的命令的外观，尽管您复制的路径可能看起来不同

![|400](Afile/Universal%20Control%20Remapper-20250924161251755.webp)

重新启动你的电脑。

# 创建profile配置文件

**本文以键盘作为物理输入，Xbox手柄作为虚拟输出为例创建profile配置文件**

右键单击`UCR.exe`选择管理员身份运行，并点击如图按钮创建profile配置文件，如图所示：

![|400](Afile/Universal%20Control%20Remapper-20250924161616773.webp)

在input devices 输入设备中，从Core_Interception中选择一个键盘（以 `K：`开头） 。如果您看到多个键盘，您可以选择一个，如果以后不起作用，请重新创建配置文件并选择另一个键盘

在output devices 输出设备中，选择 ViGEm Xbox 360 控制器 1。如果您没有看到 ViGEm，请[点击此处下载](https://sy.tflow.top/d/60e36c8c043048ababe3/)，然后重新启动您的 PC

将配置文件命名为您想要的任何名称，然后点击`CREATE`，做完以上步骤的例子如图所示

![|400](Afile/Universal%20Control%20Remapper-20250924163505058.webp)

# 配置profile文件的教程

创建配置文件后，在profiles列表中双击它以开始配置键盘上的哪些键将触发xbox上的按钮：
- 在左侧选择一个plugin并点击其右侧加号（每个插件将在本文下方进一步解释）
- 为您的plugin命名为您想要的任何名称，然后点击“ACCEPT”
- 在右侧，单击蓝色按钮以令您的指定键盘输入映射到指定xbox按钮
- 对每个指定xbox手柄的按钮都重复以上动作，以绑定指定的键盘输入

![|400](Afile/Universal%20Control%20Remapper-20250924170627602.webp)

在上面的示例中，我设置键盘键“L”以触发xbox手柄中的按钮“A”。您可以选择三个插件，每个插件都适用于控制器上的一组特定按钮。单击下面的部分以了解有关每个部分的更多信息。






