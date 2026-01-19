import {
  GitHubLogoIcon,
  HeartIcon,
  LightningBoltIcon,
  StarIcon,
} from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes'
import { motion } from 'motion/react'

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
    <Box p="6">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <Flex direction="column" align="center" gap="6" mb="8">
          <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
            <Heading size="9" align="center">
              关于我
            </Heading>
          </motion.div>

          <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
            <Card size="4">
              <Flex direction="column" align="center" gap="4" mb="6">
                <Box>
                  <Text size="9">🐴</Text>
                </Box>
                <Heading size="6">Hi, I&apos;m Pony</Heading>
                <Text size="3" color="gray">
                  A passionate self-taught Software developer
                </Text>
              </Flex>

              <Flex direction="column" gap="4">
                <Flex gap="3" align="start">
                  <Box>
                    <HeartIcon width={20} height={20} />
                  </Box>
                  <Text>
                    I&apos;m a <Text weight="bold">decentralized believer</Text>
                    , and I love building with crypto.
                  </Text>
                </Flex>

                <Flex gap="3" align="start">
                  <Box>
                    <StarIcon width={20} height={20} />
                  </Box>
                  <Text>
                    Currently my main job GameFi, focused on quant trading
                    strategy research.
                  </Text>
                </Flex>

                <Flex gap="3" align="start">
                  <Box>
                    <LightningBoltIcon width={20} height={20} />
                  </Box>
                  <Text>
                    I&apos;m currently learning{' '}
                    <Text weight="bold">Algorithm design</Text> and{' '}
                    <Text weight="bold">Blockchain</Text> related knowledge.
                  </Text>
                </Flex>

                <Flex gap="3" align="start">
                  <Box>
                    <GitHubLogoIcon width={20} height={20} />
                  </Box>
                  <Text>
                    How to reach me: Check out my{' '}
                    <Link
                      href="https://github.com/Pony-Unicorn"
                      target="_blank"
                    >
                      GitHub
                    </Link>{' '}
                    or create{' '}
                    <Link
                      href="https://github.com/Pony-Unicorn/web3-template/issues"
                      target="_blank"
                    >
                      issues
                    </Link>{' '}
                    to discuss.
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </motion.div>
        </Flex>
      </motion.section>

      <Separator size="4" my="8" />

      {/* Skills & Interests Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <Flex direction="column" gap="6" mb="8">
          <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
            <Heading size="7" align="center" mb="2">
              技能与兴趣
            </Heading>
            <Text size="3" color="gray" align="center" as="p">
              专注于区块链技术和游戏化金融的创新应用
            </Text>
          </motion.div>

          <Grid columns={{ initial: '1', md: '2' }} gap="4">
            <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
              <Card>
                <Flex gap="3" align="center" mb="4">
                  <LightningBoltIcon width={24} height={24} />
                  <Heading size="4">技术栈</Heading>
                </Flex>
                <Flex direction="column" gap="2">
                  {[
                    'React & Next.js',
                    'TypeScript',
                    'Solidity',
                    'Web3.js / Ethers.js',
                    'Node.js',
                    'PostgreSQL / MongoDB',
                  ].map((skill) => (
                    <Flex key={skill} gap="2" align="center">
                      <Box
                        width="8px"
                        height="8px"
                        style={{
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-9)',
                        }}
                      />
                      <Text size="2">{skill}</Text>
                    </Flex>
                  ))}
                </Flex>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
              <Card>
                <Flex gap="3" align="center" mb="4">
                  <StarIcon width={24} height={24} />
                  <Heading size="4">专注领域</Heading>
                </Flex>
                <Flex direction="column" gap="2">
                  {[
                    'GameFi 开发',
                    'DeFi 协议设计',
                    '智能合约审计',
                    '区块链架构',
                    '量化交易',
                    '去中心化应用',
                  ].map((area) => (
                    <Flex key={area} gap="2" align="center">
                      <Box
                        width="8px"
                        height="8px"
                        style={{
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-9)',
                        }}
                      />
                      <Text size="2">{area}</Text>
                    </Flex>
                  ))}
                </Flex>
              </Card>
            </motion.div>
          </Grid>
        </Flex>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} transition={fadeInUpTransition}>
          <Card size="4">
            <Flex direction="column" align="center" gap="4">
              <Heading size="6" align="center">
                让我们一起构建未来
              </Heading>
              <Text size="3" color="gray" align="center">
                如果你对区块链、GameFi 或开源项目感兴趣，欢迎与我交流
              </Text>
              <Flex gap="3" wrap="wrap" justify="center">
                <Button asChild variant="soft" size="3">
                  <a
                    href="https://github.com/Pony-Unicorn/web3-template"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubLogoIcon />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="3">
                  <a
                    href="https://github.com/Pony-Unicorn/web3-template/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StarIcon />
                    Issues
                  </a>
                </Button>
              </Flex>
            </Flex>
          </Card>
        </motion.div>
      </motion.section>
    </Box>
  )
}
