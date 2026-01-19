import { Badge, Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { motion } from 'motion/react'

import { IS_DEV, VERSION } from '~/constants/app'
import { env } from '~/constants/env'

import { CopyButton } from '~/components/elements/CopyButton'

const features = [
  {
    title: 'React + Radix UI',
    description: '强大且现代的前端 UI 架构',
    icon: '🧱',
  },
  {
    title: 'Radix Themes',
    description: '开箱即用的组件库，样式统一',
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
  {
    title: '开箱即用',
    description: '快速启动，支持拓展与定制',
    icon: '⏱',
  },
]

const createCommandStr = 'pnpm dlx degit Pony-Unicorn/web3-template my-project'

export default function Home() {
  return (
    <Box p="6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex direction="column" align="center" gap="4" mb="8">
          <Heading size="8" align="center">
            Bolt 是构建 Dapp 的新起点
          </Heading>
          <Text size="4" color="gray" align="center">
            快速启动，模块清晰，组件现代，是你构建下一代 Web3 应用的理想起点
          </Text>
          <CopyButton value={createCommandStr}>{createCommandStr}</CopyButton>
        </Flex>
      </motion.div>

      <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="4" mb="8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <Flex direction="column" gap="2">
                <Text size="6">{feature.icon}</Text>
                <Heading size="4">{feature.title}</Heading>
                <Text size="2" color="gray">
                  {feature.description}
                </Text>
              </Flex>
            </Card>
          </motion.div>
        ))}
      </Grid>

      <Card mb="8">
        <Flex direction="column" gap="4">
          <Heading size="5" align="center">
            框架信息
          </Heading>
          <Grid columns="2" gap="4" maxWidth="400px" mx="auto">
            <Flex gap="2" align="center">
              <Text size="2" color="gray" weight="medium">
                版本:
              </Text>
              <Badge variant="surface">{VERSION}</Badge>
            </Flex>
            <Flex gap="2" align="center">
              <Text size="2" color="gray" weight="medium">
                模式:
              </Text>
              <Badge variant="outline">{env.VITE_APP_MODE}</Badge>
            </Flex>
            <Flex gap="2" align="center">
              <Text size="2" color="gray" weight="medium">
                使用测试网:
              </Text>
              <Badge
                variant={IS_DEV ? 'solid' : 'outline'}
                color={IS_DEV ? 'red' : 'blue'}
              >
                {IS_DEV.toString().toUpperCase()}
              </Badge>
            </Flex>
            <Flex gap="2" align="center">
              <Text size="2" color="gray" weight="medium">
                最后更新:
              </Text>
              <Badge variant="surface">2025-12-8</Badge>
            </Flex>
          </Grid>
        </Flex>
      </Card>

      <Box>
        <Heading size="5" align="center" mb="4">
          技术栈
        </Heading>
        <Flex wrap="wrap" justify="center" gap="3">
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
            <Badge key={tech} variant="outline" size="2">
              {tech}
            </Badge>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
