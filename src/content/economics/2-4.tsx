import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const notes: TopicNotes = {
  summary: {
    zh: "传统经济学假设消费者理性、追求效用最大化并拥有完全信息，企业追求利润最大化。行为经济学借助心理学指出这些假设的局限：人们会受认知偏差影响，理性、自控力和自利都是「有限」的。政府和企业可以通过选择架构和助推来影响决策；企业除了利润最大化，还可能追求企业社会责任、市场份额、满意化和增长等目标。",
    en: "Traditional economics assumes that consumers are rational, maximise utility and have perfect information, and that firms maximise profit. Behavioural economics draws on psychology to show the limits of these assumptions: people are subject to biases, and their rationality, self-control and selfishness are all bounded. Governments and firms can influence decisions through choice architecture and nudges, and firms may pursue objectives other than profit maximisation, such as corporate social responsibility, market share, satisficing and growth.",
  },
  sections: [
    {
      id: "rational-choice",
      level: "both",
      title: { zh: "理性消费者选择的假设", en: "Assumptions of rational consumer choice" },
      body: {
        zh: (
          <>
            <p>需求理论（2.1）背后的标准模型把消费者看作「理性经济人」（homo economicus），有三个核心假设：</p>
            <Def term="Consumer rationality">
              消费者对各种选择有明确、稳定、前后一致的偏好，并总是选择对自己最好的那一个。
            </Def>
            <Def term="Utility maximisation">
              消费者在收入有限的条件下，选择能给自己带来最大总满足感（效用）的商品组合。
            </Def>
            <Def term="Perfect information">
              消费者完全了解所有可选商品的价格、质量和特点，以及选择的后果。
            </Def>
            <p>
              这些假设让模型简单、可预测，但现实中人们常常做出与之不符的「非理性」决定：明知该存钱却乱花、明知该运动却拖延、被商家的标价方式左右。<strong>行为经济学</strong>（behavioural economics）把心理学引入经济学，研究人们实际上如何做决定，以及这些决定为什么会系统性地偏离理性模型。
            </p>
          </>
        ),
        en: (
          <>
            <p>The standard model behind demand theory (2.1) treats consumers as rational economic agents (homo economicus), based on three key assumptions:</p>
            <Def term="Consumer rationality">
              Consumers have clear, stable and consistent preferences and always choose the option that is best for them.
            </Def>
            <Def term="Utility maximisation">
              With a limited income, consumers choose the combination of goods that gives them the greatest total satisfaction (utility).
            </Def>
            <Def term="Perfect information">
              Consumers know the prices, quality and features of all the alternatives and the consequences of their choices.
            </Def>
            <p>
              These assumptions make the model simple and predictive, but real people often act differently: spending when they mean to save, putting off exercise, or being swayed by how a price is presented. <strong>Behavioural economics</strong> brings psychology into economics to study how people actually make decisions and why those decisions depart systematically from the rational model.
            </p>
          </>
        ),
      },
    },
    {
      id: "biases",
      level: "both",
      title: { zh: "认知偏差", en: "Biases" },
      body: {
        zh: (
          <>
            <p>
              <strong>认知偏差</strong>（cognitive biases）是人们在判断和决策中系统性的错误。它们往往来自大脑为了节省精力而使用的「捷径」（heuristics）。
            </p>
            <table>
              <thead>
                <tr>
                  <th>偏差</th>
                  <th>含义</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>经验法则 Rule of thumb</td>
                  <td>用简单的固定规则代替仔细计算来做决定。</td>
                  <td>「总是买第二便宜的那瓶酒」「每月把工资的 10% 存起来」「总买上次买过的牌子」。</td>
                </tr>
                <tr>
                  <td>锚定 Anchoring</td>
                  <td>过分依赖最先得到的一个数字（锚），之后的判断都围绕它调整。</td>
                  <td>商品标「原价 ¥999，现价 ¥499」，原价成为锚，让人觉得很划算；谈判中第一个报价影响最终成交价。</td>
                </tr>
                <tr>
                  <td>框架效应 Framing</td>
                  <td>同样的信息，用不同方式表述，会让人做出不同选择。</td>
                  <td>「95% 无脂肪」比「含 5% 脂肪」更受欢迎；「手术存活率 90%」比「死亡率 10%」更让人愿意接受手术。</td>
                </tr>
                <tr>
                  <td>可得性 Availability</td>
                  <td>根据脑中最容易想起的例子来判断某事发生的可能性。</td>
                  <td>空难新闻后人们高估飞行风险，改为开车（实际上更危险）；刚听说朋友炒股赚钱就跟风入市。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                解释偏差时，要说明它怎样让消费者<strong>偏离效用最大化</strong>，例如锚定让人为商品多付钱、可得性让人错估风险，从而导致资源配置不当。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Cognitive biases</strong> are systematic errors in judgement and decision-making. They often come from mental shortcuts (heuristics) the brain uses to save effort.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Bias</th>
                  <th>Meaning</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rule of thumb</td>
                  <td>Using a simple fixed rule instead of careful calculation.</td>
                  <td>Always buying the second-cheapest wine; saving 10% of every pay cheque; always buying the brand bought last time.</td>
                </tr>
                <tr>
                  <td>Anchoring</td>
                  <td>Relying too heavily on the first number seen (the anchor) and adjusting later judgements around it.</td>
                  <td>A label reading was ¥999, now ¥499 makes the original price an anchor, so the deal feels better; the first offer in a negotiation shapes the final price.</td>
                </tr>
                <tr>
                  <td>Framing</td>
                  <td>The same information presented in different ways leads to different choices.</td>
                  <td>95% fat-free sells better than contains 5% fat; patients accept surgery more readily when told of a 90% survival rate than a 10% death rate.</td>
                </tr>
                <tr>
                  <td>Availability</td>
                  <td>Judging how likely something is by how easily examples come to mind.</td>
                  <td>After news of a plane crash people overestimate the risk of flying and drive instead (which is riskier); hearing that a friend made money on shares prompts people to buy too.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                When explaining a bias, show how it makes consumers <strong>depart from utility maximisation</strong>: anchoring leads them to overpay, availability leads them to misjudge risk, so resources are misallocated.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "bounded",
      level: "both",
      title: {
        zh: "有限理性、有限自控、有限自利与不完全信息",
        en: "Bounded rationality, bounded self-control, bounded selfishness and imperfect information",
      },
      body: {
        zh: (
          <>
            <Def term="Bounded rationality">
              人们想做理性的决定，但受限于信息、时间和计算能力，只能做出「足够好」的选择，而不是最优选择。
            </Def>
            <p>
              例子：面对几十种手机套餐，消费者不会逐一比较所有条款，而是挑一个看起来还不错的。选择越多越复杂，越容易出现「选择过载」（choice overload），甚至干脆不选。
            </p>
            <Def term="Bounded self-control">
              人们即使知道什么对自己最好，也常常缺乏足够的自控力去做到，容易为眼前的满足牺牲长远利益。
            </Def>
            <p>
              例子：拖延存养老金、深夜刷手机、戒烟失败、办了健身卡却很少去。这也是吸烟、垃圾食品等过度消费的原因之一。
            </p>
            <Def term="Bounded selfishness">
              人们并不完全自私，也会关心他人和公平，愿意为别人或社会做出牺牲。
            </Def>
            <p>
              例子：慈善捐款、献血、志愿服务、为公平贸易产品多付钱。在实验中，许多人会拒绝「不公平」的分配，宁可自己什么都得不到，这与纯粹自利的假设不符。
            </p>
            <Def term="Imperfect information">
              消费者缺乏做出最佳决定所需的全部信息，或信息过于复杂而难以理解。
            </Def>
            <p>
              例子：看不懂保险合同和金融产品的条款、不知道食品的真实营养成分、不了解二手车的真实车况（见 HL 2.10 信息不对称）。
            </p>
            <Callout title="评价（Evaluation）">
              <p>
                行为经济学让模型更贴近现实，并为公共政策提供了新工具。但批评者认为：偏差因人、因情境而异，难以预测和建模；很多实验在实验室中进行，结果未必能推广到真实市场；而在大多数日常市场中，需求定律等传统预测依然大体成立。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Bounded rationality">
              People try to make rational decisions but are limited by information, time and the ability to process it, so they make choices that are good enough rather than optimal.
            </Def>
            <p>
              Example: faced with dozens of mobile phone plans, consumers do not compare every term but pick one that seems reasonable. The more numerous and complex the options, the greater the risk of choice overload, where people may not choose at all.
            </p>
            <Def term="Bounded self-control">
              Even when people know what is best for them, they often lack the self-control to act on it, sacrificing long-term interests for immediate gratification.
            </Def>
            <p>
              Example: delaying saving for a pension, scrolling on a phone late at night, failing to quit smoking, or buying a gym membership and rarely going. This helps explain overconsumption of cigarettes and junk food.
            </p>
            <Def term="Bounded selfishness">
              People are not purely self-interested; they also care about others and about fairness, and will make sacrifices for others or for society.
            </Def>
            <p>
              Example: giving to charity, donating blood, volunteering, or paying more for fair trade products. In experiments, many people reject an unfair split even if it means they get nothing, which contradicts pure self-interest.
            </p>
            <Def term="Imperfect information">
              Consumers lack the full information needed to make the best decision, or the information is too complex to understand.
            </Def>
            <p>
              Example: not understanding the terms of insurance contracts and financial products, not knowing the true nutritional content of food, or not knowing the real condition of a used car (see HL 2.10 asymmetric information).
            </p>
            <Callout title="Evaluation">
              <p>
                Behavioural economics makes models more realistic and gives policymakers new tools. Critics argue, however, that biases vary between people and situations and are hard to predict and model; many findings come from laboratory experiments that may not carry over to real markets; and in most everyday markets traditional predictions such as the law of demand still broadly hold.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "choice-architecture",
      level: "both",
      title: { zh: "行为经济学的应用：选择架构", en: "Behavioural economics in action: choice architecture" },
      body: {
        zh: (
          <>
            <Def term="Choice architecture">
              设计选项呈现给人们的方式（顺序、默认项、选项数量、措辞），以影响人们做出的选择，同时不禁止任何选项。
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
                  <td>默认选择 Default choice</td>
                  <td>预先设定一个选项，人们不主动改变就自动采用。利用了人们的惰性和维持现状的倾向。</td>
                  <td>
                    器官捐献「默认同意、可退出」（opt-out）：英格兰 2020 年改为此制度；奥地利等实行默认同意的国家，登记捐献者比例远高于需要主动登记的德国。英国 2012 年起推行养老金<strong>自动加入</strong>（auto-enrolment），参与率大幅上升。
                  </td>
                </tr>
                <tr>
                  <td>限制选择 Restricted choice</td>
                  <td>减少可选项的数量，只保留有限的几个，以避免选择过载，或排除明显有害的选项。</td>
                  <td>养老金计划只提供少数几种精选基金；学校食堂只提供几种健康套餐；政府只批准少数几种合格的能源套餐。</td>
                </tr>
                <tr>
                  <td>强制选择 Mandated choice</td>
                  <td>要求人们必须主动作出选择，不能跳过，也没有默认项。</td>
                  <td>申领驾照时必须回答是否愿意捐献器官（如美国部分州）；开户时必须选择是否加入养老金计划。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="考试提示">
              <p>
                三者的区别在于「谁来决定」：默认选择是设计者替你先选好；限制选择是设计者缩小范围；强制选择是要求你自己必须选。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Choice architecture">
              Designing the way options are presented (order, defaults, number of options, wording) to influence the choices people make, without forbidding any option.
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
                  <td>Default choice</td>
                  <td>An option is pre-set and applies unless people actively change it, exploiting inertia and status quo bias.</td>
                  <td>
                    Opt-out organ donation: England switched to it in 2020, and opt-out countries such as Austria have far higher shares of registered donors than opt-in Germany. Pension <strong>auto-enrolment</strong> in the UK since 2012 has sharply raised participation.
                  </td>
                </tr>
                <tr>
                  <td>Restricted choice</td>
                  <td>The number of options is limited to a few, to avoid choice overload or to rule out clearly harmful options.</td>
                  <td>A pension scheme offering only a handful of selected funds; a school canteen offering a few healthy menus; a regulator allowing only a small number of approved energy tariffs.</td>
                </tr>
                <tr>
                  <td>Mandated choice</td>
                  <td>People are required to make an active decision; they cannot skip it and there is no default.</td>
                  <td>Having to state whether you want to be an organ donor when applying for a driving licence (as in some US states); having to choose whether to join a pension scheme when starting a job.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Exam tip">
              <p>
                The difference is who decides: with a default the designer chooses for you first; with restricted choice the designer narrows the options; with mandated choice you must choose yourself.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "nudge",
      level: "both",
      title: { zh: "助推理论", en: "Nudge theory" },
      body: {
        zh: (
          <>
            <Def term="Nudge">
              以可预测的方式改变人们的行为，但不禁止任何选择、也不显著改变经济激励（如价格）的一种选择架构设计。
            </Def>
            <p>
              助推理论由塞勒（Richard Thaler，2017 年诺贝尔经济学奖得主）和桑斯坦（Cass Sunstein）在《助推》（Nudge，2008）一书中推广。其理念是「自由家长主义」（libertarian paternalism）：引导人们做出对自己更好的选择，但保留选择的自由。英国 2010 年成立了「行为洞察小组」（Behavioural Insights Team，俗称助推小组），之后许多国家和国际组织效仿。
            </p>
            <ul>
              <li><strong>社会规范：</strong>英国税务部门在催缴信中写「10 个人中有 9 个按时纳税」，按时缴税的人增多。</li>
              <li><strong>摆放位置：</strong>食堂把水果和沙拉放在显眼、易拿的位置，把甜点放在后面。</li>
              <li><strong>信息反馈：</strong>电费账单显示「你比邻居多用了 20% 的电」，促使家庭节能。</li>
              <li><strong>醒目提示：</strong>香烟包装上的图片警告，比单纯的文字更能让人注意到健康风险。</li>
            </ul>
            <Callout title="评价（Evaluation）">
              <ul>
                <li><strong>优点：</strong>成本低，保留选择自由，政治上比税收或禁令更易接受，可以和其他政策配合使用。</li>
                <li><strong>局限：</strong>效果通常较小，且可能随时间减弱；对上瘾等强烈行为作用有限，需要配合税收、管制等更强的政策（见 2.7、2.8）。</li>
                <li><strong>伦理问题：</strong>谁来决定什么是「对你好」？助推可能被视为操纵；企业也会用同样的技巧引导消费者多花钱（如默认勾选附加服务、自动续费），这被称为「暗黑模式」（dark patterns）。</li>
                <li><strong>适用性：</strong>在一个国家有效的助推，在不同文化背景下未必同样有效。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Nudge">
              A feature of choice architecture that alters people&apos;s behaviour in a predictable way without forbidding any option or significantly changing economic incentives such as prices.
            </Def>
            <p>
              Nudge theory was popularised by Richard Thaler (Nobel Prize 2017) and Cass Sunstein in <em>Nudge</em> (2008). Its philosophy is libertarian paternalism: steering people towards choices that are better for them while keeping their freedom to choose. The UK set up the Behavioural Insights Team (the Nudge Unit) in 2010, and many governments and international organisations followed.
            </p>
            <ul>
              <li><strong>Social norms:</strong> UK tax reminder letters stating that 9 out of 10 people pay their tax on time increased on-time payment.</li>
              <li><strong>Placement:</strong> canteens put fruit and salad in prominent, easy-to-reach places and desserts further back.</li>
              <li><strong>Feedback:</strong> energy bills showing you used 20% more electricity than your neighbours encourage households to save energy.</li>
              <li><strong>Salience:</strong> graphic warnings on cigarette packets draw attention to health risks more than text alone.</li>
            </ul>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Strengths:</strong> low cost, preserves freedom of choice, more politically acceptable than taxes or bans, and can be combined with other policies.</li>
                <li><strong>Limitations:</strong> effects are often small and may fade over time; they do little against strong behaviours such as addiction, which need stronger policies like taxes and regulation (see 2.7, 2.8).</li>
                <li><strong>Ethics:</strong> who decides what is good for you? Nudges can be seen as manipulation, and firms use the same techniques to make consumers spend more (pre-ticked add-ons, automatic renewals), known as dark patterns.</li>
                <li><strong>Context:</strong> a nudge that works in one country may not work as well in a different culture.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "business-objectives",
      level: "both",
      title: { zh: "企业目标：利润最大化及其替代目标", en: "Business objectives: profit maximisation and alternatives" },
      body: {
        zh: (
          <>
            <Def term="Profit maximisation">
              企业选择使总收入与总成本之差（利润）最大的产量和价格。这是传统经济学对企业的标准假设（理论分析见 HL 2.11，在边际收益 MR = 边际成本 MC 处实现）。
            </Def>
            <p>和「理性消费者」一样，这个假设也受到挑战。企业的目标可能是多元的：</p>
            <table>
              <thead>
                <tr>
                  <th>替代目标</th>
                  <th>含义</th>
                  <th>原因与例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>企业社会责任 Corporate social responsibility (CSR)</td>
                  <td>企业在追求利润的同时，主动承担对员工、社区和环境的责任。</td>
                  <td>减少碳排放、公平对待供应商、支持社区项目。例如户外品牌巴塔哥尼亚（Patagonia）把利润用于环保事业。CSR 可以提升品牌形象、吸引消费者和员工，长期可能反而有利于盈利。</td>
                </tr>
                <tr>
                  <td>市场份额 Market share</td>
                  <td>企业销售额占整个市场销售额的比例。追求更大的份额，即使短期利润较低。</td>
                  <td>新进入者低价抢占市场，例如外卖、网约车和电动车行业的价格战。份额大了以后可获得规模经济和定价能力。</td>
                </tr>
                <tr>
                  <td>满意化 Satisficing</td>
                  <td>企业不追求利润最大，而是追求「令人满意」的利润水平，同时兼顾其他利益相关者的目标。</td>
                  <td>大公司中所有权与经营权分离，管理者可能更看重稳定、自身薪酬或少冒风险，只要股东对利润满意即可。这也是有限理性的体现：企业很难准确知道哪个产量能让利润最大。</td>
                </tr>
                <tr>
                  <td>增长 Growth</td>
                  <td>以扩大企业规模（销售额、资产、员工数）为目标。</td>
                  <td>更大的企业更能抵御风险、获得规模经济和市场力量，管理者的声望和薪酬也往往与规模挂钩。许多科技初创企业多年亏损，专注于增长。</td>
                </tr>
              </tbody>
            </table>
            <Callout title="评价（Evaluation）">
              <p>
                这些目标并不一定与利润冲突：CSR、市场份额和增长常常是为了<strong>长期</strong>利润，而牺牲的是短期利润。CSR 也可能只是「漂绿」（greenwashing），即宣传多于行动。企业追求什么目标，取决于所有权结构、竞争程度、发展阶段和利益相关者的压力。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Profit maximisation">
              The firm chooses the output and price that make the difference between total revenue and total cost (profit) as large as possible. This is the standard assumption about firms in traditional economics (analysed in HL 2.11, where it occurs at marginal revenue MR = marginal cost MC).
            </Def>
            <p>Like the rational consumer, this assumption is open to challenge. Firms may have several objectives:</p>
            <table>
              <thead>
                <tr>
                  <th>Alternative objective</th>
                  <th>Meaning</th>
                  <th>Reasons and examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Corporate social responsibility (CSR)</td>
                  <td>A firm takes responsibility for its impact on employees, communities and the environment while pursuing profit.</td>
                  <td>Cutting carbon emissions, treating suppliers fairly, supporting community projects; e.g. the outdoor brand Patagonia directs its profits to environmental causes. CSR can improve brand image and attract customers and staff, so it may raise profits in the long run.</td>
                </tr>
                <tr>
                  <td>Market share</td>
                  <td>The firm&apos;s sales as a percentage of total market sales. Firms may chase a larger share even at the cost of lower short-term profit.</td>
                  <td>New entrants price low to win customers, e.g. price wars in food delivery, ride-hailing and electric vehicles. A large share later brings economies of scale and pricing power.</td>
                </tr>
                <tr>
                  <td>Satisficing</td>
                  <td>The firm aims for a satisfactory level of profit rather than the maximum, while also meeting the goals of other stakeholders.</td>
                  <td>In large firms ownership is separate from control, so managers may value stability, their own pay or lower risk, as long as shareholders are satisfied with profits. It also reflects bounded rationality: firms rarely know exactly which output maximises profit.</td>
                </tr>
                <tr>
                  <td>Growth</td>
                  <td>The firm aims to increase its size (sales, assets, number of employees).</td>
                  <td>Larger firms are better able to survive shocks and gain economies of scale and market power; managers&apos; status and pay are often linked to size. Many tech start-ups make losses for years while focusing on growth.</td>
                </tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                These objectives do not necessarily conflict with profit: CSR, market share and growth are often ways of earning <strong>long-run</strong> profit at the cost of short-run profit. CSR may also be greenwashing, more marketing than action. Which objective a firm pursues depends on its ownership structure, the degree of competition, its stage of development and pressure from stakeholders.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.4 Critique of the maximizing behaviour of consumers and producers",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "NobelPrize.org — The Prize in Economic Sciences 2017 (Richard Thaler), press release",
      href: "https://www.nobelprize.org/prizes/economic-sciences/2017/press-release/",
    },
    {
      label: "Economics Help — Behavioural economics",
      href: "https://www.economicshelp.org/blog/17289/economics/behavioural-economics/",
    },
    {
      label: "tutor2u — Choice architecture",
      href: "https://www.tutor2u.net/economics/reference/choice-architecture",
    },
  ],
};

export default notes;
