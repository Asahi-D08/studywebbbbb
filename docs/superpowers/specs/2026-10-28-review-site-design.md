# StudyWeb 复习网站改造 — 设计文档

日期：2026-10-28

## 目标

把 StudyWeb 改造成一个复习网站：新的首页直接展示四个科目（IB 经济、物理、CS、数学），点击进入各科分区，分区页按官方大纲列出 Topic。已有的 IB Physics HL 静态 HTML 笔记接入物理分区；其他三科先只搭大纲目录。

## 范围

包含：

- 重做首页 `/`（中英双语）。
- 新增科目分区页 `/subjects/[subject]`，subject ∈ `economics | physics | cs | math`。
- 物理笔记（`~/Desktop/wuli/electricity/`）原样复制到 `public/notes/physics/`，并在每个笔记页顶部加一条返回网站的导航条。
- 中英双语切换（cookie 保存，服务端渲染可读）。

不包含：

- 经济、CS、数学的笔记正文（Topic 状态为 “即将上线”）。
- 改动登录、上传、论坛及旧的 `/[program]/...` 路由（保留，但不再作为首页主入口）。
- 把静态笔记改写为 React/MDX。

## 架构

### 数据：`src/lib/subjects.ts`

```ts
type Localized = { zh: string; en: string };

type Topic = {
  code: string;          // "A.1", "Unit 2.3", "AHL 1.12" …
  name: Localized;
  status: "ready" | "soon";
  href?: string;         // ready 时必填，例如 "/notes/physics/topics/a1-kinematics.html"
  hlOnly?: boolean;      // 仅 HL 的内容
};

type Group = { code: string; title: Localized; topics: Topic[] };

type Course = { slug: string; name: Localized; groups: Group[] }; // 数学有 AA HL、AA SL 两个 course

type ReviewSubject = {
  slug: "economics" | "physics" | "cs" | "math";
  name: Localized;
  tagline: Localized;
  courses: Course[];     // 非数学科目只有一个 course
  uploadHref: string;    // 旧的上传区，例如 "/ib/section-5/physics"
};
```

完成度 = 状态为 ready 的 Topic 数 / Topic 总数，由函数计算，不手写。

各科大纲：

- **物理**：Skills + Themes A–E（A.1–A.5、B.1–B.5、C.1–C.5、D.1–D.4、E.1–E.5），全部 ready，并链接到对应的静态页。B.5 Current & circuits 链接到 `electricity.html`；`rev.html` 作为“综合复习”入口。
- **经济**：Unit 1 Introduction、Unit 2 Microeconomics、Unit 3 Macroeconomics、Unit 4 The global economy，按 2020 大纲列出子 Topic，全部 soon。
- **CS**：2027 首考的新大纲，Theme A Concepts of computer science（A1–A4）、Theme B Computational thinking & problem-solving（B1–B4），全部 soon。
- **数学**：AA HL 与 AA SL，Topics 1–5（Number & algebra、Functions、Geometry & trigonometry、Statistics & probability、Calculus），HL 独有内容标 `hlOnly`，全部 soon。

### 双语：`src/lib/i18n.ts` + `LanguageToggle`

- 语言 `zh | en`，保存在 cookie `sw-lang` 中，默认 `zh`。
- 服务端组件通过 `cookies()` 读取语言，界面文字从字典里取。
- `LanguageToggle`（客户端组件）切换时写入 cookie，同时写入 `localStorage["phys-lang"]`，使物理笔记的语言与网站一致，然后调用 `router.refresh()`。
- 放在 `SiteHeader` 里，与现有的 `ThemeToggle` 并列。

### 页面

- **首页 `/`**：标题区；四张科目卡片（缩写图标、课程、完成度进度条）；底部是登录状态卡片。
- **分区页 `/subjects/[subject]`**：标题区（科目名、简介、完成度）；数学有 AA HL/AA SL 切换（通过 `?course=` 查询参数，服务端渲染）；按 Group 分块显示 Topic 卡片网格。ready 卡片可点击并打开笔记，soon 卡片置灰并标“即将上线”；物理额外显示“综合复习”入口；页面底部链接到旧的上传区和论坛。未知 slug 返回 `notFound()`。
- 现有的 `SiteHeader` 导航改成：首页、四个科目、登录/登出。

### 物理静态笔记

- 复制 `~/Desktop/wuli/electricity/` → `public/notes/physics/`，排除 `.md` 源文件和 `.DS_Store`。
- 修改复制后的 `public/notes/physics/i18n.js`：所有笔记页都通过 `PhysI18n.initTopbar` 生成顶栏，在其中插入 “← StudyWeb” 链接（指向 `/subjects/physics`），无需改动各 HTML 文件。
- 中文文件名的图片保持原样；Next 静态文件服务支持 URL 编码路径，需要在浏览器里验证。

## 视觉

- 沿用 Tailwind v4 和 `next-themes` 深浅色模式。
- 全站只用一个强调色：深蓝（`globals.css` 中的 `brand-50` … `brand-950`）。红色只用于错误和删除。
- 不用渐变、光晕、彩色阴影、悬停上浮；背景为纯色，卡片是白底细边框，悬停时只改变边框颜色。
- 物理静态笔记保持自己的配色，不在此范围内。

## 错误处理

- 未知科目或未知 course 参数时，分别返回 404 或回退到第一个 course。
- 语言 cookie 是非法值时，回退为 `zh`。

## 验证

- `npm run lint`、`npm run build` 通过。
- 浏览器检查：首页四张卡片；四个分区页；数学 HL/SL 切换；从物理分区点进笔记，图片和公式正常，顶部导航条能返回；中英切换后网站与物理笔记语言一致；深浅色模式。
