# 6erplugin CLI

6er Agent Skills Hub 命令行工具 - 在终端中搜索 AI 技能

## 安装

```bash
# 方式1: 直接运行 (推荐)
npx scar119/6erplugin search "关键词"

# 方式2: 克隆到本地长期使用
git clone https://github.com/scar119/6erplugin.git
cd 6erplugin
npm install -g ./

# 方式3: 添加别名
echo 'alias 6erplugin="npx scar119/6erplugin"' >> ~/.zshrc
source ~/.zshrc
```

## 使用

```bash
# 搜索 skills
6erplugin search <关键词>

# 查看详情
6erplugin view <owner/repo>

# 查看已安装列表
6erplugin list

# 帮助
6erplugin help
```

## 示例

```bash
# 搜索代码审查相关的 skills
6erplugin search "code review"

# 查看 Claude Code 技能详情
6erplugin view anthropic/claude-code

# 查看 MCP 服务器
6erplugin search "mcp server"
```

## 功能

| 命令 | 说明 |
|------|------|
| search | 搜索 skills |
| view | 查看详情 |
| list | 查看收藏列表 |

## API

基于 [6er Skills](https://www.6erskills.com) 提供的数据
