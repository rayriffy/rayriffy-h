<script lang="ts">
  import Image from 'svelte-aio'

  let blur = true

  export let src: string
  export let width: number
  export let height: number
  export let alt: string | undefined = undefined

  let klass: string | undefined = ''
  export { klass as class }
</script>

<Image
  {...{
    src,
    width,
    height,
    alt,
    class: `${klass}${blur ? ' blur-lg' : ''}`,
  }}
/>
