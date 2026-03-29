# 6erplugin CLI

6er Agent Skills Hub 命令行工具 - 在终端中搜索 AI 技能

## 功能

| 命令 | 说明 |
|------|------|
| `search` | 搜索 AI 技能 |
| `view` | 查看技能详情 |
| `install` | 安装技能（引导） |
| `list` | 查看已安装列表 |
| `help` | 显示帮助 |

## 安装

### 方式一：npx 运行（推荐，无需安装）

```bash
# 直接运行，每次自动下载最新版本
npx scar119/6erplugin search "小红书"
```

### 方式二：克隆到本地（长期使用）

```bash
# 1. 克隆仓库
git clone https://github.com/scar119/6erplugin.git ~/.6erplugin

# 2. 添加别名
echo 'alias 6erplugin="node ~/.6erplugin/bin/cli.js"' >> ~/.zshrc
source ~/.zshrc
```

## 使用

```bash
# 搜索技能（默认显示10条）
6erplugin search "小红书"

# 指定返回数量
6erplugin search "小红书" -n 5

# 分页查询
6erplugin search "内容创作" --page 2

# 查看技能详情
6erplugin view skill-name

# 安装技能（引导到网页）
6erplugin install owner/repo

# 查看帮助
6erplugin help
```

## 示例

```bash
# 搜索内容创作相关技能
6erplugin search "内容创作"

# 搜索小红书相关技能
6erplugin search "小红书" -n 10

# 搜索公众号相关技能
6erplugin search "公众号"
```

## 卸载

### 方式一：删除别名（如使用方式二安装）

```bash
# 1. 编辑 ~/.zshrc，删除 alias 6erplugin=... 这行
vim ~/.zshrc

# 2. 删除克隆的仓库
rm -rf ~/.6erplugin
```

### 方式二：卸载全局 npm 包（如使用 npm install -g 安装）

```bash
# 卸载
npm uninstall -g 6erplugin
```

## API

数据来源于 [6er Skills](https://www.6erskills.com) - AI 技能导航站