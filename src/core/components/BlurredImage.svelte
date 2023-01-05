<script lang="ts">
  import { RIFFYH_BUILD_MODE } from '$env/static/public'

  import Image from 'svelte-aio'
  import { useStore } from '$storeon'

  const { settings } = useStore('settings')

  export let src: string
  export let width: number
  export let height: number
  export let alt: string | undefined = undefined

  let klass: string | undefined = ''
  export { klass as class }

  $: finalProps = {
    src,
    width,
    height,
    alt,
    class: `${klass} ${$settings.safemode ? ' blur-xl' : ''}`,
  }
</script>

{#if RIFFYH_BUILD_MODE !== 'private'}
  <!-- svelte-ignore a11y-missing-attribute -->
  <img {...finalProps} />
{:else}
  <Image {...finalProps} />
{/if}
