import { GatsbyNode } from 'gatsby'

import fs from 'fs-extra'
import path from 'path'

export const onPreInit: GatsbyNode["onPreInit"] = async ({ reporter }) => {
  reporter.info(`Copying .cache/ and public/ from Nx to Gatsby`)
  try {
    await fs.ensureDir(path.resolve(`../../../../../dist/apps/web`))

    const directories = ['.cache', 'public'].map(async directory => {
      const pathRes = path.resolve(`../../../../../dist/apps/web/${directory}`)
      await fs.ensureDir(pathRes)

      try {
        await fs.copy(pathRes, path.resolve(`../../../${directory}`), { overwrite: true })
      } catch {
        reporter.error(`Cannot move ${directory}/ from Nx to Gatsby`)
      }
    })

    await Promise.all(directories)
  } catch {
    reporter.error('Unable to obtain .cache/ and public/ from Nx, maybe this is first build...skipping')
  }
}
