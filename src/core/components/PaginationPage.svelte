<script lang="ts">
  export let page: number
  export let current: number
  export let prefix: string
</script>

<a
  href={`${prefix}${page === 1 ? '' : `p/${page}`}`}
  class={`btn btn-sm${page === current ? ' btn-active' : ''}`}>{page}</a
>
