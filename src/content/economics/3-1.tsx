import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac } from "@/components/notes/blocks";
import { Chart, Dot, Label, Line, type Pt } from "@/components/notes/Chart";

const STROKE = "stroke-brand-800 dark:stroke-brand-200";
const TEXT = "fill-slate-800 dark:fill-slate-100";
const TEXT_MUTED = "fill-slate-500 dark:fill-slate-400";

function Box({ x, y, w, h, label, sub }: { x: number; y: number; w: number; h: number; label: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} strokeWidth={1.8} className={`${STROKE} fill-brand-300/20 dark:fill-brand-400/15`} />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -2 : 4)} textAnchor="middle" fontWeight={600} className={TEXT}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize={10.5} className={TEXT_MUTED}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Flow({ d, muted = false }: { d: string; muted?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={1.8}
      markerEnd="url(#cf-31-arrow)"
      className={muted ? "stroke-slate-400 dark:stroke-slate-500" : STROKE}
    />
  );
}

function Note({ x, y, children, bold = false }: { x: number; y: number; children: string; bold?: boolean }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={10.5} fontWeight={bold ? 600 : 400} className={TEXT}>
      {children}
    </text>
  );
}

function CircularFlow({ caption }: { caption: ReactNode }) {
  const rows: [number, string, string, string][] = [
    [100, "Financial sector", "S", "I"],
    [170, "Government", "T", "G"],
    [240, "Rest of the world", "M", "X"],
  ];
  return (
    <figure className="notes-figure">
      <svg viewBox="0 0 440 345" role="img" aria-label="Circular flow of income with leakages and injections" className="mx-auto block w-full max-w-[440px]" fontSize={12}>
        <defs>
          <marker id="cf-31-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-slate-700 dark:fill-slate-300" />
          </marker>
        </defs>
        <Box x={12} y={60} w={98} h={220} label="Households" />
        <Box x={330} y={60} w={98} h={220} label="Firms" />
        <Flow d="M379,60 L379,26 L61,26 L61,57" />
        <Note x={220} y={18}>Factor incomes: wages, rent, interest, profit (Y)</Note>
        <Flow d="M61,280 L61,314 L379,314 L379,283" />
        <Note x={220} y={332}>Consumption spending on domestic output (C)</Note>
        <text x={134} y={76} textAnchor="middle" fontSize={10.5} className={TEXT_MUTED}>
          Leakages
        </text>
        <text x={305} y={76} textAnchor="middle" fontSize={10.5} className={TEXT_MUTED}>
          Injections
        </text>
        {rows.map(([y, name, out, inj]) => (
          <g key={name}>
            <Box x={160} y={y - 20} w={120} h={40} label={name} />
            <Flow d={`M110,${y} L157,${y}`} muted />
            <Note x={134} y={y - 6} bold>
              {out}
            </Note>
            <Flow d={`M280,${y} L327,${y}`} muted />
            <Note x={304} y={y - 6} bold>
              {inj}
            </Note>
          </g>
        ))}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const trend = (x: number) => 20 + 0.55 * (x - 5);
const actual = (x: number) => trend(x) + 12 * Math.sin((2 * Math.PI * (x - 5)) / 40);
const cycle: Pt[] = Array.from({ length: 41 }, (_, i) => [5 + 2 * i, actual(5 + 2 * i)]);

function BusinessCycle({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Time" y="Real GDP" caption={caption}>
      <Line
        points={[
          [5, trend(5)],
          [92, trend(92)],
        ]}
        label="Trend"
        tone="muted"
        dashed
      />
      <Line points={cycle} label="Actual" labelOffset={[6, 14]} smooth />
      <Dot at={[15, actual(15)]} label="Peak" labelOffset={[-14, -10]} />
      <Dot at={[55, actual(55)]} label="Peak" labelOffset={[-14, -10]} />
      <Dot at={[35, actual(35)]} label="Trough" labelOffset={[-18, 18]} />
      <Dot at={[75, actual(75)]} label="Trough" labelOffset={[-18, 18]} />
      <Label at={[14, 10]} muted>
        Contraction
      </Label>
      <Label at={[43, 28]} muted>
        Expansion
      </Label>
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "本节讲如何衡量一国的经济活动：收入循环流动模型、三种核算方法的等价性，以及 GDP、GNI、实际与名义值、人均值和购买力平价（PPP）的计算。商业周期图展示短期波动与长期增长趋势（潜在产出）。最后评价用 GDP/GNI 衡量经济福利的局限，并介绍 OECD 美好生活指数、幸福指数和快乐星球指数等替代指标。",
    en: "This topic covers how a country's economic activity is measured: the circular flow of income, the equivalence of the three accounting approaches, and calculations of GDP, GNI, real versus nominal values, per capita values and purchasing power parity (PPP). The business cycle diagram shows short-term fluctuations around the long-term growth trend (potential output). Finally it evaluates GDP and GNI as measures of economic well-being and introduces alternatives: the OECD Better Life Index, the Happiness Index and the Happy Planet Index.",
  },
  sections: [
    {
      id: "circular-flow",
      level: "both",
      title: { zh: "国民收入核算与循环流动模型", en: "National income accounting and the circular flow" },
      body: {
        zh: (
          <>
            <p>
              国民收入核算（national income accounting）用来衡量一国在一段时间内的经济活动总量。收入循环流动模型展示各决策者之间的联系：家庭向企业提供生产要素并获得要素收入，再用收入向企业购买商品和服务。
            </p>
            <p>在开放经济中，有三个部门让钱「流出」或「流入」循环：</p>
            <table>
              <thead>
                <tr>
                  <th>部门</th>
                  <th>漏出 Leakage（离开循环）</th>
                  <th>注入 Injection（进入循环）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>金融部门 Financial sector</td>
                  <td>储蓄 Saving（S）</td>
                  <td>投资 Investment（I）</td>
                </tr>
                <tr>
                  <td>政府 Government</td>
                  <td>税收 Taxes（T）</td>
                  <td>政府支出 Government spending（G）</td>
                </tr>
                <tr>
                  <td>外国部门 Rest of the world</td>
                  <td>进口 Imports（M）</td>
                  <td>出口 Exports（X）</td>
                </tr>
              </tbody>
            </table>
            <CircularFlow caption="图 1 收入循环流动模型：上方是要素收入从企业流向家庭，下方是消费支出从家庭流向企业。储蓄、税收和进口是漏出；投资、政府支出和出口是注入。" />
            <p>
              漏出 = 注入（S + T + M = I + G + X）时，循环流动的规模保持不变；注入大于漏出时，国民收入增加；漏出大于注入时，国民收入减少。
            </p>
            <Def term="Equivalence of the three approaches">
              在循环流动中，一方的支出就是另一方的收入，而支出购买的正是产出，所以三种方法算出的国民收入相等：<strong>产出 = 收入 = 支出</strong>。
            </Def>
            <ul>
              <li><strong>产出法</strong>（output approach）：把所有生产部门的最终产出价值（增加值，value added）加总，避免重复计算中间产品。</li>
              <li><strong>收入法</strong>（income approach）：把所有要素收入加总，即工资 + 租金 + 利息 + 利润。</li>
              <li><strong>支出法</strong>（expenditure approach）：把对最终产品的支出加总，即 C + I + G + (X − M)。</li>
            </ul>
          </>
        ),
        en: (
          <>
            <p>
              National income accounting measures the total economic activity of a country over a period of time. The circular flow of income model shows how decision makers interact: households supply factors of production to firms in return for factor incomes, and spend that income on firms&apos; goods and services.
            </p>
            <p>In an open economy, three further sectors take money out of, or put money into, the flow:</p>
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
                  <td>Financial sector</td>
                  <td>Saving (S)</td>
                  <td>Investment (I)</td>
                </tr>
                <tr>
                  <td>Government</td>
                  <td>Taxes (T)</td>
                  <td>Government spending (G)</td>
                </tr>
                <tr>
                  <td>Rest of the world</td>
                  <td>Imports (M)</td>
                  <td>Exports (X)</td>
                </tr>
              </tbody>
            </table>
            <CircularFlow caption="Figure 1 The circular flow of income: factor incomes flow from firms to households (top) and consumption spending flows from households to firms (bottom). Saving, taxes and imports are leakages; investment, government spending and exports are injections." />
            <p>
              When leakages equal injections (S + T + M = I + G + X), the size of the flow stays the same. If injections exceed leakages, national income rises; if leakages exceed injections, it falls.
            </p>
            <Def term="Equivalence of the three approaches">
              In the circular flow, one person&apos;s spending is another&apos;s income, and spending buys output, so all three methods give the same national income: <strong>output = income = expenditure</strong>.
            </Def>
            <ul>
              <li><strong>Output approach</strong>: add up the value of final output (value added) of all producers, avoiding double counting of intermediate goods.</li>
              <li><strong>Income approach</strong>: add up all factor incomes: wages + rent + interest + profit.</li>
              <li><strong>Expenditure approach</strong>: add up spending on final goods and services: C + I + G + (X − M).</li>
            </ul>
          </>
        ),
      },
    },
    {
      id: "gdp-gni",
      level: "both",
      title: { zh: "GDP 与 GNI", en: "GDP and GNI" },
      body: {
        zh: (
          <>
            <Def term="Gross domestic product (GDP)">
              一国<strong>境内</strong>在一定时期（通常一年）内生产的全部最终商品和服务的市场价值，不论生产者是本国人还是外国人。
            </Def>
            <Formula>GDP = C + I + G + (X − M)</Formula>
            <Def term="Gross national income (GNI)">
              一国<strong>国民</strong>（本国拥有的生产要素）在一定时期内获得的总收入，不论这些要素在国内还是国外。
            </Def>
            <Formula>GNI = GDP + 来自国外的要素收入 − 支付给国外的要素收入</Formula>
            <p>
              「来自国外的收入 − 支付给国外的收入」叫国外要素净收入（net income from abroad），例如海外工人汇回的工资、本国企业海外子公司的利润。
            </p>
            <Callout title="例子：计算名义 GDP 与 GNI">
              <p>某国一年的数据（十亿美元）：消费 C = 600，投资 I = 150，政府支出 G = 200，出口 X = 120，进口 M = 170；来自国外的要素收入 40，支付给国外的要素收入 70。</p>
              <Formula>GDP = 600 + 150 + 200 + (120 − 170) = 900</Formula>
              <Formula>GNI = 900 + 40 − 70 = 870</Formula>
              <p>该国 GNI 小于 GDP，说明外国人在该国赚取的收入多于本国人在国外赚取的收入。</p>
            </Callout>
            <Callout title="例子">
              <p>
                爱尔兰有大量跨国公司把利润记在当地，GDP 被大幅推高，但这些利润大多汇回外国，所以 GNI 明显低于 GDP。相反，菲律宾有大量海外劳工汇款，GNI 高于 GDP。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Gross domestic product (GDP)">
              The total market value of all final goods and services produced <strong>within a country</strong> in a given period (usually a year), whether by domestic or foreign producers.
            </Def>
            <Formula>GDP = C + I + G + (X − M)</Formula>
            <Def term="Gross national income (GNI)">
              The total income earned by a country&apos;s <strong>nationals</strong> (factors of production it owns) in a given period, wherever those factors are located.
            </Def>
            <Formula>GNI = GDP + factor income from abroad − factor income paid abroad</Formula>
            <p>
              Income from abroad minus income paid abroad is called net income from abroad, e.g. wages sent home by workers overseas or profits of domestic firms&apos; foreign subsidiaries.
            </p>
            <Callout title="Worked example: nominal GDP and GNI">
              <p>Data for one year ($ billion): consumption C = 600, investment I = 150, government spending G = 200, exports X = 120, imports M = 170; factor income from abroad 40, factor income paid abroad 70.</p>
              <Formula>GDP = 600 + 150 + 200 + (120 − 170) = 900</Formula>
              <Formula>GNI = 900 + 40 − 70 = 870</Formula>
              <p>GNI is below GDP: foreigners earn more in this country than its nationals earn abroad.</p>
            </Callout>
            <Callout title="Real-world example">
              <p>
                Many multinationals book profits in Ireland, which inflates its GDP; most of those profits flow back abroad, so Irish GNI is well below GDP. The Philippines is the opposite: large remittances from workers overseas make its GNI higher than its GDP.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "real-nominal",
      level: "both",
      title: { zh: "名义值与实际值", en: "Nominal and real values" },
      body: {
        zh: (
          <>
            <p>
              <strong>名义 GDP</strong>（nominal GDP）按当年价格计算；它增加可能只是因为物价上涨，而不是产量增加。<strong>实际 GDP</strong>（real GDP）剔除了物价变化的影响，按某个基年的价格计算，只反映产量的变化。
            </p>
            <Def term="GDP deflator">
              衡量经济中所有最终商品和服务平均价格水平的价格指数，基年等于 100。
            </Def>
            <Formula>
              实际 GDP = <Frac n="名义 GDP" d="价格平减指数" /> × 100
            </Formula>
            <p>实际 GNI 的算法相同：名义 GNI ÷ 价格平减指数 × 100。</p>
            <Callout title="例子：计算实际 GDP 和实际 GNI">
              <p>第 2 年名义 GDP 为 990（十亿美元），名义 GNI 为 957（十亿美元），价格平减指数为 110（基年 = 100）。</p>
              <Formula>
                实际 GDP = <Frac n="990" d="110" /> × 100 = 900（十亿美元）
              </Formula>
              <Formula>
                实际 GNI = <Frac n="957" d="110" /> × 100 = 870（十亿美元）
              </Formula>
              <p>若基年实际 GDP 也是 900（十亿美元），那么名义 GDP 增长 10% 全部来自物价上涨，实际产出没有增长。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Nominal GDP</strong> is measured at current prices, so it can rise simply because prices rise, not because more is produced. <strong>Real GDP</strong> removes the effect of price changes by valuing output at base-year prices, so it reflects changes in output only.
            </p>
            <Def term="GDP deflator">
              A price index measuring the average price level of all final goods and services in the economy, equal to 100 in the base year.
            </Def>
            <Formula>
              Real GDP = <Frac n="Nominal GDP" d="Price deflator" /> × 100
            </Formula>
            <p>Real GNI is found the same way: nominal GNI ÷ price deflator × 100.</p>
            <Callout title="Worked example: real GDP and real GNI">
              <p>In year 2 nominal GDP is $990 billion, nominal GNI is $957 billion and the price deflator is 110 (base year = 100).</p>
              <Formula>
                Real GDP = <Frac n="990" d="110" /> × 100 = $900 billion
              </Formula>
              <Formula>
                Real GNI = <Frac n="957" d="110" /> × 100 = $870 billion
              </Formula>
              <p>If real GDP in the base year was also $900 billion, the whole 10% rise in nominal GDP came from higher prices: real output did not grow.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "per-capita-ppp",
      level: "both",
      title: { zh: "人均值与购买力平价（PPP）", en: "Per capita values and purchasing power parity (PPP)" },
      body: {
        zh: (
          <>
            <p>
              总量 GDP 大的国家不一定生活水平高，因为人口也多。用实际 GDP 或实际 GNI 除以人口，得到<strong>人均</strong>（per capita）值，更能反映平均生活水平。
            </p>
            <Formula>
              实际人均 GDP = <Frac n="实际 GDP" d="人口" />
            </Formula>
            <Callout title="例子：计算实际人均 GDP 和实际人均 GNI">
              <p>实际 GDP 为 9000 亿美元，实际 GNI 为 8700 亿美元，人口 4500 万。</p>
              <Formula>
                实际人均 GDP = <Frac n="9000 亿美元" d="4500 万" /> = 20 000 美元
              </Formula>
              <Formula>
                实际人均 GNI = <Frac n="8700 亿美元" d="4500 万" /> ≈ 19 333 美元
              </Formula>
            </Callout>
            <Def term="Purchasing power parity (PPP)">
              一种换算汇率，使同一篮子商品和服务在不同国家的价格相等。按 PPP 换算的人均 GDP/GNI 考虑了各国生活成本的差异。
            </Def>
            <p>
              用市场汇率把各国数据换成美元，会低估物价较低国家的生活水平：同样 1 美元在物价低的国家能买到更多东西。所以国际比较应使用<strong>按 PPP 计算的实际人均 GDP/GNI</strong>，世界银行也用人均 GNI 来划分国家收入组别。
            </p>
            <Callout title="例子：PPP 的作用">
              <p>A 国人均 GNI 为 80 000 本币，市场汇率 8 本币 = 1 美元，PPP 换算率 4 本币 = 1 美元（即在 A 国用 4 本币就能买到在美国值 1 美元的商品）。</p>
              <ul>
                <li>按市场汇率：80 000 ÷ 8 = 10 000 美元。</li>
                <li>按 PPP：80 000 ÷ 4 = 20 000 美元（PPP 美元）。</li>
              </ul>
              <p>A 国物价较低，所以按 PPP 计算的实际生活水平是按市场汇率计算的两倍。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              A country with a large total GDP may not have high living standards if it also has a large population. Dividing real GDP or real GNI by the population gives <strong>per capita</strong> figures, which better reflect average living standards.
            </p>
            <Formula>
              Real GDP per capita = <Frac n="Real GDP" d="Population" />
            </Formula>
            <Callout title="Worked example: real GDP and real GNI per capita">
              <p>Real GDP is $900 billion, real GNI is $870 billion and the population is 45 million.</p>
              <Formula>
                Real GDP per capita = <Frac n="$900 billion" d="45 million" /> = $20 000
              </Formula>
              <Formula>
                Real GNI per capita = <Frac n="$870 billion" d="45 million" /> ≈ $19 333
              </Formula>
            </Callout>
            <Def term="Purchasing power parity (PPP)">
              A conversion rate that equalises the price of the same basket of goods and services across countries. GDP or GNI per capita at PPP takes differences in the cost of living into account.
            </Def>
            <p>
              Converting to US dollars at market exchange rates understates living standards in countries where prices are low, since a dollar buys more there. International comparisons should therefore use <strong>real GDP/GNI per capita at PPP</strong>; the World Bank uses GNI per capita to classify countries by income group.
            </p>
            <Callout title="Worked example: why PPP matters">
              <p>Country A has GNI per capita of 80 000 local currency units (LCU). The market exchange rate is 8 LCU = $1, but the PPP rate is 4 LCU = $1 (4 LCU in A buys what $1 buys in the US).</p>
              <ul>
                <li>At the market exchange rate: 80 000 ÷ 8 = $10 000.</li>
                <li>At PPP: 80 000 ÷ 4 = $20 000 (PPP dollars).</li>
              </ul>
              <p>Prices in A are low, so its real living standard measured at PPP is twice the market-rate figure.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "business-cycle",
      level: "both",
      title: { zh: "商业周期", en: "The business cycle" },
      body: {
        zh: (
          <>
            <Def term="Business cycle">
              实际 GDP 围绕其长期增长趋势出现的短期、反复的波动，包括扩张、顶峰、收缩（衰退）和谷底。
            </Def>
            <Def term="Potential output">
              一国在充分利用所有资源（充分就业）时能达到的实际产出水平。它的长期增长就是图中的长期趋势线。
            </Def>
            <BusinessCycle caption="图 2 商业周期：实际产出（Actual）围绕长期增长趋势（Trend，虚线，即潜在产出）上下波动。从谷底到顶峰是扩张，从顶峰到谷底是收缩；实际产出高于趋势线时存在正产出缺口，低于时存在负产出缺口。" />
            <table>
              <thead>
                <tr>
                  <th>阶段</th>
                  <th>特征</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>扩张 Expansion</td>
                  <td>实际 GDP 增长，失业下降，通胀压力逐渐上升。</td>
                </tr>
                <tr>
                  <td>顶峰 Peak</td>
                  <td>实际 GDP 最高点，通常高于潜在产出，失业低，通胀较高。</td>
                </tr>
                <tr>
                  <td>收缩 Contraction</td>
                  <td>实际 GDP 增长放缓或下降，失业上升。连续两个季度实际 GDP 下降通常被称为衰退（recession）。</td>
                </tr>
                <tr>
                  <td>谷底 Trough</td>
                  <td>实际 GDP 最低点，失业高，通胀低。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="画图要点">
              <ul>
                <li>横轴是时间（Time），纵轴是实际 GDP（Real GDP）。</li>
                <li>先画一条向右上方倾斜的长期趋势线（潜在产出），再画围绕它波动的实际产出曲线。</li>
                <li>标出顶峰、谷底、扩张和收缩。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Business cycle">
              Short-term, recurring fluctuations of real GDP around its long-term growth trend, made up of expansion, peak, contraction (recession) and trough.
            </Def>
            <Def term="Potential output">
              The real output an economy can produce when all its resources are fully employed. Its growth over time is the long-term trend line in the diagram.
            </Def>
            <BusinessCycle caption="Figure 2 The business cycle: actual output (Actual) fluctuates around the long-term growth trend (Trend, dashed), which represents potential output. From trough to peak is an expansion; from peak to trough is a contraction. When actual output is above trend there is a positive output gap; below trend, a negative output gap." />
            <table>
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Features</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Expansion</td>
                  <td>Real GDP grows, unemployment falls and inflationary pressure builds.</td>
                </tr>
                <tr>
                  <td>Peak</td>
                  <td>The highest point of real GDP, usually above potential output; unemployment is low and inflation relatively high.</td>
                </tr>
                <tr>
                  <td>Contraction</td>
                  <td>Growth of real GDP slows or turns negative and unemployment rises. Two consecutive quarters of falling real GDP are usually called a recession.</td>
                </tr>
                <tr>
                  <td>Trough</td>
                  <td>The lowest point of real GDP; unemployment is high and inflation low.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Drawing checklist">
              <ul>
                <li>Time on the horizontal axis, real GDP on the vertical axis.</li>
                <li>Draw an upward-sloping long-term trend line (potential output) first, then the actual output curve fluctuating around it.</li>
                <li>Label peak, trough, expansion and contraction.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "well-being",
      level: "both",
      title: { zh: "用 GDP/GNI 衡量经济福利是否合适", en: "How appropriate are GDP and GNI as measures of well-being?" },
      body: {
        zh: (
          <>
            <p>
              实际人均 GDP/GNI 是衡量生活水平最常用的指标：数据容易获得、定期公布、方法国际统一。但它衡量的是市场产出，不等于经济福利（economic well-being）。
            </p>
            <table>
              <thead>
                <tr>
                  <th>局限</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>不反映分配</td>
                  <td>人均值是平均数，收入集中在少数人手里时，大多数人的生活水平可能远低于平均。</td>
                </tr>
                <tr>
                  <td>忽略非市场产出</td>
                  <td>家务劳动、照顾家人、志愿服务没有价格，不计入 GDP。</td>
                </tr>
                <tr>
                  <td>非正规经济</td>
                  <td>地下经济和未登记的交易不被统计，在一些发展中国家规模很大。</td>
                </tr>
                <tr>
                  <td>环境与可持续性</td>
                  <td>污染、资源耗竭不被扣除；治理污染的支出反而增加 GDP。</td>
                </tr>
                <tr>
                  <td>质量与构成</td>
                  <td>不反映产品质量的提升；军费和医疗教育支出同样计入，但对福利的贡献不同。</td>
                </tr>
                <tr>
                  <td>闲暇与生活质量</td>
                  <td>工作时间更长会提高 GDP，却可能降低福利；健康、教育、安全等也未直接反映。</td>
                </tr>
              </tbody>
            </table>
            <p><strong>跨时间比较</strong>（comparisons over time）：</p>
            <ul>
              <li>必须用<strong>实际</strong>值剔除通胀，并用<strong>人均</strong>值考虑人口增长。</li>
              <li>产品质量的进步（例如手机性能）难以体现；非正规经济在 GDP 中的比重变化，也会让增长看起来更快或更慢。</li>
            </ul>
            <p><strong>跨国比较</strong>（comparisons between countries）：</p>
            <ul>
              <li>要用 <strong>PPP</strong> 换算，消除生活成本和汇率波动的影响。</li>
              <li>各国非正规经济规模、收入分配、统计质量不同。</li>
              <li>GDP 与 GNI 差距大的国家（如爱尔兰）要注意选择合适的指标。</li>
            </ul>
          </>
        ),
        en: (
          <>
            <p>
              Real GDP or GNI per capita is the most widely used measure of living standards: the data are available, published regularly and compiled to international standards. But it measures market output, which is not the same as economic well-being.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Limitation</th>
                  <th>Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ignores distribution</td>
                  <td>A per capita figure is an average; if income is concentrated among a few, most people may live far below it.</td>
                </tr>
                <tr>
                  <td>Ignores non-market output</td>
                  <td>Housework, caring for family members and volunteering have no price and are left out of GDP.</td>
                </tr>
                <tr>
                  <td>Informal economy</td>
                  <td>Unrecorded and underground transactions are missed, and are large in some developing countries.</td>
                </tr>
                <tr>
                  <td>Environment and sustainability</td>
                  <td>Pollution and resource depletion are not deducted; spending on cleaning up pollution even adds to GDP.</td>
                </tr>
                <tr>
                  <td>Quality and composition</td>
                  <td>Quality improvements are missed; defence spending counts the same as health and education, though they add differently to well-being.</td>
                </tr>
                <tr>
                  <td>Leisure and quality of life</td>
                  <td>Longer working hours raise GDP but may lower well-being; health, education and safety are not shown directly.</td>
                </tr>
              </tbody>
            </table>
            <p><strong>Comparisons over time</strong>:</p>
            <ul>
              <li>Use <strong>real</strong> values to remove inflation and <strong>per capita</strong> values to allow for population growth.</li>
              <li>Quality improvements (e.g. in phones) are hard to capture, and a changing share of informal activity can make growth look faster or slower than it is.</li>
            </ul>
            <p><strong>Comparisons between countries</strong>:</p>
            <ul>
              <li>Convert using <strong>PPP</strong> to remove differences in the cost of living and exchange rate swings.</li>
              <li>Countries differ in the size of their informal sectors, income distribution and statistical quality.</li>
              <li>Where GDP and GNI differ greatly (e.g. Ireland), choose the measure carefully.</li>
            </ul>
          </>
        ),
      },
    },
    {
      id: "alternative-measures",
      level: "both",
      title: { zh: "衡量福利的替代指标", en: "Alternative measures of well-being" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>指标</th>
                  <th>衡量什么</th>
                  <th>特点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>OECD 美好生活指数 Better Life Index</td>
                  <td>11 个维度：住房、收入、就业、社区、教育、环境、公民参与、健康、生活满意度、安全、工作与生活平衡。</td>
                  <td>使用者可以自己给各维度设定权重，比较 OECD 成员国及伙伴国。</td>
                </tr>
                <tr>
                  <td>幸福指数 Happiness Index（《世界幸福报告》）</td>
                  <td>基于盖洛普调查，让人们给自己的生活打分（0–10 的「生活阶梯」），并用人均 GDP、社会支持、健康预期寿命、自由、慷慨和对腐败的看法来解释差异。</td>
                  <td>反映主观感受；芬兰在 2018–2025 年的报告中都排名第一。</td>
                </tr>
                <tr>
                  <td>快乐星球指数 Happy Planet Index</td>
                  <td>把预期寿命与自评幸福感结合成「幸福生命年」，再除以人均碳足迹。</td>
                  <td>衡量可持续的福利：用多少环境资源换来多长、多幸福的生活。2024 年排名第一的是瓦努阿图，高收入国家往往因碳足迹大而排名靠后。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <ul>
                <li>替代指标覆盖健康、环境、主观幸福等 GDP 忽略的方面，能更全面地反映福利。</li>
                <li>但它们也有问题：主观问卷受文化和期望影响；各维度的选择和权重带有价值判断；数据更新慢、覆盖国家少，难以做时间序列比较。</li>
                <li>因此最好把 GDP/GNI 与这些指标结合使用，而不是互相取代。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>What it measures</th>
                  <th>Features</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>OECD Better Life Index</td>
                  <td>11 dimensions: housing, income, jobs, community, education, environment, civic engagement, health, life satisfaction, safety and work-life balance.</td>
                  <td>Users choose their own weights for each dimension; covers OECD members and partner countries.</td>
                </tr>
                <tr>
                  <td>Happiness Index (World Happiness Report)</td>
                  <td>Based on Gallup surveys in which people rate their lives on a 0–10 ladder; differences are explained using GDP per capita, social support, healthy life expectancy, freedom, generosity and perceptions of corruption.</td>
                  <td>Captures subjective feelings; Finland ranked first in every report from 2018 to 2025.</td>
                </tr>
                <tr>
                  <td>Happy Planet Index</td>
                  <td>Combines life expectancy and self-reported well-being into happy life years, then divides by the carbon footprint per person.</td>
                  <td>Measures sustainable well-being: how long and happy a life is achieved per unit of environmental resources. Vanuatu ranked first in 2024; high-income countries often rank low because of their large footprints.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <ul>
                <li>Alternative measures cover health, the environment and subjective happiness, which GDP ignores, so they give a fuller picture of well-being.</li>
                <li>But they have weaknesses: survey answers depend on culture and expectations; choosing and weighting dimensions involves value judgements; and data are updated less often and for fewer countries, which makes comparisons over time harder.</li>
                <li>So GDP and GNI are best used together with these measures rather than replaced by them.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 3.1 Measuring economic activity",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 19.1 Measuring the size of the economy: GDP",
      href: "https://openstax.org/books/principles-economics-3e/pages/19-1-measuring-the-size-of-the-economy-gross-domestic-product",
    },
    {
      label: "OpenStax Principles of Economics 3e — 19.2 Adjusting nominal values to real values",
      href: "https://openstax.org/books/principles-economics-3e/pages/19-2-adjusting-nominal-values-to-real-values",
    },
    {
      label: "World Bank — Why use GNI per capita to classify economies into income groupings?",
      href: "https://datahelpdesk.worldbank.org/knowledgebase/articles/378831-why-use-gni-per-capita-to-classify-economies-into",
    },
    {
      label: "Happy Planet Index",
      href: "https://happyplanetindex.org/",
    },
  ],
};

export default notes;
