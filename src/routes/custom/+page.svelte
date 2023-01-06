<script lang="ts">
  import { goto } from '$app/navigation'
  import type { FormEventHandler, MouseEventHandler } from 'svelte/elements'

  let customCode: (string | null)[] = [null, null, null, null, null, null]
  $: customCode = customCode
    .map(o => (o ?? '').replace(/[^0-9]/g, ''))
    .map(o => (o === '' ? null : o))

  const onClick: MouseEventHandler<HTMLInputElement> = event => {
    if (event.currentTarget?.id !== 'code-digit-0')
      document.getElementById('code-digit-0')?.focus()
  }
  const onInputEvent =
    (index: number): FormEventHandler<HTMLInputElement> =>
    event => {
      const value = event.currentTarget.value

      // if value is valid
      if (value.replace(/[^0-9]/g, '') !== '') {
        // if last element, then execute something
        if (index === 5) {
          // console.log({ code: customCode.join('') })
          goto(`/g/${Number(customCode.join(''))}`)
        } else {
          document.getElementById(`code-digit-${index + 1}`)?.focus()
        }
      }
    }
</script>

<svelte:head>
  <title>Custom · Riffy H</title>
</svelte:head>

<section class="pt-4 px-4 space-y-2">
  <div class="flex justify-evenly" id="code-digit">
    {#each Array.from({ length: 6 }) as _, i (`code-input-${i}`)}
      <input
        type="tel"
        placeholder="0"
        maxlength="1"
        id={`code-digit-${i}`}
        class="input input-bordered w-14 h-14 font-mono text-center"
        bind:value={customCode[i]}
        on:click={onClick}
        on:input|preventDefault={onInputEvent(i)}
      />
    {/each}
  </div>

  <p class="text-gray-400 text-sm">
    If code is less than 6 digites, then prefix with <code>0</code>
  </p>
</section>
