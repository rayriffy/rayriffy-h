<script lang="ts">
  import { search } from '$nanostores/search'

  import type { Search } from '$nanostores/@types/Search'

  interface Props {
    section: keyof Search
    children?: import('svelte').Snippet
  }

  let { section, children }: Props = $props()
  let timer: NodeJS.Timeout

  const debounce = (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('value: ', value)
      search.setKey(section, {
        ...search.get()[section],
        query: value,
      })
    }, 500)
  }
</script>

<section class="px-4 pt-4 container-lg">
  <label class="input w-full">
    <svg
      class="h-[1em] opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ><g
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2.5"
        fill="none"
        stroke="currentColor"
        ><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"
        ></path></g
      ></svg
    >
    <input
      type="search"
      class="grow"
      autocomplete="off"
      placeholder="Keywords or 6-digit code"
      value={$search[section].query}
      oninput={({ target }) => {
        // @ts-ignore
        return debounce(target?.value ?? '')
      }}
    />
  </label>
  {@render children?.()}
</section>
