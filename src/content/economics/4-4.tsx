import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const notes: TopicNotes = {
  summary: {
    zh: "经济一体化是各国通过协议减少彼此之间贸易壁垒、加深经济联系的过程。本节讲双边、区域和多边贸易协定，三种贸易集团（自由贸易区、关税同盟、共同市场）及其利弊，货币联盟，以及世界贸易组织（WTO）的目标、职能和影响力的限制。HL 还要分析贸易创造与贸易转移，以及货币联盟的利弊。",
    en: "Economic integration is the process by which countries agree to reduce trade barriers between them and deepen economic ties. This topic covers bilateral, regional and multilateral agreements, the three types of trading bloc (free trade areas, customs unions, common markets) and their pros and cons, monetary union, and the objectives, functions and limits on the influence of the World Trade Organization. HL also analyses trade creation and trade diversion and the advantages and disadvantages of monetary union.",
  },
  sections: [
    {
      id: "preferential-agreements",
      level: "both",
      title: { zh: "优惠贸易协定", en: "Preferential trade agreements" },
      body: {
        zh: (
          <>
            <Def term="Economic integration">
              各国之间逐步减少或取消贸易和要素流动壁垒、协调经济政策，使经济联系越来越紧密的过程。
            </Def>
            <Def term="Preferential trade agreement (PTA)">
              协定成员之间给予彼此更优惠的市场准入（例如更低的关税）的协议，非成员不享有这些优惠。
            </Def>
            <table>
              <thead>
                <tr>
                  <th>类型</th>
                  <th>含义</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>双边 Bilateral</td>
                  <td>两个国家（或一个国家与一个集团）之间的协定。</td>
                  <td>中国—澳大利亚自由贸易协定（2015）；欧盟—日本经济伙伴关系协定（2019）。</td>
                </tr>
                <tr>
                  <td>区域 Regional</td>
                  <td>同一地区若干国家之间的协定。</td>
                  <td>RCEP（区域全面经济伙伴关系协定，2022 年生效，15 个亚太国家）；美墨加协定（USMCA）。</td>
                </tr>
                <tr>
                  <td>多边 Multilateral</td>
                  <td>大量国家共同参与的协定，主要通过 WTO 谈判，按非歧视原则适用于所有成员。</td>
                  <td>WTO 框架下的各项协定，例如乌拉圭回合（Uruguay Round）达成的协定。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                这部分只要求 AO1（知道并能解释），能说出定义并举一个例子即可。注意：双边和区域协定只对成员优惠，本质上是<strong>歧视性的</strong>；多边协定则对所有成员一视同仁。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Economic integration">
              The process by which countries progressively reduce or remove barriers to trade and factor movements and coordinate economic policies, so that their economies become more closely linked.
            </Def>
            <Def term="Preferential trade agreement (PTA)">
              An agreement that gives its members better access to each other&apos;s markets (e.g. lower tariffs) than non-members receive.
            </Def>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Meaning</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bilateral</td>
                  <td>An agreement between two countries (or a country and a bloc).</td>
                  <td>China–Australia Free Trade Agreement (2015); EU–Japan Economic Partnership Agreement (2019).</td>
                </tr>
                <tr>
                  <td>Regional</td>
                  <td>An agreement between several countries in the same region.</td>
                  <td>RCEP (Regional Comprehensive Economic Partnership, in force 2022, 15 Asia-Pacific countries); USMCA.</td>
                </tr>
                <tr>
                  <td>Multilateral</td>
                  <td>An agreement among many countries, mainly negotiated through the WTO and applied to all members on a non-discriminatory basis.</td>
                  <td>The WTO agreements, e.g. those reached in the Uruguay Round.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                This part is AO1 only: give the definition and one example. Note that bilateral and regional agreements favour members only, so they are <strong>discriminatory</strong>; multilateral agreements treat all members equally.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "trading-blocs",
      level: "both",
      title: { zh: "贸易集团的类型", en: "Types of trading bloc" },
      body: {
        zh: (
          <>
            <Def term="Trading bloc">
              一组国家通过协定减少或取消彼此之间的贸易壁垒而形成的集团。一体化程度从低到高：自由贸易区 → 关税同盟 → 共同市场。
            </Def>
            <Def term="Free trade area (FTA)">
              成员之间取消贸易壁垒，但每个成员对非成员<strong>各自保留</strong>自己的关税和贸易政策。
            </Def>
            <Def term="Customs union">
              在自由贸易区的基础上，成员对非成员采用<strong>统一的对外关税</strong>（common external tariff，CET），并以集团身份进行贸易谈判。
            </Def>
            <Def term="Common market">
              在关税同盟的基础上，生产要素（劳动力和资本）也可以在成员之间<strong>自由流动</strong>。
            </Def>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>成员间自由贸易</th>
                  <th>统一对外关税</th>
                  <th>劳动力、资本自由流动</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>自由贸易区</td><td>✓</td><td>✗</td><td>✗</td><td>USMCA、东盟自由贸易区（AFTA）</td></tr>
                <tr><td>关税同盟</td><td>✓</td><td>✓</td><td>✗</td><td>南部非洲关税同盟（SACU）、欧盟—土耳其关税同盟</td></tr>
                <tr><td>共同市场</td><td>✓</td><td>✓</td><td>✓</td><td>欧盟单一市场（EU single market）</td></tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                自由贸易区的一个问题是：非成员可能先把货物运到关税最低的成员国，再转运到其他成员国。所以自由贸易区需要<strong>原产地规则</strong>（rules of origin）。关税同盟有统一对外关税，就没有这个问题。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Trading bloc">
              A group of countries that agree to reduce or remove trade barriers between themselves. In increasing order of integration: free trade area → customs union → common market.
            </Def>
            <Def term="Free trade area (FTA)">
              Members remove trade barriers between themselves, but each member <strong>keeps its own</strong> tariffs and trade policy towards non-members.
            </Def>
            <Def term="Customs union">
              A free trade area whose members also adopt a <strong>common external tariff</strong> (CET) on non-members and negotiate on trade as a single bloc.
            </Def>
            <Def term="Common market">
              A customs union that also allows the <strong>free movement</strong> of factors of production (labour and capital) between members.
            </Def>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Free trade between members</th>
                  <th>Common external tariff</th>
                  <th>Free movement of labour and capital</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Free trade area</td><td>✓</td><td>✗</td><td>✗</td><td>USMCA, ASEAN Free Trade Area (AFTA)</td></tr>
                <tr><td>Customs union</td><td>✓</td><td>✓</td><td>✗</td><td>Southern African Customs Union (SACU), EU–Turkey customs union</td></tr>
                <tr><td>Common market</td><td>✓</td><td>✓</td><td>✓</td><td>EU single market</td></tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                In a free trade area, outside firms could ship goods into the member with the lowest tariff and then on to other members. FTAs therefore need <strong>rules of origin</strong>. A customs union avoids this problem because it has a common external tariff.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "bloc-pros-cons",
      level: "both",
      title: { zh: "贸易集团的利弊", en: "Advantages and disadvantages of trading blocs" },
      body: {
        zh: (
          <>
            <p><strong>好处</strong>（贸易创造见下面的 HL 部分）：</p>
            <ul>
              <li><strong>更大的市场</strong>：企业可以免关税进入其他成员国市场，出口增加。</li>
              <li><strong>规模经济</strong>：市场扩大后产量上升，平均成本下降，消费者也可能享受更低价格。</li>
              <li><strong>更多就业机会</strong>：在共同市场中劳动力可以自由流动，工人可以到其他成员国找工作，缓解失业，填补技能缺口。</li>
              <li><strong>更强的谈判能力</strong>：以集团身份参加多边谈判（例如在 WTO），比单个国家更有分量，欧盟就是例子。</li>
              <li><strong>政治稳定与合作</strong>：经济上相互依存，增加冲突的代价，促进和平与政策协调。欧盟的起源就有这个目的。</li>
            </ul>
            <p><strong>坏处</strong>（贸易转移见下面的 HL 部分）：</p>
            <ul>
              <li>
                <strong>丧失主权</strong>（loss of sovereignty）：关税同盟成员不能自行决定对外关税，也不能单独签贸易协定；共同市场成员还要接受统一的产品标准和劳动力自由流动。英国脱欧（Brexit）的一个主要理由就是「收回控制权」。
              </li>
              <li>
                <strong>阻碍多边贸易谈判</strong>：各国把精力放在区域协定上，对 WTO 多边谈判的兴趣下降；越来越多相互重叠的协定和原产地规则，被称为「意大利面碗效应」（spaghetti bowl effect）。
              </li>
            </ul>
            <Callout title="评价">
              <p>
                利弊大小取决于一体化程度、成员国的经济结构是否相似、集团对外关税的高低，以及短期调整成本（例如某些行业的失业）与长期收益之间的权衡。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p><strong>Advantages</strong> (for trade creation see the HL section below):</p>
            <ul>
              <li><strong>Greater access to markets</strong>: firms can sell tariff-free in other member countries, so exports rise.</li>
              <li><strong>Economies of scale</strong>: a bigger market means higher output and lower average costs, which may mean lower prices for consumers.</li>
              <li><strong>Greater employment opportunities</strong>: in a common market, labour moves freely, so workers can find jobs in other member countries, easing unemployment and filling skill gaps.</li>
              <li><strong>Stronger bargaining power</strong>: negotiating as a bloc in multilateral talks (e.g. at the WTO) carries more weight than a single country, as the EU shows.</li>
              <li><strong>Greater political stability and cooperation</strong>: economic interdependence raises the cost of conflict and encourages peace and policy coordination, one of the original aims of the EU.</li>
            </ul>
            <p><strong>Disadvantages</strong> (for trade diversion see the HL section below):</p>
            <ul>
              <li>
                <strong>Loss of sovereignty</strong>: members of a customs union cannot set their own external tariffs or sign their own trade deals; members of a common market must also accept common product standards and free movement of labour. &apos;Taking back control&apos; was a key argument for Brexit.
              </li>
              <li>
                <strong>Challenge to multilateral trading negotiations</strong>: countries focus on regional deals and lose interest in WTO talks, while overlapping agreements with different rules of origin create the &apos;spaghetti bowl&apos; effect.
              </li>
            </ul>
            <Callout title="Evaluation">
              <p>
                The size of the gains and losses depends on the depth of integration, how similar the members&apos; economies are, how high the bloc&apos;s external tariff is, and the trade-off between short-run adjustment costs (e.g. job losses in some industries) and long-run gains.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "trade-creation-diversion",
      level: "hl",
      title: { zh: "贸易创造与贸易转移", en: "Trade creation and trade diversion" },
      body: {
        zh: (
          <>
            <Def term="Trade creation">
              加入贸易集团后，消费从成本较高的生产者（通常是本国企业）转向集团内成本<strong>更低</strong>的生产者。资源配置更有效率，是一体化的好处。
            </Def>
            <Def term="Trade diversion">
              加入贸易集团后，进口从集团外成本<strong>最低</strong>的生产者转向集团内成本较高的生产者，因为前者仍要交统一对外关税。资源配置效率下降，是一体化的坏处。
            </Def>
            <p>
              <strong>例子一：贸易创造。</strong>H 国一台洗衣机的生产成本：H 国 $280，伙伴国 P $240，世界最低成本国 W $220。加入集团前对所有进口征 50% 关税；加入后对 P 免关税，对 W 仍征 50%（统一对外关税）。
            </p>
            <table>
              <thead>
                <tr>
                  <th>来源</th>
                  <th>加入前的价格</th>
                  <th>加入后的价格</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>H 国（本国生产）</td><td><strong>$280</strong>（最便宜）</td><td>$280</td></tr>
                <tr><td>P 国（伙伴）</td><td>$240 × 1.5 = $360</td><td><strong>$240</strong>（最便宜）</td></tr>
                <tr><td>W 国（非成员）</td><td>$220 × 1.5 = $330</td><td>$330</td></tr>
              </tbody>
            </table>
            <p>消费者从本国高成本生产（$280）转向集团内低成本的 P（$240）：这是<strong>贸易创造</strong>，消费者得益，资源配置更有效率。</p>
            <p>
              <strong>例子二：贸易转移。</strong>成本不变，但加入前的关税只有 20%。
            </p>
            <table>
              <thead>
                <tr>
                  <th>来源</th>
                  <th>加入前的价格</th>
                  <th>加入后的价格</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>H 国（本国生产）</td><td>$280</td><td>$280</td></tr>
                <tr><td>P 国（伙伴）</td><td>$240 × 1.2 = $288</td><td><strong>$240</strong>（最便宜）</td></tr>
                <tr><td>W 国（非成员）</td><td><strong>$264</strong>（最便宜）</td><td>$264</td></tr>
              </tbody>
            </table>
            <p>
              进口从世界上成本最低的 W（$220）转向成本更高的 P（$240）：这是<strong>贸易转移</strong>。消费者付的价格从 $264 降到 $240，但政府失去每台 $44 的关税收入，世界资源被用在成本更高的生产者身上，效率下降。
            </p>
            <Callout title="评价">
              <p>
                集团对外关税越低、成员国本来就是彼此的低成本供应者，贸易创造越可能大于贸易转移。贸易集团对福利的净影响，要看两者哪个更大。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Trade creation">
              After joining a trading bloc, consumption shifts from a higher-cost producer (usually domestic) to a <strong>lower-cost</strong> producer inside the bloc. Resources are allocated more efficiently, so this is a benefit of integration.
            </Def>
            <Def term="Trade diversion">
              After joining a trading bloc, imports shift from the <strong>lowest-cost</strong> producer outside the bloc to a higher-cost producer inside it, because the outsider still faces the common external tariff. Resources are allocated less efficiently, so this is a cost of integration.
            </Def>
            <p>
              <strong>Example 1: trade creation.</strong> The cost of a washing machine is $280 in country H, $240 in partner country P and $220 in the world&apos;s lowest-cost producer W. Before joining a bloc, H puts a 50% tariff on all imports; after joining, imports from P are tariff-free while imports from W still pay 50% (the common external tariff).
            </p>
            <table>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Price before joining</th>
                  <th>Price after joining</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>H (domestic)</td><td><strong>$280</strong> (cheapest)</td><td>$280</td></tr>
                <tr><td>P (partner)</td><td>$240 × 1.5 = $360</td><td><strong>$240</strong> (cheapest)</td></tr>
                <tr><td>W (non-member)</td><td>$220 × 1.5 = $330</td><td>$330</td></tr>
              </tbody>
            </table>
            <p>Consumers switch from high-cost domestic production ($280) to the lower-cost partner P ($240): this is <strong>trade creation</strong>. Consumers gain and resources are used more efficiently.</p>
            <p>
              <strong>Example 2: trade diversion.</strong> Same costs, but the pre-bloc tariff is only 20%.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Price before joining</th>
                  <th>Price after joining</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>H (domestic)</td><td>$280</td><td>$280</td></tr>
                <tr><td>P (partner)</td><td>$240 × 1.2 = $288</td><td><strong>$240</strong> (cheapest)</td></tr>
                <tr><td>W (non-member)</td><td><strong>$264</strong> (cheapest)</td><td>$264</td></tr>
              </tbody>
            </table>
            <p>
              Imports switch from the world&apos;s lowest-cost producer W ($220) to the higher-cost P ($240): this is <strong>trade diversion</strong>. Consumers pay less ($264 → $240), but the government loses $44 of tariff revenue per machine and world resources are used by a less efficient producer.
            </p>
            <Callout title="Evaluation">
              <p>
                Trade creation is more likely to outweigh trade diversion when the bloc&apos;s external tariff is low and the members are already each other&apos;s low-cost suppliers. The net welfare effect of a bloc depends on which effect is larger.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "monetary-union",
      level: "both",
      title: { zh: "货币联盟", en: "Monetary union" },
      body: {
        zh: (
          <>
            <Def term="Monetary union">
              两个或以上国家使用<strong>同一种货币</strong>，由一个共同的中央银行实施统一的货币政策（包括统一的利率）。通常建立在共同市场的基础上。
            </Def>
            <p>
              例子：欧元区（eurozone）是 27 个欧盟成员国中使用欧元的 21 个国家（保加利亚 2026 年加入），由欧洲央行（ECB）统一制定利率。西非经济货币联盟（WAEMU）的八个国家共同使用西非法郎（CFA franc）。
            </p>
            <Callout title="考试提示">
              <p>
                货币联盟 ≠ 共同市场。欧盟是共同市场，但丹麦、瑞典、波兰等成员没有使用欧元，所以不属于货币联盟。货币联盟的利弊分析属于 HL 内容（见下一节）。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Monetary union">
              Two or more countries share a <strong>single currency</strong>, with one common central bank running a single monetary policy (including one interest rate). It is usually built on a common market.
            </Def>
            <p>
              Examples: the eurozone, the 21 of the 27 EU countries that use the euro (Bulgaria joined in 2026), with interest rates set by the European Central Bank (ECB); the eight countries of the West African Economic and Monetary Union (WAEMU), which share the CFA franc.
            </p>
            <Callout title="Exam tip">
              <p>
                A monetary union is not the same as a common market. The EU is a common market, but members such as Denmark, Sweden and Poland do not use the euro and so are outside the monetary union. The advantages and disadvantages of monetary union are HL only (next section).
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "monetary-union-evaluation",
      level: "hl",
      title: { zh: "货币联盟的利弊", en: "Advantages and disadvantages of monetary union" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>好处</th>
                  <th>坏处</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>没有兑换成本</strong>：企业和游客不用换汇，交易成本（transaction costs）降低。</td>
                  <td>
                    <strong>失去独立的货币政策</strong>：利率由共同央行制定，可能不适合本国经济周期（「一刀切」，one size fits all）。
                  </td>
                </tr>
                <tr>
                  <td><strong>没有汇率风险</strong>：成员之间的贸易和投资收益更确定，鼓励贸易和外国直接投资（FDI）。</td>
                  <td>
                    <strong>不能用汇率调整</strong>：竞争力下降时，不能通过本币贬值来提高出口竞争力，只能靠压低工资和价格（内部贬值），失业代价大。
                  </td>
                </tr>
                <tr>
                  <td><strong>价格透明</strong>：同一货币标价，便于比较各国价格，加强竞争、压低价格。</td>
                  <td>
                    <strong>不对称冲击</strong>（asymmetric shocks）：一个成员陷入衰退而其他成员过热时，统一利率无法同时照顾双方。
                  </td>
                </tr>
                <tr>
                  <td><strong>更低的通胀和利率</strong>：独立、有公信力的共同央行可以降低通胀预期，较小或过去通胀高的国家可以享受更低的借贷成本。</td>
                  <td><strong>财政约束</strong>：为了维持货币稳定，成员的财政赤字和政府债务受到限制，衰退时难以扩张财政。</td>
                </tr>
                <tr>
                  <td><strong>更深的一体化</strong>：配合共同市场，进一步增加贸易和规模经济。</td>
                  <td><strong>转换成本</strong>：更换货币、调整系统和价格的一次性成本，以及失去本国货币带来的国家认同感。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="例子">
              <p>
                2010 年欧债危机中，希腊既不能降息、也不能让货币贬值来恢复竞争力，只能接受严厉的紧缩政策（austerity），失业率一度超过 25%。这正说明了失去货币政策和汇率工具的代价。
              </p>
            </Callout>
            <Callout title="评价">
              <p>
                货币联盟是否合适，取决于成员国的经济周期是否同步、劳动力能否在成员之间流动、工资和价格是否灵活，以及是否有财政转移机制来帮助受冲击的地区（最优货币区理论，optimum currency area）。
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
                  <th>Disadvantages</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>No exchange costs</strong>: firms and tourists need not change currency, so transaction costs fall.</td>
                  <td>
                    <strong>Loss of independent monetary policy</strong>: the common central bank sets one interest rate, which may not suit the national economic cycle (&apos;one size fits all&apos;).
                  </td>
                </tr>
                <tr>
                  <td><strong>No exchange rate risk</strong>: returns on trade and investment between members are more certain, encouraging trade and FDI.</td>
                  <td>
                    <strong>No exchange rate adjustment</strong>: a country that loses competitiveness cannot depreciate; it must cut wages and prices instead (internal devaluation), at a high cost in unemployment.
                  </td>
                </tr>
                <tr>
                  <td><strong>Price transparency</strong>: prices in one currency are easy to compare, increasing competition and lowering prices.</td>
                  <td>
                    <strong>Asymmetric shocks</strong>: when one member is in recession while others are overheating, a single interest rate cannot suit both.
                  </td>
                </tr>
                <tr>
                  <td><strong>Lower inflation and interest rates</strong>: a credible, independent common central bank lowers inflation expectations, so smaller or historically high-inflation members borrow more cheaply.</td>
                  <td><strong>Fiscal constraints</strong>: to protect the currency, members&apos; budget deficits and public debt are limited, making expansionary fiscal policy in a recession difficult.</td>
                </tr>
                <tr>
                  <td><strong>Deeper integration</strong>: together with a common market, more trade and economies of scale.</td>
                  <td><strong>Transition costs</strong>: one-off costs of changing currency, systems and prices, and the loss of a national currency as a symbol of identity.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Real-world example">
              <p>
                In the euro crisis from 2010, Greece could neither cut interest rates nor devalue to regain competitiveness, and had to accept severe austerity, with unemployment rising above 25%. This shows the cost of giving up monetary and exchange rate tools.
              </p>
            </Callout>
            <Callout title="Evaluation">
              <p>
                Whether monetary union suits a group of countries depends on how synchronised their business cycles are, how mobile labour is between them, how flexible wages and prices are, and whether fiscal transfers can support regions hit by shocks (optimum currency area theory).
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "wto",
      level: "both",
      title: { zh: "世界贸易组织（WTO）", en: "The World Trade Organization (WTO)" },
      body: {
        zh: (
          <>
            <Def term="World Trade Organization (WTO)">
              1995 年成立、取代关贸总协定（GATT）的国际组织，负责制定和执行国际贸易规则，目标是让贸易尽可能顺畅、可预测和自由。
            </Def>
            <p><strong>目标</strong>：通过谈判逐步减少贸易壁垒；按规则而不是实力处理贸易关系；通过贸易促进经济增长和发展。核心原则是<strong>非歧视</strong>：最惠国待遇（most-favoured-nation，给一个成员的优惠要给所有成员）和国民待遇（national treatment，进口品进入国内市场后与本国产品同等对待）。</p>
            <p><strong>职能</strong>：</p>
            <ul>
              <li>提供贸易谈判的场所（例如 2001 年开始的多哈回合，Doha Round）。</li>
              <li>管理和监督已达成的贸易协定。</li>
              <li>解决贸易争端（dispute settlement），可授权胜诉方进行报复。</li>
              <li>审议各成员的贸易政策（trade policy review），提高透明度。</li>
              <li>为发展中国家提供技术援助和培训。</li>
            </ul>
            <p><strong>影响 WTO 影响力的因素</strong>：</p>
            <ul>
              <li>
                <strong>服务和初级产品难以达成协议</strong>：发达国家不愿削减农业补贴，发展中国家不愿开放服务业市场，多哈回合因此长期停滞。
              </li>
              <li>
                <strong>成员谈判力量不平等</strong>：大经济体有更多谈判人员和市场筹码，最不发达国家难以发声，也难以承担诉讼费用。
              </li>
              <li>
                其他：协商一致（consensus）的决策方式让少数成员就能阻止协议；2019 年底起上诉机构（Appellate Body）因美国阻止任命法官而停摆；各国转向区域协定。
              </li>
            </ul>
            <Callout title="评价">
              <p>
                WTO 降低了全球关税水平，争端解决机制也让小国可以挑战大国。但多边谈判进展缓慢，大国之间的贸易冲突和区域协定的兴起正在削弱它的作用。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="World Trade Organization (WTO)">
              The international organisation set up in 1995 to replace the GATT, which makes and enforces the rules of international trade with the aim of making trade as smooth, predictable and free as possible.
            </Def>
            <p><strong>Objectives</strong>: reduce trade barriers through negotiation; base trade relations on rules rather than power; promote growth and development through trade. The core principle is <strong>non-discrimination</strong>: most-favoured-nation treatment (a concession given to one member must be given to all) and national treatment (imports, once in the country, are treated the same as domestic goods).</p>
            <p><strong>Functions</strong>:</p>
            <ul>
              <li>Providing a forum for trade negotiations (e.g. the Doha Round, launched in 2001).</li>
              <li>Administering and monitoring existing trade agreements.</li>
              <li>Settling trade disputes, including authorising retaliation by the winning side.</li>
              <li>Reviewing members&apos; trade policies to increase transparency.</li>
              <li>Giving technical assistance and training to developing countries.</li>
            </ul>
            <p><strong>Factors affecting the influence of the WTO</strong>:</p>
            <ul>
              <li>
                <strong>Difficulty reaching agreement on services and primary products</strong>: rich countries resist cutting farm subsidies and developing countries resist opening services markets, which has stalled the Doha Round.
              </li>
              <li>
                <strong>Unequal bargaining power of members</strong>: large economies have more negotiators and market leverage; the least developed countries struggle to be heard or to afford dispute cases.
              </li>
              <li>
                Others: decisions by consensus let a few members block agreement; the Appellate Body has been unable to function since late 2019 because the US has blocked new appointments; countries are turning to regional deals.
              </li>
            </ul>
            <Callout title="Evaluation">
              <p>
                The WTO has helped cut tariffs worldwide, and its dispute system lets small countries challenge large ones. But multilateral talks move slowly, and trade conflicts between major economies and the spread of regional agreements are weakening its role.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.4 Economic integration",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "WTO — Understanding the WTO: what we stand for",
      href: "https://www.wto.org/english/thewto_e/whatis_e/what_stand_for_e.htm",
    },
    {
      label: "Economics Help — Trade creation / Trade diversion",
      href: "https://www.economicshelp.org/blog/1451/trade/trade-diversion/",
    },
    {
      label: "European Central Bank — Our money (euro area members)",
      href: "https://www.ecb.europa.eu/euro/intro/html/index.en.html",
    },
  ],
};

export default notes;
