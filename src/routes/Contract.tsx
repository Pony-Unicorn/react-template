import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes'
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
      <Box p="6" maxWidth="800px" mx="auto">
        <Card>
          <Heading size="4" mb="2">
            合约交互示例
          </Heading>
          <Text size="2" color="gray">
            基于 Wagmi + viem 实现类型安全的 EVM 合约交互，展示 USDT
            代币的读取与转账功能
          </Text>
          <Text color="orange" mt="3">
            请先连接钱包
          </Text>
        </Card>
      </Box>
    )
  }

  if (!contractAddress) {
    return (
      <Box p="6" maxWidth="800px" mx="auto">
        <Card>
          <Heading size="4" mb="2">
            合约交互示例
          </Heading>
          <Text size="2" color="gray" mb="3">
            基于 Wagmi + viem 实现类型安全的 EVM 合约交互，展示 USDT
            代币的读取与转账功能
          </Text>
          <Text color="orange">
            当前链不支持，请切换到主网或 Sepolia 测试网
          </Text>
        </Card>
      </Box>
    )
  }

  const formattedBalance =
    balance && decimals ? formatUnits(balance as bigint, Number(decimals)) : '0'

  const formattedTotalSupply =
    totalSupply && decimals
      ? formatUnits(totalSupply as bigint, Number(decimals))
      : '0'

  return (
    <Box p="6" maxWidth="800px" mx="auto">
      <Flex direction="column" gap="4">
        <Card>
          <Heading size="4" mb="2">
            代币信息
          </Heading>
          <Text size="2" color="gray" mb="4">
            通过 useReadContracts 批量读取链上数据，优化多次调用性能
          </Text>
          <Flex direction="column" gap="2">
            <Flex justify="between">
              <Text color="gray">名称:</Text>
              <Text weight="medium">{tokenName || '-'}</Text>
            </Flex>
            <Flex justify="between">
              <Text color="gray">符号:</Text>
              <Text weight="medium">{tokenSymbol || '-'}</Text>
            </Flex>
            <Flex justify="between">
              <Text color="gray">精度:</Text>
              <Text weight="medium">{decimals?.toString() || '-'}</Text>
            </Flex>
            <Flex justify="between">
              <Text color="gray">总供应量:</Text>
              <Text weight="medium">
                {formattedTotalSupply} {tokenSymbol}
              </Text>
            </Flex>
            <Flex justify="between">
              <Text color="gray">合约地址:</Text>
              <Code size="1">{contractAddress}</Code>
            </Flex>
          </Flex>
        </Card>

        <Card>
          <Heading size="4" mb="2">
            账户余额
          </Heading>
          <Text size="2" color="gray" mb="4">
            使用 useConnection 获取连接状态与地址，实时查询余额
          </Text>
          <Flex align="baseline" gap="2">
            <Text size="8" weight="bold">
              {formattedBalance}
            </Text>
            <Text size="4" color="gray">
              {tokenSymbol}
            </Text>
          </Flex>
          <Text size="1" color="gray" mt="2">
            地址: {address}
          </Text>
        </Card>

        <Card>
          <Heading size="4" mb="2">
            代币转账
          </Heading>
          <Text size="2" color="gray" mb="4">
            使用 useWriteContract + useWaitForTransactionReceipt
            实现交易提交与确认追踪
          </Text>
          <Flex direction="column" gap="4">
            <Box>
              <Text as="label" size="2" weight="medium" mb="1">
                接收地址
              </Text>
              <TextField.Root
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </Box>

            <Box>
              <Text as="label" size="2" weight="medium" mb="1">
                转账金额
              </Text>
              <TextField.Root
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Box>

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
          </Flex>
        </Card>
      </Flex>
    </Box>
  )
}
