<script lang="ts">
  import { useStore } from '$storeon'

  import PlusIcon from '$icons/plus.svelte'
  import MinusIcon from '$icons/minus.svelte'

  import type { Hentai } from '$core/@types/Hentai'

  export let hentai: Hentai

  const { collection, dispatch } = useStore('collection')
</script>

<button
  class="btn-secondary btn-square btn"
  on:click={() => dispatch('collection/toggle', hentai)}
>
  {#if $collection.data.find(o => Number(o.id) === Number(hentai.id)) !== undefined}
    <MinusIcon class="w-8" />
  {:else}
    <PlusIcon class="w-7" />
  {/if}
</button>
