import { HomeIcon } from '@radix-ui/react-icons'
import { Box, Button, Code, Flex, Text } from '@radix-ui/themes'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import FuzzyText from '~/components/react-bits/FuzzyText'

interface NotFoundProps {
  message: string
  details: string
  stack?: string
}

export default function NotFound({ message, details, stack }: NotFoundProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      py="9"
      minHeight="60vh"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex direction="column" align="center" gap="4" mb="6">
          <Box mb="2">
            <FuzzyText baseIntensity={0.3} color="#ee9a00ff">
              {message}
            </FuzzyText>
          </Box>

          <Text size="4" color="gray" align="center">
            {details}
          </Text>

          {stack && (
            <Box
              p="4"
              style={{
                width: '100%',
                overflow: 'auto',
              }}
            >
              <Code size="1">{stack}</Code>
            </Box>
          )}
        </Flex>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button asChild size="3">
          <Link to="/">
            <HomeIcon />
            Go Home
          </Link>
        </Button>
      </motion.div>
    </Flex>
  )
}
