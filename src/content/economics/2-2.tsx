import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Line, atY, shift, type Seg } from "@/components/notes/Chart";

const S: Seg = [
  [10, 10],
  [90, 90],
];

function SupplyCurve({ caption }: { caption: ReactNode }) {
  const a = atY(S, 35);
  const b = atY(S, 65);
  return (
    <Chart x="Quantity supplied" y="Price" caption={caption}>
      <Line points={S} label="S" />
      <Guide at={a} x="Q₁" y="P₁" />
      <Guide at={b} x="Q₂" y="P₂" />
      <Dot at={a} label="A" />
      <Dot at={b} label="B" />
    </Chart>
  );
}

function Movement({ caption }: { caption: ReactNode }) {
  const a = atY(S, 35);
  const b = atY(S, 65);
  return (
    <Chart x="Quantity supplied" y="Price" caption={caption}>
      <Line points={S} label="S" />
      <Guide at={a} x="Q₁" y="P₁" />
      <Guide at={b} x="Q₂" y="P₂" />
      <Arrow from={[a[0] - 1, a[1] + 6]} to={[b[0] - 6, b[1] + 1]} />
      <Dot at={a} label="A" labelOffset={[8, 10]} />
      <Dot at={b} label="B" labelOffset={[8, 10]} />
    </Chart>
  );
}

const S1: Seg = [
  [5, 15],
  [68, 85],
];
const S2 = shift(S1, 22);

function Shift({ caption }: { caption: ReactNode }) {
  const p = 50;
  const a = atY(S1, p);
  const b = atY(S2, p);
  return (
    <Chart x="Quantity supplied" y="Price" caption={caption}>
      <Line points={S1} label="S₁" />
      <Line points={S2} label="S₂" tone="alt" />
      <Guide at={a} x="Q₁" y="P₁" />
      <Guide at={b} x="Q₂" />
      <Arrow from={[a[0] + 6.5, p + 4]} to={[b[0] + 1, p + 4]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

const SA: Seg = [
  [0, 20],
  [32.5, 85],
];
const SB: Seg = [
  [0, 20],
  [54.17, 85],
];
const SM: Seg = [
  [0, 20],
  [86.67, 85],
];

function MarketSupply({ caption }: { caption: ReactNode }) {
  const p = 50;
  return (
    <Chart x="Quantity supplied" y="Price" caption={caption}>
      <Line points={SA} tone="muted" label="sA" />
      <Line points={SB} tone="alt" label="sB" />
      <Line points={SM} label="S" />
      <Guide at={atY(SM, p)} x="40" y="P₁" />
      <Guide at={atY(SB, p)} x="25" />
      <Guide at={atY(SA, p)} x="15" />
      <Dot at={atY(SA, p)} />
      <Dot at={atY(SB, p)} />
      <Dot at={atY(SM, p)} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "供给是生产者在各个价格下愿意且能够出售的数量。本节讲供给定律、向上倾斜的供给曲线、个别供给与市场供给、六个非价格决定因素，以及「沿曲线移动」与「曲线平移」的区别。HL 还要用边际收益递减和边际成本递增来解释供给定律。",
    en: "Supply is the quantity producers are willing and able to sell at each price. This topic covers the law of supply, the upward-sloping supply curve, individual vs market supply, the six non-price determinants, and the difference between a movement along and a shift of the curve. HL also explains the law of supply using diminishing marginal returns and increasing marginal costs.",
  },
  sections: [
    {
      id: "law-of-supply",
      level: "both",
      title: { zh: "供给与供给定律", en: "Supply and the law of supply" },
      body: {
        zh: (
          <>
            <Def term="Supply">
              在一定时期内、其他条件不变时，生产者在各个可能价格下<strong>愿意并且能够</strong>出售的某商品数量。
            </Def>
            <Def term="Law of supply">
              其他条件不变时，商品价格与供给量呈<strong>正向关系</strong>：价格上升，供给量增加；价格下降，供给量减少。
            </Def>
            <p>
              直观理解：价格越高，生产和销售这种商品就越有利可图，现有企业愿意多生产，也能负担更高的生产成本。同样要区分 <strong>supply（供给）</strong>，即整条曲线所代表的关系，和 <strong>quantity supplied（供给量）</strong>，即某一个价格下的具体数量。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Supply">
              The quantities of a good that producers are <strong>willing and able</strong> to sell at different possible prices over a given time period, ceteris paribus.
            </Def>
            <Def term="Law of supply">
              Ceteris paribus, there is a <strong>positive relationship</strong> between the price of a good and the quantity supplied: as price rises, quantity supplied rises, and vice versa.
            </Def>
            <p>
              Intuitively, a higher price makes producing and selling the good more profitable, so firms want to produce more and can cover higher production costs. Again, keep <strong>supply</strong> (the whole relationship, i.e. the curve) separate from <strong>quantity supplied</strong> (the amount at one particular price).
            </p>
          </>
        ),
      },
    },
    {
      id: "supply-curve",
      level: "both",
      title: { zh: "供给曲线", en: "The supply curve" },
      body: {
        zh: (
          <>
            <p>
              供给曲线把供给定律画成图：纵轴是价格（Price），横轴是供给量（Quantity supplied），曲线<strong>向右上方倾斜</strong>。
            </p>
            <SupplyCurve caption="图 1 向上倾斜的供给曲线：价格从 P₁ 升到 P₂，供给量从 Q₁ 增加到 Q₂（A 点到 B 点）。" />
            <Callout title="画图要点">
              <ul>
                <li>坐标轴标注 Price 和 Quantity，原点标 0；曲线标 S。</li>
                <li>供给曲线通常从纵轴上方或原点附近开始向右上方画，IB 中画成直线即可。</li>
                <li>用虚线把点连到两轴，标出 P₁、Q₁，并在文字中解释。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              The supply curve plots the law of supply: price on the vertical axis, quantity supplied on the horizontal axis. It <strong>slopes upwards</strong>.
            </p>
            <SupplyCurve caption="Figure 1 An upward-sloping supply curve: a rise in price from P₁ to P₂ raises quantity supplied from Q₁ to Q₂ (point A to point B)." />
            <Callout title="Drawing checklist">
              <ul>
                <li>Label the axes Price and Quantity, mark the origin 0, and label the curve S.</li>
                <li>Draw the curve upwards to the right; a straight line is fine in IB answers.</li>
                <li>Use dashed lines to link points to both axes, mark P₁ and Q₁, and explain in words.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "market-supply",
      level: "both",
      title: { zh: "个别供给与市场供给", en: "Individual and market supply" },
      body: {
        zh: (
          <>
            <Def term="Market supply">
              市场中所有生产者在每个价格下供给量的总和。
            </Def>
            <p>
              和市场需求一样，市场供给用<strong>横向加总</strong>得到：固定一个价格，把每家企业在这个价格下的供给量加起来。价格为 P₁ 时，企业 A 供给 15 单位，企业 B 供给 25 单位，市场供给量就是 40 单位。
            </p>
            <MarketSupply caption="图 2 市场供给是个别供给的横向加总：价格为 P₁ 时，15 + 25 = 40。" />
          </>
        ),
        en: (
          <>
            <Def term="Market supply">
              The sum of the quantities supplied by all producers in the market at each price.
            </Def>
            <p>
              As with demand, market supply is found by <strong>horizontal summation</strong>: hold the price constant and add up what each firm would supply. At P₁, firm A supplies 15 units and firm B supplies 25, so market quantity supplied is 40.
            </p>
            <MarketSupply caption="Figure 2 Market supply is the horizontal sum of individual supply: at P₁, 15 + 25 = 40." />
          </>
        ),
      },
    },
    {
      id: "determinants",
      level: "both",
      title: { zh: "供给的非价格决定因素", en: "Non-price determinants of supply" },
      body: {
        zh: (
          <>
            <p>价格以外的因素变化，会改变每个价格下的供给量，使整条供给曲线平移。IB 指定六个因素：</p>
            <table>
              <thead>
                <tr>
                  <th>因素</th>
                  <th>对供给的影响</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>生产要素成本 Costs of factors of production</td>
                  <td>工资、原材料、能源、租金上涨 → 成本上升 → 供给减少（左移）。例如 2022 年能源价格飙升，化肥等高耗能产品供给减少。</td>
                </tr>
                <tr>
                  <td>相关商品价格 Prices of related goods</td>
                  <td>
                    <strong>联合供给</strong>（joint supply）：两种商品由同一过程产出，如牛肉和牛皮。牛肉涨价 → 多养牛 → 牛皮供给增加。
                    <br />
                    <strong>竞争供给</strong>（competitive supply）：用同样的资源可以生产其中一种，如农地种小麦或玉米。玉米涨价 → 农民改种玉米 → 小麦供给减少。
                  </td>
                </tr>
                <tr>
                  <td>间接税与补贴 Indirect taxes and subsidies</td>
                  <td>间接税相当于增加生产成本 → 供给减少（左移 / 上移）；补贴降低成本 → 供给增加（右移 / 下移）。</td>
                </tr>
                <tr>
                  <td>未来价格预期 Future price expectations</td>
                  <td>预期未来价格上涨，生产者可能囤货、推迟出售 → 当前供给减少。</td>
                </tr>
                <tr>
                  <td>技术变化 Changes in technology</td>
                  <td>新技术提高生产率、降低单位成本 → 供给增加。例如自动化生产线、太阳能电池板制造技术进步。</td>
                </tr>
                <tr>
                  <td>企业数量 Number of firms</td>
                  <td>更多企业进入市场 → 供给增加；企业倒闭或退出 → 供给减少。</td>
                </tr>
              </tbody>
            </table>
            <p>
              此外，天气、自然灾害等「冲击」（supply shocks）对农产品供给影响很大，例如干旱导致咖啡减产，可以作为补充例子。
            </p>
          </>
        ),
        en: (
          <>
            <p>A change in anything other than the good&apos;s own price changes the quantity supplied at every price, so the whole curve shifts. The IB lists six determinants:</p>
            <table>
              <thead>
                <tr>
                  <th>Determinant</th>
                  <th>Effect on supply</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Costs of factors of production</td>
                  <td>Higher wages, raw material, energy or rent costs raise production costs and decrease supply (shift left). E.g. the 2022 energy price spike cut the supply of energy-intensive goods such as fertiliser.</td>
                </tr>
                <tr>
                  <td>Prices of related goods</td>
                  <td>
                    <strong>Joint supply</strong>: two goods come from the same process, e.g. beef and leather. A higher beef price means more cattle are raised, so the supply of leather increases.
                    <br />
                    <strong>Competitive supply</strong>: the same resources can produce one good or the other, e.g. farmland for wheat or maize. A higher maize price leads farmers to switch, so the supply of wheat decreases.
                  </td>
                </tr>
                <tr>
                  <td>Indirect taxes and subsidies</td>
                  <td>An indirect tax acts like a higher cost and decreases supply (shift left / up); a subsidy lowers costs and increases supply (shift right / down).</td>
                </tr>
                <tr>
                  <td>Future price expectations</td>
                  <td>If producers expect prices to rise, they may hold back stock to sell later, so current supply decreases.</td>
                </tr>
                <tr>
                  <td>Changes in technology</td>
                  <td>New technology raises productivity and lowers unit costs, so supply increases, e.g. automated production lines or cheaper solar panel manufacturing.</td>
                </tr>
                <tr>
                  <td>Number of firms</td>
                  <td>More firms entering the market increase supply; firms closing or leaving decrease it.</td>
                </tr>
              </tbody>
            </table>
            <p>
              Supply shocks such as weather and natural disasters also matter, especially for agricultural goods: a drought that cuts the coffee harvest is a useful extra example.
            </p>
          </>
        ),
      },
    },
    {
      id: "movement-vs-shift",
      level: "both",
      title: { zh: "沿曲线移动 vs 曲线平移", en: "Movements along vs shifts of the supply curve" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>沿曲线移动 Movement</th>
                  <th>曲线平移 Shift</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>原因</td>
                  <td>本商品价格变化</td>
                  <td>任一非价格决定因素变化</td>
                </tr>
                <tr>
                  <td>术语</td>
                  <td>供给量的增加 / 减少（change in quantity supplied）</td>
                  <td>供给的增加 / 减少（change in supply）</td>
                </tr>
                <tr>
                  <td>图上</td>
                  <td>同一条 S 上从一点移到另一点</td>
                  <td>S₁ 移到 S₂；右移为增加，左移为减少</td>
                </tr>
              </tbody>
            </table>
            <Movement caption="图 3 沿曲线移动：价格从 P₁ 升到 P₂，供给量从 Q₁ 增加到 Q₂（供给量增加）。" />
            <Shift caption="图 4 曲线平移：例如技术进步，价格仍为 P₁ 时，供给量从 Q₁ 增加到 Q₂，S₁ 右移到 S₂（供给增加）。" />
            <Callout title="考试提示">
              <p>
                供给减少是曲线<strong>向左</strong>移（也可以理解为向上移：每个产量都需要更高的价格）。学生常把「向上」误认为「增加」，要特别小心。
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
                  <th>Movement along</th>
                  <th>Shift of the curve</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cause</td>
                  <td>A change in the good&apos;s own price</td>
                  <td>A change in any non-price determinant</td>
                </tr>
                <tr>
                  <td>Wording</td>
                  <td>Increase / decrease in <strong>quantity supplied</strong></td>
                  <td>Increase / decrease in <strong>supply</strong></td>
                </tr>
                <tr>
                  <td>On the diagram</td>
                  <td>From one point to another on the same S</td>
                  <td>S₁ to S₂: right is an increase, left is a decrease</td>
                </tr>
              </tbody>
            </table>
            <Movement caption="Figure 3 Movement along the curve: a rise in price from P₁ to P₂ raises quantity supplied from Q₁ to Q₂ (an increase in quantity supplied)." />
            <Shift caption="Figure 4 Shift of the curve: e.g. better technology. At the same price P₁, quantity supplied rises from Q₁ to Q₂ as S₁ shifts to S₂ (an increase in supply)." />
            <Callout title="Exam tip">
              <p>
                A decrease in supply is a shift to the <strong>left</strong> (which also looks like a shift up: every quantity now needs a higher price). Students often read up as an increase, so take care.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "assumptions",
      level: "hl",
      title: {
        zh: "供给定律背后的假设：边际收益递减与边际成本递增",
        en: "Assumptions behind the law of supply: diminishing marginal returns and increasing marginal costs",
      },
      body: {
        zh: (
          <>
            <p>
              为什么价格更高，企业才愿意多生产？这要从<strong>短期</strong>（short run）生产说起：短期内至少有一种生产要素是固定的（例如厂房、机器），企业只能通过增加可变要素（例如工人）来扩大产量。
            </p>
            <Def term="Law of diminishing marginal returns">
              在短期内，当越来越多的可变要素被投入到固定要素上时，每增加一单位可变要素所带来的额外产量（边际产量，marginal product）最终会下降。
            </Def>
            <Def term="Marginal cost (MC)">
              多生产一单位产品所增加的总成本。
            </Def>
            <p>
              因为每个新工人带来的额外产量越来越少，而工资不变，所以每多生产一单位产品所需的成本越来越高，这就是<strong>边际成本递增</strong>（increasing marginal costs）。
            </p>
            <Formula>
              MC = <Frac n="工资（每名工人）" d="边际产量 MP" />
            </Formula>
            <table>
              <thead>
                <tr>
                  <th>工人数</th>
                  <th>总产量 TP</th>
                  <th>边际产量 MP</th>
                  <th>边际成本 MC（工资 $60）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>20</td><td>20</td><td>60 ÷ 20 = $3</td></tr>
                <tr><td>2</td><td>35</td><td>15</td><td>60 ÷ 15 = $4</td></tr>
                <tr><td>3</td><td>47</td><td>12</td><td>60 ÷ 12 = $5</td></tr>
                <tr><td>4</td><td>57</td><td>10</td><td>60 ÷ 10 = $6</td></tr>
                <tr><td>5</td><td>63</td><td>6</td><td>60 ÷ 6 = $10</td></tr>
              </tbody>
            </table>
            <p>
              例子：一家面包店只有一个烤炉（固定要素）。第 1 名工人每天多做 20 个面包，到第 5 名时只多做 6 个，因为大家要排队用烤炉。生产第 60 个左右面包的边际成本（$10）远高于前 20 个（$3）。企业只有在价格<strong>足以弥补更高的边际成本</strong>时才会多生产，所以价格上升，供给量增加，供给曲线向上倾斜。
            </p>
            <Callout title="评价（Evaluation）">
              <p>
                现实中，雇佣最初几名工人时，分工可能让边际产量先上升，边际收益递减是「最终」才出现的。长期内所有要素都可变，企业可以扩建厂房，供给可能变得很有弹性（见 2.6）。在完全竞争中，企业的供给曲线就是其边际成本曲线的一部分（见 2.11）。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              Why will firms produce more only at a higher price? The answer lies in <strong>short-run</strong> production: at least one factor is fixed (e.g. premises, machinery), so the firm can raise output only by adding more of a variable factor (e.g. workers).
            </p>
            <Def term="Law of diminishing marginal returns">
              In the short run, as more units of a variable factor are added to a fixed factor, the extra output from each additional unit of the variable factor (its marginal product) eventually falls.
            </Def>
            <Def term="Marginal cost (MC)">
              The increase in total cost from producing one more unit of output.
            </Def>
            <p>
              Because each extra worker adds less output while the wage stays the same, each extra unit of output costs more to produce: <strong>marginal costs increase</strong>.
            </p>
            <Formula>
              MC = <Frac n="wage per worker" d="marginal product (MP)" />
            </Formula>
            <table>
              <thead>
                <tr>
                  <th>Workers</th>
                  <th>Total product (TP)</th>
                  <th>Marginal product (MP)</th>
                  <th>Marginal cost (wage $60)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>20</td><td>20</td><td>60 ÷ 20 = $3</td></tr>
                <tr><td>2</td><td>35</td><td>15</td><td>60 ÷ 15 = $4</td></tr>
                <tr><td>3</td><td>47</td><td>12</td><td>60 ÷ 12 = $5</td></tr>
                <tr><td>4</td><td>57</td><td>10</td><td>60 ÷ 10 = $6</td></tr>
                <tr><td>5</td><td>63</td><td>6</td><td>60 ÷ 6 = $10</td></tr>
              </tbody>
            </table>
            <p>
              Example: a bakery has one oven (the fixed factor). The first worker adds 20 loaves a day, but the fifth adds only 6, because staff must queue for the oven. The marginal cost of loaves around the 60th ($10) is far above that of the first 20 ($3). The firm will produce more only if the price is <strong>high enough to cover the higher marginal cost</strong>, so a higher price brings a greater quantity supplied and the supply curve slopes upwards.
            </p>
            <Callout title="Evaluation">
              <p>
                In practice, the first few workers may raise marginal product through specialisation, so diminishing returns set in only eventually. In the long run all factors are variable and firms can expand capacity, so supply can become very elastic (see 2.6). Under perfect competition, the firm&apos;s supply curve is part of its marginal cost curve (see 2.11).
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.2 Supply",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 3.2 Shifts in Demand and Supply for Goods and Services",
      href: "https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services",
    },
    {
      label: "OpenStax Principles of Economics 3e — 7.2 Production in the Short Run",
      href: "https://openstax.org/books/principles-economics-3e/pages/7-2-production-in-the-short-run",
    },
  ],
};

export default notes;
