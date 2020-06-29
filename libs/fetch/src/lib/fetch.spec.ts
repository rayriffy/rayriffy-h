import { fetch } from './fetch'

describe('fetch', () => {
  it('should fetch api', async () => {
    const res = await fetch('https://h.api.rayriffy.com')

    expect(res).toMatchObject({
      status: 'success',
      code: 201,
      response: {
        message: 'hello',
        data: {
          docs:
            'https://github.com/rayriffy/rayriffy-h/tree/master/apps/api#api',
        },
      },
    })
  })
})
