import { FunctionComponent, memo, useMemo } from 'react'

import { tags } from '@rayriffy-h/tags'

import Link from 'next/link'
import { useRouter } from 'next/router'

import capitalize from 'lodash.capitalize'
import kebabCase from 'lodash.kebabcase'

import { IMenu, menus } from '../../constants/menu'

const MobileMenuLink: FunctionComponent<IMenu> = props => {
  const { name, link } = props

  const router = useRouter()
  const isMatch = useMemo(() => props.match.includes(router.pathname), [router])

  return (
    <Link href={link}>
      <a
        className={`group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md focus:outline-none transition ease-in-out duration-150 ${
          isMatch
            ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200 hover:text-gray-900'
            : 'text-gray-600 hover:bg-gray-50 focus:bg-gray-50 hover:text-gray-90'
        }`}
      >
        <props.icon
          className={`mr-3 h-6 w-6 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 ${
            isMatch ? 'text-gray-500' : 'text-gray-400'
          }`}
        />
        {name}
      </a>
    </Link>
  )
}

export const MobileNavbar = memo(() => {
  return (
    <nav className="px-2">
      <div className="space-y-1">
        {menus.map((menu, i) => (
          <MobileMenuLink
            key={`navbar-mobile-link-${menu.name}-${i}`}
            {...menu}
          />
        ))}
      </div>
      <div className="mt-8">
        <h3
          className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
          id="teams-headline"
        >
          Tags
        </h3>
        <div
          className="mt-1 space-y-1"
          role="group"
          aria-labelledby="teams-headline"
        >
          {tags.map(tag => (
            <Link
              href={`/tags/${kebabCase(tag.name)}`}
              key={`navbar-mobile-tag-${tag.prefix}`}
            >
            <a
              className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
            >
              <span
                className={`w-2.5 h-2.5 mr-4 rounded-full ${tag.color}`}
              ></span>
              <span className="truncate">{capitalize(tag.name)}</span>
            </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
})
