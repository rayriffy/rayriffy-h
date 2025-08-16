<script lang="ts">
  import { onDestroy } from 'svelte'

  interface Props {
    // Props
    onChange: (value: string, isPasting: boolean) => void
    onBackspace: () => void
    onPaste?: ((value: string) => void) | undefined
    inputClass?: string
  }

  let {
    onChange,
    onBackspace,
    onPaste = undefined,
    inputClass = '',
  }: Props = $props()

  // State
  let value: string = $state('')
  let input: HTMLInputElement | undefined = $state()
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

  export function update(
    updatedValue: string,
    isPasting: boolean = false
  ): void {
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
    input?.focus()
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
  oninput={handleChange}
  onkeydown={handleKeyDown}
  maxlength="1"
  autocomplete="off"
  type="tel"
  inputmode="numeric"
  pattern="[0-9]*"
  bind:this={input}
  onfocus={handleFocus}
  onblur={handleBlur}
  onpaste={handlePaste}
  {value}
/>
