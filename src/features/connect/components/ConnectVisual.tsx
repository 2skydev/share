'use client'

import { useRef } from 'react'

import { UserIcon, WaypointsIcon } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { AnimatedBeam } from '@/components/magicui/animated-beam'

import ConnectVisualCircle from '@/features/connect/components/ConnectVisualCircle'

export interface ConnectVisualProps {}

const ConnectVisual = ({}: ConnectVisualProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative flex max-w-lg justify-between">
      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div2Ref} duration={5} />
      <AnimatedBeam
        containerRef={containerRef}
        delay={1}
        fromRef={div2Ref}
        toRef={div3Ref}
        duration={5}
      />

      <ConnectVisualCircle ref={div1Ref}>
        <UserIcon className="size-4 text-black" />
      </ConnectVisualCircle>

      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <ConnectVisualCircle ref={div2Ref} className="relative">
            <WaypointsIcon className="size-4 text-green-500 dark:text-green-400 absolute -right-2.5 -top-2.5" />
          </ConnectVisualCircle>
        </TooltipTrigger>

        <TooltipContent asChild side="bottom" align="start" sideOffset={-4} alignOffset={44}>
          <div className="">
            <div className="flex gap-2 items-center">
              <WaypointsIcon className="size-4 text-green-500 dark:text-green-400" />
              <p>연결하는 과정에서 서버가 중개합니다</p>
            </div>

            <p className="ml-6 text-muted-foreground">
              연결 이후 데이터 전송 시 서버를 거치지 않고 유저 간 직접 연결됩니다 (P2P)
            </p>
          </div>
        </TooltipContent>
      </Tooltip>

      <ConnectVisualCircle ref={div3Ref}>
        <UserIcon className="size-4 text-black" />
      </ConnectVisualCircle>
    </div>
  )
}

export default ConnectVisual
