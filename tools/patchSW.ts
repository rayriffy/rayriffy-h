import fs from 'fs'
import path from 'path'
;(async () => {
  await Promise.allSettled(
    [
      path.join(process.cwd(), '.svelte-kit/output/client/sw.js'),
      path.join(process.cwd(), 'build/client/sw.js'),
    ].map(async filePath => {
      const originalContent = await fs.promises.readFile(filePath, 'utf8')

      const targetString =
        'e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/"))),'

      if (originalContent.includes(targetString))
        await fs.promises.writeFile(
          filePath,
          originalContent.replace(
            `e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/"))),`,
            ''
          )
        )
      else throw new Error('no replacement found')
    })
  )
})().catch(e => {
  console.error(e)
  process.exit(1)
})
