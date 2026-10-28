import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, HL } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, Region, atY, type Seg } from "@/components/notes/Chart";

const D: Seg = [
  [10, 90],
  [90, 10],
];
const S: Seg = [
  [10, 10],
  [90, 90],
];

function FreeTrade({
  caption,
  pw,
  numeric = false,
}: {
  caption: ReactNode;
  /** World price in data units: below 50 gives imports, above 50 gives exports. */
  pw: number;
  numeric?: boolean;
}) {
  const imports = pw < 50;
  const s = atY(S, pw);
  const d = atY(D, pw);
  const left = imports ? s : d;
  const right = imports ? d : s;
  const tick = (v: number) => (numeric ? `$${v / 10}` : undefined);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      {numeric && (
        <Region
          points={[
            [left[0], 0],
            [right[0], 0],
            [right[0], pw],
            [left[0], pw],
          ]}
          label={imports ? "Import expenditure" : "Export revenue"}
          labelAt={[50, 12]}
        />
      )}
      <Line points={S} label="Sdom" />
      <Line points={D} label="Ddom" />
      <Line
        points={[
          [0, pw],
          [92, pw],
        ]}
        label="Sworld"
        labelOffset={[6, 4]}
        tone="alt"
      />
      {numeric ? (
        <Dot at={[50, 50]} />
      ) : (
        <>
          <Guide at={[50, 50]} x="Qₑ" y="Pₑ" />
          <Dot at={[50, 50]} />
        </>
      )}
      <Guide at={left} x={numeric ? String(left[0]) : "Q₁"} y={numeric ? tick(pw) : "Pw"} />
      <Guide at={right} x={numeric ? String(right[0]) : "Q₂"} />
      {numeric && <Label at={[-2.3, 48.5]} anchor="end">$5</Label>}
      {!numeric && (
        <>
          <Arrow from={[50, imports ? 25 : 76]} to={[left[0] + 1, imports ? 25 : 76]} />
          <Arrow from={[50, imports ? 25 : 76]} to={[right[0] - 1, imports ? 25 : 76]} />
          <Label at={[50, imports ? 17 : 80]} anchor="middle">
            {imports ? "Imports" : "Exports"}
          </Label>
        </>
      )}
    </Chart>
  );
}

function PpcA({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Cloth" y="Wheat" caption={caption}>
      <Line
        points={[
          [0, 80],
          [60, 0],
        ]}
      />
      <Line
        points={[
          [0, 80],
          [80, 0],
        ]}
        tone="alt"
        dashed
      />
      <Label at={[36, 10]}>PPC</Label>
      <Label at={[52, 34]}>With trade</Label>
      <Guide at={[0, 80]} y="80" />
      <Guide at={[60, 0]} x="40" />
      <Guide at={[80, 0]} x="53.3" />
      <Guide at={[27, 53]} x="18" y="53" />
      <Guide at={[27, 44]} y="44" />
      <Dot at={[0, 80]} label="S" />
      <Dot at={[27, 44]} label="N" labelOffset={[-14, 14]} />
      <Dot at={[27, 53]} label="C" />
    </Chart>
  );
}

function PpcB({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Cloth" y="Wheat" caption={caption}>
      <Line
        points={[
          [0, 60],
          [75, 0],
        ]}
      />
      <Line
        points={[
          [0, 90],
          [75, 0],
        ]}
        tone="alt"
        dashed
      />
      <Label at={[40, 14]}>PPC</Label>
      <Label at={[40, 48]}>With trade</Label>
      <Guide at={[0, 90]} y="45" />
      <Guide at={[0, 60]} y="30" />
      <Guide at={[75, 0]} x="30" />
      <Guide at={[30, 54]} x="12" y="27" />
      <Guide at={[30, 36]} y="18" />
      <Dot at={[75, 0]} label="S" labelOffset={[6, -8]} />
      <Dot at={[30, 36]} label="N" labelOffset={[-14, 14]} />
      <Dot at={[30, 54]} label="C" />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "国际贸易让各国可以买到更便宜、更多样的商品，也让企业进入更大的市场、获得规模经济，并让资源配置更有效率。本节用世界价格图说明自由贸易下的进口与出口。HL 还要掌握绝对优势与比较优势、用机会成本判断比较优势、用线性 PPC 说明专业化分工与贸易的收益，以及比较优势理论的局限。",
    en: "International trade gives countries cheaper and more varied goods, gives firms larger markets and economies of scale, and allocates resources more efficiently. This topic uses world-price diagrams to show imports and exports under free trade. HL also covers absolute and comparative advantage, identifying comparative advantage from opportunity costs, the gains from specialisation and trade on linear PPCs, and the limitations of the theory.",
  },
  sections: [
    {
      id: "benefits",
      level: "both",
      title: { zh: "国际贸易的好处", en: "Benefits of international trade" },
      body: {
        zh: (
          <>
            <Def term="International trade">
              不同国家的居民、企业和政府之间进行的商品与服务交换。卖给外国是出口（exports），从外国买是进口（imports）。
            </Def>
            <p>IB 列出的九个好处：</p>
            <table>
              <thead>
                <tr>
                  <th>好处</th>
                  <th>解释与例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>竞争加剧 Increased competition</td>
                  <td>国内企业要和外国企业竞争，被迫降低成本、改进质量和创新。</td>
                </tr>
                <tr>
                  <td>价格更低 Lower prices</td>
                  <td>可以从生产成本最低的国家进口，例如在东亚组装的手机、电脑。</td>
                </tr>
                <tr>
                  <td>选择更多 Greater choice</td>
                  <td>消费者能买到本国不生产的商品，例如北欧国家的热带水果。</td>
                </tr>
                <tr>
                  <td>获得资源 Acquisition of resources</td>
                  <td>缺乏某种资源的国家可以进口，例如日本进口几乎全部石油和天然气。</td>
                </tr>
                <tr>
                  <td>更多外汇收入 More foreign exchange earnings</td>
                  <td>出口赚到外汇，可以用来支付进口和偿还外债，对发展中国家尤为重要。</td>
                </tr>
                <tr>
                  <td>进入更大市场 Access to larger markets</td>
                  <td>企业不再受国内市场规模限制，例如韩国企业面向全球销售。</td>
                </tr>
                <tr>
                  <td>规模经济 Economies of scale</td>
                  <td>市场变大后产量增加，长期平均成本下降，价格可以更低。</td>
                </tr>
                <tr>
                  <td>资源配置更有效率 More efficient resource allocation</td>
                  <td>各国把资源投入自己相对最擅长的生产（见 HL 部分的比较优势）。</td>
                </tr>
                <tr>
                  <td>生产更有效率 More efficient production</td>
                  <td>竞争和技术、知识的跨国传播提高生产率，减少浪费。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                解释好处时，最好点明是<strong>谁</strong>受益：消费者（价格低、选择多）、出口企业（市场大、规模经济）、整个经济（外汇、效率、增长）。贸易也有输家，例如与进口品竞争的国内企业和工人，这是 4.3 贸易保护的论据。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="International trade">
              The exchange of goods and services between residents, firms and governments of different countries. Selling abroad is exporting; buying from abroad is importing.
            </Def>
            <p>The nine benefits listed by the IB:</p>
            <table>
              <thead>
                <tr>
                  <th>Benefit</th>
                  <th>Explanation and example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Increased competition</td>
                  <td>Domestic firms must compete with foreign firms, so they cut costs, improve quality and innovate.</td>
                </tr>
                <tr>
                  <td>Lower prices</td>
                  <td>Goods can be bought from the lowest-cost producers, e.g. phones and laptops assembled in East Asia.</td>
                </tr>
                <tr>
                  <td>Greater choice</td>
                  <td>Consumers can buy goods not produced at home, e.g. tropical fruit in Scandinavia.</td>
                </tr>
                <tr>
                  <td>Acquisition of resources</td>
                  <td>Countries lacking a resource can import it, e.g. Japan imports almost all its oil and gas.</td>
                </tr>
                <tr>
                  <td>More foreign exchange earnings</td>
                  <td>Exports earn foreign currency that pays for imports and foreign debt, which matters especially for developing countries.</td>
                </tr>
                <tr>
                  <td>Access to larger markets</td>
                  <td>Firms are no longer limited by the size of the home market, e.g. South Korean firms selling worldwide.</td>
                </tr>
                <tr>
                  <td>Economies of scale</td>
                  <td>Bigger markets mean larger output, lower long-run average costs and potentially lower prices.</td>
                </tr>
                <tr>
                  <td>More efficient resource allocation</td>
                  <td>Countries move resources into what they are relatively best at producing (see comparative advantage, HL).</td>
                </tr>
                <tr>
                  <td>More efficient production</td>
                  <td>Competition and the spread of technology and know-how across borders raise productivity and cut waste.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                When explaining a benefit, say <strong>who</strong> gains: consumers (lower prices, more choice), exporting firms (larger markets, economies of scale) or the whole economy (foreign exchange, efficiency, growth). Trade also creates losers, such as import-competing firms and their workers, which leads into the arguments for protection in 4.3.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "free-trade-diagrams",
      level: "both",
      title: { zh: "自由贸易图：进口与出口", en: "Free trade diagrams: imports and exports" },
      body: {
        zh: (
          <>
            <p>
              图中画的是某一国家某种商品的国内市场：国内需求 Ddom、国内供给 Sdom。如果没有贸易，价格是国内均衡价格 Pₑ。开放自由贸易后，这个国家是「小国」，只能接受<strong>世界价格</strong>（world price，Pw），世界供给 Sworld 在 Pw 处是一条<strong>水平线</strong>（在这个价格下想买多少都能买到）。
            </p>
            <Def term="World price">
              某商品在国际市场上的价格，由全球的需求和供给决定；单个小国无法影响它。
            </Def>
            <p>
              <strong>情形一：Pw 低于 Pₑ → 进口。</strong>价格降到 Pw，国内生产者只愿意生产 Q₁，国内消费者想买 Q₂，缺口 Q₁Q₂ 就是进口量。消费者获益（价格更低、买得更多），国内生产者受损（产量和收入下降）。
            </p>
            <FreeTrade pw={30} caption="图 1 世界价格低于国内价格：国内生产 Q₁，国内消费 Q₂，进口量 = Q₂ − Q₁。" />
            <p>
              <strong>情形二：Pw 高于 Pₑ → 出口。</strong>国内生产者可以按更高的 Pw 卖到国外，所以产量增加到 Q₂；国内消费者也要付 Pw，需求量降到 Q₁。多出来的 Q₁Q₂ 出口。国内生产者获益，国内消费者受损。
            </p>
            <FreeTrade pw={70} caption="图 2 世界价格高于国内价格：国内消费 Q₁，国内生产 Q₂，出口量 = Q₂ − Q₁。" />
            <Callout title="画图要点">
              <ul>
                <li>纵轴 Price，横轴 Quantity；曲线标 Ddom、Sdom，世界供给标 Sworld（水平线）。</li>
                <li>标出 Pₑ 和 Pw，从 Pw 与 Sdom、Ddom 的交点向横轴画虚线，标 Q₁、Q₂。</li>
                <li>用括号或箭头标出进口量或出口量，并写出 Q₂ − Q₁。</li>
              </ul>
            </Callout>
            <HL>
              <p>
                <strong>计算（HL）：</strong>从图中读出数量，算进口量、出口量、进口支出和出口收入。
              </p>
              <Formula>进口支出 = Pw × 进口量；出口收入 = Pw × 出口量</Formula>
              <FreeTrade
                pw={30}
                numeric
                caption="图 3 数字例子（进口）：Pₑ = $5，Pw = $3，数量单位为千件。阴影为进口支出。"
              />
              <ul>
                <li>国内生产 = 30 千件，国内消费 = 70 千件 → 进口量 = 70 − 30 = 40 千件。</li>
                <li>进口支出 = $3 × 40 000 = <strong>$120 000</strong>。</li>
                <li>国内生产者收入 = $3 × 30 000 = $90 000。</li>
              </ul>
              <FreeTrade
                pw={70}
                numeric
                caption="图 4 数字例子（出口）：Pₑ = $5，Pw = $7，数量单位为千件。阴影为出口收入。"
              />
              <ul>
                <li>国内消费 = 30 千件，国内生产 = 70 千件 → 出口量 = 70 − 30 = 40 千件。</li>
                <li>出口收入 = $7 × 40 000 = <strong>$280 000</strong>。</li>
                <li>生产者总收入 = $7 × 70 000 = $490 000，其中 $210 000 来自国内消费者。</li>
              </ul>
            </HL>
          </>
        ),
        en: (
          <>
            <p>
              The diagram shows one country&apos;s domestic market for a good, with domestic demand Ddom and domestic supply Sdom. Without trade the price is the domestic equilibrium Pₑ. Under free trade a small country is a price-taker at the <strong>world price</strong> (Pw): world supply, Sworld, is <strong>horizontal</strong> at Pw because any quantity can be bought at that price.
            </p>
            <Def term="World price">
              The price of a good on international markets, set by global demand and supply; a single small country cannot influence it.
            </Def>
            <p>
              <strong>Case 1: Pw below Pₑ → imports.</strong> The price falls to Pw. Domestic producers supply only Q₁ while domestic consumers demand Q₂; the gap Q₁Q₂ is imported. Consumers gain (lower price, more consumed); domestic producers lose (lower output and revenue).
            </p>
            <FreeTrade pw={30} caption="Figure 1 World price below the domestic price: domestic production Q₁, domestic consumption Q₂, imports = Q₂ − Q₁." />
            <p>
              <strong>Case 2: Pw above Pₑ → exports.</strong> Domestic producers can sell abroad at the higher Pw, so output rises to Q₂; domestic consumers also pay Pw, so quantity demanded falls to Q₁. The surplus Q₁Q₂ is exported. Domestic producers gain and domestic consumers lose.
            </p>
            <FreeTrade pw={70} caption="Figure 2 World price above the domestic price: domestic consumption Q₁, domestic production Q₂, exports = Q₂ − Q₁." />
            <Callout title="Drawing checklist">
              <ul>
                <li>Price on the vertical axis, Quantity on the horizontal; label Ddom, Sdom and the horizontal Sworld.</li>
                <li>Mark Pₑ and Pw; drop dashed lines from where Pw meets Sdom and Ddom and label Q₁ and Q₂.</li>
                <li>Show the quantity imported or exported with a bracket or arrows and state it as Q₂ − Q₁.</li>
              </ul>
            </Callout>
            <HL>
              <p>
                <strong>Calculation (HL):</strong> read quantities off the diagram to find the quantity of imports or exports, import expenditure and export revenue.
              </p>
              <Formula>Import expenditure = Pw × quantity imported; export revenue = Pw × quantity exported</Formula>
              <FreeTrade
                pw={30}
                numeric
                caption="Figure 3 Worked example (imports): Pₑ = $5, Pw = $3, quantities in thousands. The shaded area is import expenditure."
              />
              <ul>
                <li>Domestic production = 30 000, domestic consumption = 70 000 → imports = 70 000 − 30 000 = 40 000 units.</li>
                <li>Import expenditure = $3 × 40 000 = <strong>$120 000</strong>.</li>
                <li>Domestic producers&apos; revenue = $3 × 30 000 = $90 000.</li>
              </ul>
              <FreeTrade
                pw={70}
                numeric
                caption="Figure 4 Worked example (exports): Pₑ = $5, Pw = $7, quantities in thousands. The shaded area is export revenue."
              />
              <ul>
                <li>Domestic consumption = 30 000, domestic production = 70 000 → exports = 70 000 − 30 000 = 40 000 units.</li>
                <li>Export revenue = $7 × 40 000 = <strong>$280 000</strong>.</li>
                <li>Producers&apos; total revenue = $7 × 70 000 = $490 000, of which $210 000 comes from domestic consumers.</li>
              </ul>
            </HL>
          </>
        ),
      },
    },
    {
      id: "absolute-comparative",
      level: "hl",
      title: {
        zh: "绝对优势、比较优势与机会成本",
        en: "Absolute advantage, comparative advantage and opportunity cost",
      },
      body: {
        zh: (
          <>
            <Def term="Absolute advantage">
              一个国家用同样的资源能比另一个国家生产<strong>更多</strong>某种商品（或生产同样数量用的资源更少）。
            </Def>
            <Def term="Comparative advantage">
              一个国家生产某种商品的<strong>机会成本</strong>（opportunity cost）比另一个国家<strong>更低</strong>。
            </Def>
            <p>
              关键结论（李嘉图 Ricardo）：即使一个国家在两种商品上都有绝对优势，只要两国的机会成本不同，双方按比较优势专业化生产再交换，<strong>都能获益</strong>。
            </p>
            <p>
              <strong>计算机会成本：</strong>假设 A 国和 B 国各自用全部资源，只能生产下表中的某一种商品（产出法，output method）：
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>小麦 Wheat（吨）</th>
                  <th>布 Cloth（匹）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>A 国</td><td>80</td><td>40</td></tr>
                <tr><td>B 国</td><td>30</td><td>30</td></tr>
              </tbody>
            </table>
            <p>A 国两种都生产得更多，所以 A 在两种商品上都有<strong>绝对优势</strong>。接着算机会成本：</p>
            <Formula>1 单位 X 的机会成本 = 放弃的 Y 的数量 ÷ 得到的 X 的数量</Formula>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>1 吨小麦的机会成本</th>
                  <th>1 匹布的机会成本</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>A 国</td><td>40 ÷ 80 = <strong>0.5 匹布</strong></td><td>80 ÷ 40 = 2 吨小麦</td></tr>
                <tr><td>B 国</td><td>30 ÷ 30 = 1 匹布</td><td>30 ÷ 30 = <strong>1 吨小麦</strong></td></tr>
              </tbody>
            </table>
            <ul>
              <li>A 生产小麦的机会成本更低（0.5 &lt; 1）→ A 在<strong>小麦</strong>上有比较优势。</li>
              <li>B 生产布的机会成本更低（1 &lt; 2）→ B 在<strong>布</strong>上有比较优势。</li>
              <li>互利的贸易条件（terms of trade）必须落在两国机会成本之间：1 匹布换 1 到 2 吨小麦，例如 1 匹布 = 1.5 吨小麦。</li>
            </ul>
            <Callout title="考试提示">
              <p>
                如果题目给的是<strong>投入</strong>数据（例如生产 1 单位需要多少工时，input method），机会成本 = 生产 X 所需工时 ÷ 生产 Y 所需工时。两种方法只要算对，结论一样。最后一定要用一句话写明：「A 国在小麦上有比较优势，因为它生产小麦的机会成本更低」。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Absolute advantage">
              A country can produce <strong>more</strong> of a good than another country using the same resources (or the same output with fewer resources).
            </Def>
            <Def term="Comparative advantage">
              A country can produce a good at a <strong>lower opportunity cost</strong> than another country.
            </Def>
            <p>
              The key insight (Ricardo): even if one country has an absolute advantage in both goods, as long as opportunity costs differ, both countries <strong>gain</strong> by specialising according to comparative advantage and trading.
            </p>
            <p>
              <strong>Calculating opportunity cost:</strong> suppose countries A and B, using all their resources, can produce either of the amounts below (output method):
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Wheat (tonnes)</th>
                  <th>Cloth (rolls)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Country A</td><td>80</td><td>40</td></tr>
                <tr><td>Country B</td><td>30</td><td>30</td></tr>
              </tbody>
            </table>
            <p>A produces more of both goods, so A has an <strong>absolute advantage</strong> in both. Now the opportunity costs:</p>
            <Formula>Opportunity cost of 1 unit of X = amount of Y given up ÷ amount of X gained</Formula>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Opportunity cost of 1 tonne of wheat</th>
                  <th>Opportunity cost of 1 roll of cloth</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Country A</td><td>40 ÷ 80 = <strong>0.5 cloth</strong></td><td>80 ÷ 40 = 2 wheat</td></tr>
                <tr><td>Country B</td><td>30 ÷ 30 = 1 cloth</td><td>30 ÷ 30 = <strong>1 wheat</strong></td></tr>
              </tbody>
            </table>
            <ul>
              <li>A has the lower opportunity cost of wheat (0.5 &lt; 1) → A has a comparative advantage in <strong>wheat</strong>.</li>
              <li>B has the lower opportunity cost of cloth (1 &lt; 2) → B has a comparative advantage in <strong>cloth</strong>.</li>
              <li>Mutually beneficial terms of trade must lie between the two opportunity costs: 1 cloth for between 1 and 2 wheat, e.g. 1 cloth = 1.5 wheat.</li>
            </ul>
            <Callout title="Exam tip">
              <p>
                If the data are <strong>inputs</strong> (e.g. labour hours needed per unit, the input method), the opportunity cost of X = hours needed for X ÷ hours needed for Y. Both methods give the same answer if done correctly. Always finish with a sentence such as: &quot;A has a comparative advantage in wheat because its opportunity cost of producing wheat is lower&quot;.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "gains-ppc",
      level: "hl",
      title: { zh: "用线性 PPC 说明专业化与贸易的收益", en: "Gains from specialisation and trade on linear PPCs" },
      body: {
        zh: (
          <>
            <p>
              沿用上面的数据。PPC 是<strong>直线</strong>，因为假设机会成本不变：A 国 PPC 的斜率反映 1 匹布 = 2 吨小麦，B 国反映 1 匹布 = 1 吨小麦。两国斜率不同，就说明机会成本不同，存在互利贸易的空间。
            </p>
            <p>
              <strong>没有贸易时（autarky）：</strong>每个国家只能消费自己 PPC 上的组合，例如 A 国在 N 点（18 布，44 小麦），B 国在 N 点（12 布，18 小麦）。两国合计 62 吨小麦、30 匹布。
            </p>
            <p>
              <strong>专业化并贸易：</strong>A 只生产小麦（80 吨），B 只生产布（30 匹），都在 S 点。按 1 匹布 = 1.5 吨小麦交换：B 把 18 匹布卖给 A，换回 27 吨小麦。
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>无贸易消费（N 点）</th>
                  <th>贸易后消费（C 点）</th>
                  <th>收益</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>A 国</td><td>44 小麦，18 布</td><td>80 − 27 = 53 小麦，18 布</td><td>+9 吨小麦</td></tr>
                <tr><td>B 国</td><td>18 小麦，12 布</td><td>27 小麦，30 − 18 = 12 布</td><td>+9 吨小麦</td></tr>
              </tbody>
            </table>
            <p>
              两国的 C 点都在自己的 PPC <strong>之外</strong>：贸易让一国的消费超出它独自能生产的范围。虚线是按贸易条件交换后的消费可能线，它在 PPC 之外，说明这就是贸易收益（gains from trade）。
            </p>
            <PpcA caption="图 5 A 国：专业化生产小麦（S 点），以 1 匹布 = 1.5 吨小麦交换，消费点从 PPC 上的 N 点移到 PPC 之外的 C 点。" />
            <PpcB caption="图 6 B 国：专业化生产布（S 点），按同样的贸易条件交换，消费点从 N 点移到 PPC 之外的 C 点。" />
            <Callout title="画图要点">
              <ul>
                <li>PPC 画成直线，并在两轴标出截距（最大产量）。</li>
                <li>标出专业化生产点和贸易后的消费点，消费点必须在 PPC 之外。</li>
                <li>写清贸易条件，并说明它介于两国的机会成本之间。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              Using the same data, each PPC is a <strong>straight line</strong> because opportunity cost is assumed constant: A&apos;s slope reflects 1 cloth = 2 wheat and B&apos;s reflects 1 cloth = 1 wheat. Different slopes mean different opportunity costs, so there is scope for mutually beneficial trade.
            </p>
            <p>
              <strong>Without trade (autarky)</strong> each country can only consume a point on its own PPC, e.g. A at point N (18 cloth, 44 wheat) and B at point N (12 cloth, 18 wheat). Together they have 62 wheat and 30 cloth.
            </p>
            <p>
              <strong>With specialisation and trade</strong> A produces only wheat (80) and B only cloth (30), both at point S. At terms of trade of 1 cloth = 1.5 wheat, B sells 18 cloth to A for 27 wheat.
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Consumption without trade (N)</th>
                  <th>Consumption with trade (C)</th>
                  <th>Gain</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Country A</td><td>44 wheat, 18 cloth</td><td>80 − 27 = 53 wheat, 18 cloth</td><td>+9 wheat</td></tr>
                <tr><td>Country B</td><td>18 wheat, 12 cloth</td><td>27 wheat, 30 − 18 = 12 cloth</td><td>+9 wheat</td></tr>
              </tbody>
            </table>
            <p>
              Both C points lie <strong>outside</strong> each country&apos;s PPC: trade lets a country consume beyond what it could produce alone. The dashed line shows the consumption possibilities when trading at the terms of trade; because it lies outside the PPC, it shows the gains from trade.
            </p>
            <PpcA caption="Figure 5 Country A specialises in wheat (point S) and trades at 1 cloth = 1.5 wheat, so consumption moves from N on its PPC to C beyond it." />
            <PpcB caption="Figure 6 Country B specialises in cloth (point S) and trades at the same terms, so consumption moves from N to C beyond its PPC." />
            <Callout title="Drawing checklist">
              <ul>
                <li>Draw each PPC as a straight line and mark both intercepts (maximum outputs).</li>
                <li>Mark the specialisation point and the post-trade consumption point, which must lie outside the PPC.</li>
                <li>State the terms of trade and show they lie between the two opportunity costs.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "sources",
      level: "hl",
      title: { zh: "比较优势的来源", en: "Sources of comparative advantage" },
      body: {
        zh: (
          <>
            <p>为什么各国的机会成本不同？</p>
            <ul>
              <li>
                <strong>要素禀赋（factor endowments）</strong>：土地、劳动力、资本的相对多少不同。劳动力充裕的国家在劳动密集型商品上机会成本低，例如孟加拉的服装；资本充裕的国家在资本密集型商品上机会成本低，例如德国的机械。
              </li>
              <li><strong>自然资源与气候</strong>：沙特的石油、巴西的咖啡、新西兰的牧场。</li>
              <li><strong>技术与生产率</strong>：研发、专利和先进设备，例如台湾的芯片制造。</li>
              <li><strong>人力资本</strong>：教育和技能水平，例如印度的软件服务、瑞士的金融服务。</li>
              <li><strong>制度与基础设施</strong>：稳定的法治、良好的港口和物流，降低生产和运输成本。</li>
            </ul>
            <Callout title="评价">
              <p>
                比较优势是<strong>动态的</strong>（dynamic），会随投资、教育和技术改变。韩国从出口假发、纺织品，转变为出口芯片、汽车和船舶，说明政府政策和投资可以创造新的比较优势。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Why do opportunity costs differ between countries?</p>
            <ul>
              <li>
                <strong>Factor endowments</strong>: the relative amounts of land, labour and capital differ. Labour-abundant countries have a low opportunity cost in labour-intensive goods, e.g. garments in Bangladesh; capital-abundant countries in capital-intensive goods, e.g. machinery in Germany.
              </li>
              <li><strong>Natural resources and climate</strong>: oil in Saudi Arabia, coffee in Brazil, pasture in New Zealand.</li>
              <li><strong>Technology and productivity</strong>: R&amp;D, patents and advanced capital, e.g. chip making in Taiwan.</li>
              <li><strong>Human capital</strong>: education and skills, e.g. software services in India, financial services in Switzerland.</li>
              <li><strong>Institutions and infrastructure</strong>: rule of law, good ports and logistics lower production and transport costs.</li>
            </ul>
            <Callout title="Evaluation">
              <p>
                Comparative advantage is <strong>dynamic</strong>: it changes with investment, education and technology. South Korea moved from exporting wigs and textiles to exporting chips, cars and ships, showing that policy and investment can create new comparative advantages.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "limitations",
      level: "hl",
      title: { zh: "比较优势理论的局限", en: "Limitations of the theory of comparative advantage" },
      body: {
        zh: (
          <>
            <p>这部分考查评价（AO3）。理论建立在一系列简化假设上，现实中往往不成立：</p>
            <table>
              <thead>
                <tr>
                  <th>假设</th>
                  <th>现实问题</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>机会成本不变（PPC 是直线）</td>
                  <td>现实中随专业化程度提高，机会成本往往上升（资源不完全适合），收益比模型小。</td>
                </tr>
                <tr>
                  <td>没有运输成本</td>
                  <td>运费、保险等成本可能抵消成本优势，尤其是体积大、价值低的商品。</td>
                </tr>
                <tr>
                  <td>生产要素可以自由转移、充分就业</td>
                  <td>工人很难从萎缩的行业转到扩张的行业，会出现结构性失业（structural unemployment）。</td>
                </tr>
                <tr>
                  <td>自由贸易，没有贸易壁垒</td>
                  <td>关税、配额等保护措施普遍存在（见 4.2）。</td>
                </tr>
                <tr>
                  <td>两国两商品、完全信息</td>
                  <td>现实有很多国家和商品，企业未必知道自己的比较优势在哪里。</td>
                </tr>
                <tr>
                  <td>只看效率，不看分配</td>
                  <td>总体获益不代表人人获益；贸易收益可能集中在少数人手中。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <ul>
                <li>
                  专业化于初级产品（primary products）的发展中国家，面临价格波动大、贸易条件（terms of trade）长期恶化的风险，也难以发展制造业。
                </li>
                <li>过度依赖少数商品和贸易伙伴，会让经济更脆弱，例如疫情期间的供应链中断。</li>
                <li>生产不考虑外部性：比较优势可能来自宽松的环境标准，对可持续发展不利。</li>
                <li>尽管有局限，这个理论仍然有力地说明了：贸易不是零和博弈，双方都可以获益。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>This is assessed as evaluation (AO3). The theory rests on simplifying assumptions that often fail in reality:</p>
            <table>
              <thead>
                <tr>
                  <th>Assumption</th>
                  <th>Real-world problem</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Constant opportunity costs (linear PPC)</td>
                  <td>Opportunity costs usually rise as a country specialises further (resources are not equally suited), so gains are smaller than the model shows.</td>
                </tr>
                <tr>
                  <td>No transport costs</td>
                  <td>Freight and insurance can cancel out a cost advantage, especially for bulky, low-value goods.</td>
                </tr>
                <tr>
                  <td>Perfect factor mobility and full employment</td>
                  <td>Workers cannot easily move from shrinking to growing industries, so structural unemployment results.</td>
                </tr>
                <tr>
                  <td>Free trade with no barriers</td>
                  <td>Tariffs, quotas and other protection are widespread (see 4.2).</td>
                </tr>
                <tr>
                  <td>Two countries, two goods, perfect information</td>
                  <td>There are many countries and goods, and firms may not know where their comparative advantage lies.</td>
                </tr>
                <tr>
                  <td>Focus on efficiency, not distribution</td>
                  <td>A gain for the country does not mean a gain for everyone; the benefits may go to a few.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <ul>
                <li>
                  Developing countries that specialise in primary products face volatile prices and possibly a long-run decline in their terms of trade, and may struggle to build manufacturing.
                </li>
                <li>Heavy reliance on a few goods or trading partners makes an economy vulnerable, e.g. supply-chain disruption during the pandemic.</li>
                <li>Production ignores externalities: a comparative advantage may come from weak environmental standards, which works against sustainability.</li>
                <li>Despite its limits, the theory makes a powerful point: trade is not a zero-sum game, and both sides can gain.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.1 Benefits of international trade",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 33.1 Absolute and Comparative Advantage",
      href: "https://openstax.org/books/principles-economics-3e/pages/33-1-absolute-and-comparative-advantage",
    },
    {
      label: "OpenStax Principles of Economics 3e — 33.2 What Happens When a Country Has an Absolute Advantage in All Goods",
      href: "https://openstax.org/books/principles-economics-3e/pages/33-2-what-happens-when-a-country-has-an-absolute-advantage-in-all-goods",
    },
  ],
};

export default notes;
