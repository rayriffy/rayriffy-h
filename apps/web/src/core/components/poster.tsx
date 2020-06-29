import React from 'react'

import { truncate } from 'lodash-es'

import { BluredImage } from './bluredImage'
import { Slug } from './slug'
import { TransparentLink } from './transparentLink'

import { filterTagByType } from '../services/functions/filterTagByType'
import { filterTagStackByType } from '../services/functions/filterTagStackByType'

import { tags as allTagStack } from '../../contents/database/tags'

import { PosterProps } from '../@types/PosterProps'

const availableFlags = ['english', 'japanese', 'chinese']

const Component: React.FC<PosterProps> = props => {
  const { raw, internal = true, scrollPosition } = props

  const tagStack = allTagStack.filter(
    tag => tag.name === 'parody' || tag.name === 'tag'
  )

  const language = filterTagByType(raw.tags, 'language')

  const tagStackTag = filterTagStackByType(tagStack, 'tag')[0]
  const tagStackParody = filterTagStackByType(tagStack, 'parody')[0]

  return (
    <div className="mx-4 my-8 bg-white rounded overflow-hidden text-gray-900 dark:bg-gray-800 dark:text-gray-200 relative">
      <BluredImage
        height={raw.images.cover.h}
        width={raw.images.cover.w}
        alt={`Cover ${raw.title.pretty}`}
        scrollPosition={scrollPosition}
        src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${
          raw.images.cover.t === 'p'
            ? 'png'
            : raw.images.cover.t === 'j'
            ? 'jpg'
            : 'gif'
        }`}
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 rounded group transition-all duration-200 opacity-0 hover:opacity-100 hover:backdrop-blur bg-black-overlay p-6 text-white">
        <div className="invisible group-hover:visible h-full flex flex-col justify-between">
          <div className="overflow-hidden">
            <div className="flex">
              {language.map(lang =>
                availableFlags.includes(lang.name) ? (
                  <div className="pb-2 pr-2 w-10">
                    <img src={`/img/flags/${lang.name}.png`} alt={lang.name} />
                  </div>
                ) : null
              )}
            </div>
            <div className="text-xl md:text-lg font-semibold float-left">
              {truncate(raw.title.pretty, { length: 70 })}
            </div>
            <div className="flex flex-wrap pt-4 float-left overflow-hidden">
              {raw.tags
                .filter(o => o.type === 'parody')
                .map(tag => (
                  <Slug
                    key={`slug-parody-${tag.id}`}
                    color={tagStackParody.color}
                    link={`/${tagStackParody.prefix}/${tag.id}`}
                    title={tag.name}
                  />
                ))}
              {raw.tags
                .filter(o => o.type === 'tag')
                .map((tag, i) =>
                  i < 8 ? (
                    <Slug
                      key={`slug-tag-${tag.id}`}
                      color={tagStackTag.color}
                      link={`/${tagStackTag.prefix}/${tag.id}`}
                      title={tag.name}
                    />
                  ) : null
                )}
              {raw.tags.filter(o => o.type === 'tag').length > 8 ? (
                <Slug
                  color="blue"
                  title={`...${
                    raw.tags.filter(o => o.type === 'tag').length - 8
                  } MORE`}
                />
              ) : null}
            </div>
          </div>
          <div className="pt-4 flex">
            <div className="w-full mr-2">
              <TransparentLink to={`/${internal ? 'r' : 'g'}/${raw.id}`}>
                <button className="backdrop-blur-heavy w-full bg-white-a40 font-bold py-3 px-4 rounded inline-block float-left select-none">
                  READ <i className="fas fa-angle-right pl-1"></i>
                </button>
              </TransparentLink>
            </div>
            <div className="mr-1">
              <a
                href={`/${internal ? 'r' : 'g'}/${raw.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="backdrop-blur-heavy w-full bg-white-a40 font-bold py-3 px-4 rounded inline-block float-left select-none">
                  <i className="fas fa-external-link-square-alt"></i>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Poster = React.memo(Component)
