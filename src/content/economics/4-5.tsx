import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, intersect, shift, type Seg } from "@/components/notes/Chart";

const FX_Y = "Price of £ (US$ per £)";
const FX_X = "Quantity of £";

function FxEquilibrium({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [10, 90],
    [90, 10],
  ];
  const S: Seg = [
    [10, 10],
    [90, 90],
  ];
  const e = intersect(D, S);
  return (
    <Chart x={FX_X} y={FX_Y} caption={caption}>
      <Line points={D} label="D£" />
      <Line points={S} label="S£" />
      <Guide at={e} x="Q₁" y="ER₁" />
      <Dot at={e} />
    </Chart>
  );
}

function FxAppreciation({ caption }: { caption: ReactNode }) {
  const D1: Seg = [
    [5, 85],
    [70, 20],
  ];
  const D2 = shift(D1, 20);
  const S: Seg = [
    [10, 10],
    [85, 85],
  ];
  const e1 = intersect(D1, S);
  const e2 = intersect(D2, S);
  return (
    <Chart x={FX_X} y={FX_Y} caption={caption}>
      <Line points={D1} label="D₁" />
      <Line points={D2} label="D₂" tone="alt" />
      <Line points={S} label="S" />
      <Guide at={e1} x="Q₁" y="ER₁" />
      <Guide at={e2} x="Q₂" y="ER₂" />
      <Arrow from={[23, 70]} to={[37, 70]} />
      <Dot at={e1} />
      <Dot at={e2} />
    </Chart>
  );
}

function FxDepreciation({ caption }: { caption: ReactNode }) {
  const S1: Seg = [
    [10, 10],
    [80, 80],
  ];
  const S2 = shift(S1, 20);
  const D: Seg = [
    [5, 95],
    [90, 10],
  ];
  const e1 = intersect(D, S1);
  const e2 = intersect(D, S2);
  return (
    <Chart x={FX_X} y={FX_Y} caption={caption}>
      <Line points={S1} label="S₁" />
      <Line points={S2} label="S₂" tone="alt" />
      <Line points={D} label="D" />
      <Guide at={e1} x="Q₁" y="ER₁" />
      <Guide at={e2} x="Q₂" y="ER₂" />
      <Arrow from={[33, 30]} to={[47, 30]} />
      <Dot at={e1} />
      <Dot at={e2} />
    </Chart>
  );
}

function AdShift({ caption }: { caption: ReactNode }) {
  const AD1: Seg = [
    [10, 85],
    [70, 15],
  ];
  const AD2 = shift(AD1, 20);
  const SRAS: Seg = [
    [15, 15],
    [85, 85],
  ];
  const e1 = intersect(AD1, SRAS);
  const e2 = intersect(AD2, SRAS);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <Line points={AD1} label="AD₁" />
      <Line points={AD2} label="AD₂" tone="alt" />
      <Line points={SRAS} label="SRAS" />
      <Guide at={e1} x="Y₁" y="PL₁" />
      <Guide at={e2} x="Y₂" y="PL₂" />
      <Arrow from={[21, 75]} to={[36, 75]} />
      <Dot at={e1} />
      <Dot at={e2} />
    </Chart>
  );
}

function SrasShift({ caption }: { caption: ReactNode }) {
  const S1: Seg = [
    [15, 15],
    [85, 85],
  ];
  const S2: Seg = [
    [0, 20],
    [65, 85],
  ];
  const AD: Seg = [
    [10, 85],
    [85, 10],
  ];
  const e1 = intersect(AD, S1);
  const e2 = intersect(AD, S2);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <Line points={S1} label="SRAS₁" />
      <Line points={S2} label="SRAS₂" tone="alt" />
      <Line points={AD} label="AD" />
      <Guide at={e1} x="Y₁" y="PL₁" />
      <Guide at={e2} x="Y₂" y="PL₂" />
      <Arrow from={[27, 30]} to={[13, 30]} />
      <Dot at={e1} />
      <Dot at={e2} />
    </Chart>
  );
}

function FixedRate({ caption }: { caption: ReactNode }) {
  const S: Seg = [
    [10, 10],
    [85, 85],
  ];
  const D1: Seg = [
    [5, 95],
    [90, 10],
  ];
  const D2: Seg = [
    [0, 80],
    [70, 10],
  ];
  const e2 = intersect(D2, S);
  return (
    <Chart x={FX_X} y={FX_Y} caption={caption}>
      <Line
        points={[
          [0, 50],
          [92, 50],
        ]}
        tone="muted"
        dashed
      />
      <Label at={[72, 52]} muted>
        Fixed rate
      </Label>
      <Line points={S} label="S" />
      <Line points={D1} label="D₁" />
      <Line points={D2} label="D₂" tone="alt" />
      <Guide at={[50, 50]} y="ER₁" />
      <Guide at={[30, 50]} x="Qa" />
      <Guide at={[50, 50]} x="Qb" />
      <Guide at={e2} y="ER₂" />
      <Arrow from={[13, 70]} to={[27, 70]} />
      <Dot at={[30, 50]} label="a" labelOffset={[-14, 14]} />
      <Dot at={[50, 50]} label="b" labelOffset={[28, 15]} />
      <Dot at={e2} />
    </Chart>
  );
}

function ManagedRate({ caption }: { caption: ReactNode }) {
  const S: Seg = [
    [10, 10],
    [88, 88],
  ];
  const D1: Seg = [
    [10, 90],
    [90, 10],
  ];
  const D2: Seg = [
    [0, 60],
    [55, 5],
  ];
  const D3: Seg = [
    [0, 80],
    [75, 5],
  ];
  return (
    <Chart x={FX_X} y={FX_Y} caption={caption}>
      <Line
        points={[
          [0, 60],
          [92, 60],
        ]}
        tone="muted"
        dashed
      />
      <Line
        points={[
          [0, 40],
          [92, 40],
        ]}
        tone="muted"
        dashed
      />
      <Label at={[70, 62]} muted>
        Upper limit
      </Label>
      <Label at={[70, 34]} muted>
        Lower limit
      </Label>
      <Line points={S} label="S" />
      <Line points={D1} label="D₁" />
      <Line points={D2} label="D₂" tone="muted" />
      <Line points={D3} label="D₃" tone="alt" />
      <Guide at={intersect(D1, S)} y="ER₁" />
      <Guide at={intersect(D3, S)} y="ER₃" />
      <Guide at={intersect(D2, S)} y="ER₂" />
      <Arrow from={[40, 22]} to={[56, 22]} />
      <Dot at={intersect(D1, S)} />
      <Dot at={intersect(D2, S)} />
      <Dot at={intersect(D3, S)} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "汇率是一种货币用另一种货币表示的价格。本节讲浮动汇率如何由货币的供求决定、升值与贬值、影响货币供求的十个因素、汇率变化对通胀、增长、失业、经常账户和生活水平的影响，以及固定汇率（贬值与升值、如何维持）和有管理的汇率（高估与低估）。还要会用汇率换算价格、计算货币价值的变化。HL 还要比较固定与浮动汇率制度。",
    en: "An exchange rate is the price of one currency in terms of another. This topic covers how floating exchange rates are set by the demand for and supply of a currency, appreciation and depreciation, the ten factors that shift currency demand and supply, the effects of exchange rate changes on inflation, growth, unemployment, the current account and living standards, and fixed (devaluation, revaluation, how a peg is maintained) and managed systems (overvalued and undervalued currencies). You must convert prices between currencies and calculate changes in the value of a currency. HL also compares fixed and floating systems.",
  },
  sections: [
    {
      id: "floating",
      level: "both",
      title: { zh: "浮动汇率：决定、升值与贬值", en: "Floating exchange rates: determination, appreciation and depreciation" },
      body: {
        zh: (
          <>
            <Def term="Exchange rate">
              一种货币用另一种货币表示的价格，例如 £1 = US$1.25。
            </Def>
            <Def term="Floating exchange rate">
              完全由外汇市场上该货币的供给和需求决定的汇率，政府和央行不干预。
            </Def>
            <p>
              以英镑为例：外国人买英国出口品、来英国投资或汇款时，要先买入英镑，所以形成英镑的<strong>需求</strong>（D£）；英国居民买进口品、到国外投资时，要卖出英镑换外币，形成英镑的<strong>供给</strong>（S£）。纵轴是英镑的价格（每英镑值多少美元），两者相交决定均衡汇率 ER₁。
            </p>
            <FxEquilibrium caption="图 1 浮动汇率的决定：英镑的需求和供给相交，决定均衡汇率 ER₁（每英镑兑换的美元数）。" />
            <Def term="Appreciation">
              在浮动汇率下，一种货币相对另一种货币的价值<strong>上升</strong>，例如 £1 从 US$1.25 变成 US$1.40。
            </Def>
            <Def term="Depreciation">
              在浮动汇率下，一种货币相对另一种货币的价值<strong>下降</strong>，例如 £1 从 US$1.25 变成 US$1.10。
            </Def>
            <FxAppreciation caption="图 2 英镑升值：例如美国对英国出口品的需求增加，D₁ 右移到 D₂，汇率从 ER₁ 升到 ER₂。" />
            <FxDepreciation caption="图 3 英镑贬值：例如英国居民对进口品的需求增加，英镑供给从 S₁ 右移到 S₂，汇率从 ER₁ 降到 ER₂。" />
            <Callout title="画图要点">
              <ul>
                <li>纵轴必须写清是「哪种货币的价格、用什么货币表示」，例如 US$ per £；横轴是 Quantity of £。</li>
                <li>需求和供给曲线都标出货币名称（D£、S£）。</li>
                <li>一种货币升值，意味着另一种货币贬值：£ 兑 $ 升值 = $ 兑 £ 贬值。</li>
              </ul>
            </Callout>
            <p>
              <strong>计算：用汇率换算价格。</strong>设 £1 = US$1.25。
            </p>
            <Formula>以美元计的价格 = 以英镑计的价格 × 汇率（US$ per £）</Formula>
            <ul>
              <li>英国一件 £80 的外套，在美国的价格 = 80 × 1.25 = <strong>US$100</strong>。</li>
              <li>美国一部 US$500 的手机，在英国的价格 = 500 ÷ 1.25 = <strong>£400</strong>。</li>
              <li>若英镑升值到 £1 = US$1.40：外套变为 80 × 1.40 = US$112（英国出口品更贵）；手机变为 500 ÷ 1.40 ≈ £357（进口品更便宜）。</li>
            </ul>
          </>
        ),
        en: (
          <>
            <Def term="Exchange rate">
              The price of one currency expressed in terms of another, e.g. £1 = US$1.25.
            </Def>
            <Def term="Floating exchange rate">
              An exchange rate determined entirely by the demand for and supply of the currency on the foreign exchange market, with no government or central bank intervention.
            </Def>
            <p>
              Take the pound: foreigners buying UK exports, investing in the UK or sending money there must first buy pounds, which creates <strong>demand</strong> for pounds (D£). UK residents buying imports or investing abroad sell pounds for foreign currency, which creates the <strong>supply</strong> of pounds (S£). The vertical axis is the price of the pound (US dollars per pound); where the curves cross is the equilibrium exchange rate ER₁.
            </p>
            <FxEquilibrium caption="Figure 1 A floating exchange rate is set where the demand for and supply of pounds meet, at ER₁ (US dollars per pound)." />
            <Def term="Appreciation">
              A <strong>rise</strong> in the value of a currency against another in a floating system, e.g. £1 rising from US$1.25 to US$1.40.
            </Def>
            <Def term="Depreciation">
              A <strong>fall</strong> in the value of a currency against another in a floating system, e.g. £1 falling from US$1.25 to US$1.10.
            </Def>
            <FxAppreciation caption="Figure 2 Appreciation of the pound: e.g. higher US demand for UK exports shifts D₁ to D₂, and the exchange rate rises from ER₁ to ER₂." />
            <FxDepreciation caption="Figure 3 Depreciation of the pound: e.g. higher UK demand for imports shifts the supply of pounds from S₁ to S₂, and the exchange rate falls from ER₁ to ER₂." />
            <Callout title="Drawing checklist">
              <ul>
                <li>The vertical axis must say which currency&apos;s price and in what currency, e.g. US$ per £; the horizontal axis is Quantity of £.</li>
                <li>Label both curves with the currency (D£, S£).</li>
                <li>One currency appreciating means the other depreciating: the pound rising against the dollar is the dollar falling against the pound.</li>
              </ul>
            </Callout>
            <p>
              <strong>Calculation: prices in different currencies.</strong> Let £1 = US$1.25.
            </p>
            <Formula>Price in US$ = price in £ × exchange rate (US$ per £)</Formula>
            <ul>
              <li>A £80 UK jacket costs 80 × 1.25 = <strong>US$100</strong> in the US.</li>
              <li>A US$500 US phone costs 500 ÷ 1.25 = <strong>£400</strong> in the UK.</li>
              <li>If the pound appreciates to £1 = US$1.40, the jacket costs 80 × 1.40 = US$112 (UK exports dearer) and the phone 500 ÷ 1.40 ≈ £357 (imports cheaper).</li>
            </ul>
          </>
        ),
      },
    },
    {
      id: "determinants",
      level: "both",
      title: { zh: "影响货币供求的因素", en: "Changes in the demand for and supply of a currency" },
      body: {
        zh: (
          <>
            <p>下表以英镑为例，说明每个因素如何使英镑<strong>升值</strong>（反方向变化则贬值）：</p>
            <table>
              <thead>
                <tr>
                  <th>因素</th>
                  <th>变化</th>
                  <th>对英镑市场的影响</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>外国对出口品的需求</td><td>外国更多购买英国商品和服务</td><td>D£ 右移</td></tr>
                <tr><td>国内对进口品的需求</td><td>英国居民减少购买进口品</td><td>S£ 左移</td></tr>
                <tr><td>外国直接投资（FDI）</td><td>流入英国的 FDI 增加（如外国企业在英建厂），或流出的 FDI 减少</td><td>D£ 右移 / S£ 左移</td></tr>
                <tr><td>证券投资（portfolio investment）</td><td>外国人更多购买英国股票、债券</td><td>D£ 右移</td></tr>
                <tr><td>汇款（remittances）</td><td>在外国工作的英国人汇钱回国增加</td><td>D£ 右移</td></tr>
                <tr><td>投机（speculation）</td><td>投机者预期英镑将升值，现在买入</td><td>D£ 右移（S£ 也可能左移）</td></tr>
                <tr><td>相对通胀率</td><td>英国通胀低于贸易伙伴，英国商品相对更便宜</td><td>D£ 右移，S£ 左移</td></tr>
                <tr><td>相对利率</td><td>英国利率高于他国，吸引「热钱」（hot money）流入</td><td>D£ 右移，S£ 左移</td></tr>
                <tr><td>相对经济增长率</td><td>英国增长更快，吸引投资（但收入上升也会增加进口，S£ 右移）</td><td>通常 D£ 右移</td></tr>
                <tr><td>央行干预</td><td>英格兰银行用外汇储备买入英镑</td><td>D£ 右移</td></tr>
              </tbody>
            </table>
            <p>
              <strong>计算：货币价值的变化。</strong>£1 从 US$1.25 变成 US$1.50。
            </p>
            <Formula>
              百分比变化 = <Frac n="新汇率 − 旧汇率" d="旧汇率" /> × 100
            </Formula>
            <ul>
              <li>英镑：<Frac n="1.50 − 1.25" d="1.25" /> × 100 = <strong>+20%</strong>（英镑升值 20%）。</li>
              <li>
                美元：先换算成每美元兑多少英镑：1 ÷ 1.25 = £0.80，1 ÷ 1.50 ≈ £0.667。<Frac n="0.667 − 0.80" d="0.80" /> × 100 ≈ <strong>−16.7%</strong>（美元贬值约 16.7%）。
              </li>
            </ul>
            <Callout title="考试提示">
              <p>
                两种货币的变化幅度<strong>不对称</strong>：英镑升值 20%，并不等于美元贬值 20%。计算前先确认汇率是「哪种货币的价格」。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>The table uses the pound to show how each factor causes it to <strong>appreciate</strong> (the opposite change causes depreciation):</p>
            <table>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Change</th>
                  <th>Effect on the market for £</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Foreign demand for exports</td><td>Foreigners buy more UK goods and services</td><td>D£ shifts right</td></tr>
                <tr><td>Domestic demand for imports</td><td>UK residents buy fewer imports</td><td>S£ shifts left</td></tr>
                <tr><td>Inward/outward foreign direct investment</td><td>More inward FDI (e.g. a foreign firm builds a UK factory) or less outward FDI</td><td>D£ right / S£ left</td></tr>
                <tr><td>Inward/outward portfolio investment</td><td>Foreigners buy more UK shares and bonds</td><td>D£ shifts right</td></tr>
                <tr><td>Remittances</td><td>UK citizens working abroad send more money home</td><td>D£ shifts right</td></tr>
                <tr><td>Speculation</td><td>Speculators expect the pound to rise and buy now</td><td>D£ right (S£ may also shift left)</td></tr>
                <tr><td>Relative inflation rates</td><td>UK inflation is lower than its trading partners&apos;, so UK goods become relatively cheaper</td><td>D£ right, S£ left</td></tr>
                <tr><td>Relative interest rates</td><td>Higher UK interest rates attract inflows of hot money</td><td>D£ right, S£ left</td></tr>
                <tr><td>Relative growth rates</td><td>Faster UK growth attracts investment (though higher incomes also raise imports, shifting S£ right)</td><td>Usually D£ right</td></tr>
                <tr><td>Central bank intervention</td><td>The Bank of England uses reserves to buy pounds</td><td>D£ shifts right</td></tr>
              </tbody>
            </table>
            <p>
              <strong>Calculation: change in a currency&apos;s value.</strong> £1 moves from US$1.25 to US$1.50.
            </p>
            <Formula>
              Percentage change = <Frac n="new rate − old rate" d="old rate" /> × 100
            </Formula>
            <ul>
              <li>Pound: <Frac n="1.50 − 1.25" d="1.25" /> × 100 = <strong>+20%</strong> (the pound appreciates by 20%).</li>
              <li>
                Dollar: first express it in pounds per dollar: 1 ÷ 1.25 = £0.80 and 1 ÷ 1.50 ≈ £0.667. <Frac n="0.667 − 0.80" d="0.80" /> × 100 ≈ <strong>−16.7%</strong> (the dollar depreciates by about 16.7%).
              </li>
            </ul>
            <Callout title="Exam tip">
              <p>
                The changes are <strong>not symmetric</strong>: a 20% appreciation of the pound is not a 20% depreciation of the dollar. Before calculating, check which currency&apos;s price the rate expresses.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "consequences",
      level: "both",
      title: { zh: "汇率变化对经济的影响", en: "Consequences of exchange rate changes" },
      body: {
        zh: (
          <>
            <p>
              以本币<strong>贬值</strong>为例（升值则相反）：出口品在国外变便宜、进口品在国内变贵，净出口（X − M）上升，总需求增加，AD 右移；同时进口原材料变贵，生产成本上升，SRAS 可能左移。
            </p>
            <AdShift caption="图 4 贬值的需求侧效应：净出口增加，AD₁ 右移到 AD₂，实际 GDP 从 Y₁ 增加到 Y₂，价格水平从 PL₁ 升到 PL₂。" />
            <SrasShift caption="图 5 贬值的成本侧效应：进口投入品变贵，SRAS₁ 左移到 SRAS₂，价格水平升到 PL₂，实际 GDP 降到 Y₂（成本推动型通胀）。" />
            <table>
              <thead>
                <tr>
                  <th>经济指标</th>
                  <th>本币贬值</th>
                  <th>本币升值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>通胀率</td>
                  <td>上升：AD 增加（需求拉动）加上进口成本上升（成本推动）。</td>
                  <td>下降：进口更便宜，企业面对外国竞争压力更大。</td>
                </tr>
                <tr>
                  <td>经济增长</td>
                  <td>净出口增加，AD 右移，短期增长加快。</td>
                  <td>净出口减少，增长放缓。</td>
                </tr>
                <tr>
                  <td>失业</td>
                  <td>出口和与进口竞争的行业扩张，失业下降。</td>
                  <td>出口行业可能裁员，失业上升。</td>
                </tr>
                <tr>
                  <td>经常账户</td>
                  <td>如果出口和进口的需求有足够弹性，赤字缩小；但可能有时滞（见 4.6）。</td>
                  <td>可能恶化。</td>
                </tr>
                <tr>
                  <td>生活水平</td>
                  <td>进口品和出国旅游变贵，实际收入下降；但就业增加可能抵消一部分。</td>
                  <td>进口品更便宜，消费者购买力上升；但出口行业的工人可能受损。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                最终影响取决于：经济是否接近充分就业（越接近，AD 增加越多地变成通胀）、进出口需求的价格弹性、进口投入品占成本的比重、汇率变动是否持久，以及贸易伙伴的经济状况。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              Take a <strong>depreciation</strong> (an appreciation has the opposite effects): exports become cheaper abroad and imports dearer at home, so net exports (X − M) rise and AD shifts right. At the same time imported raw materials cost more, so SRAS may shift left.
            </p>
            <AdShift caption="Figure 4 Demand-side effect of a depreciation: higher net exports shift AD₁ to AD₂, raising real GDP from Y₁ to Y₂ and the price level from PL₁ to PL₂." />
            <SrasShift caption="Figure 5 Cost-side effect of a depreciation: dearer imported inputs shift SRAS₁ to SRAS₂, raising the price level to PL₂ and reducing real GDP to Y₂ (cost-push inflation)." />
            <table>
              <thead>
                <tr>
                  <th>Indicator</th>
                  <th>Depreciation</th>
                  <th>Appreciation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Inflation rate</td>
                  <td>Rises: higher AD (demand-pull) and dearer imports (cost-push).</td>
                  <td>Falls: imports are cheaper and firms face stronger foreign competition.</td>
                </tr>
                <tr>
                  <td>Economic growth</td>
                  <td>Higher net exports shift AD right, so short-run growth rises.</td>
                  <td>Lower net exports slow growth.</td>
                </tr>
                <tr>
                  <td>Unemployment</td>
                  <td>Export and import-competing industries expand, so unemployment falls.</td>
                  <td>Export industries may cut jobs, so unemployment rises.</td>
                </tr>
                <tr>
                  <td>Current account balance</td>
                  <td>A deficit narrows if demand for exports and imports is elastic enough, possibly after a time lag (see 4.6).</td>
                  <td>May worsen.</td>
                </tr>
                <tr>
                  <td>Living standards</td>
                  <td>Imports and foreign travel cost more, so real incomes fall, although more jobs may offset this.</td>
                  <td>Cheaper imports raise consumers&apos; purchasing power, but workers in export industries may lose out.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                The final effect depends on how close the economy is to full employment (the closer, the more extra AD turns into inflation), the price elasticities of demand for exports and imports, the share of imported inputs in costs, whether the change is expected to last, and economic conditions in trading partners.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "fixed",
      level: "both",
      title: { zh: "固定汇率", en: "Fixed exchange rates" },
      body: {
        zh: (
          <>
            <Def term="Fixed exchange rate">
              政府或央行把本币与另一种货币（或一篮子货币）的汇率固定在某个水平（钉住，peg），并通过干预来维持。
            </Def>
            <Def term="Devaluation">在固定汇率制度下，政府把钉住的汇率调<strong>低</strong>，本币价值下降。</Def>
            <Def term="Revaluation">在固定汇率制度下，政府把钉住的汇率调<strong>高</strong>，本币价值上升。</Def>
            <p>
              例子：港币自 1983 年起与美元挂钩，允许在 US$1 = HK$7.75—7.85 之间波动；沙特里亚尔固定在 US$1 = 3.75 里亚尔。2023 年 12 月阿根廷把比索官方汇率从约 366 比索兑 1 美元一次性贬值到 800 比索兑 1 美元。
            </p>
            <p><strong>如何维持固定汇率</strong>：如果英镑需求下降（D₁ 左移到 D₂），自由市场汇率会降到 ER₂。在固定汇率 ER₁ 上，英镑供给 b 大于需求 a，出现超额供给 ab。央行必须设法把需求推回 D₁：</p>
            <FixedRate caption="图 6 维持固定汇率：需求从 D₁ 降到 D₂，在固定汇率下出现超额供给 ab；央行用外汇储备买入英镑或提高利率，使需求回到 D₁。" />
            <ul>
              <li><strong>用外汇储备买入本币</strong>（反过来，本币面临升值压力时卖出本币、积累外汇储备）。</li>
              <li><strong>提高利率</strong>，吸引资本流入，增加对本币的需求。</li>
              <li><strong>向外借款</strong>（例如向 IMF）补充外汇储备。</li>
              <li><strong>外汇管制</strong>（exchange controls）：限制居民可以兑换外币和转出资本的数量，减少本币供给。</li>
              <li>长期来看，用<strong>减少进口、增加出口的政策</strong>（例如贸易保护、供给侧政策）改变供求的基本面。</li>
            </ul>
            <Callout title="评价">
              <p>
                外汇储备是有限的；用高利率维持汇率会抑制国内增长。如果市场认为汇率无法维持，大规模投机可能迫使政府放弃钉住，例如 1992 年英镑退出欧洲汇率机制（ERM）、1997 年泰铢危机。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Fixed exchange rate">
              An exchange rate that the government or central bank fixes (pegs) against another currency or a basket of currencies, and maintains by intervening.
            </Def>
            <Def term="Devaluation">A <strong>decrease</strong> in the pegged value of a currency under a fixed exchange rate system.</Def>
            <Def term="Revaluation">An <strong>increase</strong> in the pegged value of a currency under a fixed exchange rate system.</Def>
            <p>
              Examples: the Hong Kong dollar has been linked to the US dollar since 1983, allowed to move within US$1 = HK$7.75–7.85; the Saudi riyal is fixed at US$1 = 3.75 riyals. In December 2023 Argentina devalued the official peso rate from about 366 to 800 pesos per US dollar in one step.
            </p>
            <p><strong>How a fixed rate is maintained</strong>: if demand for pounds falls (D₁ to D₂), the free-market rate would fall to ER₂. At the fixed rate ER₁ the quantity of pounds supplied (b) exceeds the quantity demanded (a), an excess supply of ab. The central bank must push demand back to D₁:</p>
            <FixedRate caption="Figure 6 Maintaining a fixed rate: demand falls from D₁ to D₂, creating excess supply ab at the fixed rate; the central bank buys pounds with its reserves or raises interest rates to bring demand back to D₁." />
            <ul>
              <li><strong>Buy its own currency using foreign currency reserves</strong> (or, under upward pressure, sell its own currency and build up reserves).</li>
              <li><strong>Raise interest rates</strong> to attract capital inflows and raise demand for the currency.</li>
              <li><strong>Borrow from abroad</strong> (e.g. from the IMF) to top up reserves.</li>
              <li><strong>Exchange controls</strong>: limit how much residents may convert into foreign currency or move abroad, reducing the supply of the currency.</li>
              <li>In the long run, <strong>policies that cut imports or boost exports</strong> (e.g. protection or supply-side policies) change the underlying demand and supply.</li>
            </ul>
            <Callout title="Evaluation">
              <p>
                Reserves are limited, and high interest rates to defend a peg hurt domestic growth. If markets believe a peg cannot hold, heavy speculation can force the government to abandon it, as with the pound leaving the European Exchange Rate Mechanism (ERM) in 1992 and the Thai baht crisis in 1997.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "managed",
      level: "both",
      title: { zh: "有管理的汇率：高估与低估", en: "Managed exchange rates: overvalued and undervalued currencies" },
      body: {
        zh: (
          <>
            <Def term="Managed exchange rate">
              汇率基本由市场决定，但央行会不定期干预，使汇率保持在一个目标区间内（上限与下限之间），或平抑过大的波动。也叫「有管理的浮动」（managed float）。
            </Def>
            <p>
              在区间内，汇率随供求自由浮动。如果需求从 D₁ 大幅下降到 D₂，汇率会跌到 ER₂，低于下限；央行就买入本币（或加息），使需求回升到 D₃，汇率停在下限 ER₃。汇率触及上限时则相反，卖出本币。
            </p>
            <ManagedRate caption="图 7 有管理的汇率：汇率可在上下限之间浮动。需求降到 D₂ 会使汇率跌破下限到 ER₂，央行干预使需求回到 D₃，汇率维持在下限 ER₃。" />
            <p>
              例子：新加坡金融管理局（MAS）让新元对一篮子货币在一个不公开的区间内浮动；人民币每天以中间价为基准，只能在 ±2% 的范围内波动。
            </p>
            <Def term="Overvalued currency">
              汇率被维持在<strong>高于</strong>自由市场均衡水平的位置。出口品价格偏高、进口品偏便宜，容易造成经常账户赤字；有助于压低通胀，但需要不断动用外汇储备来维持。
            </Def>
            <Def term="Undervalued currency">
              汇率被维持在<strong>低于</strong>自由市场均衡水平的位置。出口有价格优势，有利于出口带动增长和经常账户盈余，但进口变贵、可能推高通胀，也容易被贸易伙伴指责为「操纵汇率」（currency manipulation）。
            </Def>
            <Callout title="例子">
              <p>
                2000 年代中国被普遍认为人民币低估，积累了大量外汇储备和巨额经常账户盈余；2011—2015 年瑞士央行为防止瑞郎过度升值，设定 1 欧元兑 1.20 瑞郎的下限。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Managed exchange rate">
              An exchange rate that is largely market-determined, but the central bank intervenes from time to time to keep it within a target band (between an upper and a lower limit) or to smooth out large swings. Also called a managed float.
            </Def>
            <p>
              Within the band the rate floats freely. If demand falls sharply from D₁ to D₂, the rate would fall to ER₂, below the lower limit; the central bank buys its currency (or raises interest rates) so demand recovers to D₃ and the rate stays at the lower limit, ER₃. At the upper limit it does the opposite and sells its currency.
            </p>
            <ManagedRate caption="Figure 7 A managed exchange rate floats between upper and lower limits. A fall in demand to D₂ would push the rate below the floor to ER₂; intervention raises demand to D₃ and holds the rate at the lower limit ER₃." />
            <p>
              Examples: the Monetary Authority of Singapore lets the Singapore dollar float within an undisclosed band against a basket of currencies; the Chinese yuan may move only within ±2% of a daily reference rate.
            </p>
            <Def term="Overvalued currency">
              A currency kept <strong>above</strong> its free-market equilibrium value. Exports are priced too high and imports too low, which tends to cause a current account deficit; it helps keep inflation down but must be defended with reserves.
            </Def>
            <Def term="Undervalued currency">
              A currency kept <strong>below</strong> its free-market equilibrium value. Exports gain a price advantage, supporting export-led growth and a current account surplus, but imports cost more, inflation may rise, and trading partners may accuse the country of currency manipulation.
            </Def>
            <Callout title="Real-world example">
              <p>
                In the 2000s China&apos;s yuan was widely seen as undervalued, and China built up huge foreign reserves and current account surpluses. From 2011 to 2015 the Swiss National Bank held a floor of 1.20 francs per euro to stop the franc appreciating too far.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "fixed-vs-floating",
      level: "hl",
      title: { zh: "固定汇率与浮动汇率的比较", en: "Fixed versus floating exchange rate systems" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>固定汇率</th>
                  <th>浮动汇率</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>确定性</td>
                  <td>✓ 汇率稳定，进出口商和投资者风险低，鼓励贸易和 FDI。</td>
                  <td>✗ 汇率波动大，增加贸易和投资的不确定性（企业可以用远期合约对冲，但有成本）。</td>
                </tr>
                <tr>
                  <td>货币政策</td>
                  <td>✗ 利率要用来维持汇率，不能专注于国内目标。</td>
                  <td>✓ 利率可以用来应对国内通胀和失业。</td>
                </tr>
                <tr>
                  <td>外汇储备</td>
                  <td>✗ 需要大量外汇储备，有机会成本。</td>
                  <td>✓ 基本不需要。</td>
                </tr>
                <tr>
                  <td>调整机制</td>
                  <td>✗ 经常账户失衡不能靠汇率自动纠正，往往要靠紧缩来调整。</td>
                  <td>✓ 经常账户赤字会使本币贬值，从而自动帮助纠正赤字（至少理论上如此）。</td>
                </tr>
                <tr>
                  <td>通胀纪律</td>
                  <td>✓ 政府必须控制通胀以维持汇率，可借用锚货币的公信力。</td>
                  <td>✗ 贬值可能带来输入型通胀，缺少外部约束。</td>
                </tr>
                <tr>
                  <td>投机</td>
                  <td>✗ 汇率明显偏离均衡时，容易遭到投机攻击。</td>
                  <td>✗ 投机也可能造成汇率过度波动（overshooting）。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                没有绝对更好的制度。小型、高度开放、依赖单一贸易伙伴的经济体（例如香港）更适合固定汇率；大型经济体（美国、欧元区、日本）多采用浮动汇率，以保留独立的货币政策。许多新兴经济体选择有管理的浮动作为折中。注意「不可能三角」（impossible trinity）：一个国家无法同时拥有固定汇率、资本自由流动和独立的货币政策。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Fixed</th>
                  <th>Floating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Certainty</td>
                  <td>✓ A stable rate lowers risk for traders and investors, encouraging trade and FDI.</td>
                  <td>✗ Volatile rates add uncertainty to trade and investment (firms can hedge with forward contracts, at a cost).</td>
                </tr>
                <tr>
                  <td>Monetary policy</td>
                  <td>✗ Interest rates must be used to defend the rate, not for domestic goals.</td>
                  <td>✓ Interest rates are free to target domestic inflation and unemployment.</td>
                </tr>
                <tr>
                  <td>Foreign currency reserves</td>
                  <td>✗ Large reserves are needed, which carries an opportunity cost.</td>
                  <td>✓ Little need for reserves.</td>
                </tr>
                <tr>
                  <td>Adjustment</td>
                  <td>✗ Current account imbalances are not corrected automatically, so adjustment often requires deflationary policy.</td>
                  <td>✓ A current account deficit leads to depreciation, which helps correct it automatically (at least in theory).</td>
                </tr>
                <tr>
                  <td>Inflation discipline</td>
                  <td>✓ The government must control inflation to hold the peg, borrowing the credibility of the anchor currency.</td>
                  <td>✗ Depreciation can import inflation, and there is no external discipline.</td>
                </tr>
                <tr>
                  <td>Speculation</td>
                  <td>✗ A peg far from equilibrium invites speculative attacks.</td>
                  <td>✗ Speculation can also cause excessive swings (overshooting).</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                Neither system is always better. Small, very open economies that depend on one main trading partner (e.g. Hong Kong) suit a fixed rate; large economies (the US, the eurozone, Japan) mostly float to keep an independent monetary policy, and many emerging economies choose a managed float as a compromise. Remember the impossible trinity: a country cannot have a fixed exchange rate, free capital movement and an independent monetary policy all at once.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.5 Exchange rates",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 29.2 Demand and Supply Shifts in Foreign Exchange Markets",
      href: "https://openstax.org/books/principles-economics-3e/pages/29-2-demand-and-supply-shifts-in-foreign-exchange-markets",
    },
    {
      label: "OpenStax Principles of Economics 3e — 29.4 Exchange Rate Policies",
      href: "https://openstax.org/books/principles-economics-3e/pages/29-4-exchange-rate-policies",
    },
  ],
};

export default notes;
