import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac, HL } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Label, Line, Region, type Pt } from "@/components/notes/Chart";

type Cap = { caption: ReactNode };

// 100% of population / income is drawn at 90 on each axis.
const S = 0.9;
const lorenz = (k: number): Pt[] =>
  Array.from({ length: 21 }, (_, i) => {
    const p = i / 20;
    return [100 * S * p, 100 * S * p ** k];
  });

function Ticks() {
  return (
    <>
      {[20, 40, 60, 80, 100].map((v) => (
        <g key={v}>
          <Label at={[v * S, -6.25]} anchor="middle" muted>
            {`${v}%`}
          </Label>
          <Label at={[-2.3, v * S - 1.56]} anchor="end" muted>
            {`${v}%`}
          </Label>
        </g>
      ))}
    </>
  );
}

const EQUALITY: Pt[] = [
  [0, 0],
  [90, 90],
];

function LorenzGini({ caption }: Cap) {
  const l = lorenz(2.2);
  return (
    <Chart x="Cumulative % of population" y="Cumulative % of income" caption={caption}>
      <Region points={[...EQUALITY, ...[...l].reverse()]} fill="a" label="A" labelAt={[51, 37]} />
      <Region points={[...l, [90, 0]]} fill="b" label="B" labelAt={[76, 12]} />
      <Ticks />
      <Line points={EQUALITY} />
      <Line points={l} />
      <Label at={[8, 37]}>Line of equality</Label>
      <Label at={[63, 33]}>Lorenz curve</Label>
    </Chart>
  );
}

function LorenzChange({ caption }: Cap) {
  return (
    <Chart x="Cumulative % of population" y="Cumulative % of income" caption={caption}>
      <Ticks />
      <Line points={EQUALITY} />
      <Line points={lorenz(3)} />
      <Line points={lorenz(1.5)} tone="alt" />
      <Arrow from={[64.5, 35.5]} to={[60, 47]} />
      <Label at={[8, 37]}>Line of equality</Label>
      <Label at={[68, 28]}>L₁</Label>
      <Label at={[38, 31]}>L₂</Label>
    </Chart>
  );
}

const QUINTILE_CUM = [0, 5, 15, 30, 52, 100];

function LorenzBuild({ caption }: Cap) {
  const pts: Pt[] = QUINTILE_CUM.map((c, i) => [i * 20 * S, c * S]);
  return (
    <Chart x="Cumulative % of population" y="Cumulative % of income" caption={caption}>
      <Ticks />
      <Line points={EQUALITY} />
      <Line points={pts} tone="alt" />
      {pts.slice(1, 5).map((p) => (
        <Dot key={p[0]} at={p} />
      ))}
      <Label at={[8, 37]}>Line of equality</Label>
      <Label at={[63, 30]}>Lorenz curve</Label>
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "本节区分平等与公平，讲收入与财富不平等如何用洛伦兹曲线和基尼系数测量，以及绝对贫困、相对贫困和多维贫困指数（MPI）。然后分析不平等和贫困的成因、影响，以及税收、转移支付、最低工资等政策并作评价。HL 还要根据五等分数据画洛伦兹曲线，并计算间接税额、总税额和平均税率。",
    en: "This topic separates equality from equity, shows how income and wealth inequality are measured with the Lorenz curve and Gini coefficient, and distinguishes absolute and relative poverty and the Multidimensional Poverty Index (MPI). It then analyses the causes and consequences of inequality and poverty and evaluates taxation, transfer payments, minimum wages and other policies. HL adds constructing a Lorenz curve from quintile data and calculating indirect tax paid, total tax and average tax rates.",
  },
  sections: [
    {
      id: "equality-equity",
      level: "both",
      title: { zh: "平等与公平；不平等的含义", en: "Equality and equity; the meaning of inequality" },
      body: {
        zh: (
          <>
            <Def term="Equality">每个人得到<strong>相同</strong>的收入、财富或机会，是一个客观、可测量的概念。</Def>
            <Def term="Equity">
              <strong>公平</strong>，是一个规范性（normative）概念，取决于价值判断。经济学中通常指收入分配<strong>公正</strong>，不一定意味着人人相同。
            </Def>
            <p>
              大多数经济学家认为完全平等既不可能也不可取（会削弱工作和投资的激励），但过度不平等是不公平的。因此政策目标一般是<strong>减少</strong>不平等、提高机会平等，而不是消灭差距。
            </p>
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
                  <td>性质</td>
                  <td>流量：一段时间内获得的工资、租金、利息、利润和转移支付</td>
                  <td>存量：某一时点拥有的资产（房产、股票、储蓄）减去负债</td>
                </tr>
                <tr>
                  <td>不平等程度</td>
                  <td>较高</td>
                  <td>通常<strong>更高</strong>，因为财富会通过继承和资产收益不断累积</td>
                </tr>
              </tbody>
            </table>
            <p>两者相互强化：高收入者能储蓄、积累财富；财富又带来租金、利息和股息等收入。</p>
          </>
        ),
        en: (
          <>
            <Def term="Equality">Everyone receives the <strong>same</strong> income, wealth or opportunities; an objective, measurable idea.</Def>
            <Def term="Equity">
              <strong>Fairness</strong>: a normative concept that depends on value judgements. In economics it usually means a <strong>fair</strong> distribution of income, which need not be an equal one.
            </Def>
            <p>
              Most economists see complete equality as neither possible nor desirable (it would weaken incentives to work and invest), but extreme inequality as inequitable. Policy therefore aims to <strong>reduce</strong> inequality and widen equality of opportunity rather than remove all differences.
            </p>
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
                  <td>Nature</td>
                  <td>A flow: wages, rent, interest, profit and transfer payments received over a period</td>
                  <td>A stock: the assets owned at a point in time (property, shares, savings) minus debts</td>
                </tr>
                <tr>
                  <td>Degree of inequality</td>
                  <td>High</td>
                  <td>Usually <strong>higher</strong>, because wealth accumulates through inheritance and returns on assets</td>
                </tr>
              </tbody>
            </table>
            <p>The two reinforce each other: high earners can save and build wealth, and wealth generates further income as rent, interest and dividends.</p>
          </>
        ),
      },
    },
    {
      id: "measuring-inequality",
      level: "both",
      title: { zh: "测量不平等：洛伦兹曲线与基尼系数", en: "Measuring inequality: the Lorenz curve and Gini coefficient" },
      body: {
        zh: (
          <>
            <Def term="Lorenz curve">
              显示人口累计百分比（从最穷到最富排列）与其所获收入累计百分比之间关系的曲线。
            </Def>
            <p>
              45° 的<strong>绝对平等线</strong>（line of equality）表示每 20% 的人口恰好得到 20% 的收入。洛伦兹曲线越向右下方弯曲、离平等线越远，收入分配越不平等。
            </p>
            <Def term="Gini coefficient">
              平等线与洛伦兹曲线之间的面积（A）占平等线以下总面积（A + B）的比例，取值 0（完全平等）到 1（完全不平等），也常乘以 100 表示为基尼指数。
            </Def>
            <Formula>
              基尼系数 = <Frac n="A" d="A + B" />
            </Formula>
            <LorenzGini caption="图 1 洛伦兹曲线和基尼系数：A 是平等线与洛伦兹曲线之间的面积，B 是洛伦兹曲线以下的面积，基尼系数 = A ÷ (A + B)。" />
            <LorenzChange caption="图 2 收入分配变得更平等：洛伦兹曲线从 L₁ 向平等线移动到 L₂，A 的面积变小，基尼系数下降。若曲线远离平等线，则分配更不平等。" />
            <Callout title="例子">
              <p>
                南非的基尼系数约为 0.63，属世界最高之一；北欧国家大约在 0.25 至 0.28 之间。税收和转移支付后的基尼系数通常明显低于税前。
              </p>
            </Callout>
            <HL>
              <p>
                <strong>根据五等分（quintile）数据画洛伦兹曲线：</strong>把人口按收入从低到高分成五组，每组 20%，再把各组的收入份额依次累加。
              </p>
              <table>
                <thead>
                  <tr>
                    <th>五等分</th>
                    <th>收入份额</th>
                    <th>人口累计 %</th>
                    <th>收入累计 %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>最低 20%</td><td>5%</td><td>20</td><td>5</td></tr>
                  <tr><td>第二组</td><td>10%</td><td>40</td><td>15</td></tr>
                  <tr><td>第三组</td><td>15%</td><td>60</td><td>30</td></tr>
                  <tr><td>第四组</td><td>22%</td><td>80</td><td>52</td></tr>
                  <tr><td>最高 20%</td><td>48%</td><td>100</td><td>100</td></tr>
                </tbody>
              </table>
              <LorenzBuild caption="图 3 用上表的累计数据描点：(20, 5)、(40, 15)、(60, 30)、(80, 52)，并连接 (0, 0) 和 (100, 100)。" />
              <p>
                检查：曲线必须从原点开始、在 (100%, 100%) 结束，并始终位于平等线下方；最高 20% 的人得到 48% 的收入，是最低 20% 的 9.6 倍。
              </p>
            </HL>
          </>
        ),
        en: (
          <>
            <Def term="Lorenz curve">
              A curve showing the cumulative percentage of the population (ranked from poorest to richest) against the cumulative percentage of income they receive.
            </Def>
            <p>
              The 45° <strong>line of equality</strong> shows each 20% of the population receiving exactly 20% of income. The further the Lorenz curve bows away from this line, the more unequal the distribution.
            </p>
            <Def term="Gini coefficient">
              The area between the line of equality and the Lorenz curve (A) as a proportion of the whole area under the line of equality (A + B). It ranges from 0 (perfect equality) to 1 (perfect inequality); multiplied by 100 it is the Gini index.
            </Def>
            <Formula>
              Gini coefficient = <Frac n="A" d="A + B" />
            </Formula>
            <LorenzGini caption="Figure 1 Lorenz curve and Gini coefficient: A is the area between the line of equality and the Lorenz curve, B the area below the Lorenz curve; Gini = A ÷ (A + B)." />
            <LorenzChange caption="Figure 2 A more equal distribution: the Lorenz curve moves from L₁ towards the line of equality to L₂, area A shrinks and the Gini coefficient falls. A curve moving away from the line shows greater inequality." />
            <Callout title="Real-world example">
              <p>
                South Africa&apos;s Gini coefficient is about 0.63, among the highest in the world, while the Nordic countries are around 0.25 to 0.28. Gini coefficients after taxes and transfers are usually well below those before.
              </p>
            </Callout>
            <HL>
              <p>
                <strong>Constructing a Lorenz curve from quintile data:</strong> rank the population from lowest to highest income in five groups of 20%, then add up the income shares cumulatively.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Quintile</th>
                    <th>Share of income</th>
                    <th>Cumulative % of population</th>
                    <th>Cumulative % of income</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Lowest 20%</td><td>5%</td><td>20</td><td>5</td></tr>
                  <tr><td>Second</td><td>10%</td><td>40</td><td>15</td></tr>
                  <tr><td>Third</td><td>15%</td><td>60</td><td>30</td></tr>
                  <tr><td>Fourth</td><td>22%</td><td>80</td><td>52</td></tr>
                  <tr><td>Highest 20%</td><td>48%</td><td>100</td><td>100</td></tr>
                </tbody>
              </table>
              <LorenzBuild caption="Figure 3 Plot the cumulative figures from the table, (20, 5), (40, 15), (60, 30) and (80, 52), and join them to (0, 0) and (100, 100)." />
              <p>
                Check: the curve must start at the origin, end at (100%, 100%) and stay below the line of equality. Here the top 20% receive 48% of income, 9.6 times the share of the bottom 20%.
              </p>
            </HL>
          </>
        ),
      },
    },
    {
      id: "poverty",
      level: "both",
      title: { zh: "贫困：含义与测量", en: "Poverty: meaning and measurement" },
      body: {
        zh: (
          <>
            <Def term="Absolute poverty">收入低于满足基本生存需要（食物、住所、衣物、清洁饮水）所需最低水平的状态。</Def>
            <Def term="Relative poverty">
              收入远低于本社会平均水平的状态，通常定义为低于收入中位数的某个比例（如 50% 或 60%）。它衡量的是与社会其他人相比的差距。
            </Def>
            <p>
              <strong>单一指标：</strong>
            </p>
            <ul>
              <li>
                <strong>国际贫困线：</strong>世界银行的极端贫困线为每人每天 3.00 美元（2021 年购买力平价），另有每天 4.20 美元和 8.30 美元两条更高的贫困线，适用于中低收入和中高收入国家。
              </li>
              <li>
                <strong>最低收入标准（minimum income standards）：</strong>由公众讨论决定一个家庭要达到「可接受的最低生活水平」需要多少收入（如英国的 MIS 研究）。
              </li>
            </ul>
            <p>
              <strong>综合指标：多维贫困指数（MPI）</strong>，由联合国开发计划署（UNDP）和牛津大学编制，涵盖<strong>健康、教育、生活水平</strong>三个维度共 10 项指标（如营养、儿童死亡率、受教育年限、入学率、做饭燃料、卫生设施、饮水、电力、住房、资产）。如果一个人在加权指标中至少三分之一处于被剥夺状态，就被视为多维贫困。
            </p>
            <p>
              <strong>测量贫困的困难：</strong>
            </p>
            <ul>
              <li>贫困线的设定带有主观性，不同国家的生活成本不同。</li>
              <li>数据难以收集，尤其是非正规经济、农村和自给生产；住户调查可能漏掉无家可归者。</li>
              <li>单一收入指标忽略了公共服务、家庭内部分配和非货币层面的剥夺。</li>
              <li>综合指标的维度和权重选择也是价值判断。</li>
            </ul>
          </>
        ),
        en: (
          <>
            <Def term="Absolute poverty">Having an income below the minimum needed to meet basic needs for survival, such as food, shelter, clothing and clean water.</Def>
            <Def term="Relative poverty">
              Having an income well below the average in one&apos;s society, usually defined as below a set share (e.g. 50% or 60%) of median income. It measures the gap compared with others in that society.
            </Def>
            <p>
              <strong>Single indicators:</strong>
            </p>
            <ul>
              <li>
                <strong>International poverty lines:</strong> the World Bank&apos;s extreme poverty line is $3.00 per person per day (2021 PPP), with higher lines of $4.20 and $8.30 a day for lower-middle and upper-middle income countries.
              </li>
              <li>
                <strong>Minimum income standards:</strong> the income a household needs for a socially acceptable minimum standard of living, based on what members of the public agree is needed (e.g. the UK MIS research).
              </li>
            </ul>
            <p>
              <strong>Composite indicator: the Multidimensional Poverty Index (MPI)</strong>, produced by the UNDP and Oxford University, covers three dimensions, <strong>health, education and standard of living</strong>, through 10 indicators (e.g. nutrition, child mortality, years of schooling, school attendance, cooking fuel, sanitation, drinking water, electricity, housing and assets). A person deprived in at least one-third of the weighted indicators is counted as multidimensionally poor.
            </p>
            <p>
              <strong>Difficulties in measuring poverty:</strong>
            </p>
            <ul>
              <li>Where to draw a poverty line is a subjective choice, and living costs differ between countries.</li>
              <li>Data are hard to collect, especially in the informal economy, rural areas and subsistence farming; household surveys can miss the homeless.</li>
              <li>A single income measure ignores public services, how income is shared within households and non-monetary deprivation.</li>
              <li>The dimensions and weights in composite indicators are also value judgements.</li>
            </ul>
          </>
        ),
      },
    },
    {
      id: "causes",
      level: "both",
      title: { zh: "不平等与贫困的成因", en: "Causes of economic inequality and poverty" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>成因</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>机会不平等 Inequality of opportunity</td><td>出身家庭、地区决定了能否获得优质教育、医疗和人脉</td></tr>
                <tr><td>资源所有权不同 Resource ownership</td><td>拥有土地、房产和资本的人获得租金、利息和利润，财富代代相传</td></tr>
                <tr><td>人力资本不同 Human capital</td><td>教育和技能水平越高，工资通常越高</td></tr>
                <tr><td>歧视 Discrimination</td><td>基于性别、种族等的歧视导致同工不同酬、晋升受阻</td></tr>
                <tr><td>地位与权力不平等 Status and power</td><td>弱势群体缺乏议价能力和政治影响力，难以改变规则</td></tr>
                <tr><td>政府税收和福利政策</td><td>累退税制或不足的福利体系会扩大差距</td></tr>
                <tr><td>全球化与技术变革</td><td>高技能劳动者和资本受益，低技能岗位被自动化或转移到海外</td></tr>
                <tr><td>市场导向的供给侧政策</td><td>降低最高税率、削弱工会、取消最低工资等可能扩大不平等（见 3.7）</td></tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>这些成因相互关联，形成「贫困陷阱」：低收入 → 人力资本投资少 → 低生产率 → 低收入。答题时说明这一循环会加分。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Cause</th>
                  <th>Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Inequality of opportunity</td><td>The family and region people are born into decide their access to good education, health care and networks</td></tr>
                <tr><td>Different levels of resource ownership</td><td>Owners of land, property and capital earn rent, interest and profit, and wealth is passed between generations</td></tr>
                <tr><td>Different levels of human capital</td><td>Better educated and more skilled workers usually earn higher wages</td></tr>
                <tr><td>Discrimination (gender, race and others)</td><td>Leads to unequal pay for similar work and blocked promotion</td></tr>
                <tr><td>Unequal status and power</td><td>Disadvantaged groups lack bargaining power and political influence to change the rules</td></tr>
                <tr><td>Government tax and benefits policies</td><td>Regressive taxes or weak benefit systems widen the gap</td></tr>
                <tr><td>Globalisation and technological change</td><td>High-skilled workers and capital gain, while low-skilled jobs are automated or moved abroad</td></tr>
                <tr><td>Market-based supply-side policies</td><td>Cutting top tax rates, weakening unions or abolishing minimum wages may widen inequality (see 3.7)</td></tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>The causes reinforce each other in a poverty trap: low income → little investment in human capital → low productivity → low income. Explaining this cycle strengthens an answer.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "impacts",
      level: "both",
      title: { zh: "收入和财富不平等的影响", en: "The impact of income and wealth inequality" },
      body: {
        zh: (
          <>
            <ul>
              <li>
                <strong>经济增长：</strong>一定程度的不平等提供努力和创业的激励；但严重不平等使低收入者无力投资教育和健康，人力资本浪费；而且富人边际消费倾向较低，总需求可能不足，从而拖累增长。
              </li>
              <li>
                <strong>生活水平：</strong>低收入群体的健康、教育和住房较差，预期寿命更短；相对贫困还带来社会排斥。
              </li>
              <li>
                <strong>社会稳定：</strong>不平等与犯罪、社会信任下降、政治极化和抗议相关；富人对政治的影响力过大，可能扭曲政策。
              </li>
            </ul>
            <Callout title="评价">
              <p>影响的大小取决于不平等的来源：来自努力和技能差异的不平等与来自继承或歧视的不平等，在效率和公平上的含义不同。</p>
            </Callout>
          </>
        ),
        en: (
          <>
            <ul>
              <li>
                <strong>Economic growth:</strong> some inequality creates incentives to work hard and start businesses. But severe inequality leaves low-income households unable to invest in education and health, wasting human capital, and because the rich have a lower marginal propensity to consume, AD may be weaker, which slows growth.
              </li>
              <li>
                <strong>Standards of living:</strong> low-income groups have worse health, education and housing and shorter life expectancy, and relative poverty also brings social exclusion.
              </li>
              <li>
                <strong>Social stability:</strong> inequality is linked to crime, lower social trust, political polarisation and protest, and the rich may gain too much political influence, distorting policy.
              </li>
            </ul>
            <Callout title="Evaluation">
              <p>The size of the effect depends on where inequality comes from: inequality due to differences in effort and skill has different efficiency and equity implications from inequality due to inheritance or discrimination.</p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "taxation",
      level: "both",
      title: { zh: "税收在减少贫困和不平等中的作用", en: "The role of taxation in reducing poverty and inequality" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>税制</th>
                  <th>收入上升时平均税率</th>
                  <th>对不平等</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>累进税 Progressive</td><td>上升</td><td>减少不平等</td></tr>
                <tr><td>比例税 Proportional</td><td>不变</td><td>基本不改变</td></tr>
                <tr><td>累退税 Regressive</td><td>下降</td><td>扩大不平等</td></tr>
              </tbody>
            </table>
            <Def term="Average tax rate">已缴税总额占应税收入的百分比。</Def>
            <Def term="Marginal tax rate">对<strong>额外一单位</strong>收入征收的税率，即最后一元收入要缴多少税。累进税制下，边际税率高于平均税率。</Def>
            <ul>
              <li>
                <strong>直接税（direct taxes）：</strong>对收入或财富直接征收，由纳税人本人承担：个人所得税（personal income tax）、企业所得税（corporate income tax）、财富税（wealth taxes，如房产税、遗产税）。个人所得税通常是累进的。
              </li>
              <li>
                <strong>间接税（indirect taxes）：</strong>对商品和服务支出征收，如增值税（VAT）、消费税。虽然税率对每个人相同，但低收入者把更大比例的收入用于消费，所以间接税占收入的比例对他们更高，因此是<strong>累退</strong>的。
              </li>
            </ul>
            <HL>
              <p>
                <strong>计算 1：间接税额。</strong>增值税率 20%。某人购买税前价格共 $500 的商品，间接税 = 500 × 20% = <strong>$100</strong>，共支付 $600。若已知含税支出为 $600，税额 = 600 × 20 ÷ 120 = <strong>$100</strong>。
              </p>
              <p>
                对比：月收入 $1000 的人把 $600 都用于含税消费，间接税占收入 10%；月收入 $5000 的人消费 $1800（含税），税额 $300，只占收入 6%，可见间接税是累退的。
              </p>
              <p>
                <strong>计算 2：总税额与平均税率。</strong>税级：0 至 $10,000 税率 0%；$10,001 至 $40,000 税率 20%；超过 $40,000 的部分税率 40%。收入 $60,000 的人：
              </p>
              <ol>
                <li>第一档：$10,000 × 0% = $0</li>
                <li>第二档：$30,000 × 20% = $6,000</li>
                <li>第三档：$20,000 × 40% = $8,000</li>
                <li>总税额 = <strong>$14,000</strong>；平均税率 = 14,000 ÷ 60,000 × 100 ≈ <strong>23.3%</strong>；边际税率 = 40%。</li>
              </ol>
            </HL>
            <Callout title="评价">
              <p>
                累进税能减少税后不平等并为转移支付融资，但过高的边际税率可能削弱工作和投资激励、促使避税和资本外流；财富税难以估值和征收。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Tax</th>
                  <th>Average tax rate as income rises</th>
                  <th>Effect on inequality</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Progressive</td><td>Rises</td><td>Reduces inequality</td></tr>
                <tr><td>Proportional</td><td>Constant</td><td>Little change</td></tr>
                <tr><td>Regressive</td><td>Falls</td><td>Increases inequality</td></tr>
              </tbody>
            </table>
            <Def term="Average tax rate">Total tax paid as a percentage of taxable income.</Def>
            <Def term="Marginal tax rate">The rate of tax paid on an <strong>additional unit</strong> of income, i.e. on the last dollar earned. Under a progressive system the marginal rate is above the average rate.</Def>
            <ul>
              <li>
                <strong>Direct taxes:</strong> levied on income or wealth and paid directly by the taxpayer: personal income tax, corporate income tax and wealth taxes (e.g. property and inheritance taxes). Personal income tax is usually progressive.
              </li>
              <li>
                <strong>Indirect taxes:</strong> levied on spending on goods and services, e.g. VAT and excise duties. The rate is the same for everyone, but low-income households spend a larger share of their income, so indirect taxes take a bigger share of their income: they are <strong>regressive</strong>.
              </li>
            </ul>
            <HL>
              <p>
                <strong>Calculation 1: indirect tax paid.</strong> VAT is 20%. A consumer buys goods with a pre-tax price of $500: indirect tax = 500 × 20% = <strong>$100</strong>, and they pay $600 in total. If instead we know spending including tax is $600, tax = 600 × 20 ÷ 120 = <strong>$100</strong>.
              </p>
              <p>
                Compare: someone earning $1000 a month spends all $600 (including tax) and pays VAT equal to 10% of income; someone earning $5000 spends $1800 (including tax), pays $300, only 6% of income. The indirect tax is regressive.
              </p>
              <p>
                <strong>Calculation 2: total tax and average tax rate.</strong> Tax bands: $0 to $10,000 taxed at 0%; $10,001 to $40,000 at 20%; income above $40,000 at 40%. For an income of $60,000:
              </p>
              <ol>
                <li>First band: $10,000 × 0% = $0</li>
                <li>Second band: $30,000 × 20% = $6,000</li>
                <li>Third band: $20,000 × 40% = $8,000</li>
                <li>Total tax = <strong>$14,000</strong>; average tax rate = 14,000 ÷ 60,000 × 100 ≈ <strong>23.3%</strong>; marginal tax rate = 40%.</li>
              </ol>
            </HL>
            <Callout title="Evaluation">
              <p>
                Progressive taxes reduce post-tax inequality and fund transfer payments, but very high marginal rates may weaken incentives to work and invest and encourage tax avoidance and capital flight; wealth taxes are hard to value and collect.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "policies",
      level: "both",
      title: { zh: "减少贫困与不平等的其他政策", en: "Further policies to reduce poverty and inequality" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>政策</th>
                  <th>作用</th>
                  <th>评价</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>减少机会不平等 / 投资人力资本</td>
                  <td>免费或补贴的教育、培训、医疗，提高低收入者的生产率和收入</td>
                  <td>从根源上解决问题，但成本高、见效需要很长时间</td>
                </tr>
                <tr>
                  <td>转移支付 Transfer payments</td>
                  <td>失业救济、养老金、儿童补贴等直接提高低收入者收入</td>
                  <td>见效快；但成本高，可能削弱工作激励（福利陷阱）</td>
                </tr>
                <tr>
                  <td>定向支出 Targeted spending</td>
                  <td>为低收入群体提供公共住房、免费餐食、医疗服务等商品和服务</td>
                  <td>确保需要的人得到帮助；但存在管理成本和遗漏</td>
                </tr>
                <tr>
                  <td>全民基本收入 Universal basic income</td>
                  <td>无条件地给每个公民定期发放一笔固定收入</td>
                  <td>简单、无污名化、不会形成福利陷阱；但成本极高，也给了不需要的人</td>
                </tr>
                <tr>
                  <td>反歧视政策</td>
                  <td>同工同酬、反歧视立法、配额等</td>
                  <td>提高公平和效率；但执行和监管困难</td>
                </tr>
                <tr>
                  <td>最低工资 Minimum wages</td>
                  <td>提高低薪工人的收入</td>
                  <td>可能造成失业（见 3.3 图 4），且对失业者和非正规部门工人没有帮助</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                政策之间存在公平与效率的权衡：再分配越多，越可能削弱激励。效果还取决于政府的财政能力、行政能力和腐败程度。综合运用多种政策通常比依赖单一政策更有效。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Policy</th>
                  <th>How it works</th>
                  <th>Evaluation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reducing inequality of opportunity / investing in human capital</td>
                  <td>Free or subsidised education, training and health care raise the productivity and earnings of low-income groups</td>
                  <td>Tackles the root cause, but is costly and takes a long time to work</td>
                </tr>
                <tr>
                  <td>Transfer payments</td>
                  <td>Unemployment benefits, pensions and child benefits raise the incomes of low-income households directly</td>
                  <td>Quick effect, but expensive and may weaken incentives to work (the benefit trap)</td>
                </tr>
                <tr>
                  <td>Targeted spending on goods and services</td>
                  <td>Social housing, free school meals and health services provided to low-income groups</td>
                  <td>Ensures help reaches those in need, but has administrative costs and gaps in coverage</td>
                </tr>
                <tr>
                  <td>Universal basic income</td>
                  <td>A regular fixed payment to every citizen with no conditions</td>
                  <td>Simple, no stigma and no benefit trap, but very costly and also paid to those who do not need it</td>
                </tr>
                <tr>
                  <td>Policies to reduce discrimination</td>
                  <td>Equal pay and anti-discrimination laws, quotas</td>
                  <td>Improves equity and efficiency, but hard to enforce and monitor</td>
                </tr>
                <tr>
                  <td>Minimum wages</td>
                  <td>Raise the pay of low-paid workers</td>
                  <td>May cause unemployment (see Figure 4 in 3.3), and does not help the unemployed or informal-sector workers</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                There is an equity–efficiency trade-off: the more income is redistributed, the more incentives may be weakened. Effectiveness also depends on the government&apos;s fiscal and administrative capacity and on corruption. A combination of policies usually works better than relying on one.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 3.4 Economics of inequality and poverty",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 15.4 Income inequality: measurement and causes",
      href: "https://openstax.org/books/principles-economics-3e/pages/15-4-income-inequality-measurement-and-causes",
    },
    {
      label: "World Bank — Poverty overview",
      href: "https://www.worldbank.org/en/topic/poverty/overview",
    },
    {
      label: "UNDP — Global Multidimensional Poverty Index 2024",
      href: "https://hdr.undp.org/content/2024-global-multidimensional-poverty-index-mpi",
    },
  ],
};

export default notes;
