import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, HL } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Line, Region, atX, intersect, shift, type Seg } from "@/components/notes/Chart";

function AllocativeEfficiency({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [0, 90],
    [80, 10],
  ];
  const S: Seg = [
    [0, 10],
    [80, 90],
  ];
  const e = intersect(D, S);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Region points={[[0, 90], e, [0, e[1]]]} fill="a" label="CS" />
      <Region points={[[0, e[1]], e, [0, 10]]} fill="b" label="PS" />
      <Line points={D} label="D = MSB" />
      <Line points={S} label="S = MSC" />
      <Guide at={e} x="Q*" y="P*" />
      <Dot at={e} label="E" labelOffset={[12, 4]} />
    </Chart>
  );
}

const D_EXT: Seg = [
  [5, 90],
  [76, 19],
];

function NegativeProduction({ caption }: { caption: ReactNode }) {
  const MPC: Seg = [
    [5, 10],
    [80, 70],
  ];
  const MSC = shift(MPC, 0, 22);
  const m = intersect(D_EXT, MPC);
  const o = intersect(D_EXT, MSC);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Region points={[o, atX(MSC, m[0]), m]} fill="c" label="WL" />
      <Line points={D_EXT} label="D = MPB = MSB" />
      <Line points={MPC} label="S = MPC" />
      <Line points={MSC} label="MSC" tone="alt" />
      <Guide at={o} x="Q*" y="P*" />
      <Guide at={m} x="Qₘ" y="Pₘ" />
      <Dot at={o} />
      <Dot at={m} />
    </Chart>
  );
}

const S_CONS: Seg = [
  [5, 10],
  [80, 85],
];

function NegativeConsumption({ caption }: { caption: ReactNode }) {
  const MPB: Seg = [
    [5, 90],
    [80, 15],
  ];
  const MSB: Seg = [
    [5, 68],
    [68, 5],
  ];
  const m = intersect(MPB, S_CONS);
  const o = intersect(MSB, S_CONS);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Region points={[o, m, atX(MSB, m[0])]} fill="c" label="WL" />
      <Line points={MPB} label="D = MPB" />
      <Line points={MSB} label="MSB" tone="alt" />
      <Line points={S_CONS} label="S = MPC = MSC" labelOffset={[-40, -10]} />
      <Guide at={o} x="Q*" y="P*" />
      <Guide at={m} x="Qₘ" y="Pₘ" />
      <Dot at={o} />
      <Dot at={m} />
    </Chart>
  );
}

function PositiveProduction({ caption }: { caption: ReactNode }) {
  const MPC: Seg = [
    [5, 24],
    [80, 84],
  ];
  const MSC = shift(MPC, 0, -28);
  const m = intersect(D_EXT, MPC);
  const o = intersect(D_EXT, MSC);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Region points={[atX(D_EXT, m[0]), atX(MSC, m[0]), o]} fill="c" label="WL" labelAt={[46, 43.5]} />
      <Line points={D_EXT} label="D = MPB = MSB" />
      <Line points={MPC} label="S = MPC" />
      <Line points={[atX(MSC, 15), atX(MSC, 80)]} label="MSC" tone="alt" />
      <Guide at={m} x="Qₘ" y="Pₘ" />
      <Guide at={o} x="Q*" y="P*" />
      <Dot at={m} />
      <Dot at={o} />
    </Chart>
  );
}

const MPB_POS: Seg = [
  [5, 65],
  [65, 5],
];
const MSB_POS: Seg = [
  [5, 93],
  [80, 18],
];

function PositiveConsumption({ caption }: { caption: ReactNode }) {
  const m = intersect(MPB_POS, S_CONS);
  const o = intersect(MSB_POS, S_CONS);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Region points={[atX(MSB_POS, m[0]), m, o]} fill="c" label="WL" labelAt={[36.5, 55.5]} />
      <Line points={MPB_POS} label="D = MPB" />
      <Line points={MSB_POS} label="MSB" tone="alt" />
      <Line points={S_CONS} label="S = MPC = MSC" labelOffset={[-40, -10]} />
      <Guide at={m} x="Qₘ" y="Pₘ" />
      <Guide at={o} x="Q*" y="P*" />
      <Dot at={m} />
      <Dot at={o} />
    </Chart>
  );
}

function PigouvianTax({ caption }: { caption: ReactNode }) {
  const MPC: Seg = [
    [5, 10],
    [72, 63.6],
  ];
  const MSC = shift(MPC, 0, 22);
  const m = intersect(D_EXT, MPC);
  const o = intersect(D_EXT, MSC);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Line points={D_EXT} label="D = MSB" />
      <Line points={MPC} label="S₁ = MPC" />
      <Line points={MSC} label="MSC = MPC + tax" tone="alt" />
      <Arrow from={[60, 56.5]} to={[60, 73]} />
      <Guide at={o} x="Q*" y="P*" />
      <Guide at={m} x="Qₘ" y="Pₘ" />
      <Dot at={o} />
      <Dot at={m} />
    </Chart>
  );
}

function CarbonTax({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [0, 80],
    [90, 35],
  ];
  const S1: Seg = [
    [25, 10],
    [62, 84],
  ];
  const S2: Seg = [
    [12, 14],
    [49, 88],
  ];
  const e1 = intersect(D, S1);
  const e2 = intersect(D, S2);
  const pp = atX(S1, e2[0]);
  return (
    <Chart x="Quantity of coal-fired electricity" y="Price" caption={caption}>
      <Region
        points={[[0, e2[1]], e2, pp, [0, pp[1]]]}
        fill="a"
        label="Tax revenue"
        labelAt={[11, 45]}
      />
      <Line points={D} label="D" />
      <Line points={S1} label="S₁" labelOffset={[6, 10]} />
      <Line points={S2} label="S₂ = S₁ + tax" tone="alt" />
      <Arrow from={[55, 75]} to={[45, 75]} />
      <Guide at={e2} x="Q₂" y="P₂" />
      <Guide at={e1} x="Q₁" y="P₁" />
      <Guide at={pp} y="Pₚ" />
      <Dot at={e1} />
      <Dot at={e2} />
    </Chart>
  );
}

function Subsidy({ caption }: { caption: ReactNode }) {
  const S2 = shift(S_CONS, 0, -28);
  const m = intersect(MPB_POS, S_CONS);
  const o = intersect(MSB_POS, S_CONS);
  const c = intersect(MPB_POS, S2);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Region
        points={[[0, o[1]], o, c, [0, c[1]]]}
        fill="b"
        label="Subsidy cost"
        labelAt={[12, 30]}
      />
      <Line points={MPB_POS} label="D = MPB" />
      <Line points={MSB_POS} label="MSB" tone="muted" />
      <Line points={S_CONS} label="S₁ = MSC" />
      <Line points={[atX(S2, 28), atX(S2, 80)]} label="S₂" tone="alt" />
      <Guide at={m} x="Qₘ" y="P₁" />
      <Guide at={o} x="Q*" y="Pₚ" />
      <Guide at={c} y="P₂" />
      <Dot at={m} />
      <Dot at={o} />
      <Dot at={c} />
    </Chart>
  );
}

function Legislation({ caption }: { caption: ReactNode }) {
  const MPB1: Seg = [
    [5, 90],
    [80, 15],
  ];
  const MPB2: Seg = [
    [5, 68],
    [68, 5],
  ];
  const m = intersect(MPB1, S_CONS);
  const o = intersect(MPB2, S_CONS);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Line points={MPB1} label="D₁ = MPB" />
      <Line points={MPB2} label="D₂ = MSB" tone="alt" />
      <Line points={S_CONS} label="S = MSC" />
      <Arrow from={[33, 61]} to={[15, 61]} />
      <Guide at={m} x="Qₘ" y="Pₘ" />
      <Guide at={o} x="Q*" y="P*" />
      <Dot at={m} />
      <Dot at={o} />
    </Chart>
  );
}

function Education({ caption }: { caption: ReactNode }) {
  const m = intersect(MPB_POS, S_CONS);
  const o = intersect(MSB_POS, S_CONS);
  return (
    <Chart x="Quantity" y="Price, costs, benefits" caption={caption}>
      <Line points={MPB_POS} label="D₁ = MPB" />
      <Line points={MSB_POS} label="D₂ = MSB" tone="alt" />
      <Line points={S_CONS} label="S = MSC" />
      <Arrow from={[12, 60]} to={[36, 60]} />
      <Guide at={m} x="Qₘ" y="Pₘ" />
      <Guide at={o} x="Q*" y="P*" />
      <Dot at={m} />
      <Dot at={o} />
    </Chart>
  );
}

function Permits({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [5, 90],
    [85, 10],
  ];
  const S1: Seg = [
    [60, 0],
    [60, 88],
  ];
  const S2: Seg = [
    [40, 0],
    [40, 88],
  ];
  const e1 = intersect(D, S1);
  const e2 = intersect(D, S2);
  return (
    <Chart x="Quantity of permits (tonnes CO₂)" y="Permit price" caption={caption}>
      <Line points={D} label="D" />
      <Line points={S1} label="S₁" labelOffset={[-8, -8]} />
      <Line points={S2} label="S₂" tone="alt" labelOffset={[-8, -8]} />
      <Arrow from={[57, 78]} to={[43, 78]} />
      <Guide at={e1} x="Q₁" y="P₁" />
      <Guide at={e2} x="Q₂" y="P₂" />
      <Dot at={e1} />
      <Dot at={e2} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "当市场产量偏离边际社会收益等于边际社会成本（MSB = MSC）的社会最优产量时，就出现市场失灵和福利损失。本节讲配置效率、生产与消费的正负外部性、优值品与劣值品、公共资源与公地悲剧，以及税收、补贴、管制、教育、可交易许可证、国际协议和集体自治等政策的效果与评价。HL 还要会从图中计算福利损失。",
    en: "Markets fail when output differs from the social optimum where marginal social benefit equals marginal social cost (MSB = MSC), creating a welfare loss. This topic covers allocative efficiency, negative and positive externalities of production and consumption, merit and demerit goods, common pool resources and the tragedy of the commons, and how far taxes, subsidies, regulation, education, tradable permits, international agreements and collective self-governance can fix them. HL also calculates welfare loss from a diagram.",
  },
  sections: [
    {
      id: "allocative-efficiency",
      level: "both",
      title: { zh: "社会最优产量与配置效率", en: "Socially optimum output and allocative efficiency" },
      body: {
        zh: (
          <>
            <Def term="Marginal social benefit (MSB)">
              多生产并消费一单位商品给<strong>整个社会</strong>带来的额外收益，等于边际私人收益（MPB）加上任何外部收益。
            </Def>
            <Def term="Marginal social cost (MSC)">
              多生产一单位商品给<strong>整个社会</strong>带来的额外成本，等于边际私人成本（MPC）加上任何外部成本。
            </Def>
            <Def term="Allocative efficiency">
              资源的配置使社会福利最大：生产的正是社会最想要的数量，条件是 <strong>MSB = MSC</strong>。此时社会剩余（social/community surplus，即消费者剩余 + 生产者剩余）最大。
            </Def>
            <p>
              竞争市场中，需求曲线代表边际收益，供给曲线代表边际成本。如果没有外部性，MPB = MSB，MPC = MSC，市场均衡 E 就是社会最优点：在 Q* 之前，每多一单位带来的社会收益都大于成本，值得生产；超过 Q* 后，成本大于收益，生产就是浪费。
            </p>
            <AllocativeEfficiency caption="图 1 配置效率：没有外部性时，市场在 MSB = MSC 处生产 Q*，消费者剩余（CS）与生产者剩余（PS）之和，即社会剩余，达到最大。" />
            <Def term="Market failure">
              市场在没有政府干预时无法实现配置效率，资源被过度或不足配置，产量偏离 MSB = MSC，造成福利损失（welfare loss）。
            </Def>
            <Callout title="考试提示">
              <p>
                画外部性的图时，纵轴写 Price, costs, benefits，横轴写 Quantity。答题时先说明「社会最优在 MSB = MSC」，再指出市场产量在哪里、偏离了多少，最后点出福利损失三角形。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Marginal social benefit (MSB)">
              The extra benefit to <strong>society as a whole</strong> from producing and consuming one more unit of a good: marginal private benefit (MPB) plus any external benefit.
            </Def>
            <Def term="Marginal social cost (MSC)">
              The extra cost to <strong>society as a whole</strong> of producing one more unit: marginal private cost (MPC) plus any external cost.
            </Def>
            <Def term="Allocative efficiency">
              Resources are allocated so that society&apos;s welfare is maximised: exactly the quantity society most wants is produced, where <strong>MSB = MSC</strong>. Social (community) surplus, i.e. consumer surplus plus producer surplus, is maximised.
            </Def>
            <p>
              In a competitive market the demand curve shows marginal benefit and the supply curve shows marginal cost. With no externalities, MPB = MSB and MPC = MSC, so the market equilibrium E is the social optimum. Up to Q*, each unit adds more to social benefit than to social cost, so it is worth producing; beyond Q*, cost exceeds benefit and output would be wasteful.
            </p>
            <AllocativeEfficiency caption="Figure 1 Allocative efficiency: with no externalities the market produces Q* where MSB = MSC, and the sum of consumer surplus (CS) and producer surplus (PS), i.e. social surplus, is maximised." />
            <Def term="Market failure">
              The failure of a free market to achieve allocative efficiency: too many or too few resources are allocated to a good, so output is not where MSB = MSC and there is a welfare loss.
            </Def>
            <Callout title="Exam tip">
              <p>
                On externality diagrams label the vertical axis Price, costs, benefits and the horizontal axis Quantity. In answers, state that the optimum is where MSB = MSC, show where the market actually produces, then identify the welfare loss triangle.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "negative-externalities",
      level: "both",
      title: { zh: "负外部性与劣值品", en: "Negative externalities and demerit goods" },
      body: {
        zh: (
          <>
            <Def term="Externality">
              生产或消费活动对没有直接参与交易的第三方（third party）产生的影响，且这种影响没有通过价格得到补偿。有害的是负外部性（外部成本），有益的是正外部性（外部收益）。
            </Def>
            <h3>生产的负外部性（Negative externality of production）</h3>
            <p>
              生产过程给第三方带来外部成本，例如工厂排放污染空气和河流，渔民和附近居民承担损失。此时 <strong>MSC &gt; MPC</strong>，MSC 位于 MPC 上方，两者的垂直距离就是每单位的外部成本。企业只考虑私人成本，因此市场在 MPB = MPC 处生产 Qₘ，高于社会最优 Q*：资源<strong>过度配置</strong>，价格 Pₘ 过低。
            </p>
            <NegativeProduction caption="图 2 生产的负外部性：市场产量 Qₘ 大于社会最优 Q*。从 Q* 到 Qₘ，每单位的 MSC 都大于 MSB，深色三角形 WL 是福利损失（welfare loss）。" />
            <h3>消费的负外部性（Negative externality of consumption）</h3>
            <p>
              消费给第三方带来外部成本，例如吸烟产生二手烟、酒后驾驶、深夜大声播放音乐、开车造成拥堵。此时 <strong>MSB &lt; MPB</strong>，MSB 位于 MPB 下方。消费者只考虑私人收益，市场在 MPB = MSC 处消费 Qₘ，大于 Q*，资源过度配置。
            </p>
            <NegativeConsumption caption="图 3 消费的负外部性：MSB 低于 MPB，市场消费 Qₘ 大于社会最优 Q*。从 Q* 到 Qₘ，MSC 大于 MSB，深色三角形 WL 是福利损失。" />
            <Def term="Demerit goods">
              对消费者本人和社会都有害的商品，例如香烟、酒精、含糖饮料。如果放任市场，它们会被<strong>过度消费</strong>，原因是消费产生负外部性，且消费者常常低估对自己的危害（信息不完全）。
            </Def>
            <HL>
              <h3>计算：从图中计算福利损失</h3>
              <p>福利损失三角形的底是市场产量与最优产量之差，高是在 Qₘ 处 MSC 与 MSB 的垂直距离。</p>
              <Formula>福利损失 = ½ × (Qₘ − Q*) × (Qₘ 处 MSC − Qₘ 处 MSB)</Formula>
              <Callout title="例题">
                <p>
                  某化工产品市场：市场产量 Qₘ = 100 吨，社会最优 Q* = 80 吨。在 Qₘ 处，MSC = $26，MSB = MPB = $20（MSC 与 MPC 平行，每吨外部成本 $6）。
                </p>
                <ol>
                  <li>底 = 100 − 80 = 20 吨</li>
                  <li>高 = 26 − 20 = $6</li>
                  <li>福利损失 = ½ × 20 × 6 = <strong>$60</strong></li>
                </ol>
              </Callout>
            </HL>
          </>
        ),
        en: (
          <>
            <Def term="Externality">
              An effect of production or consumption on a third party not directly involved in the transaction, which is not reflected in the market price. A harmful effect is a negative externality (external cost); a beneficial one is a positive externality (external benefit).
            </Def>
            <h3>Negative externality of production</h3>
            <p>
              Production imposes external costs on third parties, e.g. a factory polluting the air and a river, harming local residents and fishers. Here <strong>MSC &gt; MPC</strong>: MSC lies above MPC, and the vertical gap is the external cost per unit. Firms consider only private costs, so the market produces Qₘ where MPB = MPC, above the optimum Q*. Too many resources are allocated to the good (<strong>over-allocation</strong>) and the price Pₘ is too low.
            </p>
            <NegativeProduction caption="Figure 2 Negative externality of production: market output Qₘ exceeds the social optimum Q*. For every unit from Q* to Qₘ, MSC exceeds MSB; the dark triangle WL is the welfare loss." />
            <h3>Negative externality of consumption</h3>
            <p>
              Consumption imposes external costs on third parties, e.g. second-hand smoke, drink-driving, loud music late at night or traffic congestion. Here <strong>MSB &lt; MPB</strong>: MSB lies below MPB. Consumers consider only private benefits, so the market consumes Qₘ where MPB = MSC, above Q*, again an over-allocation of resources.
            </p>
            <NegativeConsumption caption="Figure 3 Negative externality of consumption: MSB lies below MPB, so market consumption Qₘ exceeds the optimum Q*. From Q* to Qₘ, MSC exceeds MSB; the dark triangle WL is the welfare loss." />
            <Def term="Demerit goods">
              Goods that are harmful to the people who consume them and to society, e.g. cigarettes, alcohol and sugary drinks. Left to the market they are <strong>over-consumed</strong>, because consumption creates negative externalities and consumers often underestimate the harm to themselves (imperfect information).
            </Def>
            <HL>
              <h3>Calculation: welfare loss from a diagram</h3>
              <p>The welfare loss triangle has a base equal to the gap between market and optimum output, and a height equal to the vertical gap between MSC and MSB at Qₘ.</p>
              <Formula>Welfare loss = ½ × (Qₘ − Q*) × (MSC at Qₘ − MSB at Qₘ)</Formula>
              <Callout title="Worked example">
                <p>
                  In a chemicals market, market output is Qₘ = 100 tonnes and the social optimum is Q* = 80 tonnes. At Qₘ, MSC = $26 and MSB = MPB = $20 (MSC is parallel to MPC, so the external cost is $6 per tonne).
                </p>
                <ol>
                  <li>Base = 100 − 80 = 20 tonnes</li>
                  <li>Height = 26 − 20 = $6</li>
                  <li>Welfare loss = ½ × 20 × 6 = <strong>$60</strong></li>
                </ol>
              </Callout>
            </HL>
          </>
        ),
      },
    },
    {
      id: "positive-externalities",
      level: "both",
      title: { zh: "正外部性与优值品", en: "Positive externalities and merit goods" },
      body: {
        zh: (
          <>
            <h3>生产的正外部性（Positive externality of production）</h3>
            <p>
              生产过程给第三方带来外部收益，例如企业培训员工，员工跳槽后把技能带到别的公司；企业研发（R&amp;D）产生的新技术被其他企业借鉴；养蜂人的蜜蜂为附近果园授粉。此时 <strong>MSC &lt; MPC</strong>，MSC 位于 MPC 下方。企业得不到外部收益的回报，市场只在 MPB = MPC 处生产 Qₘ，低于社会最优 Q*：资源<strong>配置不足</strong>（under-allocation）。
            </p>
            <PositiveProduction caption="图 4 生产的正外部性：MSC 低于 MPC，市场产量 Qₘ 小于社会最优 Q*。从 Qₘ 到 Q*，MSB 大于 MSC，这些本该生产的单位没有被生产，深色三角形 WL 是福利损失。" />
            <h3>消费的正外部性（Positive externality of consumption）</h3>
            <p>
              消费给第三方带来外部收益，例如接种疫苗降低了他人的感染风险，受教育的人提高社会生产率、减少犯罪。此时 <strong>MSB &gt; MPB</strong>，MSB 位于 MPB 上方。消费者只看自己的收益，市场在 MPB = MSC 处消费 Qₘ，低于 Q*，资源配置不足。
            </p>
            <PositiveConsumption caption="图 5 消费的正外部性：MSB 高于 MPB，市场消费 Qₘ 小于社会最优 Q*。从 Qₘ 到 Q*，MSB 大于 MSC，深色三角形 WL 是福利损失。" />
            <Def term="Merit goods">
              对消费者本人和社会都有益的商品，例如教育、医疗、疫苗。如果放任市场，它们会<strong>消费不足</strong>，原因是消费产生正外部性、消费者低估其好处（信息不完全），而且低收入者可能负担不起。
            </Def>
            <HL>
              <h3>计算：正外部性的福利损失</h3>
              <p>正外部性时 Qₘ 小于 Q*，底变成 Q* − Qₘ，高是 Qₘ 处 MSB 与 MSC 的垂直距离。</p>
              <Formula>福利损失 = ½ × (Q* − Qₘ) × (Qₘ 处 MSB − Qₘ 处 MSC)</Formula>
              <Callout title="例题">
                <p>
                  流感疫苗市场：市场接种量 Qₘ = 40 万剂，社会最优 Q* = 50 万剂。在 Qₘ 处，MPB = MSC = $30，MSB = $38（MSB 与 MPB 平行，每剂外部收益 $8）。
                </p>
                <ol>
                  <li>底 = 50 − 40 = 10 万剂</li>
                  <li>高 = 38 − 30 = $8</li>
                  <li>福利损失 = ½ × 100 000 × 8 = <strong>$400 000</strong></li>
                </ol>
              </Callout>
            </HL>
            <Callout title="考试提示">
              <p>
                判断方向的简便方法：负外部性 → 市场「太多」（Qₘ &gt; Q*）；正外部性 → 市场「太少」（Qₘ &lt; Q*）。生产外部性移动的是<strong>成本</strong>曲线（MSC ≠ MPC），消费外部性移动的是<strong>收益</strong>曲线（MSB ≠ MPB）。福利损失三角形的顶点永远在社会最优点上。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <h3>Positive externality of production</h3>
            <p>
              Production creates external benefits for third parties, e.g. a firm trains workers who later take their skills to other employers; a firm&apos;s research and development (R&amp;D) produces ideas that other firms copy; a beekeeper&apos;s bees pollinate nearby orchards. Here <strong>MSC &lt; MPC</strong>: MSC lies below MPC. Firms are not rewarded for the external benefit, so the market produces only Qₘ where MPB = MPC, below the optimum Q*: an <strong>under-allocation</strong> of resources.
            </p>
            <PositiveProduction caption="Figure 4 Positive externality of production: MSC lies below MPC, so market output Qₘ is below the social optimum Q*. Between Qₘ and Q*, MSB exceeds MSC, so these worthwhile units are not produced; the dark triangle WL is the welfare loss." />
            <h3>Positive externality of consumption</h3>
            <p>
              Consumption creates external benefits for third parties, e.g. vaccination lowers the risk of infection for others, and educated people raise productivity and reduce crime. Here <strong>MSB &gt; MPB</strong>: MSB lies above MPB. Consumers look only at their own benefit, so the market consumes Qₘ where MPB = MSC, below Q*, an under-allocation of resources.
            </p>
            <PositiveConsumption caption="Figure 5 Positive externality of consumption: MSB lies above MPB, so market consumption Qₘ is below the optimum Q*. Between Qₘ and Q*, MSB exceeds MSC; the dark triangle WL is the welfare loss." />
            <Def term="Merit goods">
              Goods that are beneficial to the people who consume them and to society, e.g. education, health care and vaccines. Left to the market they are <strong>under-consumed</strong>, because consumption creates positive externalities, consumers underestimate the benefits (imperfect information), and people on low incomes may not be able to afford them.
            </Def>
            <HL>
              <h3>Calculation: welfare loss with a positive externality</h3>
              <p>With a positive externality Qₘ is below Q*, so the base is Q* − Qₘ and the height is the vertical gap between MSB and MSC at Qₘ.</p>
              <Formula>Welfare loss = ½ × (Q* − Qₘ) × (MSB at Qₘ − MSC at Qₘ)</Formula>
              <Callout title="Worked example">
                <p>
                  In the market for flu vaccines, market consumption is Qₘ = 400 000 doses and the social optimum is Q* = 500 000 doses. At Qₘ, MPB = MSC = $30 and MSB = $38 (MSB is parallel to MPB, so the external benefit is $8 per dose).
                </p>
                <ol>
                  <li>Base = 500 000 − 400 000 = 100 000 doses</li>
                  <li>Height = 38 − 30 = $8</li>
                  <li>Welfare loss = ½ × 100 000 × 8 = <strong>$400 000</strong></li>
                </ol>
              </Callout>
            </HL>
            <Callout title="Exam tip">
              <p>
                A quick check on direction: negative externality → the market produces too much (Qₘ &gt; Q*); positive externality → too little (Qₘ &lt; Q*). Production externalities separate the <strong>cost</strong> curves (MSC ≠ MPC); consumption externalities separate the <strong>benefit</strong> curves (MSB ≠ MPB). The welfare loss triangle always points towards the social optimum.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "common-pool-resources",
      level: "both",
      title: { zh: "公共资源与公地悲剧", en: "Common pool resources and the tragedy of the commons" },
      body: {
        zh: (
          <>
            <Def term="Common pool resources">
              不属于任何人、人人都可使用的资源，例如公海鱼类、地下水、森林、牧场、清洁空气。它们具有<strong>竞争性</strong>（rivalrous：一个人用了，留给别人的就少了）但<strong>非排他性</strong>（non-excludable：很难或无法阻止别人使用）。
            </Def>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>排他性 Excludable</th>
                  <th>非排他性 Non-excludable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>竞争性 Rivalrous</td>
                  <td>私人物品：面包、手机</td>
                  <td><strong>公共资源</strong>：鱼群、地下水、森林</td>
                </tr>
                <tr>
                  <td>非竞争性 Non-rivalrous</td>
                  <td>俱乐部物品：流媒体订阅、收费桥</td>
                  <td>公共物品：灯塔、国防（见 2.9）</td>
                </tr>
              </tbody>
            </table>
            <Def term="Tragedy of the commons">
              每个使用者只考虑自己的私人收益，而把资源减少的成本分摊给所有人，于是人人都过度使用，最终资源被耗尽，所有人都受损。这一说法来自生态学家哈丁（Garrett Hardin，1968）。
            </Def>
            <p>
              以渔场为例：每条渔船多捕一吨鱼，收益全归自己，而鱼群减少的代价由所有渔民和后代共同承担。没有价格限制使用，结果是过度捕捞、鱼群崩溃。由于没有人拥有资源，也就没有市场价格去反映它的稀缺，这是一种市场失灵。
            </p>
            <h3>不可持续的生产与负外部性</h3>
            <p>
              对公共资源的过度使用往往就是<strong>不可持续的生产</strong>，同时产生负外部性：
            </p>
            <ul>
              <li>燃烧化石燃料：空气是公共资源，排放温室气体导致气候变化，代价由全世界承担。</li>
              <li>砍伐热带雨林：生物多样性丧失、碳汇减少、土壤侵蚀。</li>
              <li>过度捕捞与过度抽取地下水：资源再生速度跟不上消耗速度。</li>
              <li>不可持续的农业：过度放牧、过量使用化肥导致土壤退化和水体污染。</li>
            </ul>
            <Callout title="例子">
              <p>
                1992 年，加拿大纽芬兰的鳕鱼渔场因长期过度捕捞而崩溃，政府被迫全面禁捕，约 3 万多人失业，鳕鱼数量几十年后仍未完全恢复。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Common pool resources">
              Resources that no one owns and that anyone can use, e.g. fish stocks in the open sea, groundwater, forests, pastures and clean air. They are <strong>rivalrous</strong> (one person&apos;s use reduces what is left for others) but <strong>non-excludable</strong> (it is difficult or impossible to stop people using them).
            </Def>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Excludable</th>
                  <th>Non-excludable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rivalrous</td>
                  <td>Private goods: bread, phones</td>
                  <td><strong>Common pool resources</strong>: fish stocks, groundwater, forests</td>
                </tr>
                <tr>
                  <td>Non-rivalrous</td>
                  <td>Club goods: streaming subscriptions, toll bridges</td>
                  <td>Public goods: lighthouses, national defence (see 2.9)</td>
                </tr>
              </tbody>
            </table>
            <Def term="Tragedy of the commons">
              Each user considers only their own private benefit while the cost of depleting the resource is shared by everyone, so all users over-use it until it is exhausted and everyone is worse off. The term comes from the ecologist Garrett Hardin (1968).
            </Def>
            <p>
              Take a fishery: each boat keeps the whole benefit of catching one more tonne of fish, while the cost of a smaller fish stock falls on all fishers and future generations. With no price to ration use, the result is overfishing and collapse. Because no one owns the resource, there is no market price to signal its scarcity, which is a form of market failure.
            </p>
            <h3>Unsustainable production and negative externalities</h3>
            <p>
              Over-use of common pool resources is often <strong>unsustainable production</strong> that also creates negative externalities:
            </p>
            <ul>
              <li>Burning fossil fuels: the atmosphere is a common pool resource, and greenhouse gas emissions cause climate change whose costs fall on the whole world.</li>
              <li>Clearing tropical rainforest: loss of biodiversity, fewer carbon sinks and soil erosion.</li>
              <li>Overfishing and over-extraction of groundwater: the resource is used faster than it can regenerate.</li>
              <li>Unsustainable agriculture: overgrazing and heavy fertiliser use degrade soil and pollute water.</li>
            </ul>
            <Callout title="Real-world example">
              <p>
                In 1992 the cod fishery off Newfoundland, Canada, collapsed after years of overfishing. The government imposed a moratorium that put over 30 000 people out of work, and cod stocks had still not fully recovered decades later.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "taxes",
      level: "both",
      title: { zh: "政府应对：庇古税与碳税", en: "Government responses: Pigouvian and carbon taxes" },
      body: {
        zh: (
          <>
            <Def term="Pigouvian tax">
              对产生负外部性的商品或活动征收的税，税额等于（或接近）每单位的外部成本，使外部成本<strong>内部化</strong>（internalise），让生产者或消费者承担其行为的全部社会成本。
            </Def>
            <p>
              对生产负外部性，如果每单位税额正好等于外部成本，供给曲线从 MPC 上移到 MPC + tax，与 MSC 重合。新均衡在 MSB = MSC 处，产量从 Qₘ 降到 Q*，价格从 Pₘ 升到 P*，福利损失被消除。对劣值品（消费负外部性）也可以征税，例如烟草税和英国的「糖税」（软饮料行业税，2018 年起），它提高价格、减少消费。
            </p>
            <PigouvianTax caption="图 6 庇古税：每单位税额等于外部成本，供给曲线从 S₁ = MPC 上移到 MPC + tax = MSC，产量从 Qₘ 降到社会最优 Q*，价格升到 P*。" />
            <Def term="Carbon tax">
              按燃料燃烧时排放的二氧化碳量（每吨 CO₂）征收的税，是针对温室气体排放的一种庇古税。
            </Def>
            <p>
              以燃煤发电行业为例：碳税提高了每度电的生产成本，供给从 S₁ 左移（上移）到 S₂。消费者支付的价格从 P₁ 升到 P₂，生产者实际得到的价格降到 Pₚ，燃煤发电量从 Q₁ 降到 Q₂，政府获得税收（P₂ − Pₚ）× Q₂。更重要的是，相对价格变化促使电力公司转向风能、太阳能等低碳能源，并投资减排技术。
            </p>
            <CarbonTax caption="图 7 碳税对污染行业的影响：供给从 S₁ 移到 S₂，价格从 P₁ 升到 P₂，生产者所得降到 Pₚ，产量从 Q₁ 降到 Q₂；浅色矩形是政府税收。" />
            <Callout title="评价（Evaluation）">
              <ul>
                <li><strong>优点</strong>：用价格信号让污染者自行决定如何减排，成本最低的企业减得最多；不偏袒任何企业；带来税收，可用于补贴清洁能源或补偿低收入家庭。</li>
                <li><strong>测量难题</strong>：外部成本很难用货币衡量，税率定得过低效果有限，定得过高又会造成新的福利损失。</li>
                <li><strong>需求弹性</strong>：燃料、香烟等需求缺乏弹性，征税后消费下降有限，主要是价格上涨。</li>
                <li><strong>累退性</strong>：低收入家庭用于能源和食品的收入比例更高，负担相对更重。</li>
                <li><strong>碳泄漏</strong>：企业可能把生产转移到没有碳税的国家，全球排放并未减少。</li>
              </ul>
            </Callout>
            <Callout title="例子">
              <p>
                瑞典 1991 年开始征收碳税，是全球税率最高的国家之一；新加坡 2019 年起征收碳税，2024 年从每吨 5 新元提高到 25 新元，并计划继续上调。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Pigouvian tax">
              A tax on a good or activity that creates a negative externality, set equal to (or close to) the external cost per unit, so that the externality is <strong>internalised</strong> and producers or consumers pay the full social cost of their actions.
            </Def>
            <p>
              For a negative production externality, a tax per unit equal to the external cost shifts supply up from MPC to MPC + tax, which coincides with MSC. The new equilibrium is where MSB = MSC: output falls from Qₘ to Q*, price rises from Pₘ to P*, and the welfare loss disappears. Demerit goods (negative consumption externalities) can be taxed too, e.g. tobacco duties and the UK&apos;s sugar tax (the Soft Drinks Industry Levy, from 2018), which raise the price and cut consumption.
            </p>
            <PigouvianTax caption="Figure 6 Pigouvian tax: a tax per unit equal to the external cost shifts supply from S₁ = MPC up to MPC + tax = MSC, so output falls from Qₘ to the social optimum Q* and price rises to P*." />
            <Def term="Carbon tax">
              A tax on fossil fuels based on the carbon dioxide they release when burned (per tonne of CO₂): a Pigouvian tax on greenhouse gas emissions.
            </Def>
            <p>
              Take coal-fired electricity: a carbon tax raises the cost of producing each unit, so supply shifts left (up) from S₁ to S₂. The price paid by consumers rises from P₁ to P₂, the price received by producers falls to Pₚ, output of coal-fired power falls from Q₁ to Q₂, and the government earns (P₂ − Pₚ) × Q₂ in revenue. Just as importantly, the change in relative prices pushes power companies towards wind, solar and other low-carbon sources and towards investment in abatement technology.
            </p>
            <CarbonTax caption="Figure 7 A carbon tax on a polluting industry: supply shifts from S₁ to S₂, price rises from P₁ to P₂, producers receive only Pₚ, and output falls from Q₁ to Q₂; the light rectangle is government tax revenue." />
            <Callout title="Evaluation">
              <ul>
                <li><strong>Strengths</strong>: the price signal lets polluters choose how to cut emissions, so firms that can abate cheaply do the most; no firm is favoured; the revenue can fund clean energy or compensate low-income households.</li>
                <li><strong>Measurement</strong>: external costs are hard to value in money; a tax set too low achieves little, and one set too high creates a new welfare loss.</li>
                <li><strong>Elasticity</strong>: demand for fuel or cigarettes is price inelastic, so a tax mostly raises the price and only modestly cuts consumption.</li>
                <li><strong>Regressive</strong>: low-income households spend a larger share of income on energy and food, so they carry a relatively heavier burden.</li>
                <li><strong>Carbon leakage</strong>: firms may move production to countries without a carbon tax, so global emissions do not fall.</li>
              </ul>
            </Callout>
            <Callout title="Real-world example">
              <p>
                Sweden introduced a carbon tax in 1991 and has one of the highest rates in the world. Singapore introduced a carbon tax in 2019 and raised it from S$5 to S$25 per tonne in 2024, with further increases planned.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "other-policies",
      level: "both",
      title: {
        zh: "政府应对：补贴、立法与管制、教育、政府直接提供",
        en: "Government responses: subsidies, legislation and regulation, education, government provision",
      },
      body: {
        zh: (
          <>
            <h3>补贴（Subsidies）</h3>
            <p>
              对有正外部性的商品，政府可以给生产者每单位补贴，金额等于每单位外部收益。供给从 S₁ 下移到 S₂，消费者支付的价格从 P₁ 降到 P₂，消费量从 Qₘ 增加到 Q*，生产者每单位得到 Pₚ。政府支出为（Pₚ − P₂）× Q*。例子：疫苗补贴、电动车购车补贴、太阳能板补贴、企业培训和研发补贴。
            </p>
            <Subsidy caption="图 8 对优值品的补贴：每单位补贴等于外部收益，供给从 S₁ 移到 S₂，消费者价格从 P₁ 降到 P₂，产量从 Qₘ 增加到社会最优 Q*；灰色矩形是政府的补贴支出。" />
            <h3>立法与管制（Legislation and regulation）</h3>
            <p>
              政府直接用法律限制或禁止有害行为，例如禁止在公共场所吸烟、限制烟酒销售年龄、禁止烟草广告、规定汽车排放标准和工厂排放上限、渔业捕捞配额。对劣值品，这类法规降低了需求，MPB 左移接近 MSB，消费量从 Qₘ 降到 Q*。对生产者的排放标准则会提高合规成本，使 MPC 上移接近 MSC（图形与图 6 相同，但政府没有税收）。对优值品，法律也可以强制消费，例如义务教育、强制接种疫苗。
            </p>
            <Legislation caption="图 9 针对消费负外部性的立法（如禁止在公共场所吸烟）：需求从 D₁ = MPB 左移到 D₂ = MSB，消费量从 Qₘ 降到 Q*。" />
            <h3>教育与提高意识（Education—awareness creation）</h3>
            <p>
              政府通过宣传活动、健康警示和学校课程纠正信息不足。对优值品（如接种疫苗、定期体检），宣传让人们认识到更多好处，MPB 右移接近 MSB；对劣值品（如香烟），宣传让人们认识到危害，MPB 左移（同图 9）。
            </p>
            <Education caption="图 10 宣传教育与优值品：人们更了解接种疫苗的好处，需求从 D₁ = MPB 右移到 D₂ = MSB，消费量从 Qₘ 增加到 Q*。" />
            <h3>政府直接提供（Government provision）</h3>
            <p>
              对正外部性很大的优值品，政府可以直接免费或低价提供，例如公立学校、公立医院、免费接种计划。对公共资源，政府可以把它收归国有并加以管理，例如设立国家公园和海洋保护区。
            </p>
            <Callout title="评价（Evaluation）">
              <ul>
                <li><strong>补贴</strong>：增加优值品消费、价格降低对低收入者有利；但有机会成本（这笔钱不能用于别处），需要提高税收或借债；补贴额难以准确设定；企业可能变得依赖补贴、缺乏效率。</li>
                <li><strong>立法与管制</strong>：简单直接、易于理解，对危害很大的情况（如有毒物质）效果最好；但需要监督和执法成本，「一刀切」的标准不能让减排成本低的企业多减，经济效率不如税收；过严的禁令可能催生黑市。</li>
                <li><strong>教育</strong>：从根源改变偏好，没有扭曲价格；但见效慢，效果难以衡量，有些人即使知道危害也不改变行为（成瘾、习惯）。</li>
                <li><strong>政府直接提供</strong>：保证人人都能获得，有利于公平；但财政负担重，可能缺乏效率、排长队。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <h3>Subsidies</h3>
            <p>
              For a good with a positive externality, the government can pay producers a subsidy per unit equal to the external benefit per unit. Supply shifts down from S₁ to S₂, the price consumers pay falls from P₁ to P₂, consumption rises from Qₘ to Q*, and producers receive Pₚ per unit. Government spending is (Pₚ − P₂) × Q*. Examples: subsidised vaccines, grants for electric cars and solar panels, and subsidies for training and R&amp;D.
            </p>
            <Subsidy caption="Figure 8 A subsidy on a merit good: a subsidy per unit equal to the external benefit shifts supply from S₁ to S₂, the consumer price falls from P₁ to P₂ and output rises from Qₘ to the social optimum Q*; the grey rectangle is government spending on the subsidy." />
            <h3>Legislation and regulation</h3>
            <p>
              The government can use the law to restrict or ban harmful activities, e.g. bans on smoking in public places, minimum ages for buying alcohol and tobacco, bans on tobacco advertising, vehicle emission standards, caps on factory emissions and fishing quotas. For demerit goods such rules reduce demand, shifting MPB left towards MSB so consumption falls from Qₘ to Q*. Emission standards on producers raise compliance costs, shifting MPC up towards MSC (the same diagram as Figure 6, but with no tax revenue). For merit goods the law can make consumption compulsory, e.g. compulsory schooling or vaccination.
            </p>
            <Legislation caption="Figure 9 Legislation against a negative consumption externality (e.g. a ban on smoking in public places): demand shifts left from D₁ = MPB to D₂ = MSB, and consumption falls from Qₘ to Q*." />
            <h3>Education—awareness creation</h3>
            <p>
              Governments use advertising campaigns, health warnings and school lessons to correct a lack of information. For merit goods (e.g. vaccination, health check-ups) people learn about the full benefits, shifting MPB right towards MSB; for demerit goods (e.g. cigarettes) they learn about the harm, shifting MPB left (as in Figure 9).
            </p>
            <Education caption="Figure 10 Education and a merit good: once people understand the benefits of vaccination, demand shifts right from D₁ = MPB to D₂ = MSB and consumption rises from Qₘ to Q*." />
            <h3>Government provision</h3>
            <p>
              For merit goods with large positive externalities the government can provide the good itself, free or at a low price, e.g. state schools, public hospitals and free vaccination programmes. For common pool resources it can take the resource into public ownership and manage it, e.g. national parks and marine protected areas.
            </p>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Subsidies</strong>: raise consumption of merit goods and the lower price helps low-income households; but there is an opportunity cost (the money cannot be spent elsewhere), it must be funded by taxes or borrowing, the right amount is hard to set, and firms may become dependent on it and inefficient.</li>
                <li><strong>Legislation and regulation</strong>: simple, clear and best for very harmful activities (e.g. toxic substances); but monitoring and enforcement are costly, a one-size-fits-all standard does not let low-cost abaters cut more, so it is less efficient than a tax, and strict bans can create black markets.</li>
                <li><strong>Education</strong>: changes preferences at their root without distorting prices; but it is slow, its effect is hard to measure, and some people do not change their behaviour even when informed (addiction, habit).</li>
                <li><strong>Government provision</strong>: guarantees access for everyone, which promotes equity; but it is a heavy burden on public finances and may be inefficient, with waiting lists.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "permits-and-cooperation",
      level: "both",
      title: {
        zh: "可交易许可证、国际协议与集体自治",
        en: "Tradable permits, international agreements and collective self-governance",
      },
      body: {
        zh: (
          <>
            <Def term="Tradable permits (cap and trade)">
              政府设定一个排放总量上限（cap），把相应数量的排放许可证分配或拍卖给企业。每张许可证允许排放一定量污染（如一吨 CO₂），企业之间可以买卖许可证。
            </Def>
            <p>
              许可证的供给由政府决定，是一条<strong>垂直</strong>的供给曲线。减排成本低的企业会多减排并卖出多余的许可证，减排成本高的企业则买入许可证，于是总减排目标以最低的总成本实现。政府逐年减少许可证数量（S₁ 左移到 S₂），许可证价格从 P₁ 升到 P₂，排放上限从 Q₁ 降到 Q₂，企业减排的动力越来越强。
            </p>
            <Permits caption="图 11 可交易许可证市场：政府把许可证数量从 Q₁ 减少到 Q₂（S₁ 左移到 S₂），许可证价格从 P₁ 升到 P₂。" />
            <Callout title="例子">
              <p>
                欧盟碳排放交易体系（EU ETS）2005 年启动，覆盖发电、工业和航空，是全球最早的大型碳市场；中国全国碳市场 2021 年启动，先覆盖电力行业。渔业中的「个人可转让配额」（individual transferable quotas）也是同一原理。
              </p>
            </Callout>
            <h3>国际协议（International agreements）</h3>
            <p>
              气候、臭氧层、海洋等问题跨越国界，一国单独行动效果有限，需要国际协议。例如《蒙特利尔议定书》（1987）逐步淘汰破坏臭氧层的物质，被普遍视为最成功的环境协议；《京都议定书》（1997）为发达国家设定减排目标；《巴黎协定》（2015）要求各国自行提交减排承诺（nationally determined contributions），把升温控制在远低于 2°C。
            </p>
            <h3>集体自治（Collective self-governance）</h3>
            <p>
              诺贝尔经济学奖得主奥斯特罗姆（Elinor Ostrom）通过大量田野调查发现：公地悲剧并非必然。在许多社区，资源使用者自己制定并执行规则，就能长期可持续地管理公共资源，例如尼泊尔的农民灌溉系统、瑞士阿尔卑斯山的公共牧场、缅因州的龙虾渔民。成功的条件包括：资源和使用者边界清楚、规则由使用者共同制定并适合当地情况、有相互监督和逐级加重的惩罚、有低成本的冲突解决机制、外部政府承认社区的自治权。
            </p>
            <Callout title="评价（Evaluation）">
              <ul>
                <li><strong>可交易许可证</strong>：能保证排放总量不超过上限，减排成本最低，拍卖许可证还带来收入；但上限定得太宽松、免费发放太多会令价格过低（EU ETS 早期价格曾跌到接近零），需要准确监测每家企业的排放，价格波动大，企业难以规划投资。</li>
                <li><strong>国际协议</strong>：唯一能应对全球问题的方式；但缺乏强制执行力，各国可能搭便车。</li>
                <li><strong>集体自治</strong>：利用当地知识、执行成本低、规则容易被接受；但只适用于规模较小、成员彼此熟悉的社区，难以用于全球大气这样的资源。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Tradable permits (cap and trade)">
              The government sets a cap on total emissions and allocates or auctions that number of permits to firms. Each permit allows a set amount of pollution (e.g. one tonne of CO₂), and firms can buy and sell permits with each other.
            </Def>
            <p>
              The supply of permits is fixed by the government, so it is a <strong>vertical</strong> supply curve. Firms that can cut emissions cheaply abate more and sell their spare permits; firms with high abatement costs buy permits instead, so the overall target is met at the lowest total cost. As the government cuts the number of permits over time (S₁ shifts left to S₂), the permit price rises from P₁ to P₂ and the cap falls from Q₁ to Q₂, strengthening the incentive to abate.
            </p>
            <Permits caption="Figure 11 A tradable permit market: the government cuts the number of permits from Q₁ to Q₂ (S₁ shifts left to S₂), and the permit price rises from P₁ to P₂." />
            <Callout title="Real-world example">
              <p>
                The EU Emissions Trading System (EU ETS) began in 2005 and covers power, industry and aviation; it was the first large carbon market. China&apos;s national carbon market started in 2021, beginning with the power sector. Individual transferable quotas in fisheries work on the same principle.
              </p>
            </Callout>
            <h3>International agreements</h3>
            <p>
              Climate change, the ozone layer and the oceans cross national borders, so one country acting alone achieves little and international agreements are needed. The Montreal Protocol (1987) phased out ozone-depleting substances and is widely seen as the most successful environmental agreement; the Kyoto Protocol (1997) set emission targets for developed countries; the Paris Agreement (2015) asks each country to submit its own emission pledges (nationally determined contributions) to keep warming well below 2°C.
            </p>
            <h3>Collective self-governance</h3>
            <p>
              The Nobel laureate Elinor Ostrom showed through extensive fieldwork that the tragedy of the commons is not inevitable. In many communities the users of a resource design and enforce their own rules and manage it sustainably for long periods, e.g. farmer-run irrigation systems in Nepal, shared alpine pastures in Switzerland and lobster fishers in Maine. Success depends on clear boundaries for the resource and its users, rules made by the users and suited to local conditions, mutual monitoring with graduated penalties, cheap ways to settle disputes, and recognition of the community&apos;s rights by outside governments.
            </p>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Tradable permits</strong>: guarantee that total emissions stay within the cap at the lowest cost, and auctions raise revenue; but a loose cap or too many free permits make the price too low (the EU ETS price fell close to zero in its early years), emissions from every firm must be monitored accurately, and volatile prices make investment planning hard.</li>
                <li><strong>International agreements</strong>: the only way to tackle global problems; but they are hard to enforce and countries may free ride.</li>
                <li><strong>Collective self-governance</strong>: uses local knowledge, is cheap to enforce and its rules are widely accepted; but it works best in small communities where users know each other and cannot easily be scaled up to a resource such as the global atmosphere.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "evaluation",
      level: "both",
      title: {
        zh: "评价：政策的优点与局限、国际合作",
        en: "Evaluation: strengths and limitations of policies, international cooperation",
      },
      body: {
        zh: (
          <>
            <p>考纲要求从三个角度评价纠正外部性和管理公共资源的政策：</p>
            <h3>1. 外部性的测量难题</h3>
            <p>
              所有政策都需要知道 MSC 和 MSB 在哪里，但外部成本和收益很难用货币衡量：一吨 CO₂ 造成的损害取决于对未来气候、健康和生命价值的假设；疫苗的外部收益取决于群体免疫程度。估计不准，税率、补贴额或排放上限就会定错，可能出现「政府失灵」（government failure），即干预后反而降低了福利。
            </p>
            <h3>2. 有效程度</h3>
            <ul>
              <li>取决于需求和供给的<strong>价格弹性</strong>：需求缺乏弹性时，税收对消费量的影响较小。</li>
              <li>取决于<strong>监督与执法</strong>：法规和许可证都需要准确监测排放，否则会有逃避行为。</li>
              <li>取决于是否有<strong>替代品</strong>：如果有便宜的清洁能源，碳税更容易推动转型。</li>
              <li>短期与长期不同：长期来看企业和消费者有更多时间调整，政策效果更大。</li>
            </ul>
            <h3>3. 对利益相关者的影响</h3>
            <table>
              <thead>
                <tr>
                  <th>利益相关者</th>
                  <th>以碳税为例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>消费者</td>
                  <td>电价、油价上升，低收入家庭负担相对更重（累退性）。</td>
                </tr>
                <tr>
                  <td>污染企业</td>
                  <td>成本上升、产量和利润下降，工人可能失业；但也有动力创新。</td>
                </tr>
                <tr>
                  <td>清洁能源企业</td>
                  <td>相对竞争力上升，需求增加。</td>
                </tr>
                <tr>
                  <td>政府</td>
                  <td>获得税收，可用于补偿或投资；但面临政治阻力。</td>
                </tr>
                <tr>
                  <td>第三方与后代</td>
                  <td>污染减少，健康和环境改善，是最主要的受益者。</td>
                </tr>
              </tbody>
            </table>
            <h3>国际合作的重要性</h3>
            <ul>
              <li><strong>全球性</strong>：气候变化、海洋污染、生物多样性丧失等可持续发展问题不分国界，一国减排的好处由全世界共享，成本却由本国承担。</li>
              <li><strong>合作的困难</strong>：每个国家都有动机搭便车，让别国去减排；发达国家与发展中国家在历史责任、经济发展需要上分歧很大；减排需要短期付出代价，收益却在遥远的未来；国家主权使外部难以干预。</li>
              <li><strong>监督与执法</strong>：没有一个世界政府可以惩罚违约国家，承诺往往是自愿的。例如美国曾两次宣布退出《巴黎协定》，加拿大 2011 年退出《京都议定书》。需要透明的排放报告与核查机制，以及贸易措施（如欧盟的碳边境调节机制 CBAM）来减少碳泄漏。</li>
            </ul>
            <Callout title="考试提示">
              <p>
                评价题（AO3）不要只列优缺点，要结合具体市场和情境下结论，例如「碳税在有清洁替代能源、收入用于补偿低收入家庭时最有效」。说明短期与长期、利益相关者之间的差异，能拿到更高分。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>The syllabus asks you to evaluate policies on externalities and common pool resources from three angles:</p>
            <h3>1. Challenges in measuring externalities</h3>
            <p>
              Every policy needs to know where MSC and MSB lie, but external costs and benefits are hard to value in money. The damage from one tonne of CO₂ depends on assumptions about the future climate, health and the value of a life; the external benefit of a vaccine depends on how close the population is to herd immunity. If estimates are wrong, the tax, subsidy or cap will be set at the wrong level and there may be government failure, where intervention reduces welfare.
            </p>
            <h3>2. Degree of effectiveness</h3>
            <ul>
              <li>It depends on <strong>price elasticity</strong>: when demand is inelastic, a tax has only a small effect on quantity.</li>
              <li>It depends on <strong>monitoring and enforcement</strong>: regulations and permits require accurate measurement of emissions, or firms will evade them.</li>
              <li>It depends on <strong>substitutes</strong>: a carbon tax drives change more easily when cheap clean energy is available.</li>
              <li>Short run versus long run: firms and consumers adjust more over time, so effects grow.</li>
            </ul>
            <h3>3. Consequences for stakeholders</h3>
            <table>
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Example: a carbon tax</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consumers</td>
                  <td>Pay more for electricity and fuel; low-income households carry a relatively heavier burden (regressive).</td>
                </tr>
                <tr>
                  <td>Polluting firms</td>
                  <td>Higher costs, lower output and profit, possible job losses; but a stronger incentive to innovate.</td>
                </tr>
                <tr>
                  <td>Clean energy firms</td>
                  <td>Become relatively more competitive and face higher demand.</td>
                </tr>
                <tr>
                  <td>Government</td>
                  <td>Gains revenue for compensation or investment, but faces political resistance.</td>
                </tr>
                <tr>
                  <td>Third parties and future generations</td>
                  <td>Less pollution and better health and environment: the main winners.</td>
                </tr>
              </tbody>
            </table>
            <h3>Importance of international cooperation</h3>
            <ul>
              <li><strong>Global nature of sustainability issues</strong>: climate change, ocean pollution and biodiversity loss ignore borders. The benefits of one country&apos;s emission cuts are shared by the whole world, while the costs are borne at home.</li>
              <li><strong>Challenges in cooperation</strong>: every country has an incentive to free ride on others&apos; efforts; developed and developing countries disagree over historical responsibility and the need for growth; the costs come now while the benefits come in the distant future; and national sovereignty limits outside pressure.</li>
              <li><strong>Monitoring and enforcement</strong>: there is no world government to punish countries that break their promises, and pledges are often voluntary. The USA has twice announced its withdrawal from the Paris Agreement, and Canada left the Kyoto Protocol in 2011. Transparent reporting and verification of emissions, plus trade measures such as the EU&apos;s Carbon Border Adjustment Mechanism (CBAM) to limit carbon leakage, are needed.</li>
            </ul>
            <Callout title="Exam tip">
              <p>
                In evaluation questions (AO3), do not just list pros and cons: reach a judgement for a specific market and context, e.g. a carbon tax works best when clean substitutes exist and the revenue compensates low-income households. Distinguishing the short run from the long run and comparing stakeholders lifts your mark.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.8 Market failure: externalities and common pool resources",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 12.1 The Economics of Pollution",
      href: "https://openstax.org/books/principles-economics-3e/pages/12-1-the-economics-of-pollution",
    },
    {
      label: "OpenStax Principles of Economics 3e — 12.3 Market-Oriented Environmental Tools",
      href: "https://openstax.org/books/principles-economics-3e/pages/12-3-market-oriented-environmental-tools",
    },
    {
      label: "European Commission — EU Emissions Trading System (EU ETS)",
      href: "https://climate.ec.europa.eu/eu-action/eu-emissions-trading-system-eu-ets_en",
    },
  ],
};

export default notes;
