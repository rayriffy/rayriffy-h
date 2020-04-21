import React, { useContext, useEffect, useRef, useState } from 'react'

import { FaBars as MenuIcon, FaHeart as LoveIcon } from 'react-icons/fa'

import { tags as tagStack } from '../../contents/database/tags'

import { Settings } from '../../store'

interface Props {
  collapse: boolean
  subtitle: string
}

export const Navigation: React.FC<Props> = props => {
  const { collapse, subtitle } = props

  const { 0: settings, 1: setSettings } = useContext(Settings)

  const toggleSetting = (key: 'safemode' | 'lefthand') => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const menuStacks = [
    {
      name: 'home',
      prefix: '',
      icon: <i className="fas fa-home pr-1"></i>,
    },
    {
      name: 'listing',
      prefix: 'listing',
      icon: <i className="fas fa-boxes pr-1"></i>,
    },
    {
      name: 'custom',
      prefix: 'custom',
      icon: <i className="fas fa-keyboard pr-1"></i>,
    },
    {
      name: 'search',
      prefix: 'search',
      icon: <i className="fas fa-search pr-1"></i>,
    },
    {
      name: 'collection',
      prefix: 'collection',
      icon: <i className="fas fa-bookmark pr-1"></i>,
    },
    {
      name: 'about',
      prefix: 'about',
      icon: <i className="fas fa-info-circle pr-1"></i>,
    },
  ]

  const tagStacks = tagStack.map(o => ({
    name: o.name,
    prefix: o.prefix,
  }))

  const [drop, setDrop] = useState(false)

  return (
    <div className="relative">
      <nav className={`absolute top-0 left-0 right-0 flex-grow md:block px-4 pt-2 pb-3 md:pb-350 md:overflow-y-auto dark:bg-gray-800 md:dark:bg-transparent transition-all duration-200 md:opacity-100 ${collapse ? 'opacity-100 z-20' : 'opacity-0 z-hide md:z-0'}`}>
        {menuStacks.map(menu => (
          <div
            key={`app-navigation-${menu.name}`}
            className={`${subtitle === menu.name ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'} capitalize block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
          >
            {menu.icon} {menu.name}
          </div>
        ))}
        <div className="relative">
          <button onClick={() => setDrop(o => !o)} className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <span><i className="fas fa-tags pr-1"></i> Tag types</span>
            <svg fill="currentColor" viewBox="0 0 20 20" className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${drop ? 'rotate-180' : 'rotate-0' }`}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div className={`absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg transition-all duration-200 ${drop ? 'opacity-100 z-50' : 'opacity-0'}`}>
            <div className="px-2 py-2 bg-white rounded-md shadow-2xl dark:bg-gray-800">
              {tagStacks.map(tag => (
                <div
                  key={`app-navigation-tag-${tag.name}`}
                  className="capitalize block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        TEST
      </nav>
    </div>
  )
}
