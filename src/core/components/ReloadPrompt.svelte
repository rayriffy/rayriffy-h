<script lang="ts">
  import UpvoteIcon from '$icons/upvote.svelte'

  import { useRegisterSW } from 'virtual:pwa-register/svelte'

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      // uncomment following code if you want check for updates
      // r && setInterval(() => {
      //    console.log('Checking for sw update')
      //    r.update()
      // }, 20000 /* 20s for testing purposes */)
      console.log('SW Registered')
      console.log(r)
    },
    onRegisterError(error) {
      console.log('SW registration error')
      console.log(error)
    },
  })
</script>

{#if $needRefresh}
  <div class="toast toast-end toast-top">
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
