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
      <div className="container mx-auto max-w-4xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>USDT 合约交互</CardTitle>
            <CardDescription>请先连接钱包</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!contractAddress) {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>USDT 合约交互</CardTitle>
            <CardDescription>
              当前链不支持，请切换到主网或 Sepolia 测试网
            </CardDescription>
          </CardHeader>
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
    <div className="container mx-auto max-w-4xl space-y-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Token 信息</CardTitle>
          <CardDescription>USDT 合约的基本信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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
            <span className="font-mono text-sm">{contractAddress}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>我的余额</CardTitle>
          <CardDescription>当前账户的 USDT 余额</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formattedBalance}</span>
            <span className="text-muted-foreground text-lg">{tokenSymbol}</span>
          </div>
          <div className="text-muted-foreground mt-2 text-sm">
            地址: {address}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>转账</CardTitle>
          <CardDescription>向其他地址转账 USDT</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="recipient"
              className="text-sm leading-none font-medium"
            >
              接收地址
            </label>
            <input
              id="recipient"
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm leading-none font-medium"
            >
              转账金额
            </label>
            <input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button
            onClick={handleTransfer}
            disabled={!recipient || !amount || isWritePending || isConfirming}
            className="w-full"
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
  )
}
