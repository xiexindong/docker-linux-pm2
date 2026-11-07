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
    { "id": "docker", "name": "Docker", "desc": "镜像、容器与隔离环境" },
    { "id": "nginx", "name": "Nginx 基础", "desc": "最小可用配置、location 匹配与请求转发" },
    { "id": "mysql", "name": "MySQL 排查", "desc": "库表结构、自增、数据核对与 binlog" }
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
      "id": "nginx-reload",
      "category": "proxy",
      "title": "nginx -s reload：平滑重载配置",
      "summary": "改完 nginx.conf 不用重启进程，发一个 reload 信号即可生效，已有连接不会断。",
      "tags": ["Nginx", "reload", "配置生效"],
      "updatedAt": "2026-11-03",
      "content": "`nginx -s reload` 是**改完配置后让它生效**的标准动作。\n\n### 它做了什么\n\nNginx 是 master + worker 结构：\n\n```\nnginx -s reload\n   │\n   ├─ 给 master 进程发 HUP 信号\n   ├─ master 重新读取配置文件、检查语法\n   ├─ 启动一批新的 worker 进程（按新配置工作）\n   └─ 旧 worker 不再接新请求，把手上的请求处理完才退出\n```\n\n所以它叫**平滑重载**：\n- 用户正在进行的请求不会被掐断\n- 不需要停服务，不会有几十毫秒的空窗\n- 配置写错时 reload 会失败，**旧配置继续生效**，线上不会挂\n\n### 和 restart 的区别\n\n| 操作 | 连接 | 适用 |\n|---|---|---|\n| `nginx -s reload` | 不断，旧连接自然结束 | 改配置（99% 的情况） |\n| `systemctl restart nginx` / `nginx -s stop` + 启动 | 全部断开，进程重启 | 升级 Nginx 版本、更换编译模块 |\n\n### 标准操作顺序（不要直接 reload）\n\n```bash\nnginx -t && nginx -s reload\n```\n\n先 `-t` 测语法，通过了才 reload。习惯直接 reload 也行——写错它会拒绝加载，但你得去 error.log 里才发现问题，不如提前看。\n\n### `-s` 后面能跟的 4 个信号\n\n| 命令 | 含义 |\n|---|---|\n| `nginx -s reload` | 平滑重载配置（最常用） |\n| `nginx -s quit` | 优雅退出：处理完当前请求再停 |\n| `nginx -s stop` | 快速退出：立即停，不等请求 |\n| `nginx -s reopen` | 重新打开日志文件（日志切割后必做） |\n\n> `-s` 是 signal 的缩写。它本质是读 `nginx.pid` 拿到 master 进程号，再 `kill -HUP <pid>`。所以如果 pid 文件路径不对，会报 `nginx: [error] open() \"/run/nginx.pid\" failed`。\n\n### 日志切割后为什么必须 reopen\n\n日志文件被 `mv access.log access.log.1` 后，Nginx 仍握着旧文件的句柄，新日志会继续写进改名后的文件。发 `nginx -s reopen` 才会重新打开并创建新的 `access.log`。\n\n### reload 之后怎么确认生效\n\n```bash\nnginx -T | grep -A 3 \"server_name your.domain\"   # 看最终生效的配置\nps -ef | grep nginx                              # 看 worker 是否换了新进程\ntail -f /usr/local/nginx/logs/error.log           # 看有没有报错\n```",
      "commands": [
        {
          "desc": "平滑重载配置（你贴的命令）",
          "cmd": "nginx -s reload",
          "parts": [
            { "token": "nginx", "desc": "Nginx 可执行程序，用绝对路径也行（如 /usr/local/nginx/sbin/nginx）" },
            { "token": "-s", "desc": "signal，给运行中的 master 进程发信号" },
            { "token": "reload", "desc": "重载：重新读配置、启新 worker、旧 worker 处理完退出" }
          ]
        },
        {
          "desc": "推荐写法：先测语法，通过才重载",
          "cmd": "nginx -t && nginx -s reload",
          "parts": [
            { "token": "nginx", "desc": "Nginx 可执行程序" },
            { "token": "-t", "desc": "test：只检查配置语法，不生效" },
            { "token": "&&", "desc": "逻辑与：前一条成功才执行后一条，语法错就不 reload" },
            { "token": "nginx", "desc": "Nginx 可执行程序" },
            { "token": "-s", "desc": "signal，发信号给 master" },
            { "token": "reload", "desc": "平滑重载配置" }
          ]
        },
        {
          "desc": "优雅退出（处理完当前请求再停）",
          "cmd": "nginx -s quit",
          "parts": [
            { "token": "nginx", "desc": "Nginx 可执行程序" },
            { "token": "-s", "desc": "signal，发信号" },
            { "token": "quit", "desc": "优雅停止：不再接新请求，手上的请求处理完才退出" }
          ]
        },
        {
          "desc": "快速停止（不等请求）",
          "cmd": "nginx -s stop",
          "parts": [
            { "token": "nginx", "desc": "Nginx 可执行程序" },
            { "token": "-s", "desc": "signal，发信号" },
            { "token": "stop", "desc": "快速停止：立即结束所有 worker，正在处理的请求会被中断" }
          ]
        },
        {
          "desc": "日志切割后重新打开日志文件",
          "cmd": "nginx -s reopen",
          "parts": [
            { "token": "nginx", "desc": "Nginx 可执行程序" },
            { "token": "-s", "desc": "signal，发信号" },
            { "token": "reopen", "desc": "重新打开日志文件，配合日志切割（mv access.log）使用" }
          ]
        },
        {
          "desc": "用 systemd 管理的服务器这样写",
          "cmd": "sudo systemctl reload nginx",
          "parts": [
            { "token": "sudo", "desc": "以 root 权限执行，Nginx 需要权限操作 pid 文件" },
            { "token": "systemctl", "desc": "systemd 服务管理命令" },
            { "token": "reload", "desc": "让服务重新加载配置（内部等价于 nginx -s reload）" },
            { "token": "nginx", "desc": "服务名" }
          ]
        },
        {
          "desc": "确认 worker 进程换新的了",
          "cmd": "ps -ef | grep nginx",
          "parts": [
            { "token": "ps", "desc": "查看进程" },
            { "token": "-ef", "desc": "显示所有进程的完整信息（e=全部，f=完整格式）" },
            { "token": "|", "desc": "管道，把输出交给 grep" },
            { "token": "grep nginx", "desc": "过滤出 Nginx 相关进程，master 和 worker 都在" }
          ]
        }
      ],
      "tips": [
        "reload 是平滑的，restart 是断连的；改配置一律用 reload，只有升级 Nginx 本身才 restart。",
        "配置写错时 reload 会失败并保留旧配置继续服务，所以线上不会因为手滑 reload 而挂掉，但一定要看 error.log 确认。",
        "改了 `conf.d/xxx.conf` 却怎么 reload 都不生效，先 `nginx -T` 确认那份文件真的被主配置 `include` 了。",
        "reload 后 master 进程 PID 不变，worker 进程 PID 会变；`ps -ef | grep nginx` 看到多组 PID 是正常的过渡状态。",
        "日志切割（把 access.log 改名）之后必须 `nginx -s reopen`，否则新日志还是写进旧文件。",
        "报 `open() \"/run/nginx.pid\" failed` 说明 Nginx 根本没在跑，或者 pid 路径与配置里的 `pid` 指令不一致。",
        "非 root 用户执行需要 sudo，否则没有权限给 master 进程发信号。"
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
    },
    {
      "id": "linux-what-is-bash",
      "category": "linux",
      "title": "bash 是什么：shell 与终端的关系",
      "summary": "bash 是一个 shell，也就是命令解释器：你敲的命令由它翻译给 Linux 内核执行，平时看到的命令行就是它在工作。",
      "tags": ["bash", "shell", "基础"],
      "updatedAt": "2026-11-02",
      "content": "**bash 是一个 shell（命令解释器）**。你敲下 `ls`、`cd`，并不是 Linux 内核直接听懂，而是 bash 这个程序把你的输入翻译成系统调用，再把结果打印回来。\n\n三层关系：\n- **终端（terminal）**：那个黑窗口本身，负责显示和接收键盘输入\n- **shell（如 bash）**：跑在终端里的程序，负责解释命令，提示符 `[root@xxx ~]#` 就是它打印的\n- **内核**：真正干活的系统核心，由 shell 代为转达\n\n常见 shell 对比：\n- `sh`：最古老的标准 shell，功能少但哪都有\n- `bash`：sh 的增强版（Bourne Again SHell），绝大多数 Linux 的默认登录 shell，有命令补全、历史、数组等\n- `zsh`：功能更花哨（Oh My Zsh），macOS 的默认\n- `dash`：极简版，Debian/Ubuntu 把它链接为 `/bin/sh`，脚本启动更快\n\n判断一句话：你平时连上服务器敲命令，面对的就是 bash；写脚本开头 `#!/bin/bash` 就是在声明「这个文件交给 bash 来解释」。\n\n交互与脚本：bash 既能当交互式命令行（一条条敲），也能执行写好的 `.sh` 脚本文件，同一套语法。",
      "commands": [
        {
          "desc": "查看当前登录用的 shell",
          "cmd": "echo $SHELL",
          "parts": [
            { "token": "echo", "desc": "把后面的内容打印出来" },
            { "token": "$SHELL", "desc": "环境变量：当前用户的登录 shell 路径，一般是 /bin/bash 或 /bin/zsh" }
          ]
        },
        {
          "desc": "查看 bash 版本",
          "cmd": "bash --version",
          "parts": [
            { "token": "bash", "desc": "bash 程序本身" },
            { "token": "--version", "desc": "打印版本号，如 5.1.16" }
          ]
        },
        {
          "desc": "查看 bash 安装在哪个路径",
          "cmd": "which bash",
          "parts": [
            { "token": "which", "desc": "在 PATH 里找命令对应的可执行文件位置" },
            { "token": "bash", "desc": "要查找的命令名，通常返回 /bin/bash" }
          ]
        },
        {
          "desc": "查看系统里装了哪些 shell",
          "cmd": "cat /etc/shells",
          "parts": [
            { "token": "cat", "desc": "读取文件并输出到终端" },
            { "token": "/etc/shells", "desc": "系统登记的合法 shell 列表，每个用户只能从这里选登录 shell" }
          ]
        }
      ],
      "tips": [
        "「我在用 Linux 命令行」更准确的说法是「我在用 bash」——`ls`、`cd` 的搜索和解释规则都是 bash 定的。",
        "脚本第一行 `#!/bin/bash` 叫 shebang，告诉系统用哪个解释器执行这个文件；写 `#!/bin/sh` 在 Ubuntu 上实际跑的是 dash，语法有细微差别。",
        "有些命令是 bash 内建的（`cd`、`echo`、`export`），没有对应的独立程序，所以 `which cd` 找不到文件。",
        "退出 bash 用 `exit` 或 Ctrl+D；在容器/ssh 里退出 bash 就意味着断开会话。",
        "`sh xxx.sh` 和 `./xxx.sh` 可能用不同解释器执行：前者强制用 sh，后者看 shebang，这是脚本「本地能跑、线上报错」的常见原因。"
      ]
    },
    {
      "id": "docker-images-ps",
      "category": "docker",
      "title": "docker images 与 docker ps：看镜像、看容器",
      "summary": "docker images 列出本地所有镜像（模板），docker ps 列出正在运行的容器（实例），加 -a 才能看到已退出的。",
      "tags": ["Docker", "镜像", "容器", "查看"],
      "updatedAt": "2026-11-02",
      "content": "这两条命令分别看 Docker 的两类对象：\n- **镜像（image）**：模板，`docker run` 从它创建容器\n- **容器（container）**：用镜像开出来的运行实例\n\n`docker images` 每列含义：\n- `REPOSITORY`：镜像名（如 ubuntu、nginx）\n- `TAG`：版本标签，默认 latest\n- `IMAGE ID`：镜像的唯一 ID（内容哈希）\n- `CREATED`：镜像的构建时间，不是你下载的时间\n- `SIZE`：解压后的磁盘占用\n\n`docker ps` 每列含义：\n- `CONTAINER ID`：容器短 ID，操作容器时用它或 NAMES 都行\n- `IMAGE`：这个容器是从哪个镜像创建的\n- `COMMAND`：容器启动时执行的命令（比如 bash）\n- `CREATED`：容器创建时间\n- `STATUS`：当前状态，`Up 2 hours` 在跑，`Exited (0) 5 minutes ago` 已退出，括号里是退出码\n- `PORTS`：端口映射，如 `0.0.0.0:8080->80/tcp`\n- `NAMES`：容器名，没指定就随机生成\n\n排查时最常用的组合：`docker ps` 看活着的，`docker ps -a` 连退出的也看——「我的容器去哪了」基本都是没加 `-a`。",
      "commands": [
        {
          "desc": "列出本地所有镜像",
          "cmd": "docker images",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "images", "desc": "列出本地镜像：名称、标签、ID、大小" }
          ]
        },
        {
          "desc": "只输出镜像 ID（常用于批量操作）",
          "cmd": "docker images -q",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "images", "desc": "列出本地镜像" },
            { "token": "-q", "desc": "quiet，只打印 ID，不打印表头和各列，方便拼进其他命令" }
          ]
        },
        {
          "desc": "列出正在运行的容器",
          "cmd": "docker ps",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "ps", "desc": "列出运行中的容器（已退出的不显示）" }
          ]
        },
        {
          "desc": "列出所有容器，包括已退出的",
          "cmd": "docker ps -a",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "ps", "desc": "列出容器" },
            { "token": "-a", "desc": "all，把 Exited 状态的也列出来" }
          ]
        },
        {
          "desc": "只输出运行中容器的 ID",
          "cmd": "docker ps -q",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "ps", "desc": "列出容器" },
            { "token": "-q", "desc": "quiet，只打印容器 ID，常用于批量停止/删除" }
          ]
        },
        {
          "desc": "一键删掉所有已退出的容器",
          "cmd": "docker rm $(docker ps -aq -f status=exited)",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rm", "desc": "删除容器（只能删已停止的）" },
            { "token": "$(...)", "desc": "命令替换：先执行括号里的命令，把输出当作这里的参数" },
            { "token": "docker ps", "desc": "列出容器" },
            { "token": "-aq", "desc": "all + quiet：所有容器、只输出 ID" },
            { "token": "-f status=exited", "desc": "filter：只保留状态为已退出的容器" }
          ]
        }
      ],
      "tips": [
        "操作镜像用 `REPOSITORY:TAG` 或 `IMAGE ID`，操作容器用 `CONTAINER ID` 或 `NAMES`，别混着用。",
        "STATUS 里的退出码很重要：`Exited (0)` 是正常结束，`Exited (1)` 等是出错，排查先看这个数字。",
        "镜像列表里出现 `<none>` 的是构建残留（悬空镜像），用 `docker image prune` 清理。",
        "容器名和容器 ID 都可以缩写使用，ID 敲前几位能唯一区分就行。",
        "`docker ps -q` 的结果为空时，`docker rm $(...)` 会因缺少参数报错，这是正常现象。"
      ]
    },
    {
      "id": "docker-search",
      "category": "docker",
      "title": "docker search：在仓库里找镜像",
      "summary": "到 Docker Hub 等远程仓库按关键字搜镜像名，看 STAR 数和 OFFICIAL 标记挑靠谱的，找到后用 docker pull 拉。",
      "tags": ["Docker", "镜像", "搜索", "Docker Hub"],
      "updatedAt": "2026-11-03",
      "content": "当你知道要用什么技术（比如 MySQL、Redis、Nginx）但不确定镜像名时，用 `docker search` 去远程仓库搜。\n\n## 输出怎么读\n\n```\nNAME            DESCRIPTION           STARS  OFFICIAL  AUTOMATED\nmysql            MySQL 是世界上最流行的开源关系数据库        18000+   [OK]\nredis            Redis 是内存键值存储                        15000+   [OK]\nmy-user/mysql    某个用户自己构建的 mysql                    42\n```\n\n| 列 | 含义 | 挑镜像时的判断 |\n|---|---|---|\n| NAME | 镜像名（用户名/仓库） | 带官方名（如 `mysql`、`redis`）优先，`[OK]` OFFICIAL 才是 Docker 官方维护 |\n| DESCRIPTION | 一段简介 | 官方镜像通常写得规范，用户镜像可能乱写 |\n| STARS | 收藏数 | STAR 越多越多人用，踩过的坑更多 |\n| OFFICIAL | 是否官方 | `[OK]` 是；空白是用户自己搭的 |\n| AUTOMATED | 是否自动构建 | `[OK]` 表示代码更新后自动重打包，通常质量更稳定 |\n\n## 实战：找 PostgreSQL 带向量插件\n\n```bash\ndocker search pgvector\n# 搜出 pgvector/pgvector:pg16 这种，STAR 多的优先\n```\n\n## 国内网络慢怎么办\n\nDocker Hub 在国内经常超时。两种思路：\n\n1. **加国内镜像加速器**（推荐，一劳永逸）—— 在 daemon.json 里配 registry-mirrors，Ubuntu 路径 `/etc/docker/daemon.json`：\n   ```json\n   { \"registry-mirrors\": [\"https://docker.m.daocloud.io\"] }\n   ```\n   改完 `systemctl restart docker` 生效。\n\n2. **docker pull 时指定完整镜像源**，例如阿里云：\n   ```bash\n   docker pull registry.cn-hangzhou.aliyuncs.com/library/nginx\n   ```\n\n## 几个常见官方镜像\n\n| 官方名 | 用途 | 拉取命令 |\n|---|---|---|\n| `nginx` | 静态网站 + 反向代理 | `docker pull nginx` |\n| `redis` | 内存缓存 | `docker pull redis:7` |\n| `mysql` | 关系型数据库 | `docker pull mysql:8.0` |\n| `node` | Node.js 运行时 | `docker pull node:20-alpine` |\n| `alpine` | 极小 Linux 基础镜像 | `docker pull alpine` |",
      "commands": [
        {
          "desc": "按关键字搜镜像（你脑图里那条）",
          "cmd": "docker search mysql",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "search", "desc": "到默认仓库（Docker Hub）里按关键字模糊搜索镜像" },
            { "token": "mysql", "desc": "搜索关键字：镜像名或描述里包含 mysql 的都会返回" }
          ]
        },
        {
          "desc": "只看官方镜像（过滤掉用户镜像）",
          "cmd": "docker search --filter is-official=true nginx",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "search", "desc": "搜索镜像" },
            { "token": "--filter is-official=true", "desc": "过滤条件：只保留 OFFICIAL 列标 [OK] 的官方镜像" },
            { "token": "nginx", "desc": "搜索关键字" }
          ]
        },
        {
          "desc": "按 STAR 数从高到低排序",
          "cmd": "docker search --sort stars redis",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "search", "desc": "搜索镜像" },
            { "token": "--sort stars", "desc": "按 STARS 列降序排，最热门的排最上面" },
            { "token": "redis", "desc": "搜索关键字" }
          ]
        },
        {
          "desc": "搜索完整镜像名（带用户名）",
          "cmd": "docker search zilliz/milvus",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "search", "desc": "搜索镜像" },
            { "token": "zilliz/milvus", "desc": "完整的 用户名/仓库 名，精准匹配" }
          ]
        }
      ],
      "tips": [
        "优先挑 OFFICIAL 标 `[OK]` 的镜像，这是 Docker 官方维护的，安全更新有保障。",
        "同一镜像尽量指定版本 tag：`mysql:8.0` 比 `mysql` （默认 latest）更可复现，以后拉下来跑的是同一版本。",
        "国内拉镜像慢先配 daemon.json 加速器；不要每次都手动改镜像源前缀。",
        "`docker search` 只能搜公共仓库；私有仓库的镜像名字要按 `仓库地址/用户名/镜像名` 写，比如 `registry.cn-hangzhou.aliyuncs.com/library/nginx`。",
        "搜索结果里可能出现 `docker search: Error response from daemon: Get https://...`，基本是网络问题，换加速器或等网络好点再试。"
      ]
    },
    {
      "id": "docker-system-df",
      "category": "docker",
      "title": "docker system df：Docker 到底占了我多少磁盘",
      "summary": "一条命令把镜像、容器（含已退出的）、数据卷各自占的空间列出来；cleanup 列告诉你清了能省多少。",
      "tags": ["Docker", "磁盘", "清理", "系统"],
      "updatedAt": "2026-11-03",
      "content": "Docker 用久了，磁盘被吃满了却不知道是谁占的。`docker system df`（disk free）就是答案。\n\n## 输出示例\n\n```\nTYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE\nImages          12        6         3.2GB     1.8GB (56%)\nContainers      9         3         420MB     210MB (50%)\nLocal Volumes   8         5         1.1GB     300MB (27%)\nBuild Cache     23        -         800MB     800MB (100%)\n```\n\n## 各列含义\n\n| 列 | 含义 | 我的机器怎么看 |\n|---|---|---|\n| TYPE | 资源类型 | Images=镜像模板、Containers=容器（包含已退出的，主要是日志）、Local Volumes=数据卷、Build Cache=构建缓存 |\n| TOTAL | 总数量 | 12 个镜像、9 个容器 |\n| ACTIVE | 当前在使用的数量 | 6 个镜像被运行中的容器用着，3 个是正在运行的容器 |\n| SIZE | 实际占用磁盘空间 | 镜像会去重，所以 3.2GB 是叠加后的真实占用 |\n| RECLAIMABLE | 清了能省多少 | 括号里是可回收占该类的百分比；Build Cache 100% 都能清 |\n\n## 四个类型分别怎么清\n\n| 类型 | 清理命令 | 会删什么 | 会不会影响正在跑的服务 |\n|---|---|---|---|\n| 构建缓存 | `docker builder prune` | 所有构建缓存 | ❌ 不影响任何运行中容器 |\n| 悬空镜像 | `docker image prune` | REPOSITORY 为 `<none>` 的残留镜像 | ❌ 不影响（这些本来就是没标签的死镜像） |\n| 没在使用的镜像 | `docker image prune -a` | 所有不被运行中容器用到的镜像 | ⚠️ 正在用的不会删，但下次跑对应容器得重新 pull |\n| 已退出的容器 | `docker container prune` | Exited 状态的容器 | ❌ 已退出的本来就不在跑 |\n| 没挂的卷 | `docker volume prune` | 没有任何容器挂载的卷 | ⚠️ 里面可能有你想留的数据，确认再删 |\n| 一键全清（慎重） | `docker system prune -a` | 上面所有 + 没挂的卷 | ⚠️ 几乎清空，慎用 |\n\n## 排查「磁盘满了」的顺序\n\n```\n① df -h /              → 先确认是整个磁盘满了还是 Docker 占了\n② docker system df     → 看哪类资源最肥\n③ docker image ls      → 列出镜像大小排序\n④ docker ps -a         → 看有没有一堆 Exited 的旧容器\n⑤ docker volume ls     → 看有多少孤儿卷\n```\n\n## 一个实用习惯\n\n在 `~/.bashrc` 或 `~/.zshrc` 里加个 alias：\n\n```bash\nalias docker-clean='docker system prune -af'\n```\n\n定期跑一次（每月或感觉慢了），能省不少磁盘。",
      "commands": [
        {
          "desc": "查看 Docker 各类资源占用（你脑图里那条）",
          "cmd": "docker system df",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "system", "desc": "Docker 系统级管理（不是单个镜像或容器）" },
            { "token": "df", "desc": "disk free，显示镜像/容器/卷/构建缓存各自占用与可回收空间" }
          ]
        },
        {
          "desc": "详细模式：列出每个镜像/卷各自的大小",
          "cmd": "docker system df -v",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "system", "desc": "系统级管理" },
            { "token": "df", "desc": "磁盘占用" },
            { "token": "-v", "desc": "verbose，输出更详细，逐个列出镜像和卷的名字与大小" }
          ]
        },
        {
          "desc": "只清构建缓存（最安全的清理）",
          "cmd": "docker builder prune",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "builder", "desc": "Dockerfile 构建相关" },
            { "token": "prune", "desc": "裁剪：删掉不再需要的构建缓存，不影响任何运行中的容器" }
          ]
        },
        {
          "desc": "清已退出的容器",
          "cmd": "docker container prune -f",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "container", "desc": "容器管理" },
            { "token": "prune", "desc": "裁剪：删掉 Exited 状态的容器" },
            { "token": "-f", "desc": "force，不弹交互确认（脚本里用必须加）" }
          ]
        },
        {
          "desc": "清悬空镜像（REPOSITORY 为 <none> 的那些）",
          "cmd": "docker image prune -f",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "image", "desc": "镜像管理" },
            { "token": "prune", "desc": "裁剪：删掉没标签的悬空镜像" },
            { "token": "-f", "desc": "force，跳过确认" }
          ]
        },
        {
          "desc": "最狠的一键清（清前务必确认）",
          "cmd": "docker system prune -af",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "system", "desc": "系统级" },
            { "token": "prune", "desc": "裁剪：清掉所有没在用的资源" },
            { "token": "-a", "desc": "all：连不被使用的镜像也清" },
            { "token": "-f", "desc": "force：跳过交互确认，否则会问你 'Do you really want to purge?' " }
          ]
        }
      ],
      "tips": [
        "Build Cache 是最容易被忽略的，有时能占掉几 GB；它 100% 可回收，prune 它最安全。",
        "`docker image prune -a` 会删掉所有没在使用的镜像，下次运行对应容器得重新 pull，网络慢的机器不要随便用。",
        "`docker volume prune` 可能把你真正想留的数据删掉，删前先跑 `docker volume ls` 确认。",
        "容器本身不占磁盘空间多，但容器的日志会不断增长；docker ps -a 看到一堆 Exited 的老容器可以放心 prune。",
        "清理前先看 `docker system df` 的 RECLAIMABLE 列，别直接就上 prune -af。",
        "你这台机器的 Local Volumes Active=0 但 RECLAIMABLE 也显示 0B，Windows Docker Desktop 下 volume 统计和 Linux 不完全一致；删前直接 `docker volume ls` 逐个确认名字更稳妥。",
        "Windows 下 `docker system df` 输出格式和 Linux 完全一样，只是 Build Cache 偶尔显示 0（没跑过 build）。"
      ]
    },
    {
      "id": "docker-system-df-real",
      "category": "docker",
      "title": "实战：你的 docker system df 真实输出逐行解读",
      "summary": "以你 Windows 上跑出来的结果为例，逐列拆解 8 个镜像、9 个容器、4 个卷到底是什么情况。",
      "tags": ["Docker", "磁盘", "实战", "system df"],
      "updatedAt": "2026-11-03",
      "content": "这是你本机（Windows Docker Desktop）执行 `docker system df` 的真实输出：\n\n```\nTYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE\nImages          8         2         5.971GB   0B (0%)\nContainers      9         2         274.4kB   196.6kB (71%)\nLocal Volumes   4         0         486.4MB   0B (0%)\nBuild Cache     0         0         0B        0B\n```\n\n## 逐行解读\n\n### ① Images：8 个镜像，2 个在用\n\n| 项目 | 含义 | 为什么 RECLAIMABLE 是 0%？ |\n|---|---|---|\n| TOTAL 8 | 本地有 8 个镜像文件 | — |\n| ACTIVE 2 | 只有 2 个正在运行的容器在用它们 | — |\n| SIZE 5.971GB | 镜像去重后总共占 5.97GB | — |\n| RECLAIMABLE 0B (0%) | 看起来没可回收的？不对 | **关键：Docker 把「被已退出的容器占用」也算「在用」**。你之前那 6 个 Exited 容器仍然占着它们各自的镜像引用，所以这 8 个镜像全部被标记为「in use」。想释放：先把那 6 个 Exited 容器删了，再 `docker image prune` |\n\n### ② Containers：9 个，2 个在跑\n\n| 项目 | 含义 |\n|---|---|\n| TOTAL 9 | 总共 9 个容器（包含 7 个已退出的） |\n| ACTIVE 2 | 正在运行的 2 个 |\n| SIZE 274.4kB | 容器可写层的大小（不含镜像本身） |\n| RECLAIMABLE 196.6kB (71%) | 7 个已退出容器的可写层，删掉能省约 197KB |\n\n**这条最没争议**：直接 `docker container prune` 就能回收，不会影响正在跑的 2 个容器。\n\n### ③ Local Volumes：4 个卷，0 个在用\n\n| 项目 | 含义 | 疑问 |\n|---|---|---|\n| TOTAL 4 | 挂了 4 个数据卷 | — |\n| ACTIVE 0 | 没有正在运行的容器在挂它们 | — |\n| SIZE 486.4MB | 卷里的数据总共占 486MB | — |\n| RECLAIMABLE 0B | 显示不可回收？ | **Windows Docker Desktop 的 volume 统计和 Linux 不完全一致**。理论上 ACTIVE 为 0 就应该可回收。建议直接 `docker volume ls` 看名字，确认是哪个应用的数据再决定。**比如 milvus 的数据卷你可能不想删** |\n\n### ④ Build Cache：0\n\n正常，你还没写 Dockerfile 构建过自己的镜像。跑过 `docker build` 后这里就会有数字。\n\n## 给你的清理建议\n\n```bash\n# 安全第一：只清已退出的容器\ndocker container prune -f\n\n# 然后再跑一次 docker system df 看变化\ndocker system df\n\n# 如果 Images 的 RECLAIMABLE 变成了正数，再清镜像\ndocker image prune -f\n\n# Build Cache 没东西，跳过\n```\n\n**别直接上 `docker system prune -af`**：Local Volumes 里可能有 milvus 的向量数据、pgvector 的数据卷，一删就找不回来了。\n\n## 一个容易忽略的点\n\nDocker Desktop 在 Windows 上用 WSL2 跑，磁盘空间占用其实体现在 WSL2 的虚拟磁盘文件里。如果 `docker system df` 显示已经清干净了，但 Windows 磁盘空间没回来，可以执行：\n\n```powershell\n# 查看 WSL2 的 vhdx 文件大小（通常在 %LOCALAPPDATA%\\Docker\\wsl）\ndir \"$env:LOCALAPPDATA\\Docker\\wsl\"\n```\n\nvhdx 是动态扩容的，删掉容器/镜像后它不会自动缩小，要手动 compact（压缩虚拟磁盘）。",
      "commands": [
        {
          "desc": "再跑一次，对比 prune 前后的变化",
          "cmd": "docker system df",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "system", "desc": "系统级管理" },
            { "token": "df", "desc": "磁盘占用" }
          ]
        },
        {
          "desc": "清已退出的容器（最安全）",
          "cmd": "docker container prune -f",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "container", "desc": "容器管理" },
            { "token": "prune", "desc": "裁剪：只删 Exited 状态的容器" },
            { "token": "-f", "desc": "force：跳过交互确认" }
          ]
        },
        {
          "desc": "清悬空镜像（prune 完容器后再跑一次 system df 看 Images 列是否有变化）",
          "cmd": "docker image prune -f",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "image", "desc": "镜像管理" },
            { "token": "prune", "desc": "裁剪：删 REPOSITORY 为 <none> 的悬空镜像" },
            { "token": "-f", "desc": "跳过确认" }
          ]
        },
        {
          "desc": "列出所有数据卷，确认名字再决定删不删",
          "cmd": "docker volume ls",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "volume", "desc": "数据卷管理" },
            { "token": "ls", "desc": "list，列出所有卷名，Windows Docker Desktop 下卷名通常是长 UUID 格式" }
          ]
        }
      ],
      "tips": [
        "prune 的顺序很重要：先 `docker container prune` 清掉 Exited 的容器，再跑 `docker system df`，这时 Images 的 RECLAIMABLE 才会变出来；不然镜像一直被 Exited 容器「占着」。",
        "Local Volumes 在 Windows 下 RECLAIMABLE 有时不准，直接 `docker volume ls` 看卷名再决定；像 milvus、pgvector 这种数据卷别乱删。",
        "Docker Desktop 用 WSL2 时，删了容器/镜像后 Windows 磁盘空间不回来，要 compact vhdx 虚拟磁盘。",
        "Build Cache 为 0 是正常的；跑过 `docker build` 后才会有。"
      ]
    },
    {
      "id": "docker-rmi",
      "category": "docker",
      "title": "docker rmi：删掉本地镜像",
      "summary": "删镜像不会删容器也不会删数据卷；有容器在用这个镜像时删不掉，先把容器停掉或强制删除。",
      "tags": ["Docker", "镜像", "删除", "清理"],
      "updatedAt": "2026-11-03",
      "content": "`docker rmi`（image remove，删掉镜像）和 `docker rm`（container remove，删容器）是**两条完全不同的命令**。\n\n## 先搞清楚谁是谁\n\n| 命令 | 删的是什么 | 删之前必须满足 |\n|---|---|---|\n| `docker rm` | 容器（运行实例） | 必须先 stop，或加 `-f` 强制删 |\n| `docker rmi` | 镜像（模板） | 没有任何容器正在使用它（含已退出的），或加 `-f` 强制删 |\n| `docker volume rm` | 数据卷 | 没有任何容器挂载它 |\n\n## 为什么删不掉？\n\n最常见的报错：\n\n```\nError response from daemon: conflict: unable to remove repository reference\n\"mysql:8.0\" (must force) - container b2d1cb1513bf is using its referenced image\nsha256:abc123...\n```\n\n意思是：**还有容器（包括已退出的）用这个镜像，你要删必须先删那个容器，或者加 `-f` 强制**。\n\n## 删除顺序\n\n```\n删镜像 → 看有没有容器在用 → 有就先 docker stop + docker rm 那个容器\n                                 → 再 docker rmi\n```\n\n或者省事点，直接：\n\n```bash\ndocker rmi -f mysql:8.0\n# 会自动把依赖这个镜像的容器也一起删掉\n```\n\n## 同一个镜像有多个 tag\n\n```\nREPOSITORY  TAG       IMAGE ID       CREATED      SIZE\nmysql       8.0       abc123...       2 weeks ago  512MB\nmysql       5.7       def456...       3 months ago 420MB\n```\n\n- `docker rmi mysql:5.7` —— 只删 5.7 这个 tag\n- `docker rmi mysql` —— 默认删 `mysql:latest`（如果有的话）\n- 要删所有 mysql 的 tag：`docker rmi $(docker images mysql -q | sort -u)`\n\n## 和 docker image rm 的关系\n\n`docker rmi` 是 `docker image rm` 的**简写**，两者完全等价。Docker 命令分「老短名」和「新分组名」两套，都能用：\n\n| 简写 | 等价完整名 |\n|---|---|\n| `docker ps` | `docker container ls` |\n| `docker run` | 无完整名 |\n| `docker images` | `docker image ls` |\n| `docker rmi` | `docker image rm` |\n| `docker rm` | `docker container rm` |\n\n新手用简写就行，等熟了看别人用完整名能认出来就够。",
      "commands": [
        {
          "desc": "按镜像名+tag 删（你脑图里的写法，也是最常见的）",
          "cmd": "docker rmi mysql:8.0",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rmi", "desc": "image remove，删除镜像（不是容器）" },
            { "token": "mysql:8.0", "desc": "REPOSITORY:TAG 形式；也可以直接写 IMAGE ID 的前几位" }
          ]
        },
        {
          "desc": "按镜像 ID 删（ID 前几位能唯一识别就行）",
          "cmd": "docker rmi abc123",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rmi", "desc": "删除镜像" },
            { "token": "abc123", "desc": "IMAGE ID 的前几位（通常 6-12 位），够唯一就行" }
          ]
        },
        {
          "desc": "强制删镜像（同时自动删掉依赖它的容器）",
          "cmd": "docker rmi -f mysql:8.0",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rmi", "desc": "删除镜像" },
            { "token": "-f", "desc": "force：强制删除，即使有容器在使用也一起干掉" },
            { "token": "mysql:8.0", "desc": "目标镜像" }
          ]
        },
        {
          "desc": "删掉所有悬空镜像（IMAGE ID 为 <none> 的残留）",
          "cmd": "docker rmi $(docker images -f dangling=true -q)",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rmi", "desc": "删除镜像" },
            { "token": "$(...)", "desc": "命令替换：括号里的结果作为参数传入" },
            { "token": "docker images", "desc": "列出镜像" },
            { "token": "-f dangling=true", "desc": "filter：只保留悬空镜像（没有 tag 的）" },
            { "token": "-q", "desc": "quiet：只输出 ID" }
          ]
        },
        {
          "desc": "同时删多个镜像",
          "cmd": "docker rmi mysql:8.0 redis:7 alpine",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rmi", "desc": "删除镜像" },
            { "token": "mysql:8.0 redis:7 alpine", "desc": "多个镜像名/ID 空格分隔，按左到右依次删除" }
          ]
        }
      ],
      "tips": [
        "有容器在使用这个镜像时，rmi 会报 conflict；可以先 docker rm 那个容器，或直接加 -f 让 Docker 帮你一起删。",
        "`docker rmi mysql`（不带 tag）默认操作 mysql:latest，不是所有 mysql 的 tag；想全删要单独指定。",
        "镜像本身不占数据卷，删镜像不会影响 volume 里的数据；但删了再 run 同一镜像就得重新 pull。",
        "`docker image prune` 只清悬空镜像，想清掉指定 tag 还是得 rmi。",
        "简写和完整名都能用，保持自己习惯就行，关键是别把 rmi（镜像）和 rm（容器）搞反。"
      ]
    },
    {
      "id": "docker-ps-real-output",
      "category": "docker",
      "title": "实战：docker ps -a 真实输出逐行解读",
      "summary": "以你本机 9 个容器为例，逐列拆解 docker ps -a 的输出，指出存活、已退出、端口映射、退出码各自意味着什么。",
      "tags": ["Docker", "ps", "实战", "状态"],
      "updatedAt": "2026-11-02",
      "content": "这是你本机执行 `docker ps -a` 的真实输出，共 9 个容器。重点从 **STATUS** 和 **PORTS** 两列判断情况：\n\n## 逐行解读（按状态分组）\n\n### ✅ Up — 正在运行（3 个）\n\n| CONTAINER ID | IMAGE | NAMES | STATUS | PORTS | 说明 |\n|---|---|---|---|---|---|\n| 66c155632f7b | ubuntu | pensive_poitras | Up 2 hours | — | 你之前跑的 `docker run -it ubuntu bash`，当前容器还活着，退出前没加 `--rm` |\n| b2d1cb1513bf | mysql:8.0 | bike77-mysql | Up 2 hours | 0.0.0.0:3306->3306/tcp | 业务用 MySQL，映射宿主机 3306，当前在跑 |\n| f997dc4fae5 | milvusdb/milvus:v2.5.18 | milvus-standalone | Up 6 seconds (health: starting) | 0.0.0.0:9091->9091, 20090 | Milvus 向量数据库，刚启动，健康检查还在 starting |\n\n### ❌ Exited (0) — 正常结束（2 个）\n\n| CONTAINER ID | IMAGE | NAMES | STATUS | 说明 |\n|---|---|---|---|---|\n| 684a1a6e896 | hello-world | affectionate_payne | Exited (0) 2 hours ago | 第一次装 Docker 时跑的 hello-world 测试容器，它本就跑一下就退出 |\n| da1f41fa5a04 | pgvector/pgvector:pg16 | pg-vector | Exited (0) 2 weeks ago | pgvector 是带向量插件的 PostgreSQL，正常退出过一次 |\n\n### ⚠️ Exited (非 0) — 异常退出（4 个）\n\n| CONTAINER ID | IMAGE | NAMES | STATUS | 说明 |\n|---|---|---|---|---|\n| 934e2594392d | zilliz/attu:v2.5 | attu | Exited (255) 11 days ago | Attu 是 Milvus 的图形化管理界面，退出码 255 一般是端口冲突或 Milvus 没启动导致它连不上 |\n| 22357ac89ec | mysql:8.0 | agent-mysql | Exited (137) 2 weeks ago | 137 = 128+9，被 SIGKILL 杀掉的，通常是 `docker rm -f` 或机器内存不够被 OOM Killer 杀了 |\n| 6e20547530c5 | minio/minio:... | minio-minio | Exited (255) 11 days ago | MinIO 对象存储，和 Milvus 一起被干掉的可能性大（退出时间接近） |\n| b30e6e3bb4e | quay.io/coreos/etcd:v3.5.18 | milvus-etcd | Exited (1) 11 days ago | Milvus 依赖的 etcd，1 是通用错误码，多半也是 Milvus 倒了它跟着崩 |\n\n## 关键观察\n\n1. **Milvus 三连**：`milvus-standalone`、`minio-minio`、`milvus-etcd` 三个应该绑在一起启动，11 天前集体挂了；今天你只 restart 了 milvus-standalone，etcd 和 MinIO 还躺着，**Milvus 其实跑不稳**——它需要 etcd 存元数据、MinIO 存文件\n2. **agent-mysql 与 bike77-mysql**：同是 mysql:8.0，一个在跑一个死了，`agent-mysql` 退出码 137 是被强杀的，可以删掉\n3. **autorestart 没开**：如果容器配了 `--restart always`，重启 Docker 或机器后它会自动拉起；这些都没开，所以手动挂了就挂了\n\n## 对应命令\n\n```bash\n# 只看正在跑的（排除所有 Exited 的干扰）\ndocker ps\n\n# 重启 milvus 整条链（etcd + minio + standalone）\ndocker start milvus-etcd minio-minio milvus-standalone\n\n# 删掉已死的容器（想清干净的话）\ndocker rm agent-mysql pg-vector attu minio-minio milvus-etcd\n```\n\n## 退出码速查\n\n| 退出码 | 含义 | 常见原因 |\n|---|---|---|\n| 0 | 正常结束 | hello-world 这种一次性容器、手动 exit |\n| 1 | 通用错误 | 配置写错、依赖缺失 |\n| 137 (128+9) | 被 SIGKILL 杀 | `docker kill`、OOM 内存不足 |\n| 139 (128+11) | 段错误 | 程序自身 bug |\n| 255 | Docker 自身异常 | 端口冲突、连不上依赖、entrypoint 失败 |",
      "commands": [
        {
          "desc": "看所有容器（你的原命令）",
          "cmd": "docker ps -a",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "ps", "desc": "列出容器" },
            { "token": "-a", "desc": "all，包含已退出的（只跑 docker ps 会漏掉 Exited 的）" }
          ]
        },
        {
          "desc": "只看正在跑的（日常排查更清爽）",
          "cmd": "docker ps",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "ps", "desc": "列出运行中的容器" }
          ]
        },
        {
          "desc": "查看某个容器为什么挂了（重点）",
          "cmd": "docker logs agent-mysql",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "logs", "desc": "输出容器的标准输出和标准错误（即应用日志）" },
            { "token": "agent-mysql", "desc": "容器名或 ID，用哪个都行" }
          ]
        },
        {
          "desc": "跟着日志输出实时看（像 tail -f）",
          "cmd": "docker logs -f milvus-standalone",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "logs", "desc": "输出容器日志" },
            { "token": "-f", "desc": "follow：持续跟踪，新日志追加显示" },
            { "token": "milvus-standalone", "desc": "目标容器名" }
          ]
        },
        {
          "desc": "重启整条 Milvus 链（etcd + minio + standalone）",
          "cmd": "docker start milvus-etcd minio-minio milvus-standalone",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "start", "desc": "启动已存在的容器（不是新建，所以用 start 不用 run）" },
            { "token": "milvus-etcd minio-minio milvus-standalone", "desc": "多个容器名用空格分开，按顺序启动" }
          ]
        },
        {
          "desc": "强制删掉异常退出的容器",
          "cmd": "docker rm agent-mysql pg-vector attu minio-minio milvus-etcd",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rm", "desc": "删除容器（运行中的容器删不掉，要先 stop 或加 -f）" },
            { "token": "agent-mysql ...", "desc": "多个容器名，Exited 状态可以直接删" }
          ]
        }
      ],
      "tips": [
        "容器 Exited 了不代表废了，用 `docker start 名字` 能拉起来；`docker run` 每次都会新建一个同名新容器，这两个别搞混。",
        "退出码 137 = 被 SIGKILL 杀，最常见的原因是 **内存不够被 OOM Killer 干掉**，看 `docker inspect 容器ID | grep -i oom` 确认。",
        "Milvus 独立版必须同时启动 **etcd + minio + standalone** 三者，缺一个都跑不稳；用 `docker-compose up -d` 能自动编排。",
        "`docker logs` 默认只打印当前日志流，想看容器启动时的老日志，加 `--tail 500`。",
        "Windows 下容器默认跑在 WSL2 里，docker ps -a 显示的端口是宿主机（你本机 Windows）的端口，不是 Linux 虚拟机的端口。"
      ]
    },
    {
      "id": "linux-touch",
      "category": "linux",
      "title": "touch 创建空文件与更新时间戳",
      "summary": "文件不存在就创建一个空文件；文件已存在就只更新它的修改时间，不动里面的内容。",
      "tags": ["文件", "时间戳", "基础"],
      "updatedAt": "2026-11-02",
      "content": "`touch` 有两个作用，看文件存不存在：\n- 文件不存在：创建一个 0 字节的空文件\n- 文件已存在：**只刷新访问/修改时间，内容完全不动**\n\n所以 `touch linux` 就是在当前目录建一个名叫 `linux` 的空文件。\n\n为什么需要「只更新时间」这个功能？很多工具靠文件的修改时间做判断，比如：\n- `make` 发现源文件比目标文件新，才重新编译\n- 部署脚本靠刷新某个文件的时间戳触发重载\n- 测试写入权限：touch 一下看报不报错，比真的写内容安全\n\n创建后想确认文件状态，用 `stat` 看三个时间：\n- `atime`：最近一次读取（access）\n- `mtime`：最近一次修改内容（modify）\n- `ctime`：最近一次修改元信息（change，比如改权限、改名）",
      "commands": [
        {
          "desc": "在当前目录创建名为 linux 的空文件",
          "cmd": "touch linux",
          "parts": [
            { "token": "touch", "desc": "创建空文件，或刷新已有文件的时间戳" },
            { "token": "linux", "desc": "文件名，相对当前目录；也可以是完整路径" }
          ]
        },
        {
          "desc": "一次创建多个空文件",
          "cmd": "touch a.txt b.txt",
          "parts": [
            { "token": "touch", "desc": "创建空文件，或刷新时间戳" },
            { "token": "a.txt b.txt", "desc": "多个文件名用空格分开，逐个处理" }
          ]
        },
        {
          "desc": "文件不存在时不创建，只刷存在的",
          "cmd": "touch -c old.log",
          "parts": [
            { "token": "touch", "desc": "创建空文件，或刷新时间戳" },
            { "token": "-c", "desc": "no-create：文件不存在就跳过，不新建" },
            { "token": "old.log", "desc": "目标文件，只有它已存在才会被刷新时间" }
          ]
        },
        {
          "desc": "指定时间戳（不常用但排障有用）",
          "cmd": "touch -d \"2026-01-01 10:00\" test.txt",
          "parts": [
            { "token": "touch", "desc": "创建空文件，或刷新时间戳" },
            { "token": "-d", "desc": "date：用后面的字符串设置时间，而不是当前时间" },
            { "token": "\"2026-01-01 10:00\"", "desc": "时间字符串，带空格所以要加引号" },
            { "token": "test.txt", "desc": "目标文件" }
          ]
        },
        {
          "desc": "查看文件的三个时间",
          "cmd": "stat linux",
          "parts": [
            { "token": "stat", "desc": "显示文件详细状态：大小、权限、atime/mtime/ctime" },
            { "token": "linux", "desc": "要查看的文件" }
          ]
        }
      ],
      "tips": [
        "`touch 已有文件` 不会清空内容，这点和 `echo > 文件`、`cat /dev/null > 文件` 完全不同，后者会截断文件。",
        "文件名带空格要加引号：`touch \"my file.txt\"`，否则会被当成两个文件创建。",
        "想在别的目录创建，直接写路径：`touch /tmp/test.log`，前提是那个目录存在——touch 不会帮你建目录（那是 mkdir 的活）。",
        "ctime 不是「创建时间」（birth time），是元信息变更时间，改权限也会刷新它，别搞混。",
        "判断目录可不可写，touch 一个测试文件再删掉，是最轻量的办法。"
      ]
    },
    {
      "id": "linux-cat",
      "category": "linux",
      "title": "cat 查看文件内容",
      "summary": "把文件内容原样打印到终端，小文件直接看；也能把多个文件合并输出。",
      "tags": ["文件", "查看", "基础"],
      "updatedAt": "2026-11-02",
      "content": "`cat` 是 concatenate（拼接）的缩写，作用是把文件内容**一次性全部**打印到终端。\n\n适合场景：\n- 看配置文件、短脚本、README 这类小文件\n- 把多个文件拼起来看或合并成新文件\n\n不适合场景：\n- 大日志文件——cat 会从头刷到尾，终端滚几千行，想看最后只能等刷完。大文件应该用 `less`（可翻页、可搜索）或 `tail`/`head`（只看头尾）。\n\n配合重定向可以写文件：`cat a.txt b.txt > all.txt` 把两个文件合并成新的。",
      "commands": [
        {
          "desc": "查看文件全部内容",
          "cmd": "cat file.txt",
          "parts": [
            { "token": "cat", "desc": "concatenate，把文件内容输出到终端" },
            { "token": "file.txt", "desc": "要查看的文件" }
          ]
        },
        {
          "desc": "查看时带上行号",
          "cmd": "cat -n app.js",
          "parts": [
            { "token": "cat", "desc": "输出文件内容" },
            { "token": "-n", "desc": "number，在每行前面加行号，方便对照报错信息" },
            { "token": "app.js", "desc": "要查看的文件" }
          ]
        },
        {
          "desc": "合并两个文件成新文件",
          "cmd": "cat a.txt b.txt > all.txt",
          "parts": [
            { "token": "cat", "desc": "输出文件内容" },
            { "token": "a.txt b.txt", "desc": "按顺序拼接的源文件" },
            { "token": ">", "desc": "重定向：把输出写进文件，原内容被覆盖" },
            { "token": "all.txt", "desc": "合并后的目标文件" }
          ]
        },
        {
          "desc": "只看文件前 20 行（大文件替代方案）",
          "cmd": "head -n 20 app.log",
          "parts": [
            { "token": "head", "desc": "只看文件开头部分" },
            { "token": "-n 20", "desc": "指定行数：前 20 行" },
            { "token": "app.log", "desc": "要查看的文件" }
          ]
        },
        {
          "desc": "只看文件最后 20 行（看日志常用）",
          "cmd": "tail -n 20 app.log",
          "parts": [
            { "token": "tail", "desc": "只看文件末尾部分" },
            { "token": "-n 20", "desc": "指定行数：最后 20 行" },
            { "token": "app.log", "desc": "要查看的文件" }
          ]
        }
      ],
      "tips": [
        "日志文件一律别用 cat，用 `tail -n 100` 或 `less`；cat 大文件时想中断按 Ctrl+C。",
        "`>` 是覆盖写，目标文件原有内容会消失；想追加到末尾用 `>>`。",
        "查看大文件的正解是 `less 文件`：上下翻页、`/` 搜索、按 q 退出。",
        "反向输出（最后一行先显示）用 `tac`，排查日志时偶尔有用。",
        "`cat -A` 能显示隐藏的换行符和 Tab（显示为 $ 和 ^I），排查配置文件格式问题时有用。"
      ]
    },
    {
      "id": "linux-echo",
      "category": "linux",
      "title": "echo 输出文本与写文件",
      "summary": "把文本打印到终端；配合 > 和 >> 能往文件里写内容，是脚本里输出信息最常用的命令。",
      "tags": ["输出", "写文件", "基础"],
      "updatedAt": "2026-11-02",
      "content": "`echo` 把后面的内容原样打印出来，常用来：\n- 脚本里打印提示和调试信息\n- 查看变量的值：`echo $PATH`\n- 往文件里写一行内容\n\n两个关键点：\n1. **引号决定变量是否展开**：`echo \"$PATH\"` 输出变量的值，`echo '$PATH'` 原样输出这 5 个字符。单引号里 bash 什么都不解释。\n2. **重定向决定写文件方式**：`>` 覆盖整个文件，`>>` 追加到末尾。覆盖前想清楚，文件原有内容会消失。\n\n写配置的典型场景：`echo 'export PATH=xxx:$PATH' >> ~/.bashrc` 追加一行环境变量配置。",
      "commands": [
        {
          "desc": "打印一段文本",
          "cmd": "echo hello world",
          "parts": [
            { "token": "echo", "desc": "把后面的内容打印到终端" },
            { "token": "hello world", "desc": "要输出的文本，多个词用空格分开" }
          ]
        },
        {
          "desc": "查看环境变量的值",
          "cmd": "echo $PATH",
          "parts": [
            { "token": "echo", "desc": "打印内容" },
            { "token": "$PATH", "desc": "$ 开头表示取变量的值，这里是可执行文件的搜索路径" }
          ]
        },
        {
          "desc": "追加一行配置到 bashrc",
          "cmd": "echo 'export JAVA_HOME=/usr/local/jdk' >> ~/.bashrc",
          "parts": [
            { "token": "echo", "desc": "打印内容" },
            { "token": "'export JAVA_HOME=/usr/local/jdk'", "desc": "单引号包裹，内容原样输出（防止 $ 被提前展开）" },
            { "token": ">>", "desc": "追加到文件末尾，不动原有内容" },
            { "token": "~/.bashrc", "desc": "bash 启动配置文件，~ 表示家目录" }
          ]
        },
        {
          "desc": "覆盖写入文件（危险，先确认）",
          "cmd": "echo \"deploy at $(date)\" > deploy.log",
          "parts": [
            { "token": "echo", "desc": "打印内容" },
            { "token": "\"deploy at $(date)\"", "desc": "双引号内变量和 $(命令) 会被展开后再输出" },
            { "token": ">", "desc": "覆盖写入：目标文件原有内容全部清空" },
            { "token": "deploy.log", "desc": "目标文件" }
          ]
        },
        {
          "desc": "输出转义字符（换行等）",
          "cmd": "echo -e \"line1\\nline2\"",
          "parts": [
            { "token": "echo", "desc": "打印内容" },
            { "token": "-e", "desc": "解释 \\n、\\t 这类转义字符，不加会原样输出" },
            { "token": "\"line1\\nline2\"", "desc": "\\n 会被输出成真正的换行" }
          ]
        }
      ],
      "tips": [
        "覆盖 `>` 和追加 `>>` 是新手最常搞错的两个符号：往配置文件写内容 99% 的情况应该用 `>>`。",
        "想输出 `$` 符号本身，用单引号或转义 `\\$`。",
        "写多行内容别用一堆 echo，用 heredoc：`cat <<EOF > file` 然后逐行写，最后单独一行 EOF 结束。",
        "脚本里 echo 是最原始的调试手段：在关键位置打印变量值，跑一遍看输出对不对。",
        "`echo -n` 末尾不换行，拼接输出或写进度提示时用。"
      ]
    },
    {
      "id": "linux-ls",
      "category": "linux",
      "title": "ls 列出目录内容",
      "summary": "查看目录里有什么；ls -l 看权限和大小等详情，ls -a 把隐藏文件也显示出来。",
      "tags": ["文件", "目录", "基础"],
      "updatedAt": "2026-11-02",
      "content": "`ls`（list）是最常用的命令，列出目录内容。重点掌握三个参数：\n- `-l`：长格式，显示权限、属主、大小、时间\n- `-a`：all，显示隐藏文件（以 `.` 开头的）\n- `-h`：human-readable，把字节数转成 K/M/G\n\n`ls -l` 输出的每一列含义：\n```\n-rw-r--r-- 1 root root  1234 Nov  2 10:00 app.js\n```\n- 第 1 列 `-rw-r--r--`：类型 + 权限。第 1 位 `d` 是目录、`-` 是普通文件、`l` 是软链接；后面 9 位是 属主/属组/其他人 的读(r)写(w)执行(x)权限\n- 第 2 列：硬链接数（目录通常 ≥2）\n- 第 3、4 列：属主、属组\n- 第 5 列：文件大小（字节，加 -h 才好看）\n- 第 6~8 列：最后修改时间\n- 最后一列：文件名\n\n很多系统里 `ll` 是 `ls -l` 的别名（alias），两个等价。",
      "commands": [
        {
          "desc": "列出当前目录内容",
          "cmd": "ls",
          "parts": [
            { "token": "ls", "desc": "list，列出目录内容（默认不含隐藏文件）" }
          ]
        },
        {
          "desc": "长格式查看详情",
          "cmd": "ls -l",
          "parts": [
            { "token": "ls", "desc": "列出目录内容" },
            { "token": "-l", "desc": "long，长格式：权限、属主、大小、修改时间全显示" }
          ]
        },
        {
          "desc": "大小以 K/M/G 显示",
          "cmd": "ls -lh",
          "parts": [
            { "token": "ls", "desc": "列出目录内容" },
            { "token": "-l", "desc": "长格式" },
            { "token": "-h", "desc": "human-readable，把字节数转成易读的 K/M/G" }
          ]
        },
        {
          "desc": "连隐藏文件一起看",
          "cmd": "ls -la",
          "parts": [
            { "token": "ls", "desc": "列出目录内容" },
            { "token": "-l", "desc": "长格式" },
            { "token": "-a", "desc": "all，包含以 . 开头的隐藏文件（如 .git、.env）" }
          ]
        },
        {
          "desc": "查看指定目录的内容",
          "cmd": "ls /usr/local/apps",
          "parts": [
            { "token": "ls", "desc": "列出目录内容" },
            { "token": "/usr/local/apps", "desc": "要查看的目录，绝对路径" }
          ]
        }
      ],
      "tips": [
        "「明明文件在那，ls 却看不到」——八成是隐藏文件，加 `-a`。",
        "`ll` 不是命令，是 `ls -l` 的别名；有些精简系统没有这个别名，报错时用完整的 `ls -l`。",
        "目录的权限位 `drwxr-xr-x`：第一个 d 表示目录；文件没有 x 权限时双击/执行会报 Permission denied。",
        "`ls -l` 第 5 列对目录来说不是目录总大小，只是目录这个「文件」本身占的块，看目录实际占用用 `du -sh 目录`。",
        "按时间排序看最新文件：`ls -lt`；按大小排：`ls -lS`。"
      ]
    },
    {
      "id": "linux-df",
      "category": "linux",
      "title": "df -h：磁盘空间一目了然",
      "summary": "disk free，看整个系统每个磁盘分区还剩多少空间；-h 把字节转成 K/M/G 人类可读。",
      "tags": ["Linux", "磁盘", "空间", "排查"],
      "updatedAt": "2026-11-03",
      "content": "`df`（disk free）显示**整个系统所有挂载点**的空间占用。服务器磁盘满了先跑它，一眼定位是哪个分区爆了。\n\n## 典型输出（逐列拆解）\n\n```\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/vda1        99G   42G   53G  45% /\ntmpfs           1.9G     0  1.9G   0% /dev/shm\n/dev/vdb1       200G   15G  185G   8% /data\n```\n\n| 列 | 含义 | 怎么看 |\n|---|---|---|\n| Filesystem | 设备文件（哪块盘） | `/dev/vda1` 是系统盘、`/dev/vdb1` 是额外挂的数据盘、`tmpfs` 是内存盘 |\n| Size | 总容量 | 这块盘一共多大 |\n| Used | 已用空间 | 被占了多少 |\n| Avail | 还能剩多少 | 注意：不是 Size-Used，留了 5% 给 root 预留 |\n| Use% | 使用率 | **超过 80% 就要警惕**，90%+ 基本要清 |\n| Mounted on | 挂载点（这个盘装到哪个目录下） | `/` 是根目录系统盘、`/data` 是数据盘、`/dev/shm` 是内存盘 |\n\n## 三条核心要点\n\n1. **Avail ≠ Size - Used**：Linux 默认预留 5% 给 root 用户，所以即使显示 Use% 100%，root 还是能写进 5% 的应急空间。\n2. **Use% 是看问题的第一指标**：不要纠结 Used 和 Avail 各多少，先扫一眼 Use% 列，找最大的那个。\n3. **`tmpfs` 不是磁盘**：它是内存盘，容量来自你的 RAM，里面的东西重启就没了，临时文件才用它。\n\n## 和 du 的区别\n\n| 命令 | 回答的问题 |\n|---|---|\n| `df -h` | **哪个分区**满了？（系统级别，按盘统计） |\n| `du -sh 目录` | **哪个目录**占了这么大？（往细分查哪个目录最肥） |\n\n排查顺序：`df -h` 定盘 → `du -sh /目录/* | sort -rh | head` 定位到具体目录。\n\n## 最容易看懵的一个现象\n\n用 `df -h` 看到 `/` 使用率 90%+，但 `du -sh /` 加起来却远小于 90%——通常是：\n\n- **已删除但还被进程占着的文件**：rm 了但进程没重启，句柄没关，空间没释放。用 `lsof +L1 | head` 找出来，重启对应进程或直接 `kill`。\n- **Docker 占了大量空间**：容器日志、镜像、volume 都在系统盘，用 `docker system df` 单独查。\n\n## 只看根分区（最常用的一条）\n\n```bash\ndf -h /\n```\n\n服务器一般只关心系统盘（`/`），没必要把 tmpfs、/boot 这些无关的都列出来。",
      "commands": [
        {
          "desc": "以人类可读格式列出所有分区（你贴的这条）",
          "cmd": "df -h",
          "parts": [
            { "token": "df", "desc": "disk free，显示每个挂载点的磁盘空间情况" },
            { "token": "-h", "desc": "human-readable，把字节数转成易读的 K/M/G/T" }
          ]
        },
        {
          "desc": "只看根分区（系统盘，服务器上最常用）",
          "cmd": "df -h /",
          "parts": [
            { "token": "df", "desc": "显示磁盘空间" },
            { "token": "-h", "desc": "人类可读格式" },
            { "token": "/", "desc": "只看根分区（Mounted on 为 / 的那一行）" }
          ]
        },
        {
          "desc": "按挂载点看某个特定分区",
          "cmd": "df -h /data",
          "parts": [
            { "token": "df", "desc": "显示磁盘空间" },
            { "token": "-h", "desc": "人类可读" },
            { "token": "/data", "desc": "只看 /data 这块盘（比如你专门挂数据盘的情况）" }
          ]
        },
        {
          "desc": "同时显示 inode 使用情况（排查 inode 耗尽问题）",
          "cmd": "df -hi /",
          "parts": [
            { "token": "df", "desc": "显示磁盘空间" },
            { "token": "-h", "desc": "人类可读" },
            { "token": "-i", "desc": "inode 模式：看 inode 用了多少而不是磁盘字节数" },
            { "token": "/", "desc": "根分区" }
          ]
        },
        {
          "desc": "查看某个目录下各子目录的占用（往细分查）",
          "cmd": "du -sh /* | sort -rh | head -10",
          "parts": [
            { "token": "du", "desc": "disk usage，统计目录实际占用" },
            { "token": "-sh", "desc": "s=只显示每个参数的汇总，h=人类可读" },
            { "token": "/*", "desc": "根目录下所有一级子目录" },
            { "token": "|", "desc": "管道" },
            { "token": "sort -rh", "desc": "按人类可读数字倒序排（大的在前）" },
            { "token": "head -10", "desc": "只看前 10 行" }
          ]
        }
      ],
      "tips": [
        "服务器磁盘满了先 `df -h` 看 Use%，不要直接就删东西；先定位是哪个分区，再 `du` 往细分查。",
        "Use% 超过 80% 就该警惕；95%+ 系统可能开始出问题（日志写不进去、MySQL 报错等）。",
        "`df` 和 `du` 结果对不上时，先查是不是有 rm 了但被进程占着的文件（`lsof +L1`），再查 Docker（`docker system df`）。",
        "inode 也会耗尽：磁盘还有空间但新建文件报 'no space left on device'，用 `df -hi` 看 inode 用了多少。",
        "Docker 环境下，/var/lib/docker 往往占掉系统盘大头；删镜像/清构建缓存前先用 `docker system df` 确认能省多少。",
        "`du` 默认不统计隐藏文件；要看 `.` 开头的目录得显式写：`du -sh .[^.]*/*` 或用 find。"
      ]
    },
    {
      "id": "docker-layer-pyramid",
      "category": "docker",
      "title": "Docker 站在哪一层：硬件 → Win10 → VMware → CentOS → Docker → 容器",
      "summary": "从笔记本硬件到容器共 6 层，只有 VMware 那层是虚拟化；Docker 只是进程隔离，容器和宿主机共用同一个内核。",
      "tags": ["Docker", "虚拟机", "内核", "概念", "嵌套"],
      "updatedAt": "2026-11-03",
      "content": "这张金字塔图从上到下画的是「容器到底跑在哪」：\n\n```\n           ▲  ┌──────────────────┐\n           │  │   CentOS 7.5     │  ← 容器（你 docker run 起来的东西）\n           │  ├──────────────────┤\n           │  │     Docker       │  ← 容器引擎，管镜像和容器\n           │  ├──────────────────┤\n           │  │    CentOS 7      │  ← 虚拟机里的操作系统，容器的「宿主机」\n           │  ├──────────────────┤\n           │  │     VMware       │  ← 虚拟机软件（Hypervisor），真·虚拟化就在这层\n           │  ├──────────────────┤\n           │  │     Win10        │  ← 你笔记本的操作系统\n           ▼  ├──────────────────┤\n              │    笔记本硬件      │  ← CPU / 内存 / 硬盘\n              └──────────────────┘\n```\n\n## 逐层拆解\n\n| 层 | 是什么 | 谁在管谁 |\n|---|---|---|\n| 笔记本硬件 | 物理 CPU、内存、磁盘 | 最底层，所有东西最终都跑在它上面 |\n| Win10 | 物理机的操作系统 | 直接调度硬件，提供 VMware 运行的环境 |\n| VMware | 虚拟机软件（Hypervisor） | 在 Win10 上切出一块虚拟硬件，给里面的系统用 |\n| CentOS 7 | 虚拟机里装的完整 Linux | 拥有自己的内核 + 文件系统 + 全套环境 |\n| Docker | 装在这个 CentOS 7 上的容器引擎 | 不虚拟硬件，只做「进程隔离 + 文件系统打包」 |\n| CentOS 7.5 | 容器里的用户空间 | 没有自己的内核，借用 CentOS 7 的内核跑 |\n\n## 三个必须理解的点\n\n### ① 只有 VMware 那层是真的「虚拟化」\n\n虚拟机（VMware）模拟出一整套硬件：假 CPU、假内存、假网卡，然后在里面装一个**完整操作系统**——包含它自己的内核。所以虚拟机启动像真机开机，几十秒到几分钟，体积几个 GB。\n\nDocker 什么都不模拟。它只是把进程关进一个「笼子」（Namespace + cgroups），笼子里看到独立的文件系统、独立的进程列表、独立的网络，但**内核只有一个**——就是外面 CentOS 7 的那个。所以容器启动是秒级，镜像几百 MB 起。\n\n### ② 容器共享内核，这一点有办法直接验证\n\n```bash\ndocker run --rm centos:7.5 uname -r\n```\n\n输出的是**外面 CentOS 7 的内核版本**，不是 CentOS 7.5 的。因为容器里压根没有内核，`uname` 读的是宿主机的。\n\n这也是为什么：\n\n- 容器里装不了内核、改不了内核参数（少数 sysctl 可以，多数被禁）\n- Linux 上跑的镜像不能直接拿到 Windows 上跑（Windows 内核不认 Linux 的那套调用）\n- Docker Desktop 在 Windows 上必须套一层 WSL2 —— 因为要有个真 Linux 内核\n\n### ③ 嵌套有性能代价\n\n你图中这个结构是「Win10 → VMware → Docker」，等于虚拟化指令要穿透好几层。日常练习没问题，但生产环境不会这么搭：\n\n| 部署方式 | 层级 | 说明 |\n|---|---|---|\n| 练习环境（你当前这样） | 硬件 → Win10 → VMware → CentOS → Docker | 方便在 Windows 上练 Linux，性能有损耗 |\n| 云服务器 | 物理机 → 云平台（VM）→ Docker | 主流做法，云主机本来就是虚拟机 |\n| 物理机自建 | 硬件 → Linux → Docker | 性能最好，公司自建机房常见 |\n| Windows 本机 | Win10 → WSL2（轻量 VM）→ Docker | Docker Desktop 的路子，比 VMware 轻，但本质也是套了一层 |\n\n## 和「Docker Desktop」的关系\n\nDocker Desktop 的结构和你这张图是一个思路，只是更轻：\n\n```\nWin10 → WSL2（微软自带的轻量 Linux 虚拟机）→ Docker → 容器\n```\n\n所以你上次 `docker system df` 里看到的磁盘占用，才会落在 WSL2 的 vhdx 文件里——因为 Docker 容器实际跑在那个 WSL2 虚拟机内。\n\n## 一句话总结\n\n> **虚拟机是「造一台假电脑再装系统」，Docker 是「给进程圈一块地」**。金字塔上面两层（CentOS 7.5 容器）之所以这么薄，是因为它借用了下面 CentOS 7 的内核。",
      "commands": [
        {
          "desc": "在宿主机（CentOS 7）上看内核版本",
          "cmd": "uname -r",
          "parts": [
            { "token": "uname", "desc": "Unix name，输出系统信息" },
            { "token": "-r", "desc": "release，只看内核版本号，如 3.10.0-1160.el7.x86_64" }
          ]
        },
        {
          "desc": "在容器里跑同一条命令，对比输出（会发现版本一模一样）",
          "cmd": "docker run --rm centos:7.5 uname -r",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "run", "desc": "创建并启动一个容器" },
            { "token": "--rm", "desc": "容器退出后自动删除，不留垃圾容器" },
            { "token": "centos:7.5", "desc": "镜像名 + 标签，容器里的「用户空间」版本" },
            { "token": "uname -r", "desc": "在容器内部执行的命令，读到的却是宿主机内核" }
          ]
        },
        {
          "desc": "看 Docker 记录的宿主机内核版本",
          "cmd": "docker info | grep -i kernel",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "info", "desc": "输出 Docker 守护进程的完整环境信息" },
            { "token": "|", "desc": "管道，把前一条命令的输出交给后一条处理" },
            { "token": "grep", "desc": "按关键词过滤行" },
            { "token": "-i", "desc": "ignore case，忽略大小写" },
            { "token": "kernel", "desc": "要匹配的关键词，这里找 Kernel Version 那一行" }
          ]
        },
        {
          "desc": "看客户端和服务端各自的版本（服务端就跑在 WSL2 / CentOS 里）",
          "cmd": "docker version",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具（客户端）" },
            { "token": "version", "desc": "同时显示 Client（你敲命令的这头）和 Server（真正干活的 daemon）" }
          ]
        }
      ],
      "tips": [
        "容器里执行 `uname -a` 看到的还是宿主机内核，这是「共享内核」最直接的证据；别指望容器里能装内核。",
        "镜像标签 `centos:7.5` 指的是用户空间版本（文件系统、库、命令），不代表内核版本。",
        "Docker 不是「轻量虚拟机」。它没有自己的内核，只是把进程关进 Namespace + cgroups 的笼子里。",
        "VMware 里套 Docker 属于嵌套虚拟化，CPU 指令要穿透多层，练习够用，生产别这么搭。",
        "Windows 上 Docker Desktop 走的 WSL2 也是同一思路：先有一个轻量 Linux 虚拟机，再在里面跑 Docker。",
        "`docker info` 里的 Kernel Version 是宿主机的，不是镜像的；想知道镜像里装了哪些软件，进容器 `cat /etc/os-release` 看。"
      ]
    },
    {
      "id": "docker-command-cheatsheet",
      "category": "docker",
      "title": "Docker 核心命令速查表（高频到进阶）",
      "summary": "按阶段整理：日常高频 → 项目实战 → 进阶，每条命令都带逐词解释，方便随时查。",
      "tags": ["Docker", "速查", "命令"],
      "updatedAt": "2026-11-02",
      "content": "按「高频 → 实战 → 进阶」三个阶段整理的命令清单，每天回来翻一眼就行。\n\n## 第一阶段：日常高频（必须掌握）\n\n### 镜像管理\n| 命令 | 作用 |\n|---|---|\n| `docker pull 镜像名` | 从 Docker Hub 下载镜像到本地 |\n| `docker images` | 列出本地已有镜像 |\n| `docker rmi 镜像名` | 删除本地镜像（用名字或 ID） |\n| `docker search 关键词` | 在 Docker Hub 上搜索镜像 |\n\n### 容器生命周期\n| 命令 | 作用 |\n|---|---|\n| `docker run -d -p 8080:80 nginx` | 后台启动并映射端口 |\n| `docker ps` | 看运行中的容器 |\n| `docker ps -a` | 看所有容器（含已退出） |\n| `docker stop 容器ID` | 停止容器 |\n| `docker start 容器ID` | 启动已停止的容器 |\n| `docker rm 容器ID` | 删除已停止的容器 |\n| `docker logs -f 容器ID` | 实时跟踪容器日志 |\n| `docker exec -it 容器ID bash` | 进入运行中的容器 |\n\n### 数据持久化（卷 Volume）\n| 命令 | 作用 |\n|---|---|\n| `docker run -v /host:/container nginx` | 宿主机目录挂进容器 |\n| `docker volume ls` | 列出所有卷 |\n\n**理解**：容器是临时工（删了就没），卷是仓库（数据放这才安全）。\n\n## 第二阶段：项目实战（重点）\n\n### Dockerfile\n| 命令 | 作用 |\n|---|---|\n| `docker build -t my-app .` | 用当前目录的 Dockerfile 构建镜像 |\n\n### docker-compose\n| 命令 | 作用 |\n|---|---|\n| `docker-compose up -d` | 后台启动所有服务 |\n| `docker-compose down` | 停止并删除所有服务 |\n\n## 第三阶段：进阶（按需）\n\n| 主题 | 命令 | 作用 |\n|---|---|---|\n| 网络 | `docker network create mynet` | 创建自定义网络 |\n| 网络 | `docker network ls` | 列出网络 |\n| 仓库 | `docker push my-app:v1` | 推送到 Docker Hub |\n| 清理 | `docker system prune -a` | 清理所有未使用的镜像/容器/网络 |\n\n## 一句话总结学习路径\n\n先学会**用别人的镜像跑起来**（run/ps/logs），再学会**写自己的镜像**（Dockerfile/build），最后学会**用 compose 管理多个容器**（docker-compose up）。",
      "commands": [
        {
          "desc": "下载 nginx 镜像",
          "cmd": "docker pull nginx",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "pull", "desc": "从镜像仓库（默认 Docker Hub）拉取镜像到本地" },
            { "token": "nginx", "desc": "镜像名，默认拉取 latest 标签；指定版本写 nginx:1.25" }
          ]
        },
        {
          "desc": "后台启动 nginx 并映射端口",
          "cmd": "docker run -d -p 8080:80 nginx",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "run", "desc": "创建并启动容器" },
            { "token": "-d", "desc": "detached：后台运行，不占用当前终端" },
            { "token": "-p 8080:80", "desc": "port：宿主机端口 8080 映射到容器端口 80，外部访问 8080 就是容器的 80" },
            { "token": "nginx", "desc": "使用的镜像名" }
          ]
        },
        {
          "desc": "停止容器",
          "cmd": "docker stop <容器ID>",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "stop", "desc": "优雅停止容器（先发 SIGTERM，等 10 秒还没停就 SIGKILL）" },
            { "token": "<容器ID>", "desc": "容器的短 ID 或名字，用 docker ps 查" }
          ]
        },
        {
          "desc": "删除已停止的容器",
          "cmd": "docker rm <容器ID>",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rm", "desc": "删除容器（运行中的容器删不掉，要先 stop 或加 -f）" },
            { "token": "<容器ID>", "desc": "容器的短 ID 或名字" }
          ]
        },
        {
          "desc": "用 Dockerfile 构建镜像",
          "cmd": "docker build -t my-app:v1 .",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "build", "desc": "用 Dockerfile 构建镜像" },
            { "token": "-t my-app:v1", "desc": "tag：给镜像起名字和版本标签，格式 名字:标签" },
            { "token": ".", "desc": "构建上下文路径，这里是当前目录；Dockerfile 默认也在这个目录" }
          ]
        },
        {
          "desc": "启动 docker-compose 所有服务（后台）",
          "cmd": "docker-compose up -d",
          "parts": [
            { "token": "docker-compose", "desc": "多容器编排工具，读当前目录的 docker-compose.yml" },
            { "token": "up", "desc": "创建并启动 compose 文件里定义的所有服务" },
            { "token": "-d", "desc": "detached：后台运行，不占用当前终端" }
          ]
        },
        {
          "desc": "停止并清理 docker-compose 所有服务",
          "cmd": "docker-compose down",
          "parts": [
            { "token": "docker-compose", "desc": "多容器编排工具" },
            { "token": "down", "desc": "停止并删除 compose 管理的容器、网络（保留卷和镜像）" }
          ]
        }
      ],
      "tips": [
        "`docker run` 每次都会新建一个容器；想启动已存在的容器用 `docker start`，别再 run 一遍。",
        "端口映射 `-p 8080:80` 左边是**宿主机端口**，右边是**容器端口**；写反了外部访问不到。",
        "`docker stop` 发 SIGTERM 优雅停，`docker kill` 直接 SIGKILL 强杀；优先用 stop。",
        "构建镜像时最后那个 `.` 是上下文路径，Docker 会把这个目录打包发给 Docker daemon，所以大项目要加 .dockerignore。",
        "docker-compose down 默认不删卷（怕你误删数据库数据）；想连卷一起删加 `-v`。"
      ]
    },
    {
      "id": "docker-run-detached",
      "category": "docker",
      "title": "docker run -d -p：后台运行与端口映射",
      "summary": "-d 让容器在后台跑，不占用当前终端；-p 把宿主机端口映射到容器端口，让外部能访问。",
      "tags": ["Docker", "run", "端口"],
      "updatedAt": "2026-11-02",
      "content": "这是最常见的容器启动方式，两个参数配合使用：\n\n### -d（detached）后台运行\n不加 `-d` 时，容器日志直接刷在当前终端，按 Ctrl+C 会停掉容器。加了 `-d` 后，容器在后台默默跑，终端立即归还。之后想盯着日志用 `docker logs -f 容器ID`。\n\n### -p（port）端口映射\n容器里的服务默认只在容器内部可见，外部访问不到。`-p` 把宿主机的一个端口「转发」到容器的一个端口：\n\n```\n-p 8080:80\n    ↑     ↑\n    │     └── 容器内的端口（nginx 监听 80）\n    └── 宿主机端口（你本机/服务器的 8080）\n```\n\n外部访问 `http://宿主机IP:8080`，等于直接打到容器里 nginx 的 80 端口。\n\n### 典型用法组合\n\n```bash\n# 后台跑 nginx，外部用 8080 访问\ndocker run -d -p 8080:80 --name my-nginx nginx\n\n# 跑 MySQL，映射 3306 并设置 root 密码\ndocker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0\n```\n\n**注意**：宿主机端口不能重复映射，第二个容器想占 8080 会报端口冲突；换个端口号就行。",
      "commands": [
        {
          "desc": "后台启动 nginx，映射端口",
          "cmd": "docker run -d -p 8080:80 nginx",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "run", "desc": "创建并启动新容器" },
            { "token": "-d", "desc": "detached：后台运行，不占终端" },
            { "token": "-p 8080:80", "desc": "宿主机 8080 映射到容器 80，外部访问 8080 即访问 nginx" },
            { "token": "nginx", "desc": "使用的镜像" }
          ]
        },
        {
          "desc": "指定容器名（方便后续操作）",
          "cmd": "docker run -d -p 8080:80 --name my-nginx nginx",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "run", "desc": "创建并启动容器" },
            { "token": "-d", "desc": "后台运行" },
            { "token": "-p 8080:80", "desc": "端口映射" },
            { "token": "--name my-nginx", "desc": "给容器起个固定名字，否则是随机生成的（pensive_poitras 那种）" },
            { "token": "nginx", "desc": "使用的镜像" }
          ]
        },
        {
          "desc": "查看端口映射是否生效",
          "cmd": "docker port my-nginx",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "port", "desc": "显示容器的端口映射关系" },
            { "token": "my-nginx", "desc": "容器名或 ID" }
          ]
        },
        {
          "desc": "实时跟踪容器日志",
          "cmd": "docker logs -f my-nginx",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "logs", "desc": "输出容器的标准输出和标准错误" },
            { "token": "-f", "desc": "follow：持续跟踪，新日志追加显示，Ctrl+C 退出跟踪" },
            { "token": "my-nginx", "desc": "容器名或 ID" }
          ]
        },
        {
          "desc": "停掉容器并删除",
          "cmd": "docker stop my-nginx && docker rm my-nginx",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "stop", "desc": "优雅停止容器（发 SIGTERM）" },
            { "token": "my-nginx", "desc": "目标容器" },
            { "token": "&&", "desc": "shell 逻辑与：前一条成功才执行后一条" },
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "rm", "desc": "删除已停止的容器" }
          ]
        }
      ],
      "tips": [
        "`--name` 很有用，后续 stop/rm/logs/exec 都直接用名字，比敲 ID 方便得多。",
        "端口冲突报错时，用 `docker ps` 查哪个容器占了那个端口，或者换个宿主机端口。",
        "`-p 8080:80` 映射单端口，`-P`（大写）把容器所有暴露端口都随机映射到宿主机高位端口。",
        "生产环境建议用 `-p 127.0.0.1:8080:80` 只允许本机访问，外部流量走 Nginx 反向代理进来。",
        "加 `--rm` 参数：容器退出后自动删除，跑一次性任务时推荐加。"
      ]
    },
    {
      "id": "docker-start-stop-restart",
      "category": "docker",
      "title": "docker start / stop / restart：容器开关机",
      "summary": "操作的是**已存在的容器**，不会新建也不会删除；start 拉起、stop 优雅停止、restart 重启。",
      "tags": ["Docker", "生命周期", "容器"],
      "updatedAt": "2026-11-03",
      "content": "这三个命令都在操作**同一个已存在的容器**，只是状态不同。\n\n### 一张图理解\n\n```\n                 docker start\n  Exited ────────────────────────> Up\n     ^                              │\n     │  docker stop                 │ docker restart\n     └──────────────────────────────┤\n                                    │\n                                    └──> Up（先停再起）\n```\n\n### 三个命令的区别\n\n| 命令 | 从什么状态 | 变成什么状态 | 会不会丢数据 |\n|---|---|---|---|\n| `docker start` | Exited / Created | Up（运行中） | 不丢，容器的卷和文件系统都还在 |\n| `docker stop` | Up | Exited（退出码 0，正常停止） | 不丢，只是进程停了 |\n| `docker restart` | Up / Exited | 先 Exited 再 Up | 不丢，等于 stop + start |\n\n### 和你熟悉的命令对照\n\n| Docker | 类比 |\n|---|---|\n| `docker run` | 新买一台电脑开机（每次都新建） |\n| `docker start` | 给关机了的旧电脑按电源键 |\n| `docker stop` | 正常点“关机” |\n| `docker restart` | 点“重启” |\n| `docker kill` | 直接拔电源 |\n\n### stop 内部做了什么（重要）\n\n1. 给容器里的主进程（PID 1）发 `SIGTERM` —— 相当于礼貌地通知“请退出”\n2. 等 **10 秒**（默认，可用 `-t` 改）\n3. 10 秒还没退，补发 `SIGKILL` —— 直接强杀\n\n所以 `docker stop` 是**优雅停止**：应用有机会把缓存刷盘、连接关掉。`docker kill` 是直接 `SIGKILL`，跳过第 1、2 步。\n\n> 这就是为什么你的日志里偶尔出现退出码 **137**：137 = 128+9，表示被 SIGKILL 杀掉，说明 stop 等了 10 秒没停住，被强杀了。\n\n### restart 什么时候用\n\n- 改了容器里的配置（如 Nginx 的 conf）后让进程重新读配置\n- 容器状态异常（进程假死、连不上）\n- **注意**：restart 不会重新应用 `docker run` 时的参数；想改端口、挂载、环境变量必须删了重新 `run`\n\n### 一次操作多个容器\n\n```bash\ndocker start milvus-etcd minio-minio milvus-standalone\ndocker stop my-nginx my-redis\n```\n\n容器名之间用空格分隔，按从左到右的顺序执行。",
      "commands": [
        {
          "desc": "启动已停止的容器（你贴的第一条）",
          "cmd": "docker start <容器名>",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "start", "desc": "启动一个已存在的容器（不是新建，所以和 run 完全不同）" },
            { "token": "<容器名>", "desc": "容器名或容器 ID，用 docker ps -a 查" }
          ]
        },
        {
          "desc": "停止运行中的容器（你贴的第二条）",
          "cmd": "docker stop <容器名>",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "stop", "desc": "优雅停止：先发 SIGTERM，等 10 秒后仍未退出才发 SIGKILL" },
            { "token": "<容器名>", "desc": "容器名或容器 ID" }
          ]
        },
        {
          "desc": "重启容器（你贴的第三条）",
          "cmd": "docker restart <容器名>",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "restart", "desc": "停止后立即再启动，等于 stop + start；容器参数不变" },
            { "token": "<容器名>", "desc": "容器名或容器 ID" }
          ]
        },
        {
          "desc": "改等待时间：只等 3 秒就强杀",
          "cmd": "docker stop -t 3 <容器名>",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "stop", "desc": "停止容器" },
            { "token": "-t 3", "desc": "timeout：等待 3 秒（默认 10 秒），超时后发 SIGKILL" },
            { "token": "<容器名>", "desc": "目标容器" }
          ]
        },
        {
          "desc": "强制立即杀掉（不等优雅退出）",
          "cmd": "docker kill <容器名>",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "kill", "desc": "直接对主进程发 SIGKILL，不等待；可能丢未落盘的数据" },
            { "token": "<容器名>", "desc": "目标容器" }
          ]
        },
        {
          "desc": "启动并接入终端（前台容器用）",
          "cmd": "docker start -ai <容器名>",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "start", "desc": "启动已存在的容器" },
            { "token": "-a", "desc": "attach：把容器输出接到当前终端" },
            { "token": "-i", "desc": "interactive：保持标准输入打开，可以交互" },
            { "token": "<容器名>", "desc": "目标容器，比如之前用 run -it ubuntu bash 创建的" }
          ]
        }
      ],
      "tips": [
        "`docker start` 只对**已存在**的容器有效；容器被 `docker rm` 删了就彻底没了，只能重新 run。",
        "`restart` 不会重新加载 `docker run` 时的参数：想改端口/挂载/环境变量，必须 `docker rm` 后重新 run。",
        "停止后容器还在（`docker ps -a` 能看到），磁盘空间也被占着；确认不要了再 `docker rm`。",
        "`docker stop` 默认等 10 秒；应用启动慢、退出慢时，日志里出现 137 通常就是被超时强杀了。",
        "配了 `--restart always`（或 `unless-stopped`）的容器，Docker 重启或机器重启后会自动拉起，不需要手动 start。",
        "批量操作时容器名可以一次写多个：`docker start a b c`，按顺序启动。"
      ]
    },
    {
      "id": "docker-exec",
      "category": "docker",
      "title": "docker exec -it：进入运行中的容器",
      "summary": "和 run -it 的区别：exec 是在**已有容器**里开一个新 shell，不会新建容器；run 每次都新建。",
      "tags": ["Docker", "exec", "调试"],
      "updatedAt": "2026-11-02",
      "content": "`docker exec` 用来进入**已经在运行**的容器里操作，比如：\n- 容器在后台跑着，想看一眼里面的文件\n- 改个配置、装个调试工具\n- 直接跑一条命令拿到输出\n\n和 `docker run -it` 的核心区别：\n| 对比项 | docker run -it | docker exec -it |\n|---|---|---|\n| 容器 | 每次新建一个 | 进入**已有**的运行中容器 |\n| 退出后 | 容器可能停掉（取决于原启动命令） | 容器继续跑着，开的那个 shell 关了而已 |\n| 用途 | 一次性实验、测试镜像 | 进入生产容器排查问题 |\n\n**注意**：容器必须是 `Up` 状态才能 exec；Exited 状态不行，得先 `docker start` 拉起来。",
      "commands": [
        {
          "desc": "进入运行中的 nginx 容器",
          "cmd": "docker exec -it my-nginx bash",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "exec", "desc": "在运行中的容器里执行命令" },
            { "token": "-it", "desc": "-i 保持输入打开，-t 分配伪终端，合起来才能交互" },
            { "token": "my-nginx", "desc": "容器名或 ID" },
            { "token": "bash", "desc": "要执行的命令，这里是打开 bash 终端；如果容器里没 bash（比如 Alpine 镜像）用 sh" }
          ]
        },
        {
          "desc": "直接在容器里跑一条命令，不进入交互",
          "cmd": "docker exec my-nginx cat /etc/nginx/nginx.conf",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "exec", "desc": "在容器里执行命令" },
            { "token": "my-nginx", "desc": "目标容器" },
            { "token": "cat /etc/nginx/nginx.conf", "desc": "要执行的完整命令，直接拿输出，不进交互式 shell" }
          ]
        },
        {
          "desc": "Alpine 镜像里没有 bash，用 sh",
          "cmd": "docker exec -it my-alpine sh",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "exec", "desc": "在容器里执行命令" },
            { "token": "-it", "desc": "交互模式" },
            { "token": "my-alpine", "desc": "Alpine 基础镜像构建的容器" },
            { "token": "sh", "desc": "Alpine 里只有 sh（BusyBox 提供），没有 bash" }
          ]
        }
      ],
      "tips": [
        "进不去先确认容器在不在跑：`docker ps` 查一下，Exited 的容器 exec 会报错。",
        "Alpine 镜像（`node:18-alpine`、`nginx:alpine`）只有 sh 没有 bash，exec 时用 sh 或 ash。",
        "exec 进去改文件，容器重建后改动会丢失；持久化要靠 -v 卷挂载。",
        "想从宿主机直接复制文件进容器：`docker cp 宿主机文件 容器名:容器内路径`，不用进容器。"
      ]
    },
    {
      "id": "dockerfile-build",
      "category": "docker",
      "title": "Dockerfile 与 docker build：构建自己的镜像",
      "summary": "用一个文本文件告诉 Docker 怎么打包你的应用成镜像，一行命令 docker build 就生成可分发的镜像。",
      "tags": ["Docker", "Dockerfile", "构建"],
      "updatedAt": "2026-11-02",
      "content": "Dockerfile 是一个纯文本文件，每行一条指令，Docker 从上到下执行，每一行生成一个新的镜像层。\n\n### 最简单的 Node.js 应用 Dockerfile\n\n```dockerfile\n# 第 1 行：指定基础镜像（相当于选 OS）\nFROM node:18\n\n# 第 2 行：设置工作目录（后续所有命令的默认路径）\nWORKDIR /app\n\n# 第 3 行：把当前目录的文件复制进镜像\nCOPY . .\n\n# 第 4 行：在镜像构建时执行的命令（这里装依赖）\nRUN npm install\n\n# 第 5 行：声明容器对外暴露的端口（只是声明，不会自动映射）\nEXPOSE 3000\n\n# 第 6 行：容器启动时执行的命令\nCMD [\"npm\", \"start\"]\n```\n\n### 构建命令\n\n```bash\ndocker build -t my-app:v1 .\n```\n\n执行后 Docker 会：\n1. 下载 node:18 基础镜像（本地已有就跳过）\n2. 逐层执行每条指令，每层缓存起来，下次改了某层只重跑那层之后的\n3. 最后打上 `my-app:v1` 的标签\n\n### 构建好的镜像怎么跑\n\n```bash\ndocker run -d -p 3000:3000 my-app:v1\n```\n\n### 一个关键优化：先 COPY package.json 再 COPY 源码\n\n```dockerfile\n# 推荐写法：利用缓存\nCOPY package*.json ./\nRUN npm install\nCOPY . .\n```\n\n为什么？因为 `npm install` 慢，源码改了 package.json 没改时，这层可以从缓存拿，不用重跑 npm install。如果先 COPY 所有文件，哪怕只改了一个 .js 文件，npm install 也要重跑一遍。\n\n### .dockerignore\n\n和 .gitignore 类似，构建时告诉 Docker 哪些文件**不要**打包进上下文（减少构建时间和镜像体积）：\n\n```\nnode_modules\n.git\n.env\n*.log\n```",
      "commands": [
        {
          "desc": "用当前目录的 Dockerfile 构建镜像",
          "cmd": "docker build -t my-app:v1 .",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "build", "desc": "构建镜像" },
            { "token": "-t my-app:v1", "desc": "tag：给镜像命名并打版本标签，格式 名字:标签" },
            { "token": ".", "desc": "构建上下文路径（默认就是当前目录），Docker 会把这个目录打包发给 daemon" }
          ]
        },
        {
          "desc": "指定 Dockerfile 路径（非默认位置时）",
          "cmd": "docker build -f ./docker/Dockerfile -t my-app:v1 .",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "build", "desc": "构建镜像" },
            { "token": "-f ./docker/Dockerfile", "desc": "file：指定 Dockerfile 的路径和文件名，默认是当前目录的 Dockerfile" },
            { "token": "-t my-app:v1", "desc": "镜像名和标签" },
            { "token": ".", "desc": "构建上下文" }
          ]
        },
        {
          "desc": "查看构建出来的镜像",
          "cmd": "docker images | grep my-app",
          "parts": [
            { "token": "docker images", "desc": "列出本地所有镜像" },
            { "token": "|", "desc": "管道：把前一条命令的输出传给后一条命令处理" },
            { "token": "grep my-app", "desc": "过滤只显示名字里含 my-app 的行" }
          ]
        },
        {
          "desc": "运行刚构建的镜像",
          "cmd": "docker run -d -p 3000:3000 my-app:v1",
          "parts": [
            { "token": "docker", "desc": "Docker 命令行工具" },
            { "token": "run", "desc": "创建并启动容器" },
            { "token": "-d", "desc": "后台运行" },
            { "token": "-p 3000:3000", "desc": "端口映射：宿主机 3000 → 容器 3000" },
            { "token": "my-app:v1", "desc": "要运行的镜像名和标签" }
          ]
        }
      ],
      "tips": [
        "Dockerfile 指令顺序很重要：把**变化少、耗时久**的指令放前面（如 RUN npm install），**变化多**的放后面（如 COPY 源码），最大化利用缓存。",
        "`CMD` 可以被 `docker run` 后面追加的命令覆盖：`docker run my-app:v1 bash` 会替换掉 CMD 里的 npm start。",
        "基础镜像选 Alpine 版能大幅减小体积：`node:18-alpine` 约 170MB，`node:18` 约 900MB。",
        "构建失败先看哪条指令报错，加 `--no-cache` 强制重跑排查缓存问题。",
        "Docker Hub 网络不稳时，先 `docker images` 盘点本地已有镜像，把 FROM 固定到本地已缓存的 tag，避免外网依赖。"
      ]
    },
    {
      "id": "git-remote-push",
      "category": "linux",
      "title": "git remote add / branch -M / push -u：推到 GitHub 的三步走",
      "summary": "本地仓库首次推送到 GitHub：add 远程 → 分支改名 → push 并建立跟踪关系。",
      "tags": ["Git", "远程", "推送"],
      "updatedAt": "2026-11-02",
      "content": "新建 GitHub 空仓库后，本地已有代码，按这三条推上去：\n\n### 第 1 步：关联远程仓库\n```bash\ngit remote add origin https://github.com/xiexindong/docker-linux-pm2.git\n```\n- `origin` 是远程仓库的默认别名，以后 push/pull 直接用 `origin`\n- URL 换成你自己的仓库地址，支持 HTTPS 和 SSH 两种协议\n- **坑**：如果 origin 已存在会报 `fatal: remote origin already exists`，先用 `git remote remove origin` 删掉再加\n\n### 第 2 步：把分支改成 main\n```bash\ngit branch -M main\n```\n- `-M` 是强制重命名（等于 `-m --force`），如果 main 已存在会覆盖\n- GitHub 新仓库默认主分支是 main，但 `git init` 默认叫 master，所以要统一\n\n### 第 3 步：推送并建立跟踪\n```bash\ngit push -u origin main\n```\n- `-u`（`--set-upstream`）建立本地 main 和远程 origin/main 的跟踪关系\n- 以后就可以直接 `git push` / `git pull`，不用每次写 origin main\n\n### 完整流程（复制粘贴版）\n```bash\ngit remote add origin https://github.com/xiexindong/docker-linux-pm2.git\ngit branch -M main\ngit push -u origin main\n```",
      "commands": [
        {
          "desc": "关联远程仓库（首次）",
          "cmd": "git remote add origin https://github.com/xiexindong/docker-linux-pm2.git",
          "parts": [
            { "token": "git", "desc": "Git 版本控制工具" },
            { "token": "remote", "desc": "管理远程仓库" },
            { "token": "add", "desc": "添加一个新的远程仓库" },
            { "token": "origin", "desc": "远程仓库的别名，origin 是约定俗成的默认名" },
            { "token": "https://github.com/xiexindong/docker-linux-pm2.git", "desc": "远程仓库地址，HTTPS 协议；用 SSH 就是 git@github.com:用户名/仓库.git" }
          ]
        },
        {
          "desc": "把当前分支强制改名为 main",
          "cmd": "git branch -M main",
          "parts": [
            { "token": "git", "desc": "Git 工具" },
            { "token": "branch", "desc": "管理分支" },
            { "token": "-M", "desc": "强制重命名（-m 的 force 版本），即使目标分支已存在也覆盖" },
            { "token": "main", "desc": "新的分支名，GitHub 默认主分支叫这个" }
          ]
        },
        {
          "desc": "推送到远程并建立跟踪",
          "cmd": "git push -u origin main",
          "parts": [
            { "token": "git", "desc": "Git 工具" },
            { "token": "push", "desc": "把本地提交推送到远程仓库" },
            { "token": "-u", "desc": "--set-upstream：建立本地 main 和远程 origin/main 的跟踪关系，之后可直接 git push/pull" },
            { "token": "origin", "desc": "目标远程仓库的别名" },
            { "token": "main", "desc": "要推送的本地分支名" }
          ]
        },
        {
          "desc": "查看当前远程配置（确认加对了）",
          "cmd": "git remote -v",
          "parts": [
            { "token": "git", "desc": "Git 工具" },
            { "token": "remote", "desc": "管理远程仓库" },
            { "token": "-v", "desc": "verbose，显示每个远程对应的 fetch 和 push URL" }
          ]
        },
        {
          "desc": "origin 已存在时报错的恢复方法",
          "cmd": "git remote remove origin; git remote add origin <新地址>",
          "parts": [
            { "token": "git", "desc": "Git 工具" },
            { "token": "remote", "desc": "管理远程仓库" },
            { "token": "remove", "desc": "删除已存在的远程仓库配置" },
            { "token": "origin", "desc": "要删除的远程别名" },
            { "token": ";", "desc": "shell 命令分隔符，Windows PowerShell 也支持" },
            { "token": "<新地址>", "desc": "你想换成的新远程仓库 URL" }
          ]
        }
      ],
      "tips": [
        "`git remote add` 失败八成是 origin 已存在，先 `git remote remove origin` 再加。",
        "URL 是 HTTPS 还是 SSH：HTTPS 每次 push 要输密码或 token；SSH 配好密钥后免密。",
        "推到远程如果提示 `rejected` 说远程有你本地没有的提交，用 `git pull --rebase origin main` 先拉下来再推。",
        "以后再也不用 `-u origin main` 这堆了，直接 `git push` 就行，跟踪关系建立一次终身有效。"
      ]
    },
    {
      "id": "docker-compose",
      "category": "docker",
      "title": "docker-compose：多容器一键编排",
      "summary": "一个项目往往要前端+后端+数据库多个容器，docker-compose.yml 里写清楚依赖关系，一条命令 up -d 全部启动。",
      "tags": ["Docker", "compose", "编排"],
      "updatedAt": "2026-11-02",
      "content": "docker-compose（现在官方叫 Docker Compose v2，作为 docker 的子命令 `docker compose` 使用）是实际工作中最常用的工具——因为几乎所有项目都不止一个容器。\n\n### 最简 docker-compose.yml（前端 + MySQL）\n\n```yaml\nversion: '3'\nservices:\n  web:\n    image: nginx\n    ports:\n      - \"80:80\"\n\n  db:\n    image: mysql:8.0\n    environment:\n      MYSQL_ROOT_PASSWORD: 123456\n      MYSQL_DATABASE: bike77\n    ports:\n      - \"3306:3306\"\n    volumes:\n      - mysql_data:/var/lib/mysql\n\nvolumes:\n  mysql_data:\n```\n\n### 核心概念\n\n- **services**：每个 service 对应一个容器，`web` 和 `db` 就是两个服务\n- **image**：用现成镜像；也可以用 `build: .` 指向本地 Dockerfile 自己构建\n- **ports**：端口映射，和 `docker run -p` 一样\n- **environment**：环境变量，MySQL 用它设置 root 密码和初始数据库\n- **volumes**：命名卷，db 容器的数据存在这里，删了容器数据还在\n\n### 常用命令\n\n```bash\ndocker-compose up -d      # 后台启动所有服务（最常用）\ndocker-compose down       # 停止并删除所有服务（保留卷）\ndocker-compose logs -f    # 实时跟踪所有服务的日志\ndocker-compose ps         # 查看 compose 管理的容器状态\ndocker-compose restart db # 只重启 db 服务\n```\n\n### 容器间互相访问\n\n在 compose 里，web 容器想连 db，直接写 `db:3306` 就行——compose 自动建了内部网络，服务名就是主机名，不需要暴露端口。只有**外部**访问才需要 ports。",
      "commands": [
        {
          "desc": "后台启动所有服务（最常用）",
          "cmd": "docker-compose up -d",
          "parts": [
            { "token": "docker-compose", "desc": "多容器编排工具，默认读当前目录的 docker-compose.yml" },
            { "token": "up", "desc": "创建并启动 compose 文件里定义的所有服务" },
            { "token": "-d", "desc": "detached：后台运行，不占终端" }
          ]
        },
        {
          "desc": "停止并清理所有服务（保留卷）",
          "cmd": "docker-compose down",
          "parts": [
            { "token": "docker-compose", "desc": "多容器编排工具" },
            { "token": "down", "desc": "停止并删除 compose 管理的容器和网络（不删卷和镜像）" }
          ]
        },
        {
          "desc": "实时跟踪所有服务的日志",
          "cmd": "docker-compose logs -f",
          "parts": [
            { "token": "docker-compose", "desc": "多容器编排工具" },
            { "token": "logs", "desc": "输出所有服务容器的日志" },
            { "token": "-f", "desc": "follow：持续跟踪，新日志追加显示" }
          ]
        },
        {
          "desc": "只跟踪某个服务的日志",
          "cmd": "docker-compose logs -f db",
          "parts": [
            { "token": "docker-compose", "desc": "多容器编排工具" },
            { "token": "logs", "desc": "输出服务容器的日志" },
            { "token": "-f", "desc": "持续跟踪" },
            { "token": "db", "desc": "服务名，只看这个服务的日志" }
          ]
        },
        {
          "desc": "查看 compose 管理的容器状态",
          "cmd": "docker-compose ps",
          "parts": [
            { "token": "docker-compose", "desc": "多容器编排工具" },
            { "token": "ps", "desc": "列出 compose 管理的容器（比 docker ps 清爽，只看 compose 里的）" }
          ]
        },
        {
          "desc": "只重启某个服务",
          "cmd": "docker-compose restart db",
          "parts": [
            { "token": "docker-compose", "desc": "多容器编排工具" },
            { "token": "restart", "desc": "重启服务" },
            { "token": "db", "desc": "服务名，指定重启哪一个；不写就是全部重启" }
          ]
        }
      ],
      "tips": [
        "容器间通信**直接用服务名当主机名**：web 连 db 写 `db:3306` 就行，不用端口映射。",
        "`docker-compose down` 默认保留卷；想连数据一起删加 `-v`，但这会清掉数据库，别手滑。",
        "如果 Docker 版本较新（20.10+），可以用 `docker compose`（空格）而不是 `docker-compose`（连字符），功能一样。",
        "用 `build: .` 替代 `image:` 时，compose 会先构建再启动；改了 Dockerfile 后要重建用 `docker-compose up -d --build`。",
        "环境变量除了写在 yaml 里，也可以放在 `.env` 文件，compose 会自动读，方便本地开发时改密码不提交到 git。"
      ]
    },
    {
      "id": "nginx-minimal-config",
      "category": "nginx",
      "title": "最小可用 Nginx 配置：一行一行讲明白",
      "summary": "一个 server 块同时做两件事：普通页面自己发文件，/api/ 开头的请求转给 Node 后端。每个参数都配白话解释和设置理由。",
      "tags": ["Nginx", "基础配置", "server", "proxy_pass"],
      "updatedAt": "2026-11-03",
      "content": "Nginx 最基础的用法只做一件事：**把浏览器的请求接住，再决定是自己发文件，还是转给后端程序。**\n\n## 一、最小可用配置（复制就能跑）\n\n```nginx\nserver {\n    listen 80;\n    server_name example.com;\n\n    location / {\n        root /usr/local/apps/www;\n        index index.html;\n        try_files $uri $uri/ /index.html;\n    }\n\n    location /api/ {\n        proxy_pass http://127.0.0.1:3000/;\n        proxy_set_header Host $http_host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    }\n}\n```\n\n这段配置干两件事：\n- 访问 `http://example.com/`、`/about` → 从本地磁盘读文件\n- 访问 `http://example.com/api/user` → 转给本机 3000 端口上的 Node\n\n## 二、逐行解释（重点看「为什么」）\n\n| 指令 | 白话解释 | 为什么这么设 / 不设会怎样 |\n|---|---|---|\n| `server { }` | 一个「虚拟主机」，相当于一栋楼的一个门面 | 一个 Nginx 可以同时托管多个网站，每个域名一个 server 块 |\n| `listen 80` | 守着 80 端口等请求 | 80 是 HTTP 的默认端口，浏览器输 `http://` 自动连这里。不写就没有入口，Nginx 启动报错 |\n| `server_name example.com` | 认门牌号：只有访问这个域名才走这个块 | 同一台服务器可能挂多个站，靠请求头里的 Host 区分。不写的话它会变成「默认块」，任何域名都落到它身上 |\n| `location / { }` | 路径匹配规则：`/` 是兜底，所有请求都会先命中它 | 写一个 `/` 就把「除特殊规则外的所有请求」都交给它处理，保证不会有请求没人管 |\n| `root /usr/local/apps/www` | 文件从哪个目录取 | 访问 `/logo.png` 实际读 `/usr/local/apps/www/logo.png`。**必须写绝对路径**：相对路径是相对 Nginx 安装目录，很容易找错文件 |\n| `index index.html` | 访问「目录本身」时默认给哪个文件 | 访问 `/` 时，Nginx 不知道给什么，就按这里的顺序找 index.html。不写会列出目录或 403 |\n| `try_files $uri $uri/ /index.html` | 依次尝试：先找同名文件，再找同名目录，都没有就返回 index.html | Vue/React 的 `/about`、`/user/1` 这些路由在磁盘上没有对应文件，必须兜底到 index.html 交给前端 JS 渲染，否则直接 404 |\n| `location /api/ { }` | 只拦截 `/api/` 开头的请求 | 前缀匹配且比 `/` 更长，Nginx 选最长匹配，所以接口请求不会跑去读静态文件 |\n| `proxy_pass http://127.0.0.1:3000/` | 把请求转给本机 3000 端口的程序 | 用 `127.0.0.1` 而不是 `localhost`：`localhost` 可能被解析成 IPv6 的 `::1`，后端只监听 IPv4 就会 502 |\n| （`proxy_pass` 末尾的 `/`） | 决定「要不要剥掉 `/api` 前缀」 | 带 `/`：`/api/user` 转过去变成 `/user`；不带 `/`：原样转 `/api/user`。后端路由一般不写 `/api`，所以要带 |\n| `proxy_set_header Host $http_host` | 把浏览器访问的原始域名带给后端 | 不传的话后端收到的是 `Host: 127.0.0.1:3000`，生成绝对链接、做重定向时会指到错误地址 |\n| `proxy_set_header X-Real-IP $remote_addr` | 把真实客户端 IP 带给后端 | 请求经过 Nginx 后，后端看到的来源 IP 全是 `127.0.0.1`，日志、限流、风控全部失效 |\n| `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for` | 传一串 IP 链（经过的每一层代理） | 有 CDN、负载均衡时用它才拿得到最外层真实 IP；`X-Real-IP` 只保留最后一个 |\n\n## 三、一个请求进来后，Nginx 心里怎么想\n\n```\n浏览器访问 http://example.com/about\n        │\n        ▼\n① 看端口：80 → 找到 listen 80 的 server\n        │\n        ▼\n② 看 Host：example.com → 匹配 server_name\n        │\n        ▼\n③ 看路径：/about → 匹配 location（/ 比 /api/ 更匹配）\n        │\n        ▼\n④ root + 路径：找 /usr/local/apps/www/about\n        │\n        ├─ 有 → 直接把文件发回去\n        └─ 没有 → try_files 兜底给 /index.html（200）\n\n浏览器访问 http://example.com/api/user\n        │\n        ▼\n③ 路径 /api/user → 命中 location /api/\n        │\n        ▼\n④ 剥掉 /api → 转给 127.0.0.1:3000/user\n        │\n        ▼\n⑤ Node 处理后把响应原路返回给浏览器\n```\n\n## 四、改完怎么让它生效\n\n```bash\nnginx -t                # 先查语法\nnginx -s reload         # 平滑重载，不断连接（推荐 nginx -t && nginx -s reload）\n```\n\n验证不走 DNS、直接测本机：\n\n```bash\ncurl -I -H \"Host: example.com\" http://127.0.0.1/\ncurl -i -H \"Host: example.com\" http://127.0.0.1/api/health\n```\n\n## 五、新手最容易踩的 6 个坑\n\n1. **`root` 写成相对路径** → 文件永远找不到，Nginx 返回 404，但你会以为是路径写错了\n2. **`proxy_pass` 漏了或多了尾斜杠** → 后端所有接口 404，且日志里看不出原因\n3. **`try_files` 顺序写反**（先写 `/index.html`）→ 所有静态资源都变成 HTML\n4. **只写了 `location /`，`/api/` 落在它里面** → 接口请求拿到 index.html，前端报 `Unexpected token '<'`\n5. **改了 `conf.d/xxx.conf` 却没被主配置 `include`** → reload 一百次也不生效，先用 `nginx -T` 确认\n6. **`nginx -t` 通过但业务 502** → 语法对不代表后端活着，要 `ss -tlnp | grep ':3000'` 确认端口在监听",
      "commands": [
        {
          "desc": "改配置后先测语法（不生效，安全）",
          "cmd": "nginx -t",
          "parts": [
            { "token": "nginx", "desc": "Nginx 可执行程序，也可用绝对路径 /usr/local/nginx/sbin/nginx" },
            { "token": "-t", "desc": "test：只检查配置文件语法，不加载，不打扰线上" }
          ]
        },
        {
          "desc": "语法通过后平滑重载",
          "cmd": "nginx -t && nginx -s reload",
          "parts": [
            { "token": "nginx", "desc": "Nginx 可执行程序" },
            { "token": "-t", "desc": "检查语法" },
            { "token": "&&", "desc": "逻辑与：前一条成功才执行后一条，配置写错就不会去 reload" },
            { "token": "nginx", "desc": "Nginx 可执行程序" },
            { "token": "-s", "desc": "signal，给 master 进程发信号" },
            { "token": "reload", "desc": "平滑重载：启新 worker，旧 worker 处理完手上的请求再退" }
          ]
        },
        {
          "desc": "带域名头访问本机，验证静态站（跳过 DNS）",
          "cmd": "curl -I -H \"Host: example.com\" http://127.0.0.1/",
          "parts": [
            { "token": "curl", "desc": "命令行发 HTTP 请求的工具" },
            { "token": "-I", "desc": "只取响应头（HEAD 请求），不下载正文，看状态码最快" },
            { "token": "-H \"Host: example.com\"", "desc": "手动指定 Host 头，模拟用域名访问，绕过 DNS 和 CDN" },
            { "token": "http://127.0.0.1/", "desc": "直接打本机 80 端口" }
          ]
        },
        {
          "desc": "验证 /api/ 转发是否通",
          "cmd": "curl -i -H \"Host: example.com\" http://127.0.0.1/api/health",
          "parts": [
            { "token": "curl", "desc": "发 HTTP 请求" },
            { "token": "-i", "desc": "include：输出里带上响应头，能看到状态码和 Content-Type" },
            { "token": "-H \"Host: example.com\"", "desc": "模拟域名访问" },
            { "token": "http://127.0.0.1/api/health", "desc": "请求会被 location /api/ 拦下并转给后端" }
          ]
        },
        {
          "desc": "确认后端端口真的在监听（502 必查）",
          "cmd": "ss -tlnp | grep ':3000'",
          "parts": [
            { "token": "ss", "desc": "查看 socket 状态的工具，netstat 的现代替代品" },
            { "token": "-tlnp", "desc": "t=TCP，l=只听 listen 状态，n=不解析域名，p=显示进程名" },
            { "token": "|", "desc": "管道，把结果交给 grep 过滤" },
            { "token": "grep ':3000'", "desc": "只留下 3000 端口那行，确认 Node 真的在跑" }
          ]
        },
        {
          "desc": "看报错原因（配置/后端问题都会写在这）",
          "cmd": "tail -f /usr/local/nginx/logs/error.log",
          "parts": [
            { "token": "tail", "desc": "查看文件末尾内容" },
            { "token": "-f", "desc": "follow：持续跟踪新写入的行，Ctrl+C 退出" },
            { "token": "/usr/local/nginx/logs/error.log", "desc": "错误日志路径，systemd 安装一般是 /var/log/nginx/error.log" }
          ]
        }
      ],
      "tips": [
        "`root` 一定写绝对路径：相对路径是相对 Nginx 安装目录（如 /usr/local/nginx），不是你以为的当前目录。",
        "`proxy_pass` 末尾的斜杠决定 `/api` 前缀保不保留，这是 Nginx 新手最常见的 404 来源。",
        "`try_files` 的兜底目标必须放最后，写成 `/index.html` 意味着「找不到文件就返回首页」，不是「优先首页」。",
        "`nginx -t` 通过只说明语法正确，业务报 502 还要查后端进程和端口，两件事完全不同。",
        "一台机器多个域名时，每个 server 块都要有 `listen` + `server_name`；只改域名不改 listen 会互相抢端口。",
        "改完配置先 `nginx -t && nginx -s reload`，不要直接 restart，reload 不会断掉正在进行的请求。"
      ]
    },
    {
      "id": "nginx-location-match",
      "category": "nginx",
      "title": "location 匹配规则与 proxy_pass 尾斜杠",
      "summary": "Nginx 选哪个 location、路径前缀保不保留，全靠两条规则；搞懂这两条，90% 的 404 和 502 都能自己定位。",
      "tags": ["Nginx", "location", "proxy_pass", "路径匹配"],
      "updatedAt": "2026-11-03",
      "content": "## 一、location 的 5 种写法\n\n| 写法 | 名称 | 匹配方式 | 例子 |\n|---|---|---|---|\n| `location = /favicon.ico` | 精确匹配 | 路径必须**完全一致** | 只匹配 `/favicon.ico`，`/favicon.ico/` 不算 |\n| `location ^~ /static/` | 前缀优先 | 匹配前缀后**停止查找正则** | `/static/a.css` 命中，且不再试正则 |\n| `location ~ \\.php$` | 正则（区分大小写） | 按正则表达式匹配 | 只匹配小写 `.php` 结尾 |\n| `location ~* \\.(jpg|png)$` | 正则（忽略大小写） | 同上，不区分大小写 | `.JPG`、`.Png` 都能命中 |\n| `location /api/` | 普通前缀 | 最长前缀优先 | `/api/user` 命中，`/api` 本身不命中（少了斜杠） |\n\n## 二、优先级：从高到低\n\n```\n1. location =      精确匹配        （最高，命中即停）\n2. location ^~     前缀 + 停正则\n3. location ~/~*   正则（按配置里出现的顺序，先匹配先用）\n4. location /xxx   普通前缀（选最长的一个）\n```\n\n记住一句话：**等号最优先，正则比普通前缀优先，普通前缀里长的优先。**\n\n### 一个真实易错点\n\n```nginx\nlocation /api/ { }      # 只匹配 /api/xxx\nlocation /api  { }      # 匹配 /api、/apixxx（注意：/apixxx 也会命中！）\n```\n\n`/api` 没有尾斜杠时是纯字符串前缀匹配，`/apixxx` 也会命中；想只限制目录，写 `/api/`。\n\n## 三、proxy_pass 尾斜杠：4 种组合对照\n\n| location | proxy_pass | 请求 `/api/user` 实际转发到 | 说明 |\n|---|---|---|---|\n| `location /api/` | `http://127.0.0.1:3000` | `http://127.0.0.1:3000/api/user` | 不带斜杠：**原样转发**，前缀保留 |\n| `location /api/` | `http://127.0.0.1:3000/` | `http://127.0.0.1:3000/user` | 带斜杠：**替换掉 location 的前缀** |\n| `location /api` | `http://127.0.0.1:3000/v1` | `http://127.0.0.1:3000/v1/user` | 路径拼接：`/v1` 替换 `/api` |\n| `location /` | `http://127.0.0.1:3000` | `http://127.0.0.1:3000/api/user` | 根路径不涉及替换 |\n\n判断口诀：**proxy_pass 只要带了 URI（哪怕只是一个 `/`），就用它替换 location 匹配到的那一段；不带 URI 就原样拼。**\n\n## 四、转发时必须带的请求头\n\n| 头 | 作用 | 不带会怎样 |\n|---|---|---|\n| `Host $http_host` | 告诉后端用户实际访问的域名 | 后端生成的重定向、绝对链接指向 `127.0.0.1:3000` |\n| `X-Real-IP $remote_addr` | 真实客户端 IP | 后端日志里全是 Nginx 的 IP |\n| `X-Forwarded-For $proxy_add_x_forwarded_for` | 完整 IP 链 | 多级代理时拿不到最初来源 |\n| `X-Forwarded-Proto $scheme` | 原始协议是 http 还是 https | 后端判断 `req.protocol` 会一直是 http，导致重定向死循环 |\n\n## 五、出了 404 / 502 怎么按顺序查\n\n```\n404 ──> 先看 location 有没有命中：nginx -T | grep -n location\n    ──> 再看 proxy_pass 前缀对不对：后端路由是 /user 还是 /api/user\n\n502 ──> 后端没起来：ss -tlnp | grep ':3000'\n    ──> 端口不对：proxy_pass 里的端口和实际不一致\n    ──> localhost 解析成 IPv6：改成 127.0.0.1 再试\n    ──> 后端崩了：看 error.log 里的 connect() failed\n\n504 ──> 后端处理太慢：加 proxy_read_timeout，或查后端慢查询\n```",
      "commands": [
        {
          "desc": "列出所有 location，确认到底命中哪条规则",
          "cmd": "nginx -T | grep -n 'location'",
          "parts": [
            { "token": "nginx", "desc": "Nginx 可执行程序" },
            { "token": "-T", "desc": "大写 T：输出最终生效的完整配置（include 全展开）" },
            { "token": "|", "desc": "管道，把输出交给 grep" },
            { "token": "grep", "desc": "按关键词过滤" },
            { "token": "-n", "desc": "显示行号，方便对照上下文" },
            { "token": "'location'", "desc": "要查找的指令名，加单引号避免 shell 误解" }
          ]
        },
        {
          "desc": "验证某个路径被转到了哪里",
          "cmd": "curl -i http://127.0.0.1/api/user",
          "parts": [
            { "token": "curl", "desc": "发 HTTP 请求" },
            { "token": "-i", "desc": "带上响应头，能看到状态码和 Content-Type" },
            { "token": "http://127.0.0.1/api/user", "desc": "不带 Host 头就直接打本机，适合本地快速验证" }
          ]
        },
        {
          "desc": "分别测后端端口和转发结果",
          "cmd": "curl -i http://127.0.0.1:3000/user",
          "parts": [
            { "token": "curl", "desc": "发 HTTP 请求" },
            { "token": "-i", "desc": "输出响应头" },
            { "token": "http://127.0.0.1:3000/user", "desc": "绕过 Nginx 直接打后端。这一步通了、走 Nginx 不通，问题就一定是转发规则" }
          ]
        }
      ],
      "tips": [
        "`location /api` 会命中 `/apixxx`，只有 `location /api/` 才是「以 /api/ 开头」。这是接口路由被静态文件截胡的常见原因。",
        "正则 location 按配置里书写顺序生效，前缀 location 按「最长」生效，两者规则不同，别混。",
        "`proxy_pass` 后面带 URI（含末尾 `/`）会替换 location 匹配段；不带 URI 才原样保留。判断 404 先看这里。",
        "后端日志里 IP 全是 127.0.0.1，说明漏了 `X-Real-IP` / `X-Forwarded-For`，不是后端日志写错了。",
        "HTTPS 由 Nginx 终止时，后端 `req.protocol` 永远是 http；要传 `X-Forwarded-Proto`，否则可能出现无限重定向。",
        "排查顺序永远是：先直接 curl 后端 → 再 curl 经过 Nginx 的地址 → 最后看 error.log，三段定位能省很多瞎猜。"
      ]
    },
    {
      "id": "mysql-forensics-basic",
      "category": "mysql",
      "title": "MySQL 数据核对：用 SQL 反推「这张表经历过什么」",
      "summary": "数据看起来少了，怎么从建表时间、自增值、现存数据、关联残留、binlog 五层逐步反推，每条 SQL 都讲清在问数据库什么。",
      "tags": ["MySQL", "information_schema", "binlog", "自增", "排查"],
      "updatedAt": "2026-11-07",
      "content": "数据「看起来少了」的时候，先别急着下结论。用几条 `information_schema` 和 binlog 查询，可以反推出**这张表经历过什么**。\n\n下面这套是「建表 → 自增 → 现存数据 → 关联残留 → 日志」五层逐步收窄的排查路径。\n\n## 排查思路：五个问题\n\n| 顺序 | 想知道什么 | 查哪里 |\n|---|---|---|\n| ① | 整库是什么时候建的？ | `information_schema.tables` 的 `create_time` |\n| ② | 表里最多来过多少条？ | `AUTO_INCREMENT` 和实际 id 的差 |\n| ③ | 现存数据是什么时候的？ | 表里的 `createdAt` / `updatedAt` |\n| ④ | 删掉的 id 有没有被别处引用？ | 关联表按 id 分组统计 |\n| ⑤ | 有没有日志能还原？ | `general_log` / `binlog` |\n\n## ① 看表是什么时候建的\n\n```sql\nSELECT table_name, table_rows, create_time\nFROM information_schema.tables\nWHERE table_schema = 'bike77'\nORDER BY table_name;\n```\n\n如果整库 17 张表的 `create_time` 全是同一个时间点（比如 `2026-11-04 11:07:41`），说明那天整库被导入或重建过——不是你「用着用着数据消失了」，而是**这份数据本来就是从那天的备份恢复出来的**。\n\n`information_schema` 是 MySQL 自带的「元数据字典」，记录所有库、表、列、索引的信息。它不存业务数据，只存「结构说明」。\n\n## ② 看自增值（判断是否被删过）\n\n```sql\nSELECT AUTO_INCREMENT\nFROM information_schema.tables\nWHERE table_schema = 'bike77' AND table_name = 'product_tag';\n```\n\n这是整个排查里最关键的一步。**自增值只会涨，不会因为删除而回退。**\n\n| 现象 | 说明 |\n|---|---|\n| `AUTO_INCREMENT = 8`，表里 id 是 1~7 | 正常，没删过 |\n| `AUTO_INCREMENT = 18`，表里只剩 id 1~7 | **8~17 这 10 行确实存在过，后来被物理删掉了** |\n\n`DELETE` 只删行，不动计数器；只有 `TRUNCATE` 才会把自增重置回 1。所以「自增比现有最大 id 大很多」就是删过数据的硬证据。\n\n## ③ 看现存数据的时间\n\n```sql\nSELECT id, name, tag_group, createdAt, updatedAt, is_delete\nFROM product_tag\nORDER BY id;\n```\n\n这一步回答「现在这些数据是哪来的」：\n\n- `createdAt` 是 2024 年 → 数据来自更早的备份，不是最近新建的\n- `is_delete` 全等于 2 → 走的是**物理删除**，不是软删（软删一般 `is_delete` 会变 1）\n\n这里要分清两种情况：\n\n| 删除方式 | 表现 |\n|---|---|\n| 软删（逻辑删） | 行还在，`is_delete` / `deleted_at` 字段变了 |\n| 物理删（`DELETE`） | 行没了，只剩自增值留下痕迹 |\n\n## ④ 看有没有残留关联\n\n```sql\nSELECT product_tag_id, COUNT(*)\nFROM product_product_tag\nWHERE product_tag_id BETWEEN 8 AND 17\nGROUP BY product_tag_id;\n```\n\n要问的是：**那些被删掉的 id，在别的表里还有没有引用？**\n\n- 查出空结果 → 老数据没被引用，这些 id 后面被新数据复用也不会串数据，安全\n- 查出有行 → 说明存在「孤儿关联」或历史脏数据，新数据复用 id 后会指到别人的记录上\n\n`GROUP BY product_tag_id` 是为了按 id 分别计数，不加的话只会得到一个总数。\n\n## ⑤ 看有没有日志可查\n\n先确认日志开没开：\n\n```sql\nSHOW VARIABLES LIKE 'general_log';   -- OFF：没记录所有执行过的 SQL\nSHOW VARIABLES LIKE 'log_bin';       -- ON：开了二进制日志\nSHOW VARIABLES LIKE 'binlog_format'; -- ROW：只记数据变化，不记 SQL 原文\n```\n\n三个开关的含义：\n\n| 变量 | 作用 | 对排查的影响 |\n|---|---|---|\n| `general_log` | 记录**所有**执行过的 SQL 原文 | 开了就能直接看到谁执行了 DELETE；性能损耗大，生产基本关 |\n| `log_bin` | 记录所有数据变更（二进制） | 开了才有得查，是恢复数据的唯一依据 |\n| `binlog_format` | binlog 的记录格式 | `ROW` 只记「哪行变成了什么」，不记 SQL；`STATEMENT` 才记 SQL 原文 |\n\n再看还剩哪些日志文件：\n\n```sql\nSHOW BINARY LOGS;\n```\n\n如果只剩最近 2 个文件，说明更早的已经被自动清理（`expire_logs_days` / `binlog_expire_logs_seconds` 控制的保留期，默认 7~30 天）。**日志过期就找不回来了**，这也是为什么数据出问题要马上查。\n\n最后看具体事件：\n\n```sql\nSHOW BINLOG EVENTS IN 'mysql-bin.002133';\n```\n\n注意：**`ROW` 格式下 `Info` 列只给表名**（如 `bike77.product_tag`），看不到具体删了哪几行。要看明细得用 `mysqlbinlog` 工具导出内容，或者先确认 `binlog_format` 是不是 `ROW`。\n\n## 我是怎么跑这些 SQL 的\n\n服务器/本机没装 `mysql` 命令行客户端时，可以用 Node 临时连库：\n\n```js\nconst mysql = require('mysql2/promise');\n\n(async () => {\n  const conn = await mysql.createConnection({\n    host: '127.0.0.1',\n    user: 'root',\n    password: '你的密码',\n    database: 'bike77'\n  });\n  const [rows] = await conn.execute('SELECT id, name FROM product_tag');\n  console.table(rows);\n  await conn.end();\n})();\n```\n\n最省事的还是用图形化客户端（Navicat / DataGrip / DBeaver / 阿里云 DMS），上面的 SQL 直接粘贴执行，结果表格看得更清楚。\n\n## 一句话总结\n\n> **自增值是删除的唯一痕迹。** 表里少了什么看不出来，但 `AUTO_INCREMENT` 会诚实地告诉你「这里曾经有多少行」。",
      "commands": [
        {
          "desc": "① 列出整库所有表 + 行数估算 + 建表时间",
          "cmd": "SELECT table_name, table_rows, create_time FROM information_schema.tables WHERE table_schema = 'bike77' ORDER BY table_name;",
          "parts": [
            { "token": "SELECT", "desc": "查询关键字，指定要取哪几列" },
            { "token": "table_name, table_rows, create_time", "desc": "表名、行数估算值、建表时间（table_rows 是估算，InnoDB 不精确，要准确条数得 COUNT(*)）" },
            { "token": "FROM information_schema.tables", "desc": "MySQL 自带的元数据字典，存所有库表的结构和统计信息，不是业务表" },
            { "token": "WHERE table_schema = 'bike77'", "desc": "只筛选 bike77 这个库；写错库名会返回空结果，别以为库不存在" },
            { "token": "ORDER BY table_name", "desc": "按表名字母序排列，方便对照" }
          ]
        },
        {
          "desc": "② 查自增值，判断有没有被删过数据",
          "cmd": "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_schema = 'bike77' AND table_name = 'product_tag';",
          "parts": [
            { "token": "SELECT AUTO_INCREMENT", "desc": "下一个要分配的 id；它比现有最大 id 大很多，说明中间的行被删过" },
            { "token": "FROM information_schema.tables", "desc": "元数据字典里的表统计信息" },
            { "token": "WHERE table_schema = 'bike77'", "desc": "限定库名" },
            { "token": "AND table_name = 'product_tag'", "desc": "再限定到具体表，两个条件同时满足" }
          ]
        },
        {
          "desc": "③ 看现存数据的创建/更新时间与软删标记",
          "cmd": "SELECT id, name, tag_group, createdAt, updatedAt, is_delete FROM product_tag ORDER BY id;",
          "parts": [
            { "token": "SELECT id, name, ...", "desc": "只取关心的列，避免大表 SELECT * 拖慢" },
            { "token": "createdAt, updatedAt", "desc": "数据什么时候建的、最后一次改的；能看出数据来自哪份备份" },
            { "token": "is_delete", "desc": "软删标记；全为 2 说明没走软删，删除是真删行" },
            { "token": "FROM product_tag", "desc": "目标业务表" },
            { "token": "ORDER BY id", "desc": "按 id 排序，一眼看出 id 是否连续、缺了哪几段" }
          ]
        },
        {
          "desc": "④ 查被删掉的 id 在关联表里还有没有残留引用",
          "cmd": "SELECT product_tag_id, COUNT(*) FROM product_product_tag WHERE product_tag_id BETWEEN 8 AND 17 GROUP BY product_tag_id;",
          "parts": [
            { "token": "SELECT product_tag_id, COUNT(*)", "desc": "按标签 id 统计出现次数" },
            { "token": "FROM product_product_tag", "desc": "多对多关联表（商品-标签）" },
            { "token": "WHERE product_tag_id BETWEEN 8 AND 17", "desc": "只查那些「已经不存在」的 id 区间" },
            { "token": "GROUP BY product_tag_id", "desc": "按 id 分组，每个 id 一行计数；不加就只有一个总数" }
          ]
        },
        {
          "desc": "⑤ 确认三种日志开关的状态",
          "cmd": "SHOW VARIABLES LIKE 'general_log';",
          "parts": [
            { "token": "SHOW VARIABLES", "desc": "查看 MySQL 运行时变量（配置）" },
            { "token": "LIKE 'general_log'", "desc": "按名字模糊匹配；换成 log_bin、binlog_format 就能查另外两个开关" },
            { "token": "general_log=OFF", "desc": "关闭状态说明没记录执行过的 SQL 原文，删数据的语句已经无从查起" }
          ]
        },
        {
          "desc": "⑤ 看 binlog 格式：决定能不能看到 SQL 原文",
          "cmd": "SHOW VARIABLES LIKE 'binlog_format';",
          "parts": [
            { "token": "SHOW VARIABLES", "desc": "查看运行时配置" },
            { "token": "LIKE 'binlog_format'", "desc": "二进制日志的记录格式，常见值 ROW / STATEMENT / MIXED" },
            { "token": "ROW", "desc": "只记录「哪行数据变了」，不记 SQL，所以看不到谁执行的、执行的什么语句" }
          ]
        },
        {
          "desc": "⑤ 看还剩哪些 binlog 文件（判断能往前追溯多久）",
          "cmd": "SHOW BINARY LOGS;",
          "parts": [
            { "token": "SHOW", "desc": "查看类语句" },
            { "token": "BINARY LOGS", "desc": "列出所有二进制日志文件及大小；只剩最近几个说明更早的被自动清理了" }
          ]
        },
        {
          "desc": "⑤ 看某个 binlog 里的事件（ROW 格式只能看到表名）",
          "cmd": "SHOW BINLOG EVENTS IN 'mysql-bin.002133';",
          "parts": [
            { "token": "SHOW BINLOG EVENTS", "desc": "按顺序列出该文件里的事件：写入、更新、删除等" },
            { "token": "IN 'mysql-bin.002133'", "desc": "指定要看的日志文件，文件名来自 SHOW BINARY LOGS" },
            { "token": "Info 列", "desc": "ROW 格式下只有表名（如 bike77.product_tag），想要明细得用 mysqlbinlog 导出" }
          ]
        },
        {
          "desc": "没有 mysql 客户端时，用 Node 临时连库跑 SQL",
          "cmd": "node -e \"const m=require('mysql2/promise');m.createConnection({host:'127.0.0.1',user:'root',password:'***',database:'bike77'}).then(async c=>{console.table((await c.execute('SELECT id,name FROM product_tag'))[0]);await c.end();})\"",
          "parts": [
            { "token": "node", "desc": "Node.js 运行时，需先 npm i mysql2" },
            { "token": "-e", "desc": "直接执行后面这段代码，不用建文件" },
            { "token": "mysql2/promise", "desc": "MySQL 驱动，promise 版支持 await" },
            { "token": "createConnection({...})", "desc": "连接参数：host / user / password / database" },
            { "token": "console.table(...)", "desc": "把结果按表格打印，比 console.log 好读" },
            { "token": "c.end()", "desc": "关闭连接，不关进程会一直挂着" }
          ]
        }
      ],
      "tips": [
        "`table_rows` 是 InnoDB 的估算值，误差可能很大；要准确条数必须 `COUNT(*)`。",
        "`AUTO_INCREMENT` 只能证明「曾经有过这么多行」，不能证明「谁在什么时候删的」，别单独当结论。",
        "`TRUNCATE TABLE` 会把自增值重置回 1，所以数据被清空过反而看不出来——这是自增值判断的盲区。",
        "`binlog_format = ROW` 时 binlog 里没有 SQL 原文，只有行级变化；想还原语句要用 mysqlbinlog 解析。",
        "binlog 有保留期（`expire_logs_days` / `binlog_expire_logs_seconds`），过期自动删；数据一出问题要立刻查，隔几天就没了。",
        "`general_log` 默认 OFF，开销大，生产不会常开；没有它就只能靠 binlog，而 binlog 又要权限（SUPER / REPLICATION SLAVE）。",
        "查 binlog 用 `SHOW BINLOG EVENTS` 只适合小文件，大文件会刷屏，用 `mysqlbinlog --start-datetime` 过滤更稳。",
        "软删和物理删要分清：软删看字段（is_delete / deleted_at），物理删只能看自增值和 binlog。",
        "图形化客户端（Navicat / DataGrip / DBeaver / DMS）可以直接粘这些 SQL，不用装命令行客户端。"
      ]
    }
  ]
};
