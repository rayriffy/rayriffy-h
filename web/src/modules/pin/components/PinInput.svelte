<script lang="ts">
  import { onMount } from 'svelte'
  import PinItem from './PinItem.svelte'

  interface Props {
    // Props
    length: number
    onComplete?: (pin: string, index: number) => void
    focus?: boolean
    onChange?: (pin: string, index: number) => void
    containerClass?: string
    inputClass?: string
  }

  let {
    length,
    onComplete = () => {},
    focus = false,
    onChange = () => {},
    containerClass = '',
    inputClass = '',
  }: Props = $props()

  // Internal state
  let values: string[] = $state([])
  let elements: PinItem[] = $state([])

  // Initialize empty values array when length changes
  $effect(() => {
    values = Array(length).fill('')
  })

  // Ensure elements array is sized correctly when length changes
  $effect(() => {
    if (elements.length !== length) {
      elements = Array(length)
    }
  })

  onMount(() => {
    // Setting focus on the first element
    if (focus && length && elements[0]) {
      elements[0].focus()
    }
  })

  // Expose methods for external use
  export function clear(): void {
    elements.forEach(e => e && e.clear())
    values = values.map(() => '')
    if (elements[0]) elements[0].focus()
  }

  export function focusFirst(): void {
    if (length && elements[0]) elements[0].focus()
  }

  function onItemChange(
    value: string,
    isPasting: boolean,
    index: number
  ): void {
    values[index] = value
    let updatedIndex = index

    // Set focus on next
    if (value.length === 1 && index < length - 1) {
      updatedIndex += 1
      if (elements[updatedIndex]) elements[updatedIndex].focus()
    }

    // Notify the parent
    const pin = values.join('')

    if (!isPasting) {
      onChange(pin, updatedIndex)
    }

    if (pin.length === length) {
      // For pasting, trigger onComplete only when the last input triggers onChange
      if (isPasting && index < length - 1) {
        return
      }

      onComplete(pin, updatedIndex)
    }
  }

  function onBackspace(index: number): void {
    if (index > 0 && elements[index - 1]) {
      elements[index - 1].focus()
    }
  }

  function onPaste(value: string): void {
    if (value.length !== length) {
      return
    }

    elements.forEach((el, index) => {
      if (el) el.update(value[index], true)
    })
  }
</script>

<div class={containerClass}>
  {#each Array(length) as _, i}
    <PinItem
      bind:this={elements[i]}
      onBackspace={() => onBackspace(i)}
      onChange={(v, isPasting) => onItemChange(v, isPasting, i)}
      onPaste={i === 0 ? onPaste : undefined}
      {inputClass}
    />
  {/each}
</div>
