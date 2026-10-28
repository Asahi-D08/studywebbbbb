import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, atY, intersect, shift, type Pt, type Seg } from "@/components/notes/Chart";

const yTick = (y: number): Pt => [-8 / 3.5, y - 4 / 2.56];
const xTick = (x: number): Pt => [x, -16 / 2.56];

const S_ELASTIC: Seg = [
  [0, 20],
  [90, 70],
];
const S_INELASTIC: Seg = [
  [25, 0],
  [45, 90],
];

function PriceRise({ caption, s, tag }: { caption: ReactNode; s: Seg; tag: string }) {
  const a = atY(s, 30);
  const b = atY(s, 60);
  return (
    <Chart x="Quantity supplied" y="Price" caption={caption}>
      <Line points={s} label="S" />
      <Guide at={a} x="Q₁" y="P₁" />
      <Guide at={b} x="Q₂" y="P₂" />
      <Dot at={a} />
      <Dot at={b} />
      <Label at={[48, 80]} muted>
        {tag}
      </Label>
    </Chart>
  );
}

function PerfectlyElastic({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Quantity supplied" y="Price" caption={caption}>
      <Line
        points={[
          [0, 50],
          [90, 50],
        ]}
        label="S (PES = ∞)"
        labelOffset={[-80, -8]}
      />
      <Label at={yTick(50)} anchor="end">
        P₁
      </Label>
    </Chart>
  );
}

function PerfectlyInelastic({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Quantity supplied" y="Price" caption={caption}>
      <Line
        points={[
          [40, 0],
          [40, 90],
        ]}
        label="S (PES = 0)"
      />
      <Label at={xTick(40)} anchor="middle">
        Q₁
      </Label>
    </Chart>
  );
}

function UnitaryElastic({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Quantity supplied" y="Price" caption={caption}>
      <Line
        points={[
          [0, 0],
          [60, 90],
        ]}
        label="S₁"
      />
      <Line
        points={[
          [0, 0],
          [85, 85],
        ]}
        label="S₂"
        tone="alt"
      />
      <Line
        points={[
          [0, 0],
          [90, 30],
        ]}
        label="S₃"
        tone="muted"
      />
      <Guide at={[30, 30]} x="Q₁" y="P₁" />
      <Guide at={[60, 60]} x="Q₂" y="P₂" />
      <Dot at={[30, 30]} label="A" labelOffset={[8, 10]} />
      <Dot at={[60, 60]} label="B" labelOffset={[8, 10]} />
      <Label at={[8, 88]} muted>
        All: PES = 1
      </Label>
    </Chart>
  );
}

const S_COMMODITY: Seg = [
  [35, 5],
  [55, 95],
];
const D1: Seg = [
  [35, 95],
  [55, 5],
];
const D2 = shift(D1, 12);

function CommodityVolatility({ caption }: { caption: ReactNode }) {
  const e1 = intersect(S_COMMODITY, D1);
  const e2 = intersect(S_COMMODITY, D2);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Line points={D1} label="D₁" />
      <Line points={D2} label="D₂" tone="alt" />
      <Line points={S_COMMODITY} label="S" />
      <Guide at={e1} x="Q₁" y="P₁" />
      <Guide at={e2} x="Q₂" y="P₂" />
      <Arrow from={[e1[0] + 6.5, 30]} to={[e1[0] + 14.5, 30]} />
      <Dot at={e1} />
      <Dot at={e2} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "供给的价格弹性（PES）衡量供给量对价格变化的反应程度。本节讲 PES 的公式和计算、取值范围及相应的供给曲线，以及五个决定因素：时间、生产要素的流动性、闲置产能、储存能力和成本上升的速度。HL 还要解释为什么初级产品的 PES 通常低于制成品。",
    en: "Price elasticity of supply (PES) measures how responsive quantity supplied is to a change in price. This topic covers the PES formula and calculations, its range of values and the matching supply curves, and five determinants: time, mobility of factors of production, unused capacity, ability to store and the rate at which costs rise. HL also explains why primary commodities generally have a lower PES than manufactured products.",
  },
  sections: [
    {
      id: "pes",
      level: "both",
      title: { zh: "供给的价格弹性（PES）", en: "Price elasticity of supply (PES)" },
      body: {
        zh: (
          <>
            <Def term="Price elasticity of supply (PES)">
              衡量供给量对商品价格变化的反应程度，等于供给量变化的百分比除以价格变化的百分比。
            </Def>
            <Formula>
              PES = <Frac n="供给量变化的百分比 %ΔQs" d="价格变化的百分比 %ΔP" />
            </Formula>
            <p>
              根据供给定律，价格和供给量<strong>同方向</strong>变动，所以 PES 通常是<strong>正数</strong>（与 PED 不同）。
            </p>
            <Callout title="例题：计算 PES">
              <p>小麦价格从每吨 2000 元涨到 2400 元，供给量从 1000 吨增加到 1050 吨。</p>
              <ul>
                <li>%ΔP = (2400 − 2000) ÷ 2000 × 100% = +20%</li>
                <li>%ΔQs = (1050 − 1000) ÷ 1000 × 100% = +5%</li>
                <li>PES = 5% ÷ 20% = 0.25 &lt; 1，供给<strong>缺乏弹性</strong>。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Price elasticity of supply (PES)">
              A measure of the responsiveness of quantity supplied to a change in the price of the good, calculated as the percentage change in quantity supplied divided by the percentage change in price.
            </Def>
            <Formula>
              PES = <Frac n="% change in quantity supplied" d="% change in price" />
            </Formula>
            <p>
              By the law of supply, price and quantity supplied move in the <strong>same direction</strong>, so PES is normally <strong>positive</strong> (unlike PED).
            </p>
            <Callout title="Worked example: calculating PES">
              <p>The price of wheat rises from ¥2000 to ¥2400 per tonne and quantity supplied rises from 1000 to 1050 tonnes.</p>
              <ul>
                <li>%ΔP = (2400 − 2000) ÷ 2000 × 100% = +20%</li>
                <li>%ΔQs = (1050 − 1000) ÷ 1000 × 100% = +5%</li>
                <li>PES = 5% ÷ 20% = 0.25 &lt; 1, so supply is <strong>price inelastic</strong>.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "degrees",
      level: "both",
      title: { zh: "PES 的取值范围与供给曲线", en: "Degrees of PES and supply curves" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>PES</th>
                  <th>名称</th>
                  <th>含义</th>
                  <th>曲线形状</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>完全无弹性（perfectly inelastic）</td>
                  <td>价格怎么变，供给量都不变</td>
                  <td>垂直线</td>
                </tr>
                <tr>
                  <td>0 – 1</td>
                  <td>缺乏弹性（inelastic）</td>
                  <td>%ΔQs 小于 %ΔP</td>
                  <td>较陡</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>单位弹性（unitary elastic）</td>
                  <td>%ΔQs 等于 %ΔP</td>
                  <td>经过原点的直线</td>
                </tr>
                <tr>
                  <td>1 – ∞</td>
                  <td>富有弹性（elastic）</td>
                  <td>%ΔQs 大于 %ΔP</td>
                  <td>较平缓</td>
                </tr>
                <tr>
                  <td>∞</td>
                  <td>完全弹性（perfectly elastic）</td>
                  <td>在 P₁ 愿意供给任意数量，低于 P₁ 则不供给</td>
                  <td>水平线</td>
                </tr>
              </tbody>
            </table>
            <PriceRise
              s={S_ELASTIC}
              tag="Relatively elastic (PES > 1)"
              caption="图 1 相对富有弹性的供给：价格从 P₁ 涨到 P₂，供给量从 Q₁ 大幅增加到 Q₂。"
            />
            <PriceRise
              s={S_INELASTIC}
              tag="Relatively inelastic (PES < 1)"
              caption="图 2 相对缺乏弹性的供给：同样的涨价，供给量只从 Q₁ 小幅增加到 Q₂。"
            />
            <p>考纲要求画出三种<strong>弹性处处相同</strong>（constant PES）的供给曲线：</p>
            <PerfectlyElastic caption="图 3 完全弹性供给（PES = ∞）：在价格 P₁ 下，企业愿意供给任意数量。" />
            <PerfectlyInelastic caption="图 4 完全无弹性供给（PES = 0）：供给量固定在 Q₁，例如某场演唱会的座位数或一幅名画。" />
            <UnitaryElastic caption="图 5 单位弹性供给（PES = 1）：任何经过原点的直线，不论斜率如何，PES 都等于 1。以 S₂ 为例，A 到 B 价格和供给量都翻倍（+100%）。" />
            <Callout title="考试提示：看截距判断直线供给曲线的弹性">
              <ul>
                <li>直线从<strong>价格轴</strong>出发（截距在纵轴上）：每一点 PES &gt; 1。</li>
                <li>直线经过<strong>原点</strong>：每一点 PES = 1。</li>
                <li>直线从<strong>数量轴</strong>出发（截距在横轴上）：每一点 PES &lt; 1。</li>
              </ul>
              <p>所以判断供给弹性时，看截距比看斜率更可靠。图 1 和图 2 就是按这个规则画的。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>PES</th>
                  <th>Name</th>
                  <th>Meaning</th>
                  <th>Shape of curve</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>Perfectly inelastic</td>
                  <td>Quantity supplied does not change whatever the price</td>
                  <td>Vertical</td>
                </tr>
                <tr>
                  <td>0 – 1</td>
                  <td>Inelastic</td>
                  <td>%ΔQs is smaller than %ΔP</td>
                  <td>Relatively steep</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Unitary elastic</td>
                  <td>%ΔQs equals %ΔP</td>
                  <td>Straight line through the origin</td>
                </tr>
                <tr>
                  <td>1 – ∞</td>
                  <td>Elastic</td>
                  <td>%ΔQs is larger than %ΔP</td>
                  <td>Relatively flat</td>
                </tr>
                <tr>
                  <td>∞</td>
                  <td>Perfectly elastic</td>
                  <td>Firms will supply any quantity at P₁ but nothing below it</td>
                  <td>Horizontal</td>
                </tr>
              </tbody>
            </table>
            <PriceRise
              s={S_ELASTIC}
              tag="Relatively elastic (PES > 1)"
              caption="Figure 1 Relatively elastic supply: a rise in price from P₁ to P₂ causes a large rise in quantity supplied from Q₁ to Q₂."
            />
            <PriceRise
              s={S_INELASTIC}
              tag="Relatively inelastic (PES < 1)"
              caption="Figure 2 Relatively inelastic supply: the same price rise increases quantity supplied only slightly, from Q₁ to Q₂."
            />
            <p>The guide requires the three supply curves with <strong>constant PES</strong> at every point:</p>
            <PerfectlyElastic caption="Figure 3 Perfectly elastic supply (PES = ∞): at price P₁ firms are willing to supply any quantity." />
            <PerfectlyInelastic caption="Figure 4 Perfectly inelastic supply (PES = 0): quantity supplied is fixed at Q₁, e.g. the seats at one concert or an original painting." />
            <UnitaryElastic caption="Figure 5 Unitary elastic supply (PES = 1): any straight line through the origin has PES = 1, whatever its slope. On S₂, moving from A to B doubles both price and quantity (+100%)." />
            <Callout title="Exam tip: use the intercept to judge a straight-line supply curve">
              <ul>
                <li>A line starting from the <strong>price axis</strong> (vertical intercept): PES &gt; 1 at every point.</li>
                <li>A line through the <strong>origin</strong>: PES = 1 at every point.</li>
                <li>A line starting from the <strong>quantity axis</strong> (horizontal intercept): PES &lt; 1 at every point.</li>
              </ul>
              <p>So the intercept, not the slope, is the reliable guide. Figures 1 and 2 are drawn this way.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "determinants",
      level: "both",
      title: { zh: "PES 的决定因素", en: "Determinants of PES" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>决定因素</th>
                  <th>使供给更富有弹性的情况</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>时间（time）</td>
                  <td>价格变化后经过的时间更长，企业有时间招人、买设备、建厂</td>
                  <td>短期内酒店房间数固定；几年后可以建新酒店。时间越长，PES 越大。</td>
                </tr>
                <tr>
                  <td>生产要素的流动性（mobility of factors of production）</td>
                  <td>劳动力和资本容易从一种用途转到另一种用途</td>
                  <td>服装厂可以较快转产口罩；核电站的工程师和设备则很难转作他用。</td>
                </tr>
                <tr>
                  <td>闲置产能（unused capacity）</td>
                  <td>企业有空闲的机器和人手</td>
                  <td>经济衰退时工厂开工不足，价格上升后可以迅速增加产量。</td>
                </tr>
                <tr>
                  <td>储存能力（ability to store）</td>
                  <td>商品容易储存且储存成本低，企业有存货</td>
                  <td>罐头、衣服可以从库存中快速补货；鲜花、新鲜牛奶难以储存，PES 低。</td>
                </tr>
                <tr>
                  <td>成本上升的速度（rate at which costs increase）</td>
                  <td>增加产量时成本上升得慢</td>
                  <td>软件、数字下载多生产一份几乎不增加成本，PES 很高；需要加班费和昂贵原料才能扩产时，PES 低。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                「时间」是最重要的决定因素。考试中可以区分<strong>短期</strong>（至少一种要素固定，PES 较低）和<strong>长期</strong>（所有要素可变，PES 较高）。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Determinant</th>
                  <th>Supply is more elastic when…</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Time</td>
                  <td>More time has passed since the price change, so firms can hire workers, buy equipment and build plants</td>
                  <td>The number of hotel rooms is fixed in the short run, but new hotels can be built over several years. The longer the period, the higher the PES.</td>
                </tr>
                <tr>
                  <td>Mobility of factors of production</td>
                  <td>Labour and capital can move easily from one use to another</td>
                  <td>A clothing factory can switch to making face masks fairly quickly; nuclear engineers and reactors cannot easily be redeployed.</td>
                </tr>
                <tr>
                  <td>Unused capacity</td>
                  <td>Firms have spare machinery and staff</td>
                  <td>In a recession factories run below capacity, so output can rise quickly when price rises.</td>
                </tr>
                <tr>
                  <td>Ability to store</td>
                  <td>The good can be stored cheaply and firms hold stocks</td>
                  <td>Tinned food and clothing can be restocked quickly from inventories; fresh flowers and fresh milk are hard to store, so their PES is low.</td>
                </tr>
                <tr>
                  <td>Rate at which costs increase</td>
                  <td>Costs rise only slowly as output expands</td>
                  <td>An extra copy of software or a digital download costs almost nothing, so PES is very high; if expanding output needs overtime pay and expensive inputs, PES is low.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                Time is the most important determinant. You can distinguish the <strong>short run</strong> (at least one factor fixed, lower PES) from the <strong>long run</strong> (all factors variable, higher PES).
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "primary-vs-manufactured",
      level: "hl",
      title: { zh: "为什么初级产品的 PES 低于制成品", en: "Why PES for primary commodities is lower than for manufactured products" },
      body: {
        zh: (
          <>
            <p>初级产品（农产品、矿产、能源）的供给通常比制成品更缺乏弹性，可以用上面的决定因素来解释：</p>
            <ul>
              <li>
                <strong>时间滞后长：</strong>农作物要经过一个生长季才能收获，咖啡树、橡胶树要好几年才能结果；开发新矿山或油田往往需要数年。
              </li>
              <li>
                <strong>难以储存：</strong>许多农产品容易腐烂（水果、蔬菜、牛奶），不能靠库存应对涨价。
              </li>
              <li>
                <strong>要素流动性低：</strong>土地用途、矿山设备和专业技能很难快速转移；而工厂可以通过加班、增开班次快速扩产。
              </li>
              <li>
                <strong>闲置产能少：</strong>农田和矿山通常已在接近满负荷地运作，短期内很难增加产量。
              </li>
            </ul>
            <p>
              后果：初级产品的需求（PED 低，见 2.5）和供给都缺乏弹性，所以需求或供给的变动会引起<strong>很大的价格波动</strong>，而数量变化很小。这让依赖初级产品出口的国家收入很不稳定。
            </p>
            <CommodityVolatility caption="图 6 初级产品市场：需求和供给都缺乏弹性。需求从 D₁ 增加到 D₂，价格从 P₁ 大幅上涨到 P₂，而数量只从 Q₁ 小幅增加到 Q₂。" />
            <Callout title="例子">
              <p>
                2021–2022 年，全球需求恢复加上供给受到冲击，天然气、小麦、化肥等初级产品价格在短时间内大幅上涨，因为产量无法迅速增加。相比之下，电子产品等制成品的价格波动小得多。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>The supply of primary commodities (agricultural products, minerals, energy) is usually less elastic than that of manufactured products. The determinants above explain why:</p>
            <ul>
              <li>
                <strong>Long time lags:</strong> crops take a growing season to harvest, coffee and rubber trees take years to mature, and new mines or oil fields often take years to develop.
              </li>
              <li>
                <strong>Difficulty of storage:</strong> many agricultural products are perishable (fruit, vegetables, milk), so stocks cannot be released when price rises.
              </li>
              <li>
                <strong>Low factor mobility:</strong> land, mining equipment and specialist skills cannot be moved quickly, whereas factories can expand output with overtime or extra shifts.
              </li>
              <li>
                <strong>Little unused capacity:</strong> farms and mines usually operate close to full capacity, so output is hard to raise in the short run.
              </li>
            </ul>
            <p>
              Consequence: both demand (low PED, see 2.5) and supply are inelastic for primary commodities, so shifts in demand or supply cause <strong>large price swings</strong> with only small changes in quantity. This makes export earnings very unstable for commodity-dependent countries.
            </p>
            <CommodityVolatility caption="Figure 6 A primary commodity market with inelastic demand and supply: an increase in demand from D₁ to D₂ raises price sharply from P₁ to P₂, while quantity rises only slightly from Q₁ to Q₂." />
            <Callout title="Real-world example">
              <p>
                In 2021–2022, recovering global demand combined with supply shocks pushed up the prices of natural gas, wheat and fertiliser very sharply within months, because output could not be raised quickly. Prices of manufactured goods such as electronics were far more stable.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "calculations",
      level: "both",
      title: { zh: "PES 计算练习", en: "PES calculations" },
      body: {
        zh: (
          <>
            <p>考纲要求能根据数据求 PES、价格变化或供给量变化。把公式变形即可：</p>
            <Formula>
              %ΔQs = PES × %ΔP　　　%ΔP = <Frac n="%ΔQs" d="PES" />
            </Formula>
            <Callout title="例题">
              <ul>
                <li>
                  <strong>求 PES：</strong>手机壳价格从 40 元涨到 44 元（+10%），某工厂每月供给量从 5000 个增加到 6000 个（+20%）。PES = 20% ÷ 10% = 2，富有弹性（工厂有闲置产能，原料容易获得）。
                </li>
                <li>
                  <strong>求供给量变化：</strong>某商品 PES = 1.5，价格上涨 8%。%ΔQs = 1.5 × 8% = +12%。若原来供给 2000 件，现在为 2240 件。
                </li>
                <li>
                  <strong>求价格变化：</strong>某农产品 PES = 0.5，政府希望供给量增加 10%。%ΔP = 10% ÷ 0.5 = +20%，即价格需要上涨 20%。
                </li>
              </ul>
            </Callout>
            <Callout title="考试提示">
              <p>
                先写公式，再代入数字，并保留百分号和正负号；最后一句话说明结果的含义（富有弹性还是缺乏弹性），往往能拿到解释分。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>The guide requires you to calculate PES, the change in price or the change in quantity supplied from data. Rearrange the formula:</p>
            <Formula>
              %ΔQs = PES × %ΔP　　　%ΔP = <Frac n="%ΔQs" d="PES" />
            </Formula>
            <Callout title="Worked examples">
              <ul>
                <li>
                  <strong>Calculating PES:</strong> the price of phone cases rises from ¥40 to ¥44 (+10%) and a factory&apos;s monthly output rises from 5000 to 6000 (+20%). PES = 20% ÷ 10% = 2, so supply is elastic (the factory has spare capacity and inputs are easy to obtain).
                </li>
                <li>
                  <strong>Change in quantity supplied:</strong> PES = 1.5 and price rises by 8%. %ΔQs = 1.5 × 8% = +12%. If 2000 units were supplied before, 2240 units are supplied now.
                </li>
                <li>
                  <strong>Change in price:</strong> PES for a crop is 0.5 and the government wants quantity supplied to rise by 10%. %ΔP = 10% ÷ 0.5 = +20%, so price must rise by 20%.
                </li>
              </ul>
            </Callout>
            <Callout title="Exam tip">
              <p>
                Write the formula first, then substitute, keeping the % signs and the sign of each change. Finish with one sentence interpreting the result (elastic or inelastic) to pick up the explanation marks.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.6 Elasticity of supply",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 5.1 Price Elasticity of Demand and Price Elasticity of Supply",
      href: "https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply",
    },
    {
      label: "OpenStax Principles of Economics 3e — 5.2 Polar Cases of Elasticity and Constant Elasticity",
      href: "https://openstax.org/books/principles-economics-3e/pages/5-2-polar-cases-of-elasticity-and-constant-elasticity",
    },
  ],
};

export default notes;
