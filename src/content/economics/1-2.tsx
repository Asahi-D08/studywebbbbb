import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const notes: TopicNotes = {
  summary: {
    zh: "经济学家像科学家一样，用逻辑、假设、模型和实证证据来研究经济，但因为研究对象是人，政策选择离不开价值判断。本节区分实证经济学与规范经济学，介绍其他条件不变假设、证伪以及公平与平等的区别，并梳理从亚当·斯密到行为经济学和循环经济的经济思想发展史。",
    en: "Economists study the economy much as scientists do, using logic, hypotheses, models and empirical evidence, but because they study people, policy choices always involve value judgements. This topic separates positive from normative economics, explains ceteris paribus, refutation and the difference between equity and equality, and traces the history of economic thought from Adam Smith to behavioural economics and the circular economy.",
  },
  sections: [
    {
      id: "positive-normative",
      level: "both",
      title: { zh: "实证经济学与规范经济学", en: "Positive and normative economics" },
      body: {
        zh: (
          <>
            <Def term="Positive economics">
              描述和解释经济「是什么」的分析。实证表述（positive statement）可以用证据来检验，证明它对或错。
            </Def>
            <Def term="Normative economics">
              涉及经济「应该是什么」的分析，基于价值判断（value judgement）。规范表述（normative statement）无法单靠证据证明对错。
            </Def>
            <table>
              <thead>
                <tr>
                  <th>实证表述</th>
                  <th>规范表述</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>提高最低工资会减少青年就业。</td>
                  <td>政府应该提高最低工资。</td>
                </tr>
                <tr>
                  <td>2023 年某国失业率为 5%。</td>
                  <td>5% 的失业率高得不可接受。</td>
                </tr>
                <tr>
                  <td>对含糖饮料征税会降低其销量。</td>
                  <td>对含糖饮料征税是公平的。</td>
                </tr>
              </tbody>
            </table>
            <p>
              实证经济学的作用是<strong>解释和预测</strong>：某个变化会带来什么结果。规范经济学的作用是<strong>判断和建议</strong>：哪种结果更好、政府该采取什么政策。好的政策讨论两者都需要：先用实证分析弄清后果，再用价值判断权衡取舍。
            </p>
            <Callout title="考试提示">
              <p>
                判断方法：看能不能用数据检验。含有「应该」「更好」「公平」「太高」之类词语的通常是规范表述。注意：一个实证表述即使是错的，也仍然是实证表述，因为它可以被检验。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Positive economics">
              Analysis that describes and explains what is. A positive statement can be tested against evidence and shown to be true or false.
            </Def>
            <Def term="Normative economics">
              Analysis of what ought to be, based on value judgements. A normative statement cannot be proved true or false by evidence alone.
            </Def>
            <table>
              <thead>
                <tr>
                  <th>Positive statement</th>
                  <th>Normative statement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Raising the minimum wage will reduce youth employment.</td>
                  <td>The government should raise the minimum wage.</td>
                </tr>
                <tr>
                  <td>The country&apos;s unemployment rate was 5% in 2023.</td>
                  <td>An unemployment rate of 5% is unacceptably high.</td>
                </tr>
                <tr>
                  <td>A tax on sugary drinks will reduce their sales.</td>
                  <td>A tax on sugary drinks is fair.</td>
                </tr>
              </tbody>
            </table>
            <p>
              The role of positive economics is to <strong>explain and predict</strong> the effects of a change. The role of normative economics is to <strong>judge and recommend</strong>: which outcome is better and which policy the government should choose. Good policy debate needs both: positive analysis to establish the consequences, then value judgements to weigh the trade-offs.
            </p>
            <Callout title="Exam tip">
              <p>
                Ask whether the statement could be checked with data. Words such as should, better, fair or too high usually signal a normative statement. A positive statement that turns out to be wrong is still positive, because it can be tested.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "method",
      level: "both",
      title: { zh: "经济学方法：逻辑、假设、模型与证据", en: "Economic methodology: logic, hypotheses, models and evidence" },
      body: {
        zh: (
          <>
            <p>经济学家借用了科学方法的基本步骤：</p>
            <ol>
              <li><strong>观察并提出问题</strong>，例如：为什么油价上涨后，人们买的电动车变多了？</li>
              <li><strong>提出假设</strong>（hypothesis）：一个可检验的、关于变量之间关系的预测，如「汽油价格上涨会增加电动车的需求」。</li>
              <li><strong>运用逻辑</strong>（logic）推导：从假设出发，一步步推出结论。</li>
              <li><strong>收集实证证据</strong>（empirical evidence）：用真实数据检验假设。</li>
              <li><strong>证伪或接受</strong>：如果证据与假设矛盾，就<strong>证伪</strong>（refutation）它，修改或放弃；如果证据一再支持，它就成为<strong>理论</strong>（theory）。</li>
            </ol>
            <Def term="Model">
              对现实的简化表示，只保留最重要的变量，用来解释和预测经济行为，例如需求与供给模型、PPC、收入循环流动模型。
            </Def>
            <Def term="Ceteris paribus">
              拉丁语，意为「其他条件不变」。分析一个变量的影响时，假设其他所有相关变量保持不变。
            </Def>
            <p>
              经济学家无法像化学家那样在实验室控制变量，现实中很多因素同时变化。<strong>其他条件不变</strong>假设让我们能单独分析一个因素的作用，例如「其他条件不变，价格上升，需求量下降」。
            </p>
            <Callout title="评价（Evaluation）">
              <ul>
                <li>模型是简化的，因此可能忽略重要因素；但正是简化让它们有用，就像地图不需要画出每棵树。</li>
                <li>现实中其他条件很少真的不变，所以预测可能与结果不符。</li>
                <li>经济学的「证伪」比自然科学难：数据有误差、实验难以重复，同一组数据可能支持不同的解释。</li>
                <li>证据只能证伪假设，不能最终证明它永远正确。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>Economists borrow the basic steps of the scientific method:</p>
            <ol>
              <li><strong>Observe and ask a question</strong>, e.g. why did people buy more electric cars after petrol prices rose?</li>
              <li><strong>Form a hypothesis</strong>: a testable prediction about the relationship between variables, e.g. a rise in petrol prices will increase the demand for electric cars.</li>
              <li><strong>Use logic</strong> to reason step by step from the hypothesis to its implications.</li>
              <li><strong>Gather empirical evidence</strong>: test the hypothesis against real-world data.</li>
              <li><strong>Refute or retain</strong>: if the evidence contradicts the hypothesis it is <strong>refuted</strong> and revised or rejected; if evidence repeatedly supports it, it becomes a <strong>theory</strong>.</li>
            </ol>
            <Def term="Model">
              A simplified representation of reality that keeps only the most important variables, used to explain and predict economic behaviour, e.g. demand and supply, the PPC and the circular flow of income.
            </Def>
            <Def term="Ceteris paribus">
              Latin for other things being equal: when analysing the effect of one variable, all other relevant variables are assumed to stay constant.
            </Def>
            <p>
              Economists cannot control variables in a laboratory as chemists can, and in reality many things change at once. The <strong>ceteris paribus</strong> assumption lets us isolate the effect of one factor, e.g. ceteris paribus, a rise in price reduces quantity demanded.
            </p>
            <Callout title="Evaluation">
              <ul>
                <li>Models are simplifications and may leave out important factors, but simplification is what makes them useful, just as a map does not need to show every tree.</li>
                <li>Other things are rarely equal in the real world, so predictions may not match outcomes.</li>
                <li>Refutation is harder than in the natural sciences: data contain errors, experiments are hard to repeat, and the same data may support different explanations.</li>
                <li>Evidence can refute a hypothesis but can never prove it true for all time.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "value-judgements",
      level: "both",
      title: { zh: "政策中的价值判断：公平与平等", en: "Value judgements in policy making: equity and equality" },
      body: {
        zh: (
          <>
            <p>
              政府制定政策时，实证分析能告诉我们每个方案的后果，但最后选哪个，取决于决策者看重什么：效率还是公平？现在还是未来？哪个群体的利益优先？这些都是<strong>价值判断</strong>。例如提高燃油税可以减少污染（实证），但它对低收入通勤者是否「公平」，是规范问题。
            </p>
            <Def term="Equality">
              每个人得到<strong>相同</strong>的数量，例如收入、财富或资源完全平均分配。
            </Def>
            <Def term="Equity">
              <strong>公平</strong>（fairness），即分配是否公正。公平不一定意味着平等。
            </Def>
            <p>
              例子：累进所得税（progressive income tax）让高收入者按更高税率纳税，每个人缴的税并不「平等」，但很多人认为它是「公平」的。同样，给残障学生更多的学习支持是公平的，却不是平等的分配。什么才算公平，本身就是价值判断，不同的人、不同的社会会有不同答案。
            </p>
            <Callout title="考试提示">
              <p>
                IB 考试中要准确使用这两个词：「收入不平等」用 inequality，「政策是否公平」用 equity / equitable。评价政策时，要指出结论依赖于哪种价值判断。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              When governments make policy, positive analysis can show the consequences of each option, but the final choice depends on what decision-makers value: efficiency or fairness, the present or the future, which group comes first. These are <strong>value judgements</strong>. A higher fuel tax may reduce pollution (positive), but whether it is fair to low-income commuters is a normative question.
            </p>
            <Def term="Equality">
              Everyone receives the <strong>same</strong> amount, e.g. an exactly even distribution of income, wealth or resources.
            </Def>
            <Def term="Equity">
              <strong>Fairness</strong>: whether a distribution is just. Equity does not necessarily mean equality.
            </Def>
            <p>
              Example: a progressive income tax charges higher-income earners a higher rate. People do not pay equal amounts, yet many regard it as equitable. Likewise, giving extra learning support to students with disabilities is fair but not equal. What counts as fair is itself a value judgement, and different people and societies answer differently.
            </p>
            <Callout title="Exam tip">
              <p>
                Use the words precisely: income inequality refers to equality; whether a policy is fair refers to equity. When evaluating a policy, point out which value judgement the conclusion depends on.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "thought-18-19",
      level: "both",
      title: { zh: "经济思想史：18 与 19 世纪", en: "Economic thought: the 18th and 19th centuries" },
      body: {
        zh: (
          <>
            <p>经济思想总是产生于特定的历史背景，为回应当时的问题而出现。</p>
            <p>
              <strong>18 世纪：亚当·斯密与自由放任（laissez faire）。</strong>工业革命初期，斯密在《国富论》（1776）中提出，个人追求自身利益，会像被一只<strong>「看不见的手」</strong>（invisible hand）引导一样，通过市场竞争促进整个社会的利益。他强调分工（division of labour）能大幅提高生产率，主张政府少干预市场，主要负责国防、司法和公共工程。这就是自由放任思想。
            </p>
            <p><strong>19 世纪：</strong></p>
            <ul>
              <li>
                <strong>古典微观经济学：效用（utility）。</strong>经济学家开始用「效用」（消费带来的满足感）来解释消费者的选择和商品的价值。
              </li>
              <li>
                <strong>边际概念（the margin）。</strong>19 世纪 70 年代的「边际革命」（杰文斯、门格尔、瓦尔拉斯）指出，决策取决于<strong>多一单位</strong>带来的额外收益和额外成本（边际效用、边际成本），而不是总量。这解释了「钻石与水悖论」：水总效用很大，但因为充足，边际效用很低，所以便宜。马歇尔（1890）把这些思想整合成今天的供求模型。
              </li>
              <li>
                <strong>古典宏观经济学：萨伊定律（Say&apos;s law）。</strong>萨伊认为「供给创造其自身的需求」：生产商品所付出的收入会被用于购买其他商品，所以不会出现普遍的生产过剩，市场会自动回到充分就业。
              </li>
              <li>
                <strong>马克思对古典经济学的批判。</strong>马克思（《资本论》，1867）认为资本主义下，资本家通过占有工人创造的<strong>剩余价值</strong>（surplus value）获得利润，导致剥削、贫富分化和反复出现的经济危机，市场并不会自动带来和谐。他主张生产资料公有，这影响了 20 世纪的计划经济。
              </li>
            </ul>
          </>
        ),
        en: (
          <>
            <p>Economic ideas arise in a particular historical context, in response to the problems of their time.</p>
            <p>
              <strong>18th century: Adam Smith and laissez faire.</strong> At the start of the Industrial Revolution, Smith argued in <em>The Wealth of Nations</em> (1776) that individuals pursuing their own interest are led, as if by an <strong>invisible hand</strong>, to promote the good of society through market competition. He stressed that the division of labour greatly raises productivity, and argued that government should interfere little in markets, limiting itself mainly to defence, justice and public works. This is the idea of laissez faire.
            </p>
            <p><strong>19th century:</strong></p>
            <ul>
              <li>
                <strong>Classical microeconomics: utility.</strong> Economists began to explain consumer choice and the value of goods in terms of utility, the satisfaction gained from consumption.
              </li>
              <li>
                <strong>The concept of the margin.</strong> The marginal revolution of the 1870s (Jevons, Menger, Walras) showed that decisions depend on the extra benefit and extra cost of <strong>one more unit</strong> (marginal utility, marginal cost), not on totals. This solves the diamond–water paradox: water has huge total utility but, being plentiful, low marginal utility, so it is cheap. Marshall (1890) combined these ideas into today&apos;s demand and supply model.
              </li>
              <li>
                <strong>Classical macroeconomics: Say&apos;s law.</strong> Jean-Baptiste Say argued that supply creates its own demand: the income paid out in producing goods is spent on other goods, so there can be no general overproduction and the economy returns to full employment by itself.
              </li>
              <li>
                <strong>The Marxist critique of classical thought.</strong> Marx (<em>Capital</em>, 1867) argued that under capitalism, capitalists earn profit by taking the <strong>surplus value</strong> created by workers. The result is exploitation, growing inequality and recurring crises, so markets do not produce harmony on their own. He called for common ownership of the means of production, which influenced 20th-century planned economies.
              </li>
            </ul>
          </>
        ),
      },
    },
    {
      id: "thought-20-21",
      level: "both",
      title: { zh: "经济思想史：20 与 21 世纪", en: "Economic thought: the 20th and 21st centuries" },
      body: {
        zh: (
          <>
            <p><strong>20 世纪：</strong></p>
            <ul>
              <li>
                <strong>凯恩斯革命（Keynesian revolution）。</strong>20 世纪 30 年代大萧条中，失业长期居高不下，萨伊定律显然不成立。凯恩斯在《通论》（1936）中提出，经济可能长期停留在<strong>总需求不足</strong>、高失业的状态，不会自动恢复，政府应通过增加支出、减税来刺激需求。
              </li>
              <li>
                <strong>宏观经济政策的兴起。</strong>二战后，各国政府普遍用财政政策和货币政策「管理需求」，以实现充分就业和稳定增长。
              </li>
              <li>
                <strong>货币主义 / 新古典学派的反革命（monetarist / new classical counter revolution）。</strong>20 世纪 70 年代出现<strong>滞胀</strong>（stagflation，高通胀与高失业并存），凯恩斯主义难以解释。弗里德曼等货币主义者认为通胀源于货币供应增长过快；新古典学派强调市场自我调节和理性预期。政策转向控制通胀、私有化、放松管制和供给侧改革（如 80 年代的英国和美国）。
              </li>
            </ul>
            <p><strong>21 世纪：</strong></p>
            <ul>
              <li>
                <strong>与其他学科的对话、行为经济学的兴起。</strong>经济学越来越多地借鉴心理学，研究人们为什么常常不像传统模型假设的那样理性。卡尼曼（2002）和塞勒（2017）因此获得诺贝尔经济学奖，各国政府成立了「助推小组」（nudge units），见 2.4。
              </li>
              <li>
                <strong>认识到经济、社会和环境相互依存。</strong>气候变化和资源耗竭让人们意识到，经济增长不能脱离环境和社会来谈。<strong>循环经济</strong>（circular economy）主张改变「开采—生产—丢弃」的线性模式，通过设计减少浪费，让产品和材料被重复使用、维修和回收。「甜甜圈经济学」（doughnut economics）等新模型也在挑战「增长就是目标」的主流观点。
              </li>
            </ul>
            <Callout title="评价（Evaluation）">
              <p>
                经济思想的变化说明经济学是不断发展的：当现实（大萧条、滞胀、2008 年金融危机、气候危机）与现有理论不符时，新的理论就会出现。各学派对「市场与政府的作用」的分歧，至今仍是很多政策争论的核心，例如应对衰退时该用财政刺激还是让市场自行调整。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p><strong>20th century:</strong></p>
            <ul>
              <li>
                <strong>The Keynesian revolution.</strong> In the Great Depression of the 1930s, unemployment stayed high for years and Say&apos;s law clearly failed. In <em>The General Theory</em> (1936) Keynes argued that an economy can remain stuck with <strong>insufficient aggregate demand</strong> and high unemployment, with no automatic recovery, so governments should raise spending and cut taxes to boost demand.
              </li>
              <li>
                <strong>The rise of macroeconomic policy.</strong> After the Second World War, governments widely used fiscal and monetary policy to manage demand and achieve full employment and stable growth.
              </li>
              <li>
                <strong>The monetarist / new classical counter revolution.</strong> The <strong>stagflation</strong> of the 1970s (high inflation together with high unemployment) was hard to explain with Keynesian ideas. Monetarists such as Friedman argued that inflation is caused by excessive growth of the money supply; new classical economists stressed self-correcting markets and rational expectations. Policy shifted towards controlling inflation, privatisation, deregulation and supply-side reform (e.g. the UK and USA in the 1980s).
              </li>
            </ul>
            <p><strong>21st century:</strong></p>
            <ul>
              <li>
                <strong>Dialogue with other disciplines and the growth of behavioural economics.</strong> Economics increasingly draws on psychology to study why people often behave less rationally than traditional models assume. Kahneman (2002) and Thaler (2017) won the Nobel Prize for this work, and governments have set up nudge units (see 2.4).
              </li>
              <li>
                <strong>Awareness of the interdependence of the economy, society and the environment.</strong> Climate change and resource depletion show that growth cannot be considered apart from society and the environment. The <strong>circular economy</strong> aims to replace the linear take–make–dispose model by designing out waste, so that products and materials are reused, repaired and recycled. New models such as doughnut economics also challenge the mainstream view that growth is the goal.
              </li>
            </ul>
            <Callout title="Evaluation">
              <p>
                The history of economic thought shows that economics keeps evolving: when events (the Great Depression, stagflation, the 2008 financial crisis, the climate crisis) do not fit existing theory, new theories emerge. Disagreement between schools about the roles of the market and the government is still at the heart of many policy debates, such as whether to use fiscal stimulus in a recession or let markets adjust.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 1.2 How do economists approach the world?",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 1.3 How Economists Use Theories and Models to Understand Economic Issues",
      href: "https://openstax.org/books/principles-economics-3e/pages/1-3-how-economists-use-theories-and-models-to-understand-economic-issues",
    },
    {
      label: "Econlib — Adam Smith biography",
      href: "https://www.econlib.org/library/Enc/bios/Smith.html",
    },
    {
      label: "Ellen MacArthur Foundation — Circular economy introduction",
      href: "https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview",
    },
  ],
};

export default notes;
