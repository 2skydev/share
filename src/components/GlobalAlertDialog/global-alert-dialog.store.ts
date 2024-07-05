import { Exome } from 'exome'
import { SetRequired } from 'type-fest'

import { AsyncButtonProps } from '@/components/AsyncButton'

export interface GlobalAlertDialogOptions {
  id?: number | string
  _open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  reverseActions?: boolean
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  cancelText?: React.ReactNode
  confirmText?: React.ReactNode
  cancelButtonProps?: AsyncButtonProps
  confirmButtonProps?: AsyncButtonProps
  keyboardAccessible?: boolean
  keydownPreventDefault?: boolean
}

export interface GlobalAlertDialogItem
  extends SetRequired<GlobalAlertDialogOptions, 'id' | '_open'> {}

export class GlobalAlertDialogStore extends Exome {
  count: number = 0
  items: GlobalAlertDialogItem[] = []

  create(options: GlobalAlertDialogOptions) {
    this.items.push({
      id: options.id ?? this.count++,
      _open: true,
      ...options,
    })
  }

  close(id: number | string) {
    this.items = this.items.map(item => {
      if (item.id !== id) return item

      return {
        ...item,
        _open: false,
      }
    })
  }

  remove(id: number | string) {
    this.items = this.items.filter(item => item.id !== id)
  }
}

export const globalAlertDialogStore = new GlobalAlertDialogStore()
