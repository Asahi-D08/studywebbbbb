import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac, HL } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, atX, atY, intersect, shift, type Pt, type Seg } from "@/components/notes/Chart";

type Cap = { caption: ReactNode };

const clip = (seg: Seg, x0: number, x1: number): Seg => [atX(seg, x0), atX(seg, x1)];

// Keynesian AS: horizontal, then rising ever more steeply until it is vertical at Yf.
const KYF = 69.2;
const K = (x: number) => (x <= 30 ? 20 : 20 + (5 * (x - 30)) / (72 - x));
const KAS: Pt[] = [30, 40, 48, 54, 59, 62.5, 65, 66.8, 68, 68.8, KYF].map((x) => [x, K(x)]);

function crossK(ad: Seg): Pt {
  let lo = 5;
  let hi = KYF;
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
      <Line points={[[KYF, 0], [KYF, 92]]} dashed tone="muted" />
      <Label at={[KYF, -6.25]} anchor="middle">
        Yf
      </Label>
      <Line points={[[5, 20], [30, 20]]} />
      <Line points={KAS} smooth label="AS" labelOffset={[8, 6]} />
    </>
  );
}

function KeynesExpansion({ caption }: Cap) {
  const ad1: Seg = [
    [8, 59.78],
    [52, 15.78],
  ];
  const ad2 = clip(shift(ad1, 30.22), 26, 80);
  const a = crossK(ad1);
  const b = crossK(ad2);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <KeynesAS />
      <Line points={ad1} label="AD₁" />
      <Line points={ad2} label="AD₂" tone="alt" />
      <Guide at={a} x="Y₁" y="P₁" />
      <Guide at={b} x="Y₂" y="P₂" />
      <Arrow from={[20, 50]} to={[45.5, 50]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

function KeynesContraction({ caption }: Cap) {
  const ad1: Seg = [
    [56, 87.5],
    [92, 51.5],
  ];
  const ad2: Seg = [
    [34, 90],
    [90, 34],
  ];
  const a = crossK(ad1);
  const b = crossK(ad2);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <KeynesAS />
      <Line points={ad1} label="AD₁" />
      <Line points={ad2} label="AD₂" tone="alt" />
      <Guide at={a} y="P₁" />
      <Guide at={b} y="P₂" />
      <Arrow from={[57.5, 84]} to={[42, 84]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

const YF = 55;
const SRAS: Seg = [
  [12, 18],
  [90, 80],
];
const EF = atX(SRAS, YF);
const ADF: Seg = [
  [EF[0] - 35, EF[1] + 35],
  [EF[0] + 35, EF[1] - 35],
];

function CloseGap({ caption, gap }: Cap & { gap: "deflationary" | "inflationary" }) {
  const exp = gap === "deflationary";
  const ad1 = exp ? shift(ADF, -16) : clip(shift(ADF, 16), ADF[0][0] + 16, 92);
  const e1 = intersect(ad1, SRAS);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <Line points={[[YF, 4], [YF, 92]]} label="LRAS" labelOffset={[6, 4]} />
      <Line points={SRAS} label="SRAS" />
      <Line points={ad1} label="AD₁" />
      <Line points={ADF} label="AD₂" tone="alt" />
      <Guide at={e1} x="Y₁" y="P₁" />
      <Guide at={EF} x="Yf" y="P₂" />
      <Arrow from={exp ? [23.5, 70] : [51, 70]} to={exp ? [35, 70] : [39.5, 70]} />
      <Dot at={e1} />
      <Dot at={EF} />
    </Chart>
  );
}

function CrowdingOut({ caption }: Cap) {
  const s: Seg = [
    [10, 15],
    [85, 85],
  ];
  const d1: Seg = [
    [10, 85],
    [75, 15],
  ];
  const d2 = shift(d1, 18);
  const a = intersect(d1, s);
  const b = intersect(d2, s);
  const p = atY(d1, b[1]);
  return (
    <Chart x="Quantity of loanable funds" y="Real interest rate" caption={caption}>
      <Line points={s} label="S" />
      <Line points={d1} label="D₁" />
      <Line points={d2} label="D₂" tone="alt" />
      <Guide at={a} x="Q₁" y="r₁" />
      <Guide at={b} x="Q₂" y="r₂" />
      <Guide at={p} x="Qp" />
      <Arrow from={[26, 70]} to={[39.5, 70]} />
      <Dot at={a} />
      <Dot at={b} />
      <Dot at={p} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "财政政策是政府通过调整税收和政府支出来影响总需求的政策。本节讲政府收入和支出的来源与类别、财政政策的目标，并用凯恩斯学派和货币主义/新古典学派的 AD/AS 图分析扩张性与紧缩性财政政策，最后评价其局限与优势。HL 还要掌握凯恩斯乘数的计算、挤出效应和自动稳定器。",
    en: "Fiscal policy is the use of taxation and government spending to influence aggregate demand. This topic covers the sources of government revenue and types of spending, the goals of fiscal policy, AD/AS diagrams of expansionary and contractionary policy for both the Keynesian and monetarist/new classical schools, and an evaluation of its constraints and strengths. HL adds Keynesian multiplier calculations, crowding out and automatic stabilisers.",
  },
  sections: [
    {
      id: "fiscal-policy",
      level: "both",
      title: { zh: "财政政策：政府收入与支出", en: "Fiscal policy: government revenue and expenditure" },
      body: {
        zh: (
          <>
            <Def term="Fiscal policy">政府通过改变<strong>税收和政府支出</strong>来影响总需求，从而实现宏观经济目标的政策。</Def>
            <table>
              <thead>
                <tr>
                  <th>政府收入来源</th>
                  <th>政府支出类别</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>直接税：个人所得税、企业所得税、财富税</td>
                  <td>经常性支出（current expenditures）：日常运营支出，如公务员和教师工资、药品、办公用品</td>
                </tr>
                <tr>
                  <td>间接税：增值税、消费税、关税</td>
                  <td>资本性支出（capital expenditures）：公共投资，如道路、医院、学校建设，增加生产能力</td>
                </tr>
                <tr>
                  <td>国有企业出售商品和服务的收入（如国有铁路票价、电费）</td>
                  <td>转移支付（transfer payments）：养老金、失业救济、儿童补贴，不对应任何产出，不计入 GDP 中的 G</td>
                </tr>
                <tr>
                  <td>出售政府资产（如私有化国有企业、出售土地）</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <Def term="Budget deficit / surplus">
              某年政府支出大于税收收入为<strong>预算赤字</strong>，小于税收收入为<strong>预算盈余</strong>，相等为预算平衡。
            </Def>
          </>
        ),
        en: (
          <>
            <Def term="Fiscal policy">The use of <strong>taxation and government spending</strong> to influence aggregate demand and achieve macroeconomic objectives.</Def>
            <table>
              <thead>
                <tr>
                  <th>Sources of government revenue</th>
                  <th>Types of government expenditure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Direct taxes: personal income tax, corporate income tax, wealth taxes</td>
                  <td>Current expenditures: day-to-day running costs, e.g. salaries of civil servants and teachers, medicines, supplies</td>
                </tr>
                <tr>
                  <td>Indirect taxes: VAT, excise duties, tariffs</td>
                  <td>Capital expenditures: public investment such as roads, hospitals and schools, which adds to productive capacity</td>
                </tr>
                <tr>
                  <td>Sale of goods and services by state-owned enterprises (e.g. rail fares, electricity charges)</td>
                  <td>Transfer payments: pensions, unemployment benefits, child benefits; no output is produced in return, so they are not part of G in GDP</td>
                </tr>
                <tr>
                  <td>Sale of government assets (e.g. privatising state firms, selling land)</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <Def term="Budget deficit / surplus">
              A <strong>budget deficit</strong> occurs when government spending exceeds tax revenue in a year, a <strong>budget surplus</strong> when revenue exceeds spending; if they are equal the budget is balanced.
            </Def>
          </>
        ),
      },
    },
    {
      id: "goals",
      level: "both",
      title: { zh: "财政政策的目标", en: "Goals of fiscal policy" },
      body: {
        zh: (
          <>
            <ul>
              <li>低而稳定的通胀</li>
              <li>低失业</li>
              <li>为长期增长营造稳定的经济环境（如基础设施、教育投资）</li>
              <li>减少经济周期波动</li>
              <li>收入分配公平（累进税和转移支付，见 3.4）</li>
              <li>外部平衡（例如紧缩财政减少进口支出，改善经常账户）</li>
            </ul>
            <Callout title="考试提示">
              <p>与货币政策相比，财政政策多了一个目标：<strong>收入分配公平</strong>。这是因为税收和支出可以直接针对不同收入群体。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <ul>
              <li>Low and stable inflation</li>
              <li>Low unemployment</li>
              <li>A stable economic environment for long-term growth (e.g. investment in infrastructure and education)</li>
              <li>Reducing business cycle fluctuations</li>
              <li>An equitable distribution of income (progressive taxes and transfer payments; see 3.4)</li>
              <li>External balance (e.g. contractionary policy reduces spending on imports and improves the current account)</li>
            </ul>
            <Callout title="Exam tip">
              <p>Compared with monetary policy, fiscal policy has one extra goal: <strong>an equitable distribution of income</strong>, because taxes and spending can be aimed directly at particular income groups.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "expansionary-contractionary",
      level: "both",
      title: { zh: "扩张性与紧缩性财政政策", en: "Expansionary and contractionary fiscal policy" },
      body: {
        zh: (
          <>
            <ul>
              <li>
                <strong>扩张性财政政策：</strong>增加政府支出（G）和 / 或减税（提高可支配收入和利润，C 和 I 增加）→ AD 右移，用于缩小通缩（衰退）缺口。通常会扩大预算赤字。
              </li>
              <li>
                <strong>紧缩性财政政策：</strong>削减政府支出和 / 或加税 → AD 左移，用于缩小通胀缺口。
              </li>
            </ul>
            <p>
              <strong>凯恩斯学派：</strong>经济可能长期停留在低于 Yf 的均衡，不会自动恢复，因此需要政府扩大 AD。在 AS 曲线的水平或平缓部分，AD 增加主要提高产出，价格几乎不涨。
            </p>
            <KeynesExpansion caption="图 1 凯恩斯模型中的扩张性财政政策：AD₁ 右移到 AD₂，产出从 Y₁ 增至接近 Yf 的 Y₂，价格水平从 P₁ 小幅升至 P₂。" />
            <KeynesContraction caption="图 2 凯恩斯模型中的紧缩性财政政策：经济处于 AS 垂直部分，AD₁ 左移到 AD₂，价格水平从 P₁ 降至 P₂，而产出基本保持在 Yf。" />
            <p>
              <strong>货币主义 / 新古典学派：</strong>长期中经济会通过工资和价格的调整自动回到 Yf（LRAS 垂直）。财政政策可以在短期内更快地缩小缺口，但长期中只能影响价格水平，不能使产出持续高于 Yf。
            </p>
            <CloseGap gap="deflationary" caption="图 3 货币主义 / 新古典模型中的扩张性财政政策：经济在 Y₁ 处存在衰退缺口，AD₁ 右移到 AD₂，产出回到 Yf，价格水平从 P₁ 升至 P₂。" />
            <CloseGap gap="inflationary" caption="图 4 货币主义 / 新古典模型中的紧缩性财政政策：经济在 Y₁ 处存在通胀缺口，AD₁ 左移到 AD₂，产出回到 Yf，价格水平从 P₁ 降至 P₂。" />
          </>
        ),
        en: (
          <>
            <ul>
              <li>
                <strong>Expansionary fiscal policy:</strong> higher government spending (G) and/or lower taxes (raising disposable income and profits, so C and I rise) shift AD right to close a deflationary (recessionary) gap. It usually widens the budget deficit.
              </li>
              <li>
                <strong>Contractionary fiscal policy:</strong> lower government spending and/or higher taxes shift AD left to close an inflationary gap.
              </li>
            </ul>
            <p>
              <strong>Keynesian view:</strong> the economy can stay stuck at an equilibrium below Yf with no automatic recovery, so the government should boost AD. On the flat or gently rising part of the AS curve, higher AD mainly raises output with little effect on prices.
            </p>
            <KeynesExpansion caption="Figure 1 Expansionary fiscal policy in the Keynesian model: AD₁ shifts right to AD₂, raising output from Y₁ to Y₂ close to Yf, with only a small rise in the price level from P₁ to P₂." />
            <KeynesContraction caption="Figure 2 Contractionary fiscal policy in the Keynesian model: on the vertical part of AS, AD₁ shifts left to AD₂, lowering the price level from P₁ to P₂ while output stays at about Yf." />
            <p>
              <strong>Monetarist/new classical view:</strong> in the long run the economy returns to Yf by itself as wages and prices adjust (LRAS is vertical). Fiscal policy can close a gap faster in the short run, but in the long run it affects only the price level and cannot keep output above Yf.
            </p>
            <CloseGap gap="deflationary" caption="Figure 3 Expansionary fiscal policy in the monetarist/new classical model: with a recessionary gap at Y₁, AD₁ shifts right to AD₂, output returns to Yf and the price level rises from P₁ to P₂." />
            <CloseGap gap="inflationary" caption="Figure 4 Contractionary fiscal policy in the monetarist/new classical model: with an inflationary gap at Y₁, AD₁ shifts left to AD₂, output returns to Yf and the price level falls from P₁ to P₂." />
          </>
        ),
      },
    },
    {
      id: "multiplier",
      level: "hl",
      title: { zh: "凯恩斯乘数", en: "The Keynesian multiplier" },
      body: {
        zh: (
          <>
            <Def term="Keynesian multiplier">
              注入（投资、政府支出或出口）的初始变化引起实际 GDP 成倍变化的过程：一个人的支出是另一个人的收入，收入的一部分又被花掉，形成多轮支出。
            </Def>
            <ul>
              <li><strong>MPC</strong>（边际消费倾向）：额外收入中用于（国内）消费的比例</li>
              <li><strong>MPS</strong>（边际储蓄倾向）、<strong>MPT</strong>（边际税收倾向）、<strong>MPM</strong>（边际进口倾向）：额外收入中流出（漏出）循环流的比例</li>
              <li>MPC + MPS + MPT + MPM = 1</li>
            </ul>
            <Formula>
              乘数 k = <Frac n="1" d="1 − MPC" /> 或 <Frac n="1" d="MPS + MPT + MPM" />
            </Formula>
            <Formula>实际 GDP 的变化 = k × 注入的初始变化</Formula>
            <Callout title="例题 1">
              <p>
                MPC = 0.8。k = 1 ÷ (1 − 0.8) = <strong>5</strong>。政府支出增加 $200 亿，实际 GDP 最终增加 5 × 200 = <strong>$1000 亿</strong>。
              </p>
              <p>过程：第一轮收入 +$200 亿，第二轮 +$160 亿，第三轮 +$128 亿……总和为 $1000 亿。</p>
            </Callout>
            <Callout title="例题 2">
              <p>
                MPS = 0.1，MPT = 0.2，MPM = 0.1。k = 1 ÷ (0.1 + 0.2 + 0.1) = 1 ÷ 0.4 = <strong>2.5</strong>。投资增加 $400 亿，实际 GDP 增加 2.5 × 400 = <strong>$1000 亿</strong>。
              </p>
              <p>反过来：若衰退缺口为 $600 亿而 k = 3，政府只需增加支出 600 ÷ 3 = $200 亿。</p>
            </Callout>
            <Callout title="评价">
              <p>
                漏出越多（储蓄率、税率或进口倾向越高），乘数越小，所以开放经济的乘数通常远小于简单公式。经济接近 Yf 时，乘数效应更多表现为价格上涨而不是产出增加；挤出效应和时滞也会削弱乘数。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Keynesian multiplier">
              The process by which an initial change in an injection (investment, government spending or exports) leads to a larger change in real GDP: one person&apos;s spending is another&apos;s income, part of which is spent again over many rounds.
            </Def>
            <ul>
              <li><strong>MPC</strong> (marginal propensity to consume): the fraction of extra income spent on (domestic) consumption</li>
              <li><strong>MPS</strong> (save), <strong>MPT</strong> (tax) and <strong>MPM</strong> (import): the fractions of extra income that leak out of the circular flow</li>
              <li>MPC + MPS + MPT + MPM = 1</li>
            </ul>
            <Formula>
              Multiplier k = <Frac n="1" d="1 − MPC" /> or <Frac n="1" d="MPS + MPT + MPM" />
            </Formula>
            <Formula>Change in real GDP = k × initial change in injection</Formula>
            <Callout title="Worked example 1">
              <p>
                MPC = 0.8. k = 1 ÷ (1 − 0.8) = <strong>5</strong>. Government spending rises by $20bn, so real GDP eventually rises by 5 × 20 = <strong>$100bn</strong>.
              </p>
              <p>The rounds: income rises by $20bn, then $16bn, then $12.8bn, and so on, adding up to $100bn.</p>
            </Callout>
            <Callout title="Worked example 2">
              <p>
                MPS = 0.1, MPT = 0.2, MPM = 0.1. k = 1 ÷ (0.1 + 0.2 + 0.1) = 1 ÷ 0.4 = <strong>2.5</strong>. Investment rises by $40bn, so real GDP rises by 2.5 × 40 = <strong>$100bn</strong>.
              </p>
              <p>Working backwards: to close a recessionary gap of $60bn when k = 3, the government needs to raise spending by only 60 ÷ 3 = $20bn.</p>
            </Callout>
            <Callout title="Evaluation">
              <p>
                The larger the leakages (high saving, tax or import propensities), the smaller the multiplier, so in open economies it is usually much smaller than the simple formula suggests. Near Yf the multiplier shows up more in higher prices than in higher output, and crowding out and time lags weaken it further.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "constraints",
      level: "both",
      title: { zh: "财政政策的局限", en: "Constraints on fiscal policy" },
      body: {
        zh: (
          <>
            <ul>
              <li>
                <strong>政治压力：</strong>加税和削减支出不受选民欢迎，政府在选举前倾向于扩张；某些支出（如养老金）一旦增加就难以削减，因此紧缩性财政政策很难实施。
              </li>
              <li>
                <strong>时滞：</strong>识别问题、制定和通过预算、实施项目（如基建要规划和招标）都需要时间。等政策见效时，经济可能已经复苏，反而加剧波动。
              </li>
              <li>
                <strong>可持续的债务：</strong>扩张性政策通常靠借款融资，增加政府债务；债务过高会带来利息负担、评级下调和未来加税的压力（见 3.3），限制了财政空间。
              </li>
            </ul>
          </>
        ),
        en: (
          <>
            <ul>
              <li>
                <strong>Political pressure:</strong> tax rises and spending cuts are unpopular, governments tend to expand before elections, and some spending (e.g. pensions) is hard to cut once raised, so contractionary fiscal policy is difficult to carry out.
              </li>
              <li>
                <strong>Time lags:</strong> recognising the problem, drawing up and passing a budget, and carrying out projects (infrastructure needs planning and tendering) all take time. By the time the policy works the economy may already have recovered, making fluctuations worse.
              </li>
              <li>
                <strong>Sustainable debt:</strong> expansionary policy is usually financed by borrowing, which adds to government debt; high debt brings interest costs, credit rating downgrades and pressure for future tax rises (see 3.3), limiting fiscal space.
              </li>
            </ul>
          </>
        ),
      },
    },
    {
      id: "crowding-out",
      level: "hl",
      title: { zh: "挤出效应", en: "Crowding out" },
      body: {
        zh: (
          <>
            <Def term="Crowding out">
              政府为赤字融资而借款，增加了对可贷资金的需求，推高实际利率，使私人部门的投资和消费减少，从而部分抵消扩张性财政政策对 AD 的作用。
            </Def>
            <CrowdingOut caption="图 5 可贷资金市场：政府借款使需求从 D₁ 增至 D₂，实际利率从 r₁ 升至 r₂。在 r₂ 下私人部门只借 Qp（原来是 Q₁），Qp 到 Q₁ 的私人投资被挤出。" />
            <Callout title="评价">
              <p>
                货币主义 / 新古典学派认为挤出效应很大，所以财政政策作用有限。凯恩斯学派认为在深度衰退中私人投资需求本来就很弱、存在大量闲置储蓄，政府借款几乎不会推高利率，挤出效应很小；若央行同时保持低利率，挤出效应也会减弱。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Crowding out">
              When government borrowing to finance a deficit raises the demand for loanable funds, pushing up real interest rates and reducing private investment and consumption, so that part of the boost to AD from expansionary fiscal policy is offset.
            </Def>
            <CrowdingOut caption="Figure 5 Loanable funds market: government borrowing raises demand from D₁ to D₂ and the real interest rate from r₁ to r₂. At r₂ private borrowers take only Qp instead of Q₁, so private investment of Qp to Q₁ is crowded out." />
            <Callout title="Evaluation">
              <p>
                Monetarist/new classical economists see crowding out as large, so fiscal policy has limited power. Keynesians argue that in a deep recession private demand for investment is weak and there are plenty of idle savings, so government borrowing hardly raises interest rates and crowding out is small; it is also weaker if the central bank keeps rates low.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "strengths",
      level: "both",
      title: { zh: "财政政策的优势与评价", en: "Strengths of fiscal policy and evaluation" },
      body: {
        zh: (
          <>
            <ul>
              <li>
                <strong>可以针对特定经济部门：</strong>例如在衰退地区投资基建、补贴绿色能源，或给低收入家庭转移支付，而货币政策对整个经济「一刀切」。
              </li>
              <li>
                <strong>在深度衰退中政府支出很有效：</strong>当利率已接近零、信心低迷时，货币政策难以奏效，而政府支出直接增加 AD，不依赖私人部门是否愿意借贷。
              </li>
            </ul>
            <HL>
              <p>
                <strong>自动稳定器（automatic stabilizers）：</strong>不需要政府做新决定、能随经济周期自动缓和波动的财政机制。
              </p>
              <ul>
                <li><strong>累进税：</strong>经济繁荣时收入上升，人们进入更高税级，税收增长快于收入，抑制 AD；衰退时税收自动下降得更多，支撑可支配收入。</li>
                <li><strong>失业救济：</strong>衰退时失业增加，救济支出自动上升，维持消费；繁荣时支出自动下降。</li>
              </ul>
              <p>它们没有决策时滞，但只能减轻而不能消除波动。</p>
            </HL>
            <table>
              <thead>
                <tr>
                  <th>目标</th>
                  <th>优势</th>
                  <th>局限</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>增长</td>
                  <td>资本性支出（基建、教育、科研）同时增加 AD 和 LRAS</td>
                  <td>高债务、挤出效应可能拖累长期增长</td>
                </tr>
                <tr>
                  <td>低失业</td>
                  <td>能直接创造就业，可针对失业严重的地区</td>
                  <td>时滞长；对结构性失业效果有限</td>
                </tr>
                <tr>
                  <td>低而稳定的通胀</td>
                  <td>紧缩政策可以抑制需求拉动型通胀</td>
                  <td>政治上难以加税和减支；对成本推动型通胀效果差</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>2020 年新冠疫情期间，许多国家推出大规模财政刺激（如美国的直接现金补贴、英国的工资补贴计划），稳定了收入和就业，但政府债务大幅上升，之后的高通胀也部分与过度刺激有关。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <ul>
              <li>
                <strong>Targeting of specific economic sectors:</strong> e.g. infrastructure in depressed regions, subsidies for green energy or transfers to low-income households, whereas monetary policy affects the whole economy in the same way.
              </li>
              <li>
                <strong>Government spending is effective in a deep recession:</strong> when interest rates are near zero and confidence is low, monetary policy struggles, but government spending adds to AD directly without relying on private willingness to borrow.
              </li>
            </ul>
            <HL>
              <p>
                <strong>Automatic stabilisers:</strong> features of the fiscal system that dampen fluctuations over the business cycle automatically, without any new government decision.
              </p>
              <ul>
                <li><strong>Progressive taxes:</strong> in a boom incomes rise and people move into higher tax bands, so tax revenue rises faster than income and restrains AD; in a recession tax revenue falls by more, supporting disposable income.</li>
                <li><strong>Unemployment benefits:</strong> in a recession unemployment rises, so benefit spending rises automatically and supports consumption; in a boom it falls automatically.</li>
              </ul>
              <p>They have no decision lag, but they can only soften fluctuations, not remove them.</p>
            </HL>
            <table>
              <thead>
                <tr>
                  <th>Objective</th>
                  <th>Strengths</th>
                  <th>Limitations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Growth</td>
                  <td>Capital spending (infrastructure, education, research) raises both AD and LRAS</td>
                  <td>High debt and crowding out may drag on long-run growth</td>
                </tr>
                <tr>
                  <td>Low unemployment</td>
                  <td>Creates jobs directly and can target regions with high unemployment</td>
                  <td>Long time lags; limited effect on structural unemployment</td>
                </tr>
                <tr>
                  <td>Low and stable inflation</td>
                  <td>Contractionary policy can curb demand-pull inflation</td>
                  <td>Tax rises and spending cuts are politically hard; weak against cost-push inflation</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>During the 2020 pandemic many countries used large fiscal stimulus (e.g. US stimulus cheques, the UK furlough scheme), which protected incomes and jobs, but government debt rose sharply and the high inflation that followed was partly linked to excessive stimulus.</p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 3.6 Fiscal policy",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 30.4 Using fiscal policy to fight recession, unemployment, and inflation",
      href: "https://openstax.org/books/principles-economics-3e/pages/30-4-using-fiscal-policy-to-fight-recession-unemployment-and-inflation",
    },
    {
      label: "OpenStax Principles of Economics 3e — 30.6 Practical problems with discretionary fiscal policy",
      href: "https://openstax.org/books/principles-economics-3e/pages/30-6-practical-problems-with-discretionary-fiscal-policy",
    },
    {
      label: "OpenStax Principles of Economics 3e — 31.1 How government borrowing affects investment and the trade balance",
      href: "https://openstax.org/books/principles-economics-3e/pages/31-1-how-government-borrowing-affects-investment-and-the-trade-balance",
    },
  ],
};

export default notes;
