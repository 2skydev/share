'use client'

import { ReactNode } from 'react'

import ThemeToggleButton from '@/components/ThemeToggleButton'

export interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <header className="h-16 flex items-center justify-between px-8 sm:px-10">
        <img src="/favicon.ico" alt="logo" className="h-6" />

        <ThemeToggleButton />
      </header>

      <main>{children}</main>
    </>
  )
}

export default AppLayout
