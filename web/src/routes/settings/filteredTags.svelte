<script lang="ts">
  import Minus from '$icons/minus.svelte'
  import { settings } from '$nanostores/settings'

  let inputRef: HTMLInputElement | null = $state(null)

  const handleSubmit = () => {
    if (!inputRef) return
    const value = inputRef!.value

    if (!$settings.filteredTags?.includes(value.toLowerCase())) {
      settings.setKey('filteredTags', [
        ...($settings.filteredTags ?? []),
        value.toLowerCase(),
      ])
    }

    inputRef.value = ''
  }

  const handleRemove = (tag: string) => () => {
    settings.setKey(
      'filteredTags',
      $settings.filteredTags!.filter(t => t !== tag)
    )
  }
</script>

<form onsubmit={handleSubmit} class="flex space-x-4">
  <input
    bind:this={inputRef}
    type="text"
    class="input input-bordered w-full"
    required
  />
  <button class="btn btn-primary" type="submit">Add</button>
</form>

<div class="space-y-3 divide-y divide-base-content/20">
  {#each $settings.filteredTags ?? [] as tag}
    <div class="flex space-between align-center pb-3">
      <p>{tag}</p>
      <button
        class="btn btn-xs btn-square btn-error"
        onclick={handleRemove(tag)}
      >
        <Minus class="w-4" />
      </button>
    </div>
  {/each}
</div>
