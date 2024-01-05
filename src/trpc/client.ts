import { createTRPCSvelte, httpBatchLink } from 'trpc-svelte-query'

import type { router } from '$trpc/router'

export const api = createTRPCSvelte<typeof router>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
})
