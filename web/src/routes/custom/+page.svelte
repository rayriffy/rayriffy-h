<script lang="ts">
  import { goto } from '$app/navigation'
  import PinInput from '$modules/pin/components/PinInput.svelte'
</script>

<svelte:head>
  <title>Custom · Riffy H</title>
</svelte:head>

<section class="space-y-2 px-4 pt-4 container-lg">
  <div class="flex flex-col gap-4 pt-4">
    <PinInput
      length={6}
      onComplete={pin => goto(`/g/${Number(pin)}`)}
      containerClass="flex space-x-4"
      inputClass="input join-item w-14 h-14 text-center font-mono"
      focus={true}
    />

    <p class="text-sm text-gray-400">
      If code is less than 6 digites, then prefix with <code>0</code>
    </p>
  </div>
</section>
