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
          组件预览
        </Heading>
        <Text size="2" color="gray">
          展示项目中的状态管理方案与 UI 组件使用示例，包括 Zustand Store、自定义
          Hooks 以及 Radix UI Themes 与 Sonner 集成
        </Text>
      </Box>

      <Flex direction="column" gap="8">
        <UseComputedStateSection />
        <ZustandComputedStateSection />
        <SonnerDemo />
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
      <Flex direction="column" gap="5">
        {/* 标题和描述区域 - 使用较小的间距 */}
        <Flex direction="column" gap="2">
          <Heading size="4">useComputedState 示例</Heading>
          <Text size="2" color="gray">
            自定义 Hook
            实现派生状态管理，维护原始值与格式化显示值，支持函数式更新与自动计算
          </Text>
        </Flex>

        {/* 内容区域 - 使用统一的间距 */}
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
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
              <Flex direction="column" gap="2">
                <Text size="2" color="gray">
                  派生显示值（格式化为人民币）：
                </Text>
                <Text size="5" weight="medium">
                  {displayValue}
                </Text>
              </Flex>
            </Card>

            <Card variant="surface">
              <Flex direction="column" gap="2">
                <Text size="2" color="gray">
                  额外派生（平方，仅示例）：
                </Text>
                <Text size="5" weight="medium">
                  {squared}
                </Text>
              </Flex>
            </Card>
          </Grid>

          <Separator size="4" />

          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
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
      <Flex direction="column" gap="5">
        {/* 标题和描述区域 - 使用较小的间距 */}
        <Flex direction="column" gap="2">
          <Heading size="4">Zustand 状态管理示例</Heading>
          <Text size="2" color="gray">
            展示 Zustand Store 的最佳实践：使用 Selector 实现派生状态计算，配合
            useShallow 优化重渲染性能
          </Text>
        </Flex>

        {/* 内容区域 - 使用统一的间距 */}
        <Flex direction="column" gap="4">
          <Grid columns="1" gap="4">
            <Flex direction="column" gap="2">
              <Text size="2" color="gray">
                姓氏：
              </Text>
              <TextField.Root
                value={firstName}
                onChange={(e) => updateFirstName(e.target.value)}
                placeholder="请输入姓氏"
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" color="gray">
                名字：
              </Text>
              <TextField.Root
                value={lastName}
                onChange={(e) => updateLastName(e.target.value)}
                placeholder="请输入名字"
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" color="gray">
                年龄：
              </Text>
              <TextField.Root
                type="number"
                value={age}
                onChange={(e) => updateAge(Number(e.target.value))}
                placeholder="请输入年龄"
              />
            </Flex>
          </Grid>

          <Separator size="4" />

          <Grid columns={{ initial: '1', md: '3' }} gap="4">
            <Card variant="surface">
              <Flex direction="column" gap="2">
                <Text size="2" color="gray">
                  全名：
                </Text>
                <Text size="3" weight="medium">
                  {fullName || '(未填写)'}
                </Text>
              </Flex>
            </Card>
            <Card variant="surface">
              <Flex direction="column" gap="2">
                <Text size="2" color="gray">
                  首字母：
                </Text>
                <Text size="3" weight="medium">
                  {initials || '-'}
                </Text>
              </Flex>
            </Card>
            <Card variant="surface">
              <Flex direction="column" gap="2">
                <Text size="2" color="gray">
                  状态：
                </Text>
                <Badge color={isAdult ? 'green' : 'orange'}>
                  {isAdult ? '成年' : '未成年'}
                </Badge>
              </Flex>
            </Card>
          </Grid>

          <Separator size="4" />

          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
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
      </Flex>
    </Card>
  )
}

function SonnerDemo() {
  return (
    <Card>
      <Flex direction="column" gap="5">
        {/* 标题和描述区域 - 使用较小的间距 */}
        <Flex direction="column" gap="2">
          <Heading size="4">Sonner Toast 示例</Heading>
          <Text size="2" color="gray">
            Sonner Toast 弹窗示例
          </Text>
        </Flex>

        {/* 内容区域 */}
        <Flex gap="3" wrap="wrap">
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
    </Card>
  )
}
