<script lang="ts">
  import { useStore } from '$storeon'

  import type { SearchStore } from '$storeon/@types/SearchStore'

  export let section: keyof SearchStore['search']
  let timer: NodeJS.Timeout

  const { search, dispatch } = useStore('search')

  const debounce = (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('value: ', value)
      dispatch('search/query', {
        target: section,
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
    value={$search[section]}
    on:input={({ target }) => {
      // @ts-ignore
      return debounce(target?.value ?? '')
    }}
  />
</section>
