import React, { useState } from 'react'

import { tags as tagStack } from '../../contents/database/tags'

import { Switch } from '../../core/components/switch'
import { TransparentLink } from '../../core/components/transparentLink'

import { useStoreon } from '../../store'

interface Props {
  collapse: boolean
  subtitle: string
}

const Dropdown: React.FC<{ title: React.ReactNode, zIndex?: number }> = props => {
  const { title, zIndex = 40, children } = props

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='relative'>
      <button onClick={() => setOpen(o => !o)} className='flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'>
        <span>{title}</span>
        <i className={`ml-2 fas fa-angle-${open ? 'up' : 'down'}`}></i>
      </button>
      <div className={`absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg transition-all duration-200 ${open ? `opacity-100 z-${zIndex}` : 'opacity-0 z-hide'}`}>
        <div className={`px-2 py-2 bg-white rounded-md shadow-2xl bg-gray-100 dark:bg-gray-700 ${open ? 'block' : 'hidden'}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export const Navigation: React.FC<Props> = props => {
  const { collapse, subtitle } = props

  const { dispatch, settings } = useStoreon('settings')

  const toggleSetting = (key: 'safemode') => {
    dispatch('setting/toggle', key)
  }

  const menuStacks = [
    {
      name: 'home',
      prefix: '',
      icon: <i className='fas fa-home pr-1'></i>,
    },
    {
      name: 'listing',
      prefix: 'listing',
      icon: <i className='fas fa-boxes pr-1'></i>,
    },
    {
      name: 'custom',
      prefix: 'custom',
      icon: <i className='fas fa-keyboard pr-1'></i>,
    },
    {
      name: 'search',
      prefix: 'search',
      icon: <i className='fas fa-search pr-1'></i>,
    },
    {
      name: 'collection',
      prefix: 'collection',
      icon: <i className='fas fa-bookmark pr-1'></i>,
    },
    {
      name: 'history',
      prefix: 'history',
      icon: <i className='fas fa-history pr-1'></i>,
    },
    // {
    //   name: 'about',
    //   prefix: 'about',
    //   icon: <i className='fas fa-info-circle pr-1'></i>,
    // },
  ]

  const tagStacks = tagStack.map(o => ({
    name: o.name,
    prefix: o.prefix,
  }))

  return (
    <div className='relative'>
      <nav className={`absolute top-0 left-0 right-0 flex-grow md:block px-4 pt-2 pb-3 bg-white dark:bg-gray-800 md:dark:bg-transparent transition-all duration-200 md:opacity-100 ${collapse ? 'opacity-100 z-20' : 'opacity-0 z-hide md:z-0'}`}>
        {menuStacks.map(menu => (
          <TransparentLink key={`app-navigation-${menu.name}`} to={`/${menu.prefix}`}>
            <div
              className={`${subtitle === menu.name ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'} capitalize block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
            >
              {menu.icon} {menu.name}
            </div>
          </TransparentLink>
        ))}
        <Dropdown
          title={(
            <React.Fragment>
              <i className='fas fa-tags pr-1'></i> Tag types
            </React.Fragment>
          )}
          zIndex={50}
        >
          {tagStacks.map(tag => (
            <TransparentLink key={`app-navigation-tag-${tag.name}`} to={`/${tag.prefix}`}>
              <div
                className={`${subtitle.startsWith(`${tag.name}/`) ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'} capitalize block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
              >
                {tag.name}
              </div>
            </TransparentLink>
          ))}
        </Dropdown>
        <Dropdown
          title={(
            <React.Fragment>
              <i className='fas fa-tools pr-1'></i> Settings
            </React.Fragment>
          )}
        >
          <div className='flex items-center px-4 py-2'>
            <Switch checked={settings.safemode} onChange={() => toggleSetting('safemode')} className='pr-2' />
            <div className='text-sm font-semibold'>
              Safe mode
            </div>
          </div>
        </Dropdown>
      </nav>
    </div>
  )
}
