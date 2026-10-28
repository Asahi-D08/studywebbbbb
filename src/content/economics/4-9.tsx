import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const CYCLE = ["Low incomes", "Low savings", "Low investment", "Low productivity", "Low output growth"];
const BOX_W = 124;
const BOX_H = 30;

function PovertyCycle({ caption }: { caption: ReactNode }) {
  const cx = 220;
  const cy = 162;
  const nodes = CYCLE.map((text, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / CYCLE.length;
    return { text, x: cx + 148 * Math.cos(a), y: cy + 112 * Math.sin(a) };
  });
  const edge = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const t = Math.min((BOX_W / 2 + 6) / Math.abs(dx || 1e-9), (BOX_H / 2 + 6) / Math.abs(dy || 1e-9));
    return [from.x + dx * t, from.y + dy * t, to.x - dx * t, to.y - dy * t];
  };
  return (
    <figure className="notes-figure">
      <svg
        viewBox="0 0 440 330"
        role="img"
        aria-label="Poverty cycle"
        className="mx-auto block w-full max-w-[440px]"
        fontSize={12}
      >
        <defs>
          <marker
            id="pc-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-slate-700 dark:fill-slate-300" />
          </marker>
        </defs>
        {nodes.map((n, i) => {
          const [x1, y1, x2, y2] = edge(n, nodes[(i + 1) % nodes.length]);
          return (
            <line
              key={`e${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={1.5}
              className="stroke-slate-700 dark:stroke-slate-300"
              markerEnd="url(#pc-arrow)"
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.text}>
            <rect
              x={n.x - BOX_W / 2}
              y={n.y - BOX_H / 2}
              width={BOX_W}
              height={BOX_H}
              rx={6}
              strokeWidth={1.8}
              className="fill-brand-50 stroke-brand-800 dark:fill-slate-800 dark:stroke-brand-200"
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fontWeight={600}
              className="fill-slate-800 dark:fill-slate-100"
            >
              {n.text}
            </text>
          </g>
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400">
          Poverty
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400">
          cycle
        </text>
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "许多低收入国家陷入贫困陷阱：低收入导致低储蓄、低投资和低生产率，又反过来维持低收入。本节分析阻碍经济增长与发展的经济障碍（不平等、基础设施、人力资本、依赖初级产品、市场准入、非正规经济、资本外逃、债务、地理与气候）以及政治和社会障碍（制度薄弱、性别不平等、腐败、政治权力不平等），并评价不同障碍的重要性。",
    en: "Many low-income countries are stuck in a poverty trap: low incomes lead to low saving, investment and productivity, which keep incomes low. This topic analyses the economic barriers to growth and development (inequality, infrastructure, human capital, primary-sector dependence, market access, the informal economy, capital flight, debt, geography and climate) and the political and social barriers (weak institutions, gender inequality, corruption, unequal political power), and evaluates how significant each barrier is.",
  },
  sections: [
    {
      id: "poverty-cycle",
      level: "both",
      title: { zh: "贫困陷阱 / 贫困循环", en: "Poverty traps and poverty cycles" },
      body: {
        zh: (
          <>
            <Def term="Poverty trap (poverty cycle)">
              一系列相互关联的因素使贫困自我延续的情形：低收入家庭、社区或国家缺乏摆脱贫困所需的资源，贫困因此代代相传。
            </Def>
            <p>
              最经典的循环：收入低 → 收入几乎全部用于基本消费，<strong>储蓄</strong>很少 → 银行可贷资金少，<strong>投资</strong>于实物资本和人力资本的数量少 → 劳动<strong>生产率</strong>低 → 产出增长慢 → 收入继续很低。
            </p>
            <PovertyCycle caption="图 1 贫困循环：低收入 → 低储蓄 → 低投资 → 低生产率 → 产出增长慢 → 低收入。" />
            <p>其他常见的链条（考试中可以画任意一种相互关联的组合）：</p>
            <ul>
              <li><strong>健康与教育</strong>：低收入 → 营养差、负担不起医疗和学费 → 健康差、受教育少（人力资本低）→ 只能从事低技能、低收入工作 → 低收入。</li>
              <li><strong>政府财政</strong>：低收入 → 税基小、税收少 → 公共基础设施、学校和医院投入少 → 生产率低 → 低收入。</li>
              <li><strong>人口</strong>：低收入 → 家庭依赖孩子作为劳动力和养老保障，出生率高 → 人均资源被摊薄 → 低收入。</li>
            </ul>
            <Callout title="画图要点">
              <ul>
                <li>用方框和箭头画成一个闭合的圆环，每一环都要写清楚是什么（「低储蓄」而不只是「储蓄」）。</li>
                <li>文字中解释每一个箭头的因果关系，并说明需要外部干预（如援助、FDI、教育投入）在某一环打破循环。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Poverty trap (poverty cycle)">
              A situation in which a set of linked factors makes poverty self-perpetuating: poor households, communities or countries lack the resources needed to escape, so poverty is passed from one generation to the next.
            </Def>
            <p>
              The classic cycle: low incomes → almost all income goes on basic consumption, so <strong>saving</strong> is low → banks have little to lend, so <strong>investment</strong> in physical and human capital is low → labour <strong>productivity</strong> is low → output grows slowly → incomes stay low.
            </p>
            <PovertyCycle caption="Figure 1 A poverty cycle: low incomes → low savings → low investment → low productivity → low output growth → low incomes." />
            <p>Other common links (in an exam you may draw any linked combination of factors):</p>
            <ul>
              <li><strong>Health and education</strong>: low incomes → poor nutrition, unaffordable healthcare and school fees → poor health and little schooling (low human capital) → only low-skill, low-paid work → low incomes.</li>
              <li><strong>Government finance</strong>: low incomes → narrow tax base and little revenue → little spending on infrastructure, schools and hospitals → low productivity → low incomes.</li>
              <li><strong>Population</strong>: low incomes → families rely on children for labour and old-age support, so birth rates are high → resources are spread more thinly per person → low incomes.</li>
            </ul>
            <Callout title="Drawing checklist">
              <ul>
                <li>Draw a closed loop of boxes and arrows, and label each box precisely (low savings, not just savings).</li>
                <li>Explain each causal link in words, and say where outside intervention (aid, FDI, investment in education) could break the cycle.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "economic-barriers-1",
      level: "both",
      title: { zh: "经济障碍（一）：不平等、资本与经济结构", en: "Economic barriers (1): inequality, capital and economic structure" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>障碍</th>
                  <th>为什么阻碍增长与发展</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>经济不平等加剧 Rising economic inequality</td>
                  <td>穷人无法投资于教育和小生意，人力资本浪费；增长的好处集中在少数人手中，减贫效果弱；还可能导致社会不稳定和精英俘获政策。</td>
                </tr>
                <tr>
                  <td>缺乏基础设施和适用技术 Lack of access to infrastructure and appropriate technology</td>
                  <td>道路、电力、通信、供水不足，抬高企业成本、阻碍市场一体化；从发达国家引进的资本密集型技术不适合劳动力丰富、技能较低的国家（适用技术应符合当地要素条件）。</td>
                </tr>
                <tr>
                  <td>人力资本低：缺乏医疗和教育 Low levels of human capital</td>
                  <td>疾病和营养不良降低劳动生产率；教育不足导致技能短缺，难以吸收新技术或转向高附加值产业。</td>
                </tr>
                <tr>
                  <td>依赖初级产品生产 Dependence on primary sector production</td>
                  <td>初级产品（农产品、矿产）供求都缺乏价格弹性，价格<strong>波动</strong>大，出口收入和政府收入不稳定；长期来看，初级产品相对于制成品的价格趋于下降（贸易条件恶化，Prebisch-Singer 假说）；附加值低、对技能需求少；还可能出现「资源诅咒」。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                赞比亚出口收入高度依赖铜，铜价下跌会同时打击出口收入、政府财政和汇率；撒哈拉以南非洲仍有大量人口无法用电，严重限制了制造业和小企业的发展。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Barrier</th>
                  <th>Why it holds back growth and development</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rising economic inequality</td>
                  <td>The poor cannot invest in education or small businesses, wasting human capital; the gains from growth go to a few, so poverty falls slowly; it may also cause social instability and capture of policy by elites.</td>
                </tr>
                <tr>
                  <td>Lack of access to infrastructure and appropriate technology</td>
                  <td>Poor roads, power, communications and water raise firms&apos; costs and fragment markets; capital-intensive technology imported from rich countries may not suit economies with abundant, lower-skilled labour (appropriate technology fits local factor endowments).</td>
                </tr>
                <tr>
                  <td>Low levels of human capital (lack of access to healthcare and education)</td>
                  <td>Illness and malnutrition lower labour productivity; poor education creates skills shortages, making it hard to absorb new technology or move into higher value-added industries.</td>
                </tr>
                <tr>
                  <td>Dependence on primary sector production</td>
                  <td>Demand and supply for commodities are price-inelastic, so prices are <strong>volatile</strong> and export and tax revenues are unstable; over the long run commodity prices tend to fall relative to manufactures (declining terms of trade, the Prebisch-Singer hypothesis); value added and skill demands are low; there is a risk of the resource curse.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                Zambia relies heavily on copper exports, so a fall in the copper price hits export earnings, government revenue and the exchange rate at once. A large share of people in sub-Saharan Africa still lack electricity, which seriously limits manufacturing and small businesses.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "economic-barriers-2",
      level: "both",
      title: { zh: "经济障碍（二）：市场、资金与地理", en: "Economic barriers (2): markets, finance and geography" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>障碍</th>
                  <th>为什么阻碍增长与发展</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>难以进入国际市场 Lack of access to international markets</td>
                  <td>发达国家对农产品的关税、配额和农业补贴（如欧盟、美国），以及对加工品征收更高关税（关税升级，tariff escalation），使发展中国家难以出口和向价值链上游发展；运输成本高、贸易便利化差也是障碍。</td>
                </tr>
                <tr>
                  <td>非正规经济 Informal economy</td>
                  <td>未登记的经济活动不纳税，政府收入少；工人缺乏劳动保护和社会保障；企业难以获得正规贷款，规模小、生产率低。</td>
                </tr>
                <tr>
                  <td>资本外逃 Capital flight</td>
                  <td>富人和企业因政治不稳定、货币贬值或逃税，把资金转移到海外，国内可用于投资的储蓄减少，税基缩小。</td>
                </tr>
                <tr>
                  <td>负债 Indebtedness</td>
                  <td>大量外债的还本付息占用财政收入，挤占教育和医疗支出；外币债务在本币贬值时负担加重；可能被迫接受附带条件的贷款。</td>
                </tr>
                <tr>
                  <td>地理条件，包括内陆国 Geography including landlocked countries</td>
                  <td>内陆国家依赖邻国的港口和道路，运输成本高、出口竞争力弱；山区、沙漠或自然灾害多发地区发展基础设施更困难。</td>
                </tr>
                <tr>
                  <td>热带气候与地方性疾病 Tropical climates and endemic diseases</td>
                  <td>疟疾等热带疾病降低劳动生产率和儿童入学率；高温、干旱和洪涝影响农业产量，气候变化使问题更严重。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                乍得、尼日尔、马拉维等内陆国，出口需要经过邻国港口，运输成本远高于沿海国家；疟疾每年造成数十万人死亡，绝大多数在非洲，主要是五岁以下儿童。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Barrier</th>
                  <th>Why it holds back growth and development</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lack of access to international markets</td>
                  <td>Tariffs, quotas and farm subsidies in rich countries (e.g. the EU, the US) and higher tariffs on processed goods (tariff escalation) make it hard to export and move up the value chain; high transport costs and poor trade facilitation add to the problem.</td>
                </tr>
                <tr>
                  <td>Informal economy</td>
                  <td>Unregistered activity pays no tax, so government revenue is low; workers lack legal protection and social security; firms cannot get formal credit, so they stay small and unproductive.</td>
                </tr>
                <tr>
                  <td>Capital flight</td>
                  <td>The rich and firms move money abroad because of political instability, expected depreciation or tax evasion, reducing domestic savings available for investment and shrinking the tax base.</td>
                </tr>
                <tr>
                  <td>Indebtedness</td>
                  <td>Debt servicing absorbs government revenue and crowds out spending on education and health; foreign-currency debt becomes heavier after a depreciation; countries may have to accept loans with conditions attached.</td>
                </tr>
                <tr>
                  <td>Geography including landlocked countries</td>
                  <td>Landlocked countries depend on neighbours&apos; ports and roads, so transport costs are high and exports less competitive; mountains, deserts and frequent natural disasters make infrastructure harder to build.</td>
                </tr>
                <tr>
                  <td>Tropical climates and endemic diseases</td>
                  <td>Diseases such as malaria reduce labour productivity and school attendance; heat, droughts and floods reduce farm output, and climate change makes this worse.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                Landlocked countries such as Chad, Niger and Malawi must export through neighbours&apos; ports, so transport costs are far higher than for coastal countries. Malaria kills hundreds of thousands of people a year, the vast majority in Africa and mostly children under five.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "political-social-barriers",
      level: "both",
      title: { zh: "政治与社会障碍", en: "Political and social barriers" },
      body: {
        zh: (
          <>
            <p>
              <strong>制度薄弱（weak institutional framework）</strong>：制度是社会的「游戏规则」。IB 列出四个方面：
            </p>
            <ul>
              <li><strong>法律体系（legal system）</strong>：法院效率低、合同难以执行，企业不敢投资、不敢做长期交易。</li>
              <li><strong>无效的税收结构（ineffective taxation structures）</strong>：税基窄、逃税普遍、过度依赖间接税（累退），政府收入不足以提供公共服务，还加剧不平等。</li>
              <li><strong>银行体系（banking system）</strong>：大量人口没有银行账户，储蓄无法转化为投资，小企业和农民难以借款。</li>
              <li><strong>产权（property rights）</strong>：没有明确的土地或房屋产权，人们无法用资产作抵押借款，也缺乏改良土地的动力。</li>
            </ul>
            <p>
              <strong>性别不平等（gender inequality）</strong>：女性受教育机会少、劳动参与率低、缺乏土地和信贷，浪费了一半人口的人力资本；女性受教育程度提高通常会降低生育率和儿童死亡率，因此性别不平等也会拖累下一代。
            </p>
            <p>
              <strong>缺乏善治 / 腐败（lack of good governance / corruption）</strong>：贿赂提高经营成本、扭曲资源配置，公共资金被挪用，援助被浪费，外国投资者望而却步。
            </p>
            <p>
              <strong>政治权力和地位不平等（unequal political power and status）</strong>：少数族群、农村人口或某些宗教群体被排斥在决策之外，政策偏向精英；可能导致冲突、内战，破坏资本和基础设施。
            </p>
            <Callout title="例子">
              <p>
                经济学家埃尔南多·德·索托（Hernando de Soto）指出，许多发展中国家的穷人拥有房屋和土地，但没有合法产权，资产成了无法用于抵押借款的「僵化资本」。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Weak institutional framework</strong>: institutions are the rules of the game in a society. The IB lists four areas:
            </p>
            <ul>
              <li><strong>Legal system</strong>: slow courts and unenforceable contracts deter investment and long-term deals.</li>
              <li><strong>Ineffective taxation structures</strong>: a narrow tax base, widespread evasion and heavy reliance on (regressive) indirect taxes leave too little revenue for public services and worsen inequality.</li>
              <li><strong>Banking system</strong>: many people are unbanked, so savings are not channelled into investment and small firms and farmers cannot borrow.</li>
              <li><strong>Property rights</strong>: without clear title to land or housing, people cannot use assets as collateral and have little incentive to improve them.</li>
            </ul>
            <p>
              <strong>Gender inequality</strong>: fewer educational opportunities, lower labour force participation and lack of land and credit for women waste the human capital of half the population. Educating women tends to lower fertility and child mortality, so gender inequality also holds back the next generation.
            </p>
            <p>
              <strong>Lack of good governance / corruption</strong>: bribes raise business costs and distort resource allocation, public funds are diverted, aid is wasted and foreign investors are deterred.
            </p>
            <p>
              <strong>Unequal political power and status</strong>: when ethnic minorities, rural people or religious groups are excluded from decision-making, policy favours elites; this can lead to conflict and civil war, which destroy capital and infrastructure.
            </p>
            <Callout title="Real-world example">
              <p>
                The economist Hernando de Soto argues that the poor in many developing countries own homes and land without legal title, so these assets are dead capital that cannot be used as collateral for loans.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "significance",
      level: "both",
      title: { zh: "评价：不同障碍的重要性", en: "Evaluation: the significance of different barriers" },
      body: {
        zh: (
          <>
            <p>IB 要求评价（AO3）哪些障碍更重要。答题时可以从以下角度展开：</p>
            <ul>
              <li><strong>因国而异</strong>：内陆的萨赫勒国家，地理、气候和冲突可能是主要障碍；资源丰富的国家，腐败和对初级产品的依赖更关键；一些中等收入国家的主要问题是不平等和非正规经济。</li>
              <li><strong>障碍相互关联</strong>：腐败削弱税收体系 → 公共教育和医疗投入不足 → 人力资本低；地理劣势加上缺乏基础设施会放大运输成本。因此单独解决一个障碍效果有限。</li>
              <li><strong>能否改变</strong>：地理条件无法改变，但影响可以减轻（区域一体化、交通走廊、数字服务出口）；制度和治理难以快速改变，却常被认为是最根本的。</li>
              <li><strong>历史与国际因素</strong>：殖民历史、国际贸易规则和发达国家的农业补贴，使部分障碍并非完全由国内因素造成。</li>
            </ul>
            <Callout title="考试提示">
              <p>
                好的评价段落要「有判断」：结合具体国家的例子，说明在该情境下哪个障碍最关键、为什么，以及这对应选择什么样的发展策略（见 4.10）。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>The IB expects you to evaluate (AO3) which barriers matter most. Useful angles:</p>
            <ul>
              <li><strong>It depends on the country</strong>: for landlocked Sahel states, geography, climate and conflict may dominate; in resource-rich countries, corruption and commodity dependence are more important; in some middle-income countries the main problems are inequality and the informal economy.</li>
              <li><strong>Barriers are interlinked</strong>: corruption weakens the tax system → too little public spending on education and health → low human capital; poor geography combined with weak infrastructure magnifies transport costs. Tackling one barrier alone therefore has limited effect.</li>
              <li><strong>Can it be changed?</strong> Geography cannot, but its effects can be reduced (regional integration, transport corridors, exports of digital services); institutions and governance change slowly but are often seen as the most fundamental.</li>
              <li><strong>Historical and international factors</strong>: colonial history, global trade rules and rich-country farm subsidies mean some barriers are not purely domestic.</li>
            </ul>
            <Callout title="Exam tip">
              <p>
                A strong evaluation reaches a judgement: use a specific country to argue which barrier is most binding in that context and why, and what this implies for the choice of strategy (see 4.10).
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.9 Barriers to economic growth and/or economic development",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "World Bank — Poverty overview",
      href: "https://www.worldbank.org/en/topic/poverty/overview",
    },
    {
      label: "UNDP Human Development Reports — Human Development Index (HDI)",
      href: "https://hdr.undp.org/data-center/human-development-index",
    },
  ],
};

export default notes;
