import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, HL } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, Region, atX, atY, intersect, type Pt, type Seg } from "@/components/notes/Chart";

const yTick = (y: number): Pt => [-8 / 3.5, y - 4 / 2.56];

// Base market used by every diagram. In numeric mode a price of y reads as $y/10 and a quantity of x as 10x units.
const D: Seg = [
  [0, 95],
  [90, 5],
];
const S: Seg = [
  [0, 5],
  [85, 90],
];
const E = intersect(D, S);

const money = (y: number) => {
  const v = Math.round(y * 10) / 100;
  return "$" + (Number.isInteger(v) ? String(v) : v.toFixed(2));
};
const units = (x: number) => String(Math.round(x * 10));

function Intercepts() {
  return (
    <>
      <Label at={yTick(95)} anchor="end">
        $9.50
      </Label>
      <Label at={yTick(5)} anchor="end">
        $0.50
      </Label>
    </>
  );
}

function PriceCeiling({ caption, numeric = false }: { caption: ReactNode; numeric?: boolean }) {
  const pmax = 35;
  const qs = atY(S, pmax);
  const qd = atY(D, pmax);
  const p1 = atX(D, qs[0]);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Region points={[p1, qs, E]} fill="c" />
      <Line points={D} label="D" />
      <Line points={S} label="S" />
      <Line
        points={[
          [0, pmax],
          [88, pmax],
        ]}
        tone="alt"
        label="Price ceiling"
        labelOffset={[-80, -6]}
      />
      <Guide at={E} x={numeric ? units(E[0]) : "Qₑ"} y={numeric ? money(E[1]) : "Pₑ"} />
      <Guide at={qs} x={numeric ? units(qs[0]) : "Qs"} y={numeric ? money(pmax) : "Pmax"} />
      <Guide at={qd} x={numeric ? units(qd[0]) : "Qd"} />
      <Guide at={p1} y={numeric ? money(p1[1]) : "P₁"} />
      <Dot at={E} />
      <Dot at={qs} />
      <Dot at={qd} />
      <Label at={[45, 29]} anchor="middle">
        Shortage
      </Label>
      {numeric && <Intercepts />}
    </Chart>
  );
}

function PriceFloor({
  caption,
  buy = false,
  numeric = false,
}: {
  caption: ReactNode;
  buy?: boolean;
  numeric?: boolean;
}) {
  const pmin = 65;
  const qd = atY(D, pmin);
  const qs = atY(S, pmin);
  const s1 = atX(S, qd[0]);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      {buy ? (
        <Region
          points={[
            [qd[0], 0],
            qd,
            qs,
            [qs[0], 0],
          ]}
          fill="b"
          label="Gov. spending"
          labelAt={[45, 18]}
        />
      ) : (
        <Region points={[qd, s1, E]} fill="c" />
      )}
      <Line points={D} label="D" />
      <Line points={S} label="S" />
      <Line
        points={[
          [0, pmin],
          [88, pmin],
        ]}
        tone="alt"
        label="Price floor"
        labelOffset={[-70, 16]}
      />
      <Guide at={E} x={numeric ? units(E[0]) : "Qₑ"} y={numeric ? money(E[1]) : "Pₑ"} />
      <Guide at={qd} x={numeric ? units(qd[0]) : "Qd"} y={numeric ? money(pmin) : "Pmin"} />
      <Guide at={qs} x={numeric ? units(qs[0]) : "Qs"} />
      <Dot at={E} />
      <Dot at={qd} />
      <Dot at={qs} />
      <Label at={[45, 70]} anchor="middle">
        Surplus
      </Label>
      {numeric && <Intercepts />}
    </Chart>
  );
}

const S_SPECIFIC: Seg = [
  [0, 25],
  [70, 95],
];
const S_AD_VALOREM: Seg = [
  [0, 7.5],
  [175 / 3, 95],
];

function IndirectTax({
  caption,
  adValorem = false,
  numeric = false,
}: {
  caption: ReactNode;
  adValorem?: boolean;
  numeric?: boolean;
}) {
  const s2 = adValorem ? S_AD_VALOREM : S_SPECIFIC;
  const e2 = intersect(D, s2);
  const pp = atX(S, e2[0]);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Region
        points={[
          [0, E[1]],
          [0, e2[1]],
          e2,
          [e2[0], E[1]],
        ]}
        fill="a"
        label="Consumer"
        labelAt={[12, 55]}
      />
      <Region
        points={[
          [0, pp[1]],
          [0, E[1]],
          [e2[0], E[1]],
          pp,
        ]}
        fill="b"
        label="Producer"
        labelAt={[8.5, 45]}
      />
      <Region points={[e2, pp, E]} fill="c" />
      <Line points={D} label="D" />
      <Line points={S} label="S₁" />
      <Line points={s2} label="S₂" tone="alt" />
      <Guide at={E} x={numeric ? units(E[0]) : "Qₑ"} y={numeric ? money(E[1]) : "Pₑ"} />
      <Guide at={e2} x={numeric ? units(e2[0]) : "Q₁"} y={numeric ? money(e2[1]) : "Pc"} />
      <Guide at={pp} y={numeric ? money(pp[1]) : "Pp"} />
      <Dot at={E} />
      <Dot at={e2} />
      {adValorem ? (
        <>
          <Arrow from={atX(S, 15)} to={atX(s2, 15)} />
          <Arrow from={atX(S, 52)} to={atX(s2, 52)} />
          <Label at={[53.5, 70]}>tax</Label>
        </>
      ) : (
        <>
          <Arrow from={atX(S, 62)} to={atX(s2, 62)} />
          <Label at={[63.5, 76]}>tax</Label>
        </>
      )}
      {numeric && <Intercepts />}
    </Chart>
  );
}

const D_STEEP: Seg = [
  [25, 95],
  [65, 15],
];
const S1_FLAT: Seg = [
  [0, 10],
  [90, 55],
];
const S2_FLAT: Seg = [
  [0, 40],
  [90, 85],
];

function TaxIncidence({ caption }: { caption: ReactNode }) {
  const e1 = intersect(D_STEEP, S1_FLAT);
  const e2 = intersect(D_STEEP, S2_FLAT);
  const pp = atX(S1_FLAT, e2[0]);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Region
        points={[
          [0, e1[1]],
          [0, e2[1]],
          e2,
          [e2[0], e1[1]],
        ]}
        fill="a"
        label="Consumer"
        labelAt={[11, 55]}
      />
      <Region
        points={[
          [0, pp[1]],
          [0, e1[1]],
          [e2[0], e1[1]],
          pp,
        ]}
        fill="b"
      />
      <Region points={[e2, pp, e1]} fill="c" />
      <Line points={D_STEEP} label="D" />
      <Line points={S1_FLAT} label="S₁" />
      <Line points={S2_FLAT} label="S₂" tone="alt" />
      <Guide at={e1} x="Qₑ" y="Pₑ" />
      <Guide at={e2} x="Q₁" y="Pc" />
      <Guide at={pp} y="Pp" />
      <Dot at={e1} />
      <Dot at={e2} />
      <Arrow from={atX(S1_FLAT, 75)} to={atX(S2_FLAT, 75)} />
      <Label at={[76.5, 62]}>tax</Label>
    </Chart>
  );
}

const S_SUBSIDY: Seg = [
  [15, 0],
  [85, 70],
];

function Subsidy({ caption, numeric = false }: { caption: ReactNode; numeric?: boolean }) {
  const e2 = intersect(D, S_SUBSIDY);
  const pp = atX(S, e2[0]);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Region
        points={[
          [0, e2[1]],
          [0, E[1]],
          E,
          e2,
        ]}
        fill="a"
        label="Consumer gain"
        labelAt={[22, 45]}
      />
      <Region
        points={[
          [0, E[1]],
          [0, pp[1]],
          pp,
          E,
        ]}
        fill="b"
        label="Producer gain"
        labelAt={[22, 55]}
      />
      <Region points={[E, pp, e2]} fill="c" />
      <Line points={D} label="D" />
      <Line points={S} label="S₁" />
      <Line points={S_SUBSIDY} label="S₂" tone="alt" labelOffset={[6, 12]} />
      <Guide at={E} x={numeric ? units(E[0]) : "Qₑ"} y={numeric ? money(E[1]) : "Pₑ"} />
      <Guide at={e2} x={numeric ? units(e2[0]) : "Q₁"} y={numeric ? money(e2[1]) : "Pc"} />
      <Guide at={pp} y={numeric ? money(pp[1]) : "Pp"} />
      <Dot at={E} />
      <Dot at={e2} />
      <Dot at={pp} />
      <Arrow from={atX(S, 80)} to={atX(S_SUBSIDY, 80)} />
      <Label at={[81.5, 73]}>subsidy</Label>
      {numeric && <Intercepts />}
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "政府干预市场是为了获得收入、支持企业和低收入家庭、影响生产和消费、纠正市场失灵和促进公平。本节分析价格管制（最高限价、最低限价）、间接税（从量税、从价税）、补贴、直接提供、命令与控制型管制，以及它们对市场和各利益相关者的影响。HL 还要掌握消费者助推，以及根据图形计算各项干预对消费者、生产者和政府的影响。",
    en: "Governments intervene in markets to raise revenue, support firms and low-income households, influence production and consumption, correct market failure and promote equity. This topic analyses price controls (ceilings and floors), indirect taxes (specific and ad valorem), subsidies, direct provision and command-and-control regulation, and their consequences for markets and stakeholders. HL adds consumer nudges and calculating, from a diagram, the effects of each intervention on consumers, producers and the government.",
  },
  sections: [
    {
      id: "reasons",
      level: "both",
      title: { zh: "政府干预市场的原因与主要方式", en: "Reasons for and main forms of government intervention" },
      body: {
        zh: (
          <>
            <p>自由市场的结果并不总是社会想要的。考纲列出政府影响市场结果的七个目的：</p>
            <table>
              <thead>
                <tr>
                  <th>目的</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>获得政府收入（earn government revenue）</td>
                  <td>对烟、酒、汽油征收间接税，增值税（VAT）</td>
                </tr>
                <tr>
                  <td>支持企业（support firms）</td>
                  <td>对新兴产业或出口企业补贴，如新能源汽车补贴</td>
                </tr>
                <tr>
                  <td>支持低收入家庭（support households on low incomes）</td>
                  <td>租金管制、对基本食品的补贴、最低工资</td>
                </tr>
                <tr>
                  <td>影响生产水平（influence level of production）</td>
                  <td>补贴可再生能源以扩大产量，限制污染行业的产能</td>
                </tr>
                <tr>
                  <td>影响消费水平（influence level of consumption）</td>
                  <td>征税减少含糖饮料的消费，补贴鼓励疫苗接种</td>
                </tr>
                <tr>
                  <td>纠正市场失灵（correct market failure）</td>
                  <td>外部性、公共物品、信息不对称等（见 2.8–2.11）</td>
                </tr>
                <tr>
                  <td>促进公平（promote equity）</td>
                  <td>免费提供教育和医疗，让低收入人群也能获得</td>
                </tr>
              </tbody>
            </table>
            <p>主要的干预方式：</p>
            <ul>
              <li>价格管制：最高限价（price ceiling）和最低限价（price floor）</li>
              <li>间接税（indirect taxes）和补贴（subsidies）</li>
              <li>直接提供服务（direct provision of services）</li>
              <li>命令与控制型管制和立法（command and control regulation and legislation）</li>
              <li>消费者助推（consumer nudges，仅 HL）</li>
            </ul>
            <Callout title="考试提示">
              <p>
                分析任何干预时都要回答三个问题：<strong>市场</strong>的价格和数量怎么变？<strong>各利益相关者</strong>（消费者、生产者、政府、工人、社会）谁得谁失？是否带来<strong>福利损失</strong>或纠正了市场失灵？
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Free-market outcomes are not always what society wants. The guide lists seven aims of intervention:</p>
            <table>
              <thead>
                <tr>
                  <th>Aim</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Earn government revenue</td>
                  <td>Indirect taxes on cigarettes, alcohol and petrol; value added tax (VAT)</td>
                </tr>
                <tr>
                  <td>Support firms</td>
                  <td>Subsidies for infant industries or exporters, e.g. electric vehicle subsidies</td>
                </tr>
                <tr>
                  <td>Support households on low incomes</td>
                  <td>Rent controls, subsidies on basic food, a minimum wage</td>
                </tr>
                <tr>
                  <td>Influence the level of production</td>
                  <td>Subsidising renewable energy to expand output; capping capacity in polluting industries</td>
                </tr>
                <tr>
                  <td>Influence the level of consumption</td>
                  <td>Taxing sugary drinks to cut consumption; subsidising vaccinations to raise it</td>
                </tr>
                <tr>
                  <td>Correct market failure</td>
                  <td>Externalities, public goods, asymmetric information, etc. (see 2.8–2.11)</td>
                </tr>
                <tr>
                  <td>Promote equity</td>
                  <td>Free education and healthcare so that low-income groups also have access</td>
                </tr>
              </tbody>
            </table>
            <p>The main forms of intervention:</p>
            <ul>
              <li>Price controls: price ceilings (maximum prices) and price floors (minimum prices)</li>
              <li>Indirect taxes and subsidies</li>
              <li>Direct provision of services</li>
              <li>Command and control regulation and legislation</li>
              <li>Consumer nudges (HL only)</li>
            </ul>
            <Callout title="Exam tip">
              <p>
                For any intervention, answer three questions: what happens to price and quantity in the <strong>market</strong>? Which <strong>stakeholders</strong> (consumers, producers, government, workers, society) gain and lose? Does it create a <strong>welfare loss</strong> or correct a market failure?
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "price-ceiling",
      level: "both",
      title: { zh: "最高限价（价格上限）", en: "Price ceilings (maximum prices)" },
      body: {
        zh: (
          <>
            <Def term="Price ceiling (maximum price)">
              政府规定的法定最高价格，市场价格不得高于它。要产生效果，必须设在<strong>均衡价格以下</strong>。
            </Def>
            <p>目的通常是让低收入消费者买得起必需品，例如租金管制、基本食品、药品和燃料的限价。</p>
            <PriceCeiling caption="图 1 最高限价：价格被压在 Pmax，低于均衡价格 Pₑ。需求量 Qd 大于供给量 Qs，出现短缺 Qd − Qs。实际成交量从 Qₑ 减少到 Qs，深色三角形是福利损失。P₁ 是消费者愿意为 Qs 单位支付的最高价格，黑市价格可能接近它。" />
            <table>
              <thead>
                <tr>
                  <th>利益相关者</th>
                  <th>可能的影响</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>消费者</td>
                  <td>买到商品的人以更低价格获益；但短缺使许多人买不到，只能排队、靠关系或「先到先得」等非价格配给（non-price rationing），时间成本增加。</td>
                </tr>
                <tr>
                  <td>生产者</td>
                  <td>价格和销量都下降，收入和生产者剩余减少；可能降低质量或减少维护（如房东不修房子）。</td>
                </tr>
                <tr>
                  <td>政府</td>
                  <td>政治上受欢迎，但可能需要配给、补贴生产者或自己提供商品来缓解短缺，增加开支。</td>
                </tr>
                <tr>
                  <td>市场与社会</td>
                  <td>出现黑市（parallel market），价格可能高于 Pₑ；资源配置不足（underallocation），产生福利损失。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                柏林在 2020 年实行租金冻结（Mietendeckel），2021 年被德国联邦宪法法院裁定无效。实施期间，受管制公寓的租金下降，但挂牌出租的房源明显减少。斯德哥尔摩的租金管制公寓则需要排队很多年。
              </p>
            </Callout>
            <Callout title="评价（Evaluation）">
              <ul>
                <li>短期内需求和供给都缺乏弹性，短缺较小；长期弹性增大，短缺扩大（例如房东把房子改作他用）。</li>
                <li>受益的往往是已经买到商品的人，不一定是最贫困的人，所以对公平的帮助有限。</li>
                <li>替代政策：直接给低收入家庭发放住房补贴，或增加公共住房供给，可以帮助穷人而不造成短缺。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Price ceiling (maximum price)">
              A legal maximum price set by the government above which the good cannot be sold. To have any effect it must be set <strong>below the equilibrium price</strong>.
            </Def>
            <p>The aim is usually to keep necessities affordable for low-income consumers, e.g. rent controls and price caps on basic food, medicines or fuel.</p>
            <PriceCeiling caption="Figure 1 A price ceiling holds price at Pmax, below the equilibrium price Pₑ. Quantity demanded Qd exceeds quantity supplied Qs, creating a shortage of Qd − Qs. The quantity traded falls from Qₑ to Qs, and the dark triangle is the welfare loss. P₁ is the most consumers would pay for Qs units, which a parallel-market price may approach." />
            <table>
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Possible effects</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consumers</td>
                  <td>Those who obtain the good gain from the lower price; but the shortage leaves many without it, so goods are allocated by queuing, connections or first come, first served (non-price rationing), which adds time costs.</td>
                </tr>
                <tr>
                  <td>Producers</td>
                  <td>Lower price and lower sales cut revenue and producer surplus; quality or maintenance may be cut (e.g. landlords neglect repairs).</td>
                </tr>
                <tr>
                  <td>Government</td>
                  <td>Politically popular, but it may have to ration, subsidise producers or supply the good itself to ease the shortage, raising spending.</td>
                </tr>
                <tr>
                  <td>Market and society</td>
                  <td>Parallel (black) markets appear, possibly at prices above Pₑ; resources are underallocated, causing a welfare loss.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                Berlin froze rents in 2020 (the Mietendeckel) until Germany&apos;s Federal Constitutional Court struck the law down in 2021. While it applied, rents on controlled flats fell, but the number of flats advertised for rent dropped markedly. In Stockholm, rent-controlled flats have waiting lists many years long.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <ul>
                <li>In the short run demand and supply are inelastic and the shortage is small; in the long run both become more elastic and the shortage grows (e.g. landlords convert flats to other uses).</li>
                <li>The gainers are those who already obtain the good, not necessarily the poorest, so the equity gain may be limited.</li>
                <li>Alternatives: housing benefits paid directly to low-income households, or more public housing, help the poor without creating a shortage.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "price-floor",
      level: "both",
      title: { zh: "最低限价（价格下限）", en: "Price floors (minimum prices)" },
      body: {
        zh: (
          <>
            <Def term="Price floor (minimum price)">
              政府规定的法定最低价格，市场价格不得低于它。要产生效果，必须设在<strong>均衡价格以上</strong>。
            </Def>
            <p>
              常见于农产品（稳定和提高农民收入）、劳动力市场（最低工资，minimum wage）以及酒类最低单价（减少有害消费）。
            </p>
            <PriceFloor caption="图 2 最低限价：价格被抬高到 Pmin，高于 Pₑ。供给量 Qs 大于需求量 Qd，出现过剩 Qs − Qd。若政府不收购，实际成交量只有 Qd，深色三角形是福利损失。" />
            <p>为了维持最低价，政府常常需要以 Pmin <strong>收购过剩产品</strong>，支出等于 Pmin × (Qs − Qd)：</p>
            <PriceFloor buy caption="图 3 政府以 Pmin 收购过剩部分（Qs − Qd），灰色矩形是政府支出。生产者按 Pmin 卖出全部 Qs。" />
            <table>
              <thead>
                <tr>
                  <th>利益相关者</th>
                  <th>可能的影响</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>生产者</td>
                  <td>价格更高、收入更稳定（若政府收购，收入为 Pmin × Qs）；但低效率的生产者也被保护，缺乏降低成本的动力。</td>
                </tr>
                <tr>
                  <td>消费者</td>
                  <td>支付更高价格，购买量减少，消费者剩余下降；对低收入家庭影响更大（食品是必需品）。</td>
                </tr>
                <tr>
                  <td>政府与纳税人</td>
                  <td>收购、储存和销毁过剩产品的开支，存在机会成本（这些钱本可以用于教育、医疗）。</td>
                </tr>
                <tr>
                  <td>外国生产者</td>
                  <td>过剩产品若低价出口（倾销，dumping），会压低世界价格，损害其他国家（尤其是发展中国家）的农民。</td>
                </tr>
                <tr>
                  <td>市场与社会</td>
                  <td>资源配置过度（overallocation），过剩造成浪费，产生福利损失。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                20 世纪 80 年代，欧盟共同农业政策（CAP）以保证价格收购农产品，形成了著名的「黄油山」和「葡萄酒湖」；后来欧盟逐步改为直接向农民发放收入补助。最低工资是劳动力市场的最低限价：设在均衡工资以上时，可能造成劳动力过剩（失业）。
              </p>
            </Callout>
            <Callout title="评价（Evaluation）">
              <ul>
                <li>过剩的大小取决于 PED 和 PES：农产品短期两者都缺乏弹性，过剩较小，但长期农民扩产，过剩越来越大。</li>
                <li>最低工资的就业效应在实证研究中存在争议：如果设得不太高，或雇主有买方垄断力量，失业可能很少。</li>
                <li>替代政策：直接收入补助不影响市场价格，扭曲更小。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Price floor (minimum price)">
              A legal minimum price set by the government below which the good cannot be sold. To have any effect it must be set <strong>above the equilibrium price</strong>.
            </Def>
            <p>
              Common in agriculture (to stabilise and raise farm incomes), in the labour market (the minimum wage) and as minimum unit prices for alcohol (to cut harmful consumption).
            </p>
            <PriceFloor caption="Figure 2 A price floor raises price to Pmin, above Pₑ. Quantity supplied Qs exceeds quantity demanded Qd, creating a surplus of Qs − Qd. If the government does not buy the surplus, only Qd is traded and the dark triangle is the welfare loss." />
            <p>To keep the price at the floor, the government often has to <strong>buy the surplus</strong> at Pmin, spending Pmin × (Qs − Qd):</p>
            <PriceFloor buy caption="Figure 3 The government buys the surplus (Qs − Qd) at Pmin; the grey rectangle is government spending. Producers sell all of Qs at Pmin." />
            <table>
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Possible effects</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Producers</td>
                  <td>Higher, more stable prices and incomes (with government purchases, revenue is Pmin × Qs); but inefficient producers are protected and have less incentive to cut costs.</td>
                </tr>
                <tr>
                  <td>Consumers</td>
                  <td>Pay a higher price and buy less, so consumer surplus falls; this hits low-income households hardest when the good is a necessity such as food.</td>
                </tr>
                <tr>
                  <td>Government and taxpayers</td>
                  <td>Spending on buying, storing and destroying the surplus, with an opportunity cost (the money could have funded education or healthcare).</td>
                </tr>
                <tr>
                  <td>Foreign producers</td>
                  <td>If the surplus is exported cheaply (dumping), it depresses world prices and hurts farmers elsewhere, especially in developing countries.</td>
                </tr>
                <tr>
                  <td>Market and society</td>
                  <td>Resources are overallocated, the surplus is wasted, and there is a welfare loss.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                In the 1980s the EU&apos;s Common Agricultural Policy (CAP) bought farm products at guaranteed prices, creating the famous &quot;butter mountains&quot; and &quot;wine lakes&quot;; the EU later shifted towards direct income payments to farmers. The minimum wage is a price floor in the labour market: set above the equilibrium wage, it may create a surplus of labour (unemployment).
              </p>
            </Callout>
            <Callout title="Evaluation">
              <ul>
                <li>The size of the surplus depends on PED and PES: for farm products both are inelastic in the short run, so the surplus is small, but farmers expand output over time and the surplus grows.</li>
                <li>The employment effect of minimum wages is disputed in empirical research: if the wage is not set too high, or employers have monopsony power, job losses may be small.</li>
                <li>Alternative: direct income support for farmers leaves market prices alone and causes less distortion.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "indirect-tax",
      level: "both",
      title: { zh: "间接税：从量税与从价税", en: "Indirect taxes: specific and ad valorem" },
      body: {
        zh: (
          <>
            <Def term="Indirect tax">
              对商品和服务的支出征收的税，由生产者向政府缴纳，但部分或全部可以通过提高价格转嫁给消费者。它增加了生产者的成本，使供给曲线<strong>向上（左）移动</strong>。
            </Def>
            <Def term="Specific tax">
              对每单位商品征收固定金额的税，例如每包烟 5 元、每升汽油 1 元。新供给曲线与原曲线<strong>平行</strong>，垂直距离等于每单位税额。
            </Def>
            <Def term="Ad valorem tax">
              按商品价格的一定百分比征收的税，例如增值税（VAT）、中国的消费税中的从价部分。价格越高，每单位税额越大，所以新供给曲线与原曲线<strong>逐渐分开</strong>（越往上越远）。
            </Def>
            <IndirectTax caption="图 4 从量税：供给从 S₁ 平行上移到 S₂（垂直距离 = 每单位税额）。消费者支付的价格从 Pₑ 升到 Pc，生产者实际得到的价格降到 Pp，数量从 Qₑ 减到 Q₁。税收收入 = 税额 × Q₁，分为消费者负担（浅色）和生产者负担（灰色）；深色三角形是福利损失。" />
            <IndirectTax adValorem caption="图 5 从价税（此处为 50%，为便于看清而夸大）：S₂ 与 S₁ 的距离随价格上升而变大。市场结果和各块面积的含义与从量税相同。" />
            <p>
              <strong>税负归宿（tax incidence）</strong>指税负在消费者和生产者之间如何分担，取决于 PED 和 PES 的相对大小：<strong>哪一方更缺乏弹性，哪一方承担更多税负</strong>。需求缺乏弹性时，消费者承担大部分税负，销量下降少，政府收入高。
            </p>
            <TaxIncidence caption="图 6 需求缺乏弹性时的从量税：消费价格从 Pₑ 大幅升到 Pc，生产者得到的价格只从 Pₑ 小幅降到 Pp。消费者负担（浅色）远大于生产者负担（灰色）。" />
            <table>
              <thead>
                <tr>
                  <th>利益相关者</th>
                  <th>可能的影响</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>消费者</td>
                  <td>价格升到 Pc，购买量减少，消费者剩余下降。若商品是低收入者常买的，税收具有累退性（regressive）。</td>
                </tr>
                <tr>
                  <td>生产者</td>
                  <td>每单位实际得到 Pp，销量减少，收入和生产者剩余下降。</td>
                </tr>
                <tr>
                  <td>政府</td>
                  <td>获得税收收入（税额 × Q₁），可用于公共支出。</td>
                </tr>
                <tr>
                  <td>工人</td>
                  <td>产量下降可能导致裁员。</td>
                </tr>
                <tr>
                  <td>社会</td>
                  <td>如果原来的市场没有外部性，税收造成资源配置不足和福利损失；如果存在负外部性，税收反而能纠正市场失灵（见 2.8）。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                英国 2018 年开始征收软饮料行业税（Soft Drinks Industry Levy），按每升含糖量分档征收固定金额，是一种从量税。许多饮料企业在征税前就降低了含糖量以避税，显示税收也能改变生产者的行为。增值税（如英国 20%、中国一般税率 13%）是典型的从价税。
              </p>
            </Callout>
            <Callout title="评价（Evaluation）">
              <ul>
                <li>为了收入，最好对需求缺乏弹性的商品征税；但为了减少消费（如烟草），需求缺乏弹性恰恰会让效果有限。两个目标之间存在取舍。</li>
                <li>税收可能是累退的，加重低收入家庭负担；还可能引发走私和逃税。</li>
                <li>税率设定需要信息，很难准确衡量外部成本。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Indirect tax">
              A tax on spending on goods and services, paid to the government by producers but partly or fully passed on to consumers through higher prices. It raises producers&apos; costs, shifting the supply curve <strong>upwards (to the left)</strong>.
            </Def>
            <Def term="Specific tax">
              A fixed amount of tax per unit of the good, e.g. ¥5 per pack of cigarettes or ¥1 per litre of petrol. The new supply curve is <strong>parallel</strong> to the old one, with the vertical distance equal to the tax per unit.
            </Def>
            <Def term="Ad valorem tax">
              A tax charged as a percentage of the price, e.g. value added tax (VAT). The higher the price, the larger the tax per unit, so the new supply curve <strong>diverges</strong> from the old one (the gap widens as price rises).
            </Def>
            <IndirectTax caption="Figure 4 A specific tax shifts supply from S₁ up to S₂ in parallel (vertical distance = tax per unit). The price paid by consumers rises from Pₑ to Pc, the price received by producers falls to Pp, and quantity falls from Qₑ to Q₁. Tax revenue = tax × Q₁, split into the consumer burden (light) and the producer burden (grey); the dark triangle is the welfare loss." />
            <IndirectTax adValorem caption="Figure 5 An ad valorem tax (50% here, exaggerated for clarity): the gap between S₂ and S₁ widens as price rises. The market outcome and the meaning of each area are the same as for a specific tax." />
            <p>
              <strong>Tax incidence</strong> is how the tax burden is shared between consumers and producers. It depends on the relative sizes of PED and PES: <strong>whichever side is more inelastic bears more of the tax</strong>. When demand is inelastic, consumers bear most of the burden, quantity falls little and government revenue is high.
            </p>
            <TaxIncidence caption="Figure 6 A specific tax when demand is inelastic: the consumer price rises sharply from Pₑ to Pc, while the producer price falls only slightly from Pₑ to Pp. The consumer burden (light) is much larger than the producer burden (grey)." />
            <table>
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Possible effects</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consumers</td>
                  <td>Price rises to Pc, they buy less and consumer surplus falls. If the good is bought mainly by low-income groups, the tax is regressive.</td>
                </tr>
                <tr>
                  <td>Producers</td>
                  <td>Receive only Pp per unit and sell less, so revenue and producer surplus fall.</td>
                </tr>
                <tr>
                  <td>Government</td>
                  <td>Gains tax revenue (tax × Q₁) to fund public spending.</td>
                </tr>
                <tr>
                  <td>Workers</td>
                  <td>Lower output may lead to job losses.</td>
                </tr>
                <tr>
                  <td>Society</td>
                  <td>If the market had no externality, the tax causes underallocation and a welfare loss; if there is a negative externality, the tax can correct the market failure (see 2.8).</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                The UK&apos;s Soft Drinks Industry Levy, introduced in 2018, charges a fixed amount per litre in bands based on sugar content, so it is a specific tax. Many manufacturers cut the sugar in their drinks before it started in order to avoid it, showing that a tax can also change producer behaviour. VAT (e.g. 20% in the UK, a 13% standard rate in China) is a typical ad valorem tax.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <ul>
                <li>For revenue, taxing goods with inelastic demand is best; but to cut consumption (e.g. tobacco), inelastic demand is exactly what limits the effect. There is a trade-off between the two aims.</li>
                <li>Indirect taxes can be regressive, hitting low-income households harder, and may encourage smuggling and tax evasion.</li>
                <li>Setting the right rate needs information; external costs are hard to measure.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "subsidy",
      level: "both",
      title: { zh: "补贴", en: "Subsidies" },
      body: {
        zh: (
          <>
            <Def term="Subsidy">
              政府向生产者支付的每单位金额，用于降低生产成本、增加产量或降低价格。它使供给曲线<strong>向下（右）移动</strong>，垂直距离等于每单位补贴。
            </Def>
            <Subsidy caption="图 7 每单位补贴：供给从 S₁ 下移到 S₂。消费者支付的价格从 Pₑ 降到 Pc，生产者得到的价格（含补贴）升到 Pp，数量从 Qₑ 增加到 Q₁。政府支出 = 补贴 × Q₁（Pc 到 Pp 之间、Q₁ 左边的整个矩形），其中浅色为消费者获益，灰色为生产者获益，深色三角形为福利损失。" />
            <table>
              <thead>
                <tr>
                  <th>利益相关者</th>
                  <th>可能的影响</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>消费者</td>
                  <td>价格降到 Pc，购买量增加，消费者剩余上升。</td>
                </tr>
                <tr>
                  <td>生产者</td>
                  <td>每单位得到 Pp，销量增加，收入和生产者剩余上升；但可能变得依赖补贴、效率下降。</td>
                </tr>
                <tr>
                  <td>政府与纳税人</td>
                  <td>支出补贴 × Q₁，存在机会成本，可能需要加税或借债。</td>
                </tr>
                <tr>
                  <td>工人</td>
                  <td>产量增加，就业增加。</td>
                </tr>
                <tr>
                  <td>外国生产者</td>
                  <td>补贴让国内企业在国际竞争中获得不公平优势，可能引发贸易争端。</td>
                </tr>
                <tr>
                  <td>社会</td>
                  <td>若原市场没有外部性，补贴造成资源配置过度和福利损失；若存在正外部性（如疫苗、教育），补贴可以纠正市场失灵。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                中国从 2009 年起对新能源汽车实行购置补贴，补贴逐步退坡，并于 2022 年底结束。补贴帮助行业快速扩大规模、降低成本，但也出现过「骗补」问题。
              </p>
            </Callout>
            <Callout title="评价（Evaluation）">
              <ul>
                <li>补贴的好处在消费者和生产者之间如何分配同样取决于 PED 和 PES。</li>
                <li>补贴一旦实行很难取消（利益集团游说），可能保护低效率企业。</li>
                <li>政府需要判断补贴金额，信息不足可能导致补贴过多或过少（政府失灵）。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Subsidy">
              A payment per unit from the government to producers, used to lower costs of production, raise output or lower prices. It shifts the supply curve <strong>downwards (to the right)</strong> by the amount of the subsidy per unit.
            </Def>
            <Subsidy caption="Figure 7 A per-unit subsidy shifts supply from S₁ down to S₂. The price paid by consumers falls from Pₑ to Pc, the price received by producers (including the subsidy) rises to Pp, and quantity rises from Qₑ to Q₁. Government spending = subsidy × Q₁ (the whole rectangle between Pc and Pp up to Q₁): the light area is the consumer gain, the grey area the producer gain and the dark triangle the welfare loss." />
            <table>
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Possible effects</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consumers</td>
                  <td>Price falls to Pc, they buy more and consumer surplus rises.</td>
                </tr>
                <tr>
                  <td>Producers</td>
                  <td>Receive Pp per unit and sell more, so revenue and producer surplus rise; but they may become dependent on the subsidy and less efficient.</td>
                </tr>
                <tr>
                  <td>Government and taxpayers</td>
                  <td>Spending of subsidy × Q₁, with an opportunity cost; it may require higher taxes or borrowing.</td>
                </tr>
                <tr>
                  <td>Workers</td>
                  <td>Higher output raises employment.</td>
                </tr>
                <tr>
                  <td>Foreign producers</td>
                  <td>Subsidies give domestic firms an unfair advantage in international markets and can lead to trade disputes.</td>
                </tr>
                <tr>
                  <td>Society</td>
                  <td>If the market had no externality, the subsidy causes overallocation and a welfare loss; if there is a positive externality (e.g. vaccines, education), it can correct the market failure.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                China subsidised purchases of new energy vehicles from 2009, phasing the subsidy down over time and ending it at the end of 2022. It helped the industry scale up quickly and cut costs, though there were also cases of firms fraudulently claiming subsidies.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <ul>
                <li>How the benefit is shared between consumers and producers also depends on PED and PES.</li>
                <li>Subsidies are hard to remove once introduced (lobbying by interest groups) and may protect inefficient firms.</li>
                <li>The government must judge the right amount; poor information can lead to too much or too little subsidy (government failure).</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "other-forms",
      level: "both",
      title: { zh: "直接提供、命令与控制型管制、消费者助推", en: "Direct provision, command and control regulation, consumer nudges" },
      body: {
        zh: (
          <>
            <Def term="Direct provision of services">
              政府自己提供商品或服务，通常免费或低价，资金来自税收。例如公立学校、公立医院、道路、公园、路灯和国防。
            </Def>
            <p>
              优点：保证所有人都能获得（促进公平），可以提供市场不愿提供的公共物品，增加有正外部性的服务的消费。缺点：开支大、有机会成本；缺乏利润动机，可能效率低、排长队、质量参差不齐。
            </p>
            <Def term="Command and control regulation and legislation">
              政府通过法律和规章直接规定或禁止某些行为，违反者会被罚款或受到其他处罚。
            </Def>
            <ul>
              <li>禁止或限制：公共场所禁烟、禁止向未成年人卖酒、禁止使用某些一次性塑料制品。</li>
              <li>标准：汽车排放标准、食品安全和建筑安全标准、产品含糖量上限。</li>
              <li>配额和许可证：捕鱼配额、营业执照。</li>
            </ul>
            <p>
              优点：简单直接、容易理解，对危险行为可以迅速见效。缺点：需要监督和执法，成本高；一刀切，不考虑不同企业减排成本的差异；可能催生黑市或钻空子。
            </p>
            <HL>
              <Def term="Consumer nudges">
                在不禁止任何选项、也不明显改变经济激励的前提下，通过改变选择的呈现方式（选择架构，choice architecture），引导人们做出更有利于自己和社会的选择。理论基础是行为经济学（见 2.4）。
              </Def>
              <ul>
                <li>默认选项：器官捐献改为「默认同意、可以退出」（opt-out），例如英国威尔士 2015 年起实行；英国 2012 年起推行养老金自动加入（auto-enrolment），参与率大幅上升。</li>
                <li>摆放位置：超市把水果放在收银台旁、把含糖零食放到不显眼的位置。</li>
                <li>社会规范提示：告诉纳税人「你所在地区大多数人已经按时交税」，提高按时缴税率。</li>
              </ul>
              <p>
                评价：成本低、保留选择自由；但效果可能较小或只是短期的，在不同文化中效果不同，而且「由谁决定什么是好的选择」存在伦理争议。
              </p>
            </HL>
          </>
        ),
        en: (
          <>
            <Def term="Direct provision of services">
              The government supplies goods or services itself, usually free or at low cost and financed by taxes. Examples are state schools, public hospitals, roads, parks, street lighting and national defence.
            </Def>
            <p>
              Advantages: guarantees access for everyone (equity), supplies public goods the market will not provide, and raises consumption of services with positive externalities. Disadvantages: high cost with an opportunity cost; without a profit motive, provision may be inefficient, with long waiting lists and uneven quality.
            </p>
            <Def term="Command and control regulation and legislation">
              The government directly requires or forbids certain behaviour through laws and rules, with fines or other penalties for breaking them.
            </Def>
            <ul>
              <li>Bans and restrictions: smoking bans in public places, bans on selling alcohol to minors, bans on some single-use plastics.</li>
              <li>Standards: vehicle emission standards, food and building safety standards, caps on sugar content.</li>
              <li>Quotas and licences: fishing quotas, business licences.</li>
            </ul>
            <p>
              Advantages: simple, clear and quick to work against dangerous behaviour. Disadvantages: costly monitoring and enforcement; a one-size-fits-all rule ignores differences in firms&apos; costs of compliance; it may encourage black markets or loopholes.
            </p>
            <HL>
              <Def term="Consumer nudges">
                Changing the way choices are presented (choice architecture) to steer people towards choices that are better for themselves or society, without banning any option or significantly changing economic incentives. They are based on behavioural economics (see 2.4).
              </Def>
              <ul>
                <li>Defaults: opt-out organ donation, e.g. in Wales since 2015; automatic enrolment in workplace pensions in the UK from 2012 sharply raised participation.</li>
                <li>Placement: supermarkets put fruit by the checkout and move sugary snacks out of sight.</li>
                <li>Social norms: telling taxpayers that &quot;most people in your area pay on time&quot; raises on-time payment.</li>
              </ul>
              <p>
                Evaluation: cheap and preserves freedom of choice; but effects may be small or short-lived, vary across cultures, and raise the ethical question of who decides what the &quot;better&quot; choice is.
              </p>
            </HL>
          </>
        ),
      },
    },
    {
      id: "calculations",
      level: "hl",
      title: { zh: "计算：干预对市场和利益相关者的影响", en: "Calculations: effects of intervention on markets and stakeholders" },
      body: {
        zh: (
          <>
            <p>
              下面四个例题用同一个市场：没有干预时均衡价格 5 美元、均衡数量 450 单位；需求曲线与价格轴交于 9.50 美元，供给曲线与价格轴交于 0.50 美元。干预前消费者剩余 = 生产者剩余 = ½ × 450 × 4.5 = 1012.5 美元，消费者支出 = 生产者收入 = 5 × 450 = 2250 美元。
            </p>
            <Callout title="例题 1：最高限价 3.50 美元">
              <PriceCeiling numeric caption="图 8 最高限价 3.50 美元：供给量 300，需求量 600。" />
              <ul>
                <li>短缺 = 600 − 300 = 300 单位；成交量 = 300。</li>
                <li>消费者支出 = 生产者收入 = 3.50 × 300 = 1050 美元（原来 2250 美元）。</li>
                <li>消费者剩余 = 需求曲线以下、3.50 以上、0 到 300 之间的梯形 = 300 × [(9.50 + 6.50) ÷ 2 − 3.50] = 1350 美元（增加 337.5 美元）。</li>
                <li>生产者剩余 = ½ × 300 × (3.50 − 0.50) = 450 美元（减少 562.5 美元）。</li>
                <li>福利损失 = ½ × (6.50 − 3.50) × (450 − 300) = 225 美元。验算：2025 − (1350 + 450) = 225。</li>
              </ul>
            </Callout>
            <Callout title="例题 2：最低限价 6.50 美元，政府收购过剩">
              <PriceFloor numeric buy caption="图 9 最低限价 6.50 美元：需求量 300，供给量 600，政府收购过剩的 300 单位。" />
              <ul>
                <li>过剩 = 600 − 300 = 300 单位。</li>
                <li>政府支出 = 6.50 × 300 = 1950 美元。</li>
                <li>消费者支出 = 6.50 × 300 = 1950 美元；消费者剩余 = ½ × 300 × (9.50 − 6.50) = 450 美元（减少 562.5 美元）。</li>
                <li>生产者收入 = 6.50 × 600 = 3900 美元（其中 1950 美元来自政府）；生产者剩余 = ½ × 600 × (6.50 − 0.50) = 1800 美元（增加 787.5 美元）。</li>
                <li>若政府不收购，只成交 300 单位，福利损失 = ½ × (6.50 − 3.50) × (450 − 300) = 225 美元（图 2 的三角形）。</li>
              </ul>
            </Callout>
            <Callout title="例题 3：每单位 2 美元的从量税">
              <IndirectTax numeric caption="图 10 每单位 2 美元的从量税：消费者支付 6 美元，生产者得到 4 美元，数量 350。" />
              <ul>
                <li>政府税收 = 2 × 350 = 700 美元。</li>
                <li>消费者负担 = (6 − 5) × 350 = 350 美元；生产者负担 = (5 − 4) × 350 = 350 美元（各占 50%）。</li>
                <li>消费者支出 = 6 × 350 = 2100 美元；生产者收入（扣税后）= 4 × 350 = 1400 美元。</li>
                <li>消费者剩余 = ½ × 350 × (9.50 − 6) = 612.5 美元（减少 400 美元）；生产者剩余 = ½ × 350 × (4 − 0.50) = 612.5 美元（减少 400 美元）。</li>
                <li>福利损失 = ½ × 2 × (450 − 350) = 100 美元。验算：剩余共减少 800 = 税收 700 + 福利损失 100。</li>
              </ul>
            </Callout>
            <Callout title="例题 4：每单位 2 美元的补贴">
              <Subsidy numeric caption="图 11 每单位 2 美元的补贴：消费者支付 4 美元，生产者得到 6 美元，数量 550。" />
              <ul>
                <li>政府支出 = 2 × 550 = 1100 美元。</li>
                <li>消费者支出 = 4 × 550 = 2200 美元；生产者收入（含补贴）= 6 × 550 = 3300 美元。</li>
                <li>消费者剩余增加 = (5 − 4) × (450 + 550) ÷ 2 = 500 美元；生产者剩余增加 = (6 − 5) × (450 + 550) ÷ 2 = 500 美元。</li>
                <li>福利损失 = 1100 − 500 − 500 = 100 美元 = ½ × 2 × (550 − 450)。</li>
              </ul>
            </Callout>
            <Callout title="考试提示">
              <p>
                先在图上标出所有相关价格和数量，再用矩形（底 × 高）和三角形（½ × 底 × 高）计算；最后用「剩余变化 = 政府收支 + 福利损失」验算。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              All four examples use the same market: without intervention the equilibrium price is $5 and the equilibrium quantity 450 units; demand meets the price axis at $9.50 and supply at $0.50. Before intervention, consumer surplus = producer surplus = ½ × 450 × 4.5 = $1012.5, and consumer spending = producer revenue = 5 × 450 = $2250.
            </p>
            <Callout title="Example 1: a price ceiling of $3.50">
              <PriceCeiling numeric caption="Figure 8 A price ceiling of $3.50: quantity supplied 300, quantity demanded 600." />
              <ul>
                <li>Shortage = 600 − 300 = 300 units; quantity traded = 300.</li>
                <li>Consumer spending = producer revenue = 3.50 × 300 = $1050 (was $2250).</li>
                <li>Consumer surplus = the trapezium below demand and above $3.50 from 0 to 300 = 300 × [(9.50 + 6.50) ÷ 2 − 3.50] = $1350 (up $337.5).</li>
                <li>Producer surplus = ½ × 300 × (3.50 − 0.50) = $450 (down $562.5).</li>
                <li>Welfare loss = ½ × (6.50 − 3.50) × (450 − 300) = $225. Check: 2025 − (1350 + 450) = 225.</li>
              </ul>
            </Callout>
            <Callout title="Example 2: a price floor of $6.50 with the surplus bought by the government">
              <PriceFloor numeric buy caption="Figure 9 A price floor of $6.50: quantity demanded 300, quantity supplied 600; the government buys the surplus of 300 units." />
              <ul>
                <li>Surplus = 600 − 300 = 300 units.</li>
                <li>Government spending = 6.50 × 300 = $1950.</li>
                <li>Consumer spending = 6.50 × 300 = $1950; consumer surplus = ½ × 300 × (9.50 − 6.50) = $450 (down $562.5).</li>
                <li>Producer revenue = 6.50 × 600 = $3900 ($1950 of it from the government); producer surplus = ½ × 600 × (6.50 − 0.50) = $1800 (up $787.5).</li>
                <li>If the government did not buy the surplus, only 300 units would be traded and the welfare loss would be ½ × (6.50 − 3.50) × (450 − 300) = $225 (the triangle in Figure 2).</li>
              </ul>
            </Callout>
            <Callout title="Example 3: a specific tax of $2 per unit">
              <IndirectTax numeric caption="Figure 10 A specific tax of $2 per unit: consumers pay $6, producers receive $4, quantity 350." />
              <ul>
                <li>Government tax revenue = 2 × 350 = $700.</li>
                <li>Consumer burden = (6 − 5) × 350 = $350; producer burden = (5 − 4) × 350 = $350 (50% each).</li>
                <li>Consumer spending = 6 × 350 = $2100; producer revenue (after tax) = 4 × 350 = $1400.</li>
                <li>Consumer surplus = ½ × 350 × (9.50 − 6) = $612.5 (down $400); producer surplus = ½ × 350 × (4 − 0.50) = $612.5 (down $400).</li>
                <li>Welfare loss = ½ × 2 × (450 − 350) = $100. Check: total surplus falls by 800 = revenue 700 + welfare loss 100.</li>
              </ul>
            </Callout>
            <Callout title="Example 4: a subsidy of $2 per unit">
              <Subsidy numeric caption="Figure 11 A subsidy of $2 per unit: consumers pay $4, producers receive $6, quantity 550." />
              <ul>
                <li>Government spending = 2 × 550 = $1100.</li>
                <li>Consumer spending = 4 × 550 = $2200; producer revenue (including subsidy) = 6 × 550 = $3300.</li>
                <li>Gain in consumer surplus = (5 − 4) × (450 + 550) ÷ 2 = $500; gain in producer surplus = (6 − 5) × (450 + 550) ÷ 2 = $500.</li>
                <li>Welfare loss = 1100 − 500 − 500 = $100 = ½ × 2 × (550 − 450).</li>
              </ul>
            </Callout>
            <Callout title="Exam tip">
              <p>
                Label every relevant price and quantity on the diagram first, then use rectangles (base × height) and triangles (½ × base × height). Finish by checking that the change in total surplus equals government revenue or spending plus the welfare loss.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "consequences",
      level: "both",
      title: { zh: "政府干预的后果：比较与评价", en: "Consequences of intervention: comparison and evaluation" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>措施</th>
                  <th>价格</th>
                  <th>数量</th>
                  <th>政府预算</th>
                  <th>主要问题</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>最高限价</td>
                  <td>下降</td>
                  <td>下降（短缺）</td>
                  <td>基本无影响</td>
                  <td>短缺、黑市、质量下降</td>
                </tr>
                <tr>
                  <td>最低限价</td>
                  <td>上升</td>
                  <td>下降（过剩）</td>
                  <td>收购过剩时支出增加</td>
                  <td>过剩、浪费、倾销</td>
                </tr>
                <tr>
                  <td>间接税</td>
                  <td>消费者价格上升</td>
                  <td>下降</td>
                  <td>收入增加</td>
                  <td>累退性、走私</td>
                </tr>
                <tr>
                  <td>补贴</td>
                  <td>消费者价格下降</td>
                  <td>上升</td>
                  <td>支出增加</td>
                  <td>机会成本、依赖补贴</td>
                </tr>
                <tr>
                  <td>直接提供</td>
                  <td>免费或低价</td>
                  <td>上升</td>
                  <td>支出增加</td>
                  <td>效率低、排队</td>
                </tr>
                <tr>
                  <td>管制与立法</td>
                  <td>可能上升（合规成本）</td>
                  <td>按规定</td>
                  <td>执法成本</td>
                  <td>监督难、一刀切</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价（Evaluation）框架">
              <ul>
                <li><strong>短期与长期：</strong>弹性随时间增大，价格管制造成的短缺或过剩在长期更严重。</li>
                <li><strong>利益相关者：</strong>几乎每种干预都有得有失，要说明谁受益、谁受损。</li>
                <li><strong>弹性：</strong>PED 和 PES 决定税负和补贴好处的分配以及政策效果的大小。</li>
                <li><strong>政府失灵（government failure）：</strong>信息不足、政治压力、意外后果可能让干预使结果变得更糟。</li>
                <li><strong>替代方案：</strong>比较不同政策，例如用收入补助代替价格管制，用税收配合教育和管制。</li>
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
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Government budget</th>
                  <th>Main problems</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Price ceiling</td>
                  <td>Falls</td>
                  <td>Falls (shortage)</td>
                  <td>Little direct effect</td>
                  <td>Shortages, parallel markets, lower quality</td>
                </tr>
                <tr>
                  <td>Price floor</td>
                  <td>Rises</td>
                  <td>Falls (surplus)</td>
                  <td>Spending if the surplus is bought</td>
                  <td>Surpluses, waste, dumping</td>
                </tr>
                <tr>
                  <td>Indirect tax</td>
                  <td>Consumer price rises</td>
                  <td>Falls</td>
                  <td>Revenue rises</td>
                  <td>Regressive, smuggling</td>
                </tr>
                <tr>
                  <td>Subsidy</td>
                  <td>Consumer price falls</td>
                  <td>Rises</td>
                  <td>Spending rises</td>
                  <td>Opportunity cost, dependency</td>
                </tr>
                <tr>
                  <td>Direct provision</td>
                  <td>Free or low</td>
                  <td>Rises</td>
                  <td>Spending rises</td>
                  <td>Inefficiency, queues</td>
                </tr>
                <tr>
                  <td>Regulation and legislation</td>
                  <td>May rise (compliance costs)</td>
                  <td>As set by the rule</td>
                  <td>Enforcement costs</td>
                  <td>Hard to monitor, one size fits all</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation framework">
              <ul>
                <li><strong>Short run vs long run:</strong> elasticities rise over time, so shortages and surpluses from price controls grow in the long run.</li>
                <li><strong>Stakeholders:</strong> almost every intervention has gainers and losers; say who they are.</li>
                <li><strong>Elasticity:</strong> PED and PES decide how a tax burden or subsidy benefit is shared and how large the policy&apos;s effect is.</li>
                <li><strong>Government failure:</strong> poor information, political pressure and unintended consequences can make the outcome worse.</li>
                <li><strong>Alternatives:</strong> compare policies, e.g. income support instead of price controls, or taxes combined with education and regulation.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.7 Role of government in microeconomics",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 3.4 Price Ceilings and Price Floors",
      href: "https://openstax.org/books/principles-economics-3e/pages/3-4-price-ceilings-and-price-floors",
    },
    {
      label: "OpenStax Principles of Economics 3e — 5.3 Elasticity and Pricing (tax incidence)",
      href: "https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing",
    },
    {
      label: "Economics Help — Ad valorem tax",
      href: "https://www.economicshelp.org/blog/2383/economics/ad-valorem-tax/",
    },
  ],
};

export default notes;
