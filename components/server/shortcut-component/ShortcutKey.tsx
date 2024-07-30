import { isMacOs } from 'react-device-detect'

export default function ShortcutKey() {
  if (isMacOs) {
    return (
      <kbd className='data-[disabled=true]:pointer-events-none inline-flex h-5 select-none items-center gap-1 rounder border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto'>
        <span className='text-xs'>⌘</span>K
      </kbd>
    )
  } else {
    return (
      <kbd className='data-[disabled=true]:pointer-events-none inline-flex h-5 select-none items-center gap-1 rounder border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto'>
        <span className='text-xs'>CTRL</span>K
      </kbd>
    )
  }
}
