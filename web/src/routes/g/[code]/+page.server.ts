import { server } from '$trpc/server'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async event => {
  // get target code
  const { code } = event.params

  await server.hentai.get.ssr({ code })
}
