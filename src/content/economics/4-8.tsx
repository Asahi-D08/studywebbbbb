import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula, Frac } from "@/components/notes/blocks";
import { Chart, Dot, Label, Line } from "@/components/notes/Chart";

function HdiIncome({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="GNI per capita (PPP)" y="HDI" caption={caption}>
      <Line
        points={[
          [5, 15],
          [20, 45],
          [40, 64],
          [65, 77],
          [92, 84],
        ]}
        smooth
        label="Trend"
      />
      <Dot at={[30, 74]} label="A" />
      <Dot at={[62, 54]} label="B" labelOffset={[8, -6]} />
      <Label at={[10, 84]} muted>
        A: higher HDI than income suggests
      </Label>
      <Label at={[95, 44]} anchor="end" muted>
        B: lower HDI than income suggests
      </Label>
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "经济发展是多维度的：不仅是收入提高，还包括健康、教育、平等、自由和环境质量的改善。本节比较衡量发展的单一指标（人均 GDP/GNI（PPP）、健康、教育、不平等、能源和环境指标）与综合指标（HDI、GII、IHDI、快乐星球指数），评价它们的优缺点，并讨论经济增长与经济发展之间的关系。",
    en: "Economic development is multidimensional: it means not only higher incomes but better health, education, equality, freedom and environmental quality. This topic compares single indicators (GDP/GNI per capita at PPP, health, education, inequality, energy and environmental indicators) with composite indicators (HDI, GII, IHDI, Happy Planet Index), evaluates them, and discusses the relationship between economic growth and economic development.",
  },
  sections: [
    {
      id: "multidimensional",
      level: "both",
      title: { zh: "经济发展的多维性", en: "The multidimensional nature of economic development" },
      body: {
        zh: (
          <>
            <Def term="Economic growth">
              一国实际产出（实际 GDP）随时间增加，是一个<strong>量</strong>的概念。
            </Def>
            <Def term="Economic development">
              一国人民生活水平和福祉的全面提高，包括收入增加、贫困减少、健康和教育改善、不平等缩小、自由与选择增加以及环境可持续，是一个<strong>质</strong>的、多维度的概念。
            </Def>
            <p>
              经济学家阿马蒂亚·森（Amartya Sen）认为，发展的本质是扩大人们的<strong>能力</strong>（capabilities）与自由：能否健康长寿、受教育、参与社会生活、选择自己想过的生活。德尼·古莱（Denis Goulet）提出发展的三项核心价值：<strong>生存</strong>（life sustenance，满足食物、住房、医疗等基本需要）、<strong>自尊</strong>（self-esteem）和<strong>自由</strong>（freedom from servitude，免于受奴役、有选择的自由）。
            </p>
            <p>
              正因为发展是多维的，没有任何一个指标能完整衡量它，所以需要同时看多个单一指标，或者把它们合成综合指标。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Economic growth">
              An increase in a country&apos;s real output (real GDP) over time; a <strong>quantitative</strong> concept.
            </Def>
            <Def term="Economic development">
              A broad improvement in people&apos;s living standards and well-being, including higher incomes, less poverty, better health and education, lower inequality, more freedom and choice, and environmental sustainability; a <strong>qualitative</strong>, multidimensional concept.
            </Def>
            <p>
              Amartya Sen argues that development means expanding people&apos;s <strong>capabilities</strong> and freedoms: to live long and healthy lives, be educated, take part in society and choose the life they value. Denis Goulet set out three core values: <strong>life sustenance</strong> (meeting basic needs such as food, shelter and healthcare), <strong>self-esteem</strong>, and <strong>freedom from servitude</strong> (the freedom to choose).
            </p>
            <p>
              Because development is multidimensional, no single measure captures it fully, so economists look at several single indicators together or combine them into composite indicators.
            </p>
          </>
        ),
      },
    },
    {
      id: "single-indicators",
      level: "both",
      title: { zh: "单一指标", en: "Single indicators" },
      body: {
        zh: (
          <>
            <p>
              <strong>人均 GDP / GNI（按购买力平价 PPP 计算）</strong>是最常用的收入指标。GDP 是国内生产的总值；GNI（国民总收入）= GDP + 来自海外的净要素收入，衡量本国居民实际获得的收入。对于有大量外资利润汇出的国家（如爱尔兰），GNI 明显低于 GDP；侨汇和海外投资收入多的国家则相反。
            </p>
            <Def term="Purchasing power parity (PPP)">
              一种换算汇率，使同一篮子商品和服务在不同国家花费相同。按 PPP 换算可以消除各国物价水平差异，使收入的国际比较更能反映实际购买力。
            </Def>
            <Formula>
              人均 GNI = <Frac n="GNI" d="人口" />
            </Formula>
            <Callout title="例子：为什么要用 PPP">
              <p>
                某国人均 GNI 按市场汇率为 2 000 美元。若同一篮子商品在该国只需 1 000 美元、在美国需 2 500 美元，则当地物价水平只有美国的 40%，按 PPP 计算的人均 GNI ≈ 2 000 ÷ 0.4 = 5 000 美元。低收入国家的非贸易服务（理发、交通）往往很便宜，所以按 PPP 计算的收入通常高于按市场汇率计算的收入。
              </p>
            </Callout>
            <table>
              <thead>
                <tr>
                  <th>类别</th>
                  <th>常见指标</th>
                  <th>反映什么</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>健康 Health</td>
                  <td>出生时预期寿命、婴儿死亡率（每千名活产）、孕产妇死亡率、每千人医生数</td>
                  <td>营养、医疗、卫生设施的水平</td>
                </tr>
                <tr>
                  <td>教育 Education</td>
                  <td>成人识字率、平均受教育年限、预期受教育年限、入学率</td>
                  <td>人力资本和获取知识的机会</td>
                </tr>
                <tr>
                  <td>经济 / 社会不平等 Inequality</td>
                  <td>基尼系数（Gini coefficient）、收入最高 10% 与最低 40% 人群的收入份额（Palma 比率）、贫困人口比例</td>
                  <td>发展成果的分配是否公平</td>
                </tr>
                <tr>
                  <td>能源 Energy</td>
                  <td>人均能源消费、通电人口比例、使用清洁烹饪燃料的人口比例</td>
                  <td>生产能力和基本生活条件（照明、冷藏、通信）</td>
                </tr>
                <tr>
                  <td>环境 Environment</td>
                  <td>人均二氧化碳排放、森林覆盖率变化、PM2.5 空气污染、获得安全饮用水的比例</td>
                  <td>发展是否可持续、生活环境质量</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价：单一指标">
              <ul>
                <li><strong>优点</strong>：数据较易获得、易于理解和跨国比较，人均 GNI 与许多福祉指标高度相关。</li>
                <li><strong>局限</strong>：人均收入是平均数，掩盖分配不均；不包括非正规经济和家务劳动；不反映环境破坏和闲暇；每个指标只衡量发展的一个方面。能源消费高既可能代表发达，也可能代表污染。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>GDP / GNI per capita at purchasing power parity (PPP)</strong> is the most widely used income indicator. GDP is the value of output produced within the country; GNI (gross national income) = GDP + net factor income from abroad, which measures the income actually received by residents. In countries where foreign firms send home large profits (e.g. Ireland), GNI is well below GDP; the opposite holds where residents earn a lot from abroad.
            </p>
            <Def term="Purchasing power parity (PPP)">
              A conversion rate at which the same basket of goods and services costs the same in each country. Converting at PPP removes differences in price levels, so international comparisons reflect real purchasing power.
            </Def>
            <Formula>
              GNI per capita = <Frac n="GNI" d="population" />
            </Formula>
            <Callout title="Example: why use PPP">
              <p>
                A country&apos;s GNI per capita at market exchange rates is $2,000. If a basket that costs $2,500 in the US costs only $1,000 there, its price level is 40% of the US level, so GNI per capita at PPP ≈ 2,000 ÷ 0.4 = $5,000. Non-traded services (haircuts, transport) tend to be cheap in low-income countries, so PPP incomes are usually higher than market-rate incomes.
              </p>
            </Callout>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Common indicators</th>
                  <th>What it shows</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Health</td>
                  <td>Life expectancy at birth, infant mortality rate (per 1,000 live births), maternal mortality ratio, doctors per 1,000 people</td>
                  <td>Nutrition, healthcare and sanitation</td>
                </tr>
                <tr>
                  <td>Education</td>
                  <td>Adult literacy rate, mean years of schooling, expected years of schooling, enrolment rates</td>
                  <td>Human capital and access to knowledge</td>
                </tr>
                <tr>
                  <td>Economic / social inequality</td>
                  <td>Gini coefficient, income share of the top 10% vs bottom 40% (Palma ratio), poverty headcount</td>
                  <td>Whether the gains from development are shared fairly</td>
                </tr>
                <tr>
                  <td>Energy</td>
                  <td>Energy use per capita, share of population with electricity, access to clean cooking fuels</td>
                  <td>Productive capacity and basic living conditions (light, refrigeration, communication)</td>
                </tr>
                <tr>
                  <td>Environment</td>
                  <td>CO₂ emissions per capita, change in forest cover, PM2.5 air pollution, access to safe drinking water</td>
                  <td>Sustainability and quality of the living environment</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation: single indicators">
              <ul>
                <li><strong>Strengths</strong>: data are fairly easy to collect, understand and compare across countries, and GNI per capita correlates strongly with many well-being measures.</li>
                <li><strong>Limitations</strong>: income per capita is an average that hides inequality; it leaves out the informal economy and unpaid household work; it ignores environmental damage and leisure; each indicator captures only one dimension. High energy use may signal development or pollution.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "composite-indicators",
      level: "both",
      title: { zh: "综合指标", en: "Composite indicators" },
      body: {
        zh: (
          <>
            <p>综合指标把几个维度合成一个数值，便于排名和比较。IB 要求掌握四个：</p>
            <table>
              <thead>
                <tr>
                  <th>指标</th>
                  <th>组成</th>
                  <th>如何解读</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>人类发展指数（HDI）</td>
                  <td>
                    三个维度的几何平均：
                    <br />① 健康长寿：出生时预期寿命
                    <br />② 知识：25 岁以上成人平均受教育年限 + 学龄儿童预期受教育年限
                    <br />③ 体面生活水平：人均 GNI（PPP，取对数）
                  </td>
                  <td>0–1，越高越好。≥ 0.800 为极高，0.700–0.799 为高，0.550–0.699 为中等，&lt; 0.550 为低。</td>
                </tr>
                <tr>
                  <td>性别不平等指数（GII）</td>
                  <td>
                    ① 生殖健康：孕产妇死亡率、青少年生育率
                    <br />② 赋权：女性议会席位比例、男女中等以上教育比例
                    <br />③ 劳动力市场：男女劳动参与率
                  </td>
                  <td>0–1，<strong>越低越好</strong>（0 表示男女完全平等）。</td>
                </tr>
                <tr>
                  <td>不平等调整后的人类发展指数（IHDI）</td>
                  <td>按每个维度内部的不平等程度对 HDI 进行折减</td>
                  <td>IHDI ≤ HDI。两者差距（损失百分比）越大，说明发展成果分配越不平等；完全平等时 IHDI = HDI。</td>
                </tr>
                <tr>
                  <td>快乐星球指数（Happy Planet Index）</td>
                  <td>
                    （主观幸福感 × 预期寿命，并按不平等调整）÷ 人均生态足迹
                  </td>
                  <td>越高越好，衡量一国以多少资源消耗换来长寿、幸福的生活。哥斯达黎加等国得分高，人均消费很高的美国等国得分较低。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                HDI 中收入取对数，体现收入对福祉的边际作用递减：人均收入从 1 000 美元增加到 2 000 美元，比从 50 000 美元增加到 51 000 美元对人类发展的意义大得多。比较两国时，可以用「人均 GNI 排名减 HDI 排名」：数值为正说明该国把收入较好地转化为了健康和教育。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Composite indicators combine several dimensions into one number for ranking and comparison. The IB requires four:</p>
            <table>
              <thead>
                <tr>
                  <th>Indicator</th>
                  <th>Components</th>
                  <th>Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Human Development Index (HDI)</td>
                  <td>
                    Geometric mean of three dimensions:
                    <br />1. A long and healthy life: life expectancy at birth
                    <br />2. Knowledge: mean years of schooling (adults 25+) and expected years of schooling (children of school-entry age)
                    <br />3. A decent standard of living: GNI per capita (PPP, logged)
                  </td>
                  <td>0–1, higher is better. ≥ 0.800 very high, 0.700–0.799 high, 0.550–0.699 medium, &lt; 0.550 low.</td>
                </tr>
                <tr>
                  <td>Gender Inequality Index (GII)</td>
                  <td>
                    1. Reproductive health: maternal mortality ratio, adolescent birth rate
                    <br />2. Empowerment: share of parliamentary seats held by women, secondary education by gender
                    <br />3. Labour market: labour force participation by gender
                  </td>
                  <td>0–1, <strong>lower is better</strong> (0 = full equality between women and men).</td>
                </tr>
                <tr>
                  <td>Inequality-adjusted HDI (IHDI)</td>
                  <td>The HDI discounted for inequality within each dimension</td>
                  <td>IHDI ≤ HDI. The bigger the gap (percentage loss), the more unequally human development is shared; with perfect equality IHDI = HDI.</td>
                </tr>
                <tr>
                  <td>Happy Planet Index</td>
                  <td>(Subjective well-being × life expectancy, adjusted for inequality) ÷ ecological footprint per person</td>
                  <td>Higher is better; measures how efficiently a country turns resource use into long, happy lives. Countries such as Costa Rica score well, while high-consumption countries such as the US score poorly.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                The HDI uses the log of income because extra income matters less as people get richer: a rise from $1,000 to $2,000 per person does far more for human development than one from $50,000 to $51,000. To compare countries, use GNI per capita rank minus HDI rank: a positive value means the country turns its income into health and education relatively well.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "strengths-limitations",
      level: "both",
      title: { zh: "各种衡量方法的优点与局限", en: "Strengths and limitations of the measures" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>方法</th>
                  <th>优点</th>
                  <th>局限</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>人均 GDP / GNI（PPP）</td>
                  <td>数据普遍可得、更新及时；PPP 调整了物价差异</td>
                  <td>平均数掩盖分配；忽略非市场活动、环境成本和福祉的非收入方面；PPP 估算本身有误差</td>
                </tr>
                <tr>
                  <td>其他单一指标</td>
                  <td>直接衡量具体结果（如婴儿死亡率），便于针对性制定政策</td>
                  <td>只反映一个维度；发展中国家数据质量参差不齐</td>
                </tr>
                <tr>
                  <td>HDI</td>
                  <td>同时包含健康、教育和收入，比单看收入更全面；简单易懂</td>
                  <td>只有三个维度，不考虑不平等、性别、贫困、环境和政治自由；各维度等权重是主观选择；高收入国家之间差别很小</td>
                </tr>
                <tr>
                  <td>GII、IHDI</td>
                  <td>弥补 HDI 不反映分配和性别差距的缺陷</td>
                  <td>需要更详细的数据，很多国家缺失；仍是平均化的单一数字</td>
                </tr>
                <tr>
                  <td>快乐星球指数</td>
                  <td>把可持续性（生态足迹）和主观福祉纳入衡量</td>
                  <td>幸福感是主观的、受文化影响；可能让某些收入低但幸福感高的国家看起来「很发达」</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                综合指标的共同问题是：选择哪些维度、如何加权，都包含价值判断（这也是 TOK 的问题）。最好的做法是同时使用多种指标，并结合国家的具体情况来判断发展水平。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Approach</th>
                  <th>Strengths</th>
                  <th>Limitations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GDP / GNI per capita (PPP)</td>
                  <td>Widely available and up to date; PPP adjusts for price differences</td>
                  <td>An average that hides distribution; ignores non-market activity, environmental costs and non-income aspects of well-being; PPP estimates have errors</td>
                </tr>
                <tr>
                  <td>Other single indicators</td>
                  <td>Measure specific outcomes directly (e.g. infant mortality), so useful for targeting policy</td>
                  <td>Cover only one dimension; data quality varies in developing countries</td>
                </tr>
                <tr>
                  <td>HDI</td>
                  <td>Combines health, education and income, so broader than income alone; simple to understand</td>
                  <td>Only three dimensions; ignores inequality, gender, poverty, the environment and political freedom; equal weights are a subjective choice; little variation among rich countries</td>
                </tr>
                <tr>
                  <td>GII, IHDI</td>
                  <td>Fill the HDI&apos;s gaps on distribution and gender</td>
                  <td>Need more detailed data, missing for many countries; still a single averaged number</td>
                </tr>
                <tr>
                  <td>Happy Planet Index</td>
                  <td>Brings sustainability (ecological footprint) and subjective well-being into the measure</td>
                  <td>Well-being is subjective and culturally shaped; can make some low-income but happy countries look highly developed</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                A common problem with composite indicators is that choosing the dimensions and their weights involves value judgements (a TOK link). The best approach is to use several indicators together and interpret them in the context of the country.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "growth-vs-development",
      level: "both",
      title: { zh: "经济增长与经济发展的关系", en: "The relationship between economic growth and economic development" },
      body: {
        zh: (
          <>
            <p>
              <strong>增长可以促进发展</strong>：收入增加使家庭能负担更好的食物、住房和教育；政府税收增加，可以投资医疗、学校和基础设施；创造就业，帮助人们摆脱贫困。
            </p>
            <p>
              <strong>发展也能促进增长</strong>：更健康、受教育程度更高的劳动力生产率更高（人力资本）；良好的制度和基础设施吸引投资。
            </p>
            <p>
              <strong>但增长不一定带来发展</strong>：
            </p>
            <ul>
              <li>增长的成果集中在少数人手中，不平等扩大，穷人受益很少。</li>
              <li>增长依赖自然资源出口（「资源诅咒」），收入被腐败吞噬或用于军费，而非医疗和教育。</li>
              <li>增长伴随严重的环境破坏，损害健康和长期可持续性。</li>
            </ul>
            <p>同样，有些国家收入不高，但通过优先投资公共医疗和教育，取得了较高的人类发展水平。</p>
            <HdiIncome caption="图 1 HDI 与人均 GNI 的关系（示意）：总体正相关，但随着收入提高而趋于平缓。A 国的 HDI 高于其收入水平通常对应的值（收入有效转化为健康和教育），B 国则相反。" />
            <Callout title="例子">
              <p>
                斯里兰卡、古巴等国的 HDI 排名明显高于其人均 GNI 排名，反映了长期对公共医疗和教育的投入；赤道几内亚等石油出口国人均收入较高，但 HDI 排名远低于收入排名，说明资源收入没有广泛惠及民众。
              </p>
            </Callout>
            <Callout title="评价">
              <p>
                增长是发展的<strong>必要但不充分条件</strong>：长期来看，没有增长很难持续改善生活水平，但增长能否转化为发展，取决于收入分配、政府如何使用收入、制度质量以及是否兼顾环境。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Growth can promote development</strong>: higher incomes let households afford better food, housing and schooling; higher tax revenue lets governments invest in healthcare, schools and infrastructure; new jobs lift people out of poverty.
            </p>
            <p>
              <strong>Development can promote growth</strong>: a healthier, better-educated workforce is more productive (human capital), and good institutions and infrastructure attract investment.
            </p>
            <p>
              <strong>But growth does not guarantee development</strong>:
            </p>
            <ul>
              <li>The gains may go to a few, widening inequality and leaving the poor little better off.</li>
              <li>Growth based on natural resource exports (the resource curse) may be lost to corruption or spent on the military rather than health and education.</li>
              <li>Growth may cause severe environmental damage, harming health and long-run sustainability.</li>
            </ul>
            <p>Equally, some countries with modest incomes have achieved high human development by prioritising public health and education.</p>
            <HdiIncome caption="Figure 1 HDI and GNI per capita (illustrative): positively related, but the curve flattens as income rises. Country A has a higher HDI than its income would typically suggest (income is turned into health and education effectively); country B has a lower one." />
            <Callout title="Real-world example">
              <p>
                Sri Lanka and Cuba rank much higher on the HDI than on GNI per capita, reflecting long-term public investment in health and education. Oil exporters such as Equatorial Guinea have relatively high incomes but rank far lower on the HDI, showing that resource income has not been widely shared.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <p>
                Growth is a <strong>necessary but not sufficient</strong> condition for development: without growth it is hard to raise living standards for long, but whether growth becomes development depends on income distribution, how governments use revenue, the quality of institutions and attention to the environment.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.8 Measuring development",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "UNDP Human Development Reports — Human Development Index (HDI)",
      href: "https://hdr.undp.org/data-center/human-development-index",
    },
    {
      label: "UNDP Human Development Reports — Gender Inequality Index (GII)",
      href: "https://hdr.undp.org/data-center/thematic-composite-indices/gender-inequality-index",
    },
    {
      label: "Happy Planet Index",
      href: "https://happyplanetindex.org/",
    },
  ],
};

export default notes;
