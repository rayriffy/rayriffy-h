import { NextApiHandler } from 'next'

import fs from 'fs'
import path from 'path'

const api: NextApiHandler = (req, res) => {
  const { paths = '/' } = req.query
  const filePath = path.join(process.cwd(), typeof paths === 'string' ? paths : paths.join('/'))

  return res.status(200).send(fs.readdirSync(filePath))
}

export default api
