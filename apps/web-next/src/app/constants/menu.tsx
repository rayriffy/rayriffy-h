import {
  HomeIcon,
  ArchiveIcon,
  BookmarkIcon,
  ClockIcon,
  CogIcon,
  CursorClickIcon,
} from '@heroicons/react/outline'

export interface IMenu {
  icon: FunctionComponent<React.SVGProps<SVGSVGElement>>
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
    icon: ArchiveIcon,
    link: '/listing',
    name: 'Listing',
    match: ['/listing/[[...page]]'],
  },
  {
    icon: CursorClickIcon,
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
