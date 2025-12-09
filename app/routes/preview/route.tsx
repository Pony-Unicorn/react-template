import { useMemo } from 'react'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'

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
    <div className="mx-auto w-full max-w-3xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">预览页面</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          该页面汇集各类示例组件与用法，后续会持续补充更多示例分节。
        </p>
      </header>

      <main className="space-y-8">
        <UseComputedStateSection />
        <ZustandComputedStateSection />
        {/* 后续在此继续追加更多 Section 组件 */}
      </main>
    </div>
  )
}

function UseComputedStateSection() {
  const { realValue, setRealValue, displayValue } = useComputedState<
    number,
    string
  >(1000, (v) =>
    v.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
  )

  const squared = useMemo(() => realValue * realValue, [realValue])

  return (
    <section id="use-computed-state" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle>useComputedState（派生状态）</CardTitle>
          <CardDescription>
            维护真实值与显示值，支持函数式更新与自定义派生计算。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">真实值（数字）：</p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring w-40 rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                  type="number"
                  value={realValue}
                  onChange={(e) => setRealValue(Number(e.target.value || 0))}
                  aria-label="真实值"
                />
                <Button onClick={() => setRealValue((prev) => prev + 1)}>
                  +1
                </Button>
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
              <div className="rounded-md border p-4">
                <p className="text-muted-foreground text-sm">
                  派生显示值（格式化为人民币）：
                </p>
                <p className="mt-1 text-lg leading-7 font-medium">
                  {displayValue}
                </p>
              </div>

              <div className="rounded-md border p-4">
                <p className="text-muted-foreground text-sm">
                  额外派生（平方，仅示例）：
                </p>
                <p className="mt-1 text-lg leading-7 font-medium">{squared}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">快速操作：</p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setRealValue(66)}>设为 66</Button>
                <Button onClick={() => setRealValue(1000)}>设为 1000</Button>
                <Button onClick={() => setRealValue((prev) => prev * 10)}>
                  ×10
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
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
    <section id="zustand-computed-state" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Zustand 计算状态</CardTitle>
          <CardDescription>
            使用 Zustand Store + Selector 实现派生状态，自动优化重渲染。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-3">
              <div>
                <label className="text-muted-foreground text-sm">姓氏：</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => updateFirstName(e.target.value)}
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                  placeholder="请输入姓氏"
                />
              </div>
              <div>
                <label className="text-muted-foreground text-sm">名字：</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => updateLastName(e.target.value)}
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                  placeholder="请输入名字"
                />
              </div>
              <div>
                <label className="text-muted-foreground text-sm">年龄：</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => updateAge(Number(e.target.value))}
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                  placeholder="请输入年龄"
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-md border p-4">
                <p className="text-muted-foreground text-sm">全名：</p>
                <p className="mt-1 font-medium">{fullName || '(未填写)'}</p>
              </div>
              <div className="rounded-md border p-4">
                <p className="text-muted-foreground text-sm">首字母：</p>
                <p className="mt-1 font-medium">{initials || '-'}</p>
              </div>
              <div className="rounded-md border p-4">
                <p className="text-muted-foreground text-sm">状态：</p>
                <p
                  className={`mt-1 font-medium ${
                    isAdult ? 'text-green-600' : 'text-orange-600'
                  }`}
                >
                  {isAdult ? '成年 ✓' : '未成年'}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">快速填充示例：</p>
              <div className="flex flex-wrap gap-2">
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
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
