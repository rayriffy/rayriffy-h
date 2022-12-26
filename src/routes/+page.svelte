<script lang="ts">
  import { onMount } from 'svelte'

  import Poster from '../core/components/Poster.svelte'

  import type { MinifiedHentaiForListing } from '../core/@types/MinifiedHentaiForListing'

  interface APIResponse<T> {
    status: 'success' | 'failed'
    code: number
    response: {
      message: string
      data?: T
    }
  }
  interface ExportedFunction {
    items: MinifiedHentaiForListing[]
    maxPage: number
  }

  let isLoading: boolean = true
  let hentais: MinifiedHentaiForListing[] = []

  onMount(async () => {
    isLoading = true

    const fetchedData: APIResponse<ExportedFunction> = await fetch(
      `/api/nh?${new URLSearchParams({
        query: 'doujinshi',
        page: '1',
      }).toString()}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ).then(o => o.json())

    if (fetchedData.status === 'success') {
      hentais = fetchedData.response.data?.items ?? []
    }

    isLoading = false
  })
</script>

<input type="text" placeholder="Type here" class="input w-full max-w-xs" />

<section class="grid grid-cols-2 gap-6 items-center">
  {#each hentais as hentai}
    <a href={`/g/${hentai.id}`}>
      <Poster {hentai} />
    </a>
  {/each}
</section>
