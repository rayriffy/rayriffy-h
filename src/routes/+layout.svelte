<script>
  import '../styles/tailwind.css'

  import Navbar from '$core/components/Navbar.svelte'

  import { onMount } from 'svelte'
  import { provideStoreon } from '@storeon/svelte'
  import { store } from '$storeon'
  import { pwaInfo } from 'virtual:pwa-info'

  provideStoreon(store)

  onMount(async () => {
    console.log({ pwaInfo })
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register')
      registerSW({
        immediate: true,
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
  $: console.log({ webManifest })
</script>

<div class="app max-w-lg mx-auto">
  <main class="pb-16">
    <slot />
  </main>
  <Navbar />
</div>
