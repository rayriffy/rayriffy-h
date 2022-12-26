<script lang="ts">
  export let src: string
  export let width: number
  export let height: number
  export let alt: string

  const allSizes = [
    16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
    3840,
  ]
  const widths = [
    ...new Set(
      // > This means that most OLED screens that say they are 3x resolution,
      // > are actually 3x in the green color, but only 1.5x in the red and
      // > blue colors. Showing a 3x resolution image in the app vs a 2x
      // > resolution image will be visually the same, though the 3x image
      // > takes significantly more data. Even true 3x resolution screens are
      // > wasteful as the human eye cannot see that level of detail without
      // > something like a magnifying glass.
      // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
      [width, width * 2 /*, width * 3*/].map(
        w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]
      )
    ),
  ]

  const srcSet = widths
    .map(
      (o, i) =>
        `/api/_image?${new URLSearchParams({
          url: src,
          w: width.toString(),
          q: '73',
        }).toString()} ${i + 1}x`
    )
    .join(', ')
  const targetSrc = `/api/_image?${new URLSearchParams({
    url: src,
    w: widths[widths.length - 1].toString(),
    q: '73',
  }).toString()}`
</script>

<img
  {alt}
  srcset={srcSet}
  src={targetSrc}
  {width}
  {height}
  decoding="async"
  loading="lazy"
/>
