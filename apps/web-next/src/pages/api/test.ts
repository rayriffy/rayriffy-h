import { NextApiHandler } from 'next'

const api: NextApiHandler = (req, res) => {
  const payload = {
    cwd: process.cwd(),
    dirname: __dirname,
    env: process.env,
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export default api
