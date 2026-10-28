import type { ReactNode } from "react";
import type { TopicNotes } from "@/content/types";
import { Callout, Def, Formula } from "@/components/notes/blocks";
import { Arrow, Chart, Dot, Guide, Label, Line, atY, intersect, shift, type Seg } from "@/components/notes/Chart";

function CurrencyMarket({ variant, caption }: { variant: "deficit" | "inflow"; caption: ReactNode }) {
  if (variant === "deficit") {
    const D: Seg = [
      [10, 85],
      [88, 15],
    ];
    const S1: Seg = [
      [5, 15],
      [70, 85],
    ];
    const S2 = shift(S1, 18);
    const a = intersect(D, S1);
    const b = intersect(D, S2);
    return (
      <Chart x="Quantity of £" y="Exchange rate ($ per £)" caption={caption}>
        <Line points={D} label="D£" />
        <Line points={S1} label="S£₁" />
        <Line points={S2} label="S£₂" tone="alt" />
        <Guide at={a} x="Q₁" y="e₁" />
        <Guide at={b} x="Q₂" y="e₂" />
        <Arrow from={[atY(S1, 75)[0] + 2, 75]} to={[atY(S2, 75)[0] - 2, 75]} />
        <Dot at={a} />
        <Dot at={b} />
      </Chart>
    );
  }
  const D1: Seg = [
    [5, 85],
    [72, 15],
  ];
  const D2 = shift(D1, 18);
  const S: Seg = [
    [10, 15],
    [85, 85],
  ];
  const a = intersect(D1, S);
  const b = intersect(D2, S);
  return (
    <Chart x="Quantity of £" y="Exchange rate ($ per £)" caption={caption}>
      <Line points={S} label="S£" />
      <Line points={D1} label="D£₁" />
      <Line points={D2} label="D£₂" tone="alt" />
      <Guide at={a} x="Q₁" y="e₁" />
      <Guide at={b} x="Q₂" y="e₂" />
      <Arrow from={[atY(D1, 62)[0] + 2, 62]} to={[atY(D2, 62)[0] - 2, 62]} />
      <Dot at={a} />
      <Dot at={b} />
    </Chart>
  );
}

function JCurve({ caption }: { caption: ReactNode }) {
  return (
    <Chart x="Time" y="Current account balance" caption={caption}>
      <Line
        points={[
          [0, 55],
          [95, 55],
        ]}
        tone="muted"
        dashed
      />
      <Label at={[-1.5, 53.5]} anchor="end">
        0
      </Label>
      <Line
        points={[
          [5, 42],
          [15, 42],
        ]}
      />
      <Line
        points={[
          [15, 42],
          [28, 24],
          [58, 57],
          [75, 74],
          [90, 84],
        ]}
        smooth
        label="J-curve"
        labelOffset={[-30, -12]}
      />
      <Dot at={[15, 42]} label="Depreciation" labelOffset={[-10, -12]} />
      <Label at={[15, -6]} anchor="middle">
        t₀
      </Label>
      <Label at={[30, 14]} muted>
        Deficit worsens
      </Label>
      <Label at={[58, 40]} muted>
        PEDx + PEDm &gt; 1
      </Label>
      <Label at={[82, 59]} muted>
        Surplus
      </Label>
      <Label at={[82, 48]} muted>
        Deficit
      </Label>
    </Chart>
  );
}

const notes: TopicNotes = {
  summary: {
    zh: "国际收支（BoP）记录一国居民与世界其他地区在一定时期内的全部经济交易，分为经常账户、资本账户和金融账户，三者合计永远为零。HL 还要分析经常账户与汇率、金融账户与汇率的关系，持续经常账户赤字与盈余的后果，纠正赤字的方法，以及马歇尔–勒纳条件与 J 曲线。",
    en: "The balance of payments (BoP) records all economic transactions between a country's residents and the rest of the world over a period. It has a current, a capital and a financial account, which always sum to zero. HL also covers the links between the current and financial accounts and the exchange rate, the consequences of persistent current account deficits and surpluses, methods to correct a deficit, and the Marshall-Lerner condition and J-curve.",
  },
  sections: [
    {
      id: "meaning",
      level: "both",
      title: { zh: "国际收支：借方、贷方与账户差额", en: "The balance of payments: credits, debits and balances" },
      body: {
        zh: (
          <>
            <Def term="Balance of payments">
              在一定时期内（通常一年），一国居民与世界其他国家居民之间全部经济交易的记录。
            </Def>
            <Def term="Credit item">
              使外汇（外国货币）<strong>流入</strong>本国的交易，记为正号（+），例如出口商品、外国游客来本国旅游、外国人投资本国企业。
            </Def>
            <Def term="Debit item">
              使本国货币<strong>流出</strong>到国外的交易，记为负号（−），例如进口、本国居民出国旅游、本国企业到海外投资。
            </Def>
            <p>
              每个账户都可以计算差额：贷方合计 &gt; 借方合计，就是该账户<strong>盈余</strong>（surplus）；贷方合计 &lt; 借方合计，就是<strong>赤字</strong>（deficit）。例如「经常账户赤字」指经常账户的借方大于贷方。
            </p>
            <Callout title="考试提示">
              <p>
                判断借贷的简单方法：问自己「这笔交易让钱流进本国，还是流出本国？」流入 = 贷方（+），流出 = 借方（−）。注意方向是看<strong>钱</strong>，不是看商品：进口商品流入，但钱流出，所以是借方。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Balance of payments">
              A record of all economic transactions between the residents of one country and the residents of the rest of the world over a given period, usually a year.
            </Def>
            <Def term="Credit item">
              A transaction that brings foreign currency <strong>into</strong> the country, recorded with a plus sign, e.g. exports, spending by foreign tourists, foreign investment in domestic firms.
            </Def>
            <Def term="Debit item">
              A transaction that sends money <strong>out of</strong> the country, recorded with a minus sign, e.g. imports, residents holidaying abroad, domestic firms investing overseas.
            </Def>
            <p>
              Each account has a balance: if credits exceed debits the account is in <strong>surplus</strong>; if debits exceed credits it is in <strong>deficit</strong>. A current account deficit, for example, means current account debits are greater than current account credits.
            </p>
            <Callout title="Exam tip">
              <p>
                To classify an item, ask whether it makes money flow into or out of the country. Inflow = credit (+), outflow = debit (−). Follow the <strong>money</strong>, not the goods: imported goods come in, but money goes out, so imports are a debit.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "components",
      level: "both",
      title: { zh: "国际收支的组成部分", en: "Components of the balance of payments" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>账户</th>
                  <th>组成部分</th>
                  <th>例子</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={4}>
                    <strong>经常账户</strong>
                    <br />
                    Current account
                  </td>
                  <td>商品贸易差额（balance of trade in goods）</td>
                  <td>汽车、石油、大豆等有形商品的出口减进口</td>
                </tr>
                <tr>
                  <td>服务贸易差额（balance of trade in services）</td>
                  <td>旅游、运输、金融、教育（留学生学费）等无形服务的出口减进口</td>
                </tr>
                <tr>
                  <td>收入（income）</td>
                  <td>从海外获得的工资、利息、利润、股息，减去支付给外国人的部分</td>
                </tr>
                <tr>
                  <td>经常转移（current transfers）</td>
                  <td>侨汇（remittances）、对外援助、向国际组织缴纳的会费等单方面转移</td>
                </tr>
                <tr>
                  <td rowSpan={2}>
                    <strong>资本账户</strong>
                    <br />
                    Capital account
                  </td>
                  <td>资本转移（capital transfers）</td>
                  <td>债务减免、移民带走或带来的资产、为建设项目提供的拨款</td>
                </tr>
                <tr>
                  <td>非生产非金融资产交易（transactions in non-produced, non-financial assets）</td>
                  <td>买卖土地使用权（如外国使馆用地）、专利、版权、商标</td>
                </tr>
                <tr>
                  <td rowSpan={4}>
                    <strong>金融账户</strong>
                    <br />
                    Financial account
                  </td>
                  <td>外国直接投资（FDI）</td>
                  <td>外国企业在本国建厂或取得本国企业的控制性股权（通常 ≥10%）</td>
                </tr>
                <tr>
                  <td>证券投资（portfolio investment）</td>
                  <td>购买股票、债券等金融资产，但不取得控制权</td>
                </tr>
                <tr>
                  <td>储备资产（reserve assets）</td>
                  <td>央行持有的外汇和黄金；动用储备记为贷方（+），增加储备记为借方（−）</td>
                </tr>
                <tr>
                  <td>官方借款（official borrowing）</td>
                  <td>政府或央行向外国政府、IMF 等借款</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>贸易差额</strong>（balance of trade）= 商品贸易差额 + 服务贸易差额，是经常账户中最大的部分。媒体所说的「贸易逆差」通常指它为负。
            </p>
            <Callout title="例子">
              <p>
                菲律宾、尼泊尔等国有大量海外劳工，他们寄回家的侨汇是经常转移的重要贷方项目；英国长期商品贸易逆差，但金融服务出口带来服务贸易顺差。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Component</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={4}>
                    <strong>Current account</strong>
                  </td>
                  <td>Balance of trade in goods</td>
                  <td>Exports minus imports of tangible goods such as cars, oil, soybeans</td>
                </tr>
                <tr>
                  <td>Balance of trade in services</td>
                  <td>Exports minus imports of intangibles such as tourism, transport, finance, education (fees of foreign students)</td>
                </tr>
                <tr>
                  <td>Income</td>
                  <td>Wages, interest, profits and dividends earned abroad, minus those paid to foreigners</td>
                </tr>
                <tr>
                  <td>Current transfers</td>
                  <td>One-way transfers such as remittances, foreign aid, contributions to international organisations</td>
                </tr>
                <tr>
                  <td rowSpan={2}>
                    <strong>Capital account</strong>
                  </td>
                  <td>Capital transfers</td>
                  <td>Debt forgiveness, assets carried by migrants, grants for capital projects</td>
                </tr>
                <tr>
                  <td>Transactions in non-produced, non-financial assets</td>
                  <td>Buying or selling land rights (e.g. for embassies), patents, copyrights, trademarks</td>
                </tr>
                <tr>
                  <td rowSpan={4}>
                    <strong>Financial account</strong>
                  </td>
                  <td>Foreign direct investment (FDI)</td>
                  <td>A foreign firm building a factory or acquiring a controlling stake (usually ≥10%) in a domestic firm</td>
                </tr>
                <tr>
                  <td>Portfolio investment</td>
                  <td>Buying shares and bonds without gaining control of the firm</td>
                </tr>
                <tr>
                  <td>Reserve assets</td>
                  <td>Foreign currency and gold held by the central bank; drawing reserves down is a credit (+), adding to them is a debit (−)</td>
                </tr>
                <tr>
                  <td>Official borrowing</td>
                  <td>Borrowing by the government or central bank from foreign governments or the IMF</td>
                </tr>
              </tbody>
            </table>
            <p>
              The <strong>balance of trade</strong> = balance of trade in goods + balance of trade in services. It is usually the largest part of the current account, and a trade deficit in the news normally means this figure is negative.
            </p>
            <Callout title="Real-world example">
              <p>
                In countries with many workers abroad, such as the Philippines and Nepal, remittances are a major current transfer credit. The UK runs a persistent deficit on trade in goods but a surplus on trade in services, largely from financial services.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "interdependence",
      level: "both",
      title: { zh: "账户之间的相互依存", en: "Interdependence between the accounts" },
      body: {
        zh: (
          <>
            <p>
              国际收支采用复式记账：每一笔交易都同时产生一笔贷方和一笔借方，因此<strong>贷方总额必然等于借方总额</strong>，整个国际收支的总差额为零。
            </p>
            <Formula>经常账户 + 资本账户 + 金融账户 + 误差与遗漏 = 0</Formula>
            <p>
              这意味着一个账户的赤字必须由其他账户的盈余抵消。最常见的情况是：<strong>经常账户赤字 ≈ 资本与金融账户盈余</strong>。直观理解：一国进口多于出口时，需要靠外国资本流入（外国人购买本国资产、本国向外国借款）或动用外汇储备来支付。反之，经常账户盈余的国家（如德国、中国）会在金融账户上表现为资本流出，即积累海外资产。
            </p>
            <Def term="Net errors and omissions">
              由于统计数据不完整、记录时间不一致而加入的平衡项，使国际收支总额等于零。
            </Def>
            <Callout title="考试提示">
              <p>
                「国际收支平衡」是会计意义上的恒等式，<strong>不代表</strong>经济健康。真正值得关注的是各个账户的结构，例如经常账户赤字是靠长期 FDI 还是短期借款来融资。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              The BoP uses double-entry bookkeeping: every transaction creates both a credit and a debit, so <strong>total credits equal total debits</strong> and the overall balance is zero.
            </p>
            <Formula>current account + capital account + financial account + errors and omissions = 0</Formula>
            <p>
              A deficit on one account must therefore be matched by a surplus elsewhere. Typically, <strong>a current account deficit is matched by a capital and financial account surplus</strong>. Intuitively, a country that imports more than it exports pays for the difference with capital inflows (foreigners buying domestic assets, borrowing from abroad) or by running down reserves. A country with a current account surplus, such as Germany or China, shows a matching outflow on the financial account as it builds up assets abroad.
            </p>
            <Def term="Net errors and omissions">
              A balancing item added because of incomplete data and timing differences, so that the BoP sums to zero.
            </Def>
            <Callout title="Exam tip">
              <p>
                The BoP balancing is an accounting identity and says <strong>nothing</strong> about economic health. What matters is the structure, e.g. whether a current account deficit is financed by long-term FDI or by short-term borrowing.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "calculation",
      level: "both",
      title: { zh: "计算：从数据求国际收支各项", en: "Calculation: BoP elements from a set of data" },
      body: {
        zh: (
          <>
            <p>某国一年的数据如下（单位：十亿美元）：</p>
            <table>
              <thead>
                <tr>
                  <th>项目</th>
                  <th>数值</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>商品出口 / 商品进口</td><td>120 / 150</td></tr>
                <tr><td>服务出口 / 服务进口</td><td>60 / 40</td></tr>
                <tr><td>收入：流入 / 流出</td><td>15 / 25</td></tr>
                <tr><td>经常转移：流入 / 流出</td><td>5 / 10</td></tr>
                <tr><td>资本账户（净额）</td><td>+2</td></tr>
                <tr><td>FDI（净额）</td><td>+10</td></tr>
                <tr><td>证券投资（净额）</td><td>+8</td></tr>
                <tr><td>官方借款（净额）</td><td>+3</td></tr>
                <tr><td>储备资产（央行动用储备）</td><td>+1</td></tr>
              </tbody>
            </table>
            <ol>
              <li>商品贸易差额 = 120 − 150 = <strong>−30</strong></li>
              <li>服务贸易差额 = 60 − 40 = <strong>+20</strong>；贸易差额 = −30 + 20 = <strong>−10</strong></li>
              <li>收入差额 = 15 − 25 = −10；经常转移差额 = 5 − 10 = −5</li>
              <li>经常账户 = −30 + 20 − 10 − 5 = <strong>−25</strong>（赤字）</li>
              <li>金融账户 = 10 + 8 + 3 + 1 = <strong>+22</strong></li>
              <li>误差与遗漏 = −(−25 + 2 + 22) = <strong>+1</strong></li>
            </ol>
            <p>检验：−25 + 2 + 22 + 1 = 0。经常账户赤字 25 由资本与金融账户盈余 24 加上 1 的误差与遗漏抵消。</p>
            <Callout title="考试提示">
              <p>
                题目常让你求「缺失项」：利用总和为零反推即可。一定要写出公式和每一步，并注明单位和正负号。IB 采用「流入为正、流出为负」的记法；IMF 的统计表对金融账户用另一种符号约定，做题时以题目给出的约定为准。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>A country has the following annual data ($ billion):</p>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Exports of goods / imports of goods</td><td>120 / 150</td></tr>
                <tr><td>Exports of services / imports of services</td><td>60 / 40</td></tr>
                <tr><td>Income: inflows / outflows</td><td>15 / 25</td></tr>
                <tr><td>Current transfers: inflows / outflows</td><td>5 / 10</td></tr>
                <tr><td>Capital account (net)</td><td>+2</td></tr>
                <tr><td>FDI (net)</td><td>+10</td></tr>
                <tr><td>Portfolio investment (net)</td><td>+8</td></tr>
                <tr><td>Official borrowing (net)</td><td>+3</td></tr>
                <tr><td>Reserve assets (central bank draws down reserves)</td><td>+1</td></tr>
              </tbody>
            </table>
            <ol>
              <li>Balance of trade in goods = 120 − 150 = <strong>−30</strong></li>
              <li>Balance of trade in services = 60 − 40 = <strong>+20</strong>; balance of trade = −30 + 20 = <strong>−10</strong></li>
              <li>Income balance = 15 − 25 = −10; current transfers balance = 5 − 10 = −5</li>
              <li>Current account = −30 + 20 − 10 − 5 = <strong>−25</strong> (deficit)</li>
              <li>Financial account = 10 + 8 + 3 + 1 = <strong>+22</strong></li>
              <li>Errors and omissions = −(−25 + 2 + 22) = <strong>+1</strong></li>
            </ol>
            <p>Check: −25 + 2 + 22 + 1 = 0. The current account deficit of 25 is matched by a capital and financial account surplus of 24 plus errors and omissions of 1.</p>
            <Callout title="Exam tip">
              <p>
                Questions often ask for a missing item: use the fact that the total is zero and work backwards. Show the formula and every step, with units and signs. The IB uses the convention inflows = plus, outflows = minus; IMF tables use a different sign convention for the financial account, so always follow the convention given in the question.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "exchange-rate-links",
      level: "hl",
      title: { zh: "经常账户、金融账户与汇率的关系", en: "The current account, the financial account and the exchange rate" },
      body: {
        zh: (
          <>
            <p>
              <strong>经常账户与汇率</strong>：出口（贷方）产生对本币的需求，进口（借方）产生本币的供给。若进口增长快于出口、经常账户赤字扩大，外汇市场上本币供给增加（或需求减少），本币<strong>贬值</strong>（浮动汇率下）。
            </p>
            <CurrencyMarket
              variant="deficit"
              caption="图 1 经常账户赤字扩大：英国居民进口增加，英镑供给从 S£₁ 增加到 S£₂，汇率从 e₁ 降至 e₂（英镑贬值）。"
            />
            <p>
              反过来，汇率也会影响经常账户：本币贬值让出口变便宜、进口变贵，<strong>长期</strong>有助于缩小经常账户赤字（前提是满足马歇尔–勒纳条件，见下文）；本币升值则会削弱出口竞争力，使经常账户恶化。
            </p>
            <p>
              <strong>金融账户与汇率</strong>：外国人在本国进行 FDI 或证券投资时，需要先买入本币，本币需求增加，本币<strong>升值</strong>。例如本国提高利率，吸引「热钱」（hot money）流入，金融账户盈余扩大、本币升值；资本外逃时则相反，本币贬值。
            </p>
            <CurrencyMarket
              variant="inflow"
              caption="图 2 金融账户资本流入：外国投资者购买英国资产，英镑需求从 D£₁ 增加到 D£₂，汇率从 e₁ 升至 e₂（英镑升值）。"
            />
            <Callout title="考试提示">
              <p>
                注意两个账户的联动：金融账户流入使本币升值，会使出口变贵、进口变便宜，从而<strong>扩大</strong>经常账户赤字，这与「赤字由金融账户盈余抵消」一致。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>
              <strong>Current account and the exchange rate</strong>: exports (credits) create demand for the domestic currency and imports (debits) create supply of it. If imports grow faster than exports and the current account deficit widens, the supply of the currency rises (or demand falls) and, under a floating system, the currency <strong>depreciates</strong>.
            </p>
            <CurrencyMarket
              variant="deficit"
              caption="Figure 1 A widening current account deficit: UK residents import more, so the supply of pounds rises from S£₁ to S£₂ and the exchange rate falls from e₁ to e₂ (the pound depreciates)."
            />
            <p>
              The causation also runs the other way: a depreciation makes exports cheaper and imports dearer, which <strong>in the long run</strong> helps reduce a current account deficit (if the Marshall-Lerner condition holds, see below). An appreciation erodes export competitiveness and worsens the current account.
            </p>
            <p>
              <strong>Financial account and the exchange rate</strong>: foreigners making FDI or portfolio investments must first buy the domestic currency, so demand for it rises and it <strong>appreciates</strong>. For example, a rise in domestic interest rates attracts hot money, the financial account surplus grows and the currency appreciates; capital flight does the opposite.
            </p>
            <CurrencyMarket
              variant="inflow"
              caption="Figure 2 Financial account inflows: foreign investors buy UK assets, so demand for pounds rises from D£₁ to D£₂ and the exchange rate rises from e₁ to e₂ (the pound appreciates)."
            />
            <Callout title="Exam tip">
              <p>
                Link the two accounts: financial inflows appreciate the currency, which makes exports dearer and imports cheaper and so <strong>widens</strong> the current account deficit. This is consistent with a deficit being matched by a financial account surplus.
              </p>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "persistent-deficit",
      level: "hl",
      title: { zh: "持续经常账户赤字：后果与纠正方法", en: "Persistent current account deficits: implications and correction" },
      body: {
        zh: (
          <>
            <p>短期赤字问题不大（例如为进口资本品而借款），但<strong>持续</strong>的经常账户赤字可能带来：</p>
            <table>
              <thead>
                <tr>
                  <th>方面</th>
                  <th>可能的后果</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>汇率 Exchange rates</td><td>本币持续面临贬值压力；固定汇率下需耗用外汇储备维持汇率。</td></tr>
                <tr><td>利率 Interest rates</td><td>为吸引资本流入以弥补赤字，或为阻止贬值，央行可能需要维持较高利率，抑制投资与消费。</td></tr>
                <tr><td>外资拥有本国资产 Foreign ownership of domestic assets</td><td>赤字靠出售本国资产（企业、房地产、债券）融资，未来利润和利息流向海外，使收入项恶化；还可能引发对战略产业控制权的担忧。</td></tr>
                <tr><td>债务 Debt</td><td>靠借款融资会累积外债，利息支出增加；若以外币计价，本币贬值会加重债务负担。</td></tr>
                <tr><td>信用评级 Credit ratings</td><td>评级机构可能下调评级，借款成本上升，甚至出现资本突然撤离。</td></tr>
                <tr><td>需求管理 Demand management</td><td>政府可能被迫采取紧缩性财政或货币政策来压缩进口，与降低失业等目标冲突。</td></tr>
                <tr><td>经济增长 Economic growth</td><td>净出口为负拉低总需求；紧缩政策和高利率也会抑制长期增长。但若赤字源于进口资本品，未来产能反而会提高。</td></tr>
              </tbody>
            </table>
            <p><strong>纠正持续赤字的方法：</strong></p>
            <Def term="Expenditure switching policies">
              让国内外消费者把支出从进口品<strong>转向</strong>本国产品的政策：关税、配额等贸易保护，出口补贴，或让本币贬值 / 法定贬值（devaluation）。
            </Def>
            <Def term="Expenditure reducing policies">
              通过紧缩性财政政策（加税、削减政府支出）或紧缩性货币政策（加息）<strong>减少</strong>总需求，从而减少进口支出。
            </Def>
            <Def term="Supply-side policies">
              提高生产率和产品质量、降低成本，从根本上提升出口竞争力，例如投资教育培训、基础设施、研发，以及放松管制。
            </Def>
            <Callout title="评价：这些方法的有效性">
              <ul>
                <li><strong>支出转换</strong>：贸易保护可能招致报复、违反 WTO 规则，降低效率并抬高国内物价；贬值只有满足马歇尔–勒纳条件才有效，且短期内会出现 J 曲线效应，还会推高进口成本引发通胀。</li>
                <li><strong>支出减少</strong>：能较快压缩进口，但代价是经济增长放缓、失业上升；如果赤字源于缺乏竞争力，问题并未解决。</li>
                <li><strong>供给侧政策</strong>：解决根源、不牺牲增长，但见效慢（往往需要多年）、成本高，且结果不确定。</li>
                <li>效果还取决于赤字原因：是周期性的（经济过热）还是结构性的（产业缺乏竞争力）。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <p>A short-term deficit is not necessarily a problem (e.g. borrowing to import capital goods), but a <strong>persistent</strong> current account deficit may have these implications:</p>
            <table>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Possible implications</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Exchange rates</td><td>Constant downward pressure on the currency; under a fixed system, reserves are used up defending the rate.</td></tr>
                <tr><td>Interest rates</td><td>The central bank may have to keep interest rates high to attract inflows that finance the deficit or to stop depreciation, which discourages investment and consumption.</td></tr>
                <tr><td>Foreign ownership of domestic assets</td><td>If the deficit is financed by selling firms, property and bonds to foreigners, future profits and interest flow abroad, worsening the income balance; there may be concerns about control of strategic industries.</td></tr>
                <tr><td>Debt</td><td>Borrowing builds up foreign debt and interest payments; if the debt is in foreign currency, a depreciation raises its burden.</td></tr>
                <tr><td>Credit ratings</td><td>Rating agencies may downgrade the country, raising borrowing costs and risking a sudden stop in capital inflows.</td></tr>
                <tr><td>Demand management</td><td>The government may be forced into contractionary fiscal or monetary policy to cut imports, conflicting with goals such as low unemployment.</td></tr>
                <tr><td>Economic growth</td><td>Negative net exports reduce AD, and contractionary policy and high interest rates hold back growth. However, if the deficit reflects imports of capital goods, future productive capacity may rise.</td></tr>
              </tbody>
            </table>
            <p><strong>Methods to correct a persistent deficit:</strong></p>
            <Def term="Expenditure switching policies">
              Policies that <strong>switch</strong> domestic and foreign spending away from imports and towards domestic output: tariffs, quotas and other protection, export subsidies, or a depreciation / devaluation of the currency.
            </Def>
            <Def term="Expenditure reducing policies">
              Contractionary fiscal policy (higher taxes, lower government spending) or contractionary monetary policy (higher interest rates) that <strong>reduce</strong> AD and therefore spending on imports.
            </Def>
            <Def term="Supply-side policies">
              Policies that raise productivity and quality and lower costs, improving export competitiveness at its root, e.g. investment in education and training, infrastructure, R&amp;D, and deregulation.
            </Def>
            <Callout title="Evaluation: effectiveness of the measures">
              <ul>
                <li><strong>Expenditure switching</strong>: protection invites retaliation, may break WTO rules, reduces efficiency and raises domestic prices. A depreciation works only if the Marshall-Lerner condition holds, suffers from the J-curve in the short run, and raises import costs and inflation.</li>
                <li><strong>Expenditure reducing</strong>: cuts imports fairly quickly, but at the cost of slower growth and higher unemployment, and does not fix a lack of competitiveness.</li>
                <li><strong>Supply-side policies</strong>: tackle the root cause without sacrificing growth, but are slow (often years), costly and uncertain.</li>
                <li>Effectiveness depends on the cause of the deficit: cyclical (an overheating economy) or structural (uncompetitive industries).</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "marshall-lerner",
      level: "hl",
      title: { zh: "马歇尔–勒纳条件与 J 曲线效应", en: "The Marshall-Lerner condition and the J-curve effect" },
      body: {
        zh: (
          <>
            <Def term="Marshall-Lerner condition">
              本币贬值要改善经常账户（贸易差额），出口需求价格弹性与进口需求价格弹性之和必须<strong>大于 1</strong>。
            </Def>
            <Formula>|PEDx| + |PEDm| &gt; 1</Formula>
            <p>
              原因：贬值后，以外币计的出口价格下降，以本币计的进口价格上升。如果需求缺乏弹性，出口量增加很少，而进口量几乎不减，每单位进口却更贵，进口支出反而上升，贸易差额恶化。只有需求足够有弹性，出口收入的增加和进口支出的减少才能超过价格效应。
            </p>
            <Def term="J-curve effect">
              本币贬值后，经常账户在短期内先<strong>恶化</strong>、经过一段时间后才改善的现象，画出来像字母 J。
            </Def>
            <p>
              短期内需求缺乏弹性：已签订的合同无法马上更改，消费者和企业需要时间寻找替代品、改变习惯，所以马歇尔–勒纳条件暂时不满足，赤字扩大。随着时间推移，需求弹性变大，条件得到满足，经常账户开始改善，最终超过原来的水平。
            </p>
            <JCurve caption="图 3 J 曲线：t₀ 时本币贬值，短期内需求缺乏弹性，经常账户赤字先扩大；随着出口和进口需求弹性增大（PEDx + PEDm > 1），经常账户逐步改善并转为盈余。" />
            <Callout title="画图要点">
              <ul>
                <li>纵轴为经常账户差额，画一条虚线表示「0」（平衡），上方为盈余，下方为赤字；横轴为时间。</li>
                <li>标出贬值发生的时点，曲线先下降后上升，穿过零线。</li>
                <li>文字中把「下降段」和「上升段」分别与马歇尔–勒纳条件不满足 / 满足联系起来。</li>
              </ul>
            </Callout>
          </>
        ),
        en: (
          <>
            <Def term="Marshall-Lerner condition">
              A depreciation will improve the current account (trade balance) only if the sum of the price elasticities of demand for exports and imports is <strong>greater than 1</strong>.
            </Def>
            <Formula>|PEDx| + |PEDm| &gt; 1</Formula>
            <p>
              After a depreciation, export prices fall in foreign currency and import prices rise in domestic currency. If demand is inelastic, export volumes rise only slightly and import volumes barely fall, yet each import costs more, so import spending rises and the trade balance worsens. Only if demand is elastic enough do the volume effects outweigh the price effect.
            </p>
            <Def term="J-curve effect">
              The tendency for the current account to <strong>worsen</strong> in the short run after a depreciation before improving over time, tracing the shape of a J.
            </Def>
            <p>
              In the short run demand is inelastic: existing contracts cannot be changed at once, and consumers and firms need time to find substitutes and change habits. The Marshall-Lerner condition is not yet met and the deficit widens. Over time demand becomes more elastic, the condition is met and the current account improves, eventually beyond its original level.
            </p>
            <JCurve caption="Figure 3 The J-curve: the currency depreciates at t₀. With inelastic demand in the short run the deficit first widens; as the elasticities of demand for exports and imports rise (PEDx + PEDm > 1), the current account improves and moves into surplus." />
            <Callout title="Drawing checklist">
              <ul>
                <li>Vertical axis: current account balance, with a dashed zero line (surplus above, deficit below); horizontal axis: time.</li>
                <li>Mark when the depreciation happens; the curve falls first, then rises through the zero line.</li>
                <li>In your explanation, link the falling part to the Marshall-Lerner condition not being met and the rising part to it being met.</li>
              </ul>
            </Callout>
          </>
        ),
      },
    },
    {
      id: "persistent-surplus",
      level: "hl",
      title: { zh: "持续经常账户盈余的后果", en: "Implications of a persistent current account surplus" },
      body: {
        zh: (
          <>
            <table>
              <thead>
                <tr>
                  <th>方面</th>
                  <th>可能的后果</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>国内消费与投资 Domestic consumption and investment</td><td>盈余意味着本国生产的一部分被出口而非在国内使用，资本也流向海外；本国居民的消费和国内投资可能低于应有水平（机会成本）。</td></tr>
                <tr><td>汇率 Exchange rates</td><td>对本币的需求持续较高，本币面临升值压力；若政府压低汇率，可能被贸易伙伴指责为「汇率操纵」。</td></tr>
                <tr><td>通货膨胀 Inflation</td><td>净出口增加推高总需求，接近充分就业时会引发需求拉动型通胀。</td></tr>
                <tr><td>就业 Employment</td><td>出口行业扩张，创造就业；但经济过度依赖外需，一旦外需下降就业会受冲击。</td></tr>
                <tr><td>出口竞争力 Export competitiveness</td><td>本币升值和通胀会抬高出口价格，长期削弱出口竞争力，使盈余自行缩小。</td></tr>
              </tbody>
            </table>
            <Callout title="评价">
              <p>
                盈余并不一定「好」。一国的盈余必然对应其他国家的赤字，可能加剧全球失衡和贸易摩擦（例如美国与中国、欧元区与德国之间的争论）。盈余是来自高效的出口产业，还是来自国内需求疲弱、储蓄过高，评价结论会截然不同。
              </p>
            </Callout>
          </>
        ),
        en: (
          <>
            <table>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Possible implications</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Domestic consumption and investment</td><td>Part of domestic output is exported rather than used at home, and capital flows abroad, so household consumption and domestic investment may be lower than they could be (an opportunity cost).</td></tr>
                <tr><td>Exchange rates</td><td>Persistently high demand for the currency puts upward pressure on it; if the government holds it down, trading partners may accuse it of currency manipulation.</td></tr>
                <tr><td>Inflation</td><td>Higher net exports raise AD, which can cause demand-pull inflation near full employment.</td></tr>
                <tr><td>Employment</td><td>Export industries expand and create jobs, but the economy becomes dependent on foreign demand, so jobs are vulnerable if it falls.</td></tr>
                <tr><td>Export competitiveness</td><td>Appreciation and inflation raise export prices, eroding competitiveness over time and tending to shrink the surplus.</td></tr>
              </tbody>
            </table>
            <Callout title="Evaluation">
              <p>
                A surplus is not automatically good. One country&apos;s surplus is another&apos;s deficit, so surpluses can add to global imbalances and trade tensions (e.g. debates between the US and China, or within the eurozone about Germany). The judgement depends on whether the surplus comes from efficient export industries or from weak domestic demand and excess saving.
              </p>
            </Callout>
          </>
        ),
      },
    },
  ],
  sources: [
    {
      label: "IBO — Economics guide (first assessment 2022), 4.6 Balance of payments",
      href: "https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/",
    },
    {
      label: "Economics Help — Balance of payments",
      href: "https://www.economicshelp.org/blog/2132/economics/balance-of-payments/",
    },
    {
      label: "Economics Help — Marshall-Lerner condition",
      href: "https://www.economicshelp.org/blog/1462/trade/marshall-lerner-condition/",
    },
    {
      label: "OpenStax Principles of Economics 3e — 23.2 Trade Balances in Historical and International Context",
      href: "https://openstax.org/books/principles-economics-3e/pages/23-2-trade-balances-in-historical-and-international-context",
    },
  ],
};

export default notes;
