import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Line, Region, atX, atY, intersect, shift, type Seg } from "@/components/notes/Chart";

const D: Seg = [
  [10, 90],
  [90, 10],
];
const SDOM: Seg = [
  [10, 10],
  [90, 90],
];
const PW = 25;
const PT = 35;

function ImportSubstitution({ caption }: { caption: ReactNode }) {
  const q1 = atY(SDOM, PW);
  const q2 = atY(SDOM, PT);
  const q3 = atY(D, PT);
  const q4 = atY(D, PW);
  return (
    <Chart x="Quantity" y="Price" caption={caption}>
      <Region points={[q1, q2, [q2[0], PW]]} fill="c" />
      <Region points={[q3, q4, [q3[0], PW]]} fill="c" />
      <Region points={[[q2[0], PW], [q2[0], PT], [q3[0], PT], [q3[0], PW]]} fill="a" />
      <Line points={D} label="D" />
      <Line points={SDOM} label="Sdom" />
      <Line
        points={[
          [0, PW],
          [92, PW],
        ]}
        tone="muted"
        label="Sw"
        labelOffset={[6, 4]}
      />
      <Line
        points={[
          [0, PT],
          [92, PT],
        ]}
        tone="alt"
        label="Sw+t"
        labelOffset={[6, 4]}
      />
      <Guide at={q1} x="Q₁" y="Pw" />
      <Guide at={q2} x="Q₂" y="Pw+t" />
      <Guide at={q3} x="Q₃" />
      <Guide at={q4} x="Q₄" />
      <Dot at={q2} />
      <Dot at={q3} />
    </Chart>
  );
}

const AD: Seg = [
  [15, 85],
  [85, 20],
];

function LrasShift({ caption }: { caption: ReactNode }) {
  const a = atX(AD, 45);
  const b = atX(AD, 65);
  return (
    <Chart x="Real GDP" y="Average price level" caption={caption}>
      <Line points={AD} label="AD" />
      <Line
        points={[
          [45, 5],
          [45, 90],
        ]}
        label="LRAS₁"
        labelOffset={[-22, -8]}
      />
      <Line
        points={[
          [65, 5],
          [65, 90],
        ]}
        label="LRAS₂"
        labelOffset={[-22, -8]}
        tone="alt"
      />
      <Guide at={a} x="Yf₁" y="P₁" />
      <Guide at={b} x="Yf₂" y="P₂" />
      <Arrow from={[47, 80]} to={[63, 80]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

const MPB: Seg = [
  [8, 80],
  [75, 10],
];
const MSB = shift(MPB, 16);
const S: Seg = [
  [10, 12],
  [85, 85],
];

function MeritSubsidy({ caption }: { caption: ReactNode }) {
  const m = intersect(MPB, S);
  const opt = intersect(MSB, S);
  const c = atX(MPB, opt[0]);
  const s2Line = shift(S, 0, c[1] - opt[1]);
  const S2: Seg = [atX(s2Line, 28), atX(s2Line, 90)];
  return (
    <Chart x="Quantity" y="Costs, benefits" caption={caption}>
      <Line points={MPB} label="MPB = D" labelAt="start" labelOffset={[-12, -8]} />
      <Line points={MSB} label="MSB" tone="muted" />
      <Line points={S} label="S = MPC = MSC" labelOffset={[-95, -14]} />
      <Line points={S2} label="S₂" tone="alt" />
      <Guide at={opt} y="Pp" />
      <Guide at={m} x="Qm" y="Pm" />
      <Guide at={c} x="Q*" y="Pc" />
      <Dot at={m} />
      <Dot at={c} />
      <Dot at={opt} />
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "促进经济增长与发展没有万能的策略。本节梳理贸易策略（进口替代、出口导向、经济一体化）、多元化、社会企业、市场导向政策（贸易自由化、私有化、放松管制）、干预主义政策（再分配、优益品、基础设施）、外国直接投资、外国援助与多边援助、以及制度变革，并评价各类策略的优缺点、政府干预与市场导向的取舍，以及各国实现 SDGs 的进展。",
    en: "There is no single strategy for growth and development. This topic covers trade strategies (import substitution, export promotion, economic integration), diversification, social enterprise, market-based policies (trade liberalization, privatization, deregulation), interventionist policies (redistribution, merit goods, infrastructure), inward FDI, foreign aid and multilateral assistance, and institutional change. It then evaluates the strategies, government intervention versus market-oriented approaches, and countries' progress towards the SDGs.",
  },
  sections: [
    {
      id: "trade-strategies",
      level: "both",
      title: { zh: "贸易策略", en: "Trade strategies" },
      body: {
        zh: (
          <>
            <Def term="Import substitution (ISI)">
              通过关税、配额等贸易保护限制进口，让本国企业生产原本依赖进口的制成品，以此推动工业化（进口替代工业化）。
            </Def>
            <ImportSubstitution caption="图 1 进口替代：征收关税后，进口品价格从 Pw 升至 Pw+t，国内生产从 Q₁ 增加到 Q₂，进口从 Q₁Q₄ 减少到 Q₂Q₃。浅色矩形为政府关税收入，两个深色三角形为福利损失（左：低效率的国内生产；右：消费减少）。" />
            <p>
              <strong>优点</strong>：保护「幼稚产业」，创造国内就业，节省外汇、改善经常账户。<strong>缺点</strong>：受保护的企业缺乏竞争压力，效率低；消费者面对更高价格和更少选择；国内市场小，难以获得规模经济；可能遭到报复。20 世纪拉丁美洲的进口替代大多以低效率和债务危机告终。
            </p>
            <Def term="Export promotion">
              通过出口补贴、出口加工区、有竞争力的汇率、吸引外资等方式，鼓励面向世界市场生产，以出口带动增长。
            </Def>
            <p>
              <strong>优点</strong>：利用比较优势，获得规模经济和外汇，在国际竞争中提高效率与技术。<strong>缺点</strong>：依赖外部需求，易受全球经济衰退和贸易保护影响；可能偏重少数出口行业；可能面临「逐底竞争」（压低工资和环境标准）。东亚的韩国、中国台湾以及后来的中国大陆、越南是出口导向的典型。
            </p>
            <p>
              <strong>经济一体化（economic integration）</strong>：加入贸易集团（见 4.4），如东盟（ASEAN）、非洲大陆自由贸易区（AfCFTA），可以扩大市场、吸引外资、降低区域内贸易成本；但也可能导致贸易转移，削弱政策自主权。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Import substitution (ISI)">
              A strategy of industrialisation that restricts imports with tariffs and quotas so that domestic firms produce manufactured goods previously imported (import substitution industrialisation).
            </Def>
            <ImportSubstitution caption="Figure 1 Import substitution: a tariff raises the price of imports from Pw to Pw+t, domestic production rises from Q₁ to Q₂ and imports fall from Q₁Q₄ to Q₂Q₃. The light rectangle is government tariff revenue; the two dark triangles are welfare losses (left: inefficient domestic production; right: lost consumption)." />
            <p>
              <strong>Strengths</strong>: protects infant industries, creates domestic jobs, saves foreign exchange and improves the current account. <strong>Limitations</strong>: protected firms face little competition and become inefficient; consumers pay higher prices with less choice; small domestic markets limit economies of scale; retaliation is possible. Most 20th-century ISI in Latin America ended in inefficiency and debt crises.
            </p>
            <Def term="Export promotion">
              A strategy of growth led by exports, encouraging production for world markets through export subsidies, export processing zones, a competitive exchange rate and attracting FDI.
            </Def>
            <p>
              <strong>Strengths</strong>: exploits comparative advantage, gains economies of scale and foreign exchange, and international competition raises efficiency and technology. <strong>Limitations</strong>: dependence on foreign demand makes the economy vulnerable to global recessions and protectionism; growth may be narrow; risk of a race to the bottom in wages and environmental standards. South Korea, Taiwan and later China and Vietnam are classic examples.
            </p>
            <p>
              <strong>Economic integration</strong>: joining a trading bloc (see 4.4), such as ASEAN or the African Continental Free Trade Area (AfCFTA), enlarges the market, attracts FDI and lowers regional trade costs, but may cause trade diversion and reduce policy independence.
            </p>
          </>
        ),
      },
    },
    {
      id: "diversification-social-enterprise",
      level: "both",
      title: { zh: "多元化与社会企业", en: "Diversification and social enterprise" },
      body: {
        zh: (
          <>
            <Def term="Diversification">
              减少对少数初级产品的依赖，扩大经济中产品和产业的范围，例如发展制造业、旅游业和服务业，或对原材料进行深加工。
            </Def>
            <p>
              多元化可以降低出口收入的波动、减轻贸易条件恶化的影响、创造附加值更高的工作。但它需要投资、技能和基础设施，短期内难以实现；有时还需要保护或补贴新产业。例子：博茨瓦纳从钻石开采延伸到钻石切割与抛光，毛里求斯从糖业转向纺织、旅游和金融服务。
            </p>
            <Def term="Social enterprise">
              以解决社会或环境问题为首要目标的企业，通过市场经营获得收入，利润主要再投资于其社会使命，而不是分给股东。
            </Def>
            <p>
              例子：孟加拉国的格莱珉银行（Grameen Bank）向贫困女性提供小额贷款；生产低价太阳能灯、净水设备的企业。社会企业能填补市场和政府都未覆盖的空白，并具有可持续的收入来源；但规模通常较小，难以获得融资，难以替代政府提供的大规模公共服务。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Diversification">
              Reducing dependence on a few primary products by widening the range of goods and industries in the economy, e.g. developing manufacturing, tourism and services, or processing raw materials further.
            </Def>
            <p>
              Diversification reduces the volatility of export earnings, softens the effect of falling terms of trade and creates higher value-added jobs. However, it needs investment, skills and infrastructure and takes time; new industries may need protection or subsidies. Examples: Botswana moving from diamond mining into cutting and polishing, and Mauritius shifting from sugar to textiles, tourism and financial services.
            </p>
            <Def term="Social enterprise">
              A business whose main aim is to tackle a social or environmental problem, earning revenue in the market and reinvesting most of its profit in that mission rather than paying it to shareholders.
            </Def>
            <p>
              Examples: Bangladesh&apos;s Grameen Bank lending to poor women; firms making low-cost solar lamps or water filters. Social enterprises can fill gaps left by both markets and governments and have a self-sustaining income, but they are usually small, find funding hard to raise and cannot replace large-scale public services.
            </p>
          </>
        ),
      },
    },
    {
      id: "market-based",
      level: "both",
      title: { zh: "市场导向政策", en: "Market-based policies" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>政策</th>
                  <th>含义</th>
                  <th>优点</th>
                  <th>局限</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>贸易自由化 Trade liberalization</td>
                  <td>降低关税和配额，开放市场</td>
                  <td>更多竞争、更低价格、获得技术和更大市场，资源按比较优势配置</td>
                  <td>本国幼稚产业可能被淘汰，造成失业；关税收入减少；收益分配不均</td>
                </tr>
                <tr>
                  <td>私有化 Privatization</td>
                  <td>把国有企业出售给私人部门</td>
                  <td>利润动机提高效率，政府获得出售收入、减少亏损补贴</td>
                  <td>可能形成私人垄断、提高价格；穷人可能负担不起基本服务（如水、电）；出售过程可能存在腐败</td>
                </tr>
                <tr>
                  <td>放松管制 Deregulation</td>
                  <td>减少政府规定和审批，降低市场进入壁垒</td>
                  <td>降低企业成本，鼓励创业和竞争，吸引投资</td>
                  <td>可能削弱对劳工、消费者和环境的保护；金融放松管制可能带来不稳定</td>
                </tr>
              </tbody>
            </table>
            <p>
              这些政策属于供给侧政策，目标是让长期总供给（LRAS）右移。20 世纪 80–90 年代，世界银行和 IMF 常把它们作为贷款条件（「华盛顿共识」），效果褒贬不一。
            </p>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Policy</th>
                  <th>Meaning</th>
                  <th>Strengths</th>
                  <th>Limitations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Trade liberalization</td>
                  <td>Cutting tariffs and quotas, opening markets</td>
                  <td>More competition, lower prices, access to technology and larger markets; resources allocated by comparative advantage</td>
                  <td>Infant industries may collapse, causing unemployment; loss of tariff revenue; unequal distribution of gains</td>
                </tr>
                <tr>
                  <td>Privatization</td>
                  <td>Selling state-owned enterprises to the private sector</td>
                  <td>The profit motive raises efficiency; the government gains sale revenue and stops subsidising losses</td>
                  <td>May create private monopolies and higher prices; the poor may be priced out of basic services (water, power); sales may be corrupt</td>
                </tr>
                <tr>
                  <td>Deregulation</td>
                  <td>Removing rules and licensing, lowering barriers to entry</td>
                  <td>Lower business costs, more entrepreneurship and competition, more investment</td>
                  <td>May weaken protection of workers, consumers and the environment; financial deregulation can cause instability</td>
                </tr>
              </tbody>
            </table>
            <p>
              These are supply-side policies that aim to shift LRAS to the right. In the 1980s and 1990s the World Bank and IMF often made them conditions of lending (the Washington Consensus), with mixed results.
            </p>
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
            <p>
              <strong>再分配政策（redistribution policies）</strong>：累进税制、转移支付和最低工资（见 3.4）。有条件现金转移（conditional cash transfers）尤其常见：例如巴西的「家庭补助金」（Bolsa Família）向贫困家庭发放现金，条件是孩子上学并接种疫苗，既减少当前贫困，又积累下一代的人力资本。最低工资能提高低收入工人的收入，但在非正规经济庞大的国家覆盖面有限，过高还可能减少正规就业。
            </p>
            <p>
              <strong>提供优益品（merit goods）</strong>：教育和医疗具有正的消费外部性，市场会消费不足。政府可以免费提供（如免除小学学费）或给予补贴（如疫苗、蚊帐）。
            </p>
            <MeritSubsidy caption="图 2 优益品补贴：由于 MSB > MPB，市场产量 Qm 低于社会最优 Q*。补贴使供给从 S 移到 S₂，消费者价格降至 Pc，生产者实际得到 Pp，产量增加到社会最优的 Q*。" />
            <p>
              <strong>基础设施（infrastructure）</strong>：能源、交通、电信、清洁水和卫生设施。它们降低企业成本、连接市场、改善健康，具有公共品特征，私人部门往往不愿投资。教育、医疗和基础设施投资都会提高经济的生产能力，使 LRAS 右移。
            </p>
            <LrasShift caption="图 3 投资于人力资本和基础设施提高生产能力，LRAS₁ 右移到 LRAS₂，潜在产出从 Yf₁ 增加到 Yf₂，价格水平下降，实现无通胀的增长。" />
            <Callout title="评价">
              <p>
                干预主义政策直接针对市场失灵和不平等，但需要政府有足够的税收、行政能力和廉洁的治理；投资见效慢（教育需要一代人），还可能因财政赤字和政府失灵（腐败、配置低效）而打折扣。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Redistribution policies</strong>: progressive taxes, transfer payments and minimum wages (see 3.4). Conditional cash transfers are common: Brazil&apos;s Bolsa Família pays poor families on condition that children attend school and are vaccinated, reducing poverty now and building the next generation&apos;s human capital. A minimum wage raises low-paid workers&apos; incomes, but covers few workers where the informal economy is large and, if set too high, may reduce formal employment.
            </p>
            <p>
              <strong>Provision of merit goods</strong>: education and healthcare create positive consumption externalities and are underconsumed in a free market. The government can provide them free (e.g. abolishing primary school fees) or subsidise them (e.g. vaccines, bed nets).
            </p>
            <MeritSubsidy caption="Figure 2 A subsidy on a merit good: because MSB > MPB, the market quantity Qm is below the social optimum Q*. The subsidy shifts supply from S to S₂, consumers pay Pc, producers receive Pp, and output rises to the socially optimal Q*." />
            <p>
              <strong>Infrastructure</strong>: energy, transport, telecommunications, clean water and sanitation. It lowers firms&apos; costs, connects markets and improves health, and often has public-good features, so the private sector underinvests. Investment in education, health and infrastructure raises productive capacity and shifts LRAS to the right.
            </p>
            <LrasShift caption="Figure 3 Investment in human capital and infrastructure raises productive capacity: LRAS₁ shifts to LRAS₂, potential output rises from Yf₁ to Yf₂ and the price level falls, giving non-inflationary growth." />
            <Callout title="Evaluation">
              <p>
                Interventionist policies target market failure and inequality directly, but require enough tax revenue, administrative capacity and clean governance; they take time to work (education takes a generation) and may be undermined by budget deficits and government failure (corruption, poor allocation).
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "fdi-aid",
      level: "both",
      title: { zh: "外国直接投资、外国援助与多边援助", en: "Inward FDI, foreign aid and multilateral assistance" },
      body: {
        zh: (
          <>
            <Def term="Foreign direct investment (FDI)">
              跨国公司（MNC）在另一国进行的长期投资，例如建厂或收购当地企业的控制性股权。
            </Def>
            <p>
              <strong>优点</strong>：带来资本、技术、管理经验和就业，增加税收和出口，可能带动当地供应商（技术外溢）。<strong>局限</strong>：利润汇回母国（GNI 增幅小于 GDP）；可能偏向资本密集型、雇用当地人少；跨国公司可能利用转移定价避税、要求税收优惠；可能剥削劳工和破坏环境；利润导向的投资未必流向最贫困的地区。
            </p>
            <table>
              <thead>
                <tr>
                  <th>类型</th>
                  <th>内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>人道主义援助 Humanitarian aid</td>
                  <td>短期紧急救援：灾害、饥荒、冲突中的食物、医疗、住所。</td>
                </tr>
                <tr>
                  <td>发展援助 Development aid</td>
                  <td>长期项目：学校、医院、基础设施、农业技术，旨在提高生产能力。</td>
                </tr>
                <tr>
                  <td>官方发展援助（ODA）</td>
                  <td>由发达国家政府提供的赠款和优惠贷款（至少部分为赠与），以促进发展中国家经济发展和福利为主要目的。联合国目标为援助国 GNI 的 0.7%，大多数援助国未达到。</td>
                </tr>
                <tr>
                  <td>非政府组织（NGOs）</td>
                  <td>如乐施会（Oxfam）、无国界医生，通常深入基层、针对性强，但规模有限。</td>
                </tr>
                <tr>
                  <td>债务减免 Debt relief</td>
                  <td>减免重债穷国的部分债务，释放财政资金用于教育和医疗（如重债穷国倡议 HIPC）。</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>多边发展援助（multilateral development assistance）</strong>：由国际组织而非单个国家提供。
            </p>
            <ul>
              <li><strong>世界银行（World Bank）</strong>：为发展中国家的长期发展项目（基础设施、教育、医疗）提供贷款、赠款和技术援助，最贫困国家可获得低息或无息贷款。</li>
              <li><strong>国际货币基金组织（IMF）</strong>：为面临国际收支危机的国家提供短期贷款，以稳定汇率和经济；贷款常附带条件（如削减财政赤字、结构改革），这些条件因可能伤害穷人而受到批评。</li>
            </ul>
            <Callout title="评价：援助有效吗？">
              <p>
                援助能填补储蓄缺口、在危机中挽救生命，并资助医疗等高回报项目（例如疫苗接种计划大幅降低了儿童死亡率）。但批评者认为：援助可能被腐败吞噬、造成依赖、扭曲本地市场（例如免费粮食打击当地农民）；「捆绑援助」（tied aid）要求受援国购买援助国的商品；援助方向常受援助国政治利益影响。援助效果取决于受援国的治理质量和项目设计。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Foreign direct investment (FDI)">
              Long-term investment by a multinational corporation (MNC) in another country, e.g. building a factory or buying a controlling stake in a local firm.
            </Def>
            <p>
              <strong>Strengths</strong>: brings capital, technology, management skills and jobs, raises tax revenue and exports, and may help local suppliers (technology spillovers). <strong>Limitations</strong>: profits are repatriated (GNI rises less than GDP); investment may be capital-intensive and employ few locals; MNCs may avoid tax through transfer pricing and demand tax breaks; labour may be exploited and the environment damaged; profit-driven investment may bypass the poorest regions.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Humanitarian aid</td>
                  <td>Short-term emergency relief: food, medical care and shelter in disasters, famines and conflict.</td>
                </tr>
                <tr>
                  <td>Development aid</td>
                  <td>Long-term projects (schools, hospitals, infrastructure, farming techniques) that raise productive capacity.</td>
                </tr>
                <tr>
                  <td>Official Development Assistance (ODA)</td>
                  <td>Grants and concessional loans (with a grant element) from rich-country governments, mainly to promote the economic development and welfare of developing countries. The UN target is 0.7% of donor GNI, which most donors miss.</td>
                </tr>
                <tr>
                  <td>Non-governmental organisations (NGOs)</td>
                  <td>E.g. Oxfam and Médecins Sans Frontières; usually well targeted at grassroots level but limited in scale.</td>
                </tr>
                <tr>
                  <td>Debt relief</td>
                  <td>Cancelling part of the debt of heavily indebted poor countries, freeing revenue for education and health (e.g. the HIPC Initiative).</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Multilateral development assistance</strong> comes from international organisations rather than individual countries.
            </p>
            <ul>
              <li><strong>The World Bank</strong>: provides loans, grants and technical assistance for long-term development projects (infrastructure, education, health); the poorest countries receive low- or zero-interest loans.</li>
              <li><strong>The International Monetary Fund (IMF)</strong>: lends short-term to countries facing balance of payments crises to stabilise the currency and economy; loans usually carry conditions (e.g. cutting budget deficits, structural reforms), which are criticised for hurting the poor.</li>
            </ul>
            <Callout title="Evaluation: does aid work?">
              <p>
                Aid can fill a savings gap, save lives in crises and fund high-return projects such as health (vaccination programmes have sharply reduced child mortality). Critics argue that aid can be lost to corruption, create dependency and distort local markets (free food undercuts local farmers); tied aid forces recipients to buy donors&apos; goods; and aid often follows donors&apos; political interests. Its effectiveness depends on the recipient&apos;s governance and on project design.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "institutional-change",
      level: "both",
      title: { zh: "制度变革", en: "Institutional change" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>措施</th>
                  <th>作用与例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>改善银行服务，包括小额信贷和移动银行 Improved access to banking, including microfinance and mobile banking</td>
                  <td>小额信贷（microfinance）向没有抵押品的穷人（尤其是女性）发放小额贷款，常采用小组连带担保；移动支付如肯尼亚的 M-Pesa 让没有银行账户的人也能存钱、转账和收取侨汇。局限：利率可能很高，可能导致过度负债，对大规模减贫的效果存在争议。</td>
                </tr>
                <tr>
                  <td>增强女性赋权 Increasing women&apos;s empowerment</td>
                  <td>女童教育、女性土地和信贷权利、政治代表权。女性收入更多用于子女的营养和教育，能提高下一代的人力资本。</td>
                </tr>
                <tr>
                  <td>减少腐败 Reducing corruption</td>
                  <td>独立司法、反腐机构、公开透明的政府采购、电子政务。能降低经营成本、提高援助和公共支出的效率。</td>
                </tr>
                <tr>
                  <td>产权 Property rights</td>
                  <td>保护私人财产和知识产权，鼓励投资和创新。</td>
                </tr>
                <tr>
                  <td>土地权 Land rights</td>
                  <td>为农民登记土地所有权，使其可以用土地抵押借款，也更愿意投资改良土地（如卢旺达的全国土地登记）。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                制度改革往往被认为是最根本的策略，因为它决定了其他政策能否奏效；但它需要政治意愿，可能触动既得利益，见效也很慢。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Effect and examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Improved access to banking, including microfinance and mobile banking</td>
                  <td>Microfinance gives small loans to poor people without collateral (especially women), often using group lending; mobile money such as Kenya&apos;s M-Pesa lets the unbanked save, transfer money and receive remittances. Limitations: interest rates can be high, borrowers may become over-indebted, and its impact on large-scale poverty reduction is debated.</td>
                </tr>
                <tr>
                  <td>Increasing women&apos;s empowerment</td>
                  <td>Girls&apos; education, women&apos;s rights to land and credit, political representation. Women tend to spend more of their income on children&apos;s nutrition and schooling, raising the next generation&apos;s human capital.</td>
                </tr>
                <tr>
                  <td>Reducing corruption</td>
                  <td>Independent courts, anti-corruption agencies, transparent public procurement, e-government. Lowers business costs and makes aid and public spending more effective.</td>
                </tr>
                <tr>
                  <td>Property rights</td>
                  <td>Protecting private property and intellectual property encourages investment and innovation.</td>
                </tr>
                <tr>
                  <td>Land rights</td>
                  <td>Registering farmers&apos; land titles lets them borrow against land and makes them more willing to invest in it (e.g. Rwanda&apos;s nationwide land registration).</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                Institutional reform is often seen as the most fundamental strategy because it determines whether other policies work, but it needs political will, threatens vested interests and is slow.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "evaluation",
      level: "both",
      title: {
        zh: "评价：策略的优缺点、政府干预 vs 市场导向、SDGs 进展",
        en: "Evaluation: strategies, intervention vs markets, and progress on the SDGs",
      },
      body: {
        zh: (
          <>
            <p>
              <strong>策略的优点与局限</strong>：每一种策略都有成功和失败的案例，效果取决于国家的起点、所面临的主要障碍（见 4.9）以及政策执行的质量。通常需要多种策略组合，例如出口导向 + 教育投资 + 制度改革。
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>市场导向 Market-oriented</th>
                  <th>政府干预 Government intervention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>优点</td>
                  <td>价格信号有效配置资源；激励创新和效率；减少政府失灵和寻租</td>
                  <td>纠正市场失灵（优益品、公共品、外部性）；提供基础设施；减少不平等和贫困</td>
                </tr>
                <tr>
                  <td>局限</td>
                  <td>忽视公平，穷人可能被排除在外；无法解决市场失灵；易受外部冲击</td>
                  <td>政府失灵：腐败、信息不足、效率低；需要财政资源，可能导致债务</td>
                </tr>
              </tbody>
            </table>
            <p>
              现实中，成功的发展经验多为两者结合：东亚经济体在利用市场和出口的同时，政府大力投资教育和基础设施，并有选择地支持产业。
            </p>
            <p><strong>两个或以上国家实现选定 SDGs 的进展（示例）</strong>：</p>
            <ul>
              <li><strong>目标 1 无贫困 —— 中国 vs 撒哈拉以南非洲</strong>：据世界银行，自 1978 年改革开放以来，中国近 8 亿人摆脱极端贫困，到 2020 年消除了极端贫困，主要依靠出口导向增长、基础设施投资和有针对性的扶贫。而撒哈拉以南非洲的极端贫困人口占全球的大部分，人口增长快、冲突和债务问题使减贫进展缓慢。</li>
              <li><strong>目标 7 清洁能源 —— 孟加拉国</strong>：通过电网扩建和农村太阳能家庭系统，通电率从 2010 年的约一半提高到 2020 年代初的近乎全民通电。</li>
              <li><strong>目标 5 性别平等 —— 卢旺达</strong>：宪法规定女性在决策机构中至少占 30%，而 2013 年以来女性在议会下院的席位比例一直超过 60%，居世界前列；但女性在收入和非正规就业方面仍面临差距。</li>
            </ul>
            <Callout title="考试提示">
              <p>
                Paper 2/3 的评价题，要选择具体国家，说明「哪种策略、在什么条件下、针对哪个障碍」有效，并权衡短期与长期、增长与公平、经济与环境，最后给出有依据的结论。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Strengths and limitations of strategies</strong>: every strategy has successes and failures; results depend on the country&apos;s starting point, the main barriers it faces (see 4.9) and the quality of implementation. A mix is usually needed, e.g. export promotion + investment in education + institutional reform.
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Market-oriented</th>
                  <th>Government intervention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Strengths</td>
                  <td>Price signals allocate resources efficiently; incentives for innovation and efficiency; less government failure and rent-seeking</td>
                  <td>Corrects market failure (merit goods, public goods, externalities); provides infrastructure; reduces inequality and poverty</td>
                </tr>
                <tr>
                  <td>Limitations</td>
                  <td>Ignores equity, so the poor may be excluded; cannot fix market failure; exposed to external shocks</td>
                  <td>Government failure: corruption, poor information, inefficiency; needs fiscal resources and may lead to debt</td>
                </tr>
              </tbody>
            </table>
            <p>
              In practice, successful development has usually combined the two: East Asian economies used markets and exports while their governments invested heavily in education and infrastructure and selectively supported industries.
            </p>
            <p><strong>Progress towards selected SDGs in two or more countries (examples)</strong>:</p>
            <ul>
              <li><strong>Goal 1 No poverty: China vs sub-Saharan Africa</strong>. According to the World Bank, almost 800 million people in China have left extreme poverty since reform began in 1978, and extreme poverty was eradicated by 2020, through export-led growth, infrastructure investment and targeted poverty programmes. Sub-Saharan Africa now has most of the world&apos;s extremely poor, and rapid population growth, conflict and debt have slowed progress.</li>
              <li><strong>Goal 7 Clean energy: Bangladesh</strong>. Grid expansion and rural solar home systems raised access to electricity from around half the population in 2010 to near-universal access by the early 2020s.</li>
              <li><strong>Goal 5 Gender equality: Rwanda</strong>. The constitution reserves at least 30% of decision-making posts for women, and since 2013 women have held over 60% of seats in the lower house of parliament, among the highest shares in the world, though gaps in pay and informal work remain.</li>
            </ul>
            <Callout title="Exam tip">
              <p>
                In Paper 2/3 evaluation questions, pick specific countries and explain which strategy works, under what conditions and against which barrier; weigh short run vs long run, growth vs equity, and economy vs environment; then reach a supported conclusion.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.10 Economic growth and/or economic development strategies",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "World Bank — China overview",
      href: "https://www.worldbank.org/en/country/china/overview",
    },
    {
      label: "World Bank — The Global Findex Database (access to financial services)",
      href: "https://www.worldbank.org/en/publication/globalfindex",
    },
    {
      label: "United Nations — The Sustainable Development Goals Report 2024",
      href: "https://unstats.un.org/sdgs/report/2024/",
    },
  ],
};

export default notes;
