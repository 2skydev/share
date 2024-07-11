import { CornerDownLeftIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'

import AsyncButton from '@/components/AsyncButton'
import { globalAlertDialogStore } from '@/components/GlobalAlertDialog/global-alert-dialog.store'
import Kbd from '@/components/Kbd'
import KeyboardAccessibility from '@/components/KeyboardAccessibility'

import useResponsive from '@/hooks/useResponsive'
import { useStore } from '@/hooks/useStore'

export const alertDialog = globalAlertDialogStore.create

export const GlobalAlertDialog = () => {
  const { items, close, remove } = useStore(globalAlertDialogStore)

  const handleClickButton =
    (id: string | number, callback?: () => void | Promise<void>) => async () => {
      await callback?.()

      close(id)

      // 애니메이션 효과를 위해 잠시 뒤 삭제
      setTimeout(() => {
        remove(id)
      }, 200)
    }

  const { isDesktop } = useResponsive()

  return (
    <>
      {items.map(item => {
        const handleCancel = handleClickButton(item.id, item.onCancel)
        const handleConfirm = handleClickButton(item.id, item.onConfirm)

        const actions = [
          <AsyncButton
            key="cancel"
            variant={item.reverseActions ? 'default' : 'outline'}
            onClick={handleCancel}
            shouldLoadingIconShow
            {...item.cancelButtonProps}
          >
            {item.cancelButtonProps?.children ?? item.cancelText ?? '취소'}
            {item.keyboardAccessible && <Kbd keys={['Esc']} className="ml-2" />}
          </AsyncButton>,

          <AsyncButton
            key="confirm"
            variant={item.reverseActions ? 'outline' : 'default'}
            onClick={handleConfirm}
            shouldLoadingIconShow
            {...item.confirmButtonProps}
          >
            {item.confirmButtonProps?.children ?? item.confirmText ?? '확인'}
            {item.keyboardAccessible && (
              <Kbd
                keys={[<CornerDownLeftIcon key="enter" className="size-3" />]}
                className="ml-2 bg-muted-foreground brightness-125"
              />
            )}
          </AsyncButton>,
        ]

        console.log('isDesktop', isDesktop)

        return isDesktop ? (
          <AlertDialog open={item._open} key={item.id}>
            {item.keyboardAccessible && (
              <KeyboardAccessibility
                onEsc={handleCancel}
                onEnter={handleConfirm}
                preventDefault={item.keydownPreventDefault ?? true}
              />
            )}
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{item.title}</AlertDialogTitle>

                {item.description && (
                  <AlertDialogDescription asChild>
                    <ScrollArea className="max-h-[60vh]">
                      {typeof item.description === 'string' ? (
                        item.description.split('\n').map((text, i) => <p key={i}>{text}</p>)
                      ) : (
                        <div>{item.description}</div>
                      )}
                    </ScrollArea>
                  </AlertDialogDescription>
                )}
              </AlertDialogHeader>

              <AlertDialogFooter>
                {item.reverseActions ? actions.reverse() : actions}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Drawer open={item._open} onOpenChange={value => !value && handleCancel()} key={item.id}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{item.title}</DrawerTitle>

                {item.description && (
                  <DrawerDescription asChild>
                    <ScrollArea className="max-h-[80vh]">
                      {typeof item.description === 'string' ? (
                        item.description.split('\n').map((text, i) => <p key={i}>{text}</p>)
                      ) : (
                        <div>{item.description}</div>
                      )}
                    </ScrollArea>
                  </DrawerDescription>
                )}
              </DrawerHeader>

              <DrawerFooter className="flex-row [&>button]:flex-1">
                {item.reverseActions ? actions.reverse() : actions}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )
      })}
    </>
  )
}
