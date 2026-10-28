import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac, HL } from "@/components/notes/blocks";
import { Chart, Dot, Guide, Label, Line, Region, atY, type Pt, type Seg } from "@/components/notes/Chart";

const yTick = (y: number): Pt => [-8 / 3.5, y - 4 / 2.56];
const xTick = (x: number): Pt => [x, -16 / 2.56];

const D_ELASTIC: Seg = [
  [0, 70],
  [90, 25],
];
const D_INELASTIC: Seg = [
  [25, 95],
  [55, 5],
];

function PriceChange({
  caption,
  d,
  tag,
  revenue = false,
}: {
  caption: ReactNode;
  d: Seg;
  tag: string;
  revenue?: boolean;
}) {
  const a = atY(d, 60);
  const b = atY(d, 40);
  return (
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      {revenue && (
        <>
          <Region
            points={[
              [0, 40],
              [0, 60],
              [a[0], 60],
              [a[0], 40],
            ]}
            fill="b"
            label="A"
          />
          <Region
            points={[
              [a[0], 0],
              [a[0], 40],
              [b[0], 40],
              [b[0], 0],
            ]}
            fill="a"
            label="B"
          />
        </>
      )}
      <Line points={d} label="D" />
      <Guide at={a} x="Q₁" y="P₁" />
      <Guide at={b} x="Q₂" y="P₂" />
      <Dot at={a} />
      <Dot at={b} />
      <Label at={[50, 85]} muted>
        {tag}
      </Label>
    </Chart>
  );
}

function PerfectlyElastic({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      <Line
        points={[
          [0, 50],
          [90, 50],
        ]}
        label="D (PED = ∞)"
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
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      <Line
        points={[
          [40, 0],
          [40, 90],
        ]}
        label="D (PED = 0)"
      />
      <Label at={xTick(40)} anchor="middle">
        Q₁
      </Label>
    </Chart>
  );
}

const UNIT: Pt[] = [13.5, 15, 20, 30, 40, 60, 80, 90].map((q) => [q, 1200 / q] as Pt);

function UnitaryElastic({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      <Line points={UNIT} smooth label="D (PED = 1)" labelAt="start" labelOffset={[8, 4]} />
      <Guide at={[20, 60]} x="Q₁" y="P₁" />
      <Guide at={[60, 20]} x="Q₂" y="P₂" />
      <Dot at={[20, 60]} label="A" />
      <Dot at={[60, 20]} label="B" />
    </Chart>
  );
}

const D_LINEAR: Seg = [
  [0, 90],
  [90, 0],
];

function LinearPed({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      <Line points={D_LINEAR} />
      <Label at={[73, 22]}>D</Label>
      <Guide at={[45, 45]} x="Q₁" y="P₁" />
      <Dot at={[45, 45]} label="PED = 1" labelOffset={[8, -4]} />
      <Label at={[22, 72]}>Elastic: PED &gt; 1</Label>
      <Label at={[60, 40]}>Inelastic: PED &lt; 1</Label>
      <Label at={[3, 91]} muted>
        PED → ∞
      </Label>
      <Label at={[86, 8]} muted>
        PED = 0
      </Label>
    </Chart>
  );
}

const TR_CURVE: Pt[] = [0, 15, 30, 45, 60, 75, 90].map((q) => [q, (q * (90 - q) * 80) / 2025] as Pt);

function RevenueCurve({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Quantity demanded" y="Total revenue" caption={caption}>
      <Line points={TR_CURVE} smooth />
      <Label at={[62, 78]}>TR</Label>
      <Guide at={[45, 80]} x="Q₁" />
      <Dot at={[45, 80]} label="PED = 1" labelOffset={[-25, -10]} />
      <Label at={[5, 62]}>PED &gt; 1</Label>
      <Label at={[78, 62]}>PED &lt; 1</Label>
    </Chart>
  );
}

const ENGEL: Pt[] = [
  [0, 0],
  [10, 14],
  [28, 27],
  [45, 38],
  [57, 58],
  [61, 72],
  [57, 88],
];

function EngelCurve({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Quantity demanded" y="Income" caption={caption}>
      <Line points={ENGEL} smooth label="Engel curve" labelOffset={[-30, -10]} />
      <Label at={[24, 16]}>YED &gt; 1 (luxury)</Label>
      <Label at={[60, 50]}>0 &lt; YED &lt; 1</Label>
      <Label at={[60, 44]}>(necessity)</Label>
      <Label at={[62, 82]}>YED &lt; 0 (inferior)</Label>
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "弹性衡量一个变量对另一个变量变化的反应程度。本节讲需求的价格弹性（PED）：公式、取值范围、决定因素、与总收益的关系以及对企业和政府的意义；再讲需求的收入弹性（YED）与恩格尔曲线。HL 还要掌握直线需求曲线上 PED 的变化、初级产品 PED 较低的原因，以及 YED 对企业和经济部门结构变化的意义。",
    en: "Elasticity measures how responsive one variable is to a change in another. This topic covers price elasticity of demand (PED): the formula, its range of values, its determinants, its link with total revenue and why it matters to firms and governments; then income elasticity of demand (YED) and the Engel curve. HL adds how PED changes along a straight-line demand curve, why primary commodities have lower PED, and why YED matters for firms and for changes in the sectoral structure of the economy.",
  },
  sections: [
    {
      id: "concept",
      level: "both",
      title: { zh: "弹性的概念", en: "The concept of elasticity" },
      body: {
        zh: (
          <>
            <Def term="Elasticity">
              衡量一个经济变量（如需求量）对另一个变量（如价格或收入）变化的<strong>反应程度</strong>，用两个百分比变化之比表示。
            </Def>
            <p>
              用百分比而不是绝对量，是为了让不同单位、不同价格水平的商品可以相互比较：手机涨 100 元和口香糖涨 100 元意义完全不同。
            </p>
            <p>
              <strong>相对富有弹性</strong>（relatively elastic）：需求量变化的百分比大于价格变化的百分比，需求曲线画得比较平缓。<strong>相对缺乏弹性</strong>（relatively inelastic）：需求量变化的百分比小于价格变化的百分比，需求曲线画得比较陡峭。
            </p>
            <PriceChange
              d={D_ELASTIC}
              tag="Relatively elastic (PED > 1)"
              caption="图 1 相对富有弹性的需求：价格从 P₁ 降到 P₂，需求量从 Q₁ 按更大的比例增加到 Q₂。"
            />
            <PriceChange
              d={D_INELASTIC}
              tag="Relatively inelastic (PED < 1)"
              caption="图 2 相对缺乏弹性的需求：同样的降价，需求量只从 Q₁ 小幅增加到 Q₂。"
            />
            <Callout title="画图要点">
              <ul>
                <li>两幅图用<strong>相同的价格变化</strong>，对比数量变化的大小，最能说明问题。</li>
                <li>
                  严格来说，弹性不等于斜率（见 HL 部分）。但在同一坐标刻度下比较两条经过同一区域的曲线时，「平缓 = 较有弹性、陡峭 = 较缺乏弹性」是考试中可接受的画法。
                </li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Elasticity">
              A measure of the <strong>responsiveness</strong> of one economic variable (such as quantity demanded) to a change in another (such as price or income), expressed as a ratio of percentage changes.
            </Def>
            <p>
              Percentages are used rather than absolute amounts so that goods measured in different units and at very different prices can be compared: a ¥100 price rise means something very different for a phone than for chewing gum.
            </p>
            <p>
              <strong>Relatively elastic</strong> demand: the percentage change in quantity demanded is larger than the percentage change in price, drawn as a relatively flat curve. <strong>Relatively inelastic</strong> demand: the percentage change in quantity demanded is smaller than the percentage change in price, drawn as a relatively steep curve.
            </p>
            <PriceChange
              d={D_ELASTIC}
              tag="Relatively elastic (PED > 1)"
              caption="Figure 1 Relatively elastic demand: a fall in price from P₁ to P₂ causes a proportionately larger rise in quantity demanded from Q₁ to Q₂."
            />
            <PriceChange
              d={D_INELASTIC}
              tag="Relatively inelastic (PED < 1)"
              caption="Figure 2 Relatively inelastic demand: the same price fall raises quantity demanded only slightly, from Q₁ to Q₂."
            />
            <Callout title="Drawing checklist">
              <ul>
                <li>Use the <strong>same price change</strong> on both diagrams so the difference in quantity response is obvious.</li>
                <li>
                  Strictly, elasticity is not the same as slope (see the HL section). But when comparing two curves through the same region on the same scale, &quot;flatter = more elastic, steeper = more inelastic&quot; is accepted in exams.
                </li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "ped",
      level: "both",
      title: { zh: "需求的价格弹性（PED）及其取值范围", en: "Price elasticity of demand (PED) and its range of values" },
      body: {
        zh: (
          <>
            <Def term="Price elasticity of demand (PED)">
              衡量需求量对商品自身价格变化的反应程度，等于需求量变化的百分比除以价格变化的百分比。
            </Def>
            <Formula>
              PED = <Frac n="需求量变化的百分比 %ΔQd" d="价格变化的百分比 %ΔP" />
            </Formula>
            <p>
              由于需求定律，价格和需求量反向变动，PED 计算出来是<strong>负数</strong>。习惯上取绝对值来判断大小，考试时写负号或取绝对值都可以，但要说清楚。
            </p>
            <Callout title="例题：计算 PED">
              <p>奶茶价格从 20 元涨到 25 元，每天销量从 200 杯降到 140 杯。</p>
              <ul>
                <li>%ΔP = (25 − 20) ÷ 20 × 100% = +25%</li>
                <li>%ΔQd = (140 − 200) ÷ 200 × 100% = −30%</li>
                <li>PED = −30% ÷ 25% = −1.2，绝对值 1.2 &gt; 1，需求<strong>富有弹性</strong>。</li>
              </ul>
            </Callout>
            <table>
              <thead>
                <tr>
                  <th>PED 绝对值</th>
                  <th>名称</th>
                  <th>含义</th>
                  <th>曲线形状</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>完全无弹性（perfectly inelastic）</td>
                  <td>价格怎么变，需求量都不变</td>
                  <td>垂直线</td>
                </tr>
                <tr>
                  <td>0 – 1</td>
                  <td>缺乏弹性（inelastic）</td>
                  <td>%ΔQd 小于 %ΔP</td>
                  <td>较陡</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>单位弹性（unitary elastic）</td>
                  <td>%ΔQd 等于 %ΔP</td>
                  <td>直角双曲线（rectangular hyperbola）</td>
                </tr>
                <tr>
                  <td>1 – ∞</td>
                  <td>富有弹性（elastic）</td>
                  <td>%ΔQd 大于 %ΔP</td>
                  <td>较平缓</td>
                </tr>
                <tr>
                  <td>∞</td>
                  <td>完全弹性（perfectly elastic）</td>
                  <td>价格稍高于 P₁，需求量降为零</td>
                  <td>水平线</td>
                </tr>
              </tbody>
            </table>
            <p>考纲要求画出三种<strong>弹性处处相同</strong>（constant PED）的需求曲线：</p>
            <PerfectlyElastic caption="图 3 完全弹性需求（PED = ∞）：在 P₁ 可以卖出任意数量，价格稍高一点需求量就降为零。" />
            <PerfectlyInelastic caption="图 4 完全无弹性需求（PED = 0）：无论价格多少，需求量都固定在 Q₁，例如急救药品的近似情况。" />
            <UnitaryElastic caption="图 5 单位弹性需求（PED = 1）：曲线是直角双曲线，每一点 P × Q 都相等（A 点 60 × 20 = B 点 20 × 60 = 1200）。" />
            <Callout title="考试提示">
              <p>
                完全弹性和完全无弹性是<strong>理论上的极端情况</strong>，现实中很少见，但它们帮助我们理解弹性的取值范围。单位弹性需求曲线<strong>不是直线</strong>，不要画成 45° 直线。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Price elasticity of demand (PED)">
              A measure of the responsiveness of quantity demanded to a change in the good&apos;s own price, calculated as the percentage change in quantity demanded divided by the percentage change in price.
            </Def>
            <Formula>
              PED = <Frac n="% change in quantity demanded" d="% change in price" />
            </Formula>
            <p>
              Because of the law of demand, price and quantity demanded move in opposite directions, so PED is <strong>negative</strong>. By convention we judge its size by the absolute value; in exams you may keep the minus sign or drop it, as long as you are consistent.
            </p>
            <Callout title="Worked example: calculating PED">
              <p>The price of bubble tea rises from ¥20 to ¥25 and daily sales fall from 200 cups to 140 cups.</p>
              <ul>
                <li>%ΔP = (25 − 20) ÷ 20 × 100% = +25%</li>
                <li>%ΔQd = (140 − 200) ÷ 200 × 100% = −30%</li>
                <li>PED = −30% ÷ 25% = −1.2; the absolute value 1.2 &gt; 1, so demand is <strong>price elastic</strong>.</li>
              </ul>
            </Callout>
            <table>
              <thead>
                <tr>
                  <th>Absolute value of PED</th>
                  <th>Name</th>
                  <th>Meaning</th>
                  <th>Shape of curve</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>Perfectly inelastic</td>
                  <td>Quantity demanded does not change whatever the price</td>
                  <td>Vertical</td>
                </tr>
                <tr>
                  <td>0 – 1</td>
                  <td>Inelastic</td>
                  <td>%ΔQd is smaller than %ΔP</td>
                  <td>Relatively steep</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Unitary elastic</td>
                  <td>%ΔQd equals %ΔP</td>
                  <td>Rectangular hyperbola</td>
                </tr>
                <tr>
                  <td>1 – ∞</td>
                  <td>Elastic</td>
                  <td>%ΔQd is larger than %ΔP</td>
                  <td>Relatively flat</td>
                </tr>
                <tr>
                  <td>∞</td>
                  <td>Perfectly elastic</td>
                  <td>Any rise above P₁ cuts quantity demanded to zero</td>
                  <td>Horizontal</td>
                </tr>
              </tbody>
            </table>
            <p>The guide requires the three demand curves with <strong>constant PED</strong> at every point:</p>
            <PerfectlyElastic caption="Figure 3 Perfectly elastic demand (PED = ∞): any quantity can be sold at P₁, but quantity demanded falls to zero if price rises at all." />
            <PerfectlyInelastic caption="Figure 4 Perfectly inelastic demand (PED = 0): quantity demanded stays at Q₁ whatever the price, roughly the case for some life-saving medicines." />
            <UnitaryElastic caption="Figure 5 Unitary elastic demand (PED = 1): a rectangular hyperbola on which P × Q is the same at every point (A: 60 × 20 = B: 20 × 60 = 1200)." />
            <Callout title="Exam tip">
              <p>
                Perfectly elastic and perfectly inelastic demand are <strong>theoretical extremes</strong> that are rare in practice, but they mark the limits of the range. A unitary elastic demand curve is <strong>not a straight line</strong>: do not draw it as a 45° line.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "ped-linear",
      level: "hl",
      title: { zh: "直线需求曲线上 PED 的变化", en: "Changing PED along a straight-line demand curve" },
      body: {
        zh: (
          <>
            <p>
              一条向下倾斜的<strong>直线</strong>需求曲线斜率处处相同，但 PED 并不相同。原因是 PED 用的是<strong>百分比</strong>变化：
            </p>
            <ul>
              <li>曲线上端：价格高、数量小。数量变化 10 个单位相对于很小的 Q 是很大的百分比，价格变化相对于很高的 P 是很小的百分比，所以 PED 大于 1。</li>
              <li>曲线下端正好相反：PED 小于 1。</li>
              <li>中点 PED = 1；与价格轴的交点 PED 趋于无穷大；与数量轴的交点 PED = 0。</li>
            </ul>
            <LinearPed caption="图 6 直线需求曲线：中点以上富有弹性，中点处单位弹性，中点以下缺乏弹性。" />
            <Callout title="例题：同一条直线上的两个 PED">
              <p>需求曲线为价格从 90 降到 0 的直线（价格每降 1，需求量增加 1）。</p>
              <ul>
                <li>上端：P 从 60 降到 50，Q 从 30 增到 40。%ΔQd = 10 ÷ 30 = +33.3%，%ΔP = −10 ÷ 60 = −16.7%，PED = −2.0（富有弹性）。</li>
                <li>下端：P 从 30 降到 20，Q 从 60 增到 70。%ΔQd = 10 ÷ 60 = +16.7%，%ΔP = −10 ÷ 30 = −33.3%，PED = −0.5（缺乏弹性）。</li>
              </ul>
              <p>价格和数量的绝对变化都一样（斜率相同），PED 却相差四倍。</p>
            </Callout>
            <p>
              把总收益（TR = P × Q）画在下方，可以看出：在富有弹性的部分，降价使 TR 上升；在单位弹性处 TR 最大；在缺乏弹性的部分，降价使 TR 下降。
            </p>
            <RevenueCurve caption="图 7 与图 6 对应的总收益曲线：TR 在 PED = 1 的产量 Q₁ 处达到最大。" />
          </>
        ),
        en: (
          <>
            <p>
              A downward-sloping <strong>straight-line</strong> demand curve has the same slope everywhere, but not the same PED, because PED uses <strong>percentage</strong> changes:
            </p>
            <ul>
              <li>At the top of the curve price is high and quantity low. A 10-unit change in quantity is a large percentage of a small Q, while a price change is a small percentage of a high P, so PED is greater than 1.</li>
              <li>At the bottom the opposite holds, so PED is less than 1.</li>
              <li>PED = 1 at the midpoint, tends to infinity where the curve meets the price axis, and equals 0 where it meets the quantity axis.</li>
            </ul>
            <LinearPed caption="Figure 6 A straight-line demand curve: elastic above the midpoint, unitary elastic at the midpoint and inelastic below it." />
            <Callout title="Worked example: two PEDs on one straight line">
              <p>Demand is a straight line from a price of 90 down to 0 (each 1-unit fall in price raises quantity demanded by 1 unit).</p>
              <ul>
                <li>Upper part: P falls from 60 to 50 and Q rises from 30 to 40. %ΔQd = 10 ÷ 30 = +33.3%, %ΔP = −10 ÷ 60 = −16.7%, so PED = −2.0 (elastic).</li>
                <li>Lower part: P falls from 30 to 20 and Q rises from 60 to 70. %ΔQd = 10 ÷ 60 = +16.7%, %ΔP = −10 ÷ 30 = −33.3%, so PED = −0.5 (inelastic).</li>
              </ul>
              <p>The absolute changes in price and quantity are identical (same slope), yet PED differs by a factor of four.</p>
            </Callout>
            <p>
              Plotting total revenue (TR = P × Q) underneath shows the link: on the elastic part a price cut raises TR, TR is at its maximum where PED = 1, and on the inelastic part a price cut lowers TR.
            </p>
            <RevenueCurve caption="Figure 7 The total revenue curve matching Figure 6: TR is maximised at Q₁, where PED = 1." />
          </>
        ),
      },
    },
    {
      id: "determinants",
      level: "both",
      title: { zh: "PED 的决定因素", en: "Determinants of PED" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>决定因素</th>
                  <th>使需求更富有弹性的情况</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>替代品的数量和接近程度（number and closeness of substitutes）</td>
                  <td>替代品多且很接近</td>
                  <td>某一品牌的矿泉水富有弹性；「水」整体缺乏弹性。商品定义越窄，弹性越大。</td>
                </tr>
                <tr>
                  <td>必需程度（degree of necessity）</td>
                  <td>是奢侈品而非必需品</td>
                  <td>大米、自来水、胰岛素缺乏弹性；名牌包、出国旅游较富有弹性。香烟等成瘾品也缺乏弹性。</td>
                </tr>
                <tr>
                  <td>占收入的比例（proportion of income spent on the good）</td>
                  <td>占收入比例大</td>
                  <td>汽车、家具涨 10% 影响很大；盐、火柴涨 10% 几乎没人在意。</td>
                </tr>
                <tr>
                  <td>时间（time）</td>
                  <td>价格变化后经过的时间更长</td>
                  <td>汽油涨价后短期只能照常开车，长期可以换电动车、搬家或改坐地铁，需求变得更有弹性。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>解释弹性时，最好同时说明<strong>哪个决定因素</strong>起作用，并联系具体商品，例如「汽油短期缺乏弹性，因为缺少接近的替代品且是通勤的必需品」。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Determinant</th>
                  <th>Demand is more elastic when…</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Number and closeness of substitutes</td>
                  <td>There are many close substitutes</td>
                  <td>One brand of bottled water is elastic; water in general is inelastic. The more narrowly a good is defined, the more elastic its demand.</td>
                </tr>
                <tr>
                  <td>Degree of necessity</td>
                  <td>The good is a luxury rather than a necessity</td>
                  <td>Rice, tap water and insulin are inelastic; designer handbags and foreign holidays are more elastic. Addictive goods such as cigarettes are also inelastic.</td>
                </tr>
                <tr>
                  <td>Proportion of income spent on the good</td>
                  <td>It takes a large share of income</td>
                  <td>A 10% rise in the price of a car or furniture matters a lot; a 10% rise in the price of salt or matches is barely noticed.</td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>More time has passed since the price change</td>
                  <td>After a petrol price rise, drivers must keep driving in the short run, but in the long run they can switch to electric cars, move house or take the metro, so demand becomes more elastic.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>When explaining elasticity, name <strong>which determinant</strong> is at work and tie it to the good, e.g. &quot;petrol is price inelastic in the short run because it has no close substitutes and is a necessity for commuting&quot;.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "ped-revenue",
      level: "both",
      title: { zh: "PED 与总收益", en: "PED and total revenue" },
      body: {
        zh: (
          <>
            <Def term="Total revenue (TR)">
              企业销售商品得到的全部收入，等于价格乘以销售量：TR = P × Q。它也等于消费者在该商品上的总支出。
            </Def>
            <p>
              价格变化对 TR 有两个相反的作用：每单位卖得更贵（或更便宜），但卖出的数量减少（或增加）。哪个作用更大取决于 PED：
            </p>
            <table>
              <thead>
                <tr>
                  <th>PED</th>
                  <th>降价</th>
                  <th>涨价</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>富有弹性（&gt; 1）</td>
                  <td>TR 上升</td>
                  <td>TR 下降</td>
                </tr>
                <tr>
                  <td>单位弹性（= 1）</td>
                  <td>TR 不变</td>
                  <td>TR 不变</td>
                </tr>
                <tr>
                  <td>缺乏弹性（&lt; 1）</td>
                  <td>TR 下降</td>
                  <td>TR 上升</td>
                </tr>
              </tbody>
            </table>
            <PriceChange
              d={D_ELASTIC}
              tag="Relatively elastic (PED > 1)"
              revenue
              caption="图 8 需求富有弹性时降价：价格从 P₁ 降到 P₂，在原有销量上损失收益 A，因多卖的数量获得收益 B。B 大于 A，总收益上升。"
            />
            <PriceChange
              d={D_INELASTIC}
              tag="Relatively inelastic (PED < 1)"
              revenue
              caption="图 9 需求缺乏弹性时降价：损失 A 远大于增加的 B，总收益下降。反过来，涨价会使总收益上升。"
            />
            <Callout title="例题：PED、价格、数量与总收益的计算">
              <ul>
                <li>
                  <strong>求总收益变化：</strong>沿用上面的奶茶例子，涨价前 TR = 20 × 200 = 4000 元，涨价后 TR = 25 × 140 = 3500 元，TR 下降 500 元。这与 PED = 1.2（富有弹性）时涨价使 TR 下降一致。
                </li>
                <li>
                  <strong>求需求量变化：</strong>汽油的 PED = −0.4，价格上涨 10%。%ΔQd = PED × %ΔP = −0.4 × 10% = −4%。若原来每周卖出 50 000 升，现在约为 48 000 升。
                </li>
                <li>
                  <strong>求价格变化：</strong>某手机壳的 PED = −2，商家希望销量增加 10%。%ΔP = %ΔQd ÷ PED = 10% ÷ (−2) = −5%，即需降价 5%。
                </li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Total revenue (TR)">
              The total amount a firm receives from selling its output, equal to price times quantity sold: TR = P × Q. It also equals consumers&apos; total spending on the good.
            </Def>
            <p>
              A price change has two opposing effects on TR: each unit sells for more (or less), but fewer (or more) units are sold. Which effect wins depends on PED:
            </p>
            <table>
              <thead>
                <tr>
                  <th>PED</th>
                  <th>Price cut</th>
                  <th>Price rise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Elastic (&gt; 1)</td>
                  <td>TR rises</td>
                  <td>TR falls</td>
                </tr>
                <tr>
                  <td>Unitary (= 1)</td>
                  <td>TR unchanged</td>
                  <td>TR unchanged</td>
                </tr>
                <tr>
                  <td>Inelastic (&lt; 1)</td>
                  <td>TR falls</td>
                  <td>TR rises</td>
                </tr>
              </tbody>
            </table>
            <PriceChange
              d={D_ELASTIC}
              tag="Relatively elastic (PED > 1)"
              revenue
              caption="Figure 8 A price cut when demand is elastic: lowering price from P₁ to P₂ loses revenue A on existing sales but gains revenue B on the extra units sold. B is larger than A, so TR rises."
            />
            <PriceChange
              d={D_INELASTIC}
              tag="Relatively inelastic (PED < 1)"
              revenue
              caption="Figure 9 A price cut when demand is inelastic: the loss A is much larger than the gain B, so TR falls. Conversely, a price rise would increase TR."
            />
            <Callout title="Worked examples: PED, price, quantity and total revenue">
              <ul>
                <li>
                  <strong>Change in total revenue:</strong> in the bubble tea example, TR before = ¥20 × 200 = ¥4000 and TR after = ¥25 × 140 = ¥3500, a fall of ¥500. This is what we expect from a price rise when PED = 1.2 (elastic).
                </li>
                <li>
                  <strong>Change in quantity demanded:</strong> PED for petrol is −0.4 and its price rises by 10%. %ΔQd = PED × %ΔP = −0.4 × 10% = −4%. If 50,000 litres a week were sold before, about 48,000 litres are sold now.
                </li>
                <li>
                  <strong>Change in price:</strong> PED for a phone case is −2 and the seller wants sales to rise by 10%. %ΔP = %ΔQd ÷ PED = 10% ÷ (−2) = −5%, so the price must be cut by 5%.
                </li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "ped-importance",
      level: "both",
      title: { zh: "PED 对企业和政府决策的意义", en: "Importance of PED for firms and government decision making" },
      body: {
        zh: (
          <>
            <p>
              <strong>对企业：</strong>
            </p>
            <ul>
              <li>定价：需求缺乏弹性时可以涨价提高总收益（如独家药品、热门演唱会门票）；需求富有弹性时降价促销更有效（如电商平台上的同质商品）。</li>
              <li>价格歧视：对弹性小的群体收高价，对弹性大的群体（学生、老人）给折扣。</li>
              <li>成本转嫁：成本上升时，需求越缺乏弹性，企业越能把成本转嫁给消费者。</li>
              <li>企业也会通过品牌建设和广告减少「接近的替代品」，让需求变得更缺乏弹性。</li>
            </ul>
            <p>
              <strong>对政府：</strong>
            </p>
            <ul>
              <li>间接税收入：对需求缺乏弹性的商品（烟、酒、汽油）征税，销量下降不多，税收收入高且稳定。</li>
              <li>税负归宿（tax incidence）：需求越缺乏弹性，税负越多落在消费者身上（详见 2.7）。</li>
              <li>纠正市场失灵：对有害商品（demerit goods）征税时，如果需求非常缺乏弹性，消费量下降有限，政策达不到减少消费的目的，可能需要配合管制或教育。</li>
              <li>补贴、农业政策和贸易政策（如关税）的效果，也都取决于 PED。</li>
            </ul>
            <Callout title="评价（Evaluation）">
              <p>
                PED 的估计依赖历史数据，而且「其他条件不变」的假设现实中很少成立；PED 还会随时间和价格区间变化。企业和政府真正使用的往往是粗略估计，所以基于 PED 的决策存在不确定性。
              </p>
            </Callout>
            <HL>
              <p>
                <strong>为什么初级产品的 PED 通常低于制成品？</strong>
              </p>
              <ul>
                <li>许多初级产品（primary commodities，如粮食、能源、金属）是<strong>必需品</strong>，没有接近的替代品，例如小麦、大米、原油。</li>
                <li>它们常常是生产其他商品的<strong>投入品</strong>，在最终产品成本中所占比例较小，生产商短期内很难更换。</li>
                <li>制成品（manufactured products）有大量品牌和型号可以相互替代，而且很多属于非必需品，所以 PED 更高。</li>
              </ul>
              <p>后果：初级产品市场受到供给冲击（如天气）时，价格波动很大，依赖出口初级产品的国家收入不稳定（与 2.6 的低 PES 结合起来分析）。</p>
            </HL>
          </>
        ),
        en: (
          <>
            <p>
              <strong>For firms:</strong>
            </p>
            <ul>
              <li>Pricing: when demand is inelastic, raising price raises total revenue (e.g. patented medicines, popular concert tickets); when demand is elastic, price cuts and promotions work better (e.g. near-identical products on e-commerce platforms).</li>
              <li>Price discrimination: charge more to groups with inelastic demand and offer discounts to groups with elastic demand (students, pensioners).</li>
              <li>Passing on costs: the more inelastic demand is, the more of a cost increase a firm can pass on to consumers.</li>
              <li>Firms try to make demand less elastic through branding and advertising, which reduces the number of close substitutes.</li>
            </ul>
            <p>
              <strong>For governments:</strong>
            </p>
            <ul>
              <li>Tax revenue: indirect taxes on goods with inelastic demand (cigarettes, alcohol, petrol) reduce sales only slightly, so they raise large and stable revenue.</li>
              <li>Tax incidence: the more inelastic demand is, the more of the tax burden falls on consumers (see 2.7).</li>
              <li>Correcting market failure: if demand for a demerit good is very inelastic, a tax cuts consumption only a little and may fail to achieve its aim, so it may need to be combined with regulation or education.</li>
              <li>The effects of subsidies, agricultural policy and trade policy (e.g. tariffs) also depend on PED.</li>
            </ul>
            <Callout title="Evaluation">
              <p>
                PED estimates are based on past data, and the ceteris paribus assumption rarely holds in reality; PED also changes over time and across price ranges. Firms and governments usually work with rough estimates, so decisions based on PED carry uncertainty.
              </p>
            </Callout>
            <HL>
              <p>
                <strong>Why is PED for primary commodities generally lower than for manufactured products?</strong>
              </p>
              <ul>
                <li>Many primary commodities (food, energy, metals) are <strong>necessities</strong> with no close substitutes, e.g. wheat, rice and crude oil.</li>
                <li>They are often <strong>inputs</strong> into other products and form a small share of the final product&apos;s cost, and producers cannot easily switch to other inputs in the short run.</li>
                <li>Manufactured products come in many brands and models that substitute for each other, and many are non-essential, so their PED is higher.</li>
              </ul>
              <p>Consequence: supply shocks (e.g. bad weather) cause large price swings in commodity markets, making export earnings unstable for commodity-dependent countries (combine this with low PES in 2.6).</p>
            </HL>
          </>
        ),
      },
    },
    {
      id: "yed",
      level: "both",
      title: { zh: "需求的收入弹性（YED）", en: "Income elasticity of demand (YED)" },
      body: {
        zh: (
          <>
            <Def term="Income elasticity of demand (YED)">
              衡量需求对消费者收入变化的反应程度，等于需求量变化的百分比除以收入变化的百分比。
            </Def>
            <Formula>
              YED = <Frac n="需求量变化的百分比 %ΔQd" d="收入变化的百分比 %ΔY" />
            </Formula>
            <p>
              与 PED 不同，YED 的<strong>正负号很重要</strong>，不能取绝对值：
            </p>
            <table>
              <thead>
                <tr>
                  <th>YED</th>
                  <th>商品类型</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&gt; 1</td>
                  <td>正常品，收入富有弹性（income elastic）：奢侈品和服务（luxury goods and services）</td>
                  <td>出国旅游、高档餐厅、私人健身课</td>
                </tr>
                <tr>
                  <td>0 – 1</td>
                  <td>正常品，收入缺乏弹性（income inelastic）：必需品（necessities）</td>
                  <td>大米、电、牙膏</td>
                </tr>
                <tr>
                  <td>&lt; 0</td>
                  <td>劣等品（inferior goods）：收入上升，需求下降</td>
                  <td>常被引用的例子是方便面、二手衣物、长途大巴</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>恩格尔曲线</strong>（Engel curve）表示收入与某商品需求量之间的关系：纵轴是收入，横轴是需求量。一条曲线可以表现同一商品随收入上升依次经历三个阶段：
            </p>
            <EngelCurve caption="图 10 恩格尔曲线：收入较低时商品收入富有弹性（曲线比从原点出发的射线更平缓）；之后变为收入缺乏弹性的必需品（更陡）；收入足够高时曲线向后弯，商品变成劣等品。" />
            <Callout title="例题：YED 的计算">
              <ul>
                <li>
                  <strong>求 YED：</strong>家庭月收入从 10 000 元增加到 11 000 元（+10%）。每月去餐厅吃饭从 8 次增加到 10 次（+25%），YED = 25% ÷ 10% = 2.5，奢侈品。坐长途大巴从 10 次减少到 9 次（−10%），YED = −10% ÷ 10% = −1，劣等品。买米从 10 kg 增加到 10.5 kg（+5%），YED = 0.5，必需品。
                </li>
                <li>
                  <strong>求需求量变化：</strong>某商品 YED = 0.6，收入增长 5%，%ΔQd = 0.6 × 5% = +3%。
                </li>
                <li>
                  <strong>求收入变化：</strong>YED = 2，需求量增加了 10%，%ΔY = 10% ÷ 2 = +5%。
                </li>
              </ul>
            </Callout>
            <Callout title="考试提示">
              <p>YED 衡量的是需求曲线<strong>平移</strong>的幅度（收入是非价格决定因素），而 PED 衡量的是<strong>沿着</strong>需求曲线的移动。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Income elasticity of demand (YED)">
              A measure of the responsiveness of demand to a change in consumers&apos; income, calculated as the percentage change in quantity demanded divided by the percentage change in income.
            </Def>
            <Formula>
              YED = <Frac n="% change in quantity demanded" d="% change in income" />
            </Formula>
            <p>
              Unlike PED, the <strong>sign of YED matters</strong> and must not be dropped:
            </p>
            <table>
              <thead>
                <tr>
                  <th>YED</th>
                  <th>Type of good</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&gt; 1</td>
                  <td>Normal good, income elastic: luxury goods and services</td>
                  <td>Foreign holidays, fine dining, personal training</td>
                </tr>
                <tr>
                  <td>0 – 1</td>
                  <td>Normal good, income inelastic: necessities</td>
                  <td>Rice, electricity, toothpaste</td>
                </tr>
                <tr>
                  <td>&lt; 0</td>
                  <td>Inferior good: demand falls as income rises</td>
                  <td>Commonly cited examples are instant noodles, second-hand clothes and long-distance coaches</td>
                </tr>
              </tbody>
            </table>
            <p>
              The <strong>Engel curve</strong> shows the relationship between income and the quantity demanded of a good, with income on the vertical axis and quantity on the horizontal axis. One curve can show the same good passing through three stages as income rises:
            </p>
            <EngelCurve caption="Figure 10 An Engel curve: at low incomes the good is income elastic (the curve is flatter than a ray from the origin); it then becomes an income-inelastic necessity (steeper); at high incomes the curve bends backwards and the good becomes inferior." />
            <Callout title="Worked examples: YED calculations">
              <ul>
                <li>
                  <strong>Calculating YED:</strong> monthly household income rises from ¥10,000 to ¥11,000 (+10%). Restaurant meals rise from 8 to 10 a month (+25%), so YED = 25% ÷ 10% = 2.5, a luxury. Coach journeys fall from 10 to 9 (−10%), so YED = −10% ÷ 10% = −1, an inferior good. Rice bought rises from 10 kg to 10.5 kg (+5%), so YED = 0.5, a necessity.
                </li>
                <li>
                  <strong>Change in quantity demanded:</strong> YED = 0.6 and income rises by 5%, so %ΔQd = 0.6 × 5% = +3%.
                </li>
                <li>
                  <strong>Change in income:</strong> YED = 2 and quantity demanded has risen by 10%, so %ΔY = 10% ÷ 2 = +5%.
                </li>
              </ul>
            </Callout>
            <Callout title="Exam tip">
              <p>YED measures the size of a <strong>shift</strong> of the demand curve (income is a non-price determinant), whereas PED measures a movement <strong>along</strong> the curve.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "yed-importance",
      level: "hl",
      title: { zh: "YED 的意义：企业与经济部门结构", en: "Importance of YED: firms and the sectoral structure of the economy" },
      body: {
        zh: (
          <>
            <p>
              <strong>对企业：</strong>
            </p>
            <ul>
              <li>预测需求：经济增长、收入上升时，YED 高的商品（奢侈品、服务）需求增长最快；经济衰退时它们的需求下降也最多，而劣等品的需求反而上升。</li>
              <li>规划产能和投资：企业可以根据经济周期调整产品组合，例如在经济扩张期推出高端产品线，在衰退期推出平价产品。</li>
              <li>选择市场：收入快速增长的新兴市场对高 YED 商品更有吸引力。</li>
            </ul>
            <p>
              <strong>解释经济部门结构的变化：</strong>经济由第一产业（农业、采矿）、第二产业（制造业）和第三产业（服务业）组成。随着人均收入提高：
            </p>
            <ul>
              <li>食物等初级产品的 YED 低（必需品），对它们的需求增长慢于收入增长，第一产业在 GDP 和就业中的比重下降（恩格尔定律：收入越高，食物支出占比越低）。</li>
              <li>制成品的需求先快速增长，第二产业比重先上升。</li>
              <li>收入进一步提高后，教育、医疗、旅游、金融等服务的 YED 高，第三产业比重持续上升，成为最大的部门。</li>
            </ul>
            <Callout title="例子">
              <p>
                中国第三产业增加值在 2013 年超过第二产业，从 2015 年起占 GDP 的一半以上；同期农业在就业中的比重持续下降。这与收入上升后需求转向高 YED 的服务相一致。
              </p>
            </Callout>
            <Callout title="评价（Evaluation）">
              <p>
                部门结构的变化还受技术进步、生产率差异、全球化和政府产业政策的影响，YED 只是解释之一。另外，依赖低 YED 初级产品出口的国家，在世界收入增长时出口收入增长较慢，这也是发展经济学关注的问题（见第 4 单元）。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>For firms:</strong>
            </p>
            <ul>
              <li>Forecasting demand: when the economy grows and incomes rise, demand for high-YED goods (luxuries, services) grows fastest; in a recession their demand falls most, while demand for inferior goods rises.</li>
              <li>Planning capacity and investment: firms can adjust their product mix over the business cycle, e.g. launching premium lines in a boom and budget lines in a downturn.</li>
              <li>Choosing markets: fast-growing emerging economies are especially attractive for high-YED products.</li>
            </ul>
            <p>
              <strong>Explaining changes in the sectoral structure of the economy:</strong> an economy is made up of the primary sector (agriculture, mining), the secondary sector (manufacturing) and the tertiary sector (services). As income per person rises:
            </p>
            <ul>
              <li>Food and other primary products have low YED (necessities), so demand for them grows more slowly than income and the primary sector&apos;s share of GDP and employment falls (Engel&apos;s law: the richer a household, the smaller the share of income spent on food).</li>
              <li>Demand for manufactured goods grows quickly at first, so the secondary sector&apos;s share rises.</li>
              <li>At higher incomes, services such as education, healthcare, tourism and finance have high YED, so the tertiary sector&apos;s share keeps rising until it becomes the largest sector.</li>
            </ul>
            <Callout title="Real-world example">
              <p>
                China&apos;s tertiary sector overtook the secondary sector in value added in 2013 and has made up more than half of GDP since 2015, while agriculture&apos;s share of employment has kept falling. This fits a shift of demand towards high-YED services as incomes rise.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <p>
                Structural change is also driven by technology, differences in productivity growth, globalisation and industrial policy, so YED is only part of the explanation. Countries that rely on exporting low-YED primary products also see their export earnings grow slowly as world income rises, a key issue in development economics (see Unit 4).
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.5 Elasticities of demand",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 5.1 Price Elasticity of Demand and Price Elasticity of Supply",
      href: "https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply",
    },
    {
      label: "OpenStax Principles of Economics 3e — 5.3 Elasticity and Pricing",
      href: "https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing",
    },
    {
      label: "OpenStax Principles of Economics 3e — 5.4 Elasticity in Areas Other Than Price",
      href: "https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price",
    },
  ],
};

export default notes;
