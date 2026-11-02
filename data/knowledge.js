window.KNOWLEDGE_DATA =
{
  "meta": {
    "title": "后端学习手册",
    "subtitle": "边实践边记录",
    "updatedAt": "2026-10-30"
  },
  "categories": [
    { "id": "linux", "name": "Linux 命令", "desc": "文件、进程、网络与权限操作" },
    { "id": "pm2", "name": "PM2 进程管理", "desc": "Node 服务常驻、日志与开机自启" },
    { "id": "proxy", "name": "代理与转发", "desc": "正向/反向代理、Nginx 与端口转发" },
    { "id": "ops", "name": "服务器排查", "desc": "端口、负载、内存、日志与定时任务" },
    { "id": "deploy", "name": "发布部署", "desc": "发版流程、回滚策略与环境切换" },
    { "id": "docker", "name": "Docker", "desc": "镜像、容器与隔离环境" }
  ],
  "entries": [
    {
      "id": "linux-cd",
      "category": "linux",
      "title": "cd 切换目录",
      "summary": "cd 是 shell 内建命令，用来切换当前工作目录。`..` 表示上一级目录，`.` 表示当前目录。",
      "tags": ["目录", "基础", "内建命令"],
      "updatedAt": "2026-10-30",
      "content": "shell 启动后会有一个「当前目录」，绝大多数相对路径都是从这里算的。`cd` 就是改变这个指针。\n\n特殊路径：\n- `.` 当前目录\n- `..` 上一级目录\n- `/` 根目录\n- `~` 家目录，一般等价于 `/home/用户名`\n\n技巧：`cd -` 在最近两次目录之间来回切，调试时在项目和配置目录间频繁跳很方便。\n\nshell 的 `cd` 不是外部程序，而是内建命令（因为进程不能改变父进程的工作目录）。这也意味着每次 ssh 登录、每次新开终端，当前目录都是独立的。",
      "commands": [
        {
          "desc": "回到上一级目录",
          "cmd": "cd ..",
          "parts": [
            { "token": "cd", "desc": "change directory，切换当前工作目录" },
            { "token": "..", "desc": "上一级目录（父目录），两个点代表往上一层" }
          ]
        },
        {
          "desc": "回到家目录",
          "cmd": "cd ~",
          "parts": [
            { "token": "cd", "desc": "change directory，切换当前工作目录" },
            { "token": "~", "desc": "当前用户的家目录，root 是 /root，普通用户一般是 /home/用户名" }
          ]
        },
        {
          "desc": "回到根目录",
          "cmd": "cd /",
          "parts": [
            { "token": "cd", "desc": "change directory，切换当前工作目录" },
            { "token": "/", "desc": "整个文件系统的根目录，所有绝对路径的起点" }
          ]
        },
        {
          "desc": "在最近两个目录间切换",
          "cmd": "cd -",
          "parts": [
            { "token": "cd", "desc": "change directory，切换当前工作目录" },
            { "token": "-", "desc": "回到上一次所在的目录（记录在 OLDPWD 变量里）" }
          ]
        },
        {
          "desc": "跨多级目录（向上两级再进 logs）",
          "cmd": "cd ../../logs",
          "parts": [
            { "token": "cd", "desc": "change directory，切换当前工作目录" },
            { "token": "../..", "desc": "先上一级、再上一级，共向上两层" },
            { "token": "logs", "desc": "进入当前目录下名为 logs 的子目录" }
          ]
        }
      ],
      "tips": [
        "相对路径以 `.` 或 `..` 开头；以 `/` 开头的是绝对路径，和当前目录无关。",
        "脚本里尽量用绝对路径或 `dirname $0` 先定位脚本所在目录，不要依赖调用者的当前目录。",
        "如果目录名里有空格，要么加引号 `cd \"my dir\"`，要么用反斜杠转义 `cd my\\ dir`。"
      ]
    },
    {
      "id": "linux-unzip",
      "category": "linux",
      "title": "unzip 解压 zip 压缩包",
      "summary": "解压 `.zip` 文件到指定目录。`-d` 指定目标目录，目录不存在会自动创建。",
      "tags": ["压缩", "解压", "文件"],
      "updatedAt": "2026-10-30",
      "content": "`unzip` 处理 `.zip` 格式（Windows 下最常见的压缩格式）。最常用的就是 `-d` 指定解压到哪个目录，避免文件直接散落在当前目录把自己搞乱。\n\n如果只想看压缩包里有什么、不想解压，用 `-l`（list）。解压时遇到同名文件会提示覆盖，`-o` 跳过确认直接覆盖，`-n` 反过来跳过已存在的文件。\n\n注意：`tar -xzf` 解的是 `.tar.gz`，和 `unzip` 是两套工具，别混。",
      "commands": [
        {
          "desc": "解压到指定目录（目录不存在会自动创建）",
          "cmd": "unzip bike77-1030.zip -d bike77-new",
          "parts": [
            { "token": "unzip", "desc": "解压 zip 格式压缩包的命令" },
            { "token": "bike77-1030.zip", "desc": "要解压的压缩包文件名，位于当前目录" },
            { "token": "-d", "desc": "directory，指定解压到哪个目标目录" },
            { "token": "bike77-new", "desc": "目标目录名，不存在时 unzip 会自动创建" }
          ]
        },
        {
          "desc": "不解压，只看压缩包内容清单",
          "cmd": "unzip -l bike77-1030.zip",
          "parts": [
            { "token": "unzip", "desc": "解压 zip 格式压缩包的命令" },
            { "token": "-l", "desc": "list，只列出压缩包里的文件清单，不会真正解压" },
            { "token": "bike77-1030.zip", "desc": "要查看的压缩包文件名" }
          ]
        },
        {
          "desc": "直接覆盖已存在的文件，不再询问",
          "cmd": "unzip -o bike77-1030.zip -d bike77-new",
          "parts": [
            { "token": "unzip", "desc": "解压 zip 格式压缩包的命令" },
            { "token": "-o", "desc": "overwrite，遇到同名文件直接覆盖，不弹是否替换的提示" },
            { "token": "bike77-1030.zip", "desc": "要解压的压缩包文件名" },
            { "token": "-d", "desc": "directory，指定解压到哪个目标目录" },
            { "token": "bike77-new", "desc": "目标目录名" }
          ]
        },
        {
          "desc": "跳过已存在的文件（只解压新增的）",
          "cmd": "unzip -n bike77-1030.zip -d bike77-new",
          "parts": [
            { "token": "unzip", "desc": "解压 zip 格式压缩包的命令" },
            { "token": "-n", "desc": "never overwrite，已存在的文件不覆盖、直接跳过" },
            { "token": "bike77-1030.zip", "desc": "要解压的压缩包文件名" },
            { "token": "-d", "desc": "directory，指定解压到哪个目标目录" },
            { "token": "bike77-new", "desc": "目标目录名" }
          ]
        },
        {
          "desc": "中文文件名乱码时，指定按 UTF-8 解码",
          "cmd": "unzip -O UTF-8 bike77-1030.zip -d bike77-new",
          "parts": [
            { "token": "unzip", "desc": "解压 zip 格式压缩包的命令" },
            { "token": "-O", "desc": "指定压缩包里文件名的字符编码，中文乱码时用" },
            { "token": "UTF-8", "desc": "编码名称，也可以换成 GBK 试" },
            { "token": "bike77-1030.zip", "desc": "要解压的压缩包文件名" },
            { "token": "-d", "desc": "directory，指定解压到哪个目标目录" },
            { "token": "bike77-new", "desc": "目标目录名" }
          ]
        }
      ],
      "tips": [
        "服务器上如果 `unzip: command not found`，Debian/Ubuntu 用 `apt install unzip`，CentOS 用 `yum install unzip`。",
        "解压前先 `unzip -l` 看一眼结构，有的压缩包解压后会在当前目录撒一大堆文件。",
        "zip 里如果有中文文件名乱码，基本是压缩时用了 GBK 编码，加 `-O GBK` 或 `-O UTF-8` 试试。",
        "`.tar.gz` / `.tar` 格式不要用 unzip，用 `tar -xzf xxx.tar.gz`。"
      ]
    },
    {
      "id": "linux-rm",
      "category": "linux",
      "title": "rm 删除文件或目录",
      "summary": "rm = remove。`-r` 递归删目录，`-f` 强制不确认；`-rf` 组合一把梭，用错了就是生产事故。",
      "tags": ["删除", "文件", "目录"],
      "updatedAt": "2026-10-30",
      "content": "`rm` 删除文件或目录。三个最核心的参数：\n\n- `-r` recursive，递归删除目录里的所有子文件和子目录（删目录必须带）\n- `-f` force，强制删除，不弹出任何确认提示\n- `-i` interactive，删每个文件前都问一遍（和 `-f` 相反，更安全）\n\n所以 `rm -rf bike77-new` 就是「不管里面有什么，整个 bike77-new 目录直接干掉，一个确认都不要」。\n\n没有回收站。删了就是删了。",
      "commands": [
        {
          "desc": "递归强制删除整个目录（最常用也最危险）",
          "cmd": "rm -rf bike77-new",
          "parts": [
            { "token": "rm", "desc": "remove，删除文件或目录的命令" },
            { "token": "-r", "desc": "recursive，递归删除目录及里面的所有子内容" },
            { "token": "-f", "desc": "force，强制删除，不再逐个确认" },
            { "token": "bike77-new", "desc": "要删除的目标目录" }
          ]
        },
        {
          "desc": "删除单个文件",
          "cmd": "rm app.log",
          "parts": [
            { "token": "rm", "desc": "remove，删除文件或目录的命令" },
            { "token": "app.log", "desc": "要删除的文件名" }
          ]
        },
        {
          "desc": "一次删除多个文件",
          "cmd": "rm app.log error.log access.log",
          "parts": [
            { "token": "rm", "desc": "remove，删除文件或目录的命令" },
            { "token": "app.log", "desc": "第一个要删的文件" },
            { "token": "error.log", "desc": "第二个要删的文件" },
            { "token": "access.log", "desc": "第三个要删的文件" }
          ]
        },
        {
          "desc": "交互式删除，每个文件都问一遍（安全）",
          "cmd": "rm -ri bike77-new",
          "parts": [
            { "token": "rm", "desc": "remove，删除文件或目录的命令" },
            { "token": "-r", "desc": "recursive，递归删除目录及内部内容" },
            { "token": "-i", "desc": "interactive，每删一个都提示你确认" },
            { "token": "bike77-new", "desc": "要删除的目标目录" }
          ]
        },
        {
          "desc": "只删空目录（目录不为空会报错）",
          "cmd": "rmdir empty-dir",
          "parts": [
            { "token": "rmdir", "desc": "remove directory，专门删除空目录的命令" },
            { "token": "empty-dir", "desc": "要删除的空目录名，里面不能有任何文件" }
          ]
        }
      ],
      "tips": [
        "执行前先 `ls -lah bike77-new` 确认路径没错，别把 `/` 拼错成 `/ var`。",
        "删前备份重要目录可以用 `mv bike77-new bike77-new.bak` 代替直接 rm，后悔还能找回。",
        "文件名以 `-` 开头时，`rm -rf -weird-name` 会被当成参数。解决：`rm -rf ./-weird-name` 或 `rm -rf -- -weird-name`。",
        "脚本里的 `rm -rf` 一定先写死路径、别用变量拼，否则变量为空时会变成 `rm -rf /`。",
        "`rmdir` 只能删空目录，删带内容的目录必须用 `rm -r`。"
      ]
    },
    {
      "id": "deploy-flow-bike77-api",
      "category": "deploy",
      "title": "zip 覆盖发版流程（以 bike77-api 为例）",
      "summary": "用压缩包直接覆盖线上代码的完整流程：停服务→备份→解压覆盖→重启→看日志；出问题有回滚命令。",
      "tags": ["发版", "回滚", "zip覆盖", "pm2"],
      "updatedAt": "2026-10-30",
      "content": "这个流程的核心是**「先停服务、再备份、再覆盖」**——顺序不能乱。压缩包里直接就是业务代码（没有再套一层 bike77-api 目录），所以可以直接解压到目标目录里覆盖。\n\n操作顺序的逻辑：\n- 先 pm2 stop，是为了避免 Node 服务在跑着的时候正在引用被覆盖的文件\n- cp -r 备份是最关键的一步，出了问题能秒回滚\n- unzip -o 的 `-o` 表示自动覆盖，不会反复询问\n- pm2 restart 重新拉起，然后 pm2 logs 盯一眼有没有正常启动\n\n额外确认：新包里**没有** node_modules、.git、logs 这些目录，所以解压时只会覆盖业务代码文件，不会把线上已安装的依赖和日志删掉。",
      "commands": [
        {
          "desc": "第 1 步：先停掉 PM2 里跑的服务",
          "cmd": "pm2 stop index",
          "parts": [
            { "token": "pm2", "desc": "Node 进程管理工具，负责守护和调度 Node 服务" },
            { "token": "stop", "desc": "停止指定进程，但进程记录还留在 PM2 列表里" },
            { "token": "index", "desc": "PM2 里的进程名（也可以用进程 id）" }
          ]
        },
        {
          "desc": "第 2 步：进入线上服务目录",
          "cmd": "cd /usr/local/apps",
          "parts": [
            { "token": "cd", "desc": "change directory，切换当前工作目录" },
            { "token": "/usr/local/apps", "desc": "绝对路径，线上应用统一存放的目录" }
          ]
        },
        {
          "desc": "第 3 步：备份原代码（线上一定要做这步）",
          "cmd": "cp -r bike77-api bike77-api-bak",
          "parts": [
            { "token": "cp", "desc": "copy，复制文件或目录的命令" },
            { "token": "-r", "desc": "recursive，递归复制整个目录及其内部所有内容" },
            { "token": "bike77-api", "desc": "源目录，当前线上正在跑的代码" },
            { "token": "bike77-api-bak", "desc": "目标目录，备份出来的副本，回滚时用它" }
          ]
        },
        {
          "desc": "第 4 步：解压覆盖到目标目录",
          "cmd": "unzip -o bike77-1030.zip -d bike77-api",
          "parts": [
            { "token": "unzip", "desc": "解压 zip 格式压缩包的命令" },
            { "token": "-o", "desc": "overwrite，同名文件直接覆盖，不再问是否替换" },
            { "token": "bike77-1030.zip", "desc": "新版本的压缩包文件名" },
            { "token": "-d", "desc": "directory，指定解压到哪个目标目录" },
            { "token": "bike77-api", "desc": "目标目录，也就是线上正在服务的目录" }
          ]
        },
        {
          "desc": "第 5 步：重启服务",
          "cmd": "pm2 restart index",
          "parts": [
            { "token": "pm2", "desc": "Node 进程管理工具" },
            { "token": "restart", "desc": "重启指定进程：先停止再重新启动" },
            { "token": "index", "desc": "PM2 里的进程名" }
          ]
        },
        {
          "desc": "第 6 步：查看启动日志确认正常",
          "cmd": "pm2 logs index",
          "parts": [
            { "token": "pm2", "desc": "Node 进程管理工具" },
            { "token": "logs", "desc": "实时输出该进程的标准输出和错误日志" },
            { "token": "index", "desc": "PM2 里的进程名" }
          ]
        }
      ],
      "tips": [
        "**备份是生命线**，cp -r 这步不能省。出问题才能回滚。",
        "压缩包里如果外面还套了一层目录（比如 zip 里最外层是 bike77-api/），要改成 `unzip -o xxx.zip` 先解压出来再 mv，或者用 `-j`（junk paths）选项。",
        "覆盖发版的前提是**新包结构和线上目录结构完全对上**，解压前先 `unzip -l bike77-1030.zip | head -20` 确认一下。",
        "node_modules 不放进 zip 是对的，线上自己安装的依赖和包版本更匹配。",
        "发完版盯 pm2 logs 至少 30 秒，确认没有启动报错、进程没有反复 crash 重启。"
      ]
    },
    {
      "id": "deploy-rollback",
      "category": "deploy",
      "title": "发版后回滚（一键恢复线上）",
      "summary": "覆盖发版后启动报错或功能异常，直接把备份目录换回来并重启，最快 10 秒恢复。",
      "tags": ["回滚", "紧急", "备份"],
      "updatedAt": "2026-10-30",
      "content": "回滚的前提是发版前做了备份（见「zip 覆盖发版流程」）。操作就三件事：\n\n1. 停掉当前有问题的目录\n2. 用备份目录替换回来（rm -rf 删掉坏的、mv 把备份改名回去）\n3. 重启服务\n\n因为只是替换目录名，没有复制大文件，回滚比重新解压快得多。",
      "commands": [
        {
          "desc": "一键回滚：删坏的、换上备份、重启",
          "cmd": "rm -rf bike77-api && mv bike77-api-bak bike77-api && pm2 restart index",
          "parts": [
            { "token": "rm", "desc": "remove，删除命令" },
            { "token": "-rf", "desc": "递归 + 强制：删掉目录及内部所有内容，不确认" },
            { "token": "bike77-api", "desc": "当前有问题的线上目录" },
            { "token": "&&", "desc": "逻辑与：前一条命令成功（退出码 0）才执行下一条" },
            { "token": "mv", "desc": "move，移动或重命名目录" },
            { "token": "bike77-api-bak", "desc": "备份目录，回滚用的旧代码" },
            { "token": "bike77-api", "desc": "把备份改名回正式目录名" },
            { "token": "&&", "desc": "逻辑与：前一条成功才继续" },
            { "token": "pm2", "desc": "Node 进程管理工具" },
            { "token": "restart", "desc": "重启进程" },
            { "token": "index", "desc": "PM2 里的进程名" }
          ]
        },
        {
          "desc": "更稳妥的分步回滚（推荐线上用）",
          "cmd": "pm2 stop index && rm -rf bike77-api && mv bike77-api-bak bike77-api && pm2 start index",
          "parts": [
            { "token": "pm2", "desc": "Node 进程管理工具" },
            { "token": "stop", "desc": "停止进程，避免替换目录时还在读旧文件" },
            { "token": "index", "desc": "PM2 里的进程名" },
            { "token": "&&", "desc": "前一条成功才执行下一条" },
            { "token": "rm", "desc": "remove，删除命令" },
            { "token": "-rf", "desc": "递归 + 强制，删除有问题的目录" },
            { "token": "bike77-api", "desc": "当前有问题的线上目录" },
            { "token": "&&", "desc": "前一条成功才执行下一条" },
            { "token": "mv", "desc": "move，重命名备份目录" },
            { "token": "bike77-api-bak", "desc": "备份目录" },
            { "token": "bike77-api", "desc": "把备份改名回正式目录名" },
            { "token": "&&", "desc": "前一条成功才执行下一条" },
            { "token": "pm2", "desc": "Node 进程管理工具" },
            { "token": "start", "desc": "按已保存的配置启动进程" },
            { "token": "index", "desc": "PM2 里的进程名" }
          ]
        }
      ],
      "tips": [
        "回滚前先 `pm2 stop index`，避免替换目录时 Node 还在引用旧路径。",
        "`rm -rf` + `mv` 比 `cp -r` 快很多，因为只是目录改名，没有文件拷贝。",
        "回滚完不要忘了再备份一次新的线上状态，否则下次发版又出问题，原来的备份已经是坏的了。",
        "线上出现报错时先别慌回滚，先 `pm2 logs index --lines 100 --nostream` 看一眼具体报错，能直接修复就别动目录。"
      ]
    },
    {
      "id": "nginx-version",
      "category": "proxy",
      "title": "nginx -v 与 -V：大小写不同，输出完全不同",
      "summary": "小写 `-v` 只显示一行版本号；大写 `-V` 显示版本号加全部编译参数，用来确认 Nginx 编进了哪些模块。",
      "tags": ["Nginx", "版本", "编译参数", "大小写"],
      "updatedAt": "2026-10-30",
      "content": "`nginx -v` 和 `nginx -V` 只差一个大小写，但输出内容差很多。\n\n- `-v`（小写）：只打印一行版本号，例如 `nginx version: nginx/1.22.1`\n- `-V`（大写）：打印版本号、编译信息，以及完整的 `configure arguments`，能看到编译时启用了哪些模块（比如 `--with-http_ssl_module`、`--with-http_v2_module`）\n\n这个区别在排查「功能不生效」时特别有用：HTTPS 起不来、HTTP/2 不生效，先用 `nginx -V` 看编译参数里有没有对应模块，而不是盲目改配置。\n\n注意：`nginx -V` 的输出走的是标准错误（stderr），想用管道过滤时要写成 `nginx -V 2>&1 | grep ...`。",
      "commands": [
        {
          "desc": "只看版本号（小写 v）",
          "cmd": "nginx -v",
          "parts": [
            { "token": "nginx", "desc": "Nginx 的可执行程序" },
            { "token": "-v", "desc": "小写 v：只输出一行版本号，如 nginx/1.22.1" }
          ]
        },
        {
          "desc": "看版本 + 编译参数（大写 V）",
          "cmd": "nginx -V",
          "parts": [
            { "token": "nginx", "desc": "Nginx 的可执行程序" },
            { "token": "-V", "desc": "大写 V：输出详细版本、编译选项和全部 configure arguments" }
          ]
        },
        {
          "desc": "查编译时是否启用了某个模块",
          "cmd": "nginx -V 2>&1 | grep -o '--with-http_ssl_module'",
          "parts": [
            { "token": "nginx", "desc": "Nginx 的可执行程序" },
            { "token": "-V", "desc": "大写 V：输出编译参数" },
            { "token": "2>&1", "desc": "把标准错误（stderr）合并到标准输出，因为 nginx -V 的输出在 stderr 里" },
            { "token": "|", "desc": "管道，把前一条命令的输出交给下一条命令处理" },
            { "token": "grep", "desc": "按关键词过滤文本" },
            { "token": "-o", "desc": "只输出匹配到的片段，不输出整行" },
            { "token": "'--with-http_ssl_module'", "desc": "要找的编译参数，存在说明编译时启用了 SSL 模块" }
          ]
        }
      ],
      "tips": [
        "很多命令的大小写含义并不统一：在 nginx 里 `-v` 是 version、`-V` 是详细版本；但在 curl、ssh 里 `-v` 是 verbose（详细过程）、`-V` 才是 version。记参数时要按具体工具查，不能想当然。",
        "`nginx -V` 输出到 stderr，直接 `nginx -V | grep xxx` 可能过滤不到，必须加 `2>&1`。",
        "换机器或重新编译 Nginx 后，版本和模块都可能变，排查前先 `nginx -V` 对齐环境。",
        "用 `nginx -v` 确认版本，再判断某些新指令（如 http2、stream 相关配置）能不能用，避免配置写法与版本不兼容。"
      ]
    },
    {
      "id": "nginx-dump-config",
      "category": "proxy",
      "title": "nginx -T 查看完整生效配置（含 include）",
      "summary": "排查代理时用 `nginx -T` 一次看全所有 `include` 展开后的配置，再 grep `proxy_pass` 快速定位后端。",
      "tags": ["Nginx", "配置", "proxy_pass", "排查"],
      "updatedAt": "2026-10-30",
      "content": "`nginx -T` 是排查 Nginx 配置最快的方式：它会先检查语法，然后把**最终生效的完整配置**打印出来，包括 `include` 引入的所有站点文件。\n\n为什么不直接 `cat /etc/nginx/nginx.conf`？因为主配置通常只有一行 `include /etc/nginx/conf.d/*.conf;`，真正的 `server`、`location`、`proxy_pass` 都写在 `conf.d` 下的独立文件里，只看主配置会漏掉。\n\n排查流程：\n1. `nginx -T` 看完整配置，确认没有重复或冲突的 server_name\n2. `nginx -T | grep proxy_pass` 直接定位所有转发目标\n3. `ls /etc/nginx/conf.d/` 找到具体站点文件，再 `cat` 细看\n\n注意大小写：`-t` 只检查语法（test），`-T` 才会把配置内容 dump 出来。",
      "commands": [
        {
          "desc": "检查语法并输出完整生效配置（推荐）",
          "cmd": "nginx -T",
          "parts": [
            { "token": "nginx", "desc": "Nginx 的可执行程序" },
            { "token": "-T", "desc": "大写 T：测试配置语法，并把 include 展开后的完整配置输出到标准输出" }
          ]
        },
        {
          "desc": "过滤所有代理转发，快速找到后端地址",
          "cmd": "nginx -T | grep proxy_pass",
          "parts": [
            { "token": "nginx", "desc": "Nginx 的可执行程序" },
            { "token": "-T", "desc": "大写 T：输出完整生效配置" },
            { "token": "|", "desc": "管道，把前一条命令的输出交给 grep 处理" },
            { "token": "grep", "desc": "按关键词过滤文本行" },
            { "token": "proxy_pass", "desc": "Nginx 反向代理指令，后面跟的就是真实后端地址" }
          ]
        },
        {
          "desc": "查看主配置",
          "cmd": "cat /etc/nginx/nginx.conf",
          "parts": [
            { "token": "cat", "desc": "concatenate，读取文件并输出到终端" },
            { "token": "/etc/nginx/nginx.conf", "desc": "Nginx 主配置文件路径" }
          ]
        },
        {
          "desc": "列出 conf.d 下所有站点配置文件",
          "cmd": "ls /etc/nginx/conf.d/",
          "parts": [
            { "token": "ls", "desc": "list，列出目录内容" },
            { "token": "/etc/nginx/conf.d/", "desc": "站点配置目录，通常每个站点一个 .conf 文件" }
          ]
        },
        {
          "desc": "查看某个站点的具体配置",
          "cmd": "cat /etc/nginx/conf.d/bike77.conf",
          "parts": [
            { "token": "cat", "desc": "concatenate，读取文件并输出到终端" },
            { "token": "/etc/nginx/conf.d/bike77.conf", "desc": "bike77 站点的独立配置文件" }
          ]
        }
      ],
      "tips": [
        "`nginx -t` 只检查语法，`nginx -T` 检查并输出完整配置；`-T` 的内容在 stdout，可以直接管道给 grep。",
        "主配置里的 `include /etc/nginx/conf.d/*.conf;` 会把目录下所有 .conf 合并进来，所以实际代理配置常在 conf.d 里。",
        "看到 `proxy_pass` 后要确认它指向的端口真的有服务在监听，用 `ss -tlnp | grep ':3000'` 验证，否则就是 502。",
        "改完配置先 `nginx -t` 通过，再 `nginx -s reload` 平滑生效，不要直接 restart。",
        "不同发行版目录约定不同：CentOS 常用 conf.d，Ubuntu 常用 sites-available 加 sites-enabled 软链。"
      ]
    },
    {
      "id": "nginx-read-proxy-output",
      "category": "proxy",
      "title": "读懂 nginx -T | grep proxy_pass 的输出",
      "summary": "输出前两行是语法检查，后面的 proxy_pass 才是真实转发；带 `#` 的行是被注释的旧配置。",
      "tags": ["Nginx", "proxy_pass", "日志解读", "排查"],
      "updatedAt": "2026-10-30",
      "content": "执行 `nginx -T | grep proxy_pass` 时，输出会混着两类信息：\n\n```\nnginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration file /etc/nginx/nginx.conf test is successful\n            proxy_pass http://localhost:2262/;\n            proxy_pass http://localhost:2262/;\n#           proxy_pass http://127.0.0.1:...\n```\n\n- 前两行是 `-T` 顺带做的语法检查（输出到 stderr）\n- 后面的 `proxy_pass` 才是真正生效的转发配置（stdout，来自 include 展开）\n\n从这张图能读出三件事：\n1. 线上后端实际是 `localhost:2262`，不是常见的 3000\n2. 出现两次相同配置，说明至少两个 server/location 共用同一个后端\n3. 以 `#` 开头的是被注释掉的旧配置，不生效，排查时不要被误导",
      "commands": [
        {
          "desc": "过滤所有生效的代理转发",
          "cmd": "nginx -T | grep proxy_pass",
          "parts": [
            { "token": "nginx", "desc": "Nginx 的可执行程序" },
            { "token": "-T", "desc": "大写 T：检查语法并输出完整生效配置" },
            { "token": "|", "desc": "管道，把输出交给 grep 过滤" },
            { "token": "grep", "desc": "按关键词过滤文本行" },
            { "token": "proxy_pass", "desc": "反向代理指令，后面就是真实后端地址" }
          ]
        },
        {
          "desc": "同时看匹配行前面的上下文，判断属于哪个 server",
          "cmd": "nginx -T | grep -B 5 proxy_pass",
          "parts": [
            { "token": "nginx", "desc": "Nginx 的可执行程序" },
            { "token": "-T", "desc": "大写 T：输出完整生效配置" },
            { "token": "|", "desc": "管道，把输出交给 grep" },
            { "token": "grep", "desc": "按关键词过滤文本行" },
            { "token": "-B 5", "desc": "before，额外显示匹配行前面的 5 行，用来看到所属的 server 块" },
            { "token": "proxy_pass", "desc": "要查找的转发指令" }
          ]
        },
        {
          "desc": "确认 proxy_pass 指向的端口真的有服务在监听",
          "cmd": "ss -tlnp | grep ':2262'",
          "parts": [
            { "token": "ss", "desc": "查看 socket 状态的命令，netstat 的替代品" },
            { "token": "-tlnp", "desc": "t=TCP，l=只看监听，n=不做域名解析，p=显示进程名" },
            { "token": "|", "desc": "管道，把结果交给 grep" },
            { "token": "grep", "desc": "过滤出包含指定端口的行" },
            { "token": "':2262'", "desc": "要找的端口号，加上引号避免被 shell 特殊处理" }
          ]
        }
      ],
      "tips": [
        "语法检查那两行是 stderr，真正的配置内容在 stdout，所以 grep 只会筛到 proxy_pass 行。",
        "`#` 开头的行是注释，不生效；看到两条相同配置时先别以为配重了，可能是两个站点共用同一后端。",
        "`localhost` 在 Nginx 启动时解析，可能优先解析成 IPv6 的 `::1`；如果 Node 只监听 IPv4，就会 502。生产建议直接写 `127.0.0.1`。",
        "2262 是应用端口，不是 Nginx 对外监听的 80/443，别把两者混一起。",
        "找到后端后下一步就是 `ss -tlnp | grep ':2262'` 确认端口在监听，再 `curl -i http://127.0.0.1:2262/` 验证服务能响应。"
      ]
    },
    {
      "id": "deploy-mv-build",
      "category": "deploy",
      "title": "mv 覆盖更新静态资源（build 目录搬家）",
      "summary": "把 `tep-bms/build/*` 移到 `bms/build/`，只搬内容不搬 build 这层目录，更新静态资源后删掉临时包。",
      "tags": ["mv", "目录覆盖", "静态资源", "发版"],
      "updatedAt": "2026-10-30",
      "content": "目标：把 `tep-bms/build` 里的全部内容覆盖到 `bms/build`，同时两边都保留 `build` 这一层结构。\n\n```\nbms/build/\n└── static/...\n\ntep-bms/build/\n└── static/...\n```\n\n关键点：`mv tep-bms/build/* bms/build/` 里的 `*` 只取 build 下面的内容（static、index.html 等），**不会把 build 这一层目录本身搬过去**，所以结果是 `bms/build/static`，而不是 `bms/build/build/static`。\n\n为什么不直接 `mv tep-bms/build bms/build`？因为目标目录已经存在，那样会嵌套成 `bms/build/build`。\n\n移动完成后临时目录 tep-bms 基本空了，最后 `rm -rf tep-bms` 清理临时包。\n\n如果以后想把 bms 里的 build 层拆掉（变成 `bms/static` 直接在 bms 下），进入 bms 后执行 `mv build/* ./` 再 `rm -rf build` 即可。",
      "commands": [
        {
          "desc": "把临时 build 里的内容移进正式 build（覆盖同名文件）",
          "cmd": "mv tep-bms/build/* bms/build/",
          "parts": [
            { "token": "mv", "desc": "move，移动或重命名文件/目录" },
            { "token": "tep-bms/build/*", "desc": "源：取 tep-bms/build 下的所有内容（不含 build 这层目录本身，也不含隐藏文件）" },
            { "token": "bms/build/", "desc": "目标目录：移动过去的文件在这里同名覆盖旧文件" }
          ]
        },
        {
          "desc": "移动成功后删除临时目录",
          "cmd": "rm -rf tep-bms",
          "parts": [
            { "token": "rm", "desc": "remove，删除命令" },
            { "token": "-rf", "desc": "递归 + 强制：删除目录及内部所有内容，不确认" },
            { "token": "tep-bms", "desc": "临时解压出来的目录，内容已经搬走，可以整个删掉" }
          ]
        },
        {
          "desc": "更安全的一条链：移动成功才删临时目录",
          "cmd": "mv tep-bms/build/* bms/build/ && rm -rf tep-bms",
          "parts": [
            { "token": "mv", "desc": "move，移动文件/目录" },
            { "token": "tep-bms/build/*", "desc": "源目录里的全部内容" },
            { "token": "bms/build/", "desc": "目标目录，同名覆盖" },
            { "token": "&&", "desc": "逻辑与：前一条成功（退出码 0）才执行 rm，避免移动失败还删掉源" },
            { "token": "rm", "desc": "remove，删除命令" },
            { "token": "-rf", "desc": "递归 + 强制删除目录" },
            { "token": "tep-bms", "desc": "临时目录" }
          ]
        },
        {
          "desc": "进入 bms 目录，准备拆掉 build 层",
          "cmd": "cd bms",
          "parts": [
            { "token": "cd", "desc": "change directory，切换工作目录" },
            { "token": "bms", "desc": "目标目录名，当前目录下的 bms 文件夹" }
          ]
        },
        {
          "desc": "把 build 里的内容移到 bms 当前目录（拆掉 build 层）",
          "cmd": "mv build/* ./",
          "parts": [
            { "token": "mv", "desc": "move，移动文件/目录" },
            { "token": "build/*", "desc": "取 build 下的所有内容，不包含 build 目录本身" },
            { "token": "./", "desc": "当前目录（也就是 bms），内容会落到 bms 下" }
          ]
        },
        {
          "desc": "删掉已经空了的 build 目录",
          "cmd": "rm -rf build",
          "parts": [
            { "token": "rm", "desc": "remove，删除命令" },
            { "token": "-rf", "desc": "递归 + 强制删除" },
            { "token": "build", "desc": "已经搬空的目标目录" }
          ]
        }
      ],
      "tips": [
        "`*` 不匹配以 `.` 开头的隐藏文件（如 .env、.git），需要连隐藏文件一起搬时用 `cp -a tep-bms/build/. bms/build/` 再删源目录。",
        "`mv` 覆盖是静默的，同名文件直接替换，不会提示；执行前先 `ls` 确认源和目标都对。",
        "目录是**合并**不是整包替换：旧 static 里没被新包覆盖的旧 hash 文件会留下来。想彻底干净，先清空 `bms/build` 再移。",
        "用 `&&` 串起来更安全：`mv` 成功才执行 `rm -rf`，避免移动失败却把临时目录删了。",
        "`mv build/* ./` 拆层时，如果 bms 下已有同名文件会被覆盖，动手前先确认。",
        "源目录为空时 `*` 不会展开，`mv` 可能报 `No such file or directory`，先 `ls tep-bms/build/` 看一眼。"
      ]
    },
    {
      "id": "docker-run-it",
      "category": "docker",
      "title": "docker run -it：进容器里操作",
      "summary": "基于 ubuntu 镜像启动一个容器，并直接进入里面的 bash，相当于开了一台一次性的 Linux 练习机。",
      "tags": ["Docker", "容器", "镜像", "bash"],
      "updatedAt": "2026-11-02",
      "content": "`docker run -it ubuntu bash` 是最常见的入门命令，作用是：\n1. 在本地找 `ubuntu` 镜像，没有就从 Docker Hub 下载\n2. 用这个镜像**创建并启动一个新容器**\n3. 在容器里运行 `bash`，并把终端交给你\n\n之后你就在容器里面了：装的软件、建的文件都只影响这个容器，不碰宿主机。退出用 `exit` 或 Ctrl+D。\n\n`-it` 是两个参数的组合：\n- `-i`（interactive）：保持标准输入打开，不然 bash 收不到你敲的命令\n- `-t`（tty）：分配一个伪终端，不然没有提示符、显示也乱\n\n只给 `-i` 没有提示符，只给 `-t` 输入进不去，所以交互场景总是 `-it` 一起写。\n\n注意：默认情况下退出容器后它还在（状态是 Exited），下次启动是 `docker start`，而不是再 `docker run`（那会新建一个）。想用完就自动删掉，加 `--rm`。",
      "commands": [
        {
          "desc": "启动一个 ubuntu 容器并进入 bash",
          "cmd": "docker run -it ubuntu bash",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "run", "desc": "创建并启动一个新容器" },
            { "token": "-it", "desc": "-i 保持标准输入打开，-t 分配伪终端，合起来才能交互操作" },
            { "token": "ubuntu", "desc": "镜像名，默认取 ubuntu:latest，本地没有会自动下载" },
            { "token": "bash", "desc": "容器启动后执行的命令，这里是进入 bash 终端" }
          ]
        },
        {
          "desc": "用完自动删除容器（推荐练习时加）",
          "cmd": "docker run --rm -it ubuntu bash",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "run", "desc": "创建并启动一个新容器" },
            { "token": "--rm", "desc": "容器退出后自动删除，不留 Exited 状态的残留" },
            { "token": "-it", "desc": "交互模式：输入保持 + 伪终端" },
            { "token": "ubuntu", "desc": "镜像名" },
            { "token": "bash", "desc": "容器内启动 bash" }
          ]
        },
        {
          "desc": "在容器里退出（回到宿主机）",
          "cmd": "exit",
          "parts": [
            { "token": "exit", "desc": "退出当前 bash；这是容器的 1 号进程，退出后容器就停了" }
          ]
        },
        {
          "desc": "查看正在运行的容器",
          "cmd": "docker ps",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "ps", "desc": "列出运行中的容器（只显示活的）" }
          ]
        },
        {
          "desc": "查看所有容器，包括已退出的",
          "cmd": "docker ps -a",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "ps", "desc": "列出容器" },
            { "token": "-a", "desc": "all，包含 Exited 状态的容器" }
          ]
        },
        {
          "desc": "查看本地已有哪些镜像",
          "cmd": "docker images",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "images", "desc": "列出本地镜像（ubuntu 就在这里）" }
          ]
        }
      ],
      "tips": [
        "镜像是模板，容器是用模板开出来的实例；`docker run` 每次都新建一个容器，退出后想回去要用 `docker start -ai 容器ID`。",
        "练习时建议加 `--rm`，不然 `docker ps -a` 会越堆越多 Exited 容器。",
        "镜像可以指定版本：`ubuntu:22.04`，不写就是 `latest`。",
        "容器里默认是 root 用户，操作没有密码，但也意味着敲错 `rm -rf` 没人拦你——反正只影响这个容器，这也是为什么适合练手。",
        "想从宿主机复制文件进容器用 `docker cp`，而不是在 `-it` 里面想办法。"
      ]
    }
  ]
};
