<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let max: number
  export let current: number
  export let prefix: string = ''

  $: pageLength = max > 5 ? 5 : max
  $: pageStartAt =
    max > 5
      ? current - 2 < 1
        ? 0
        : current + 2 > max
          ? max - pageLength
          : current - (pageLength - 2)
      : 0

  const dispatch = createEventDispatcher<{ paginate: { page: number } }>()
</script>

<div class="btn-group">
  {#each Array.from({ length: pageLength }) as _, i}
    {@const page = i + pageStartAt + 1}
    {#if prefix !== ''}
      <a
        href={`${prefix}${page === 1 ? '' : `p/${page}`}`}
        class={`btn btn-sm${page === current ? ' btn-active' : ''}`}>{page}</a
      >
    {:else}
      <button
        class={`btn btn-sm${page === current ? ' btn-active' : ''}`}
        on:click={() =>
          dispatch('paginate', {
            page,
          })}>{page}</button
      >
    {/if}
  {/each}
</div>
