import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, type Pt } from "@/components/notes/Chart";

const PPC: Pt[] = [
  [0, 80],
  [20, 74],
  [40, 64],
  [60, 44],
  [80, 0],
];
const PPC2: Pt[] = PPC.map(([x, y]) => [x * 1.18, y * 1.18]);

function Choice({ caption }: { caption: ReactNode }) {
  const c = PPC[2];
  const d = PPC[3];
  return (
    <Chart x="Consumer goods" y="Capital goods" caption={caption}>
      <Line points={PPC} smooth label="PPC" labelOffset={[4, -8]} />
      <Guide at={c} x="C₁" y="K₁" />
      <Guide at={d} x="C₂" y="K₂" />
      <Arrow from={[c[0] + 2, c[1] - 6]} to={[d[0] - 4, d[1] + 1]} />
      <Dot at={c} label="A" labelOffset={[6, -8]} />
      <Dot at={d} label="B" />
    </Chart>
  );
}

function Points({ caption }: { caption: ReactNode }) {
  const u: Pt = [30, 35];
  const a = PPC[2];
  const z: Pt = [70, 62];
  return (
    <Chart x="Consumer goods" y="Capital goods" caption={caption}>
      <Line points={PPC} smooth label="PPC" labelOffset={[4, -8]} />
      <Arrow from={[u[0] + 1.5, u[1] + 4]} to={[a[0] - 1.5, a[1] - 4]} />
      <Dot at={u} label="U" labelOffset={[-16, 4]} />
      <Dot at={a} label="A" labelOffset={[6, -8]} />
      <Dot at={PPC[1]} label="B" labelOffset={[2, -9]} />
      <Dot at={z} label="Z" />
      <Label at={[32, 49]} anchor="end" muted>
        actual growth
      </Label>
      <Label at={[68, 71]} muted>
        unattainable
      </Label>
    </Chart>
  );
}

function Growth({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Consumer goods" y="Capital goods" caption={caption}>
      <Line points={PPC} smooth label="PPC₁" labelOffset={[4, -8]} />
      <Line points={PPC2} smooth tone="alt" label="PPC₂" labelOffset={[2, -8]} />
      <Arrow from={[50, 58]} to={[57, 66]} />
      <Arrow from={[20, 77]} to={[22, 87]} />
      <Arrow from={[71, 25]} to={[83, 27]} />
    </Chart>
  );
}

function IncreasingCost({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Consumer goods" y="Capital goods" caption={caption}>
      <Line points={PPC} smooth />
      <Guide at={PPC[1]} x="20" y="74" />
      <Guide at={PPC[2]} x="40" y="64" />
      <Guide at={PPC[3]} x="60" y="44" />
      <Label at={[-2.3, 78.4]} anchor="end">
        80
      </Label>
      <Label at={[80, -6.2]} anchor="middle">
        80
      </Label>
      <Dot at={PPC[0]} label="A" labelOffset={[6, -6]} />
      <Dot at={PPC[1]} label="B" labelOffset={[2, -9]} />
      <Dot at={PPC[2]} label="C" labelOffset={[6, -8]} />
      <Dot at={PPC[3]} label="D" />
      <Dot at={PPC[4]} label="E" labelOffset={[6, -8]} />
    </Chart>
  );
}

const LINEAR: Pt[] = [
  [0, 80],
  [80, 0],
];

function ConstantCost({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Consumer goods" y="Capital goods" caption={caption}>
      <Line points={LINEAR} label="PPC" labelOffset={[4, -8]} />
      <Guide at={[20, 60]} x="20" y="60" />
      <Guide at={[40, 40]} x="40" y="40" />
      <Guide at={[60, 20]} x="60" y="20" />
      <Label at={[-2.3, 78.4]} anchor="end">
        80
      </Label>
      <Label at={[80, -6.2]} anchor="middle">
        80
      </Label>
      <Dot at={[20, 60]} />
      <Dot at={[40, 40]} />
      <Dot at={[60, 20]} />
    </Chart>
  );
}

const BOX = "fill-brand-300/25 stroke-slate-700 dark:fill-brand-400/20 dark:stroke-slate-300";
const TXT = "fill-slate-800 dark:fill-slate-100";
const MUTED = "fill-slate-500 dark:fill-slate-400";

function Box({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} strokeWidth={1.5} className={BOX} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontWeight={600} className={TXT}>
        {children}
      </text>
    </g>
  );
}

function Flow({ d, tone = "main" }: { d: string; tone?: "main" | "muted" }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={tone === "main" ? 2.2 : 1.5}
      markerEnd="url(#cf-arrow)"
      className={tone === "main" ? "stroke-brand-800 dark:stroke-brand-200" : "stroke-slate-500 dark:stroke-slate-400"}
    />
  );
}

/** The axis-based chart kit cannot draw boxes, so the circular flow uses its own small SVG. */
function CircularFlow({ caption }: { caption: ReactNode }) {
  return (
    <figure className="notes-figure">
      <svg
        viewBox="0 0 440 330"
        role="img"
        aria-label="Circular flow of income"
        className="mx-auto block w-full max-w-[440px]"
        fontSize={12}
      >
        <defs>
          <marker
            id="cf-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-slate-700 dark:fill-slate-300" />
          </marker>
        </defs>
        <Flow d="M410,130 L410,40 L30,40 L30,128" />
        <Flow d="M30,190 L30,290 L410,290 L410,192" />
        <text x={220} y={30} textAnchor="middle" className={TXT}>
          Factor incomes: wages, rent, interest, profit (Y)
        </text>
        <text x={220} y={310} textAnchor="middle" className={TXT}>
          Spending on goods and services (C)
        </text>
        <Box x={10} y={130} w={100} h={60}>
          Households
        </Box>
        <Box x={330} y={130} w={100} h={60}>
          Firms
        </Box>
        <Box x={170} y={58} w={100} h={34}>
          Financial sector
        </Box>
        <Box x={170} y={143} w={100} h={34}>
          Government
        </Box>
        <Box x={170} y={228} w={100} h={34}>
          Foreign sector
        </Box>
        <Flow d="M110,145 L168,80" tone="muted" />
        <Flow d="M110,160 L168,160" tone="muted" />
        <Flow d="M110,175 L168,240" tone="muted" />
        <Flow d="M270,80 L328,145" tone="muted" />
        <Flow d="M270,160 L328,160" tone="muted" />
        <Flow d="M270,240 L328,175" tone="muted" />
        <text x={128} y={108} className={TXT} fontWeight={600}>
          S
        </text>
        <text x={136} y={153} className={TXT} fontWeight={600}>
          T
        </text>
        <text x={118} y={214} className={TXT} fontWeight={600}>
          M
        </text>
        <text x={305} y={102} className={TXT} fontWeight={600}>
          I
        </text>
        <text x={296} y={153} className={TXT} fontWeight={600}>
          G
        </text>
        <text x={312} y={222} className={TXT} fontWeight={600}>
          X
        </text>
        <text x={75} y={120} textAnchor="middle" className={MUTED}>
          Leakages
        </text>
        <text x={365} y={120} textAnchor="middle" className={MUTED}>
          Injections
        </text>
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "经济学研究社会如何用有限的资源满足无限的需要和欲望。本节介绍微观与宏观经济学、九大核心概念、生产要素、稀缺性与机会成本、三个基本经济问题和不同经济体制，并用生产可能性曲线（PPC）和收入循环流动模型来表示这些思想。",
    en: "Economics studies how societies use limited resources to meet unlimited needs and wants. This topic introduces microeconomics and macroeconomics, the nine key concepts, the factors of production, scarcity and opportunity cost, the basic economic questions and economic systems, and two models that capture these ideas: the production possibilities curve (PPC) and the circular flow of income.",
  },
  sections: [
    {
      id: "social-science",
      level: "both",
      title: { zh: "经济学是一门社会科学", en: "Economics as a social science" },
      body: {
        zh: (
          <>
            <Def term="Economics">
              研究个人、企业、政府和社会如何在稀缺条件下做出选择，以分配有限资源来满足无限需要和欲望的一门社会科学。
            </Def>
            <p>
              经济学是<strong>社会科学</strong>（social science）：它研究的是人的行为以及人与人之间的互动，而人的行为受价值观、文化、政治和心理影响，很难像自然科学那样在实验室里控制变量。所以经济学的「规律」只是在其他条件不变时的一般趋势，预测并不总是准确。
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>微观经济学 Microeconomics</th>
                  <th>宏观经济学 Macroeconomics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>研究对象</td>
                  <td>单个消费者、企业和具体市场</td>
                  <td>整个国家经济（以及全球经济）</td>
                </tr>
                <tr>
                  <td>典型问题</td>
                  <td>奶茶价格为什么上涨？对糖征税会怎样影响销量？</td>
                  <td>为什么会出现通胀和失业？央行应不应该加息？</td>
                </tr>
                <tr>
                  <td>IB 对应单元</td>
                  <td>第 2 单元</td>
                  <td>第 3 单元（第 4 单元为全球经济）</td>
                </tr>
              </tbody>
            </table>
            <p>IB 课程围绕九个<strong>核心概念</strong>（key concepts）展开，评论文（IA）每篇都要选一个作为分析视角：</p>
            <table>
              <thead>
                <tr>
                  <th>概念</th>
                  <th>含义</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>稀缺 Scarcity</td><td>资源有限，无法满足所有需要和欲望。</td></tr>
                <tr><td>选择 Choice</td><td>稀缺迫使个人、企业和政府在多种用途之间做取舍。</td></tr>
                <tr><td>效率 Efficiency</td><td>以最少的浪费利用资源，或把资源用在社会最想要的地方。</td></tr>
                <tr><td>公平 Equity</td><td>收入、财富和机会的分配是否公正（不等于完全相同）。</td></tr>
                <tr><td>经济福祉 Economic well-being</td><td>生活水平、经济安全感和生活质量。</td></tr>
                <tr><td>可持续性 Sustainability</td><td>满足当代需要，同时不损害后代满足其需要的能力。</td></tr>
                <tr><td>变化 Change</td><td>经济不断变化，模型和政策也要随之调整。</td></tr>
                <tr><td>相互依存 Interdependence</td><td>经济主体、国家之间的决策会相互影响。</td></tr>
                <tr><td>干预 Intervention</td><td>政府介入市场以改变结果，例如税收、补贴、管制。</td></tr>
              </tbody>
            </table>
          </>
        ),
        en: (
          <>
            <Def term="Economics">
              The social science that studies how individuals, firms, governments and societies make choices about allocating scarce resources to satisfy unlimited needs and wants.
            </Def>
            <p>
              Economics is a <strong>social science</strong>: it studies human behaviour and how people interact. That behaviour is shaped by values, culture, politics and psychology, and economists can rarely run controlled laboratory experiments. Economic laws are therefore general tendencies that hold ceteris paribus, and predictions are not always accurate.
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Microeconomics</th>
                  <th>Macroeconomics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Focus</td>
                  <td>Individual consumers, firms and particular markets</td>
                  <td>The economy as a whole (and the global economy)</td>
                </tr>
                <tr>
                  <td>Typical questions</td>
                  <td>Why has the price of bubble tea risen? How will a sugar tax affect sales?</td>
                  <td>What causes inflation and unemployment? Should the central bank raise interest rates?</td>
                </tr>
                <tr>
                  <td>IB unit</td>
                  <td>Unit 2</td>
                  <td>Unit 3 (Unit 4 covers the global economy)</td>
                </tr>
              </tbody>
            </table>
            <p>The course is built around nine <strong>key concepts</strong>; each internal assessment commentary must use one of them as a lens:</p>
            <table>
              <thead>
                <tr>
                  <th>Concept</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Scarcity</td><td>Resources are limited, so not all needs and wants can be met.</td></tr>
                <tr><td>Choice</td><td>Scarcity forces individuals, firms and governments to choose between alternative uses.</td></tr>
                <tr><td>Efficiency</td><td>Using resources with the least waste, or allocating them to what society values most.</td></tr>
                <tr><td>Equity</td><td>Whether the distribution of income, wealth and opportunity is fair (not the same as equal).</td></tr>
                <tr><td>Economic well-being</td><td>Living standards, economic security and quality of life.</td></tr>
                <tr><td>Sustainability</td><td>Meeting present needs without compromising the ability of future generations to meet theirs.</td></tr>
                <tr><td>Change</td><td>Economies are dynamic, so models and policies must adapt.</td></tr>
                <tr><td>Interdependence</td><td>The decisions of economic agents and countries affect one another.</td></tr>
                <tr><td>Intervention</td><td>Government involvement in markets to change outcomes, e.g. taxes, subsidies, regulation.</td></tr>
              </tbody>
            </table>
          </>
        ),
      },
    },
    {
      id: "scarcity",
      level: "both",
      title: { zh: "选择问题：生产要素与稀缺性", en: "The problem of choice: factors of production and scarcity" },
      body: {
        zh: (
          <>
            <Def term="Factors of production">
              用于生产商品和服务的资源，分为四类：土地、劳动、资本和企业家才能。
            </Def>
            <table>
              <thead>
                <tr>
                  <th>生产要素</th>
                  <th>含义与例子</th>
                  <th>要素报酬</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>土地 Land</td>
                  <td>一切自然资源：土地、矿产、森林、水、渔业资源</td>
                  <td>租金 Rent</td>
                </tr>
                <tr>
                  <td>劳动 Labour</td>
                  <td>人们投入生产的体力和脑力，包括技能与教育（人力资本）</td>
                  <td>工资 Wages</td>
                </tr>
                <tr>
                  <td>资本 Capital</td>
                  <td>用来生产其他商品的人造资源：机器、厂房、道路、电脑</td>
                  <td>利息 Interest</td>
                </tr>
                <tr>
                  <td>企业家才能 Entrepreneurship</td>
                  <td>组织其他三种要素、承担风险、创新的能力</td>
                  <td>利润 Profit</td>
                </tr>
              </tbody>
            </table>
            <Def term="Scarcity">
              相对于人类无限的需要和欲望，可用于满足它们的资源是有限的。
            </Def>
            <p>
              <strong>需要</strong>（needs）是生存所必需的，如食物、住所、医疗；<strong>欲望</strong>（wants）是想拥有但非必需的，如新手机、出国旅游。需要和欲望不断增长，资源却有限，这就是经济学的基本问题——稀缺性，它迫使人们做出<strong>选择</strong>。
            </p>
            <p>
              <strong>稀缺与可持续性：</strong>很多自然资源（化石燃料、淡水、渔业资源、热带雨林）一旦被过度使用就难以恢复。今天多用，后代可用的就少了。所以稀缺不只是「现在不够用」，还关系到资源能否被<strong>可持续地</strong>使用，这是第 2.8 节（公共资源）和第 4.7 节（可持续发展）的基础。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Factors of production">
              The resources used to produce goods and services, grouped into four types: land, labour, capital and entrepreneurship.
            </Def>
            <table>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Meaning and examples</th>
                  <th>Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Land</td>
                  <td>All natural resources: land, minerals, forests, water, fish stocks</td>
                  <td>Rent</td>
                </tr>
                <tr>
                  <td>Labour</td>
                  <td>The physical and mental effort people put into production, including skills and education (human capital)</td>
                  <td>Wages</td>
                </tr>
                <tr>
                  <td>Capital</td>
                  <td>Man-made resources used to produce other goods: machinery, factories, roads, computers</td>
                  <td>Interest</td>
                </tr>
                <tr>
                  <td>Entrepreneurship</td>
                  <td>The ability to organise the other three factors, take risks and innovate</td>
                  <td>Profit</td>
                </tr>
              </tbody>
            </table>
            <Def term="Scarcity">
              The situation in which resources are limited relative to unlimited human needs and wants.
            </Def>
            <p>
              <strong>Needs</strong> are essential for survival, such as food, shelter and healthcare; <strong>wants</strong> are things people desire but do not need, such as a new phone or a holiday abroad. Needs and wants keep growing while resources are limited. This is the basic economic problem of scarcity, and it forces <strong>choices</strong>.
            </p>
            <p>
              <strong>Scarcity and sustainability:</strong> many natural resources (fossil fuels, fresh water, fish stocks, rainforests) are hard to replace once overused. Using more today leaves less for future generations, so scarcity is also about whether resources are used <strong>sustainably</strong>. This links to common pool resources (2.8) and sustainable development (4.7).
            </p>
          </>
        ),
      },
    },
    {
      id: "opportunity-cost",
      level: "both",
      title: { zh: "机会成本与自由物品", en: "Opportunity cost and free goods" },
      body: {
        zh: (
          <>
            <Def term="Opportunity cost">
              做出一个选择时，所放弃的<strong>次优选择</strong>（next best alternative）的价值。
            </Def>
            <p>
              机会成本就是「选择的代价」。例如：你周六下午用来复习经济，放弃的次优选择是去打工赚 200 元，那么复习的机会成本就是这 200 元（而不是你所有没做的事情加总）。政府把预算用于修高铁，机会成本可能是本可以建的医院。
            </p>
            <Def term="Free good">
              不稀缺、因而没有机会成本的物品：使用它不需要放弃任何其他东西，例如空气、阳光、海水。
            </Def>
            <p>
              与之相对的是<strong>经济物品</strong>（economic goods）：它们稀缺，生产要占用资源，因此有机会成本。注意「免费」不等于自由物品：公立学校对学生免费，但建学校、请老师都占用了稀缺资源，所以它是经济物品。
            </p>
            <Callout title="评价（Evaluation）">
              <p>
                自由物品越来越少。城市里的清洁空气、干净的河水，过去被看作自由物品，如今因为污染而变得稀缺，人们需要花钱治理污染，这正说明了稀缺与可持续性之间的联系。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Opportunity cost">
              The value of the <strong>next best alternative</strong> forgone when a choice is made.
            </Def>
            <p>
              Opportunity cost is the cost of choice. If you spend Saturday afternoon revising economics and your next best alternative was a part-time shift paying ¥200, the opportunity cost of revising is that ¥200, not the sum of everything else you could have done. If a government spends its budget on a high-speed rail line, the opportunity cost may be the hospitals it could have built.
            </p>
            <Def term="Free good">
              A good that is not scarce and so has no opportunity cost: using it means giving up nothing else, e.g. air, sunlight, seawater.
            </Def>
            <p>
              In contrast, <strong>economic goods</strong> are scarce: producing them uses resources, so they have an opportunity cost. Free of charge is not the same as a free good. A state school is free for students, but building it and paying teachers uses scarce resources, so it is an economic good.
            </p>
            <Callout title="Evaluation">
              <p>
                Free goods are becoming rarer. Clean urban air and clean river water were once treated as free goods; pollution has made them scarce and society now pays to clean them up, which shows the link between scarcity and sustainability.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "economic-questions",
      level: "both",
      title: { zh: "基本经济问题与经济体制", en: "The basic economic questions and economic systems" },
      body: {
        zh: (
          <>
            <p>因为稀缺，每个社会都必须回答三个<strong>基本经济问题</strong>：</p>
            <ul>
              <li><strong>生产什么、生产多少？</strong>（What / how much to produce?）例如多造汽车还是多建学校。</li>
              <li><strong>如何生产？</strong>（How to produce?）用劳动密集还是资本密集的方法、用哪种技术。</li>
              <li><strong>为谁生产？</strong>（For whom to produce?）产出如何在社会成员之间分配。</li>
            </ul>
            <p>
              回答这些问题有两种基本方式：<strong>市场</strong>（由价格机制和私人决策决定）与<strong>政府干预</strong>（由政府计划、指令或调控决定）。不同经济体制的区别就在于两者的比重：
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>自由市场经济 Free market</th>
                  <th>计划经济 Planned</th>
                  <th>混合经济 Mixed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>资源归谁所有</td>
                  <td>私人所有</td>
                  <td>国家所有</td>
                  <td>私人与国家共存</td>
                </tr>
                <tr>
                  <td>谁做决定</td>
                  <td>消费者和企业，通过价格机制</td>
                  <td>中央计划部门</td>
                  <td>以市场为主，政府在部分领域干预</td>
                </tr>
                <tr>
                  <td>优点</td>
                  <td>效率高、激励创新、选择多</td>
                  <td>可保证基本品供应，收入较平均</td>
                  <td>兼顾效率与公平，纠正市场失灵</td>
                </tr>
                <tr>
                  <td>缺点</td>
                  <td>不平等加剧，公共品供给不足，外部性</td>
                  <td>缺乏激励，信息问题导致短缺或过剩，选择少</td>
                  <td>政府失灵的风险，税负与官僚成本</td>
                </tr>
                <tr>
                  <td>例子</td>
                  <td>现实中没有纯粹的，香港常被视为最接近的</td>
                  <td>朝鲜，以及前苏联</td>
                  <td>几乎所有国家：英国、德国、中国、美国</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                现实中的经济都是<strong>混合经济</strong>，区别在于市场和政府的比重。讨论时避免绝对化，例如「市场一定比政府好」，要说明在什么条件下、对谁更好。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Because of scarcity, every society must answer three <strong>basic economic questions</strong>:</p>
            <ul>
              <li><strong>What and how much to produce?</strong> e.g. more cars or more schools.</li>
              <li><strong>How to produce?</strong> Labour-intensive or capital-intensive methods, and which technology.</li>
              <li><strong>For whom to produce?</strong> How output is distributed among members of society.</li>
            </ul>
            <p>
              There are two basic ways of answering them: the <strong>market</strong> (the price mechanism and private decisions) and <strong>government intervention</strong> (planning, commands and regulation). Economic systems differ in the balance between the two:
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Free market economy</th>
                  <th>Planned economy</th>
                  <th>Mixed economy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ownership of resources</td>
                  <td>Private</td>
                  <td>State</td>
                  <td>Both private and state</td>
                </tr>
                <tr>
                  <td>Who decides</td>
                  <td>Consumers and firms, through the price mechanism</td>
                  <td>A central planning authority</td>
                  <td>Mainly the market, with government intervention in some areas</td>
                </tr>
                <tr>
                  <td>Strengths</td>
                  <td>Efficiency, incentives to innovate, consumer choice</td>
                  <td>Can guarantee basic goods and a more equal distribution</td>
                  <td>Balances efficiency and equity; can correct market failure</td>
                </tr>
                <tr>
                  <td>Weaknesses</td>
                  <td>Inequality, under-provision of public goods, externalities</td>
                  <td>Weak incentives, information problems cause shortages and surpluses, little choice</td>
                  <td>Risk of government failure, tax burden and bureaucracy</td>
                </tr>
                <tr>
                  <td>Examples</td>
                  <td>No pure case exists; Hong Kong is often cited as the closest</td>
                  <td>North Korea; formerly the Soviet Union</td>
                  <td>Almost all countries: the UK, Germany, China, the USA</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                All real economies are <strong>mixed</strong>; they differ in the balance between market and government. Avoid absolute claims such as markets are always better; explain under what conditions, and for whom.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "ppc",
      level: "both",
      title: { zh: "生产可能性曲线（PPC）模型", en: "The production possibilities curve (PPC) model" },
      body: {
        zh: (
          <>
            <Def term="Production possibilities curve (PPC)">
              表示一个经济体在资源和技术给定、且资源被充分有效利用时，所能生产的两种商品的<strong>最大组合</strong>的曲线。
            </Def>
            <p><strong>模型假设：</strong></p>
            <ul>
              <li>只生产两种商品（这里用资本品 capital goods 和消费品 consumer goods）。</li>
              <li>生产要素的数量和质量固定。</li>
              <li>技术水平固定。</li>
              <li>曲线上的点代表资源被充分且有效地利用。</li>
              <li>只考察一个特定时期。</li>
            </ul>
            <Choice caption="图 1 选择与机会成本：从 A 点移到 B 点，消费品从 C₁ 增加到 C₂，代价是资本品从 K₁ 减少到 K₂，减少的这部分就是机会成本。" />
            <p>PPC 能同时表示多个核心概念：</p>
            <table>
              <thead>
                <tr>
                  <th>特征</th>
                  <th>在图上的表现</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>稀缺 Scarcity</td><td>曲线以外的点（如 Z）以现有资源无法达到。</td></tr>
                <tr><td>选择 Choice</td><td>社会必须在曲线上（或内）选定一个组合。</td></tr>
                <tr><td>机会成本 Opportunity cost</td><td>沿曲线移动：多生产一种商品就必须少生产另一种。</td></tr>
                <tr><td>资源未充分利用 Unemployment of resources</td><td>曲线以内的点（如 U）：有失业或闲置资源。</td></tr>
                <tr><td>效率 Efficiency</td><td>曲线上的点都是生产效率（productive efficiency）点，没有浪费。</td></tr>
                <tr><td>实际增长 Actual growth</td><td>实际产出增加，例如从 U 移到 A（利用闲置资源）。</td></tr>
                <tr><td>生产可能性的增长 Growth in production possibilities</td><td>整条曲线向外移动（潜在增长）。</td></tr>
              </tbody>
            </table>
            <Points caption="图 2 曲线内、曲线上与曲线外的点：U 表示资源闲置（失业），A、B 表示资源被充分有效利用，Z 以现有资源无法达到；从 U 移到 A 是实际增长。" />
            <p>
              <strong>生产可能性的增长</strong>来自生产要素数量增加或质量提高（人口增长、移民、发现新资源、教育培训、投资于资本品）或技术进步。曲线也可以不对称地外移：例如只有消费品行业出现新技术时，曲线只在消费品轴上向外伸展。
            </p>
            <Growth caption="图 3 生产可能性的增长：资源增加或技术进步使 PPC₁ 外移到 PPC₂，原来达不到的组合变得可以达到。" />
            <Callout title="考试提示">
              <p>
                区分两种增长：<strong>实际增长</strong>是实际产出（实际 GDP）增加，在图上是点向外移动；<strong>生产可能性的增长</strong>是生产能力（潜在产出）增加，在图上是曲线外移。只有曲线外移、没有利用新增产能时，实际产出并不会增加。自然灾害、战争或资源耗竭则会让曲线内移。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Production possibilities curve (PPC)">
              A curve showing the <strong>maximum combinations</strong> of two goods an economy can produce with its given resources and technology, when all resources are fully and efficiently employed.
            </Def>
            <p><strong>Assumptions of the model:</strong></p>
            <ul>
              <li>Only two goods are produced (here capital goods and consumer goods).</li>
              <li>The quantity and quality of the factors of production are fixed.</li>
              <li>Technology is fixed.</li>
              <li>Points on the curve mean resources are fully and efficiently employed.</li>
              <li>The model refers to a given time period.</li>
            </ul>
            <Choice caption="Figure 1 Choice and opportunity cost: moving from A to B raises output of consumer goods from C₁ to C₂ at the cost of reducing capital goods from K₁ to K₂. That fall is the opportunity cost." />
            <p>The PPC illustrates several key concepts at once:</p>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>How it appears on the diagram</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Scarcity</td><td>Points outside the curve (such as Z) are unattainable with current resources.</td></tr>
                <tr><td>Choice</td><td>Society must pick one combination on or inside the curve.</td></tr>
                <tr><td>Opportunity cost</td><td>Moving along the curve: producing more of one good means producing less of the other.</td></tr>
                <tr><td>Unemployment of resources</td><td>Points inside the curve (such as U): there are unemployed or idle resources.</td></tr>
                <tr><td>Efficiency</td><td>Every point on the curve is productively efficient: nothing is wasted.</td></tr>
                <tr><td>Actual growth</td><td>An increase in real output, e.g. moving from U to A by using idle resources.</td></tr>
                <tr><td>Growth in production possibilities</td><td>An outward shift of the whole curve (potential growth).</td></tr>
              </tbody>
            </table>
            <Points caption="Figure 2 Points inside, on and outside the PPC: U shows unemployed resources, A and B show full and efficient use of resources, Z is unattainable. Moving from U to A is actual growth." />
            <p>
              <strong>Growth in production possibilities</strong> comes from more or better factors of production (population growth, immigration, new resource discoveries, education and training, investment in capital goods) or from improved technology. The shift can be uneven: new technology that only affects consumer goods stretches the curve outwards along the consumer goods axis only.
            </p>
            <Growth caption="Figure 3 Growth in production possibilities: more resources or better technology shift PPC₁ out to PPC₂, so combinations that were unattainable become attainable." />
            <Callout title="Exam tip">
              <p>
                Keep the two kinds of growth apart. <strong>Actual growth</strong> is an increase in real output (real GDP): a point moves outwards. <strong>Growth in production possibilities</strong> is an increase in productive capacity (potential output): the curve shifts out. If the new capacity is not used, actual output does not rise. Natural disasters, war or resource depletion shift the curve inwards.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "ppc-opportunity-cost",
      level: "both",
      title: { zh: "递增与不变的机会成本", en: "Increasing versus constant opportunity cost" },
      body: {
        zh: (
          <>
            <p>PPC 的形状反映了机会成本的变化：</p>
            <table>
              <thead>
                <tr>
                  <th>组合</th>
                  <th>A</th>
                  <th>B</th>
                  <th>C</th>
                  <th>D</th>
                  <th>E</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>消费品</td><td>0</td><td>20</td><td>40</td><td>60</td><td>80</td></tr>
                <tr><td>资本品</td><td>80</td><td>74</td><td>64</td><td>44</td><td>0</td></tr>
                <tr><td>每多 20 单位消费品的机会成本</td><td>–</td><td>6</td><td>10</td><td>20</td><td>44</td></tr>
              </tbody>
            </table>
            <IncreasingCost caption="图 4 机会成本递增：PPC 向外凸（凹向原点）。每多生产 20 单位消费品，需要放弃的资本品依次为 6、10、20、44 单位。" />
            <p>
              <strong>机会成本递增</strong>（increasing opportunity cost）的原因：生产要素<strong>不是</strong>同样适合生产两种商品。一开始转移的是最适合生产消费品的资源，代价小；越往后，转移的资源越不适合，就要放弃越来越多的资本品。这是最常见、也是考试默认的画法。
            </p>
            <ConstantCost caption="图 5 机会成本不变：PPC 是一条直线，每多生产 20 单位消费品，始终放弃 20 单位资本品。" />
            <p>
              <strong>机会成本不变</strong>（constant opportunity cost）：假如资源同样适合生产两种商品，可以完全相互替代，那么每多生产一单位一种商品，放弃的另一种商品数量始终相同，PPC 是一条直线。
            </p>
            <Callout title="例子：计算机会成本">
              <p>
                在图 4 中，从 C 移到 D，消费品增加 60 − 40 = 20 单位，资本品减少 64 − 44 = 20 单位。所以每 1 单位消费品的机会成本是 20 ÷ 20 = 1 单位资本品；而从 D 到 E 是 44 ÷ 20 = 2.2 单位，机会成本在上升。
              </p>
            </Callout>
            <Callout title="评价（Evaluation）">
              <p>
                选择更多资本品意味着今天少消费，但会增加未来的生产能力，让 PPC 在将来外移得更多。所以「今天的选择」影响「明天的生产可能性」。PPC 的局限：只有两种商品、不能说明哪一点对社会最好（这需要价值判断），也不能反映分配是否公平。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>The shape of the PPC shows what happens to opportunity cost:</p>
            <table>
              <thead>
                <tr>
                  <th>Combination</th>
                  <th>A</th>
                  <th>B</th>
                  <th>C</th>
                  <th>D</th>
                  <th>E</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Consumer goods</td><td>0</td><td>20</td><td>40</td><td>60</td><td>80</td></tr>
                <tr><td>Capital goods</td><td>80</td><td>74</td><td>64</td><td>44</td><td>0</td></tr>
                <tr><td>Opportunity cost of each extra 20 consumer goods</td><td>–</td><td>6</td><td>10</td><td>20</td><td>44</td></tr>
              </tbody>
            </table>
            <IncreasingCost caption="Figure 4 Increasing opportunity cost: the PPC is bowed out (concave to the origin). Each extra 20 units of consumer goods costs 6, then 10, 20 and 44 units of capital goods." />
            <p>
              <strong>Increasing opportunity cost</strong> arises because factors of production are <strong>not</strong> equally suited to producing both goods. The first resources moved are those best suited to consumer goods, so little is given up; later resources are less suited, so ever more capital goods must be sacrificed. This is the usual shape and the default in exams.
            </p>
            <ConstantCost caption="Figure 5 Constant opportunity cost: the PPC is a straight line. Every extra 20 units of consumer goods always costs 20 units of capital goods." />
            <p>
              <strong>Constant opportunity cost</strong>: if resources were equally suited to producing both goods (perfect substitutes), each extra unit of one good would always cost the same amount of the other, and the PPC would be a straight line.
            </p>
            <Callout title="Worked example: opportunity cost">
              <p>
                In Figure 4, moving from C to D raises consumer goods by 60 − 40 = 20 units and reduces capital goods by 64 − 44 = 20 units. The opportunity cost of one consumer good is 20 ÷ 20 = 1 capital good. From D to E it is 44 ÷ 20 = 2.2 capital goods, so the opportunity cost is rising.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <p>
                Choosing more capital goods means consuming less today but adds to future productive capacity, so the PPC shifts out further later. Today&apos;s choice shapes tomorrow&apos;s production possibilities. Limitations of the PPC: it has only two goods, it cannot tell us which point is best for society (that needs a value judgement), and it says nothing about whether the distribution of output is fair.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "circular-flow",
      level: "both",
      title: { zh: "经济模型：收入循环流动", en: "Modelling the economy: the circular flow of income" },
      body: {
        zh: (
          <>
            <Def term="Circular flow of income model">
              表示收入和支出如何在经济中各决策主体之间循环流动的模型，用来说明各主体之间的相互依存。
            </Def>
            <p>
              最简单的模型只有<strong>家庭</strong>（households）和<strong>企业</strong>（firms）：家庭向企业提供生产要素，换来要素收入（工资、租金、利息、利润）；家庭再用这些收入购买企业生产的商品和服务，钱又流回企业。与货币流反方向的是<strong>实物流</strong>：生产要素从家庭流向企业，商品和服务从企业流向家庭。
            </p>
            <p>加入另外三个部门后，就出现了<strong>漏出</strong>（leakages）和<strong>注入</strong>（injections）：</p>
            <table>
              <thead>
                <tr>
                  <th>部门</th>
                  <th>漏出（离开循环）</th>
                  <th>注入（进入循环）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>银行与金融部门</td>
                  <td>储蓄 Saving（S）</td>
                  <td>投资 Investment（I）：企业借款购买资本品</td>
                </tr>
                <tr>
                  <td>政府</td>
                  <td>税收 Taxes（T）</td>
                  <td>政府支出 Government spending（G）</td>
                </tr>
                <tr>
                  <td>外国部门（外国企业和家庭）</td>
                  <td>进口 Imports（M）：钱流向国外</td>
                  <td>出口 Exports（X）：外国人购买本国商品</td>
                </tr>
              </tbody>
            </table>
            <CircularFlow caption="图 6 收入循环流动：外圈是家庭与企业之间的收入（Y）和消费支出（C）；储蓄、税收和进口从循环中漏出，投资、政府支出和出口注入循环。" />
            <ul>
              <li>注入 &gt; 漏出：循环中的收入流变大，国民收入增加（经济扩张）。</li>
              <li>漏出 &gt; 注入：收入流变小，国民收入减少（经济收缩）。</li>
              <li>注入 = 漏出：国民收入保持稳定。</li>
            </ul>
            <Callout title="考试提示">
              <p>
                这个模型说明了相互依存：一个部门的支出就是另一个部门的收入。它是第 3 单元中国民收入核算（GDP）和总需求（AD = C + I + G + (X − M)）的基础。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Circular flow of income model">
              A model showing how income and spending flow between the decision-makers in an economy, illustrating their interdependence.
            </Def>
            <p>
              The simplest version has only <strong>households</strong> and <strong>firms</strong>. Households supply factors of production to firms and receive factor incomes (wages, rent, interest, profit); they spend that income on firms&apos; goods and services, so the money flows back to firms. Running the other way are the <strong>real flows</strong>: factors of production from households to firms, and goods and services from firms to households.
            </p>
            <p>Adding the other three sectors introduces <strong>leakages</strong> and <strong>injections</strong>:</p>
            <table>
              <thead>
                <tr>
                  <th>Sector</th>
                  <th>Leakage (leaves the flow)</th>
                  <th>Injection (enters the flow)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Banks and financial sector</td>
                  <td>Saving (S)</td>
                  <td>Investment (I): firms borrow to buy capital goods</td>
                </tr>
                <tr>
                  <td>Government</td>
                  <td>Taxes (T)</td>
                  <td>Government spending (G)</td>
                </tr>
                <tr>
                  <td>Foreign sector (foreign firms and households)</td>
                  <td>Imports (M): money flows abroad</td>
                  <td>Exports (X): foreigners buy domestic output</td>
                </tr>
              </tbody>
            </table>
            <CircularFlow caption="Figure 6 The circular flow of income: the outer loop shows incomes (Y) and consumption spending (C) between households and firms; saving, taxes and imports leak out of the flow, while investment, government spending and exports are injected into it." />
            <ul>
              <li>Injections &gt; leakages: the flow of income grows and national income rises (expansion).</li>
              <li>Leakages &gt; injections: the flow shrinks and national income falls (contraction).</li>
              <li>Injections = leakages: national income is stable.</li>
            </ul>
            <Callout title="Exam tip">
              <p>
                The model shows interdependence: one sector&apos;s spending is another sector&apos;s income. It is the basis for measuring national income (GDP) and for aggregate demand, AD = C + I + G + (X − M), in Unit 3.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 1.1 What is economics?",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 2.2 The Production Possibilities Frontier and Social Choices",
      href: "https://openstax.org/books/principles-economics-3e/pages/2-2-the-production-possibilities-frontier-and-social-choices",
    },
    {
      label: "OpenStax Principles of Economics 3e — 1.4 How To Organize Economies: An Overview of Economic Systems",
      href: "https://openstax.org/books/principles-economics-3e/pages/1-4-how-to-organize-economies-an-overview-of-economic-systems",
    },
    {
      label: "Economics Help — Factors of production",
      href: "https://www.economicshelp.org/blog/glossary/factors-of-production/",
    },
  ],
};

export default notes;
