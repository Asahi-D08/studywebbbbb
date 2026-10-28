import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, atY, shift, type Seg } from "@/components/notes/Chart";

const D: Seg = [
  [10, 90],
  [90, 10],
];

function DemandCurve({ caption }: { caption: ReactNode }) {
  const a = atY(D, 65);
  const b = atY(D, 35);
  return (
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      <Line points={D} label="D" />
      <Guide at={a} x="Q₁" y="P₁" />
      <Guide at={b} x="Q₂" y="P₂" />
      <Dot at={a} label="A" />
      <Dot at={b} label="B" />
    </Chart>
  );
}

function Movement({ caption }: { caption: ReactNode }) {
  const a = atY(D, 65);
  const b = atY(D, 35);
  return (
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      <Line points={D} label="D" />
      <Guide at={a} x="Q₁" y="P₁" />
      <Guide at={b} x="Q₂" y="P₂" />
      <Arrow from={[a[0] + 3, a[1] - 3]} to={[b[0] - 1, b[1] + 1]} />
      <Dot at={a} label="A" />
      <Dot at={b} label="B" />
    </Chart>
  );
}

const D1: Seg = [
  [8, 85],
  [68, 15],
];
const D2 = shift(D1, 22);

function Shift({ caption }: { caption: ReactNode }) {
  const p = 50;
  const a = atY(D1, p);
  const b = atY(D2, p);
  return (
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      <Line points={D1} label="D₁" />
      <Line points={D2} label="D₂" tone="alt" />
      <Guide at={a} x="Q₁" y="P₁" />
      <Guide at={b} x="Q₂" />
      <Arrow from={[a[0] + 3, p + 4]} to={[b[0] - 3, p + 4]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

function MarketDemand({ caption }: { caption: ReactNode }) {
  const p = 40;
  return (
    <Chart x="Quantity demanded" y="Price" caption={caption}>
      <Line
        points={[
          [0, 80],
          [30, 0],
        ]}
        tone="muted"
      />
      <Line
        points={[
          [0, 80],
          [50, 0],
        ]}
        tone="alt"
      />
      <Line
        points={[
          [0, 80],
          [80, 0],
        ]}
      />
      <Label at={[31, 5]}>dA</Label>
      <Label at={[51, 5]}>dB</Label>
      <Label at={[81, 5]}>D (market)</Label>
      <Guide at={[40, p]} x="40" y="P₁" />
      <Guide at={[25, p]} x="25" />
      <Guide at={[15, p]} x="15" />
      <Dot at={[15, p]} />
      <Dot at={[25, p]} />
      <Dot at={[40, p]} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "需求描述消费者在各个价格下愿意且能够购买的数量。本节讲需求定律、需求曲线、个人与市场需求、非价格决定因素，以及「沿曲线移动」与「曲线平移」的区别。HL 还要解释需求定律背后的假设：收入效应、替代效应和边际效用递减。",
    en: "Demand is the quantity consumers are willing and able to buy at each price. This topic covers the law of demand, the demand curve, individual vs market demand, the non-price determinants, and the difference between a movement along and a shift of the curve. HL also explains the assumptions behind the law: the income and substitution effects and diminishing marginal utility.",
  },
  sections: [
    {
      id: "law-of-demand",
      level: "both",
      title: { zh: "需求与需求定律", en: "Demand and the law of demand" },
      body: {
        zh: (
          <>
            <Def term="Demand">
              在一定时期内、其他条件不变（ceteris paribus）时，消费者在各个可能价格下<strong>愿意并且能够</strong>购买的某商品数量。
            </Def>
            <p>
              「愿意」和「能够」缺一不可：想买但买不起不算需求（这叫 want），买得起但不想买也不算。
            </p>
            <Def term="Law of demand">
              其他条件不变时，商品价格与需求量呈<strong>反向关系</strong>：价格上升，需求量下降；价格下降，需求量上升。
            </Def>
            <p>
              注意区分 <strong>demand（需求）</strong> 和 <strong>quantity demanded（需求量）</strong>：前者是整条曲线所代表的关系，后者是某一个价格下对应的具体数量。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Demand">
              The quantities of a good that consumers are <strong>willing and able</strong> to buy at different possible prices over a given time period, ceteris paribus.
            </Def>
            <p>
              Both conditions matter: wanting a good you cannot afford is not demand, and nor is being able to afford a good you do not want.
            </p>
            <Def term="Law of demand">
              Ceteris paribus, there is an <strong>inverse relationship</strong> between the price of a good and the quantity demanded: as price rises, quantity demanded falls, and vice versa.
            </Def>
            <p>
              Keep <strong>demand</strong> (the whole relationship, i.e. the curve) separate from <strong>quantity demanded</strong> (the amount at one particular price).
            </p>
          </>
        ),
      },
    },
    {
      id: "demand-curve",
      level: "both",
      title: { zh: "需求曲线", en: "The demand curve" },
      body: {
        zh: (
          <>
            <p>
              需求曲线把需求定律画成图：纵轴是价格（Price），横轴是需求量（Quantity demanded），曲线<strong>向右下方倾斜</strong>。IB 考试里通常画成直线即可。
            </p>
            <DemandCurve caption="图 1 向下倾斜的需求曲线：价格从 P₁ 降到 P₂，需求量从 Q₁ 增加到 Q₂（A 点到 B 点）。" />
            <Callout title="画图要点">
              <ul>
                <li>两条坐标轴都要标注：纵轴 Price（P），横轴 Quantity（Q），原点标 0。</li>
                <li>曲线要标 D；涉及具体点时，用虚线连到两轴并标 P₁、Q₁。</li>
                <li>考试中图要配文字解释，只画图不解释拿不到满分。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              The demand curve plots the law of demand: price on the vertical axis, quantity demanded on the horizontal axis. It <strong>slopes downwards</strong>. In IB answers a straight line is fine.
            </p>
            <DemandCurve caption="Figure 1 A downward-sloping demand curve: a fall in price from P₁ to P₂ raises quantity demanded from Q₁ to Q₂ (point A to point B)." />
            <Callout title="Drawing checklist">
              <ul>
                <li>Label both axes: Price (P) on the vertical, Quantity (Q) on the horizontal, and the origin 0.</li>
                <li>Label the curve D; for specific points, draw dashed lines to both axes and mark P₁, Q₁.</li>
                <li>Always explain the diagram in words; a diagram on its own does not earn full marks.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "market-demand",
      level: "both",
      title: { zh: "个人需求与市场需求", en: "Individual and market demand" },
      body: {
        zh: (
          <>
            <Def term="Market demand">
              市场中所有消费者在每个价格下需求量的总和。
            </Def>
            <p>
              做法是<strong>横向加总</strong>：固定一个价格，把每个人在这个价格下的需求量加起来。比如价格为 P₁ 时，A 买 15 个，B 买 25 个，市场需求量就是 40 个。对每个价格都这样加，就得到市场需求曲线。它比任何一个人的需求曲线都更平缓、更靠右。
            </p>
            <MarketDemand caption="图 2 市场需求是个人需求的横向加总：价格为 P₁ 时，15 + 25 = 40。" />
          </>
        ),
        en: (
          <>
            <Def term="Market demand">
              The sum of the quantities demanded by all consumers in the market at each price.
            </Def>
            <p>
              Market demand is found by <strong>horizontal summation</strong>: hold the price constant and add up what each consumer would buy. At P₁, consumer A buys 15 and consumer B buys 25, so market quantity demanded is 40. Repeating this at every price gives the market demand curve, which lies further right than any individual curve.
            </p>
            <MarketDemand caption="Figure 2 Market demand is the horizontal sum of individual demand: at P₁, 15 + 25 = 40." />
          </>
        ),
      },
    },
    {
      id: "determinants",
      level: "both",
      title: { zh: "需求的非价格决定因素", en: "Non-price determinants of demand" },
      body: {
        zh: (
          <>
            <p>
              价格以外的因素变化，会让<strong>每个价格下</strong>的需求量都改变，也就是整条需求曲线平移。IB 指定的五个因素：
            </p>
            <table>
              <thead>
                <tr>
                  <th>因素</th>
                  <th>需求增加（右移）的例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>收入 Income</td>
                  <td>
                    <strong>正常品</strong>（normal good）：收入上升，需求增加。<strong>劣等品</strong>（inferior good）：收入上升，需求反而下降，例如人们收入提高后少坐公交、多打车。
                  </td>
                </tr>
                <tr>
                  <td>偏好 Tastes and preferences</td>
                  <td>广告、潮流或健康研究让某商品更受欢迎，例如植物奶。</td>
                </tr>
                <tr>
                  <td>未来价格预期 Future price expectations</td>
                  <td>预期下个月涨价，消费者现在就提前购买。</td>
                </tr>
                <tr>
                  <td>相关商品价格 Price of related goods</td>
                  <td>
                    <strong>替代品</strong>（substitutes）涨价：咖啡涨价 → 茶的需求增加。
                    <br />
                    <strong>互补品</strong>（complements）降价：游戏机降价 → 游戏的需求增加。
                  </td>
                </tr>
                <tr>
                  <td>消费者数量 Number of consumers</td>
                  <td>人口增长、旅游业扩大、市场对外开放。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                「价格」本身<strong>不是</strong>非价格决定因素。本商品价格变动只会引起沿曲线移动，见下一节。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              A change in anything other than the good&apos;s own price changes the quantity demanded <strong>at every price</strong>, so the whole curve shifts. The IB lists five determinants:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Determinant</th>
                  <th>Example of an increase in demand (shift right)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Income</td>
                  <td>
                    <strong>Normal goods</strong>: higher income raises demand. <strong>Inferior goods</strong>: higher income lowers demand, e.g. people take fewer buses and more taxis as they get richer.
                  </td>
                </tr>
                <tr>
                  <td>Tastes and preferences</td>
                  <td>Advertising, fashion or health research makes the good more popular, e.g. plant-based milk.</td>
                </tr>
                <tr>
                  <td>Future price expectations</td>
                  <td>Consumers expect the price to rise next month, so they buy more now.</td>
                </tr>
                <tr>
                  <td>Price of related goods</td>
                  <td>
                    A rise in the price of a <strong>substitute</strong>: dearer coffee raises demand for tea.
                    <br />
                    A fall in the price of a <strong>complement</strong>: cheaper consoles raise demand for games.
                  </td>
                </tr>
                <tr>
                  <td>Number of consumers</td>
                  <td>Population growth, more tourists, or a market opening to new buyers.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                The good&apos;s own price is <strong>not</strong> a non-price determinant. A change in its own price only causes a movement along the curve (next section).
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "movement-vs-shift",
      level: "both",
      title: { zh: "沿曲线移动 vs 曲线平移", en: "Movements along vs shifts of the demand curve" },
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
                  <td>需求量的增加 / 减少（change in quantity demanded）</td>
                  <td>需求的增加 / 减少（change in demand）</td>
                </tr>
                <tr>
                  <td>图上</td>
                  <td>同一条 D 上从一点移到另一点</td>
                  <td>D₁ 移到 D₂；右移为增加，左移为减少</td>
                </tr>
              </tbody>
            </table>
            <Movement caption="图 3 沿曲线移动：价格从 P₁ 降到 P₂，需求量从 Q₁ 增加到 Q₂（需求量增加）。" />
            <Shift caption="图 4 曲线平移：例如收入上升（正常品），价格仍为 P₁ 时，需求量从 Q₁ 增加到 Q₂，D₁ 右移到 D₂（需求增加）。" />
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
                  <td>Increase / decrease in <strong>quantity demanded</strong></td>
                  <td>Increase / decrease in <strong>demand</strong></td>
                </tr>
                <tr>
                  <td>On the diagram</td>
                  <td>From one point to another on the same D</td>
                  <td>D₁ to D₂: right is an increase, left is a decrease</td>
                </tr>
              </tbody>
            </table>
            <Movement caption="Figure 3 Movement along the curve: a fall in price from P₁ to P₂ raises quantity demanded from Q₁ to Q₂ (an increase in quantity demanded)." />
            <Shift caption="Figure 4 Shift of the curve: e.g. higher income for a normal good. At the same price P₁, quantity demanded rises from Q₁ to Q₂ as D₁ shifts to D₂ (an increase in demand)." />
          </>
        ),
      },
    },
    {
      id: "assumptions",
      level: "hl",
      title: {
        zh: "需求定律背后的假设：收入效应、替代效应、边际效用递减",
        en: "Assumptions behind the law of demand: income, substitution and marginal utility",
      },
      body: {
        zh: (
          <>
            <p>为什么价格下降，需求量会上升？IB 要求用三个概念解释：</p>
            <Def term="Income effect">
              价格下降后，消费者的<strong>实际收入</strong>（购买力）上升：同样的钱能买更多东西，所以会多买这种商品（对正常品成立）。
            </Def>
            <Def term="Substitution effect">
              价格下降后，这种商品相对于替代品变得<strong>更便宜</strong>，消费者会用它替代其他商品，从而多买。
            </Def>
            <Def term="Law of diminishing marginal utility">
              消费者多消费一单位某商品，得到的额外满足感（边际效用，marginal utility）会随着消费量增加而递减。
            </Def>
            <p>
              边际效用递减意味着：要让消费者多买一单位，这一单位带来的满足感更低，消费者只愿意为它付更低的价格。所以只有价格下降，需求量才会增加，需求曲线因此向下倾斜。
            </p>
            <table>
              <thead>
                <tr>
                  <th>第几杯奶茶</th>
                  <th>边际效用（单位：util）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>30</td></tr>
                <tr><td>2</td><td>20</td></tr>
                <tr><td>3</td><td>10</td></tr>
                <tr><td>4</td><td>2</td></tr>
              </tbody>
            </table>
            <Callout title="评价（Evaluation）">
              <p>
                效用无法直接测量，且现实中消费者未必完全理性（见 2.4 行为经济学）。少数例外，如炫耀性商品（Veblen goods），价格越高反而越受欢迎，但这不在 IB 考纲要求之内，可作为评价点简单提及。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Why does a lower price raise quantity demanded? The IB explains it with three ideas:</p>
            <Def term="Income effect">
              When price falls, consumers&apos; <strong>real income</strong> (purchasing power) rises: the same money buys more, so they buy more of the good (for a normal good).
            </Def>
            <Def term="Substitution effect">
              When price falls, the good becomes <strong>relatively cheaper</strong> than its substitutes, so consumers switch towards it.
            </Def>
            <Def term="Law of diminishing marginal utility">
              As a consumer consumes more units of a good, the extra satisfaction (marginal utility) gained from each additional unit falls.
            </Def>
            <p>
              Because each extra unit gives less satisfaction, consumers are only willing to pay less for it. Quantity demanded therefore rises only if price falls, which is why the demand curve slopes downwards.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cup of bubble tea</th>
                  <th>Marginal utility (utils)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>30</td></tr>
                <tr><td>2</td><td>20</td></tr>
                <tr><td>3</td><td>10</td></tr>
                <tr><td>4</td><td>2</td></tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                Utility cannot be measured directly, and real consumers are not always rational (see 2.4 Behavioural economics). Exceptions such as Veblen goods, which become more desirable as price rises, are outside the syllabus but can be mentioned briefly as an evaluation point.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.1 Demand",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "Khan Academy — Demand and the law of demand",
      href: "https://www.khanacademy.org/economics-finance-domain/microeconomics/supply-demand-equilibrium/demand-curve-tutorial/a/law-of-demand",
    },
    {
      label: "OpenStax Principles of Economics 3e — 3.1 Demand, Supply, and Equilibrium in Markets",
      href: "https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services",
    },
  ],
};

export default notes;
