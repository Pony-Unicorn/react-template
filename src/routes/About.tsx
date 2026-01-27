import {
  RiFlashlightLine,
  RiGithubLine,
  RiHeartLine,
  RiStarLine,
} from '@remixicon/react'
import { motion } from 'motion/react'

import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
}

const fadeInUpTransition = {
  duration: 0.8,
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function About() {
  return (
    <div className="p-6">
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="flex flex-col items-center gap-6 mb-8">
          <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
            <h1 className="text-5xl font-bold text-center">关于我</h1>
          </motion.div>

          <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
            <Card>
              <CardContent className="flex flex-col gap-6 p-8">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="text-6xl">🐴</div>
                  <h2 className="text-2xl font-bold">Hi, I&apos;m Pony</h2>
                  <p className="text-lg text-muted-foreground">
                    A passionate self-taught Software developer
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 items-start">
                    <div>
                      <RiHeartLine className="w-5 h-5" />
                    </div>
                    <p>
                      I&apos;m a{' '}
                      <span className="font-bold">decentralized believer</span>,
                      and I love building with crypto.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div>
                      <RiStarLine className="w-5 h-5" />
                    </div>
                    <p>
                      Currently my main job GameFi, focused on quant trading
                      strategy research.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div>
                      <RiFlashlightLine className="w-5 h-5" />
                    </div>
                    <p>
                      I&apos;m currently learning{' '}
                      <span className="font-bold">Algorithm design</span> and{' '}
                      <span className="font-bold">Blockchain</span> related
                      knowledge.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div>
                      <RiGithubLine className="w-5 h-5" />
                    </div>
                    <p>
                      How to reach me: Check out my{' '}
                      <a
                        href="https://github.com/Pony-Unicorn"
                        target="_blank"
                        className="text-primary hover:underline"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>{' '}
                      or create{' '}
                      <a
                        href="https://github.com/Pony-Unicorn/web3-template/issues"
                        target="_blank"
                        className="text-primary hover:underline"
                        rel="noreferrer"
                      >
                        issues
                      </a>{' '}
                      to discuss.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <Separator className="my-8" />

      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="flex flex-col gap-6 mb-8">
          <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
            <h2 className="text-3xl font-bold text-center mb-2">技能与兴趣</h2>
            <p className="text-lg text-muted-foreground text-center">
              专注于区块链技术和游戏化金融的创新应用
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-3 items-center mb-4">
                    <RiFlashlightLine className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">技术栈</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      'TypeScript',
                      'Go',
                      'Node.js',
                      'Solidity',
                      'React & Next.js',
                      'Web3.js / Viem.js',
                      'PostgreSQL / MongoDB',
                    ].map((skill) => (
                      <div key={skill} className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-3 items-center mb-4">
                    <RiStarLine className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">专注领域</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      'GameFi 开发',
                      'DeFi 开发',
                      '去中心化应用',
                      '量化交易',
                      '智能合约与协议设计',
                      '高性能区块链系统架构',
                      '金融算法与机制设计',
                    ].map((area) => (
                      <div key={area} className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
          <Card>
            <CardContent className="flex flex-col items-center gap-4 p-8">
              <h2 className="text-2xl font-bold text-center">
                让我们一起构建未来
              </h2>
              <p className="text-lg text-muted-foreground text-center">
                如果你对区块链、GameFi 或开源项目感兴趣，欢迎与我交流
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  render={
                    <a
                      href="https://github.com/Pony-Unicorn/web3-template"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <RiGithubLine className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  render={
                    <a
                      href="https://github.com/Pony-Unicorn/web3-template/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <RiStarLine className="mr-2 h-4 w-4" />
                  Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </div>
  )
}
