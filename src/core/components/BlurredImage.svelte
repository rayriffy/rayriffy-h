<script lang="ts">
  import Image from 'svelte-aio'

  import { settings } from '$nanostores/settings'

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

<Image {...finalProps} />
