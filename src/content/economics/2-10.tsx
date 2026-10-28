import type { TopicNotes } from "@/content/types";
import { Callout, Def } from "@/components/notes/blocks";

const notes: TopicNotes = {
  summary: {
    zh: "当交易一方比另一方掌握更多信息时，就出现信息不对称，市场可能无法实现配置效率。本节讲两种主要形式：交易前的逆向选择和交易后的道德风险，以及政府应对（立法与管制、提供信息）和私人应对（信号传递与筛选）及其评价。",
    en: "Asymmetric information exists when one party to a transaction knows more than the other, and it can stop a market from achieving allocative efficiency. This topic covers its two main forms, adverse selection before a transaction and moral hazard after it, and the government responses (legislation and regulation, provision of information) and private responses (signalling and screening), with evaluation.",
  },
  sections: [
    {
      id: "asymmetric-information",
      level: "both",
      title: { zh: "什么是信息不对称", en: "What is asymmetric information?" },
      body: {
        zh: (
          <>
            <Def term="Asymmetric information">
              交易中一方（买方或卖方）比另一方掌握更多与交易相关的信息，导致资源配置偏离社会最优，是一种市场失灵。
            </Def>
            <p>
              竞争市场理论假设买卖双方拥有<strong>完全信息</strong>（perfect information）。现实中这一假设经常不成立：
            </p>
            <ul>
              <li><strong>卖方知道得更多</strong>：二手车卖家知道车有没有毛病；医生比病人更了解需要什么治疗；食品生产商知道用了什么原料。</li>
              <li><strong>买方知道得更多</strong>：买保险的人比保险公司更了解自己的健康状况和驾驶习惯；借款人比银行更清楚自己能否还款。</li>
            </ul>
            <p>
              掌握信息较少的一方无法正确判断商品的真实价值，可能付出过高价格、买到劣质商品，或者干脆不交易。结果交易量过多或过少，资源配置不足或过度，造成福利损失。信息不对称引起的问题按时间分为两类：交易<strong>前</strong>的逆向选择和交易<strong>后</strong>的道德风险。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Asymmetric information">
              A situation where one party to a transaction (buyer or seller) has more relevant information than the other, so resource allocation differs from the social optimum: a form of market failure.
            </Def>
            <p>
              The model of a competitive market assumes buyers and sellers have <strong>perfect information</strong>. In reality this often fails:
            </p>
            <ul>
              <li><strong>Sellers know more</strong>: a used-car seller knows whether the car has faults; a doctor knows more than the patient about what treatment is needed; a food producer knows what went into the product.</li>
              <li><strong>Buyers know more</strong>: someone buying insurance knows more than the insurer about their own health or driving; a borrower knows better than the bank whether they will repay.</li>
            </ul>
            <p>
              The less-informed party cannot judge the true value of the product, so they may overpay, buy a poor-quality product, or refuse to trade at all. Too much or too little is traded, resources are under- or over-allocated, and there is a welfare loss. The problems fall into two types by timing: adverse selection <strong>before</strong> the transaction and moral hazard <strong>after</strong> it.
            </p>
          </>
        ),
      },
    },
    {
      id: "adverse-selection",
      level: "both",
      title: { zh: "逆向选择", en: "Adverse selection" },
      body: {
        zh: (
          <>
            <Def term="Adverse selection">
              交易<strong>之前</strong>，一方掌握另一方不知道的隐藏信息（hidden information），使信息较少的一方最终更可能与「不好」的交易对象交易，劣质商品把优质商品挤出市场。
            </Def>
            <h3>卖方掌握更多信息：二手车「柠檬市场」</h3>
            <p>
              经济学家阿克洛夫（George Akerlof）1970 年用二手车市场说明这个问题（「lemon」指有毛病的车）。买家无法分辨好车和坏车，只愿意按平均质量出价。
            </p>
            <Callout title="例子：柠檬市场">
              <ol>
                <li>市场上一半是好车（真实价值 $10 000），一半是「柠檬」（真实价值 $4 000），只有卖家知道自己的车属于哪一种。</li>
                <li>买家分不清，最多只愿意付平均价值：½ × 10 000 + ½ × 4 000 = $7 000。</li>
                <li>好车车主觉得 $7 000 太低，退出市场；柠檬车主很乐意以 $7 000 卖出。</li>
                <li>买家意识到剩下的大多是柠檬，出价进一步下降……最终市场上主要只剩下柠檬，好车的交易几乎消失。</li>
              </ol>
              <p>结果：本来对买卖双方都有利的好车交易没有发生，优质商品消费不足，造成福利损失。</p>
            </Callout>
            <h3>买方掌握更多信息：保险市场</h3>
            <p>
              买健康保险的人比保险公司更了解自己的健康风险。如果保险公司按平均风险定价，健康的人觉得保费太贵而不买，愿意买的主要是高风险人群。保险公司赔付增加，只好提高保费，又把更多相对健康的人赶走。极端情况下保险市场会萎缩甚至消失，许多想买合理价格保险的低风险人群买不到。
            </p>
          </>
        ),
        en: (
          <>
            <Def term="Adverse selection">
              <strong>Before</strong> a transaction, one party has hidden information that the other lacks, so the less-informed party ends up more likely to trade with the bad type: low-quality products drive high-quality ones out of the market.
            </Def>
            <h3>When sellers know more: the market for lemons</h3>
            <p>
              The economist George Akerlof used the used-car market in 1970 to show this problem (a lemon is a faulty car). Buyers cannot tell good cars from bad, so they only offer a price based on average quality.
            </p>
            <Callout title="Example: the market for lemons">
              <ol>
                <li>Half the cars are good (worth $10 000) and half are lemons (worth $4 000). Only the sellers know which type they own.</li>
                <li>Buyers cannot tell them apart, so they will pay at most the average value: ½ × 10 000 + ½ × 4 000 = $7 000.</li>
                <li>Owners of good cars find $7 000 too low and withdraw; owners of lemons are happy to sell at $7 000.</li>
                <li>Buyers realise that most remaining cars are lemons, so their offers fall further… eventually mostly lemons are left and trade in good cars almost disappears.</li>
              </ol>
              <p>Result: trades in good cars that would have benefited both sides do not happen, good cars are under-consumed, and there is a welfare loss.</p>
            </Callout>
            <h3>When buyers know more: insurance markets</h3>
            <p>
              People buying health insurance know their own health risks better than the insurer. If the insurer charges a premium based on average risk, healthy people find it too expensive and do not buy, so buyers are mostly high-risk. Claims rise, so the insurer raises premiums, driving away more of the relatively healthy. In extreme cases the market shrinks or disappears, and many low-risk people cannot buy insurance at a fair price.
            </p>
          </>
        ),
      },
    },
    {
      id: "moral-hazard",
      level: "both",
      title: { zh: "道德风险", en: "Moral hazard" },
      body: {
        zh: (
          <>
            <Def term="Moral hazard">
              交易<strong>之后</strong>，一方的行为无法被另一方观察到（hidden action），并且这一方不用承担自身行为的全部后果，于是改变行为、承担更多风险，损失由另一方承担。
            </Def>
            <ul>
              <li><strong>保险</strong>：买了手机全险的人不再那么小心；有全额医疗保险的人更频繁地看医生或做不必要的检查。</li>
              <li><strong>银行业</strong>：如果银行相信自己「大到不能倒」（too big to fail），出事时政府会救助，它就有动机发放高风险贷款，赚了归自己，亏了由纳税人承担。这是 2008 年全球金融危机的原因之一。</li>
              <li><strong>雇佣关系</strong>：员工签约后，雇主无法时刻监督其工作努力程度。</li>
            </ul>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>逆向选择</th>
                  <th>道德风险</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>发生时间</td>
                  <td>交易前</td>
                  <td>交易后</td>
                </tr>
                <tr>
                  <td>隐藏的是什么</td>
                  <td>隐藏信息（类型、质量）</td>
                  <td>隐藏行为（努力、谨慎程度）</td>
                </tr>
                <tr>
                  <td>典型例子</td>
                  <td>二手车、高风险人群买保险</td>
                  <td>投保后不小心、银行过度冒险</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
        en: (
          <>
            <Def term="Moral hazard">
              <strong>After</strong> a transaction, one party&apos;s behaviour cannot be observed by the other (hidden action), and that party does not bear the full consequences of its actions, so it changes its behaviour and takes more risk, with the cost falling on the other party.
            </Def>
            <ul>
              <li><strong>Insurance</strong>: someone with full phone insurance is less careful with their phone; people with full health cover see doctors more often or have unnecessary tests.</li>
              <li><strong>Banking</strong>: if a bank believes it is too big to fail and the government will rescue it, it has an incentive to make risky loans, keeping the profits while taxpayers bear the losses. This was one cause of the 2008 global financial crisis.</li>
              <li><strong>Employment</strong>: once a worker is hired, the employer cannot monitor their effort all the time.</li>
            </ul>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Adverse selection</th>
                  <th>Moral hazard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Timing</td>
                  <td>Before the transaction</td>
                  <td>After the transaction</td>
                </tr>
                <tr>
                  <td>What is hidden</td>
                  <td>Hidden information (type, quality)</td>
                  <td>Hidden action (effort, care)</td>
                </tr>
                <tr>
                  <td>Typical examples</td>
                  <td>Used cars, high-risk people buying insurance</td>
                  <td>Carelessness once insured, banks taking excessive risk</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
    },
    {
      id: "government-responses",
      level: "both",
      title: { zh: "政府应对：立法与管制、提供信息", en: "Government responses: legislation and regulation, provision of information" },
      body: {
        zh: (
          <>
            <h3>立法与管制（Legislation and regulation）</h3>
            <ul>
              <li><strong>强制披露与标签</strong>：食品必须标明成分、营养和过敏原；药品必须标明副作用；贷款必须标明真实年利率。</li>
              <li><strong>消费者保护法</strong>：禁止虚假广告；二手车经销商必须如实说明车况，消费者有退货和保修权利。</li>
              <li><strong>职业资格与执照</strong>：医生、律师、会计师必须持证上岗，确保最低服务质量。</li>
              <li><strong>金融监管</strong>：禁止内幕交易；要求上市公司公开财务报表；2008 年后提高银行资本要求、进行压力测试，减少「大到不能倒」带来的道德风险。</li>
              <li><strong>强制保险</strong>：要求所有人都购买（如强制医疗保险、机动车第三者责任险），让低风险人群留在保险池中，减轻逆向选择。</li>
            </ul>
            <h3>提供信息（Provision of information）</h3>
            <p>
              政府自己收集并公开信息，例如学校考试成绩和督导报告、医院和餐厅的卫生评级、能效标签、空气质量指数、官方比价网站，帮助信息较少的一方做出更好的决定。
            </p>
            <Callout title="评价（Evaluation）">
              <ul>
                <li><strong>优点</strong>：提高消费者信心，使市场能正常运作；强制标准对所有企业一视同仁。</li>
                <li><strong>执行成本</strong>：监管需要大量人力物力去检查和执法，这有机会成本。</li>
                <li><strong>监管失灵</strong>：法规可能过时、有漏洞，或被行业「俘获」（regulatory capture）；过多的规定增加企业成本、阻碍新企业进入。</li>
                <li><strong>信息过载</strong>：即使提供了信息，消费者也可能看不懂或懒得看（见 2.4 行为经济学的有限理性）。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <h3>Legislation and regulation</h3>
            <ul>
              <li><strong>Compulsory disclosure and labelling</strong>: food must list ingredients, nutrition and allergens; medicines must list side effects; loans must state the true annual interest rate.</li>
              <li><strong>Consumer protection laws</strong>: bans on false advertising; used-car dealers must describe a car&apos;s condition honestly, and consumers have rights to refunds and warranties.</li>
              <li><strong>Professional qualifications and licensing</strong>: doctors, lawyers and accountants must be licensed, guaranteeing a minimum quality of service.</li>
              <li><strong>Financial regulation</strong>: bans on insider trading; listed companies must publish accounts; since 2008, higher capital requirements and stress tests for banks reduce the moral hazard of being too big to fail.</li>
              <li><strong>Compulsory insurance</strong>: requiring everyone to buy cover (e.g. compulsory health insurance or third-party motor insurance) keeps low-risk people in the pool and reduces adverse selection.</li>
            </ul>
            <h3>Provision of information</h3>
            <p>
              The government collects and publishes information itself, e.g. school results and inspection reports, hygiene ratings for hospitals and restaurants, energy-efficiency labels, air quality indices and official price-comparison websites, helping the less-informed party make better decisions.
            </p>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Strengths</strong>: raise consumer confidence so markets can work; mandatory standards apply equally to all firms.</li>
                <li><strong>Enforcement costs</strong>: inspection and enforcement need staff and money, which has an opportunity cost.</li>
                <li><strong>Regulatory failure</strong>: rules can be outdated, have loopholes, or be shaped by the industry they regulate (regulatory capture); too much regulation raises costs and deters new firms from entering.</li>
                <li><strong>Information overload</strong>: even when information is provided, consumers may not understand or read it (bounded rationality, see 2.4 Behavioural economics).</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "private-responses",
      level: "both",
      title: { zh: "私人应对：信号传递与筛选", en: "Private responses: signalling and screening" },
      body: {
        zh: (
          <>
            <Def term="Signalling">
              <strong>信息较多</strong>的一方主动采取行动，向信息较少的一方证明自己的质量。信号要可信，必须是低质量的一方难以模仿或模仿代价很高的。
            </Def>
            <ul>
              <li>卖家提供保修（warranty）和退货承诺：只有对产品有信心的卖家才敢长期保修。</li>
              <li>建立品牌和声誉；在线平台上的评分和评价。</li>
              <li>求职者用学历、证书（如 IB 文凭）向雇主传递能力信号。</li>
              <li>二手车经销商提供第三方检测报告和「认证二手车」。</li>
            </ul>
            <Def term="Screening">
              <strong>信息较少</strong>的一方主动采取行动，筛选出对方的真实类型或促使对方披露信息。
            </Def>
            <ul>
              <li>保险公司要求体检、询问病史，根据年龄、驾驶记录设定不同保费；提供多种方案（高免赔额低保费 vs 低免赔额高保费），让投保人通过自己的选择暴露风险类型。</li>
              <li>保险中的免赔额（deductible）、共同支付和无赔款优待（no-claims bonus），让投保人承担一部分损失，减少道德风险。</li>
              <li>银行查看信用记录、要求抵押品；雇主进行面试、能力测试和试用期。</li>
              <li>买家请独立机械师检查二手车。</li>
            </ul>
            <Callout title="评价（Evaluation）">
              <ul>
                <li><strong>优点</strong>：由市场自身解决，不需要税收或政府执法；企业有动力保持声誉。</li>
                <li><strong>成本</strong>：发信号和筛选都有成本（教育、体检、检测费），这些成本最终常常转嫁给消费者。</li>
                <li><strong>不完全有效</strong>：信号可能被伪造（假评价、假证书）；筛选只能减少而不能消除信息差距。</li>
                <li><strong>公平问题</strong>：筛选可能让高风险人群（如有慢性病的人）买不到保险或保费极高，这时可能还需要政府介入。</li>
              </ul>
            </Callout>
            <Callout title="考试提示">
              <p>
                区分两者的关键是看<strong>谁</strong>采取行动：知道得多的一方「发信号」（signalling），知道得少的一方「做筛选」（screening）。评价时可以指出，在信息差距很大或后果很严重的市场（医疗、金融），私人应对往往不够，需要政府管制作补充。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Signalling">
              The <strong>better-informed</strong> party takes action to prove its quality to the less-informed party. To be credible, a signal must be hard or costly for low-quality types to copy.
            </Def>
            <ul>
              <li>Sellers offer warranties and return guarantees: only sellers confident in their product can afford long warranties.</li>
              <li>Building a brand and reputation; ratings and reviews on online platforms.</li>
              <li>Job applicants signal ability to employers with qualifications and certificates (e.g. the IB Diploma).</li>
              <li>Used-car dealers provide independent inspection reports and certified pre-owned cars.</li>
            </ul>
            <Def term="Screening">
              The <strong>less-informed</strong> party takes action to sort the other party by type or make them reveal information.
            </Def>
            <ul>
              <li>Insurers require medical checks, ask about medical history and set premiums by age or driving record; they offer a menu of policies (high excess with a low premium versus low excess with a high premium) so that buyers reveal their risk type through their choice.</li>
              <li>Excesses (deductibles), co-payments and no-claims bonuses make the insured bear part of any loss, reducing moral hazard.</li>
              <li>Banks check credit histories and ask for collateral; employers use interviews, aptitude tests and probation periods.</li>
              <li>Buyers pay an independent mechanic to inspect a used car.</li>
            </ul>
            <Callout title="Evaluation">
              <ul>
                <li><strong>Strengths</strong>: the market solves the problem itself, with no need for taxes or government enforcement; firms have an incentive to protect their reputation.</li>
                <li><strong>Costs</strong>: signalling and screening are costly (education, medical checks, inspections), and these costs are often passed on to consumers.</li>
                <li><strong>Not fully effective</strong>: signals can be faked (fake reviews, forged certificates), and screening narrows the information gap but does not close it.</li>
                <li><strong>Equity</strong>: screening can leave high-risk people (e.g. those with chronic illness) unable to buy insurance or facing very high premiums, which may call for government intervention.</li>
              </ul>
            </Callout>
            <Callout title="Exam tip">
              <p>
                To tell them apart, ask <strong>who</strong> acts: the better-informed party signals, the less-informed party screens. In evaluation, point out that where the information gap is large or the consequences severe (health care, finance), private responses are often not enough and need government regulation alongside them.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 2.10 Market failure: asymmetric information",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 16.1 The Problem of Imperfect Information and Asymmetric Information",
      href: "https://openstax.org/books/principles-economics-3e/pages/16-1-the-problem-of-imperfect-information-and-asymmetric-information",
    },
    {
      label: "OpenStax Principles of Economics 3e — 16.2 Insurance and Imperfect Information",
      href: "https://openstax.org/books/principles-economics-3e/pages/16-2-insurance-and-imperfect-information",
    },
    {
      label: "Economics Help — Asymmetric information problem",
      href: "https://www.economicshelp.org/blog/glossary/asymmetric-information/",
    },
  ],
};

export default notes;
