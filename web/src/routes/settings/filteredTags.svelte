<script lang="ts">
  import Minus from '$icons/minus.svelte'
  import { settings } from '$nanostores/settings'

  let inputRef: HTMLInputElement | null = null

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

<form on:submit={handleSubmit} class="flex space-x-4">
  <input
    bind:this={inputRef}
    type="text"
    class="input input-bordered w-full"
    required
  />
  <button class="btn btn-primary" type="submit">Add</button>
</form>

<div class="space-y-3 divide-y">
  {#each $settings.filteredTags ?? [] as tag}
    <div class="flex space-between pt-3">
      <p>{tag}</p>
      <button
        class="btn btn-sm btn-square btn-neutral"
        on:click={handleRemove(tag)}
      >
        <Minus class="w-4" />
      </button>
    </div>
  {/each}
</div>
