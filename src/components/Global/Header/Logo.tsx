import {HEADER_MENU, MODULE_STYLE} from '@/lib/constants'

import {useState} from 'react'
import {cn} from '@/lib/utils'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '~/UI/Dropdown'
import {Link} from 'wouter'

export default function Logo() {
  const [isActive, setIsActive] = useState(false)

  return (
    <DropdownMenu onOpenChange={setIsActive}>
      <DropdownMenuTrigger>
        <div className={cn(MODULE_STYLE.box, 'p-2 group')}>
          <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.1] group-hover:bg-white/80 duration-300', isActive && 'scale-[1.1] bg-white/80')}></div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {HEADER_MENU.map(({label, to, href}, index) => (
          <DropdownMenuItem key={index} className="cursor-pointer" asChild>
            {to ? (
              <Link href={to}>{label}</Link>
            ) : (
              <a href={href} target="_blank">
                {label}
              </a>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
