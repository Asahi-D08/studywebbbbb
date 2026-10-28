import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac, HL } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, atX, atY, intersect, shift, type Pt, type Seg } from "@/components/notes/Chart";

type Cap = { caption: ReactNode };

const clip = (seg: Seg, x0: number, x1: number): Seg => [atX(seg, x0), atX(seg, x1)];

const ppc = (r: number): Pt[] =>
  [90, 75, 60, 45, 30, 15, 0].map((d) => {
    const t = (d * Math.PI) / 180;
    return [r * Math.cos(t), r * Math.sin(t)];
  });

function PpcGrowth({ caption }: Cap) {
  const b = ppc(60)[3];
  return (
    <Chart x="Consumer goods" y="Capital goods" caption={caption}>
      <Line points={ppc(60)} smooth label="PPC₁" />
      <Line points={ppc(80)} smooth label="PPC₂" tone="alt" />
      <Arrow from={[30, 30]} to={[b[0] - 2, b[1] - 2]} />
      <Arrow from={[21.3, 58.5]} to={[26.6, 73]} />
      <Dot at={[28, 28]} label="A" labelOffset={[-14, 4]} />
      <Dot at={b} label="B" />
    </Chart>
  );
}

// Keynesian AS: horizontal, then rising ever more steeply until it is vertical at Yf.
const YF = 69.2;
const K = (x: number) => (x <= 30 ? 20 : 20 + (5 * (x - 30)) / (72 - x));
const KAS: Pt[] = [30, 40, 48, 54, 59, 62.5, 65, 66.8, 68, 68.8, YF].map((x) => [x, K(x)]);

function crossK(ad: Seg): Pt {
  let lo = 5;
  let hi = YF;
  for (let i = 0; i < 50; i++) {
    const m = (lo + hi) / 2;
    if (atX(ad, m)[1] > K(m)) lo = m;
    else hi = m;
  }
  return [lo, K(lo)];
}

function KeynesAS() {
  return (
    <>
      <Line points={[[YF, 0], [YF, 92]]} dashed tone="muted" />
      <Label at={[YF, -6.25]} anchor="middle">
        Yf
      </Label>
      <Line points={[[5, 20], [30, 20]]} />
      <Line points={KAS} smooth label="AS" labelOffset={[8, 6]} />
    </>
  );
}

const KAD1: Seg = [
  [8, 63.75],
  [60, 11.75],
];
const KAD2 = shift(KAD1, 20);

function AdGrowth({ caption }: Cap) {
  const a = crossK(KAD1);
  const b = crossK(KAD2);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <KeynesAS />
      <Line points={KAD1} label="AD₁" />
      <Line points={KAD2} label="AD₂" tone="alt" />
      <Guide at={a} x="Y₁" y="P₁" />
      <Guide at={b} x="Y₂" y="P₂" />
      <Arrow from={[24, 50]} to={[39.5, 50]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

function LrasGrowth({ caption }: Cap) {
  const ad: Seg = [
    [12, 88],
    [88, 12],
  ];
  const a = atX(ad, 45);
  const b = atX(ad, 65);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <Line points={[[45, 4], [45, 90]]} label="LRAS₁" labelOffset={[-18, -8]} />
      <Line points={[[65, 4], [65, 90]]} label="LRAS₂" tone="alt" labelOffset={[-18, -8]} />
      <Line points={ad} label="AD" />
      <Guide at={a} x="Yf₁" y="P₁" />
      <Guide at={b} x="Yf₂" y="P₂" />
      <Arrow from={[47, 78]} to={[63, 78]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

const DL: Seg = [
  [10, 88],
  [85, 13],
];
const SL: Seg = [
  [10, 12],
  [85, 87],
];

function MinWage({ caption }: Cap) {
  const e = intersect(DL, SL);
  const qd = atY(DL, 65);
  const qs = atY(SL, 65);
  return (
    <Chart x="Quantity of labour" y="Wage rate" caption={caption}>
      <Line points={[[0, 65], [88, 65]]} tone="alt" />
      <Line points={DL} label="DL" />
      <Line points={SL} label="SL" />
      <Guide at={e} x="Qe" y="We" />
      <Guide at={qd} x="Qd" y="Wmin" />
      <Guide at={qs} x="Qs" />
      <Arrow from={[48, 70]} to={[qd[0] + 1, 70]} />
      <Arrow from={[48, 70]} to={[qs[0] - 1, 70]} />
      <Label at={[48, 73]} anchor="middle">
        Unemployment
      </Label>
      <Dot at={e} />
      <Dot at={qd} />
      <Dot at={qs} />
    </Chart>
  );
}

function Structural({ caption }: Cap) {
  const d1: Seg = [
    [10, 88],
    [80, 18],
  ];
  const d2 = clip(shift(d1, -26), 4, 54);
  const e = intersect(d1, SL);
  const q2 = atY(d2, e[1]);
  return (
    <Chart x="Quantity of labour" y="Wage rate" caption={caption}>
      <Line points={d1} label="DL₁" />
      <Line points={d2} label="DL₂" tone="alt" />
      <Line points={SL} label="SL" />
      <Guide at={e} x="Q₁" y="W₁" />
      <Guide at={q2} x="Q₂" />
      <Arrow from={[62, 33]} to={[42, 33]} />
      <Dot at={e} />
      <Dot at={q2} />
    </Chart>
  );
}

function DeflationaryGap({ caption }: Cap) {
  const ad: Seg = [
    [8, 53.5625],
    [46, 15.5625],
  ];
  const e = crossK(ad);
  const mid = (e[0] + YF) / 2;
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <KeynesAS />
      <Line points={ad} label="AD" />
      <Guide at={e} x="Y₁" y="P₁" />
      <Arrow from={[mid, 4]} to={[e[0] + 0.8, 4]} />
      <Arrow from={[mid, 4]} to={[YF - 0.8, 4]} />
      <Label at={[mid, 8]} anchor="middle">
        Deflationary gap
      </Label>
      <Dot at={e} />
    </Chart>
  );
}

const AD: Seg = [
  [8, 86],
  [78, 16],
];
const SRAS: Seg = [
  [8, 14],
  [76, 73],
];

function AdAsShift({
  caption,
  ad2,
  sras2,
  arrow,
}: Cap & { ad2?: Seg; sras2?: Seg; arrow: [Pt, Pt] }) {
  const a = intersect(AD, SRAS);
  const b = intersect(ad2 ?? AD, sras2 ?? SRAS);
  const lowerFirst = b[0] < a[0];
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <Line points={AD} label={ad2 ? "AD₁" : "AD"} />
      {ad2 && <Line points={ad2} label="AD₂" tone="alt" />}
      <Line points={SRAS} label={sras2 ? "SRAS₁" : "SRAS"} />
      {sras2 && <Line points={sras2} label="SRAS₂" tone="alt" />}
      <Guide at={a} x="Y₁" y="P₁" />
      <Guide at={b} x="Y₂" y="P₂" />
      <Arrow from={arrow[0]} to={arrow[1]} />
      <Dot at={lowerFirst ? b : a} />
      <Dot at={lowerFirst ? a : b} />
    </Chart>
  );
}

const DemandPull = ({ caption }: Cap) => (
  <AdAsShift caption={caption} ad2={shift(AD, 16)} arrow={[[20, 76], [32, 76]]} />
);
const CostPush = ({ caption }: Cap) => (
  <AdAsShift caption={caption} sras2={clip(shift(SRAS, -16), 4, 60)} arrow={[[61, 62], [49.5, 62]]} />
);
const DeflationAD = ({ caption }: Cap) => (
  <AdAsShift caption={caption} ad2={clip(shift(AD, -16), 4, 62)} arrow={[[28, 64], [16, 64]]} />
);
const DeflationAS = ({ caption }: Cap) => (
  <AdAsShift caption={caption} sras2={shift(SRAS, 16)} arrow={[[65.5, 62], [77, 62]]} />
);

// Short-run Phillips curve, drawn through these points so A, B and C sit exactly on the curves.
const SRPC1: Pt[] = [
  [12, 88],
  [20, 62],
  [30, 42],
  [45, 26],
  [65, 15],
  [88, 8],
];
const SRPC2: Pt[] = SRPC1.slice(1).map(([x, y]) => [x, y + 16]);

function Srpc({ caption }: Cap) {
  const a = SRPC1[3];
  const b = SRPC1[2];
  return (
    <Chart x="Unemployment rate" y="Inflation rate" caption={caption}>
      <Line points={SRPC1} smooth label="SRPC" />
      <Guide at={a} x="U₁" y="π₁" />
      <Guide at={b} x="U₂" y="π₂" />
      <Dot at={a} label="A" />
      <Dot at={b} label="B" />
    </Chart>
  );
}

function Lrpc({ caption }: Cap) {
  const a = SRPC1[3];
  const b = SRPC1[2];
  const c = SRPC2[2];
  return (
    <Chart x="Unemployment rate" y="Inflation rate" caption={caption}>
      <Line points={[[45, 0], [45, 92]]} label="LRPC" labelOffset={[6, 4]} />
      <Line points={SRPC1} smooth label="SRPC₁" />
      <Line points={SRPC2} smooth label="SRPC₂" tone="alt" />
      <Guide at={a} x="NRU" y="π₁" />
      <Guide at={b} x="U₁" y="π₂" />
      <Arrow from={[a[0] - 2, a[1] + 3]} to={[b[0] + 2.5, b[1] - 2.5]} />
      <Arrow from={[b[0] + 2.5, b[1] + 2.5]} to={[c[0] - 2, c[1] + 2.5]} />
      <Dot at={a} label="A" labelOffset={[7, 14]} />
      <Dot at={b} label="B" labelOffset={[-4, -10]} />
      <Dot at={c} label="C" />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "政府追求四大宏观目标：经济增长、低失业、低而稳定的通胀，以及（HL）可持续的政府债务。本节讲每个目标如何测量、问题的成因与代价，并配 PPC、AD/AS 和劳动力市场图。最后讨论目标之间的冲突；HL 还要掌握加权价格指数计算和短期、长期菲利普斯曲线。",
    en: "Governments pursue four macroeconomic objectives: economic growth, low unemployment, a low and stable rate of inflation and (HL) a sustainable level of government debt. This topic covers how each is measured, the causes and costs of failing to meet it, with PPC, AD/AS and labour market diagrams. It ends with the conflicts between objectives; HL adds the weighted price index calculation and the short-run and long-run Phillips curves.",
  },
  sections: [
    {
      id: "growth",
      level: "both",
      title: { zh: "经济增长", en: "Economic growth" },
      body: {
        zh: (
          <>
            <Def term="Economic growth">
              一段时间内一个经济体实际产出（real GDP）的增加，通常用实际 GDP 的年增长率衡量。
            </Def>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>短期增长 Short-term growth</th>
                  <th>长期增长 Long-term growth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>含义</td>
                  <td>实际增长（actual growth）：利用原本闲置的资源，实际产出增加</td>
                  <td>潜在增长：生产能力（production possibilities）本身扩大</td>
                </tr>
                <tr>
                  <td>PPC 模型</td>
                  <td>PPC 内的点向 PPC 移动（A → B）</td>
                  <td>PPC 向外移动（PPC₁ → PPC₂）</td>
                </tr>
                <tr>
                  <td>AD/AS 模型</td>
                  <td>AD 增加，实际产出从 Y₁ 增至 Y₂</td>
                  <td>LRAS 右移，充分就业产出 Yf 增加</td>
                </tr>
              </tbody>
            </table>
            <PpcGrowth caption="图 1 PPC 模型：A 到 B 是实际增长（闲置资源被利用）；PPC₁ 外移到 PPC₂ 是生产可能性的增长。" />
            <AdGrowth caption="图 2 AD 从 AD₁ 增至 AD₂，实际产出从 Y₁ 增至 Y₂（短期增长），价格水平也从 P₁ 升至 P₂。" />
            <LrasGrowth caption="图 3 LRAS₁ 右移到 LRAS₂，充分就业产出从 Yf₁ 增至 Yf₂（长期增长）。" />
            <p>
              <strong>测量：</strong>用<strong>实际</strong> GDP（剔除价格变化）的百分比变化。比较生活水平时更常用人均实际 GDP 的增长率。
            </p>
            <Formula>
              经济增长率 = <Frac n="今年实际 GDP − 去年实际 GDP" d="去年实际 GDP" /> × 100
            </Formula>
            <Callout title="例题">
              <p>
                实际 GDP 从 2023 年的 8000 亿美元增至 2024 年的 8240 亿美元。增长率 = (8240 − 8000) ÷ 8000 × 100 = <strong>3%</strong>。
              </p>
              <p>注意：增长率下降（如从 3% 降到 1%）意味着经济仍在增长，只是变慢，而不是萎缩。</p>
            </Callout>
            <p>
              <strong>经济增长的后果：</strong>
            </p>
            <ul>
              <li>
                <strong>生活水平：</strong>人均收入上升，可购买更多商品和服务；政府税收增加，可投入医疗、教育。但如果增长主要来自资本品或军费，或人口增长更快，生活水平未必提高。
              </li>
              <li>
                <strong>环境：</strong>更多生产通常意味着更多碳排放、资源消耗和污染（负外部性）；但富裕后也可能投资清洁技术（绿色增长）。
              </li>
              <li>
                <strong>收入分配：</strong>增长的好处未必平均分配，可能集中在资本所有者或高技能劳动者手中，使不平等扩大。
              </li>
            </ul>
          </>
        ),
        en: (
          <>
            <Def term="Economic growth">
              An increase in an economy&apos;s real output (real GDP) over time, usually measured as the annual percentage change in real GDP.
            </Def>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Short-term growth</th>
                  <th>Long-term growth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Meaning</td>
                  <td>Actual growth: real output rises as previously unemployed resources are used</td>
                  <td>Growth in potential: the economy&apos;s productive capacity itself expands</td>
                </tr>
                <tr>
                  <td>PPC model</td>
                  <td>A point inside the PPC moves towards the PPC (A → B)</td>
                  <td>The PPC shifts outwards (PPC₁ → PPC₂)</td>
                </tr>
                <tr>
                  <td>AD/AS model</td>
                  <td>AD increases and real output rises from Y₁ to Y₂</td>
                  <td>LRAS shifts right and full employment output Yf rises</td>
                </tr>
              </tbody>
            </table>
            <PpcGrowth caption="Figure 1 PPC model: A to B is actual growth (idle resources are brought into use); the shift from PPC₁ to PPC₂ is growth in production possibilities." />
            <AdGrowth caption="Figure 2 AD increases from AD₁ to AD₂, raising real output from Y₁ to Y₂ (short-term growth); the price level rises from P₁ to P₂." />
            <LrasGrowth caption="Figure 3 LRAS₁ shifts right to LRAS₂, raising full employment output from Yf₁ to Yf₂ (long-term growth)." />
            <p>
              <strong>Measurement:</strong> the percentage change in <strong>real</strong> GDP (adjusted for price changes). Growth in real GDP per capita is a better guide to living standards.
            </p>
            <Formula>
              Growth rate = <Frac n="real GDP this year − real GDP last year" d="real GDP last year" /> × 100
            </Formula>
            <Callout title="Worked example">
              <p>
                Real GDP rises from $800bn in 2023 to $824bn in 2024. Growth rate = (824 − 800) ÷ 800 × 100 = <strong>3%</strong>.
              </p>
              <p>Note: a fall in the growth rate (e.g. from 3% to 1%) means the economy is still growing, only more slowly; it is not shrinking.</p>
            </Callout>
            <p>
              <strong>Consequences of economic growth:</strong>
            </p>
            <ul>
              <li>
                <strong>Living standards:</strong> higher incomes per head allow more goods and services to be consumed, and higher tax revenue can fund health and education. But living standards may not improve if growth goes into capital goods or defence, or if population grows faster.
              </li>
              <li>
                <strong>Environment:</strong> more production usually means more carbon emissions, resource depletion and pollution (negative externalities), although richer economies can afford cleaner technology (green growth).
              </li>
              <li>
                <strong>Income distribution:</strong> the gains are often unevenly shared, going mainly to owners of capital or high-skilled workers, so inequality can widen.
              </li>
            </ul>
          </>
        ),
      },
    },
    {
      id: "unemployment",
      level: "both",
      title: { zh: "低失业", en: "Low unemployment" },
      body: {
        zh: (
          <>
            <Def term="Unemployment">
              处于工作年龄、有能力且愿意工作、正在积极找工作，但没有工作的人。
            </Def>
            <Formula>
              失业率 = <Frac n="失业人数" d="劳动力（就业人数 + 失业人数）" /> × 100
            </Formula>
            <Callout title="例题">
              <p>
                就业 4750 万人，失业 250 万人。劳动力 = 4750 + 250 = 5000 万。失业率 = 250 ÷ 5000 × 100 = <strong>5%</strong>。注意分母是劳动力，不是总人口。
              </p>
            </Callout>
            <p>
              <strong>测量的困难：</strong>官方数据可能<strong>低估</strong>真实失业——
            </p>
            <ul>
              <li>隐性失业：灰心丧气的工人（discouraged workers）放弃找工作，不再计入劳动力。</li>
              <li>就业不足（underemployment）：想做全职却只能做兼职，或高学历做低技能工作，仍算作就业。</li>
              <li>非正规部门（informal sector）的工作不被统计；平均数掩盖了地区、年龄、族群、性别之间的差异。</li>
            </ul>
            <p>
              <strong>失业的类型与成因：</strong>
            </p>
            <table>
              <thead>
                <tr>
                  <th>类型</th>
                  <th>成因</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>周期性（需求不足型）Cyclical / demand-deficient</td>
                  <td>经济衰退时总需求下降，企业减产裁员；出现通缩（衰退）缺口</td>
                </tr>
                <tr>
                  <td>结构性 Structural</td>
                  <td>某行业或地区对劳动力的需求长期下降（技术进步、产业转移、消费结构变化），工人技能或所在地与空缺岗位不匹配；也可能由劳动力市场僵化（如最低工资、工会）造成</td>
                </tr>
                <tr>
                  <td>季节性 Seasonal</td>
                  <td>需求随季节变化，例如旅游、农业、滑雪场</td>
                </tr>
                <tr>
                  <td>摩擦性 Frictional</td>
                  <td>换工作之间的短暂空档，例如毕业生找第一份工作</td>
                </tr>
              </tbody>
            </table>
            <MinWage caption="图 4 最低工资 Wmin 高于均衡工资 We：劳动供给量 Qs 大于需求量 Qd，Qd 到 Qs 的差距就是失业。" />
            <Structural caption="图 5 某行业或地区对劳动的需求从 DL₁ 降到 DL₂。如果工资在 W₁ 不下降，需求量只有 Q₂，Q₂ 到 Q₁ 的工人失业（结构性失业）。" />
            <DeflationaryGap caption="图 6 AD 与 AS 相交于 Y₁，低于充分就业产出 Yf：Y₁ 与 Yf 之间是通缩（衰退）缺口，对应周期性失业。" />
            <Def term="Natural rate of unemployment (NRU)">
              经济处于充分就业产出（Yf）时仍存在的失业率，等于结构性、季节性和摩擦性失业之和，即周期性失业为零时的失业率。
            </Def>
            <p>
              <strong>失业的代价：</strong>
            </p>
            <ul>
              <li><strong>个人：</strong>收入下降、负债、压力和健康问题、技能退化，长期失业者越来越难再就业。</li>
              <li><strong>社会：</strong>犯罪、无家可归、家庭破裂、社会不稳定。</li>
              <li><strong>经济：</strong>产出损失（经济在 PPC 内）；政府税收减少、失业救济支出增加；不平等加剧；人力资本流失。</li>
            </ul>
          </>
        ),
        en: (
          <>
            <Def term="Unemployment">
              People of working age who are able and willing to work and actively looking for work, but do not have a job.
            </Def>
            <Formula>
              Unemployment rate = <Frac n="number unemployed" d="labour force (employed + unemployed)" /> × 100
            </Formula>
            <Callout title="Worked example">
              <p>
                47.5 million are employed and 2.5 million unemployed. Labour force = 47.5 + 2.5 = 50 million. Unemployment rate = 2.5 ÷ 50 × 100 = <strong>5%</strong>. The denominator is the labour force, not the whole population.
              </p>
            </Callout>
            <p>
              <strong>Difficulties of measurement:</strong> official figures may <strong>understate</strong> true unemployment:
            </p>
            <ul>
              <li>Hidden unemployment: discouraged workers stop looking and drop out of the labour force.</li>
              <li>Underemployment: people who want full-time work but work part-time, or graduates in low-skilled jobs, count as employed.</li>
              <li>Work in the informal sector is not recorded, and a national average hides differences between regions, age groups, ethnic groups and genders.</li>
            </ul>
            <p>
              <strong>Types and causes of unemployment:</strong>
            </p>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Cause</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cyclical (demand-deficient)</td>
                  <td>AD falls in a recession, so firms cut output and jobs; there is a deflationary (recessionary) gap</td>
                </tr>
                <tr>
                  <td>Structural</td>
                  <td>A long-term fall in the demand for labour in an industry or region (technology, firms relocating, changing tastes), so workers&apos; skills or location no longer match the vacancies; also labour market rigidities such as minimum wages or union power</td>
                </tr>
                <tr>
                  <td>Seasonal</td>
                  <td>Demand varies with the seasons, e.g. tourism, agriculture, ski resorts</td>
                </tr>
                <tr>
                  <td>Frictional</td>
                  <td>Short gaps while people move between jobs, e.g. graduates looking for their first job</td>
                </tr>
              </tbody>
            </table>
            <MinWage caption="Figure 4 A minimum wage Wmin above the equilibrium wage We: the quantity of labour supplied Qs exceeds the quantity demanded Qd, and the gap Qd to Qs is unemployment." />
            <Structural caption="Figure 5 Demand for labour in an industry or region falls from DL₁ to DL₂. If the wage stays at W₁, only Q₂ workers are demanded and Q₂ to Q₁ are unemployed (structural unemployment)." />
            <DeflationaryGap caption="Figure 6 AD meets AS at Y₁, below full employment output Yf: the distance Y₁ to Yf is a deflationary (recessionary) gap, which corresponds to cyclical unemployment." />
            <Def term="Natural rate of unemployment (NRU)">
              The rate of unemployment that remains when the economy is producing at full employment output (Yf): the sum of structural, seasonal and frictional unemployment, i.e. the rate when cyclical unemployment is zero.
            </Def>
            <p>
              <strong>Costs of unemployment:</strong>
            </p>
            <ul>
              <li><strong>Personal:</strong> loss of income, debt, stress and poorer health, and skills that fade, so the long-term unemployed find it ever harder to get work.</li>
              <li><strong>Social:</strong> crime, homelessness, family breakdown and social unrest.</li>
              <li><strong>Economic:</strong> lost output (the economy is inside its PPC), lower tax revenue and higher spending on unemployment benefits, greater inequality and loss of human capital.</li>
            </ul>
          </>
        ),
      },
    },
    {
      id: "inflation",
      level: "both",
      title: { zh: "低而稳定的通胀率", en: "Low and stable rate of inflation" },
      body: {
        zh: (
          <>
            <Def term="Inflation">
              一段时间内经济中<strong>一般（平均）价格水平</strong>的持续上升。多数央行的目标约为每年 2%。
            </Def>
            <p>
              <strong>用 CPI 测量：</strong>统计部门调查典型家庭购买的「一篮子」商品和服务，按家庭购买数量（作为权重）计算这篮子在各年的总成本，再与基期相比得到消费者价格指数（CPI）。基期 CPI = 100。
            </p>
            <Formula>
              通胀率 = <Frac n="今年 CPI − 去年 CPI" d="去年 CPI" /> × 100
            </Formula>
            <Callout title="例题：以购买数量为权重计算 CPI 和通胀率">
              <table>
                <thead>
                  <tr>
                    <th>商品</th>
                    <th>购买数量</th>
                    <th>2023 年价格</th>
                    <th>2024 年价格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>大米（kg）</td><td>10</td><td>$2</td><td>$2.5</td></tr>
                  <tr><td>公交票</td><td>20</td><td>$1.5</td><td>$1.5</td></tr>
                  <tr><td>T 恤</td><td>2</td><td>$10</td><td>$12</td></tr>
                </tbody>
              </table>
              <ol>
                <li>2023 年篮子成本 = 10×2 + 20×1.5 + 2×10 = $70（基期）。</li>
                <li>2024 年篮子成本 = 10×2.5 + 20×1.5 + 2×12 = $79。</li>
                <li>CPI₂₀₂₄ = 79 ÷ 70 × 100 = 112.9，所以 2023 至 2024 年通胀率为 <strong>12.9%</strong>。</li>
                <li>若 CPI₂₀₂₅ = 118.5，则 2025 年通胀率 = (118.5 − 112.9) ÷ 112.9 × 100 ≈ <strong>5.0%</strong>。</li>
              </ol>
            </Callout>
            <HL>
              <p>
                <strong>加权价格指数（weighted price index）：</strong>给定各类支出的权重（占家庭支出的比例）和各类商品的价格指数，把每类的价格指数乘以权重再相加。
              </p>
              <Formula>
                加权价格指数 = <Frac n="Σ（权重 × 该类价格指数）" d="Σ 权重" />
              </Formula>
              <table>
                <thead>
                  <tr>
                    <th>类别</th>
                    <th>权重</th>
                    <th>价格指数</th>
                    <th>权重 × 指数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>食品</td><td>30</td><td>110</td><td>3300</td></tr>
                  <tr><td>住房</td><td>40</td><td>105</td><td>4200</td></tr>
                  <tr><td>交通</td><td>20</td><td>120</td><td>2400</td></tr>
                  <tr><td>其他</td><td>10</td><td>100</td><td>1000</td></tr>
                  <tr><td>合计</td><td>100</td><td></td><td>10900</td></tr>
                </tbody>
              </table>
              <p>
                加权价格指数 = 10900 ÷ 100 = <strong>109</strong>，即自基期以来价格平均上涨 9%。虽然交通涨了 20%，但它权重小，对总指数影响有限。
              </p>
            </HL>
            <p>
              <strong>CPI 的局限：</strong>
            </p>
            <ul>
              <li>篮子和权重代表「平均」家庭，不同收入、年龄、地区的家庭面对的实际通胀不同。</li>
              <li>质量改进难以调整（新手机更贵但更好）；新产品进入篮子有滞后。</li>
              <li>消费者会转向变便宜的替代品，固定篮子会高估生活成本上升。</li>
              <li>只覆盖消费品价格，不含资产价格（如房价）；各国篮子不同，国际比较困难。</li>
            </ul>
            <p>
              <strong>通胀的成因：</strong>
            </p>
            <ul>
              <li>
                <strong>需求拉动型（demand-pull）：</strong>AD 增加（消费、投资、政府支出、净出口上升），在接近充分就业时推高价格水平。
              </li>
              <li>
                <strong>成本推动型（cost-push）：</strong>生产成本上升（工资、原材料如石油、进口品价格因本币贬值上涨），SRAS 左移，价格上升同时产出下降。
              </li>
            </ul>
            <DemandPull caption="图 7 需求拉动型通胀：AD₁ 右移到 AD₂，价格水平从 P₁ 升至 P₂，产出从 Y₁ 增至 Y₂。" />
            <CostPush caption="图 8 成本推动型通胀：SRAS₁ 左移到 SRAS₂，价格水平从 P₁ 升至 P₂，产出从 Y₁ 降至 Y₂（滞胀）。" />
            <p>
              <strong>高通胀的代价：</strong>
            </p>
            <ul>
              <li><strong>不确定性：</strong>企业难以规划，投资减少。</li>
              <li><strong>再分配效应：</strong>固定收入者（养老金领取者）和储户受损；借款人受益，因为债务的实际价值下降。</li>
              <li><strong>储蓄：</strong>若通胀高于名义利率，储蓄的实际回报为负，人们储蓄减少。</li>
              <li><strong>出口竞争力：</strong>若本国通胀高于贸易伙伴，出口变贵，经常账户恶化。</li>
              <li><strong>经济增长：</strong>以上因素降低投资，从而损害长期增长。</li>
              <li><strong>资源配置低效：</strong>价格信号被扭曲，难以分辨相对价格变化；企业频繁改价产生菜单成本（menu costs）。</li>
            </ul>
            <Callout title="例子">
              <p>2022 年能源和食品价格大涨（成本推动为主），英国 CPI 通胀率在 10 月达到 11.1%，远高于 2% 的目标。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Inflation">
              A sustained increase in the <strong>general (average) price level</strong> of an economy over a period of time. Most central banks aim for about 2% a year.
            </Def>
            <p>
              <strong>Measuring with the CPI:</strong> statisticians survey a basket of goods and services bought by a typical household, use the quantities households buy as weights to find the total cost of the basket each year, and compare it with a base year. This gives the consumer price index (CPI), with the base year = 100.
            </p>
            <Formula>
              Inflation rate = <Frac n="CPI this year − CPI last year" d="CPI last year" /> × 100
            </Formula>
            <Callout title="Worked example: CPI and inflation using quantities as weights">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity bought</th>
                    <th>Price 2023</th>
                    <th>Price 2024</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Rice (kg)</td><td>10</td><td>$2</td><td>$2.5</td></tr>
                  <tr><td>Bus tickets</td><td>20</td><td>$1.5</td><td>$1.5</td></tr>
                  <tr><td>T-shirts</td><td>2</td><td>$10</td><td>$12</td></tr>
                </tbody>
              </table>
              <ol>
                <li>Cost of the basket in 2023 = 10×2 + 20×1.5 + 2×10 = $70 (base year).</li>
                <li>Cost of the basket in 2024 = 10×2.5 + 20×1.5 + 2×12 = $79.</li>
                <li>CPI₂₀₂₄ = 79 ÷ 70 × 100 = 112.9, so inflation between 2023 and 2024 is <strong>12.9%</strong>.</li>
                <li>If CPI₂₀₂₅ = 118.5, inflation in 2025 = (118.5 − 112.9) ÷ 112.9 × 100 ≈ <strong>5.0%</strong>.</li>
              </ol>
            </Callout>
            <HL>
              <p>
                <strong>Weighted price index:</strong> given the weight of each category (its share of household spending) and a price index for each category, multiply each index by its weight and add them up.
              </p>
              <Formula>
                Weighted price index = <Frac n="Σ (weight × category price index)" d="Σ weights" />
              </Formula>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Weight</th>
                    <th>Price index</th>
                    <th>Weight × index</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Food</td><td>30</td><td>110</td><td>3300</td></tr>
                  <tr><td>Housing</td><td>40</td><td>105</td><td>4200</td></tr>
                  <tr><td>Transport</td><td>20</td><td>120</td><td>2400</td></tr>
                  <tr><td>Other</td><td>10</td><td>100</td><td>1000</td></tr>
                  <tr><td>Total</td><td>100</td><td></td><td>10900</td></tr>
                </tbody>
              </table>
              <p>
                Weighted price index = 10900 ÷ 100 = <strong>109</strong>: prices have risen by 9% on average since the base year. Transport rose by 20%, but its small weight limits its effect on the overall index.
              </p>
            </HL>
            <p>
              <strong>Limitations of the CPI:</strong>
            </p>
            <ul>
              <li>The basket and weights reflect an average household; households with different incomes, ages or locations face different inflation rates.</li>
              <li>Quality changes are hard to adjust for (a new phone costs more but is better), and new products enter the basket with a delay.</li>
              <li>Consumers switch to substitutes that have become cheaper, so a fixed basket overstates the rise in the cost of living.</li>
              <li>It covers consumer prices only, not asset prices such as housing, and baskets differ between countries, which makes international comparison difficult.</li>
            </ul>
            <p>
              <strong>Causes of inflation:</strong>
            </p>
            <ul>
              <li>
                <strong>Demand-pull:</strong> an increase in AD (higher consumption, investment, government spending or net exports) pulls up the price level, especially near full employment.
              </li>
              <li>
                <strong>Cost-push:</strong> higher costs of production (wages, raw materials such as oil, import prices after a depreciation) shift SRAS left, so prices rise while output falls.
              </li>
            </ul>
            <DemandPull caption="Figure 7 Demand-pull inflation: AD₁ shifts right to AD₂, raising the price level from P₁ to P₂ and output from Y₁ to Y₂." />
            <CostPush caption="Figure 8 Cost-push inflation: SRAS₁ shifts left to SRAS₂, raising the price level from P₁ to P₂ while output falls from Y₁ to Y₂ (stagflation)." />
            <p>
              <strong>Costs of a high inflation rate:</strong>
            </p>
            <ul>
              <li><strong>Uncertainty:</strong> firms find it hard to plan, so investment falls.</li>
              <li><strong>Redistributive effects:</strong> people on fixed incomes (pensioners) and savers lose; borrowers gain because the real value of their debt falls.</li>
              <li><strong>Saving:</strong> if inflation exceeds the nominal interest rate, the real return on saving is negative, so people save less.</li>
              <li><strong>Export competitiveness:</strong> if domestic inflation is above that of trading partners, exports become dearer and the current account worsens.</li>
              <li><strong>Economic growth:</strong> through lower investment, these effects harm long-term growth.</li>
              <li><strong>Inefficient resource allocation:</strong> price signals are distorted, so relative price changes are hard to read; firms also face menu costs from changing prices often.</li>
            </ul>
            <Callout title="Real-world example">
              <p>Energy and food prices surged in 2022 (mainly cost-push), and UK CPI inflation peaked at 11.1% in October, far above the 2% target.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "deflation",
      level: "both",
      title: { zh: "通缩与反通胀", en: "Deflation and disinflation" },
      body: {
        zh: (
          <>
            <Def term="Deflation">一般价格水平的持续<strong>下降</strong>，即通胀率为负。</Def>
            <Def term="Disinflation">通胀率<strong>下降但仍为正</strong>，价格仍在上涨，只是涨得更慢（如从 6% 降到 3%）。</Def>
            <p>
              <strong>通缩的成因：</strong>
            </p>
            <ul>
              <li>
                <strong>AD 下降</strong>（「坏」通缩）：消费者和企业信心下降、信贷收缩、出口减少。价格和产出同时下降，伴随失业上升。
              </li>
              <li>
                <strong>SRAS 增加</strong>（「好」通缩）：技术进步、生产率提高、原材料变便宜。价格下降而产出上升。
              </li>
            </ul>
            <DeflationAD caption="图 9 AD 下降引起的通缩：AD₁ 左移到 AD₂，价格水平从 P₁ 降至 P₂，产出从 Y₁ 降至 Y₂。" />
            <DeflationAS caption="图 10 SRAS 增加引起的通缩：SRAS₁ 右移到 SRAS₂，价格水平从 P₁ 降至 P₂，产出从 Y₁ 增至 Y₂。" />
            <p>
              <strong>通缩的代价</strong>（主要指 AD 下降造成的通缩）：
            </p>
            <ul>
              <li><strong>不确定性：</strong>企业利润前景不明，推迟投资。</li>
              <li><strong>再分配效应：</strong>借款人受损、储户受益，财富从债务人转向债权人。</li>
              <li><strong>推迟消费：</strong>消费者预期价格继续下跌，推迟购买耐用品，AD 进一步下降，形成通缩螺旋（deflationary spiral）。</li>
              <li><strong>周期性失业和破产：</strong>价格和利润下降，企业裁员甚至倒闭。</li>
              <li><strong>债务实际价值上升：</strong>名义债务不变而价格和收入下降，偿债负担加重。</li>
              <li><strong>资源配置低效：</strong>名义工资难以下调（工资刚性），实际工资上升，导致失业。</li>
              <li><strong>政策失效：</strong>名义利率无法远低于零，货币政策难以刺激经济（见 3.5）。</li>
            </ul>
            <Callout title="例子">
              <p>日本在 1990 年代末到 2010 年代多次出现温和通缩，伴随长期低增长；2023 至 2025 年中国 CPI 也多次在零附近徘徊甚至为负。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Deflation">A sustained <strong>fall</strong> in the general price level, i.e. a negative inflation rate.</Def>
            <Def term="Disinflation">A <strong>fall in the rate of inflation</strong> while it stays positive: prices are still rising, only more slowly (e.g. from 6% to 3%).</Def>
            <p>
              <strong>Causes of deflation:</strong>
            </p>
            <ul>
              <li>
                <strong>A fall in AD</strong> (bad deflation): lower consumer and business confidence, a credit squeeze, falling exports. Prices and output fall together and unemployment rises.
              </li>
              <li>
                <strong>An increase in SRAS</strong> (good deflation): new technology, higher productivity, cheaper raw materials. Prices fall while output rises.
              </li>
            </ul>
            <DeflationAD caption="Figure 9 Deflation from a fall in AD: AD₁ shifts left to AD₂, lowering the price level from P₁ to P₂ and output from Y₁ to Y₂." />
            <DeflationAS caption="Figure 10 Deflation from an increase in SRAS: SRAS₁ shifts right to SRAS₂, lowering the price level from P₁ to P₂ while output rises from Y₁ to Y₂." />
            <p>
              <strong>Costs of deflation</strong> (mainly deflation caused by falling AD):
            </p>
            <ul>
              <li><strong>Uncertainty:</strong> firms cannot predict profits, so they delay investment.</li>
              <li><strong>Redistributive effects:</strong> borrowers lose and savers gain, transferring wealth from debtors to creditors.</li>
              <li><strong>Deferred consumption:</strong> consumers expect prices to keep falling and postpone buying durables, so AD falls further (a deflationary spiral).</li>
              <li><strong>Cyclical unemployment and bankruptcies:</strong> falling prices and profits lead firms to cut jobs or close.</li>
              <li><strong>Higher real value of debt:</strong> nominal debts stay the same while prices and incomes fall, so debts are harder to repay.</li>
              <li><strong>Inefficient resource allocation:</strong> nominal wages rarely fall (wage rigidity), so real wages rise and unemployment results.</li>
              <li><strong>Policy ineffectiveness:</strong> nominal interest rates cannot fall far below zero, so monetary policy struggles to stimulate the economy (see 3.5).</li>
            </ul>
            <Callout title="Real-world example">
              <p>Japan had repeated spells of mild deflation from the late 1990s into the 2010s alongside weak growth; China&apos;s CPI also hovered around zero, at times negative, between 2023 and 2025.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "unemployment-vs-inflation",
      level: "both",
      title: { zh: "失业与通胀的相对代价", en: "Relative costs of unemployment versus inflation" },
      body: {
        zh: (
          <>
            <p>政府经常要判断：哪个问题更严重？这是 AO3 评价题。</p>
            <table>
              <thead>
                <tr>
                  <th>失业代价通常更大的理由</th>
                  <th>通胀代价可能更大的情况</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>失去的产出永远无法补回；代价集中落在少数人身上，造成贫困和社会问题；长期失业损害人力资本（滞后效应 hysteresis）。</td>
                  <td>温和、可预期的通胀代价较小；但高通胀甚至恶性通胀会摧毁储蓄、打乱价格信号、削弱出口竞争力，而压低通胀往往又要以衰退和失业为代价。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                结论取决于：两者的<strong>幅度</strong>（5% 的失业与 50% 的通胀不可同日而语）、持续时间、哪些群体受影响、通胀是否被预期，以及社会保障是否完善。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Governments often have to judge which problem is worse. This is an AO3 evaluation point.</p>
            <table>
              <thead>
                <tr>
                  <th>Why unemployment is usually seen as more costly</th>
                  <th>When inflation may be more costly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lost output can never be recovered; the burden falls heavily on a minority, causing poverty and social problems; long-term unemployment destroys human capital (hysteresis).</td>
                  <td>Mild, anticipated inflation costs little; but high or hyperinflation wipes out savings, distorts price signals and damages export competitiveness, and bringing it down usually requires a recession and higher unemployment.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                The answer depends on the <strong>size</strong> of each problem (5% unemployment is not comparable with 50% inflation), how long it lasts, which groups are affected, whether inflation is anticipated and how strong the welfare safety net is.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "government-debt",
      level: "hl",
      title: { zh: "可持续的政府（国家）债务", en: "Sustainable level of government (national) debt" },
      body: {
        zh: (
          <>
            <Def term="Government (national) debt">
              政府历年累积的借款总额，即过去所有预算赤字减去盈余后的存量，通常以占 GDP 的百分比表示。
            </Def>
            <Def term="Budget deficit">
              某一年政府支出大于税收收入的差额（流量）。每年的赤字要靠借款弥补，因此会增加债务存量。
            </Def>
            <Formula>
              债务占 GDP 比例 = <Frac n="政府债务" d="名义 GDP" /> × 100
            </Formula>
            <Callout title="例题">
              <p>
                债务 9000 亿美元，GDP 15000 亿美元：债务比例 = 900 ÷ 1500 × 100 = 60%。次年赤字 450 亿美元，债务升至 9450 亿；若 GDP 增至 15600 亿，比例 = 945 ÷ 1560 × 100 ≈ 60.6%。只要 GDP 增长得够快，即使有赤字，债务比例也可以保持稳定甚至下降。
              </p>
            </Callout>
            <p>
              <strong>高债务的代价：</strong>
            </p>
            <ul>
              <li><strong>偿债成本（debt servicing）：</strong>利息支出占用预算，挤占医疗、教育、基建等支出（机会成本）。</li>
              <li><strong>信用评级（credit ratings）：</strong>评级机构下调评级后，投资者要求更高利率，借款更贵，债务进一步上升。</li>
              <li><strong>未来的税收和支出：</strong>将来可能要加税或削减支出（紧缩），负担转嫁给下一代。</li>
            </ul>
            <Callout title="例子">
              <p>日本政府总债务超过 GDP 的 200%，但大部分由国内持有、利率很低；2025 年 5 月穆迪把美国主权评级从 Aaa 下调到 Aa1，理由之一是赤字和利息负担上升。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Government (national) debt">
              The total amount the government has borrowed and not yet repaid: the stock built up from all past budget deficits minus surpluses, usually expressed as a percentage of GDP.
            </Def>
            <Def term="Budget deficit">
              The amount by which government spending exceeds tax revenue in a given year (a flow). Each deficit is financed by borrowing, so it adds to the stock of debt.
            </Def>
            <Formula>
              Debt-to-GDP ratio = <Frac n="government debt" d="nominal GDP" /> × 100
            </Formula>
            <Callout title="Worked example">
              <p>
                Debt is $900bn and GDP $1500bn: debt ratio = 900 ÷ 1500 × 100 = 60%. A deficit of $45bn next year raises debt to $945bn; if GDP grows to $1560bn the ratio is 945 ÷ 1560 × 100 ≈ 60.6%. If GDP grows fast enough, the debt ratio can stay stable or even fall despite a deficit.
              </p>
            </Callout>
            <p>
              <strong>Costs of a high government debt:</strong>
            </p>
            <ul>
              <li><strong>Debt servicing costs:</strong> interest payments take up a growing share of the budget, crowding out spending on health, education and infrastructure (an opportunity cost).</li>
              <li><strong>Credit ratings:</strong> if rating agencies downgrade the country, lenders demand higher interest rates, borrowing becomes dearer and debt rises further.</li>
              <li><strong>Future taxation and government spending:</strong> taxes may have to rise or spending be cut (austerity) later, shifting the burden to future generations.</li>
            </ul>
            <Callout title="Real-world example">
              <p>Japan&apos;s gross government debt is above 200% of GDP, but it is mostly held domestically at very low interest rates. In May 2025 Moody&apos;s cut the US sovereign rating from Aaa to Aa1, citing rising deficits and interest costs.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "conflicts",
      level: "both",
      title: { zh: "宏观目标之间的潜在冲突", en: "Potential conflicts between macroeconomic objectives" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>冲突</th>
                  <th>原因</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>低失业 vs 低通胀</td>
                  <td>扩张 AD 以减少失业时，经济接近充分就业，劳动力和资源短缺推高工资和价格。</td>
                </tr>
                <tr>
                  <td>高增长 vs 低通胀</td>
                  <td>AD 驱动的快速增长若超过生产能力，会出现通胀缺口；只有 LRAS 同步增长才能避免。</td>
                </tr>
                <tr>
                  <td>高增长 vs 环境可持续</td>
                  <td>更多生产意味着更多资源消耗、排放和污染，可能损害后代满足自身需要的能力。</td>
                </tr>
                <tr>
                  <td>高增长 vs 收入分配公平</td>
                  <td>增长的收益可能主要流向资本所有者和高技能者；鼓励增长的政策（如减税）也可能扩大不平等。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                冲突不是绝对的：由供给侧政策带来的增长（LRAS 右移）可以同时实现增长、低失业和低通胀；绿色技术和再分配政策也能缓解增长与环境、公平之间的矛盾。冲突在短期内比长期更明显。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Conflict</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Low unemployment vs low inflation</td>
                  <td>Raising AD to cut unemployment brings the economy close to full employment, where shortages of labour and resources push up wages and prices.</td>
                </tr>
                <tr>
                  <td>High growth vs low inflation</td>
                  <td>Rapid AD-led growth beyond productive capacity creates an inflationary gap, unless LRAS grows at the same pace.</td>
                </tr>
                <tr>
                  <td>High growth vs environmental sustainability</td>
                  <td>More production means more resource depletion, emissions and pollution, which may compromise the ability of future generations to meet their needs.</td>
                </tr>
                <tr>
                  <td>High growth vs equity in income distribution</td>
                  <td>The gains from growth may go mainly to owners of capital and the highly skilled, and pro-growth policies such as tax cuts can widen inequality.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                The conflicts are not absolute: growth driven by supply-side improvements (LRAS shifting right) can deliver growth, low unemployment and low inflation together, and green technology and redistribution can ease the tension with sustainability and equity. Conflicts are sharper in the short run than in the long run.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "phillips-curve",
      level: "hl",
      title: { zh: "通胀与失业的权衡：菲利普斯曲线", en: "The inflation–unemployment trade-off: Phillips curves" },
      body: {
        zh: (
          <>
            <p>
              <strong>AD/AS 解释：</strong>在 Keynesian AS 曲线向上倾斜的部分，AD 增加使实际产出上升（失业下降），但价格水平也上升（通胀上升）：从 Y₁ 到 Y₂，失业减少，价格从 P₁ 升到 P₂。
            </p>
            <AdGrowth caption="图 11 AD 从 AD₁ 增至 AD₂：产出增加、失业下降，但价格水平上升，体现通胀与失业的短期权衡。" />
            <Def term="Short-run Phillips curve (SRPC)">
              表示短期内通胀率与失业率之间<strong>反向关系</strong>的曲线：降低失业要以更高的通胀为代价。
            </Def>
            <Srpc caption="图 12 短期菲利普斯曲线：从 A 到 B，失业率从 U₁ 降到 U₂，通胀率从 π₁ 升到 π₂。" />
            <p>
              1970 年代出现<strong>滞胀</strong>（高通胀与高失业并存，起因是石油价格冲击导致 SRAS 左移），这一简单权衡失效。货币主义/新古典学派用<strong>通胀预期</strong>解释：
            </p>
            <ol>
              <li>经济起初在 A 点：失业处于自然失业率（NRU），通胀 π₁ 符合预期。</li>
              <li>政府扩张 AD，通胀升至 π₂；工人短期内没意识到实际工资下降（货币幻觉），企业扩大雇佣，失业降到 U₁（B 点）。</li>
              <li>工人逐渐预期通胀为 π₂，要求更高的名义工资，SRAS 左移；SRPC₁ 上移到 SRPC₂，失业回到 NRU，通胀却留在 π₂（C 点）。</li>
            </ol>
            <Def term="Long-run Phillips curve (LRPC)">
              在自然失业率处的<strong>垂直线</strong>：长期中通胀与失业之间不存在权衡，扩张需求只会带来更高的通胀。它对应垂直的 LRAS 曲线。
            </Def>
            <Lrpc caption="图 13 长期菲利普斯曲线：A → B 是沿 SRPC₁ 的短期移动；预期调整后 SRPC₁ 上移到 SRPC₂，经济到达 C 点，失业回到 NRU 而通胀更高。" />
            <Callout title="画图要点">
              <ul>
                <li>纵轴 Inflation rate（%），横轴 Unemployment rate（%）；不要和 AD/AS 的坐标轴混淆。</li>
                <li>LRPC 垂直于 NRU，与 LRAS 垂直于 Yf 对应。</li>
                <li>SRPC 上移代表通胀预期上升；要想把失业降到 NRU 以下并长期保持，只能不断加速通胀。</li>
              </ul>
            </Callout>
            <Callout title="评价">
              <p>
                降低自然失业率的唯一长期办法是供给侧政策（使 LRPC 左移）。近几十年的数据显示菲利普斯曲线变得较平坦，失业很低时通胀也未必明显上升，说明预期被央行目标「锚定」的作用很大。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>The AD/AS explanation:</strong> on the upward-sloping part of the Keynesian AS curve, an increase in AD raises real output (lowering unemployment) but also raises the price level (higher inflation). From Y₁ to Y₂ unemployment falls while the price level rises from P₁ to P₂.
            </p>
            <AdGrowth caption="Figure 11 AD rises from AD₁ to AD₂: output rises and unemployment falls, but the price level rises, showing the short-run trade-off between inflation and unemployment." />
            <Def term="Short-run Phillips curve (SRPC)">
              A curve showing the <strong>inverse relationship</strong> between the inflation rate and the unemployment rate in the short run: lower unemployment comes at the cost of higher inflation.
            </Def>
            <Srpc caption="Figure 12 Short-run Phillips curve: from A to B unemployment falls from U₁ to U₂ and inflation rises from π₁ to π₂." />
            <p>
              The simple trade-off broke down with <strong>stagflation</strong> in the 1970s (high inflation and high unemployment together, as oil price shocks shifted SRAS left). Monetarist/new classical economists explain this with <strong>inflation expectations</strong>:
            </p>
            <ol>
              <li>The economy starts at A: unemployment is at the natural rate (NRU) and inflation π₁ is what people expect.</li>
              <li>The government expands AD and inflation rises to π₂. Workers do not yet realise their real wages have fallen (money illusion), firms hire more and unemployment falls to U₁ (point B).</li>
              <li>Workers come to expect inflation of π₂ and demand higher nominal wages, so SRAS shifts left. SRPC₁ shifts up to SRPC₂: unemployment returns to the NRU but inflation stays at π₂ (point C).</li>
            </ol>
            <Def term="Long-run Phillips curve (LRPC)">
              A <strong>vertical line</strong> at the natural rate of unemployment: in the long run there is no trade-off, and expanding demand only raises inflation. It corresponds to the vertical LRAS curve.
            </Def>
            <Lrpc caption="Figure 13 Long-run Phillips curve: A → B is a short-run movement along SRPC₁; once expectations adjust, SRPC₁ shifts up to SRPC₂ and the economy reaches C, with unemployment back at the NRU and higher inflation." />
            <Callout title="Drawing checklist">
              <ul>
                <li>Inflation rate (%) on the vertical axis and unemployment rate (%) on the horizontal; do not confuse these with AD/AS axes.</li>
                <li>The LRPC is vertical at the NRU, just as LRAS is vertical at Yf.</li>
                <li>An upward shift of the SRPC shows higher expected inflation; holding unemployment below the NRU would require ever-accelerating inflation.</li>
              </ul>
            </Callout>
            <Callout title="Evaluation">
              <p>
                The only lasting way to lower the natural rate is supply-side policy (shifting the LRPC left). In recent decades the Phillips curve appears flatter, with very low unemployment not always bringing much higher inflation, suggesting that expectations anchored by central bank targets matter a great deal.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 3.3 Macroeconomic objectives",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 21.1 How economists define and compute unemployment rate",
      href: "https://openstax.org/books/principles-economics-3e/pages/21-1-how-economists-define-and-compute-unemployment-rate",
    },
    {
      label: "OpenStax Principles of Economics 3e — 22.2 How to measure changes in the cost of living",
      href: "https://openstax.org/books/principles-economics-3e/pages/22-2-how-to-measure-changes-in-the-cost-of-living",
    },
    {
      label: "OpenStax Principles of Economics 3e — 25.3 The Phillips curve",
      href: "https://openstax.org/books/principles-economics-3e/pages/25-3-the-phillips-curve",
    },
  ],
};

export default notes;
