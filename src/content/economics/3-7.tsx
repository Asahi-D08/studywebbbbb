import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, atX, atY, intersect, shift, type Seg } from "@/components/notes/Chart";

type Cap = { caption: ReactNode };

const AD: Seg = [
  [10, 88],
  [78, 20],
];

function LrasShift({ caption, withAd = false }: Cap & { withAd?: boolean }) {
  const ad2 = shift(AD, 17);
  const a = atX(AD, 45);
  const b = atX(withAd ? ad2 : AD, 62);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <Line points={[[45, 4], [45, 92]]} label="LRAS₁" labelOffset={[-18, -8]} />
      <Line points={[[62, 4], [62, 92]]} label="LRAS₂" tone="alt" labelOffset={[-18, -8]} />
      <Line points={AD} label={withAd ? "AD₁" : "AD"} />
      {withAd && <Line points={ad2} label="AD₂" tone="alt" />}
      <Guide at={a} x="Yf₁" y="P₁" />
      <Guide at={b} x="Yf₂" y={withAd ? undefined : "P₂"} />
      <Arrow from={[47, 80]} to={[60, 80]} />
      {withAd && <Arrow from={[25, 75]} to={[38, 75]} />}
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

function AbolishMinWage({ caption }: Cap) {
  const dl: Seg = [
    [10, 88],
    [85, 13],
  ];
  const sl: Seg = [
    [10, 12],
    [85, 87],
  ];
  const e = intersect(dl, sl);
  const qd = atY(dl, 65);
  const qs = atY(sl, 65);
  return (
    <Chart x="Quantity of labour" y="Wage rate" caption={caption}>
      <Line points={[[0, 65], [88, 65]]} tone="alt" />
      <Line points={dl} label="DL" />
      <Line points={sl} label="SL" />
      <Guide at={e} x="Qe" y="We" />
      <Guide at={qd} x="Qd" y="Wmin" />
      <Guide at={qs} x="Qs" />
      <Arrow from={[48, 70]} to={[qd[0] + 1, 70]} />
      <Arrow from={[48, 70]} to={[qs[0] - 1, 70]} />
      <Label at={[48, 73]} anchor="middle">
        Unemployment
      </Label>
      <Dot at={e} />
      <Dot at={qd} />
      <Dot at={qs} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "供给侧政策旨在提高经济的生产能力和效率，使 LRAS 右移，从而实现长期增长、降低失业并抑制通胀。本节区分市场导向政策（鼓励竞争、劳动力市场改革、激励政策）和干预主义政策（教育、医疗、研发、基建、产业政策），分析供给侧政策的需求侧效应和财政政策的供给侧效应，并评价各类政策的局限与优势。",
    en: "Supply-side policies aim to raise the productive capacity and efficiency of the economy, shifting LRAS right to deliver long-term growth, lower unemployment and lower inflation. This topic separates market-based policies (encouraging competition, labour market reform and incentive-related policies) from interventionist policies (education, health care, R&D, infrastructure and industrial policy), looks at the demand-side effects of supply-side policies and the supply-side effects of fiscal policy, and evaluates their constraints and strengths.",
  },
  sections: [
    {
      id: "goals",
      level: "both",
      title: { zh: "供给侧政策的目标", en: "Goals of supply-side policies" },
      body: {
        zh: (
          <>
            <Def term="Supply-side policies">
              旨在提高经济中生产要素的数量和质量、提升效率和生产率，从而使 LRAS（或凯恩斯 AS 的垂直部分）右移的政策。
            </Def>
            <ul>
              <li>通过扩大经济的生产能力实现<strong>长期增长</strong></li>
              <li>改善<strong>竞争和效率</strong></li>
              <li>通过提高劳动力市场灵活性，<strong>降低劳动成本和失业</strong></li>
              <li><strong>降低通胀</strong>，提高国际竞争力</li>
              <li>降低成本，增加企业<strong>投资于创新</strong>的激励</li>
            </ul>
            <LrasShift caption="图 1 供给侧政策使 LRAS₁ 右移到 LRAS₂：充分就业产出从 Yf₁ 增至 Yf₂，价格水平从 P₁ 降至 P₂。" />
            <Callout title="画图要点">
              <ul>
                <li>LRAS 垂直于 Yf，标注 LRAS₁、LRAS₂ 和 Yf₁、Yf₂。</li>
                <li>用凯恩斯模型时，画整条 AS 曲线右移，垂直部分对应的 Yf 增加。</li>
                <li>说明是哪种生产要素的数量或质量提高了，不要只写「生产能力增加」。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Supply-side policies">
              Policies that aim to increase the quantity and quality of factors of production and raise efficiency and productivity, shifting LRAS (or the vertical part of the Keynesian AS curve) to the right.
            </Def>
            <ul>
              <li><strong>Long-term growth</strong> by increasing the economy&apos;s productive capacity</li>
              <li>Improving <strong>competition and efficiency</strong></li>
              <li><strong>Reducing labour costs and unemployment</strong> through labour market flexibility</li>
              <li><strong>Reducing inflation</strong> to improve international competitiveness</li>
              <li>Increasing firms&apos; incentives to <strong>invest in innovation</strong> by reducing costs</li>
            </ul>
            <LrasShift caption="Figure 1 Supply-side policies shift LRAS₁ right to LRAS₂: full employment output rises from Yf₁ to Yf₂ and the price level falls from P₁ to P₂." />
            <Callout title="Drawing checklist">
              <ul>
                <li>LRAS is vertical at Yf; label LRAS₁, LRAS₂ and Yf₁, Yf₂.</li>
                <li>With the Keynesian model, shift the whole AS curve right so that its vertical section is at a higher Yf.</li>
                <li>Explain which factor of production has increased in quantity or quality; do not just write that capacity increases.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "market-competition",
      level: "both",
      title: { zh: "市场导向政策：鼓励竞争", en: "Market-based policies: encouraging competition" },
      body: {
        zh: (
          <>
            <p>市场导向政策的思路是减少政府干预，让市场更自由地运作，通过竞争和激励提高效率。</p>
            <table>
              <thead>
                <tr>
                  <th>政策</th>
                  <th>作用机制</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>放松管制 Deregulation</td>
                  <td>减少行业进入壁垒和繁琐规定，降低企业成本，新企业进入加剧竞争（如航空业放松管制催生廉价航空）</td>
                </tr>
                <tr>
                  <td>私有化 Privatization</td>
                  <td>把国有企业出售给私人部门，利润动机促使其降低成本、提高效率</td>
                </tr>
                <tr>
                  <td>贸易自由化 Trade liberalization</td>
                  <td>降低关税和配额，国内企业面对外国竞争必须提高效率；还可获得更便宜的进口投入品</td>
                </tr>
                <tr>
                  <td>反垄断监管 Anti-monopoly regulation</td>
                  <td>阻止企业滥用市场支配力、合谋或进行削弱竞争的并购，迫使企业降价、创新</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
        en: (
          <>
            <p>Market-based policies reduce government intervention and let markets work more freely, raising efficiency through competition and incentives.</p>
            <table>
              <thead>
                <tr>
                  <th>Policy</th>
                  <th>How it works</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Deregulation</td>
                  <td>Removing barriers to entry and red tape lowers firms&apos; costs and lets new firms enter, increasing competition (e.g. airline deregulation led to low-cost carriers)</td>
                </tr>
                <tr>
                  <td>Privatization</td>
                  <td>Selling state-owned enterprises to the private sector, where the profit motive pushes firms to cut costs and become more efficient</td>
                </tr>
                <tr>
                  <td>Trade liberalization</td>
                  <td>Lower tariffs and quotas force domestic firms to become more efficient in the face of foreign competition and give access to cheaper imported inputs</td>
                </tr>
                <tr>
                  <td>Anti-monopoly regulation</td>
                  <td>Preventing firms from abusing market power, colluding or merging in ways that reduce competition, so firms must cut prices and innovate</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
    },
    {
      id: "market-labour-incentives",
      level: "both",
      title: { zh: "市场导向政策：劳动力市场与激励政策", en: "Market-based policies: labour market and incentive-related policies" },
      body: {
        zh: (
          <>
            <p>
              <strong>劳动力市场政策</strong>旨在提高劳动力市场灵活性，降低劳动成本：
            </p>
            <ul>
              <li><strong>削弱工会力量：</strong>工会议价能力下降，工资更贴近市场水平，企业更愿意雇人。</li>
              <li><strong>减少失业救济：</strong>增加找工作的激励，缩短失业时间，减少摩擦性失业。</li>
              <li><strong>取消最低工资：</strong>工资可以降到均衡水平，劳动需求量增加，消除最低工资造成的失业。</li>
            </ul>
            <AbolishMinWage caption="图 2 最低工资 Wmin 高于均衡工资 We，造成 Qd 到 Qs 的失业。取消最低工资后，工资降到 We，就业量变为 Qe，劳动力市场出清。" />
            <p>
              <strong>激励相关政策：</strong>
            </p>
            <ul>
              <li><strong>降低个人所得税：</strong>提高工作的税后回报，鼓励更多人工作、工作更长时间，增加劳动供给。</li>
              <li><strong>降低企业税和资本利得税：</strong>提高投资的税后利润，鼓励企业投资和创业，资本存量增加。</li>
            </ul>
            <Callout title="评价">
              <p>
                这些政策可能扩大不平等：低薪工人失去最低工资和工会的保护，减税的好处主要流向高收入者。减税对劳动供给的作用也不确定，人们可能因收入已够而选择少工作（收入效应）。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Labour market policies</strong> aim to make the labour market more flexible and lower labour costs:
            </p>
            <ul>
              <li><strong>Reducing the power of labour unions:</strong> weaker bargaining power keeps wages closer to market levels, so firms are more willing to hire.</li>
              <li><strong>Reducing unemployment benefits:</strong> stronger incentives to look for work shorten spells of unemployment and reduce frictional unemployment.</li>
              <li><strong>Abolishing minimum wages:</strong> wages can fall to equilibrium, quantity of labour demanded rises and the unemployment caused by the minimum wage disappears.</li>
            </ul>
            <AbolishMinWage caption="Figure 2 A minimum wage Wmin above the equilibrium wage We causes unemployment of Qd to Qs. Abolishing it lets the wage fall to We and employment become Qe, so the labour market clears." />
            <p>
              <strong>Incentive-related policies:</strong>
            </p>
            <ul>
              <li><strong>Personal income tax cuts:</strong> raise the after-tax reward for work, encouraging more people to work and to work longer hours, increasing labour supply.</li>
              <li><strong>Cuts in business tax and capital gains tax:</strong> raise after-tax returns on investment, encouraging firms to invest and people to start businesses, so the capital stock grows.</li>
            </ul>
            <Callout title="Evaluation">
              <p>
                These policies may widen inequality: low-paid workers lose the protection of minimum wages and unions, and tax cuts mainly benefit high earners. The effect of tax cuts on labour supply is also uncertain, as some people may choose to work less once they earn enough (the income effect).
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "interventionist",
      level: "both",
      title: { zh: "干预主义政策", en: "Interventionist policies" },
      body: {
        zh: (
          <>
            <p>干预主义政策由政府直接投入资源，弥补市场在提供公共品和正外部性商品方面的不足。</p>
            <table>
              <thead>
                <tr>
                  <th>政策</th>
                  <th>作用机制</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>教育和培训</td>
                  <td>提高劳动力的人力资本和生产率，再培训帮助结构性失业者转岗</td>
                </tr>
                <tr>
                  <td>提高医疗的质量、数量和可及性</td>
                  <td>更健康的劳动力更有生产力，缺勤减少，工作年限延长</td>
                </tr>
                <tr>
                  <td>研究与开发（R&amp;D）</td>
                  <td>政府资助科研或给企业研发税收抵免，推动技术进步</td>
                </tr>
                <tr>
                  <td>提供基础设施</td>
                  <td>交通、能源、通信网络降低企业成本，提高效率</td>
                </tr>
                <tr>
                  <td>产业政策 Industrial policies</td>
                  <td>政府扶持对增长重要的行业（如半导体、新能源），提供补贴、低息贷款、税收优惠</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>美国 2022 年的《芯片与科学法案》（CHIPS and Science Act）为本土半导体生产和研发提供大规模补贴；韩国长期大规模投资教育和研发，是其快速增长的重要原因。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Interventionist policies involve the government directly committing resources, making up for the market&apos;s under-provision of public goods and goods with positive externalities.</p>
            <table>
              <thead>
                <tr>
                  <th>Policy</th>
                  <th>How it works</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Education and training</td>
                  <td>Raises human capital and labour productivity; retraining helps the structurally unemployed move into new jobs</td>
                </tr>
                <tr>
                  <td>Improving the quality, quantity and access to health care</td>
                  <td>A healthier workforce is more productive, takes fewer sick days and works for more years</td>
                </tr>
                <tr>
                  <td>Research and development (R&amp;D)</td>
                  <td>Government funding of research or R&amp;D tax credits for firms speeds up technological progress</td>
                </tr>
                <tr>
                  <td>Provision of infrastructure</td>
                  <td>Transport, energy and communications networks lower firms&apos; costs and raise efficiency</td>
                </tr>
                <tr>
                  <td>Industrial policies</td>
                  <td>Government support for sectors important for growth (e.g. semiconductors, renewable energy) through subsidies, cheap loans and tax breaks</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>The US CHIPS and Science Act of 2022 provides large subsidies for domestic semiconductor production and research; South Korea&apos;s long-term heavy investment in education and R&amp;D is a key reason for its rapid growth.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "interactions",
      level: "both",
      title: { zh: "供给侧政策的需求侧效应与财政政策的供给侧效应", en: "Demand-side effects of supply-side policies and supply-side effects of fiscal policy" },
      body: {
        zh: (
          <>
            <p>
              <strong>供给侧政策的需求侧效应：</strong>很多供给侧政策同时也是 AD 的组成部分。政府在教育、医疗、基建和研发上的支出（G）、企业因减税而增加的投资（I）、个人减税带来的消费（C），在短期内就会使 AD 右移；生产能力的提高（LRAS 右移）则需要较长时间才出现。
            </p>
            <LrasShift withAd caption="图 3 AD 和 LRAS 同时右移：例如基建支出先增加 AD（AD₁ 到 AD₂），之后扩大生产能力（LRAS₁ 到 LRAS₂）。产出从 Yf₁ 增至 Yf₂，价格水平保持在 P₁，实现无通胀增长。" />
            <p>
              <strong>财政政策的供给侧效应：</strong>财政政策不只影响需求。政府资本性支出（基建、学校、医院）和对教育、培训、研发的支出会提高 LRAS；降低所得税和企业税会改变工作和投资激励。所以扩张性财政政策若用于投资而不是消费性支出，长期内可以扩大生产能力。
            </p>
            <Callout title="考试提示">
              <p>评价供给侧政策时，要区分短期（AD 效应，可能带来通胀）和长期（LRAS 效应，降低通胀压力）。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Demand-side effects of supply-side policies:</strong> many supply-side policies are also components of AD. Government spending (G) on education, health care, infrastructure and R&amp;D, extra investment (I) by firms after tax cuts and extra consumption (C) after income tax cuts all shift AD right in the short run, while the gain in capacity (LRAS shifting right) takes much longer.
            </p>
            <LrasShift withAd caption="Figure 3 AD and LRAS both shift right: e.g. infrastructure spending first raises AD (AD₁ to AD₂) and later expands capacity (LRAS₁ to LRAS₂). Output rises from Yf₁ to Yf₂ while the price level stays at P₁: growth without inflation." />
            <p>
              <strong>Supply-side effects of fiscal policies:</strong> fiscal policy affects more than demand. Government capital spending (infrastructure, schools, hospitals) and spending on education, training and R&amp;D raise LRAS, and cuts in income and business taxes change incentives to work and invest. So expansionary fiscal policy focused on investment rather than current spending can raise capacity in the long run.
            </p>
            <Callout title="Exam tip">
              <p>When evaluating supply-side policies, separate the short run (AD effects, which may be inflationary) from the long run (LRAS effects, which reduce inflationary pressure).</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "effectiveness",
      level: "both",
      title: { zh: "供给侧政策的有效性", en: "Effectiveness of supply-side policies" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>市场导向政策</th>
                  <th>干预主义政策</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>局限</td>
                  <td>
                    <strong>公平问题：</strong>削弱工会、减少救济、取消最低工资和降低最高税率会扩大不平等；<strong>时滞</strong>：竞争和激励的效果需要时间显现；<strong>既得利益</strong>：受保护的行业和工会会反对改革；<strong>环境影响</strong>：放松管制可能放松环保标准
                  </td>
                  <td>
                    <strong>成本高：</strong>需要大量政府支出，有机会成本，可能增加债务；<strong>时滞长</strong>：教育和基建可能要十年以上才见效；政府可能「挑错赢家」（产业政策失败）
                  </td>
                </tr>
                <tr>
                  <td>优势</td>
                  <td>
                    <strong>改善资源配置：</strong>价格信号和竞争使资源流向效率最高的用途；<strong>不增加政府预算负担</strong>（私有化甚至带来收入）
                  </td>
                  <td>
                    <strong>直接支持对增长重要的部门；</strong>弥补市场失灵（教育、医疗的正外部性）；教育和医疗投资还能减少不平等
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>目标</th>
                  <th>优势</th>
                  <th>局限</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>增长</td>
                  <td>唯一能持续扩大生产能力的政策，增长可以长期持续</td>
                  <td>见效慢，不能解决衰退中的需求不足</td>
                </tr>
                <tr>
                  <td>低失业</td>
                  <td>能减少结构性和摩擦性失业，降低自然失业率</td>
                  <td>对周期性失业无效；劳动力市场改革短期内可能增加失业</td>
                </tr>
                <tr>
                  <td>低而稳定的通胀</td>
                  <td>LRAS 右移在不推高价格的情况下增加产出，缓解通胀压力</td>
                  <td>短期内需求侧效应可能推高通胀；无法快速应对通胀</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                供给侧政策是长期增长的基础，但不能替代需求管理。最有效的做法通常是把两者结合：短期用货币和财政政策稳定需求，长期用供给侧政策提高生产能力。政策选择也取决于政治立场：市场导向派更强调效率，干预主义派更重视公平和政府的作用。
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
                  <th>Market-based policies</th>
                  <th>Interventionist policies</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Constraints</td>
                  <td>
                    <strong>Equity issues:</strong> weaker unions, lower benefits, no minimum wage and lower top tax rates widen inequality; <strong>time lags</strong>: the effects of competition and incentives take time; <strong>vested interests</strong>: protected industries and unions resist reform; <strong>environmental impact</strong>: deregulation may weaken environmental standards
                  </td>
                  <td>
                    <strong>Costs:</strong> they need large amounts of government spending, with an opportunity cost and possibly more debt; <strong>time lags</strong>: education and infrastructure may take a decade or more to pay off; governments may pick the wrong winners (failed industrial policy)
                  </td>
                </tr>
                <tr>
                  <td>Strengths</td>
                  <td>
                    <strong>Improved resource allocation:</strong> price signals and competition move resources to their most efficient uses; <strong>no burden on the government budget</strong> (privatization even raises revenue)
                  </td>
                  <td>
                    <strong>Direct support of sectors important for growth;</strong> they correct market failures (positive externalities of education and health care), and investment in education and health can reduce inequality
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Objective</th>
                  <th>Strengths</th>
                  <th>Limitations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Growth</td>
                  <td>The only policy that raises productive capacity, so growth can be sustained</td>
                  <td>Slow to work; cannot fix a shortage of demand in a recession</td>
                </tr>
                <tr>
                  <td>Low unemployment</td>
                  <td>Reduces structural and frictional unemployment, lowering the natural rate</td>
                  <td>No effect on cyclical unemployment; labour market reform may raise unemployment in the short run</td>
                </tr>
                <tr>
                  <td>Low and stable inflation</td>
                  <td>LRAS shifting right raises output without pushing up prices, easing inflationary pressure</td>
                  <td>Demand-side effects may add to inflation in the short run; cannot respond quickly to inflation</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                Supply-side policies are the basis of long-term growth but cannot replace demand management. The most effective approach usually combines the two: monetary and fiscal policy to stabilise demand in the short run, and supply-side policy to raise capacity in the long run. The choice also reflects political views: market-based supporters stress efficiency, interventionists stress equity and the role of the state.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 3.7 Supply-side policies",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "Economics Help — Supply-side policies",
      href: "https://www.economicshelp.org/macroeconomics/economic-growth/supply-side-policies/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 24.6 Keynes' law and Say's law in the AD/AS model",
      href: "https://openstax.org/books/principles-economics-3e/pages/24-6-keynes-law-and-says-law-in-the-ad-as-model",
    },
  ],
};

export default notes;
