<script lang="ts">
  import { tags as tagTypes } from '$core/constants/tags'
  import { filterTagByType } from '$core/services/filterTagByType'

  import type { DatabaseTag } from '$core/@types/DatabaseTag'
  import type { Tag } from '$core/@types/Tag'

  export let tags: Tag[]

  const sortedTags = tagTypes
    .map(
      type => [type, filterTagByType(tags, type.name)] as [DatabaseTag, Tag[]]
    )
    .filter(([_, o]) => o.length !== 0)
</script>

{#each sortedTags as [type, tags]}
  <div class="pt-2 flex">
    <span class="uppercase text-sm text-gray-700 font-bold pr-2 pt-1">
      {type.name}
    </span>
    <div class="flex flex-wrap">
      {#each tags as tag}
        <a
          href={`/tag/${tag.id}`}
          class={`text-xs uppercase rounded-md px-2 py-1 text-white ${type.color} font-semibold m-1`}
        >
          {tag.name}
        </a>
      {/each}
    </div>
  </div>
{/each}
