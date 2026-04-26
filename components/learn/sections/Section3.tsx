"use client";

import {
  SectionTabs,
  Prose,
  H3,
  KeyPoint,
  ComparisonTable,
  Em,
  Hl,
} from "../SectionTabs";
import { MiningSimulator } from "@/components/mining/MiningSimulator";

export function Section3() {
  return (
    <SectionTabs
      step={3}
      pages={[
        {
          label: "直觉",
          subtitle: "为什么「证明你花了力气」很重要",
          content: (
            <Prose>
              <p>
                上一章哈希链的局限是：<Em>"重算"几乎没有成本</Em>。
                所以攻击者能伪造一份从某点开始的"假账本"。
              </p>
              <p>
                解法听起来简单——<Hl>让"算一个区块"非常昂贵</Hl>。
                贵到攻击者的伪造成本远高于他能从中获得的收益。
              </p>

              <H3>现实世界里到处都有"工作量证明"</H3>
              <KeyPoint label="一些你天天看到的例子">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>大学文凭</Em>：证明你花了 4 年时间 + 学费，过了考试
                  </li>
                  <li>
                    <Em>健身身材</Em>：证明你花了成百上千小时在健身房
                  </li>
                  <li>
                    <Em>米其林餐厅</Em>：证明主厨经过长年训练、菜品和服务复杂到难复制
                  </li>
                  <li>
                    <Em>验证码 (CAPTCHA)</Em>：证明你是人，不是机器（机器要付出 AI 算力）
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  共同特点：<Em>伪造需要付出和真实一样的代价</Em>。
                </p>
              </KeyPoint>

              <H3>BTC 版本</H3>
              <p>
                "我生成了一个合法区块"这件事本身，必须证明我付出了真实的算力。
                付出多少？多到攻击者重算所有历史区块的代价远超他能偷的钱。
              </p>

              <H3>关键反转：从"逻辑问题"到"物理问题"</H3>
              <p>
                这是 PoW 最精彩的设计——它把一个抽象问题转化了：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>原问题（抽象）</Em>：怎么让全网就"哪条历史是真的"达成共识？
                </li>
                <li>
                  <Em>转化后（物理）</Em>：哪条链累积的真实算力最多？
                </li>
              </ul>
              <p>
                抽象问题没法用数学定论，但<Hl>物理成本是可测量的</Hl>。
                这就是 PoW 对拜占庭将军问题的破解之道——
                绕开"谁说了算"的逻辑死结，
                让"谁烧了最多电"成为天然的真相仲裁者。
              </p>
            </Prose>
          ),
        },
        {
          label: "机制",
          subtitle: "哈希前导零和 nonce 穷举",
          content: (
            <Prose>
              <H3>规则设计</H3>
              <p>
                BTC 的 PoW 规则简单而残酷：
              </p>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>合法的区块哈希必须以足够多个 0 开头</Hl>——
                具体多少个 0 由"难度"参数决定。
              </p>

              <H3>关键：哈希是雪崩的，无法"设计"</H3>
              <p>
                你不能"算计出"一个前缀带 0 的哈希——
                输入改任何一位，输出就完全不可预测地变。
                所以唯一的办法是<Em>不停地试</Em>。
              </p>

              <H3>怎么试：给区块加一个 nonce 字段</H3>
              <p>
                区块数据里预留一个可随意修改的字段 <code>nonce</code>（一个 32 位整数）：
              </p>
              <KeyPoint label="区块结构（简化）">
                <pre className="font-hash text-[11px] leading-relaxed">
{`Block = {
  prevHash:    上一个区块的哈希
  merkleRoot:  本区块所有交易的 Merkle root
  timestamp:   时间戳
  difficulty:  当前难度目标
  nonce:       随便填一个数字  ← 矿工不停地改这个
}`}
                </pre>
              </KeyPoint>

              <H3>矿工干的活（伪代码）</H3>
              <pre className="font-hash text-[11px] p-3 rounded bg-[var(--card)] overflow-x-auto leading-relaxed">
{`while True:
    block.nonce += 1
    h = SHA256(SHA256(block))
    if h 以足够多个 0 开头:
        broadcast(block)   # 找到了！发出去
        break`}
              </pre>

              <p>
                没有捷径，<Em>只有暴力穷举</Em>。
                难度 = 要求的前导零个数。
                每多 1 个前导零，期望尝试次数<Hl>翻倍</Hl>。
              </p>

              <H3>动手感受一下</H3>
              <p>
                试着拖动 nonce 手动调，再点 Start Mining 看自动搜索。
                可以提升难度（更多前导零）感受时间消耗的指数级增长：
              </p>
              <div className="my-4">
                <MiningSimulator />
              </div>

              <H3>难度 → 真实算力的对照</H3>
              <ComparisonTable
                headers={["难度（前导零个数）", "期望尝试次数", "在普通笔记本上耗时"]}
                rows={[
                  ["1", "2¹ ≈ 2", "~0 秒"],
                  ["4", "2⁴ ≈ 16", "~0 秒"],
                  ["10", "2¹⁰ ≈ 1024", "~0.01 秒"],
                  ["20", "2²⁰ ≈ 100 万", "~10 秒"],
                  ["30", "2³⁰ ≈ 10 亿", "~3 小时"],
                  [<Hl key="real">BTC 真实 (~76 位)</Hl>, "~10²³", "普通电脑算到太阳熄灭"],
                ]}
              />

              <p>
                BTC 真实难度需要 ASIC 矿场（专用芯片）——
                普通电脑根本碰不动这个数量级。
              </p>
            </Prose>
          ),
        },
        {
          label: "参数",
          subtitle: "为什么是 10 分钟一个区块",
          content: (
            <Prose>
              <p>
                上一页提到"难度"——但难度怎么定？
                如果 100 万矿工一起挖，是不是出块快得控制不住？
              </p>

              <H3>BTC 的难度自动调整</H3>
              <KeyPoint label="协议规则">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    每<Em> 2016 个区块</Em>（约 2 周）重新调整一次难度
                  </li>
                  <li>
                    目标：维持<Hl>平均 10 分钟一个区块</Hl>
                  </li>
                  <li>
                    最近 2016 个区块的实际平均出块时间，反推下一个 2016 周期的难度
                  </li>
                  <li>
                    算力翻倍 → 难度翻倍 → 出块时间回到 10 分钟
                  </li>
                </ul>
              </KeyPoint>

              <H3>为什么选 10 分钟？</H3>
              <p>
                这是<Em>工程折中</Em>——既不能太快也不能太慢。
              </p>

              <KeyPoint label="如果太快（比如 1 分钟）">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    全球节点收到新区块、验证、转发——光速也要几百毫秒
                  </li>
                  <li>
                    在网络还没同步好时，下一个区块已经出了
                  </li>
                  <li>
                    多个矿工同时出块的概率飙升 → <Em>分叉频繁</Em>
                  </li>
                  <li>
                    全网很难就"哪条链是主链"达成共识
                  </li>
                </ul>
              </KeyPoint>

              <KeyPoint label="如果太慢（比如 1 小时）">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    一笔小额支付要等几小时才被打包 → 用户体验差
                  </li>
                  <li>
                    "6 次确认"标准要等大半天
                  </li>
                  <li>
                    商业可用性大打折扣
                  </li>
                </ul>
              </KeyPoint>

              <p>
                10 分钟让区块广播到全球大多数节点（一般几秒）的时间<Em>远小于</Em>
                出块间隔——分叉概率被压到最低。
                同时给用户提供了可接受的确认体验。
              </p>

              <H3>同行对比</H3>
              <ComparisonTable
                headers={["项目", "出块时间", "权衡选择"]}
                rows={[
                  [
                    <Em key="btc">BTC</Em>,
                    "10 分钟",
                    "稳定优先，分叉极少",
                  ],
                  [
                    "Litecoin",
                    "2.5 分钟",
                    "更快确认，分叉概率略高",
                  ],
                  [
                    "Dogecoin",
                    "1 分钟",
                    "极快，但需要更复杂的分叉处理",
                  ],
                  [
                    <Em key="eth">以太坊</Em>,
                    "12 秒",
                    "用 GHOST 算法处理频繁分叉（叔块奖励）",
                  ],
                  [
                    "Solana",
                    "0.4 秒",
                    "牺牲去中心化（节点门槛极高）换吞吐量",
                  ],
                ]}
              />

              <p>
                出块时间是<Hl>每个区块链的核心选择</Hl>——
                它决定了项目在"安全 / 速度 / 去中心化"三角中的位置。
                BTC 选了最保守的 10 分钟——
                作为"价值储存"和"最终结算层"，安全永远优先于速度。
              </p>
            </Prose>
          ),
        },
        {
          label: "博弈",
          subtitle: "51% 攻击的经济学",
          content: (
            <Prose>
              <p>
                表面看 PoW 的安全保证是数学的——"你没算力就没法伪造"。
                但真正的保证是<Em>经济学</Em>的——"伪造比诚实挖矿亏"。
                这一页拆开看具体数字。
              </p>

              <H3>攻击者想做什么</H3>
              <KeyPoint label="典型攻击场景：双花">
                <ol className="list-decimal list-inside space-y-1 text-[var(--muted)]">
                  <li>用 BTC 在交易所买 ETH，提走 ETH（链上 BTC 还在）</li>
                  <li>偷偷另起一条链，从那笔 BTC 转账之前的区块开始重算</li>
                  <li>在那条新链上把这笔 BTC 转给自己（不发给交易所）</li>
                  <li>新链超过主链长度后广播出去 → 全网切换到新链 → ETH 在手，BTC 也回到自己</li>
                </ol>
                <p className="text-[var(--muted)]">
                  要让自己的链超过主链——必须算力<Em>持续</Em>超过全网其他人之和——
                  也就是 51% 攻击。
                </p>
              </KeyPoint>

              <H3>攻击成本（2024 年估算）</H3>
              <KeyPoint label="一份「成本菜单」">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>全网算力 ~500 EH/s（2024 年中），攻击者需 ≥250 EH/s</li>
                  <li>
                    顶级矿机 Antminer S19 XP：140 TH/s, ~$5000/台
                  </li>
                  <li>
                    需采购 ~180 万台 ≈ <Hl>90 亿美元</Hl> 一次性投入
                  </li>
                  <li>
                    每天电费 + 场地 + 运维 ≈ <Hl>3000 万美元</Hl>
                  </li>
                  <li>
                    交付周期：所有矿厂全速生产也要 6+ 个月
                  </li>
                </ul>
              </KeyPoint>

              <H3>攻击的"反噬"</H3>
              <KeyPoint label="假设攻击成功了……然后呢？">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    你刚成功双花了一笔几十 BTC——这事会被链上侦测到
                  </li>
                  <li>
                    主流交易所封禁你的攻击地址，市场对 BTC 信心动摇
                  </li>
                  <li>
                    BTC 价格暴跌 30-50% 在情理之中
                  </li>
                  <li>
                    你手里 90 亿美元的矿机和持有的 BTC <Em>价值同时归零</Em>
                  </li>
                  <li>
                    法律追究随之而来（即使你藏得好，能销赃的渠道也都被关闭）
                  </li>
                </ul>
              </KeyPoint>

              <H3>关键洞察</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>
                  PoW 的安全不是"不可能被攻击"，而是"攻击比诚实挖矿更亏"。
                </Hl>
                {" "}
                这是精妙的<Em>激励相容 (Incentive Compatible)</Em> 设计——
                让"诚实"成为参与者的<Em>理性最优选择</Em>。
              </p>

              <H3>为什么这套激励能跑下去</H3>
              <p>
                花 90 亿美元的人，最理性的选择是什么？
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  ❌ 攻击 → 矿机贬值 + 法律风险 + 持有 BTC 也归零
                </li>
                <li>
                  ✅ 老老实实挖矿 → 每天 3000 万美元的电费换来稳定的 BTC 奖励 →
                  矿机持续值钱 + BTC 持续值钱
                </li>
              </ul>
              <p>
                花得越多，越不愿意搞砸。
                <Hl>大矿工是 BTC 网络最坚定的捍卫者</Hl>——
                这是中本聪设计的最反直觉但也最关键的洞察。
              </p>
            </Prose>
          ),
        },
        {
          label: "分叉",
          subtitle: "最长链原则与 6 次确认",
          content: (
            <Prose>
              <p>
                即使有 10 分钟的间隔，<Em>分叉还是会偶尔发生</Em>——
                两个矿工几乎同时找到有效区块。
                网络如何处理这种情况？
              </p>

              <H3>最长链原则</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                每个节点<Hl>永远跟随"累积工作量最大的链"</Hl>
                （实际实现上通常就是最长链）。
              </p>

              <H3>分叉处理流程</H3>
              <KeyPoint label="一个具体场景">
                <ol className="list-decimal list-inside space-y-1 text-[var(--muted)]">
                  <li>
                    时刻 T：矿工 A 和矿工 B 几乎同时找到合法区块（都是高度 100）
                  </li>
                  <li>
                    亚洲节点先收到 A 的区块 → 接受 A，链：…→99→A
                  </li>
                  <li>
                    美洲节点先收到 B 的区块 → 接受 B，链：…→99→B
                  </li>
                  <li>
                    时刻 T+10min：下一个区块出来了，假设接在 A 链上 → 链：…→99→A→101
                  </li>
                  <li>
                    A 链长度 = 101，B 链长度 = 100
                  </li>
                  <li>
                    所有节点切换到 A 链（长的胜出）→ B 被"<Em>孤立 (orphaned)</Em>"
                  </li>
                  <li>
                    B 区块里的交易回到 mempool，等待下次打包
                  </li>
                </ol>
              </KeyPoint>

              <p>
                这个过程是<Em>自动的</Em>，不需要任何人投票或仲裁。
                只要每个节点都按"跟最长链"的规则行事，全网最终会收敛到同一条链。
              </p>

              <H3>"6 次确认"的由来</H3>
              <p>
                假如你给商家转 1 BTC——
                你的交易刚被打包进区块（1 次确认）时，
                商家应该立刻发货吗？不安全——这个块还可能被分叉抛弃。
              </p>
              <p>
                标准做法：<Em>等到这笔交易后面又接了 N 个区块</Em>，
                才认为它"基本不可逆"。N 越大越安全，但也越慢。
              </p>

              <H3>不同场景的确认次数标准</H3>
              <ComparisonTable
                headers={["场景", "建议确认", "等待时间", "被回滚概率"]}
                rows={[
                  [
                    "买杯咖啡",
                    "0-1",
                    "0-10 分钟",
                    "约 1%（小额可承受）",
                  ],
                  [
                    "网购小额",
                    "1-2",
                    "10-20 分钟",
                    "< 0.1%",
                  ],
                  [
                    "交易所充提",
                    "3-6",
                    "30-60 分钟",
                    "< 10⁻⁶",
                  ],
                  [
                    "大额跨境结算",
                    "6+",
                    "1+ 小时",
                    <Hl key="6">&lt; 10⁻¹⁸（实际为零）</Hl>,
                  ],
                ]}
              />

              <H3>本质：每多一次确认，攻击成本翻倍</H3>
              <p>
                想回滚一笔已有 N 次确认的交易，攻击者需要：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  从这笔交易所在的区块开始<Em>重算 N+1 个区块</Em>
                </li>
                <li>
                  同时全网诚实矿工还在源源不断推进主链
                </li>
                <li>
                  必须用更多算力<Em>追上并超过</Em>主链
                </li>
              </ul>
              <p>
                数学上：在 BTC 算力分布下，
                攻击者持有 30% 算力时回滚 6 次确认的概率约为 0.0002%。
                <Hl>"6 次确认 = 几乎不可能被回滚"</Hl> 是有数学基础的。
              </p>

              <H3>共识 = 最长链</H3>
              <p>
                这是 BTC 共识机制的最后一块拼图：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>哈希链 → 改一处暴露一片</li>
                <li>PoW → 重算需要真实算力</li>
                <li>最长链 → 全网就"哪条链是主链"达成共识</li>
              </ul>
              <p>
                三者合一，<Em>不需要任何中央仲裁</Em>，
                全球陌生人可以就一份持续变化的账本达成一致。
                这是 BTC 最深的魔法。
              </p>
            </Prose>
          ),
        },
        {
          label: "历史",
          subtitle: "为什么「投票」不行：女巫攻击",
          content: (
            <Prose>
              <p>
                看到这里你可能在想：要让全网就"主链是谁"达成一致，
                "节点投票，多数派说了算"不就行了？干嘛要用 PoW 这么暴力的方式？
              </p>
              <p>
                这个问题非常关键——它的答案揭示了 PoW 的<Em>真正天才之处</Em>。
              </p>

              <H3>朴素方案：节点投票</H3>
              <KeyPoint label="一个看起来很合理的设计">
                <p>
                  全网节点对"哪条链是主链"投票，多数派胜出。
                  听起来民主、公平、简单——但有一个致命缺陷。
                </p>
              </KeyPoint>

              <H3>女巫攻击 (Sybil Attack)</H3>
              <p>
                网络上的"节点身份"是<Em>免费</Em>的。
              </p>
              <KeyPoint label="攻击流程">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    我开一个云服务账号，按 1 美元/天的成本启动一万台虚拟机
                  </li>
                  <li>
                    每台虚拟机运行一个 BTC 节点 → 我有了一万个"身份"
                  </li>
                  <li>
                    每个身份投一票 → 我一个人占了一万票
                  </li>
                  <li>
                    同样代价的攻击者也能这么做——身份的"丰度"完全不能反映真实持有
                  </li>
                </ul>
              </KeyPoint>

              <H3>关键洞察：传统民主投票的隐含前提</H3>
              <p>
                现实世界的"一人一票"建立在<Em>身份可识别</Em>的前提上：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>身份证、户籍、面部识别</li>
                <li>白名单、KYC、邀请制</li>
                <li>背后是国家暴力支撑的强制实名</li>
              </ul>
              <p>
                <Hl>BTC 是开放、匿名的——这套"实名体系"用不了</Hl>。
                所以"投票"在去中心化系统里根本跑不起来。
              </p>

              <H3>PoW 的天才解法</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>把投票权绑定在不可伪造的真实物理成本上</Hl>——
                "一份算力一票"。
              </p>
              <p>
                你想多投票？OK——
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>去买电、买矿机、雇运维</li>
                <li>承担投资失败、矿机贬值、电费压力</li>
                <li>每一份"票"都对应一份真实的经济成本</li>
              </ul>
              <p>
                这是把<Em>抽象的"共识"问题</Em>转化成<Em>具体的"经济成本"问题</Em>。
                抽象问题没法严格求解（拜占庭将军问题在开放网络下被认为长期无解），
                但经济成本是可测量、可控的。
              </p>

              <H3>1980 年代的拜占庭将军问题</H3>
              <KeyPoint label="一段背景">
                <p>
                  1982 年 Lamport 等人提出"拜占庭将军问题"：
                  几个将军用信使通信，部分将军可能叛变发假消息——
                  剩下的忠诚将军怎么对"是否进攻"达成一致？
                </p>
                <p className="text-[var(--muted)]">
                  这是分布式系统学界 30 年的难题。
                  在<Em>封闭网络</Em>（节点列表已知）有 PBFT、Paxos 等解；
                  但在<Em>开放网络</Em>（任何人可加入）一直没有实用方案——
                  问题本质就是"陌生人之间怎么达成共识"。
                </p>
              </KeyPoint>

              <p>
                2008 年中本聪用 PoW 给出了第一个能跑的答案——
                这就是为什么白皮书一发表，
                密码学界部分专家立刻意识到这是"理论难题的工程突破"。
              </p>

              <H3>PoW vs 其他共识机制对比</H3>
              <ComparisonTable
                headers={["机制", "身份假设", "抗攻击靠"]}
                rows={[
                  [
                    "传统投票（直觉方案）",
                    "实名 + 白名单",
                    <span key="1" className="text-[var(--invalid)]">
                      在开放网络中崩溃（女巫攻击）
                    </span>,
                  ],
                  [
                    "Paxos / Raft",
                    "已知节点列表",
                    "多数派投票（半可信网络）",
                  ],
                  [
                    "PBFT / 联盟链",
                    "节点白名单",
                    "签名 + 投票（封闭网络）",
                  ],
                  [
                    <Hl key="pow">PoW (BTC)</Hl>,
                    <Hl key="open">开放，任何人加入</Hl>,
                    "真实算力成本",
                  ],
                  [
                    "PoS（权益证明）",
                    "持币量决定权重",
                    "质押币的经济成本",
                  ],
                ]}
              />
            </Prose>
          ),
        },
        {
          label: "争议",
          subtitle: "能耗、ASIC、中心化",
          content: (
            <Prose>
              <p>
                PoW 不是没有代价——它真的烧了大量电。
                这一页诚实面对所有最常见的批评，
                看哪些是误解，哪些是真问题。
              </p>

              <H3>批评 1：能耗太高</H3>
              <KeyPoint label="数据">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>BTC 网络年耗电 ~150 TWh（2024 年估算）</li>
                  <li>大致等于阿根廷或马来西亚全国一年用电</li>
                  <li>占全球总用电量约 0.6%</li>
                </ul>
              </KeyPoint>

              <KeyPoint label="批评视角">
                <p>
                  "为一个账本烧这么多电是否值得？"
                  "这不是巨大的能源浪费吗？"
                </p>
              </KeyPoint>

              <KeyPoint label="辩护视角">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    全球银行系统能耗更高——服务器 + 办公楼 + ATM + 运钞车 + 物理基础设施
                  </li>
                  <li>
                    黄金行业能耗也巨大——挖矿、运输、保险库
                  </li>
                  <li>
                    越来越多矿场用<Em>弃水弃风电</Em>——
                    电网无法消纳的可再生电力，矿场是少数能即开即用的负载
                  </li>
                  <li>
                    "能耗 = 安全预算"——
                    你希望用多少钱保护一个 1 万亿美元市值的网络？
                  </li>
                </ul>
              </KeyPoint>

              <p>
                这不是简单的"对或错"——它是一个真实的<Hl>价值判断</Hl>：
                你愿不愿意为"绝对不可篡改、不可冻结、不可稀释"的属性
                付出 0.6% 全球电力的代价？
              </p>

              <H3>批评 2：ASIC 集中化</H3>
              <KeyPoint label="挖矿设备的演化">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>2009-2010：CPU 挖矿（普通笔记本）</li>
                  <li>2010-2012：GPU 挖矿（显卡）</li>
                  <li>2012-2013：FPGA（可编程门阵列）</li>
                  <li>2013 至今：<Em>ASIC（专用集成电路）</Em>——为 SHA-256 量身定制</li>
                </ul>
              </KeyPoint>

              <p>
                普通用户家里的 GPU 算力相对于 ASIC 矿机已经可以忽略不计——
                <Em>挖矿成了"工业活动"</Em>，不再是"人人可参与"。
              </p>

              <KeyPoint label="这是 bug 还是 feature?">
                <p>批评：违背了"去中心化"的初衷</p>
                <p>辩护：</p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    ASIC 矿工投入巨大（动辄百万美元厂房）、退出成本高 →
                    更有动机长期维护网络稳定
                  </li>
                  <li>
                    "节点"和"矿工"是不同角色——任何人都能跑节点验证（轻松），
                    挖矿才需要 ASIC
                  </li>
                  <li>
                    ASIC 让算力市场化——任何人买矿机就能参与，
                    比"必须是某些机构"门槛更低
                  </li>
                </ul>
              </KeyPoint>

              <H3>批评 3：矿池集中</H3>
              <p>
                现实情况：前 3 名矿池控制全网超过 50% 算力。
                Foundry USA + AntPool + ViaBTC 长期占据头部。
              </p>

              <KeyPoint label="为什么这「看起来很危险但实际还好」">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    矿池只是<Em>结算单位</Em>，里面的矿工分散在全球
                  </li>
                  <li>
                    矿工随时可以切换矿池——<Em>用脚投票</Em>
                  </li>
                  <li>
                    历史先例：2014 年 GHash.io 矿池接近 51% 时，
                    矿工主动撤离让算力下降 → 社区机制证明有效
                  </li>
                  <li>
                    矿池"作恶"会触发矿工逃离 + 池子声誉破产 + 业务归零，
                    经济上不理性
                  </li>
                </ul>
              </KeyPoint>

              <H3>真正需要警惕的</H3>
              <p>
                以上三个批评都有缓解，但 PoW 真正的<Em>未解难题</Em>是：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>电力地理集中</Em>——
                  超 70% 算力在中美两国，被国家级管制的风险
                </li>
                <li>
                  <Em>2140 年后的安全预算</Em>——
                  区块奖励归零后，手续费能否养活足够算力
                  （第 7 章详谈）
                </li>
                <li>
                  <Em>量子计算威胁</Em>——
                  如果某天量子计算机能高效算 SHA-256，PoW 就破了
                  （目前看至少 20 年内不会发生）
                </li>
              </ul>

              <p>
                <Hl>没有完美的设计，只有清醒的权衡</Hl>。
                理解 PoW 既要看见它解决的问题，
                也要看见它带来的代价。
              </p>
            </Prose>
          ),
        },
      ]}
    />
  );
}
