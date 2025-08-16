<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  interface Props {
    max: number
    current: number
    prefix?: string
  }

  let { max, current, prefix = '' }: Props = $props()

  let pageLength = $derived(max > 5 ? 5 : max)
  let pageStartAt = $derived(
    max > 5
      ? current - 2 < 1
        ? 0
        : current + 2 > max
          ? max - pageLength
          : current - (pageLength - 2)
      : 0
  )

  const dispatch = createEventDispatcher<{ paginate: { page: number } }>()
</script>

<div class="join">
  {#each Array.from({ length: pageLength }) as _, i}
    {@const page = i + pageStartAt + 1}
    {#if prefix !== ''}
      <a
        href={`${prefix}${page === 1 ? '' : `p/${page}`}`}
        class={`join-item btn btn-sm${page === current ? ' btn-active' : ''}`}
        >{page}</a
      >
    {:else}
      <button
        class={`join-item btn btn-sm${page === current ? ' btn-active' : ''}`}
        onclick={() =>
          dispatch('paginate', {
            page,
          })}>{page}</button
      >
    {/if}
  {/each}
</div>
