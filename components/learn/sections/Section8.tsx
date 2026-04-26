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
import { TransactionLifecycle } from "@/components/learn/TransactionLifecycle";

export function Section8() {
  return (
    <SectionTabs
      step={8}
      pages={[
        {
          label: "全景",
          subtitle: "把所有零件串起来",
          content: (
            <Prose>
              <p>
                前 8 章我们一步步推导出了 BTC 的每一个零件。
                现在跟着 Alice 给 Bob 转 1 BTC 这笔具体交易，
                把所有零件按时间顺序看一遍。
              </p>

              <H3>剧情设定</H3>
              <KeyPoint label="一笔具体交易">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>Alice</Em> 钱包里有 2 个 UTXO：0.6 + 0.7 BTC，共 1.3 BTC
                  </li>
                  <li>
                    <Em>Alice</Em> 要给 <Em>Bob</Em> 转 1 BTC
                  </li>
                  <li>
                    网络当前手续费率：约 10 sat/vB（中等水平）
                  </li>
                  <li>
                    一笔普通交易体积约 250 vB（virtual bytes），
                    所以手续费约 2500 sat = 0.000025 BTC
                  </li>
                </ul>
              </KeyPoint>

              <H3>交互式演示</H3>
              <p>
                点下面每一步，看交易是怎么从 Alice 的钱包到 Bob 收到 6 次确认的全过程。
                每一步都会标出对应的章节——你可以反过来检验前面学到的概念。
              </p>

              <div className="my-4">
                <TransactionLifecycle />
              </div>

              <H3>接下来几页</H3>
              <p>
                后面的页会拆开每一步详细看：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>构造 → 广播 → 打包 → 上链 → 确认</li>
                <li>每个步骤涉及哪些前面的章节</li>
                <li>Alice 和 Bob 的钱包状态怎么变化</li>
                <li>最后给一份完整的"零件 → 章节"映射表</li>
              </ul>
            </Prose>
          ),
        },
        {
          label: "构造",
          subtitle: "Alice 钱包做的 4 件事",
          content: (
            <Prose>
              <p>
                Alice 在自己手机上点击"转账"——这一刻钱包软件做了大量工作。
                解开看具体哪几步：
              </p>

              <H3>Step 1: 选币 (Coin Selection)</H3>
              <KeyPoint label="挑哪些 UTXO 当输入">
                <p>Alice 钱包里有 0.6 + 0.7 = 1.3 BTC，要转 1 BTC。</p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>方案 A：用 0.6 + 0.7 两个全部</li>
                  <li>
                    钱包算法选 ✓——刚好覆盖金额，找零最少
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  涉及章节：<Em>第 5 章 UTXO</Em>——
                  钱包扫所有能解锁的 UTXO 加总余额，按策略选币。
                </p>
              </KeyPoint>

              <H3>Step 2: 算找零</H3>
              <KeyPoint label="找零金额">
                <pre className="font-hash text-[11px] leading-relaxed">
{`输入总额: 0.6 + 0.7 = 1.3 BTC
转给 Bob: 1.0 BTC
手续费:    0.000025 BTC
找零给自己: 1.3 - 1.0 - 0.000025 = 0.299975 BTC`}
                </pre>
                <p className="text-[var(--muted)]">
                  钱包自动生成一个新的"找零地址"接收这 0.299975 BTC——
                  避免泄漏 Alice 的总余额给链分析。
                </p>
              </KeyPoint>

              <H3>Step 3: 组装交易</H3>
              <KeyPoint label="完整交易结构">
                <pre className="font-hash text-[11px] leading-relaxed">
{`Transaction {
  inputs: [
    UTXO(0.6 BTC, Alice 持有),
    UTXO(0.7 BTC, Alice 持有)
  ]
  outputs: [
    { 1.0 BTC,       lock_to: Bob 的地址 },
    { 0.299975 BTC,  lock_to: Alice 找零地址 }
  ]
  # 手续费 = 输入 - 输出 = 0.000025 BTC（隐含）
}`}
                </pre>
                <p className="text-[var(--muted)]">
                  涉及章节：<Em>第 5 章 UTXO 模型 + Bitcoin Script</Em>——
                  outputs 里的 lock_to 是个 P2PKH 锁定脚本。
                </p>
              </KeyPoint>

              <H3>Step 4: 签名</H3>
              <KeyPoint label="证明 Alice 确实有权花这两个 UTXO">
                <ol className="list-decimal list-inside space-y-1 text-[var(--muted)]">
                  <li>
                    对交易数据做<Em>双重 SHA-256</Em>哈希 → 得到要签的消息哈希
                  </li>
                  <li>
                    用 Alice 的<Em>私钥</Em>对消息哈希做 ECDSA 签名 → 得 (r, s)
                  </li>
                  <li>
                    把 (r, s) + Alice 公钥放进每个 input 的<Em>解锁脚本 (scriptSig)</Em>
                  </li>
                </ol>
                <p className="text-[var(--muted)]">
                  涉及章节：<Em>第 4 章 数字签名</Em>。
                  签名本身只有几十字节，但它是这笔交易合法性的<Em>唯一证据</Em>。
                </p>
              </KeyPoint>

              <H3>整个过程在哪发生</H3>
              <p>
                以上 4 步全部发生在 <Hl>Alice 的手机里</Hl>——
                网络流量为 0。整个构造过程不到 100 毫秒。
              </p>

              <p>
                关键洞察：<Em>BTC 交易的"产生"是完全本地的</Em>。
                网络只在下一步——广播——才介入。
                这意味着即使在断网状态下，
                Alice 也能签好一笔交易，
                等连上网后再发出去。
              </p>
            </Prose>
          ),
        },
        {
          label: "广播",
          subtitle: "交易传遍全网",
          content: (
            <Prose>
              <p>
                Alice 钱包构造好交易后，下一步是把它发到全网。
                这是 BTC 网络的<Em>通信层</Em>——基于 P2P gossip 协议。
              </p>

              <H3>Step 5: 发到一个节点</H3>
              <KeyPoint label="入口">
                <p>
                  Alice 的钱包预设连接了几个 BTC 全节点
                  （比如自己跑的、或者公共的 RPC 服务）。
                  把交易发给其中任一个节点。
                </p>
                <p className="text-[var(--muted)]">
                  注意：<Em>不需要"找到正确的接收者"</Em>。
                  随便一个节点都行——网络会自动传开。
                </p>
              </KeyPoint>

              <H3>Step 6: 节点验证</H3>
              <KeyPoint label="收到的节点要做的检查">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    ✓ <Em>输入 UTXO 确实存在且未花</Em>
                    （查 UTXO 集合）
                  </li>
                  <li>
                    ✓ <Em>签名有效</Em>
                    （ECDSA 验证 - 第 4 章）
                  </li>
                  <li>
                    ✓ <Em>输入总额 ≥ 输出总额</Em>
                  </li>
                  <li>
                    ✓ <Em>解锁脚本能让锁定脚本通过</Em>
                    （Bitcoin Script - 第 5 章）
                  </li>
                  <li>
                    ✓ <Em>交易格式合法</Em>（字段大小、版本号等）
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  任一不通过 → 节点拒绝并不再转发。
                  通过 → 进入下一步。
                </p>
              </KeyPoint>

              <H3>Step 7: 进 mempool + 转发</H3>
              <KeyPoint label="mempool（待打包池）">
                <p>
                  通过验证的交易进入<Em>本地 mempool</Em>——
                  一个尚未被打包进任何区块的交易等候室。
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>同时把这笔交易转发给它连接的所有邻居节点</li>
                  <li>
                    邻居重复同样的验证流程，再转发给自己的邻居
                  </li>
                  <li>
                    病毒式扩散——几秒到十几秒覆盖全球大多数节点
                  </li>
                </ul>
              </KeyPoint>

              <H3>此时的状态</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>交易"看得见"了，但还没"被确认"</Hl>。
              </p>

              <p>
                Bob 用区块浏览器查 Alice 的地址，
                会看到一笔"待确认 (unconfirmed)"的交易标记。
                这表示：交易已被矿工的 mempool 看到，
                但<Em>还没有任何矿工把它打进区块</Em>。
              </p>

              <H3>关于 mempool 的几件事</H3>
              <KeyPoint label="一些细节">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    每个全节点的 mempool 都是独立的——
                    没有"全网统一 mempool"
                  </li>
                  <li>
                    mempool 大小有限——溢出时会丢弃手续费率最低的交易
                  </li>
                  <li>
                    交易在 mempool 里默认存活约 14 天，
                    之后被自动清除（如果一直没被打包）
                  </li>
                  <li>
                    你可以"<Em>重发 (RBF)</Em>"：
                    用更高手续费替换 mempool 里同 UTXO 的旧交易
                    （节点优先打包高手续费的版本）
                  </li>
                </ul>
              </KeyPoint>
            </Prose>
          ),
        },
        {
          label: "打包",
          subtitle: "矿工的工作",
          content: (
            <Prose>
              <p>
                全球矿工都在用自己的 mempool 不断打包候选区块——
                每个矿工选自己想打包的交易，构造区块尝试挖矿。
              </p>

              <H3>Step 8: 矿工选交易</H3>
              <KeyPoint label="选择策略">
                <p>
                  矿工不是按时间顺序——而是<Em>按手续费率</Em>选交易：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    优先打包手续费率（sat/vB）最高的交易
                  </li>
                  <li>
                    Alice 的 10 sat/vB 是中等水平——
                    会被打包，但不一定是最优先的
                  </li>
                  <li>
                    一个区块最多 ~4MB（SegWit 等效），
                    能装下 ~3000 笔交易
                  </li>
                </ul>
              </KeyPoint>

              <H3>Step 9: 构造区块</H3>
              <KeyPoint label="区块结构">
                <p>
                  矿工把一堆交易按手续费排序，
                  组装成一个候选区块：
                </p>
                <pre className="font-hash text-[11px] leading-relaxed">
{`Block {
  Header (80 bytes) {
    version, prevHash, merkleRoot,
    timestamp, difficulty, nonce
  }
  Transactions: [
    Coinbase 交易（先放）  ← 给矿工自己 3.125 BTC + 所有手续费
    Tx_1, Tx_2, ..., Tx_n  ← 来自 mempool 的交易
  ]
}`}
                </pre>
                <p className="text-[var(--muted)]">
                  涉及章节：<Em>第 7 章 Coinbase</Em>——
                  第一笔交易是凭空生成 BTC 给矿工自己的特殊交易。
                </p>
              </KeyPoint>

              <H3>Step 10: 算 Merkle Root</H3>
              <KeyPoint label="把所有交易汇总成一个根哈希">
                <p>
                  对区块里所有交易（包括 Coinbase 和 Alice 这笔）做 Merkle Tree——
                  得到一个 32 字节的 root hash，
                  写进区块头的 <code>merkleRoot</code> 字段。
                </p>
                <p className="text-[var(--muted)]">
                  涉及章节：<Em>第 6 章 Merkle Tree</Em>。
                  这一步让后续 SPV 钱包能高效证明 "Alice 这笔在区块里"。
                </p>
              </KeyPoint>

              <H3>Step 11: 穷举 nonce 找有效哈希</H3>
              <KeyPoint label="挖矿真正的「工作」">
                <pre className="font-hash text-[11px] leading-relaxed">
{`while True:
    block.header.nonce += 1
    h = SHA256(SHA256(block.header))
    if h < 难度目标（足够多 0 开头）:
        广播 block
        break`}
                </pre>
                <p className="text-[var(--muted)]">
                  涉及章节：<Em>第 3 章 PoW</Em>。
                  全球所有矿工都在做这件事——
                  谁先撞到合格的 nonce 谁出块。
                </p>
                <p className="text-[var(--muted)]">
                  期望尝试次数：<Hl>~10²³</Hl>（10 万亿亿次）。
                  整个 BTC 网络每秒做大约 5 × 10²⁰ 次 SHA-256——
                  10 分钟左右总会有人撞到。
                </p>
              </KeyPoint>

              <H3>关键时刻：找到了！</H3>
              <p>
                假设 30 分钟后，某矿池 M 的一台矿机找到了合格的 nonce。
                立刻：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  这台矿机把完整区块发给矿池
                </li>
                <li>
                  矿池把区块广播给它的邻居全节点
                </li>
                <li>
                  邻居验证 ✓ → 转发 → 全网扩散
                </li>
              </ul>

              <p>
                这一瞬间——<Hl>Alice 那笔交易被打进了区块</Hl>。
                但还没结束——下一页看后续。
              </p>
            </Prose>
          ),
        },
        {
          label: "上链",
          subtitle: "全网验证 + 接受",
          content: (
            <Prose>
              <p>
                矿工广播了找到的新区块。
                每个收到区块的节点都要做严格验证——这是 BTC 安全模型的核心。
              </p>

              <H3>Step 12: 节点验证新区块</H3>
              <KeyPoint label="区块级验证">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    ✓ <Em>区块头哈希满足难度</Em>
                    （前面足够多 0）—— 第 3 章 PoW
                  </li>
                  <li>
                    ✓ <Em>prevHash 接的是当前最长链</Em>
                    —— 第 2 章哈希链
                  </li>
                  <li>
                    ✓ <Em>时间戳合理</Em>
                    （不能太早或太未来）
                  </li>
                  <li>
                    ✓ <Em>区块大小不超限</Em>（&lt; 4MB 等效）
                  </li>
                </ul>
              </KeyPoint>

              <KeyPoint label="交易级验证（每笔交易）">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    ✓ <Em>所有签名有效</Em>—— 第 4 章
                  </li>
                  <li>
                    ✓ <Em>所有输入 UTXO 存在且未花</Em>—— 第 5 章
                  </li>
                  <li>
                    ✓ <Em>所有解锁脚本通过</Em>
                  </li>
                  <li>
                    ✓ <Em>Coinbase 交易奖励金额合规</Em>—— 第 7 章
                  </li>
                </ul>
              </KeyPoint>

              <KeyPoint label="Merkle Root 验证">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    ✓ <Em>本地用区块里所有交易重算 Merkle Root</Em>
                  </li>
                  <li>
                    ✓ <Em>必须等于区块头里写的 merkleRoot</Em>—— 第 6 章
                  </li>
                </ul>
              </KeyPoint>

              <H3>所有验证通过 → 接受</H3>
              <p>
                节点把新区块追加到本地链——
                此时<Hl>本地链长度 +1</Hl>。
                立刻把这个区块转发给它的邻居。
              </p>

              <H3>全球同步速度</H3>
              <KeyPoint label="时间线">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>0 秒：矿工广播新区块</li>
                  <li>1-5 秒：周边节点收到 + 验证 + 转发</li>
                  <li>10-30 秒：全球大多数节点都已接受</li>
                  <li>1-2 分钟：99% 节点同步完成</li>
                </ul>
              </KeyPoint>

              <H3>此时的状态变化</H3>
              <KeyPoint label="UTXO 集合">
                <p>
                  全网每个节点的 UTXO 集合同步更新：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    移除：Alice 的两个旧 UTXO (0.6 + 0.7)
                  </li>
                  <li>
                    加入：Bob 的新 UTXO (1.0 BTC)
                  </li>
                  <li>
                    加入：Alice 的找零 UTXO (0.299975 BTC)
                  </li>
                  <li>
                    加入：矿工的 Coinbase UTXO (3.125 + 手续费 BTC)
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  这是<Em>原子操作</Em>——要么全部生效，要么全部不生效。
                </p>
              </KeyPoint>

              <H3>1 次确认</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>Alice 的交易现在拥有 1 次确认</Hl>。
              </p>

              <p>
                Bob 用区块浏览器查 Alice 的地址，
                看到那笔交易状态变成"<Em>1 confirmation</Em>"——
                他知道交易已被打包了。
              </p>

              <p>
                但 Bob 应该立刻发货吗？
                <Em>对于大额交易，1 次确认还不够安全</Em>——
                这个区块仍可能被分叉抛弃。
                下一页看后续确认。
              </p>
            </Prose>
          ),
        },
        {
          label: "确认",
          subtitle: "等到 6 次确认",
          content: (
            <Prose>
              <p>
                第 1 次确认后，时间继续走。
                每过 ~10 分钟，全网产生新区块——
                只要这些新区块都"接在"Alice 那笔交易之后，
                确认次数就<Em>累加</Em>。
              </p>

              <H3>Step 13: 后续确认</H3>
              <KeyPoint label="时间线">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>10 分钟后</Em>：下一个区块出来 →
                    Alice 那笔有了 <Hl>2 次确认</Hl>
                  </li>
                  <li>
                    <Em>20 分钟</Em>：3 次确认
                  </li>
                  <li>
                    <Em>30 分钟</Em>：4 次确认
                  </li>
                  <li>
                    <Em>40 分钟</Em>：5 次确认
                  </li>
                  <li>
                    <Em>~50-60 分钟</Em>：<Hl>6 次确认</Hl>——
                    被回滚的概率小于 10⁻¹⁸（实际为零）
                  </li>
                </ul>
              </KeyPoint>

              <H3>每多一次确认，攻击成本翻倍</H3>
              <p>
                想回滚一笔已有 N 次确认的交易，攻击者需要：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>从 Alice 那笔交易所在的区块开始<Em>重算 N+1 个区块</Em></li>
                <li>同时全网诚实矿工还在源源不断推进主链</li>
                <li>
                  必须用更多算力<Em>追上并超过</Em>主链
                </li>
              </ul>
              <p>
                数学上：在 BTC 当前算力分布下，
                攻击者持有 30% 算力时回滚 6 次确认的概率约为 0.0002%——
                <Hl>实际不可行</Hl>。
              </p>

              <H3>不同场景的"何时算"安全</H3>
              <ComparisonTable
                headers={["场景", "建议确认", "等待时间", "金额规模"]}
                rows={[
                  [
                    "买杯咖啡",
                    "0-1",
                    "0-10 分钟",
                    "& lt; $50",
                  ],
                  [
                    "网购小额",
                    "1-2",
                    "10-20 分钟",
                    "$50-500",
                  ],
                  [
                    "交易所充提",
                    "3-6",
                    "30-60 分钟",
                    "$500-50,000",
                  ],
                  [
                    "大额跨境结算",
                    "6+",
                    "1+ 小时",
                    "& gt; $50,000",
                  ],
                ]}
              />

              <H3>Step 14: Bob 收到</H3>
              <KeyPoint label="Bob 钱包的视角">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    Bob 钱包监听新区块（或定期向全节点查询）
                  </li>
                  <li>
                    发现自己地址下多了一个 UTXO（1.0 BTC）
                  </li>
                  <li>
                    Bob 余额 +1 BTC（钱包 UI 实时刷新）
                  </li>
                  <li>
                    显示"已收到（6 次确认）"
                  </li>
                </ul>
              </KeyPoint>

              <H3>Alice 钱包的视角</H3>
              <KeyPoint label="变化">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    原来的 0.6 + 0.7 BTC UTXO 标记为已花
                  </li>
                  <li>
                    新增找零 UTXO 0.299975 BTC
                  </li>
                  <li>
                    钱包 UI 显示余额：0.299975 BTC（之前是 1.3 - 1 = 0.3 = 减去手续费）
                  </li>
                </ul>
              </KeyPoint>

              <H3>交易完成</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>到这一刻，Alice 给 Bob 的转账完成且不可逆</Hl>。
                没有银行参与、没有任何机构能撤销、
                没有人能伪造或修改这笔交易的任何细节。
              </p>

              <p>
                整个过程：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>从 Alice 点击转账到 6 次确认：约 1 小时</li>
                <li>跨境？同样 1 小时——和本地无差别</li>
                <li>金额？从 0.0001 到 1000 BTC，机制完全一样</li>
                <li>时间？工作日、节假日、半夜——都是 10 分钟一个块</li>
              </ul>

              <p>
                这是 BTC 给世界的礼物——
                <Hl>一种不依赖任何机构的、全球永久可用的、不可逆的价值转移</Hl>。
              </p>
            </Prose>
          ),
        },
        {
          label: "对照表",
          subtitle: "每一步对应哪一章",
          content: (
            <Prose>
              <p>
                把整个交易流程与前 0-7 章——映射起来——
                你会看到每个零件都在路径上登场，缺一不可。
              </p>

              <ComparisonTable
                headers={["步骤", "涉及章节", "做了什么"]}
                rows={[
                  [
                    "Alice 钱包持有私钥、生成地址",
                    <Hl key="4">第 4 章 数字签名</Hl>,
                    "私钥即身份",
                  ],
                  [
                    "选 UTXO 作为输入",
                    <Hl key="5">第 5 章 UTXO</Hl>,
                    "扫 UTXO 集合 + 选币算法",
                  ],
                  [
                    "对交易做 SHA-256 双重哈希",
                    <Hl key="2">第 2 章 哈希</Hl>,
                    "得到要签的消息哈希",
                  ],
                  [
                    "用私钥做 ECDSA 签名",
                    <Hl key="4b">第 4 章 数字签名</Hl>,
                    "证明持有私钥",
                  ],
                  [
                    "广播交易到 P2P 网络",
                    <Hl key="1">第 1 章 公开账本</Hl>,
                    "病毒式 gossip 扩散",
                  ],
                  [
                    "节点验证签名 + UTXO 未花",
                    <Hl key="all">第 4、5 章</Hl>,
                    "本地独立验证",
                  ],
                  [
                    "交易进 mempool 等候打包",
                    "—",
                    "等候室",
                  ],
                  [
                    "矿工组装候选区块",
                    <Hl key="3">第 3 章 PoW</Hl>,
                    "选择高手续费交易 + Coinbase",
                  ],
                  [
                    "Coinbase 交易凭空生成奖励",
                    <Hl key="7">第 7 章 Coinbase</Hl>,
                    "矿工拿 3.125 BTC + 手续费",
                  ],
                  [
                    "构造 Merkle Tree 算 Root",
                    <Hl key="6">第 6 章 Merkle</Hl>,
                    "32 字节承诺所有交易",
                  ],
                  [
                    "穷举 nonce 找合规哈希",
                    <Hl key="3b">第 3 章 PoW</Hl>,
                    "10²³ 次尝试",
                  ],
                  [
                    "广播找到的区块",
                    <Hl key="1b">第 1 章 公开账本</Hl>,
                    "向全网传播",
                  ],
                  [
                    "节点验证区块哈希 + 难度",
                    <Hl key="3c">第 3 章 PoW</Hl>,
                    "验证工作量证明",
                  ],
                  [
                    "节点验证 prevHash + 链结构",
                    <Hl key="2b">第 2 章 哈希链</Hl>,
                    "确认接在最长链上",
                  ],
                  [
                    "节点验证 Merkle Root",
                    <Hl key="6b">第 6 章 Merkle</Hl>,
                    "本地重算对比",
                  ],
                  [
                    "全网更新 UTXO 集合",
                    <Hl key="5b">第 5 章 UTXO</Hl>,
                    "状态原子切换",
                  ],
                  [
                    "等到 6 次确认",
                    <Hl key="3d">第 3 章 最长链 + PoW</Hl>,
                    "经济学保证不可逆",
                  ],
                  [
                    "Bob 钱包检测新 UTXO",
                    <Hl key="5c">第 5 章 + 第 6 章</Hl>,
                    "可用 SPV + Merkle Proof 验证",
                  ],
                ]}
              />

              <H3>看到了吗</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>每一个零件都在这条路径上登场，并且缺一不可</Hl>。
                删掉任何一章的零件，整个系统都会在某一环倒塌。
              </p>

              <H3>缺哪个会怎样？</H3>
              <KeyPoint label="假设缺零件">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>缺第 1 章公开账本</Em>：
                    全网无法广播——交易无人知晓
                  </li>
                  <li>
                    <Em>缺第 2 章哈希链</Em>：
                    历史可被偷偷篡改——账本不可信
                  </li>
                  <li>
                    <Em>缺第 3 章 PoW</Em>：
                    任何人随手出块——分叉无解，攻击免费
                  </li>
                  <li>
                    <Em>缺第 4 章签名</Em>：
                    Alice 转 Bob 这一行任何人都能写——账本沦为玩笑
                  </li>
                  <li>
                    <Em>缺第 5 章 UTXO</Em>：
                    余额表达成账户字段——一致性问题指数级复杂化
                  </li>
                  <li>
                    <Em>缺第 6 章 Merkle</Em>：
                    手机钱包用不了——BTC 沦为只能跑全节点的小众系统
                  </li>
                  <li>
                    <Em>缺第 7 章 Coinbase</Em>：
                    BTC 永远生不出来——挖矿没奖励——网络不会启动
                  </li>
                </ul>
              </KeyPoint>

              <p>
                这就是 BTC 设计的<Hl>精妙之处</Hl>——
                每个零件不仅"有用"，而且"不可替代"。
                这不是一个"很多功能堆叠"的系统，
                而是一个<Em>每个零件都被前一个问题逼出来的最小可行集合</Em>。
              </p>
            </Prose>
          ),
        },
        {
          label: "终极视角",
          subtitle: "BTC 到底是什么",
          content: (
            <Prose>
              <p>
                走完了完整旅程，回过头看 BTC——它到底是什么？
              </p>

              <H3>从一句话开始</H3>
              <p>
                第 0 章 我们说过那句最重要的话：
              </p>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 text-center">
                <Hl>
                  在没有中介的前提下，让所有陌生人就"哪笔交易有效"达成一致。
                </Hl>
              </p>

              <H3>9 章拆出 9 个零件</H3>
              <p>
                现在我们看明白了——这一句话被拆成具体可实施的工程：
              </p>
              <KeyPoint label="9 个零件，每个都是必须的">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>公开账本</Em> 提供"大家都在记同一本账"的框架
                  </li>
                  <li>
                    <Em>哈希链</Em> 让账本历史改不动
                  </li>
                  <li>
                    <Em>PoW</Em> 让记账权需要真实成本
                  </li>
                  <li>
                    <Em>最长链原则</Em> 让全网就顺序达成一致
                  </li>
                  <li>
                    <Em>数字签名</Em> 让"是我发的"可被任何人验证
                  </li>
                  <li>
                    <Em>UTXO 模型</Em> 让"能不能花"是简单的布尔判断
                  </li>
                  <li>
                    <Em>Merkle Tree</Em> 让轻客户端也能验证
                  </li>
                  <li>
                    <Em>Coinbase + 减半</Em> 解决了"钱从哪来"和"供应可控"
                  </li>
                  <li>
                    <Em>激励相容</Em> 让所有参与者的理性选择 = 维护网络稳定
                  </li>
                </ul>
              </KeyPoint>

              <H3>BTC 的真正本质</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>
                  BTC 的每一个零件都是被前一个问题逼出来的解——
                  不是灵感，是推导。
                </Hl>
              </p>

              <p>
                这是 BTC 最深的优雅——
                它<Em>不是设计出来的</Em>，是<Em>被推导出来的</Em>。
                每一个看似奇怪的选择
                （为什么 10 分钟、为什么 SHA-256、为什么 UTXO、为什么 2100 万），
                都有一个朴素的"前一个问题逼出来"的回答。
              </p>

              <H3>更大的图景：用数学和博弈替代信任</H3>
              <p>
                学完这 9 章，你不只懂 BTC——
                你懂了一种<Hl>新的协调方式</Hl>：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  以前：陌生人之间要协作 → 必须找一个大家都信的中介（银行、政府、平台）
                </li>
                <li>
                  现在：用<Em>密码学（数学上不可伪造）+ 博弈论（攻击不如老实赚）</Em>替代——
                  陌生人可以直接协作，<Em>不需要任何中介</Em>
                </li>
              </ul>

              <p>
                这种思想会重新塑造你对货币、身份、数据所有权、甚至治理结构的理解：
              </p>
              <KeyPoint label="超越 BTC 本身">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>身份</Em>：不需要政府发证，私钥即身份（DID 运动）
                  </li>
                  <li>
                    <Em>数据所有权</Em>：自己签名自己的数据，
                    不依赖平台（Web3 应用）
                  </li>
                  <li>
                    <Em>治理</Em>：DAO（去中心化自治组织）用代币 + 投票替代公司架构
                  </li>
                  <li>
                    <Em>金融</Em>：DeFi 让借贷、交易、衍生品脱离传统金融机构
                  </li>
                </ul>
              </KeyPoint>

              <p>
                这些<Em>未来 50 年的实验</Em>都建立在 BTC 给出的基础范式上。
                BTC 是起点，不是终点。
              </p>

              <H3>下一步可以走哪</H3>
              <KeyPoint label="深入方向">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>Lightning Network</Em>：BTC 的 L2 闪电支付层
                  </li>
                  <li>
                    <Em>Taproot</Em>：BTC 的隐私和合约升级
                  </li>
                  <li>
                    <Em>Ordinals</Em>：BTC 链上的 NFT 类应用
                  </li>
                  <li>
                    <Em>挖矿经济学</Em>：算力市场、能源消耗、可持续性
                  </li>
                </ul>
              </KeyPoint>

              <KeyPoint label="对比方向">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>以太坊</Em>：智能合约、账户模型、PoS、gas 拍卖
                  </li>
                  <li>
                    <Em>Solana / Aptos</Em>：高性能但中心化的妥协
                  </li>
                  <li>
                    <Em>Monero / Zcash</Em>：把隐私放第一位的链
                  </li>
                </ul>
              </KeyPoint>

              <KeyPoint label="历史和哲学">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>密码朋克邮件列表</Em>：1993 年起的去中心化思想
                  </li>
                  <li>
                    <Em>哈耶克《货币的非国家化》</Em>：BTC 的思想前身
                  </li>
                  <li>
                    <Em>2008 白皮书</Em>：9 页论文值得反复读
                  </li>
                  <li>
                    <Em>《Mastering Bitcoin》</Em>：技术深入的标准教材
                  </li>
                </ul>
              </KeyPoint>

              <H3>最后</H3>
              <p>
                BTC 的真正特殊之处，不是技术——
                类似的技术零件可以再发明。
              </p>
              <p>
                BTC 的真正特殊之处，是它代表了
                <Hl>"用数学和算力 + 自由参与的人"</Hl>
                替代<Em>"信任机构和管制"</Em>这种新可能。
              </p>
              <p>
                它不一定能彻底替代传统金融——
                也不需要。
                但<Em>它的存在本身</Em>已经永久改变了世界——
                给每个人多了一个选项：
                如果有一天你需要"不需要任何机构许可的钱"，
                它就在那里，已经跑了 15 年，
                还会跑下一个 100 年。
              </p>

              <p className="text-center text-sm text-[var(--accent)] mt-6">
                <Em>这就是 BTC。你现在理解它了。</Em>
              </p>
            </Prose>
          ),
        },
      ]}
    />
  );
}
