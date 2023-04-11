<script lang="ts">
  import ErrorIcon from '$icons/errorCircle.svelte'

  import { useStore } from '$storeon'

  import type { APIResponse } from '$core/@types/APIResponse'
  import type { CollectionStore } from '$storeon/@types/CollectionStore'

  const { collection } = useStore('collection')

  let status: 'wait' | 'process' | 'done' = 'wait'
  let error: string | null = null
  let exportCode: string

  const onExport = async (collection: CollectionStore['collection']) => {
    status = 'process'
    error = null

    try {
      const response: APIResponse<string> = await fetch(
        `/api/collection/export`,
        {
          // credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({
            hentaiIds: collection.data.map(item => item.id),
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      ).then(o => o.json())

      exportCode = response.response.data
      status = 'done'
    } catch (e) {
      error = 'Unable to export collection at the moment, please try again'
      status = 'wait'
    }
  }
</script>

<svelte:head>
  <title>Export · Riffy H</title>
</svelte:head>

<section class="p-4">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Export</h2>
      <p class="text-gray-500">
        Transfer collection to other deivces by using temporary key.
      </p>
      {#if error !== null}
        <div class="alert alert-error my-2 text-sm shadow-lg">
          <div>
            <ErrorIcon class="h-6 w-6 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      {/if}
      {#if status === 'wait'}
        <div class="alert alert-info my-2 text-sm shadow-lg">
          <div>
            <span
              >You're about to exporting <b>{$collection.data.length} items</b>
              from this device...press <b>Export</b> button to continue</span
            >
          </div>
        </div>
        <div class="card-actions justify-end pt-2">
          <button class="btn-primary btn" on:click={() => onExport($collection)}
            >Export</button
          >
        </div>
      {:else if status === 'process'}
        <div class="flex flex-col items-center pb-2 pt-8">
          <progress class="progress w-56" />
          <p class="pt-2 text-sm text-base-content">Exporting...</p>
        </div>
      {:else if status === 'done'}
        <div class="flex flex-col items-center">
          <p class="pt-2 text-sm text-base-content">Collection Exported! 👍🏼</p>
          <div class="my-4 rounded-xl bg-base-200 px-6 py-4 font-mono text-xl">
            {exportCode}
          </div>
        </div>
        <div class="card-actions justify-end pt-2">
          <a href="/collection" class="btn-primary btn">Done</a>
        </div>
      {/if}
    </div>
  </div>
</section>
