<div align="center">
  <h1>外链跳转腾讯会议</h1>
  <p>移动端外链中转跳转处理</p>
</div>

## 目录

1. [简介](#简介)
2. [开发需求](#开发需求)

## 简介

- 依赖安装

```shell
npm i
```

- 运行

```shell
npm run dev
```

- 打包

```shell
npm run build
```

### 技术栈

- 编程语言：javascript+jquery
- 构建工具：webpack
- 代码规范：eslint+standard
- node 版本：v12.18.3
- npm 版本：v6.14.6

## 开发需求

技术痛点：

- 项目架构搭建费时，需要一个模板脚手架（个人 or 团队）
- 版本 commit 多人协作提交规范有待完善
- 打包构建运行脚手架配置繁琐（同上上一条）
- 开发环境下，样式预处理的使用，typescript 没有那么遍历
- 开发规范性问题（代码风格，变量风格，eslint 可解决）
- 代码兼容问题（es5）

产品需求

- 控制外部页面
- 操作执行自动化处理流程

TODO

- [x] git commit 提交规范添加
- [x] SemVer 版本语义化添加
- [ ] 打包运行工具区别，现有的文档了解（样式预处理，ts 编译）
- [ ] 搭建个人脚手架项目添加，项目模板添加
- [x] 代码规范添加（结合 vscode eslint）

## 提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `build` 对构建系统或者外部依赖项进行了修改
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中
