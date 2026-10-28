import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, HL } from "@/components/notes/blocks";
import { Chart, Dot, Guide, Label, Line, Region, type Seg } from "@/components/notes/Chart";

const D: Seg = [
  [8, 92],
  [92, 8],
];
const S: Seg = [
  [8, 8],
  [88, 88],
];
const PW = 25;
const P2 = 40;

const areaA: [number, number][] = [
  [0, PW],
  [25, PW],
  [40, P2],
  [0, P2],
];
const areaB: [number, number][] = [
  [25, PW],
  [40, PW],
  [40, P2],
];

function Protection({
  kind,
  caption,
  numeric = false,
}: {
  kind: "tariff" | "quota" | "subsidy";
  caption: ReactNode;
  numeric?: boolean;
}) {
  const subsidy = kind === "subsidy";
  const p2Tick = numeric ? "$8" : kind === "tariff" ? "Pw + t" : kind === "quota" ? "Pq" : "Pw + s";
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Region points={areaA} fill="b" label="a" labelAt={[14, 32]} />
      <Region points={areaB} fill="c" label="b" labelAt={[37, 27.5]} />
      {!subsidy && (
        <>
          <Region
            points={[
              [40, PW],
              [60, PW],
              [60, P2],
              [40, P2],
            ]}
            fill="a"
            label="c"
            labelAt={kind === "quota" ? [50, 34.5] : [50, 32.5]}
          />
          <Region
            points={[
              [60, PW],
              [75, PW],
              [60, P2],
            ]}
            fill="c"
            label="d"
            labelAt={[63, 27.5]}
          />
        </>
      )}
      <Line points={S} label="Sdom" />
      <Line points={D} label="Ddom" />
      <Line
        points={[
          [0, PW],
          [92, PW],
        ]}
        tone="muted"
      />
      <Label at={[80, 27]}>Sworld</Label>
      {kind === "tariff" && (
        <>
          <Line
            points={[
              [0, P2],
              [92, P2],
            ]}
            tone="alt"
          />
          <Label at={[80, 42]}>Sworld + tariff</Label>
        </>
      )}
      {kind === "quota" && (
        <>
          <Line
            points={[
              [25, PW],
              [45, PW],
              [85, 65],
            ]}
            tone="alt"
          />
          <Label at={[67, 39]}>Sdom + quota</Label>
        </>
      )}
      {subsidy && (
        <>
          <Line
            points={[
              [23, 8],
              [88, 73],
            ]}
            tone="alt"
          />
          <Label at={[68, 46]}>Sdom + subsidy</Label>
        </>
      )}
      <Guide at={[25, PW]} x={numeric ? "25" : "Q₁"} y={numeric ? "$5" : "Pw"} />
      <Guide at={[40, P2]} x={numeric ? "40" : "Q₂"} y={p2Tick} />
      {subsidy ? (
        <Guide at={[75, PW]} x={numeric ? "75" : "Q₃"} />
      ) : (
        <>
          <Guide at={[60, P2]} x={numeric ? "60" : "Q₃"} />
          <Guide at={[75, PW]} x={numeric ? "75" : "Q₄"} />
          <Dot at={[60, P2]} />
        </>
      )}
      <Dot at={[25, PW]} />
      <Dot at={[40, P2]} />
      <Dot at={[75, PW]} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "贸易保护是政府限制进口、保护国内生产者的措施。本节用世界价格图分析关税、进口配额、生产补贴（含出口补贴）和行政壁垒对价格、产量、消费、支出、收入和社会福利的影响，以及谁得益、谁受损。HL 还要能从图中计算各利益相关者的具体得失。",
    en: "Trade protection is any government measure that restricts imports to shield domestic producers. This topic uses world-price diagrams to analyse how tariffs, import quotas, production (and export) subsidies and administrative barriers affect price, production, consumption, expenditure, revenue and welfare, and who gains and who loses. HL students must also calculate these effects on stakeholders from a diagram.",
  },
  sections: [
    {
      id: "tariffs",
      level: "both",
      title: { zh: "关税", en: "Tariffs" },
      body: {
        zh: (
          <>
            <Def term="Tariff">
              对进口商品征收的税。从量税（specific tariff）按每单位收固定金额，从价税（ad valorem tariff）按进口价格的百分比收。
            </Def>
            <p>
              自由贸易时价格为 Pw：国内生产 Q₁，国内消费 Q₄，进口 Q₁Q₄。征收每单位 t 的关税后，进口品在国内的价格升到 Pw + t，世界供给线上移为 Sworld + tariff：
            </p>
            <ul>
              <li>国内价格从 Pw 升到 Pw + t。</li>
              <li>国内生产从 Q₁ 增加到 Q₂；国内消费从 Q₄ 减少到 Q₃。</li>
              <li>进口从 Q₁Q₄ 减少到 Q₂Q₃。</li>
            </ul>
            <Protection kind="tariff" caption="图 1 关税：价格从 Pw 升到 Pw + t，进口从 Q₁Q₄ 降到 Q₂Q₃。a = 国内生产者剩余增加，c = 政府关税收入，b + d = 福利损失。" />
            <table>
              <thead>
                <tr>
                  <th>利益相关者</th>
                  <th>影响（对应图 1）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>消费者</td>
                  <td>价格更高、消费更少；消费者剩余减少 a + b + c + d。消费支出从 Pw × Q₄ 变为 (Pw + t) × Q₃。</td>
                </tr>
                <tr>
                  <td>国内生产者</td>
                  <td>价格和产量都上升；生产者剩余增加 a；收入从 Pw × Q₁ 升到 (Pw + t) × Q₂。国内就业可能增加。</td>
                </tr>
                <tr>
                  <td>外国生产者</td>
                  <td>仍然只拿到 Pw，但卖出的数量减少；收入从 Pw × Q₁Q₄ 降到 Pw × Q₂Q₃。</td>
                </tr>
                <tr>
                  <td>政府</td>
                  <td>得到关税收入 c = t × (Q₃ − Q₂)。</td>
                </tr>
                <tr>
                  <td>整个社会</td>
                  <td>
                    福利净损失（welfare loss）b + d。b 是<strong>生产低效</strong>：Q₁Q₂ 本可以用 Pw 进口，却由成本更高的国内企业生产；d 是<strong>消费损失</strong>：消费者本愿以高于 Pw 的价格购买的 Q₃Q₄ 不再被消费。
                  </td>
                </tr>
              </tbody>
            </table>
            <Callout title="画图要点">
              <ul>
                <li>先画 Ddom、Sdom 和水平的 Sworld，再画更高的水平线 Sworld + tariff。</li>
                <li>标出 Q₁ 到 Q₄ 四个数量，以及 Pw 和 Pw + t。</li>
                <li>用阴影区分关税收入（矩形 c）和两个福利损失三角形（b、d）。</li>
              </ul>
            </Callout>
            <Callout title="例子">
              <p>2018 年起美国对进口钢铝征收 25% 和 10% 的关税；2024 年欧盟对中国产电动车加征反补贴关税。</p>
            </Callout>
            <HL>
              <p>
                <strong>计算（HL）：</strong>设 Pw = $5，关税 t = $3，数量单位为千件：Q₁ = 25，Q₂ = 40，Q₃ = 60，Q₄ = 75。
              </p>
              <Protection kind="tariff" numeric caption="图 2 关税的数字例子：Pw = $5，Pw + t = $8，数量单位为千件。" />
              <table>
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>计算</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>进口量</td><td>前：75 − 25 = 50 千件；后：60 − 40 = 20 千件</td></tr>
                  <tr><td>消费者支出</td><td>前：$5 × 75 = $375 千；后：$8 × 60 = $480 千</td></tr>
                  <tr><td>国内生产者收入</td><td>前：$5 × 25 = $125 千；后：$8 × 40 = $320 千</td></tr>
                  <tr><td>外国生产者收入</td><td>前：$5 × 50 = $250 千；后：$5 × 20 = $100 千</td></tr>
                  <tr><td>政府关税收入 c</td><td>$3 × 20 = <strong>$60 千</strong></td></tr>
                  <tr><td>消费者剩余减少 a + b + c + d</td><td>½ × (75 + 60) × 3 = $202.5 千</td></tr>
                  <tr><td>生产者剩余增加 a</td><td>½ × (25 + 40) × 3 = $97.5 千</td></tr>
                  <tr><td>福利损失 b + d</td><td>½ × 15 × 3 + ½ × 15 × 3 = <strong>$45 千</strong></td></tr>
                </tbody>
              </table>
              <p>检查：202.5 = 97.5 + 60 + 45，消费者损失的部分分别转给了生产者、政府，剩下的是社会净损失。</p>
            </HL>
          </>
        ),
        en: (
          <>
            <Def term="Tariff">
              A tax on imported goods. A specific tariff is a fixed amount per unit; an ad valorem tariff is a percentage of the import price.
            </Def>
            <p>
              Under free trade the price is Pw: domestic production is Q₁, domestic consumption Q₄ and imports Q₁Q₄. A tariff of t per unit raises the domestic price of imports to Pw + t, shifting world supply up to Sworld + tariff:
            </p>
            <ul>
              <li>The domestic price rises from Pw to Pw + t.</li>
              <li>Domestic production rises from Q₁ to Q₂; domestic consumption falls from Q₄ to Q₃.</li>
              <li>Imports fall from Q₁Q₄ to Q₂Q₃.</li>
            </ul>
            <Protection kind="tariff" caption="Figure 1 A tariff raises the price from Pw to Pw + t and cuts imports from Q₁Q₄ to Q₂Q₃. a = gain in domestic producer surplus, c = tariff revenue, b + d = welfare loss." />
            <table>
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Effect (Figure 1)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consumers</td>
                  <td>Pay more and consume less; consumer surplus falls by a + b + c + d. Expenditure changes from Pw × Q₄ to (Pw + t) × Q₃.</td>
                </tr>
                <tr>
                  <td>Domestic producers</td>
                  <td>Higher price and output; producer surplus rises by a; revenue rises from Pw × Q₁ to (Pw + t) × Q₂. Domestic employment may rise.</td>
                </tr>
                <tr>
                  <td>Foreign producers</td>
                  <td>Still receive only Pw but sell less; revenue falls from Pw × Q₁Q₄ to Pw × Q₂Q₃.</td>
                </tr>
                <tr>
                  <td>Government</td>
                  <td>Gains tariff revenue c = t × (Q₃ − Q₂).</td>
                </tr>
                <tr>
                  <td>Society</td>
                  <td>
                    Welfare loss b + d. Area b is <strong>inefficient production</strong>: Q₁Q₂ could have been imported at Pw but is now made by higher-cost domestic firms. Area d is <strong>lost consumption</strong>: Q₃Q₄, which consumers valued above Pw, is no longer bought.
                  </td>
                </tr>
              </tbody>
            </table>
            <Callout title="Drawing checklist">
              <ul>
                <li>Draw Ddom, Sdom and the horizontal Sworld, then a higher horizontal Sworld + tariff.</li>
                <li>Label all four quantities Q₁ to Q₄, and both Pw and Pw + t.</li>
                <li>Shade tariff revenue (rectangle c) separately from the two welfare-loss triangles (b and d).</li>
              </ul>
            </Callout>
            <Callout title="Real-world example">
              <p>From 2018 the US put 25% and 10% tariffs on imported steel and aluminium; in 2024 the EU imposed extra countervailing duties on electric cars made in China.</p>
            </Callout>
            <HL>
              <p>
                <strong>Calculation (HL):</strong> let Pw = $5 and t = $3, with quantities in thousands: Q₁ = 25, Q₂ = 40, Q₃ = 60, Q₄ = 75.
              </p>
              <Protection kind="tariff" numeric caption="Figure 2 Tariff worked example: Pw = $5, Pw + t = $8, quantities in thousands." />
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Calculation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Imports</td><td>Before: 75 − 25 = 50k; after: 60 − 40 = 20k</td></tr>
                  <tr><td>Consumer expenditure</td><td>Before: $5 × 75k = $375k; after: $8 × 60k = $480k</td></tr>
                  <tr><td>Domestic producers&apos; revenue</td><td>Before: $5 × 25k = $125k; after: $8 × 40k = $320k</td></tr>
                  <tr><td>Foreign producers&apos; revenue</td><td>Before: $5 × 50k = $250k; after: $5 × 20k = $100k</td></tr>
                  <tr><td>Government tariff revenue c</td><td>$3 × 20k = <strong>$60k</strong></td></tr>
                  <tr><td>Fall in consumer surplus a + b + c + d</td><td>½ × (75 + 60) × 3 = $202.5k</td></tr>
                  <tr><td>Gain in producer surplus a</td><td>½ × (25 + 40) × 3 = $97.5k</td></tr>
                  <tr><td>Welfare loss b + d</td><td>½ × 15 × 3 + ½ × 15 × 3 = <strong>$45k</strong></td></tr>
                </tbody>
              </table>
              <p>Check: 202.5 = 97.5 + 60 + 45. Part of what consumers lose goes to producers and the government; the rest is a net loss to society.</p>
            </HL>
          </>
        ),
      },
    },
    {
      id: "quotas",
      level: "both",
      title: { zh: "进口配额", en: "Import quotas" },
      body: {
        zh: (
          <>
            <Def term="Quota">
              政府对某种商品在一定时期内可以进口的<strong>数量</strong>（或价值）设定的上限。
            </Def>
            <p>
              配额限制了进口数量。在 Pw 以上，市场供给 = 国内供给 + 配额量，所以供给曲线变成折线：先沿 Sdom 到 Pw，再水平延伸配额那么多，然后与 Sdom 平行上升（Sdom + quota）。新的均衡价格 Pq 在 Sdom + quota 与 Ddom 的交点。
            </p>
            <ul>
              <li>价格从 Pw 升到 Pq；国内生产从 Q₁ 增加到 Q₂；国内消费从 Q₄ 降到 Q₃。</li>
              <li>进口量 = Q₂Q₃ = 配额量。</li>
            </ul>
            <Protection kind="quota" caption="图 3 进口配额：价格升到 Pq，进口限制为 Q₂Q₃。a = 国内生产者剩余增加，c = 配额租金（quota rent），b + d = 福利损失。" />
            <table>
              <thead>
                <tr>
                  <th>利益相关者</th>
                  <th>影响（对应图 3）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>消费者</td>
                  <td>价格更高、消费更少；消费者剩余减少 a + b + c + d；支出变为 Pq × Q₃。</td>
                </tr>
                <tr>
                  <td>国内生产者</td>
                  <td>产量和价格上升；生产者剩余增加 a；收入变为 Pq × Q₂。</td>
                </tr>
                <tr>
                  <td>进口商 / 外国生产者</td>
                  <td>
                    卖得更少，但每单位能以 Pq 而不是 Pw 卖出。矩形 c 是<strong>配额租金</strong>（quota rent），归持有进口许可证的进口商或外国出口商所有。
                  </td>
                </tr>
                <tr>
                  <td>政府</td>
                  <td>与关税不同，<strong>通常没有收入</strong>；除非政府拍卖进口许可证。</td>
                </tr>
                <tr>
                  <td>整个社会</td>
                  <td>福利损失 b + d；如果配额租金归外国企业，本国的损失还要再加上 c。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                配额对进口量的限制更确定，但政府拿不到收入，而且分配许可证可能滋生寻租和腐败。需求增加时，配额下价格会继续上涨（进口无法增加），而关税下进口可以增加。
              </p>
            </Callout>
            <HL>
              <p>
                <strong>计算（HL）：</strong>用同样的数字：Pw = $5，配额 20 千件使价格升到 Pq = $8，Q₁ = 25，Q₂ = 40，Q₃ = 60，Q₄ = 75。
              </p>
              <Protection kind="quota" numeric caption="图 4 配额的数字例子：Pw = $5，Pq = $8，配额 = 60 − 40 = 20 千件。" />
              <ul>
                <li>消费者支出：$5 × 75 = $375 千 → $8 × 60 = $480 千；消费者剩余减少 ½ × (75 + 60) × 3 = $202.5 千。</li>
                <li>国内生产者收入：$5 × 25 = $125 千 → $8 × 40 = $320 千；生产者剩余增加 $97.5 千。</li>
                <li>配额进口的总收入：$8 × 20 = $160 千，其中配额租金 c = ($8 − $5) × 20 = <strong>$60 千</strong>。</li>
                <li>政府收入：$0。福利损失 b + d = <strong>$45 千</strong>；若租金归外国企业，本国损失为 45 + 60 = $105 千。</li>
              </ul>
            </HL>
          </>
        ),
        en: (
          <>
            <Def term="Quota">
              A legal limit on the <strong>quantity</strong> (or value) of a good that may be imported over a given period.
            </Def>
            <p>
              A quota caps imports. Above Pw, market supply equals domestic supply plus the quota, so supply becomes a kinked line: along Sdom up to Pw, horizontal for the size of the quota, then parallel to Sdom (Sdom + quota). The new price Pq is where Sdom + quota meets Ddom.
            </p>
            <ul>
              <li>The price rises from Pw to Pq; domestic production rises from Q₁ to Q₂; domestic consumption falls from Q₄ to Q₃.</li>
              <li>Imports = Q₂Q₃ = the quota.</li>
            </ul>
            <Protection kind="quota" caption="Figure 3 An import quota raises the price to Pq and limits imports to Q₂Q₃. a = gain in domestic producer surplus, c = quota rent, b + d = welfare loss." />
            <table>
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Effect (Figure 3)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consumers</td>
                  <td>Pay more and consume less; consumer surplus falls by a + b + c + d; expenditure becomes Pq × Q₃.</td>
                </tr>
                <tr>
                  <td>Domestic producers</td>
                  <td>Higher output and price; producer surplus rises by a; revenue becomes Pq × Q₂.</td>
                </tr>
                <tr>
                  <td>Importers / foreign producers</td>
                  <td>
                    Sell less, but each unit sells at Pq instead of Pw. Rectangle c is the <strong>quota rent</strong>, which goes to whoever holds the import licences (domestic importers or foreign exporters).
                  </td>
                </tr>
                <tr>
                  <td>Government</td>
                  <td>Unlike a tariff, <strong>usually no revenue</strong>, unless it auctions the import licences.</td>
                </tr>
                <tr>
                  <td>Society</td>
                  <td>Welfare loss b + d; if the quota rent goes to foreign firms, the home country also loses c.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                A quota gives more certainty over the volume of imports, but raises no revenue, and handing out licences invites rent-seeking and corruption. If demand rises, the price keeps rising under a quota (imports cannot increase), whereas under a tariff imports would increase.
              </p>
            </Callout>
            <HL>
              <p>
                <strong>Calculation (HL):</strong> with the same numbers: Pw = $5, a quota of 20k units raises the price to Pq = $8, Q₁ = 25, Q₂ = 40, Q₃ = 60, Q₄ = 75 (thousands).
              </p>
              <Protection kind="quota" numeric caption="Figure 4 Quota worked example: Pw = $5, Pq = $8, quota = 60 − 40 = 20k units." />
              <ul>
                <li>Consumer expenditure: $5 × 75k = $375k → $8 × 60k = $480k; consumer surplus falls by ½ × (75 + 60) × 3 = $202.5k.</li>
                <li>Domestic producers&apos; revenue: $5 × 25k = $125k → $8 × 40k = $320k; producer surplus rises by $97.5k.</li>
                <li>Total revenue on the quota imports: $8 × 20k = $160k, of which the quota rent c = ($8 − $5) × 20k = <strong>$60k</strong>.</li>
                <li>Government revenue: $0. Welfare loss b + d = <strong>$45k</strong>; if the rent goes abroad, the home country loses 45 + 60 = $105k.</li>
              </ul>
            </HL>
          </>
        ),
      },
    },
    {
      id: "subsidies",
      level: "both",
      title: { zh: "生产补贴与出口补贴", en: "Production subsidies and export subsidies" },
      body: {
        zh: (
          <>
            <Def term="Subsidy (production subsidy)">
              政府按每单位产量付给国内生产者的款项，降低其生产成本，使其能与更便宜的进口品竞争。
            </Def>
            <p>
              每单位补贴 s 让国内供给曲线向下（向右）移动到 Sdom + subsidy。国内价格<strong>仍是 Pw</strong>（消费者照样可以按 Pw 买进口品），但国内生产者每单位实际得到 Pw + s：
            </p>
            <ul>
              <li>国内生产从 Q₁ 增加到 Q₂；国内消费保持 Q₃ 不变。</li>
              <li>进口从 Q₁Q₃ 减少到 Q₂Q₃。</li>
            </ul>
            <Protection kind="subsidy" caption="图 5 生产补贴：价格仍为 Pw，国内生产从 Q₁ 增加到 Q₂，进口从 Q₁Q₃ 降到 Q₂Q₃。政府支出 = a + b，a = 生产者剩余增加，b = 福利损失。" />
            <table>
              <thead>
                <tr>
                  <th>利益相关者</th>
                  <th>影响（对应图 5）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>消费者</td><td>价格和消费量都不变，支出仍是 Pw × Q₃。</td></tr>
                <tr><td>国内生产者</td><td>产量增加；收入从 Pw × Q₁ 增加到 (Pw + s) × Q₂；生产者剩余增加 a。</td></tr>
                <tr><td>外国生产者</td><td>卖出数量减少；收入从 Pw × Q₁Q₃ 降到 Pw × Q₂Q₃。</td></tr>
                <tr><td>政府</td><td>支出 s × Q₂ = a + b，有机会成本（这笔钱本可用于教育、医疗）。</td></tr>
                <tr><td>整个社会</td><td>福利损失 b：Q₁Q₂ 由成本高于 Pw 的国内企业生产。</td></tr>
              </tbody>
            </table>
            <p>
              <strong>出口补贴（export subsidy）</strong>按每单位<strong>出口量</strong>付钱，让本国企业能以更低价格在国外销售。结果是出口增加，但国内企业更愿意出口而不是在国内卖，国内价格可能上升；进口国的生产者受损，可能被指控为倾销（dumping）并遭到报复。WTO 禁止大多数出口补贴，农产品出口补贴也已在 2015 年同意取消。
            </p>
            <Callout title="评价">
              <p>
                补贴不会推高消费者价格，所以比关税和配额造成的福利损失小，但需要财政资金，可能长期依赖、难以取消，也可能被 WTO 判为不公平竞争。例子：美国 2022 年《芯片与科学法案》（CHIPS Act）对本国芯片生产的补贴；欧盟共同农业政策（CAP）对农民的补贴。
              </p>
            </Callout>
            <HL>
              <p>
                <strong>计算（HL）：</strong>Pw = $5，补贴 s = $3/件，Q₁ = 25，Q₂ = 40，Q₃ = 75（千件）。
              </p>
              <Protection kind="subsidy" numeric caption="图 6 补贴的数字例子：Pw = $5，生产者每件实得 $8，数量单位为千件。" />
              <Formula>政府补贴支出 = s × Q₂ = $3 × 40 千 = $120 千</Formula>
              <ul>
                <li>进口：75 − 25 = 50 千件 → 75 − 40 = 35 千件。</li>
                <li>国内生产者收入：$5 × 25 = $125 千 → $8 × 40 = $320 千（其中 $200 千来自市场，$120 千来自补贴）。</li>
                <li>外国生产者收入：$5 × 50 = $250 千 → $5 × 35 = $175 千。消费者支出不变：$5 × 75 = $375 千。</li>
                <li>生产者剩余增加 a = ½ × (25 + 40) × 3 = $97.5 千；福利损失 b = ½ × 15 × 3 = <strong>$22.5 千</strong>（a + b = $120 千）。</li>
              </ul>
            </HL>
          </>
        ),
        en: (
          <>
            <Def term="Subsidy (production subsidy)">
              A payment per unit of output from the government to domestic producers, lowering their costs so they can compete with cheaper imports.
            </Def>
            <p>
              A subsidy of s per unit shifts domestic supply down (to the right) to Sdom + subsidy. The domestic price <strong>stays at Pw</strong> (consumers can still buy imports at Pw), but domestic producers effectively receive Pw + s per unit:
            </p>
            <ul>
              <li>Domestic production rises from Q₁ to Q₂; domestic consumption stays at Q₃.</li>
              <li>Imports fall from Q₁Q₃ to Q₂Q₃.</li>
            </ul>
            <Protection kind="subsidy" caption="Figure 5 A production subsidy: the price stays at Pw, domestic output rises from Q₁ to Q₂ and imports fall from Q₁Q₃ to Q₂Q₃. Government spending = a + b; a = gain in producer surplus, b = welfare loss." />
            <table>
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Effect (Figure 5)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Consumers</td><td>Price and quantity unchanged; expenditure stays at Pw × Q₃.</td></tr>
                <tr><td>Domestic producers</td><td>Produce more; revenue rises from Pw × Q₁ to (Pw + s) × Q₂; producer surplus rises by a.</td></tr>
                <tr><td>Foreign producers</td><td>Sell less; revenue falls from Pw × Q₁Q₃ to Pw × Q₂Q₃.</td></tr>
                <tr><td>Government</td><td>Spends s × Q₂ = a + b, which has an opportunity cost (e.g. education or healthcare).</td></tr>
                <tr><td>Society</td><td>Welfare loss b: Q₁Q₂ is produced by domestic firms whose costs are above Pw.</td></tr>
              </tbody>
            </table>
            <p>
              An <strong>export subsidy</strong> is paid per unit <strong>exported</strong>, letting domestic firms sell abroad more cheaply. Exports rise, but firms prefer exporting to selling at home, so the domestic price may rise; producers in the importing country lose and may accuse the exporter of dumping and retaliate. The WTO bans most export subsidies, and members agreed in 2015 to abolish agricultural export subsidies.
            </p>
            <Callout title="Evaluation">
              <p>
                A subsidy does not raise prices for consumers, so it causes a smaller welfare loss than a tariff or quota, but it must be financed, can become permanent and hard to remove, and may be ruled unfair competition at the WTO. Examples: the US CHIPS and Science Act (2022) subsidising domestic chip making; farm payments under the EU Common Agricultural Policy.
              </p>
            </Callout>
            <HL>
              <p>
                <strong>Calculation (HL):</strong> Pw = $5, subsidy s = $3 per unit, Q₁ = 25, Q₂ = 40, Q₃ = 75 (thousands).
              </p>
              <Protection kind="subsidy" numeric caption="Figure 6 Subsidy worked example: Pw = $5, producers effectively receive $8 per unit, quantities in thousands." />
              <Formula>Cost to government = s × Q₂ = $3 × 40k = $120k</Formula>
              <ul>
                <li>Imports: 75 − 25 = 50k → 75 − 40 = 35k.</li>
                <li>Domestic producers&apos; revenue: $5 × 25k = $125k → $8 × 40k = $320k ($200k from the market plus $120k subsidy).</li>
                <li>Foreign producers&apos; revenue: $5 × 50k = $250k → $5 × 35k = $175k. Consumer expenditure unchanged at $5 × 75k = $375k.</li>
                <li>Gain in producer surplus a = ½ × (25 + 40) × 3 = $97.5k; welfare loss b = ½ × 15 × 3 = <strong>$22.5k</strong> (a + b = $120k).</li>
              </ul>
            </HL>
          </>
        ),
      },
    },
    {
      id: "administrative",
      level: "both",
      title: { zh: "行政壁垒：标准与法规", en: "Administrative barriers: standards and regulations" },
      body: {
        zh: (
          <>
            <Def term="Administrative barriers">
              通过繁琐的规定、标准和程序，而不是直接征税或限量，来增加进口难度或成本的措施。
            </Def>
            <ul>
              <li><strong>健康与安全标准</strong>：对食品、药品、玩具的检验要求，例如欧盟禁止进口使用激素饲养的牛肉。</li>
              <li><strong>产品与技术标准</strong>：规格、标签、包装、环保要求，外国企业需要额外调整产品。</li>
              <li><strong>海关手续与许可证</strong>：复杂的文件、漫长的检查和审批，增加时间和成本。</li>
              <li><strong>政府采购偏向本国企业</strong>：例如规定公共工程优先使用国产材料。</li>
            </ul>
            <p>效果与配额类似：进口减少、国内价格上升、国内生产者受益，但政府没有收入。</p>
            <Callout title="评价">
              <p>
                很多标准有正当理由（保护消费者健康、环境），所以难以判断它是合理监管还是变相保护（disguised protectionism）。它们不透明，不像关税那样容易在 WTO 谈判中削减；对缺乏检测和认证能力的发展中国家出口商打击尤其大。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Administrative barriers">
              Rules, standards and procedures that make importing harder or more costly, rather than taxing or limiting imports directly.
            </Def>
            <ul>
              <li><strong>Health and safety standards</strong>: testing rules for food, medicines and toys, e.g. the EU ban on beef from cattle treated with growth hormones.</li>
              <li><strong>Product and technical standards</strong>: specifications, labelling, packaging and environmental rules that foreign firms must adapt to.</li>
              <li><strong>Customs procedures and licensing</strong>: heavy paperwork, slow inspections and approvals add time and cost.</li>
              <li><strong>Public procurement favouring domestic firms</strong>: e.g. rules that public projects use home-produced materials.</li>
            </ul>
            <p>The effect is similar to a quota: fewer imports, a higher domestic price and gains for domestic producers, but no government revenue.</p>
            <Callout title="Evaluation">
              <p>
                Many standards have legitimate aims (consumer health, the environment), so it is hard to tell genuine regulation from disguised protectionism. They are less transparent than tariffs and harder to negotiate away at the WTO, and they hit exporters from developing countries hardest, as these often lack testing and certification capacity.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "comparison",
      level: "both",
      title: { zh: "各种保护措施的比较", en: "Comparing the types of protection" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>关税</th>
                  <th>配额</th>
                  <th>生产补贴</th>
                  <th>行政壁垒</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>国内价格</td><td>上升</td><td>上升</td><td>不变</td><td>上升</td></tr>
                <tr><td>国内生产</td><td>增加</td><td>增加</td><td>增加</td><td>增加</td></tr>
                <tr><td>国内消费</td><td>减少</td><td>减少</td><td>不变</td><td>减少</td></tr>
                <tr><td>政府</td><td>获得收入</td><td>一般无收入</td><td>需要支出</td><td>无收入</td></tr>
                <tr><td>福利损失</td><td>b + d</td><td>b + d（可能加 c）</td><td>只有 b</td><td>类似配额</td></tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                Paper 1 / Paper 2 的分析题常要求「用图说明某措施对不同利益相关者的影响」。按「消费者 → 国内生产者 → 外国生产者 → 政府 → 社会福利」的顺序写，每一点都对应图中的面积或数量。
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
                  <th>Tariff</th>
                  <th>Quota</th>
                  <th>Production subsidy</th>
                  <th>Administrative barrier</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Domestic price</td><td>Rises</td><td>Rises</td><td>Unchanged</td><td>Rises</td></tr>
                <tr><td>Domestic production</td><td>Rises</td><td>Rises</td><td>Rises</td><td>Rises</td></tr>
                <tr><td>Domestic consumption</td><td>Falls</td><td>Falls</td><td>Unchanged</td><td>Falls</td></tr>
                <tr><td>Government</td><td>Gains revenue</td><td>Usually no revenue</td><td>Must spend</td><td>No revenue</td></tr>
                <tr><td>Welfare loss</td><td>b + d</td><td>b + d (possibly plus c)</td><td>b only</td><td>Similar to a quota</td></tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                Paper 1 and Paper 2 questions often ask you to use a diagram to show the effect of a measure on different stakeholders. Work through consumers → domestic producers → foreign producers → government → society, linking each point to an area or quantity on the diagram.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.2 Types of trade protection",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 34.1 Protectionism: An Indirect Subsidy from Consumers to Producers",
      href: "https://openstax.org/books/principles-economics-3e/pages/34-1-protectionism-an-indirect-subsidy-from-consumers-to-producers",
    },
    {
      label: "WTO — Understanding the WTO: what we stand for",
      href: "https://www.wto.org/english/thewto_e/whatis_e/what_stand_for_e.htm",
    },
  ],
};

export default notes;
