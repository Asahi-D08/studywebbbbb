import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula } from "@/components/notes/blocks";
import {
  Arrow,
  Chart,
  Dot,
  Guide,
  Label,
  Line,
  Region,
  atY,
  intersect,
  shift,
  type Pt,
  type Seg,
} from "@/components/notes/Chart";

type Fn = (q: number) => number;

/** U-shaped short-run cost curves; `k` stretches them horizontally. */
function costs(k: number) {
  const avc: Fn = (q) => 22.8 - 0.213 * (q / k) + 0.0142 * (q / k) ** 2;
  const mc: Fn = (q) => 22.8 - 0.426 * (q / k) + 0.0426 * (q / k) ** 2;
  const ac: Fn = (q) => avc(q) + 576 / (q / k);
  return { avc, mc, ac };
}

function curve(f: Fn, from: number, to: number, n = 40): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const q = from + ((to - from) * i) / n;
    return [q, f(q)] as Pt;
  });
}

/** Root of an increasing function on [lo, hi]. */
function root(f: Fn, lo: number, hi: number): number {
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if (f(m) < 0) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

/** Minimum of a convex function on [lo, hi]. */
function argmin(f: Fn, lo: number, hi: number): number {
  for (let i = 0; i < 100; i++) {
    const a = lo + (hi - lo) / 3;
    const b = hi - (hi - lo) / 3;
    if (f(a) < f(b)) hi = b;
    else lo = a;
  }
  return (lo + hi) / 2;
}

/** Tick label on the price axis without a guide line. */
function YTick({ y, children }: { y: number; children: string }) {
  return (
    <Label at={[-2.3, y - 1.56]} anchor="end">
      {children}
    </Label>
  );
}

/* ---------- Perfect competition ---------- */

const pc = costs(1.6);
const pcMin = argmin(pc.ac, 20, 90);
const pcMinAC = pc.ac(pcMin);

function PriceTaker({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [10, 85],
    [85, 10],
  ];
  const S: Seg = [
    [10, 10],
    [85, 85],
  ];
  const e = intersect(D, S);
  return (
    <>
      <Chart x="Quantity (market)" y="Price">
        <Label at={[55, 92]} muted>
          (a) Industry
        </Label>
        <Line points={D} label="D" />
        <Line points={S} label="S" />
        <Guide at={e} x="Qₑ" y="Pₑ" />
        <Dot at={e} />
      </Chart>
      <Chart x="Quantity (firm)" y="Price" caption={caption}>
        <Label at={[55, 92]} muted>
          (b) Firm
        </Label>
        <Line
          points={[
            [0, e[1]],
            [90, e[1]],
          ]}
        />
        <Label at={[30, e[1] + 3]}>P = D = AR = MR</Label>
        <YTick y={e[1]}>Pₑ</YTick>
      </Chart>
    </>
  );
}

function PCProfit({ caption }: { caption: ReactNode }) {
  const p = 65;
  const q = root((x) => pc.mc(x) - p, 30, 90);
  const c = pc.ac(q);
  return (
    <Chart x="Quantity (firm)" y="Price, costs, revenue" caption={caption}>
      <Region
        points={[
          [0, c],
          [q, c],
          [q, p],
          [0, p],
        ]}
        label="Abnormal profit"
        labelAt={[13, 53]}
      />
      <Line points={curve(pc.mc, 4, 72)} label="MC" smooth />
      <Line points={curve(pc.ac, 13.6, 80)} label="AC" labelOffset={[6, 12]} smooth />
      <Line
        points={[
          [0, p],
          [92, p],
        ]}
      />
      <Label at={[26, 67]}>P = AR = MR</Label>
      <Guide at={[q, p]} x="Q₁" y="P₁" />
      <Guide at={[q, c]} y="C₁" />
      <Dot at={[q, p]} />
    </Chart>
  );
}

function PCLoss({ caption }: { caption: ReactNode }) {
  const p = 40;
  const q = root((x) => pc.mc(x) - p, 30, 90);
  const c = pc.ac(q);
  return (
    <Chart x="Quantity (firm)" y="Price, costs, revenue" caption={caption}>
      <Region
        points={[
          [0, p],
          [q, p],
          [q, c],
          [0, c],
        ]}
        fill="b"
        label="Loss"
      />
      <Line points={curve(pc.mc, 4, 72)} label="MC" smooth />
      <Line points={curve(pc.ac, 13.6, 80)} label="AC" smooth />
      <Line points={curve(pc.avc, 8, 80)} label="AVC" labelOffset={[6, 4]} tone="muted" smooth />
      <Line
        points={[
          [0, p],
          [92, p],
        ]}
      />
      <Label at={[3, 34.5]}>P = AR = MR</Label>
      <Guide at={[q, c]} x="Q₁" y="C₁" />
      <Guide at={[q, p]} y="P₁" />
      <Dot at={[q, p]} />
    </Chart>
  );
}

function PCLongRun({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [5, 90],
    [90, 5],
  ];
  const S1: Seg = [
    [5, 40],
    [55, 90],
  ];
  const e1 = intersect(D, S1);
  const S2 = shift(S1, 2 * (95 - pcMinAC) - 60);
  const e2 = intersect(D, S2);
  const q1 = root((x) => pc.mc(x) - e1[1], 30, 90);
  return (
    <>
      <Chart x="Quantity (market)" y="Price">
        <Label at={[6, 6]} muted>
          (a) Industry
        </Label>
        <Line points={D} label="D" />
        <Line points={S1} label="S₁" />
        <Line points={S2} label="S₂" tone="alt" />
        <Arrow from={[atY(S1, 82)[0] + 3, 82]} to={[atY(S2, 82)[0] - 3, 82]} />
        <Guide at={e1} x="Q₁" y="P₁" />
        <Guide at={e2} x="Q₂" y="P₂" />
        <Dot at={e1} />
        <Dot at={e2} />
      </Chart>
      <Chart x="Quantity (firm)" y="Price, costs, revenue" caption={caption}>
        <Label at={[3, 92]} muted>
          (b) Firm
        </Label>
        <Line points={curve(pc.mc, 4, 72)} label="MC" smooth />
        <Line points={curve(pc.ac, 13.6, 80)} label="AC" labelOffset={[6, 12]} smooth />
        <Line
          points={[
            [0, e1[1]],
            [92, e1[1]],
          ]}
          tone="muted"
        />
        <Line
          points={[
            [0, pcMinAC],
            [92, pcMinAC],
          ]}
          tone="alt"
        />
        <Label at={[26, 67]}>AR₁ = MR₁</Label>
        <Label at={[67, 43.5]}>AR₂ = MR₂</Label>
        <Guide at={[q1, e1[1]]} x="q₁" y="P₁" />
        <Guide at={[pcMin, pcMinAC]} x="q₂" y="P₂" />
        <Dot at={[q1, e1[1]]} />
        <Dot at={[pcMin, pcMinAC]} />
      </Chart>
    </>
  );
}

function AllocativeEfficiency({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [0, 90],
    [85, 5],
  ];
  const S: Seg = [
    [0, 10],
    [85, 95],
  ];
  const e = intersect(D, S);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Region points={[[0, 90], [0, e[1]], e]} label="CS" labelAt={[11, 63]} />
      <Region points={[[0, 10], [0, e[1]], e]} fill="b" label="PS" labelAt={[11, 34]} />
      <Line points={D} label="D = MB" />
      <Line points={S} label="S = MC" />
      <Guide at={e} x="Qₑ" y="Pₑ" />
      <Dot at={e} />
    </Chart>
  );
}

/* ---------- Monopoly ---------- */

function MonopolyChart({
  intercept,
  slope,
  k = 1,
  outcome,
  caption,
}: {
  intercept: number;
  slope: number;
  k?: number;
  outcome: "profit" | "normal" | "loss";
  caption: ReactNode;
}) {
  const c = costs(k);
  const AR: Seg = [
    [0, intercept],
    [Math.min(90, (intercept - 3) / slope), intercept - slope * Math.min(90, (intercept - 3) / slope)],
  ];
  const MR: Seg = [
    [0, intercept],
    [intercept / (2 * slope), 0],
  ];
  const q = root((x) => c.mc(x) - (intercept - 2 * slope * x), 5 * k, 45 * k);
  const p = intercept - slope * q;
  const ac = c.ac(q);
  const mc = c.mc(q);
  return (
    <Chart x="Quantity" y="Price, costs, revenue" caption={caption}>
      {outcome === "profit" && (
        <Region
          points={[
            [0, ac],
            [q, ac],
            [q, p],
            [0, p],
          ]}
          label="Profit"
          labelAt={[6.5, ac + 4]}
        />
      )}
      {outcome === "loss" && (
        <>
          <Region
            points={[
              [0, p],
              [q, p],
              [q, ac],
              [0, ac],
            ]}
            fill="b"
          />
          <Label at={[q + 5, ac + 14]}>Loss</Label>
          <Arrow from={[q + 4.5, ac + 13]} to={[q / 2, (p + ac) / 2]} />
        </>
      )}
      <Line points={curve(c.mc, 2 * k, 45 * k)} label="MC" smooth />
      <Line points={curve(c.ac, 9 * k, 55 * k)} label="AC" smooth />
      <Line points={AR} label="D = AR" />
      <Line points={MR} label="MR" />
      {outcome === "normal" ? (
        <Guide at={[q, p]} x="Q₁" y="P₁ = C₁" />
      ) : (
        <>
          <Guide at={[q, p]} x="Q₁" y="P₁" />
          <Guide at={[q, ac]} y="C₁" />
        </>
      )}
      {outcome === "profit" && <Guide at={[q, mc]} y="MC₁" />}
      <Dot at={[q, p]} />
      <Dot at={[q, mc]} />
    </Chart>
  );
}

function tangentIntercept(k: number, slope: number) {
  const c = costs(k);
  const q = argmin((x) => c.ac(x) + slope * x, 6 * k, 60 * k);
  return c.ac(q) + slope * q;
}

const monoNormal = tangentIntercept(1, 1);

function MonopolyProfit({ caption }: { caption: ReactNode }) {
  return <MonopolyChart intercept={88} slope={1} outcome="profit" caption={caption} />;
}

function MonopolyNormal({ caption }: { caption: ReactNode }) {
  return <MonopolyChart intercept={monoNormal} slope={1} outcome="normal" caption={caption} />;
}

function MonopolyLoss({ caption }: { caption: ReactNode }) {
  return <MonopolyChart intercept={monoNormal - 10} slope={1} outcome="loss" caption={caption} />;
}

function WelfareLoss({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [0, 90],
    [88, 2],
  ];
  const MR: Seg = [
    [0, 90],
    [45, 0],
  ];
  const MC: Seg = [
    [0, 15],
    [85, 90],
  ];
  const pcEq = intersect(D, MC);
  const mrmc = intersect(MR, MC);
  const pm: Pt = [mrmc[0], 90 - mrmc[0]];
  return (
    <Chart x="Quantity" y="Price, costs" caption={caption}>
      <Region points={[pm, pcEq, mrmc]} fill="c" label="DWL" />
      <Line points={D} label="D = AR" />
      <Line points={MR} label="MR" />
      <Line points={MC} label="MC = S" />
      <Guide at={pm} x="Q₁" y="P₁" />
      <Guide at={pcEq} x="Q₂" y="P₂" />
      <Dot at={pm} />
      <Dot at={pcEq} />
      <Dot at={mrmc} />
    </Chart>
  );
}

function NaturalMonopoly({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [0, 90],
    [88, 2],
  ];
  const MR: Seg = [
    [0, 90],
    [45, 0],
  ];
  const MC: Seg = [
    [0, 40],
    [90, 13],
  ];
  const lrac: Fn = (q) => 400 / q + 40 - 0.15 * q;
  const m = intersect(MR, MC);
  const pm: Pt = [m[0], 90 - m[0]];
  const qf = root((x) => lrac(x) - (90 - x), 20, 80);
  const fair: Pt = [qf, 90 - qf];
  const alloc = intersect(D, MC);
  return (
    <Chart x="Quantity" y="Price, costs" caption={caption}>
      <Line points={curve(lrac, 8, 92)} label="LRAC" smooth />
      <Line points={MC} label="LRMC" />
      <Line points={D} label="D = AR" />
      <Line points={MR} label="MR" />
      <Guide at={pm} x="Q₁" y="P₁" />
      <Guide at={fair} x="Q₂" y="P₂" />
      <Guide at={alloc} x="Q₃" y="P₃" />
      <Dot at={pm} />
      <Dot at={m} />
      <Dot at={fair} />
      <Dot at={alloc} />
    </Chart>
  );
}

/* ---------- Oligopoly ---------- */

function Cartel({ caption }: { caption: ReactNode }) {
  const D: Seg = [
    [0, 90],
    [87, 3],
  ];
  const MR: Seg = [
    [0, 90],
    [45, 0],
  ];
  const c = 30;
  const q = (90 - c) / 2;
  const p = 90 - q;
  return (
    <Chart x="Industry output" y="Price, costs" caption={caption}>
      <Region
        points={[
          [0, c],
          [q, c],
          [q, p],
          [0, p],
        ]}
        label="Abnormal profit"
        labelAt={[12.5, 36]}
      />
      <Line points={D} label="D = AR" />
      <Line points={MR} label="MR" />
      <Line
        points={[
          [0, c],
          [86, c],
        ]}
        label="MC = AC"
        labelOffset={[-46, -8]}
      />
      <Guide at={[q, p]} x="Qₘ" y="Pₘ" />
      <Dot at={[q, p]} />
      <Dot at={[q, c]} />
    </Chart>
  );
}

/* ---------- Monopolistic competition ---------- */

const mcLong = tangentIntercept(1.3, 0.5);

function MonCompProfit({ caption }: { caption: ReactNode }) {
  return <MonopolyChart intercept={mcLong + 10} slope={0.5} k={1.3} outcome="profit" caption={caption} />;
}

function MonCompNormal({ caption }: { caption: ReactNode }) {
  return <MonopolyChart intercept={mcLong} slope={0.5} k={1.3} outcome="normal" caption={caption} />;
}

function MonCompLoss({ caption }: { caption: ReactNode }) {
  return <MonopolyChart intercept={mcLong - 7} slope={0.5} k={1.3} outcome="loss" caption={caption} />;
}

function ElasticityCompare({ caption }: { caption: ReactNode }) {
  const D1: Seg = [
    [15, 90],
    [68.125, 5],
  ];
  const D2: Seg = [
    [0, 70],
    [90, 25],
  ];
  const a = atY(D1, 60);
  const b = atY(D2, 60);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Line points={D1} label="D₁" />
      <Line points={D2} label="D₂" tone="alt" />
      <Guide at={[40, 50]} x="Q₁" y="P₁" />
      <Guide at={a} x="Q₂" y="P₂" />
      <Guide at={b} x="Q₃" />
      <Dot at={[40, 50]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "市场势力（market power）指企业影响价格的能力。本节比较四种市场结构：完全竞争、垄断、寡头垄断和垄断竞争，用成本与收益曲线分析利润最大化（MC = MR）以及超额利润、正常利润和亏损。完全竞争在长期实现配置效率；有市场势力的企业定价高于边际成本，产量受限，造成福利损失，因此需要政府用法规、国有化和罚款等方式干预。",
    en: "Market power is a firm's ability to influence the price it charges. This topic compares four market structures: perfect competition, monopoly, oligopoly and monopolistic competition. It uses cost and revenue curves to analyse profit maximisation (MC = MR) and abnormal profit, normal profit and losses. Perfect competition is allocatively efficient in the long run; firms with market power set price above marginal cost and restrict output, causing a welfare loss, which governments may tackle with legislation, regulation, government ownership and fines.",
  },
  sections: [
    {
      id: "market-structures",
      level: "both",
      title: { zh: "市场结构与市场势力", en: "Market structures and market power" },
      body: {
        zh: (
          <>
            <Def term="Market power">
              企业控制或影响其产品价格的能力。市场势力越大，企业越能把价格定得高于边际成本（MC）。
            </Def>
            <p>
              经济学按企业数量、进入壁垒（barriers to entry）和产品差异程度把市场分为四种结构。从完全竞争到垄断，市场势力逐渐增强：
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>完全竞争 Perfect competition</th>
                  <th>垄断竞争 Monopolistic competition</th>
                  <th>寡头垄断 Oligopoly</th>
                  <th>垄断 Monopoly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>企业数量</td>
                  <td>非常多</td>
                  <td>很多</td>
                  <td>少数几家大企业</td>
                  <td>一家（或一家占主导）</td>
                </tr>
                <tr>
                  <td>进入壁垒</td>
                  <td>无，自由进出</td>
                  <td>无，自由进出</td>
                  <td>高</td>
                  <td>很高</td>
                </tr>
                <tr>
                  <td>产品</td>
                  <td>同质（homogeneous）</td>
                  <td>有差异（differentiated）</td>
                  <td>同质或有差异</td>
                  <td>没有相近替代品</td>
                </tr>
                <tr>
                  <td>市场势力</td>
                  <td>没有：价格接受者（price taker）</td>
                  <td>较小：价格制定者（price maker）</td>
                  <td>较大；企业之间相互依存（interdependence）</td>
                  <td>最大：价格制定者</td>
                </tr>
                <tr>
                  <td>例子</td>
                  <td>接近的例子：小麦等农产品市场</td>
                  <td>餐厅、理发店、咖啡店</td>
                  <td>手机、航空、中国三大电信运营商</td>
                  <td>地方自来水公司、电网</td>
                </tr>
              </tbody>
            </table>
            <p>
              垄断竞争和寡头垄断合称<strong>不完全竞争</strong>（imperfect competition）。常见的进入壁垒有：规模经济、专利和执照等法律壁垒、对关键资源的控制、品牌忠诚度、网络效应，以及在位企业的反竞争行为。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Market power">
              The ability of a firm to control or influence the price of its product. The more market power a firm has, the further it can raise price above marginal cost (MC).
            </Def>
            <p>
              Economists classify markets by the number of firms, the height of barriers to entry and how differentiated the product is. Market power rises as we move from perfect competition towards monopoly:
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Perfect competition</th>
                  <th>Monopolistic competition</th>
                  <th>Oligopoly</th>
                  <th>Monopoly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Number of firms</td>
                  <td>Very many</td>
                  <td>Many</td>
                  <td>A few large firms</td>
                  <td>One (or one dominant firm)</td>
                </tr>
                <tr>
                  <td>Barriers to entry</td>
                  <td>None: free entry and exit</td>
                  <td>None: free entry and exit</td>
                  <td>High</td>
                  <td>Very high</td>
                </tr>
                <tr>
                  <td>Product</td>
                  <td>Homogeneous</td>
                  <td>Differentiated</td>
                  <td>Homogeneous or differentiated</td>
                  <td>No close substitutes</td>
                </tr>
                <tr>
                  <td>Market power</td>
                  <td>None: price taker</td>
                  <td>Some: price maker</td>
                  <td>Significant; firms are interdependent</td>
                  <td>Greatest: price maker</td>
                </tr>
                <tr>
                  <td>Examples</td>
                  <td>Close to it: wheat and other farm commodities</td>
                  <td>Restaurants, hairdressers, coffee shops</td>
                  <td>Smartphones, airlines, China&apos;s three telecom operators</td>
                  <td>A local water company, the electricity grid</td>
                </tr>
              </tbody>
            </table>
            <p>
              Monopolistic competition and oligopoly together are called <strong>imperfect competition</strong>. Common barriers to entry are economies of scale, legal barriers such as patents and licences, control of key resources, brand loyalty, network effects and anti-competitive behaviour by existing firms.
            </p>
          </>
        ),
      },
    },
    {
      id: "profit-maximisation",
      level: "both",
      title: { zh: "理性生产者行为：利润最大化", en: "Rational producer behaviour: profit maximisation" },
      body: {
        zh: (
          <>
            <p>经济学假设企业的目标是利润最大化。先掌握几个收益和成本概念：</p>
            <table>
              <thead>
                <tr>
                  <th>概念</th>
                  <th>含义</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>总收益 TR（total revenue）</td>
                  <td>TR = P × Q</td>
                </tr>
                <tr>
                  <td>平均收益 AR（average revenue）</td>
                  <td>AR = TR ÷ Q = P，所以需求曲线就是 AR 曲线</td>
                </tr>
                <tr>
                  <td>边际收益 MR（marginal revenue）</td>
                  <td>多卖一单位带来的 TR 变化：MR = ΔTR ÷ ΔQ</td>
                </tr>
                <tr>
                  <td>平均成本 AC（average cost）</td>
                  <td>AC = TC ÷ Q</td>
                </tr>
                <tr>
                  <td>边际成本 MC（marginal cost）</td>
                  <td>多生产一单位带来的 TC 变化：MC = ΔTC ÷ ΔQ</td>
                </tr>
              </tbody>
            </table>
            <Formula>利润 Profit = TR − TC</Formula>
            <Def term="Profit-maximising rule (MC = MR)">
              企业在边际成本等于边际收益（MC = MR）的产量上实现利润最大化。只要 MR &gt; MC，多生产一单位就会增加利润；一旦 MC &gt; MR，多生产就会减少利润。
            </Def>
            <p>经济学中的成本包含企业家的机会成本，所以利润分三种情况：</p>
            <Def term="Normal profit">
              AR = AC（TR = TC）。收益刚好覆盖包括机会成本在内的全部成本，企业家留在这个行业的最低回报。经济利润为零。
            </Def>
            <Def term="Abnormal profit">
              AR &gt; AC（TR &gt; TC）。收益超过全部经济成本的部分，也叫超额利润或经济利润（economic profit）。
            </Def>
            <Def term="Losses">AR &lt; AC（TR &lt; TC）。收益不足以覆盖全部经济成本。</Def>
            <Callout title="例子：根据数据计算（HL 计算）">
              <p>某垄断企业的数据如下（固定成本为 10）：</p>
              <table>
                <thead>
                  <tr>
                    <th>Q</th>
                    <th>P = AR</th>
                    <th>TR</th>
                    <th>MR</th>
                    <th>TC</th>
                    <th>MC</th>
                    <th>AC</th>
                    <th>利润</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>0</td><td>–</td><td>0</td><td>–</td><td>10</td><td>–</td><td>–</td><td>−10</td></tr>
                  <tr><td>1</td><td>18</td><td>18</td><td>18</td><td>16</td><td>6</td><td>16</td><td>2</td></tr>
                  <tr><td>2</td><td>16</td><td>32</td><td>14</td><td>20</td><td>4</td><td>10</td><td>12</td></tr>
                  <tr><td>3</td><td>14</td><td>42</td><td>10</td><td>24</td><td>4</td><td>8</td><td>18</td></tr>
                  <tr><td>4</td><td>12</td><td>48</td><td>6</td><td>29</td><td>5</td><td>7.25</td><td>19</td></tr>
                  <tr><td>5</td><td>10</td><td>50</td><td>2</td><td>40</td><td>11</td><td>8</td><td>10</td></tr>
                  <tr><td>6</td><td>8</td><td>48</td><td>−2</td><td>54</td><td>14</td><td>9</td><td>−6</td></tr>
                </tbody>
              </table>
              <ul>
                <li>TR = P × Q，例如 Q = 4 时 TR = 12 × 4 = 48。</li>
                <li>MR = ΔTR ÷ ΔQ，例如第 4 单位 MR = 48 − 42 = 6；MC = ΔTC ÷ ΔQ = 29 − 24 = 5。</li>
                <li>AC = TC ÷ Q = 29 ÷ 4 = 7.25；AR = TR ÷ Q = 48 ÷ 4 = 12。</li>
                <li>第 4 单位 MR（6）&gt; MC（5），值得生产；第 5 单位 MR（2）&lt; MC（11），不值得。所以 Q = 4 时利润最大。</li>
                <li>利润 = TR − TC = 48 − 29 = 19，也等于 (AR − AC) × Q = (12 − 7.25) × 4 = 19。因为 AR &gt; AC，这是超额利润。</li>
              </ul>
            </Callout>
            <Callout title="考试提示">
              <p>
                MC = MR 只决定<strong>产量</strong>；价格要从这个产量往上找到需求曲线（AR）才能读出。利润的大小则看 AR 与 AC 的差距乘以产量。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Economists assume firms aim to maximise profit. First, the revenue and cost concepts:</p>
            <table>
              <thead>
                <tr>
                  <th>Concept</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total revenue (TR)</td>
                  <td>TR = P × Q</td>
                </tr>
                <tr>
                  <td>Average revenue (AR)</td>
                  <td>AR = TR ÷ Q = P, so the demand curve is the AR curve</td>
                </tr>
                <tr>
                  <td>Marginal revenue (MR)</td>
                  <td>The change in TR from selling one more unit: MR = ΔTR ÷ ΔQ</td>
                </tr>
                <tr>
                  <td>Average cost (AC)</td>
                  <td>AC = TC ÷ Q</td>
                </tr>
                <tr>
                  <td>Marginal cost (MC)</td>
                  <td>The change in TC from producing one more unit: MC = ΔTC ÷ ΔQ</td>
                </tr>
              </tbody>
            </table>
            <Formula>Profit = TR − TC</Formula>
            <Def term="Profit-maximising rule (MC = MR)">
              A firm maximises profit at the output where marginal cost equals marginal revenue (MC = MR). While MR &gt; MC, each extra unit adds to profit; once MC &gt; MR, extra units reduce profit.
            </Def>
            <p>Economic costs include the entrepreneur&apos;s opportunity cost, so there are three profit outcomes:</p>
            <Def term="Normal profit">
              AR = AC (TR = TC). Revenue just covers all costs, including opportunity cost: the minimum return needed to keep the entrepreneur in the industry. Economic profit is zero.
            </Def>
            <Def term="Abnormal profit">
              AR &gt; AC (TR &gt; TC). Revenue above all economic costs, also called supernormal or economic profit.
            </Def>
            <Def term="Losses">AR &lt; AC (TR &lt; TC). Revenue does not cover all economic costs.</Def>
            <Callout title="Worked example: calculations from data (HL calculation)">
              <p>A monopolist has the following data (fixed cost = 10):</p>
              <table>
                <thead>
                  <tr>
                    <th>Q</th>
                    <th>P = AR</th>
                    <th>TR</th>
                    <th>MR</th>
                    <th>TC</th>
                    <th>MC</th>
                    <th>AC</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>0</td><td>–</td><td>0</td><td>–</td><td>10</td><td>–</td><td>–</td><td>−10</td></tr>
                  <tr><td>1</td><td>18</td><td>18</td><td>18</td><td>16</td><td>6</td><td>16</td><td>2</td></tr>
                  <tr><td>2</td><td>16</td><td>32</td><td>14</td><td>20</td><td>4</td><td>10</td><td>12</td></tr>
                  <tr><td>3</td><td>14</td><td>42</td><td>10</td><td>24</td><td>4</td><td>8</td><td>18</td></tr>
                  <tr><td>4</td><td>12</td><td>48</td><td>6</td><td>29</td><td>5</td><td>7.25</td><td>19</td></tr>
                  <tr><td>5</td><td>10</td><td>50</td><td>2</td><td>40</td><td>11</td><td>8</td><td>10</td></tr>
                  <tr><td>6</td><td>8</td><td>48</td><td>−2</td><td>54</td><td>14</td><td>9</td><td>−6</td></tr>
                </tbody>
              </table>
              <ul>
                <li>TR = P × Q, e.g. at Q = 4, TR = 12 × 4 = 48.</li>
                <li>MR = ΔTR ÷ ΔQ, e.g. for the 4th unit MR = 48 − 42 = 6; MC = ΔTC ÷ ΔQ = 29 − 24 = 5.</li>
                <li>AC = TC ÷ Q = 29 ÷ 4 = 7.25; AR = TR ÷ Q = 48 ÷ 4 = 12.</li>
                <li>For the 4th unit MR (6) &gt; MC (5), so it is worth producing; for the 5th MR (2) &lt; MC (11), so it is not. Profit is maximised at Q = 4.</li>
                <li>Profit = TR − TC = 48 − 29 = 19, which also equals (AR − AC) × Q = (12 − 7.25) × 4 = 19. Since AR &gt; AC, this is abnormal profit.</li>
              </ul>
            </Callout>
            <Callout title="Exam tip">
              <p>
                MC = MR fixes the <strong>quantity</strong> only; read the price by going up from that quantity to the demand (AR) curve. The size of profit is the gap between AR and AC multiplied by quantity.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "perfect-competition",
      level: "both",
      title: { zh: "完全竞争：价格接受者与配置效率", en: "Perfect competition: price takers and allocative efficiency" },
      body: {
        zh: (
          <>
            <p>
              完全竞争的假设：企业非常多、产品同质、自由进出、信息完全。每家企业相对市场都很小，提价就会失去所有顾客，所以它没有市场势力，只能接受行业供求决定的价格 Pₑ。
            </p>
            <Def term="Price taker">
              必须接受市场价格的企业。它面对的需求曲线在 Pₑ 处是一条水平线：P = D = AR = MR，因为每多卖一单位都能得到同样的价格。
            </Def>
            <PriceTaker caption="图 1 (a) 行业供求决定价格 Pₑ；(b) 单个企业在 Pₑ 面对一条水平的需求曲线，P = D = AR = MR。" />
            <p>
              <strong>短期</strong>：企业在 MC = MR 处生产，盈亏取决于价格与 AC 的关系。价格高于 AC 时获得超额利润；价格低于 AC 时亏损。
            </p>
            <PCProfit caption="图 2 完全竞争企业短期超额利润：在 MC = MR 处生产 Q₁，价格 P₁ 高于平均成本 C₁，阴影部分为超额利润。" />
            <PCLoss caption="图 3 完全竞争企业短期亏损：价格 P₁ 低于平均成本 C₁，阴影部分为亏损。因为 P₁ 仍高于 AVC，企业短期内继续生产。" />
            <p>
              （拓展）短期内只要价格不低于平均可变成本（AVC），企业就会继续生产，因为固定成本无论生产与否都要支付；价格低于 AVC 才会停产。
            </p>
            <p>
              <strong>长期</strong>：没有进入壁垒，所以超额利润会吸引新企业进入，行业供给 S₁ 右移到 S₂，价格下降，直到价格等于 AC 的最低点，只剩正常利润。反之，亏损会让企业退出，供给左移，价格上升，同样回到正常利润。
            </p>
            <PCLongRun caption="图 4 完全竞争的长期调整：(a) 超额利润吸引新企业进入，行业供给从 S₁ 移到 S₂，价格从 P₁ 降到 P₂；(b) 企业的需求线从 AR₁ 降到 AR₂，在 AC 最低点生产 q₂，只获得正常利润。" />
            <Def term="Allocative efficiency">
              资源配置使社会福利最大化的状态：生产的数量恰好是社会最想要的，即价格等于边际成本（P = MC），或边际收益等于边际成本（MB = MC）。此时社会剩余（community surplus，即消费者剩余加生产者剩余）最大。
            </Def>
            <p>
              完全竞争市场在均衡点 P = MC，社会剩余最大，没有福利损失，因此是配置有效率的。长期中企业还在 AC 最低点生产，也是生产有效率的（productive efficiency）。
            </p>
            <AllocativeEfficiency caption="图 5 完全竞争市场的配置效率：在 Qₑ 处 D = MB 与 S = MC 相交，P = MC，消费者剩余（CS）加生产者剩余（PS）最大。" />
            <Callout title="画图要点">
              <ul>
                <li>MC 必须从下方穿过 AC 的<strong>最低点</strong>；利润最大化点取 MC 曲线<strong>上升段</strong>与 MR 的交点。</li>
                <li>企业图横轴写 Quantity（firm），行业图写 Quantity（market），两图价格要对齐。</li>
                <li>利润或亏损的矩形：高是 P 与 AC 之差，宽是 Q₁。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              Perfect competition assumes very many firms, a homogeneous product, free entry and exit, and perfect information. Each firm is tiny relative to the market: if it raised its price it would lose every customer. It has no market power and must accept the price Pₑ set by industry supply and demand.
            </p>
            <Def term="Price taker">
              A firm that must accept the market price. Its demand curve is horizontal at Pₑ, so P = D = AR = MR: every extra unit sells for the same price.
            </Def>
            <PriceTaker caption="Figure 1 (a) Industry supply and demand set the price Pₑ; (b) the individual firm faces a horizontal demand curve at Pₑ, so P = D = AR = MR." />
            <p>
              <strong>Short run</strong>: the firm produces where MC = MR, and whether it profits depends on price relative to AC. If price is above AC it earns abnormal profit; if price is below AC it makes a loss.
            </p>
            <PCProfit caption="Figure 2 Short-run abnormal profit for a perfectly competitive firm: it produces Q₁ where MC = MR; price P₁ exceeds average cost C₁, and the shaded area is abnormal profit." />
            <PCLoss caption="Figure 3 Short-run loss for a perfectly competitive firm: price P₁ is below average cost C₁ and the shaded area is the loss. As P₁ is still above AVC, the firm keeps producing in the short run." />
            <p>
              (Extension) In the short run the firm keeps producing as long as price covers average variable cost (AVC), because fixed costs must be paid whether or not it produces; it shuts down only if price falls below AVC.
            </p>
            <p>
              <strong>Long run</strong>: with no barriers to entry, abnormal profit attracts new firms. Industry supply shifts from S₁ to S₂ and price falls until it equals the minimum of AC, leaving only normal profit. Losses work the other way: firms exit, supply shifts left and price rises back to the normal-profit level.
            </p>
            <PCLongRun caption="Figure 4 Long-run adjustment in perfect competition: (a) abnormal profit attracts entry, industry supply shifts from S₁ to S₂ and price falls from P₁ to P₂; (b) the firm&apos;s demand line falls from AR₁ to AR₂ and it produces q₂ at minimum AC, earning only normal profit." />
            <Def term="Allocative efficiency">
              Resources are allocated so that social welfare is maximised: the quantity produced is exactly what society most wants, where price equals marginal cost (P = MC), or marginal benefit equals marginal cost (MB = MC). Community surplus (consumer plus producer surplus) is then at its maximum.
            </Def>
            <p>
              A perfectly competitive market reaches P = MC at equilibrium, so community surplus is maximised with no welfare loss: it is allocatively efficient. In the long run firms also produce at minimum AC, so they are productively efficient too.
            </p>
            <AllocativeEfficiency caption="Figure 5 Allocative efficiency in a perfectly competitive market: at Qₑ, D = MB meets S = MC, so P = MC and consumer surplus (CS) plus producer surplus (PS) is maximised." />
            <Callout title="Drawing checklist">
              <ul>
                <li>MC must cut AC from below at the <strong>minimum</strong> of AC; the profit-maximising point is where the <strong>rising</strong> part of MC meets MR.</li>
                <li>Label the firm&apos;s axis Quantity (firm) and the industry&apos;s Quantity (market), and line up the price levels of the two diagrams.</li>
                <li>The profit or loss rectangle has height P minus AC and width Q₁.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "monopoly",
      level: "both",
      title: { zh: "垄断：利润最大化、福利损失与自然垄断", en: "Monopoly: profit maximisation, welfare loss and natural monopoly" },
      body: {
        zh: (
          <>
            <p>
              垄断企业就是整个行业，所以它面对的是向下倾斜的<strong>市场需求曲线</strong>（D = AR）。要多卖就必须对所有单位降价，因此 MR 低于 AR；对于直线型需求曲线，MR 与 AR 纵截距相同，但<strong>斜率是 AR 的两倍</strong>，在 AR 横截距的一半处与横轴相交。
            </p>
            <p>
              垄断企业在 MC = MR 处生产 Q₁，再到需求曲线上读出价格 P₁。因为 AR 在 MR 之上，价格总是高于边际成本（<strong>AR &gt; MC</strong>），这正是市场势力的体现。
            </p>
            <MonopolyProfit caption="图 6 垄断企业的超额利润：在 MC = MR 处生产 Q₁，定价 P₁，高于平均成本 C₁，也高于边际成本 MC₁（AR > MC）。阴影部分为超额利润。" />
            <p>
              高进入壁垒阻止新企业进入，所以垄断企业的超额利润在<strong>长期也能维持</strong>。但垄断不保证一定有利润：如果需求较弱或成本较高，也可能只有正常利润甚至亏损。
            </p>
            <MonopolyNormal caption="图 7 垄断企业获得正常利润：AC 在 Q₁ 处与需求曲线相切，P₁ = C₁。" />
            <MonopolyLoss caption="图 8 垄断企业亏损：在 MC = MR 处，价格 P₁ 低于平均成本 C₁，阴影部分为亏损。" />
            <p>
              <strong>配置无效率（市场失灵）</strong>：垄断在 P &gt; MC 处生产，消费者对最后一单位的评价（P）高于生产它的成本（MC），社会想要更多产量，但垄断企业不愿意生产。与完全竞争相比，垄断<strong>产量更低、价格更高</strong>，社会剩余减少，产生福利损失（welfare loss，也叫无谓损失）。
            </p>
            <WelfareLoss caption="图 9 垄断与完全竞争比较：若行业是完全竞争，在 D = MC 处生产 Q₂、价格 P₂；垄断在 MR = MC 处只生产 Q₁、价格升至 P₁。深色三角形（DWL）是垄断造成的福利损失。" />
            <Def term="Natural monopoly">
              由于规模经济很大，长期平均成本（LRAC）在整个市场需求范围内都在下降，一家企业供应整个市场的成本低于两家或更多企业。例如自来水管网、电网、铁路轨道。
            </Def>
            <p>
              自然垄断如果不受管制，会在 MR = MC 处生产 Q₁、定价 P₁。政府如果要求按边际成本定价（P = MC），产量 Q₃ 是配置有效率的，但此时 P₃ 低于 LRAC，企业亏损，需要补贴；如果要求按平均成本定价（P = AC），企业在 Q₂ 处只获得正常利润，产量比不受管制时多、价格更低。
            </p>
            <NaturalMonopoly caption="图 10 自然垄断：LRAC 在整个需求范围内下降，LRMC 位于其下方。不受管制时在 MR = LRMC 处生产 Q₁、价格 P₁；平均成本定价（P = AC）得到 Q₂、P₂；边际成本定价（P = MC）得到 Q₃、P₃，但价格低于 LRAC，企业亏损。" />
            <Callout title="画图要点">
              <ul>
                <li>直线型 MR 与 AR 起点相同、斜率是 AR 的两倍，在 AR 横截距的一半处碰到横轴。</li>
                <li>先找 MC = MR 定产量，再垂直向上到 AR 读价格，到 AC 读平均成本。</li>
                <li>福利损失三角形在 Q₁ 与 Q₂ 之间，夹在需求曲线和 MC 之间。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              A monopolist is the whole industry, so it faces the downward-sloping <strong>market demand curve</strong> (D = AR). To sell more it must cut the price on all units, so MR lies below AR. With a linear demand curve, MR starts at the same vertical intercept but has <strong>twice the slope</strong> of AR, cutting the quantity axis halfway to where AR does.
            </p>
            <p>
              The monopolist produces Q₁ where MC = MR and reads price P₁ off the demand curve. Because AR lies above MR, price always exceeds marginal cost (<strong>AR &gt; MC</strong>): this is market power in action.
            </p>
            <MonopolyProfit caption="Figure 6 Abnormal profit for a monopolist: it produces Q₁ where MC = MR and charges P₁, which is above average cost C₁ and above marginal cost MC₁ (AR > MC). The shaded area is abnormal profit." />
            <p>
              High barriers to entry keep new firms out, so a monopolist can keep abnormal profit <strong>in the long run</strong>. Monopoly does not guarantee profit, though: with weak demand or high costs it may earn only normal profit or even make a loss.
            </p>
            <MonopolyNormal caption="Figure 7 A monopolist earning normal profit: AC is tangent to the demand curve at Q₁, so P₁ = C₁." />
            <MonopolyLoss caption="Figure 8 A monopolist making a loss: at MC = MR, price P₁ is below average cost C₁; the shaded area is the loss." />
            <p>
              <strong>Allocative inefficiency (market failure)</strong>: a monopolist produces where P &gt; MC. Consumers value the last unit (P) more than it costs to make (MC), so society wants more output, but the monopolist will not supply it. Compared with perfect competition, monopoly has <strong>lower output and a higher price</strong>; community surplus shrinks and there is a welfare loss (deadweight loss).
            </p>
            <WelfareLoss caption="Figure 9 Monopoly compared with perfect competition: a competitive industry would produce Q₂ at price P₂, where D = MC. The monopolist produces only Q₁, where MR = MC, and charges P₁. The dark triangle (DWL) is the welfare loss caused by monopoly." />
            <Def term="Natural monopoly">
              A market where economies of scale are so large that long-run average cost (LRAC) falls over the whole range of market demand, so one firm can supply the entire market more cheaply than two or more firms. Examples: water pipe networks, electricity grids, rail track.
            </Def>
            <p>
              Left unregulated, a natural monopoly produces Q₁ where MR = MC and charges P₁. If the government imposes marginal-cost pricing (P = MC), output Q₃ is allocatively efficient, but P₃ is below LRAC, so the firm makes a loss and needs a subsidy. With average-cost pricing (P = AC), the firm earns normal profit at Q₂, producing more at a lower price than when unregulated.
            </p>
            <NaturalMonopoly caption="Figure 10 Natural monopoly: LRAC falls over the whole range of demand, with LRMC below it. Unregulated, the firm produces Q₁ at P₁ where MR = LRMC; average-cost pricing (P = AC) gives Q₂ and P₂; marginal-cost pricing (P = MC) gives Q₃ and P₃, but the price is below LRAC and the firm makes a loss." />
            <Callout title="Drawing checklist">
              <ul>
                <li>A linear MR starts at the same point as AR, is twice as steep, and meets the quantity axis halfway to AR&apos;s intercept.</li>
                <li>Find output where MC = MR, then go straight up to AR for the price and to AC for average cost.</li>
                <li>The welfare loss triangle lies between Q₁ and Q₂, bounded by the demand curve and MC.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "oligopoly",
      level: "both",
      title: { zh: "寡头垄断：合谋、博弈论与市场集中度", en: "Oligopoly: collusion, game theory and concentration" },
      body: {
        zh: (
          <>
            <p>
              寡头垄断市场由少数几家大企业主导，进入壁垒高。关键特征是<strong>相互依存</strong>（interdependence）：每家企业的最佳决策取决于对手如何反应，所以企业要做策略性决策。
            </p>
            <table>
              <thead>
                <tr>
                  <th>合谋寡头 Collusive oligopoly</th>
                  <th>非合谋寡头 Non-collusive oligopoly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    企业约定价格、产量或划分市场，以限制竞争。公开的正式协议叫<strong>卡特尔</strong>（cartel），例如石油输出国组织（OPEC）；暗中的默契叫默许合谋（tacit collusion）。多数国家的竞争法禁止卡特尔。
                  </td>
                  <td>
                    企业之间没有协议，各自竞争。由于害怕对手跟进降价，价格往往比较稳定，企业更多依靠<strong>非价格竞争</strong>。
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              合谋的寡头相当于一个垄断者：它们按行业的 MR = MC 决定总产量 Qₘ，在行业需求曲线上定价 Pₘ，然后瓜分超额利润。
            </p>
            <Cartel caption="图 11 合谋寡头像垄断者一样行动：按行业 MR = MC 限制产量到 Qₘ，定价 Pₘ，共同获得超额利润（为简单起见，假设 MC = AC 不变）。" />
            <p>
              <strong>合谋的动机</strong>：减少不确定性，避免价格战，共同获得垄断利润。<strong>作弊的动机</strong>：在其他成员维持高价时，一家企业偷偷降价或多产就能抢走更多份额、获得更多利润；但如果人人作弊，卡特尔就会瓦解。<strong>价格战的风险</strong>：一家降价，其他企业跟进，价格可能一路降到所有企业都只剩很低的利润，例如 2023 年以来中国电动汽车行业的降价潮。
            </p>
            <p>
              <strong>简单博弈论</strong>（game theory）用收益矩阵（payoff matrix）分析相互依存。下表是两家企业选择高价或低价时的利润（百万元，A 在前，B 在后）：
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>B 定高价</th>
                  <th>B 定低价</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>A 定高价</strong></td>
                  <td>A 50，B 50</td>
                  <td>A 20，B 70</td>
                </tr>
                <tr>
                  <td><strong>A 定低价</strong></td>
                  <td>A 70，B 20</td>
                  <td>A 30，B 30</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>站在 A 的角度：如果 B 定高价，A 定低价得 70 &gt; 50；如果 B 定低价，A 定低价得 30 &gt; 20。无论 B 怎么做，低价对 A 都更好，这叫<strong>占优策略</strong>（dominant strategy）。B 的情况相同。</li>
              <li>结果两家都定低价，各得 30，比都定高价（各 50）更差。这就是「囚徒困境」（prisoner&apos;s dilemma）。</li>
              <li>它解释了为什么企业有<strong>合谋的动机</strong>（一起定高价各得 50），也解释了为什么有<strong>作弊的动机</strong>（对方高价时自己降价得 70）。</li>
            </ul>
            <p>
              <strong>配置无效率</strong>：寡头企业有市场势力，价格高于边际成本（P &gt; MC），合谋时尤其如此，因此存在福利损失。
            </p>
            <p>
              <strong>价格竞争与非价格竞争</strong>：价格竞争指降价抢顾客，风险是引发价格战。非价格竞争包括广告、品牌、产品质量和设计、售后服务、会员积分等，目的在于增加需求并降低需求的价格弹性，在寡头市场中很常见。
            </p>
            <Def term="Concentration ratio">
              行业中最大的 n 家企业所占的市场份额（通常按销售额计算）之和，用来衡量市场集中度。例如 CR₄ 是最大 4 家企业的份额之和。
            </Def>
            <Callout title="例子：计算集中度">
              <p>某国超市行业最大四家企业的市场份额为 30%、20%、15%、10%，其余 25% 由许多小企业分享。</p>
              <Formula>CR₄ = 30% + 20% + 15% + 10% = 75%</Formula>
              <p>
                集中度这么高，说明市场接近寡头垄断。注意：集中度不反映前几家企业之间的规模差异（一家 60%、其余各 5% 与四家各约 19% 的 CR₄ 相同），也不考虑进口竞争和市场范围的界定。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              An oligopoly is dominated by a few large firms behind high barriers to entry. Its key feature is <strong>interdependence</strong>: each firm&apos;s best decision depends on how its rivals react, so firms must act strategically.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Collusive oligopoly</th>
                  <th>Non-collusive oligopoly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Firms agree on prices, output or market shares to limit competition. A formal, open agreement is a <strong>cartel</strong>, e.g. OPEC; an unspoken understanding is tacit collusion. Most countries&apos; competition laws ban cartels.
                  </td>
                  <td>
                    Firms compete without any agreement. Fearing that rivals will match price cuts, prices tend to be stable and firms rely more on <strong>non-price competition</strong>.
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              Colluding oligopolists act like a single monopolist: they set total output Qₘ where industry MR = MC, charge Pₘ on the industry demand curve and share the abnormal profit.
            </p>
            <Cartel caption="Figure 11 A collusive oligopoly acting as a monopoly: output is restricted to Qₘ where industry MR = MC and price is set at Pₘ, giving joint abnormal profit (for simplicity MC = AC is constant)." />
            <p>
              <strong>Incentive to collude</strong>: less uncertainty, no price wars and a share of monopoly profit. <strong>Incentive to cheat</strong>: while the others keep prices high, one firm can secretly cut its price or raise output to win market share and more profit; but if everyone cheats, the cartel collapses. <strong>Risk of a price war</strong>: one firm cuts its price, rivals follow, and prices can fall until every firm earns very little, as in the Chinese electric-vehicle price cuts since 2023.
            </p>
            <p>
              <strong>Simple game theory</strong> uses a payoff matrix to analyse interdependence. The table shows profits (in $ millions, A first, B second) when each firm chooses a high or a low price:
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>B: high price</th>
                  <th>B: low price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>A: high price</strong></td>
                  <td>A 50, B 50</td>
                  <td>A 20, B 70</td>
                </tr>
                <tr>
                  <td><strong>A: low price</strong></td>
                  <td>A 70, B 20</td>
                  <td>A 30, B 30</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>From A&apos;s point of view: if B goes high, A earns 70 &gt; 50 by going low; if B goes low, A earns 30 &gt; 20 by going low. Low price is better for A whatever B does: a <strong>dominant strategy</strong>. The same holds for B.</li>
              <li>Both firms go low and earn 30 each, which is worse than 50 each if both went high. This is the prisoner&apos;s dilemma.</li>
              <li>It shows the <strong>incentive to collude</strong> (both agree on a high price for 50 each) and the <strong>incentive to cheat</strong> (cutting price while the rival stays high earns 70).</li>
            </ul>
            <p>
              <strong>Allocative inefficiency</strong>: oligopolists have market power and set P &gt; MC, especially when they collude, so there is a welfare loss.
            </p>
            <p>
              <strong>Price and non-price competition</strong>: price competition means cutting prices to win customers, at the risk of a price war. Non-price competition includes advertising, branding, product quality and design, after-sales service and loyalty schemes. It aims to raise demand and make it less price elastic, and is very common in oligopoly.
            </p>
            <Def term="Concentration ratio">
              The combined market share (usually by sales) of the largest n firms in an industry, used to measure market concentration. For example, CR₄ is the total share of the four largest firms.
            </Def>
            <Callout title="Worked example: concentration ratio">
              <p>In a country&apos;s supermarket industry the four largest firms have shares of 30%, 20%, 15% and 10%; many small firms share the remaining 25%.</p>
              <Formula>CR₄ = 30% + 20% + 15% + 10% = 75%</Formula>
              <p>
                Such a high ratio suggests the market is an oligopoly. Note that the ratio hides how size is split among the top firms (one firm at 60% and three at 5% gives the same CR₄ as four firms at about 19%), and it ignores import competition and how the market is defined.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "monopolistic-competition",
      level: "both",
      title: { zh: "垄断竞争", en: "Monopolistic competition" },
      body: {
        zh: (
          <>
            <p>
              垄断竞争有很多企业、自由进出，但产品有差异（品牌、地点、质量、服务）。每家企业对自己的产品有一点市场势力，所以需求曲线向下倾斜；但替代品很多，需求曲线比垄断企业的<strong>更平缓、更有弹性</strong>，市场势力较小。
            </p>
            <p>
              <strong>短期</strong>：和垄断一样在 MC = MR 处生产，可能获得超额利润，也可能亏损。
            </p>
            <MonCompProfit caption="图 12 垄断竞争企业短期超额利润：在 MC = MR 处生产 Q₁、定价 P₁，高于平均成本 C₁。需求曲线比垄断的平缓。" />
            <MonCompLoss caption="图 13 垄断竞争企业短期亏损：价格 P₁ 低于平均成本 C₁。" />
            <p>
              <strong>长期</strong>：超额利润吸引新企业进入，每家企业的顾客被分走，需求曲线左移（并变得更有弹性），直到 AR 与 AC 相切，只剩正常利润；亏损则使企业退出，留下的企业需求增加，同样回到正常利润。
            </p>
            <MonCompNormal caption="图 14 垄断竞争企业的长期均衡：AR 与 AC 在 Q₁ 处相切，P₁ = C₁，只有正常利润。" />
            <ElasticityCompare caption="图 15 垄断竞争企业的需求（D₂）比垄断企业的需求（D₁）更有弹性：价格从 P₁ 升到 P₂ 时，垄断企业的需求量只降到 Q₂，垄断竞争企业的需求量降到 Q₃。" />
            <p>
              <strong>配置无效率</strong>：长期均衡时 P &gt; MC（图 14 中 P₁ 高于 MC 与 MR 的交点），所以仍是市场失灵；企业也不在 AC 最低点生产，存在过剩产能。
            </p>
            <p>
              <strong>但无效率程度较小，产品种类更多</strong>：需求更有弹性，价格与 MC 的差距比垄断小，福利损失也更小；而且消费者能在大量有差异的产品中选择，这本身也有价值。
            </p>
          </>
        ),
        en: (
          <>
            <p>
              Monopolistic competition has many firms and free entry and exit, but products are differentiated (by brand, location, quality or service). Each firm has a little market power over its own product, so its demand curve slopes down; but there are many substitutes, so demand is <strong>flatter and more elastic</strong> than a monopolist&apos;s and market power is smaller.
            </p>
            <p>
              <strong>Short run</strong>: like a monopolist, the firm produces where MC = MR and may earn abnormal profit or make a loss.
            </p>
            <MonCompProfit caption="Figure 12 Short-run abnormal profit for a monopolistically competitive firm: it produces Q₁ where MC = MR and charges P₁, above average cost C₁. The demand curve is flatter than a monopolist&apos;s." />
            <MonCompLoss caption="Figure 13 Short-run loss for a monopolistically competitive firm: price P₁ is below average cost C₁." />
            <p>
              <strong>Long run</strong>: abnormal profit attracts new firms, which take customers away. Each firm&apos;s demand shifts left (and becomes more elastic) until AR is tangent to AC, leaving only normal profit. Losses cause exit, raising demand for the remaining firms until they too earn normal profit.
            </p>
            <MonCompNormal caption="Figure 14 Long-run equilibrium in monopolistic competition: AR is tangent to AC at Q₁, so P₁ = C₁ and the firm earns only normal profit." />
            <ElasticityCompare caption="Figure 15 Demand for a monopolistically competitive firm (D₂) is more elastic than for a monopolist (D₁): when price rises from P₁ to P₂, the monopolist&apos;s quantity falls only to Q₂, but the monopolistically competitive firm&apos;s falls to Q₃." />
            <p>
              <strong>Allocative inefficiency</strong>: in long-run equilibrium P &gt; MC (in Figure 14, P₁ is above the point where MC = MR), so there is still market failure. The firm also does not produce at minimum AC, so it has excess capacity.
            </p>
            <p>
              <strong>But there is less inefficiency and more product variety</strong>: demand is more elastic, so the gap between price and MC, and the welfare loss, is smaller than under monopoly. Consumers also gain from a wide choice of differentiated products.
            </p>
          </>
        ),
      },
    },
    {
      id: "large-firms",
      level: "both",
      title: { zh: "大企业市场势力的利与弊", en: "Advantages and risks of large firms with market power" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>好处</th>
                  <th>风险</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>规模经济</strong>（economies of scale）：大企业平均成本更低，可能以比许多小企业更低的价格供货；自然垄断中一家企业供应整个市场成本最低。
                  </td>
                  <td>
                    <strong>产量</strong>：限制产量以抬高价格，产量低于社会最优水平，造成福利损失。
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>研发与创新</strong>：超额利润可以为研发（R&amp;D）提供资金，带来新产品和更低成本的生产方法，例如制药和科技企业；专利保护的临时垄断就是为了鼓励创新。
                  </td>
                  <td>
                    <strong>价格</strong>：价格高于 MC，也可能高于竞争市场水平，消费者剩余转移给企业，低收入消费者受损最大。
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>财务稳定</strong>：利润使企业能承受经济冲击，投资长期项目。
                  </td>
                  <td>
                    <strong>消费者选择</strong>：品种少，质量和服务可能下降；缺乏竞争压力时企业可能变得低效（X-inefficiency）。
                  </td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                结论取决于具体市场：规模经济和创新是否真正以低价、新产品的形式传递给消费者？市场是否「可竞争」，潜在进入者的威胁能否约束大企业？企业是靠更好的产品赢得市场份额，还是靠排挤对手？短期福利损失和长期创新收益之间需要权衡。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Advantages</th>
                  <th>Risks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Economies of scale</strong>: large firms have lower average costs and may supply more cheaply than many small firms; in a natural monopoly one firm supplying the whole market is the lowest-cost option.
                  </td>
                  <td>
                    <strong>Output</strong>: output is restricted to push up price, so it is below the social optimum and there is a welfare loss.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>R&amp;D and innovation</strong>: abnormal profit can fund research and development (R&amp;D), bringing new products and cheaper production methods, e.g. in pharmaceuticals and technology. The temporary monopoly granted by a patent exists to encourage this.
                  </td>
                  <td>
                    <strong>Price</strong>: price is above MC and may be above the competitive level, transferring consumer surplus to the firm; low-income consumers are hit hardest.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Financial stability</strong>: profits let firms survive economic shocks and invest in long-term projects.
                  </td>
                  <td>
                    <strong>Consumer choice</strong>: less variety, and quality and service may fall; without competitive pressure firms may become inefficient (X-inefficiency).
                  </td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                The answer depends on the market. Are economies of scale and innovation actually passed on as lower prices and new products? Is the market contestable, so that the threat of entry disciplines large firms? Did the firm win its share with better products or by squeezing out rivals? The short-run welfare loss has to be weighed against long-run gains from innovation.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "government-intervention",
      level: "both",
      title: { zh: "政府应对滥用市场势力", en: "Government intervention in response to abuse of market power" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>措施</th>
                  <th>做法与例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>法律与监管 Legislation and regulation</td>
                  <td>
                    竞争法（反垄断法）禁止卡特尔和滥用支配地位，审查并可阻止会大幅削弱竞争的并购；对自然垄断实行价格管制，例如价格上限，或要求按平均成本定价。例如 2024 年美国法院裁定谷歌在搜索市场非法维持垄断。
                  </td>
                </tr>
                <tr>
                  <td>政府所有 Government ownership</td>
                  <td>
                    由国有企业经营自然垄断行业（如电网、自来水、铁路），按接近成本的价格向公众供应，而不是追求利润最大化，例如中国的国家电网。
                  </td>
                </tr>
                <tr>
                  <td>罚款 Fines</td>
                  <td>
                    对违法企业按营业额处以高额罚款，惩罚并威慑反竞争行为。例如欧盟 2018 年因安卓相关做法罚谷歌 43.4 亿欧元；中国市场监管总局 2021 年因「二选一」罚阿里巴巴 182.28 亿元。
                  </td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <ul>
                <li>监管需要企业真实成本的信息，存在信息不对称，政府可能定错价格；企业也可能游说甚至「俘获」监管机构（regulatory capture）。</li>
                <li>国有企业缺乏利润激励，可能低效，并需要财政支持；但能保证普遍服务。</li>
                <li>罚款相对巨头的利润可能太小，难以改变行为；诉讼耗时多年，市场在此期间早已变化。</li>
                <li>拆分或限制大企业可能牺牲规模经济和创新，政策要在效率与竞争之间权衡。</li>
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
                  <th>How it works, with examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Legislation and regulation</td>
                  <td>
                    Competition (antitrust) law bans cartels and the abuse of a dominant position, and lets authorities review and block mergers that would greatly reduce competition. Natural monopolies face price regulation such as price caps or average-cost pricing. In 2024, for example, a US court ruled that Google had illegally maintained a monopoly in online search.
                  </td>
                </tr>
                <tr>
                  <td>Government ownership</td>
                  <td>
                    State-owned firms run natural monopolies (electricity grids, water, railways) and supply the public at prices close to cost rather than maximising profit, e.g. State Grid in China.
                  </td>
                </tr>
                <tr>
                  <td>Fines</td>
                  <td>
                    Large fines, often linked to turnover, punish and deter anti-competitive behaviour. In 2018 the EU fined Google €4.34 billion over Android practices; in 2021 China&apos;s market regulator (SAMR) fined Alibaba ¥18.228 billion for forcing merchants to sell only on its platform.
                  </td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <ul>
                <li>Regulators need information on firms&apos; true costs; with asymmetric information they may set the wrong price, and firms may lobby or capture the regulator (regulatory capture).</li>
                <li>State-owned firms lack a profit incentive, may be inefficient and can need government funding, but they can guarantee universal service.</li>
                <li>Fines may be small relative to a giant&apos;s profits and so fail to change behaviour; cases take years, by which time the market has moved on.</li>
                <li>Breaking up or restricting large firms may sacrifice economies of scale and innovation, so policy must balance efficiency against competition.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.11 Market failure: market power",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 8.2 How perfectly competitive firms make output decisions",
      href: "https://openstax.org/books/principles-economics-3e/pages/8-2-how-perfectly-competitive-firms-make-output-decisions",
    },
    {
      label: "OpenStax Principles of Economics 3e — 9.2 How a profit-maximizing monopoly chooses output and price",
      href: "https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price",
    },
    {
      label: "OpenStax Principles of Economics 3e — 10.2 Oligopoly",
      href: "https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly",
    },
    {
      label: "Economics Help — Concentration ratio",
      href: "https://www.economicshelp.org/blog/glossary/concentration-ratio/",
    },
  ],
};

export default notes;
