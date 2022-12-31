<script lang="ts">
  import { page } from '$app/stores'

  import HomeIcon from '@svicons/boxicons-regular/home.svelte'
  import BoxIcon from '@svicons/boxicons-regular/box.svelte'
  import NavigationIcon from '@svicons/boxicons-regular/navigation.svelte'
  import BookmarksIcon from '@svicons/boxicons-regular/bookmarks.svelte'
  import CogIcon from '@svicons/boxicons-regular/cog.svelte'

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
  <button>
    <NavigationIcon class="h-5 w-5" />
  </button>
  <button>
    <BookmarksIcon class="h-5 w-5" />
  </button>
  <button>
    <CogIcon class="h-5 w-5" />
  </button>
</nav>
