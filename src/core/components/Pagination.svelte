<script lang="ts">
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
    {@const page = i + pageStartAt + 1}
    <a
      href={`${prefix}${page === 1 ? '' : `p/${page}`}`}
      class={`btn btn-sm${page === current ? ' btn-active' : ''}`}>{page}</a
    >
  {/each}
</div>
