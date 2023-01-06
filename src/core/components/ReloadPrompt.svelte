<script lang="ts">
  import UpvoteIcon from '@svicons/boxicons-regular/upvote.svelte'

  import { useRegisterSW } from 'virtual:pwa-register/svelte'

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      // uncomment following code if you want check for updates
      // r && setInterval(() => {
      //    console.log('Checking for sw update')
      //    r.update()
      // }, 20000 /* 20s for testing purposes */)
      console.log(`SW Registered: ${r}`)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })
</script>

{#if $needRefresh}
  <div class="toast toast-top toast-end">
    <button
      class="alert alert-info px-4 py-1 text-sm"
      on:click={() => updateServiceWorker(true)}
    >
      <div>
        <span class="flex"
          ><UpvoteIcon class="w-5 pr-1" /> Update available</span
        >
      </div>
    </button>
  </div>
{/if}
