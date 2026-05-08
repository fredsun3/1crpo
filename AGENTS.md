# 毛泽东诗词鉴赏网站 - 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 项目概览

毛泽东诗词鉴赏网站，收录毛泽东全部诗词作品（37首），含原文、词句注释、图文解说与创作背景。

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
├── src/
│   ├── app/
│   │   ├── page.tsx        # 首页（诗词列表，搜索，分类筛选）
│   │   ├── layout.tsx      # 根布局
│   │   ├── globals.css     # 全局样式（含自定义动画）
│   │   ├── not-found.tsx   # 404 页面
│   │   └── poem/[id]/
│   │       ├── page.tsx    # 诗词详情页（Server Component）
│   │       └── PoemDetailClient.tsx  # 诗词详情客户端组件
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/
│   │   ├── types.ts        # 诗词类型定义（Poem, Annotation）
│   │   ├── poems-data.ts   # 全部诗词数据（37首，含注释、解说、背景）
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

## 核心功能

1. **诗词列表** - 按时期分组展示所有诗词，支持搜索和分类筛选
2. **诗词详情** - 三个标签页：诗词原文（含注释）、图文解说、创作背景
3. **诗词配图** - 部分重点诗词配有AI生成的水墨风格配图
4. **前后导航** - 详情页支持上下首诗词快速切换

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码
- 禁止隐式 `any` 和 `as any`
- 注意中文字符串中的引号问题：字符串值内的中文引号使用反引号模板字符串包裹

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...) 动态拼接

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据
2. 禁止使用 head 标签，优先使用 metadata

## UI 设计规范

- 采用 shadcn/ui 组件、风格和规范
- 诗词内容使用 font-serif（宋体风格）
- 每首诗词有独立的渐变配色方案（imageColor）
- 首页 Hero 区采用红色系渐变，营造古典诗词氛围

## 构建与测试命令

- 开发：`pnpm dev`
- 构建：`pnpm build`
- 类型检查：`pnpm ts-check`
- 代码检查：`pnpm lint:build`
- 启动生产：`pnpm start`
