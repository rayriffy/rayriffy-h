import fs from 'fs'
import path from 'path'

const builtSWFiles = [
  path.join(process.cwd(), '.svelte-kit/output/client/sw.js'),
  path.join(process.cwd(), 'build/client/sw.js'),
]

builtSWFiles.forEach(filePath => {
  const originalContent = fs.readFileSync(filePath, 'utf8')
  fs.writeFileSync(
    filePath,
    originalContent.replace(
      `,e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("./")))`,
      ''
    )
  )
})
