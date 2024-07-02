'use client'

import { useRef } from 'react'
import { QRCode } from 'react-qrcode-logo'

import { RouterIcon, UserIcon } from 'lucide-react'

import FileUpload from '@/components/FileUpload/FileUpload'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import { AnimatedBeam } from '@/components/magicui/animated-beam'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <header className="h-16 flex items-center justify-between px-10">
        <img src="/favicon.ico" alt="logo" className="h-6" />

        <ThemeToggleButton />
      </header>

      <main>
        <div className="container mt-20 space-y-20">
          <section className="space-y-8">
            <div>
              <h1 className="font-bold text-2xl">Connect by</h1>
              <p className="text-muted-foreground mb-8">
                Choose the method you want to connect with who you want to share with
              </p>
            </div>

            <div ref={containerRef} className="relative flex max-w-lg justify-between">
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div2Ref}
                duration={5}
              />
              <AnimatedBeam
                containerRef={containerRef}
                delay={1}
                fromRef={div2Ref}
                toRef={div3Ref}
                duration={5}
              />

              <div
                ref={div1Ref}
                className="z-10 h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center"
              >
                <UserIcon className="size-4 text-black" />
              </div>

              <div
                ref={div2Ref}
                className="z-10 h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center"
              >
                <RouterIcon className="size-4 text-black" />
              </div>

              <div
                ref={div3Ref}
                className="z-10 h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center"
              >
                <UserIcon className="size-4 text-black" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <QRCode
                value="http://localhost:3001?code=182759348759359"
                qrStyle="dots"
                logoImage="/favicon.ico"
                logoPadding={2}
                logoPaddingStyle="circle"
              />

              {/* <span className="text-muted-foreground font-bold">or</span>

              <CopyButton size="lg" value="http://localhost:3001?code=182759348759359">
                Copy Link
              </CopyButton> */}
            </div>
          </section>

          <section className="space-y-8">
            <div>
              <h1 className="font-bold text-2xl">Assets by</h1>
              <p className="text-muted-foreground mb-8">
                Choose the method you want to connect with who you want to share with
              </p>
            </div>

            <FileUpload className="max-w-lg" allowMultiple />
          </section>
        </div>
      </main>
    </>
  )
}
