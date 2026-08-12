# @riffyh/server

## 1.3.2

### Patch Changes

- efd75a3: logging for error during image optimization

## 1.3.1

### Patch Changes

- 66f0410: Fall back to Sharp for source images Bun cannot decode, including animated WebP.

## 1.3.0

### Minor Changes

- a89ba05: Add metadata-first, paginated gallery loading while preserving complete-gallery compatibility through the server and shared aggregation helper. E-Hentai now resolves image pages progressively instead of blocking its initial gallery response.

### Patch Changes

- Updated dependencies [a89ba05]
  - @riffyh/commons@3.0.0

## 1.2.6

### Patch Changes

- f32c149: fix publishing issue regarding to version resolution
- Updated dependencies [f32c149]
  - @riffyh/commons@2.2.2

## 1.2.5

### Patch Changes

- eff7500: initial publish from ci
- Updated dependencies [eff7500]
  - @riffyh/commons@2.2.1
