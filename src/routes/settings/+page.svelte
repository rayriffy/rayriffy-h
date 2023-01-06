<script lang="ts">
  import { useStore } from '$storeon'

  const { settings, dispatch } = useStore('settings')
</script>

<section class="p-4">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="card-title">Safe mode</h2>
          <p>Blur image to prevent public incident</p>
        </div>
        <input
          type="checkbox"
          class="toggle toggle-primary"
          checked={$settings.safemode}
          on:click={() => dispatch('setting/toggle', 'safemode')}
        />
      </div>
    </div>
  </div>
</section>
