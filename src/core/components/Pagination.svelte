<script lang="ts">
  import PaginationPage from './PaginationPage.svelte'

  export let max: number
  export let current: number
  export let prefix: string = '/'

  const pageLength: number = max > 5 ? 5 : max
  const pageStartAt: number =
    max > 5
      ? current - 2 < 1
        ? 0
        : current + 2 > max
        ? max - pageLength
        : current - (pageLength - 2)
      : 0
</script>

<div class="btn-group">
  {#each Array.from({ length: pageLength }) as _, i}
    <PaginationPage
      page={i + pageStartAt + 1}
      {...{
        current,
        prefix,
      }}
    />
  {/each}
</div>
