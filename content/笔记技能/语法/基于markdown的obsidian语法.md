---
tags:
  - 分支
  - 笔记技能
  - markdown
---
markdown作为一种文本写作的语法已多年未更新过，obsidian在它的基础上综合了视觉上的考虑和适应如今HTML语言的发展，支持了更多的语法。本篇将介绍在[markdown语法](markdown语法.md)基础之上的obsidian所支持的语法。
# 内部/外部链接

obsidian支持以下两种风格的[链接](markdown语法.md#链接)，效果是等同的：

```
wiki式链接：[[笔记名称#小标题|别称]]
markdown链接：[别名](笔记名称.md#小标题)
```

参考[pkmer](https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian%E4%BD%BF%E7%94%A8%E6%8A%80%E5%B7%A7/wiki%E9%93%BE%E6%8E%A5%E5%92%8Cmarkdown%E9%93%BE%E6%8E%A5%E4%B9%8B%E9%97%B4%E7%9A%84%E8%BD%AC%E6%8D%A2/)里的观点，即内部笔记链接应该使用WIKI风格，外部链接以及附件使用markdown链接，原因是WIKI链接风格虽然是obsidian独有，但已有很多假针对obsidian做了配套。

但**个人认为**，由于不确定后续进行部署时内部链接是否能够生效，所以出于谨慎**默认内部链接禁用wiki链接风格，统一使用markdown风格。**

在 **设置 →文件与链接** 中可禁用WIKI链接，但日常编辑时仍然可以在插入内部链接以便于检索，回车后会默认转换为markdown风格。

![Pasted%20image%2020250110091237.webp](Pasted%20image%2020250110091237.webp)

> [!note] 笔记
> 后续如果需要将markdown链接转换为WIKI链接，可参考[pkmer](https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian%E4%BD%BF%E7%94%A8%E6%8A%80%E5%B7%A7/wiki%E9%93%BE%E6%8E%A5%E5%92%8Cmarkdown%E9%93%BE%E6%8E%A5%E4%B9%8B%E9%97%B4%E7%9A%84%E8%BD%AC%E6%8D%A2/)的思路写python脚本来进行正则表达式替换


> [!bug] 注意
> **修改小标题名称时，<span style="color: #ff7575">必须使用右键来重命名</span>，否则内部链接内的小标题不会同步修改！！！**

# 标注

标注是带有标题图标和标题的更好看的[引用](markdown语法.md#引用)。

要创建标注，将 `[!info]` 添加到引用块的第一行即可。其中 `info` 是 _类型标识符_。类型标识符决定了标注的外观。

建议的快捷键为 **`ctrl + Q`**

支持的**标注类型**有：tip，todo，info，summary，question，warning，bug，example

- 在类型标识符的后边可以加上 - 号，使其可折叠。
- 在类型标识符的后边可以自定义标题。

例子如下：

```
> [!info]- 自定义标题
> 这是一个标注块。
> 它支持 **Markdown**、[[Internal links|内部链接]] 和 [[Embed files|嵌入]]！
```

> [!info]- 自定义标题
> 这是一个标注块。
> 它支持 **Markdown**、[[Internal links|内部链接]] 和 [[Embed files|嵌入]]！

# 代码块

要创建一个代码块，用三个反引号括住代码。

建议的快捷键为 **`ctrl + L`**

Obsidian 对于 [PrismJS支持的语言](https://prismjs.com/#supported-languages) 可进行**语法高亮**。在开头的**反引号后加上语言的全小写名称或缩写**即可给该语言进行语法高亮。例子如下：

```js
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```

# 标签

标签是帮助你快速找到所需笔记的主题词。语法为 **\#加上标签内容** 。

我最常用的是 `#TODO`

在全局查找中使用 **`tag:`** 为开头来查找标签

# 文件属性

文件属性也有自带的搜索语法，对于文件检索有非常大的作用。obsidian的文件属性默认有：tags，aliases，cssclasses。

其中 tags 代表文件整体的标签。在全局查找中可使用文件属性的tags来检索。

