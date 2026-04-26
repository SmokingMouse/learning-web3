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

export function Section7() {
  return (
    <SectionTabs
      step={7}
      pages={[
        {
          label: "裂缝",
          subtitle: "第一个 BTC 是哪来的",
          content: (
            <Prose>
              <p>
                到目前为止 BTC 的设计已经基本完整——
                账本、共识、签名、余额、轻量验证都有了。
                但有一个不容易察觉的逻辑裂缝。
              </p>

              <H3>裂缝在哪</H3>
              <KeyPoint label="第 3 章我们说过……">
                <p>
                  "矿工找到有效区块 → 获得 BTC 奖励"。
                </p>
                <p className="text-[var(--muted)]">
                  这听起来理所当然——但仔细想想，
                  <Hl>奖励的 BTC 是从哪个 UTXO 来的？</Hl>
                </p>
              </KeyPoint>

              <p>
                第 5 章告诉我们：BTC 不存在凭空产生——
                每一笔 BTC 都来自之前某笔交易的输出。
                那么按归纳——<Em>追溯到最初，第一个 BTC 是哪笔交易的输出？</Em>
              </p>

              <H3>这是一个鸡生蛋的问题</H3>
              <p>
                如果每个 BTC 都来自"之前的交易"，那 BTC 永远生成不出来——
                没有 BTC 当作启动初始资本，挖矿没法奖励。
              </p>

              <H3>解法：Coinbase 交易</H3>
              <p>
                BTC 给"挖矿奖励"专门设计了一种<Hl>特殊交易</Hl>——
                每个区块的<Em>第一笔交易</Em>。
              </p>

              <KeyPoint label="Coinbase 交易的特殊之处">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>没有输入 UTXO</Em>——不从任何地方转出
                  </li>
                  <li>
                    <Em>只有输出</Em>——直接生成新 UTXO 给矿工
                  </li>
                  <li>
                    协议规则<Em>硬编码</Em>了"这种无输入的交易合法"
                  </li>
                  <li>
                    每个区块只能有<Em>一笔</Em> Coinbase 交易
                  </li>
                  <li>
                    Coinbase 创造的 BTC 数量<Em>由协议规定</Em>，矿工不能多写
                  </li>
                </ul>
              </KeyPoint>

              <H3>翻译成大白话</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>协议授权矿工"凭空印一笔钱给自己"</Hl>，
                作为这个区块上算力工作的回报。
                但"印多少"由确定算法规定，
                <Em>不是矿工临时决定</Em>。
              </p>

              <H3>类比</H3>
              <ComparisonTable
                headers={["维度", "央行", "BTC Coinbase"]}
                rows={[
                  [
                    "谁授权增发",
                    "央行行长 + FOMC 委员会",
                    <Hl key="proto">协议代码</Hl>,
                  ],
                  [
                    "增发节奏",
                    "动态调整（QE、加息）",
                    <Hl key="alg">完全确定的算法</Hl>,
                  ],
                  [
                    "总量上限",
                    "无（理论可无限）",
                    <Hl key="cap">2100 万（硬封顶）</Hl>,
                  ],
                  [
                    "可见度",
                    "通过新闻发布",
                    "全链可查，每秒同步",
                  ],
                  [
                    "可改变",
                    "是（货币政策调整）",
                    "几乎不可能（需要全网共识）",
                  ],
                ]}
              />

              <H3>为什么这样设计</H3>
              <p>
                Coinbase 交易把 BTC 的"印钞"<Em>从政治决策变成数学公式</Em>——
                没有人能临时决定多印或少印。
                这是 BTC <Hl>"可预期稀缺"</Hl> 的根本机制。
              </p>

              <p>
                下一页看具体奖励数字——
                以及它是怎么演化到现在的。
              </p>
            </Prose>
          ),
        },
        {
          label: "奖励",
          subtitle: "减半曲线",
          content: (
            <Prose>
              <p>
                Coinbase 交易给矿工的奖励不是固定的——
                它每过一段时间会<Em>减半</Em>。
              </p>

              <H3>BTC 减半时间表</H3>
              <p>
                初始奖励（2009 年 1 月）：每个区块 50 BTC。
                每<Hl>210,000 个区块</Hl>（约 4 年）减半一次。
              </p>

              <ComparisonTable
                headers={["阶段", "区块范围", "每块奖励", "起始日期"]}
                rows={[
                  ["创世", "0 — 209,999", "50 BTC", "2009-01-03"],
                  [
                    "1st halving",
                    "210,000 — 419,999",
                    "25 BTC",
                    "2012-11-28",
                  ],
                  [
                    "2nd halving",
                    "420,000 — 629,999",
                    "12.5 BTC",
                    "2016-07-09",
                  ],
                  [
                    "3rd halving",
                    "630,000 — 839,999",
                    "6.25 BTC",
                    "2020-05-11",
                  ],
                  [
                    <Hl key="4th">4th halving (当前)</Hl>,
                    "840,000 — 1,049,999",
                    <Hl key="cur">3.125 BTC</Hl>,
                    "2024-04-20",
                  ],
                  [
                    "5th halving (预)",
                    "1,050,000 — ",
                    "1.5625 BTC",
                    "~2028",
                  ],
                  ["...", "...", "...", "..."],
                  [
                    "32nd halving",
                    "~",
                    "趋近于 0",
                    "~2140",
                  ],
                ]}
              />

              <H3>到 2140 年趋近于 0</H3>
              <p>
                精确说，BTC 的奖励在 32 次减半后会因为整数取整变成 0——
                这就是 BTC 全部发行完成的时间点。
              </p>

              <H3>每次减半都是大事件</H3>
              <KeyPoint label="2024 年 4 月减半的全球关注">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>所有交易所、媒体直播倒计时（精确到分钟）</li>
                  <li>
                    历史上每次减半后 12-18 个月伴随明显牛市
                    （但也可能是巧合）
                  </li>
                  <li>
                    矿工经济压力：奖励减半但电费照付——
                    效率最低的矿工被淘汰
                  </li>
                  <li>
                    全网算力短期波动，2-3 周后稳定
                  </li>
                </ul>
              </KeyPoint>

              <H3>当前发行进度</H3>
              <KeyPoint label="2024 年中">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    已挖出：~19.7 百万 BTC（约 94% 已经发行）
                  </li>
                  <li>
                    剩余待挖：~1.3 百万 BTC
                  </li>
                  <li>
                    剩余 6% 要花<Hl>116 年</Hl>慢慢挖完——
                    因为后续区块奖励指数级减小
                  </li>
                </ul>
              </KeyPoint>

              <p>
                也就是说——<Em>BTC 的"早期"已经基本结束</Em>，
                未来一百多年都是"长尾时期"。
                你今天买 BTC，
                95% 的供应已经在那 4% 早期参与者手里——
                这是 BTC 不可避免的财富分配现实。
              </p>
            </Prose>
          ),
        },
        {
          label: "数学",
          subtitle: "2100 万从哪算来",
          content: (
            <Prose>
              <p>
                "BTC 总量 2100 万"——这个数字哪来的？
                中本聪拍脑袋拍的吗？
              </p>
              <p>
                <Hl>不是</Hl>。是"<Em>每块 50 BTC 起始 + 每 21 万块减半</Em>"
                这两个参数的<Em>数学必然结果</Em>。
              </p>

              <H3>计算过程</H3>
              <p>
                把每个阶段的总产出加起来：
              </p>
              <KeyPoint label="阶段产出">
                <pre className="font-hash text-[11px] leading-relaxed">
{`阶段 0:  210,000 × 50      = 10,500,000 BTC
阶段 1:  210,000 × 25       =  5,250,000 BTC
阶段 2:  210,000 × 12.5     =  2,625,000 BTC
阶段 3:  210,000 × 6.25     =  1,312,500 BTC
阶段 4:  210,000 × 3.125    =    656,250 BTC
阶段 5:  210,000 × 1.5625   =    328,125 BTC
...
合计 = 210,000 × 50 × (1 + 1/2 + 1/4 + 1/8 + ...)`}
                </pre>
              </KeyPoint>

              <H3>关键观察：几何级数</H3>
              <p>
                括号里的 1 + 1/2 + 1/4 + 1/8 + ... 是经典的<Em>无穷几何级数</Em>。
                它的和有个漂亮的极限值：
              </p>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 font-hash text-center">
                <Hl>
                  ∑ (1/2)ᵏ = 1 + 1/2 + 1/4 + 1/8 + ... = 2
                </Hl>
              </p>

              <H3>带回来算总量</H3>
              <pre className="font-hash text-[11px] p-3 rounded bg-[var(--card)] overflow-x-auto leading-relaxed">
{`总量 = 210,000 × 50 × 2
     = 21,000,000 BTC`}
              </pre>

              <p>
                <Hl>2100 万——纯数学推导出来的</Hl>。
                如果一开始选 40 BTC × 25 万块，总量就是 2000 万；
                选 50 BTC × 21 万块，恰好是 2100 万。
              </p>
              <p>
                中本聪很可能是<Em>先想要"恰好 2100 万"</Em>这个看起来圆整的数字，
                再反推参数到 50 BTC + 21 万块。
                哲学解读："每个聪（一亿分之一）都被用得物尽其用"。
              </p>

              <H3>实际上略小于 2100 万</H3>
              <KeyPoint label="一个工程细节">
                <p>
                  实际最终总量约为 <Em>20,999,999.97</Em> BTC——
                  比理论值少约 0.03 BTC。
                </p>
                <p className="text-[var(--muted)]">
                  原因：早期实现里，奖励的减半用整数运算（每个聪都不允许小数），
                  减半时取整丢失了几个聪。
                </p>
                <p>
                  这是<Em>实现细节而非设计意图</Em>——
                  对货币功能没有任何影响，
                  但是 BTC 历史上的一个有趣印记。
                </p>
              </KeyPoint>

              <H3>为什么"恰好 2100 万"</H3>
              <p>
                这个数字本身没什么特殊——
                BTC 可以是 1 亿、200 亿、1 万。
                但<Em>"有上限"</Em>这个属性极其重要：
              </p>

              <KeyPoint label="有上限的意义">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>抗通胀</Em>——不像法币可以无限印
                  </li>
                  <li>
                    <Em>可预期</Em>——
                    20 年后的供应量已经精确可知
                  </li>
                  <li>
                    <Em>稀缺数学化</Em>——
                    像黄金一样有总量限制，但比黄金更确定（黄金还有未发现矿藏）
                  </li>
                </ul>
              </KeyPoint>

              <p>
                这是 <Hl>BTC 区别于一切法币</Hl> 的根本属性——
                没有任何国家、机构、个人能改这个 2100 万。
              </p>
            </Prose>
          ),
        },
        {
          label: "经济学",
          subtitle: "为什么是减半，不是匀速减少",
          content: (
            <Prose>
              <p>
                总量 2100 万这个目标，用<Em>线性减少</Em>或<Em>连续指数衰减</Em>
                也都能实现。为什么中本聪选了"减半"这种跳变曲线？
              </p>

              <H3>三种发行曲线对比</H3>
              <ComparisonTable
                headers={["曲线", "数学形式", "用户感受"]}
                rows={[
                  [
                    "线性减少",
                    "每块奖励 = 50 - k×t",
                    "感受不出节奏，平滑但无亮点",
                  ],
                  [
                    "连续指数衰减",
                    "每块奖励 = 50 × e^(-kt)",
                    "天天在减但变化太微，感知模糊",
                  ],
                  [
                    <Hl key="halv">减半（BTC 选择）</Hl>,
                    "每 21 万块奖励 ÷ 2",
                    <Hl key="ev">明确事件，每 4 年一次大讨论</Hl>,
                  ],
                ]}
              />

              <H3>减半的三个好处</H3>

              <KeyPoint label="① 可预期稀缺性的极致">
                <p>
                  下一次减半在<Em>哪个区块</Em>是精确已知的——
                  甚至能精确预测时间到小时级别。
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>2024 年 4 月 20 日 12:09 UTC 全球直播</li>
                  <li>
                    没有哪个法币能做到"14 年前就知道 2024 年 4 月某一天通胀率腰斩"
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  这种<Em>对未来供应的绝对确定性</Em>是 BTC 最独特的属性。
                </p>
              </KeyPoint>

              <KeyPoint label="② 市场叙事的清晰节奏">
                <p>
                  每 4 年一次的"减半"是 BTC 最重要的市场叙事节点：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    减半前：媒体倒计时、关注度上升
                  </li>
                  <li>
                    减半时：全球直播、矿工调整
                  </li>
                  <li>
                    减半后 12-18 个月：历史上都伴随牛市（2013、2017、2021）
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  虽然历史不保证未来，
                  但<Em>"4 年一次的清晰节奏"</Em>本身让 BTC 有了"周期感"——
                  这是其他资产没有的特性。
                </p>
              </KeyPoint>

              <KeyPoint label="③ 工程实现的极致简单">
                <p>
                  减半的计算是一个 if 判断：
                </p>
                <pre className="font-hash text-[11px] leading-relaxed">
{`reward = 50 BTC
halvings = block_height / 210000
reward = 50 / (2 ** halvings)`}
                </pre>
                <p className="text-[var(--muted)]">
                  没有浮点数（容易出现不同实现的数值分歧）、
                  没有时间相关（不依赖时钟）。
                  整数除法 + 位移——所有矿机算出来都一致。
                </p>
              </KeyPoint>

              <H3>关键经济学指标：S2F (Stock-to-Flow)</H3>
              <KeyPoint label="衡量稀缺性的经典指标">
                <p>
                  S2F = <Em>当前存量 / 年新增产出</Em>。
                  数值越高越稀缺。
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>黄金</Em>：S2F ≈ 60（地面黄金量 / 年挖矿量）
                  </li>
                  <li>
                    <Em>白银</Em>：S2F ≈ 22
                  </li>
                  <li>
                    <Em>铜</Em>：S2F ≈ 0.4
                  </li>
                  <li>
                    <Em>BTC（2024 减半后）</Em>：
                    <Hl>S2F ≈ 113</Hl>——
                    超过黄金，成为人类历史上最稀缺的资产
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  每次减半 BTC 的 S2F 翻倍——
                  到 2032 年下次减半后，S2F 将达到 ~226，
                  远超黄金。
                </p>
              </KeyPoint>

              <H3>S2F 模型与争议</H3>
              <p>
                经济学者 PlanB 在 2019 年提出了
                <Em>BTC 价格 ≈ S2F 的某次方</Em> 这个模型——
                试图用稀缺性预测价格。
              </p>
              <KeyPoint label="争议很大">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    历史上 2013-2021 年模型预测和实际相当吻合
                  </li>
                  <li>
                    2022 年崩盘后 BTC 价格远低于模型预测
                  </li>
                  <li>
                    批评：稀缺性是必要不充分条件——
                    一个资产要值钱，还需要"用途"
                  </li>
                  <li>
                    支持：随着减半推进，长期看模型仍可能成立
                  </li>
                </ul>
              </KeyPoint>

              <H3>核心启示</H3>
              <p>
                减半不是营销噱头，是<Em>BTC 经济模型的基石</Em>：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  把"<Em>可预期</Em>"做到了极致——
                  比黄金还可预期（黄金还有未知矿藏）
                </li>
                <li>
                  把"<Em>稀缺性</Em>"做到了数学化——
                  S2F 超过所有传统资产
                </li>
                <li>
                  把"<Em>事件感</Em>"做到了清晰——
                  4 年一次的全球关注节点
                </li>
              </ul>
              <p>
                这套机制把"<Hl>数字黄金</Hl>"叙事钉得很死——
                BTC 不是为日常支付优化（那是 Lightning 的事），
                而是为"长期价值储存"优化。
              </p>
            </Prose>
          ),
        },
        {
          label: "附言",
          subtitle: "创世区块的政治宣言",
          content: (
            <Prose>
              <p>
                Coinbase 交易在协议层面有个特别的设计——
                它的输入字段（虽然不实际"输入"任何 UTXO）
                可以塞一段任意数据。
                矿工想留什么就留什么。
              </p>

              <H3>2009 年 1 月 3 日</H3>
              <p>
                BTC 网络的第一个区块（创世区块，Block 0）的 Coinbase 交易里，
                中本聪写下了这段载入密码朋克史的话：
              </p>

              <KeyPoint label="Block 0 的 Coinbase 附言">
                <pre className="font-hash text-[12px] p-4 rounded bg-[var(--card)] overflow-x-auto leading-relaxed text-center">
{`The Times 03/Jan/2009
Chancellor on brink of
second bailout for banks`}
                </pre>
                <p className="text-[var(--muted)] text-center mt-2">
                  这是当天伦敦《泰晤士报》的<Em>头版标题</Em>——
                  讲的是英国财政大臣考虑对银行进行第二次救助。
                </p>
              </KeyPoint>

              <H3>双重含义</H3>

              <KeyPoint label="① 时间戳证据">
                <p>
                  这段话是当天报纸的标题——
                  证明<Em>创世区块不可能早于 2009 年 1 月 3 日</Em>。
                </p>
                <p className="text-[var(--muted)]">
                  这是一个聪明的"时间戳"——
                  把现实世界的事件嵌入区块，
                  反过来给区块定时间。
                  这种"时间锚定"的思想后来在很多区块链项目里被效仿。
                </p>
              </KeyPoint>

              <KeyPoint label="② 意识形态宣言">
                <p>
                  把 BTC 钉在 2008 金融危机的历史坐标上：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    雷曼破产、贝尔斯登卖给摩根、AIG 救助
                  </li>
                  <li>
                    全球银行需要政府救助 → 储户和纳税人为危机买单
                  </li>
                  <li>
                    "印钞" 解决问题 → 货币长期通胀
                  </li>
                </ul>
                <p>
                  中本聪用这句话表态——
                  <Hl>"传统金融系统出了问题，BTC 是另一条路"</Hl>。
                </p>
              </KeyPoint>

              <H3>后续矿工的传统</H3>
              <p>
                自此 Coinbase 附言成了一个<Em>密码朋克的传统</Em>。
                每次重大事件，矿工会借机在区块里留下意识形态宣言：
              </p>

              <KeyPoint label="一些有名的 Coinbase 附言">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>Block 286819 (2014)</Em>：
                    引用尼采的话"上帝已死"——某矿工的哲学声明
                  </li>
                  <li>
                    <Em>多个区块</Em>：政治家名字、各国总统大选结果
                  </li>
                  <li>
                    <Em>2017 区块</Em>：
                    "NY Agreement is broken" —— SegWit 升级时的内部宣言
                  </li>
                  <li>
                    <Em>常见广告</Em>：矿池在 Coinbase 里塞自己的 logo / URL
                  </li>
                  <li>
                    <Em>2022 战争</Em>：
                    乌克兰战争开始后，多个区块出现支持乌克兰的话语
                  </li>
                </ul>
              </KeyPoint>

              <H3>从技术细节到文化符号</H3>
              <p>
                Coinbase 附言这个看似不起眼的字段——
                4 字节起，最多 100 字节——
                成了 BTC 区块链最特殊的位置：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>不可篡改</Em>：和区块一起永久写入链
                </li>
                <li>
                  <Em>不可审查</Em>：没人能阻止你写
                </li>
                <li>
                  <Em>全球可见</Em>：100 年后还能查到
                </li>
              </ul>
              <p>
                这是<Hl>"数字时代的纪念碑"</Hl>——
                你想说什么，付得起算力，就能在这里留下。
              </p>

              <H3>启示</H3>
              <p>
                创世区块的那句话提醒我们：
                <Em>BTC 不只是技术产物，也是政治宣言</Em>。
                如果只看代码不看历史，会错过 BTC 一半的内涵。
              </p>
              <p>
                它是 2008 金融危机的孩子，
                是密码朋克 30 年理想的具现，
                是"<Hl>用数学和算力替代信任</Hl>"这个梦的第一块基石。
              </p>
            </Prose>
          ),
        },
        {
          label: "未来",
          subtitle: "2140 年后矿工吃什么",
          content: (
            <Prose>
              <p>
                BTC 的区块奖励每 4 年减半，最终在 ~2140 年趋近于 0。
                那时矿工失去这块收入——他们靠什么继续维持算力？
              </p>

              <H3>另一笔收入：交易手续费</H3>
              <p>
                每笔 BTC 交易的<Em>输入总额 - 输出总额 = 手续费</Em>，
                自动归打包该交易的矿工所有。
              </p>
              <KeyPoint label="举个例子">
                <p>
                  Alice 输入 8 BTC，输出 7 给 Bob + 0.9 找零给自己 → 手续费 0.1 BTC，
                  归矿工。
                </p>
                <p className="text-[var(--muted)]">
                  矿工打包交易时优先选手续费率高的——
                  这激励用户多付费以加快确认。
                </p>
              </KeyPoint>

              <H3>当前手续费占比</H3>
              <KeyPoint label="2024 年数据">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>区块奖励：3.125 BTC（每块）</li>
                  <li>典型手续费收入：0.05-0.5 BTC（每块，波动大）</li>
                  <li>
                    手续费占矿工总收入：约 <Hl>5-15%</Hl>
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  目前矿工 90%+ 收入还来自区块奖励——
                  手续费占比不大。
                </p>
              </KeyPoint>

              <H3>趋势：手续费占比逐渐上升</H3>
              <p>
                每 4 年减半 → 区块奖励减半 → 手续费占比相对上升：
              </p>
              <ComparisonTable
                headers={["年份", "区块奖励", "手续费占比（估算）"]}
                rows={[
                  ["2024", "3.125 BTC", "~10%"],
                  ["2028", "1.5625 BTC", "~20%"],
                  ["2032", "0.78 BTC", "~35%"],
                  ["2036", "0.39 BTC", "~50%"],
                  ["...", "...", "..."],
                  [
                    <Hl key="end">~2140</Hl>,
                    <Hl key="zero">≈ 0</Hl>,
                    <Hl key="100">100%</Hl>,
                  ],
                ]}
              />

              <H3>BTC 长期经济学的核心争议</H3>
              <p>
                "手续费够不够养算力" 是 BTC 长期存活的<Em>最大未解问题</Em>。
                有三派观点：
              </p>

              <KeyPoint label="① 激进派：BTC 作为「世界结算层」">
                <p>
                  随着 BTC 成为全球 reserve asset，每笔大额结算都付得起高手续费——
                  少量但高价值的交易养算力没问题。
                </p>
                <p className="text-[var(--muted)]">
                  类比：SWIFT 也只处理大额结算（不是日常支付），
                  靠每笔几十美元手续费运转。
                </p>
              </KeyPoint>

              <KeyPoint label="② 保守派：手续费养不起足够算力">
                <p>
                  如果手续费不够多，矿工撤离 → 算力下降 → 攻击成本下降 →
                  BTC 安全性降低 → 信心崩塌。这是<Em>死亡螺旋</Em>。
                </p>
                <p className="text-[var(--muted)]">
                  尤其 2030-2040 年是过渡期最危险——
                  补贴减半但手续费市场可能还没成熟。
                </p>
              </KeyPoint>

              <KeyPoint label="③ 折中派：分层结算">
                <p>
                  Lightning Network 等 Layer 2 处理小额日常交易，
                  主链只做大额结算 + L2 通道开关。
                  L2 收的手续费虽然不直接给主链矿工，
                  但 L2 流动性会推高主链交易需求。
                </p>
                <p className="text-[var(--muted)]">
                  这是当前主流社区路线——
                  也是 BTC 当前实际正在走的路。
                </p>
              </KeyPoint>

              <H3>另一个潜在风险：长期算力下降</H3>
              <p>
                即使有手续费，
                如果 BTC 的总安全预算（区块奖励 + 手续费的美元价值）下降——
                算力会跟着下降——攻击成本下降——
                51% 攻击变得便宜。
              </p>
              <p>
                这是为什么 BTC 必须<Em>持续涨价</Em>——
                市值上升让美元计价的安全预算保持充足。
                如果 BTC 长期不涨，安全模型就有问题。
              </p>

              <H3>这一切的根本</H3>
              <p>
                BTC 的安全是<Hl>经济学博弈</Hl>，不是数学保证——
                <Em>它依赖参与者的长期理性</Em>。
                从 2009 年至今的 15 年看，
                这个博弈跑得很好。
                未来 100 年还能不能跑？
                没人能给确定答案。
              </p>

              <p>
                这是 BTC 唯一的"实验性"——
                所有的密码学和 PoW 数学都靠谱，
                <Em>但"激励是否长期可持续"是开放问题</Em>。
                这也是为什么 BTC 社区花大量精力在 Lightning、Taproot、Drivechain 等扩展上——
                给主链找新的需求和价值。
              </p>
            </Prose>
          ),
        },
        {
          label: "对比",
          subtitle: "三种「货币供给」机制",
          content: (
            <Prose>
              <p>
                把 BTC 的发行机制和法币、黄金放一起对比——
                你会看到 BTC 是<Em>人类货币史上的新物种</Em>。
              </p>

              <H3>三种货币的供给控制</H3>
              <ComparisonTable
                headers={["维度", "法币", "黄金", "BTC"]}
                rows={[
                  [
                    "供应控制方",
                    "央行 + 财政部",
                    "地质 + 矿业公司",
                    <Hl key="alg">协议算法</Hl>,
                  ],
                  [
                    "供应上限",
                    "无（理论可无限）",
                    "理论有限（地壳总量）",
                    <Hl key="cap">2,100 万（硬封顶）</Hl>,
                  ],
                  [
                    "发行节奏",
                    "由货币政策决定",
                    "自然禀赋 + 技术进步",
                    <Hl key="exact">精确公式可预测到 2140</Hl>,
                  ],
                  [
                    "增发权力",
                    "央行行长 + FOMC 投票",
                    "矿业公司",
                    "无人（需要全网共识）",
                  ],
                  [
                    "透明度",
                    "间接（央行公报）",
                    "供应报告（年度）",
                    <Hl key="t">全链可查，每秒同步</Hl>,
                  ],
                  [
                    "可改变",
                    "随政策调整",
                    "可被技术改变（深海采矿等）",
                    "几乎不可能",
                  ],
                  [
                    "对应通胀",
                    "1-3% 长期，危机时 5-10%+",
                    "约 1.5%（年开采量 / 总存量）",
                    <Hl key="i">趋近于 0</Hl>,
                  ],
                ]}
              />

              <H3>关键差异：可预测性</H3>
              <KeyPoint label="法币">
                <p>
                  你不知道<Em>明天的</Em>货币政策——
                  央行突然降息、QE、加息都可能。
                  对未来供应量的预测最多 1-2 年。
                </p>
                <p className="text-[var(--muted)]">
                  历史上多次"无预警"政策（2020 年 COVID 大放水），
                  让长期持有法币的人措手不及。
                </p>
              </KeyPoint>

              <KeyPoint label="黄金">
                <p>
                  长期开采率比较稳定（每年 ~1.5%），
                  但偶有技术突破（更深矿、更稀的矿）能改变供应。
                </p>
                <p className="text-[var(--muted)]">
                  历史上 19 世纪美国加州金矿大发现时，
                  黄金供应大幅增加，价格剧烈波动。
                </p>
              </KeyPoint>

              <KeyPoint label="BTC">
                <p>
                  <Hl>2140 年的供应量都是已知的</Hl>。
                  你今天能精确算出 2050 年某一天的全网总 BTC 量。
                </p>
                <p className="text-[var(--muted)]">
                  这种"绝对的可预期性"在人类货币史上前所未有。
                </p>
              </KeyPoint>

              <H3>BTC 的独特性总结</H3>
              <p>
                BTC 不是"数字版黄金"——
                它在多个方面比黄金还要确定：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>供应上限明确</Em>——黄金还有未发现矿藏
                </li>
                <li>
                  <Em>节奏可预测</Em>——黄金供应受技术影响
                </li>
                <li>
                  <Em>无人可改</Em>——黄金可被新技术大幅增产
                </li>
                <li>
                  <Em>全球瞬时可达</Em>——黄金运输和验证都难
                </li>
                <li>
                  <Em>可分割性</Em>——黄金最小单位约 0.01g 可流通；
                  BTC 最小 1 聪 = 10⁻⁸ BTC
                </li>
              </ul>

              <H3>新物种的本质</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>
                  BTC 不是"数字货币"的迭代——它是人类第一种
                  "可编程的稀缺性"。
                </Hl>
              </p>

              <p>
                法币是国家信用，黄金是物理稀缺——
                BTC 是<Em>算法承诺</Em>。
                它把"稀缺"这件事从大自然的偶然
                （黄金多少取决于地质）和人为决策
                （法币多少取决于央行）
                ——变成<Hl>数学公式</Hl>。
              </p>

              <p>
                这是货币史上一次根本性创新。
                未来 100 年人类怎么使用这种新形态、
                它会和法币 / 黄金长期并存还是替代——
                没人知道答案。
                但<Em>它已经诞生了，且不可被消灭</Em>。
              </p>
            </Prose>
          ),
        },
      ]}
    />
  );
}
