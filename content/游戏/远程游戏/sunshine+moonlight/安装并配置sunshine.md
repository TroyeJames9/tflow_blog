---
title: 安装并配置sunshine
aliases:
  - sunshine
---
本文章永久分享链接： https://tflow.top/sunshine

本教程只支持windows系统设备。

# 安装sunshine

[点击本链接](https://sy.tflow.top/d/e73b3eade2394ae6b7fd/)下载sunshine安装程序，点击 sunshine-installer.exe 安装程序，**除了需要修改安装路径外，一直下一步**，直到安装sunshine即可。

# 首次基本配置

安装程序结束后，右键点击任务栏中的sunshine图标，点击`open sunshine`打开sunshine的管理网站。如图所示自行创建一个账号，可以不用那么复杂，因为这个网站只在局域网可访问。输入好自设的账号和密码后点击`login`

> [!warning] 警告
> 账号密码一定要记得，不然无法找回，只能重装sunshine

![|400](Afile/安装并配置sunshine-20251017151012902.webp)

进入网站后，点击上方`configuration`，将语言修改为简体中文，滑动到最下方点击保存，并点击应用，等待5秒左右sunshine重启完成再刷新网站。

点击上方`配置`完成以下基本配置和高级配置：

> [!warning] 温馨提示
> 可以做完所有配置后再点击最下方的保存，并点击应用以重启sunshine。
> 

## general配置

设定好自己的主机名，如图所示

![|400](Afile/安装并配置sunshine-20251017151558869.webp)

## network配置

- 打开UPnP
- IP地址族设置为`IPV4+IPV6`
- 允许的 Web UI 访问来源 设置为 只有本地主机
- 公网加密模式设置为`禁用`

完成以上配置后，点击保存并应用。

# 高级配置

以下操作非必做项，**请谨慎配置**。

## advanced配置

可强制指定编码器，你有什么显卡，就选什么显卡对应的编码器，比如我是AMD集显，选择AMD AMF。

![](Afile/安装并配置sunshine-20251017161719892.webp)

## NVIDIA编码器配置

有待实践后补充

## intel编码器配置

QSV编码器预设可自行测试，一般保持默认即可

QSV编码器（H264）也可自行测试，一般保持默认即可

## AMD编码器配置

- AMF工作模式：保持默认的情况下，可能导致画面很糊，可以调整到`低延迟、高质量`

其他配置自行测试，一般保持默认就够用。




