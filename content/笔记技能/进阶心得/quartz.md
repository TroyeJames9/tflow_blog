---
tags:
  - 分支
  - 笔记技能
  - 博客部署
  - 静态构建
aliases:
  - ob/quartz
title:
---
本文章永久分享链接： `https://tflow.top/ob/quartz`

[quartz](https://github.com/jackyzha0/quartz?tab=readme-ov-file)的开发者是国内的大佬，它可以**帮助我们将markdown笔记发布为静态的博客网站**，同时它的开发的最初目的就是为了与obsidian协作的，社区生态也非常完善（贡献者多达194人），所以是我**博客构建的首要实践方案**。本篇将介绍如何使用quartz为我们的笔记搭建一个静态网站构建环境。

> [!todo] 
> 学习过程参考链接如下：
> 
> [quartz + github page部署](https://www.youtube.com/watch?v=6s6DT1yN4dw)
> 
> [官方wiki](https://quartz.jzhao.xyz/)
> 

# 初始化quartz

Quartz **至少需要 [Node](https://nodejs.org/) v22** 和 `npm` v10.9.2 才能正常运行。本教程以node v22 LTS版本来进行部署。

## linux安装node.js

进入[node.js官网](https://nodejs.org/zh-cn),点击`install node.js`进入[下载教程](https://nodejs.org/zh-cn/download)页面，由于我没有WIN10专业版系统，所以系统没有docker，直接选择linux的nvm方式进行安装，同时安装npm，如图所示

![|700](quartz-20250704100615662.webp)

> 如图所示，以安装node v22为例，按顺序执行以下命令。

```shell
# 下载nvm，然后重启终端界面
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# 下载node v22:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.17.0".
nvm current # Should print "v22.17.0".

# Verify npm version:
npm -v # Should print "10.9.2".

```

## linux部署quartz

> 按照[官方wiki](https://quartz.jzhao.xyz/)的说明进行部署，按顺序执行以下命令：

```shell
cd ~/py_project
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

> 其中，执行create命令后，会通过交互式让用户进行配置选择，选择`empty quartz`与`Treat links as shortest path`即可，如图所示

![](quartz-20250704110224233.webp)

# 为quartz创建github存储库

> 根据[官网wiki笔记](https://quartz.jzhao.xyz/setting-up-your-GitHub-repository)，在 GitHub.com 上创建一个新的仓库。 **请勿**使用 `README` 、许可证或 `gitignore` 文件初始化新仓库。

![](quartz-20250704162136545.webp)

> 在 GitHub.com 的快速设置页面上的存储库顶部，单击剪贴板以复制远程存储库 URL。

> [!warning] 警告
> 必须选择SSH链接进行复制，因为在下一步的sync命令时要求ssh验证，2021年已经废弃了https密码验证

![|700](quartz-20250704162540591.webp)

> 在刚刚的quartz目录下执行`git remote -v`检查现有的远程库

![](Afile/quartz-20250705084643531.webp)

> 删除掉现有已连接的远程库，以连接到我们个人刚刚新建的存储库：

```shell
git remote rm origin

# 此处必须选择ssh链接而不是https链接，因为在下一步的sync命令时要求ssh验证，2021年已经废弃了https密码验证
git remote add origin git@github.com:TroyeJames9/my_knowledge.git

# 然后，可以同步内容并将其上传到这个存储库。这是一个辅助命令，它将执行将内容首次推送到您的仓库的操作。
npx quartz sync --no-pull

# 在未来的更新中，每次您想要将更新推送到存储库时，只需运行 `npx quartz sync` 即可。
```

其中，ssh验证的前置条件为在服务器[生成新的 SSH 密钥](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows)，然后[测试 SSH 连接](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)。

做完这些步骤之后，github的存储库就首次同步了本地的quartz库。

# 在quartz库中迭代笔记内容

Quartz 中的所有内容都应放在 **`/content`** 文件夹中。Quartz 主页的内容位于 **`content/index.md`** 中。此文件夹中的任何 Markdown 文件都将由 Quartz 处理。

如果已有obsidian vault仓库，则可以将仓库的内容（包括 **`.obsidian`** 目录）原封不动地转移到 **`/content`** 路径下，然后在obsidian打开已有仓库目录时，选择 **`/content`** 即可，然后继续迭代笔记内容。

## quartz支持的语法

由于 Quartz 使用 Markdown 文件作为主要内容编写方式，因此它完全支持 Markdown 语法。默认情况下，Quartz 还附带一些语法扩展，例如 [Github Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) （脚注、删除线、表格、任务列表）和 [Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown) （ [标注](https://quartz.jzhao.xyz/features/callouts) 、 [维基链接](https://quartz.jzhao.xyz/features/wikilinks) ）。

此外，Quartz 还允许您在笔记中指定称为 **frontmatter** 的附加元数据。（**其实就是obsidian的笔记属性**）

Quartz 原生支持的一些常见前置字段：

- `title` ：页面的标题。如果没有提供，Quartz 将使用文件的名称作为标题。
- `description` ：用于链接预览的页面描述。
- `permalink` ：页面的自定义 URL，即使文件路径发生变化也将保持不变。
- `aliases` ：此笔记的其他名称。这是一个字符串列表。
- `tags` ：此笔记的标签。
- `draft` ：是否发布页面。这是在 Quartz 中将[页面设为私有的](https://quartz.jzhao.xyz/features/private-pages)一种方法。true则为设为私有页面
- `date` ：表示笔记发布日期的字符串。通常采用 `YYYY-MM-DD` 格式。

## 同步内容

当完成一次笔记迭代后，可在quartz路径下使用以下命令将内容同步到远程库：`npx quartz sync`

# 为笔记构建静态网站

执行`npx quartz build --serve`，将会启动一个WEB服务器，我们可以打开浏览器访问 http://locallhost:8080/ 来浏览由自己的笔记构成的博客网站。 

 
> [!tip] 提示
> 后续每次完成一次笔记迭代后，需要执行一次`npx quartz build`才会更新静态网站上的内容


## 可选参数

要获得完整的帮助选项，您可以运行 `npx quartz build --help`。

其中大多数都有合理的默认值，但是如果有自定义设置，则可以覆盖它们：

- `-d` 或 `--directory` ：内容文件夹。通常只是 `content`
- `-v` 或 `--verbose` ：打印额外的日志信息
- `-o` 或 `--output` ：输出文件夹。通常情况下，该文件夹是 `public`
- `--serve` ：运行本地热重载服务器来预览你的 Quartz
- `--port` ：在哪个端口上运行本地预览服务器
- `--concurrency` ：使用多少个线程来解析笔记


> [!warning] 仅用于预览与测试
> 服务模式仅适用于本地预览。对于生产工作负载，请参阅[托管](https://quartz.jzhao.xyz/hosting)页面。

# 托管网站

Quartz 有效地将您的 Markdown 文件和其他资源转换为一组 HTML、JS 和 CSS 文件（一个网站！）。

但是，如果您想将网站发布到世界各地，您需要一种在线托管的方式。本指南将详细介绍如何使用常见的托管服务提供商进行部署，但任何允许您部署静态 HTML 的服务也同样适用。

## Cloudflare Pages

这个托管方式是最简易的，本人强烈推荐。

1. 登录 [Cloudflare 仪表板](https://dash.cloudflare.com/)并选择您的帐户。
2. 在帐户主页中，选择 **Workers & Pages** > **创建应用程序（Create application）** > **页面（Pages）** > **连接到 Git（Connect to Git）** 。
3. 选择您创建的quartz的存储库，然后在 **“设置构建和部署（Set up builds and deployments）”** 部分提供以下信息：

| Configuration option  配置选项     | Value  价值          |
| ------------------------------ | ------------------ |
| Production branch  生产部门        | `v4`               |
| Framework preset  框架预设         | `None`             |
| Build command  构建命令            | `npx quartz build` |
| Build output directory  构建输出目录 | `public`           |

点击“保存并部署”，Cloudflare 大约一分钟后就会生成您网站的部署版本。之后，每次您将 Quartz 的更改同步到 GitHub 时，您的网站都会更新。

要添加自定义域，请查看 [Cloudflare 的文档](https://developers.cloudflare.com/pages/platform/custom-domains/) 。


> [!warning] 警告
> Cloudflare Pages 默认执行浅克隆，因此如果您依赖 `git` 获取时间戳，建议您在构建命令的开头添加 `git fetch --unshallow &&` （例如， `git fetch --unshallow && npx quartz build` ）。

## 其他云托管方案

如同cloudflare pages的**静态网站云托管方案**如下，具体参考quartz官网提供的以下方案，不做赘述：

- [GitHub Pages](https://quartz.jzhao.xyz/hosting#github-pages)
- [Vercel](https://quartz.jzhao.xyz/hosting#vercel)
- [GitLab Pages](https://quartz.jzhao.xyz/hosting#gitlab-pages)

## 自托管方案

将 `public` 目录复制到您的 Web 服务器，并配置它来提供文件服务。您可以使用任何 Web 服务器来托管您的网站。由于 Quartz 生成的链接不包含 `.html` 扩展名，因此您需要让您的 Web 服务器知道如何处理它。

### Using Nginx

以下是配置示例：

```nginx
server {
    listen 80;
    server_name example.com;
    root /path/to/quartz/public;
    index index.html;
    error_page 404 /404.html;
 
    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
```

### Using Apache

以下是配置示例：

```apache
RewriteEngine On
 
ErrorDocument 404 /404.html
 
# Rewrite rule for .html extension removal (with directory check)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_URI}.html -f
RewriteRule ^(.*)$ $1.html [L]
 
# Handle directory requests explicitly
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^(.*)/$ $1/index.html [L]
```

不要忘记激活 brotli / gzip 压缩。

### Using Caddy

以下是配置示例：

```caddy
example.com {
    root * /path/to/quartz/public
    try_files {path} {path}.html {path}/ =404
    file_server
    encode gzip
 
    handle_errors {
        rewrite * /{err.status_code}.html
        file_server
    }
}
```

# 基础配置

Quartz 也具备极高的可配置性。你所需的大部分配置都可以通过编辑quartz目录下的`quartz.config.ts` 或更改 `quartz.layout.ts` 中的[布局](https://quartz.jzhao.xyz/layout)来完成。

Quartz 的配置可以分为两个主要部分,如下所示：

```ts
const config: QuartzConfig = {
  configuration: { ... },
  plugins: { ... },
}
```

## configuration

这部分配置涉及所有可能影响整个站点的配置。以下列出了您可以配置的所有内容：

- `pageTitle` ：网站标题。在为网站生成 [RSS Feed](https://quartz.jzhao.xyz/features/RSS-Feed) 时也会用到。
- `pageTitleSuffix` ：添加到页面标题末尾的字符串。此属性仅适用于浏览器标签页标题，不适用于页面顶部显示的标题。
- `enableSPA` ：是否在您的网站上启用 [SPA 路由](https://quartz.jzhao.xyz/features/SPA-Routing) 。
- `enablePopovers` ：是否在您的网站上启用[弹出预览](https://quartz.jzhao.xyz/features/popover-previews) 。
- `analytics` ：用于网站分析的内容。值可以是
	- `null` ：不使用分析；
	- `{ provider: 'google', tagId: '<your-google-tag>' }` ：使用 Google Analytics；
	- `{ provider: 'plausible' }` （托管）或 `{ provider: 'plausible', host: 'https://<your-plausible-host>' }` （自托管，确保包含 `https://` 协议前缀）：使用 [Plausible](https://plausible.io/) ；
	- `{ provider: 'umami', host: '<your-umami-host>', websiteId: '<your-umami-website-id>' }`: use [Umami](https://umami.is/);
	- `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id' }` （托管）或 `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id', host: 'my-goatcounter-domain.com', scriptSrc: 'https://my-url.to/counter.js' }` （自托管）使用 [GoatCounter](https://goatcounter.com/) ；
	- `{ provider: 'posthog', apiKey: '<your-posthog-project-apiKey>', host: '<your-posthog-host>' }` ：使用 [Posthog](https://posthog.com/) ；
	- `{ provider: 'tinylytics', siteId: '<your-site-id>' }` ：使用 [Tinylytics](https://tinylytics.app/) ；
	- `{ provider: 'cabin' }` 或 `{ provider: 'cabin', host: 'https://cabin.example.com' }` (自定义域名): 使用 [Cabin](https://withcabin.com/) ；
	- `{provider: 'clarity', projectId: '<your-clarity-id-code' }` ：使用 [Microsoft 清晰度](https://clarity.microsoft.com/) 。项目 ID 可以在概览页面顶部找到。
- `locale` ：用于 [i18n](https://quartz.jzhao.xyz/features/i18n) 和日期格式
- `baseUrl` ：用于需要绝对 URL 的站点地图和 RSS 源，以便识别站点的规范“首页”位置。这通常是站点的部署 URL（例如，本站点的部署 URL 为 `quartz.jzhao.xyz` ）。请勿包含协议（例如 `https://` ）或任何前导或尾随斜杠。
	- 如果您在 GitHub 页面上[托管](https://quartz.jzhao.xyz/hosting) ，且没有自定义域名，则还应包含子路径。例如，如果我的仓库是 `jackyzha0/quartz` ，GitHub 页面将部署到 `https://jackyzha0.github.io/quartz` ， `baseUrl` 将是 `jackyzha0.github.io/quartz` 。
	- 请注意，Quartz 4 将尽可能避免使用此功能，并尽可能使用相对 URL，以确保您的网站无论实际部署_在何处_都能正常工作。
- `ignorePatterns` ：一个 [glob](https://en.wikipedia.org/wiki/Glob_\(programming\)) 列表Quartz 在查找 `content` 文件夹内的文件时应该忽略且不进行搜索的模式。更多详情请参阅[私人页面](https://quartz.jzhao.xyz/features/private-pages) 。
- `defaultDateType` ：是否使用创建、修改或发布作为页面和页面列表上显示的默认日期。
- `theme` ：配置网站的外观。
	- `cdnCaching` ：如果设置为 `true` （默认值），则使用 Google CDN 缓存字体。这通常会加快速度。如果您希望 Quartz 下载的字体是独立的，请禁用（ `false` ）。
	- `typography` ：使用什么字体。Google [Fonts](https://fonts.google.com/) 上的任何字体都可以[](https://fonts.google.com/)在这里工作。
		- `title` ：网站标题的字体（可选，默认与 `header` 相同）
		- `header` ：用于标题的字体
		- `code` ：内联和块引用的字体
		- `body` ：所有内容的字体
	- `colors` ：控制网站的主题。
		- `light` ：页面背景
		- `lightgray` ：边框
		- `gray` ：图形链接，边框较粗
		- `darkgray` ：正文
		- `dark` ：标题文字和图标
		- `secondary` ：链接颜色，当前[知识图谱](https://quartz.jzhao.xyz/features/graph-view)节点
		- `tertiary` ：悬停状态和访问过的[知识图谱](https://quartz.jzhao.xyz/features/graph-view)节点
		- `highlight` ：内部链接背景、突出显示的文本、 [突出显示的代码行](https://quartz.jzhao.xyz/features/syntax-highlighting)
		- `textHighlight` ：markdown 高亮文本背景


## plugins

您可以将 **Quartz 插件视为一系列内容转换**。

其中[Transformers](https://quartz.jzhao.xyz/tags/plugin/transformer) **映射**内容（例如解析前言、生成描述），[filters](https://quartz.jzhao.xyz/tags/plugin/filter)**过滤**内容（例如过滤掉草稿），[emitters](https://quartz.jzhao.xyz/tags/plugin/emitter)**减少**内容（例如创建 RSS 提要或列出具有特定标签的所有文件的页面）

```ts
plugins: {
  transformers: [...],
  filters: [...],
  emitters: [...],
}
```

![](quartz-20250707085605195.webp)

可以通过在 `transformers` 、 `filters` 和 `emitters` 字段中添加、删除和重新排序插件来定制 Quartz 的行为。

应该注意将插件添加到与其插件类型对应的正确条目中。例如，要添加 [ExplicitPublish](https://quartz.jzhao.xyz/plugins/ExplicitPublish) 插件（一个 [Filter](https://quartz.jzhao.xyz/tags/plugin/filter) ），您需要添加以下行：

```ts
filters: [
  ...
  Plugin.ExplicitPublish(),
  ...
],
```

要删除插件，您应该删除 `quartz.config.ts` 中所有出现的插件。

为了进一步定制插件，一些插件可能还有自己的配置设置可以传入。如果您不传入配置，插件将使用其默认设置。

例如， [Latex](https://quartz.jzhao.xyz/plugins/Latex) 插件允许您传入一个指定 `renderEngine` 字段，以便在 Katex 和 MathJax 之间进行选择。

```ts
transformers: [
  Plugin.FrontMatter(), // use default options
  Plugin.Latex({ renderEngine: "katex" }), // set some custom options
]
```

一些插件默认包含在 [`quartz.config.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz.config.ts) 中，但还有更多可用。可以[在此处](https://quartz.jzhao.xyz/tags/plugin)查看所有插件及其配置选项的列表。

如果您想制作自己的插件，请参阅[制作自定义插件](https://quartz.jzhao.xyz/advanced/making-plugins)指南。

