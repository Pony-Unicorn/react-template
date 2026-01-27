import { Badge } from '~/components/ui/badge'

export function ScreenSize() {
  return (
    <div className="absolute bottom-2 left-1">
      <div className="block sm:hidden">
        <Badge variant="secondary" className="text-xs">
          xs
        </Badge>
      </div>
      <div className="hidden sm:block md:hidden">
        <Badge variant="secondary" className="text-xs">
          sm
        </Badge>
      </div>
      <div className="hidden md:block lg:hidden">
        <Badge variant="secondary" className="text-xs">
          md
        </Badge>
      </div>
      <div className="hidden lg:block xl:hidden">
        <Badge variant="secondary" className="text-xs">
          lg
        </Badge>
      </div>
      <div className="hidden xl:block 2xl:hidden">
        <Badge variant="secondary" className="text-xs">
          xl
        </Badge>
      </div>
      <div className="hidden 2xl:block">
        <Badge variant="secondary" className="text-xs">
          2xl
        </Badge>
      </div>
    </div>
  )
}
