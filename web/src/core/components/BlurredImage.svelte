<script lang="ts">
  import Image from '@urami/svelte'

  import { settings } from '$nanostores/settings'

  interface Props {
    src: string
    width: number
    height: number
    alt?: string | undefined
    class?: string | undefined
  }

  let {
    src,
    width,
    height,
    alt = undefined,
    class: klass = '',
  }: Props = $props()

  let finalProps = $derived({
    src,
    width,
    height,
    alt,
    class: `${klass} ${$settings.safemode ? ' blur-xl' : ''}`,
  })
</script>

<Image {...finalProps} />
