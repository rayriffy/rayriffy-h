<script lang="ts">
  import ErrorIcon from '@svicons/boxicons-regular/error-circle.svelte'

  import { useStore } from '$storeon'

  import type { APIResponse } from '$core/@types/APIResponse'
  import type { CollectionStore } from '$storeon/@types/CollectionStore'

  let status: 'wait' | 'process' | 'done' = 'done'
  let error: string | null = null
  let inputKey: string = ''

  const { collection, dispatch } = useStore('collection')

  const onSubmit = async (targetKey: string) => {
    status = 'process'
    error = null

    const response: APIResponse<CollectionStore['collection']> = await fetch(
      `/api/collection/import?${new URLSearchParams({
        code: targetKey,
      }).toString()}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ).then(o => o.json())

    if (response.status === 'failed') {
      error =
        'Unable to import collection you specified, maybe code is already expired'
      status = 'wait'
    } else if (response.response.data.version !== $collection.version) {
      error =
        'Mismathed version! Please make sure both device are running the latest version before exporting/importing'
      status = 'wait'
    } else {
      dispatch('collection/override', {
        collection: response.response.data,
      })

      status = 'done'
    }
  }
</script>

<section class="p-4">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Import</h2>
      <p class="text-gray-500">
        Transfer collection from other deivces by using temporary key.
      </p>
      {#if error !== null}
        <div class="alert alert-error shadow-lg text-sm my-2">
          <div>
            <ErrorIcon class="flex-shrink-0 h-6 w-6" />
            <span>{error}</span>
          </div>
        </div>
      {/if}
      {#if status === 'wait'}
        <input
          type="text"
          placeholder="Temporary key"
          class="input input-bordered w-full font-mono"
          on:input={({ target }) => {
            // @ts-ignore
            inputKey = target?.value ?? ''
          }}
        />
        <div class="card-actions justify-end pt-2">
          <button
            class="btn btn-primary"
            disabled={inputKey === ''}
            on:click={() => onSubmit(inputKey)}
            >{inputKey !== '' ? 'Import' : 'Missing input'}</button
          >
        </div>
      {:else if status === 'process'}
        <div class="pt-8 pb-2 flex flex-col items-center">
          <progress class="progress w-56" />
          <p class="text-base-content text-sm pt-2">Importing...</p>
        </div>
      {:else if status === 'done'}
        <div class="pt-6 pb-4 flex flex-col items-center">
          <p class="text-base-content pt-2">Collection imported! 👍🏼</p>
        </div>
        <div class="card-actions justify-end pt-2">
          <a href="/collection" class="btn btn-primary">Done</a>
        </div>
      {/if}
    </div>
  </div>
</section>
