---
title: RIME开源输入法
aliases:
  - RIME
---
# 为什么用 Rime？

明明对于大多数用户来说，类似搜狗输入法、微信输入法、乃至于手心输入法之类的主流输入法，已经完全够用了啊？

事实上，Rime 适合的用户，大多是：

- 喜欢极简/干净/小而美
- 极度反感广告
- 有高度定制需求
- 对输入安全有需求
- 对输入速度有追求
- 对切换多种输入方案有需求
- 对输入标点快符、自定义短语有需求
- 使用小众输入方案，如双拼、音形、形码
- 对输入生僻字有需求，如常常输入古书、文献上的字等
- 对输入精确的繁体字、外来字、外语字有需求
- 部分程序员
- 部分文案、编辑、网文写手
- 打字圈、竞速圈用户

# 常见的 Rime 方案

### 主要面向全拼、双拼用户

- [雾凇拼音](https://github.com/iDvel/rime-ice)：老牌方案包，[官方设置教程](https://dvel.me/posts/rime-ice/)，适合新手入门 Rime，适合全拼、双拼用户。字表、词库整合了 《通用规范汉字表》、华宇野风系统词库、清华大学开源词库、《现代汉语常用词表》、《现代汉语词典》、《同义词词林》、《新华成语大词典》、 腾讯词向量等等，实际使用下来，体验几乎不逊于搜狗百度的拼音输入法。
- [万象拼音]()：万象拼音（Wanxiang）并非仅仅是一个简单的 Rime 配置文件，而是一套为 Rime 引擎量身打造的 **全场景拼音解决方案**。它从最底层的“带声调词库”与“八股文语法模型”开始重构，涵盖了输入方案、智能预测、多音字精细化处理等全流程，旨在为您提供由内而外的极致拼音输入体验。
- [白霜拼音](https://github.com/gaboolic/rime-frost)：后起之秀，在雾凇拼音的基础上优化了词库。
- [薄荷拼音](https://github.com/Mintimate/oh-my-rime)：[官网教程](https://www.mintimate.cc/zh/)，适合全拼、双拼、五笔用户

# windows安装教程

前往[官网](https://rime.im/)下载安装windows客户端 小狼毫。

**安装完，别急，这时候还不能用**。

- `打开用户文件夹`： 右键托盘，有两个图标，其中一个有右键菜单，就是我们要的。右键选择**用户文件夹**，打开了一个目录。
- `清空默认方案` 右键托盘，先退出算法服务（目的是退出占用），切换到其他输入法，再删除用户文件夹下所有文件。（Rime 是个平台，可以搭载任意自定义方案。它本身自带了一些示例方案，但不好用，所以都删掉）
- 去 GitHub，**下载一个自己喜欢的 Rime 方案（比如万象拼音）**，解压后复制到这个用户文件夹目录。
- 右键托盘，重新部署。
- （重要）等待片刻，让 Rime 自动生成方案对应的运行数据。这期间可以乱敲键盘，什么时候打的不是英文字母，就说明生成完毕了。
- 大部分 Rime 方案包都会自带切换方案的快捷键，`F4` 和 `Ctrl+~` 都比较常见。这能在设置里更改。按F4切换到雾凇方案
- 

完成以上步骤后，就可以正常打字了

你会发现默认的皮肤（配色方案、字体、字号）有点丑。可以看下文自己更改。

# Android安装教程

前往[官网](https://rime.im/)下载安装 同文输入法安装包（我的MIUI 选择 arm V8安装包）。

- 打开同文输入法程序，按提示进行初始设置，然后进入 app 主界面
- 点击配置，可以看到我们的用户目录位于根目录下的rime文件夹中
- 去 GitHub，**下载一个自己喜欢的 Rime 方案（比如万象拼音）**，解压后复制到这个rime用户文件夹目录。
- 再次进入程序点击右上角的刷新（部署）按钮进行 方案部署，部署完成后，进入程序方案页面，将雾凇拼音（即全拼）添加进来，并在输入法中启动雾凇拼音方案。

# Android主题配置

同文输入法自带的主题比较一般，可以选择自行导入第三方主题。

同文输入法的`XX.trime.yaml`文件就是一个主题文件。我们直接将第三方主题文件导入到用户目录下，然后重新部署一下即可应用新的主题与配色。

我选用了比较热门的主题 [mytrime](https://github.com/chwt163/mytrime)，此后我们可以参考官方的[trime.yaml 詳解](https://github.com/osfans/trime/wiki/trime.yaml-%E8%A9%B3%E8%A7%A3)来对主题DIY进行系统性学习。

在此之前先对其中的`classic.trime.yaml`的结构有基本的认识，然后再在配置文件中记录我们的DIY操作。

### mytrime的配置结构

- `height`: 各种键盘和按键的高度，不用怎么动
- `round_corner`: 按键的圆角半径，保持默认
- `style`: 键盘、候选栏、按键提示等所有界面元素的字体、字号、间距、圆角、高度、模式布局及功能开关（如自动句首大写、按键纠错等）。
- `preedit`: 预编辑文本的视图参数，保持默认
- `window`: 候选窗口（悬浮窗）参数，保持默认
- `colors`: 定义标准配色
- `preset_color_schemes`: 配色方案
- `liquid_keyboard`: 液态键盘（可滚动/分页键盘）的布局参数以及可切换的子键盘列表
- `tool_bar`: 定义了同文输入法工具栏的按钮间距、字体，以及左侧主按钮和右侧按钮列表的视觉样式与触发动作。
- `preset_keyboards`: 键盘布局，DIY的核心所在
- `preset_keys`: 按键大全，供preset_keyboards选用。

### mytrime主题自定义配置记录

我目前的自定义的动机来自于以下需求：

- 默认的4行键盘布局与大厂输入法的全面屏模式（5行键盘布局）不同，导致24键的位置都偏下，大拇指进行打字时比较累，所以 **<span style="color: #ff7575">24键主键盘布局要修改为5行</span>** 。
- 夜间模式想换用更好看的配色
- 想给输入法添加壁纸
- 输入法界面配色DIY
- 输入法字体配置
- 其他的功能开关等小配置（比如英语句首大写）

🔻 针对**主键盘改为5行**的需求，我进行了如下DIY操作：

更新：最后为了避免误触，仍然选择将第五行定为空行，高度为39

首先，`style`中的`keyboard_height`会锁定键盘高度，其默认的取值可能会在行数增加的情况下，导致按键高度被迫减少，所以我将高度的取值锁定为 `height`中主键盘按键高度`&jpgd4` 乘以行数（包括工具栏），即`keyboard_height`取值为 $48×6 = 288$ 。（后面继续进行微调，270为最好的数值，与大厂输入法高度完全一致）

其次，我们在 `preset_keyboards` 中找到了 24键布局（即default布局）的配置，我们要在其中添加第五行的配置，这一行可以充分自定义，暂时只放 **google搜索** 快捷键。google快捷键的样式参考自 第四行 空格键`space`的设置，宽度`width`设置为90%，两侧放置宽度为5%的空白区域。（空白区域参考第二行的配置），最终效果如图所示：

![](Afile/RIME开源输入法-20260611174227184.webp)

配置好之后很快会发现，google快捷键有一点缺陷，即他的搜索仅拼接了最后一次输出的字符串，而不是拼接**当前光标前的所有字符** 。所以根据`preset_keys`的既有注释，将Google按键的结尾从`%s`修改为`%4$s`。如图所示。

![](Afile/RIME开源输入法-20260611175607947.webp)

🔻 针对夜间模式配色的自定义，进行了如下DIY操作：

我想将`preset_color_schemes`中的标准配色的夜间模式修改为好看的星云配色，所以可以直接把standard配色方案的 `dark_scheme` 的取值改为 `nebula` 星云。

🔻针对输入法添加壁纸的需求，进行如下DIY操作：

首先阅读[文档](https://github.com/osfans/trime/wiki/trime.yaml-%E8%A9%B3%E8%A7%A3)可知，`preset_color_schemes`配色方案中的`candidate_background`是候选区整体背景，且 `keyboard_background`键盘背景可铺满候选栏和导航栏（如果有）。所以我们要将 `candidate_background`调为透明，`keyboard_background`设置为背景图。

但经过反复地摸爬滚打才发现，分辨率对于能否完整显示背景图是非常重要的，所以我们要基于手机的分辨率以及输入法的长宽比例来**确定 我们背景图所需要设置的分辨率**。  比如我的手机短边对应的分辨率为1220，输入法的长宽比为7:6, 则 **<span style="color: #ff7575">背景图的分辨率则想办法调整为1220*1050</span>**  。

图片的文件大小也很重要，文件过大可能会导致输入法弹出时卡顿。我们可以将图片转为webp文件，压缩率超过90%。

根据文档可知，图片需放在`rime/backgrounds`文件夹内，我们修改`candidate_background`的取值为`0x00000000`即透明，修改 `keyboard_background`取值为文件名，比如`my_main.webp`然后将图片文件放入`rime/backgrounds`，主题yaml文件放至rime根目录，重新部署一次即可生效。

🔻针对配色方案的DIY，进行如下操作：

在DIY之前，要了解不同类型的字体对象，如图所示，分别为：

- `text`: 编码字体
- `label`: 悬浮窗候选项序号字体（windows）
- `candidate_font`: 候选字体
- `comment_font`: 候选注释字体
- `hanb_font`: 后备字体。用于补充候选字体（`candidate_font`）。
- `latin_font`: 候选及候选注释拉丁字体（暂时对悬浮窗候选无效）当`latin_font`生效时，拉丁字符（< 0x2e80）就不再由`comment_font`和`candidate_font`控制
- `key_font`: 按键字体（click）
- `symbol_font`: 符号字体（long_click 和 hint）
- `popup_font`（原preview_font）: 按键提示字体

![|400](Afile/RIME开源输入法-20260612210811351.webp)

我所使用的输入法壁纸与对应的配色思路和结果如下所示：

- `candidate_text_color`: 候选字颜色，为了与淡蓝色的背景和谐且突出，选择了深海蓝 0x2C3E50 。
- `hilited_key_back_color`：高亮按键背景，保持了原色。（但因为我调整了标准配色的透明度，所以需要为此设定无透明度的颜色）
- `key_back_color`: 键盘背景色直接设置为透明，更加美观
- `key_border_color`: 按键边框直接设置为透明，更加美观
- `key_symbol_color`: 符号字体、编码字体与 键盘字体颜色一致
- `key_text_color`: 符号字体、编码字体与 键盘字体颜色一致
- `text_color`: 位于编码区光标插入点右边的编码，或者是拼音类方案中无法正常解析的空码，标记为显眼的红色
- `text_back_color`: 编码区背景，设置为珍珠白避免编码字体看不清
- `popup_back_color`: 按键提示字符颜色与键盘字体一致，并且设置背景色为香芋粉
- `popup_text_color`: 按键提示字符颜色与键盘字体一致，并且设置背景色为香芋粉
- `key_color`: 按键文字颜色均按行设置为color1,color1设置为了 深紫色 0xff5A4B8D。

![|400](Afile/RIME开源输入法-20260612212558474.webp)

🔻针对字体的DIY，进行了如下操作:

字体在style中修改，如文档和配置文件可见，字体文件类型为ttf，体设置支持设置为列表值。在 Android 10 及以上系统中，同文会以列表正序为优先级依次回落来尝试让字体显示正常。但实际上 是 **<span style="color: #ff7575">必须</span>** 为列表值，这个要注意。

根据示例，字体自定义需要先在 `rime` 文件夹内新建 `fonts` 文件夹，fonts 文件夹建在共享文件夹与用户文件夹皆可（若共享文件夹存在 fonts，则字体放在用户文件夹内无效），然后将ttf字体文件放在fonts文件夹内， 最后在 配置文件中设置好文件全称即可。

ttf字体库可参考 https://www.fonts.net.cn/

- `中文`: \[bear-zh-KaiXinJiuXiaoLinYuJiuZou-2.ttf\]
- `英文`:  \[rabbit-en-LOVE-Queen-2.ttf, bear-en-Aurora-2.ttf\]

🔻其他的一些小配置，作为记录：

- 工具栏图标大小： `tool_bar`定义了同文输入法工具栏的按钮间距、大小、字体，以及左侧主按钮和右侧按钮列表在这个地方将所有按键都设置了 `font_size` 为18。
- 参考大厂输入法皮肤，加宽popup，`popup_width`设置为60。
- 空格键DIY：默认的空格键显示方案名称。我参考了 `tongwenfeng.trime.yaml`的样式，首先将`preset_keys`中的`space`修改，以便于无论中英文，都显示横线。同时将切换中英的`mode_switch`功能修改了stats显示的文案(中/英)，更加好看。同时也为空格键 swipe_left等拖动方向绑定了 光标移动和 行首行尾的功能。如下所示：  `- {click: space, key_back_color: bkg, key_text_color: tkg, long_click: Mode_switch, swipe_down: End, swipe_up: Home,swipe_left: Left, swipe_right: Right, width: 30, key_text_size: "10", symbol_text_size: 9, key_symbol_offset_x: -1}`

### trime详解

#TODO 

# 自定义配置

不建议直接更改配置包自带的文件，最好是以新建 custom.yaml 文件的方式来自定义，这样的好处是，以后想要更新雾凇配置包的时候，直接把新的雾凇配置包下载回来解压，覆盖掉旧的配置文件，就不需要重新设置自定义。custom.yaml 的具体使用方法，可以搜索一下网络教程，这里不再赘述。

# 同步与迁移



# 参考文献

- 在`github`与开源输入法初次碰面：[开源安卓输入法比较: 同文 vs 小企鹅](https://github.com/AllanChain/blog/issues/228)
- 帮助我入门小狼毫输入法的`知乎`：[最无脑的Rime输入法入门笔记](https://zhuanlan.zhihu.com/p/1974398297281168514)
- 帮助我入门同文输入法的`知乎`：[更好用的开源输入法：Rime + 雾凇拼音](https://zhuanlan.zhihu.com/p/676931217)
- RIME入门到进阶：[RIME帮助手册](https://rime.im/docs/)
- 同文输入法`权威主题DIY手册`： [trime.yaml 詳解](https://github.com/osfans/trime/wiki/trime.yaml-%E8%A9%B3%E8%A7%A3)
- 雾凇拼音`权威指南`：[Rime 配置：雾凇拼音](https://dvel.me/posts/rime-ice/)
- 未来可用的最强方案： [万象拼音](https://amzxyz.github.io/rime-wanxiang/)
- RIME+雾凇拼音方案+万象大模型: [全平台方案](https://www.ctrlife.cn/posts/Technology/Rime+%E9%9B%BE%E5%87%87%E6%8B%BC%E9%9F%B3+%E4%B8%87%E8%B1%A1%E5%A4%A7%E6%A8%A1%E5%9E%8B%E7%9A%84%E5%85%A8%E5%B9%B3%E5%8F%B0%E8%BE%93%E5%85%A5%E6%96%B9%E6%A1%88)
- RIME+万象拼音方案： [windows配置笔记](https://yangyq.net/2026/01/rime-config.html)
- RIME+雾凇+万象词库+万象大模型： https://www.wamoyu.com/archives/l3wnL0q7
- ttf字体库： https://www.fonts.net.cn/
