import { FunctionComponent, SVGProps } from 'react'

import {
  HomeIcon,
  ArchiveBoxIcon,
  BookmarkIcon,
  ClockIcon,
  CogIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/24/outline'

export interface IMenu {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
  link: string
  name: string
  match: string[]
}

export const menus: IMenu[] = [
  {
    icon: HomeIcon,
    link: '/',
    name: 'Home',
    match: ['/'],
  },
  {
    icon: ArchiveBoxIcon,
    link: '/listing',
    name: 'Listing',
    match: ['/listing/[[...page]]'],
  },
  {
    icon: CursorArrowRaysIcon,
    link: '/custom',
    name: 'Custom',
    match: ['/custom'],
  },
  {
    icon: BookmarkIcon,
    link: '/collection',
    name: 'Collection',
    match: ['/collection', '/collection/import', '/collection/export'],
  },
  {
    icon: ClockIcon,
    link: '/history',
    name: 'History',
    match: ['/history'],
  },
  {
    icon: CogIcon,
    link: '/settings',
    name: 'Settings',
    match: ['/settings'],
  },
]
