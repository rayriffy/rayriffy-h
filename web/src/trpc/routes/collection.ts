import z from 'zod'
import { destr } from 'destr'
import PQueue from 'p-queue'
import { TRPCError } from '@trpc/server'

import { env } from '$env/dynamic/private'
import { decrypt } from '$core/services/crypto/decrypt'
import { encrypt } from '$core/services/crypto/encrypt'
import { getHentai } from '$core/services/getHentai'
import { createTRPCRouter, publicProcedure } from '$trpc/utils'

import type { Hentai } from '@riffyh/commons'
import type { EncryptedData } from '$core/@types/EncryptedData'
import type { Favorite } from '$nanostores/@types/Favorite'

export const collectionRouter = createTRPCRouter({
  import: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const fetchQueue = new PQueue({
        concurrency: 20,
      })

      try {
        const bytebinRes = await fetch(
          `https://bytebin.lucko.me/${input.code}`
        ).then(async o => {
          if (o.ok)
            return destr<EncryptedData>(await o.text())
          else
            throw o
        })

        console.log(bytebinRes)

        // decrypt it
        const decryptedData = decrypt(bytebinRes, env.SECRET_KEY)
        const decryptedHentaiIds = destr<(string | number)[]>(decryptedData)

        // parse into collections
        let fetchedHentais: Hentai[] = []
        await Promise.all(
          decryptedHentaiIds.map(id =>
            fetchQueue.add(async () => {
              try {
                fetchedHentais.push(await getHentai(id))
              } catch (e) {
                console.log('failed to import item id ', id)
              }
            })
          )
        )

        let orderedItems: Favorite[] = decryptedHentaiIds
          .map(id => fetchedHentais.find(o => Number(o.id) === Number(id)))
          .filter(o => o !== undefined)
          .map(hentai => ({
            id: hentai!.id,
            internal: false,
            data: {
              ...hentai!,
              images: {
                ...hentai!.images,
                pages: [],
              },
            },
          }))

        return orderedItems
      } catch (e) {
        console.error(e)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        })
      }
    }),
  export: publicProcedure
    .input(
      z.object({
        ids: z.array(z.union([z.string(), z.number()])),
      })
    )
    .mutation(async ({ input }) => {
      console.log(`read ${input.ids.length} items`)

      try {
        // encrypt it
        // 32 character key
        const encryptedData = encrypt(JSON.stringify(input.ids), env.SECRET_KEY)

        // push to bytebin
        const bytebinRes: { key: string } = await fetch(
          `https://bytebin.lucko.me/post`,
          {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(encryptedData),
            headers: { 'Content-Type': 'application/json' },
          }
        ).then(async o => {
          if (o.ok)
            return destr(await o.text())
          else
            throw o
        })

        return bytebinRes.key
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        })
      }
    }),
})
