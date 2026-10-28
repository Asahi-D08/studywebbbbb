import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Line, atX, intersect, shift, type Seg } from "@/components/notes/Chart";

type Cap = { caption: ReactNode };

const clip = (seg: Seg, x0: number, x1: number): Seg => [atX(seg, x0), atX(seg, x1)];

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

function MoneyMarket({ caption }: Cap) {
  const dm: Seg = [
    [10, 88],
    [88, 12],
  ];
  const a = atX(dm, 42);
  const b = atX(dm, 62);
  return (
    <Chart x="Quantity of money" y="Interest rate" caption={caption}>
      <Line points={[[42, 4], [42, 92]]} label="Sm₁" labelOffset={[6, 4]} />
      <Line points={[[62, 4], [62, 92]]} label="Sm₂" tone="alt" labelOffset={[6, 4]} />
      <Line points={dm} label="Dm" />
      <Guide at={a} x="M₁" y="i₁" />
      <Guide at={b} x="M₂" y="i₂" />
      <Arrow from={[44, 82]} to={[60, 82]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "货币政策是中央银行通过调整利率和货币供给来管理总需求的政策，目标包括低而稳定的通胀、低失业、平抑经济周期和外部平衡，很多央行采用通胀目标制。本节讲实际利率与名义利率，用 AD/AS 图分析扩张性和紧缩性货币政策，并评价其优势和局限。HL 还要掌握商业银行创造货币的过程、货币政策工具和货币市场均衡利率图。",
    en: "Monetary policy is the management of AD by the central bank through interest rates and the money supply, aiming at low and stable inflation, low unemployment, smaller business cycle swings and external balance; many central banks use inflation targeting. This topic covers real versus nominal interest rates, uses AD/AS diagrams for expansionary and contractionary policy and evaluates its strengths and limits. HL adds money creation by commercial banks, the tools of monetary policy and the money market diagram.",
  },
  sections: [
    {
      id: "monetary-policy",
      level: "both",
      title: { zh: "货币政策及其目标", en: "Monetary policy and its goals" },
      body: {
        zh: (
          <>
            <Def term="Monetary policy">
              由中央银行通过控制<strong>货币供给和利率</strong>来影响总需求，以实现宏观经济目标的政策。
            </Def>
            <p>
              <strong>传导机制：</strong>降息 → 借贷更便宜、储蓄回报更低 → 消费（C）和投资（I）增加；本币往往贬值 → 净出口（X − M）增加；资产价格上升 → 财富效应 → AD 增加。加息则相反。
            </p>
            <p>
              <strong>货币政策的目标：</strong>
            </p>
            <ul>
              <li>低而稳定的通胀率</li>
              <li>低失业</li>
              <li>减少经济周期波动</li>
              <li>为长期增长营造稳定的经济环境（可预期的利率和价格有利于投资）</li>
              <li>外部平衡（利率影响汇率和经常账户）</li>
            </ul>
            <Def term="Inflation targeting">
              中央银行公开宣布一个通胀目标（或目标区间），并调整利率使预期通胀回到目标的做法。
            </Def>
            <Callout title="例子">
              <p>
                英格兰银行的目标是 CPI 通胀 2%；欧洲央行的目标是中期 2%；美联储的目标是 PCE 通胀长期平均 2%。明确的目标有助于「锚定」通胀预期。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Monetary policy">
              The use of the <strong>money supply and interest rates</strong> by the central bank to influence aggregate demand and achieve macroeconomic objectives.
            </Def>
            <p>
              <strong>Transmission:</strong> a cut in interest rates makes borrowing cheaper and saving less rewarding, so consumption (C) and investment (I) rise; the currency tends to depreciate, so net exports (X − M) rise; asset prices rise, giving a wealth effect. AD increases. A rise in rates works the other way.
            </p>
            <p>
              <strong>Goals of monetary policy:</strong>
            </p>
            <ul>
              <li>A low and stable rate of inflation</li>
              <li>Low unemployment</li>
              <li>Reducing business cycle fluctuations</li>
              <li>A stable economic environment for long-term growth (predictable interest rates and prices encourage investment)</li>
              <li>External balance (interest rates affect the exchange rate and the current account)</li>
            </ul>
            <Def term="Inflation targeting">
              A framework in which the central bank announces an inflation target (or target range) and adjusts interest rates to bring expected inflation back to the target.
            </Def>
            <Callout title="Real-world example">
              <p>
                The Bank of England targets 2% CPI inflation, the ECB 2% over the medium term and the US Federal Reserve 2% PCE inflation on average over time. A clear target helps anchor inflation expectations.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "money-creation",
      level: "hl",
      title: { zh: "商业银行创造货币的过程", en: "The process of money creation by commercial banks" },
      body: {
        zh: (
          <>
            <p>
              现代经济中大部分货币是银行存款，而不是现金。商业银行只需把存款的一小部分作为<strong>准备金</strong>（reserves），其余可以贷出。贷款被花掉后，又以存款形式回到银行体系，银行再把其中一部分贷出……每一轮都创造出新的存款，即新的货币。
            </p>
            <Callout title="示例（部分准备金制度）">
              <p>假设准备金率为 10%，某人存入 $1000 新存款：</p>
              <table>
                <thead>
                  <tr>
                    <th>轮次</th>
                    <th>新存款</th>
                    <th>准备金（10%）</th>
                    <th>新贷款（90%）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>$1000</td><td>$100</td><td>$900</td></tr>
                  <tr><td>2</td><td>$900</td><td>$90</td><td>$810</td></tr>
                  <tr><td>3</td><td>$810</td><td>$81</td><td>$729</td></tr>
                  <tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
                </tbody>
              </table>
              <p>
                存款总额最多可达 1000 × <Frac n="1" d="准备金率" /> = 1000 × 10 = $10,000。准备金率越低，银行能创造的货币越多。
              </p>
            </Callout>
            <Callout title="评价">
              <p>
                实际创造的货币通常少于这个最大值：银行可能持有超额准备金，公众会持有部分现金，在经济低迷时银行不愿放贷、企业也不愿借款。现实中银行发放贷款时就同时创造了存款，贷款规模主要受利率、盈利性和监管约束。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              Most money in a modern economy is bank deposits, not cash. Commercial banks keep only a fraction of deposits as <strong>reserves</strong> and lend out the rest. When the loan is spent, it is deposited back into the banking system, and banks lend out part of it again. Each round creates new deposits, i.e. new money.
            </p>
            <Callout title="Illustration (fractional reserve banking)">
              <p>Suppose the reserve ratio is 10% and someone makes a new deposit of $1000:</p>
              <table>
                <thead>
                  <tr>
                    <th>Round</th>
                    <th>New deposit</th>
                    <th>Reserves (10%)</th>
                    <th>New loan (90%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>$1000</td><td>$100</td><td>$900</td></tr>
                  <tr><td>2</td><td>$900</td><td>$90</td><td>$810</td></tr>
                  <tr><td>3</td><td>$810</td><td>$81</td><td>$729</td></tr>
                  <tr><td>…</td><td>…</td><td>…</td><td>…</td></tr>
                </tbody>
              </table>
              <p>
                Total deposits can rise to at most 1000 × <Frac n="1" d="reserve ratio" /> = 1000 × 10 = $10,000. The lower the reserve ratio, the more money banks can create.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <p>
                Actual money creation is usually less than this maximum: banks may hold excess reserves, the public keeps some cash, and in a downturn banks are reluctant to lend and firms to borrow. In practice banks create a deposit at the moment they make a loan, and lending is limited mainly by interest rates, profitability and regulation.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "tools",
      level: "hl",
      title: { zh: "货币政策工具", en: "Tools of monetary policy" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>工具</th>
                  <th>扩张性（增加货币供给 / 降息）</th>
                  <th>紧缩性</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>公开市场操作 Open market operations</td>
                  <td>央行从商业银行<strong>买入</strong>政府债券，银行准备金增加，可以多放贷</td>
                  <td>央行<strong>卖出</strong>政府债券，吸收准备金</td>
                </tr>
                <tr>
                  <td>最低准备金要求 Minimum reserve requirements</td>
                  <td>降低准备金率，银行可以贷出更多</td>
                  <td>提高准备金率</td>
                </tr>
                <tr>
                  <td>调整央行最低贷款利率（基准利率 / 贴现率 / 再融资利率）</td>
                  <td>降低央行向商业银行贷款的利率，商业银行随之下调贷款和存款利率</td>
                  <td>提高基准利率</td>
                </tr>
                <tr>
                  <td>量化宽松 Quantitative easing（QE）</td>
                  <td>利率已接近零时，央行用新创造的货币大规模购买政府债券和其他金融资产，压低长期利率、增加货币供给</td>
                  <td>量化紧缩（QT）：出售或不再续购这些资产</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>2008 年金融危机和 2020 年新冠疫情期间，英格兰银行、美联储、欧洲央行等都把利率降到接近零并实施大规模 QE；2022 年起为对抗通胀而转向加息和 QT。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Expansionary (more money / lower rates)</th>
                  <th>Contractionary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Open market operations</td>
                  <td>The central bank <strong>buys</strong> government bonds from commercial banks, raising their reserves so they can lend more</td>
                  <td>The central bank <strong>sells</strong> government bonds, draining reserves</td>
                </tr>
                <tr>
                  <td>Minimum reserve requirements</td>
                  <td>Lower the required reserve ratio so banks can lend more</td>
                  <td>Raise the reserve ratio</td>
                </tr>
                <tr>
                  <td>Changes in the central bank minimum lending rate (base rate / discount rate / refinancing rate)</td>
                  <td>Cut the rate at which the central bank lends to commercial banks; banks then cut their own lending and deposit rates</td>
                  <td>Raise the base rate</td>
                </tr>
                <tr>
                  <td>Quantitative easing (QE)</td>
                  <td>When rates are already near zero, the central bank uses newly created money to buy large amounts of government bonds and other financial assets, lowering long-term interest rates and increasing the money supply</td>
                  <td>Quantitative tightening (QT): selling these assets or not replacing them as they mature</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>After the 2008 financial crisis and during the 2020 pandemic, the Bank of England, the Fed and the ECB cut rates close to zero and used large-scale QE; from 2022 they turned to rate rises and QT to fight inflation.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "money-market",
      level: "hl",
      title: { zh: "货币供求与均衡利率的决定", en: "Demand and supply of money: equilibrium interest rates" },
      body: {
        zh: (
          <>
            <ul>
              <li>
                <strong>货币供给（Sm）</strong>由中央银行决定，与利率无关，因此是一条<strong>垂直线</strong>。
              </li>
              <li>
                <strong>货币需求（Dm）</strong>向下倾斜：利率是持有货币（而不是购买债券等生息资产）的机会成本，利率越低，人们愿意持有的货币越多。
              </li>
              <li>两者相交决定<strong>均衡利率</strong>。</li>
            </ul>
            <MoneyMarket caption="图 1 央行增加货币供给（如公开市场买入债券），Sm₁ 右移到 Sm₂，均衡利率从 i₁ 降到 i₂。减少货币供给则利率上升。" />
            <Callout title="画图要点">
              <ul>
                <li>纵轴 Interest rate，横轴 Quantity of money；Sm 垂直，Dm 向下倾斜。</li>
                <li>收入增加会使 Dm 右移（交易需求增加），在 Sm 不变时利率上升。</li>
                <li>实际操作中，央行通常先设定目标利率，再调整货币供给来实现它。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <ul>
              <li>
                The <strong>money supply (Sm)</strong> is set by the central bank and does not depend on the interest rate, so it is a <strong>vertical line</strong>.
              </li>
              <li>
                <strong>Money demand (Dm)</strong> slopes down: the interest rate is the opportunity cost of holding money rather than interest-bearing assets such as bonds, so people hold more money when rates are low.
              </li>
              <li>Their intersection determines the <strong>equilibrium interest rate</strong>.</li>
            </ul>
            <MoneyMarket caption="Figure 1 The central bank increases the money supply (e.g. by buying bonds in open market operations): Sm₁ shifts right to Sm₂ and the equilibrium interest rate falls from i₁ to i₂. A lower money supply raises the rate." />
            <Callout title="Drawing checklist">
              <ul>
                <li>Interest rate on the vertical axis, quantity of money on the horizontal; Sm vertical, Dm downward sloping.</li>
                <li>Higher incomes shift Dm right (more transactions demand), raising the rate if Sm is unchanged.</li>
                <li>In practice central banks usually set a target interest rate and adjust the money supply to achieve it.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "real-nominal",
      level: "both",
      title: { zh: "实际利率与名义利率", en: "Real versus nominal interest rates" },
      body: {
        zh: (
          <>
            <Def term="Nominal interest rate">银行公布的、未经通胀调整的利率。</Def>
            <Def term="Real interest rate">剔除通胀后的利率，反映借款的真实成本和储蓄的真实回报。</Def>
            <Formula>实际利率 ≈ 名义利率 − 通胀率</Formula>
            <Callout title="例题">
              <ul>
                <li>名义利率 5%，通胀率 3%：实际利率 = 5% − 3% = <strong>2%</strong>。</li>
                <li>名义利率 1%，通胀率 4%：实际利率 = 1% − 4% = <strong>−3%</strong>，储户的购买力在下降，借款人受益。</li>
              </ul>
            </Callout>
            <p>消费和投资决策取决于<strong>实际</strong>利率。所以通胀上升时，若央行不加息，实际利率下降，货币政策实际上变得更宽松。</p>
          </>
        ),
        en: (
          <>
            <Def term="Nominal interest rate">The interest rate quoted by banks, not adjusted for inflation.</Def>
            <Def term="Real interest rate">The interest rate adjusted for inflation; it shows the true cost of borrowing and the true return on saving.</Def>
            <Formula>Real interest rate ≈ nominal interest rate − inflation rate</Formula>
            <Callout title="Worked example">
              <ul>
                <li>Nominal rate 5%, inflation 3%: real rate = 5% − 3% = <strong>2%</strong>.</li>
                <li>Nominal rate 1%, inflation 4%: real rate = 1% − 4% = <strong>−3%</strong>; savers lose purchasing power and borrowers gain.</li>
              </ul>
            </Callout>
            <p>Spending and investment decisions depend on the <strong>real</strong> rate. If inflation rises and the central bank does not raise rates, the real rate falls and policy has in effect become looser.</p>
          </>
        ),
      },
    },
    {
      id: "expansionary-contractionary",
      level: "both",
      title: { zh: "扩张性与紧缩性货币政策", en: "Expansionary and contractionary monetary policy" },
      body: {
        zh: (
          <>
            <ul>
              <li>
                <strong>扩张性（宽松）货币政策：</strong>经济存在通缩（衰退）缺口时，降息或增加货币供给 → C、I、X − M 增加 → AD 右移，产出回到 Yf，失业下降。
              </li>
              <li>
                <strong>紧缩性货币政策：</strong>经济存在通胀缺口时，加息或减少货币供给 → AD 左移，价格水平下降、产出回到 Yf。
              </li>
            </ul>
            <CloseGap gap="deflationary" caption="图 2 扩张性货币政策：经济在 Y₁ 处存在衰退缺口；降息使 AD₁ 右移到 AD₂，产出增至 Yf，价格水平从 P₁ 升至 P₂。" />
            <CloseGap gap="inflationary" caption="图 3 紧缩性货币政策：经济在 Y₁ 处存在通胀缺口；加息使 AD₁ 左移到 AD₂，产出回到 Yf，价格水平从 P₁ 降至 P₂。" />
            <Callout title="考试提示">
              <p>写出完整的传导链（利率 → 借贷成本 → C 和 I → AD → 产出、价格水平、失业），只说「降息使 AD 增加」拿不到高分。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <ul>
              <li>
                <strong>Expansionary (loose) monetary policy:</strong> with a deflationary (recessionary) gap, the central bank cuts interest rates or increases the money supply, so C, I and X − M rise, AD shifts right, output returns towards Yf and unemployment falls.
              </li>
              <li>
                <strong>Contractionary (tight) monetary policy:</strong> with an inflationary gap, it raises interest rates or reduces the money supply, so AD shifts left, the price level falls back and output returns to Yf.
              </li>
            </ul>
            <CloseGap gap="deflationary" caption="Figure 2 Expansionary monetary policy: the economy has a recessionary gap at Y₁; lower interest rates shift AD₁ right to AD₂, raising output to Yf and the price level from P₁ to P₂." />
            <CloseGap gap="inflationary" caption="Figure 3 Contractionary monetary policy: the economy has an inflationary gap at Y₁; higher interest rates shift AD₁ left to AD₂, bringing output back to Yf and the price level down from P₁ to P₂." />
            <Callout title="Exam tip">
              <p>Write the full chain (interest rate → cost of borrowing → C and I → AD → output, price level, unemployment). Simply saying that lower rates increase AD will not earn top marks.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "effectiveness",
      level: "both",
      title: { zh: "货币政策的有效性", en: "Effectiveness of monetary policy" },
      body: {
        zh: (
          <>
            <p>
              <strong>局限：</strong>
            </p>
            <ul>
              <li>
                <strong>利率接近零时降息空间有限</strong>（零利率下限 zero lower bound）：利率无法再大幅下调，央行只能依赖 QE 等非常规工具。
              </li>
              <li>
                <strong>消费者和企业信心低迷：</strong>衰退中即使利率很低，人们也可能因为担心失业和需求不足而不借款、不消费（「推绳子」pushing on a string）。
              </li>
              <li>影响 AD 的时滞较长，通常要 1 到 2 年才完全见效；对不同地区和群体的影响也不均衡（如有房贷者受影响更大）。</li>
            </ul>
            <p>
              <strong>优势：</strong>
            </p>
            <ul>
              <li><strong>渐进、灵活、容易逆转：</strong>可以每次调整 0.25 个百分点，情况变化时随时调整方向。</li>
              <li><strong>决策时滞短：</strong>独立的央行可以定期开会、迅速决定，不需要立法和政治程序。</li>
              <li>独立央行不受选举周期影响，政策更可信，有助于锚定通胀预期。</li>
            </ul>
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
                  <td>低而稳定的利率鼓励投资，扩大长期生产能力</td>
                  <td>只影响需求，不能直接解决供给侧问题</td>
                </tr>
                <tr>
                  <td>低失业</td>
                  <td>可以减少周期性失业</td>
                  <td>对结构性、摩擦性失业无效；衰退严重时效果弱</td>
                </tr>
                <tr>
                  <td>低而稳定的通胀</td>
                  <td>对需求拉动型通胀很有效</td>
                  <td>对成本推动型通胀，加息会进一步压低产出、提高失业</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>货币政策最适合「微调」和控制需求拉动型通胀；在深度衰退或利率已接近零时，往往需要财政政策配合（见 3.6）。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Constraints:</strong>
            </p>
            <ul>
              <li>
                <strong>Limited scope to cut rates when they are close to zero</strong> (the zero lower bound): there is little room left, so central banks have to rely on unconventional tools such as QE.
              </li>
              <li>
                <strong>Low consumer and business confidence:</strong> in a recession people may not borrow or spend even at very low rates because they fear job losses and weak demand (pushing on a string).
              </li>
              <li>The effect on AD takes time, often one to two years to work through fully, and falls unevenly on regions and groups (e.g. households with mortgages are hit hardest).</li>
            </ul>
            <p>
              <strong>Strengths:</strong>
            </p>
            <ul>
              <li><strong>Incremental, flexible and easily reversible:</strong> rates can be changed in steps of 0.25 percentage points and the direction changed as conditions change.</li>
              <li><strong>Short time lags in decision-making:</strong> an independent central bank meets regularly and can act quickly, without legislation or political debate.</li>
              <li>Central bank independence from the electoral cycle makes policy more credible and helps anchor inflation expectations.</li>
            </ul>
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
                  <td>Low, stable rates encourage investment and expand long-run capacity</td>
                  <td>Works on demand only; cannot fix supply-side problems directly</td>
                </tr>
                <tr>
                  <td>Low unemployment</td>
                  <td>Can reduce cyclical unemployment</td>
                  <td>Ineffective against structural and frictional unemployment; weak in a deep recession</td>
                </tr>
                <tr>
                  <td>Low and stable inflation</td>
                  <td>Very effective against demand-pull inflation</td>
                  <td>With cost-push inflation, higher rates cut output further and raise unemployment</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>Monetary policy is best for fine-tuning and controlling demand-pull inflation; in a deep recession, or when rates are already near zero, it usually needs support from fiscal policy (see 3.6).</p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 3.5 Monetary policy",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 27.4 How banks create money",
      href: "https://openstax.org/books/principles-economics-3e/pages/27-4-how-banks-create-money",
    },
    {
      label: "OpenStax Principles of Economics 3e — 28.3 How a central bank executes monetary policy",
      href: "https://openstax.org/books/principles-economics-3e/pages/28-3-how-a-central-bank-executes-monetary-policy",
    },
    {
      label: "Bank of England — How is money created?",
      href: "https://www.bankofengland.co.uk/explainers/how-is-money-created",
    },
  ],
};

export default notes;
