<script lang="ts">
  import BlurredImage from '$core/components/BlurredImage.svelte'
  import Favorite from '$modules/reader/Favorite.svelte'
  import PageRenderer from '$modules/reader/PageRenderer.svelte'
  import TagsRenderer from '$modules/reader/TagsRenderer.svelte'
  import BookContentIcon from '$icons/bookContent.svelte'

  import { getImageUrl } from '$core/services/getImageUrl'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  {#if data.hentai}
    <title>{data.hentai.title.pretty} · Riffy H</title>
  {:else}
    <title>Riffy H</title>
  {/if}
</svelte:head>

{#if data.hentai}
  <section class="flex flex-col items-center space-y-6 p-4">
    <div class="overflow-hidden rounded-xl shadow-md">
      <BlurredImage
        src={getImageUrl({
          image: data.hentai.images.cover,
          mediaId: data.hentai.media_id,
          type: 'cover',
        })}
        width={data.hentai.images.cover.w}
        height={data.hentai.images.cover.h}
        class="w-80"
      />
    </div>
    <article class="w-full">
      <span class="font-semibold text-gray-600 dark:text-gray-300"
        >{data.hentai.id}</span
      >
      <h1
        class="pt-2 text-2xl font-bold leading-tight text-gray-700 dark:text-white"
      >
        {data.hentai.title.pretty}
      </h1>
      <h2 class="text-md font-bold text-gray-500 dark:text-gray-400">
        {data.hentai.title.japanese}
      </h2>
      <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400">
        {data.hentai.images.pages.length} pages
      </h3>
      <div class="pt-2">
        <TagsRenderer tags={data.hentai.tags} />
      </div>
    </article>
    <div class="w-full">
      <Favorite hentai={data.hentai} />
    </div>
  </section>
  <div class="divider-item divider mb-8">
    <BookContentIcon class="w-12" />
  </div>
  <PageRenderer
    pages={data.hentai.images.pages}
    mediaId={data.hentai.media_id}
    excludes={data.excludes}
  />
{/if}

<style>
  .divider-item {
    color: hsl(var(--bc) / var(--tw-bg-opacity));
  }
</style>
