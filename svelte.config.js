import adapter from '@sveltejs/adapter-node'
// import adapter from 'svelte-adapter-bun'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    env: {
      publicPrefix: 'PUBLIC_',
    },
    alias: {
      $storeon: 'src/context',
      '$core/*': 'src/core',
      '$modules/*': 'src/modules',
    },
  },
}

export default config
