import z from 'zod'

export const searchInputSchema = z.object({
  mode: z.union([z.literal('listing'), z.literal('main'), z.literal('tag')]),
  query: z.string(),
  page: z.number(),
  excludeTags: z.array(z.string()),
})

export type SearchInput = z.infer<typeof searchInputSchema>
