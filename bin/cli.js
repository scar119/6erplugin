#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const chalk = require('chalk');

const API_BASE = 'https://www.6erskills.com/api';
async function search(query, options = {}) {
  const pageSize = options.pageSize || 10;
  const page = options.page || 1;

  try {
    console.log(chalk.cyan(`🔍 搜索: "${query}"...`));
    console.log(chalk.gray('-'.repeat(20)));

    const res = await axios.get(`${API_BASE}/skills`, {
      params: { search: query, page_size: pageSize, page }
    });

    if (res.data.items.length === 0) {
      console.log(chalk.yellow('没有找到相关技能.\n'));
      return;
    }

    console.log(chalk.cyan(`\n找到 ${res.data.total} 个技能:\n`));
    res.data.items.forEach((skill, i) => {
      console.log(`${chalk.white(i + 1 + (page - 1) * pageSize)}. ${chalk.green(skill.repo_name)}`);
      console.log(`   ${skill.description || '暂无描述'}`);
      console.log(`   ${chalk.yellow('⭐')} ${skill.stars}  ${chalk.gray('|')}  ${chalk.blue(skill.category)}`);
      console.log(`   ${chalk.gray('🔗')} https://www.6erskills.com/skill/${skill.slug}`);
      console.log();
    });
  } catch (err) {
    console.log(chalk.red('搜索失败:'), err.message);
  }
}

// 查看详情
async function view(skillName) {
  try {
    const res = await axios.get(`${API_BASE}/skills/by-slug/${skillName}`);

    if (!res.data) {
      console.log(chalk.red('Skill not found.'));
      return;
    }

    const s = res.data;
    console.log(chalk.cyan(`\n${s.repo_name}\n`));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(`${s.description || 'No description'}\n`);
    console.log(`${chalk.yellow('⭐')} ${s.stars} | ${chalk.blue(s.category)} | ${s.language || 'N/A'}`);
    console.log(`${chalk.green('📁')} ${s.repo_url}`);
    console.log();
  } catch (err) {
    console.log(chalk.red('View failed:'), err.message);
  }
}

// 列出收藏
async function list() {
  console.log(chalk.yellow('\nUse web UI to manage favorites:'));
  console.log(`${chalk.blue('https://www.6erskills.com/profile')}\n`);
}

// 帮助
function help() {
  console.log(`
${chalk.cyan('6erplugin CLI')}
${chalk.gray('─'.repeat(30))}

${chalk.green('search <query>')}    Search skills
${chalk.green('view <name>')}       View skill details
${chalk.green('list')}               List installed skills
${chalk.green('help')}               Show this help

${chalk.gray('Examples:')}
  $ 6erplugin search "code review"
  $ 6erplugin view anthropic/claude-code
  $ 6erplugin list
`);
}

// 主入口
const args = process.argv.slice(2);
const cmd = args[0];

if (!cmd || cmd === 'help') {
  help();
  process.exit(0);
}

// 解析 search 命令的参数
function parseSearchArgs(searchArgs) {
  const options = { pageSize: 10, page: 1 };

  for (let i = 0; i < searchArgs.length; i++) {
    const arg = searchArgs[i];
    if (arg === '-n' && searchArgs[i + 1]) {
      options.pageSize = parseInt(searchArgs[i + 1]) || 10;
      searchArgs.splice(i, 2);
      i -= 2;
    } else if (arg === '--page' && searchArgs[i + 1]) {
      options.page = parseInt(searchArgs[i + 1]) || 1;
      searchArgs.splice(i, 2);
      i -= 2;
    }
  }

  return { query: searchArgs.join(' '), options };
}

// install 安装技能
async function install(skillUrl) {
  if (!skillUrl) {
    console.log(chalk.red('请指定技能地址:'));
    console.log('  6erplugin install <owner/repo>');
    console.log('  6erplugin install https://github.com/owner/repo\n');
    return;
  }

  console.log(chalk.cyan(`\n📦 正在安装: ${skillUrl}\n`));
  console.log(chalk.yellow('提示: 使用 Claude Code 的 skill-manager 安装技能'));
  console.log(`${chalk.blue('https://www.6erskills.com/skill/<slug>')}\n`);
}

if (cmd === 'search' && args[1]) {
  const searchArgs = args.slice(1);
  const { query, options } = parseSearchArgs(searchArgs);
  if (query) search(query, options);
} else if (cmd === 'view' && args[1]) {
  view(args[1]);
} else if (cmd === 'list') {
  list();
} else if (cmd === 'install' && args[1]) {
  install(args.slice(1).join(' '));
} else if (cmd === 'install' && !args[1]) {
  install();
} else {
  console.log(chalk.red('未知命令. 使用:'));
  console.log('  6erplugin search <query>');
  console.log('  6erplugin view <name>');
  console.log('  6erplugin list');
  console.log('  6erplugin install <owner/repo>');
  console.log('  6erplugin help');
}
