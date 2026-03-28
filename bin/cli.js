#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const chalk = require('chalk');

const API_BASE = 'https://www.6erskills.com/api';

// 搜索 skills
async function search(query) {
  try {
    const res = await axios.get(`${API_BASE}/skills`, {
      params: { search: query, page_size: 10 }
    });

    if (res.data.items.length === 0) {
      console.log(chalk.yellow('No skills found.'));
      return;
    }

    console.log(chalk.cyan(`\nFound ${res.data.total} skills:\n`));
    res.data.items.forEach((skill, i) => {
      console.log(`${chalk.white(i + 1)}. ${chalk.green(skill.repo_name)}`);
      console.log(`   ${skill.description || 'No description'}`);
      console.log(`   ${chalk.yellow('⭐')} ${skill.stars}  ${chalk.gray('|')}  ${chalk.blue(skill.category)}`);
      console.log(`   ${chalk.gray('🔗')} https://www.6erskills.com/skill/${skill.slug}`);
      console.log();
    });
  } catch (err) {
    console.log(chalk.red('Search failed:'), err.message);
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

if (cmd === 'search' && args[1]) {
  search(args.slice(1).join(' '));
} else if (cmd === 'view' && args[1]) {
  view(args[1]);
} else if (cmd === 'list') {
  list();
} else {
  console.log(chalk.red('Unknown command. Use:'));
  console.log('  6erplugin search <query>');
  console.log('  6erplugin view <name>');
  console.log('  6erplugin list');
  console.log('  6erplugin help');
}
