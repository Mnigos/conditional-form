import fs from 'node:fs'
import { NextApiRequest, NextApiResponse } from 'next'

import { users } from '~/data'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {
    case 'GET':
      const user = users.find(el => el.name === body.user.name)

      res.status(200).json(user)
      break
    case 'PUT':
      const isUserExists = !!users.some(el => el.name === body.user.name)

      if (isUserExists) return res.status(409).end('User already Exists!')

      users.push(body.user)
      fs.writeFile(
        './data/index.json',
        `{"users": ${JSON.stringify(users)}}`,
        error => {
          // eslint-disable-next-line no-console
          if (error) console.log(error)
        }
      )
      res.status(201).end('created!')
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
