<script lang="ts">
  import type { APIResponse } from '$core/@types/APIResponse'
  import { useStore } from '$storeon'

  import type { CollectionStore } from '$storeon/@types/CollectionStore'

  const { collection } = useStore('collection')

  let status: 'wait' | 'process' | 'done' = 'wait'
  let error: string | null = null
  let exportCode: string

  const onExport = async (collection: CollectionStore) => {
    status = 'process'
    error = null

    try {
      const response: APIResponse<string> = await fetch(
        `/api/collection/export`,
        {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({
            collection,
          }),
          headers: { 'Content-Type': 'application/json' },
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

<section class="p-4">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Export</h2>
      <p class="text-gray-500">
        Transfer collection to other deivces by using temporary key.
      </p>
      <div class="bg-info text-info-content p-4 rounded-xl">
        <p>
          You're about to exporting <b>{$collection.data.length} items</b> from
          this device...press <b>Export</b> button to continue
        </p>
      </div>
      <div class="card-actions justify-end pt-2">
        <button class="btn btn-primary">Export</button>
      </div>
    </div>
  </div>
</section>
