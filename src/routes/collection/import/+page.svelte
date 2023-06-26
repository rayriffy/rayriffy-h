<script lang="ts">
  import ErrorIcon from '$icons/errorCircle.svelte'

  import { collection } from '$nanostores/collection'

  import type { APIResponse } from '$core/@types/APIResponse'
  import type { Favorite } from '$nanostores/@types/Favorite'

  let status: 'wait' | 'process' | 'done' = 'wait'
  let error: string | null = null
  let inputKey: string = ''

  const onSubmit = async (targetKey: string) => {
    status = 'process'
    error = null

    const response: APIResponse<Favorite[]> = await fetch(
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
    } else {
      collection.set(response.response.data)
      status = 'done'
    }
  }
</script>

<svelte:head>
  <title>Import · Riffy H</title>
</svelte:head>

<section class="p-4">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Import</h2>
      <p class="text-gray-500">
        Transfer collection from other deivces by using temporary key.
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
        <input
          type="text"
          placeholder="Temporary key"
          class="input-bordered input w-full font-mono"
          on:input={({ target }) => {
            // @ts-ignore
            inputKey = target?.value ?? ''
          }}
        />
        <div class="card-actions justify-end pt-2">
          <button
            class="btn-primary btn"
            disabled={inputKey === ''}
            on:click={() => onSubmit(inputKey)}
            >{inputKey !== '' ? 'Import' : 'Missing input'}</button
          >
        </div>
      {:else if status === 'process'}
        <div class="flex flex-col items-center pb-2 pt-8">
          <progress class="progress w-56" />
          <p class="pt-2 text-sm text-base-content">Importing...</p>
        </div>
      {:else if status === 'done'}
        <div class="flex flex-col items-center pb-4 pt-6">
          <p class="pt-2 text-base-content">Collection imported! 👍🏼</p>
        </div>
        <div class="card-actions justify-end pt-2">
          <a href="/collection" class="btn-primary btn">Done</a>
        </div>
      {/if}
    </div>
  </div>
</section>
