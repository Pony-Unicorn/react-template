import { motion } from 'motion/react'

import { CopyButton } from '~/components/elements/CopyButton'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent } from '~/components/ui/card'
import { IS_DEV, VERSION } from '~/constants/app'
import { env } from '~/constants/env'

const features = [
  {
    title: 'Radix Themes',
    description: '强大且现代的 UI，样式统一',
    icon: '🎨',
  },
  {
    title: 'Motion',
    description: '炫酷且顺滑的动画体验',
    icon: '🌀',
  },
  {
    title: 'Wagmi + viem',
    description: '下一代 EVM 钱包交互工具',
    icon: '🔐',
  },
  {
    title: '@reown/appkit',
    description: '一站式 DApp 构建集成方案',
    icon: '🚀',
  },
]

const createCommandStr = 'pnpm dlx degit Pony-Unicorn/web3-template my-project'

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex flex-col items-center gap-4">
          <h1 className="text-center text-4xl font-bold">
            Bolt 是构建 Dapp 的新起点
          </h1>
          <p className="text-muted-foreground text-center text-lg">
            快速启动，模块清晰，组件现代，是你构建下一代 Web3 应用的理想起点
          </p>
          <CopyButton value={createCommandStr}>{createCommandStr}</CopyButton>
        </div>
      </motion.div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="flex flex-col gap-2 pt-6">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="mb-8">
        <CardContent className="flex flex-col gap-4 pt-6">
          <h2 className="text-center text-2xl font-semibold">框架信息</h2>
          <div className="mx-auto grid max-w-100 grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                版本:
              </span>
              <Badge variant="secondary">{VERSION}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                模式:
              </span>
              <Badge variant="outline">{env.VITE_APP_MODE}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                使用测试网:
              </span>
              <Badge variant={IS_DEV ? 'destructive' : 'outline'}>
                {IS_DEV.toString().toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                最后更新:
              </span>
              <Badge variant="secondary">2025-12-8</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-center text-2xl font-semibold">技术栈</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'React Router',
            'TypeScript',
            'Radix UI Themes',
            'Motion',
            'TanStack Query',
            'AppKit',
            'wagmi',
            'viem',
          ].map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
