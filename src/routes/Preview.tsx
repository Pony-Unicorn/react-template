import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useMemo } from 'react'

import { useShallow } from 'zustand/react/shallow'
import { useComputedState } from '~/hooks/useComputedState'
import {
  selectFullName,
  selectInitials,
  selectIsAdult,
  usePersonStore,
} from '~/store/person'

export default function Preview() {
  return (
    <Box p="6" maxWidth="800px" mx="auto">
      <Box mb="6">
        <Heading size="6" mb="2">
          预览页面
        </Heading>
        <Text size="2" color="gray">
          该页面汇集各类示例组件与用法，后续会持续补充更多示例分节。
        </Text>
      </Box>

      <Flex direction="column" gap="6">
        <UseComputedStateSection />
        <ZustandComputedStateSection />
      </Flex>
    </Box>
  )
}

function UseComputedStateSection() {
  const { realValue, setRealValue, displayValue } = useComputedState<number>(
    1000,
    (v) => v.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
  )

  const squared = useMemo(() => realValue * realValue, [realValue])

  return (
    <Card>
      <Heading size="4" mb="2">
        useComputedState（派生状态）
      </Heading>
      <Text size="2" color="gray" mb="4">
        维护真实值与显示值，支持函数式更新与自定义派生计算。
      </Text>

      <Flex direction="column" gap="4">
        <Box>
          <Text size="2" color="gray" mb="2">
            真实值（数字）：
          </Text>
          <Flex gap="2" align="center" wrap="wrap">
            <TextField.Root
              type="number"
              value={realValue}
              onChange={(e) => setRealValue(Number(e.target.value || 0))}
              style={{ width: '140px' }}
            />
            <Button onClick={() => setRealValue((prev) => prev + 1)}>+1</Button>
            <Button
              variant="soft"
              onClick={() => setRealValue((prev) => Math.max(0, prev - 1))}
            >
              -1
            </Button>
            <Button variant="outline" onClick={() => setRealValue(0)}>
              重置
            </Button>
          </Flex>
        </Box>

        <Separator size="4" />

        <Grid columns={{ initial: '1', md: '2' }} gap="4">
          <Card variant="surface">
            <Text size="2" color="gray">
              派生显示值（格式化为人民币）：
            </Text>
            <Text size="5" weight="medium" mt="1">
              {displayValue}
            </Text>
          </Card>

          <Card variant="surface">
            <Text size="2" color="gray">
              额外派生（平方，仅示例）：
            </Text>
            <Text size="5" weight="medium" mt="1">
              {squared}
            </Text>
          </Card>
        </Grid>

        <Separator size="4" />

        <Box>
          <Text size="2" color="gray" mb="2">
            快速操作：
          </Text>
          <Flex gap="2" wrap="wrap">
            <Button onClick={() => setRealValue(66)}>设为 66</Button>
            <Button onClick={() => setRealValue(1000)}>设为 1000</Button>
            <Button onClick={() => setRealValue((prev) => prev * 10)}>
              ×10
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

function ZustandComputedStateSection() {
  const {
    firstName,
    lastName,
    age,
    updateFirstName,
    updateLastName,
    updateAge,
  } = usePersonStore(useShallow((s) => s))

  const fullName = usePersonStore(selectFullName)
  const isAdult = usePersonStore(selectIsAdult)
  const initials = usePersonStore(selectInitials)

  return (
    <Card>
      <Heading size="4" mb="2">
        Zustand 计算状态
      </Heading>
      <Text size="2" color="gray" mb="4">
        使用 Zustand Store + Selector 实现派生状态，自动优化重渲染。
      </Text>

      <Flex direction="column" gap="4">
        <Grid columns="1" gap="3">
          <Box>
            <Text size="2" color="gray" mb="1">
              姓氏：
            </Text>
            <TextField.Root
              value={firstName}
              onChange={(e) => updateFirstName(e.target.value)}
              placeholder="请输入姓氏"
            />
          </Box>
          <Box>
            <Text size="2" color="gray" mb="1">
              名字：
            </Text>
            <TextField.Root
              value={lastName}
              onChange={(e) => updateLastName(e.target.value)}
              placeholder="请输入名字"
            />
          </Box>
          <Box>
            <Text size="2" color="gray" mb="1">
              年龄：
            </Text>
            <TextField.Root
              type="number"
              value={age}
              onChange={(e) => updateAge(Number(e.target.value))}
              placeholder="请输入年龄"
            />
          </Box>
        </Grid>

        <Separator size="4" />

        <Grid columns={{ initial: '1', md: '3' }} gap="4">
          <Card variant="surface">
            <Text size="2" color="gray">
              全名：
            </Text>
            <Text size="3" weight="medium" mt="1">
              {fullName || '(未填写)'}
            </Text>
          </Card>
          <Card variant="surface">
            <Text size="2" color="gray">
              首字母：
            </Text>
            <Text size="3" weight="medium" mt="1">
              {initials || '-'}
            </Text>
          </Card>
          <Card variant="surface">
            <Text size="2" color="gray">
              状态：
            </Text>
            <Badge mt="1" color={isAdult ? 'green' : 'orange'}>
              {isAdult ? '成年' : '未成年'}
            </Badge>
          </Card>
        </Grid>

        <Separator size="4" />

        <Box>
          <Text size="2" color="gray" mb="2">
            快速填充示例：
          </Text>
          <Flex gap="2" wrap="wrap">
            <Button
              onClick={() => {
                updateFirstName('张')
                updateLastName('三')
                updateAge(25)
              }}
            >
              张三 (25岁)
            </Button>
            <Button
              onClick={() => {
                updateFirstName('李')
                updateLastName('四')
                updateAge(16)
              }}
            >
              李四 (16岁)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                updateFirstName('')
                updateLastName('')
                updateAge(0)
              }}
            >
              清空
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}
