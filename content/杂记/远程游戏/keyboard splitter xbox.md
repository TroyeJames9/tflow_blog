---
title: keyboard splitter xbox
aliases:
  - ksx
---
本文章永久分享链接： https://tflow.top/ksx

仓库地址： https://github.com/djlastnight/KeyboardSplitterXbox

默认情况下，Windows系统不区分连接的键盘。它们充当同一个设备。当本地多人游戏PVP时，调整键位就很麻烦。

为了解决这个问题，keyboard splitter xbox（**后续简称约定为ksx**）解决方案为最多可创建 4 个虚拟 Xbox 360 手柄，并通过一个或多个键盘（最多 10 个）控制它们。目标是玩任何支持不同键盘的 Xbox手柄的游戏，而不仅仅是一个键盘。也应该支持任何与此类手柄配合使用的应用程序。

# 修复directX

[点击本链接](https://caiyun.139.com/w/i/2qidXB7beA7m3)下载directX修复工具，提取码: `h1hp`

下载后解压，点击 `DirectX Repair.exe`并运行，点击右上角检测并修复。等待其修复完毕后，不用理会任何可能弹出的报错，直接重启电脑即可。重启后，directX理论上就全部修复完毕了。

# 安装ksx并配置

[点击本链接](https://sy.tflow.top/d/ace840e279c84759880a/) 下载ksx，下载好后解压到你所指定的目录下，打开该目录，右键点击`KeyboardSplitter.exe`，为其创建快捷方式放到桌面。

点击快捷方式打开ksx。如果弹出任何提示框，直接选择yes即可，完成提示框任务后，**重启电脑**。

重启后打开ksx按照以下文字说明与配套图片进行操作：

-  `第一步`：如图中1号框所示，打开ksx，先调整`slots count`为1
-  `第二步`：如图中2号框所示，`block keyboards`勾选后，当`start` 虚拟手柄映射，屏蔽所有键盘输出。这个选项在正式开始游戏时**必须勾选**。连按五次`左ctl`就可以开/关 `block keyboards`，非常方便。
- `第三步`：如图中3号框所示，点击这个按钮，然后点击键盘任意按键以识别键盘设备。
- `第四步`：如图中4号框所示，设置为none，除非你需要鼠标映射到手柄。
- `第五步`：如图中5号框所示，选择`preset`的取值为 `pro evolution soccer`，因为default预设无法修改键盘取值。
- `第六步`：如图中6号框所示，点击红框内的每一个按钮可以为`Xbox function`每行对应的Xbox虚拟输出绑定你指定的键盘按键。比如如图所示，我为xbox的`A`虚拟输出绑定了键盘的`Z`按钮，即点击`Z`键盘按钮时会输出对应的xbox虚拟按键`A`。**<span style="color: #ff7575">注意不要使用左ctl作为keyboard key取值！！！</span>**
- `第七步`：关闭ks，他会提示是否保存第六步的preset配置，选择`yes`保存。
- `第八步`：再次打开ks重复第一步到第五步。然后点击上方`tools`->`options`，将`suggest input devices for new slots`取消勾选，并将下方的`xxx user index`取值为1。
- `第九步`：如图中7号框所示，点击`start`开启ks，stop即为关闭。开启ks期间可连按五次`左ctl` `block keyboards`

以后每次重新打开ks时，操作第3、5步，然后`start`即可。

![](Afile/keyboard%20splitter%20xbox-20251007124932882.webp)




