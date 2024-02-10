<script lang="ts">
  import '../styles/tailwind.css'

  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { api } from '$trpc/client'

  import Navbar from '$core/components/Navbar.svelte'

  import { onMount } from 'svelte'
  import { pwaInfo } from 'virtual:pwa-info'

  import { settings } from '$nanostores/settings'
  import { collection } from '$nanostores/collection'
  import { search } from '$nanostores/search'
  import { defaultSearch } from '$nanostores/constants/defaultSearch'

  import type { ComponentType } from 'svelte'

  import type { LayoutData } from './$types'

  export let data: LayoutData

  let ReloadPrompt: ComponentType
  onMount(async () => {
    caches.delete('next-image-assets')
    caches.delete('next-galleries')
    caches.delete('next-listing')

    // migrate storeon data to nanostores
    try {
      const storeon = JSON.parse(window.localStorage.getItem('storeon')!)

      if (storeon !== null) {
        settings.setKey('safemode', storeon.settings.safemode)
        collection.set(storeon.collection.data)

        window.localStorage.removeItem('storeon')
      }
    } catch (e) {
      console.error('failed to parse storeon')
    }

    // if new session, then reset search
    if (window.sessionStorage.getItem('riffyh-session') !== 'true') {
      search.set(defaultSearch)
      window.sessionStorage.setItem('riffyh-session', 'true')
    }

    pwaInfo &&
      (ReloadPrompt = (await import('$core/components/ReloadPrompt.svelte'))
        .default)
  })

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
  // @ts-expect-error
  $: client = api.hydrateFromServer(data.trpc)
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>

<QueryClientProvider client={client}>
  <div class="app mx-auto max-w-lg">
    {#if ReloadPrompt}
      <svelte:component this={ReloadPrompt} />
    {/if}
    <main class="pb-16">
      <slot />
    </main>
    <Navbar />
  </div>
</QueryClientProvider>