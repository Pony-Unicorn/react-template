import { useMemo } from 'react'
import { toast } from 'sonner'
import { useShallow } from 'zustand/react/shallow'

import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { Box } from '~/components/layout/box'
import { Flex } from '~/components/layout/flex'
import { Grid } from '~/components/layout/grid'
import { useComputedState } from '~/hooks/useComputedState'
import {
  selectFullName,
  selectInitials,
  selectIsAdult,
  usePersonStore,
} from '~/store/person'

export default function Preview() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-3 text-2xl font-bold">组件预览</h1>
        <p className="text-muted-foreground text-sm">
          展示项目中的状态管理方案与 UI 组件使用示例，包括 Zustand Store、自定义
          Hooks 以及 Radix UI Themes 与 Sonner 集成
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <UseComputedStateSection />
        <ZustandComputedStateSection />
        <SonnerDemo />
        <LayoutDemo />
      </div>
    </div>
  )
}

function LayoutDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>布局组件示例</CardTitle>
        <CardDescription>
          展示 Box、Flex、Grid 等布局原语的使用，配合 Tailwind Utility
          实现语义化布局
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        {/* Box Section */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Box</h3>
          <p className="text-muted-foreground text-sm">
            最基础的容器，支持 Padding、Margin、宽高及 Display 设置。
          </p>
          <div className="flex flex-wrap gap-4">
            <Box p="4" className="bg-primary/10 border-primary/20 rounded-lg border border-dashed">
              Box p="4"
            </Box>
            <Box px="8" py="2" className="bg-primary/10 border-primary/20 rounded-lg border border-dashed">
              Box px="8" py="2"
            </Box>
            <Box width="32" height="12" className="bg-primary/10 border-primary/20 rounded-lg border border-dashed flex items-center justify-center">
              Fixed Size
            </Box>
          </div>
        </section>

        <Separator />

        {/* Flex Section */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Flex</h3>
          <p className="text-muted-foreground text-sm">
            Flexbox 容器，支持方向、对齐、间距等属性。
          </p>
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground italic">
                Default (Row + Gap 4 + Align Center)
              </p>
              <Flex gap="4" align="center" className="bg-muted/30 p-4 rounded-lg border border-dashed">
                <Box className="size-10 bg-blue-500/20 border border-blue-500/30 rounded" />
                <Box className="size-14 bg-blue-500/20 border border-blue-500/30 rounded" />
                <Box className="size-8 bg-blue-500/20 border border-blue-500/30 rounded" />
              </Flex>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground italic">
                Column + Justify Between + Height 40
              </p>
              <Flex direction="column" justify="between" height="40" className="bg-muted/30 p-4 rounded-lg border border-dashed">
                <Box className="h-8 bg-green-500/20 border border-green-500/30 rounded px-2 flex items-center">Top</Box>
                <Box className="h-8 bg-green-500/20 border border-green-500/30 rounded px-2 flex items-center">Bottom</Box>
              </Flex>
            </div>
          </div>
        </section>

        <Separator />

        {/* Grid Section */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Grid</h3>
          <p className="text-muted-foreground text-sm">
            Grid 容器，支持列数、行数、间距等网格属性。
          </p>
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground italic">
                Columns 3 + Gap 4
              </p>
              <Grid columns="3" gap="4" className="bg-muted/30 p-4 rounded-lg border border-dashed">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box key={i} p="4" className="bg-purple-500/20 border border-purple-500/30 rounded text-center font-mono">
                    {i}
                  </Box>
                ))}
              </Grid>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground italic">
                Columns 2 + Flow Col
              </p>
              <Grid columns="2" flow="col" gap="2" className="bg-muted/30 p-4 rounded-lg border border-dashed">
                <Box className="bg-orange-500/20 border border-orange-500/30 rounded p-2">Item 1 (Flow Col)</Box>
                <Box className="bg-orange-500/20 border border-orange-500/30 rounded p-2">Item 2</Box>
                <Box className="bg-orange-500/20 border border-orange-500/30 rounded p-2">Item 3</Box>
                <Box className="bg-orange-500/20 border border-orange-500/30 rounded p-2">Item 4</Box>
              </Grid>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
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
      <CardHeader>
        <CardTitle>useComputedState 示例</CardTitle>
        <CardDescription>
          自定义 Hook
          实现派生状态管理，维护原始值与格式化显示值，支持函数式更新与自动计算
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">真实值（数字）：</p>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              type="number"
              value={realValue}
              onChange={(e) => setRealValue(Number(e.target.value || 0))}
              className="w-32"
            />
            <Button onClick={() => setRealValue((prev) => prev + 1)}>+1</Button>
            <Button
              variant="secondary"
              onClick={() => setRealValue((prev) => Math.max(0, prev - 1))}
            >
              -1
            </Button>
            <Button variant="outline" onClick={() => setRealValue(0)}>
              重置
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col gap-2 p-4">
              <p className="text-muted-foreground text-sm">
                派生显示值（格式化为人民币）：
              </p>
              <p className="text-xl font-medium">{displayValue}</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="flex flex-col gap-2 p-4">
              <p className="text-muted-foreground text-sm">
                额外派生（平方，仅示例）：
              </p>
              <p className="text-xl font-medium">{squared}</p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">快速操作：</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setRealValue(66)}>设为 66</Button>
            <Button onClick={() => setRealValue(1000)}>设为 1000</Button>
            <Button onClick={() => setRealValue((prev) => prev * 10)}>
              ×10
            </Button>
          </div>
        </div>
      </CardContent>
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
      <CardHeader>
        <CardTitle>Zustand 状态管理示例</CardTitle>
        <CardDescription>
          展示 Zustand Store 的最佳实践：使用 Selector 实现派生状态计算，配合
          useShallow 优化重渲染性能
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">姓氏：</p>
            <Input
              value={firstName}
              onChange={(e) => updateFirstName(e.target.value)}
              placeholder="请输入姓氏"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">名字：</p>
            <Input
              value={lastName}
              onChange={(e) => updateLastName(e.target.value)}
              placeholder="请输入名字"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">年龄：</p>
            <Input
              type="number"
              value={age}
              onChange={(e) => updateAge(Number(e.target.value))}
              placeholder="请输入年龄"
            />
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col gap-2 p-4">
              <p className="text-muted-foreground text-sm">全名：</p>
              <p className="text-lg font-medium">{fullName || '(未填写)'}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col gap-2 p-4">
              <p className="text-muted-foreground text-sm">首字母：</p>
              <p className="text-lg font-medium">{initials || '-'}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col gap-2 p-4">
              <p className="text-muted-foreground text-sm">状态：</p>
              <div>
                <Badge variant={isAdult ? 'default' : 'secondary'}>
                  {isAdult ? '成年' : '未成年'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">快速填充示例：</p>
          <div className="flex flex-wrap gap-3">
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SonnerDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sonner Toast 示例</CardTitle>
        <CardDescription>Sonner Toast 弹窗示例</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-3">
        <Button
          onClick={() => {
            toast('This is a toast')
          }}
        >
          toast
        </Button>
        <Button
          onClick={() => {
            toast.warning('This is a toast')
          }}
        >
          warning
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            toast.success('This is a success toast')
          }}
        >
          success
        </Button>
        <Button
          variant="destructive"
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
      </CardContent>
    </Card>
  )
}
