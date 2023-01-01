<script>
  import '../styles/tailwind.css'

  import Navbar from '$core/components/Navbar.svelte'
  import UpvoteIcon from '@svicons/boxicons-regular/upvote.svelte'

  import { onMount } from 'svelte'
  import { provideStoreon } from '@storeon/svelte'
  import { store } from '$storeon'
  import { pwaInfo } from 'virtual:pwa-info'

  let isUpdateAvailable = false

  provideStoreon(store)

  onMount(async () => {
    caches.delete('next-image-assets')
    caches.delete('next-galleries')
    caches.delete('next-listing')

    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register')
      registerSW({
        immediate: true,
        onNeedRefresh() {
          isUpdateAvailable = true
        },
        onRegistered(r) {
          // uncomment following code if you want check for updates
          // r && setInterval(() => {
          //    console.log('Checking for sw update')
          //    r.update()
          // }, 20000 /* 20s for testing purposes */)
          console.log(`SW Registered: ${r}`)
        },
        onRegisterError(error) {
          console.log('SW registration error', error)
        },
      })
    }
  })

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>

<div class="app max-w-lg mx-auto">
  {#if isUpdateAvailable}
    <div class="toast toast-top toast-end">
      <button
        class="alert alert-info px-4 py-1 text-sm"
        on:click={() => window.location.reload()}
      >
        <div>
          <span class="flex"
            ><UpvoteIcon class="w-5 pr-1" /> Update available</span
          >
        </div>
      </button>
    </div>
  {/if}
  <main class="pb-16">
    <slot />
  </main>
  <Navbar />
</div>
