import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const notes: TopicNotes = {
  summary: {
    zh: "本节讨论政府为什么要保护本国产业，以及保护的代价。支持的论据包括保护幼稚产业、国家安全、健康安全与环境标准、反倾销与不公平竞争、改善国际收支、增加政府收入、保护就业和帮助最不发达国家实现经济多元化；反对的论据包括资源错配、遭到报复、成本和价格上升、选择减少、企业缺乏提高效率的动力，以及出口竞争力下降。最后要能权衡自由贸易与贸易保护。",
    en: "This topic asks why governments protect domestic industries and what protection costs. Arguments for include infant industries, national security, health, safety and environmental standards, anti-dumping and unfair competition, the balance of payments, government revenue, jobs and diversification in economically least developed countries. Arguments against include misallocation of resources, retaliation, higher costs and prices, less choice, weaker incentives for efficiency and reduced export competitiveness. You must be able to weigh free trade against protection.",
  },
  sections: [
    {
      id: "for-1",
      level: "both",
      title: {
        zh: "支持贸易保护的论据（一）：幼稚产业、安全与标准",
        en: "Arguments for protection (1): infant industries, security and standards",
      },
      body: {
        zh: (
          <>
            <Def term="Trade protection">
              政府为了保护国内生产者免受外国竞争而采取的限制进口的措施，例如关税、配额、补贴和行政壁垒（见 4.2）。
            </Def>
            <table>
              <thead>
                <tr>
                  <th>论据</th>
                  <th>解释</th>
                  <th>评价</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>保护幼稚产业（朝阳产业）Infant (sunrise) industries</td>
                  <td>
                    新兴产业规模小、平均成本高，暂时无法和已经享有规模经济的外国企业竞争。暂时保护让它们成长、获得规模经济后再开放。例：韩国 1970—80 年代保护造船和汽车业。
                  </td>
                  <td>政府很难挑中有潜力的产业；被保护的企业可能永远「长不大」，保护也很难取消。</td>
                </tr>
                <tr>
                  <td>国家安全 National security</td>
                  <td>国防、能源、粮食、芯片等战略产业不应依赖可能在冲突中断供的外国。例：美国以国家安全为由对钢铁加征关税。</td>
                  <td>「战略」的范围容易被扩大，被用作保护普通产业的借口。</td>
                </tr>
                <tr>
                  <td>健康与安全 Health and safety</td>
                  <td>禁止或限制不符合本国标准的商品，例如含有害化学物质的玩具、受污染的食品。</td>
                  <td>是否是正当理由，取决于标准是否同样适用于国内企业、是否有科学依据。</td>
                </tr>
                <tr>
                  <td>环境标准 Environmental standards</td>
                  <td>
                    防止外国企业靠宽松的环境规定获得成本优势，或限制破坏环境的产品进口。例：欧盟的碳边境调节机制（CBAM）对高碳进口品收费。
                  </td>
                  <td>发展中国家可能认为这是变相保护，削弱它们的比较优势。</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
        en: (
          <>
            <Def term="Trade protection">
              Government measures that restrict imports in order to shield domestic producers from foreign competition, e.g. tariffs, quotas, subsidies and administrative barriers (see 4.2).
            </Def>
            <table>
              <thead>
                <tr>
                  <th>Argument</th>
                  <th>Explanation</th>
                  <th>Evaluation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Infant (sunrise) industries</td>
                  <td>
                    A new industry is small with high average costs and cannot yet compete with established foreign firms that enjoy economies of scale. Temporary protection lets it grow and reach economies of scale before facing open competition. E.g. South Korea protected shipbuilding and cars in the 1970s–80s.
                  </td>
                  <td>Governments struggle to pick winners; protected firms may never grow up, and protection is hard to remove.</td>
                </tr>
                <tr>
                  <td>National security</td>
                  <td>Strategic industries such as defence, energy, food and chips should not depend on foreign suppliers who could be cut off in a conflict. E.g. the US cited national security for its steel tariffs.</td>
                  <td>The definition of &apos;strategic&apos; is easily stretched to cover ordinary industries.</td>
                </tr>
                <tr>
                  <td>Health and safety</td>
                  <td>Ban or limit goods that fail domestic standards, e.g. toys with harmful chemicals or contaminated food.</td>
                  <td>Legitimate only if the standard applies equally to domestic firms and has a scientific basis.</td>
                </tr>
                <tr>
                  <td>Environmental standards</td>
                  <td>
                    Stop foreign firms gaining a cost advantage from weak environmental rules, or restrict imports that damage the environment. E.g. the EU Carbon Border Adjustment Mechanism (CBAM) charges for the carbon in certain imports.
                  </td>
                  <td>Developing countries may see it as disguised protectionism that erodes their comparative advantage.</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
    },
    {
      id: "for-2",
      level: "both",
      title: {
        zh: "支持贸易保护的论据（二）：竞争、宏观与发展",
        en: "Arguments for protection (2): competition, macroeconomic and development",
      },
      body: {
        zh: (
          <>
            <Def term="Dumping">
              外国企业以低于其生产成本（或低于其本国市场价格）的价格在出口市场销售商品，通常是为了把对手挤出市场。WTO 允许受害国征收反倾销税（anti-dumping duties）。
            </Def>
            <table>
              <thead>
                <tr>
                  <th>论据</th>
                  <th>解释</th>
                  <th>评价</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>反倾销 Anti-dumping</td>
                  <td>倾销会让本国企业倒闭；之后外国企业可能凭垄断地位抬价。例：欧盟 2013—2018 年对中国太阳能板征收反倾销税。</td>
                  <td>很难证明真实的生产成本；本国消费者其实从低价中受益。</td>
                </tr>
                <tr>
                  <td>不公平竞争 Unfair competition</td>
                  <td>外国企业可能得到政府大量补贴，或工资极低、劳工保护差，竞争并不「公平」。</td>
                  <td>低工资往往反映低生产率，本身就是比较优势的来源；限制进口反而伤害那些国家的工人。</td>
                </tr>
                <tr>
                  <td>纠正国际收支 Balance of payments correction</td>
                  <td>减少进口可以缩小经常账户赤字（current account deficit，见 4.6）。</td>
                  <td>只是短期办法，不解决竞争力低的根本问题，还可能招来报复，令出口也减少。</td>
                </tr>
                <tr>
                  <td>政府收入 Government revenue</td>
                  <td>关税容易征收，对税收体系薄弱的低收入国家是重要收入来源。</td>
                  <td>随着经济发展，应逐步转向所得税、增值税等扭曲更小的税种。</td>
                </tr>
                <tr>
                  <td>保护就业 Protection of jobs</td>
                  <td>减少进口可以保住与进口竞争行业的工作岗位，避免结构性失业集中在某些地区。</td>
                  <td>每保住一个岗位的成本往往很高；下游行业（例如用钢铁的汽车业）可能因此失去更多岗位。</td>
                </tr>
                <tr>
                  <td>最不发达国家的经济多元化 ELDC diversification</td>
                  <td>
                    经济最不发达的国家（ELDC）往往依赖少数初级产品出口，价格波动大。保护新兴制造业可以帮助经济多元化（diversification），降低风险。
                  </td>
                  <td>国内市场太小，难以形成规模经济；腐败和寻租可能让保护变成少数人的特权。</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
        en: (
          <>
            <Def term="Dumping">
              Selling a good in an export market at a price below its cost of production (or below the price in the firm&apos;s home market), often to drive rivals out. The WTO lets affected countries impose anti-dumping duties.
            </Def>
            <table>
              <thead>
                <tr>
                  <th>Argument</th>
                  <th>Explanation</th>
                  <th>Evaluation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Anti-dumping</td>
                  <td>Dumping can drive domestic firms out of business, after which the foreign firm may use its market power to raise prices. E.g. EU anti-dumping duties on Chinese solar panels, 2013–2018.</td>
                  <td>True production costs are hard to prove, and domestic consumers benefit from the low prices.</td>
                </tr>
                <tr>
                  <td>Unfair competition</td>
                  <td>Foreign firms may receive large state subsidies or pay very low wages with weak labour protection, so competition is not &apos;fair&apos;.</td>
                  <td>Low wages often reflect low productivity and are a source of comparative advantage; blocking imports can hurt workers in those countries.</td>
                </tr>
                <tr>
                  <td>Balance of payments correction</td>
                  <td>Cutting imports can reduce a current account deficit (see 4.6).</td>
                  <td>A short-term fix that ignores the underlying lack of competitiveness, and it may provoke retaliation that also cuts exports.</td>
                </tr>
                <tr>
                  <td>Government revenue</td>
                  <td>Tariffs are easy to collect and are an important revenue source for low-income countries with weak tax systems.</td>
                  <td>As economies develop, they should shift towards less distorting taxes such as income tax or VAT.</td>
                </tr>
                <tr>
                  <td>Protection of jobs</td>
                  <td>Fewer imports protect jobs in import-competing industries and avoid structural unemployment concentrated in particular regions.</td>
                  <td>The cost per job saved is often very high, and user industries (e.g. car makers using steel) may lose more jobs than are saved.</td>
                </tr>
                <tr>
                  <td>Economically least developed country (ELDC) diversification</td>
                  <td>
                    ELDCs often rely on a few primary exports with volatile prices. Protecting new manufacturing industries helps diversify the economy and reduce risk.
                  </td>
                  <td>Small home markets limit economies of scale, and corruption and rent-seeking can turn protection into privileges for a few.</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
    },
    {
      id: "against",
      level: "both",
      title: { zh: "反对贸易保护的论据", en: "Arguments against trade protection" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>论据</th>
                  <th>解释</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>资源错配 Misallocation of resources</td>
                  <td>资源被留在没有比较优势的高成本产业，而不是流向最有效率的用途；在 4.2 的图中表现为福利损失。</td>
                </tr>
                <tr>
                  <td>遭到报复 Retaliation</td>
                  <td>贸易伙伴往往以牙还牙，提高对本国出口的关税，引发贸易战。例：2018—2019 年中美互相加征关税，美国农产品出口大幅下降。</td>
                </tr>
                <tr>
                  <td>成本上升 Increased costs</td>
                  <td>进口的原材料和零部件变贵，使用它们的企业生产成本上升。</td>
                </tr>
                <tr>
                  <td>价格上升 Higher prices</td>
                  <td>消费者要为进口品和国内替代品支付更高价格，低收入家庭受影响更大（关税具有累退性，regressive）。</td>
                </tr>
                <tr>
                  <td>选择减少 Less choice</td>
                  <td>可买到的商品种类和品牌减少。</td>
                </tr>
                <tr>
                  <td>国内企业缺乏提高效率的动力 Lack of incentive to become efficient</td>
                  <td>没有外国竞争的压力，企业不必降低成本和创新，形成 X 低效率（X-inefficiency），长期竞争力反而下降。</td>
                </tr>
                <tr>
                  <td>出口竞争力下降 Reduced export competitiveness</td>
                  <td>投入品成本上升，出口商品价格提高；如果引发报复，出口市场也会缩小。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                反对论据大多可以直接联系 4.2 的图：价格升高、消费量减少、福利损失 b + d，就是「资源错配」和「价格上升」的图示。用图支撑论点能拿到更高分。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Argument</th>
                  <th>Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Misallocation of resources</td>
                  <td>Resources stay in high-cost industries without a comparative advantage instead of moving to their most efficient uses; on the 4.2 diagrams this is the welfare loss.</td>
                </tr>
                <tr>
                  <td>Retaliation</td>
                  <td>Trading partners often respond with tariffs on the country&apos;s exports, leading to trade wars. E.g. in the 2018–19 US–China tariff war, US farm exports to China fell sharply.</td>
                </tr>
                <tr>
                  <td>Increased costs</td>
                  <td>Imported raw materials and components become dearer, raising costs for the firms that use them.</td>
                </tr>
                <tr>
                  <td>Higher prices</td>
                  <td>Consumers pay more for imports and domestic substitutes; low-income households are hit hardest because tariffs are regressive.</td>
                </tr>
                <tr>
                  <td>Less choice</td>
                  <td>Fewer goods and brands are available.</td>
                </tr>
                <tr>
                  <td>Domestic firms lack incentive to become more efficient</td>
                  <td>Without foreign competition, firms need not cut costs or innovate, so X-inefficiency develops and long-run competitiveness falls.</td>
                </tr>
                <tr>
                  <td>Reduced export competitiveness</td>
                  <td>Dearer inputs raise export prices, and any retaliation shrinks export markets as well.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                Most arguments against can be linked directly to the 4.2 diagrams: the higher price, lower consumption and welfare loss b + d illustrate misallocation of resources and higher prices. Supporting a point with a diagram earns higher marks.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "free-trade-vs-protection",
      level: "both",
      title: { zh: "自由贸易 vs 贸易保护", en: "Free trade versus trade protection" },
      body: {
        zh: (
          <>
            <p>这是 AO3 评价题。没有对所有国家都正确的答案，结论取决于以下因素：</p>
            <ul>
              <li>
                <strong>时间长短</strong>：保护在短期可以保住就业、给产业调整时间；长期则造成低效率、报复和更高价格。比较好的做法是有明确退出时间的暂时保护。
              </li>
              <li>
                <strong>发展阶段</strong>：最不发达国家可能需要关税收入和保护新兴产业；发达国家用保护对付低收入国家的出口，则更难自圆其说。
              </li>
              <li>
                <strong>利益相关者</strong>：保护的好处集中在少数生产者和工人身上，代价分散在大量消费者身上，所以政治上往往偏向保护，即使总体福利下降。
              </li>
              <li>
                <strong>有没有更好的政策</strong>：要保护就业，可以用再培训、失业救济等供给侧政策（见 3.7）帮助工人转行，而不必限制贸易；要应对外部性，可以直接对污染征税。
              </li>
              <li>
                <strong>措施类型</strong>：补贴比关税、配额的福利损失小，但需要财政资金；关税至少能带来政府收入。
              </li>
            </ul>
            <Callout title="评价">
              <p>
                大多数经济学家认为，总体上自由贸易提高效率和全球福利；但贸易的收益分配不均，所以真正的问题往往不是「要不要贸易」，而是「如何补偿受损者」。近年来供应链安全（芯片、关键矿产）让国家安全论据的分量有所上升。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>This is an AO3 evaluation question. There is no answer that suits every country; the conclusion depends on:</p>
            <ul>
              <li>
                <strong>Time frame</strong>: protection can save jobs and give industries time to adjust in the short run, but in the long run causes inefficiency, retaliation and higher prices. Temporary protection with a clear end date is the better option.
              </li>
              <li>
                <strong>Stage of development</strong>: ELDCs may need tariff revenue and room for new industries; rich countries using protection against exports from poor countries are harder to justify.
              </li>
              <li>
                <strong>Stakeholders</strong>: the gains from protection are concentrated on a few producers and workers while the costs are spread thinly over many consumers, so politics often favours protection even when total welfare falls.
              </li>
              <li>
                <strong>Better alternatives</strong>: to protect workers, supply-side policies such as retraining and unemployment support (see 3.7) help them move into new jobs without restricting trade; externalities are better tackled directly, e.g. with a pollution tax.
              </li>
              <li>
                <strong>Type of measure</strong>: subsidies cause a smaller welfare loss than tariffs or quotas but must be financed; tariffs at least raise revenue.
              </li>
            </ul>
            <Callout title="Evaluation">
              <p>
                Most economists conclude that, overall, free trade raises efficiency and global welfare; but the gains are unevenly shared, so the real question is often not whether to trade but how to compensate the losers. Concerns about supply-chain security (chips, critical minerals) have recently given the national security argument more weight.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.3 Arguments for and against trade control/protection",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 34.3 Arguments in Support of Restricting Imports",
      href: "https://openstax.org/books/principles-economics-3e/pages/34-3-arguments-in-support-of-restricting-imports",
    },
    {
      label: "OpenStax Principles of Economics 3e — 34.2 International Trade and Its Effects on Jobs, Wages, and Working Conditions",
      href: "https://openstax.org/books/principles-economics-3e/pages/34-2-international-trade-and-its-effects-on-jobs-wages-and-working-conditions",
    },
  ],
};

export default notes;
