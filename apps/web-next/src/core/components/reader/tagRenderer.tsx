import { memo, Fragment, useMemo } from 'react'

import Link from 'next/link'

import { DatabaseTag, tags as tagTypes } from '@rayriffy-h/tags'
import { filterTagByType, Tag } from '@rayriffy-h/helper'

import kebabCase from 'lodash.kebabcase'

interface IProps {
  tags: Tag[]
}

export const TagRenderer = memo<IProps>(props => {
  const { tags } = props

  const sortedTags = useMemo<[DatabaseTag, Tag[]][]>(() => {
    return tagTypes.map(type => [type, filterTagByType(tags, type.name)])
  }, [tags])

  return (
    <Fragment>
      {sortedTags.map(([sourceTag, tags]) => {
        if (tags.length === 0) {
          return null
        } else {
          return (
            <TagGroup
              key={`tag-group-${sourceTag.name}`}
              {...{ sourceTag, tags }}
            />
          )
        }
      })}
    </Fragment>
  )
})

interface TagGroupProps {
  sourceTag: DatabaseTag
  tags: Tag[]
}

const TagGroup = memo<TagGroupProps>(props => {
  const { sourceTag, tags } = props

  return (
    <div className="pt-2 flex" key={`tag-group-${sourceTag.name}`}>
      <span className="uppercase text-sm text-gray-700 font-bold pr-2 pt-1">
        {sourceTag.name}
      </span>
      <div className="flex flex-wrap">
        {tags.map(tag => (
          <Slug
            tag={tag}
            color={sourceTag.color}
            key={`tag-${sourceTag.name}-${tag.name}`}
          />
        ))}
      </div>
    </div>
  )
})

interface SlugProps {
  tag: Tag
  color: string
}

export const Slug = memo<SlugProps>(props => {
  const { tag, color } = props

  return (
    <div className="p-1">
      <Link href={`/tag/${kebabCase(tag.name)}`}>
        <a
          className={`text-xs uppercase rounded-md px-2 py-1 text-white ${color} font-semibold`}
        >
          {tag.name}
        </a>
      </Link>
    </div>
  )
})
