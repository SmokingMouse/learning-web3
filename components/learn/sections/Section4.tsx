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
import { SignatureDemo } from "@/components/learn/SignatureDemo";

export function Section4() {
  return (
    <SectionTabs
      step={4}
      pages={[
        {
          label: "直觉",
          subtitle: "身份证明的演化史",
          content: (
            <Prose>
              <p>
                上一章把账本变成可信的——
                链上一行行交易现在改不动也回滚不了。
                但这暴露出一个新问题：<Hl>账本是公开的，谁都能写"Alice 转 Bob 100 BTC"这一行</Hl>。
              </p>
              <p>
                节点凭什么判断这真的是 Alice 发的，而不是某个攻击者冒充？
              </p>

              <H3>人类历史上的身份证明</H3>
              <KeyPoint label="一个简短演化史">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>印章（中国、日本）</Em>：实物独占，但可被偷、被仿
                  </li>
                  <li>
                    <Em>签名（西方）</Em>：靠笔迹特征——但笔迹可以模仿
                  </li>
                  <li>
                    <Em>火漆封印</Em>：物理破坏即可发现，但易伪造
                  </li>
                  <li>
                    <Em>身份证 + 照片</Em>：依赖颁发机构，可造假证
                  </li>
                  <li>
                    <Em>指纹 / 虹膜</Em>：生物特征，难伪造但需专用设备
                  </li>
                  <li>
                    <Em>密码 / 短信验证码</Em>：易泄漏、易钓鱼
                  </li>
                </ul>
              </KeyPoint>

              <H3>共同问题：依赖"实体世界"</H3>
              <p>
                上述方式都依赖某个<Em>物理或制度锚点</Em>——
                印章实物、笔迹特征、身份证发证机关、运营商。
                数字世界没有这些天然屏障。
              </p>
              <p>
                网络上有人发一句"Alice 转 Bob 100 BTC"——
                没有印章可盖，没有笔迹可比，没有身份证可查。
                节点凭什么相信？
              </p>

              <H3>密码学的答案：数字签名</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>用纯数学证明"我就是我"</Hl>——
                不依赖任何机构、任何物理特征、任何中心化记录。
                而且<Em>任何人都能验证</Em>，不需要找权威盖章。
              </p>

              <p>
                这听起来像魔法。但确实是 1976 年起密码学的重大突破——
                <Hl>非对称加密</Hl>。
                下一页看具体怎么实现。
              </p>
            </Prose>
          ),
        },
        {
          label: "原理",
          subtitle: "非对称加密：私钥和公钥",
          content: (
            <Prose>
              <p>
                数字签名的基础是<Em>非对称加密</Em>——
                每个人手握一对数学上关联但功能截然相反的密钥。
              </p>

              <H3>两把钥匙</H3>
              <KeyPoint label="一对数学相关但功能相反的密钥">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>私钥 (Private Key)</Em>：一个 256 位的随机大数，
                    <Hl>只有你自己知道</Hl>，严格保密
                  </li>
                  <li>
                    <Em>公钥 (Public Key)</Em>：从私钥<Em>单向</Em>计算得出，
                    可以公开给全世界
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  关键性质：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>从私钥算公钥：瞬间</li>
                  <li>从公钥反推私钥：宇宙寿命都不够</li>
                </ul>
              </KeyPoint>

              <H3>两个核心操作</H3>

              <KeyPoint label="① 签名 (Sign)">
                <pre className="font-hash text-[11px] leading-relaxed">
{`signature = Sign(private_key, message)`}
                </pre>
                <p className="text-[var(--muted)] mt-2">
                  用私钥对一段消息生成一个"签名数据"。
                </p>
              </KeyPoint>

              <KeyPoint label="② 验证 (Verify)">
                <pre className="font-hash text-[11px] leading-relaxed">
{`Verify(public_key, message, signature) → True / False`}
                </pre>
                <p className="text-[var(--muted)] mt-2">
                  用公钥 + 消息 + 签名，验证签名是否合法。
                </p>
              </KeyPoint>

              <H3>关键性质</H3>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>不可伪造</Em>：只有持有<Em>对应私钥</Em>的人才能生成有效签名
                </li>
                <li>
                  <Em>可公开验证</Em>：任何人拿到公钥都能验证签名
                </li>
                <li>
                  <Em>消息绑定</Em>：消息被改一个字节，原签名立刻失效
                </li>
                <li>
                  <Em>不可否认</Em>：签了就赖不掉（私钥只有你有）
                </li>
              </ul>

              <H3>类比</H3>
              <ComparisonTable
                headers={["概念", "类比"]}
                rows={[
                  [
                    "私钥",
                    "你家保险柜唯一的钥匙——只有你有",
                  ],
                  [
                    "公钥",
                    "保险柜的「已拍照存档」——大家都能看，但打不开",
                  ],
                  [
                    "签名",
                    "保险柜里取出的盖着火漆印的信件——印章独一无二",
                  ],
                  [
                    "验证",
                    "拿照片对火漆印——形状对得上 = 真品",
                  ],
                ]}
              />

              <H3>动手感受</H3>
              <p>
                按顺序操作：<Em>生成密钥 → 签名交易 → 篡改内容 → 重新验证</Em>。
                看看篡改时签名怎么立刻失效：
              </p>
              <div className="my-4">
                <SignatureDemo />
              </div>
            </Prose>
          ),
        },
        {
          label: "机制",
          subtitle: "secp256k1 和 ECDSA",
          content: (
            <Prose>
              <p>
                BTC 用的具体算法是<Hl>ECDSA（椭圆曲线数字签名算法）</Hl>，
                曲线选择是 <code>secp256k1</code>。
                这一页拆开看为什么不用更耳熟能详的 RSA。
              </p>

              <H3>为什么不用 RSA？</H3>
              <KeyPoint label="ECC 对 RSA 的全方位优势">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>同等安全下密钥短得多</Em>：
                    256 位 ECC ≈ 3072 位 RSA 的强度
                  </li>
                  <li>
                    <Em>签名验证速度更快</Em>：
                    BTC 每个节点要反复验海量签名，性能关键
                  </li>
                  <li>
                    <Em>硬件实现更紧凑</Em>：
                    适合嵌入式（硬件钱包、矿机）
                  </li>
                  <li>
                    <Em>带宽更省</Em>：
                    每笔交易的签名占字节数少，区块装得下更多交易
                  </li>
                </ul>
              </KeyPoint>

              <H3>secp256k1 曲线</H3>
              <p>
                BTC 用的曲线方程（在有限域上）：
              </p>
              <pre className="font-hash text-[11px] p-3 rounded bg-[var(--card)] overflow-x-auto leading-relaxed">
{`y² = x³ + 7   (mod p)
其中 p = 2²⁵⁶ - 2³² - 977`}
              </pre>
              <p className="text-[var(--muted)]">
                这条曲线是中本聪在 2008 年的选择。
                有趣的是——大部分应用（如 TLS）用的是 NIST 标准的 secp256r1。
                中本聪选了"k1"（更早、由 SECG 发布、参数选择更"自然"），
                避开了对 NIST 后门的怀疑。
              </p>

              <H3>一次签名的具体流程</H3>
              <KeyPoint label="ECDSA 签名（简化）">
                <ol className="list-decimal list-inside space-y-1 text-[var(--muted)]">
                  <li>
                    对交易数据算 SHA-256 哈希 <code>h</code>
                  </li>
                  <li>
                    选一个临时随机数 <code>k</code>
                    （<Hl>必须真随机</Hl>，重复使用会泄漏私钥）
                  </li>
                  <li>
                    结合 <code>k</code>、<code>h</code>、私钥做椭圆曲线运算
                  </li>
                  <li>
                    输出签名 <code>(r, s)</code>——两个 256 位数
                  </li>
                  <li>
                    广播时把签名 + 公钥 + 交易一起发出去
                  </li>
                </ol>
              </KeyPoint>

              <H3>著名事故：随机数不"随机"</H3>
              <KeyPoint label="2010 年 Sony PS3 灾难">
                <p>
                  Sony 在 PS3 的代码签名机制中犯了一个致命错误——
                  ECDSA 的随机数 <code>k</code> 写死成了一个固定值。
                </p>
                <p className="text-[var(--muted)]">
                  结果：黑客比对两份用相同 <code>k</code> 签的不同数据，
                  通过简单代数<Em>反推出 Sony 的签名私钥</Em>——
                  整个 PS3 平台破防。
                </p>
                <p>
                  教训：<Hl>椭圆曲线签名对随机数质量的依赖是绝对的</Hl>。
                  BTC 钱包必须用密码学安全的随机数生成器（CSPRNG）。
                </p>
              </KeyPoint>

              <H3>BTC 实战：交易签名什么样</H3>
              <p>
                一笔 BTC 交易里"签名"的位置在<Em>解锁脚本 (scriptSig)</Em> 里——
                第 5 章 UTXO 会详细看。
                现在记住这个流程：
              </p>
              <pre className="font-hash text-[11px] p-3 rounded bg-[var(--card)] overflow-x-auto leading-relaxed">
{`1. 钱包构造交易（输入、输出、金额）
2. 对交易做 SHA-256 双重哈希 → h
3. 用私钥 + h → ECDSA 签名 (r, s)
4. 把 (r, s) + 公钥放进解锁脚本
5. 广播到网络
6. 节点拿公钥验证签名 ✓ 才接受`}
              </pre>
            </Prose>
          ),
        },
        {
          label: "地址",
          subtitle: "为什么不直接用公钥",
          content: (
            <Prose>
              <p>
                BTC 地址长这样：
              </p>
              <pre className="font-hash text-[11px] p-3 rounded bg-[var(--card)] overflow-x-auto leading-relaxed">
{`传统（P2PKH）：1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
新版（bech32）：bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh`}
              </pre>

              <p>
                注意——<Em>地址不是公钥本身</Em>。地址是公钥经过几层处理后的结果：
              </p>
              <pre className="font-hash text-[11px] p-3 rounded bg-[var(--card)] overflow-x-auto leading-relaxed">
{`address = Base58Check(
  0x00 ||
  RIPEMD160(
    SHA256(public_key)
  )
)`}
              </pre>

              <H3>为什么要绕这么一圈？</H3>

              <KeyPoint label="① 更短，更适合手抄">
                <p>
                  <Em>公钥</Em>是 65 字节（未压缩）或 33 字节（压缩）。
                </p>
                <p>
                  <Em>地址</Em>是 25 字节，能编码为 ~34 个 Base58 字符。
                </p>
                <p className="text-[var(--muted)]">
                  在十几年前 QR 码不普及的环境下，
                  地址要能让人手抄、读出来——长度差异关键。
                </p>
              </KeyPoint>

              <KeyPoint label="② 量子后备安全（关键的远见）">
                <p>
                  公钥一旦暴露，理论上量子计算机（未来）能反推私钥。
                  这是 ECC 的潜在死穴。
                </p>
                <p>
                  但<Em>地址只是公钥的哈希</Em>——
                  量子计算对哈希函数没有显著加速。
                </p>
                <p className="text-[var(--muted)]">
                  推论：<Hl>只要你每次都用新地址收款</Hl>，
                  你的<Em>公钥永远不公开</Em>——
                  即使未来量子计算机问世，攻击者看到的都只是哈希，无从下手。
                </p>
                <p className="text-[var(--muted)]">
                  公钥只在你<Em>花钱那一刻</Em>才暴露——
                  但那时币已经转出，对量子攻击者已无价值。
                </p>
              </KeyPoint>

              <KeyPoint label="③ Base58Check 的人因工程">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>去掉易混淆字符</Em>：0、O、I、l 都不出现，
                    避免抄写时把"0"和"O"看混
                  </li>
                  <li>
                    <Em>带 4 字节校验码</Em>：
                    手抄时改一位，钱包能立刻发现地址非法（拒绝转账）
                  </li>
                  <li>
                    <Em>大写小写敏感</Em>：信息密度更高
                  </li>
                </ul>
                <p className="text-[var(--muted)]">
                  Base58 这个看似奇怪的编码完全是为了"<Em>人手</Em>抄写不出错"设计的——
                  这是中本聪很贴近实际使用场景的小细节。
                </p>
              </KeyPoint>
            </Prose>
          ),
        },
        {
          label: "形态",
          subtitle: "地址的多代演化",
          content: (
            <Prose>
              <p>
                BTC 上线 15 年来，地址格式演化过多次。
                每次都是为了解决新需求或新漏洞——
                BTC 用<Em>软分叉</Em>方式升级，老格式仍然兼容、新格式提供新功能。
              </p>

              <ComparisonTable
                headers={["代号", "前缀", "推出时间", "解决的问题"]}
                rows={[
                  [
                    "P2PKH",
                    <code key="1" className="font-hash">1...</code>,
                    "2009",
                    "最原始格式：直接锁到一个公钥哈希",
                  ],
                  [
                    "P2SH",
                    <code key="2" className="font-hash">3...</code>,
                    "2012 (BIP-16)",
                    "支持多签和复杂脚本（锁到一个脚本哈希）",
                  ],
                  [
                    "Bech32 / P2WPKH",
                    <code key="3" className="font-hash">bc1q...</code>,
                    "2017 (SegWit)",
                    "更紧凑、纠错强、大小写不敏感",
                  ],
                  [
                    "Bech32m / P2TR",
                    <code key="4" className="font-hash">bc1p...</code>,
                    "2021 (Taproot)",
                    "私密多签 + Schnorr 签名 + 复杂合约的隐私化",
                  ],
                ]}
              />

              <H3>每代的故事</H3>

              <KeyPoint label="P2PKH (Pay to Public Key Hash)">
                <p>
                  最原始格式：地址是公钥的哈希，
                  花钱时提供"签名 + 公钥"。
                </p>
                <p className="text-[var(--muted)]">
                  问题：所有钱包都得用同一种锁定方式。
                  没办法支持"3 个人共同签名才能花"这种需求。
                </p>
              </KeyPoint>

              <KeyPoint label="P2SH (Pay to Script Hash)">
                <p>
                  BIP-16 引入：地址锁到一个<Em>脚本</Em>的哈希——
                  花钱时提供能让该脚本通过的输入。
                </p>
                <p className="text-[var(--muted)]">
                  解锁了多签（如 2-of-3、3-of-5）、时间锁、原子交换等高级用法。
                  托管型钱包的基础。
                </p>
              </KeyPoint>

              <KeyPoint label="Bech32 / SegWit">
                <p>
                  2017 年 SegWit 升级带来的新编码。
                  目标：更短、更抗错、QR 码更紧凑、大小写不敏感（避免大小写抄错）。
                </p>
                <p className="text-[var(--muted)]">
                  伴随 SegWit 的"witness 数据隔离"，
                  把签名挪出主交易体——
                  事实上提升了 BTC 区块的有效容量（从 1MB 到等效 ~4MB）。
                </p>
              </KeyPoint>

              <KeyPoint label="Bech32m / Taproot">
                <p>
                  2021 年最大升级。引入 Schnorr 签名（替代 ECDSA）：
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>签名聚合</Em>——多人签名能合并成一个，
                    多签交易看起来和单签一样
                  </li>
                  <li>
                    <Em>隐私提升</Em>——
                    复杂合约和单签无法被外人区分
                  </li>
                  <li>
                    <Em>更小</Em>——签名占字节更少，手续费更低
                  </li>
                </ul>
              </KeyPoint>

              <H3>软分叉的智慧</H3>
              <p>
                注意：<Hl>每次升级老地址都仍然有效</Hl>。
                你 2010 年生成的 1... 地址今天还能正常收款。
                这是<Em>软分叉</Em>升级方式——新规则只是"更严格的子集"，
                老节点不需要升级也能验证新区块。
              </p>
              <p>
                这种"小心翼翼往前走，绝不丢弃老用户"的工程文化，
                是 BTC 15 年稳定运行的根本。
              </p>
            </Prose>
          ),
        },
        {
          label: "对比",
          subtitle: "数字签名 vs 银行身份验证",
          content: (
            <Prose>
              <p>
                银行也有一套身份验证体系——U 盾、人脸、短信、生物识别。
                看一下数字签名和这些方式的本质差异。
              </p>

              <ComparisonTable
                headers={["方式", "凭证", "防伪机制", "失效场景"]}
                rows={[
                  [
                    "手写签名",
                    "笔迹特征",
                    "肉眼比对 + 鉴定专家",
                    "熟练造假者；签名扫描伪造",
                  ],
                  [
                    "银行 U 盾",
                    "物理硬件 + PIN",
                    "硬件内私钥 + 密码",
                    "U 盾被盗 + PIN 泄漏",
                  ],
                  [
                    "人脸识别",
                    "生物特征",
                    "AI 算法 + 活体检测",
                    "照片、视频、3D 面具、AI 换脸",
                  ],
                  [
                    "短信验证码",
                    "手机号",
                    "运营商 + 短信网关",
                    "SIM Swap 攻击、短信劫持",
                  ],
                  [
                    <Hl key="ec">ECDSA 签名</Hl>,
                    <Hl key="pk">256 位私钥</Hl>,
                    <Hl key="m">数学不可伪造</Hl>,
                    "私钥泄漏（社工 / 设备入侵）",
                  ],
                ]}
              />

              <H3>关键差异：谁验证？</H3>

              <KeyPoint label="银行验证 vs BTC 验证">
                <p>
                  银行的所有身份验证方式都需要<Em>银行作为验证方</Em>——
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>U 盾签的数据，只有银行后台能验</li>
                  <li>人脸识别在银行算法上跑</li>
                  <li>短信验证码由银行系统下发和检查</li>
                </ul>
                <p>
                  这些机制本质上是"<Em>银行问你是不是你</Em>"——
                  你和银行之间的私密对话。
                </p>
                <p className="text-[var(--muted)]">
                  推论：银行可以拒绝你（不接受验证）、
                  可以伪造（系统内部人员）、
                  可以在监管要求下回滚你的签名。
                </p>
              </KeyPoint>

              <KeyPoint label="BTC 的不同">
                <p>
                  BTC 签名<Em>任何人用公钥都能验</Em>——
                  无需中心化仲裁。
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>地球上每个 BTC 节点独立验签</li>
                  <li>没有"银行说了算"的环节</li>
                  <li>验证过程纯数学，没有仲裁空间</li>
                </ul>
                <p className="text-[var(--muted)]">
                  推论：<Hl>没人能伪造你的交易</Hl>——
                  哪怕政府、矿池、交易所联合都不行。
                  这是"无需信任第三方"在身份层的落地。
                </p>
              </KeyPoint>

              <H3>"自主主权"的代价</H3>
              <p>
                这种"绝对自主"也意味着：
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                <li>
                  <Em>没有"忘记密码 → 找银行重置"</Em>——
                  私钥丢了就是丢了
                </li>
                <li>
                  <Em>没有"被盗后联系银行冻结"</Em>——
                  私钥泄漏后对方立刻能转走所有币
                </li>
                <li>
                  <Em>没有"客服"</Em>——
                  你就是自己的银行，自己负责所有安全
                </li>
              </ul>
              <p>
                <Hl>BTC 把"完全的所有权"和"完全的责任"打包给了你</Hl>——
                这不一定每个人都想要，但这是它最本质的价值主张。
              </p>
            </Prose>
          ),
        },
        {
          label: "陷阱",
          subtitle: "「钱包」一词的误导",
          content: (
            <Prose>
              <p>
                "BTC 钱包"这个词是<Em>BTC 生态最大的误导</Em>之一。
                它让新人产生一个错觉——"钱在钱包里"。
              </p>

              <H3>钱包不存钱</H3>
              <KeyPoint label="真相">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>BTC 永远在链上</Em>——
                    更准确说，在全球节点维护的 UTXO 集合里
                  </li>
                  <li>
                    钱包软件做的事是：保存<Hl>私钥</Hl>+
                    帮你签交易 + 查询能解锁的 UTXO
                  </li>
                  <li>
                    <Em>钱包本身不存钱</Em>——它管理的是"花钱权"
                  </li>
                </ul>
              </KeyPoint>

              <H3>推论：私钥就是一切</H3>
              <p className="p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                <Hl>私钥丢失</Hl> = 你的 BTC 永远锁在链上，没人能动（包括你自己）。
                <br />
                <Hl>私钥被偷</Hl> = 对方可以立刻把你所有 BTC 转走。
              </p>

              <p>
                这就是那句名言——
              </p>
              <p className="font-hash text-center text-[var(--accent)] my-4">
                <Em>Not your keys, not your coins.</Em>
              </p>

              <H3>把币放交易所 = 信用敞口</H3>
              <p>
                把 BTC 存在 Binance、Coinbase 等交易所，
                技术上你<Em>没有私钥</Em>——交易所有。
                你只是它账面上的"欠条持有者"。
              </p>

              <KeyPoint label="活生生的教训">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>2014 Mt.Gox 破产</Em>：
                    用户 85 万 BTC 永久丢失（黑客 + 高管挪用）——
                    当年这是全球 70% 的 BTC 交易量
                  </li>
                  <li>
                    <Em>2022 FTX 暴雷</Em>：
                    创始人 SBF 挪用客户资金 80 亿美元，
                    平台一夜清盘
                  </li>
                  <li>
                    <Em>2023 SVB 倒闭</Em>：
                    虽是传统银行，但用户存款上限保护提示了
                    "把资产托给中心化机构"的固有风险
                  </li>
                </ul>
              </KeyPoint>

              <H3>钱包分类</H3>
              <ComparisonTable
                headers={["类型", "私钥位置", "适用场景", "风险"]}
                rows={[
                  [
                    "热钱包（手机/桌面）",
                    "联网设备",
                    "小额日常",
                    "易被恶意软件攻击",
                  ],
                  [
                    "冷钱包（离线电脑）",
                    "断网设备",
                    "中等金额",
                    "操作失误风险",
                  ],
                  [
                    <Hl key="hw">硬件钱包（Ledger/Trezor）</Hl>,
                    "专用安全芯片",
                    "中大额",
                    "丢失设备 / 钓鱼诱骗签名",
                  ],
                  [
                    "纸钱包",
                    "打印在纸上",
                    "长期存储",
                    "纸张损坏 / 物理盗窃",
                  ],
                  [
                    "多签 / Multisig",
                    "多个独立设备 / 人",
                    "机构级 / 大额",
                    "复杂度高 / 协调成本",
                  ],
                ]}
              />

              <H3>实战建议</H3>
              <KeyPoint label="按金额分级管理">
                <ul className="list-disc list-inside ml-2 space-y-1 text-[var(--muted)]">
                  <li>
                    <Em>&lt; 1000 美元</Em>：手机热钱包足够
                  </li>
                  <li>
                    <Em>1000 - 50,000 美元</Em>：
                    硬件钱包（Ledger Nano / Trezor）
                  </li>
                  <li>
                    <Em>&gt; 50,000 美元</Em>：
                    多签（2-of-3 不同地点的硬件钱包）
                  </li>
                  <li>
                    <Em>机构级</Em>：
                    专业托管（Coinbase Custody、BitGo）+ 多签 + 法律安排
                  </li>
                </ul>
              </KeyPoint>

              <H3>重点：BTC 把自由和责任打包</H3>
              <p>
                "Be your own bank" 听起来很酷——
                但<Em>"做自己的银行"也意味着承担所有银行的责任</Em>：
                安全管理、备份策略、应急计划、传承安排。
              </p>
              <p>
                这一章和上一章的总结：
                <Hl>密码学让你拥有完全的所有权</Hl>，
                但所有权伴随着完全的责任——
                这是 BTC 给个人的礼物，也是它给个人的考验。
              </p>
            </Prose>
          ),
        },
      ]}
    />
  );
}
