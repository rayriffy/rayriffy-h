import { NextApiHandler } from 'next'

import fs from 'fs'
import path from 'path'

const api: NextApiHandler = (req, res) => {
  const { paths = '/' } = req.query
  const filePath = path.join(process.cwd(), typeof paths === 'string' ? paths : paths.join('/'))

  if (fs.statSync(filePath).isDirectory()) {
    return res.status(200).send(fs.readdirSync(filePath).map(o => fs.statSync(path.join(filePath, o)).isDirectory() ? `${o}/` : o))
  } else {
    return res.status(200).send(fs.readFileSync(filePath))
  }
}

export default api
