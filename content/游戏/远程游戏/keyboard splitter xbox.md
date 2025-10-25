---
title: keyboard splitter xbox
aliases:
  - ksx
---
本文章永久分享链接： https://tflow.top/ksx

仓库地址： https://github.com/djlastnight/KeyboardSplitterXbox

默认情况下，Windows系统不区分连接的键盘。它们充当同一个设备。当本地多人游戏PVP时，调整键位就很麻烦。

为了解决这个问题，keyboard splitter xbox（**后续简称约定为ksx**）解决方案为最多可创建 4 个虚拟 Xbox 360 手柄，并通过一个或多个键盘（最多 10 个）控制它们。目标是玩任何支持不同键盘的 Xbox手柄的游戏，而不仅仅是一个键盘。也应该支持任何与此类手柄配合使用的应用程序。

> [!question] ksx的多个虚拟手柄能否被分别识别？
> ksx可以虚拟4个Xbox手柄，目前已知可以在本地PC中可被最多独立识别成4个手柄，但是在本地PC中的安卓模拟器，则只能被识别为同一个手柄。

> [!bug] 不能使用ksx的情形与解决方案
> [参考论坛链接1](https://www.reddit.com/r/MouseReview/comments/178ow3g/any_mice_i_plug_in_just_wont_work_unless_i/?show=original)，[参考论坛链接2](https://www.reddit.com/r/VALORANT/comments/genkxg/support_guide_to_fix_vanguard_disabling_mouse/?show=original)
> 
> 如果你的电脑有无畏契约，则无畏契约反作弊程序在运行时不允许新的或者更改 PC 输入的操作，因为它是注册表 rootkit 级别的反作弊。而ksx会在使用前安装interception驱动程序，这会被反作弊程序识别并导致驱动程序无法加载，**<span style="color: #ff7575">从而导致鼠标或者键盘无法使用</span>**。
> 
> 这个问题的以下解决方案是在鼠标无法使用的情况下进行的：
> - `win + S`以打开搜索，在搜索框中搜索`CMD`，搜索结果就会只有一个命令提示符。
> - 使用方向键将选中框移动到`以管理员身份运行`，然后按回车以运行命令提示符。
> - 在命令提示符中输入以下两条命令，每条命令输入完时按回车以执行：
> 	- `reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4d36e96b-e325-11ce-bfc1-08002be10318}" /v UpperFilters /t REG_MULTI_SZ /d kbdclass /f`
> 	- `reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4d36e96f-e325-11ce-bfc1-08002be10318}" /v UpperFilters /t REG_MULTI_SZ /d mouclass /f`



# 修复directX

[点击本链接](https://caiyun.139.com/w/i/2qidXB7beA7m3)下载directX修复工具，提取码: `h1hp`

下载后解压，点击 `DirectX Repair.exe`并运行，点击右上角检测并修复。等待其修复完毕后，不用理会任何可能弹出的报错，直接重启电脑即可。重启后，directX理论上就全部修复完毕了。

# ksx的安装与配置

[点击本链接](https://sy.tflow.top/d/ace840e279c84759880a/) 下载ksx，下载好后解压到你所指定的目录下，打开该目录，右键点击`KeyboardSplitter.exe`，为其创建快捷方式放到桌面。

点击快捷方式打开ksx。如果弹出任何提示框，直接选择yes即可，完成提示框任务后，**重启电脑**。

重启后打开ksx按照以下文字说明与配套图片进行操作：

-  `第一步`：如图中1号框所示，打开ksx，先调整`slots count`为1
-  `第二步`：如图中2号框所示，`block keyboards`勾选后，当`start` 虚拟手柄映射，**屏蔽所有键盘输出**，包括win键。这个选项在正式开始游戏时**必须勾选**。**<span style="color: #ff7575">连按五次`左ctl`就可以开/关 `block keyboards`，非常方便。</span>**
- `第三步`：如图中3号框所示，点击这个按钮，然后点击键盘任意按键以识别键盘设备。
- `第四步`：如图中4号框所示，设置为none，除非你需要鼠标映射到手柄。
- `第五步`：如图中5号框所示，选择`preset`的取值为 `pro evolution soccer`，因为default预设无法修改键盘取值。
- `第六步`：如图中6号框所示，点击红框内的每一个按钮可以为`Xbox function`每行对应的Xbox虚拟输出绑定你指定的键盘按键。比如如图所示，我为xbox的`A`虚拟输出绑定了键盘的`Z`按钮，即点击`Z`键盘按钮时会输出对应的xbox虚拟按键`A`。
- `第七步`：关闭ksx，他会提示是否保存第六步的preset配置，选择`yes`保存。
- `第八步`：再次打开ksx重复第一步到第五步。然后点击上方`tools`->`options`，将`suggest input devices for new slots`取消勾选，并将下方的`xxx user index`取值为1。
- `第九步`：如图中7号框所示，点击`start`开启ksx，stop即为关闭。开启ksx期间可连按五次`左ctl` `block keyboards`

以后每次重新打开ksx时，只需操作第3、5步，然后`start`即可。

开启后，可通过 https://gamepad-tester.com/ 网站测试虚拟手柄是否被识别且配置是否正确。

![](Afile/keyboard%20splitter%20xbox-20251007124932882.webp)




