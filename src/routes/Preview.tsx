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
import { toast } from 'sonner'

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
      <Box mb="8">
        <Heading size="6" mb="3">
          预览页面
        </Heading>
        <Text size="2" color="gray">
          该页面汇集各类示例组件与用法，后续会持续补充更多示例分节。
        </Text>
      </Box>

      <Flex direction="column" gap="8">
        <UseComputedStateSection />
        <ZustandComputedStateSection />
        <Flex direction="column" gap="1">
          <Flex gap="1">
            <Button
              variant="classic"
              onClick={() => {
                toast('This is a toast')
              }}
            >
              toast
            </Button>
            <Button
              // variant="classic"
              onClick={() => {
                toast.warning('This is a toast')
              }}
            >
              warning
            </Button>
            <Button
              variant="soft"
              onClick={() => {
                toast.success('This is a success toast')
              }}
            >
              success
            </Button>
            <Button
              color="red"
              onClick={() => {
                toast.error('This is a error')
              }}
            >
              error
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast.loading('Loading…')
              }}
            >
              loading
            </Button>
          </Flex>
        </Flex>
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
      <Flex direction="column" gap="1">
        <Heading size="4" mb="3">
          useComputedState（派生状态）
        </Heading>
        <Text size="2" color="gray" mb="5">
          维护真实值与显示值，支持函数式更新与自定义派生计算。
        </Text>

        <Flex direction="column" gap="4">
          <Flex direction="column" gap="1">
            <Text size="2" color="gray" mb="3">
              真实值（数字）：
            </Text>
            <Flex gap="3" align="center" wrap="wrap">
              <TextField.Root
                type="number"
                value={realValue}
                onChange={(e) => setRealValue(Number(e.target.value || 0))}
              />
              <Button onClick={() => setRealValue((prev) => prev + 1)}>
                +1
              </Button>
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
          </Flex>

          <Separator size="4" />

          <Grid columns={{ initial: '1', md: '2' }} gap="4">
            <Card variant="surface">
              <Text size="2" color="gray" mb="2">
                派生显示值（格式化为人民币）：
              </Text>
              <Text size="5" weight="medium">
                {displayValue}
              </Text>
            </Card>

            <Card variant="surface">
              <Text size="2" color="gray" mb="2">
                额外派生（平方，仅示例）：
              </Text>
              <Text size="5" weight="medium">
                {squared}
              </Text>
            </Card>
          </Grid>

          <Separator size="4" />

          <Flex direction="column" gap="1">
            <Text size="2" color="gray" mb="3">
              快速操作：
            </Text>
            <Flex gap="3" wrap="wrap">
              <Button onClick={() => setRealValue(66)}>设为 66</Button>
              <Button onClick={() => setRealValue(1000)}>设为 1000</Button>
              <Button onClick={() => setRealValue((prev) => prev * 10)}>
                ×10
              </Button>
            </Flex>
          </Flex>
        </Flex>
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
      <Heading size="4" mb="3">
        Zustand 计算状态
      </Heading>
      <Text size="2" color="gray" mb="5">
        使用 Zustand Store + Selector 实现派生状态，自动优化重渲染。
      </Text>

      <Flex direction="column" gap="5">
        <Grid columns="1" gap="4">
          <Box>
            <Text size="2" color="gray" mb="2">
              姓氏：
            </Text>
            <TextField.Root
              value={firstName}
              onChange={(e) => updateFirstName(e.target.value)}
              placeholder="请输入姓氏"
            />
          </Box>
          <Box>
            <Text size="2" color="gray" mb="2">
              名字：
            </Text>
            <TextField.Root
              value={lastName}
              onChange={(e) => updateLastName(e.target.value)}
              placeholder="请输入名字"
            />
          </Box>
          <Box>
            <Text size="2" color="gray" mb="2">
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
            <Text size="2" color="gray" mb="2">
              全名：
            </Text>
            <Text size="3" weight="medium">
              {fullName || '(未填写)'}
            </Text>
          </Card>
          <Card variant="surface">
            <Text size="2" color="gray" mb="2">
              首字母：
            </Text>
            <Text size="3" weight="medium">
              {initials || '-'}
            </Text>
          </Card>
          <Card variant="surface">
            <Text size="2" color="gray" mb="2">
              状态：
            </Text>
            <Badge color={isAdult ? 'green' : 'orange'}>
              {isAdult ? '成年' : '未成年'}
            </Badge>
          </Card>
        </Grid>

        <Separator size="4" />

        <Flex direction="column" gap="1">
          <Text size="2" color="gray" mb="3">
            快速填充示例：
          </Text>
          <Flex gap="3" wrap="wrap">
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
        </Flex>
      </Flex>
    </Card>
  )
}
