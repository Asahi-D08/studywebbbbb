import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const SDGS: [string, string][] = [
  ["无贫困", "No poverty"],
  ["零饥饿", "Zero hunger"],
  ["良好健康与福祉", "Good health and well-being"],
  ["优质教育", "Quality education"],
  ["性别平等", "Gender equality"],
  ["清洁饮水和卫生设施", "Clean water and sanitation"],
  ["经济适用的清洁能源", "Affordable and clean energy"],
  ["体面工作和经济增长", "Decent work and economic growth"],
  ["产业、创新和基础设施", "Industry, innovation and infrastructure"],
  ["减少不平等", "Reduced inequalities"],
  ["可持续城市和社区", "Sustainable cities and communities"],
  ["负责任消费和生产", "Responsible consumption and production"],
  ["气候行动", "Climate action"],
  ["水下生物", "Life below water"],
  ["陆地生物", "Life on land"],
  ["和平、正义与强大机构", "Peace, justice and strong institutions"],
  ["促进目标实现的伙伴关系", "Partnerships for the goals"],
];

function SdgTable({ lang }: { lang: "zh" | "en" }) {
  const half = Math.ceil(SDGS.length / 2);
  const rows = SDGS.slice(0, half).map((g, i) => [i, g, SDGS[i + half]] as const);
  const name = (g: [string, string]) => (lang === "zh" ? `${g[0]}（${g[1]}）` : g[1]);
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{lang === "zh" ? "目标" : "Goal"}</th>
          <th>#</th>
          <th>{lang === "zh" ? "目标" : "Goal"}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([i, a, b]) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{name(a)}</td>
            <td>{b ? i + 1 + half : ""}</td>
            <td>{b ? name(b) : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "可持续发展是指既满足当代人需要、又不损害后代人满足其需要之能力的发展，兼顾经济、社会和环境三个方面。联合国 17 个可持续发展目标（SDGs）为 2030 年前的全球发展设定了框架。HL 还要分析可持续性与贫困之间相互强化的关系。",
    en: "Sustainable development meets the needs of the present without compromising the ability of future generations to meet their own needs, balancing economic, social and environmental goals. The UN's 17 Sustainable Development Goals (SDGs) set the global development agenda to 2030. HL also analyses the two-way relationship between sustainability and poverty.",
  },
  sections: [
    {
      id: "meaning",
      level: "both",
      title: { zh: "可持续发展的含义", en: "The meaning of sustainable development" },
      body: {
        zh: (
          <>
            <Def term="Sustainable development">
              既满足当代人的需要，又不损害后代人满足其自身需要之能力的发展（1987 年联合国布伦特兰报告 Brundtland Report 的定义）。
            </Def>
            <p>
              核心思想是<strong>代际公平</strong>（intergenerational equity）：今天的增长不能以耗尽资源、破坏环境为代价，把成本留给下一代。它把三个方面结合在一起：
            </p>
            <table>
              <thead>
                <tr>
                  <th>维度</th>
                  <th>含义</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>经济 Economic</td>
                  <td>持续提高收入和生活水平，保持生产能力</td>
                  <td>创造体面工作、投资基础设施</td>
                </tr>
                <tr>
                  <td>社会 Social</td>
                  <td>公平分配发展成果，满足教育、医疗等基本需要</td>
                  <td>缩小收入和性别差距、普及教育</td>
                </tr>
                <tr>
                  <td>环境 Environmental</td>
                  <td>可再生资源的使用速度不超过其再生速度，污染不超过环境承载力</td>
                  <td>可持续渔业、发展可再生能源</td>
                </tr>
              </tbody>
            </table>
            <p>
              与第 2.8 节的联系：环境问题往往源于<strong>市场失灵</strong>，例如生产的负外部性（碳排放）和公共池塘资源（common pool resources）的过度使用。市场价格没有反映环境成本，所以单靠市场无法实现可持续发展。
            </p>
            <Callout title="评价：经济增长与可持续性的取舍">
              <p>
                传统的工业化增长往往依赖化石燃料，与环境目标冲突；但绿色技术（太阳能、电动车）正在降低这种取舍。发展中国家常认为，发达国家在工业化过程中已排放了大部分历史碳排放，现在要求所有国家同等减排并不公平。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Sustainable development">
              Development that meets the needs of the present without compromising the ability of future generations to meet their own needs (the definition from the UN&apos;s 1987 Brundtland Report).
            </Def>
            <p>
              The core idea is <strong>intergenerational equity</strong>: growth today should not run down resources or damage the environment, leaving the costs to the next generation. It combines three dimensions:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>Meaning</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Economic</td>
                  <td>Rising incomes and living standards while maintaining productive capacity</td>
                  <td>Creating decent jobs, investing in infrastructure</td>
                </tr>
                <tr>
                  <td>Social</td>
                  <td>Fair sharing of the gains, meeting basic needs such as education and healthcare</td>
                  <td>Narrowing income and gender gaps, universal schooling</td>
                </tr>
                <tr>
                  <td>Environmental</td>
                  <td>Renewable resources used no faster than they regenerate, pollution within the environment&apos;s capacity</td>
                  <td>Sustainable fisheries, renewable energy</td>
                </tr>
              </tbody>
            </table>
            <p>
              Link to 2.8: environmental problems often come from <strong>market failure</strong>, such as negative production externalities (carbon emissions) and the overuse of common pool resources. Market prices do not reflect environmental costs, so markets alone will not deliver sustainable development.
            </p>
            <Callout title="Evaluation: the growth–sustainability trade-off">
              <p>
                Traditional industrial growth has relied on fossil fuels and conflicts with environmental goals, although green technologies (solar power, electric vehicles) are weakening this trade-off. Developing countries often argue that rich countries produced most historical emissions while industrialising, so asking every country to cut emissions equally is unfair.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "sdgs",
      level: "both",
      title: { zh: "可持续发展目标（SDGs）", en: "The Sustainable Development Goals (SDGs)" },
      body: {
        zh: (
          <>
            <Def term="Sustainable Development Goals (SDGs)">
              2015 年联合国所有成员国通过的 17 个全球发展目标（下设 169 个具体指标），计划在 2030 年前实现，涵盖消除贫困、保护环境和促进和平与繁荣。
            </Def>
            <SdgTable lang="zh" />
            <p>
              SDGs 取代了 2000–2015 年的千年发展目标（MDGs）。与 MDGs 主要针对发展中国家不同，SDGs 适用于<strong>所有国家</strong>，并且明确把环境可持续性（目标 12–15）放在与减贫同等重要的位置。各目标之间相互关联：例如普及教育（目标 4）能促进性别平等（目标 5）和经济增长（目标 8）。
            </p>
            <Callout title="评价">
              <ul>
                <li><strong>优点</strong>：为政府、援助机构、企业和 NGO 提供共同的框架和可衡量的指标，有助于动员资金和比较进展。</li>
                <li><strong>局限</strong>：目标数量多、范围广，没有法律约束力；许多低收入国家缺乏资金和数据来实施与监测；目标之间可能冲突（如目标 8 的增长与目标 13 的气候行动）。</li>
                <li>联合国的进展报告显示，新冠疫情、冲突和债务问题使多数指标偏离轨道，只有少数有望在 2030 年前达成。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Sustainable Development Goals (SDGs)">
              A set of 17 global goals (with 169 targets) adopted by all UN member states in 2015, to be achieved by 2030, covering the end of poverty, protection of the planet and peace and prosperity.
            </Def>
            <SdgTable lang="en" />
            <p>
              The SDGs replaced the Millennium Development Goals (MDGs, 2000–2015). Unlike the MDGs, which focused on developing countries, the SDGs apply to <strong>all countries</strong> and give environmental sustainability (Goals 12–15) the same weight as poverty reduction. The goals are interlinked: universal education (Goal 4) supports gender equality (Goal 5) and economic growth (Goal 8).
            </p>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Strengths</strong>: a shared framework with measurable targets for governments, donors, firms and NGOs, which helps mobilise funding and compare progress.</li>
                <li><strong>Limitations</strong>: many broad goals with no legal force; many low-income countries lack the finance and data to implement and monitor them; goals can conflict (e.g. growth in Goal 8 vs climate action in Goal 13).</li>
                <li>UN progress reports show that COVID-19, conflict and debt have pushed most targets off track, with only a small share on course for 2030.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "examples",
      level: "both",
      title: { zh: "可持续发展的实践与例子", en: "Sustainable development in practice" },
      body: {
        zh: (
          <>
            <p>考试中用具体例子说明可持续发展，比空泛的定义更能拿分：</p>
            <table>
              <thead>
                <tr>
                  <th>例子</th>
                  <th>做法</th>
                  <th>体现的维度 / 相关 SDG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>哥斯达黎加 Costa Rica</td>
                  <td>向保护森林的土地所有者支付「生态服务费」（payments for ecosystem services），森林覆盖率从 1980 年代约五分之一恢复到如今超过一半；同时生态旅游成为重要收入来源。</td>
                  <td>环境 + 经济；目标 15、8</td>
                </tr>
                <tr>
                  <td>挪威 Norway</td>
                  <td>把石油收入存入主权财富基金，每年只动用其中一小部分，把不可再生资源的收益留给后代。</td>
                  <td>代际公平；目标 8、12</td>
                </tr>
                <tr>
                  <td>肯尼亚 Kenya</td>
                  <td>大力开发地热、风能等可再生能源，电力供应中可再生能源占绝大部分，并扩大农村通电。</td>
                  <td>环境 + 社会；目标 7、13</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                评价某项政策是否「可持续」时，从经济、社会、环境三个维度逐一分析，并指出取舍（例如保护森林可能限制农民的短期收入），再结合国家的具体情况下结论。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Concrete examples earn more marks than a bare definition:</p>
            <table>
              <thead>
                <tr>
                  <th>Example</th>
                  <th>What was done</th>
                  <th>Dimension / related SDG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Costa Rica</td>
                  <td>Pays landowners to protect forests (payments for ecosystem services); forest cover has recovered from about a fifth in the 1980s to over half today, and ecotourism has become a major source of income.</td>
                  <td>Environmental + economic; Goals 15, 8</td>
                </tr>
                <tr>
                  <td>Norway</td>
                  <td>Saves oil revenue in a sovereign wealth fund and spends only a small share each year, passing the returns from a non-renewable resource on to future generations.</td>
                  <td>Intergenerational equity; Goals 8, 12</td>
                </tr>
                <tr>
                  <td>Kenya</td>
                  <td>Has developed geothermal and wind power so that renewables supply most of its electricity, while extending rural electrification.</td>
                  <td>Environmental + social; Goals 7, 13</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                When judging whether a policy is sustainable, work through the economic, social and environmental dimensions in turn, point out the trade-offs (e.g. protecting forests may limit farmers&apos; short-term incomes), and reach a conclusion that fits the country&apos;s context.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "sustainability-poverty",
      level: "hl",
      title: { zh: "可持续性与贫困的关系", en: "The relationship between sustainability and poverty" },
      body: {
        zh: (
          <>
            <p>贫困与环境退化往往<strong>相互强化</strong>，形成恶性循环：</p>
            <p><strong>1. 贫困导致不可持续的资源使用</strong></p>
            <ul>
              <li>贫困人口直接依赖自然资源生存：自给农业、砍柴做燃料、捕鱼、放牧。</li>
              <li>为了今天的生存，他们不得不过度耕种、过度放牧和砍伐森林，即使知道这会损害未来的收成（短期视野）。</li>
              <li>缺乏<strong>产权</strong>（土地所有权）和信贷，没有动力也没有能力投资于土壤保护、灌溉或更清洁的技术；公共土地和渔场容易出现「公地悲剧」。</li>
              <li>缺乏清洁能源，只能用木柴、木炭和煤油，造成森林砍伐和室内空气污染。</li>
            </ul>
            <p><strong>2. 环境退化加深贫困</strong></p>
            <ul>
              <li>土壤侵蚀、荒漠化和渔业资源枯竭直接降低穷人的收入。</li>
              <li>气候变化带来的干旱、洪水和极端天气对低收入国家和穷人打击最大，因为他们依赖农业、住房简陋、缺乏保险和储蓄。</li>
              <li>水污染和空气污染引发疾病，降低劳动生产率，增加医疗支出。</li>
            </ul>
            <p>
              因此，减贫是实现可持续性的<strong>前提</strong>之一：提高收入、明确土地产权、普及教育和清洁能源，让穷人有能力也有动力保护环境。
            </p>
            <Callout title="例子">
              <p>
                萨赫勒地区（Sahel）的过度放牧和砍柴加剧了荒漠化，又进一步降低了牧民和农民的收入；孟加拉国的低洼沿海地区，海平面上升和风暴潮让最贫困的家庭失去土地和生计。
              </p>
            </Callout>
            <Callout title="评价">
              <p>
                关系并非单向：收入提高后，消费增加也会加大资源消耗和碳排放（富裕国家的人均生态足迹远高于贫穷国家）。部分研究认为污染先随收入上升、后随收入下降（环境库兹涅茨曲线），但这并不适用于所有污染物，尤其是二氧化碳。所以减贫必须与绿色增长结合。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Poverty and environmental degradation often <strong>reinforce each other</strong> in a vicious circle:</p>
            <p><strong>1. Poverty leads to unsustainable resource use</strong></p>
            <ul>
              <li>The poor depend directly on natural resources: subsistence farming, firewood for fuel, fishing, grazing.</li>
              <li>To survive today they may overfarm, overgraze and cut down forests, even though this harms future harvests (short time horizons).</li>
              <li>Without <strong>property rights</strong> (land titles) and credit, they have neither the incentive nor the means to invest in soil conservation, irrigation or cleaner technology; common land and fisheries suffer a tragedy of the commons.</li>
              <li>Without clean energy, households burn wood, charcoal and kerosene, causing deforestation and indoor air pollution.</li>
            </ul>
            <p><strong>2. Environmental degradation deepens poverty</strong></p>
            <ul>
              <li>Soil erosion, desertification and depleted fish stocks directly reduce the incomes of the poor.</li>
              <li>Droughts, floods and extreme weather from climate change hit low-income countries and poor households hardest, as they rely on farming, live in poor housing and lack insurance and savings.</li>
              <li>Water and air pollution cause illness, lowering labour productivity and raising health spending.</li>
            </ul>
            <p>
              Poverty reduction is therefore a <strong>precondition</strong> for sustainability: higher incomes, secure land rights, education and clean energy give the poor both the means and the incentive to protect the environment.
            </p>
            <Callout title="Real-world example">
              <p>
                In the Sahel, overgrazing and fuelwood collection have added to desertification, which in turn lowers herders&apos; and farmers&apos; incomes. In low-lying coastal Bangladesh, rising sea levels and storm surges strip the poorest households of land and livelihoods.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <p>
                The link is not one-way: as incomes rise, higher consumption increases resource use and emissions (rich countries have far larger ecological footprints per person). Some studies find that pollution first rises and then falls with income (the environmental Kuznets curve), but this does not hold for every pollutant, especially CO₂. Poverty reduction must therefore go hand in hand with green growth.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.7 Sustainable development",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "United Nations — The 17 Sustainable Development Goals",
      href: "https://sdgs.un.org/goals",
    },
    {
      label: "United Nations Academic Impact — Sustainability",
      href: "https://www.un.org/en/academic-impact/sustainability",
    },
    {
      label: "World Bank — Poverty overview",
      href: "https://www.worldbank.org/en/topic/poverty/overview",
    },
  ],
};

export default notes;
