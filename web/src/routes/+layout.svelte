<script lang="ts">
  import '../styles/tailwind.css'

  import { api } from '$trpc/client'

  import Navbar from '$core/components/Navbar.svelte'

  import { onMount } from 'svelte'
  import { pwaInfo } from 'virtual:pwa-info'

  import { settings } from '$nanostores/settings'
  import { collection } from '$nanostores/collection'
  import { search } from '$nanostores/search'
  import { defaultSearch } from '$nanostores/constants/defaultSearch'

  import type { Component } from 'svelte'

  import type { LayoutData } from './$types'

  interface Props {
    data: LayoutData
    children?: import('svelte').Snippet
  }

  let { data, children }: Props = $props()

  let ReloadPrompt: Component | undefined = $state(undefined)
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

  let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '')
  api.hydrateFromServer(() => data.trpc)
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>

{#if ReloadPrompt}
  <ReloadPrompt />
{/if}
<main class="pb-16">
  {@render children?.()}
</main>
<Navbar />
