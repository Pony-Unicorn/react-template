import { RiHomeLine } from '@remixicon/react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import FuzzyText from '~/components/react-bits/FuzzyText'
import { Button } from '~/components/ui/button'

interface NotFoundProps {
  message: string
  details: string
  stack?: string
}

export default function NotFound({ message, details, stack }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="mb-2">
            <FuzzyText baseIntensity={0.3} color="#ee9a00ff">
              {message}
            </FuzzyText>
          </div>

          <p className="text-lg text-muted-foreground text-center">{details}</p>

          {stack && (
            <div className="p-4 w-full overflow-auto">
              <code className="text-xs font-mono bg-muted p-1 rounded">
                {stack}
              </code>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button size="lg" render={<Link to="/" />}>
          <RiHomeLine className="mr-2 h-4 w-4" />
          Go Home
        </Button>
      </motion.div>
    </div>
  )
}
