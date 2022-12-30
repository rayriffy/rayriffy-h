<script lang="ts">
  import Image from 'svelte-aio'
  import { useStore } from '$storeon'

  const { settings } = useStore('settings')

  export let src: string
  export let width: number
  export let height: number
  export let alt: string | undefined = undefined

  let klass: string | undefined = ''
  export { klass as class }

  $: blur = $settings.safemode
</script>

<div class={`overflow-hidden ${klass}`}>
  <Image
    {...{
      src,
      width,
      height,
      alt,
      class: blur ? ' blur-xl' : undefined,
    }}
  />
</div>
