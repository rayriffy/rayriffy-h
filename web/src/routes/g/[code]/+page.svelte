<script lang="ts">
  import { page } from '$app/state'

  import BlurredImage from '$core/components/BlurredImage.svelte'
  import Favorite from '$modules/reader/Favorite.svelte'
  import PageRenderer from '$modules/reader/PageRenderer.svelte'
  import TagsRenderer from '$modules/reader/TagsRenderer.svelte'
  import BookContentIcon from '$icons/bookContent.svelte'

  import { getImageUrl } from '@riffyh/commons'

  import { api } from '$trpc/client'

  $: query = api.hentai.get.query({
    code: page.params.code ?? '',
  })
</script>

<svelte:head>
  {#if $query.isSuccess}
    <title>{$query.data.hentai.title.pretty} · Riffy H</title>
  {:else}
    <title>Riffy H</title>
  {/if}
</svelte:head>

{#if $query.isSuccess}
  {@const { hentai, excludes } = $query.data}
  <section class="flex flex-col items-center space-y-6 p-4 container-lg">
    <div class="overflow-hidden rounded-xl shadow-md">
      <BlurredImage
        src={getImageUrl({
          image: hentai.images.cover,
          mediaId: hentai.media_id,
          type: 'cover',
        })}
        width={hentai.images.cover.w}
        height={hentai.images.cover.h}
        class="w-80"
      />
    </div>
    <article class="w-full">
      <span class="font-semibold text-gray-600 dark:text-gray-300"
        >{hentai.id}</span
      >
      <h1
        class="pt-2 text-2xl font-bold leading-tight text-gray-700 dark:text-white"
      >
        {hentai.title.pretty}
      </h1>
      <h2 class="text-md font-bold text-gray-500 dark:text-gray-400">
        {hentai.title.japanese}
      </h2>
      <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400">
        {hentai.images.pages.length} pages
      </h3>
      <div class="pt-2">
        <TagsRenderer tags={hentai.tags} />
      </div>
    </article>
    <div class="w-full">
      <Favorite {hentai} />
    </div>
  </section>
  <div class="divider-item divider mb-8 container-4xl">
    <BookContentIcon class="w-12" />
  </div>
  <PageRenderer
    pages={hentai.images.pages}
    mediaId={hentai.media_id}
    {excludes}
  />
{:else if $query.isLoading}
  <div class="flex flex-col items-center p-32">
    <progress class="progress w-56"></progress>
    <p class="pt-2 text-sm text-base-content">Loading...</p>
  </div>
{:else}
  <p>Failed</p>
{/if}

<style>
  .divider-item {
    color: hsl(var(--bc) / var(--tw-bg-opacity));
  }
</style>
