import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, Region, atY, intersect, type Seg } from "@/components/notes/Chart";

const D: Seg = [
  [10, 90],
  [90, 10],
];
const S: Seg = [
  [10, 10],
  [90, 90],
];

function Equilibrium({ caption }: { caption: ReactNode }) {
  const e = intersect(D, S);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Line points={D} label="D" />
      <Line points={S} label="S" />
      <Guide at={e} x="Qe" y="Pe" />
      <Dot at={e} label="E" labelOffset={[10, 4]} />
    </Chart>
  );
}

function Disequilibrium({ caption }: { caption: ReactNode }) {
  const hi = 65;
  const lo = 35;
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Line points={D} label="D" />
      <Line points={S} label="S" />
      <Guide at={atY(D, hi)} x="Q₁" y="P₁" />
      <Guide at={atY(S, hi)} />
      <Guide at={atY(S, lo)} y="P₂" />
      <Guide at={atY(D, lo)} x="Q₂" />
      <Dot at={intersect(D, S)} label="E" labelOffset={[10, 4]} />
      <Label at={[50, 68]} anchor="middle">
        Excess supply
      </Label>
      <Label at={[50, 29]} anchor="middle">
        Excess demand
      </Label>
    </Chart>
  );
}

const D1: Seg = [
  [5, 85],
  [80, 10],
];
const D2: Seg = [
  [25, 85],
  [95, 15],
];
const S1: Seg = [
  [5, 5],
  [85, 85],
];
const S2: Seg = [
  [25, 5],
  [95, 75],
];

function DemandIncrease({ caption }: { caption: ReactNode }) {
  const e1 = intersect(D1, S1);
  const e2 = intersect(D2, S1);
  const short = atY(D2, e1[1]);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Line points={D1} label="D₁" />
      <Line points={D2} label="D₂" tone="alt" />
      <Line points={S1} label="S" />
      <Guide at={e1} x="Q₁" y="P₁" />
      <Guide at={e2} x="Q₂" y="P₂" />
      <Guide at={short} x="Q₃" />
      <Arrow from={[e1[0] + 2, e1[1] + 2]} to={[e2[0] - 1.5, e2[1] - 1.5]} />
      <Dot at={e1} label="E₁" labelOffset={[-6, -10]} />
      <Dot at={e2} label="E₂" labelOffset={[-6, -10]} />
      <Dot at={short} />
    </Chart>
  );
}

const DS: Seg = [
  [5, 85],
  [85, 5],
];

function SupplyIncrease({ caption }: { caption: ReactNode }) {
  const e1 = intersect(DS, S1);
  const e2 = intersect(DS, S2);
  const surplus = atY(S2, e1[1]);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Line points={DS} label="D" />
      <Line points={S1} label="S₁" />
      <Line points={S2} label="S₂" tone="alt" />
      <Guide at={e1} x="Q₁" y="P₁" />
      <Guide at={e2} x="Q₂" y="P₂" />
      <Guide at={surplus} x="Q₃" />
      <Arrow from={[e1[0] + 2, e1[1] - 2]} to={[e2[0] - 1.5, e2[1] + 1.5]} />
      <Dot at={e1} label="E₁" labelOffset={[-8, -12]} />
      <Dot at={e2} label="E₂" labelOffset={[10, 5]} />
      <Dot at={surplus} />
    </Chart>
  );
}

const DW: Seg = [
  [0, 90],
  [90, 0],
];
const SW: Seg = [
  [0, 20],
  [90, 87.5],
];

function Surplus({ caption, numbers = false }: { caption: ReactNode; numbers?: boolean }) {
  const e = intersect(DW, SW);
  return (
    <Chart x={numbers ? "Quantity (units)" : "Quantity"} y={numbers ? "Price ($)" : "Price"} caption={caption}>
      <Region points={[[0, 90], [0, e[1]], e]} fill="a" label="CS" />
      <Region points={[[0, e[1]], [0, 20], e]} fill="b" label="PS" />
      <Line points={DW} label="D = MB" />
      <Line points={SW} label="S = MC" />
      <Guide at={e} x={numbers ? "40" : "Qe"} y={numbers ? "10" : "Pe"} />
      {numbers && (
        <>
          <Label at={[-2.3, 88.4]} anchor="end">
            18
          </Label>
          <Label at={[-2.3, 18.4]} anchor="end">
            4
          </Label>
        </>
      )}
      <Dot at={e} label="E" labelOffset={[10, 4]} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "需求和供给相交形成市场均衡价格和数量。当需求或供给变化时，会先出现过剩或短缺，价格机制通过信号、激励和配给作用把市场推向新的均衡，从而配置资源。竞争市场均衡使消费者剩余与生产者剩余之和（社会剩余）最大，此时边际收益等于边际成本，实现配置效率。HL 还要能从图中计算消费者剩余和生产者剩余。",
    en: "Demand and supply together determine the equilibrium price and quantity. When demand or supply changes, a surplus or shortage appears and the price mechanism, through signalling, incentives and rationing, moves the market to a new equilibrium and so allocates resources. The competitive equilibrium maximises the sum of consumer and producer surplus (social surplus), where marginal benefit equals marginal cost: allocative efficiency. HL also calculates consumer and producer surplus from a diagram.",
  },
  sections: [
    {
      id: "equilibrium",
      level: "both",
      title: { zh: "市场均衡", en: "Market equilibrium" },
      body: {
        zh: (
          <>
            <Def term="Market equilibrium">
              需求量等于供给量时的状态，此时价格和数量没有变动的趋势。对应的价格叫均衡价格（Pe，也叫市场出清价格），数量叫均衡数量（Qe）。
            </Def>
            <Equilibrium caption="图 1 市场均衡：需求曲线 D 与供给曲线 S 相交于 E，决定均衡价格 Pe 和均衡数量 Qe。" />
            <p>如果价格不在均衡水平，就会出现不均衡（disequilibrium）：</p>
            <Def term="Excess supply (surplus)">
              价格高于均衡价格时，供给量大于需求量，多出的部分就是过剩。
            </Def>
            <Def term="Excess demand (shortage)">
              价格低于均衡价格时，需求量大于供给量，不足的部分就是短缺。
            </Def>
            <Disequilibrium caption="图 2 价格为 P₁ 时，供给量 Q₂ 大于需求量 Q₁，出现过剩，价格会被压低；价格为 P₂ 时，需求量 Q₂ 大于供给量 Q₁，出现短缺，价格会被抬高。两者都会回到均衡点 E。" />
            <p>
              <strong>过剩时</strong>，卖不掉的存货迫使企业降价；降价使需求量增加、供给量减少，直到过剩消失。<strong>短缺时</strong>，买不到商品的消费者愿意出更高的价，价格上升使需求量减少、供给量增加，直到短缺消失。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Market equilibrium">
              The situation where quantity demanded equals quantity supplied, so there is no tendency for price or quantity to change. The price is the equilibrium (market-clearing) price Pe and the quantity is the equilibrium quantity Qe.
            </Def>
            <Equilibrium caption="Figure 1 Market equilibrium: demand D and supply S intersect at E, giving the equilibrium price Pe and quantity Qe." />
            <p>At any other price the market is in disequilibrium:</p>
            <Def term="Excess supply (surplus)">
              When price is above equilibrium, quantity supplied exceeds quantity demanded; the difference is a surplus.
            </Def>
            <Def term="Excess demand (shortage)">
              When price is below equilibrium, quantity demanded exceeds quantity supplied; the difference is a shortage.
            </Def>
            <Disequilibrium caption="Figure 2 At P₁, quantity supplied Q₂ exceeds quantity demanded Q₁: a surplus that pushes price down. At P₂, quantity demanded Q₂ exceeds quantity supplied Q₁: a shortage that pushes price up. Both return the market to E." />
            <p>
              With a <strong>surplus</strong>, unsold stock forces firms to cut prices; the lower price raises quantity demanded and lowers quantity supplied until the surplus disappears. With a <strong>shortage</strong>, consumers who cannot buy the good bid the price up; the higher price lowers quantity demanded and raises quantity supplied until the shortage disappears.
            </p>
          </>
        ),
      },
    },
    {
      id: "changes",
      level: "both",
      title: { zh: "需求与供给变化带来新的均衡", en: "Shifts in demand and supply and the new equilibrium" },
      body: {
        zh: (
          <>
            <p>
              分析步骤：① 画出原来的均衡；② 判断哪条曲线移动、往哪个方向移；③ 指出在<strong>原价格</strong>下出现短缺还是过剩；④ 解释价格如何调整、得到新均衡；⑤ 比较新旧价格和数量。
            </p>
            <DemandIncrease caption="图 3 需求增加：D₁ 右移到 D₂。在原价格 P₁ 下，需求量为 Q₃，供给量仍为 Q₁，出现 Q₁Q₃ 的短缺。价格上升到 P₂，需求量减少、供给量沿 S 增加，新均衡在 E₂，数量为 Q₂。" />
            <SupplyIncrease caption="图 4 供给增加：S₁ 右移到 S₂。在原价格 P₁ 下，供给量为 Q₃，需求量仍为 Q₁，出现 Q₁Q₃ 的过剩。价格下降到 P₂，需求量沿 D 增加，新均衡在 E₂，数量为 Q₂。" />
            <table>
              <thead>
                <tr>
                  <th>变化</th>
                  <th>原价格下</th>
                  <th>均衡价格</th>
                  <th>均衡数量</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>需求增加</td><td>短缺</td><td>上升</td><td>增加</td></tr>
                <tr><td>需求减少</td><td>过剩</td><td>下降</td><td>减少</td></tr>
                <tr><td>供给增加</td><td>过剩</td><td>下降</td><td>增加</td></tr>
                <tr><td>供给减少</td><td>短缺</td><td>上升</td><td>减少</td></tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                如果需求和供给<strong>同时</strong>变化，其中一个变量的结果是确定的，另一个则取决于两条曲线移动的相对幅度。例如需求和供给同时增加：数量一定增加，价格可能升、降或不变。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              Method: (1) draw the original equilibrium; (2) decide which curve shifts and in which direction; (3) identify the shortage or surplus at the <strong>original price</strong>; (4) explain how price adjusts to the new equilibrium; (5) compare the old and new price and quantity.
            </p>
            <DemandIncrease caption="Figure 3 An increase in demand: D₁ shifts to D₂. At the original price P₁ quantity demanded is Q₃ but quantity supplied is still Q₁, a shortage of Q₁Q₃. Price rises to P₂, quantity demanded contracts and quantity supplied extends along S to the new equilibrium E₂ at Q₂." />
            <SupplyIncrease caption="Figure 4 An increase in supply: S₁ shifts to S₂. At the original price P₁ quantity supplied is Q₃ but quantity demanded is still Q₁, a surplus of Q₁Q₃. Price falls to P₂ and quantity demanded extends along D to the new equilibrium E₂ at Q₂." />
            <table>
              <thead>
                <tr>
                  <th>Change</th>
                  <th>At the original price</th>
                  <th>Equilibrium price</th>
                  <th>Equilibrium quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Demand increases</td><td>Shortage</td><td>Rises</td><td>Rises</td></tr>
                <tr><td>Demand decreases</td><td>Surplus</td><td>Falls</td><td>Falls</td></tr>
                <tr><td>Supply increases</td><td>Surplus</td><td>Falls</td><td>Rises</td></tr>
                <tr><td>Supply decreases</td><td>Shortage</td><td>Rises</td><td>Falls</td></tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                If demand and supply shift <strong>at the same time</strong>, the effect on one variable is certain and the effect on the other depends on the relative size of the shifts. If both increase, quantity definitely rises but price may rise, fall or stay the same.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "price-mechanism",
      level: "both",
      title: { zh: "价格机制的功能", en: "Functions of the price mechanism" },
      body: {
        zh: (
          <>
            <Def term="Price mechanism">
              在自由市场中，由需求和供给相互作用决定价格，价格变化再引导资源配置的过程。
            </Def>
            <table>
              <thead>
                <tr>
                  <th>功能</th>
                  <th>含义</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>信号 Signalling</td>
                  <td>价格变化向买卖双方传递信息：价格上涨说明该商品更稀缺或更受欢迎，价格下降则相反。</td>
                </tr>
                <tr>
                  <td>激励 Incentive</td>
                  <td>价格上涨提高了生产的利润，激励企业多生产、新企业进入；同时激励消费者少买或寻找替代品。</td>
                </tr>
                <tr>
                  <td>配给 Rationing</td>
                  <td>商品稀缺时，价格上涨使只有愿意且能够支付更高价格的人才能买到，从而在消费者之间分配有限的商品。</td>
                </tr>
                <tr>
                  <td>资源配置 Resource allocation</td>
                  <td>上述三者的结果：生产要素从需求下降的行业流向需求上升的行业，市场由此回答「生产什么、如何生产、为谁生产」。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                电动车需求快速增长 → 锂价格大涨（信号）→ 锂矿开采变得更有利可图，企业扩大开采和寻找新矿（激励）→ 高价使部分买家减少使用或改用钠电池等替代技术（配给）→ 资本和劳动力流向锂矿和电池行业（资源配置）。之后供给增加，锂价又大幅回落。
              </p>
            </Callout>
            <Callout title="评价（Evaluation）">
              <p>
                价格机制按「支付能力」配给，可能让低收入者买不到必需品（公平问题）；它也忽略外部性、无法提供公共物品，这就是市场失灵（2.7–2.10）。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Price mechanism">
              The process in a free market by which demand and supply determine prices, and changes in prices then guide the allocation of resources.
            </Def>
            <table>
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Signalling</td>
                  <td>Price changes send information to buyers and sellers: a rising price shows the good has become scarcer or more wanted, a falling price the opposite.</td>
                </tr>
                <tr>
                  <td>Incentive</td>
                  <td>A higher price makes production more profitable, encouraging firms to produce more and new firms to enter; it also encourages consumers to buy less or look for substitutes.</td>
                </tr>
                <tr>
                  <td>Rationing</td>
                  <td>When a good is scarce, a higher price means only those willing and able to pay more can buy it, so the limited supply is shared out among consumers.</td>
                </tr>
                <tr>
                  <td>Resource allocation</td>
                  <td>The result of the other three: factors of production move out of industries where demand is falling and into those where it is rising, so the market answers what, how and for whom to produce.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                Demand for electric vehicles surges, so the price of lithium soars (signal). Mining lithium becomes more profitable, so firms expand output and search for new deposits (incentive). The high price leads some buyers to economise or switch to alternatives such as sodium-ion batteries (rationing). Capital and labour flow into lithium and battery production (resource allocation). As supply then grew, lithium prices fell sharply again.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <p>
                The price mechanism rations by ability to pay, so low-income households may be priced out of necessities (an equity problem). It also ignores externalities and fails to provide public goods: these are market failures (2.7–2.10).
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "surplus",
      level: "both",
      title: {
        zh: "消费者剩余、生产者剩余与配置效率",
        en: "Consumer surplus, producer surplus and allocative efficiency",
      },
      body: {
        zh: (
          <>
            <Def term="Consumer surplus">
              消费者<strong>愿意支付</strong>的最高价格与<strong>实际支付</strong>的价格之差。图上是需求曲线以下、价格线以上的面积。
            </Def>
            <Def term="Producer surplus">
              生产者<strong>实际得到</strong>的价格与<strong>愿意接受</strong>的最低价格之差。图上是价格线以下、供给曲线以上的面积。
            </Def>
            <Def term="Social (community) surplus">
              消费者剩余与生产者剩余之和，衡量市场为社会创造的总福利。
            </Def>
            <p>
              需求曲线反映消费者从每多一单位得到的<strong>边际收益</strong>（marginal benefit, MB），供给曲线反映生产每多一单位的<strong>边际成本</strong>（marginal cost, MC）。
            </p>
            <Surplus caption="图 5 竞争市场均衡时的消费者剩余（CS）和生产者剩余（PS）：在 Qe 处 MB = MC，社会剩余（CS + PS）最大。" />
            <Def term="Allocative efficiency">
              资源的配置使社会最想要的商品按最合适的数量被生产出来，此时 MB = MC，社会剩余最大。
            </Def>
            <ul>
              <li>产量<strong>低于</strong> Qe：最后一单位的 MB &gt; MC，多生产能增加社会剩余，生产不足。</li>
              <li>产量<strong>高于</strong> Qe：MC &gt; MB，多出的单位让社会损失，生产过度。</li>
              <li>只有在 Qe，MB = MC，社会剩余最大，实现配置效率。</li>
            </ul>
            <Callout title="评价（Evaluation）">
              <p>
                这一结论的前提是：市场是竞争性的，且没有外部性、信息完全。如果存在外部性，私人的 MB、MC 与社会的不一致，市场均衡就不再有效率（见 2.8）。另外，剩余最大不代表分配公平。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Consumer surplus">
              The difference between the highest price consumers are <strong>willing to pay</strong> and the price they <strong>actually pay</strong>. On a diagram, the area below the demand curve and above the price.
            </Def>
            <Def term="Producer surplus">
              The difference between the price producers <strong>actually receive</strong> and the lowest price they are <strong>willing to accept</strong>. On a diagram, the area above the supply curve and below the price.
            </Def>
            <Def term="Social (community) surplus">
              The sum of consumer and producer surplus: the total welfare the market creates for society.
            </Def>
            <p>
              The demand curve shows the <strong>marginal benefit</strong> (MB) consumers get from each extra unit; the supply curve shows the <strong>marginal cost</strong> (MC) of producing each extra unit.
            </p>
            <Surplus caption="Figure 5 Consumer surplus (CS) and producer surplus (PS) at the competitive market equilibrium: at Qe, MB = MC and social surplus (CS + PS) is maximised." />
            <Def term="Allocative efficiency">
              Resources are allocated so that the goods society wants most are produced in the right quantities: MB = MC and social surplus is maximised.
            </Def>
            <ul>
              <li>Output <strong>below</strong> Qe: for the last unit MB &gt; MC, so producing more would add to social surplus; there is underproduction.</li>
              <li>Output <strong>above</strong> Qe: MC &gt; MB, so the extra units reduce welfare; there is overproduction.</li>
              <li>Only at Qe does MB = MC, maximising social surplus: allocative efficiency.</li>
            </ul>
            <Callout title="Evaluation">
              <p>
                This holds only if the market is competitive, there are no externalities and information is perfect. With externalities, private MB and MC differ from social MB and MC, and the market equilibrium is no longer efficient (see 2.8). Maximum surplus also says nothing about whether the distribution is fair.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "surplus-calculation",
      level: "hl",
      title: { zh: "从图中计算消费者剩余与生产者剩余", en: "Calculating consumer and producer surplus from a diagram" },
      body: {
        zh: (
          <>
            <p>需求和供给是直线时，CS 和 PS 都是三角形，用三角形面积公式计算：</p>
            <Formula>面积 = ½ × 底 × 高</Formula>
            <Surplus
              numbers
              caption="图 6 需求曲线在纵轴上的截距为 $18，供给曲线的截距为 $4，均衡价格为 $10，均衡数量为 40 单位。"
            />
            <Callout title="例题">
              <p><strong>消费者剩余：</strong>底 = 均衡数量 40；高 = 需求截距 − 均衡价格 = 18 − 10 = $8。</p>
              <p>CS = ½ × 40 × 8 = <strong>$160</strong></p>
              <p><strong>生产者剩余：</strong>底 = 40；高 = 均衡价格 − 供给截距 = 10 − 4 = $6。</p>
              <p>PS = ½ × 40 × 6 = <strong>$120</strong></p>
              <p><strong>社会剩余</strong> = 160 + 120 = <strong>$280</strong></p>
            </Callout>
            <Callout title="考试提示">
              <ul>
                <li>底永远是横轴上的数量，高永远是纵轴上的价格差，不要把两者弄反。</li>
                <li>写出公式和单位（$），即使最后算错也能拿到过程分。</li>
                <li>如果面积是梯形或由几个图形组成（例如征税后），把它拆成长方形和三角形分别计算再相加（见 2.7）。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>When demand and supply are straight lines, CS and PS are triangles, so use the area of a triangle:</p>
            <Formula>Area = ½ × base × height</Formula>
            <Surplus
              numbers
              caption="Figure 6 The demand curve meets the price axis at $18 and the supply curve at $4; the equilibrium price is $10 and the equilibrium quantity is 40 units."
            />
            <Callout title="Worked example">
              <p><strong>Consumer surplus:</strong> base = equilibrium quantity 40; height = demand intercept − equilibrium price = 18 − 10 = $8.</p>
              <p>CS = ½ × 40 × 8 = <strong>$160</strong></p>
              <p><strong>Producer surplus:</strong> base = 40; height = equilibrium price − supply intercept = 10 − 4 = $6.</p>
              <p>PS = ½ × 40 × 6 = <strong>$120</strong></p>
              <p><strong>Social surplus</strong> = 160 + 120 = <strong>$280</strong></p>
            </Callout>
            <Callout title="Exam tip">
              <ul>
                <li>The base is always a quantity on the horizontal axis and the height a price difference on the vertical axis; do not mix them up.</li>
                <li>Show the formula and units ($): method marks are available even if the final answer is wrong.</li>
                <li>If the area is a trapezium or a combination of shapes (e.g. after a tax), split it into rectangles and triangles and add them (see 2.7).</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.3 Competitive market equilibrium",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 3.3 Changes in Equilibrium Price and Quantity: The Four-Step Process",
      href: "https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process",
    },
    {
      label: "OpenStax Principles of Economics 3e — 3.5 Demand, Supply, and Efficiency",
      href: "https://openstax.org/books/principles-economics-3e/pages/3-5-demand-supply-and-efficiency",
    },
    {
      label: "tutor2u — Functions of the price mechanism",
      href: "https://www.tutor2u.net/economics/reference/functions-of-the-price-mechanism",
    },
  ],
};

export default notes;
