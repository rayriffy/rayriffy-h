<script lang="ts">
  import { useStore } from '$storeon'

  import PlusIcon from '@svicons/boxicons-regular/plus.svelte'
  import MinusIcon from '@svicons/boxicons-regular/minus.svelte'

  import type { Hentai } from '$core/@types/Hentai'

  export let hentai: Hentai

  const { collection, dispatch } = useStore('collection')
</script>

<button
  class="btn btn-secondary btn-square"
  on:click={() => dispatch('collection/toggle', hentai)}
>
  {#if $collection.data.find(o => Number(o.id) === Number(hentai.id)) !== undefined}
    <MinusIcon class="w-8" />
  {:else}
    <PlusIcon class="w-7" />
  {/if}
</button>
