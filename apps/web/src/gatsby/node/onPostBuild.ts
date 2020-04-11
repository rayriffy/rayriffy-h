import { GatsbyNode } from 'gatsby'

import fs from 'fs-extra'
import path from 'path'

export const onPostBuild: GatsbyNode["onPostBuild"] = async ({ reporter }) => {
  reporter.info(`Copying .cache/ and public/ from Gatsby to Nx`)
  try {
    await fs.ensureDir(path.resolve(`../../../../../dist/apps/web`))

    const directories = ['.cache', 'public'].map(async directory => {
      const pathRes = path.resolve(`../../../../../dist/apps/web/${directory}`)
      await fs.ensureDir(pathRes)

      try {
        await fs.copy(path.resolve(`../../../${directory}`), pathRes, { overwrite: true })
      } catch {
        reporter.error(`Cannot move ${directory}/ from Gatsby to Nx`)
      }
    })

    await Promise.all(directories)
  } catch {
    reporter.error('Unable to move .cache/ and .public/ from Gatsby to Nx')
  }
}
