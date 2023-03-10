<script lang="ts">
  import '../styles/tailwind.css'

  import Navbar from '$core/components/Navbar.svelte'

  import { onMount } from 'svelte'
  import { provideStoreon } from '@storeon/svelte'
  import { store } from '$storeon'
  import { pwaInfo } from 'virtual:pwa-info'
  import { RIFFYH_BUILD_MODE } from '$env/static/public'

  import type { ComponentType } from 'svelte'

  provideStoreon(store)

  let ReloadPrompt: ComponentType
  onMount(async () => {
    caches.delete('next-image-assets')
    caches.delete('next-galleries')
    caches.delete('next-listing')

    pwaInfo &&
      (ReloadPrompt = (await import('$core/components/ReloadPrompt.svelte'))
        .default)
  })

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>

<div class="app max-w-lg mx-auto">
  {#if ReloadPrompt}
    <svelte:component this={ReloadPrompt} />
  {/if}
  <main class="pb-16">
    <slot />
  </main>
  <Navbar />
</div>
