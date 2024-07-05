'use client'

import { addMiddleware } from 'exome'
import { unstableExomeDevtools } from 'exome/devtools'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import { GlobalAlertDialog } from '@/components/GlobalAlertDialog/GlobalAlertDialog'

export interface ProvidersProps {
  children: React.ReactNode
}

if (process.env.NODE_ENV === 'development') {
  addMiddleware(unstableExomeDevtools({ name: 'hi' }))
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Toaster />
      <GlobalAlertDialog />

      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers
