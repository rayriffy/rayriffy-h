import { createTRPCRouter, publicProcedure } from '$trpc/utils'
import { searchInputSchema } from '$core/constants/schema/searchInput'

import { searchMain } from '$core/services/search/main'
import { searchListing } from '$core/services/search/listing'
import { searchTag } from '$core/services/search/tag'

export const hentaiRouter = createTRPCRouter({
  search: publicProcedure
    .input(searchInputSchema)
    .query(async ({ input: { mode, ...input } }) => {
      let searchFn =
        mode === 'main'
          ? searchMain
          : mode === 'listing'
            ? searchListing
            : searchTag

      return searchFn(input)
    }),
})
