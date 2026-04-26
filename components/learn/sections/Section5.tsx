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

export function Section5() {
  return (
    <SectionTabs
      step={5}
      pages={[
        {
          label: "直觉",
          subtitle: "钱包里的硬币 vs 银行卡上的数字",
          content: (
            <Prose>
              <p>
                上一章解决了"是谁发的"。
                现在需要回答另一个看似简单的问题——
                <Hl>账本上只有一笔笔转账记录，怎么算 Alice 有多少钱？</Hl>
              </p>

              <H3>两种"记账方式"的区别</H3>
              <KeyPoint label="想象两种钱包">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>账户模型</Em>：你有一张银行卡，卡里显示"23,456 元"。
                    花 100 → 余额减 100，对方账户加 100。
                  </li>
                  <li>
                    <Em>UTXO 模型</Em>：你有一个真实钱包，
                    里面装着"一张 100 + 一张 50 + 三个 1 元硬币"。
                    花钱时挑出具体的钞票，不够还得多掏一张再找零。
                  </li>
                </ul>
              </KeyPoint>

              <p>
                银行用的是<Em>账户模型</Em>——所有人都习惯了。
                以太坊用的也是账户模型。
              </p>
              <p>
                <Hl>BTC 用的是 UTXO 模型</Hl>——这是它和后续大多数链最底层的差异。
              </p>

              <H3>为什么 BTC 选 UTXO？</H3>
              <p>
                因为"账户余额"这个抽象——
                在<Em>没有中央裁判</Em>的环境下，
                极难维护一致性。
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  Alice 同时发出两笔交易，每笔都"花光"她的余额——
                  哪笔先扣？冲突怎么解决？
                </li>
                <li>
                  全网节点对"Alice 当前余额"的状态必须达成共识，
                  状态量随时变化
                </li>
              </ul>

              <p>
                而"<Em>每枚硬币能不能花</Em>"是一个<Hl>二值判断</Hl>——
                要么已花（spent），要么未花（unspent）——
                简单到不可能搞错。
              </p>

              <p>
                这是 UTXO 模型的核心智慧：
                <Hl>用最简单的状态机来表达"钱"，让共识层尽可能简单</Hl>。
              </p>
            </Prose>
          ),
        },
        {
          label: "机制",
          subtitle: "UTXO 的一笔交易长什么样",
          content: (
            <Prose>
              <H3>UTXO = Unspent Transaction Output</H3>
              <p>
                <Em>未花费的交易输出</Em>。
                你的"BTC 持有"就是 UTXO 集合里你能解锁的那部分。
              </p>

              <KeyPoint label="一个 UTXO 包含什么">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>金额</Em>：比如 0.5 BTC
                  </li>
                  <li>
                    <Em>锁定脚本 (locking script)</Em>：
                    描述"满足什么条件才能花掉我"——
                    最常见是"提供地址 X 对应的签名"
                  </li>
                  <li>
                    <Em>身份</Em>：它是哪一笔过去交易的第几个输出
                    （UTXO 用 <code>txid:vout</code> 唯一标识）
                  </li>
                </ul>
              </KeyPoint>

              <H3>一笔 BTC 交易的结构</H3>
              <KeyPoint label="本质：消耗一些 UTXO，生成新的 UTXO">
                <pre className="font-hash text-[11px] leading-relaxed">
{`Transaction {
  inputs: [                    // 要消耗哪些 UTXO
    { utxo_id, unlocking_script },
    { utxo_id, unlocking_script },
    ...
  ]
  outputs: [                   // 生成哪些新 UTXO
    { amount, locking_script },
    { amount, locking_script },
    ...
  ]
}`}
                </pre>
              </KeyPoint>

              <H3>核心约束</H3>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>输入总额 ≥ 输出总额</Em>
                </li>
                <li>
                  差额 = 矿工手续费（自动归打包者）
                </li>
                <li>
                  每个输入 UTXO 的 unlocking_script 必须能让对应 locking_script
                  通过——也就是<Em>签名必须有效</Em>
                </li>
              </ul>

              <H3>UTXO 的生命周期</H3>
              <KeyPoint label="一个 UTXO 只有两种状态">
                <ol className="list-decimal list-inside space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>诞生</Em>：作为某笔交易的 output 进入 UTXO 集合
                  </li>
                  <li>
                    <Em>未花 (Unspent)</Em>：在 UTXO 集合里待用
                  </li>
                  <li>
                    <Em>被花 (Spent)</Em>：被作为另一笔交易的 input 消耗 →
                    立刻从 UTXO 集合里移除，<Em>永不可用</Em>
                  </li>
                </ol>
                <p className="text-[var(--muted)]">
                  一个 UTXO 一旦被花，就<Em>不存在</Em>了——
                  它就像一张面额固定的支票，签了字之后立刻作废，
                  不能撤回不能再花。
                </p>
              </KeyPoint>

              <H3>BTC 网络维护的"状态"</H3>
              <p>
                BTC 的"状态"是什么？很简单——
              </p>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>全体未花 UTXO 的集合</Hl>
              </p>
              <p>
                就这么一个集合。每个全节点维护一份。
                每来一笔新交易：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>把它的 inputs 从 UTXO 集合里移除</li>
                <li>把它的 outputs 加进 UTXO 集合</li>
              </ul>
              <p>
                就这样不断演进，每个节点维护的状态保证一致——
                因为操作是<Em>幂等</Em>的，且双花会被立刻识别（被消耗的 UTXO 已不在集合里）。
              </p>
            </Prose>
          ),
        },
        {
          label: "实例",
          subtitle: "Alice 转 Bob 7 BTC 的完整过程",
          content: (
            <Prose>
              <p>
                用一个具体例子走完 UTXO 模型下的一笔转账。
              </p>

              <H3>初始状态</H3>
              <KeyPoint label="Alice 的钱包">
                <p>
                  Alice 在过去收到过 4 笔交易，留下 4 个 UTXO：
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[3, 5, 2, 10].map((v, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] font-hash text-[11px]"
                    >
                      UTXO_{i + 1}: {v} BTC
                    </div>
                  ))}
                </div>
                <p className="text-[var(--muted)] mt-2">
                  钱包扫描全链，加总 Alice 能解锁的所有 UTXO，
                  在 UI 上显示"余额：20 BTC"——
                  但<Em>账本上没有"余额"这个字段</Em>。
                </p>
              </KeyPoint>

              <H3>Step 1: 选币 (Coin Selection)</H3>
              <p>
                Alice 要转 Bob 7 BTC。第一步——挑哪些 UTXO 当输入？
              </p>
              <KeyPoint label="可能的方案">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>5 + 3 = 8 BTC（找零 1 BTC）</li>
                  <li>10（找零 3 BTC）</li>
                  <li>5 + 2 + 3 = 10 BTC（找零 3 BTC）</li>
                  <li>10 + 2 = 12 BTC（找零 5 BTC）</li>
                </ul>
                <p className="text-[var(--muted)]">
                  钱包软件用算法挑（FIFO、最小找零、隐私优先等策略）。
                  假设挑了 <Hl>5 + 3 = 8 BTC</Hl>。
                </p>
              </KeyPoint>

              <H3>Step 2: 构造交易</H3>
              <KeyPoint label="交易内容">
                <pre className="font-hash text-[11px] leading-relaxed">
{`Transaction {
  inputs: [
    UTXO_2 (5 BTC, Alice 的)
    UTXO_1 (3 BTC, Alice 的)
  ]
  outputs: [
    { 7 BTC, 锁到 Bob 的地址 }
    { 0.9 BTC, 锁到 Alice 的找零地址 }
  ]
}
# 手续费 = 8 - 7 - 0.9 = 0.1 BTC（归矿工）`}
                </pre>
              </KeyPoint>

              <H3>Step 3: 签名</H3>
              <p>
                Alice 用自己的私钥对每个 input 签名——
                证明她确实有权花这两个 UTXO。
                签名挂在 inputs 的 unlocking_script 字段里。
              </p>

              <H3>Step 4: 广播 → 打包</H3>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>Alice 把交易发给某个 BTC 节点</li>
                <li>节点验证签名 ✓ + 输入 UTXO 确实未花 ✓</li>
                <li>放进 mempool，转发给邻居</li>
                <li>某个矿工把它打进新区块</li>
              </ul>

              <H3>Step 5: 状态更新</H3>
              <KeyPoint label="区块被接受后，全网状态发生变化">
                <p>从 UTXO 集合里移除：</p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>UTXO_1 (3 BTC, Alice)</li>
                  <li>UTXO_2 (5 BTC, Alice)</li>
                </ul>
                <p>加入 UTXO 集合：</p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>新 UTXO (7 BTC, Bob)</li>
                  <li>新 UTXO (0.9 BTC, Alice 找零)</li>
                </ul>
              </KeyPoint>

              <H3>结果</H3>
              <KeyPoint label="转账后 Alice 的钱包">
                <div className="flex flex-wrap gap-2">
                  {[10, 2, 0.9].map((v, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] font-hash text-[11px]"
                    >
                      {v} BTC
                    </div>
                  ))}
                </div>
                <p className="text-[var(--muted)] mt-2">
                  3 个 UTXO 共 12.9 BTC（原 20 - 转出 7 - 手续费 0.1）。
                  显示余额：12.9 BTC。
                </p>
              </KeyPoint>
              <KeyPoint label="Bob 的钱包">
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-2 rounded-lg bg-[var(--valid)]/10 border border-[var(--valid)]/30 text-[var(--valid)] font-hash text-[11px]">
                    7 BTC
                  </div>
                </div>
                <p className="text-[var(--muted)] mt-2">
                  多了 1 个 UTXO，显示余额 +7 BTC。
                </p>
              </KeyPoint>

              <p>
                整个过程没有任何"余额字段"被修改——
                <Hl>只有 UTXO 的诞生和消亡</Hl>。
              </p>
            </Prose>
          ),
        },
        {
          label: "为什么",
          subtitle: "BTC 选 UTXO 而不是账户模型",
          content: (
            <Prose>
              <p>
                以太坊用账户模型，BTC 用 UTXO——
                这不是中本聪的偏好，是<Em>对去中心化共识的深思熟虑</Em>。
                看看 UTXO 的四大优势。
              </p>

              <KeyPoint label="① 并行验证友好">
                <p>
                  不同交易如果用的是<Em>不同 UTXO</Em>，
                  完全可以<Hl>并行验证</Hl>。
                </p>
                <p className="text-[var(--muted)]">
                  账户模型下，<Em>同一账户</Em>的两笔交易必须排队处理——
                  因为余额是竞争资源，必须串行。
                </p>
                <p className="text-[var(--muted)]">
                  这是为什么以太坊每个账户有 <code>nonce</code> 字段且必须严格递增。
                  BTC 不需要 nonce——UTXO 用过即作废，没有重放问题。
                </p>
              </KeyPoint>

              <KeyPoint label="② 天然抗双花">
                <p>
                  共识层只需问一个布尔问题：<Hl>"这个 UTXO 是否已被花？"</Hl>
                </p>
                <p className="text-[var(--muted)]">
                  账户模型要查多个状态：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>余额够不够？</li>
                  <li>nonce 是否对？（防重放）</li>
                  <li>账户存不存在？</li>
                </ul>
                <p className="text-[var(--muted)]">
                  状态多一层，bug 多一层，攻击面大一层。
                </p>
              </KeyPoint>

              <KeyPoint label="③ 无状态验证更容易">
                <p>
                  BTC 节点只需要保存<Em>当前 UTXO 集合</Em>——
                  不需要全链历史。
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>UTXO 集合大小：~10 GB（截至 2024）</li>
                  <li>全链历史：~500 GB</li>
                </ul>
                <p className="text-[var(--muted)]">
                  适合<Em>裁剪 (pruning)</Em>——
                  节点可以丢弃很久以前的区块只保留 UTXO 集合。
                  以太坊的全状态裁剪困难得多。
                </p>
              </KeyPoint>

              <KeyPoint label="④ 隐私基础更好">
                <p>
                  同一个人可以用<Em>无数地址</Em>收款，
                  每个 UTXO 独立绑定到不同地址——表面上链分析者要费劲拼接。
                </p>
                <p className="text-[var(--muted)]">
                  账户模型下"地址 = 身份"，
                  所有交易聚合在一个账户名下，
                  从历史看一眼就能拼出此人活动。
                </p>
                <p>
                  注意：UTXO 的隐私优势是<Em>潜在的</Em>，
                  实际操作不当（找零地址泄漏）依然可被追踪——
                  下一页详谈。
                </p>
              </KeyPoint>

              <H3>UTXO 的代价</H3>
              <KeyPoint label="不是没缺点">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>钱包管理更复杂</Em>——
                    必须跟踪一堆 UTXO，做选币算法
                  </li>
                  <li>
                    <Em>交易体积略大</Em>——
                    需要列出输入输出，每个有签名
                  </li>
                  <li>
                    <Em>用户体验上没有"余额"字段</Em>——
                    钱包必须扫链聚合
                  </li>
                  <li>
                    <Em>智能合约表达力受限</Em>——
                    无法做"维护一个长期变化的状态变量"这种事
                    （所以 BTC 没法跑 ERC-20 那种代币）
                  </li>
                </ul>
              </KeyPoint>

              <H3>哲学对应</H3>
              <p>
                两种模型对应到编程范式上：
              </p>
              <ComparisonTable
                headers={["维度", "UTXO (BTC)", "Account (ETH)"]}
                rows={[
                  [
                    "范式",
                    "函数式编程",
                    "命令式编程",
                  ],
                  [
                    "状态",
                    "不可变（immutable）",
                    "可变（mutable）",
                  ],
                  [
                    "并发",
                    "天然并行",
                    "需锁/串行",
                  ],
                  [
                    "心智模型",
                    "硬币",
                    "账户",
                  ],
                  [
                    "适合",
                    "纯支付/储值",
                    "复杂状态合约",
                  ],
                ]}
              />

              <p>
                <Hl>BTC 的简洁来自这个根本选择</Hl>——
                把世界建模成不可变的 UTXO 集合，让一切验证逻辑变得平凡。
                这是对工程复杂度的深刻克制。
              </p>
            </Prose>
          ),
        },
        {
          label: "Script",
          subtitle: "UTXO 用什么「锁」住",
          content: (
            <Prose>
              <p>
                每个 UTXO 都带一段<Em>锁定脚本 (locking script / scriptPubKey)</Em>——
                描述"满足什么条件才能花掉我"。
              </p>

              <H3>最常见的锁：P2PKH</H3>
              <KeyPoint label="Pay to Public Key Hash 的锁定脚本">
                <pre className="font-hash text-[11px] leading-relaxed">
{`OP_DUP
OP_HASH160
<收款人公钥哈希>
OP_EQUALVERIFY
OP_CHECKSIG`}
                </pre>
                <p className="text-[var(--muted)] mt-2">
                  翻译成人话：<Hl>"给我一个签名 + 公钥，且公钥哈希等于这个值"</Hl>。
                </p>
              </KeyPoint>

              <H3>解锁：花这个 UTXO 时要提供什么</H3>
              <KeyPoint label="解锁脚本 (unlocking script / scriptSig)">
                <pre className="font-hash text-[11px] leading-relaxed">
{`<签名>
<公钥>`}
                </pre>
                <p className="text-[var(--muted)] mt-2">
                  节点把"解锁脚本 + 锁定脚本"拼接执行——
                  栈顶为 true 就放行，false 就拒绝。
                </p>
              </KeyPoint>

              <H3>执行流程（直观看）</H3>
              <KeyPoint label="节点验证流程">
                <pre className="font-hash text-[11px] leading-relaxed">
{`stack = []
执行: <签名>             → 栈: [签名]
执行: <公钥>             → 栈: [签名, 公钥]
执行: OP_DUP             → 栈: [签名, 公钥, 公钥]
执行: OP_HASH160         → 栈: [签名, 公钥, 公钥哈希]
执行: <预期公钥哈希>     → 栈: [签名, 公钥, 公钥哈希, 预期值]
执行: OP_EQUALVERIFY     → 栈: [签名, 公钥]（且两值相等）
执行: OP_CHECKSIG        → 栈: [True]（且签名验证通过）

栈顶 = True → 接受
栈顶 = False / 中间任何一步失败 → 拒绝`}
                </pre>
              </KeyPoint>

              <H3>Bitcoin Script 的关键设计：故意不图灵完备</H3>
              <KeyPoint label="语言能力">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>只有<Em>几十个操作码</Em>（OP_*）</li>
                  <li><Em>没有循环</Em>（while, for）</li>
                  <li><Em>没有递归</Em></li>
                  <li>栈式（不像通用编程语言用变量）</li>
                  <li>每个操作有明确的执行成本上限</li>
                </ul>
              </KeyPoint>

              <p>
                这是有意为之——<Hl>简单 + 可预测 + 不可能拖垮网络</Hl>。
                没有循环 = 任何脚本最长就是它的字节数 = 验证时间可预估。
              </p>

              <H3>对比 ETH 的 Solidity</H3>
              <ComparisonTable
                headers={["维度", "Bitcoin Script", "Solidity (EVM)"]}
                rows={[
                  ["图灵完备", "❌", "✅"],
                  ["循环递归", "❌", "✅"],
                  ["状态变量", "❌（只能验证条件）", "✅（任意复杂）"],
                  ["计算成本上限", "脚本字节长度（小）", "Gas 限制（动态）"],
                  ["攻击面", "几乎为零", "重入攻击、整数溢出等大量漏洞"],
                  [
                    "DeFi / NFT / DAO",
                    <span key="no" className="text-[var(--invalid)]">
                      做不了
                    </span>,
                    <span key="yes" className="text-[var(--valid)]">
                      可以
                    </span>,
                  ],
                  [
                    "稳定性",
                    <Hl key="s">15 年零事故</Hl>,
                    "几乎每年都有大型黑客事件",
                  ],
                ]}
              />

              <H3>这是一个根本选择</H3>
              <p>
                BTC 选择"<Hl>简单到不可能出错</Hl>"——
                牺牲表达力，换取不可篡改的可靠。
              </p>
              <p>
                ETH 选择"<Em>表达力优先</Em>"——
                让任意应用上链，代价是不断的安全漏洞。
              </p>
              <p>
                两条路没有对错——是不同的设计哲学。
                <Hl>BTC 是结算层，ETH 是应用层</Hl>，本质就该不同。
              </p>

              <H3>Bitcoin Script 能做什么？</H3>
              <KeyPoint label="超出 P2PKH 的高级用法">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>多签 (Multisig)</Em>：要 m-of-n 个签名
                  </li>
                  <li>
                    <Em>时间锁 (Timelock)</Em>：某时间之前/之后才能花
                  </li>
                  <li>
                    <Em>哈希时间锁 (HTLC)</Em>：闪电网络的基础
                  </li>
                  <li>
                    <Em>Taproot 复杂条件</Em>（2021 升级后）
                  </li>
                </ul>
              </KeyPoint>
            </Prose>
          ),
        },
        {
          label: "对比",
          subtitle: "UTXO vs Account 的世界观差异",
          content: (
            <Prose>
              <p>
                把 BTC（UTXO）和 ETH / 银行（Account）放在一起对比，
                能看到这两种模型是<Em>世界观级别的差异</Em>——
                不是 API 不同，是对"钱"的根本理解不同。
              </p>

              <H3>逐项对比</H3>
              <ComparisonTable
                headers={["维度", "BTC (UTXO)", "ETH / 银行 (Account)"]}
                rows={[
                  [
                    "状态单位",
                    "一个个独立 UTXO",
                    "账户余额字段",
                  ],
                  [
                    "查「余额」",
                    "扫描 UTXO 集合加总",
                    "读一个字段",
                  ],
                  [
                    "花钱",
                    "消耗输入 → 生成输出",
                    "余额加减",
                  ],
                  [
                    "双花检查",
                    <span key="utxo" className="text-[var(--valid)]">
                      "这 UTXO 花过吗"——一个布尔
                    </span>,
                    "余额 + nonce 多个状态",
                  ],
                  [
                    "并发友好",
                    <Hl key="par">极好（独立 UTXO 完全并行）</Hl>,
                    "差（同账户需排队）",
                  ],
                  [
                    "智能合约",
                    "受限（Script 不图灵完备）",
                    "强大（EVM 任意逻辑）",
                  ],
                  [
                    "节点存储",
                    "UTXO set ~10GB",
                    "全状态 ~500GB+ 持续增长",
                  ],
                  [
                    "心智模型",
                    "硬币 / 现金",
                    "账户 / 银行卡",
                  ],
                  [
                    "范式类比",
                    "函数式（不可变）",
                    "命令式（可变）",
                  ],
                ]}
              />

              <H3>为什么这是"世界观差异"</H3>
              <p>
                两种模型对"钱"这个东西的<Em>本体论</Em>理解完全不同：
              </p>

              <KeyPoint label="UTXO 模型的「钱」">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>钱是<Em>不可变的硬币</Em></li>
                  <li>每枚硬币只有"花掉"和"未花"两态</li>
                  <li>钱在持有者之间流动，但单枚硬币的"身份"不变</li>
                  <li>没有"账户"，只有"能解锁这枚硬币的人"</li>
                </ul>
                <p className="text-[var(--muted)]">
                  类比：物理现金。
                  你给我 100 块，那张纸币换了主人，
                  但纸币本身（包括序列号）没变。
                </p>
              </KeyPoint>

              <KeyPoint label="Account 模型的「钱」">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>钱是<Em>账户里可加减的数字</Em></li>
                  <li>没有"独立的硬币"概念，只有当前账户余额</li>
                  <li>转账 = 修改两个账户的字段</li>
                  <li>账户是身份的延伸</li>
                </ul>
                <p className="text-[var(--muted)]">
                  类比：银行存款。
                  你给我 100 块，是"你的账户 -100"+"我的账户 +100"——
                  没有任何"实体"在转移。
                </p>
              </KeyPoint>

              <H3>上层一切体验差异都源于此</H3>
              <p>
                这个底层选择决定了上层的方方面面：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>费用模型</Em>：BTC 按字节，ETH 按 gas（操作复杂度）
                </li>
                <li>
                  <Em>并发特性</Em>：BTC 天然并行，ETH 单账户串行
                </li>
                <li>
                  <Em>合约形态</Em>：BTC 只能验证条件，ETH 能维护状态
                </li>
                <li>
                  <Em>隐私特性</Em>：BTC 多地址易混淆，ETH 账户即身份
                </li>
                <li>
                  <Em>升级路径</Em>：BTC 软分叉小心翼翼，ETH 硬分叉激进迭代
                </li>
              </ul>

              <p>
                <Hl>没有对错，只有取舍</Hl>。
                BTC 选简单 + 稳定 + 可证明，
                ETH 选灵活 + 可扩展 + 可编程。
                两者服务于不同需求——
                这也是它们能并存而非替代关系的根本原因。
              </p>
            </Prose>
          ),
        },
        {
          label: "隐私",
          subtitle: "UTXO 的隐私陷阱",
          content: (
            <Prose>
              <p>
                "BTC 是匿名的"——这是新人最大的误解之一。
                <Hl>BTC 是"伪匿名 (Pseudonymous)"，不是真匿名</Hl>。
                这一页讲清楚为什么。
              </p>

              <H3>表面上：多地址 = 隐私</H3>
              <p>
                BTC 钱包可以生成无数地址，每笔收款用新地址——
                "看起来"是无数个不同的人。
              </p>

              <H3>实际上：找零地址会泄漏所有权</H3>
              <KeyPoint label="一个具体场景">
                <p>
                  Alice 输入 5+3 BTC，输出 7 给 Bob + 0.9 找零给自己（一个新地址）。
                </p>
                <p className="text-[var(--muted)]">
                  链分析者看到这笔交易，会做这个推理：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    "0.9" 是个奇怪零碎的数——不像是支付意图
                  </li>
                  <li>
                    "7" 是个整数——更像是"Alice 主动想付的金额"
                  </li>
                  <li>
                    所以 7 给 Bob，0.9 是<Em>找零</Em>给 Alice
                  </li>
                  <li>
                    <Hl>那个收 0.9 的"新地址"也是 Alice 的</Hl>
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  Alice 的两个地址因此被关联。
                  以此类推，可以一直拼出 Alice 用过的所有地址。
                </p>
              </KeyPoint>

              <H3>启发式规则的全家桶</H3>
              <p>
                链分析公司（Chainalysis、Elliptic 等）用一套<Em>启发式规则</Em>
                做地址聚类（Common Input Heuristic、Round Number Heuristic 等）：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>共同输入</Em>：一笔交易的多个输入 UTXO 大概率属于同一人
                </li>
                <li>
                  <Em>整数判断</Em>：0.9 像找零，7 像付款
                </li>
                <li>
                  <Em>时间相关</Em>：地址使用模式（活跃时间、平均金额）匹配
                </li>
                <li>
                  <Em>交易所充提</Em>：充值地址绑定到具体用户身份（KYC）
                </li>
              </ul>

              <H3>真实"链上侦探"案例</H3>
              <KeyPoint label="2013 Silk Road 调查">
                <p>
                  美国 FBI 通过链分析，
                  把 Silk Road 创始人 Ross Ulbricht 的地址和真实身份关联——
                  最终缴获约 17.4 万 BTC。
                </p>
              </KeyPoint>
              <KeyPoint label="2022 Colonial Pipeline 勒索">
                <p>
                  美国黑客被勒索 75 BTC，
                  FBI 在 1 个月内追踪到 64 BTC 的去向，并成功扣押。
                </p>
              </KeyPoint>

              <H3>提升隐私的工具</H3>
              <KeyPoint label="可用的对抗手段">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>CoinJoin</Em>：
                    多人交易混合（Wasabi、Samourai），
                    打乱输入输出关联
                  </li>
                  <li>
                    <Em>Taproot (2021)</Em>：
                    让多签和单签看起来无差别
                  </li>
                  <li>
                    <Em>Lightning Network</Em>：
                    链下交易，只有开关通道时上链——
                    主链上看不见中间细节
                  </li>
                  <li>
                    <Em>个人卫生</Em>：
                    一笔收款一个新地址、不复用、不向 KYC 平台关联
                  </li>
                </ul>
              </KeyPoint>

              <H3>核心启示</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>BTC 链上一切公开可见、永久留存</Hl>——
                这是它最大的优点（可审计），也是最大的隐私挑战。
              </p>

              <p>
                BTC 默认<Em>不</Em>提供隐私——
                想要隐私必须主动用上述工具。
                想做"完全隐私的转账"，需要的是 Monero 或 Zcash 这种
                <Em>从底层就把隐私当首要目标</Em>的链。
              </p>

              <p>
                BTC 的设计选择是——
                把"<Hl>透明可审计</Hl>"放在第一位，
                把"<Em>个人隐私</Em>"作为可选层。
                这反映了它想做"全球结算层"的定位——
                透明对监管者可解释、对节点可独立验证，
                这两件事比隐私更优先。
              </p>
            </Prose>
          ),
        },
      ]}
    />
  );
}
