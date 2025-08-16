<script lang="ts">
  import ErrorIcon from '$icons/errorCircle.svelte'

  import { collection } from '$nanostores/collection'

  import { api } from '$trpc/client'

  let exportCode: string = $state('')

  const exporter = api.collection.export.mutation({
    onSuccess: data => {
      exportCode = data
    },
  })

  const handleClick = () => {
    $exporter.mutate({
      ids: collection.get().map(item => item.id),
    })
  }
</script>

<svelte:head>
  <title>Export · Riffy H</title>
</svelte:head>

<section class="p-4 container-lg">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Export</h2>
      <p class="text-gray-500">
        Transfer collection to other deivces by using temporary key.
      </p>
      {#if $exporter.isError}
        <div class="alert alert-error my-2 text-sm shadow-lg">
          <div>
            <ErrorIcon class="h-6 w-6 shrink-0" />
            <span
              >Unable to export collection at the moment, please try again</span
            >
          </div>
        </div>
      {/if}
      {#if $exporter.isIdle}
        <div class="alert alert-info my-2 text-sm shadow-lg">
          <div>
            <span
              >You're about to exporting <b>{$collection.length} items</b>
              from this device...press <b>Export</b> button to continue</span
            >
          </div>
        </div>
        <div class="card-actions justify-end pt-2">
          <button class="btn btn-primary" onclick={handleClick}>Export</button>
        </div>
      {:else if $exporter.isPending}
        <div class="flex flex-col items-center pb-2 pt-8">
          <progress class="progress w-56"></progress>
          <p class="pt-2 text-sm text-base-content">Exporting...</p>
        </div>
      {:else if $exporter.isSuccess}
        <div class="flex flex-col items-center">
          <p class="pt-2 text-sm text-base-content">Collection Exported! 👍🏼</p>
          <div class="my-4 rounded-xl bg-base-200 px-6 py-4 font-mono text-xl">
            {exportCode}
          </div>
        </div>
        <div class="card-actions justify-end pt-2">
          <a href="/collection" class="btn btn-primary">Done</a>
        </div>
      {/if}
    </div>
  </div>
</section>
