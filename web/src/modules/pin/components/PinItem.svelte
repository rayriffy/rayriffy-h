<script lang="ts">
  import { onDestroy } from 'svelte'

  // Props
  export let onChange: (value: string, isPasting: boolean) => void
  export let onBackspace: () => void
  export let onPaste: ((value: string) => void) | undefined = undefined
  export let inputClass: string = ''

  // State
  let value: string = ''
  let input: HTMLInputElement
  let inputTimeout: ReturnType<typeof setTimeout> | null = null

  onDestroy(() => {
    if (inputTimeout) clearTimeout(inputTimeout)
  })

  function validateValue(val: string): string {
    if (!val) return ''

    const numCode = val.charCodeAt(0)
    const isInteger =
      numCode >= '0'.charCodeAt(0) && numCode <= '9'.charCodeAt(0)
    return isInteger ? val : ''
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === 8 && (!value || !value.length)) {
      onBackspace()
    }
  }

  function update(updatedValue: string, isPasting: boolean = false): void {
    const newValue = validateValue(updatedValue)
    if (value === newValue && !isPasting) return

    if (newValue.length < 2) {
      value = newValue

      if (inputTimeout) clearTimeout(inputTimeout)
      inputTimeout = setTimeout(() => {
        onChange(newValue, isPasting)
      }, 0)
    }
  }

  function handleChange(e: Event): void {
    const target = e.target as HTMLInputElement
    update(target.value)
  }

  export function focus(): void {
    input.focus()
  }

  export function clear(): void {
    value = ''
  }

  function handleFocus(e: FocusEvent): void {
    const target = e.target as HTMLInputElement
    target.select()
  }

  function handleBlur(): void {
    // isFocused = false;
  }

  function handlePaste(e: ClipboardEvent): void {
    if (!onPaste) {
      return
    }

    const pastedValue = e.clipboardData?.getData('text') || ''
    onPaste(pastedValue)
  }
</script>

<input
  class={inputClass}
  on:input={handleChange}
  on:keydown={handleKeyDown}
  maxlength="1"
  autocomplete="off"
  type="tel"
  inputmode="numeric"
  pattern="[0-9]*"
  bind:this={input}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:paste={handlePaste}
  {value}
/>
