'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import useShare from '@/features/share/hooks/useShare'

export interface ShareTextProps {}

const ShareText = ({}: ShareTextProps) => {
  const [value, setValue] = useState('')

  const { shareText } = useShare()

  const handleSubmit = () => {
    shareText(value)
    setValue('')
  }

  return (
    <div>
      <Textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onPaste={e => e.stopPropagation()}
      />

      <Button size="sm" className="mt-4" onClick={handleSubmit}>
        전송 및 지우기
      </Button>
    </div>
  )
}

export default ShareText
