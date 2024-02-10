import adapter from 'svelte-adapter-bun'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    env: {
      publicPrefix: 'RIFFYH_',
    },
    alias: {
      '$nanostores/*': 'src/context',
      '$core/*': 'src/core',
      '$icons/*': 'src/icons',
      '$modules/*': 'src/modules',
      '$trpc/*': 'src/trpc',
    },
  },
}

export default config
