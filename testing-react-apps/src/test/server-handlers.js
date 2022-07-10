import {rest} from 'msw'

const delay = process.env.NODE_ENV === 'test' ? 0 : 1500

const handlers = [
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({message: 'password is strongly required'}),
        )
      }
      if (!req.body.username) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({message: 'username is strongly required'}),
        )
      }
      return res(ctx.delay(delay), ctx.json({username: req.body.username}))
    },
  ),
]

export {handlers}
