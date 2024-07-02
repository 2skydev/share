'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import useConnection from '@/features/connect/hooks/useConnection'

export interface ShareTextProps {}

const ShareText = ({}: ShareTextProps) => {
  const { connection } = useConnection()
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    console.log(value)

    connection?.send({
      action: 'share',
      payload: {
        type: 'text',
        value,
      },
    })

    setValue('')
  }

  return (
    <div>
      <Textarea value={value} onChange={e => setValue(e.target.value)} />

      <Button className="mt-4" onClick={handleSubmit}>
        전송 및 지우기
      </Button>
    </div>
  )
}

export default ShareText
