<script>
  import '../styles/tailwind.css'

  import Navbar from '$core/components/Navbar.svelte'

  import { provideStoreon } from '@storeon/svelte'
  import { store } from '$storeon'

  provideStoreon(store)
</script>

<div class="app max-w-lg mx-auto">
  <main class="p-4 pb-16">
    <slot />
  </main>
  <Navbar />
</div>
