import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const notes: TopicNotes = {
  summary: {
    zh: "公共物品具有非竞争性和非排他性，因此人们可以不付钱就享用，产生「搭便车」问题，私人企业无利可图，市场根本不会提供或严重提供不足。本节讲公共物品的特征、搭便车问题，以及政府直接提供和外包给私人部门两种应对方式及其评价。",
    en: "Public goods are non-rivalrous and non-excludable, so people can enjoy them without paying. This creates the free rider problem: private firms cannot make a profit, so the market fails to provide the good at all or provides far too little. This topic covers the characteristics of public goods, the free rider problem, and two government responses, direct provision and contracting out to the private sector, with evaluation.",
  },
  sections: [
    {
      id: "public-goods",
      level: "both",
      title: { zh: "公共物品的特征", en: "Characteristics of public goods" },
      body: {
        zh: (
          <>
            <Def term="Public good">
              同时具有<strong>非竞争性</strong>和<strong>非排他性</strong>的商品或服务，例如国防、灯塔、路灯、防洪堤、天气预报、公共烟花表演。
            </Def>
            <Def term="Non-rivalrous">
              一个人消费并不减少其他人可消费的数量，多一个使用者的边际成本为零。例如多一个人走在路灯下，并不会让别人得到的光变少。
            </Def>
            <Def term="Non-excludable">
              无法（或成本极高）阻止没有付费的人享用。例如防洪堤保护整片区域，不可能只保护付了钱的家庭。
            </Def>
            <p>
              与之相对，<strong>私人物品</strong>（private goods）既有竞争性又有排他性：你吃了这块蛋糕，别人就不能吃；不付钱，店主就不卖给你。
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>排他性 Excludable</th>
                  <th>非排他性 Non-excludable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>竞争性 Rivalrous</td>
                  <td>私人物品：食物、衣服、手机</td>
                  <td>公共资源（common pool resources）：鱼群、森林（见 2.8）</td>
                </tr>
                <tr>
                  <td>非竞争性 Non-rivalrous</td>
                  <td>俱乐部物品：付费电视、收费公路</td>
                  <td><strong>公共物品</strong>：国防、灯塔、路灯</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                「公共物品」是经济学定义，不等于「政府提供的东西」。公立学校和公立医院由政府提供，但它们具有竞争性和排他性（学位、病床有限，可以拒绝），所以是<strong>优值品</strong>（merit goods），不是公共物品。很多物品只是「准公共物品」（quasi-public goods），例如道路在拥堵时就变得有竞争性，加装收费站后又变得可以排他。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Public good">
              A good or service that is both <strong>non-rivalrous</strong> and <strong>non-excludable</strong>, e.g. national defence, lighthouses, street lighting, flood defences, weather forecasts and public fireworks displays.
            </Def>
            <Def term="Non-rivalrous">
              One person&apos;s consumption does not reduce the amount available to others, so the marginal cost of an extra user is zero. One more person walking under a street light does not reduce the light anyone else receives.
            </Def>
            <Def term="Non-excludable">
              It is impossible (or prohibitively costly) to stop people who have not paid from benefiting. A flood barrier protects the whole area; it cannot protect only the households that paid.
            </Def>
            <p>
              By contrast, <strong>private goods</strong> are both rivalrous and excludable: if you eat a slice of cake no one else can, and the shop will not sell it to you unless you pay.
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Excludable</th>
                  <th>Non-excludable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rivalrous</td>
                  <td>Private goods: food, clothes, phones</td>
                  <td>Common pool resources: fish stocks, forests (see 2.8)</td>
                </tr>
                <tr>
                  <td>Non-rivalrous</td>
                  <td>Club goods: pay TV, toll roads</td>
                  <td><strong>Public goods</strong>: national defence, lighthouses, street lighting</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                A public good is defined by its characteristics, not by who provides it. State schools and hospitals are provided by the government but are rivalrous and excludable (places and beds are limited, and people can be turned away), so they are <strong>merit goods</strong>, not public goods. Many goods are only quasi-public goods: a road becomes rivalrous when congested and excludable once a toll is added.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "free-rider",
      level: "both",
      title: { zh: "搭便车问题与市场失灵", en: "The free rider problem and market failure" },
      body: {
        zh: (
          <>
            <Def term="Free rider problem">
              由于物品具有非排他性，人们可以不付费也能享用，于是每个人都有动机隐瞒自己的真实需求、等别人付费，自己「搭便车」。结果私人企业无法收回成本，不愿意提供该物品。
            </Def>
            <p>
              设想一个小镇需要一座防洪堤，造价 1 000 万元，每户居民都认为它值 2 万元。如果交给私人公司建造并向居民收费，每户都会想：「反正建好后我家也会被保护，不如说我不需要，让邻居去付。」当大多数人都这样想时，公司收不到足够的钱，防洪堤根本建不起来，尽管它对小镇的总收益远远超过成本。
            </p>
            <p>
              这就是<strong>市场缺失</strong>（missing market）：社会确实需要该物品（MSB 很高），但市场提供的数量为零或远低于社会最优，资源配置严重不足，造成福利损失。非竞争性则意味着，即使能够排他，向多一个使用者收费也会降低效率，因为多服务一人的边际成本为零。
            </p>
            <Callout title="例子">
              <p>
                灯塔是经典例子：船只无论是否付费都能看到灯光，灯塔主很难向经过的每一艘船收费。历史上英国的部分灯塔是通过向停靠港口的船只收取「灯塔费」来融资的，说明在特殊条件下私人也能想办法解决搭便车问题，但这种情况很少见。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Free rider problem">
              Because a good is non-excludable, people can enjoy it without paying, so each person has an incentive to hide their true demand and let others pay, taking a free ride. Private firms cannot cover their costs and are unwilling to supply the good.
            </Def>
            <p>
              Imagine a town that needs a flood barrier costing $10 million, which each household values at $20 000. If a private firm built it and asked households to pay, each would think: once it is built my house will be protected anyway, so I will say I do not need it and let my neighbours pay. When most households reason this way, the firm cannot collect enough money and the barrier is never built, even though its total benefit to the town far exceeds its cost.
            </p>
            <p>
              The result is a <strong>missing market</strong>: society clearly wants the good (MSB is high), but the market supplies none or far less than the social optimum, a severe under-allocation of resources and a welfare loss. Non-rivalry adds a further point: even if exclusion were possible, charging an extra user would be inefficient, because the marginal cost of serving one more person is zero.
            </p>
            <Callout title="Real-world example">
              <p>
                The lighthouse is the classic case: ships see the light whether they pay or not, so the owner cannot charge every passing ship. Historically some British lighthouses were funded by light dues collected from ships using nearby ports, showing that under special conditions private solutions to free riding can exist, but such cases are rare.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "direct-provision",
      level: "both",
      title: { zh: "政府应对：直接提供", en: "Government response: direct provision" },
      body: {
        zh: (
          <>
            <Def term="Direct provision">
              政府用税收收入为公共物品付费，由政府部门或国有机构自己生产并免费提供给所有人，例如国防、警察、路灯、防洪设施。
            </Def>
            <p>
              税收是强制性的，每个人都必须缴纳，所以政府能绕开搭便车问题：没有人可以拒绝付费。由于物品是非竞争性的，免费提供也不会造成浪费：多一个使用者的边际成本为零。
            </p>
            <Callout title="评价（Evaluation）">
              <ul>
                <li><strong>优点</strong>：解决搭便车问题，保证人人都能享用，有利于公平；对国防、司法等涉及国家安全和权力的服务，政府提供更合适。</li>
                <li><strong>提供多少难以确定</strong>：没有市场价格，政府不知道人们真正愿意为公共物品付多少，只能靠成本收益分析（cost-benefit analysis）估计，容易提供过多或过少。</li>
                <li><strong>机会成本</strong>：用于公共物品的税收不能用于教育、医疗等其他领域，政府必须做出取舍。</li>
                <li><strong>效率问题</strong>：政府部门没有利润动机，可能缺乏控制成本和创新的激励，还可能受政治因素影响（如选举前在特定选区修建项目）。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Direct provision">
              The government pays for a public good out of tax revenue and produces it itself through public sector bodies, making it free to everyone, e.g. national defence, police, street lighting and flood defences.
            </Def>
            <p>
              Taxes are compulsory, so everyone contributes and the free rider problem is avoided: no one can refuse to pay. Because the good is non-rivalrous, providing it free does not cause waste, since the marginal cost of an extra user is zero.
            </p>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Strengths</strong>: solves the free rider problem and guarantees access for everyone, which promotes equity; for defence and justice, which involve state security and power, government provision is especially appropriate.</li>
                <li><strong>Hard to know how much to provide</strong>: with no market price, the government does not know how much people truly value the good, so it relies on cost-benefit analysis and may provide too much or too little.</li>
                <li><strong>Opportunity cost</strong>: tax revenue spent on public goods cannot be spent on education, health care or anything else, so governments face trade-offs.</li>
                <li><strong>Efficiency</strong>: public sector bodies lack the profit motive, so they may have weak incentives to control costs and innovate, and decisions may be political (e.g. projects in marginal constituencies before an election).</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "contracting-out",
      level: "both",
      title: { zh: "政府应对：外包给私人部门", en: "Government response: contracting out to the private sector" },
      body: {
        zh: (
          <>
            <Def term="Contracting out">
              政府仍然用税收为公共物品付费，但通过招标把生产和运营交给私人企业完成，例如私人公司建造和维护道路、桥梁和路灯，安装和维护交通信号灯，为军队制造武器装备。
            </Def>
            <p>
              关键区别是：<strong>谁付钱</strong>和<strong>谁生产</strong>分开了。政府负责付款，保证解决搭便车问题；私人企业负责生产，通过竞标竞争压低成本。
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>直接提供</th>
                  <th>外包给私人部门</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>谁付费</td>
                  <td>政府（税收）</td>
                  <td>政府（税收）</td>
                </tr>
                <tr>
                  <td>谁生产</td>
                  <td>政府部门、国有机构</td>
                  <td>中标的私人企业</td>
                </tr>
                <tr>
                  <td>主要优点</td>
                  <td>政府直接控制，问责清晰</td>
                  <td>竞争和利润动机带来效率与创新</td>
                </tr>
                <tr>
                  <td>主要风险</td>
                  <td>缺乏效率</td>
                  <td>偷工减料、合同管理成本、腐败</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价（Evaluation）">
              <ul>
                <li><strong>优点</strong>：私人企业追求利润，有动力控制成本、使用新技术；竞标让政府以较低的价格获得服务，节省税收。</li>
                <li><strong>质量风险</strong>：企业为了提高利润可能偷工减料，政府需要写清楚合同标准并持续监督，这本身就有成本。</li>
                <li><strong>竞标不充分</strong>：如果只有少数企业有能力竞标，它们可能抬高价格，甚至出现腐败和裙带关系。</li>
                <li><strong>企业失败风险</strong>：承包商破产可能导致服务中断，最后仍需政府出手。例如英国大型政府承包商 Carillion 2018 年倒闭，多项公共工程被迫停工。</li>
              </ul>
            </Callout>
            <Callout title="考试提示">
              <p>
                15 分题要比较两种方式并下结论：质量容易规定和检查的服务（如道路维护）更适合外包；敏感或难以监督的服务（如国防、警察）更适合政府直接提供。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Contracting out">
              The government still pays for a public good out of tax revenue, but hires private firms through competitive tendering to produce or run it, e.g. private firms building and maintaining roads, bridges and street lights, installing traffic lights, or making equipment for the armed forces.
            </Def>
            <p>
              The key point is that <strong>who pays</strong> and <strong>who produces</strong> are separated. The government pays, so the free rider problem is solved; private firms produce, and competition for the contract pushes costs down.
            </p>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Direct provision</th>
                  <th>Contracting out</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Who pays</td>
                  <td>Government (taxes)</td>
                  <td>Government (taxes)</td>
                </tr>
                <tr>
                  <td>Who produces</td>
                  <td>Government departments, state bodies</td>
                  <td>The private firm that wins the contract</td>
                </tr>
                <tr>
                  <td>Main strength</td>
                  <td>Direct control and clear accountability</td>
                  <td>Efficiency and innovation from competition and the profit motive</td>
                </tr>
                <tr>
                  <td>Main risk</td>
                  <td>Inefficiency</td>
                  <td>Cutting corners, costs of managing contracts, corruption</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Strengths</strong>: profit-seeking firms have an incentive to cut costs and use new technology, and tendering lets the government buy the service more cheaply, saving tax revenue.</li>
                <li><strong>Quality risk</strong>: firms may cut corners to raise profit, so the government must write clear standards into the contract and keep monitoring, which is itself costly.</li>
                <li><strong>Weak competition</strong>: if only a few firms can bid, they may push prices up, and there is a risk of corruption and cronyism.</li>
                <li><strong>Firm failure</strong>: if a contractor goes bankrupt, services can stop and the government has to step in. When the large UK government contractor Carillion collapsed in 2018, many public projects were halted.</li>
              </ul>
            </Callout>
            <Callout title="Exam tip">
              <p>
                In a 15-mark answer, compare the two responses and reach a judgement: contracting out tends to suit services whose quality is easy to specify and check (e.g. road maintenance), while direct provision suits services that are sensitive or hard to monitor (e.g. defence and policing).
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.9 Market failure: public goods",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 13.3 Public Goods",
      href: "https://openstax.org/books/principles-economics-3e/pages/13-3-public-goods",
    },
    {
      label: "Economics Help — Public goods",
      href: "https://www.economicshelp.org/micro-economic-essays/marketfailure/public-goods/",
    },
  ],
};

export default notes;
