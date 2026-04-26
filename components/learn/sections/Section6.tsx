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

export function Section6() {
  return (
    <SectionTabs
      step={6}
      pages={[
        {
          label: "动机",
          subtitle: "手机钱包的两难",
          content: (
            <Prose>
              <p>
                到目前为止 BTC 的设计已经基本完整——账本、共识、签名、余额都有了。
                但有个工程问题被忽略了：<Hl>手机钱包怎么用？</Hl>
              </p>

              <H3>BTC 全链有多大</H3>
              <KeyPoint label="存储数据">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>2024 年累计区块数据：~500 GB</li>
                  <li>每年增长：~50 GB</li>
                  <li>每个区块：最多 ~4MB（SegWit 后等效），约 2000-3000 笔交易</li>
                </ul>
              </KeyPoint>

              <H3>手机钱包的困境</H3>
              <KeyPoint label="用户期望 vs 现实">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>期望</Em>：一键安装、立刻收发、独立验证
                  </li>
                  <li>
                    <Em>现实</Em>：手机存储普遍 64-512 GB，下载 500GB 不现实
                  </li>
                  <li>
                    <Em>更不可能</Em>：每笔交易都问"这个真的被打包了吗"——
                    要扫整个区块（几 MB）
                  </li>
                </ul>
              </KeyPoint>

              <H3>朴素方案 1：完全信任全节点</H3>
              <p>
                让钱包连一个全节点，问"我的交易确认了吗"——
                全节点说啥就信啥。
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>✅ 简单、快</li>
                <li>
                  ❌ 违背 BTC 的精神：<Em>"无需信任第三方"</Em>——
                  全节点可能撒谎
                </li>
              </ul>

              <H3>朴素方案 2：每次下载整个区块</H3>
              <p>
                想验证某笔交易在不在某区块里？
                把那个区块（~4 MB）整个下载下来扫一遍。
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>✅ 自验证、不信任</li>
                <li>
                  ❌ 流量太大——
                  尤其在弱网下、老旧手机上、开车时
                </li>
              </ul>

              <H3>需要的中间方案：SPV</H3>
              <p>
                <Em>SPV (Simplified Payment Verification)</Em>——
                简化支付验证。
                中本聪在 2008 白皮书第 8 节里就预见到了这个需求。
              </p>
              <KeyPoint label="SPV 钱包的目标">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>不下载区块体</Em>，只下载区块头（每个 80 字节）
                  </li>
                  <li>累计区块头：~60 MB（手机能装下）</li>
                  <li>
                    但要能<Hl>独立验证</Hl>"我那笔交易确实在区块 #810000 里"
                  </li>
                  <li>不依赖任何具体节点的说法</li>
                </ul>
              </KeyPoint>

              <p>
                但这听起来矛盾——<Em>不下载区块体</Em>，
                却要验证<Em>区块体里</Em>的交易？
                这怎么可能？
              </p>

              <p>
                秘诀就是<Hl>Merkle Tree</Hl>——
                一种让"小指纹承诺一大堆数据"的精妙数据结构。
                下一页看它怎么工作。
              </p>
            </Prose>
          ),
        },
        {
          label: "构造",
          subtitle: "二叉哈希树",
          content: (
            <Prose>
              <p>
                Merkle Tree 是 1979 年 Ralph Merkle 发明的数据结构。
                BTC 用它把"区块里所有交易"汇总成<Em>一个 32 字节的根哈希</Em>。
              </p>

              <H3>构造过程</H3>
              <p>
                把区块里所有交易作为<Em>叶子</Em>，两两配对做哈希，再两两配对……
                直到只剩一个根哈希。
              </p>

              <KeyPoint label="一棵 4 叶子的 Merkle Tree">
                <pre className="font-hash text-[10px] leading-relaxed">
{`           [ Merkle Root ]              ← 写进区块头
             /        \\
        H_AB           H_CD
        /  \\          /  \\
      H_A   H_B      H_C   H_D           ← 叶子层
       ↑     ↑        ↑     ↑
     Tx_A  Tx_B     Tx_C  Tx_D           ← 真实交易`}
                </pre>
              </KeyPoint>

              <H3>每一步具体怎么算</H3>
              <KeyPoint label="计算流程">
                <pre className="font-hash text-[11px] leading-relaxed">
{`H_A  = SHA256( SHA256( Tx_A ) )
H_B  = SHA256( SHA256( Tx_B ) )
H_C  = SHA256( SHA256( Tx_C ) )
H_D  = SHA256( SHA256( Tx_D ) )

H_AB = SHA256( SHA256( H_A || H_B ) )
H_CD = SHA256( SHA256( H_C || H_D ) )

Root = SHA256( SHA256( H_AB || H_CD ) )`}
                </pre>
                <p className="text-[var(--muted)]">
                  其中 <code>||</code> 是字节拼接。
                </p>
              </KeyPoint>

              <H3>核心性质</H3>
              <p>
                由于哈希的雪崩性：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>任何交易变 → 它的哈希变 → 它到根的路径全变 → Root 变</Em>
                </li>
                <li>
                  反过来：Root 没变 → <Em>所有交易一笔不动</Em>
                </li>
              </ul>

              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>Merkle Root 用 32 字节"承诺"了区块里全部几千笔交易</Hl>。
                它就是这个交易集合的"指纹"。
              </p>

              <H3>区块头存的是什么</H3>
              <KeyPoint label="BTC 区块头（80 字节）">
                <pre className="font-hash text-[11px] leading-relaxed">
{`Version:           4 字节
Previous Hash:     32 字节   ← 链式结构
Merkle Root:       32 字节   ← 本区块所有交易的指纹
Timestamp:          4 字节
Difficulty Target:  4 字节
Nonce:              4 字节
———————————————
合计:               80 字节`}
                </pre>
              </KeyPoint>

              <p>
                注意：<Em>区块头不存交易本身</Em>——只存 Merkle Root。
                完整交易在区块体里。
                SPV 钱包只下载区块头，所以它也只看得到 Merkle Root。
              </p>
            </Prose>
          ),
        },
        {
          label: "魔法",
          subtitle: "Merkle Proof：12 个哈希证明 1 笔交易",
          content: (
            <Prose>
              <p>
                现在 SPV 钱包要验证一个具体问题——
                <Hl>"交易 Tx_C 是否在区块 #810000 里？"</Hl>
              </p>

              <H3>朴素方案的对比</H3>
              <ComparisonTable
                headers={["方案", "需要下载的数据", "数据量"]}
                rows={[
                  [
                    "下载整个区块",
                    "~3000 笔完整交易",
                    "~4 MB",
                  ],
                  [
                    "Merkle Proof",
                    <Hl key="proof">Tx_C + 几个兄弟哈希</Hl>,
                    "~400 字节",
                  ],
                ]}
              />

              <p>
                差距：<Hl>10000 倍</Hl>。下面看具体怎么做到的。
              </p>

              <H3>SPV 钱包要做的事</H3>
              <p>
                它向某个全节点请求："给我证明 Tx_C 在区块 #810000 里"。
              </p>
              <p>
                全节点返回三样东西：
              </p>
              <KeyPoint label="Merkle Proof 包">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>Tx_C 本身</Em>（让钱包自己算 H_C）
                  </li>
                  <li>
                    <Em>H_D</Em>（Tx_C 在树里的"兄弟"）
                  </li>
                  <li>
                    <Em>H_AB</Em>（上一层的"兄弟"）
                  </li>
                </ul>
              </KeyPoint>

              <H3>SPV 钱包的验证流程</H3>
              <KeyPoint label="客户端自己计算">
                <pre className="font-hash text-[11px] leading-relaxed">
{`# 已有：Tx_C, H_D, H_AB（来自全节点）
# 已有：Merkle Root（来自区块头）

H_C   = SHA256( SHA256( Tx_C ) )           # 自己算
H_CD  = SHA256( SHA256( H_C || H_D ) )      # 用兄弟拼起来
Root' = SHA256( SHA256( H_AB || H_CD ) )    # 一路拼到根

# 比较：
if Root' == 区块头里的 Merkle Root:
    ✅ 证明 Tx_C 在这个区块里
else:
    ❌ 全节点骗我，证据不对`}
                </pre>
              </KeyPoint>

              <H3>关键洞察</H3>
              <p>
                SPV 钱包<Em>没有</Em>下载任何其他交易，
                也<Em>不需要信任</Em>提供 proof 的全节点——
                因为它自己一步一步算到根，对得上才算数。
                算不上则证明全节点撒谎。
              </p>

              <H3>数据量分析</H3>
              <p>
                树高 = log₂(交易数)。
                每多一层，proof 多 1 个兄弟哈希（32 字节）。
              </p>
              <ComparisonTable
                headers={["区块交易数", "树高", "Proof 哈希数", "Proof 大小"]}
                rows={[
                  ["1024", "10", "10", "~320 字节"],
                  ["4096", "12", "12", "~384 字节"],
                  [
                    <Hl key="real">~3000（BTC 真实区块）</Hl>,
                    "12",
                    "12",
                    "~400 字节",
                  ],
                  ["100 万", "20", "20", "~640 字节"],
                  ["10 亿", "30", "30", "~960 字节"],
                ]}
              />

              <p>
                <Hl>O(log n)</Hl>——这是 Merkle Tree 的核心算力数学。
                10 亿笔交易的区块也只要 ~960 字节就能证明任意一笔。
                这是手机钱包能跑的数学基础。
              </p>

              <H3>整个过程总结</H3>
              <p>
                SPV 钱包的工作流：
              </p>
              <ol className="list-decimal list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>下载所有区块头（~60 MB，PoW + 哈希链让它们可信）</li>
                <li>对每个想验证的交易，从全节点要 Merkle Proof（~400 字节）</li>
                <li>本地计算 → 对比 Root → 通过 = 真实，不通过 = 节点撒谎</li>
              </ol>

              <p>
                所以即使在 4G 弱网手机上，BTC 钱包也能<Em>独立、不信任地</Em>
                验证自己的交易——
                <Hl>这就是 BTC 能成为"全民可用"的关键</Hl>。
              </p>
            </Prose>
          ),
        },
        {
          label: "为什么二叉",
          subtitle: "树结构的设计取舍",
          content: (
            <Prose>
              <p>
                Merkle Tree 一定要二叉吗？三叉、四叉行不行？
              </p>

              <H3>不同树结构的对比</H3>
              <KeyPoint label="假设 4096 笔交易">
                <ComparisonTable
                  headers={["树叉数", "树高", "Proof 兄弟数", "每层兄弟个数"]}
                  rows={[
                    ["2 (二叉)", "12", "12", "1"],
                    ["3 (三叉)", "8", "16", "2"],
                    ["4 (四叉)", "6", "18", "3"],
                  ]}
                />
                <p className="text-[var(--muted)] mt-2">
                  二叉是<Em>验证路径最短</Em>和<Em>实现最简单</Em>的平衡点。
                </p>
              </KeyPoint>

              <H3>叶子数不是 2 的幂怎么办</H3>
              <p>
                如果区块有 5 笔交易（不是 2、4、8 之类），怎么办？
              </p>
              <KeyPoint label="BTC 的做法：复制最后一个叶子补齐">
                <pre className="font-hash text-[10px] leading-relaxed">
{`原始: A B C D E
补成: A B C D E E E E    （把 E 复制到 8 个）
然后正常构造`}
                </pre>
                <p className="text-[var(--muted)]">
                  这样树永远是平衡二叉树，验证逻辑统一。
                </p>
              </KeyPoint>

              <H3>历史漏洞：CVE-2012-2459</H3>
              <KeyPoint label="一个边界 bug 的故事">
                <p>
                  上述"复制末尾叶子"的实现有一个微妙问题——
                  在某些情况下，<Em>同一个 Merkle Root 可以对应两棵不同的树</Em>。
                </p>
                <p className="text-[var(--muted)]">
                  攻击者构造特殊区块，让节点接受看似有效但内部"重复交易"的区块——
                  可能用于 DoS 攻击（节点反复处理同一笔）。
                </p>
                <p>
                  2012 年 5 月发现并修复——
                  方法是<Em>拒绝任何重复交易出现在区块里</Em>，
                  从根本上消除歧义。
                </p>
              </KeyPoint>

              <H3>启示：密码学正确，工程未必</H3>
              <p>
                Merkle Tree 这个数据结构本身没有问题，
                <Em>是 padding 规则的边界条件没考虑到</Em>。
              </p>
              <p>
                这是密码学工程的常态——
                <Hl>算法证明上没问题，落地实现仍可能出微妙漏洞</Hl>。
                所以 BTC 的代码改动经过极度保守的多轮审查，
                每个细节都要假设"攻击者会找到所有边界"。
              </p>

              <p>
                这种"看似简单的事，落地永远充满意外"的体验，
                也是为什么 BTC 升级永远很慢的原因——
                每次小改动都可能引入新的攻击面。
              </p>
            </Prose>
          ),
        },
        {
          label: "应用",
          subtitle: "Merkle Tree 不只在 BTC 里",
          content: (
            <Prose>
              <p>
                Merkle Tree 是个深刻的数据结构。
                BTC 不是它唯一的用户——
                你电脑上、网上的很多东西都用着这个思想。
              </p>

              <H3>Git</H3>
              <KeyPoint label="本质：一个 Merkle Tree">
                <p>
                  Git 的对象模型完全是 Merkle 结构：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>blob</Em> = 文件内容 + 哈希
                  </li>
                  <li>
                    <Em>tree</Em> = 一个目录里所有文件和子目录的哈希
                  </li>
                  <li>
                    <Em>commit</Em> = 根 tree 哈希 + 父 commit 哈希 + 元数据
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  你 <code>git diff HEAD~1 HEAD</code> 时，
                  Git 比较两个 commit 的根 tree——
                  哪些 tree 节点不一样就往下递归——
                  <Hl>这是 Merkle 的差异定位</Hl>。
                </p>
              </KeyPoint>

              <H3>IPFS（星际文件系统）</H3>
              <KeyPoint label="内容寻址">
                <p>
                  IPFS 文件的"地址"就是它的 Merkle 根哈希。
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>同样的内容无论存在哪台机器，地址都一样</li>
                  <li>天然去重——相同的文件全网只存一份</li>
                  <li>抗篡改——内容改一字节地址就变</li>
                </ul>
              </KeyPoint>

              <H3>ZK Rollup（以太坊 L2）</H3>
              <KeyPoint label="状态承诺">
                <p>
                  ZK Rollup（zkSync、StarkNet 等）把 L2 的所有账户状态
                  组成一棵 Merkle Tree，
                  只把<Em>根</Em>提交到 L1。
                </p>
                <p className="text-[var(--muted)]">
                  L1 用一个 32 字节就"承诺"了 L2 几百万账户的当前状态。
                  状态变化用零知识证明压缩——
                  这是以太坊扩容的核心数学。
                </p>
              </KeyPoint>

              <H3>证书透明度（Certificate Transparency）</H3>
              <KeyPoint label="Google 的 HTTPS 监督机制">
                <p>
                  所有 CA 签发的 HTTPS 证书都要登记到一个公开的 Merkle Tree 里。
                  浏览器能验证"这个证书真的被登记过"。
                </p>
                <p className="text-[var(--muted)]">
                  事后如果发现哪个 CA 偷偷签了恶意证书——
                  全世界都能看到，且无法销毁记录。
                  这是 Merkle Tree 在网络安全的应用。
                </p>
              </KeyPoint>

              <H3>分布式数据库</H3>
              <KeyPoint label="一些 NoSQL 数据库">
                <p>
                  Amazon Dynamo、Apache Cassandra 等数据库
                  用 Merkle Tree 在节点间快速同步状态。
                </p>
                <p className="text-[var(--muted)]">
                  两个节点比对各自数据集的 Merkle Root——
                  哪个 tree 节点不同就只交换那部分。
                  避免了"全表对比"的开销。
                </p>
              </KeyPoint>

              <H3>共同灵魂</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>
                  用一个小的根哈希 "承诺" 一大堆数据，
                  并能高效证明"某一项在其中"或"两份数据哪里不同"。
                </Hl>
              </p>

              <p>
                这是 Merkle 1979 年发明 Tree 时的核心目标——
                40+ 年过去，<Em>它解决的问题在现代分布式系统里无处不在</Em>。
                BTC 把它用在了交易确认上，
                Git 用它做版本控制，
                IPFS 用它做内容寻址，
                ZK 用它做状态承诺——
                同样一棵树，无数种用法。
              </p>

              <p>
                理解 Merkle Tree 是理解很多现代基础设施的钥匙——
                它不是 BTC 独有的，是<Em>整个分布式系统时代</Em>的基础。
              </p>
            </Prose>
          ),
        },
        {
          label: "对比",
          subtitle: "传统金融的「证明」机制",
          content: (
            <Prose>
              <p>
                "我的交易被记录了"——这件事在传统金融里怎么证明？
                和 Merkle Proof 对比一下你会发现差距。
              </p>

              <H3>传统金融的证明方式</H3>
              <KeyPoint label="① 银行回单">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>转账后银行打印一张回单 / 发短信</li>
                  <li>你保留回单，银行保留电子记录</li>
                  <li>有争议时双方拿出记录对比</li>
                </ul>
                <p className="text-[var(--muted)]">
                  问题：<Em>依赖银行承认这张回单是真的</Em>。
                  银行系统瘫痪 / 数据丢失 / 内部篡改时，回单变废纸。
                </p>
              </KeyPoint>

              <KeyPoint label="② 银行月度对账单">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>银行每月发对账单 → 用户比对</li>
                  <li>不一致才有机会发现问题</li>
                </ul>
                <p className="text-[var(--muted)]">
                  问题：<Em>"月度"——时间分辨率太粗</Em>。
                  错误可能 30 天后才被发现，那时已经迟了。
                  又依赖银行如实披露。
                </p>
              </KeyPoint>

              <KeyPoint label="③ 第三方审计">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>德勤、普华永道等审计师每年查一次</li>
                  <li>抽样审计 → 给出"无重大异常"结论</li>
                </ul>
                <p className="text-[var(--muted)]">
                  问题：<Em>年度级时间分辨率</Em>，且
                  <Em>历史上多次失败</Em>——
                  安然事件、雷曼破产时审计师都"无异常"。
                </p>
              </KeyPoint>

              <H3>共同问题：依赖银行配合</H3>
              <p>
                所有这些方式有一个共性——
                <Hl>"证明"依赖中心化机构的配合</Hl>。
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>银行可以延迟发回单</li>
                <li>银行可以拒绝披露记录</li>
                <li>银行可以伪造记录（且历史上确实有过——比如 2012 LIBOR 操纵案）</li>
                <li>审计师可以被收买（安然 + 安达信案）</li>
              </ul>

              <H3>Merkle Proof 的革命性</H3>
              <KeyPoint label="自验证">
                <p>
                  拿到一个 Merkle Proof 后，你完全独立地验证——
                  不需要任何人配合。
                  全节点提供错误的 proof？
                  本地一算 Root 对不上，立刻识破。
                </p>
              </KeyPoint>

              <KeyPoint label="秒级响应">
                <p>
                  10 几个哈希 + 几个本地 SHA-256——
                  整个验证过程不到 1 毫秒。
                </p>
              </KeyPoint>

              <KeyPoint label="不可伪造">
                <p>
                  假 proof 算出的 Root 不会等于区块头里的 Root。
                  伪造一个能通过验证的 Proof 等价于撞碰 SHA-256——
                  数学上不可能。
                </p>
              </KeyPoint>

              <H3>对比表</H3>
              <ComparisonTable
                headers={["维度", "银行回单/对账", "Merkle Proof"]}
                rows={[
                  [
                    "时间分辨率",
                    "事后 / 月度 / 年度",
                    <Hl key="r">实时</Hl>,
                  ],
                  [
                    "验证方",
                    "银行 + 用户 + 审计",
                    <Hl key="v">自己（任何人）</Hl>,
                  ],
                  [
                    "时间消耗",
                    "等回单/对账日",
                    "几毫秒",
                  ],
                  [
                    "信任假设",
                    "银行如实披露",
                    "无（数学保证）",
                  ],
                  [
                    "失败可能",
                    "银行作恶 / 系统故障",
                    "SHA-256 被破（不存在）",
                  ],
                  [
                    "经济成本",
                    "审计费用 / 人力",
                    "几乎免费",
                  ],
                ]}
              />

              <H3>核心范式转移</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>从"信任机构"到"信任数学"</Hl>——
                这是 Merkle Tree（以及更广义的密码学承诺）
                给金融世界带来的根本变革。
              </p>

              <p>
                这不是说银行就该消失——
                银行有它的用途（信用、客服、合规、隐私）。
                但<Em>"证明一笔交易存在"</Em> 这件事，
                密码学已经做得比任何中心化机构都好。
              </p>

              <p>
                Merkle Tree 是 BTC 给世界的一个礼物——
                它让"<Em>不需要任何人配合的金融审计</Em>" 第一次成为可能。
              </p>
            </Prose>
          ),
        },
      ]}
    />
  );
}
