<script lang="ts">
  import BlurredImage from '$core/components/BlurredImage.svelte'
  import Favorite from '$modules/reader/Favorite.svelte'
  import PageRenderer from '$modules/reader/PageRenderer.svelte'
  import TagsRenderer from '$modules/reader/TagsRenderer.svelte'
  import BookContentIcon from '@svicons/boxicons-regular/book-content.svelte'

  import { getImageUrl } from '$core/services/getImageUrl'

  import type { PageData } from './$types'

  export let data: PageData
</script>

{#if data.hentai}
  <section class="p-4 flex flex-col items-center space-y-6">
    <div class="rounded-xl overflow-hidden shadow-md">
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
      <span class="font-semibold text-gray-600">{data.hentai.id}</span>
      <h1 class="font-bold text-2xl leading-tight pt-2 text-gray-700">
        {data.hentai.title.pretty}
      </h1>
      <h2 class="font-bold text-gray-500 text-md">
        {data.hentai.title.japanese}
      </h2>
      <div class="pt-2">
        <TagsRenderer tags={data.hentai.tags} />
      </div>
    </article>
    <div class="w-full">
      <Favorite hentai={data.hentai} />
    </div>
  </section>
  <div class="divider mb-8">
    <BookContentIcon class="w-12 text-base-300" />
  </div>
  <PageRenderer
    pages={data.hentai.images.pages}
    mediaId={data.hentai.media_id}
    excludes={data.excludes}
  />
{/if}
