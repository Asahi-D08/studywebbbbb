// Review subjects shown on the home page and /subjects/[subject].
// Syllabus outlines follow the current IB subject guides:
//   Economics (first assessment 2022), Physics (2025), Computer Science (2027),
//   Mathematics: Analysis & Approaches (2021).
// Kept free of runtime imports so `node --test` can load it directly.

import type { Localized } from "./i18n";

export type Topic = {
  code: string;
  name: Localized;
  status: "ready" | "soon";
  /** Required when status is "ready". */
  href?: string;
  hlOnly?: boolean;
};

export type Group = { code: string; title: Localized; topics: Topic[] };

export type Course = { slug: string; name: Localized; groups: Group[] };

export type ReviewSubject = {
  slug: "economics" | "physics" | "cs" | "math";
  name: Localized;
  /** Label used in the site header. */
  short: Localized;
  tagline: Localized;
  monogram: string;
  /** First course is the default and drives the home-page progress. */
  courses: Course[];
  extras?: { label: Localized; href: string }[];
  /** Legacy upload area for this subject. */
  uploadHref: string;
};

function soon(code: string, zh: string, en: string, hlOnly = false): Topic {
  return { code, name: { zh, en }, status: "soon", hlOnly };
}

const PHYSICS_NOTES = "/notes/physics";

function note(code: string, zh: string, en: string, file: string, hlOnly = false): Topic {
  return { code, name: { zh, en }, status: "ready", href: `${PHYSICS_NOTES}/${file}`, hlOnly };
}

const economics: ReviewSubject = {
  slug: "economics",
  name: { zh: "IB 经济", en: "IB Economics" },
  short: { zh: "经济", en: "Economics" },
  tagline: {
    zh: "微观、宏观与全球经济——图表、定义与政策评估。",
    en: "Micro, macro and the global economy — diagrams, definitions and policy evaluation.",
  },
  monogram: "Ec",
  uploadHref: "/ib/section-4/economics",
  courses: [
    {
      slug: "sl-hl",
      name: { zh: "SL / HL", en: "SL / HL" },
      groups: [
        {
          code: "Unit 1",
          title: { zh: "经济学导论", en: "Introduction to economics" },
          topics: [
            soon("1.1", "什么是经济学", "What is economics?"),
            soon("1.2", "经济学家如何看待世界", "How do economists approach the world?"),
          ],
        },
        {
          code: "Unit 2",
          title: { zh: "微观经济学", en: "Microeconomics" },
          topics: [
            soon("2.1", "需求", "Demand"),
            soon("2.2", "供给", "Supply"),
            soon("2.3", "竞争市场均衡", "Competitive market equilibrium"),
            soon("2.4", "对消费者与生产者最大化行为的批判", "Critique of the maximising behaviour of consumers and producers"),
            soon("2.5", "需求弹性", "Elasticity of demand"),
            soon("2.6", "供给弹性", "Elasticity of supply"),
            soon("2.7", "政府在微观经济中的作用", "Role of government in microeconomics"),
            soon("2.8", "市场失灵：外部性与公共资源", "Market failure: externalities and common pool resources"),
            soon("2.9", "市场失灵：公共物品", "Market failure: public goods"),
            soon("2.10", "市场失灵：信息不对称", "Market failure: asymmetric information"),
            soon("2.11", "市场失灵：市场势力", "Market failure: market power"),
            soon("2.12", "市场无法实现公平", "The market's inability to achieve equity"),
          ],
        },
        {
          code: "Unit 3",
          title: { zh: "宏观经济学", en: "Macroeconomics" },
          topics: [
            soon("3.1", "衡量经济活动", "Measuring economic activity"),
            soon("3.2", "总需求与总供给", "Aggregate demand and aggregate supply"),
            soon("3.3", "宏观经济目标", "Macroeconomic objectives"),
            soon("3.4", "不平等与贫困", "Economics of inequality and poverty"),
            soon("3.5", "需求管理：货币政策", "Demand management: monetary policy"),
            soon("3.6", "需求管理：财政政策", "Demand management: fiscal policy"),
            soon("3.7", "供给侧政策", "Supply-side policies"),
          ],
        },
        {
          code: "Unit 4",
          title: { zh: "全球经济", en: "The global economy" },
          topics: [
            soon("4.1", "国际贸易的好处", "Benefits of international trade"),
            soon("4.2", "贸易保护的类型", "Types of trade protection"),
            soon("4.3", "支持与反对贸易保护", "Arguments for and against trade protection"),
            soon("4.4", "经济一体化", "Economic integration"),
            soon("4.5", "汇率", "Exchange rates"),
            soon("4.6", "国际收支", "Balance of payments"),
            soon("4.7", "可持续发展", "Sustainable development"),
            soon("4.8", "衡量发展", "Measuring development"),
            soon("4.9", "经济增长与发展的障碍", "Barriers to economic growth and development"),
            soon("4.10", "经济增长与发展的策略", "Strategies for economic growth and development"),
          ],
        },
      ],
    },
  ],
};

const physics: ReviewSubject = {
  slug: "physics",
  name: { zh: "IB 物理", en: "IB Physics" },
  short: { zh: "物理", en: "Physics" },
  tagline: {
    zh: "Themes A–E 全大纲笔记：公式推导、图像与例题。",
    en: "Full Themes A–E notes: derivations, graphs and worked examples.",
  },
  monogram: "Ph",
  uploadHref: "/ib/section-5/physics",
  extras: [
    { label: { zh: "综合复习：测量与力学", en: "Combined review: measurement & mechanics" }, href: `${PHYSICS_NOTES}/rev.html` },
    { label: { zh: "原版笔记目录", en: "Original notes index" }, href: `${PHYSICS_NOTES}/index.html` },
  ],
  courses: [
    {
      slug: "hl",
      name: { zh: "HL", en: "HL" },
      groups: [
        {
          code: "Skills",
          title: { zh: "物理学研究技能", en: "Skills in the study of physics" },
          topics: [
            note("Skills", "测量、误差、不确定度、图像与矢量", "Measurement, errors, uncertainty, graphs and vectors", "topics/skills.html"),
          ],
        },
        {
          code: "Theme A",
          title: { zh: "空间、时间与运动", en: "Space, time and motion" },
          topics: [
            note("A.1", "运动学", "Kinematics", "topics/a1-kinematics.html"),
            note("A.2", "力与动量", "Forces and momentum", "topics/a2-forces-momentum.html"),
            note("A.3", "功、能量与功率", "Work, energy and power", "topics/a3-work-energy-power.html"),
            note("A.4", "刚体力学", "Rigid body mechanics", "topics/a4-rigid-body.html", true),
            note("A.5", "伽利略与狭义相对论", "Galilean and special relativity", "topics/a5-relativity.html", true),
          ],
        },
        {
          code: "Theme B",
          title: { zh: "物质的粒子本质", en: "The particulate nature of matter" },
          topics: [
            note("B.1", "热能传递", "Thermal energy transfers", "topics/b1-thermal.html"),
            note("B.2", "温室效应", "Greenhouse effect", "topics/b2-greenhouse.html"),
            note("B.3", "气体定律", "Gas laws", "topics/b3-gas-laws.html"),
            note("B.4", "热力学", "Thermodynamics", "topics/b4-thermodynamics.html", true),
            note("B.5", "电流与电路", "Current and circuits", "electricity.html"),
          ],
        },
        {
          code: "Theme C",
          title: { zh: "波动行为", en: "Wave behaviour" },
          topics: [
            note("C.1", "简谐运动", "Simple harmonic motion", "topics/c1-shm.html"),
            note("C.2", "波动模型", "Wave model", "topics/c2-wave-model.html"),
            note("C.3", "波的现象", "Wave phenomena", "topics/c3-wave-phenomena.html"),
            note("C.4", "驻波与共振", "Standing waves and resonance", "topics/c4-standing-waves.html"),
            note("C.5", "多普勒效应", "Doppler effect", "topics/c5-doppler.html"),
          ],
        },
        {
          code: "Theme D",
          title: { zh: "场", en: "Fields" },
          topics: [
            note("D.1", "引力场", "Gravitational fields", "topics/d1-gravitation.html"),
            note("D.2", "电场与磁场", "Electric and magnetic fields", "topics/d2-em-fields.html"),
            note("D.3", "电磁场中的运动", "Motion in electromagnetic fields", "topics/d3-motion-em.html"),
            note("D.4", "电磁感应", "Induction", "topics/d4-induction.html", true),
          ],
        },
        {
          code: "Theme E",
          title: { zh: "核物理与量子物理", en: "Nuclear and quantum physics" },
          topics: [
            note("E.1", "原子结构", "Structure of the atom", "topics/e1-atom.html"),
            note("E.2", "量子物理", "Quantum physics", "topics/e2-quantum.html", true),
            note("E.3", "放射性衰变", "Radioactive decay", "topics/e3-radioactivity.html"),
            note("E.4", "核裂变", "Fission", "topics/e4-fission.html"),
            note("E.5", "核聚变与恒星", "Fusion and stars", "topics/e5-fusion-stars.html"),
          ],
        },
      ],
    },
  ],
};

const cs: ReviewSubject = {
  slug: "cs",
  name: { zh: "IB 计算机科学", en: "IB Computer Science" },
  short: { zh: "CS", en: "CS" },
  tagline: {
    zh: "计算机基础、网络、数据库、机器学习与编程。",
    en: "Computer fundamentals, networks, databases, machine learning and programming.",
  },
  monogram: "CS",
  uploadHref: "/ib/section-6/cs",
  courses: [
    {
      slug: "sl-hl",
      name: { zh: "SL / HL", en: "SL / HL" },
      groups: [
        {
          code: "Theme A",
          title: { zh: "计算机科学概念", en: "Concepts of computer science" },
          topics: [
            soon("A1", "计算机基础", "Computer fundamentals"),
            soon("A2", "网络", "Networks"),
            soon("A3", "数据库", "Databases"),
            soon("A4", "机器学习", "Machine learning"),
          ],
        },
        {
          code: "Theme B",
          title: { zh: "计算思维与问题解决", en: "Computational thinking and problem-solving" },
          topics: [
            soon("B1", "计算思维", "Computational thinking"),
            soon("B2", "程序设计", "Programming"),
            soon("B3", "面向对象编程", "Object-oriented programming"),
            soon("B4", "抽象数据类型", "Abstract data types", true),
          ],
        },
      ],
    },
  ],
};

const aaGroups: Group[] = [
  {
    code: "Topic 1",
    title: { zh: "数与代数", en: "Number and algebra" },
    topics: [
      soon("1.1", "科学记数法", "Scientific notation"),
      soon("1.2", "等差数列与级数", "Arithmetic sequences and series"),
      soon("1.3", "等比数列与级数", "Geometric sequences and series"),
      soon("1.4", "金融应用", "Financial applications"),
      soon("1.5", "指数与对数入门", "Introduction to exponents and logarithms"),
      soon("1.6", "简单演绎证明", "Simple deductive proof"),
      soon("1.7", "指数与对数运算律", "Laws of exponents and logarithms"),
      soon("1.8", "无穷等比级数", "Infinite geometric series"),
      soon("1.9", "二项式定理", "Binomial theorem"),
      soon("1.10", "排列组合与推广的二项式定理", "Counting principles and extended binomial theorem", true),
      soon("1.11", "部分分式", "Partial fractions", true),
      soon("1.12", "复数", "Complex numbers", true),
      soon("1.13", "复数的极坐标与欧拉形式", "Polar and Euler form of complex numbers", true),
      soon("1.14", "共轭复根与棣莫弗定理", "Conjugate roots and De Moivre's theorem", true),
      soon("1.15", "数学归纳法、反证法与反例", "Proof by induction, contradiction and counterexample", true),
      soon("1.16", "线性方程组", "Systems of linear equations", true),
    ],
  },
  {
    code: "Topic 2",
    title: { zh: "函数", en: "Functions" },
    topics: [
      soon("2.1", "直线方程", "Equations of straight lines"),
      soon("2.2", "函数的概念", "Concept of a function"),
      soon("2.3", "函数图像", "Graph of a function"),
      soon("2.4", "图像的关键特征", "Key features of graphs"),
      soon("2.5", "复合函数与反函数", "Composite and inverse functions"),
      soon("2.6", "二次函数", "Quadratic functions"),
      soon("2.7", "二次方程与判别式", "Quadratic equations and the discriminant"),
      soon("2.8", "倒数函数与有理函数", "Reciprocal and rational functions"),
      soon("2.9", "指数函数与对数函数", "Exponential and logarithmic functions"),
      soon("2.10", "解方程", "Solving equations"),
      soon("2.11", "图像变换", "Transformations of graphs"),
      soon("2.12", "多项式函数、因式定理与余数定理", "Polynomial functions, factor and remainder theorems", true),
      soon("2.13", "有理函数", "Rational functions", true),
      soon("2.14", "奇函数、偶函数与自反函数", "Odd, even and self-inverse functions", true),
      soon("2.15", "解不等式", "Solving inequalities", true),
      soon("2.16", "绝对值与倒数图像", "Graphs of |f(x)|, f(|x|) and 1/f(x)", true),
    ],
  },
  {
    code: "Topic 3",
    title: { zh: "几何与三角", en: "Geometry and trigonometry" },
    topics: [
      soon("3.1", "立体几何：距离、体积与表面积", "3D geometry: distance, volume and surface area"),
      soon("3.2", "直角三角形、正弦与余弦定理", "Right-angled trigonometry, sine and cosine rules"),
      soon("3.3", "三角学的应用", "Applications of trigonometry"),
      soon("3.4", "弧度、弧长与扇形", "Radians, arcs and sectors"),
      soon("3.5", "单位圆", "The unit circle"),
      soon("3.6", "毕达哥拉斯恒等式与二倍角公式", "Pythagorean identity and double-angle formulae"),
      soon("3.7", "三角函数", "Circular functions"),
      soon("3.8", "解三角方程", "Solving trigonometric equations"),
      soon("3.9", "倒数三角函数与反三角函数", "Reciprocal and inverse trigonometric functions", true),
      soon("3.10", "和角公式", "Compound angle identities", true),
      soon("3.11", "三角函数的对称关系", "Symmetry of trigonometric functions", true),
      soon("3.12", "向量入门", "Introduction to vectors", true),
      soon("3.13", "数量积", "Scalar product", true),
      soon("3.14", "直线的向量方程", "Vector equation of a line", true),
      soon("3.15", "相交直线与异面直线", "Intersecting and skew lines", true),
      soon("3.16", "向量积", "Vector product", true),
      soon("3.17", "平面的向量方程", "Vector equations of a plane", true),
      soon("3.18", "直线与平面的交点、夹角与距离", "Intersections, angles and distances of lines and planes", true),
    ],
  },
  {
    code: "Topic 4",
    title: { zh: "统计与概率", en: "Statistics and probability" },
    topics: [
      soon("4.1", "数据收集与抽样", "Data collection and sampling"),
      soon("4.2", "数据的呈现", "Presentation of data"),
      soon("4.3", "集中趋势与离散程度", "Measures of central tendency and dispersion"),
      soon("4.4", "线性相关与回归", "Linear correlation and regression"),
      soon("4.5", "概率的基本概念", "Concepts of probability"),
      soon("4.6", "维恩图、树状图与组合事件", "Venn diagrams, tree diagrams and combined events"),
      soon("4.7", "离散随机变量", "Discrete random variables"),
      soon("4.8", "二项分布", "Binomial distribution"),
      soon("4.9", "正态分布", "Normal distribution"),
      soon("4.10", "x 对 y 的回归", "Regression of x on y"),
      soon("4.11", "条件概率与独立性", "Conditional probability and independence"),
      soon("4.12", "正态分布的标准化", "Standardisation of normal variables"),
      soon("4.13", "贝叶斯定理", "Bayes' theorem", true),
      soon("4.14", "连续随机变量", "Continuous random variables", true),
    ],
  },
  {
    code: "Topic 5",
    title: { zh: "微积分", en: "Calculus" },
    topics: [
      soon("5.1", "极限与导数入门", "Introduction to limits and derivatives"),
      soon("5.2", "函数的增减性", "Increasing and decreasing functions"),
      soon("5.3", "多项式求导", "Derivatives of polynomials"),
      soon("5.4", "切线与法线", "Tangents and normals"),
      soon("5.5", "积分入门", "Introduction to integration"),
      soon("5.6", "链式、乘积与商的求导法则", "Chain, product and quotient rules"),
      soon("5.7", "二阶导数", "The second derivative"),
      soon("5.8", "极值、最优化与拐点", "Stationary points, optimisation and inflection"),
      soon("5.9", "运动学", "Kinematics"),
      soon("5.10", "不定积分与换元", "Indefinite integrals and substitution"),
      soon("5.11", "定积分与面积", "Definite integrals and areas"),
      soon("5.12", "连续性、可导性与定义求导", "Continuity, differentiability and first principles", true),
      soon("5.13", "极限与洛必达法则", "Limits and L'Hôpital's rule", true),
      soon("5.14", "隐函数求导与相关变化率", "Implicit differentiation and related rates", true),
      soon("5.15", "更多函数的导数与积分", "Further derivatives and integrals", true),
      soon("5.16", "换元积分与分部积分", "Integration by substitution and by parts", true),
      soon("5.17", "旋转体体积", "Volumes of revolution", true),
      soon("5.18", "一阶微分方程", "First-order differential equations", true),
      soon("5.19", "麦克劳林级数", "Maclaurin series", true),
    ],
  },
];

const math: ReviewSubject = {
  slug: "math",
  name: { zh: "IB 数学", en: "IB Mathematics" },
  short: { zh: "数学", en: "Maths" },
  tagline: {
    zh: "Analysis & Approaches：代数、函数、三角、统计与微积分。",
    en: "Analysis & Approaches: algebra, functions, trigonometry, statistics and calculus.",
  },
  monogram: "Ma",
  uploadHref: "/ib/section-2/math-aahl",
  courses: [
    { slug: "aa-hl", name: { zh: "AA HL", en: "AA HL" }, groups: aaGroups },
    {
      slug: "aa-sl",
      name: { zh: "AA SL", en: "AA SL" },
      groups: aaGroups.map((g) => ({ ...g, topics: g.topics.filter((tp) => !tp.hlOnly) })),
    },
  ],
};

export const SUBJECTS: ReviewSubject[] = [economics, physics, cs, math];

export function getSubject(slug: string): ReviewSubject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getCourse(subject: ReviewSubject, slug?: string): Course {
  return subject.courses.find((c) => c.slug === slug) ?? subject.courses[0];
}

export function courseTopics(course: Course): Topic[] {
  return course.groups.flatMap((g) => g.topics);
}

export function courseProgress(course: Course): { ready: number; total: number } {
  const topics = courseTopics(course);
  return {
    ready: topics.filter((tp) => tp.status === "ready").length,
    total: topics.length,
  };
}
