<script lang="ts">
  import ErrorIcon from '$icons/errorCircle.svelte'
  import { collection } from '$nanostores/collection'
  import { api } from '$trpc/client'

  let inputKey: string = $state('')

  const importer = api.collection.import.mutation({
    onSuccess: data => {
      collection.set(data)
    },
  })

  const onSubmit = (targetKey: string) => {
    $importer.mutate({
      code: targetKey,
    })
  }
</script>

<svelte:head>
  <title>Import · Riffy H</title>
</svelte:head>

<section class="p-4 container-lg">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Import</h2>
      <p class="text-gray-500">
        Transfer collection from other deivces by using temporary key.
      </p>
      {#if $importer.isError}
        <div class="alert alert-error my-2 text-sm shadow-lg">
          <div>
            <ErrorIcon class="h-6 w-6 shrink-0" />
            <span
              >Unable to import collection you specified, maybe code is already
              expired</span
            >
          </div>
        </div>
      {/if}
      {#if $importer.isPending}
        <div class="flex flex-col items-center pb-2 pt-8">
          <progress class="progress w-56"></progress>
          <p class="pt-2 text-sm text-base-content">Importing...</p>
        </div>
      {:else if $importer.isSuccess}
        <div class="flex flex-col items-center pb-4 pt-6">
          <p class="pt-2 text-base-content">Collection imported! 👍🏼</p>
        </div>
        <div class="card-actions justify-end pt-2">
          <a href="/collection" class="btn btn-primary">Done</a>
        </div>
      {:else}
        <input
          type="text"
          placeholder="Temporary key"
          class="input input-bordered w-full font-mono"
          oninput={({ target }) => {
            // @ts-ignore
            inputKey = target?.value ?? ''
          }}
        />
        <div class="card-actions justify-end pt-2">
          <button
            class="btn btn-primary"
            disabled={inputKey === ''}
            onclick={() => onSubmit(inputKey)}
            >{inputKey !== '' ? 'Import' : 'Missing input'}</button
          >
        </div>
      {/if}
    </div>
  </div>
</section>
