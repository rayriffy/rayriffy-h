<script lang="ts">
  import { tags as tagTypes } from '$core/constants/tags'
  import { filterTagByType } from '$core/services/filterTagByType'

  import type { DatabaseTag, Tag } from '@riffyh/commons'

  interface Props {
    tags: Tag[]
  }

  let { tags }: Props = $props()

  const sortedTags = tagTypes
    .map(
      type => [type, filterTagByType(tags, type.name)] as [DatabaseTag, Tag[]]
    )
    .filter(([_, o]) => o.length !== 0)
</script>

{#each sortedTags as [type, tags]}
  <div class="flex pt-2">
    <span
      class="pr-2 pt-1 text-sm font-bold uppercase text-gray-700 dark:text-white"
    >
      {type.name}
    </span>
    <div class="flex flex-wrap">
      {#each tags as tag}
        <a
          href={`/tag/${tag.id}`}
          class={`rounded-md px-2 py-1 text-xs uppercase text-white ${type.color} m-1 font-semibold`}
        >
          {tag.name}
        </a>
      {/each}
    </div>
  </div>
{/each}
