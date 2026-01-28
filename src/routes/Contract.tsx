import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { formatUnits, parseUnits, type Address } from 'viem'
import {
  useChainId,
  useConnection,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import USDTAbi from '~/constants/USDT.abi'
import { usdtAddress } from '~/constants/app'

export default function Page() {
  const { address, isConnected } = useConnection()
  const chainId = useChainId()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const contractAddress = usdtAddress[chainId as keyof typeof usdtAddress]

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: USDTAbi,
        functionName: 'name',
      },
      {
        address: contractAddress,
        abi: USDTAbi,
        functionName: 'symbol',
      },
      {
        address: contractAddress,
        abi: USDTAbi,
        functionName: 'decimals',
      },
      {
        address: contractAddress,
        abi: USDTAbi,
        functionName: 'totalSupply',
      },
      {
        address: contractAddress,
        abi: USDTAbi,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
      },
    ],
  })

  const tokenName = data?.[0]?.result
  const tokenSymbol = data?.[1]?.result
  const decimals = data?.[2]?.result
  const totalSupply = data?.[3]?.result
  const balance = data?.[4]?.result
  const refetchBalance = refetch

  const {
    mutate,
    data: hash,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleTransfer = () => {
    if (!recipient || !amount || !decimals) return

    try {
      const parsedAmount = parseUnits(amount, Number(decimals))
      mutate({
        address: contractAddress,
        abi: USDTAbi,
        functionName: 'transfer',
        args: [recipient as Address, parsedAmount],
      })
      toast('已提交')
    } catch (error) {
      console.error('Transfer error:', error)
      toast.error('转账失败', {
        description: error instanceof Error ? error.message : '未知错误',
      })
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      refetchBalance()
      toast.success('转账成功!', {
        description: hash
          ? `交易哈希: ${hash.slice(0, 10)}...${hash.slice(-8)}`
          : undefined,
      })
      setRecipient('')
      setAmount('')
    }
  }, [isConfirmed, hash, refetchBalance])

  useEffect(() => {
    if (writeError) {
      toast.error('转账失败', {
        description: writeError.message,
      })
    }
  }, [writeError])

  if (!isConnected) {
    return (
      <div className="py-8 px-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>合约交互示例</CardTitle>
            <CardDescription>
              基于 Wagmi + viem 实现类型安全的 EVM 合约交互，展示 USDT
              代币的读取与转账功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mt-3">请先连接钱包</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!contractAddress) {
    return (
      <div className="py-8 px-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>合约交互示例</CardTitle>
            <CardDescription>
              基于 Wagmi + viem 实现类型安全的 EVM 合约交互，展示 USDT
              代币的读取与转账功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              当前链不支持，请切换到主网或 Sepolia 测试网
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formattedBalance =
    balance && decimals ? formatUnits(balance as bigint, Number(decimals)) : '0'

  const formattedTotalSupply =
    totalSupply && decimals
      ? formatUnits(totalSupply as bigint, Number(decimals))
      : '0'

  return (
    <div className="py-8 px-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>代币信息</CardTitle>
            <CardDescription>
              通过 useReadContracts 批量读取链上数据，优化多次调用性能
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">名称:</span>
              <span className="font-medium">{tokenName || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">符号:</span>
              <span className="font-medium">{tokenSymbol || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">精度:</span>
              <span className="font-medium">{decimals?.toString() || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">总供应量:</span>
              <span className="font-medium">
                {formattedTotalSupply} {tokenSymbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">合约地址:</span>
              <code className="text-xs bg-muted p-1 rounded">
                {contractAddress}
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>账户余额</CardTitle>
            <CardDescription>
              使用 useConnection 获取连接状态与地址，实时查询余额
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{formattedBalance}</span>
              <span className="text-lg text-muted-foreground">
                {tokenSymbol}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              地址: {address}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>代币转账</CardTitle>
            <CardDescription>
              使用 useWriteContract + useWaitForTransactionReceipt
              实现交易提交与确认追踪
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">接收地址</label>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">转账金额</label>
              <Input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button
              onClick={handleTransfer}
              disabled={!recipient || !amount || isWritePending || isConfirming}
            >
              {isWritePending
                ? '等待钱包确认...'
                : isConfirming
                  ? '交易确认中...'
                  : '转账'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
