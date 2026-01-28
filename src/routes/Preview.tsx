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
import { useComputedState } from '~/hooks/useComputedState'
import {
  selectFullName,
  selectInitials,
  selectIsAdult,
  usePersonStore,
} from '~/store/person'

export default function Preview() {
  return (
    <div className="py-8 px-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-3">组件预览</h1>
        <p className="text-sm text-muted-foreground">
          展示项目中的状态管理方案与 UI 组件使用示例，包括 Zustand Store、自定义
          Hooks 以及 Radix UI Themes 与 Sonner 集成
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <UseComputedStateSection />
        <ZustandComputedStateSection />
        <SonnerDemo />
      </div>
    </div>
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
          <p className="text-sm text-muted-foreground">真实值（数字）：</p>
          <div className="flex gap-3 items-center flex-wrap">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                派生显示值（格式化为人民币）：
              </p>
              <p className="text-xl font-medium">{displayValue}</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-4 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                额外派生（平方，仅示例）：
              </p>
              <p className="text-xl font-medium">{squared}</p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">快速操作：</p>
          <div className="flex gap-3 flex-wrap">
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
            <p className="text-sm text-muted-foreground">姓氏：</p>
            <Input
              value={firstName}
              onChange={(e) => updateFirstName(e.target.value)}
              placeholder="请输入姓氏"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">名字：</p>
            <Input
              value={lastName}
              onChange={(e) => updateLastName(e.target.value)}
              placeholder="请输入名字"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">年龄：</p>
            <Input
              type="number"
              value={age}
              onChange={(e) => updateAge(Number(e.target.value))}
              placeholder="请输入年龄"
            />
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">全名：</p>
              <p className="text-lg font-medium">{fullName || '(未填写)'}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">首字母：</p>
              <p className="text-lg font-medium">{initials || '-'}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">状态：</p>
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
          <p className="text-sm text-muted-foreground">快速填充示例：</p>
          <div className="flex gap-3 flex-wrap">
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

      <CardContent className="flex gap-3 flex-wrap">
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
