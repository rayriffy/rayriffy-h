import {
  Home,
  Archive,
  Bookmark,
  Clock,
  Cog,
  CursorClick,
} from '@rayriffy-h/icons'

export interface IMenu {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  link: string
  name: string
  match: string[]
}

export const menus: IMenu[] = [
  {
    icon: Home,
    link: '/',
    name: 'Home',
    match: ['/'],
  },
  {
    icon: Archive,
    link: '/listing',
    name: 'Listing',
    match: ['/listing/[[...page]]'],
  },
  {
    icon: CursorClick,
    link: '/custom',
    name: 'Custom',
    match: ['/custom'],
  },
  {
    icon: Bookmark,
    link: '/collection',
    name: 'Collection',
    match: ['/collection', '/collection/import', '/collection/export'],
  },
  {
    icon: Clock,
    link: '/history',
    name: 'History',
    match: ['/history'],
  },
  {
    icon: Cog,
    link: '/settings',
    name: 'Settings',
    match: ['/settings'],
  },
]
