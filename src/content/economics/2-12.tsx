import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const STROKE = "stroke-brand-800 dark:stroke-brand-200";
const TEXT = "fill-slate-800 dark:fill-slate-100";
const TEXT_MUTED = "fill-slate-500 dark:fill-slate-400";

function Box({ x, y, w, h, lines }: { x: number; y: number; w: number; h: number; lines: string[] }) {
  const top = y + h / 2 - ((lines.length - 1) * 15) / 2 + 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} strokeWidth={1.8} className={`${STROKE} fill-brand-300/20 dark:fill-brand-400/15`} />
      {lines.map((t, i) => (
        <text
          key={t}
          x={x + w / 2}
          y={top + i * 15}
          textAnchor="middle"
          className={i === 0 ? TEXT : TEXT_MUTED}
          fontWeight={i === 0 ? 600 : 400}
          fontSize={i === 0 ? 12 : 10.5}
        >
          {t}
        </text>
      ))}
    </g>
  );
}

function Flow({ d, width = 1.6, muted = false }: { d: string; width?: number; muted?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={width}
      markerEnd={width > 3 ? "url(#cf-eq-arrow-lg)" : "url(#cf-eq-arrow)"}
      className={muted ? "stroke-slate-400 dark:stroke-slate-500" : STROKE}
    />
  );
}

function Note({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={10.5} className={TEXT}>
      {children}
    </text>
  );
}

function InequalityFlow({ caption }: { caption: ReactNode }) {
  return (
    <figure className="notes-figure">
      <svg viewBox="0 0 440 320" role="img" aria-label="Circular flow of income with two groups of households" className="mx-auto block w-full max-w-[440px]" fontSize={12}>
        <defs>
          <marker id="cf-eq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-slate-700 dark:fill-slate-300" />
          </marker>
          <marker id="cf-eq-arrow-lg" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="16" markerHeight="18" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-brand-800 dark:fill-brand-200" />
          </marker>
        </defs>
        <Box x={20} y={70} w={100} h={180} lines={["Firms"]} />
        <Box x={320} y={70} w={110} h={85} lines={["Households A", "own capital, land", "and high skills"]} />
        <Box x={320} y={165} w={110} h={85} lines={["Households B", "own only", "low-skill labour"]} />

        <Flow d="M70,70 L70,32 L375,32 L375,66" muted />
        <Note x={222} y={25}>Goods and services</Note>

        <Flow d="M120,92 L304,92" width={7} />
        <Note x={220} y={70}>Large factor incomes:</Note>
        <Note x={220} y={83}>profit, rent, interest, high wages</Note>
        <Flow d="M320,130 L124,130" muted />
        <Note x={220} y={146}>capital, land, skilled labour</Note>

        <Flow d="M120,190 L316,190" width={1.6} />
        <Note x={220} y={182}>Small factor income: low wages</Note>
        <Flow d="M320,226 L124,226" muted />
        <Note x={220} y={242}>low-skill labour</Note>

        <Flow d="M375,250 L375,288 L70,288 L70,254" muted />
        <Note x={222} y={306}>Spending on goods and services</Note>
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "市场能有效率地配置资源，却不保证公平。在自由市场中，收入取决于家庭拥有多少生产要素以及这些要素的市场价值，而要素的所有权本身就分布不均，所以市场必然产生收入与财富的不平等。本节用收入循环流动模型说明这个过程，并解释为什么这被视为一种市场失灵。",
    en: "Markets can allocate resources efficiently, but they do not guarantee fairness. In a free market, income depends on how many factors of production a household owns and what the market will pay for them, and ownership of factors is itself unequal, so the market inevitably produces inequality of income and wealth. This topic uses the circular flow model to show how, and explains why this is seen as a market failure.",
  },
  sections: [
    {
      id: "equity",
      level: "both",
      title: { zh: "公平、收入与财富", en: "Equity, income and wealth" },
      body: {
        zh: (
          <>
            <Def term="Equity">
              公平（fairness）。在经济学中通常指收入和财富分配是否公正。它是一个规范性（normative）概念，取决于价值判断。
            </Def>
            <Def term="Equality">
              平等，即每个人得到<strong>同样多</strong>的收入或财富。公平不等于平等：许多人认为按努力和贡献获得不同收入是公平的，但认为极端差距或因出身造成的差距不公平。
            </Def>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>收入 Income</th>
                  <th>财富 Wealth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>含义</td>
                  <td>一段时间内获得的货币<strong>流量</strong>（flow），如每月工资</td>
                  <td>某一时点拥有的资产<strong>存量</strong>（stock），如房产、股票、存款</td>
                </tr>
                <tr>
                  <td>来源</td>
                  <td>要素收入：工资、租金、利息、利润；以及政府转移支付</td>
                  <td>储蓄积累下来的收入、继承、资产升值</td>
                </tr>
                <tr>
                  <td>关系</td>
                  <td colSpan={2}>财富会产生收入（租金、利息、股息），收入又能存下来变成财富，所以两者相互强化。</td>
                </tr>
              </tbody>
            </table>
            <p>
              市场的价格机制按<strong>购买力</strong>分配商品：谁愿意并能够付钱，谁就得到商品。这可以带来配置效率，但社会中最需要的人往往购买力最低。所以市场即使有效率，结果也可能不公平。IB 把「市场无法实现公平」看作一种市场失灵。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Equity">
              Fairness. In economics it usually refers to whether the distribution of income and wealth is just. It is a normative idea that depends on value judgements.
            </Def>
            <Def term="Equality">
              Everyone receiving the <strong>same</strong> income or wealth. Equity is not the same as equality: many people think it is fair for incomes to differ with effort and contribution, but not for gaps to be extreme or to depend on the family someone is born into.
            </Def>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Income</th>
                  <th>Wealth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Meaning</td>
                  <td>A <strong>flow</strong> of money received over a period, e.g. a monthly wage</td>
                  <td>A <strong>stock</strong> of assets owned at a point in time, e.g. property, shares, savings</td>
                </tr>
                <tr>
                  <td>Sources</td>
                  <td>Factor incomes (wages, rent, interest, profit) plus government transfers</td>
                  <td>Accumulated saving, inheritance, rising asset prices</td>
                </tr>
                <tr>
                  <td>Link</td>
                  <td colSpan={2}>Wealth generates income (rent, interest, dividends), and saved income becomes wealth, so each reinforces the other.</td>
                </tr>
              </tbody>
            </table>
            <p>
              The price mechanism allocates goods by <strong>purchasing power</strong>: whoever is willing and able to pay gets the good. This can be allocatively efficient, but the people in greatest need often have the least purchasing power. So even an efficient market can give an unfair outcome. The IB treats the market&apos;s inability to achieve equity as a market failure.
            </p>
          </>
        ),
      },
    },
    {
      id: "circular-flow",
      level: "both",
      title: { zh: "用循环流动模型解释不平等", en: "Using the circular flow model to explain inequality" },
      body: {
        zh: (
          <>
            <p>
              在收入循环流动模型中，家庭向企业提供生产要素（土地、劳动、资本、企业家才能），企业支付要素收入：土地得租金（rent），劳动得工资（wages），资本得利息（interest），企业家才能得利润（profit）。家庭再用这些收入向企业购买商品和服务。
            </p>
            <p>
              关键在于：<strong>家庭的收入取决于它拥有多少要素，以及市场愿意为这些要素付多少钱</strong>。而要素的所有权本身分布极不均匀：
            </p>
            <ul>
              <li>A 类家庭拥有资本、土地和高技能劳动，从企业那里得到大量的利润、租金、利息和高工资。</li>
              <li>B 类家庭只能提供低技能劳动，劳动供给多、需求有限，所以只得到很低的工资。</li>
              <li>没有任何要素可卖的人（如儿童、老人、残障人士、长期失业者）在市场中几乎没有收入。</li>
            </ul>
            <InequalityFlow caption="图 1 循环流动模型中的不平等：两类家庭都向企业提供要素，但拥有资本、土地和高技能的 A 类家庭获得的要素收入（粗箭头）远多于只能提供低技能劳动的 B 类家庭（细箭头），因此 A 的购买力也大得多。" />
            <p>
              这个过程还会<strong>自我强化</strong>：A 类家庭收入高，能储蓄和投资，积累更多资本（财富），下一期获得更多利息和利润；还能为子女投资教育，把高技能和财富传给下一代。B 类家庭几乎没有储蓄，难以积累资本或提升技能。所以不受干预的自由市场会让收入和财富差距越拉越大。
            </p>
            <Callout title="画图要点">
              <ul>
                <li>标出两个部门：家庭（Households）和企业（Firms）。</li>
                <li>上半圈：要素服务从家庭流向企业，要素收入（工资、租金、利息、利润）从企业流向家庭。</li>
                <li>下半圈：商品和服务从企业流向家庭，消费支出从家庭流向企业。</li>
                <li>用粗细不同的箭头或两类家庭说明：要素收入取决于要素的数量和质量，从而导致不平等。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              In the circular flow of income model, households supply factors of production (land, labour, capital, entrepreneurship) to firms, and firms pay factor incomes: rent for land, wages for labour, interest for capital and profit for entrepreneurship. Households then spend this income on firms&apos; goods and services.
            </p>
            <p>
              The key point: <strong>a household&apos;s income depends on how many factors it owns and how much the market will pay for them</strong>, and ownership of factors is very unequal:
            </p>
            <ul>
              <li>Households A own capital, land and high-skilled labour, and receive large flows of profit, rent, interest and high wages.</li>
              <li>Households B can offer only low-skilled labour, which is plentiful relative to demand, so they receive low wages.</li>
              <li>People with no factors to sell (children, many elderly or disabled people, the long-term unemployed) receive almost no market income.</li>
            </ul>
            <InequalityFlow caption="Figure 1 Inequality in the circular flow: both groups of households supply factors to firms, but Households A, who own capital, land and high skills, receive far larger factor incomes (thick arrow) than Households B, who can offer only low-skilled labour (thin arrow). A therefore also has far more purchasing power." />
            <p>
              The process is <strong>self-reinforcing</strong>. High-income households can save and invest, building up capital (wealth) that earns more interest and profit next period, and can pay for their children&apos;s education, passing on both skills and wealth. Low-income households can save little, so they struggle to build capital or skills. Left alone, a free market tends to widen gaps in income and wealth.
            </p>
            <Callout title="Drawing checklist">
              <ul>
                <li>Show the two sectors: households and firms.</li>
                <li>Upper loop: factor services flow from households to firms; factor incomes (wages, rent, interest, profit) flow from firms to households.</li>
                <li>Lower loop: goods and services flow from firms to households; consumer spending flows from households to firms.</li>
                <li>Use arrows of different thickness, or two groups of households, to show that factor income depends on the quantity and quality of factors owned, which creates inequality.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "causes",
      level: "both",
      title: { zh: "要素所有权为何不均", en: "Why ownership of factors is unequal" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>原因</th>
                  <th>如何造成收入差距</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>人力资本差异 Human capital</td>
                  <td>教育、培训和健康水平不同，技能稀缺的劳动者工资高。获得教育的机会本身又取决于家庭收入。</td>
                </tr>
                <tr>
                  <td>继承 Inheritance</td>
                  <td>继承来的土地、房产和股票带来租金、利息和股息，与个人努力无关。</td>
                </tr>
                <tr>
                  <td>市场势力 Market power</td>
                  <td>有市场势力的企业所有者获得超额利润；有议价能力的职业或工会成员工资更高（见 2.11）。</td>
                </tr>
                <tr>
                  <td>歧视 Discrimination</td>
                  <td>因性别、种族、户籍等受到歧视，就业机会和工资更低。</td>
                </tr>
                <tr>
                  <td>无法参与劳动市场</td>
                  <td>年老、残障、照顾家人或失业的人缺少可出售的要素，市场收入很少甚至为零。</td>
                </tr>
                <tr>
                  <td>运气与技术变化</td>
                  <td>技术进步提高了高技能劳动的需求，降低了部分低技能岗位的需求，扩大了工资差距。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                根据《世界不平等报告 2022》（World Inequality Report 2022），全球最富有的 10% 人口获得全球 52% 的收入，拥有 76% 的财富；最穷的一半人口只获得 8.5% 的收入，拥有 2% 的财富。可见财富比收入分配得更不均匀。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Cause</th>
                  <th>How it creates income gaps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Human capital</td>
                  <td>Differences in education, training and health; workers with scarce skills earn more. Access to education itself depends on family income.</td>
                </tr>
                <tr>
                  <td>Inheritance</td>
                  <td>Inherited land, property and shares earn rent, interest and dividends unrelated to personal effort.</td>
                </tr>
                <tr>
                  <td>Market power</td>
                  <td>Owners of firms with market power earn abnormal profit; workers in professions or unions with bargaining power earn higher wages (see 2.11).</td>
                </tr>
                <tr>
                  <td>Discrimination</td>
                  <td>Discrimination by gender, ethnicity or residency status reduces job opportunities and pay.</td>
                </tr>
                <tr>
                  <td>Exclusion from the labour market</td>
                  <td>The elderly, disabled, carers and the unemployed have few factors to sell, so their market income is low or zero.</td>
                </tr>
                <tr>
                  <td>Luck and technological change</td>
                  <td>Technology has raised demand for high-skilled labour and reduced it for some low-skilled jobs, widening wage gaps.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                According to the World Inequality Report 2022, the richest 10% of the world&apos;s population receive 52% of global income and own 76% of wealth, while the poorest half receive 8.5% of income and own just 2% of wealth. Wealth is even more unequally distributed than income.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "market-failure",
      level: "both",
      title: { zh: "为什么这是市场失灵？评价", en: "Why is this a market failure? Evaluation" },
      body: {
        zh: (
          <>
            <p>
              前面的市场失灵（外部性、公共物品、信息不对称、市场势力）都是<strong>效率</strong>问题。不平等不同：市场可能完全有效率，却仍然产生很不公平的分配。因为市场只回应「有购买力的需求」，穷人对教育、医疗、住房的需求即使再迫切，也可能得不到满足。
            </p>
            <p>极端的不平等还会带来其他代价：</p>
            <ul>
              <li>低收入家庭难以投资教育和健康，人力资本不足，社会流动性（social mobility）下降，长期增长受损。</li>
              <li>贫困、社会矛盾和犯罪增加，政治上可能出现不稳定。</li>
              <li>收入集中在少数人手中，富人的边际消费倾向较低，可能抑制总需求（见 3.2）。</li>
            </ul>
            <Callout title="评价">
              <ul>
                <li><strong>一定程度的不平等有积极作用</strong>：更高的收入奖励努力、技能、冒险和创新，给人们接受教育、创业的激励。完全平等会削弱这些激励。</li>
                <li><strong>多少不平等才算「不公平」是规范性判断</strong>：不同经济学派和社会对公平的看法不同，有人强调结果的公平，有人强调机会的公平。</li>
                <li><strong>政府干预有成本</strong>：累进税、转移支付、最低工资、提供教育和医疗等措施（详见 3.4）可以减少不平等，但可能削弱工作和投资激励，并有财政成本。因此关键在于权衡公平与效率。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              The other market failures (externalities, public goods, asymmetric information, market power) are about <strong>efficiency</strong>. Inequality is different: a market can be perfectly efficient and still produce a very unfair distribution. Markets respond only to demand backed by purchasing power, so the poor&apos;s need for education, healthcare or housing may go unmet however urgent it is.
            </p>
            <p>Extreme inequality also has wider costs:</p>
            <ul>
              <li>Low-income households cannot invest in education and health, so human capital is lost, social mobility falls and long-run growth suffers.</li>
              <li>Poverty, social tension and crime rise, and politics may become unstable.</li>
              <li>When income is concentrated among the rich, who have a lower marginal propensity to consume, aggregate demand may be held back (see 3.2).</li>
            </ul>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Some inequality is useful</strong>: higher incomes reward effort, skill, risk-taking and innovation, giving people an incentive to study and start businesses. Complete equality would weaken these incentives.</li>
                <li><strong>How much inequality is unfair is a normative judgement</strong>: schools of thought and societies disagree, some stressing fair outcomes and others fair opportunities.</li>
                <li><strong>Government intervention has costs</strong>: progressive taxes, transfer payments, minimum wages and the provision of education and healthcare (see 3.4) can reduce inequality, but may weaken incentives to work and invest and cost the government money. The key is the trade-off between equity and efficiency.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.12 The market's inability to achieve equity",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 15.4 Income inequality: measurement and causes",
      href: "https://openstax.org/books/principles-economics-3e/pages/15-4-income-inequality-measurement-and-causes",
    },
    {
      label: "World Inequality Report 2022 — Executive summary",
      href: "https://wir2022.wid.world/executive-summary/",
    },
  ],
};

export default notes;
