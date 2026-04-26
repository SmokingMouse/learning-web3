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
import { HashDemo } from "@/components/hash/HashDemo";
import { SingleBlock } from "@/components/learn/SingleBlock";
import { BlockChain } from "@/components/hash/BlockChain";

export function Section2() {
  return (
    <SectionTabs
      step={2}
      pages={[
        {
          label: "直觉",
          subtitle: "摔碎的鸡蛋和不可逆",
          content: (
            <Prose>
              <p>
                上一章留下的问题是：<Em>账本是数据，数据可以改</Em>。
                我们需要一种工具，让"改一个字"变成"立刻全网可见"。
              </p>
              <p>
                这种工具来自一个朴素的物理直觉——<Hl>有些过程天然是单向的</Hl>。
              </p>

              <H3>日常生活里的"单向过程"</H3>
              <KeyPoint label="举几个例子">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>摔碎鸡蛋</Em>：摔破很容易，再拼回去几乎不可能
                  </li>
                  <li>
                    <Em>把咖啡和牛奶搅匀</Em>：搅一下就混了，分子层面把它们再分开需要等热寂
                  </li>
                  <li>
                    <Em>烧掉一封信</Em>：燃烧瞬间完成，从灰烬复原文字不可能
                  </li>
                </ul>
                <p>
                  这些过程的共性：<Em>正方向几乎免费，反方向几乎不可能</Em>。
                  物理学叫它"熵增"，密码学叫它"单向函数"。
                </p>
              </KeyPoint>

              <H3>哈希函数：信息世界的单向过程</H3>
              <p>
                密码学家造了一个数学函数 <code>H(x)</code>，给任意输入 <code>x</code>
                算一个固定长度的"指纹"。性质：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>从 <code>x</code> 算 <code>H(x)</code>：瞬间</li>
                <li>从 <code>H(x)</code> 反推 <code>x</code>：宇宙寿命都不够</li>
              </ul>

              <H3>更直觉的类比</H3>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>指纹</Em>：你的指纹能唯一识别你，但看见一个指纹没法"造"出对应的人
                </li>
                <li>
                  <Em>奶昔</Em>：知道配方能调出固定的味道，
                  但只尝味道说不出每种水果各放了多少
                </li>
                <li>
                  <Em>果汁机</Em>：水果进去就出来一杯果汁，反过来从果汁还原水果做不到
                </li>
              </ul>

              <p>
                BTC 使用的具体哈希函数叫 <Hl>SHA-256</Hl>——下一页详细看它的特性。
              </p>
            </Prose>
          ),
        },
        {
          label: "原理",
          subtitle: "哈希函数的三大属性",
          content: (
            <Prose>
              <p>
                先动手感受一下 SHA-256——
                试着修改下面的输入，<Em>哪怕只改一个字符</Em>，看哈希值的变化：
              </p>

              <div className="my-4">
                <HashDemo />
              </div>

              <H3>三大属性</H3>

              <KeyPoint label="① 确定性 (Deterministic)">
                <p>
                  同样的输入<Em>永远</Em>产生同样的输出——
                  不受时间、机器、操作系统影响。
                </p>
                <p className="text-[var(--muted)]">
                  你今天在 Mac 上算 <code>SHA256("hello")</code>，
                  和明年在 Linux 服务器上算，结果一字不差。
                </p>
              </KeyPoint>

              <KeyPoint label="② 单向性 (Preimage Resistance)">
                <p>
                  给定输出 <code>h</code>，几乎不可能找到任何输入 <code>x</code>
                  使得 <code>H(x) = h</code>。
                </p>
                <p className="text-[var(--muted)]">
                  数学上叫"原像不可逆"。SHA-256 的强度足以让全球算力算到太阳熄灭都找不到。
                </p>
              </KeyPoint>

              <KeyPoint label="③ 雪崩效应 (Avalanche Effect)">
                <p>
                  输入改 1 位，输出大约一半的位会翻转。
                  <Em>没有"相似输入 → 相似输出"这种事</Em>——彻底打破输入和输出之间的视觉关联。
                </p>
                <pre className="font-hash text-[10px] p-2 mt-2 rounded bg-[var(--card)] overflow-x-auto leading-relaxed">
{`SHA256("hello") = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
SHA256("hellp") = b9a4b8dc93e09db5b6f9cc39b6b6d35e5d49f4d8aa55dc66fbf540b9bd91e96b`}
                </pre>
                <p className="text-[var(--muted)]">
                  仅把 "o" 改成 "p"，指纹完全无法看出关联。
                </p>
              </KeyPoint>

              <H3>关键衍生属性：抗碰撞 (Collision Resistance)</H3>
              <p>
                找到两个<Em>不同</Em>输入 x₁ ≠ x₂ 但哈希值相等是不可能的。
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>SHA-256 输出 256 位 = 2²⁵⁶ ≈ 10⁷⁷ 种可能</li>
                <li>暴力撞碰需要约 2¹²⁸ 次尝试（生日悖论）</li>
                <li>
                  即使动用<Em>地球上所有计算机</Em>持续计算到太阳熄灭，
                  撞碰概率仍然小到可以忽略
                </li>
              </ul>

              <p>
                这三大属性 + 抗碰撞，让哈希成为构建可信账本的<Hl>不可篡改基石</Hl>。
                下一页看它怎么用在区块链上。
              </p>
            </Prose>
          ),
        },
        {
          label: "构造",
          subtitle: "从「区块」到「链」",
          content: (
            <Prose>
              <H3>第一步：用哈希封装一个区块</H3>
              <p>
                把一批交易打包成一个"区块"，对整个区块的数据算一个哈希——
                这就是这个区块的<Em>身份证</Em>。
              </p>
              <p>
                只要任何一笔交易被改动，区块哈希就会变（雪崩效应），改动立刻被发现。
              </p>

              <div className="my-4">
                <SingleBlock />
              </div>

              <p>
                试着修改区块里的数据，看哈希怎么瞬间变化。
                这种"改一个字 → 整个身份证作废"的特性，是后续一切的基础。
              </p>

              <H3>第二步：让区块首尾相连成"链"</H3>
              <p>
                单个区块能防自身被改，但不能阻止<Em>整段历史</Em>被替换——
                攻击者完全可以伪造一份内部自洽的假账本。
              </p>
              <p>
                关键设计：<Hl>每个新区块都把"前一个区块的哈希"写进自己的数据里</Hl>。
              </p>

              <KeyPoint label="链式结构示意">
                <pre className="font-hash text-[11px] leading-relaxed">
{`Block 1: hash=AAA  prevHash=Genesis
Block 2: hash=BBB  prevHash=AAA      ← 把 Block 1 的指纹记下
Block 3: hash=CCC  prevHash=BBB      ← 把 Block 2 的指纹记下
Block 4: hash=DDD  prevHash=CCC`}
                </pre>
                <p className="text-[var(--muted)] mt-2">
                  现在攻击者想改 Block 2 的一笔交易：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>Block 2 的 hash 变成 BBB'</li>
                  <li>Block 3 里记的 prevHash 还是旧的 BBB → 对不上</li>
                  <li>必须重算 Block 3 → 但 Block 3 的 hash 又变了 → Block 4 又对不上</li>
                  <li>从 Block 2 之后<Em>所有区块都得重算</Em></li>
                </ul>
              </KeyPoint>

              <H3>下面这条链你可以亲手试试</H3>
              <p>
                试着编辑 <Em>Block #1</Em> 的数据，观察后续所有区块怎么"连锁崩塌"：
              </p>
              <div className="my-4">
                <BlockChain />
              </div>

              <H3>关键洞察</H3>
              <p>
                单个区块的哈希让<Em>该区块改不动</Em>；
                链式结构让<Em>历史改不动</Em>——任何修改都会暴露在它之后的所有区块上。
              </p>
              <p>
                <Hl>这就是"链"在区块链里的真正含义</Hl>——
                不是数据存储意义上的"一串"，而是密码学意义上的"环环相扣"。
              </p>

              <p>
                但这还不够——<Em>下一章会看到漏洞</Em>：
                既然攻击者能"重算所有后续哈希"，那链的防御性就是 0……
                除非我们让"重算一个哈希"变得极其昂贵。
              </p>
            </Prose>
          ),
        },
        {
          label: "历史",
          subtitle: "为什么是 SHA-256",
          content: (
            <Prose>
              <p>
                哈希函数不止 SHA-256 一种。历史上存在过多个家族，
                有的早已被攻破。
                中本聪 2008 年的选择并非凭直觉——是经过密码学界<Em>多轮审查</Em>后的保守决定。
              </p>

              <H3>哈希函数的"安全寿命"</H3>
              <ComparisonTable
                headers={["函数", "提出年份", "状态"]}
                rows={[
                  [
                    "MD5",
                    "1992",
                    <span key="md5" className="text-[var(--invalid)]">
                      已破（2004 起可秒级撞碰）
                    </span>,
                  ],
                  [
                    "SHA-1",
                    "1995",
                    <span key="sha1" className="text-[var(--invalid)]">
                      已破（2017 Google 完成实证攻击）
                    </span>,
                  ],
                  [
                    "SHA-256（SHA-2 家族）",
                    "2001",
                    <span key="sha2" className="text-[var(--valid)]">
                      工业标准，无已知攻击
                    </span>,
                  ],
                  [
                    "SHA-3 (Keccak)",
                    "2015",
                    "新一代标准，结构与 SHA-2 完全不同（备选）",
                  ],
                ]}
              />

              <H3>中本聪选 SHA-256 的理由</H3>
              <KeyPoint label="三个工程考量">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>已被密码学界审查 7 年</Em>——
                    2001 NIST 标准化到 2008 已是工业级标准，无已知有效攻击
                  </li>
                  <li>
                    <Em>256 位输出</Em>——
                    抗碰撞至 128 位强度，安全裕度充足
                  </li>
                  <li>
                    <Em>硬件实现简单高效</Em>——
                    这点对后来的 PoW 矿机至关重要
                  </li>
                </ul>
              </KeyPoint>

              <H3>BTC 实际用的是 SHA-256d（双重哈希）</H3>
              <p>
                精确说，BTC 几乎所有地方用的都是<Hl>SHA-256(SHA-256(x))</Hl>——
                对数据做两遍 SHA-256。
              </p>

              <KeyPoint label="为什么要双重？">
                <p>
                  防御一类叫<Em>长度扩展攻击 (Length Extension Attack)</Em> 的弱点。
                </p>
                <p className="text-[var(--muted)]">
                  SHA-256 内部用 Merkle-Damgård 构造，
                  攻击者在某些场景下不知道 secret 的情况下，
                  能基于已知 hash 算出 <code>hash(secret + msg + extra)</code>。
                </p>
                <p className="text-[var(--muted)]">
                  双重哈希让外层"封"住内层结果，攻击者无从下手。
                </p>
                <p>
                  代价：2 倍计算成本。但对安全的投保非常划算——
                  这是<Em>密码学工程的保守传统</Em>：在边缘上多花 50%，
                  换可证明的额外安全裕度。
                </p>
              </KeyPoint>

              <H3>启示：不是"越新越好"，是"经过时间检验才可靠"</H3>
              <p>
                密码学和软件工程不一样——一个新算法刚发表时大家都不敢用，
                因为可能存在没被发现的弱点。
                只有经过<Em>多年公开审查</Em>，没人能找出有效攻击，才会成为工业标准。
              </p>
              <p>
                MD5、SHA-1 当年也是工业标准，被大量产品采用——
                现在它们都垮了。
                这种"看起来稳如泰山的算法 20 年后被攻破"的事在密码学史上反复出现。
              </p>
              <p>
                BTC 选 SHA-256 是<Hl>已知风险最低</Hl>的选择，
                不是"最新最酷"的选择——
                这是中本聪整体设计风格的缩影：尽可能用经过时间检验的零件。
              </p>
            </Prose>
          ),
        },
        {
          label: "对比",
          subtitle: "防伪的物理 vs 数学",
          content: (
            <Prose>
              <p>
                "防伪"在人类历史上一直是个大问题。
                看一下传统防伪和哈希链的本质差异——你会发现 BTC 选了一条完全不同的路。
              </p>

              <H3>传统防伪：物理稀缺</H3>
              <KeyPoint label="人类几千年的「造假对抗」史">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>纸钞</Em>：水印 + 特殊纤维 + 金属丝 + 紫外荧光 + 立体凹凸
                  </li>
                  <li>
                    <Em>奢侈品</Em>：缝线工艺 + 五金件细节 + 全息标 + 防伪码 + 区块链溯源
                  </li>
                  <li>
                    <Em>古董字画</Em>：装裱、印章、绢本、墨色——靠专家肉眼鉴别
                  </li>
                  <li>
                    <Em>身份证件</Em>：芯片 + 雕刻字符 + 多层印刷 + 仿制成本巨大
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  共同特点：<Em>"造假成本高于收益"</Em>。
                  造一台假钞印刷机价格越来越贵，
                  造假者收益又被压低（市面上真假难辨时间窗口越来越短），
                  攻防之间反复升级。
                </p>
              </KeyPoint>

              <H3>哈希链：数学不可伪造</H3>
              <KeyPoint label="如果只看哈希链本身……">
                <p>
                  伪造一份从某个区块改动开始的"假账本"的成本是多少？
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>需要重算从被改区块开始的所有后续哈希</li>
                  <li>SHA-256 单次计算 ~纳秒级</li>
                  <li>10 万个区块的话 ≈ 几秒钟</li>
                </ul>
                <p>
                  也就是说——<Hl>仅靠哈希链，伪造历史的成本几乎是 0</Hl>。
                </p>
              </KeyPoint>

              <H3>关键洞察</H3>
              <p>
                哈希保证<Em>"改动立刻暴露"</Em>，但不保证<Em>"改动代价高昂"</Em>。
                后者是 PoW 的工作。
              </p>
              <p>
                所以严格说：<Hl>哈希链 + PoW = 不可篡改</Hl>，
                两者缺一不可。
                只有哈希链没有 PoW —— 攻击者重算一切；
                只有 PoW 没有哈希链 —— 攻击者直接改一个区块（不影响其他区块）。
              </p>

              <H3>对比表</H3>
              <ComparisonTable
                headers={["维度", "物理防伪", "哈希链 + PoW"]}
                rows={[
                  [
                    "防伪原理",
                    "造假成本高于收益",
                    "数学不可伪造（哈希）+ 计算成本巨大（PoW）",
                  ],
                  [
                    "验证者",
                    "专家 + 设备",
                    <Hl key="v">任何拿到全链的节点</Hl>,
                  ],
                  [
                    "验证速度",
                    "分钟到小时",
                    "秒级（验整链一次）",
                  ],
                  [
                    "攻防演进",
                    "永无止境的升级",
                    "理论确定（除非 SHA-256 被破）",
                  ],
                  [
                    "失效场景",
                    "造假技术升级",
                    "量子计算机（理论威胁，远未到）",
                  ],
                ]}
              />

              <p>
                这是"<Hl>用数学和算力替代物理稀缺</Hl>"的典范——
                BTC 的哲学贯穿整个设计。
              </p>
            </Prose>
          ),
        },
        {
          label: "局限",
          subtitle: "哈希链还解决不了的事",
          content: (
            <Prose>
              <p>
                到这里我们获得了哈希链的能力：账本任何篡改都会立刻暴露给全网。
                但仔细想想，<Em>这真的就够了吗？</Em>
              </p>

              <H3>已经能做到的</H3>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  给任何一份账本算一个"指纹"（root hash），固化历史
                </li>
                <li>
                  任何节点能验证："我手里这份账本是不是被偷改过"——
                  对比指纹即可
                </li>
                <li>
                  局部改动会牵动全局——改 1 字节后果是后续所有区块哈希作废
                </li>
              </ul>

              <H3>仍然解决不了的</H3>

              <KeyPoint label="① 攻击者可以「重新生产」一条假链">
                <p>
                  攻击者从某个区块开始重写历史：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>修改一笔交易（比如把"我转 5 BTC 给商家"改成"商家转 5 BTC 给我"）</li>
                  <li>重算这个区块的哈希</li>
                  <li>重算后续所有区块的哈希</li>
                  <li>得到一份内部完全自洽的"假账本"</li>
                </ul>
                <p className="text-[var(--muted)]">
                  如果计算哈希是廉价的（毫秒级），这种伪造没有任何门槛。
                  现代 CPU 几秒钟能重算 10 万个区块。
                </p>
              </KeyPoint>

              <KeyPoint label="② 新加入的节点没法分辨真假">
                <p>
                  新节点上线时，从邻居那里下载账本。
                  邻居发什么他就接受什么——
                  邻居发"真账本" vs "假账本"，新节点都<Em>无从分辨</Em>，
                  因为两份账本各自都内部自洽。
                </p>
                <p className="text-[var(--muted)]">
                  这又回到了上一章的硬伤 1 ——"完整性"。
                  哈希链<Em>没有完全解决它</Em>，只是把问题转化了：
                  从"账本能不能改"转化为"重算成本贵不贵"。
                </p>
              </KeyPoint>

              <KeyPoint label="③ 谁有权「产生下一个区块」也没规定">
                <p>
                  即使我们禁止任何人改历史，光是"产生新区块"这件事——
                  100 个节点同时声称"下一个区块该是我这个"——
                  哈希链对此<Em>无话可说</Em>。
                </p>
                <p className="text-[var(--muted)]">
                  这是上一章的硬伤 2 ——"顺序一致"。
                  哈希链<Em>完全没有处理</Em>。
                </p>
              </KeyPoint>

              <H3>下一章的任务</H3>
              <p>
                所以我们需要一个机制，同时解决三件事：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li><Em>让重算变得不可承受</Em>——堵住攻击者重写历史的口子</li>
                <li><Em>让"产生新区块"有规则</Em>——避免所有节点同时争抢</li>
                <li><Em>让全网就"哪条链是真的"达成共识</Em>——给出最终顺序</li>
              </ul>
              <p>
                能同时解决这三件事的机制，就是<Hl>工作量证明 (Proof of Work)</Hl>——
                通过让"算一个区块"非常昂贵，
                把抽象的共识问题转化成具体的物理成本问题。
              </p>
              <p>
                这是 BTC 设计中最精彩的一步。下一章见。
              </p>
            </Prose>
          ),
        },
      ]}
    />
  );
}
