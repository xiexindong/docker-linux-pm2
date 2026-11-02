# 后端学习手册

一个纯静态的知识库前端，用来记录本地上服务器、Docker、PM2、Nginx 等后端实践中遇到的命令和坑。

## 技术栈

- **HTML** — 单页，没有任何框架
- **jQuery 3.7.1** — 放在 `assets/vendor/` 下，本地引入，不走 CDN
- **原生 CSS** — 单文件，没有预处理器
- **纯 JavaScript 数据** — `data/knowledge.js`，用 `<script>` 引入，内容就是一个 JS 对象

没有构建步骤，没有 npm，没有 webpack。

## 怎么运行

**双击 `index.html` 就能打开。**

因为数据是用 `<script>` 直接引入的 JS 文件（不是 `$.getJSON` 异步请求），所以 `file://` 协议下也能正常工作，不需要起本地服务。

页面会提示你是否允许 cookie，那个是 jQuery 本身的，直接点允许就行。

## 文件结构

```
new-end-frond/
├── index.html               # 入口页面
├── README.md                # 本文件
├── data/
│   └── knowledge.js         # ★ 所有学习内容都在这里
├── assets/
│   ├── css/style.css        # 全部样式
│   ├── js/app.js            # 渲染、搜索、筛选、逐词解释展开逻辑
│   ├── vendor/jquery-3.7.1.min.js
│   └── img/                 # 实战截图（可选，对应条目里引用）
├── ngnix.conf               # 一份 Nginx 参考配置（个人留存）
└── .gitignore
```

## 功能一览

| 功能 | 说明 |
|---|---|
| 左侧分类导航 | 6 个分类：Linux 命令、PM2 进程管理、代理与转发、服务器排查、发布部署、Docker |
| 顶部搜索框 | 空格分隔多关键词，标题/说明/命令/标签都会匹配，输入即筛选 |
| 标签筛选 | 点卡片上的标签，筛选同标签内容；再点一次取消 |
| 命令逐词解释 | 每条命令拆成 token，展开后每个词/参数的含义一目了然 |
| 详情抽屉 | 点卡片进入详情，完整说明、所有命令、踩坑提示、相关条目联动 |
| 一键复制 | 每条命令右侧有复制按钮 |
| 快捷键 | `/` 聚焦搜索，`Esc` 关闭抽屉或清空搜索 |

## 数据格式（knowledge.js）

文件结构：

```js
window.KNOWLEDGE_DATA = {
  meta: { title, subtitle, updatedAt },
  categories: [ { id, name, desc }, ... ],  // 左侧导航的分类
  entries: [ ... ]                            // 具体的知识点条目
};
```

**每个 entry 的完整字段**：

```js
{
  id: "linux-cd",                    // 唯一标识，格式：分类-简短名称
  category: "linux",                 // 对应 categories 里的 id
  title: "cd 切换目录",              // 卡片标题
  summary: "一句话说清做什么",        // 卡片上直接显示的摘要
  tags: ["文件", "目录", "基础"],    // 搜索标签，用于筛选
  updatedAt: "2026-11-02",           // 日期，自动填今天就行
  content: "正文，支持 **粗体**、`代码`、\n- 列表\n- 列表\n\n支持 ``` 代码块和 Markdown 表格。",
  commands: [                        // 相关命令列表，每条都要带逐词解释
    {
      desc: "这个命令用来干什么",
      cmd: "cd /usr/local/apps",
      parts: [
        { token: "cd", desc: "change directory，切换目录" },
        { token: "/usr/local/apps", desc: "目标目录的绝对路径" }
      ]
    }
  ],
  tips: [                            // 踩坑提示和注意事项
    "别搞反了相对路径和绝对路径",
    "cd 是 bash 内建命令，which cd 找不到独立文件"
  ]
}
```

**必填字段**：`id`、`category`、`title`、`summary`、`tags`、`updatedAt`、`content`、`commands`

**推荐字段**：`tips`

**commands 里的 `parts` 数组**是本项目的核心特色——每个命令都要拆成 token + 含义，方便自己回头看时不用翻文档。

## 怎么添加新内容

方式一（推荐）：直接跟我说要加什么

把你实践过的命令、终端输出、报错、自己的理解原样贴过来，我来判断分类并整理成标准格式，追加到 `knowledge.js` 末尾。

方式二：手动编辑

1. 打开 `data/knowledge.js`
2. 找到 `entries` 数组末尾，在最后一个 entry 的 `}` 后面加个逗号
3. 按上面的模板写一条新的，记得所有字符串用双引号，换行用 `\n`
4. 保存，刷新页面

**注意事项**：
- 如果要加新分类，先在 `categories` 数组里加一条，再用这个新分类的 id 写 entry
- JSON 里的字符串不能直接写双引号，要转义 `\"`
- 最后一个 entry 后面别多写逗号（虽然现代浏览器容忍，但 Node.js 校验会报错）

## 已收录统计

| 分类 | 条目数 |
|---|---|
| Linux 命令 | 7 |
| PM2 进程管理 | 1 |
| 代理与转发 | 3 |
| 服务器排查 | 1 |
| 发布部署 | 2 |
| Docker | 8 |
| **合计** | **22** |

## License

个人学习记录，不对外分发。
