<script lang="ts">
  import { page } from '$app/stores'

  import HomeIcon from '$icons/home.svelte'
  import BoxIcon from '$icons/box.svelte'
  import NavigationIcon from '$icons/navigation.svelte'
  import BookmarksIcon from '$icons/bookmarks.svelte'
  import CogIcon from '$icons/cog.svelte'

  $: printClass = (routes: string[]) =>
    routes.includes($page.route.id ?? '') ? 'active' : ''
</script>

<nav class="btm-nav mx-auto max-w-lg bg-base-100/80 backdrop-blur-lg">
  <a href="/" aria-label="home" class={printClass(['/', '/p/[page=integer]'])}>
    <HomeIcon class="h-5 w-5" />
  </a>
  <a
    href="/listing"
    aria-label="listing"
    class={printClass(['/listing', '/listing/p/[page=integer]'])}
  >
    <BoxIcon class="h-5 w-5" />
  </a>
  <a href="/custom" aria-label="custom" class={printClass(['/custom'])}>
    <NavigationIcon class="h-5 w-5" />
  </a>
  <a
    href="/collection"
    aria-label="collection"
    class={printClass([
      '/collection',
      '/collection/import',
      '/collection/export',
    ])}
  >
    <BookmarksIcon class="h-5 w-5" />
  </a>
  <a href="/settings" aria-label="settings" class={printClass(['/settings'])}>
    <CogIcon class="h-5 w-5" />
  </a>
</nav>
