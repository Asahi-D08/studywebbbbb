import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, atX, atY, intersect, shift, type Pt, type Seg } from "@/components/notes/Chart";

const X = "Real GDP";
const Y = "Average price level";

function vertical(x: number, top = 92): Seg {
  return [
    [x, 5],
    [x, top],
  ];
}

function XTick({ x, children }: { x: number; children: string }) {
  return (
    <Label at={[x, -6.5]} anchor="middle">
      {children}
    </Label>
  );
}

function FullEmployment({ x, label = "Yf" }: { x: number; label?: string }) {
  return (
    <>
      <Line
        points={[
          [x, 0],
          [x, 65],
        ]}
        tone="muted"
        dashed
      />
      <XTick x={x}>{label}</XTick>
    </>
  );
}

/* ---------- Aggregate demand ---------- */

function ADCurve({ caption }: { caption: ReactNode }) {
  const AD: Seg = [
    [10, 85],
    [85, 10],
  ];
  const a = atY(AD, 65);
  const b = atY(AD, 35);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={AD} label="AD" />
      <Guide at={a} x="Y₁" y="PL₁" />
      <Guide at={b} x="Y₂" y="PL₂" />
      <Arrow from={[a[0] + 3, a[1] - 3]} to={[b[0] - 1, b[1] + 1]} />
      <Dot at={a} label="A" />
      <Dot at={b} label="B" />
    </Chart>
  );
}

function ADShift({ caption }: { caption: ReactNode }) {
  const AD1: Seg = [
    [25, 80],
    [75, 30],
  ];
  const AD2 = shift(AD1, 18);
  const AD3 = shift(AD1, -18);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={AD3} label="AD₃" tone="muted" />
      <Line points={AD1} label="AD₁" />
      <Line points={AD2} label="AD₂" tone="alt" />
      <Arrow from={[atY(AD1, 70)[0] + 2, 70]} to={[atY(AD2, 70)[0] - 2, 70]} />
      <Arrow from={[atY(AD1, 42)[0] - 2, 42]} to={[atY(AD3, 42)[0] + 2, 42]} />
    </Chart>
  );
}

/* ---------- Short-run aggregate supply ---------- */

function SRASCurve({ caption }: { caption: ReactNode }) {
  const S: Seg = [
    [10, 15],
    [85, 85],
  ];
  const a = atY(S, 35);
  const b = atY(S, 62);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={S} label="SRAS" />
      <Guide at={a} x="Y₁" y="PL₁" />
      <Guide at={b} x="Y₂" y="PL₂" />
      <Dot at={a} label="A" labelOffset={[8, 10]} />
      <Dot at={b} label="B" labelOffset={[8, 10]} />
    </Chart>
  );
}

function SRASShift({ caption }: { caption: ReactNode }) {
  const S1: Seg = [
    [15, 10],
    [75, 80],
  ];
  const S2 = shift(S1, -15);
  const S3 = shift(S1, 15);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={S2} label="SRAS₂" tone="alt" />
      <Line points={S1} label="SRAS₁" />
      <Line points={S3} label="SRAS₃" tone="muted" />
      <Arrow from={[atY(S1, 55)[0] - 2, 55]} to={[atY(S2, 55)[0] + 2, 55]} />
      <Arrow from={[atY(S1, 30)[0] + 2, 30]} to={[atY(S3, 30)[0] - 2, 30]} />
    </Chart>
  );
}

/* ---------- Alternative views of AS ---------- */

function MonetaristLRAS({ caption }: { caption: ReactNode }) {
  const yf = 55;
  const AD1: Seg = [
    [20, 85],
    [85, 20],
  ];
  const AD2 = clip(shift(AD1, 15), 35, 92);
  const e1 = atX(AD1, yf);
  const e2 = atX(AD2, yf);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={vertical(yf)} label="LRAS" />
      <Line points={AD1} label="AD₁" />
      <Line points={AD2} label="AD₂" tone="alt" />
      <Guide at={e1} x="Yf" y="PL₁" />
      <Guide at={e2} y="PL₂" />
      <Dot at={e1} />
      <Dot at={e2} />
    </Chart>
  );
}

const keynes = (yf: number, flatEnd: number, level = 25): Pt[] => [
  [5, level],
  [flatEnd, level],
  [yf, level + 40],
  [yf, 92],
];

function KeynesianAS({ caption }: { caption: ReactNode }) {
  const K = keynes(75, 40);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={K} label="AS" />
      <Label at={[20, 29]} muted>
        I
      </Label>
      <Label at={[52, 47]} muted>
        II
      </Label>
      <Label at={[78, 78]} muted>
        III
      </Label>
      <FullEmployment x={75} />
    </Chart>
  );
}

function LRASShift({ caption }: { caption: ReactNode }) {
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={vertical(45)} label="LRAS₁" labelOffset={[-18, -6]} />
      <Line points={vertical(65)} label="LRAS₂" tone="alt" labelOffset={[-18, -6]} />
      <Arrow from={[47, 75]} to={[63, 75]} />
      <XTick x={45}>Y₁</XTick>
      <XTick x={65}>Y₂</XTick>
    </Chart>
  );
}

function KeynesianShift({ caption }: { caption: ReactNode }) {
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={keynes(55, 30)} label="AS₁" labelOffset={[-12, -6]} />
      <Line points={keynes(78, 53)} label="AS₂" tone="alt" labelOffset={[-12, -6]} />
      <Arrow from={[57, 80]} to={[76, 80]} />
      <FullEmployment x={55} label="Yf₁" />
      <FullEmployment x={78} label="Yf₂" />
    </Chart>
  );
}

/* ---------- Equilibrium ---------- */

function ShortRunEq({ caption }: { caption: ReactNode }) {
  const AD: Seg = [
    [10, 85],
    [85, 10],
  ];
  const S: Seg = [
    [10, 15],
    [85, 80],
  ];
  const e = intersect(AD, S);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={AD} label="AD" />
      <Line points={S} label="SRAS" />
      <Guide at={e} x="Y₁" y="PL₁" />
      <Dot at={e} />
    </Chart>
  );
}

const yf = 55;
const SRAS1: Seg = [
  [8, 12 + 0.8 * 8],
  [90, 12 + 0.8 * 90],
];
const AD0: Seg = [
  [25, 111 - 25],
  [92, 111 - 92],
];

function clip(seg: Seg, x0: number, x1: number): Seg {
  return [atX(seg, x0), atX(seg, x1)];
}

function LongRunEq({ caption }: { caption: ReactNode }) {
  const e = intersect(AD0, SRAS1);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={vertical(yf)} label="LRAS" />
      <Line points={AD0} label="AD" />
      <Line points={SRAS1} label="SRAS" />
      <Guide at={e} x="Yf" y="PL₁" />
      <Dot at={e} />
    </Chart>
  );
}

function RecessionaryGap({ caption }: { caption: ReactNode }) {
  const AD2 = shift(AD0, -20);
  const e1 = intersect(AD0, SRAS1);
  const e2 = intersect(AD2, SRAS1);
  const e3 = atX(AD2, yf);
  const S2 = clip(shift(SRAS1, yf - atY(SRAS1, e3[1])[0]), 30, 92);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={vertical(yf)} label="LRAS" />
      <Line points={AD0} label="AD₁" />
      <Line points={AD2} label="AD₂" tone="alt" />
      <Line points={SRAS1} label="SRAS₁" />
      <Line points={S2} label="SRAS₂" tone="alt" />
      <Arrow from={[atY(SRAS1, 30)[0] + 2, 30]} to={[atY(S2, 30)[0] - 2, 30]} />
      <Guide at={e1} y="PL₁" />
      <Guide at={e2} x="Y₂" y="PL₂" />
      <Guide at={e3} x="Yf" y="PL₃" />
      <Dot at={e1} label="A" />
      <Dot at={e2} label="B" labelOffset={[-16, -6]} />
      <Dot at={e3} label="C" labelOffset={[7, 14]} />
    </Chart>
  );
}

function InflationaryGap({ caption }: { caption: ReactNode }) {
  const AD2 = clip(shift(AD0, 20), 40, 92);
  const e1 = intersect(AD0, SRAS1);
  const e2 = intersect(AD2, SRAS1);
  const e3 = atX(AD2, yf);
  const S2 = clip(shift(SRAS1, yf - atY(SRAS1, e3[1])[0]), 5, 78);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={vertical(yf)} label="LRAS" />
      <Line points={AD0} label="AD₁" />
      <Line points={AD2} label="AD₂" tone="alt" />
      <Line points={SRAS1} label="SRAS₁" />
      <Line points={S2} label="SRAS₂" tone="alt" />
      <Arrow from={[atY(SRAS1, 40)[0] - 2, 40]} to={[atY(S2, 40)[0] + 2, 40]} />
      <Guide at={e1} y="PL₁" />
      <Guide at={e2} x="Y₂" y="PL₂" />
      <Guide at={e3} x="Yf" y="PL₃" />
      <Dot at={e1} label="A" labelOffset={[-16, 14]} />
      <Dot at={e2} label="B" />
      <Dot at={e3} label="C" labelOffset={[-16, -6]} />
    </Chart>
  );
}

function KeynesianGap({ caption }: { caption: ReactNode }) {
  const K = keynes(75, 40);
  const AD: Seg = [
    [5, 75],
    [32, 16],
  ];
  const e = atY(AD, 25);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={K} label="AS" />
      <Line points={AD} label="AD₁" />
      <Guide at={e} x="Y₁" y="PL₁" />
      <FullEmployment x={75} />
      <Dot at={e} />
      <Arrow from={[51, 9]} to={[e[0] + 1, 9]} />
      <Arrow from={[51, 9]} to={[74, 9]} />
      <Label at={[51, 13]} anchor="middle">
        Deflationary gap
      </Label>
    </Chart>
  );
}

function KeynesianSections({ caption }: { caption: ReactNode }) {
  const K = keynes(75, 40);
  const AD1: Seg = [
    [3, 43 - 1.2 * 3],
    [30, 43 - 1.2 * 30],
  ];
  const AD2 = shift(AD1, 15);
  const AD3: Seg = [
    [58, 162 - 1.2 * 58],
    [88, 162 - 1.2 * 88],
  ];
  const AD4 = clip(shift(AD3, 10), 68, 92);
  const a = atY(AD1, 25);
  const b = atY(AD2, 25);
  const c = atX(AD3, 75);
  const d = atX(AD4, 75);
  return (
    <Chart x={X} y={Y} caption={caption}>
      <Line points={K} label="AS" />
      <Line points={AD1} label="AD₁" />
      <Line points={AD2} label="AD₂" tone="alt" />
      <Line points={AD3} label="AD₃" />
      <Line points={AD4} label="AD₄" tone="alt" />
      <Guide at={a} x="Y₁" y="PL₁" />
      <Guide at={b} x="Y₂" />
      <Guide at={c} x="Yf" y="PL₂" />
      <Guide at={d} y="PL₃" />
      <Dot at={a} />
      <Dot at={b} />
      <Dot at={c} />
      <Dot at={d} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "本节用总需求（AD）和总供给（AS）模型解释经济活动为什么会波动。AD 由 C + I + G + (X − M) 组成，其决定因素变化会使 AD 曲线移动；短期总供给（SRAS）取决于生产成本。长期总供给有两种观点：货币主义/新古典学派认为 LRAS 在充分就业产出处垂直，经济会自动回到充分就业；凯恩斯学派的 AS 曲线有水平、上升和垂直三段，衰退缺口可能长期存在。",
    en: "This topic uses the aggregate demand (AD) and aggregate supply (AS) model to explain why economic activity fluctuates. AD is C + I + G + (X − M), and changes in its determinants shift the AD curve; short-run aggregate supply (SRAS) depends on production costs. There are two views of long-run supply: the monetarist/new classical LRAS is vertical at full employment output and the economy adjusts back to it automatically, while the Keynesian AS curve has flat, upward-sloping and vertical sections, so a recessionary gap can persist.",
  },
  sections: [
    {
      id: "aggregate-demand",
      level: "both",
      title: { zh: "总需求及其组成部分", en: "Aggregate demand and its components" },
      body: {
        zh: (
          <>
            <Def term="Aggregate demand (AD)">
              在一定时期内、各个平均价格水平下，经济中所有部门计划购买的本国最终商品和服务的总量（实际 GDP）。
            </Def>
            <Formula>AD = C + I + G + (X − M)</Formula>
            <table>
              <thead>
                <tr>
                  <th>组成部分</th>
                  <th>含义</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>消费 C（consumption）</td>
                  <td>家庭对商品和服务的支出，通常是 AD 中最大的部分。</td>
                </tr>
                <tr>
                  <td>投资 I（investment）</td>
                  <td>企业对资本品（机器、厂房、技术）的支出，也包括新建住房。</td>
                </tr>
                <tr>
                  <td>政府支出 G（government spending）</td>
                  <td>政府对商品和服务的支出，如公立学校、医院、基础设施；不包括养老金等转移支付。</td>
                </tr>
                <tr>
                  <td>净出口 X − M（net exports）</td>
                  <td>外国对本国产品的支出（出口）减去本国对外国产品的支出（进口）。</td>
                </tr>
              </tbody>
            </table>
            <p>
              AD 曲线<strong>向右下方倾斜</strong>：平均价格水平下降时，实际财富（货币的购买力）上升，消费增加（财富效应）；利率往往下降，消费和投资增加（利率效应）；本国产品相对外国更便宜，净出口增加（国际贸易效应）。
            </p>
            <ADCurve caption="图 1 AD 曲线：平均价格水平从 PL₁ 降到 PL₂，AD 的实际 GDP 从 Y₁ 增加到 Y₂，沿曲线从 A 移动到 B。" />
          </>
        ),
        en: (
          <>
            <Def term="Aggregate demand (AD)">
              The total amount of domestic final goods and services (real GDP) that all sectors of the economy plan to buy at each average price level over a given period.
            </Def>
            <Formula>AD = C + I + G + (X − M)</Formula>
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consumption (C)</td>
                  <td>Household spending on goods and services; usually the largest part of AD.</td>
                </tr>
                <tr>
                  <td>Investment (I)</td>
                  <td>Firms&apos; spending on capital goods (machinery, buildings, technology), plus new housing.</td>
                </tr>
                <tr>
                  <td>Government spending (G)</td>
                  <td>Government spending on goods and services such as state schools, hospitals and infrastructure; excludes transfer payments like pensions.</td>
                </tr>
                <tr>
                  <td>Net exports (X − M)</td>
                  <td>Foreign spending on domestic output (exports) minus domestic spending on foreign output (imports).</td>
                </tr>
              </tbody>
            </table>
            <p>
              The AD curve <strong>slopes downwards</strong>: when the average price level falls, real wealth (the purchasing power of money) rises, so consumption rises (wealth effect); interest rates tend to fall, raising consumption and investment (interest rate effect); and domestic goods become cheaper than foreign goods, so net exports rise (international trade effect).
            </p>
            <ADCurve caption="Figure 1 The AD curve: a fall in the average price level from PL₁ to PL₂ raises the real GDP demanded from Y₁ to Y₂, a movement along the curve from A to B." />
          </>
        ),
      },
    },
    {
      id: "ad-determinants",
      level: "both",
      title: { zh: "AD 各组成部分的决定因素与 AD 曲线的移动", en: "Determinants of the AD components and shifts of AD" },
      body: {
        zh: (
          <>
            <p>平均价格水平以外的因素变化，会改变某个组成部分，使整条 AD 曲线移动。</p>
            <table>
              <thead>
                <tr>
                  <th>组成部分</th>
                  <th>决定因素（以使 AD 右移为例）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>C</td>
                  <td>
                    消费者信心上升；利率下降（借款更便宜、储蓄回报更低）；财富增加（房价、股价上涨）；所得税下调（可支配收入增加）；家庭负债水平较低；预期未来物价上涨（提前购买）。
                  </td>
                </tr>
                <tr>
                  <td>I</td>
                  <td>利率下降；企业信心上升；技术进步带来新的投资机会；企业税（如企业所得税）下调；企业负债水平较低。</td>
                </tr>
                <tr>
                  <td>G</td>
                  <td>政治与经济上的优先事项，例如选举前增加支出、衰退时扩大基础设施建设、加强医疗或国防。</td>
                </tr>
                <tr>
                  <td>X − M</td>
                  <td>贸易伙伴收入增加（对本国出口需求增加）；本币贬值（出口更便宜、进口更贵）；贸易政策，如贸易伙伴降低关税或本国限制进口。</td>
                </tr>
              </tbody>
            </table>
            <ADShift caption="图 2 AD 曲线的移动：任一组成部分增加（如消费者信心上升）使 AD₁ 右移到 AD₂；任一组成部分减少（如利率上升）使 AD₁ 左移到 AD₃。" />
            <Callout title="考试提示">
              <p>
                平均价格水平变化只引起<strong>沿</strong> AD 曲线移动；只有决定因素变化才使曲线<strong>平移</strong>。分析时要先说清楚哪个组成部分发生了变化，以及为什么。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>A change in anything other than the average price level changes one of the components and shifts the whole AD curve.</p>
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Determinants (changes that shift AD right)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>C</td>
                  <td>
                    Higher consumer confidence; lower interest rates (cheaper borrowing, lower return on saving); higher wealth (rising house or share prices); lower income taxes (more disposable income); low household indebtedness; expectations that prices will rise (buying now).
                  </td>
                </tr>
                <tr>
                  <td>I</td>
                  <td>Lower interest rates; higher business confidence; new technology creating investment opportunities; lower business taxes (e.g. corporation tax); low corporate indebtedness.</td>
                </tr>
                <tr>
                  <td>G</td>
                  <td>Political and economic priorities, e.g. extra spending before an election, more infrastructure in a recession, more on healthcare or defence.</td>
                </tr>
                <tr>
                  <td>X − M</td>
                  <td>Higher incomes of trading partners (more demand for exports); a depreciation of the currency (exports cheaper, imports dearer); trade policies, e.g. trading partners cutting tariffs or domestic import restrictions.</td>
                </tr>
              </tbody>
            </table>
            <ADShift caption="Figure 2 Shifts of the AD curve: a rise in any component (e.g. higher consumer confidence) shifts AD₁ right to AD₂; a fall in any component (e.g. higher interest rates) shifts AD₁ left to AD₃." />
            <Callout title="Exam tip">
              <p>
                A change in the average price level only causes a movement <strong>along</strong> AD; only a change in a determinant <strong>shifts</strong> the curve. Always say which component changes and why.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "sras",
      level: "both",
      title: { zh: "短期总供给（SRAS）", en: "Short-run aggregate supply (SRAS)" },
      body: {
        zh: (
          <>
            <Def term="Short-run aggregate supply (SRAS)">
              在短期内、各个平均价格水平下，经济中所有企业计划生产的实际产出总量。短期指工资等生产要素价格<strong>固定不变</strong>的时期。
            </Def>
            <p>
              SRAS <strong>向右上方倾斜</strong>：短期内工资等成本固定，平均价格水平上升时，企业的销售价格上涨而成本不变，利润增加，于是增加产量。
            </p>
            <SRASCurve caption="图 3 SRAS 曲线：平均价格水平从 PL₁ 升到 PL₂，企业计划的产出从 Y₁ 增加到 Y₂。" />
            <p>
              <strong>SRAS 的决定因素</strong>（使曲线移动）：
            </p>
            <ul>
              <li><strong>生产要素成本</strong>：工资、原材料和能源价格（如石油）、进口投入品价格（受汇率影响）。成本上升使 SRAS 左移；成本下降使 SRAS 右移。</li>
              <li><strong>间接税</strong>：增加间接税（或减少补贴）提高企业成本，SRAS 左移；减税或补贴使 SRAS 右移。</li>
            </ul>
            <SRASShift caption="图 4 SRAS 曲线的移动：成本上升（如油价上涨）或间接税增加使 SRAS₁ 左移到 SRAS₂；成本下降或补贴使 SRAS₁ 右移到 SRAS₃。" />
            <Callout title="例子">
              <p>2022 年俄乌冲突后，欧洲天然气和电力价格飙升，企业生产成本大幅上升，SRAS 左移，导致通胀上升、产出增长放缓。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Short-run aggregate supply (SRAS)">
              The total real output that all firms in the economy plan to produce at each average price level in the short run, the period in which wages and other factor prices are <strong>fixed</strong>.
            </Def>
            <p>
              SRAS <strong>slopes upwards</strong>: in the short run wages and other costs are fixed, so when the average price level rises, firms&apos; selling prices rise while costs do not. Profits rise and firms produce more.
            </p>
            <SRASCurve caption="Figure 3 The SRAS curve: a rise in the average price level from PL₁ to PL₂ raises planned output from Y₁ to Y₂." />
            <p>
              <strong>Determinants of SRAS</strong> (which shift the curve):
            </p>
            <ul>
              <li><strong>Costs of factors of production</strong>: wages, prices of raw materials and energy (e.g. oil), and prices of imported inputs (affected by the exchange rate). Higher costs shift SRAS left; lower costs shift it right.</li>
              <li><strong>Indirect taxes</strong>: higher indirect taxes (or lower subsidies) raise firms&apos; costs and shift SRAS left; tax cuts or subsidies shift it right.</li>
            </ul>
            <SRASShift caption="Figure 4 Shifts of the SRAS curve: higher costs (e.g. a rise in oil prices) or higher indirect taxes shift SRAS₁ left to SRAS₂; lower costs or subsidies shift SRAS₁ right to SRAS₃." />
            <Callout title="Real-world example">
              <p>After Russia&apos;s invasion of Ukraine in 2022, gas and electricity prices in Europe soared. Firms&apos; costs jumped, SRAS shifted left, and inflation rose while output growth slowed.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "alternative-views",
      level: "both",
      title: { zh: "总供给的两种观点与产出缺口", en: "Alternative views of aggregate supply and output gaps" },
      body: {
        zh: (
          <>
            <p>
              <strong>货币主义/新古典学派</strong>（monetarist/new classical）认为：长期中工资和价格完全灵活，经济总会回到充分就业。长期总供给（LRAS）取决于生产要素的数量和质量以及技术，与平均价格水平无关，所以 LRAS 是在充分就业产出 Yf（潜在产出）处的一条<strong>垂直线</strong>。
            </p>
            <MonetaristLRAS caption="图 5 货币主义/新古典学派的 LRAS：LRAS 在 Yf 处垂直。长期中 AD 从 AD₁ 增加到 AD₂ 只会使平均价格水平从 PL₁ 升到 PL₂，实际产出仍为 Yf。" />
            <p>
              <strong>凯恩斯学派</strong>（Keynesian）认为：工资和价格<strong>向下刚性</strong>（不容易下降），经济可能长期处于充分就业以下。凯恩斯 AS 曲线分三段：
            </p>
            <ul>
              <li><strong>第 I 段（水平）</strong>：经济中有大量闲置资源和失业，企业不需要提高成本就能增加产量，所以产出增加而价格水平不变。</li>
              <li><strong>第 II 段（上升）</strong>：接近充分就业，一些行业出现瓶颈（bottlenecks），技能劳动和原材料变得稀缺，成本上升，产出增加伴随价格上涨。</li>
              <li><strong>第 III 段（垂直）</strong>：所有资源都已充分利用，达到充分就业产出 Yf，产量无法再增加，只有价格上涨。</li>
            </ul>
            <KeynesianAS caption="图 6 凯恩斯 AS 曲线：第 I 段水平（大量闲置资源），第 II 段向上倾斜（瓶颈导致成本上升），第 III 段在充分就业产出 Yf 处垂直。" />
            <Def term="Deflationary (recessionary) gap">
              实际 GDP 低于充分就业（潜在）产出的情况，即负产出缺口，此时失业率高于自然失业率。
            </Def>
            <Def term="Inflationary gap">
              实际 GDP 高于充分就业（潜在）产出的情况，即正产出缺口，资源被过度使用，物价面临上涨压力。
            </Def>
          </>
        ),
        en: (
          <>
            <p>
              The <strong>monetarist/new classical</strong> view: in the long run wages and prices are fully flexible, so the economy always returns to full employment. Long-run aggregate supply (LRAS) depends on the quantity and quality of factors of production and on technology, not on the price level, so LRAS is a <strong>vertical line</strong> at the full employment level of output Yf (potential output).
            </p>
            <MonetaristLRAS caption="Figure 5 The monetarist/new classical LRAS, vertical at Yf. In the long run, a rise in AD from AD₁ to AD₂ only raises the average price level from PL₁ to PL₂; real output stays at Yf." />
            <p>
              The <strong>Keynesian</strong> view: wages and prices are <strong>sticky downwards</strong>, so the economy can stay below full employment for a long time. The Keynesian AS curve has three sections:
            </p>
            <ul>
              <li><strong>Section I (flat)</strong>: there are many unemployed resources, so firms can raise output without higher costs; output rises with no change in the price level.</li>
              <li><strong>Section II (upward-sloping)</strong>: as full employment nears, bottlenecks appear: skilled labour and raw materials become scarce, costs rise, and more output comes with higher prices.</li>
              <li><strong>Section III (vertical)</strong>: all resources are fully employed at the full employment level of output Yf; output cannot rise further, only prices.</li>
            </ul>
            <KeynesianAS caption="Figure 6 The Keynesian AS curve: Section I is flat (many unemployed resources), Section II slopes upwards (bottlenecks push up costs), and Section III is vertical at the full employment output Yf." />
            <Def term="Deflationary (recessionary) gap">
              A situation where real GDP is below the full employment (potential) level of output: a negative output gap, with unemployment above the natural rate.
            </Def>
            <Def term="Inflationary gap">
              A situation where real GDP is above the full employment (potential) level of output: a positive output gap, with resources over-used and upward pressure on prices.
            </Def>
          </>
        ),
      },
    },
    {
      id: "long-run-shifts",
      level: "both",
      title: { zh: "LRAS 与凯恩斯 AS 的长期移动", en: "Shifts of LRAS and the Keynesian AS in the long run" },
      body: {
        zh: (
          <>
            <p>经济生产能力的提高会使货币主义的 LRAS 右移，或使凯恩斯 AS 曲线（包括垂直段）整体右移。原因有：</p>
            <table>
              <thead>
                <tr>
                  <th>因素</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>生产要素的数量和/或质量</td>
                  <td>劳动力增加（人口增长、移民、女性参与率提高）；教育培训提高人力资本；资本存量增加；发现新的自然资源。</td>
                </tr>
                <tr>
                  <td>技术进步</td>
                  <td>自动化、人工智能、新的生产方法，使同样的投入生产更多产出。</td>
                </tr>
                <tr>
                  <td>效率提高</td>
                  <td>更好的管理、更激烈的竞争、更灵活的劳动市场，让现有资源得到更充分的利用。</td>
                </tr>
                <tr>
                  <td>制度变化</td>
                  <td>保护产权、法治、减少腐败、更完善的银行和金融体系、减少官僚手续。</td>
                </tr>
              </tbody>
            </table>
            <LRASShift caption="图 7 LRAS 右移：生产要素增加、技术进步、效率提高或制度改善使 LRAS₁ 移到 LRAS₂，潜在产出从 Y₁ 增加到 Y₂。" />
            <KeynesianShift caption="图 8 凯恩斯 AS 的长期移动：生产能力提高使 AS₁ 移到 AS₂，充分就业产出从 Yf₁ 增加到 Yf₂。" />
            <p>反之，自然灾害、战争、人口老龄化导致的劳动力减少等会使这些曲线左移。</p>
          </>
        ),
        en: (
          <>
            <p>An increase in the economy&apos;s productive capacity shifts the monetarist LRAS right, or shifts the whole Keynesian AS curve (including its vertical section) right. The causes are:</p>
            <table>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quantity and/or quality of factors of production</td>
                  <td>A larger labour force (population growth, immigration, more women in work); education and training raising human capital; a larger capital stock; discovery of natural resources.</td>
                </tr>
                <tr>
                  <td>Improvements in technology</td>
                  <td>Automation, artificial intelligence and new production methods get more output from the same inputs.</td>
                </tr>
                <tr>
                  <td>Increases in efficiency</td>
                  <td>Better management, stronger competition and more flexible labour markets make fuller use of existing resources.</td>
                </tr>
                <tr>
                  <td>Changes in institutions</td>
                  <td>Protection of property rights, the rule of law, less corruption, a sounder banking and financial system, less red tape.</td>
                </tr>
              </tbody>
            </table>
            <LRASShift caption="Figure 7 A rightward shift of LRAS: more factors of production, better technology, higher efficiency or better institutions shift LRAS₁ to LRAS₂, raising potential output from Y₁ to Y₂." />
            <KeynesianShift caption="Figure 8 A long-term shift of the Keynesian AS: higher productive capacity shifts AS₁ to AS₂, raising full employment output from Yf₁ to Yf₂." />
            <p>Conversely, natural disasters, war or a shrinking labour force due to an ageing population shift these curves left.</p>
          </>
        ),
      },
    },
    {
      id: "monetarist-equilibrium",
      level: "both",
      title: { zh: "宏观经济均衡：货币主义/新古典模型", en: "Macroeconomic equilibrium: the monetarist/new classical model" },
      body: {
        zh: (
          <>
            <p>
              <strong>短期均衡</strong>：AD 与 SRAS 相交处，决定平均价格水平 PL₁ 和实际 GDP Y₁。
            </p>
            <ShortRunEq caption="图 9 短期宏观经济均衡：AD 与 SRAS 相交，平均价格水平为 PL₁，实际 GDP 为 Y₁。" />
            <p>
              <strong>长期均衡</strong>：AD、SRAS 和 LRAS 相交于同一点，产出等于充分就业产出 Yf（潜在产出）。此时的失业率等于<strong>自然失业率</strong>（natural rate of unemployment，包括结构性、摩擦性和季节性失业），并不是零失业。
            </p>
            <LongRunEq caption="图 10 长期均衡：AD 与 SRAS 在 LRAS 上相交，实际 GDP 等于充分就业产出 Yf。" />
            <p>
              <strong>自动调整</strong>：如果 AD 下降，短期均衡移到 Yf 以下，出现衰退缺口，失业高于自然失业率。货币主义者认为，失业会压低工资（以及其他要素价格），企业成本下降，SRAS 逐渐右移，直到经济回到 Yf，只是价格水平更低。
            </p>
            <RecessionaryGap caption="图 11 衰退缺口与自动调整：AD₁ 降到 AD₂，经济从 A 移到 B，产出 Y₂ 低于 Yf，形成衰退缺口。工资下降使 SRAS₁ 右移到 SRAS₂，经济在 C 点回到 Yf，价格水平降到 PL₃。" />
            <p>
              反之，如果 AD 增加使产出超过 Yf，出现通胀缺口，劳动短缺推高工资，SRAS 左移，经济回到 Yf，但价格水平更高。
            </p>
            <InflationaryGap caption="图 12 通胀缺口与自动调整：AD₁ 增加到 AD₂，经济从 A 移到 B，产出 Y₂ 高于 Yf，形成通胀缺口。工资上升使 SRAS₁ 左移到 SRAS₂，经济在 C 点回到 Yf，价格水平升到 PL₃。" />
            <Callout title="画图要点">
              <ul>
                <li>纵轴写 Average price level，横轴写 Real GDP，不要写 Price 和 Quantity。</li>
                <li>LRAS 垂直于 Yf；长期均衡点必须同时在 AD、SRAS 和 LRAS 上。</li>
                <li>用箭头标出曲线移动的方向，并用字母标出调整的顺序（A → B → C）。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Short-run equilibrium</strong> is where AD meets SRAS, giving the average price level PL₁ and real GDP Y₁.
            </p>
            <ShortRunEq caption="Figure 9 Short-run macroeconomic equilibrium: AD meets SRAS at average price level PL₁ and real GDP Y₁." />
            <p>
              <strong>Long-run equilibrium</strong> is where AD, SRAS and LRAS all meet, so output equals the full employment level Yf (potential output). Unemployment then equals the <strong>natural rate of unemployment</strong> (structural, frictional and seasonal unemployment), not zero.
            </p>
            <LongRunEq caption="Figure 10 Long-run equilibrium: AD and SRAS intersect on LRAS, so real GDP equals full employment output Yf." />
            <p>
              <strong>Automatic adjustment</strong>: if AD falls, short-run equilibrium moves below Yf, creating a recessionary gap with unemployment above the natural rate. Monetarists argue that unemployment pushes down wages (and other factor prices), cutting firms&apos; costs, so SRAS gradually shifts right until the economy returns to Yf at a lower price level.
            </p>
            <RecessionaryGap caption="Figure 11 A recessionary gap and automatic adjustment: AD₁ falls to AD₂ and the economy moves from A to B, with output Y₂ below Yf. Falling wages shift SRAS₁ right to SRAS₂, and the economy returns to Yf at C with a lower price level PL₃." />
            <p>
              Conversely, if higher AD pushes output above Yf, there is an inflationary gap. Labour shortages push up wages, SRAS shifts left and the economy returns to Yf at a higher price level.
            </p>
            <InflationaryGap caption="Figure 12 An inflationary gap and automatic adjustment: AD₁ rises to AD₂ and the economy moves from A to B, with output Y₂ above Yf. Rising wages shift SRAS₁ left to SRAS₂, and the economy returns to Yf at C with a higher price level PL₃." />
            <Callout title="Drawing checklist">
              <ul>
                <li>Label the axes Average price level and Real GDP, not Price and Quantity.</li>
                <li>Draw LRAS vertical at Yf; the long-run equilibrium must lie on AD, SRAS and LRAS.</li>
                <li>Use arrows to show the direction of each shift and letters for the order of adjustment (A → B → C).</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "keynesian-equilibrium",
      level: "both",
      title: { zh: "宏观经济均衡：凯恩斯模型", en: "Macroeconomic equilibrium: the Keynesian model" },
      body: {
        zh: (
          <>
            <p>
              在凯恩斯模型中，均衡在 AD 与 AS 曲线的交点，但这个产出<strong>不一定等于充分就业产出</strong>。如果 AD 很低，与 AS 交于水平段，经济会停留在 Y₁，远低于 Yf，形成<strong>持续的衰退缺口</strong>。
            </p>
            <KeynesianGap caption="图 13 凯恩斯模型中的衰退缺口：AD₁ 与 AS 交于水平段，均衡产出 Y₁ 低于充分就业产出 Yf。由于工资向下刚性，这个缺口可能长期存在。" />
            <p>为什么缺口不会自动消失？</p>
            <ul>
              <li>工资<strong>向下刚性</strong>：劳动合同、工会、最低工资法，以及工人抵制减薪，使工资很难下降，SRAS 不会自动右移。</li>
              <li>即使工资下降，工人收入减少也会进一步压低消费和 AD。</li>
              <li>衰退时企业和消费者信心低迷，投资和消费不足，AD 维持在低水平。</li>
            </ul>
            <p>AD 变化的影响取决于经济处在 AS 的哪一段：</p>
            <KeynesianSections caption="图 14 AD 增加的影响取决于所在区段：在水平段，AD₁ 增加到 AD₂ 使产出从 Y₁ 增加到 Y₂，价格水平不变（PL₁）；在垂直段，AD₃ 增加到 AD₄ 只使价格水平从 PL₂ 升到 PL₃，产出仍为 Yf。" />
          </>
        ),
        en: (
          <>
            <p>
              In the Keynesian model equilibrium is where AD meets AS, but that output <strong>need not equal full employment output</strong>. If AD is low and meets AS in the flat section, the economy stays at Y₁, well below Yf: a <strong>persistent recessionary gap</strong>.
            </p>
            <KeynesianGap caption="Figure 13 A recessionary gap in the Keynesian model: AD₁ meets AS in the flat section, so equilibrium output Y₁ is below full employment output Yf. Because wages are sticky downwards, the gap can persist." />
            <p>Why doesn&apos;t the gap close by itself?</p>
            <ul>
              <li>Wages are <strong>sticky downwards</strong>: labour contracts, trade unions, minimum wage laws and workers&apos; resistance to pay cuts stop wages falling, so SRAS does not shift right automatically.</li>
              <li>Even if wages did fall, lower incomes would cut consumption and AD further.</li>
              <li>In a recession business and consumer confidence is low, so investment and consumption stay weak and AD remains low.</li>
            </ul>
            <p>The effect of a change in AD depends on which section of AS the economy is in:</p>
            <KeynesianSections caption="Figure 14 The effect of higher AD depends on the section: in the flat section, AD₁ to AD₂ raises output from Y₁ to Y₂ with no change in the price level (PL₁); in the vertical section, AD₃ to AD₄ only raises the price level from PL₂ to PL₃, with output still at Yf." />
          </>
        ),
      },
    },
    {
      id: "assumptions",
      level: "both",
      title: { zh: "两种模型的假设与政策含义", en: "Assumptions and implications of the two models" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>货币主义/新古典</th>
                  <th>凯恩斯</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>假设</td>
                  <td>市场运行良好，工资和价格灵活，人们理性预期。</td>
                  <td>工资和价格向下刚性；AD 不足是衰退的主要原因；信心（「动物精神」）影响很大。</td>
                </tr>
                <tr>
                  <td>长期结果</td>
                  <td>经济会自动回到充分就业产出 Yf。</td>
                  <td>经济可能长期停留在低于 Yf 的均衡；正如凯恩斯所说：「长期来看，我们都死了。」</td>
                </tr>
                <tr>
                  <td>政策含义</td>
                  <td>政府不必用需求管理来对抗衰退，长期中刺激 AD 只会造成通胀；应控制通胀，并用供给侧政策提高 LRAS。</td>
                  <td>政府应积极干预，尤其用扩张性财政政策增加 AD，消除衰退缺口；在水平段增加 AD 不会引起通胀。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <ul>
                <li>两种模型并不完全对立：许多经济学家认为，短期内凯恩斯观点更贴近现实（工资确实有刚性），长期内货币主义观点更有解释力（AD 刺激过度会导致通胀）。</li>
                <li>自动调整可能需要很长时间，其间失业和产出损失的代价很高，这为政府干预提供了理由。2008 年金融危机和 2020 年新冠疫情期间，各国都推出了大规模财政刺激。</li>
                <li>但 20 世纪 70 年代的滞胀（高通胀与高失业并存）表明单靠需求管理无法解决供给冲击，削弱了传统凯恩斯主义；2021–2022 年的大规模刺激也被认为加剧了通胀。</li>
                <li>选择政策时要考虑经济所处的位置：离 Yf 越远，扩张 AD 的通胀风险越小。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Monetarist/new classical</th>
                  <th>Keynesian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Assumptions</td>
                  <td>Markets work well, wages and prices are flexible, people form rational expectations.</td>
                  <td>Wages and prices are sticky downwards; too little AD is the main cause of recessions; confidence (animal spirits) matters a lot.</td>
                </tr>
                <tr>
                  <td>Long-run outcome</td>
                  <td>The economy returns automatically to full employment output Yf.</td>
                  <td>The economy can stay in equilibrium below Yf for a long time; as Keynes put it, in the long run we are all dead.</td>
                </tr>
                <tr>
                  <td>Policy implications</td>
                  <td>No need for demand management to fight recessions; in the long run boosting AD only causes inflation. Governments should control inflation and use supply-side policies to raise LRAS.</td>
                  <td>Governments should intervene actively, especially with expansionary fiscal policy, to raise AD and close a recessionary gap; in the flat section higher AD does not cause inflation.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <ul>
                <li>The models are not entirely opposed: many economists see the Keynesian view as more realistic in the short run (wages really are sticky) and the monetarist view as more convincing in the long run (too much AD stimulus does cause inflation).</li>
                <li>Automatic adjustment may take a long time, and the unemployment and lost output in the meantime are costly, which justifies intervention. Governments launched huge fiscal stimulus after the 2008 financial crisis and during the 2020 pandemic.</li>
                <li>But the stagflation of the 1970s (high inflation with high unemployment) showed demand management cannot fix supply shocks, weakening traditional Keynesianism; the large stimulus of 2021–2022 is also widely thought to have added to inflation.</li>
                <li>Policy choice depends on where the economy is: the further below Yf, the smaller the inflation risk of raising AD.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 3.2 Aggregate demand and aggregate supply",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 24.2 Building a model of aggregate demand and aggregate supply",
      href: "https://openstax.org/books/principles-economics-3e/pages/24-2-building-a-model-of-aggregate-demand-and-aggregate-supply",
    },
    {
      label: "OpenStax Principles of Economics 3e — 24.6 Keynes' law and Say's law in the AD/AS model",
      href: "https://openstax.org/books/principles-economics-3e/pages/24-6-keynes-law-and-says-law-in-the-ad-as-model",
    },
    {
      label: "OpenStax Principles of Economics 3e — 24.5 How the AD/AS model incorporates growth, unemployment, and inflation",
      href: "https://openstax.org/books/principles-economics-3e/pages/24-5-how-the-ad-as-model-incorporates-growth-unemployment-and-inflation",
    },
  ],
};

export default notes;
