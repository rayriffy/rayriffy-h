<script lang="ts">
  interface Props {
    [key: string]: any
  }

  let { ...props }: Props = $props()
</script>

<svg {...props} fill="currentColor" viewBox="0 0 24 24"
  ><path d="M5 11h14v2H5z" /></svg
>
