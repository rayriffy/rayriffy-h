<script lang="ts">
  import { search } from '$nanostores/search'

  import type { Search } from '$nanostores/@types/Search'

  export let section: keyof Search
  let timer: NodeJS.Timeout

  const debounce = (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('value: ', value)
      search.setKey(section, {
        query: value,
      })
    }, 500)
  }
</script>

<section class="px-4 pt-4">
  <input
    type="search"
    placeholder="Keywords or 6-digit code"
    class="input w-full bg-base-200"
    value={$search[section].query}
    on:input={({ target }) => {
      // @ts-ignore
      return debounce(target?.value ?? '')
    }}
  />
</section>
