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

<nav class="btm-nav bg-base-100/80 backdrop-blur-lg max-w-lg mx-auto">
  <a href="/" class={printClass(['/', '/p/[page=integer]'])}>
    <HomeIcon class="h-5 w-5" />
  </a>
  <a
    href="/listing"
    class={printClass(['/listing', '/listing/p/[page=integer]'])}
  >
    <BoxIcon class="h-5 w-5" />
  </a>
  <a href="/custom" class={printClass(['/custom'])}>
    <NavigationIcon class="h-5 w-5" />
  </a>
  <a
    href="/collection"
    class={printClass([
      '/collection',
      '/collection/import',
      '/collection/export',
    ])}
  >
    <BookmarksIcon class="h-5 w-5" />
  </a>
  <a href="/settings" class={printClass(['/settings'])}>
    <CogIcon class="h-5 w-5" />
  </a>
</nav>
