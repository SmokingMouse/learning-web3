# Learning Web3 · Bitcoin: From First Principles

> 从一个朴素问题出发——"两个陌生人没有中介怎么转账"——一步步推出 BTC 的全部设计。
>
> 9 章 · 58 个内页 · 5 个交互式 demo · 完全免费开源。

**🔗 在线访问**：https://learning-web3.vercel.app（部署后填入实际地址）

---

## 这是什么

一份给初学者和"懂一点点"的人的 Bitcoin 教程。和市面上大部分文档不一样：

- **从第一性原理推导**——每一节都由上一节遗留的问题驱动。看完你会明白：BTC 的每一个零件，都是被前一个问题逼出来的解，不是灵感，是推导。
- **章节内分内页 (Tabs)**——每章拆成"直觉 / 推导 / 机制 / 对比 / 历史 / 争议"等多个角度，控制单页信息密度。
- **嵌入式交互 demo**——SHA-256、区块链篡改、PoW 挖矿、ECDSA 签名、交易生命周期，亲手玩一遍胜过读 100 页。
- **对比传统金融**——每章都有和银行/法币/黄金/SWIFT 的对照，看懂 BTC 的创新到底在哪。

## 章节地图

| #  | 章节                     | 核心追问                                               |
|----|-------------------------|------------------------------------------------------|
| 0  | 为什么需要 BTC          | 没有中介，两个陌生人能转账吗？                        |
| 1  | 公开账本                | 让全网持有同一份账本——但这份账本怎么可信？            |
| 2  | 用哈希锁住账本          | 怎么让"改一个字就暴露"？                              |
| 3  | 工作量证明 (PoW)        | 让"重算"变得不可承受                                  |
| 4  | 数字签名 & 地址         | 凭什么说这是 Alice 本人写的？                         |
| 5  | UTXO                    | 余额到底是什么？                                      |
| 6  | Merkle Tree             | 手机钱包怎么验证交易被打包了？                        |
| 7  | Coinbase & 减半         | 第一个 BTC 凭什么凭空出现？2100 万怎么算出来？        |
| 8  | 完整旅程                | 把所有零件串起来走完一笔交易                          |

## 技术栈

- **Next.js 14** + **React 18** + **TypeScript**
- **Tailwind CSS** 设计系统
- **framer-motion** 动效
- **crypto-js** 真实 SHA-256 / ECDSA 计算
- 无后端，纯前端教学项目

## 本地运行

```bash
git clone https://github.com/SmokingMouse/learning-web3.git
cd learning-web3
npm install
npm run dev
```

访问 http://localhost:3000/learn

## 项目结构

```
app/
  learn/page.tsx           # 主入口：9 章布局
components/
  learn/
    SectionTabs.tsx        # Tab 切换 + 内置正文工具
    sections/              # 9 章每章一个文件
      Section0.tsx ~ Section8.tsx
  hash/                    # SHA-256 + 区块链 demo
  mining/                  # PoW 挖矿模拟
docs/
  bitcoin-curriculum.md    # 完整教学大纲
```

## 路线图

- [x] BTC 9 章完整教学（v1）
- [ ] ETH 章节：账户模型、Smart Contract、PoS、Gas 拍卖
- [ ] L2 与扩容：Lightning、Rollup、Sidechain
- [ ] 实操篇：MetaMask、Etherscan、第一个 DApp

## 关于作者

[@SmokingMouse](https://github.com/SmokingMouse) · 专注 Web3 + AI Agent 内容分享。

如果这个项目对你有帮助，给个 ⭐️ 是最大的鼓励。

## License

MIT
