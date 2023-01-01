<script>
  import '../styles/tailwind.css'

  import Navbar from '$core/components/Navbar.svelte'
  import ReloadPrompt from '$core/components/ReloadPrompt.svelte'

  import { onMount, SvelteComponent } from 'svelte'
  import { provideStoreon } from '@storeon/svelte'
  import { store } from '$storeon'
  import { pwaInfo } from 'virtual:pwa-info'

  provideStoreon(store)

  onMount(async () => {
    caches.delete('next-image-assets')
    caches.delete('next-galleries')
    caches.delete('next-listing')
  })

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>

<div class="app max-w-lg mx-auto">
  {#if pwaInfo}
    <ReloadPrompt />
  {/if}
  <main class="pb-16">
    <slot />
  </main>
  <Navbar />
</div>
