# 6erplugin CLI

6er Agent Skills Hub 命令行工具 - 在终端中搜索和安装 AI 技能

## 安装

```bash
npm install -g 6erplugin
```

或直接运行：

```bash
npx 6erplugin search "代码审查"
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
